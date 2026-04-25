import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type PartnerStatus = "none" | "pending" | "approved" | "rejected";

export const useOnboardingStatus = () => {
  const { user } = useAuth();
  const [completed, setCompleted] = useState<boolean | null>(null);
  const [partnerStatus, setPartnerStatus] = useState<PartnerStatus>("none");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setCompleted(null);
      setPartnerStatus("none");
      setLoading(false);
      return;
    }

    const fetchStatus = async () => {
      // Check profile onboarding status
      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("user_id", user.id)
        .maybeSingle();

      const onboardingDone = !!profile?.onboarding_completed;
      setCompleted(onboardingDone);

      // Check business partner approval status
      if (onboardingDone) {
        const { data: partner } = await (supabase as any)
          .from("business_partners")
          .select("status")
          .eq("user_id", user.id)
          .maybeSingle();

        setPartnerStatus((partner?.status as PartnerStatus) ?? "none");
      } else {
        setPartnerStatus("none");
      }

      setLoading(false);
    };

    fetchStatus();
  }, [user]);

  return { completed, partnerStatus, loading };
};
