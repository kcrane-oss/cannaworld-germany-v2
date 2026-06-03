import { useQuery } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

// Reads support conversations for the back-office inbox. The support_* tables are
// provisioned via cannaworld-gateway (see docs/backoffice/admin-support-konzept.md
// §6) and not yet in the generated Supabase types, so an untyped client view is
// used until they are regenerated. RLS restricts SELECT to staff roles.

export interface SupportConversationRow {
  id: string;
  channel: string | null;
  partner_id: string | null;
  subject: string | null;
  status: string | null;
  tier: number | null;
  priority: string | null;
  assigned_to: string | null;
  external_ref: string | null;
  created_at: string;
  updated_at: string;
}

export function useSupportConversations() {
  return useQuery({
    queryKey: ["germany-support-conversations"],
    queryFn: async (): Promise<SupportConversationRow[]> => {
      const db = supabase as unknown as SupabaseClient;
      const { data, error } = await db
        .from("support_conversations")
        .select("id, channel, partner_id, subject, status, tier, priority, assigned_to, external_ref, created_at, updated_at")
        .order("updated_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return (data ?? []) as SupportConversationRow[];
    },
  });
}
