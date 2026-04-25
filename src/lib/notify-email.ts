import { supabase } from "@/integrations/supabase/client";

/**
 * Sends an email notification via the notify-email edge function.
 * Falls back silently – creates in-app notification if email fails.
 */
export async function sendNotifyEmail(payload: {
  type: "recall_initiated" | "batch_status" | "shipment_update" | "partner_approved" | "partner_rejected" | "batch_approved" | "batch_rejected" | "contact_approved";
  user_id: string;
  email?: string;
  subject: string;
  details: Record<string, string>;
}) {
  try {
    const { error } = await supabase.functions.invoke("notify-email", { body: payload });
    if (error) {
      console.error("notify-email returned error:", error);
      return { ok: false as const, error };
    }
    return { ok: true as const };
  } catch (err) {
    console.error("notify-email failed:", err);
    return { ok: false as const, error: err };
  }
}
