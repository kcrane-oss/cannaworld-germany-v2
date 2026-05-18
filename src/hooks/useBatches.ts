import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface BatchRow {
  id: string;
  batch_number: string | null;
  product_name: string | null;
  strain: string | null;
  category: string | null;
  status: string | null;
  origin_country: string | null;
  quantity: number | null;
  unit: string | null;
  created_at: string;
}

export function useBatches() {
  return useQuery({
    queryKey: ["germany-batches"],
    queryFn: async (): Promise<BatchRow[]> => {
      const { data, error } = await supabase
        .from("batches")
        .select("id, batch_number, product_name, strain, category, status, origin_country, quantity, unit, created_at")
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return (data ?? []) as BatchRow[];
    },
  });
}
