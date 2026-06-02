import { authenticate, corsHeaders, isRateLimited, json } from "../_shared/cors.ts";

/**
 * germany-support-reply
 *
 * A staff member posts an outbound reply to a support conversation. The message
 * is created as direction='outbound' (Codex picks it up and sends it via the
 * original channel — see docs/backoffice/codex-contract.md §4). Bumps the
 * conversation to 'waiting' (waiting on the partner).
 *
 * Auth: JWT required + role admin / compliance / auditor.
 * Rate limit: 60 calls / minute per user.
 */

const STAFF_ROLES = ["admin", "compliance", "auditor"];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders(req) });
  if (req.method !== "POST") return json(req, { error: "method_not_allowed" }, 405);

  try {
    const auth = await authenticate(req);
    if (!auth) return json(req, { error: "unauthorized" }, 401);

    if (await isRateLimited(auth.admin, "germany-support-reply", auth.userId)) {
      return json(req, { error: "rate_limited", retry_after_seconds: 60 }, 429);
    }

    const { data: roles } = await auth.admin
      .from("user_roles")
      .select("role")
      .eq("user_id", auth.userId);
    const roleSet = new Set((roles ?? []).map((r: { role: string }) => r.role));
    if (!STAFF_ROLES.some((r) => roleSet.has(r))) {
      return json(req, { error: "forbidden_role" }, 403);
    }

    const body = await req.json().catch(() => ({}));
    const conversationId = String(body.conversation_id ?? "").trim();
    const text = String(body.body ?? "").trim();
    if (!conversationId) return json(req, { error: "conversation_id_required" }, 400);
    if (!text || text.length > 10000) return json(req, { error: "invalid_body" }, 400);

    const { data: inserted, error: insErr } = await auth.admin
      .from("support_messages" as never)
      .insert({
        conversation_id: conversationId,
        direction: "outbound",
        author_kind: "staff",
        author_id: auth.userId,
        body: text,
        delivered: false,
      })
      .select("id")
      .maybeSingle();
    if (insErr) return json(req, { error: "persist_failed" }, 500);

    // Bump the conversation: now waiting on the partner.
    await auth.admin
      .from("support_conversations" as never)
      .update({ status: "waiting", updated_at: new Date().toISOString() })
      .eq("id", conversationId);

    return json(req, { message_id: (inserted as { id?: string } | null)?.id ?? null });
  } catch (_error) {
    return json(req, { error: "internal_error" }, 500);
  }
});
