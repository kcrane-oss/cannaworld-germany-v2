import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type GateStatus =
  | "loading"
  | "not_logged_in"
  | "no_onboarding"     // No entry at all — needs to start
  | "draft"             // Started but not submitted
  | "submitted"         // Waiting for review
  | "under_review"      // Being reviewed
  | "approved"          // At least one role approved — can proceed
  | "rejected";         // Rejected, needs resubmission

export interface OnboardingGateResult {
  status: GateStatus;
  /** All onboarding entries for this user */
  entries: { role: string; status: string; tier: string; shinrai_score: number | null }[];
  /** Whether the user can access protected content */
  canAccess: boolean;
  /** Whether the user has at least one approved role */
  hasApprovedRole: boolean;
  /** Highest tier among approved roles */
  bestTier: string | null;
  /** Loading state */
  loading: boolean;
}

/**
 * Cross-platform onboarding gate hook.
 * Checks if the current user has completed onboarding for at least one role.
 * Works across Marketplace, Gateway, and AICert (same Supabase instance).
 */
export function useOnboardingGate(): OnboardingGateResult {
  const { user, loading: authLoading } = useAuth();
  const [status, setStatus] = useState<GateStatus>("loading");
  const [entries, setEntries] = useState<OnboardingGateResult["entries"]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setStatus("not_logged_in");
      setEntries([]);
      setLoading(false);
      return;
    }

    (async () => {
      setLoading(true);
      const { data: rows, error } = await (supabase as any)
        .from("exporter_onboarding")
        .select("role, status, tier, shinrai_score")
        .eq("user_id", user.id);

      if (error) {
        console.error("OnboardingGate error:", error);
        setStatus("no_onboarding");
        setLoading(false);
        return;
      }

      const all = (rows || []) as { role: string; status: string; tier: string; shinrai_score: number | null }[];
      setEntries(all);

      if (all.length === 0) {
        setStatus("no_onboarding");
      } else if (all.some((e) => e.status === "approved")) {
        setStatus("approved");
      } else if (all.some((e) => e.status === "under_review")) {
        setStatus("under_review");
      } else if (all.some((e) => e.status === "submitted")) {
        setStatus("submitted");
      } else if (all.some((e) => e.status === "rejected")) {
        setStatus("rejected");
      } else {
        setStatus("draft");
      }

      setLoading(false);
    })();
  }, [user, authLoading]);

  const hasApprovedRole = entries.some((e) => e.status === "approved");
  const canAccess = hasApprovedRole || status === "not_logged_in"; // non-logged-in handled by ProtectedRoute

  const TIER_RANK: Record<string, number> = { basic: 1, verified: 2, premium: 3 };
  const approvedEntries = entries.filter((e) => e.status === "approved");
  const bestTier = approvedEntries.length > 0
    ? approvedEntries.reduce((best, e) => (TIER_RANK[e.tier] || 0) > (TIER_RANK[best.tier] || 0) ? e : best).tier
    : null;

  return { status, entries, canAccess, hasApprovedRole, bestTier, loading };
}
