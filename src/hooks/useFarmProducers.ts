import { useQuery } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { FarmTier } from "@/lib/farm-onboarding";

// Weg D — data hook for the Thailand farm onboarding funnel.
// Follows the canonical read-hook pattern (see useBatches.ts): explicit columns,
// ordered, throw on error. The `farm_producers` table is owned/provisioned via
// cannaworld-gateway (do not migrate from this repo); this hook is the DB seam.

export interface FarmProducer {
  id: string;
  name: string | null;
  type: "farm" | "cooperative" | null;
  province: string | null;
  tier: FarmTier | null;
  status: "active" | "suspended" | "offboarded" | null;
  created_at: string;
}

export function useFarmProducers() {
  return useQuery({
    queryKey: ["thailand-farm-producers"],
    queryFn: async (): Promise<FarmProducer[]> => {
      // `farm_producers` is provisioned via cannaworld-gateway and not yet part
      // of the generated Supabase types (src/integrations/supabase/types.ts is
      // generated, not hand-edited). Use an untyped client view until the types
      // are regenerated from the schema.
      const db = supabase as unknown as SupabaseClient;
      const { data, error } = await db
        .from("farm_producers")
        .select("id, name, type, province, tier, status, created_at")
        .eq("country", "TH")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return (data ?? []) as FarmProducer[];
    },
  });
}
