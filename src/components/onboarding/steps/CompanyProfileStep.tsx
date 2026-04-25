import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Building2, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { OnboardingData } from "@/hooks/useRoleOnboarding";
import type { RoleConfig } from "../config/role-configs";
import { DocumentUploadField, type UploadedDoc } from "../DocumentUploadField";
import { PersonnelSection } from "../PersonnelSection";

interface Props {
  data: OnboardingData;
  roleConfig: RoleConfig;
  onSave: (patch: Partial<OnboardingData>) => Promise<void>;
  saving: boolean;
  docs: UploadedDoc[];
  onDocsRefresh: () => void;
}

const LEGAL_FORMS = [
  { value: "ltd", label: "Limited Company (Ltd.)" },
  { value: "plc", label: "Public Limited Company (PLC)" },
  { value: "gmbh", label: "GmbH" },
  { value: "ag", label: "AG" },
  { value: "sole_prop", label: "Sole Proprietorship" },
  { value: "partnership", label: "Partnership" },
  { value: "government", label: "Government Agency" },
  { value: "ngo", label: "NGO / Non-Profit" },
  { value: "other", label: "Other" },
];

const COUNTRIES = [
  "Thailand", "Germany", "Netherlands", "Czech Republic", "Poland", "Italy", "Spain",
  "Denmark", "Portugal", "Malta", "Greece", "Israel", "Canada", "Australia", "United Kingdom",
  "Switzerland", "Austria", "France", "Belgium", "Luxembourg", "Ireland",
  "India", "Japan", "South Korea", "Singapore", "Malaysia", "Philippines",
  "United States", "Colombia", "Uruguay", "Jamaica",
];

// Auditor/Inspector use personal profile (full_name etc.)
const isPersonalRole = (role: string) => ["auditor", "inspector"].includes(role);

