import { supabase } from "@/integrations/supabase/client";
import { toErrorMessage } from "./api-errors";

interface CrossLoginResult {
  success: boolean;
  login_url: string;
  target: string;
  note?: string;
}

export async function getCrossLoginUrl(target: "ai-cert" | "marketplace" = "ai-cert") {
  try {
    const { data, error } = await supabase.functions.invoke("cross-login", {
      body: { target },
    });
    if (error) return { data: null as CrossLoginResult | null, error: error.message };
    if (data?.error) return { data: null as CrossLoginResult | null, error: data.error };
    return { data: data as CrossLoginResult, error: null };
  } catch (err: unknown) {
    return { data: null as CrossLoginResult | null, error: toErrorMessage(err) };
  }
}
