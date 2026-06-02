// SLA / escalation logic for support conversations. Pure + testable.
// Drives the "overdue" indicator in the inbox and the suggested next tier.

import { isActionable, type SupportPriority, type SupportTier } from "@/lib/support-workflow";

/** Minutes within which an actionable conversation should see staff action. */
export const SLA_MINUTES: Record<SupportPriority, number> = {
  urgent: 60,
  high: 240, // 4h
  normal: 1440, // 24h
  low: 4320, // 72h
};

export interface EscalationInput {
  status: string | null;
  tier: number | null;
  priority: string | null;
  updatedAt: string; // ISO
  now?: number; // ms epoch (injectable for tests)
}

export interface EscalationResult {
  overdue: boolean;
  ageMinutes: number;
  slaMinutes: number;
  suggestedTier: SupportTier;
}

function priorityOf(p: string | null): SupportPriority {
  return p === "urgent" || p === "high" || p === "low" ? p : "normal";
}

export function evaluateEscalation(input: EscalationInput): EscalationResult {
  const now = input.now ?? Date.now();
  const priority = priorityOf(input.priority);
  const slaMinutes = SLA_MINUTES[priority];
  const ageMinutes = Math.max(0, Math.round((now - new Date(input.updatedAt).getTime()) / 60000));
  const tier = (Number.isFinite(input.tier) ? Number(input.tier) : 0) as SupportTier;

  // Only conversations that still need attention can be overdue.
  const overdue = isActionable(input.status ?? "") && ageMinutes > slaMinutes;
  const suggestedTier = (overdue ? Math.min(tier + 1, 3) : tier) as SupportTier;

  return { overdue, ageMinutes, slaMinutes, suggestedTier };
}
