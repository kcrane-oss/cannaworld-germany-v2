/**
 * EU GMP Annex 16 — Certification by a Qualified Person and Batch Release
 * (https://health.ec.europa.eu/system/files/2016-11/2015_annex16_en_0.pdf)
 *
 * The QP must verify each of the items below before certifying batch release.
 * "critical" items must be checked; "informational" items capture relevant
 * context (drug-substance origin, contractor agreements, etc.) and should
 * normally be checked, but allow narrative commentary instead.
 */
export interface Annex16Item {
  key: string;
  label: string;
  reference: string;
  critical: boolean;
}

export const ANNEX_16_CHECKLIST: Annex16Item[] = [
  {
    key: "personnel",
    label: "Personnel: all critical operations performed by trained, qualified staff",
    reference: "Annex 16 §1.7.1",
    critical: true,
  },
  {
    key: "premises_equipment",
    label: "Premises and equipment qualified for the manufacturing operations",
    reference: "Annex 16 §1.7.2",
    critical: true,
  },
  {
    key: "manufacturing_process",
    label: "Process validated and operated under the approved master batch record",
    reference: "Annex 16 §1.7.3",
    critical: true,
  },
  {
    key: "starting_materials",
    label: "Starting materials and primary packaging sampled, tested, and released",
    reference: "Annex 16 §1.7.4",
    critical: true,
  },
  {
    key: "intermediates",
    label: "Bulk and intermediates tested at the points specified by the process",
    reference: "Annex 16 §1.7.5",
    critical: false,
  },
  {
    key: "batch_record_review",
    label: "Batch processing and packaging records reviewed and signed",
    reference: "Annex 16 §1.7.6",
    critical: true,
  },
  {
    key: "deviations",
    label: "All deviations investigated, evaluated, and documented (CAPA where required)",
    reference: "Annex 16 §1.7.7",
    critical: true,
  },
  {
    key: "qc_results",
    label: "Quality Control test results within specification (CoA reviewed)",
    reference: "Annex 16 §1.7.8",
    critical: true,
  },
  {
    key: "stability",
    label: "Ongoing stability programme covers this product/strength",
    reference: "Annex 16 §1.7.9",
    critical: false,
  },
  {
    key: "complaints_recalls",
    label: "Complaints, recalls, returns assessed for impact on this batch",
    reference: "Annex 16 §1.7.10",
    critical: false,
  },
  {
    key: "self_inspection",
    label: "Recent self-inspection findings reviewed, no critical open observations",
    reference: "Annex 16 §1.7.11",
    critical: false,
  },
  {
    key: "marketing_authorisation",
    label: "Manufacturing operations comply with the Marketing Authorisation",
    reference: "Annex 16 §1.7.12",
    critical: true,
  },
  {
    key: "labelling_outer_packaging",
    label: "Labelling and outer packaging compliant with national/EU requirements",
    reference: "Annex 16 §1.7.13",
    critical: true,
  },
  {
    key: "import_documentation",
    label: "For imports: full QP confirmation chain from third-country site available",
    reference: "Annex 16 §1.5.1",
    critical: true,
  },
];

export type ChecklistState = Record<string, { checked: boolean; comment?: string }>;

export function isChecklistComplete(state: ChecklistState): { ok: boolean; missing: string[] } {
  const missing: string[] = [];
  for (const item of ANNEX_16_CHECKLIST) {
    if (item.critical && !state[item.key]?.checked) {
      missing.push(item.key);
    }
  }
  return { ok: missing.length === 0, missing };
}

export function emptyChecklistState(): ChecklistState {
  const s: ChecklistState = {};
  for (const item of ANNEX_16_CHECKLIST) s[item.key] = { checked: false };
  return s;
}
