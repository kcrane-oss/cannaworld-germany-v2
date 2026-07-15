import { describe, expect, it } from "vitest";
import source from "./QPRelease.tsx?raw";

describe("Germany QP release boundary", () => {
  it("keeps Germany read-only and routes authoritative review to AICert", () => {
    expect(source).toContain("Read-only release overview");
    expect(source).toContain("AICERT_ORIGIN");
    expect(source).toContain("/qp-release/eu_qp/");
    expect(source).not.toContain('.from("trade_cases").update');
    expect(source).not.toContain("handleRelease");
  });
});
