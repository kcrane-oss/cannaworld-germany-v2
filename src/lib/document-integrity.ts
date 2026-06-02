// Stripped-down document integrity / anti-forgery heuristics. Pure + testable.
//
// HONEST SCOPE: this is NOT a real document-authenticity verifier (no issuer
// validation, no cryptographic seal / tamper detection). It is a set of
// deterministic heuristics that surface risk signals for a HUMAN reviewer:
//   - required documents present?
//   - same file content reused for different documents? (a forgery red flag)
//   - obviously broken files (empty / wrong format / implausible size)?
// The human always makes the release decision (needsHumanReview is always true).

export interface UploadedDocMeta {
  id: string;
  docType: string; // 'gacp_cert' | 'coa' | 'license' | ...
  filename: string;
  sha256: string; // client-computed content hash
  size: number; // bytes
  mime: string;
}

/** Stripped-down minimum set a farm self-audit must include. */
export const REQUIRED_DOC_TYPES = ["gacp_cert", "coa", "license"] as const;

const ACCEPTED_MIME = /^(application\/pdf|image\/(png|jpe?g|webp))$/i;
const MIN_SIZE = 1024; // 1 KB
const MAX_SIZE = 25 * 1024 * 1024; // 25 MB

export type FlagSeverity = "info" | "warn" | "high";

export interface IntegrityFlag {
  code: string;
  severity: FlagSeverity;
  docId?: string;
}

export interface IntegrityReport {
  flags: IntegrityFlag[];
  missingRequired: string[];
  duplicateHashes: string[];
  /** 0..100, higher = riskier. */
  riskScore: number;
  /** Always true in the stripped-down version — a human releases everything. */
  needsHumanReview: boolean;
}

export function scanDocuments(docs: UploadedDocMeta[]): IntegrityReport {
  const flags: IntegrityFlag[] = [];

  // 1. Required-document completeness.
  const present = new Set(docs.map((d) => d.docType));
  const missingRequired = REQUIRED_DOC_TYPES.filter((t) => !present.has(t));
  for (const t of missingRequired) flags.push({ code: `missing:${t}`, severity: "high" });

  // 2. Duplicate content (same hash on different documents) — forgery red flag.
  const byHash = new Map<string, UploadedDocMeta[]>();
  for (const d of docs) {
    if (!d.sha256) continue;
    const list = byHash.get(d.sha256) ?? [];
    list.push(d);
    byHash.set(d.sha256, list);
  }
  const duplicateHashes: string[] = [];
  for (const [hash, list] of byHash) {
    if (list.length > 1) {
      duplicateHashes.push(hash);
      for (const d of list) flags.push({ code: "duplicate_content", severity: "high", docId: d.id });
    }
  }

  // 3. Per-file sanity.
  for (const d of docs) {
    if (!ACCEPTED_MIME.test(d.mime)) flags.push({ code: "unexpected_format", severity: "warn", docId: d.id });
    if (d.size < MIN_SIZE) flags.push({ code: "too_small", severity: "warn", docId: d.id });
    if (d.size > MAX_SIZE) flags.push({ code: "too_large", severity: "warn", docId: d.id });
  }

  const weight: Record<FlagSeverity, number> = { info: 2, warn: 8, high: 25 };
  const riskScore = Math.min(100, flags.reduce((s, f) => s + weight[f.severity], 0));

  return { flags, missingRequired, duplicateHashes, riskScore, needsHumanReview: true };
}
