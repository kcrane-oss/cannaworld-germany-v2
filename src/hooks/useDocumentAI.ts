import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import type { OnboardingData } from "./useRoleOnboarding";

interface ExtractionResult {
  document_id: string;
  extraction: any;
}

interface ProfileResult {
  profile: Partial<OnboardingData> & { warnings: string[]; sources: any[]; role_data: Record<string, any> };
  document_count: number;
}

export function useDocumentAI() {
  const { t } = useTranslation();
  const [extracting, setExtracting] = useState(false);
  const [buildingProfile, setBuildingProfile] = useState(false);
  const [lastExtraction, setLastExtraction] = useState<ExtractionResult | null>(null);
  const [lastProfile, setLastProfile] = useState<ProfileResult | null>(null);

  /**
   * Extract data from a single uploaded document via AI.
   * Call this right after a document upload succeeds.
   */
  const extractDocument = useCallback(async (documentId: string, onboardingId: string): Promise<ExtractionResult | null> => {
    setExtracting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        toast.error(t("ob.ai_auth_error", "Please log in to use AI extraction"));
        return null;
      }

      const resp = await supabase.functions.invoke("onboarding-ai-extract", {
        body: {
          action: "extract",
          document_id: documentId,
          onboarding_id: onboardingId,
        },
      });

      if (resp.error) {
        console.error("AI extraction error:", resp.error);
        toast.error(t("ob.ai_extract_error", "AI document analysis failed"));
        return null;
      }

      const result = resp.data as ExtractionResult;
      setLastExtraction(result);
      toast.success(t("ob.ai_extract_success", "Document analyzed successfully"));
      return result;
    } catch (err) {
      console.error("AI extraction error:", err);
      toast.error(t("ob.ai_extract_error", "AI document analysis failed"));
      return null;
    } finally {
      setExtracting(false);
    }
  }, [t]);

  /**
   * Build a complete profile from ALL analyzed documents.
   * Returns merged data that can be applied to the onboarding form.
   */
  const buildProfile = useCallback(async (onboardingId: string, role: string): Promise<ProfileResult | null> => {
    setBuildingProfile(true);
    try {
      const resp = await supabase.functions.invoke("onboarding-ai-extract", {
        body: {
          action: "build_profile",
          onboarding_id: onboardingId,
          role,
        },
      });

      if (resp.error) {
        console.error("Profile build error:", resp.error);
        toast.error(t("ob.ai_profile_error", "Could not build profile from documents"));
        return null;
      }

      const result = resp.data as ProfileResult;
      setLastProfile(result);
      return result;
    } catch (err) {
      console.error("Profile build error:", err);
      return null;
    } finally {
      setBuildingProfile(false);
    }
  }, [t]);

  /**
   * Apply extracted profile data to the onboarding form.
   * Merges non-null extracted values with existing data (doesn't overwrite user edits).
   */
  const applyProfile = useCallback((
    currentData: OnboardingData,
    profile: ProfileResult["profile"],
    onSave: (patch: Partial<OnboardingData>) => Promise<void>
  ) => {
    const patch: Partial<OnboardingData> = {};

    // Only apply non-null values where current data is empty
    if (profile.company_name && !currentData.company_name) patch.company_name = profile.company_name;
    if (profile.legal_form && !currentData.legal_form) patch.legal_form = profile.legal_form;
    if (profile.tax_id && !currentData.tax_id) patch.tax_id = profile.tax_id;
    if (profile.country && !currentData.country) patch.country = profile.country;
    if (profile.website && !currentData.website) patch.website = profile.website as string;

    // Address
    if (profile.address) {
      const addr = { ...currentData.address };
      let changed = false;
      for (const [k, v] of Object.entries(profile.address)) {
        if (v && !(addr as any)[k]) {
          (addr as any)[k] = v;
          changed = true;
        }
      }
      if (changed) patch.address = addr;
    }

    // Contact
    if (profile.contact_person) {
      const cp = { ...currentData.contact_person };
      let changed = false;
      for (const [k, v] of Object.entries(profile.contact_person)) {
        if (v && !(cp as any)[k]) {
          (cp as any)[k] = v;
          changed = true;
        }
      }
      if (changed) patch.contact_person = cp;
    }

    // Licensing
    if (profile.license_type?.length && !currentData.license_type?.length) patch.license_type = profile.license_type as string[];
    if (profile.license_number && !currentData.license_number) patch.license_number = profile.license_number as string;
    if (profile.issuing_authority && !currentData.issuing_authority) patch.issuing_authority = profile.issuing_authority as string;
    if (profile.license_valid_from && !currentData.license_valid_from) patch.license_valid_from = profile.license_valid_from as string;
    if (profile.license_valid_until && !currentData.license_valid_until) patch.license_valid_until = profile.license_valid_until as string;
    if (profile.licensed_activities?.length && !currentData.licensed_activities?.length) patch.licensed_activities = profile.licensed_activities as string[];

    // Facility
    if (profile.facility_name && !currentData.facility_name) patch.facility_name = profile.facility_name as string;
    if (profile.facility_type && !currentData.facility_type) patch.facility_type = profile.facility_type as string;
    if (profile.total_area_sqm && !currentData.total_area_sqm) patch.total_area_sqm = profile.total_area_sqm as number;
    if (profile.cultivation_area_sqm && !currentData.cultivation_area_sqm) patch.cultivation_area_sqm = profile.cultivation_area_sqm as number;
    if (profile.employee_count && !currentData.employee_count) patch.employee_count = profile.employee_count as number;
    if (profile.cleanroom_classes?.length && !currentData.cleanroom_classes?.length) patch.cleanroom_classes = profile.cleanroom_classes as string[];

    // Role-specific data
    if (profile.role_data && Object.keys(profile.role_data).length > 0) {
      patch.role_data = { ...currentData.role_data };
      for (const [k, v] of Object.entries(profile.role_data)) {
        if (v && !(patch.role_data as any)[k]) {
          (patch.role_data as any)[k] = v;
        }
      }
    }

    if (Object.keys(patch).length > 0) {
      onSave(patch);
      const fieldCount = Object.keys(patch).length;
      toast.success(
        t("ob.ai_applied", "{{count}} fields auto-filled from documents").replace("{{count}}", String(fieldCount))
      );
    }

    return profile.warnings || [];
  }, [t]);

  return {
    extractDocument,
    buildProfile,
    applyProfile,
    extracting,
    buildingProfile,
    lastExtraction,
    lastProfile,
  };
}
