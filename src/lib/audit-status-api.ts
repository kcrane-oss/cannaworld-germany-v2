import { supabase } from "@/integrations/supabase/client";
import { getPayloadError, toErrorMessage, type ApiResult, type JsonRecord } from "@cannaworld/sdk";

export interface AuditStatusResult {
  source: string;
  version: string;
  audit: {
    id: string;
    title: string;
    status: string;
    ampel: string;
    overall_score: number;
    facility: string;
    completed_at: string;
    created_at: string;
    category_scores: Record<string, { green: number; yellow: number; red: number; total: number }>;
    total_items: number;
  };
}

export interface CompanyComplianceResult {
  source: string;
  compliance: {
    company_id: string;
    gmp_status: "compliant" | "conditional" | "non_compliant" | "unknown";
    latest_ampel: string | null;
    latest_score: number | null;
    total_audits: number;
    completed_audits: number;
    audits: Array<{
      id: string;
      title: string;
      status: string;
      ampel: string;
      overall_score: number;
      facility: string;
      completed_at: string;
    }>;
  };
}

export interface CertificateVerification {
  source: string;
  verified: boolean;
  certificate: {
    number: string;
    participant: string;
    session: string;
    session_date: string;
    issued_at: string;
    expires_at: string;
    expired: boolean;
    integrity_hash: string;
  };
}

export interface UniverseStats {
  source: string;
  stats: {
    audits: { total: number; completed: number };
    certificates: { total: number };
    sessions: { total: number };
    closing_reports: { total: number };
    ampel_distribution: { green: number; yellow: number; red: number };
  };
}

const NEW_FUNCTIONS_URL = import.meta.env.VITE_SUPABASE_URL + "/functions/v1";

async function invokeAuditProxy<T>(body: JsonRecord): Promise<ApiResult<T>> {
  try {
    // Get current user's auth token for the request
    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData?.session?.access_token;

    const response = await fetch(`${NEW_FUNCTIONS_URL}/audit-status-proxy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errText = await response.text();
      return { data: null as T | null, error: `Edge Function error ${response.status}: ${errText}` };
    }

    const data = await response.json();
    const payloadError = getPayloadError(data);
    if (payloadError) return { data: null, error: payloadError };
    return { data: data as T, error: null };
  } catch (err: unknown) {
    return { data: null, error: toErrorMessage(err) };
  }
}

export const getAuditStatus = (auditId: string) =>
  invokeAuditProxy<AuditStatusResult>({ action: "audit_status", audit_id: auditId });

export const getCompanyCompliance = (companyId: string) =>
  invokeAuditProxy<CompanyComplianceResult>({ action: "company_compliance", company_id: companyId });

export const verifyCertificate = (certificateNumber: string) =>
  invokeAuditProxy<CertificateVerification>({ action: "verify_certificate", certificate_number: certificateNumber });

export const verifyReport = (reportNumber: string, hash?: string) =>
  invokeAuditProxy<{ verified: boolean; report: JsonRecord }>({ action: "verify_report", report_number: reportNumber, hash });

export const getUniverseStats = () =>
  invokeAuditProxy<UniverseStats>({ action: "universe_stats" });
