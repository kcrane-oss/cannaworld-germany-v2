import { supabase } from "@/integrations/supabase/client";

interface AuditEntry {
  action: string;
  entity_type: string;
  entity_id?: string;
  details?: Record<string, unknown>;
}

export const logAuditEvent = async (entry: AuditEntry) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("audit_trail" as any).insert({
      user_id: user.id,
      action: entry.action,
      entity_type: entry.entity_type,
      entity_id: entry.entity_id || null,
      details: entry.details || {},
    } as any);
  } catch (err) {
    console.warn("Audit log failed:", err);
  }
};
