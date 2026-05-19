import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface BatchVerificationRow {
  id: string;
  token: string;
  pharmacy_license: string;
  batch_id: string | null;
  decision: "verified" | "rejected" | "expired" | "unknown_token";
  reason: string | null;
  verified_by_email: string | null;
  created_at: string;
}

export function useBatchVerifications() {
  return useQuery({
    queryKey: ["germany-batch-verifications"],
    queryFn: async (): Promise<BatchVerificationRow[]> => {
      const { data, error } = await supabase
        .from("germany_batch_verifications" as never)
        .select("id, token, pharmacy_license, batch_id, decision, reason, verified_by_email, created_at")
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return (data ?? []) as unknown as BatchVerificationRow[];
    },
  });
}

export function useVerifyBatch() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { token: string; pharmacy_license: string }) => {
      const { data, error } = await supabase.functions.invoke("germany-batch-verify", {
        body: input,
      });
      if (error) throw error;
      return data as { decision: string; reason: string | null; batch_id: string | null };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["germany-batch-verifications"] });
    },
  });
}
