// Presentation + signing helpers for the GxP batch lifecycle.

import type { BatchStatus, ScaSignaturePayload } from "./gxp-types";
import type { SupabaseClientLike } from "./supabase-client";

export interface StatusDescriptor {
  label_de: string;
  label_en: string;
  tone: "neutral" | "info" | "warning" | "critical" | "success" | "pending";
  is_human_gate: boolean;
  is_terminal: boolean;
}

export const STATUS_DESCRIPTORS: Record<BatchStatus, StatusDescriptor> = {
  // Legacy
  draft: { label_de: "Entwurf", label_en: "Draft", tone: "neutral", is_human_gate: false, is_terminal: false },
  document_review: { label_de: "Dokumentenprüfung", label_en: "Document Review", tone: "info", is_human_gate: false, is_terminal: false },
  pre_export_check: { label_de: "Vor-Export-Check", label_en: "Pre-Export Check", tone: "info", is_human_gate: false, is_terminal: false },
  approved: { label_de: "Freigegeben (Legacy)", label_en: "Approved (legacy)", tone: "success", is_human_gate: false, is_terminal: false },
  listed: { label_de: "Gelistet", label_en: "Listed", tone: "success", is_human_gate: false, is_terminal: false },
  sold: { label_de: "Verkauft", label_en: "Sold", tone: "success", is_human_gate: false, is_terminal: false },
  in_export: { label_de: "Im Export", label_en: "In Export", tone: "info", is_human_gate: false, is_terminal: false },
  completed: { label_de: "Abgeschlossen", label_en: "Completed", tone: "success", is_human_gate: false, is_terminal: true },
  // Thai-Seite
  ai_dossier_in_progress: { label_de: "Dossier (KI läuft)", label_en: "AI Dossier Building", tone: "pending", is_human_gate: false, is_terminal: false },
  dossier_blocked: { label_de: "Dossier blockiert", label_en: "Dossier Blocked", tone: "warning", is_human_gate: true, is_terminal: false },
  ready_for_thai_rp_release: { label_de: "Wartet auf Thai-RP", label_en: "Awaiting Thai RP", tone: "pending", is_human_gate: true, is_terminal: false },
  thai_rp_released: { label_de: "Thai-RP freigegeben", label_en: "Thai RP Released", tone: "success", is_human_gate: false, is_terminal: false },
  ready_for_thai_export_permit: { label_de: "Wartet auf Thai-FDA", label_en: "Awaiting Thai FDA", tone: "pending", is_human_gate: true, is_terminal: false },
  thai_export_permit_issued: { label_de: "Thai-FDA-Permit erteilt", label_en: "Thai FDA Permit Issued", tone: "success", is_human_gate: false, is_terminal: false },
  ready_for_customs_out: { label_de: "Wartet auf Zoll (out)", label_en: "Awaiting Customs Out", tone: "pending", is_human_gate: true, is_terminal: false },
  customs_out_cleared: { label_de: "Zoll (out) geklärt", label_en: "Customs Out Cleared", tone: "success", is_human_gate: false, is_terminal: false },
  // Transit
  in_transit_air: { label_de: "Transit (Luft)", label_en: "In Transit (Air)", tone: "info", is_human_gate: false, is_terminal: false },
  transit_anomaly: { label_de: "Transit-Anomalie", label_en: "Transit Anomaly", tone: "critical", is_human_gate: true, is_terminal: false },
  arrived_destination_airport: { label_de: "Am Zielflughafen", label_en: "Arrived at Destination", tone: "info", is_human_gate: false, is_terminal: false },
  // EU
  ready_for_eu_intake: { label_de: "Wartet auf EU-Empfang", label_en: "Awaiting EU Intake", tone: "pending", is_human_gate: true, is_terminal: false },
  eu_intake_received: { label_de: "EU-Empfang bestätigt", label_en: "EU Intake Received", tone: "success", is_human_gate: false, is_terminal: false },
  intake_rejected: { label_de: "EU-Empfang abgelehnt", label_en: "Intake Rejected", tone: "critical", is_human_gate: false, is_terminal: true },
  ready_for_eu_post_harvest: { label_de: "Wartet auf Post-Harvest", label_en: "Awaiting Post-Harvest", tone: "pending", is_human_gate: true, is_terminal: false },
  eu_post_harvest_in_progress: { label_de: "Post-Harvest läuft", label_en: "Post-Harvest in Progress", tone: "info", is_human_gate: true, is_terminal: false },
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
  ready_for_patient_dispense: { label_de: "Bereit für Patient", label_en: "Ready for Dispense", tone: "pending", is_human_gate: true, is_terminal: false },
  dispensed: { label_de: "An Patient abgegeben", label_en: "Dispensed", tone: "success", is_human_gate: false, is_terminal: true },
  // Querschnitt
  quarantined: { label_de: "Quarantäne", label_en: "Quarantined", tone: "warning", is_human_gate: true, is_terminal: false },
  rejected: { label_de: "Abgelehnt", label_en: "Rejected", tone: "critical", is_human_gate: false, is_terminal: true },
  recall_initiated: { label_de: "Recall gestartet", label_en: "Recall Initiated", tone: "critical", is_human_gate: true, is_terminal: false },
  recall_in_progress: { label_de: "Recall läuft", label_en: "Recall In Progress", tone: "critical", is_human_gate: false, is_terminal: false },
  recall_completed: { label_de: "Recall abgeschlossen", label_en: "Recall Completed", tone: "critical", is_human_gate: false, is_terminal: true },
};

