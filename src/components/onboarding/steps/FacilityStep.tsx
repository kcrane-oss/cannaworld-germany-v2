import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft, Warehouse } from "lucide-react";
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

// Facility types per role
const FACILITY_TYPES: Record<string, { value: string; label: string }[]> = {
  exporter: [
    { value: "indoor", label: "Indoor Facility" },
    { value: "outdoor", label: "Outdoor Facility" },
    { value: "greenhouse", label: "Greenhouse" },
    { value: "processing", label: "Processing Plant" },
    { value: "warehouse", label: "Warehouse" },
  ],
  importer: [
    { value: "warehouse_gdp", label: "GDP Warehouse" },
    { value: "warehouse_cold", label: "Cold Storage Warehouse" },
    { value: "distribution_center", label: "Distribution Center" },
  ],
  farm: [
    { value: "indoor", label: "Indoor Grow" },
    { value: "outdoor", label: "Outdoor Farm" },
    { value: "greenhouse", label: "Greenhouse" },
    { value: "mixed", label: "Mixed (Indoor + Outdoor)" },
  ],
  lab_provider: [
    { value: "analytical", label: "Analytical Lab" },
    { value: "microbiological", label: "Microbiological Lab" },
    { value: "full_service", label: "Full-Service Lab" },
    { value: "research", label: "R&D Lab" },
  ],
  logistics: [
    { value: "transport_only", label: "Transport Only" },
    { value: "warehouse_transport", label: "Warehouse + Transport" },
    { value: "cold_chain", label: "Cold Chain Specialist" },
    { value: "freight_forwarder", label: "Freight Forwarder" },
  ],
  shop: [
    { value: "retail", label: "Retail Store" },
    { value: "medical", label: "Medical Dispensary" },
    { value: "online", label: "Online Only" },
    { value: "hybrid", label: "Retail + Online" },
  ],
  pharmacy: [
    { value: "community", label: "Community Pharmacy" },
    { value: "hospital", label: "Hospital Pharmacy" },
    { value: "compounding", label: "Compounding Pharmacy" },
    { value: "online", label: "Online Pharmacy" },
  ],
};

