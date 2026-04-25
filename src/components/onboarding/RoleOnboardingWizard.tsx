import { useState, useEffect, useCallback } from "react";
import { useRoleOnboarding } from "@/hooks/useRoleOnboarding";
import { useDocumentAI } from "@/hooks/useDocumentAI";
import { OnboardingProgress } from "./OnboardingProgress";
import { CompanyProfileStep } from "./steps/CompanyProfileStep";
import { LicensingStep } from "./steps/LicensingStep";
import { FacilityStep } from "./steps/FacilityStep";
import { ServiceStep } from "./steps/ServiceStep";
import { ShinraiAssessmentStep } from "./steps/ShinraiAssessmentStep";
import { NDAGate } from "./NDAGate";
import { Loader2, CheckCircle2, Clock, ShieldAlert, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import type { OnboardingRole } from "./config/role-configs";
import { getRoleConfig } from "./config/role-configs";
import type { UploadedDoc } from "./DocumentUploadField";

interface Props {
  role: OnboardingRole;
}

export function RoleOnboardingWizard({ role }: Props) {
  const { data, loading, saving, save, acceptNDA, hasNDA } = useRoleOnboarding(role);
  const { buildProfile, applyProfile, buildingProfile } = useDocumentAI();
  const { t } = useTranslation();
  const { user } = useAuth();
  const roleConfig = getRoleConfig(role);
  const [docs, setDocs] = useState<UploadedDoc[]>([]);
  const [aiWarnings, setAiWarnings] = useState<string[]>([]);
  const [aiApplied, setAiApplied] = useState(false);

  // Load documents
  const refreshDocs = useCallback(async () => {
    if (!data.id) return;
    const { data: rows } = await (supabase as any)
      .from("onboarding_documents")
      .select("*")
      .eq("onboarding_id", data.id)
      .order("created_at", { ascending: false });
    setDocs(rows || []);
  }, [data.id]);

  useEffect(() => {
    if (data.id) refreshDocs();
  }, [data.id, refreshDocs]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Status screens
  if (data.status === "submitted" || data.status === "under_review") {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-4 py-12">
        <Clock className="h-16 w-16 text-amber-500 mx-auto" />
        <h2 className="text-2xl font-bold">{t("ob.submitted_title", "Application Submitted")}</h2>
        <p className="text-muted-foreground">{t("ob.submitted_desc", "Your application is being reviewed. We'll notify you once the review is complete.")}</p>
        <div className="p-4 rounded-lg bg-amber-500/10 text-amber-600 text-sm">
          Status: {data.status === "submitted" ? t("ob.status_submitted", "Submitted") : t("ob.status_review", "Under Review")}
        </div>
      </div>
    );
  }

  if (data.status === "approved") {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-4 py-12">
        <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto" />
        <h2 className="text-2xl font-bold">{t("ob.approved_title", "Verified & Approved")}</h2>
        <p className="text-muted-foreground">
          Tier: <strong className="text-foreground">{data.tier.toUpperCase()}</strong>
          {data.shinrai_score !== null && (
            <> · ShinrAi Score: <strong className="text-foreground">{data.shinrai_score}</strong></>
          )}
        </p>
      </div>
    );
  }

  if (data.status === "rejected") {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-4 py-12">
        <ShieldAlert className="h-16 w-16 text-red-500 mx-auto" />
        <h2 className="text-2xl font-bold">{t("ob.rejected_title", "Application Returned")}</h2>
        <p className="text-muted-foreground">{t("ob.rejected_desc", "Please review the feedback and resubmit.")}</p>
        <Button onClick={() => save({ status: "draft" })}>{t("ob.reopen", "Reopen Application")}</Button>
      </div>
    );
  }

  const step = data.current_step;
  const isStreamlined = roleConfig.steps.length <= 3; // Farm, etc.
  const showNDAGate = !isStreamlined && step >= 3 && !hasNDA;

  // Count analyzed docs
  const analyzedDocs = docs.filter((d) => d.status === "ai_validated");

  const handleAutoFill = async () => {
    if (!data.id) return;
    const result = await buildProfile(data.id, role);
    if (result) {
      const warnings = applyProfile(data, result.profile, save);
      setAiWarnings(warnings);
      setAiApplied(true);
    }
  };

  const handleSubmit = async () => {
    await save({ status: "submitted" });
    // Assign role + mark profile onboarding complete
    if (user) {
      await (supabase as any)
        .from("user_roles")
        .upsert(
          { user_id: user.id, role } as any,
          { onConflict: "user_id,role" }
        );
      await (supabase as any)
        .from("profiles")
        .update({ onboarding_completed: true, role })
        .eq("user_id", user.id);

      // Phase 1 complete → generate contract signature token
      try {
        const token = crypto.randomUUID();
        await (supabase as any)
          .from("digital_signatures")
          .insert({
            token,
            signer_name: data.contact_person?.name || user.email,
            signer_role: role,
            signer_email: user.email,
            reason: "GACP Compliance Service Agreement — Phase 1 Onboarding",
            signature_png: "",
            signature_hash: "",
            signed_at: new Date().toISOString(),
            user_id: user.id,
            onboarding_id: data.id,
            document_type: "contract",
            document_ref: `CW-${new Date().getFullYear()}-${data.company_name?.replace(/\s+/g, "-").substring(0, 20) || "FARM"}`,
            metadata: { phase: 1, company: data.company_name, status: "pending_signature" },
          });
        // Show signature dialog
        const signUrl = `${window.location.origin}/sign/${token}`;
        toast.success(t("ob.contract_ready", "Contract ready for signature!"), {
          description: t("ob.contract_sign_now", "Sign your service agreement to proceed."),
          action: {
            label: t("ob.sign_now", "Sign Now"),
            onClick: () => window.open(signUrl, "_blank"),
          },
          duration: 15000,
        });
      } catch (err) {
        console.error("Signature token creation failed:", err);
      }
    }
    toast.success(t("ob.submit_success", "Application submitted successfully!"));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <OnboardingProgress
        currentStep={step}
        completedSteps={data.completed_steps}
        hasNDA={hasNDA}
        roleConfig={roleConfig}
      />

      {/* AI Auto-Fill Banner */}
      {analyzedDocs.length > 0 && !aiApplied && (
        <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 flex items-center gap-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">
              {t("ob.ai_ready", "{{count}} documents analyzed by AI").replace("{{count}}", String(analyzedDocs.length))}
            </p>
            <p className="text-xs text-muted-foreground">
              {t("ob.ai_ready_desc", "Auto-fill all form fields from your uploaded documents — no typing needed.")}
            </p>
          </div>
          <Button onClick={handleAutoFill} disabled={buildingProfile} size="sm" className="gap-2">
            {buildingProfile ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
            {t("ob.ai_autofill", "Auto-Fill")}
          </Button>
        </div>
      )}

      {aiApplied && (
        <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          <span className="text-sm text-emerald-600">{t("ob.ai_filled", "Fields auto-filled from your documents. Review and adjust if needed.")}</span>
        </div>
      )}

      {/* AI Warnings */}
      {aiWarnings.length > 0 && (
        <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/5 space-y-1">
          <p className="text-xs font-medium text-amber-600">{t("ob.ai_warnings", "AI Warnings:")}</p>
          {aiWarnings.map((w, i) => (
            <p key={i} className="text-xs text-amber-600/80">• {w}</p>
          ))}
        </div>
      )}

      <div className="p-6 rounded-xl border bg-card shadow-sm">
        {step === 1 && (
          <CompanyProfileStep
            data={data}
            roleConfig={roleConfig}
            onSave={save}
            saving={saving}
            docs={docs}
            onDocsRefresh={refreshDocs}
          />
        )}

        {/* Streamlined 3-step flow (Farm etc.): Step 2 = Docs, Step 3 = ShinrAi */}
        {isStreamlined && step === 2 && (
          <LicensingStep
            data={data}
            roleConfig={roleConfig}
            onSave={save}
            onBack={() => save({ current_step: 1 })}
            saving={saving}
            docs={docs}
            onDocsRefresh={refreshDocs}
          />
        )}

        {isStreamlined && step === 3 && (
          <ShinraiAssessmentStep
            data={data}
            roleConfig={roleConfig}
            onSave={save}
            onBack={() => save({ current_step: 2 })}
            onSubmit={handleSubmit}
            saving={saving}
          />
        )}

        {/* Classic 5-step flow (Exporter, Importer etc.) */}
        {!isStreamlined && step === 2 && (
          <LicensingStep
            data={data}
            roleConfig={roleConfig}
            onSave={save}
            onBack={() => save({ current_step: 1 })}
            saving={saving}
            docs={docs}
            onDocsRefresh={refreshDocs}
          />
        )}

        {showNDAGate && (
          <NDAGate
            role={role}
            onAccept={async (name) => {
              const ok = await acceptNDA(name);
              return ok;
            }}
            onBack={() => save({ current_step: 2 })}
            saving={saving}
          />
        )}

        {!isStreamlined && step === 3 && !showNDAGate && (
          <FacilityStep
            data={data}
            roleConfig={roleConfig}
            onSave={save}
            onBack={() => save({ current_step: 2 })}
            saving={saving}
            docs={docs}
            onDocsRefresh={refreshDocs}
          />
        )}

        {!isStreamlined && step === 4 && !showNDAGate && (
          <ServiceStep
            data={data}
            roleConfig={roleConfig}
            onSave={save}
            onBack={() => save({ current_step: 3 })}
            saving={saving}
            docs={docs}
            onDocsRefresh={refreshDocs}
          />
        )}

        {!isStreamlined && step === 5 && !showNDAGate && (
          <ShinraiAssessmentStep
            data={data}
            roleConfig={roleConfig}
            onSave={save}
            onBack={() => save({ current_step: 4 })}
            onSubmit={handleSubmit}
            saving={saving}
          />
        )}
      </div>
    </div>
  );
}
