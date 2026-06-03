import { supabase } from "@/integrations/supabase/client";
import type { SupportStatus, SupportTier } from "@/lib/support-workflow";

// Back-office write actions. All go through role-gated, rate-limited Edge
// Functions — the browser never writes the support_* tables directly.

export async function replyToConversation(
  conversationId: string,
  body: string
): Promise<{ message_id: string | null }> {
  const { data, error } = await supabase.functions.invoke("germany-support-reply", {
    body: { conversation_id: conversationId, body },
  });
  if (error) throw error;
  return data as { message_id: string | null };
}

export interface ConversationPatch {
  assigned_to?: string | null;
  status?: SupportStatus;
  tier?: SupportTier;
}

export async function updateConversation(
  conversationId: string,
  patch: ConversationPatch
): Promise<{ id: string }> {
  const { data, error } = await supabase.functions.invoke("germany-support-assign", {
    body: { conversation_id: conversationId, ...patch },
  });
  if (error) throw error;
  return data as { id: string };
}
