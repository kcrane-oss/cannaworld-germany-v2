import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import type { OnboardingRole } from "@/components/role-onboarding/config/role-configs";

export interface OnboardingData {
  id?: string;
  current_step: number;
  completed_steps: number[];
  status: string;
  tier: string;
  role: OnboardingRole;

  // Step 1: Company / Profile
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

  // Step 2: Licensing (shared fields)
  license_type: string[];
  license_number: string;
  issuing_authority: string;
  license_valid_from: string;
  license_valid_until: string;
  licensed_activities: string[];

  // Step 3: Facility (shared exporter fields)
  facility_name: string;
  facility_type: string;
  total_area_sqm: number | null;
  cultivation_area_sqm: number | null;
  employee_count: number | null;
  cleanroom_classes: string[];

  // Step 4: Products
  product_catalog: any[];
  batch_tracking_method: string;
  traceability_level: string;

  // Step 5: ShinrAi
  shinrai_assessment: Record<string, any> | null;
  shinrai_score: number | null;
  shinrai_rating: string | null;

  // NDA
  nda_accepted_at: string | null;

  // Role-specific data (flexible JSONB)
  role_data: Record<string, any>;
}

const EMPTY_ONBOARDING = (role: OnboardingRole): OnboardingData => ({
  current_step: 1,
  completed_steps: [],
  status: "draft",
  tier: "basic",
  role,
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
  facility_name: "",
  facility_type: "",
  total_area_sqm: null,
  cultivation_area_sqm: null,
  employee_count: null,
  cleanroom_classes: [],
  product_catalog: [],
  batch_tracking_method: "",
  traceability_level: "",
  shinrai_assessment: null,
  shinrai_score: null,
  shinrai_rating: null,
  nda_accepted_at: null,
  role_data: {},
});

export function useRoleOnboarding(role: OnboardingRole) {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [data, setData] = useState<OnboardingData>(EMPTY_ONBOARDING(role));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasNDA, setHasNDA] = useState(false);

  // Load existing onboarding for this role
  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoading(true);
      const { data: row, error } = await (supabase as any)
        .from("exporter_onboarding")
        .select("*")
        .eq("user_id", user.id)
        .eq("role", role)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        console.error("Load onboarding error:", error);
      }

      if (row) {
        setData({
          ...EMPTY_ONBOARDING(role),
          ...row,
          address: row.address || { street: "", city: "", state: "", zip: "" },
          contact_person: row.contact_person || { name: "", position: "", email: "", phone: "" },
          role_data: row.role_data || {},
        });
      }

      // Check NDA
      const { data: nda } = await (supabase as any)
        .from("terms_acceptances")
        .select("id")
        .eq("user_id", user.id)
        .eq("term_type", `nda_${role}`)
        .maybeSingle();

      setHasNDA(!!nda);
      setLoading(false);
    })();
  }, [user, role]);

  const save = useCallback(
    async (patch: Partial<OnboardingData>) => {
      if (!user) return;
      setSaving(true);
      try {
        const updated = { ...data, ...patch };
        setData(updated);

        const payload: any = {
          user_id: user.id,
          role,
          current_step: updated.current_step,
          completed_steps: updated.completed_steps,
          status: updated.status,
          tier: updated.tier,
          company_name: updated.company_name,
          legal_form: updated.legal_form,
          tax_id: updated.tax_id,
          country: updated.country,
          address: updated.address,
          contact_person: updated.contact_person,
          website: updated.website,
          license_type: updated.license_type,
          license_number: updated.license_number,
          issuing_authority: updated.issuing_authority,
          license_valid_from: updated.license_valid_from || null,
          license_valid_until: updated.license_valid_until || null,
          licensed_activities: updated.licensed_activities,
          facility_name: updated.facility_name,
          facility_type: updated.facility_type,
          total_area_sqm: updated.total_area_sqm,
          cultivation_area_sqm: updated.cultivation_area_sqm,
          employee_count: updated.employee_count,
          cleanroom_classes: updated.cleanroom_classes,
          product_catalog: updated.product_catalog,
          batch_tracking_method: updated.batch_tracking_method,
          traceability_level: updated.traceability_level || null,
          shinrai_assessment: updated.shinrai_assessment,
          shinrai_score: updated.shinrai_score,
          shinrai_rating: updated.shinrai_rating,
          role_data: updated.role_data,
        };

        if (updated.status === "submitted" && !data.submitted_at) {
          (payload as any).submitted_at = new Date().toISOString();
        }

        const { error } = await (supabase as any)
          .from("exporter_onboarding")
          .upsert(payload, { onConflict: "user_id,role" });

        if (error) {
          console.error("Save error:", error);
          toast.error(t("ob.save_error", "Save failed"));
        }
      } finally {
        setSaving(false);
      }
    },
    [user, data, role, t]
  );

  const acceptNDA = useCallback(
    async (signeeName: string) => {
      if (!user) return false;
      setSaving(true);
      try {
        const { error } = await (supabase as any)
          .from("terms_acceptances")
          .insert({
            user_id: user.id,
            term_type: `nda_${role}`,
            version: "1.0",
            signee_name: signeeName,
            metadata: { role },
          });

        if (error) {
          console.error("NDA error:", error);
          toast.error(t("ob.nda_error", "Could not accept NDA"));
          return false;
        }

        // Update onboarding record
        await save({ nda_accepted_at: new Date().toISOString() } as any);
        setHasNDA(true);
        return true;
      } finally {
        setSaving(false);
      }
    },
    [user, role, save, t]
  );

  return { data, loading, saving, save, acceptNDA, hasNDA };
}
