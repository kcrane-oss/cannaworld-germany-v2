import { supabase } from "@/integrations/supabase/client";
import type { RegulatoryUpdate } from "./target-market-api";
import { getPayloadError, toErrorMessage, type ApiResult, type JsonRecord } from "./api-errors";

export interface AggregatedRegulatory {
  ai_cert: JsonRecord;
  marketplace: JsonRecord;
  combined: RegulatoryUpdate[];
}

async function invokeRegulatoryProxy<T>(body: JsonRecord): Promise<ApiResult<T>> {
  try {
    const { data, error } = await supabase.functions.invoke("regulatory-proxy", { body });
    if (error) return { data: null as T | null, error: error.message };
    const payloadError = getPayloadError(data);
    if (payloadError) return { data: null, error: payloadError };
    return { data: data as T, error: null };
  } catch (err: unknown) {
    return { data: null, error: toErrorMessage(err) };
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
  invokeRegulatoryProxy<{ updates: RegulatoryUpdate[]; stored: boolean }>({ action: "ai_cert_scan" });

/** Trigger AI scan via Marketplace */
export const triggerMarketplaceScan = () =>
  invokeRegulatoryProxy<{ alerts: RegulatoryUpdate[]; stored: number }>({ action: "marketplace_scan" });
