import { describe, it, expect } from "vitest";
import { scanDocuments, REQUIRED_DOC_TYPES, type UploadedDocMeta } from "./document-integrity";

const doc = (over: Partial<UploadedDocMeta>): UploadedDocMeta => ({
  id: Math.random().toString(36).slice(2),
  docType: "gacp_cert",
  filename: "f.pdf",
  sha256: "a".repeat(64),
  size: 50_000,
  mime: "application/pdf",
  ...over,
});

const completeSet = (): UploadedDocMeta[] => [
  doc({ docType: "gacp_cert", sha256: "1".repeat(64) }),
  doc({ docType: "coa", sha256: "2".repeat(64) }),
  doc({ docType: "license", sha256: "3".repeat(64) }),
];

describe("scanDocuments", () => {
  it("always requires human review", () => {
    expect(scanDocuments([]).needsHumanReview).toBe(true);
    expect(scanDocuments(completeSet()).needsHumanReview).toBe(true);
  });

  it("flags every missing required document", () => {
    const r = scanDocuments([doc({ docType: "gacp_cert" })]);
    expect(r.missingRequired).toEqual(expect.arrayContaining(["coa", "license"]));
    expect(r.flags.filter((f) => f.code.startsWith("missing:")).length).toBe(2);
    expect(r.riskScore).toBeGreaterThan(0);
  });

  it("is clean for a complete, well-formed set", () => {
    const r = scanDocuments(completeSet());
    expect(r.missingRequired).toEqual([]);
    expect(r.duplicateHashes).toEqual([]);
    expect(r.flags).toEqual([]);
    expect(r.riskScore).toBe(0);
  });

  it("detects the same file reused for different documents (forgery red flag)", () => {
    const shared = "deadbeef".repeat(8);
    const r = scanDocuments([
      doc({ docType: "gacp_cert", sha256: shared }),
      doc({ docType: "coa", sha256: shared }),
      doc({ docType: "license", sha256: "9".repeat(64) }),
    ]);
    expect(r.duplicateHashes).toContain(shared);
    expect(r.flags.some((f) => f.code === "duplicate_content")).toBe(true);
    expect(r.riskScore).toBeGreaterThanOrEqual(25);
  });

  it("warns on wrong format and implausible size", () => {
    const r = scanDocuments([
      doc({ docType: "gacp_cert", mime: "text/plain" }),
      doc({ docType: "coa", size: 10 }),
      doc({ docType: "license", size: 99 * 1024 * 1024 }),
    ]);
    const codes = r.flags.map((f) => f.code);
    expect(codes).toContain("unexpected_format");
    expect(codes).toContain("too_small");
    expect(codes).toContain("too_large");
  });

  it("exposes the required doc types", () => {
    expect(REQUIRED_DOC_TYPES).toEqual(["gacp_cert", "coa", "license"]);
  });
});
