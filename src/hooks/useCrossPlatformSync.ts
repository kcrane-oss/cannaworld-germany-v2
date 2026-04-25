import { supabase } from "@/integrations/supabase/client";

/**
 * Cross-platform sync utilities.
 * Automatically pushes events to AI Cert & CannaWorld Gateway
 * via the cross-platform-api edge function.
 */

type AuditSyncPayload = {
  batch_id: string;
  event_type: string;
  old_status?: string;
  new_status?: string;
  details?: Record<string, unknown>;
  user_id?: string;
};

type RegulatorySyncPayload = {
  update_id: string;
  title: string;
  country_code: string;
  country_name: string;
  severity: string;
  change_type: string;
  description: string;
  affected_batches?: number;
};

type ComplianceSyncPayload = {
  batch_id: string;
  batch_number: string;
  old_score?: string;
  new_score: string;
  details?: Record<string, unknown>;
};

async function invokeSync(action: string, payload: Record<string, unknown>) {
  try {
    const { data, error } = await supabase.functions.invoke("cross-platform-api", {
      body: { action, ...payload },
    });
    if (error) {
      console.error(`[cross-sync] ${action} error:`, error);
      return { success: false, error };
    }
    console.log(`[cross-sync] ${action} success:`, data);
    return { success: true, data };
  } catch (err) {
    console.error(`[cross-sync] ${action} exception:`, err);
    return { success: false, error: err };
  }
}

/** Push batch status changes to AI Cert & Gateway */
export async function syncAuditEvent(payload: AuditSyncPayload) {
  return invokeSync("audit_sync", payload);
}

/** Push regulatory alerts to AI Cert */
export async function syncRegulatoryAlert(payload: RegulatorySyncPayload) {
  return invokeSync("regulatory_sync", payload);
}

/** Push compliance score changes to AI Cert */
export async function syncComplianceScore(payload: ComplianceSyncPayload) {
  return invokeSync("compliance_sync", payload);
}

/** Convenience: notify across platforms */
export async function syncNotification(payload: {
  target_user_email?: string;
  title: string;
  message: string;
  type?: string;
  link?: string;
}) {
  return invokeSync("notify_sync", payload);
}
