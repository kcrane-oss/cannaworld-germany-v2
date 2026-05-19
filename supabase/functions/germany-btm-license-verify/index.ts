import { authenticate, corsHeaders, isRateLimited, json } from "../_shared/cors.ts";

/**
 * germany-btm-license-verify
 *
 * Verifies a pharmacy's BtM (Betäubungsmittel) operating license.
 *
 * Current implementation: validates against an admin-managed `germany_btm_licenses`
 * table. Future iteration: cross-check against the BfArM admin registry once
 * an official API becomes available.
 *
 * Auth: JWT required + caller must hold role pharmacy / admin.
 * Rate limit: 30 calls / minute per user.
 */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders(req) });
  if (req.method !== "POST") return json(req, { error: "method_not_allowed" }, 405);

  try {
    const auth = await authenticate(req);
    if (!auth) return json(req, { error: "unauthorized" }, 401);
    if (await isRateLimited(auth.admin, "germany-btm-license-verify", auth.userId)) {
      return json(req, { error: "rate_limited", retry_after_seconds: 60 }, 429);
    }

    const body = await req.json().catch(() => ({}));
    const licenseNumber = String(body.license_number || "").trim();
    if (!licenseNumber) return json(req, { error: "license_number_required" }, 400);

    // Role check
    const { data: roles } = await auth.admin
      .from("user_roles")
      .select("role")
      .eq("user_id", auth.userId);
    const roleSet = new Set((roles ?? []).map((r: { role: string }) => r.role));
    if (!["pharmacy", "admin"].some((r) => roleSet.has(r))) {
      return json(req, { error: "forbidden_role" }, 403);
    }

    // Look up in our internal registry
    const { data: row } = await auth.admin
      .from("germany_btm_licenses" as never)
      .select("*")
      .eq("license_number", licenseNumber)
      .maybeSingle();

    if (!row) {
      // Record the lookup attempt so admins can spot unknown licenses to onboard
      await auth.admin.from("germany_btm_license_verifications" as never).insert({
        verified_by: auth.userId,
        verified_by_email: auth.userEmail,
        license_number: licenseNumber,
        result: "unknown",
      });
      return json(req, { verified: false, reason: "license_not_in_registry" });
    }

    const r = row as Record<string, unknown>;
    const expiresAt = r.expires_at ? new Date(r.expires_at as string).getTime() : null;
    const isExpired = expiresAt && expiresAt < Date.now();
    const isRevoked = r.status === "revoked" || r.status === "suspended";

    const verified = !isExpired && !isRevoked && r.status === "active";
    const reason = isExpired ? "license_expired" : isRevoked ? `license_${r.status}` : verified ? null : "license_inactive";

    await auth.admin.from("germany_btm_license_verifications" as never).insert({
      verified_by: auth.userId,
      verified_by_email: auth.userEmail,
      license_number: licenseNumber,
      result: verified ? "verified" : (reason ?? "denied"),
    });

    return json(req, {
      verified,
      reason,
      license: verified
        ? {
            license_number: r.license_number,
            pharmacy_name: r.pharmacy_name,
            expires_at: r.expires_at,
          }
        : null,
    });
  } catch (error) {
    console.error("[germany-btm-license-verify] failed", error);
    return json(req, { error: error instanceof Error ? error.message : "internal_error" }, 500);
  }
});
