import { supabase } from "@/integrations/supabase/client";
import { getPayloadError, toErrorMessage, type JsonRecord } from "./api-errors";

async function invokeIntegrityProxy<T>(body: JsonRecord) {
  try {
    const { data, error } = await supabase.functions.invoke("integrity-alert-proxy", { body });
    if (error) return { data: null as T | null, error: error.message };
    const payloadError = getPayloadError(data);
    if (payloadError) return { data: null, error: payloadError };
    return { data: data as T, error: null };
  } catch (err: unknown) {
    return { data: null as T | null, error: toErrorMessage(err) };
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
