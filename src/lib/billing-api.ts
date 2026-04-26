import { supabase } from "@/integrations/supabase/client";
import { getPayloadError, toErrorMessage, type ApiResult, type JsonRecord } from "./api-errors";

export interface Invoice {
  id: string;
  invoice_number: string;
  user_id: string;
  created_by: string;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled" | "refunded";
  payment_method: "stripe" | "bank_transfer" | "crypto" | "manual";
  currency: string;
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  description: string | null;
  notes: string | null;
  due_date: string | null;
  paid_at: string | null;
  stripe_invoice_id: string | null;
  stripe_payment_intent_id: string | null;
  stripe_payment_url: string | null;
  created_at: string;
  updated_at: string;
  invoice_items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
  stripe_price_id: string | null;
  created_at: string;
}

export interface SubscriptionStatus {
  subscribed: boolean;
  product_id?: string;
  plan_name?: string;
  subscription_end?: string;
  cancel_at_period_end?: boolean;
  is_trialing?: boolean;
  trial_end?: string | null;
}

export const PLANS = {
  trial: {
    name: "Testzugang",
    price_id: "price_1T5Dtj6ntbUMqTKO2ShXywG2",
    product_id: "prod_U3KY0GjoR59vF3",
    price: 0,
    price_after_trial: 499,
    trial_days: 10,
    currency: "EUR",
    features: [
      "10 Tage kostenlos testen",
      "Für zertifizierte Teilnehmer",
      "Voller Plattformzugang",
      "Compliance-Dashboard & KI-Tools",
      "E-Mail Support",
      "Wird automatisch zum GMP-Abo",
    ],
  },
  gmp: {
    name: "GMP",
    price_id: "price_1T5DMF6ntbUMqTKOIDyI8VBZ",
    product_id: "prod_U3K0YVsjc0VJGx",
    price: 499,
    currency: "EUR",
    features: [
      "Voller Plattformzugang",
      "Compliance-Dashboard",
      "KI-Analyse & Reports",
      "Marketplace Zugang",
      "Unbegrenzte Dokumente",
      "E-Mail & Chat Support",
      "API-Zugang",
    ],
  },
  enterprise: {
    name: "Enterprise",
    price_id: "price_1T5DMW6ntbUMqTKO7XbAk178",
    product_id: "prod_U3K08pj8CgB20r",
    price: 1199,
    currency: "EUR",
    features: [
      "Alles aus GMP",
      "Dedizierter Account Manager",
      "ShinrAi Compliance Score",
      "Multi-Facility Management",
      "SLA & Priority Support",
      "Custom Integrationen (SAP, ERP)",
      "Audit-Vorbereitung & Begleitung",
    ],
  },
} as const;

async function invokeBilling<T>(body: JsonRecord): Promise<ApiResult<T>> {
  try {
    const { data, error } = await supabase.functions.invoke("billing", { body });
    if (error) return { data: null, error: error.message };
    const payloadError = getPayloadError(data);
    if (payloadError) return { data: null, error: payloadError };
    return { data: data as T, error: null };
  } catch (err: unknown) {
    return { data: null, error: toErrorMessage(err) };
  }
}

export async function createCheckout(priceId: string, trialDays?: number) {
  return invokeBilling<{ url: string }>({ action: "create_checkout", price_id: priceId, trial_days: trialDays });
}

export async function checkSubscription() {
  return invokeBilling<SubscriptionStatus>({ action: "check_subscription" });
}

export async function openCustomerPortal() {
  return invokeBilling<{ url: string }>({ action: "customer_portal" });
}

export async function createInvoice(params: {
  target_user_id: string;
  items: { description: string; quantity: number; unit_price: number }[];
  payment_method?: string;
  due_date?: string;
  description?: string;
  notes?: string;
  tax_rate?: number;
}) {
  return invokeBilling<{ invoice: Invoice }>({ action: "create_invoice", ...params });
}

export async function sendInvoice(invoiceId: string) {
  return invokeBilling<{ success: boolean; payment_url?: string }>({
    action: "send_invoice",
    invoice_id: invoiceId,
  });
}

export async function markInvoicePaid(invoiceId: string) {
  return invokeBilling<{ success: boolean }>({
    action: "mark_paid",
    invoice_id: invoiceId,
  });
}

export async function listInvoices(params?: { target_user_id?: string; status?: string }) {
  return invokeBilling<{ invoices: Invoice[] }>({
    action: "list_invoices",
    ...params,
  });
}

export async function downloadInvoicePdf(invoiceId: string): Promise<void> {
  try {
    const { data, error } = await supabase.functions.invoke("invoice-pdf", {
      body: { invoice_id: invoiceId },
    });

    if (error || data?.error) {
      throw new Error(data?.error || error?.message || "PDF download failed");
    }

    // Convert base64 to blob and trigger download
    const byteCharacters = atob(data.pdf);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = data.filename || "rechnung.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err: unknown) {
    throw new Error(toErrorMessage(err, "PDF download failed"));
  }
}
