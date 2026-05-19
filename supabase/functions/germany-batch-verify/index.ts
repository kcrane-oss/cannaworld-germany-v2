import { authenticate, corsHeaders, isRateLimited, json } from "../_shared/cors.ts";

/**
 * germany-batch-verify
 *
 * A pharmacy verifies a Cannabis batch token before patient dispense.
 *
 * Flow:
 *   1. Pharmacist scans/enters the batch_verification_token printed on the
 *      delivery slip or DataMatrix.
 *   2. This function checks the token against `batch_verification_tokens`
 *      (existing Gateway-owned table) AND validates the caller's pharmacy
 *      license number against the batch's intended recipient.
 *   3. Records the verification attempt in `germany_batch_verifications`
 *      for audit trail (success or failure).
 *
 * Auth: JWT required + caller must have role pharmacy / compliance / admin.
 * Rate limit: 30 calls / minute per user.
 */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders(req) });
  if (req.method !== "POST") return json(req, { error: "method_not_allowed" }, 405);

  try {
    const auth = await authenticate(req);
    if (!auth) return json(req, { error: "unauthorized" }, 401);

    if (await isRateLimited(auth.admin, "germany-batch-verify", auth.userId)) {
      return json(req, { error: "rate_limited", retry_after_seconds: 60 }, 429);
    }

    const body = await req.json().catch(() => ({}));
    const token = String(body.token || "").trim();
    const pharmacyLicense = String(body.pharmacy_license || "").trim();
    if (!token) return json(req, { error: "token_required" }, 400);
    if (!pharmacyLicense) return json(req, { error: "pharmacy_license_required" }, 400);

    // Role check: caller must hold pharmacy / compliance / admin
    const { data: roles } = await auth.admin
      .from("user_roles")
      .select("role")
      .eq("user_id", auth.userId);
    const roleSet = new Set((roles ?? []).map((r: { role: string }) => r.role));
    const allowed = ["pharmacy", "compliance", "admin"].some((r) => roleSet.has(r));
    if (!allowed) return json(req, { error: "forbidden_role" }, 403);

    // Look up the token
    const { data: tokenRow, error: tokenErr } = await auth.admin
      .from("batch_verification_tokens" as never)
      .select("*")
      .eq("token", token)
      .maybeSingle();

    let decision: "verified" | "rejected" | "expired" | "unknown_token" = "verified";
    let reason: string | null = null;
    let batchId: string | null = null;

    if (tokenErr || !tokenRow) {
      decision = "unknown_token";
      reason = "Token not found in batch_verification_tokens";
    } else {
      const t = tokenRow as Record<string, unknown>;
      batchId = (t.batch_id as string) ?? null;
      const expiresAt = t.expires_at ? new Date(t.expires_at as string).getTime() : null;
      if (expiresAt && expiresAt < Date.now()) {
        decision = "expired";
        reason = "Token expired";
      } else if (t.intended_pharmacy_license && String(t.intended_pharmacy_license) !== pharmacyLicense) {
        decision = "rejected";
        reason = `Pharmacy license mismatch (expected ${t.intended_pharmacy_license})`;
      }
    }

    // Audit trail (always insert, success or failure)
    await auth.admin.from("germany_batch_verifications" as never).insert({
      verified_by: auth.userId,
      verified_by_email: auth.userEmail,
      token,
      pharmacy_license: pharmacyLicense,
      batch_id: batchId,
      decision,
      reason,
      metadata: {
        user_agent: req.headers.get("user-agent"),
        ip: (req.headers.get("x-forwarded-for") || "").split(",")[0].trim(),
      },
    });

    return json(req, { decision, reason, batch_id: batchId });
  } catch (error) {
    console.error("[germany-batch-verify] failed", error);
    return json(req, { error: error instanceof Error ? error.message : "internal_error" }, 500);
  }
});
