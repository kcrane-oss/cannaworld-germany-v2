import { supabase } from "@/integrations/supabase/client";

async function invokeLimsProxy<T>(body: Record<string, unknown>) {
  try {
    const { data, error } = await supabase.functions.invoke("lims-proxy", { body });
    if (error) return { data: null as T | null, error: error.message };
    if (data?.error) return { data: null as T | null, error: data.error };
    return { data: data as T, error: null };
  } catch (err: any) {
    return { data: null as T | null, error: err.message || "Unknown error" };
  }
}

export const parseCoA = (params: {
  coa_url: string;
  batch_id?: string;
  lab_name?: string;
}) => invokeLimsProxy<{ success: boolean; lab_result: any; parsed_data: any }>({
  action: "parse_coa",
  ...params,
});

export const requestQpRelease = (labResultId: string) =>
  invokeLimsProxy<{ success: boolean; ai_recommendation: string }>({
    action: "request_qp_release",
    lab_result_id: labResultId,
  });
