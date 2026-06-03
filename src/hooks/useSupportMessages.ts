import { useQuery } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

// Reads the message thread for one support conversation. Untyped client view
// until the gateway provisions support_messages and types are regenerated.

export interface SupportMessageRow {
  id: string;
  conversation_id: string;
  direction: string | null;
  author_kind: string | null;
  author_id: string | null;
  body: string | null;
  delivered: boolean | null;
  created_at: string;
}

export function useSupportMessages(conversationId: string | undefined) {
  return useQuery({
    queryKey: ["germany-support-messages", conversationId],
    enabled: !!conversationId,
    queryFn: async (): Promise<SupportMessageRow[]> => {
      const db = supabase as unknown as SupabaseClient;
      const { data, error } = await db
        .from("support_messages")
        .select("id, conversation_id, direction, author_kind, author_id, body, delivered, created_at")
        .eq("conversation_id", conversationId!)
        .order("created_at", { ascending: true })
        .limit(500);
      if (error) throw error;
      return (data ?? []) as SupportMessageRow[];
    },
  });
}
