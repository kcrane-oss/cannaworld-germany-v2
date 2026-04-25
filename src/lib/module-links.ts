import { supabase } from "@/integrations/supabase/client";

/**
 * Creates inventory items for an approved batch automatically.
 */
export async function syncBatchToInventory(batchId: string, userId: string) {
  // Check if inventory item for this batch already exists
  const { data: existing } = await supabase
    .from("inventory_items")
    .select("id")
    .eq("batch_id", batchId)
    .maybeSingle();

  if (existing) return existing.id;

  // Get batch details
  const { data: batch, error: batchErr } = await supabase
    .from("batches")
    .select("product_name, quantity, unit")
    .eq("id", batchId)
    .single();

  if (batchErr || !batch) throw new Error("Batch nicht gefunden");

  const { data: item, error } = await supabase
    .from("inventory_items")
    .insert({
      batch_id: batchId,
      product_name: batch.product_name,
      quantity_on_hand: batch.quantity,
      unit: batch.unit,
      user_id: userId,
    } as any)
    .select("id")
    .single();

  if (error) throw error;
  return (item as any)?.id;
}

/**
 * When a recall is confirmed, reduce inventory for affected batches.
 */
export async function processRecallInventoryReduction(
  recallId: string,
  batchIds: string[],
  userId: string
) {
  for (const batchId of batchIds) {
    // Find inventory item for this batch
    const { data: invItem } = await supabase
      .from("inventory_items")
      .select("id, quantity_on_hand")
      .eq("batch_id", batchId)
      .maybeSingle();

    if (!invItem) continue;

    const item = invItem as any;

    // Create outbound movement for the full quantity
    await supabase.from("stock_movements").insert({
      inventory_item_id: item.id,
      movement_type: "recall_return",
      quantity: item.quantity_on_hand,
      reference_type: "recall",
      reference_id: recallId,
      reason: `Rückruf ${recallId}`,
      performed_by: userId,
    } as any);

    // Set stock to 0 (recalled)
    await supabase
      .from("inventory_items")
      .update({ quantity_on_hand: 0 } as any)
      .eq("id", item.id);
  }
}

/**
 * Create a shipment from a trade case.
 */
export async function createShipmentFromTradeCase(
  tradeCaseId: string,
  tradeCase: {
    exporter_country: string;
    importer_country: string;
    product_type: string;
  },
  userId: string
) {
  const { data, error } = await supabase
    .from("shipments")
    .insert({
      trade_case_id: tradeCaseId,
      origin_country: tradeCase.exporter_country,
      destination_country: tradeCase.importer_country,
      gdp_compliant: true,
      notes: `Automatisch erstellt aus Handelsfall`,
      created_by: userId,
    } as any)
    .select("id, shipment_number")
    .single();

  if (error) throw error;
  return data as any;
}
