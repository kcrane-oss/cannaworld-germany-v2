import { codexAuthorized, corsHeaders, isRateLimited, json, serviceClient } from "../_shared/cors.ts";

/**
 * germany-support-inbound  (Codex → Back-Office)
 *
 * Codex posts a new partner message (email/chat). Idempotent on external_ref:
 * same thread → message appended to the existing conversation. See
 * docs/backoffice/codex-contract.md §3. Service-to-service (CODEX_SERVICE_TOKEN).
 */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders(req) });
  if (req.method !== "POST") return json(req, { error: "method_not_allowed" }, 405);
  if (!codexAuthorized(req)) return json(req, { error: "unauthorized" }, 401);

  try {
    const admin = serviceClient();
    if (await isRateLimited(admin, "germany-support-inbound", "codex", 60, 600)) {
      return json(req, { error: "rate_limited", retry_after_seconds: 60 }, 429);
    }

    const body = await req.json().catch(() => ({}));
    const externalRef = String(body.external_ref ?? "").trim();
    const channel = String(body.channel ?? "").trim();
    const text = String(body.body ?? "").trim();
    const subject = String(body.subject ?? "").trim() || null;
    const partnerId = body.partner_id ? String(body.partner_id) : null;
    if (!externalRef) return json(req, { error: "external_ref_required" }, 400);
    if (!["email", "chat"].includes(channel)) return json(req, { error: "invalid_channel" }, 400);
    if (!text || text.length > 20000) return json(req, { error: "invalid_body" }, 400);

    // Upsert conversation by external_ref (idempotent per thread).
    const { data: existing } = await admin
      .from("support_conversations" as never)
      .select("id")
      .eq("external_ref", externalRef)
      .maybeSingle();

    let conversationId = (existing as { id?: string } | null)?.id ?? null;
    let created = false;
    if (!conversationId) {
      const { data: conv, error: convErr } = await admin
        .from("support_conversations" as never)
        .insert({ channel, partner_id: partnerId, subject, external_ref: externalRef, status: "open", tier: 0 })
        .select("id")
        .maybeSingle();
      if (convErr || !conv) return json(req, { error: "conversation_create_failed" }, 500);
      conversationId = (conv as { id: string }).id;
      created = true;
    }

    const { data: msg, error: msgErr } = await admin
      .from("support_messages" as never)
      .insert({ conversation_id: conversationId, direction: "inbound", author_kind: "partner", body: text })
      .select("id")
      .maybeSingle();
    if (msgErr) return json(req, { error: "message_create_failed" }, 500);

    // Reopen if a resolved/closed thread gets a new inbound message.
    await admin
      .from("support_conversations" as never)
      .update({ status: "open", updated_at: new Date().toISOString() })
      .eq("id", conversationId)
      .in("status", ["resolved", "closed"]);

    return json(req, { conversation_id: conversationId, message_id: (msg as { id?: string } | null)?.id ?? null, created });
  } catch {
    return json(req, { error: "internal_error" }, 500);
  }
});
