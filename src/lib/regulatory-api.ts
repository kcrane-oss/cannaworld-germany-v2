import { supabase } from "@/integrations/supabase/client";
import type { RegulatoryUpdate } from "./target-market-api";

export interface AggregatedRegulatory {
  ai_cert: any;
  marketplace: any;
  combined: RegulatoryUpdate[];
}

async function invokeRegulatoryProxy<T>(body: Record<string, unknown>) {
  try {
    const { data, error } = await supabase.functions.invoke("regulatory-proxy", { body });
    if (error) return { data: null as T | null, error: error.message };
    if (data?.error) return { data: null as T | null, error: data.error };
    return { data: data as T, error: null };
  } catch (err: any) {
    return { data: null as T | null, error: err.message || "Unknown error" };
  }
}

export const aggregateRegulatoryUpdates = () =>
  invokeRegulatoryProxy<AggregatedRegulatory>({ action: "aggregate" });

export const syncRegulatoryAlert = (alert: {
  title: string;
  country_code: string;
  country_name?: string;
  severity?: string;
  change_type?: string;
  description?: string;
}) => invokeRegulatoryProxy<{ success: boolean }>({ action: "sync", ...alert });

/** Get regulatory updates from a specific source */
export const getRegulatoryUpdates = (source: "ai-cert" | "marketplace") =>
  invokeRegulatoryProxy<{ updates: RegulatoryUpdate[] }>({ action: "get_updates", source });

/** Trigger AI scan via AI Cert */
export const triggerAiCertScan = () =>
  invokeRegulatoryProxy<{ updates: any[]; stored: boolean }>({ action: "ai_cert_scan" });

/** Trigger AI scan via Marketplace */
export const triggerMarketplaceScan = () =>
  invokeRegulatoryProxy<{ alerts: any[]; stored: number }>({ action: "marketplace_scan" });
