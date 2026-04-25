import { supabase } from "@/integrations/supabase/client";

/**
 * Send a notification email via the send-notification-email edge function.
 * Non-blocking – errors are logged but don't throw.
 */
export async function sendNotificationEmail(payload: {
  event: string;
  recipient_email?: string;
  batch_number?: string;
  product?: string;
  amount?: number;
  currency?: string;
  status?: string;
  notes?: string;
  importer_name?: string;
  exporter_name?: string;
  tracking_number?: string;
  service_type?: string;
  old_status?: string;
  new_status?: string;
  invoice_number?: string;
  invoice_total?: number;
  invoice_due_date?: string;
  invoice_type?: string;
  invoice_link?: string;
}) {
  try {
    const { data, error } = await supabase.functions.invoke("send-notification-email", {
      body: payload,
    });
    if (error) {
      console.warn("[email-notify] Failed:", error);
    } else {
      console.log("[email-notify] Sent:", data);
    }
    return { success: !error, data };
  } catch (err) {
    console.warn("[email-notify] Exception:", err);
    return { success: false };
  }
}
