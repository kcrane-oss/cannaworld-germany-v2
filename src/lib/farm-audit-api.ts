import { supabase } from "@/integrations/supabase/client";
import type { UploadedDocMeta, IntegrityReport } from "@/lib/document-integrity";

// Self-service farm self-audit submit + human release decision. Writes go through
// role-gated, rate-limited Edge Functions — the browser never writes directly.

export interface FarmAuditSubmitPayload {
  farm_name: string;
  province: string;
  self_assessment_score: number;
  documents: UploadedDocMeta[];
  integrity: IntegrityReport;
}

export async function submitFarmAudit(payload: FarmAuditSubmitPayload): Promise<{ submission_id: string | null }> {
  const { data, error } = await supabase.functions.invoke("germany-farm-audit-submit", { body: payload });
  if (error) throw error;
  return data as { submission_id: string | null };
}

export async function decideFarmAudit(
  submissionId: string,
  decision: "approved" | "rejected",
  note?: string
): Promise<{ id: string; status: string }> {
  const { data, error } = await supabase.functions.invoke("germany-farm-audit-decide", {
    body: { submission_id: submissionId, decision, note: note ?? null },
  });
  if (error) throw error;
  return data as { id: string; status: string };
}
