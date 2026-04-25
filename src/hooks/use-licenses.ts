import { getErrorMessage } from "@/lib/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export interface License {
  id: string;
  license_number: string;
  license_type: "import" | "export" | "transit" | "dea_registration" | "fda_establishment" | "health_canada" | "tga_license" | "odc_permit" | "mhra_license" | "home_office";
  status: "draft" | "applied" | "approved" | "active" | "expired" | "revoked" | "suspended";
  issuing_authority: string;
  legal_basis: string | null;
  country_origin: string | null;
  country_destination: string | null;
  facility_id: string | null;
  product_categories: string[];
  max_quantity_kg: number | null;
  issued_at: string | null;
  valid_from: string | null;
  valid_until: string | null;
  applied_at: string | null;
  owner_id: string;
  contact_person: string | null;
  notes: string | null;
  conditions: string | null;
  document_url: string | null;
  created_at: string;
  updated_at: string;
}

export function useLicenses() {
  const { user } = useAuth();
  const { toast } = useToast();
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ["licenses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("import_export_licenses" as any)
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as License[];
    },
    enabled: !!user,
  });

  const create = useMutation({
    mutationFn: async (input: Partial<License>) => {
      const { data, error } = await supabase
        .from("import_export_licenses" as any)
        .insert({ ...input, owner_id: user!.id } as any)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["licenses"] });
      toast({ title: "Lizenz erstellt" });
    },
    onError: (e: unknown) => toast({ title: "Fehler", description: getErrorMessage(e), variant: "destructive" }),
  });

  const update = useMutation({
    mutationFn: async ({ id, ...rest }: Partial<License> & { id: string }) => {
      const { error } = await supabase
        .from("import_export_licenses" as any)
        .update(rest as any)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["licenses"] });
      toast({ title: "Lizenz aktualisiert" });
    },
    onError: (e: unknown) => toast({ title: "Fehler", description: getErrorMessage(e), variant: "destructive" }),
  });

  return { ...query, create, update };
}
