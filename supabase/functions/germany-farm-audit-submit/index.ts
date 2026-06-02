import { authenticate, corsHeaders, isRateLimited, json } from "../_shared/cors.ts";

/**
 * germany-farm-audit-submit
 *
 * A farm self-registers and submits a self-audit (self-assessment score +
 * uploaded document metadata + client-side integrity report). Stored as
 * status='pending' for HUMAN release (germany-farm-audit-decide). No auto-approval.
 *
 * Auth: any authenticated user (the farm). Rate limit: 10 / minute per user.
 */

const REQUIRED = ["gacp_cert", "coa", "license"];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders(req) });
  if (req.method !== "POST") return json(req, { error: "method_not_allowed" }, 405);

  try {
    const auth = await authenticate(req);
    if (!auth) return json(req, { error: "unauthorized" }, 401);

    if (await isRateLimited(auth.admin, "germany-farm-audit-submit", auth.userId, 60, 10)) {
      return json(req, { error: "rate_limited", retry_after_seconds: 60 }, 429);
    }

    const body = await req.json().catch(() => ({}));
    const farmName = String(body.farm_name ?? "").trim();
    const province = String(body.province ?? "").trim() || null;
    const score = Number(body.self_assessment_score);
    const documents = Array.isArray(body.documents) ? body.documents : [];
    const integrity = body.integrity ?? {};
    if (!farmName || farmName.length > 200) return json(req, { error: "invalid_farm_name" }, 400);
    if (!Number.isFinite(score) || score < 0 || score > 100) return json(req, { error: "invalid_score" }, 400);

    // Server re-check of required-document completeness (never trust the client).
    const present = new Set(documents.map((d: { docType?: string }) => d.docType));
    const missing = REQUIRED.filter((t) => !present.has(t));

    const { data: inserted, error: insErr } = await auth.admin
      .from("farm_audit_submissions" as never)
      .insert({
        submitted_by: auth.userId,
        submitted_by_email: auth.userEmail,
        farm_name: farmName,
        province,
        country: "TH",
        self_assessment_score: score,
        risk_score: Number(integrity.riskScore) || 0,
        document_count: documents.length,
        missing_required: missing,
        documents,
        integrity,
        status: "pending", // human releases — never auto-approved
      })
      .select("id")
      .maybeSingle();
    if (insErr) return json(req, { error: "persist_failed" }, 500);

    return json(req, { submission_id: (inserted as { id?: string } | null)?.id ?? null, status: "pending", missing_required: missing });
  } catch {
    return json(req, { error: "internal_error" }, 500);
  }
});
