import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Facility {
  id: string;
  name: string;
  facility_type: string;
  address: string | null;
  city: string | null;
  country: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  license_number: string | null;
  gmp_status: string;
  notes: string | null;
  is_active: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export type FacilityInsert = Omit<Facility, "id" | "created_at" | "updated_at">;
export type FacilityUpdate = Partial<FacilityInsert>;

const FACILITY_TYPES = [
  { value: "production", label: "Produktion" },
  { value: "laboratory", label: "Labor" },
  { value: "warehouse", label: "Lager" },
  { value: "farm", label: "Farm / Anbau" },
  { value: "processing", label: "Verarbeitung" },
  { value: "distribution", label: "Distribution" },
] as const;

const GMP_STATUSES = [
  { value: "pending", label: "Ausstehend", color: "bg-amber-500" },
  { value: "compliant", label: "Konform", color: "bg-emerald-500" },
  { value: "non_compliant", label: "Nicht konform", color: "bg-red-500" },
  { value: "in_review", label: "In Prüfung", color: "bg-blue-500" },
] as const;

export { FACILITY_TYPES, GMP_STATUSES };

export function useFacilities() {
  return useQuery<Facility[]>({
    queryKey: ["facilities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("facilities")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as unknown as Facility[];
    },
  });
}

export function useCreateFacility() {
  const qc = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (facility: FacilityInsert) => {
      const { data, error } = await supabase
        .from("facilities")
        .insert(facility as any)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Facility;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["facilities"] });
      toast({ title: "Produktionsstätte erstellt" });
    },
    onError: (e: Error) => {
      toast({ title: "Fehler", description: e.message, variant: "destructive" });
    },
  });
}

export function useUpdateFacility() {
  const qc = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: FacilityUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from("facilities")
        .update(updates as any)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Facility;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["facilities"] });
      toast({ title: "Produktionsstätte aktualisiert" });
    },
    onError: (e: Error) => {
      toast({ title: "Fehler", description: e.message, variant: "destructive" });
    },
  });
}

export function useDeleteFacility() {
  const qc = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("facilities").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["facilities"] });
      toast({ title: "Produktionsstätte gelöscht" });
    },
    onError: (e: Error) => {
      toast({ title: "Fehler", description: e.message, variant: "destructive" });
    },
  });
}
