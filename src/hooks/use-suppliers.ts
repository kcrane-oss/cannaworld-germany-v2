import { getErrorMessage } from "@/lib/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export type SupplierStatus = "pending" | "under_review" | "qualified" | "conditionally_qualified" | "disqualified" | "suspended";

export interface Supplier {
  id: string;
  supplier_number: string;
  name: string;
  category: string;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  gmp_score: number | null;
  quality_score: number | null;
  delivery_score: number | null;
  documentation_score: number | null;
  overall_score: number | null;
  status: SupplierStatus;
  qualification_date: string | null;
  next_review_date: string | null;
  review_interval_days: number;
  approved_by: string | null;
  approved_at: string | null;
  rejection_reason: string | null;
  gmp_certificate_url: string | null;
  gmp_certificate_expiry: string | null;
  iso_certified: boolean;
  license_number: string | null;
  last_audit_id: string | null;
  facility_id: string | null;
  notes: string | null;
  tags: string[];
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export function useSuppliers() {
  return useQuery({
    queryKey: ["suppliers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("suppliers" as any)
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as unknown as Supplier[];
    },
  });
}

export function useCreateSupplier() {
  const qc = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: Partial<Supplier>) => {
      const count = await supabase
        .from("suppliers" as any)
        .select("id", { count: "exact", head: true });
      const num = ((count.count ?? 0) + 1).toString().padStart(4, "0");
      const row = {
        ...input,
        supplier_number: `SUP-${num}`,
        created_by: user?.id,
      };
      const { data, error } = await supabase.from("suppliers" as any).insert(row as any).select().single();
      if (error) throw error;
      return data as unknown as Supplier;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["suppliers"] });
      toast({ title: "Lieferant erstellt" });
    },
    onError: (e: unknown) => toast({ title: "Fehler", description: getErrorMessage(e), variant: "destructive" }),
  });
}

export function useUpdateSupplier() {
  const qc = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Supplier> & { id: string }) => {
      const { data, error } = await supabase
        .from("suppliers" as any)
        .update(updates as any)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Supplier;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["suppliers"] });
      toast({ title: "Lieferant aktualisiert" });
    },
    onError: (e: unknown) => toast({ title: "Fehler", description: getErrorMessage(e), variant: "destructive" }),
  });
}
