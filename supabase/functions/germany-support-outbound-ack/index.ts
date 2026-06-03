import { codexAuthorized, corsHeaders, json, serviceClient } from "../_shared/cors.ts";

/**
 * germany-support-outbound-ack  (Codex → Back-Office)
 *
 * Codex confirms an outbound message was sent → delivered=true.
 * See docs/backoffice/codex-contract.md §4. Service-to-service (CODEX_SERVICE_TOKEN).
 */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders(req) });
  if (req.method !== "POST") return json(req, { error: "method_not_allowed" }, 405);
  if (!codexAuthorized(req)) return json(req, { error: "unauthorized" }, 401);

  try {
    const body = await req.json().catch(() => ({}));
    const messageId = String(body.message_id ?? "").trim();
    if (!messageId) return json(req, { error: "message_id_required" }, 400);

    const admin = serviceClient();
    const { error } = await admin
      .from("support_messages" as never)
      .update({ delivered: true })
      .eq("id", messageId)
      .eq("direction", "outbound");
    if (error) return json(req, { error: "ack_failed" }, 500);

    return json(req, { message_id: messageId, delivered: true });
  } catch {
    return json(req, { error: "internal_error" }, 500);
  }
});
