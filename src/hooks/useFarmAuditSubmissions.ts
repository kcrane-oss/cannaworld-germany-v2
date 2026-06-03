import { useQuery } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

// Reads farm self-audit submissions for the human release queue. The
// farm_audit_submissions table is provisioned via cannaworld-gateway and not yet
// in the generated types, so an untyped client view is used until regenerated.
// RLS restricts SELECT to admin/compliance.

export interface FarmAuditSubmissionRow {
  id: string;
  farm_name: string | null;
  province: string | null;
  self_assessment_score: number | null;
  risk_score: number | null;
  document_count: number | null;
  status: string | null;
  created_at: string;
}

export function useFarmAuditSubmissions() {
  return useQuery({
    queryKey: ["germany-farm-audit-submissions"],
    queryFn: async (): Promise<FarmAuditSubmissionRow[]> => {
      const db = supabase as unknown as SupabaseClient;
      const { data, error } = await db
        .from("farm_audit_submissions")
        .select("id, farm_name, province, self_assessment_score, risk_score, document_count, status, created_at")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return (data ?? []) as FarmAuditSubmissionRow[];
    },
  });
}
