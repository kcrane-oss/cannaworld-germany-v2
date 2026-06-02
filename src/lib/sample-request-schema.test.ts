import { describe, it, expect } from "vitest";
import { sampleRequestSchema } from "./validation-schemas";

const valid = {
  company: "Apotheke Nord GmbH",
  contactEmail: "einkauf@apo-nord.de",
  productCategory: "flower",
  quantityKg: 5,
  targetPathway: "wholesale",
  context: "",
  b2bConfirmed: true as const,
};

describe("sampleRequestSchema", () => {
  it("accepts a valid B2B request", () => {
    expect(sampleRequestSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects a missing company", () => {
    const r = sampleRequestSchema.safeParse({ ...valid, company: "" });
    expect(r.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const r = sampleRequestSchema.safeParse({ ...valid, contactEmail: "not-an-email" });
    expect(r.success).toBe(false);
  });

  it("rejects a non-positive quantity", () => {
    expect(sampleRequestSchema.safeParse({ ...valid, quantityKg: 0 }).success).toBe(false);
    expect(sampleRequestSchema.safeParse({ ...valid, quantityKg: -3 }).success).toBe(false);
  });

  it("rejects an unknown category or pathway", () => {
    expect(sampleRequestSchema.safeParse({ ...valid, productCategory: "edible" }).success).toBe(false);
    expect(sampleRequestSchema.safeParse({ ...valid, targetPathway: "retail" }).success).toBe(false);
  });

  it("requires the B2B confirmation gate", () => {
    const r = sampleRequestSchema.safeParse({ ...valid, b2bConfirmed: false });
    expect(r.success).toBe(false);
  });
});
