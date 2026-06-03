// Deterministic triage guardrails. Pure + testable. Runs BEFORE / alongside the
// LLM so compliance-sensitive cases are never auto-resolved by AI, regardless of
// what the model says. The edge function (germany-support-triage) combines these
// rules with the LLM classification; rules win on safety.

export type TriageCategory =
  | "compliance"
  | "status"
  | "docs"
  | "logistics"
  | "commercial"
  | "other";

export type TriageUrgency = "low" | "normal" | "high" | "urgent";

export interface TriageRuleResult {
  category: TriageCategory;
  urgency: TriageUrgency;
  /** Compliance/legal/safety sensitive → never AI-auto-resolve. */
  complianceFlag: boolean;
  /** Minimum escalation tier the rules demand (0 = none forced). */
  forceTier: 0 | 2;
  /** Whether the rules permit AI auto-resolution (false if complianceFlag). */
  autoResolvable: boolean;
}

const COMPLIANCE = [
  "recall", "rückruf", "legal", "rechtlich", "lawsuit", "klage", "gdpr", "dsgvo",
  "datenschutz", "safety", "sicherheit", "contamination", "kontamination", "bfarm",
  "narcotic", "betäubungsmittel", "audit", "inspection", "inspektion", "deviation",
  "abweichung", "complaint", "beschwerde", "adverse", "nebenwirkung",
];
const URGENT = ["urgent", "dringend", "asap", "sofort", "emergency", "notfall", "immediately"];
const HIGH = ["important", "wichtig", "deadline", "frist", "blocked", "blockiert", "overdue", "überfällig"];

const CATEGORY_KEYWORDS: [TriageCategory, string[]][] = [
  ["status", ["status", "freigabe", "released", "qp ", "tracking", "wann", "when"]],
  ["docs", ["coa", "zertifikat", "certificate", "dokument", "document", "gacp", "gmp", "monograph"]],
  ["logistics", ["shipment", "lieferung", "versand", "logistics", "logistik", "carrier", "zoll", "customs"]],
  ["commercial", ["price", "preis", "angebot", "offer", "quote", "menge", "quantity", "order", "bestellung"]],
];

function hasAny(haystack: string, needles: string[]): boolean {
  return needles.some((n) => haystack.includes(n));
}

export function applyTriageRules(text: string): TriageRuleResult {
  const t = (text ?? "").toLowerCase();

  const complianceFlag = hasAny(t, COMPLIANCE);

  let urgency: TriageUrgency = "normal";
  if (hasAny(t, URGENT)) urgency = "urgent";
  else if (hasAny(t, HIGH)) urgency = "high";

  let category: TriageCategory = "other";
  if (complianceFlag) {
    category = "compliance";
  } else {
    for (const [cat, kws] of CATEGORY_KEYWORDS) {
      if (hasAny(t, kws)) {
        category = cat;
        break;
      }
    }
  }

  return {
    category,
    urgency,
    complianceFlag,
    forceTier: complianceFlag ? 2 : 0,
    autoResolvable: !complianceFlag,
  };
}