export function describeStatus(status: BatchStatus | string | null | undefined): StatusDescriptor {
  if (!status) {
    return { label_de: "Unbekannt", label_en: "Unknown", tone: "neutral", is_human_gate: false, is_terminal: false };
  }
  return (
    STATUS_DESCRIPTORS[status as BatchStatus] ?? {
      label_de: status,
      label_en: status,
      tone: "neutral",
      is_human_gate: false,
      is_terminal: false,
    }
  );
}

export function statusToneClass(tone: StatusDescriptor["tone"]): string {
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

export function buildSignedText(opts: {
  action: string;
  batch_id: string;
  decision?: string;
  details?: Record<string, string>;
  signed_at_iso: string;
}): string {
  const lines = [
    `action=${opts.action}`,
    `batch=${opts.batch_id}`,
    opts.decision ? `decision=${opts.decision}` : null,
    ...Object.entries(opts.details ?? {}).map(([k, v]) => `${k}=${v}`),
    `at=${opts.signed_at_iso}`,
  ].filter(Boolean);
  return lines.join("\n");
}

export function validateScaPayload(
  p: Partial<ScaSignaturePayload>
): { ok: true } | { ok: false; error: string } {
  if (!p) return { ok: false, error: "missing_payload" };
  if (typeof p.signed_text !== "string" || p.signed_text.length < 10) {
    return { ok: false, error: "signed_text_too_short" };
  }
  if (!["totp", "webauthn", "smart_card"].includes(p.sca_method as string)) {
    return { ok: false, error: "invalid_sca_method" };
  }
  if (typeof p.sca_proof !== "string" || p.sca_proof.length < 4) {
    return { ok: false, error: "sca_proof_too_short" };
  }
  return { ok: true };
}

export async function invokeGxpEdgeFn<TReq = unknown, TRes = { ok: boolean; [k: string]: unknown }>(
  client: SupabaseClientLike,
  name: string,
  body: TReq
): Promise<TRes> {
  const { data, error } = await client.functions.invoke<TRes>(name, {
    body: body as Record<string, unknown>,
  });
  if (error) throw new Error(`edge_fn_failed:${name}:${error.message ?? String(error)}`);
  if (!data) throw new Error(`edge_fn_no_data:${name}`);
  return data;
}
