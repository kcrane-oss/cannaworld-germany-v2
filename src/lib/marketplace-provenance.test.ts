import { describe, it, expect } from "vitest";
import { deriveBatchProvenance, isThailandOrigin } from "./marketplace-provenance";

describe("isThailandOrigin", () => {
  it("matches Thailand variants case-insensitively", () => {
    expect(isThailandOrigin("Thailand")).toBe(true);
    expect(isThailandOrigin("TH")).toBe(true);
    expect(isThailandOrigin(" th ")).toBe(true);
    expect(isThailandOrigin("Germany")).toBe(false);
    expect(isThailandOrigin(null)).toBe(false);
  });
});

describe("deriveBatchProvenance", () => {
  it("treats a released batch as fully qualified (upstream implied by QP release)", () => {
    const p = deriveBatchProvenance({ status: "released", originCountry: "Thailand" });
    expect(p.summary).toBe("qualified");
    expect(p.isThailand).toBe(true);
    expect(p.stages.map((s) => s.state)).toEqual(["verified", "verified", "verified"]);
  });

  it("treats an approved batch as in review with QP pending", () => {
    const p = deriveBatchProvenance({ status: "approved", originCountry: "TH" });
    expect(p.summary).toBe("in_review");
    const qp = p.stages.find((s) => s.key === "mpProvenance.qp")!;
    expect(qp.state).toBe("pending");
    const gacp = p.stages.find((s) => s.key === "mpProvenance.gacp")!;
    expect(gacp.state).toBe("verified");
  });

  it("marks an unknown status chain as unknown", () => {
    const p = deriveBatchProvenance({ status: "draft", originCountry: "TH" });
    expect(p.summary).toBe("unknown");
    expect(p.stages.every((s) => s.state === "unknown")).toBe(true);
  });

  it("prefers an explicit producer tier over status inference", () => {
    // tier_2 = GACP-certified but not yet hub-linked → GMP stage pending
    const p = deriveBatchProvenance({
      status: "released",
      originCountry: "TH",
      producerTier: "tier_2_gacp_certified",
    });
    expect(p.stages.find((s) => s.key === "mpProvenance.gacp")!.state).toBe("verified");
    expect(p.stages.find((s) => s.key === "mpProvenance.gmp")!.state).toBe("pending");
  });

  it("marks a tier_3 producer as hub-linked (GMP verified)", () => {
    const p = deriveBatchProvenance({
      status: "approved",
      originCountry: "TH",
      producerTier: "tier_3_hub_linked",
    });
    expect(p.stages.find((s) => s.key === "mpProvenance.gmp")!.state).toBe("verified");
  });

  it("always exposes the three stages in chain order", () => {
    const p = deriveBatchProvenance({ status: "released", originCountry: null });
    expect(p.stages.map((s) => s.key)).toEqual([
      "mpProvenance.gacp",
      "mpProvenance.gmp",
      "mpProvenance.qp",
    ]);
  });
});
