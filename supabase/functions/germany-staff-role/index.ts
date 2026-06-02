import { authenticate, corsHeaders, isRateLimited, json } from "../_shared/cors.ts";

/**
 * germany-staff-role
 *
 * Admin grants or revokes an app_role for a user (team management).
 *
 * Auth: JWT required + role admin. Rate limit: 30 calls / minute per user.
 */

const ROLES = new Set([
  "admin", "compliance", "auditor", "importer", "exporter", "inspector",
  "logistics", "farm", "shop", "trader", "pharmacy", "lab_provider",
]);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders(req) });
  if (req.method !== "POST") return json(req, { error: "method_not_allowed" }, 405);

  try {
    const auth = await authenticate(req);
    if (!auth) return json(req, { error: "unauthorized" }, 401);

    if (await isRateLimited(auth.admin, "germany-staff-role", auth.userId)) {
      return json(req, { error: "rate_limited", retry_after_seconds: 60 }, 429);
    }

    const { data: roles } = await auth.admin.from("user_roles").select("role").eq("user_id", auth.userId);
    const roleSet = new Set((roles ?? []).map((r: { role: string }) => r.role));
    if (!roleSet.has("admin")) return json(req, { error: "forbidden_role" }, 403);

    const body = await req.json().catch(() => ({}));
    const userId = String(body.user_id ?? "").trim();
    const role = String(body.role ?? "").trim();
    const grant = body.grant === true;
    if (!userId) return json(req, { error: "user_id_required" }, 400);
    if (!ROLES.has(role)) return json(req, { error: "invalid_role" }, 400);

    // Guard: an admin cannot revoke their own admin role (avoid lock-out).
    if (!grant && role === "admin" && userId === auth.userId) {
      return json(req, { error: "cannot_revoke_self_admin" }, 409);
    }

    if (grant) {
      const { error } = await auth.admin
        .from("user_roles")
        .upsert({ user_id: userId, role }, { onConflict: "user_id,role", ignoreDuplicates: true });
      if (error) return json(req, { error: "grant_failed" }, 500);
    } else {
      const { error } = await auth.admin
        .from("user_roles")
        .delete()
        .eq("user_id", userId)
        .eq("role", role);
      if (error) return json(req, { error: "revoke_failed" }, 500);
    }

    return json(req, { user_id: userId, role, granted: grant });
  } catch {
    return json(req, { error: "internal_error" }, 500);
  }
});
