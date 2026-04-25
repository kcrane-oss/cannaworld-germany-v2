/**
 * Client-side regulatory requirements for key target markets.
 * Used for real-time validation in batch creation and purchase requests.
 * The authoritative data is in the target-market-analysis edge function.
 */

export type MarketRegion = "europe" | "asia_pacific" | "americas" | "africa";

export const REGION_LABELS: Record<MarketRegion, { de: string; en: string; emoji: string }> = {
  europe: { de: "Europa", en: "Europe", emoji: "🇪🇺" },
  asia_pacific: { de: "Asien-Pazifik", en: "Asia-Pacific", emoji: "🌏" },
  americas: { de: "Amerika", en: "Americas", emoji: "🌎" },
  africa: { de: "Afrika", en: "Africa", emoji: "🌍" },
};

export interface CountryRegulation {
  code: string;
  name_de: string;
  name_en: string;
  flag: string;
  region: MarketRegion;
  max_thc: number;
  min_certifications: string[];
  required_documents: string[];
  category_restrictions: string[];
  cbd_restricted: boolean;
  notes_de: string;
  regulatory_body: string;
  import_license_required: boolean;
  special_requirements?: string[];
}

/** Certification hierarchy for comparison */
export const CERT_HIERARCHY: Record<string, number> = {
  "EU-GMP": 4,
  GMP: 3,
  "EU-GACP": 2,
  GACP: 1,
};

export function certMeetsRequirement(batchCert: string, required: string[]): boolean {
  const batchLevel = CERT_HIERARCHY[batchCert] ?? 0;
  return required.some((r) => batchLevel >= (CERT_HIERARCHY[r] ?? 99));
}

/** Key markets with detailed regulatory requirements – re-exported from market-data.ts */
export { KEY_MARKETS } from "./market-data";

/** Document type labels */
export const DOCUMENT_LABELS: Record<string, { de: string; en: string }> = {
  coa: { de: "Certificate of Analysis (CoA)", en: "Certificate of Analysis (CoA)" },
  gmp_cert: { de: "GMP-Zertifikat", en: "GMP Certificate" },
  gacp_cert: { de: "GACP-Zertifikat", en: "GACP Certificate" },
  import_permit: { de: "Import-Genehmigung", en: "Import Permit" },
  fda_registration: { de: "FDA-Registrierung", en: "FDA Registration" },
  stability_study: { de: "Stabilitätsstudie", en: "Stability Study" },
  product_specification: { de: "Produktspezifikation", en: "Product Specification" },
  pesticide_report: { de: "Pestizid-Analysebericht", en: "Pesticide Analysis Report" },
  analysis: { de: "Analysezertifikat", en: "Analysis Certificate" },
  other: { de: "Sonstiges", en: "Other" },
};

/** Check if a batch meets a country's requirements */
export function checkBatchCompliance(
  batch: { thc: number; cbd: number; certification: string; category: string },
  country: CountryRegulation
): {
  status: "green" | "yellow" | "red";
  issues: string[];
  missingDocs: string[];
} {
  const issues: string[] = [];
  let status: "green" | "yellow" | "red" = "green";

  // THC check
  if (batch.thc > country.max_thc) {
    issues.push(`THC ${batch.thc}% überschreitet Limit von ${country.max_thc}%`);
    status = "red";
  }

  // Certification check
  if (!certMeetsRequirement(batch.certification, country.min_certifications)) {
    issues.push(`${batch.certification} erfüllt nicht ${country.min_certifications.join(" / ")}`);
    status = "red";
  }

  // Category restrictions
  if (country.category_restrictions.length > 0 && !country.category_restrictions.includes(batch.category)) {
    issues.push(`Nur ${country.category_restrictions.join(", ")} erlaubt`);
    status = "red";
  }

  // CBD restriction
  if (country.cbd_restricted && batch.cbd > 0 && status !== "red") {
    issues.push("CBD-Produkte unterliegen besonderen Einschränkungen");
    status = "yellow";
  }

  if (issues.length === 0) {
    issues.push("Alle regulatorischen Anforderungen erfüllt");
  }

  return { status, issues, missingDocs: country.required_documents };
}
