import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface QPReleaseDecision {
  id: string;
  batch_id: string;
  facility_id: string | null;
  decision: "approved" | "rejected" | "conditional" | "pending_review";
  decision_date: string;
  qp_user_id: string;
  qp_name: string;
  qp_qualification: string | null;
  qp_license_number: string | null;
  review_checklist: any[];
  conditions: string | null;
  rejection_reason: string | null;
  remarks: string | null;
  coa_verified: boolean;
  gmp_compliance_confirmed: boolean;
  specification_met: boolean;
  stability_data_reviewed: boolean;
  signature_url: string | null;
  integrity_hash: string | null;
  escalation_level: number;
  escalated_to: string | null;
  escalated_at: string | null;
  escalation_reason: string | null;
  created_at: string;
  updated_at: string;
}

export type QPReleaseInsert = Omit<QPReleaseDecision, "id" | "created_at" | "updated_at">;

const QP_DECISIONS = [
  { value: "pending_review", label: "Prüfung ausstehend", color: "bg-amber-500" },
  { value: "approved", label: "Freigegeben", color: "bg-emerald-500" },
  { value: "conditional", label: "Bedingte Freigabe", color: "bg-blue-500" },
  { value: "rejected", label: "Abgelehnt", color: "bg-red-500" },
] as const;

const QP_CHECKLIST_ITEMS = [
  { id: "identity", label: "Identitätsprüfung des Produkts", category: "Qualität" },
  { id: "purity", label: "Reinheitsprüfung / Verunreinigungen", category: "Qualität" },
  { id: "potency", label: "Wirkstoffgehalt (THC/CBD) innerhalb der Spezifikation", category: "Qualität" },
  { id: "micro", label: "Mikrobiologische Prüfung bestanden", category: "Qualität" },
  { id: "pesticides", label: "Pestizid-Rückstände innerhalb der Grenzwerte", category: "Qualität" },
  { id: "heavy_metals", label: "Schwermetall-Analyse bestanden", category: "Qualität" },
  { id: "mycotoxins", label: "Mykotoxin-Prüfung bestanden", category: "Qualität" },
  { id: "coa", label: "Analysenzertifikat (CoA) geprüft und genehmigt", category: "Dokumentation" },
  { id: "batch_record", label: "Chargenprotokoll vollständig und korrekt", category: "Dokumentation" },
  { id: "deviation_check", label: "Keine offenen Abweichungen für diese Charge", category: "Dokumentation" },
  { id: "gmp_compliance", label: "GMP-Konformität der Herstellungsbedingungen bestätigt", category: "GMP" },
  { id: "stability", label: "Stabilitätsdaten geprüft (falls zutreffend)", category: "GMP" },
  { id: "packaging", label: "Verpackung und Kennzeichnung korrekt", category: "GMP" },
  { id: "storage", label: "Lagerbedingungen eingehalten", category: "GMP" },
] as const;

export { QP_DECISIONS, QP_CHECKLIST_ITEMS };

export function useQPReleaseDecisions(batchId?: string) {
  return useQuery<QPReleaseDecision[]>({
    queryKey: ["qp-release-decisions", batchId],
    queryFn: async () => {
      let query = supabase
        .from("qp_release_decisions")
        .select("*")
        .order("created_at", { ascending: false });

      if (batchId) {
        query = query.eq("batch_id", batchId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data || []) as unknown as QPReleaseDecision[];
    },
  });
}

export function useCreateQPRelease() {
  const qc = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (decision: Partial<QPReleaseInsert>) => {
      const { data, error } = await supabase
        .from("qp_release_decisions")
        .insert(decision as any)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as QPReleaseDecision;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["qp-release-decisions"] });
      toast({ title: "QP-Freigabeentscheidung erstellt" });
    },
    onError: (e: Error) => {
      toast({ title: "Fehler", description: e.message, variant: "destructive" });
    },
  });
}

export function useUpdateQPRelease() {
  const qc = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<QPReleaseInsert> & { id: string }) => {
      const { data, error } = await supabase
        .from("qp_release_decisions")
        .update(updates as any)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as QPReleaseDecision;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["qp-release-decisions"] });
      toast({ title: "QP-Entscheidung aktualisiert" });
    },
    onError: (e: Error) => {
      toast({ title: "Fehler", description: e.message, variant: "destructive" });
    },
  });
}
