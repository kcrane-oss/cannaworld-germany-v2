import { supabase } from "@/integrations/supabase/client";
import type { SampleRequestData } from "@/lib/validation-schemas";
import type { SampleRequestStatus } from "@/lib/sample-request-status";

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

// Admin status transition. Server-side: authenticated, role-checked
// (admin/compliance), rate-limited, validated against the allowed workflow.
export async function updateSampleRequestStatus(
  id: string,
  status: SampleRequestStatus
): Promise<{ id: string; status: SampleRequestStatus }> {
  const { data: res, error } = await supabase.functions.invoke("germany-sample-request-status", {
    body: { id, status },
  });
  if (error) throw error;
  return res as { id: string; status: SampleRequestStatus };
}
