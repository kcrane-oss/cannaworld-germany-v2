import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DashboardStats {
  activeTradeCases: number;
  batchesInProgress: number;
  openRecalls: number;
  activeShipments: number;
  totalInventoryItems: number;
  lowStockAlerts: number;
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async (): Promise<DashboardStats> => {
      const [tradeCases, batches, recalls, shipments, inventory] = await Promise.all([
        supabase.from("trade_cases").select("id", { count: "exact", head: true })
          .not("status", "in", '("completed","cancelled")'),
        supabase.from("batches").select("id", { count: "exact", head: true })
          .in("status", ["submitted", "under_review"]),
        supabase.from("recalls").select("id", { count: "exact", head: true })
          .not("status", "in", '("completed","closed")'),
        supabase.from("shipments").select("id", { count: "exact", head: true })
          .in("status", ["planned", "picked_up", "in_transit", "customs"]),
        supabase.from("inventory_items").select("id, quantity_on_hand, minimum_stock"),
      ]);

      const invItems = inventory.data ?? [];
      const lowStock = invItems.filter((i: any) => i.quantity_on_hand <= i.minimum_stock && i.quantity_on_hand > 0).length;

      return {
        activeTradeCases: tradeCases.count ?? 0,
        batchesInProgress: batches.count ?? 0,
        openRecalls: recalls.count ?? 0,
        activeShipments: shipments.count ?? 0,
        totalInventoryItems: invItems.length,
        lowStockAlerts: lowStock,
      };
    },
    refetchInterval: 60_000,
  });
}
