import { supabase } from "@/integrations/supabase/client";

interface WebhookSendOptions {
  event_type: string;
  entity_type: string;
  entity_id?: string;
  target_platform?: string;
  payload?: Record<string, unknown>;
}

interface WebhookSendResponse {
  success: boolean;
  event_id: string;
  integrity_hash: string;
  received_at: string;
}

interface WebhookQueryOptions {
  event_type?: string;
  entity_type?: string;
  entity_id?: string;
  since?: string;
  limit?: number;
}

interface WebhookQueryResponse {
  events: Record<string, unknown>[];
  count: number;
}

interface WebhookVerifyResponse {
  verified: boolean;
  integrity_hash: string;
}

async function invokeWebhook<T>(body: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke("webhook-events", { body });

  if (error) {
    throw new Error(error.message || "Webhook request failed");
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data as T;
}

/** Send a webhook event to the central CannaBridge gateway */
export async function sendWebhookEvent(options: WebhookSendOptions): Promise<WebhookSendResponse> {
  return invokeWebhook<WebhookSendResponse>({ action: "send", ...options });
}

/** Query webhook events from the central gateway (returns empty on failure) */
export async function queryWebhookEvents(options: WebhookQueryOptions = {}): Promise<WebhookQueryResponse> {
  try {
    const { data, error } = await supabase.functions.invoke("webhook-events", {
      body: { action: "query", ...options },
    });
    if (error || data?.error) {
      console.warn("Webhook query unavailable:", error?.message || data?.error);
      return { events: [], count: 0 };
    }
    return data as WebhookQueryResponse;
  } catch {
    return { events: [], count: 0 };
  }
}

/** Verify event integrity (GMP audit trail) */
export async function verifyWebhookEvent(eventId: string): Promise<WebhookVerifyResponse> {
  return invokeWebhook<WebhookVerifyResponse>({ action: "verify", event_id: eventId });
}

// ── Convenience functions for common events ──

export async function trackOrderShipped(orderId: string, payload: Record<string, unknown>) {
  return sendWebhookEvent({ event_type: "order.shipped", entity_type: "order", entity_id: orderId, payload });
}

export async function trackQualityCheckPassed(batchId: string, payload: Record<string, unknown>) {
  return sendWebhookEvent({ event_type: "quality.check_passed", entity_type: "batch", entity_id: batchId, payload });
}

export async function trackShipmentDelivered(shipmentId: string, payload: Record<string, unknown>) {
  return sendWebhookEvent({ event_type: "shipment.delivered", entity_type: "shipment", entity_id: shipmentId, payload });
}

export async function trackShipmentStatusChanged(shipmentId: string, oldStatus: string, newStatus: string, payload: Record<string, unknown> = {}) {
  return sendWebhookEvent({ event_type: `shipment.${newStatus}`, entity_type: "shipment", entity_id: shipmentId, payload: { old_status: oldStatus, new_status: newStatus, ...payload } });
}

export async function trackTradeCaseStatusChanged(tradeCaseId: string, oldStatus: string, newStatus: string, payload: Record<string, unknown> = {}) {
  return sendWebhookEvent({ event_type: `trade_case.${newStatus}`, entity_type: "trade_case", entity_id: tradeCaseId, payload: { old_status: oldStatus, new_status: newStatus, ...payload } });
}

export async function trackCustomsCleared(shipmentId: string, payload: Record<string, unknown> = {}) {
  return sendWebhookEvent({ event_type: "shipment.customs_cleared", entity_type: "shipment", entity_id: shipmentId, payload });
}
