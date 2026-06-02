import { authenticate, corsHeaders, isRateLimited, json } from "../_shared/cors.ts";

/**
 * germany-sample-request
 *
 * A German B2B partner submits a structured sample/demand request from the
 * Marketplace (replaces the legacy mailto). Persists into germany_sample_requests
 * for the CannaWorld team to action (qualified supplier + EU release + logistics).
 *
 * Compliance-first: B2B intake only — the caller must confirm B2B context;
 * no consumer sale, no therapeutic claims are captured or implied.
 *
 * Auth: JWT required (any authenticated partner).
 * Rate limit: 5 requests / minute per user.
 */

const CATEGORIES = new Set(["flower", "extract", "other"]);
const PATHWAYS = new Set(["wholesale", "pharmacy_supply", "processing"]);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders(req) });
  if (req.method !== "POST") return json(req, { error: "method_not_allowed" }, 405);

  try {
    const auth = await authenticate(req);
    if (!auth) return json(req, { error: "unauthorized" }, 401);

    if (await isRateLimited(auth.admin, "germany-sample-request", auth.userId)) {
      return json(req, { error: "rate_limited", retry_after_seconds: 60 }, 429);
    }

    const body = await req.json().catch(() => ({}));

    const company = String(body.company ?? "").trim();
    const contactEmail = String(body.contactEmail ?? "").trim();
    const productCategory = String(body.productCategory ?? "").trim();
    const targetPathway = String(body.targetPathway ?? "").trim();
    const quantityKg = Number(body.quantityKg);
    const context = String(body.context ?? "").trim().slice(0, 2000);
    const b2bConfirmed = body.b2bConfirmed === true;

    // Server-side validation (never trust the client).
    if (!company || company.length > 200) return json(req, { error: "invalid_company" }, 400);
    if (!contactEmail || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contactEmail)) {
      return json(req, { error: "invalid_email" }, 400);
    }
    if (!CATEGORIES.has(productCategory)) return json(req, { error: "invalid_category" }, 400);
    if (!PATHWAYS.has(targetPathway)) return json(req, { error: "invalid_pathway" }, 400);
    if (!Number.isFinite(quantityKg) || quantityKg <= 0 || quantityKg > 100000) {
      return json(req, { error: "invalid_quantity" }, 400);
    }
    if (!b2bConfirmed) return json(req, { error: "b2b_confirmation_required" }, 400);

    const { data: inserted, error: insertErr } = await auth.admin
      .from("germany_sample_requests" as never)
      .insert({
        requested_by: auth.userId,
        requested_by_email: auth.userEmail,
        company,
        contact_email: contactEmail,
        product_category: productCategory,
        quantity_kg: quantityKg,
        target_pathway: targetPathway,
        context: context || null,
        b2b_confirmed: b2bConfirmed,
        status: "received",
        metadata: {
          user_agent: req.headers.get("user-agent"),
          ip: (req.headers.get("x-forwarded-for") || "").split(",")[0].trim(),
        },
      })
      .select("id")
      .maybeSingle();

    if (insertErr) return json(req, { error: "persist_failed" }, 500);

    return json(req, { id: (inserted as { id?: string } | null)?.id ?? null, status: "received" });
  } catch (_error) {
    return json(req, { error: "internal_error" }, 500);
  }
});
