import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export interface ChatMessage {
  id: string;
  session_id: string;
  user_id: string;
  message: string;
  created_at: string;
  profile?: { display_name: string | null; avatar_url: string | null } | null;
}

export function useSessionChat(sessionId: string | undefined) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["session-chat", sessionId],
    enabled: !!sessionId,
    queryFn: async () => {
      // session_messages table may not exist in this deployment — return empty gracefully
      try {
        const { data: messages, error } = await supabase
          .from("session_messages")
          .select("*")
          .eq("session_id", sessionId!)
          .order("created_at", { ascending: true });
        if (error) return [] as ChatMessage[];
        if (!messages?.length) return [] as ChatMessage[];

        const userIds = [...new Set((messages as ChatMessage[]).map((m) => m.user_id))];
        const { data: profiles } = await supabase
          .from("profiles")
          .select("user_id, display_name, avatar_url")
          .in("user_id", userIds);

        const profileMap = new Map(profiles?.map((p) => [p.user_id, p]) ?? []);
        return (messages as ChatMessage[]).map((m) => ({
          ...m,
          profile: profileMap.get(m.user_id) ?? null,
        })) as ChatMessage[];
      } catch {
        return [] as ChatMessage[];
      }
    },
  });

  // Realtime subscription (best-effort — may not exist)
  useEffect(() => {
    if (!sessionId) return;

    let channel: ReturnType<typeof supabase.channel> | null = null;
    try {
      channel = supabase
        .channel(`session-chat-${sessionId}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "session_messages",
            filter: `session_id=eq.${sessionId}`,
          },
          () => {
            queryClient.invalidateQueries({ queryKey: ["session-chat", sessionId] });
          }
        )
        .subscribe();
    } catch {}

    return () => {
      if (channel) supabase.removeChannel(channel).catch(() => {});
    };
  }, [sessionId, queryClient]);

  return query;
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ sessionId, message }: { sessionId: string; message: string }) => {
      const { data, error } = await supabase
        .from("session_messages")
        .insert({ session_id: sessionId, user_id: user!.id, message })
        .select()
        .single();
      if (error) throw error;
      return data as ChatMessage;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["session-chat", (data as ChatMessage).session_id] });
    },
  });
}
