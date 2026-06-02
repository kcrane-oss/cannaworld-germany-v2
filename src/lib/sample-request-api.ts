import { supabase } from "@/integrations/supabase/client";
import type { SampleRequestData } from "@/lib/validation-schemas";

// Submits a B2B sample request through the germany-sample-request Edge Function
// (server-side: authenticated, rate-limited, validated, inserted into
// germany_sample_requests). The browser never writes the table directly.

export interface SampleRequestResult {
  id: string | null;
  status: "received";
}

export async function submitSampleRequest(data: SampleRequestData): Promise<SampleRequestResult> {
  const { data: res, error } = await supabase.functions.invoke("germany-sample-request", {
    body: data,
  });
  if (error) throw error;
  return res as SampleRequestResult;
}
