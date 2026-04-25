import { supabase } from "@/integrations/supabase/client";

interface SyncResult {
  success: boolean;
  sync_results: Record<string, unknown>;
}

/**
 * Notify all connected platforms when a shipment status changes.
 * Syncs: Trade Case ↔ Shipment, AI Cert Webhook, Temperature Alerts
 */
export async function syncShipmentStatusChange(
  shipmentId: string,
  oldStatus: string,
  newStatus: string,
  shipmentNumber: string
): Promise<SyncResult> {
  try {
    const { data, error } = await supabase.functions.invoke("logistics-sync", {
      body: {
        action: "shipment_status_changed",
        shipment_id: shipmentId,
        old_status: oldStatus,
        new_status: newStatus,
        shipment_number: shipmentNumber,
      },
    });
    if (error) throw error;
    return data as SyncResult;
  } catch (e) {
    console.warn("Shipment sync failed (non-blocking):", e);
    return { success: false, sync_results: { error: "sync_unavailable" } };
  }
}

/**
 * Notify all connected platforms when a trade case status changes.
 * Syncs: Linked Shipments, AI Cert Webhook, Completion %
 */
export async function syncTradeCaseStatusChange(
  tradeCaseId: string,
  oldStatus: string,
  newStatus: string,
  caseNumber: string
): Promise<SyncResult> {
  try {
    const { data, error } = await supabase.functions.invoke("logistics-sync", {
      body: {
        action: "trade_case_status_changed",
        trade_case_id: tradeCaseId,
        old_status: oldStatus,
        new_status: newStatus,
        case_number: caseNumber,
      },
    });
    if (error) throw error;
    return data as SyncResult;
  } catch (e) {
    console.warn("Trade case sync failed (non-blocking):", e);
    return { success: false, sync_results: { error: "sync_unavailable" } };
  }
}

/**
 * Notify Marketplace + AI Cert when customs status changes.
 * Triggers: Marketplace availability update, customs alerts
 */
export async function syncCustomsStatusChange(
  shipmentId: string,
  newCustomsStatus: string,
  shipmentNumber: string
): Promise<SyncResult> {
  try {
    const { data, error } = await supabase.functions.invoke("logistics-sync", {
      body: {
        action: "customs_status_changed",
        shipment_id: shipmentId,
        new_customs_status: newCustomsStatus,
        shipment_number: shipmentNumber,
      },
    });
    if (error) throw error;
    return data as SyncResult;
  } catch (e) {
    console.warn("Customs sync failed (non-blocking):", e);
    return { success: false, sync_results: { error: "sync_unavailable" } };
  }
}
