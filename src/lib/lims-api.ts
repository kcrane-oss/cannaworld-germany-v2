import { supabase } from "@/integrations/supabase/client";
import { getPayloadError, toErrorMessage, type JsonRecord } from "./api-errors";

async function invokeLimsProxy<T>(body: JsonRecord) {
  try {
    const { data, error } = await supabase.functions.invoke("lims-proxy", { body });
    if (error) return { data: null as T | null, error: error.message };
    const payloadError = getPayloadError(data);
    if (payloadError) return { data: null, error: payloadError };
    return { data: data as T, error: null };
  } catch (err: unknown) {
    return { data: null as T | null, error: toErrorMessage(err) };
  }
}

export const parseCoA = (params: {
  coa_url: string;
  batch_id?: string;
  lab_name?: string;
}) => invokeLimsProxy<{ success: boolean; lab_result: JsonRecord; parsed_data: JsonRecord }>({
  action: "parse_coa",
  ...params,
});

export const requestQpRelease = (labResultId: string) =>
  invokeLimsProxy<{ success: boolean; ai_recommendation: string }>({
    action: "request_qp_release",
    lab_result_id: labResultId,
  });
