import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type NoteType = "note" | "result" | "summary";

export interface SessionNote {
  id: string;
  session_id: string;
  user_id: string;
  content: string;
  note_type: NoteType;
  created_at: string;
  updated_at: string;
}

export interface SessionNoteWithProfile extends SessionNote {
  profile: { display_name: string | null; avatar_url: string | null } | null;
}

export function useSessionNotes(sessionId: string | undefined) {
  return useQuery({
    queryKey: ["session-notes", sessionId],
    enabled: !!sessionId,
    queryFn: async () => {
      // session_notes table may not exist in this deployment — return empty gracefully
      try {
        const { data: notes, error } = await supabase
          .from("session_notes")
          .select("*")
          .eq("session_id", sessionId!)
          .order("created_at", { ascending: true });
        if (error) return [] as SessionNoteWithProfile[];
        if (!notes?.length) return [] as SessionNoteWithProfile[];

        const userIds = [...new Set((notes as SessionNote[]).map((n) => n.user_id))];
        const { data: profiles } = await supabase
          .from("profiles")
          .select("user_id, display_name, avatar_url")
          .in("user_id", userIds);

        const profileMap = new Map(profiles?.map((p) => [p.user_id, p]) ?? []);
        return (notes as SessionNote[]).map((n) => ({
          ...n,
          note_type: n.note_type as NoteType,
          profile: profileMap.get(n.user_id) ?? null,
        })) as SessionNoteWithProfile[];
      } catch {
        return [] as SessionNoteWithProfile[];
      }
    },
  });
}

export function useCreateSessionNote() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (input: { session_id: string; content: string; note_type?: NoteType }) => {
      const { data, error } = await supabase
        .from("session_notes")
        .insert({
          session_id: input.session_id,
          user_id: user!.id,
          content: input.content,
          note_type: input.note_type || "note",
        })
        .select()
        .single();
      if (error) throw error;
      return data as SessionNote;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["session-notes", (data as SessionNote).session_id] });
    },
  });
}

export function useDeleteSessionNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, sessionId }: { id: string; sessionId: string }) => {
      const { error } = await supabase.from("session_notes").delete().eq("id", id);
      if (error) throw error;
      return sessionId;
    },
    onSuccess: (sessionId) => {
      queryClient.invalidateQueries({ queryKey: ["session-notes", sessionId] });
    },
  });
}

export function useGenerateSummary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sessionId: string) => {
      const { data, error } = await supabase.functions.invoke("summarize-session", {
        body: { session_id: sessionId },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return { sessionId, summary: data.summary };
    },
    onSuccess: ({ sessionId }) => {
      queryClient.invalidateQueries({ queryKey: ["session-notes", sessionId] });
    },
  });
}
