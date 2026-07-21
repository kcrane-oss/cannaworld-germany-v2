import { describe, expect, it } from "vitest";
import appSource from "@/App.tsx?raw";
import de from "@/i18n/locales/de.json";
import en from "@/i18n/locales/en.json";

describe("Germany public claim boundaries", () => {
  it("uses evidence and readiness wording instead of regulated outcomes", () => {
    const source = `${appSource}\n${JSON.stringify(de)}\n${JSON.stringify(en)}`;
    for (const prohibited of [
      "geprüfte internationale Supply",
      "verified international supply",
      "EU-ready Batch Pool",
      "GDP-konforme Lieferung",
      "24 Service-Bausteine",
      "Reine B2B-Compliance-Plattform nach AMG/BtMG",
    ]) {
      expect(source).not.toContain(prohibited);
    }
    expect(source).toContain("Zertifizierung, Importgenehmigung, QP-Freigabe");
    expect(source).toContain("Certification, import approval, QP release");
  });
});
