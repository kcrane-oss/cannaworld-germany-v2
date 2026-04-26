import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type SessionStatus = "scheduled" | "live" | "completed" | "cancelled";

export interface ClassroomSession {
  id: string;
  title: string;
  description: string | null;
  instructor_id: string;
  status: string;
  scheduled_at: string;
  ended_at: string | null;
  max_participants: number;
  meeting_url: string | null;
  created_at: string;
  updated_at: string;
  course_id: string | null;
}

export interface SessionParticipant {
  id: string;
  session_id: string;
  user_id: string;
  joined_at: string | null;
  role: string;
  attendance_status: string;
  created_at: string;
}

export interface ParticipantWithProfile extends SessionParticipant {
  profiles: { display_name: string | null; avatar_url: string | null } | null;
}

export function useSessions() {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("training_sessions")
        .select("*")
        .order("scheduled_at", { ascending: true });
      if (error) throw error;
      return data as ClassroomSession[];
    },
  });
}

export function useSessionParticipants(sessionId: string | undefined) {
  return useQuery({
    queryKey: ["session-participants", sessionId],
    enabled: !!sessionId,
    queryFn: async () => {
      const { data: participants, error } = await supabase
        .from("session_participants")
        .select("*")
        .eq("session_id", sessionId!)
        .order("joined_at");
      if (error) throw error;
      if (!participants?.length) return [] as ParticipantWithProfile[];

      const userIds = participants.map((p) => p.user_id);
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, display_name, avatar_url")
        .in("user_id", userIds);

      const profileMap = new Map(profiles?.map((p) => [p.user_id, p]) ?? []);

      return participants.map((p) => {
        const profile = profileMap.get(p.user_id);
        return {
          ...p,
          profiles: profile
            ? { display_name: profile.display_name || null, avatar_url: profile.avatar_url }
            : null,
        };
      }) as unknown as ParticipantWithProfile[];
    },
  });
}

export function useLeaveSession() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (sessionId: string) => {
      const { error } = await supabase
        .from("session_participants")
        .delete()
        .eq("session_id", sessionId)
        .eq("user_id", user!.id);
      if (error) throw error;
    },
    onSuccess: (_, sessionId) => {
      queryClient.invalidateQueries({ queryKey: ["session-participants", sessionId] });
    },
  });
}

export function useCreateSession() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (input: {
      title: string;
      description?: string;
      scheduled_at: string;
      max_participants?: number;
      meeting_url?: string;
    }) => {
      const { data, error } = await supabase
        .from("training_sessions")
        .insert({
          title: input.title,
          description: input.description || null,
          scheduled_at: input.scheduled_at,
          max_participants: input.max_participants || 50,
          meeting_url: input.meeting_url || null,
          instructor_id: user!.id,
        })
        .select()
        .single();
      if (error) throw error;
      return data as ClassroomSession;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sessions"] }),
  });
}

export function useUpdateSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<ClassroomSession> & { id: string }) => {
      const { data, error } = await supabase
        .from("training_sessions")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as ClassroomSession;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sessions"] }),
  });
}

export function useJoinSession() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (sessionId: string) => {
      const { data, error } = await supabase
        .from("session_participants")
        .insert({ session_id: sessionId, user_id: user!.id })
        .select()
        .single();
      if (error) throw error;
      return data as unknown as SessionParticipant;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["session-participants", data.session_id] });
    },
  });
}

export function useDeleteSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("training_sessions").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sessions"] }),
  });
}
