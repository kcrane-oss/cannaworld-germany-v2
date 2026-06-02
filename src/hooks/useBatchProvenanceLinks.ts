import { useQuery } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { BatchTierLink } from "@/lib/marketplace-provenance";

// Maps a batch to the tier of the farm producer it originated from, so the
// marketplace can show real Weg-D provenance instead of status inference.
// Reads a `farm_batch_provenance` view/table provisioned via cannaworld-gateway
// (see docs/strategie/gateway-schema-vorschlag.md). Not yet in the generated
// Supabase types, so an untyped client view is used until they are regenerated.
// Degrades gracefully: if the relation does not exist, the query errors and the
// caller falls back to status-derived provenance.
//
// The pure `tierByBatchId` helper lives in @/lib/marketplace-provenance so it can
// be unit-tested without loading the Supabase client.

export type { BatchTierLink as BatchProvenanceLink };

export function useBatchProvenanceLinks() {
  return useQuery({
    queryKey: ["thailand-batch-provenance"],
    queryFn: async (): Promise<BatchTierLink[]> => {
      const db = supabase as unknown as SupabaseClient;
      const { data, error } = await db
        .from("farm_batch_provenance")
        .select("batch_id, producer_tier")
        .limit(500);
      if (error) throw error;
      return (data ?? []) as BatchTierLink[];
    },
  });
}
