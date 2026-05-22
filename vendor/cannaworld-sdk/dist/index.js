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

// src/gxp-types.ts
var QP_INBOX_THAI = ["ready_for_thai_rp_release"];
var QP_INBOX_EU = ["ready_for_eu_qp_release"];
var EU_INTAKE_INBOX = ["ready_for_eu_intake"];
var POST_HARVEST_INBOX = ["ready_for_eu_post_harvest", "eu_post_harvest_in_progress"];
var WHOLESALE_HUB_INBOX = ["in_transit_to_wholesale_hub", "arrived_at_wholesale_hub"];
var PHARMACY_RECEIVE_INBOX = ["in_transit_to_pharmacy", "ready_for_pharmacy_dispatch"];
var PHARMACY_DISPENSE_INBOX = ["ready_for_patient_dispense", "received_at_pharmacy"];
var RECALL_ACTIVE = ["recall_initiated", "recall_in_progress"];
var MARKETPLACE_LISTABLE = [
  "approved",
  // Legacy
  "listed",
  // Legacy bereits gelistet
  "eu_qp_released",
  // Neu: EU-freigegeben, noch nicht im Hub
  "stored_at_wholesale_hub"
  // Neu: voll lagerfähig
];
async function hashBtmPrescription(prescriptionNo, salt) {
  const enc = new TextEncoder();
  const data = enc.encode(`${prescriptionNo}:${salt}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

// src/gxp-utils.ts
var STATUS_DESCRIPTORS = {
  // Legacy
  draft: { label_de: "Entwurf", label_en: "Draft", tone: "neutral", is_human_gate: false, is_terminal: false },
  document_review: { label_de: "Dokumentenpr\xFCfung", label_en: "Document Review", tone: "info", is_human_gate: false, is_terminal: false },
  pre_export_check: { label_de: "Vor-Export-Check", label_en: "Pre-Export Check", tone: "info", is_human_gate: false, is_terminal: false },
  approved: { label_de: "Freigegeben (Legacy)", label_en: "Approved (legacy)", tone: "success", is_human_gate: false, is_terminal: false },
  listed: { label_de: "Gelistet", label_en: "Listed", tone: "success", is_human_gate: false, is_terminal: false },
  sold: { label_de: "Verkauft", label_en: "Sold", tone: "success", is_human_gate: false, is_terminal: false },
  in_export: { label_de: "Im Export", label_en: "In Export", tone: "info", is_human_gate: false, is_terminal: false },
  completed: { label_de: "Abgeschlossen", label_en: "Completed", tone: "success", is_human_gate: false, is_terminal: true },
  // Thai-Seite
  ai_dossier_in_progress: { label_de: "Dossier (KI l\xE4uft)", label_en: "AI Dossier Building", tone: "pending", is_human_gate: false, is_terminal: false },
  dossier_blocked: { label_de: "Dossier blockiert", label_en: "Dossier Blocked", tone: "warning", is_human_gate: true, is_terminal: false },
  ready_for_thai_rp_release: { label_de: "Wartet auf Thai-RP", label_en: "Awaiting Thai RP", tone: "pending", is_human_gate: true, is_terminal: false },
  thai_rp_released: { label_de: "Thai-RP freigegeben", label_en: "Thai RP Released", tone: "success", is_human_gate: false, is_terminal: false },
  ready_for_thai_export_permit: { label_de: "Wartet auf Thai-FDA", label_en: "Awaiting Thai FDA", tone: "pending", is_human_gate: true, is_terminal: false },
  thai_export_permit_issued: { label_de: "Thai-FDA-Permit erteilt", label_en: "Thai FDA Permit Issued", tone: "success", is_human_gate: false, is_terminal: false },
  ready_for_customs_out: { label_de: "Wartet auf Zoll (out)", label_en: "Awaiting Customs Out", tone: "pending", is_human_gate: true, is_terminal: false },
  customs_out_cleared: { label_de: "Zoll (out) gekl\xE4rt", label_en: "Customs Out Cleared", tone: "success", is_human_gate: false, is_terminal: false },
  // Transit
  in_transit_air: { label_de: "Transit (Luft)", label_en: "In Transit (Air)", tone: "info", is_human_gate: false, is_terminal: false },
  transit_anomaly: { label_de: "Transit-Anomalie", label_en: "Transit Anomaly", tone: "critical", is_human_gate: true, is_terminal: false },
  arrived_destination_airport: { label_de: "Am Zielflughafen", label_en: "Arrived at Destination", tone: "info", is_human_gate: false, is_terminal: false },
  // EU
  ready_for_eu_intake: { label_de: "Wartet auf EU-Empfang", label_en: "Awaiting EU Intake", tone: "pending", is_human_gate: true, is_terminal: false },
  eu_intake_received: { label_de: "EU-Empfang best\xE4tigt", label_en: "EU Intake Received", tone: "success", is_human_gate: false, is_terminal: false },
  intake_rejected: { label_de: "EU-Empfang abgelehnt", label_en: "Intake Rejected", tone: "critical", is_human_gate: false, is_terminal: true },
  ready_for_eu_post_harvest: { label_de: "Wartet auf Post-Harvest", label_en: "Awaiting Post-Harvest", tone: "pending", is_human_gate: true, is_terminal: false },
  eu_post_harvest_in_progress: { label_de: "Post-Harvest l\xE4uft", label_en: "Post-Harvest in Progress", tone: "info", is_human_gate: true, is_terminal: false },
  eu_post_harvest_completed: { label_de: "Post-Harvest fertig", label_en: "Post-Harvest Completed", tone: "success", is_human_gate: false, is_terminal: false },
  ready_for_eu_qp_release: { label_de: "Wartet auf EU-QP", label_en: "Awaiting EU QP", tone: "pending", is_human_gate: true, is_terminal: false },
  eu_qp_released: { label_de: "EU-QP freigegeben", label_en: "EU QP Released", tone: "success", is_human_gate: false, is_terminal: false },
  eu_qp_rejected: { label_de: "EU-QP abgelehnt", label_en: "EU QP Rejected", tone: "critical", is_human_gate: false, is_terminal: true },
  ready_for_gdp_dispatch: { label_de: "Wartet auf GDP-Versand", label_en: "Awaiting GDP Dispatch", tone: "pending", is_human_gate: true, is_terminal: false },
  in_transit_to_wholesale_hub: { label_de: "Transit zum Hub", label_en: "In Transit to Hub", tone: "info", is_human_gate: false, is_terminal: false },
  arrived_at_wholesale_hub: { label_de: "Im Hub angekommen", label_en: "Arrived at Hub", tone: "info", is_human_gate: false, is_terminal: false },
  stored_at_wholesale_hub: { label_de: "Im Hub gelagert", label_en: "Stored at Hub", tone: "success", is_human_gate: false, is_terminal: false },
  ready_for_pharmacy_dispatch: { label_de: "Bereit zur Apotheke", label_en: "Ready for Pharmacy", tone: "pending", is_human_gate: true, is_terminal: false },
  in_transit_to_pharmacy: { label_de: "Transit zur Apotheke", label_en: "In Transit to Pharmacy", tone: "info", is_human_gate: false, is_terminal: false },
  received_at_pharmacy: { label_de: "Apotheke hat empfangen", label_en: "Received at Pharmacy", tone: "success", is_human_gate: false, is_terminal: false },
  ready_for_patient_dispense: { label_de: "Bereit f\xFCr Patient", label_en: "Ready for Dispense", tone: "pending", is_human_gate: true, is_terminal: false },
  dispensed: { label_de: "An Patient abgegeben", label_en: "Dispensed", tone: "success", is_human_gate: false, is_terminal: true },
  // Querschnitt
  quarantined: { label_de: "Quarant\xE4ne", label_en: "Quarantined", tone: "warning", is_human_gate: true, is_terminal: false },
  rejected: { label_de: "Abgelehnt", label_en: "Rejected", tone: "critical", is_human_gate: false, is_terminal: true },
  recall_initiated: { label_de: "Recall gestartet", label_en: "Recall Initiated", tone: "critical", is_human_gate: true, is_terminal: false },
  recall_in_progress: { label_de: "Recall l\xE4uft", label_en: "Recall In Progress", tone: "critical", is_human_gate: false, is_terminal: false },
  recall_completed: { label_de: "Recall abgeschlossen", label_en: "Recall Completed", tone: "critical", is_human_gate: false, is_terminal: true }
};
function describeStatus(status) {
  if (!status) {
    return { label_de: "Unbekannt", label_en: "Unknown", tone: "neutral", is_human_gate: false, is_terminal: false };
  }
  return STATUS_DESCRIPTORS[status] ?? {
    label_de: status,
    label_en: status,
    tone: "neutral",
    is_human_gate: false,
    is_terminal: false
  };
}
function statusToneClass(tone) {
  switch (tone) {
    case "success":
      return "bg-emerald-100 text-emerald-800 border-emerald-300";
    case "info":
      return "bg-sky-100 text-sky-800 border-sky-300";
    case "warning":
      return "bg-amber-100 text-amber-800 border-amber-300";
    case "critical":
      return "bg-rose-100 text-rose-800 border-rose-300";
    case "pending":
      return "bg-violet-100 text-violet-800 border-violet-300";
    default:
      return "bg-slate-100 text-slate-800 border-slate-300";
  }
}
function buildSignedText(opts) {
  const lines = [
    `action=${opts.action}`,
    `batch=${opts.batch_id}`,
    opts.decision ? `decision=${opts.decision}` : null,
    ...Object.entries(opts.details ?? {}).map(([k, v]) => `${k}=${v}`),
    `at=${opts.signed_at_iso}`
  ].filter(Boolean);
  return lines.join("\n");
}
function validateScaPayload(p) {
  if (!p) return { ok: false, error: "missing_payload" };
  if (typeof p.signed_text !== "string" || p.signed_text.length < 10) {
    return { ok: false, error: "signed_text_too_short" };
  }
  if (!["totp", "webauthn", "smart_card"].includes(p.sca_method)) {
    return { ok: false, error: "invalid_sca_method" };
  }
  if (typeof p.sca_proof !== "string" || p.sca_proof.length < 4) {
    return { ok: false, error: "sca_proof_too_short" };
  }
  return { ok: true };
}
async function invokeGxpEdgeFn(client, name, body) {
  const { data, error } = await client.functions.invoke(name, { body });
  if (error) throw new Error(`edge_fn_failed:${name}:${error.message ?? String(error)}`);
  if (!data) throw new Error(`edge_fn_no_data:${name}`);
  return data;
}
export {
  EU_INTAKE_INBOX,
  MARKETPLACE_LISTABLE,
  PHARMACY_DISPENSE_INBOX,
  PHARMACY_RECEIVE_INBOX,
  POST_HARVEST_INBOX,
  QP_INBOX_EU,
  QP_INBOX_THAI,
  RECALL_ACTIVE,
  STATUS_DESCRIPTORS,
  WHOLESALE_HUB_INBOX,
  aggregateRegulatoryUpdates,
  analyzeTargetMarkets,
  auditQuery,
  auditSync,
  buildSignedText,
  checkConnectionStatus,
  checkMarketplaceHealth,
  complianceSync,
  createMarketplaceOrder,
  describeStatus,
  getMarketplaceBatch,
  getMarketplaceStats,
  getPayloadError,
  getRegulations,
  getRegulatoryUpdates2 as getSourceRegulatoryUpdates,
  getSupabaseClient,
  getRegulatoryUpdates as getTargetMarketRegulatoryUpdates,
  hashBtmPrescription,
  invokeGxpEdgeFn,
  listMarketplaceBatches,
  notifySync,
  readResponseError,
  regulatorySync,
  runRegulatoryAiScan,
  setSupabaseClient,
  statusToneClass,
  syncRegulatoryAlert,
  toErrorMessage,
  triggerAiCertScan,
  triggerMarketplaceScan,
  updateMarketplaceOrder,
  validateScaPayload,
  verifyCertificateViaMarketplace
};
