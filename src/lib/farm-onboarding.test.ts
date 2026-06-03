import { describe, it, expect } from "vitest";
import {
  FARM_TIERS,
  nextTier,
  tierIndex,
  scoreSelfAssessment,
  PRE_AUDIT_PASS_THRESHOLD,
  evaluateGate,
  computeFunnelMetrics,
  type SelfAssessmentAnswers,
  type FarmGateInput,
  type FarmTier,
} from "./farm-onboarding";

const allYes: SelfAssessmentAnswers = {
  hasDocumentedSOPs: true,
  tracksPesticideUse: true,
  hasBatchTraceability: true,
  hasTrainedStaff: true,
  hasSecureStorage: true,
};

const baseGate: FarmGateInput = {
  selfAssessmentScore: null,
  preAuditPassed: false,
  hasValidGacpCertificate: false,
  hasSupplyAgreement: false,
  linkedHubGmpCertified: false,
};

describe("tier helpers", () => {
  it("orders tiers and advances through the funnel", () => {
    expect(tierIndex("tier_0_registered")).toBe(0);
    expect(nextTier("tier_0_registered")).toBe("tier_1_gacp_ready");
    expect(nextTier("tier_2_gacp_certified")).toBe("tier_3_hub_linked");
  });

  it("returns null at the terminal tier", () => {
    expect(nextTier("tier_3_hub_linked")).toBeNull();
  });
});

describe("scoreSelfAssessment", () => {
  it("scores all-yes as 100", () => {
    expect(scoreSelfAssessment(allYes)).toBe(100);
  });

  it("scores all-no as 0", () => {
    expect(
      scoreSelfAssessment({
        hasDocumentedSOPs: false,
        tracksPesticideUse: false,
        hasBatchTraceability: false,
        hasTrainedStaff: false,
        hasSecureStorage: false,
      })
    ).toBe(0);
  });

  it("scores partial proportionally", () => {
    expect(scoreSelfAssessment({ ...allYes, hasSecureStorage: false })).toBe(80);
  });
});

describe("evaluateGate", () => {
  it("blocks tier 0 -> 1 when self-assessment is below threshold", () => {
    const r = evaluateGate("tier_0_registered", { ...baseGate, selfAssessmentScore: 60, preAuditPassed: true });
    expect(r.allowed).toBe(false);
    expect(r.missing).toContain("farmFunnel.gate.selfAssessment");
    expect(r.target).toBe("tier_1_gacp_ready");
  });

  it("allows tier 0 -> 1 when score meets threshold and pre-audit passed", () => {
    const r = evaluateGate("tier_0_registered", {
      ...baseGate,
      selfAssessmentScore: PRE_AUDIT_PASS_THRESHOLD,
      preAuditPassed: true,
    });
    expect(r.allowed).toBe(true);
    expect(r.missing).toEqual([]);
  });

  it("requires a GACP certificate for tier 1 -> 2", () => {
    expect(evaluateGate("tier_1_gacp_ready", baseGate).missing).toContain("farmFunnel.gate.gacpCert");
    expect(evaluateGate("tier_1_gacp_ready", { ...baseGate, hasValidGacpCertificate: true }).allowed).toBe(true);
  });

  it("requires both a supply agreement and a GMP-certified hub for tier 2 -> 3", () => {
    const partial = evaluateGate("tier_2_gacp_certified", { ...baseGate, hasSupplyAgreement: true });
    expect(partial.allowed).toBe(false);
    expect(partial.missing).toContain("farmFunnel.gate.hubGmp");

    const full = evaluateGate("tier_2_gacp_certified", {
      ...baseGate,
      hasSupplyAgreement: true,
      linkedHubGmpCertified: true,
    });
    expect(full.allowed).toBe(true);
  });

  it("treats the terminal tier as non-advanceable", () => {
    const r = evaluateGate("tier_3_hub_linked", baseGate);
    expect(r.allowed).toBe(false);
    expect(r.target).toBeNull();
  });
});

describe("computeFunnelMetrics", () => {
  const tiers: FarmTier[] = [
    "tier_0_registered",
    "tier_0_registered",
    "tier_1_gacp_ready",
    "tier_1_gacp_ready",
    "tier_2_gacp_certified",
    "tier_3_hub_linked",
  ];

  it("counts per-tier and cumulative depth", () => {
    const m = computeFunnelMetrics(tiers);
    expect(m.total).toBe(6);
    const t0 = m.stages.find((s) => s.tier === "tier_0_registered")!;
    expect(t0.count).toBe(2);
    expect(t0.atOrBeyond).toBe(6); // everyone is at tier 0 or beyond
    const t3 = m.stages.find((s) => s.tier === "tier_3_hub_linked")!;
    expect(t3.atOrBeyond).toBe(1);
  });

  it("computes cumulative conversion between stages", () => {
    const m = computeFunnelMetrics(tiers);
    // tier_1 atOrBeyond = 4, tier_0 atOrBeyond = 6 -> 4/6
    const t1 = m.stages.find((s) => s.tier === "tier_1_gacp_ready")!;
    expect(t1.conversionFromPrevious).toBeCloseTo(4 / 6);
  });

  it("handles an empty funnel without dividing by zero", () => {
    const m = computeFunnelMetrics([]);
    expect(m.total).toBe(0);
    expect(m.stages.every((s) => s.atOrBeyond === 0)).toBe(true);
    expect(m.stages[1].conversionFromPrevious).toBe(0);
  });

  it("covers every declared tier", () => {
    const m = computeFunnelMetrics([]);
    expect(m.stages.map((s) => s.tier)).toEqual([...FARM_TIERS]);
  });
});
