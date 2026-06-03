import { codexAuthorized, corsHeaders, json, serviceClient } from "../_shared/cors.ts";

/**
 * germany-support-outbound  (Back-Office → Codex)
 *
 * Codex pulls undelivered outbound messages to send via the original channel.
 * See docs/backoffice/codex-contract.md §4. Service-to-service (CODEX_SERVICE_TOKEN).
 */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders(req) });
  if (req.method !== "GET" && req.method !== "POST") return json(req, { error: "method_not_allowed" }, 405);
  if (!codexAuthorized(req)) return json(req, { error: "unauthorized" }, 401);

  try {
    const admin = serviceClient();
    const { data: messages, error } = await admin
      .from("support_messages" as never)
      .select("id, conversation_id, body, created_at")
      .eq("direction", "outbound")
      .eq("delivered", false)
      .order("created_at", { ascending: true })
      .limit(100);
    if (error) return json(req, { error: "fetch_failed" }, 500);

    const rows = (messages ?? []) as { id: string; conversation_id: string; body: string; created_at: string }[];
    const convIds = [...new Set(rows.map((m) => m.conversation_id))];

    const convMap = new Map<string, { external_ref: string | null; channel: string | null }>();
    if (convIds.length) {
      const { data: convs } = await admin
        .from("support_conversations" as never)
        .select("id, external_ref, channel")
        .in("id", convIds);
      for (const c of (convs ?? []) as { id: string; external_ref: string | null; channel: string | null }[]) {
        convMap.set(c.id, { external_ref: c.external_ref, channel: c.channel });
      }
    }

    return json(
      req,
      rows.map((m) => ({
        message_id: m.id,
        conversation_id: m.conversation_id,
        external_ref: convMap.get(m.conversation_id)?.external_ref ?? null,
        channel: convMap.get(m.conversation_id)?.channel ?? null,
        body: m.body,
        created_at: m.created_at,
      })),
    );
  } catch {
    return json(req, { error: "internal_error" }, 500);
  }
});
