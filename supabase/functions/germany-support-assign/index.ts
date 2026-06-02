import { authenticate, corsHeaders, isRateLimited, json } from "../_shared/cors.ts";

/**
 * germany-support-assign
 *
 * Admin/compliance updates a support conversation: assign to a staff member,
 * change status, and/or set the escalation tier. Only the provided fields change.
 *
 * Auth: JWT required + role admin / compliance.
 * Rate limit: 60 calls / minute per user.
 */

const STATUSES = new Set(["open", "triaged", "assigned", "waiting", "resolved", "closed"]);
const TIERS = new Set([0, 1, 2, 3]);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders(req) });
  if (req.method !== "POST") return json(req, { error: "method_not_allowed" }, 405);

  try {
    const auth = await authenticate(req);
    if (!auth) return json(req, { error: "unauthorized" }, 401);

    if (await isRateLimited(auth.admin, "germany-support-assign", auth.userId)) {
      return json(req, { error: "rate_limited", retry_after_seconds: 60 }, 429);
    }

    const { data: roles } = await auth.admin
      .from("user_roles")
      .select("role")
      .eq("user_id", auth.userId);
    const roleSet = new Set((roles ?? []).map((r: { role: string }) => r.role));
    if (!["admin", "compliance"].some((r) => roleSet.has(r))) {
      return json(req, { error: "forbidden_role" }, 403);
    }

    const body = await req.json().catch(() => ({}));
    const conversationId = String(body.conversation_id ?? "").trim();
    if (!conversationId) return json(req, { error: "conversation_id_required" }, 400);

    const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };

    if (body.assigned_to !== undefined) {
      patch.assigned_to = body.assigned_to === null ? null : String(body.assigned_to);
    }
    if (body.status !== undefined) {
      if (!STATUSES.has(String(body.status))) return json(req, { error: "invalid_status" }, 400);
      patch.status = String(body.status);
    }
    if (body.tier !== undefined) {
      const tier = Number(body.tier);
      if (!TIERS.has(tier)) return json(req, { error: "invalid_tier" }, 400);
      patch.tier = tier;
    }

    if (Object.keys(patch).length === 1) return json(req, { error: "nothing_to_update" }, 400);

    const { error: updErr } = await auth.admin
      .from("support_conversations" as never)
      .update(patch)
      .eq("id", conversationId);
    if (updErr) return json(req, { error: "update_failed" }, 500);

    return json(req, { id: conversationId });
  } catch {
    return json(req, { error: "internal_error" }, 500);
  }
});
