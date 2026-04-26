import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft, Package } from "lucide-react";
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

export function ServiceStep({ data, roleConfig, onSave, onBack, saving, docs, onDocsRefresh }: Props) {
  const { t } = useTranslation();
  const role = roleConfig.role;
  const step4Docs = roleConfig.documents.filter((d) => d.step === 4);
  const rd = data.role_data;
  const updateRD = (patch: Record<string, any>) => onSave({ role_data: { ...rd, ...patch } });

  const handleNext = () => {
    const completed = data.completed_steps.includes(4) ? data.completed_steps : [...data.completed_steps, 4];
    onSave({ current_step: 5, completed_steps: completed });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Package className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{t(roleConfig.steps[3]?.label || "ob.step_products", "Products & Services")}</h2>
          <p className="text-sm text-muted-foreground">{t("ob.step4_desc", "Details about your products or services")}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Exporter: Products */}
        {(role === "exporter" || role === "farm") && (
          <>
            <div className="space-y-2">
              <Label>{t("ob.batch_tracking", "Batch Tracking Method")}</Label>
              <Select value={data.batch_tracking_method} onValueChange={(v) => onSave({ batch_tracking_method: v })}>
                <SelectTrigger><SelectValue placeholder={t("ob.select", "Select...")} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="spreadsheet">Spreadsheet</SelectItem>
                  <SelectItem value="erp">ERP System</SelectItem>
                  <SelectItem value="seed_to_sale">Seed-to-Sale Software</SelectItem>
                  <SelectItem value="blockchain">Blockchain</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t("ob.traceability", "Traceability Level")}</Label>
              <Select value={data.traceability_level} onValueChange={(v) => onSave({ traceability_level: v })}>
                <SelectTrigger><SelectValue placeholder={t("ob.select", "Select...")} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="seed_to_sale">Seed to Sale</SelectItem>
                  <SelectItem value="seed_to_export">Seed to Export</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>{t("ob.product_catalog", "Product Catalog (descriptions)")}</Label>
              <Textarea
                value={rd.product_descriptions || ""}
                onChange={(e) => updateRD({ product_descriptions: e.target.value })}
                placeholder="e.g. Dried flower (Mac1, Super Boof), Extracts, Oils..."
                rows={3}
              />
            </div>
          </>
        )}

        {/* Importer */}
        {role === "importer" && (
          <>
            <div className="space-y-2">
              <Label>{t("ob.target_products", "Target Products")}</Label>
              <Input value={rd.target_products || ""} onChange={(e) => updateRD({ target_products: e.target.value })} placeholder="e.g. Dried flower, Extracts, API" />
            </div>
            <div className="space-y-2">
              <Label>{t("ob.annual_import_volume", "Annual Import Volume (kg)")}</Label>
              <Input type="number" value={rd.annual_import_volume || ""} onChange={(e) => updateRD({ annual_import_volume: e.target.value })} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>{t("ob.distribution_channels", "Distribution Channels")}</Label>
              <Input value={rd.distribution_channels || ""} onChange={(e) => updateRD({ distribution_channels: e.target.value })} placeholder="e.g. Pharmacies, Wholesale, Hospitals" />
            </div>
          </>
        )}

        {/* Lab */}
        {role === "lab_provider" && (
          <>
            <div className="space-y-2 md:col-span-2">
              <Label>{t("ob.test_catalog", "Testing Capabilities")}</Label>
              <Textarea
                value={rd.test_catalog || ""}
                onChange={(e) => updateRD({ test_catalog: e.target.value })}
                placeholder="e.g. Cannabinoid profiling (HPLC), Heavy metals (ICP-MS), Pesticides (LC-MS/MS)..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("ob.sample_types", "Sample Types Accepted")}</Label>
              <Input value={rd.sample_types_accepted || ""} onChange={(e) => updateRD({ sample_types_accepted: e.target.value })} placeholder="e.g. Flower, Extract, Oil, Edible" />
            </div>
          </>
        )}

        {/* Logistics */}
        {role === "logistics" && (
          <>
            <div className="space-y-2">
              <Label>{t("ob.service_types", "Service Types")}</Label>
              <Input value={rd.service_types || ""} onChange={(e) => updateRD({ service_types: e.target.value })} placeholder="e.g. FTL, LTL, Last Mile, Cold Chain" />
            </div>
            <div className="space-y-2">
              <Label>{t("ob.coverage_countries", "Coverage Countries")}</Label>
              <Input value={rd.coverage_countries || ""} onChange={(e) => updateRD({ coverage_countries: e.target.value })} placeholder="e.g. TH, DE, NL, CZ" />
            </div>
            <div className="space-y-2">
              <Label>{t("ob.avg_transit", "Avg. Transit Days (TH→EU)")}</Label>
              <Input type="number" value={rd.avg_transit_days || ""} onChange={(e) => updateRD({ avg_transit_days: e.target.value })} />
            </div>
          </>
        )}

        {/* Auditor */}
        {role === "auditor" && (
          <>
            <div className="space-y-2 md:col-span-2">
              <Label>{t("ob.audit_types", "Audit Types Offered")}</Label>
              <Input value={rd.audit_types_offered || ""} onChange={(e) => updateRD({ audit_types_offered: e.target.value })} placeholder="e.g. EU-GMP, GACP, GDP, ISO 22716" />
            </div>
            <div className="space-y-2">
              <Label>{t("ob.availability", "Availability (days/month)")}</Label>
              <Input type="number" value={rd.availability_days_per_month || ""} onChange={(e) => updateRD({ availability_days_per_month: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>{t("ob.day_rate", "Day Rate Range (€)")}</Label>
              <Input value={rd.day_rate_range || ""} onChange={(e) => updateRD({ day_rate_range: e.target.value })} placeholder="e.g. 800-1500" />
            </div>
          </>
        )}

        {/* Inspector */}
        {role === "inspector" && (
          <>
            <div className="space-y-2">
              <Label>{t("ob.inspection_frequency", "Inspection Frequency")}</Label>
              <Input value={rd.inspection_frequency || ""} onChange={(e) => updateRD({ inspection_frequency: e.target.value })} placeholder="e.g. Quarterly, Annual" />
            </div>
            <div className="space-y-2">
              <Label>{t("ob.digital_tools", "Digital Tools Used")}</Label>
              <Input value={rd.digital_tools_used || ""} onChange={(e) => updateRD({ digital_tools_used: e.target.value })} />
            </div>
          </>
        )}

        {/* Shop */}
        {role === "shop" && (
          <>
            <div className="space-y-2">
              <Label>{t("ob.product_categories", "Product Categories")}</Label>
              <Input value={rd.product_categories || ""} onChange={(e) => updateRD({ product_categories: e.target.value })} placeholder="e.g. Flower, Pre-Rolls, Edibles, Concentrates" />
            </div>
            <div className="space-y-2">
              <Label>{t("ob.monthly_customers", "Monthly Customers")}</Label>
              <Input type="number" value={rd.monthly_customers || ""} onChange={(e) => updateRD({ monthly_customers: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>{t("ob.delivery", "Delivery Available?")}</Label>
              <Select value={rd.delivery_available || ""} onValueChange={(v) => updateRD({ delivery_available: v })}>
                <SelectTrigger><SelectValue placeholder={t("ob.select", "Select...")} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="planned">Planned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {/* Pharmacy */}
        {role === "pharmacy" && (
          <>
            <div className="space-y-2">
              <Label>{t("ob.cannabis_products", "Cannabis Products Offered")}</Label>
              <Input value={rd.cannabis_products_offered || ""} onChange={(e) => updateRD({ cannabis_products_offered: e.target.value })} placeholder="e.g. Dried flower, Extracts, Dronabinol" />
            </div>
            <div className="space-y-2">
              <Label>{t("ob.monthly_prescriptions", "Monthly Prescriptions")}</Label>
              <Input type="number" value={rd.monthly_prescriptions || ""} onChange={(e) => updateRD({ monthly_prescriptions: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>{t("ob.compounding", "Compounding Available?")}</Label>
              <Select value={rd.compounding_available || ""} onValueChange={(v) => updateRD({ compounding_available: v })}>
                <SelectTrigger><SelectValue placeholder={t("ob.select", "Select...")} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {/* Trader */}
        {role === "trader" && (
          <>
            <div className="space-y-2">
              <Label>{t("ob.product_focus", "Product Focus")}</Label>
              <Input value={rd.product_focus || ""} onChange={(e) => updateRD({ product_focus: e.target.value })} placeholder="e.g. Dried flower, API, Extracts" />
            </div>
            <div className="space-y-2">
              <Label>{t("ob.trade_routes", "Trade Routes")}</Label>
              <Input value={rd.trade_routes || ""} onChange={(e) => updateRD({ trade_routes: e.target.value })} placeholder="e.g. TH→DE, TH→NL, CA→EU" />
            </div>
            <div className="space-y-2">
              <Label>{t("ob.payment_terms", "Payment Terms Offered")}</Label>
              <Input value={rd.payment_terms_offered || ""} onChange={(e) => updateRD({ payment_terms_offered: e.target.value })} placeholder="e.g. LC, TT, 30 Net, Escrow" />
            </div>
          </>
        )}
      </div>

      {/* Step 4 Documents */}
      {step4Docs.length > 0 && data.id && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground">{t("ob.documents", "Documents")}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {step4Docs.map((doc) => (
              <DocumentUploadField
                key={doc.type}
                onboardingId={data.id!}
                step={4}
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
