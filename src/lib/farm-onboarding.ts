// Weg D — Tiered Digital Onboarding-Funnel: domain logic.
// Pure, framework-free functions so the funnel state machine, self-assessment
// scoring and tier gates are unit-testable without a DB or React.
// See docs/strategie/wege-a-b-d-f-vertiefung.md (Weg D) and
// docs/strategie/onboarding-datenmodell.md for the model behind this.

export const FARM_TIERS = [
  "tier_0_registered",
  "tier_1_gacp_ready",
  "tier_2_gacp_certified",
  "tier_3_hub_linked",
] as const;

export type FarmTier = (typeof FARM_TIERS)[number];

/** i18n key + German fallback for each tier (used by the funnel UI). */
export const FARM_TIER_LABELS: Record<FarmTier, { key: string; de: string }> = {
  tier_0_registered: { key: "farmFunnel.tier0", de: "Registriert" },
  tier_1_gacp_ready: { key: "farmFunnel.tier1", de: "GACP-bereit" },
  tier_2_gacp_certified: { key: "farmFunnel.tier2", de: "GACP-zertifiziert" },
  tier_3_hub_linked: { key: "farmFunnel.tier3", de: "Hub-angebunden" },
};

export function tierIndex(tier: FarmTier): number {
  return FARM_TIERS.indexOf(tier);
}

/** The next tier in the funnel, or null if already at the terminal tier. */
export function nextTier(tier: FarmTier): FarmTier | null {
  const i = tierIndex(tier);
  return i >= 0 && i < FARM_TIERS.length - 1 ? FARM_TIERS[i + 1] : null;
}

// --- Self-assessment (Tier 0 -> 1, fully automated) ---------------------------

/**
 * Self-assessment questionnaire. Each affirmative answer contributes equally to
 * a 0-100 readiness score. Kept boolean + flat so it maps 1:1 to a form.
 */
export interface SelfAssessmentAnswers {
  hasDocumentedSOPs: boolean;
  tracksPesticideUse: boolean;
  hasBatchTraceability: boolean;
  hasTrainedStaff: boolean;
  hasSecureStorage: boolean;
}

export const SELF_ASSESSMENT_QUESTIONS: (keyof SelfAssessmentAnswers)[] = [
  "hasDocumentedSOPs",
  "tracksPesticideUse",
  "hasBatchTraceability",
  "hasTrainedStaff",
  "hasSecureStorage",
];

/** A farm must reach this readiness score to clear the remote pre-audit gate. */
export const PRE_AUDIT_PASS_THRESHOLD = 80;

/** Score the self-assessment as a 0-100 percentage of affirmative answers. */
export function scoreSelfAssessment(answers: SelfAssessmentAnswers): number {
  const total = SELF_ASSESSMENT_QUESTIONS.length;
  const yes = SELF_ASSESSMENT_QUESTIONS.filter((q) => answers[q]).length;
  return Math.round((yes / total) * 100);
}

// --- Tier gates ---------------------------------------------------------------

/** Evidence the platform has gathered for a producer, used to evaluate gates. */
export interface FarmGateInput {
  selfAssessmentScore: number | null;
  preAuditPassed: boolean;
  hasValidGacpCertificate: boolean;
  hasSupplyAgreement: boolean;
  linkedHubGmpCertified: boolean;
}

export interface GateResult {
  /** Whether the producer may advance to the next tier. */
  allowed: boolean;
  /** i18n keys of the requirements still missing (empty when allowed). */
  missing: string[];
  /** The tier the producer would advance to, or null at the terminal tier. */
  target: FarmTier | null;
}

/**
 * Evaluate whether a producer at `from` may advance one tier. Gates are
 * server-enforced in production (Edge Function + RLS); this mirrors the rules
 * for UX and is the single source of truth the UI and tests share.
 */
export function evaluateGate(from: FarmTier, input: FarmGateInput): GateResult {
  const target = nextTier(from);
  const missing: string[] = [];

  switch (from) {
    case "tier_0_registered":
      if ((input.selfAssessmentScore ?? 0) < PRE_AUDIT_PASS_THRESHOLD) {
        missing.push("farmFunnel.gate.selfAssessment");
      }
      if (!input.preAuditPassed) missing.push("farmFunnel.gate.preAudit");
      break;
    case "tier_1_gacp_ready":
      if (!input.hasValidGacpCertificate) missing.push("farmFunnel.gate.gacpCert");
      break;
    case "tier_2_gacp_certified":
      if (!input.hasSupplyAgreement) missing.push("farmFunnel.gate.supplyAgreement");
      if (!input.linkedHubGmpCertified) missing.push("farmFunnel.gate.hubGmp");
      break;
    case "tier_3_hub_linked":
      // Terminal: no further tier to advance to.
      break;
  }

  return { allowed: target !== null && missing.length === 0, missing, target };
}

// --- Funnel metrics (KPIs for the platform lever) -----------------------------

export interface FunnelStageMetric {
  tier: FarmTier;
  /** Producers currently sitting at this tier. */
  count: number;
  /** Producers at this tier or beyond (cumulative funnel depth). */
  atOrBeyond: number;
  /**
   * Cumulative conversion into this tier from the previous one:
   * atOrBeyond(this) / atOrBeyond(previous). 1 for the first stage.
   */
  conversionFromPrevious: number;
}

export interface FunnelMetrics {
  stages: FunnelStageMetric[];
  total: number;
}

/** Compute per-tier counts and cumulative conversion for a set of producers. */
export function computeFunnelMetrics(tiers: FarmTier[]): FunnelMetrics {
  const counts = Object.fromEntries(FARM_TIERS.map((t) => [t, 0])) as Record<FarmTier, number>;
  for (const t of tiers) {
    if (t in counts) counts[t] += 1;
  }

  const stages: FunnelStageMetric[] = FARM_TIERS.map((tier, i) => {
    const atOrBeyond = FARM_TIERS.slice(i).reduce((sum, t) => sum + counts[t], 0);
    return { tier, count: counts[tier], atOrBeyond, conversionFromPrevious: 1 };
  });

  for (let i = 1; i < stages.length; i++) {
    const prev = stages[i - 1].atOrBeyond;
    stages[i].conversionFromPrevious = prev === 0 ? 0 : stages[i].atOrBeyond / prev;
  }

  return { stages, total: tiers.length };
}