export function CompanyProfileStep({ data, roleConfig, onSave, saving, docs, onDocsRefresh }: Props) {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const personal = isPersonalRole(roleConfig.role);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (personal) {
      if (!data.role_data.full_name?.trim()) errs.full_name = t("ob.required", "Required");
      if (!data.country?.trim()) errs.country = t("ob.required", "Required");
      if (!data.contact_person?.email?.trim()) errs.email = t("ob.required", "Required");
    } else {
      if (!data.company_name?.trim()) errs.company_name = t("ob.required", "Required");
      if (!data.country?.trim()) errs.country = t("ob.required", "Required");
      if (!data.contact_person?.email?.trim()) errs.email = t("ob.required", "Required");
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    const completed = data.completed_steps.includes(1) ? data.completed_steps : [...data.completed_steps, 1];
    onSave({ current_step: 2, completed_steps: completed });
  };

  const step1Docs = roleConfig.documents.filter((d) => d.step === 1);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          {personal ? <User className="h-6 w-6 text-primary" /> : <Building2 className="h-6 w-6 text-primary" />}
        </div>
        <div>
          <h2 className="text-xl font-semibold">
            {personal ? t("ob.personal_profile", "Personal Profile") : t("ob.company_profile", "Company Profile")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("ob.step1_desc", "Tell us about yourself or your organization")}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {personal ? (
          <>
            <div className="space-y-2 md:col-span-2">
              <Label>{t("ob.full_name", "Full Name")} *</Label>
              <Input
                value={data.role_data.full_name || ""}
                onChange={(e) => onSave({ role_data: { ...data.role_data, full_name: e.target.value } })}
                className={errors.full_name ? "border-red-500" : ""}
              />
              {errors.full_name && <p className="text-xs text-red-500">{errors.full_name}</p>}
            </div>
            <div className="space-y-2">
              <Label>{t("ob.nationality", "Nationality")}</Label>
              <Input
                value={data.role_data.nationality || ""}
                onChange={(e) => onSave({ role_data: { ...data.role_data, nationality: e.target.value } })}
              />
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2 md:col-span-2">
              <Label>{t("ob.company_name", "Company Name")} *</Label>
              <Input
                value={data.company_name}
                onChange={(e) => onSave({ company_name: e.target.value })}
                className={errors.company_name ? "border-red-500" : ""}
              />
              {errors.company_name && <p className="text-xs text-red-500">{errors.company_name}</p>}
            </div>
            <div className="space-y-2">
              <Label>{t("ob.legal_form", "Legal Form")}</Label>
              <Select value={data.legal_form} onValueChange={(v) => onSave({ legal_form: v })}>
                <SelectTrigger><SelectValue placeholder={t("ob.select", "Select...")} /></SelectTrigger>
                <SelectContent>
                  {LEGAL_FORMS.map((f) => (
                    <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t("ob.tax_id", "Tax ID / Registration No.")}</Label>
              <Input value={data.tax_id} onChange={(e) => onSave({ tax_id: e.target.value })} />
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label>{t("ob.country", "Country")} *</Label>
          <Select value={data.country} onValueChange={(v) => onSave({ country: v })}>
            <SelectTrigger className={errors.country ? "border-red-500" : ""}>
              <SelectValue placeholder={t("ob.select", "Select...")} />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.sort().map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country && <p className="text-xs text-red-500">{errors.country}</p>}
        </div>

        <div className="space-y-2">
          <Label>{t("ob.website", "Website")}</Label>
          <Input value={data.website} onChange={(e) => onSave({ website: e.target.value })} placeholder="https://" />
        </div>
      </div>

      {/* Address */}
      {!personal && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground">{t("ob.address", "Address")}</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <Input
              placeholder={t("ob.street", "Street")}
              value={data.address.street}
              onChange={(e) => onSave({ address: { ...data.address, street: e.target.value } })}
            />
            <Input
              placeholder={t("ob.city", "City")}
              value={data.address.city}
              onChange={(e) => onSave({ address: { ...data.address, city: e.target.value } })}
            />
            <Input
              placeholder={t("ob.state", "State / Province")}
              value={data.address.state}
              onChange={(e) => onSave({ address: { ...data.address, state: e.target.value } })}
            />
            <Input
              placeholder={t("ob.zip", "ZIP / Postal Code")}
              value={data.address.zip}
              onChange={(e) => onSave({ address: { ...data.address, zip: e.target.value } })}
            />
          </div>
        </div>
      )}

      {/* Contact Person */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground">{t("ob.contact", "Contact Person")}</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <Input
            placeholder={t("ob.contact_name", "Name")}
            value={data.contact_person.name}
            onChange={(e) => onSave({ contact_person: { ...data.contact_person, name: e.target.value } })}
          />
          <Input
            placeholder={t("ob.contact_position", "Position / Title")}
            value={data.contact_person.position}
            onChange={(e) => onSave({ contact_person: { ...data.contact_person, position: e.target.value } })}
          />
          <Input
            placeholder={t("ob.contact_email", "Email")}
            type="email"
            value={data.contact_person.email}
            onChange={(e) => onSave({ contact_person: { ...data.contact_person, email: e.target.value } })}
            className={errors.email ? "border-red-500" : ""}
          />
          <Input
            placeholder={t("ob.contact_phone", "Phone")}
            value={data.contact_person.phone}
            onChange={(e) => onSave({ contact_person: { ...data.contact_person, phone: e.target.value } })}
          />
        </div>
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>

      {/* Personnel Registry (Farm role) */}
      {(roleConfig.role === "farm" || roleConfig.role === "exporter") && (
        <PersonnelSection data={data} onSave={onSave} saving={saving} />
      )}

      {/* Step 1 Documents */}
      {step1Docs.length > 0 && data.id && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground">{t("ob.documents", "Documents")}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {step1Docs.map((doc) => (
              <DocumentUploadField
                key={doc.type}
                onboardingId={data.id!}
                step={1}
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

      <div className="flex justify-end pt-4">
        <Button onClick={handleNext} disabled={saving} size="lg">
          {t("ob.next", "Continue")} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
