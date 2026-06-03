import { authenticate, corsHeaders, isRateLimited, json } from "../_shared/cors.ts";

/**
 * germany-sample-request-status
 *
 * Admin/compliance transitions a B2B sample request through its workflow
 * (received → in_review → fulfilled | declined) in germany_sample_requests.
 *
 * Auth: JWT required + caller must hold role admin or compliance.
 * Rate limit: 30 calls / minute per user.
 */

const STATUSES = new Set(["received", "in_review", "fulfilled", "declined"]);
// Mirrors src/lib/sample-request-status.ts — keep in sync.
const TRANSITIONS: Record<string, string[]> = {
  received: ["in_review", "declined"],
  in_review: ["fulfilled", "declined"],
  fulfilled: [],
  declined: [],
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders(req) });
  if (req.method !== "POST") return json(req, { error: "method_not_allowed" }, 405);

  try {
    const auth = await authenticate(req);
    if (!auth) return json(req, { error: "unauthorized" }, 401);

    if (await isRateLimited(auth.admin, "germany-sample-request-status", auth.userId)) {
      return json(req, { error: "rate_limited", retry_after_seconds: 60 }, 429);
    }

    // Role check: admin or compliance only.
    const { data: roles } = await auth.admin
      .from("user_roles")
      .select("role")
      .eq("user_id", auth.userId);
    const roleSet = new Set((roles ?? []).map((r: { role: string }) => r.role));
    if (!["admin", "compliance"].some((r) => roleSet.has(r))) {
      return json(req, { error: "forbidden_role" }, 403);
    }

    const body = await req.json().catch(() => ({}));
    const id = String(body.id ?? "").trim();
    const status = String(body.status ?? "").trim();
    if (!id) return json(req, { error: "id_required" }, 400);
    if (!STATUSES.has(status)) return json(req, { error: "invalid_status" }, 400);

    // Load current status to enforce the allowed workflow transition.
    const { data: current, error: loadErr } = await auth.admin
      .from("germany_sample_requests" as never)
      .select("status")
      .eq("id", id)
      .maybeSingle();
    if (loadErr || !current) return json(req, { error: "not_found" }, 404);

    const from = String((current as { status?: string }).status ?? "");
    if (!(TRANSITIONS[from] ?? []).includes(status)) {
      return json(req, { error: "invalid_transition", from, to: status }, 409);
    }

    const { error: updErr } = await auth.admin
      .from("germany_sample_requests" as never)
      .update({ status, updated_at: new Date().toISOString(), updated_by: auth.userId })
      .eq("id", id);
    if (updErr) return json(req, { error: "update_failed" }, 500);

    return json(req, { id, status });
  } catch (_error) {
    return json(req, { error: "internal_error" }, 500);
  }
});
