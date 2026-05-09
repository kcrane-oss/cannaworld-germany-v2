"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  aggregateRegulatoryUpdates: () => aggregateRegulatoryUpdates,
  analyzeTargetMarkets: () => analyzeTargetMarkets,
  auditQuery: () => auditQuery,
  auditSync: () => auditSync,
  checkConnectionStatus: () => checkConnectionStatus,
  checkMarketplaceHealth: () => checkMarketplaceHealth,
  complianceSync: () => complianceSync,
  createMarketplaceOrder: () => createMarketplaceOrder,
  getMarketplaceBatch: () => getMarketplaceBatch,
  getMarketplaceStats: () => getMarketplaceStats,
  getPayloadError: () => getPayloadError,
  getRegulations: () => getRegulations,
  getSourceRegulatoryUpdates: () => getRegulatoryUpdates2,
  getSupabaseClient: () => getSupabaseClient,
  getTargetMarketRegulatoryUpdates: () => getRegulatoryUpdates,
  listMarketplaceBatches: () => listMarketplaceBatches,
  notifySync: () => notifySync,
  readResponseError: () => readResponseError,
  regulatorySync: () => regulatorySync,
  runRegulatoryAiScan: () => runRegulatoryAiScan,
  setSupabaseClient: () => setSupabaseClient,
  syncRegulatoryAlert: () => syncRegulatoryAlert,
  toErrorMessage: () => toErrorMessage,
  triggerAiCertScan: () => triggerAiCertScan,
  triggerMarketplaceScan: () => triggerMarketplaceScan,
  updateMarketplaceOrder: () => updateMarketplaceOrder,
  verifyCertificateViaMarketplace: () => verifyCertificateViaMarketplace
});
module.exports = __toCommonJS(index_exports);

// src/api-errors.ts
var toErrorMessage = (error, fallback = "Unknown error") => {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error.trim()) return error;
  if (typeof error === "object" && error !== null && "message" in error) {
    const message = error.message;
    if (typeof message === "string" && message.trim()) return message;
  }
  return fallback;
};
var getPayloadError = (payload) => {
  if (typeof payload !== "object" || payload === null || !("error" in payload)) return null;
  const error = payload.error;
  return error ? toErrorMessage(error, "Request failed") : null;
};
var readResponseError = async (response, fallback = "Request failed") => {
  const text = await response.text();
  const detail = text.trim();
  return detail ? `${fallback} (${response.status}): ${detail}` : `${fallback} (${response.status})`;
};

// src/supabase-client.ts
var supabaseClient = null;
var setSupabaseClient = (client) => {
  supabaseClient = client;
};
var getSupabaseClient = () => {
  if (!supabaseClient) {
    throw new Error("CannaWorld SDK supabase client not configured. Call setSupabaseClient(client) before using API helpers.");
  }
  return supabaseClient;
};

// src/marketplace-api.ts
async function invokeMarketplace(body) {
  try {
    const { data, error } = await getSupabaseClient().functions.invoke("marketplace-proxy", { body });
    if (error) {
      return { data: null, error: error.message || "Request failed" };
    }
    const payloadError = getPayloadError(data);
    if (payloadError) {
      return { data: null, error: payloadError };
    }
    return { data, error: null };
  } catch (err) {
    return { data: null, error: toErrorMessage(err) };
  }
}
async function listMarketplaceBatches(filters) {
  return invokeMarketplace({
    action: "list_batches",
    ...filters
  });
}
async function getMarketplaceBatch(batchId) {
  return invokeMarketplace({
    action: "get_batch",
    batch_id: batchId
  });
}
async function getMarketplaceStats() {
  return invokeMarketplace({
    action: "stats"
  });
}
async function createMarketplaceOrder(batchId, quantity, notes) {
  return invokeMarketplace({
    action: "create_order",
    batch_id: batchId,
    quantity,
    notes
  });
}
async function updateMarketplaceOrder(orderId, status) {
  return invokeMarketplace({
    action: "update_order",
    order_id: orderId,
    status
  });
}
async function checkMarketplaceHealth() {
  return invokeMarketplace({
    action: "health"
  });
}
async function auditSync(params) {
  return invokeMarketplace({
    action: "audit_sync",
    ...params
  });
}
async function notifySync(params) {
  return invokeMarketplace({
    action: "notify_sync",
    ...params
  });
}
async function checkConnectionStatus() {
  return invokeMarketplace({
    action: "connection_status"
  });
}
async function verifyCertificateViaMarketplace(certificateNumber) {
  return invokeMarketplace({
    action: "verify_certificate",
    certificate_number: certificateNumber
  });
}
async function regulatorySync(params) {
  return invokeMarketplace({
    action: "regulatory_sync",
    ...params
  });
}
async function complianceSync(params) {
  return invokeMarketplace({
    action: "compliance_sync",
    ...params
  });
}
async function auditQuery(subAction, params) {
  return invokeMarketplace({
    action: "audit_query",
    sub_action: subAction,
    ...params
  });
}

// src/target-market-api.ts
async function invokeTargetMarket(body) {
  try {
    const { data, error } = await getSupabaseClient().functions.invoke("target-market-proxy", { body });
    if (error) return { data: null, error: error.message || "Request failed" };
    const payloadError = getPayloadError(data);
    if (payloadError) return { data: null, error: payloadError };
    return { data, error: null };
  } catch (err) {
    return { data: null, error: toErrorMessage(err) };
  }
}
var analyzeTargetMarkets = (batch) => invokeTargetMarket({ action: "analyze", ...batch });
var getRegulations = () => invokeTargetMarket({ action: "get_regulations" });
var runRegulatoryAiScan = () => invokeTargetMarket({ action: "ai_scan" });
var getRegulatoryUpdates = () => invokeTargetMarket({ action: "get_updates" });

// src/regulatory-api.ts
async function invokeRegulatoryProxy(body) {
  try {
    const { data, error } = await getSupabaseClient().functions.invoke("regulatory-proxy", { body });
    if (error) return { data: null, error: error.message || "Request failed" };
    const payloadError = getPayloadError(data);
    if (payloadError) return { data: null, error: payloadError };
    return { data, error: null };
  } catch (err) {
    return { data: null, error: toErrorMessage(err) };
  }
}
var aggregateRegulatoryUpdates = () => invokeRegulatoryProxy({ action: "aggregate" });
var syncRegulatoryAlert = (alert) => invokeRegulatoryProxy({ action: "sync", ...alert });
var getRegulatoryUpdates2 = (source) => invokeRegulatoryProxy({ action: "get_updates", source });
var triggerAiCertScan = () => invokeRegulatoryProxy({ action: "ai_cert_scan" });
var triggerMarketplaceScan = () => invokeRegulatoryProxy({ action: "marketplace_scan" });
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  aggregateRegulatoryUpdates,
  analyzeTargetMarkets,
  auditQuery,
  auditSync,
  checkConnectionStatus,
  checkMarketplaceHealth,
  complianceSync,
  createMarketplaceOrder,
  getMarketplaceBatch,
  getMarketplaceStats,
  getPayloadError,
  getRegulations,
  getSourceRegulatoryUpdates,
  getSupabaseClient,
  getTargetMarketRegulatoryUpdates,
  listMarketplaceBatches,
  notifySync,
  readResponseError,
  regulatorySync,
  runRegulatoryAiScan,
  setSupabaseClient,
  syncRegulatoryAlert,
  toErrorMessage,
  triggerAiCertScan,
  triggerMarketplaceScan,
  updateMarketplaceOrder,
  verifyCertificateViaMarketplace
});
