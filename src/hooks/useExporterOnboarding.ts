import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export interface OnboardingData {
  id?: string;
  current_step: number;
  completed_steps: number[];
  status: string;
  tier: string;
  // Step 1
  company_name: string;
  legal_form: string;
  tax_id: string;
  country: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  contact_person: {
    name: string;
    position: string;
    email: string;
    phone: string;
  };
  website: string;
  // Step 2
  license_type: string[];
  license_number: string;
  issuing_authority: string;
  license_valid_from: string;
  license_valid_until: string;
  licensed_activities: string[];
  // NDA
  nda_accepted_at: string | null;
}

const EMPTY_ONBOARDING: OnboardingData = {
  current_step: 1,
  completed_steps: [],
  status: "draft",
  tier: "basic",
  company_name: "",
  legal_form: "",
  tax_id: "",
  country: "",
  address: { street: "", city: "", state: "", zip: "" },
  contact_person: { name: "", position: "", email: "", phone: "" },
  website: "",
  license_type: [],
  license_number: "",
  issuing_authority: "",
  license_valid_from: "",
  license_valid_until: "",
  licensed_activities: [],
  nda_accepted_at: null,
};

export function useExporterOnboarding() {
  const { user } = useAuth();
  const [data, setData] = useState<OnboardingData>(EMPTY_ONBOARDING);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load existing onboarding
  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoading(true);
      const { data: row, error } = await (supabase as any)
        .from("exporter_onboarding")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        console.error("Load onboarding error:", error);
      }

      if (row) {
        setData({
          id: row.id,
          current_step: row.current_step ?? 1,
          completed_steps: row.completed_steps ?? [],
          status: row.status ?? "draft",
          tier: row.tier ?? "basic",
          company_name: row.company_name ?? "",
          legal_form: row.legal_form ?? "",
          tax_id: row.tax_id ?? "",
          country: row.country ?? "",
          address: row.address ?? { street: "", city: "", state: "", zip: "" },
          contact_person: row.contact_person ?? { name: "", position: "", email: "", phone: "" },
          website: row.website ?? "",
          license_type: row.license_type ?? [],
          license_number: row.license_number ?? "",
          issuing_authority: row.issuing_authority ?? "",
          license_valid_from: row.license_valid_from ?? "",
          license_valid_until: row.license_valid_until ?? "",
          licensed_activities: row.licensed_activities ?? [],
          nda_accepted_at: row.nda_accepted_at ?? null,
        });
      }
      setLoading(false);
    })();
  }, [user]);

  // Save / upsert
  const save = useCallback(
    async (updates: Partial<OnboardingData>) => {
      if (!user) return;
      // Prevent editing after submission (unless resetting to draft)
      if (data.status === "submitted" || data.status === "under_review" || data.status === "approved") {
        if (updates.status !== "draft") {
          toast.error("Onboarding wurde bereits eingereicht und kann nicht mehr bearbeitet werden.");
          return;
        }
      }
      setSaving(true);

      const merged = { ...data, ...updates };
      const payload: any = {
        user_id: user.id,
        current_step: merged.current_step,
        completed_steps: merged.completed_steps,
        status: merged.status,
        tier: merged.tier,
        company_name: merged.company_name || null,
        legal_form: merged.legal_form || null,
        tax_id: merged.tax_id || null,
        country: merged.country || null,
        address: merged.address,
        contact_person: merged.contact_person,
        website: merged.website || null,
        license_type: merged.license_type,
        license_number: merged.license_number || null,
        issuing_authority: merged.issuing_authority || null,
        license_valid_from: merged.license_valid_from || null,
        license_valid_until: merged.license_valid_until || null,
        licensed_activities: merged.licensed_activities,
        nda_accepted_at: merged.nda_accepted_at,
      };

      // Pass through any additional fields (facility, products, etc.)
      const extraFields = [
        "facility_name", "facility_type", "total_area_sqm", "cultivation_area_sqm",
        "employee_count", "cleanroom_classes", "product_catalog", "batch_tracking_method",
        "traceability_level", "shinrai_assessment", "shinrai_score", "shinrai_rating",
        "submitted_at",
      ];
      for (const f of extraFields) {
        if (f in updates) {
          (payload as any)[f] = (updates as any)[f];
        }
      }

      let result;
      if (data.id) {
        result = await (supabase as any)
          .from("exporter_onboarding")
          .update(payload)
          .eq("id", data.id)
          .select()
          .single();
      } else {
        result = await (supabase as any)
          .from("exporter_onboarding")
          .insert(payload)
          .select()
          .single();
      }

      if (result.error) {
        console.error("Save onboarding error:", result.error);
        toast.error("Fehler beim Speichern");
      } else {
        setData((prev) => ({ ...prev, ...updates, id: result.data.id }));
        toast.success("Gespeichert");
      }
      setSaving(false);
    },
    [user, data]
  );

  // NDA acceptance
  const acceptNDA = useCallback(
    async (signeeName: string) => {
      if (!user) return false;
      const { error } = await (supabase as any)
        .from("terms_acceptances")
        .insert({
          user_id: user.id,
          term_type: "nda_exporter",
          version: "1.0",
          signee_name: signeeName,
        });

      if (error) {
        console.error("NDA acceptance error:", error);
        toast.error("Fehler bei NDA-Annahme");
        return false;
      }

      const now = new Date().toISOString();
      await save({ nda_accepted_at: now });
      toast.success("NDA akzeptiert");
      return true;
    },
    [user, save]
  );

  // Check NDA status
  const hasNDA = !!data.nda_accepted_at;

  return { data, setData, loading, saving, save, acceptNDA, hasNDA };
}
