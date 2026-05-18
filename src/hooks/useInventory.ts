import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface InventoryRow {
  id: string;
  product_name: string;
  location: string;
  quantity_on_hand: number;
  quantity_reserved: number;
  quantity_available: number | null;
  minimum_stock: number;
  unit: string;
  batch_id: string | null;
  updated_at: string;
}

export function useInventory() {
  return useQuery({
    queryKey: ["germany-inventory"],
    queryFn: async (): Promise<InventoryRow[]> => {
      const { data, error } = await supabase
        .from("inventory_items")
        .select("id, product_name, location, quantity_on_hand, quantity_reserved, quantity_available, minimum_stock, unit, batch_id, updated_at")
        .order("updated_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return (data ?? []) as InventoryRow[];
    },
  });
}
