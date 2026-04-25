import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, FileKey } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { OnboardingData } from "@/hooks/useRoleOnboarding";
import type { RoleConfig } from "../config/role-configs";
import { DocumentUploadField, type UploadedDoc } from "../DocumentUploadField";

interface Props {
  data: OnboardingData;
  roleConfig: RoleConfig;
  onSave: (patch: Partial<OnboardingData>) => Promise<void>;
  onBack: () => void;
  saving: boolean;
  docs: UploadedDoc[];
  onDocsRefresh: () => void;
}

// License type options per role
const LICENSE_OPTIONS: Record<string, { value: string; label: string }[]> = {
  exporter: [
    { value: "cultivation", label: "Cultivation" },
    { value: "processing", label: "Processing / Manufacturing" },
    { value: "export", label: "Export" },
    { value: "distribution", label: "Distribution" },
  ],
  importer: [
    { value: "import", label: "Import" },
    { value: "wholesale", label: "Wholesale Distribution" },
    { value: "narcotics", label: "Narcotics Handling" },
  ],
  farm: [
    { value: "cultivation", label: "Cultivation" },
    { value: "seed_production", label: "Seed Production" },
    { value: "research", label: "Research" },
  ],
  lab_provider: [
    { value: "testing", label: "Cannabis Testing" },
    { value: "research", label: "Research & Development" },
    { value: "calibration", label: "Calibration Services" },
  ],
  logistics: [
    { value: "transport", label: "Transport" },
    { value: "warehouse", label: "Warehousing" },
    { value: "cold_chain", label: "Cold Chain" },
    { value: "customs", label: "Customs Brokerage" },
  ],
  auditor: [
    { value: "gmp", label: "EU-GMP Auditing" },
    { value: "gacp", label: "GACP Auditing" },
    { value: "iso", label: "ISO Auditing" },
    { value: "gdp", label: "GDP Auditing" },
  ],
  inspector: [
    { value: "facility", label: "Facility Inspection" },
    { value: "product", label: "Product Inspection" },
    { value: "import_control", label: "Import Control" },
  ],
  shop: [
    { value: "retail", label: "Retail" },
    { value: "medical", label: "Medical Dispensary" },
    { value: "online", label: "Online Sales" },
  ],
  pharmacy: [
    { value: "dispensing", label: "Dispensing" },
    { value: "compounding", label: "Compounding" },
    { value: "narcotics", label: "Narcotics Handling" },
  ],
  trader: [
    { value: "broker", label: "Broker / Intermediary" },
    { value: "wholesale", label: "Wholesale Trade" },
    { value: "international", label: "International Trade" },
  ],
};

export function LicensingStep({ data, roleConfig, onSave, onBack, saving, docs, onDocsRefresh }: Props) {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const licenseOpts = LICENSE_OPTIONS[roleConfig.role] || [];
  const step2Docs = roleConfig.documents.filter((d) => d.step === 2);

  const toggleLicenseType = (val: string) => {
    const current = data.license_type || [];
    const next = current.includes(val) ? current.filter((v) => v !== val) : [...current, val];
    onSave({ license_type: next });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!data.license_number?.trim() && !["auditor", "inspector"].includes(roleConfig.role)) {
      errs.license_number = t("ob.required", "Required");
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    const completed = data.completed_steps.includes(2) ? data.completed_steps : [...data.completed_steps, 2];
    onSave({ current_step: 3, completed_steps: completed });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <FileKey className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{t(roleConfig.steps[1]?.label || "ob.step_licensing", "Licensing & Credentials")}</h2>
          <p className="text-sm text-muted-foreground">{t("ob.step2_desc", "Provide your licenses and certifications")}</p>
        </div>
      </div>

      {/* License Types */}
      {licenseOpts.length > 0 && (
        <div className="space-y-3">
          <Label>{t("ob.license_types", "License Types")}</Label>
          <div className="grid gap-2 md:grid-cols-2">
            {licenseOpts.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 p-2 rounded-md border cursor-pointer hover:bg-secondary/50 transition-colors">
                <Checkbox
                  checked={(data.license_type || []).includes(opt.value)}
                  onCheckedChange={() => toggleLicenseType(opt.value)}
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>{t("ob.license_number", "License / Certificate Number")} *</Label>
          <Input
            value={data.license_number}
            onChange={(e) => onSave({ license_number: e.target.value })}
            className={errors.license_number ? "border-red-500" : ""}
          />
          {errors.license_number && <p className="text-xs text-red-500">{errors.license_number}</p>}
        </div>
        <div className="space-y-2">
          <Label>{t("ob.issuing_authority", "Issuing Authority")}</Label>
          <Input value={data.issuing_authority} onChange={(e) => onSave({ issuing_authority: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>{t("ob.valid_from", "Valid From")}</Label>
          <Input type="date" value={data.license_valid_from} onChange={(e) => onSave({ license_valid_from: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>{t("ob.valid_until", "Valid Until")}</Label>
          <Input type="date" value={data.license_valid_until} onChange={(e) => onSave({ license_valid_until: e.target.value })} />
        </div>
      </div>

      {/* Step 2 Documents */}
      {step2Docs.length > 0 && data.id && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground">{t("ob.documents", "Documents")}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {step2Docs.map((doc) => (
              <DocumentUploadField
                key={doc.type}
                onboardingId={data.id!}
                step={2}
                documentType={doc.type}
                label={t(doc.label, doc.type)}
                required={doc.required}
                existingDocs={docs}
                onUploaded={onDocsRefresh}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}><ArrowLeft className="mr-2 h-4 w-4" />{t("ob.back", "Back")}</Button>
        <Button onClick={handleNext} disabled={saving} size="lg">
          {t("ob.next", "Continue")} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