export function FacilityStep({ data, roleConfig, onSave, onBack, saving, docs, onDocsRefresh }: Props) {
  const { t } = useTranslation();
  const role = roleConfig.role;
  const step3Docs = roleConfig.documents.filter((d) => d.step === 3);
  const facilityTypes = FACILITY_TYPES[role] || [];

  const rd = data.role_data;
  const updateRD = (patch: Record<string, any>) => onSave({ role_data: { ...rd, ...patch } });

  const handleNext = () => {
    const completed = data.completed_steps.includes(3) ? data.completed_steps : [...data.completed_steps, 3];
    onSave({ current_step: 4, completed_steps: completed });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Warehouse className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{t(roleConfig.steps[2]?.label || "ob.step_facility", "Facility & Operations")}</h2>
          <p className="text-sm text-muted-foreground">{t("ob.step3_desc", "Details about your facility or operations")}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>{t("ob.facility_name", "Facility / Site Name")}</Label>
          <Input value={data.facility_name} onChange={(e) => onSave({ facility_name: e.target.value })} />
        </div>

        {facilityTypes.length > 0 && (
          <div className="space-y-2">
            <Label>{t("ob.facility_type", "Type")}</Label>
            <Select value={data.facility_type} onValueChange={(v) => onSave({ facility_type: v })}>
              <SelectTrigger><SelectValue placeholder={t("ob.select", "Select...")} /></SelectTrigger>
              <SelectContent>
                {facilityTypes.map((f) => (
                  <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label>{t("ob.total_area", "Total Area (m²)")}</Label>
          <Input
            type="number"
            value={data.total_area_sqm ?? ""}
            onChange={(e) => onSave({ total_area_sqm: e.target.value ? Number(e.target.value) : null })}
          />
        </div>

        {(role === "exporter" || role === "farm") && (
          <div className="space-y-2">
            <Label>{t("ob.cultivation_area", "Cultivation Area (m²)")}</Label>
            <Input
              type="number"
              value={data.cultivation_area_sqm ?? ""}
              onChange={(e) => onSave({ cultivation_area_sqm: e.target.value ? Number(e.target.value) : null })}
            />
          </div>
        )}

        <div className="space-y-2">
          <Label>{t("ob.employee_count", "Number of Employees")}</Label>
          <Input
            type="number"
            value={data.employee_count ?? ""}
            onChange={(e) => onSave({ employee_count: e.target.value ? Number(e.target.value) : null })}
          />
        </div>

        {/* Role-specific fields */}
        {role === "farm" && (
          <>
            <div className="space-y-2">
              <Label>{t("ob.grow_method", "Growing Method")}</Label>
              <Select value={rd.grow_method || ""} onValueChange={(v) => updateRD({ grow_method: v })}>
                <SelectTrigger><SelectValue placeholder={t("ob.select", "Select...")} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="organic">Organic</SelectItem>
                  <SelectItem value="conventional">Conventional</SelectItem>
                  <SelectItem value="hydroponic">Hydroponic</SelectItem>
                  <SelectItem value="aquaponic">Aquaponic</SelectItem>
                  <SelectItem value="living_soil">Living Soil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t("ob.annual_capacity", "Annual Capacity (kg)")}</Label>
              <Input type="number" value={rd.annual_capacity_kg || ""} onChange={(e) => updateRD({ annual_capacity_kg: e.target.value })} />
            </div>
          </>
        )}

        {role === "lab_provider" && (
          <>
            <div className="space-y-2">
              <Label>{t("ob.num_instruments", "Number of Instruments")}</Label>
              <Input type="number" value={rd.num_instruments || ""} onChange={(e) => updateRD({ num_instruments: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>{t("ob.turnaround", "Avg. Turnaround (days)")}</Label>
              <Input type="number" value={rd.turnaround_days || ""} onChange={(e) => updateRD({ turnaround_days: e.target.value })} />
            </div>
          </>
        )}

        {role === "logistics" && (
          <>
            <div className="space-y-2">
              <Label>{t("ob.fleet_size", "Fleet Size")}</Label>
              <Input type="number" value={rd.fleet_size || ""} onChange={(e) => updateRD({ fleet_size: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>{t("ob.cold_chain_vehicles", "Cold Chain Vehicles")}</Label>
              <Input type="number" value={rd.cold_chain_vehicles || ""} onChange={(e) => updateRD({ cold_chain_vehicles: e.target.value })} />
            </div>
          </>
        )}

        {(role === "shop" || role === "pharmacy") && (
          <>
            <div className="space-y-2">
              <Label>{t("ob.num_locations", "Number of Locations")}</Label>
              <Input type="number" value={rd.num_locations || ""} onChange={(e) => updateRD({ num_locations: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>{t("ob.opening_hours", "Opening Hours")}</Label>
              <Input value={rd.opening_hours || ""} onChange={(e) => updateRD({ opening_hours: e.target.value })} placeholder="e.g. Mon-Fri 9:00-18:00" />
            </div>
          </>
        )}

        {role === "auditor" && (
          <>
            <div className="space-y-2">
              <Label>{t("ob.years_experience", "Years of Experience")}</Label>
              <Input type="number" value={rd.years_experience || ""} onChange={(e) => updateRD({ years_experience: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>{t("ob.total_audits", "Total Audits Conducted")}</Label>
              <Input type="number" value={rd.total_audits_conducted || ""} onChange={(e) => updateRD({ total_audits_conducted: e.target.value })} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>{t("ob.languages", "Languages")}</Label>
              <Input value={rd.languages || ""} onChange={(e) => updateRD({ languages: e.target.value })} placeholder="e.g. English, German, Thai" />
            </div>
          </>
        )}

        {role === "inspector" && (
          <>
            <div className="space-y-2 md:col-span-2">
              <Label>{t("ob.jurisdiction_region", "Jurisdiction Region")}</Label>
              <Input value={rd.jurisdiction_region || ""} onChange={(e) => updateRD({ jurisdiction_region: e.target.value })} />
            </div>
          </>
        )}

        {role === "trader" && (
          <>
            <div className="space-y-2">
              <Label>{t("ob.annual_volume", "Annual Trade Volume (kg)")}</Label>
              <Input type="number" value={rd.annual_trade_volume_kg || ""} onChange={(e) => updateRD({ annual_trade_volume_kg: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>{t("ob.active_markets", "Active Markets")}</Label>
              <Input value={rd.markets_active || ""} onChange={(e) => updateRD({ markets_active: e.target.value })} placeholder="e.g. DE, NL, TH" />
            </div>
          </>
        )}

        {role === "exporter" && (
          <div className="space-y-2 md:col-span-2">
            <Label>{t("ob.cleanroom", "Cleanroom Classes")}</Label>
            <Input
              value={(data.cleanroom_classes || []).join(", ")}
              onChange={(e) => onSave({ cleanroom_classes: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
              placeholder="e.g. D, C, B"
            />
          </div>
        )}
      </div>

      {/* Step 3 Documents */}
      {step3Docs.length > 0 && data.id && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground">{t("ob.documents", "Documents")}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {step3Docs.map((doc) => (
              <DocumentUploadField
                key={doc.type}
                onboardingId={data.id!}
                step={3}
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
