import { useQuery } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

// Reads incoming B2B sample requests for the admin view. The
// germany_sample_requests table is provisioned via cannaworld-gateway (see
// docs/strategie/gateway-schema-vorschlag.md) and not yet in the generated
// Supabase types, so an untyped client view is used until they are regenerated.
// RLS restricts SELECT to admin/compliance.

export interface SampleRequestRow {
  id: string;
  company: string | null;
  contact_email: string | null;
  product_category: string | null;
  quantity_kg: number | null;
  target_pathway: string | null;
  context: string | null;
  status: string | null;
  created_at: string;
}

export function useSampleRequests() {
  return useQuery({
    queryKey: ["germany-sample-requests"],
    queryFn: async (): Promise<SampleRequestRow[]> => {
      const db = supabase as unknown as SupabaseClient;
      const { data, error } = await db
        .from("germany_sample_requests")
        .select("id, company, contact_email, product_category, quantity_kg, target_pathway, context, status, created_at")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return (data ?? []) as SampleRequestRow[];
    },
  });
}
