// Support conversation workflow (back-office). Pure + testable. No AI here —
// B0 is the human-operated foundation; AI triage (B2) layers on top later.

export const SUPPORT_STATUSES = [
  "open",
  "triaged",
  "assigned",
  "waiting",
  "resolved",
  "closed",
] as const;
export type SupportStatus = (typeof SUPPORT_STATUSES)[number];

export const SUPPORT_STATUS_LABELS: Record<SupportStatus, { key: string; de: string }> = {
  open: { key: "support.status.open", de: "Offen" },
  triaged: { key: "support.status.triaged", de: "Vorsortiert" },
  assigned: { key: "support.status.assigned", de: "Zugewiesen" },
  waiting: { key: "support.status.waiting", de: "Wartet auf Partner" },
  resolved: { key: "support.status.resolved", de: "Gelöst" },
  closed: { key: "support.status.closed", de: "Geschlossen" },
};

export const SUPPORT_TIERS = [0, 1, 2, 3] as const;
export type SupportTier = (typeof SUPPORT_TIERS)[number];

export const SUPPORT_TIER_LABELS: Record<SupportTier, { key: string; de: string }> = {
  0: { key: "support.tier.0", de: "AI / Auto" },
  1: { key: "support.tier.1", de: "Mitarbeiter" },
  2: { key: "support.tier.2", de: "Spezialist" },
  3: { key: "support.tier.3", de: "Admin" },
};

export const SUPPORT_PRIORITIES = ["low", "normal", "high", "urgent"] as const;
export type SupportPriority = (typeof SUPPORT_PRIORITIES)[number];

export const SUPPORT_PRIORITY_LABELS: Record<SupportPriority, { key: string; de: string }> = {
  low: { key: "support.priority.low", de: "Niedrig" },
  normal: { key: "support.priority.normal", de: "Normal" },
  high: { key: "support.priority.high", de: "Hoch" },
  urgent: { key: "support.priority.urgent", de: "Dringend" },
};

export function isSupportStatus(value: string): value is SupportStatus {
  return (SUPPORT_STATUSES as readonly string[]).includes(value);
}

export function isSupportTier(value: number): value is SupportTier {
  return (SUPPORT_TIERS as readonly number[]).includes(value);
}

/** Statuses an open conversation can still move to (terminal: closed). */
export function isTerminalStatus(status: SupportStatus): boolean {
  return status === "closed";
}

/** True if a conversation still needs staff attention (for "open" filters/counts). */
export function isActionable(status: string): boolean {
  return isSupportStatus(status) && status !== "resolved" && status !== "closed";
}
