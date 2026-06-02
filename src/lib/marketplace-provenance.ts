// Marketplace gatekeeper provenance: derive the "GACP → EU-GMP hub → QP release"
// chain shown per listing from the data the platform already has. Pure + testable.
// The chain mirrors the regulatory reality documented in
// docs/strategie/thailand-gatekeeper-konzept.md §2.

import type { FarmTier } from "./farm-onboarding";

export type ProvenanceState = "verified" | "pending" | "unknown";

export interface ProvenanceStage {
  /** i18n key + German fallback for the stage label. */
  key: string;
  labelDe: string;
  state: ProvenanceState;
}

export interface BatchProvenance {
  originCountry: string | null;
  isThailand: boolean;
  /** Ordered chain: GACP cultivation → EU-GMP hub → QP release. */
  stages: ProvenanceStage[];
  summary: "qualified" | "in_review" | "unknown";
}

const THAILAND = new Set(["th", "tha", "thailand"]);

export function isThailandOrigin(origin: string | null): boolean {
  return origin != null && THAILAND.has(origin.trim().toLowerCase());
}

/**
 * Derive the gatekeeper provenance chain for a batch.
 *
 * QP release is read from the batch status. Upstream GACP/GMP stages prefer an
 * explicit producer tier (Weg D); absent a producer link they are inferred from
 * the QP stage — an EU QP batch release is only possible if GACP cultivation and
 * EU-GMP processing happened upstream, so a released batch implies both.
 */
export function deriveBatchProvenance(args: {
  status: string | null;
  originCountry: string | null;
  producerTier?: FarmTier | null;
}): BatchProvenance {
  const status = (args.status ?? "").trim().toLowerCase();
  const isThailand = isThailandOrigin(args.originCountry);

  const qp: ProvenanceState =
    status === "released" ? "verified" : status === "approved" ? "pending" : "unknown";

  let gacp: ProvenanceState;
  let gmp: ProvenanceState;
  if (args.producerTier != null) {
    const t = args.producerTier;
    gacp = t === "tier_2_gacp_certified" || t === "tier_3_hub_linked" ? "verified" : "pending";
    gmp = t === "tier_3_hub_linked" ? "verified" : "pending";
  } else if (qp === "verified") {
    gacp = "verified";
    gmp = "verified";
  } else if (qp === "pending") {
    gacp = "verified";
    gmp = "pending";
  } else {
    gacp = "unknown";
    gmp = "unknown";
  }

  const stages: ProvenanceStage[] = [
    { key: "mpProvenance.gacp", labelDe: "GACP-Anbau", state: gacp },
    { key: "mpProvenance.gmp", labelDe: "EU-GMP-Hub", state: gmp },
    { key: "mpProvenance.qp", labelDe: "QP-Freigabe", state: qp },
  ];

  const summary: BatchProvenance["summary"] =
    qp === "verified" ? "qualified" : qp === "pending" ? "in_review" : "unknown";

  return { originCountry: args.originCountry, isThailand, stages, summary };
}
