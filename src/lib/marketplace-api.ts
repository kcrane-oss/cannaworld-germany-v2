import { supabase } from "@/integrations/supabase/client";
import { getPayloadError, toErrorMessage, type ApiResult, type JsonRecord } from "@cannaworld/sdk";

export interface MarketplaceBatch {
  id: string;
  batch_number: string;
  product: string;
  strain: string;
  category: string;
  certification: string;
  thc: number;
  cbd: number;
  quantity: number;
  unit: string;
  origin: string;
  target_markets: string[];
  status: string;
  price: number;
  compliance_score: string;
  image_url: string | null;
  created_at: string;
}

export interface MarketplaceStats {
  total_batches: number;
  listed_batches: number;
  total_exporters: number;
  categories: Record<string, number>;
  certifications: Record<string, number>;
}

export interface MarketplaceOrder {
  id?: string;
  order_id?: string;
  status: string;
  [key: string]: unknown;
}

export interface SyncEnvelope {
  success: boolean;
  ai_cert_sync?: JsonRecord;
  audit_entry?: JsonRecord;
}

async function invokeMarketplace<T>(body: JsonRecord): Promise<ApiResult<T>> {
  try {
    const { data, error } = await supabase.functions.invoke("marketplace-proxy", { body });

    if (error) {
      return { data: null, error: error.message || "Request failed" };
    }

    const payloadError = getPayloadError(data);
    if (payloadError) {
      return { data: null, error: payloadError };
    }

    return { data: data as T, error: null };
  } catch (err: unknown) {
    return { data: null, error: toErrorMessage(err) };
  }
}

/** List batches from the marketplace */
export async function listMarketplaceBatches(filters?: {
  status?: string;
  category?: string;
  certification?: string;
  market?: string;
  limit?: number;
  offset?: number;
}) {
  return invokeMarketplace<{ batches: MarketplaceBatch[]; count: number }>({
    action: "list_batches",
    ...filters,
  });
}

/** Get a single batch detail */
export async function getMarketplaceBatch(batchId: string) {
  return invokeMarketplace<MarketplaceBatch>({
    action: "get_batch",
    batch_id: batchId,
  });
}

/** Get marketplace KPIs */
export async function getMarketplaceStats() {
  return invokeMarketplace<MarketplaceStats>({
    action: "stats",
  });
}

/** Create an order for a batch */
export async function createMarketplaceOrder(batchId: string, quantity: number, notes?: string) {
  return invokeMarketplace<{ order_id: string; status: string }>({
    action: "create_order",
    batch_id: batchId,
    quantity,
    notes,
  });
}

/** Update order status */
export async function updateMarketplaceOrder(orderId: string, status: string) {
  return invokeMarketplace<{ order: MarketplaceOrder }>({
    action: "update_order",
    order_id: orderId,
    status,
  });
}

/** Check marketplace health */
export async function checkMarketplaceHealth() {
  return invokeMarketplace<{ connected: boolean }>({
    action: "health",
  });
}

/** Push audit sync event to marketplace */
export async function auditSync(params: {
  batch_id: string;
  event_type: string;
  old_status?: string;
  new_status?: string;
  details?: string;
}) {
  return invokeMarketplace<SyncEnvelope>({
    action: "audit_sync",
    ...params,
  });
}

/** Send cross-project notification */
export async function notifySync(params: {
  title: string;
  message: string;
  target_user_email?: string;
  type?: string;
  link?: string;
}) {
  return invokeMarketplace<{ success: boolean }>({
    action: "notify_sync",
    ...params,
  });
}

/** Check cross-project connection status */
export async function checkConnectionStatus() {
  return invokeMarketplace<{
    platform: string;
    timestamp: string;
    connections: Record<string, { status: string; [key: string]: unknown }>;
  }>({
    action: "connection_status",
  });
}

/** Verify certificate via marketplace → AI Cert */
export async function verifyCertificateViaMarketplace(certificateNumber: string) {
  return invokeMarketplace<{ verified: boolean; certificate: JsonRecord }>({
    action: "verify_certificate",
    certificate_number: certificateNumber,
  });
}

/** Push regulatory alert to marketplace */
export async function regulatorySync(params: {
  title: string;
  country_code: string;
  country_name?: string;
  severity?: string;
  change_type?: string;
  description?: string;
}) {
  return invokeMarketplace<SyncEnvelope>({
    action: "regulatory_sync",
    ...params,
  });
}

/** Push compliance score change */
export async function complianceSync(params: {
  batch_id: string;
  batch_number?: string;
  old_score?: string;
  new_score: string;
  details?: string;
}) {
  return invokeMarketplace<SyncEnvelope>({
    action: "compliance_sync",
    ...params,
  });
}

/** Query audit data from AI Cert via marketplace */
export async function auditQuery(subAction: string, params?: { audit_id?: string; company_id?: string }) {
  return invokeMarketplace<JsonRecord>({
    action: "audit_query",
    sub_action: subAction,
    ...params,
  });
}
