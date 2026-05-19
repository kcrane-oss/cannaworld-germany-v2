import { authenticate, corsHeaders, isRateLimited, json } from "../_shared/cors.ts";

/**
 * germany-coa-parse
 *
 * Extracts structured fields (THC%, CBD%, heavy metals, microbials, pesticides)
 * from a Certificate of Analysis. This is a baseline regex parser that operates
 * on plain text already extracted from the CoA PDF (the client uploads to
 * Supabase Storage AND posts the OCR'd text here).
 *
 * Production hardening (Phase 4b): swap-in via env var
 *   COA_PARSER_PROVIDER = tesseract | reduct | mindee
 * to invoke a heavier-weight extractor on the binary itself. Today the function
 * does deterministic regex extraction on the supplied text.
 *
 * Auth: JWT required. No role restriction (any logged-in user may submit
 * a CoA; the stored extraction is owner-scoped by RLS).
 * Rate limit: 10 calls / minute per user (parser is CPU-cheap but DB-write-heavy).
 */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders(req) });
  if (req.method !== "POST") return json(req, { error: "method_not_allowed" }, 405);

  try {
    const auth = await authenticate(req);
    if (!auth) return json(req, { error: "unauthorized" }, 401);
    if (await isRateLimited(auth.admin, "germany-coa-parse", auth.userId, 60, 10)) {
      return json(req, { error: "rate_limited", retry_after_seconds: 60 }, 429);
    }

    const body = await req.json().catch(() => ({}));
    const text = String(body.extracted_text || "").trim();
    const documentId = body.document_id ? String(body.document_id) : null;
    const sourceFileUrl = body.source_file_url ? String(body.source_file_url) : null;
    const batchId = body.batch_id ? String(body.batch_id) : null;

    if (!text) return json(req, { error: "extracted_text_required" }, 400);
    if (text.length > 200_000) return json(req, { error: "extracted_text_too_large" }, 413);

    const extraction = parseCoaText(text);

    const { data: row, error } = await auth.admin
      .from("germany_coa_extractions" as never)
      .insert({
        owner_id: auth.userId,
        document_id: documentId,
        source_file_url: sourceFileUrl,
        batch_id: batchId,
        parser_provider: Deno.env.get("COA_PARSER_PROVIDER") ?? "regex-baseline",
        thc_percent: extraction.thc_percent,
        cbd_percent: extraction.cbd_percent,
        terpenes: extraction.terpenes,
        heavy_metals: extraction.heavy_metals,
        microbials: extraction.microbials,
        pesticides: extraction.pesticides,
        raw_text_length: text.length,
        confidence: extraction.confidence,
      })
      .select("id")
      .single();

    if (error) throw error;
    return json(req, { extraction_id: (row as { id: string }).id, ...extraction });
  } catch (error) {
    console.error("[germany-coa-parse] failed", error);
    return json(req, { error: error instanceof Error ? error.message : "internal_error" }, 500);
  }
});

interface ParsedCoa {
  thc_percent: number | null;
  cbd_percent: number | null;
  terpenes: Record<string, number>;
  heavy_metals: Record<string, number>;
  microbials: Record<string, number>;
  pesticides: Record<string, number>;
  confidence: number;
}

function parseCoaText(text: string): ParsedCoa {
  const lc = text.toLowerCase();
  let found = 0;
  let total = 0;

  function pctMatch(re: RegExp): number | null {
    total++;
    const m = lc.match(re);
    if (!m) return null;
    const v = parseFloat(m[1].replace(",", "."));
    if (!Number.isFinite(v)) return null;
    found++;
    return v;
  }

  function mgMatch(name: string): number | null {
    total++;
    const re = new RegExp(`\\b${name}[^\\n]{0,40}?(\\d+[.,]?\\d*)\\s*(mg\\s*\\/\\s*kg|ppm|µg\\s*\\/\\s*kg)`, "i");
    const m = lc.match(re);
    if (!m) return null;
    const v = parseFloat(m[1].replace(",", "."));
    if (!Number.isFinite(v)) return null;
    found++;
    return v;
  }

  function cfuMatch(name: string): number | null {
    total++;
    const re = new RegExp(`\\b${name}[^\\n]{0,40}?(\\d+[.,]?\\d*)\\s*(cfu\\s*\\/\\s*g|cfu\\s*\\/\\s*ml)`, "i");
    const m = lc.match(re);
    if (!m) return null;
    const v = parseFloat(m[1].replace(",", "."));
    if (!Number.isFinite(v)) return null;
    found++;
    return v;
  }

  const thc =
    pctMatch(/total\s*thc[^0-9%]{0,20}([0-9]+[.,]?[0-9]*)\s*%/) ??
    pctMatch(/\bthc\b[^0-9%]{0,20}([0-9]+[.,]?[0-9]*)\s*%/);
  const cbd =
    pctMatch(/total\s*cbd[^0-9%]{0,20}([0-9]+[.,]?[0-9]*)\s*%/) ??
    pctMatch(/\bcbd\b[^0-9%]{0,20}([0-9]+[.,]?[0-9]*)\s*%/);

  const terpenes: Record<string, number> = {};
  for (const t of ["myrcene", "limonene", "pinene", "linalool", "caryophyllene"]) {
    const v = pctMatch(new RegExp(`${t}[^0-9%]{0,20}([0-9]+[.,]?[0-9]*)\\s*%`));
    if (v != null) terpenes[t] = v;
  }

  const heavy_metals: Record<string, number> = {};
  for (const m of ["lead", "cadmium", "mercury", "arsenic"]) {
    const v = mgMatch(m);
    if (v != null) heavy_metals[m] = v;
  }

  const microbials: Record<string, number> = {};
  for (const m of ["e\\.\\s*coli", "salmonella", "yeast\\s*and\\s*mold", "aerobic\\s*bacteria"]) {
    const v = cfuMatch(m);
    if (v != null) microbials[m.replace(/\\\./g, ".").replace(/\\s\*/g, " ").trim()] = v;
  }

  const pesticides: Record<string, number> = {};
  for (const p of ["myclobutanil", "imidacloprid", "abamectin", "permethrin"]) {
    const v = mgMatch(p);
    if (v != null) pesticides[p] = v;
  }

  const confidence = total === 0 ? 0 : Math.round((found / total) * 100) / 100;

  return { thc_percent: thc, cbd_percent: cbd, terpenes, heavy_metals, microbials, pesticides, confidence };
}
