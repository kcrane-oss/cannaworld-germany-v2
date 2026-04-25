import { supabase } from "@/integrations/supabase/client";

async function invokeIntegrityProxy<T>(body: Record<string, unknown>) {
  try {
    const { data, error } = await supabase.functions.invoke("integrity-alert-proxy", { body });
    if (error) return { data: null as T | null, error: error.message };
    if (data?.error) return { data: null as T | null, error: data.error };
    return { data: data as T, error: null };
  } catch (err: any) {
    return { data: null as T | null, error: err.message || "Unknown error" };
  }
}

export const reportIntegrityViolation = (params: {
  batch_id: string;
  batch_number?: string;
  broken_at?: number;
  verified_entries?: number;
  total_entries?: number;
  entity_type?: string;
}) => invokeIntegrityProxy<{ success: boolean }>({ action: "report", ...params });

export const verifyEventIntegrity = (eventId: string) =>
  invokeIntegrityProxy<{ event_id: string; integrity_hash: string; verified: boolean }>({
    action: "verify",
    event_id: eventId,
  });
