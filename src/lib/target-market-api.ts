import { supabase } from "@/integrations/supabase/client";

export interface MarketAnalysisResult {
  results?: Array<{
    country_code: string;
    country_name: string;
    exportable: boolean;
    status: "green" | "yellow" | "red";
    reasons: string[];
    notes: string;
    region: string;
  }>;
}

export interface RegulatoryUpdate {
  id?: string;
  title: string;
  country_code?: string;
  country_name?: string;
  severity?: string;
  change_type?: string;
  description?: string;
  source?: string;
  category?: string;
  created_at?: string;
  source_platform?: string;
}

async function invokeTargetMarket<T>(body: Record<string, unknown>) {
  try {
    const { data, error } = await supabase.functions.invoke("target-market-proxy", { body });
    if (error) return { data: null as T | null, error: error.message };
    if (data?.error) return { data: null as T | null, error: data.error };
    return { data: data as T, error: null };
  } catch (err: any) {
    return { data: null as T | null, error: err.message || "Unknown error" };
  }
}

export const analyzeTargetMarkets = (batch: {
  thc: number;
  cbd: number;
  certification: string;
  category: string;
  strain?: string;
  product?: string;
  origin?: string;
}) => invokeTargetMarket<MarketAnalysisResult>({ action: "analyze", ...batch });

export const getRegulations = () =>
  invokeTargetMarket<{ regulations: Record<string, any> }>({ action: "get_regulations" });

export const runRegulatoryAiScan = () =>
  invokeTargetMarket<{ alerts: any[] }>({ action: "ai_scan" });

export const getRegulatoryUpdates = () =>
  invokeTargetMarket<{ updates: RegulatoryUpdate[] }>({ action: "get_updates" });
