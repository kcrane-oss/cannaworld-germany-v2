import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Sprout, Loader2, ShieldAlert, ShieldCheck, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SpeakButton } from "@/components/SpeakButton";
import { useGuidanceLevel } from "@/hooks/useGuidanceLevel";
import {
  GUIDANCE_LEVELS,
  GUIDANCE_LEVEL_LABELS,
  showsOptional,
  showsHelp,
  pickCopy,
} from "@/lib/guidance-level";
import {
  SELF_ASSESSMENT_QUESTIONS,
  scoreSelfAssessment,
  PRE_AUDIT_PASS_THRESHOLD,
  type SelfAssessmentAnswers,
} from "@/lib/farm-onboarding";
import {
  REQUIRED_DOC_TYPES,
  scanDocuments,
  type UploadedDocMeta,
} from "@/lib/document-integrity";
import { submitFarmAudit } from "@/lib/farm-audit-api";

const QUESTION_LABELS: Record<keyof SelfAssessmentAnswers, string> = {
  hasDocumentedSOPs: "Dokumentierte SOPs vorhanden",
  tracksPesticideUse: "Pflanzenschutz-Einsatz wird dokumentiert",
  hasBatchTraceability: "Chargen-Rückverfolgbarkeit",
  hasTrainedStaff: "Geschultes Personal",
  hasSecureStorage: "Sichere Lagerung",
};

// Plain-language variants for the "simple" level — anyone should understand them.
const QUESTION_LABELS_SIMPLE: Record<keyof SelfAssessmentAnswers, string> = {
  hasDocumentedSOPs: "Ihr habt aufgeschrieben, wie ihr arbeitet?",
  tracksPesticideUse: "Ihr notiert, welche Spritzmittel ihr benutzt?",
  hasBatchTraceability: "Ihr könnt jede Ernte zurückverfolgen?",
  hasTrainedStaff: "Eure Leute sind geschult?",
  hasSecureStorage: "Ihr lagert sicher und abgeschlossen?",
};

async function hashFile(file: File): Promise<string> {
  try {
    const buf = await file.arrayBuffer();
    const digest = await crypto.subtle.digest("SHA-256", buf);
    return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
  } catch {
    // Fallback for environments without SubtleCrypto — weaker, flagged as such.
    return `fallback:${file.name}:${file.size}`;
  }
}

export default function FarmSelfAudit() {
  const { t } = useTranslation();
  const { level, setLevel } = useGuidanceLevel();
  const [farmName, setFarmName] = useState("");
  const [province, setProvince] = useState("");
  const [answers, setAnswers] = useState<SelfAssessmentAnswers>({
    hasDocumentedSOPs: false,
    tracksPesticideUse: false,
    hasBatchTraceability: false,
    hasTrainedStaff: false,
    hasSecureStorage: false,
  });
  const [docs, setDocs] = useState<UploadedDocMeta[]>([]);
  const [busy, setBusy] = useState(false);

  const score = useMemo(() => scoreSelfAssessment(answers), [answers]);
  const integrity = useMemo(() => scanDocuments(docs), [docs]);
  const canSubmit = farmName.trim().length > 0 && docs.length > 0 && !busy;

  const simple = level === "simple";
  const questionLabel = (q: keyof SelfAssessmentAnswers) => (simple ? QUESTION_LABELS_SIMPLE[q] : QUESTION_LABELS[q]);

  const intro = pickCopy(level, {
    simple: t("farmAudit.introSimple", "Hier meldest du deine Farm an. Beantworte ein paar Fragen und lade 3 Dokumente hoch. Danach schaut ein Mensch drüber und gibt dich frei. Du kannst dir alles vorlesen lassen."),
    standard: t("farmAudit.intro", "Selbstregistrierung + Selbsteinschätzung + Dokumenten-Upload. Ein automatischer Integritäts-Check markiert Auffälligkeiten — die finale Freigabe trifft ein Mensch."),
    expert: t("farmAudit.introExpert", "Self-Audit: Selbsteinschätzung + 3 Pflichtdokumente. Heuristischer Integritäts-Check, finale Freigabe durch Mensch."),
  });

  async function addDoc(docType: string, file: File | undefined) {
    if (!file) return;
    const sha256 = await hashFile(file);
    setDocs((prev) => [
      ...prev.filter((d) => d.docType !== docType),
      { id: `${docType}-${Date.now()}`, docType, filename: file.name, sha256, size: file.size, mime: file.type || "application/octet-stream" },
    ]);
  }

  async function submit() {
    setBusy(true);
    try {
      await submitFarmAudit({
        farm_name: farmName.trim(),
        province: province.trim(),
        self_assessment_score: score,
        documents: docs,
        integrity,
      });
      toast.success(t("farmAudit.submitted", "Self-Audit eingereicht — wartet auf Freigabe"));
      setFarmName("");
      setProvince("");
      setDocs([]);
      setAnswers({ hasDocumentedSOPs: false, tracksPesticideUse: false, hasBatchTraceability: false, hasTrainedStaff: false, hasSecureStorage: false });
    } catch (err) {
      toast.error(t("farmAudit.submitError", "Einreichen fehlgeschlagen") + (err instanceof Error ? `: ${err.message}` : ""));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sprout className="h-5 w-5 text-emerald-300" />
          <h1 className="text-2xl font-black tracking-tight">{t("farmAudit.title", "Farm Self-Audit")}</h1>
        </div>
        {/* Niveau-Schalter — passt Sprache UND Umfang an */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-wider text-white/40">{t("guidance.level.label", "Niveau")}</span>
          <div className="flex gap-1 rounded-lg border border-white/10 bg-black/20 p-1 text-xs">
            {GUIDANCE_LEVELS.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevel(lvl)}
                className={cn("rounded-md px-3 py-1 font-semibold transition", level === lvl ? "bg-cyan-300/20 text-cyan-200" : "text-white/55 hover:text-white")}
              >
                {t(GUIDANCE_LEVEL_LABELS[lvl].key, GUIDANCE_LEVEL_LABELS[lvl].de)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2">
        <p className={cn("max-w-2xl text-white/60", simple ? "text-base leading-7" : "text-sm")}>{intro}</p>
        <SpeakButton text={intro} />
      </div>

      <div className={cn("grid gap-3", showsOptional(level) ? "sm:grid-cols-2" : "")}>
        <div>
          <Label htmlFor="fa-name">{simple ? t("farmAudit.farmNameSimple", "Wie heißt deine Farm?") : t("farmAudit.farmName", "Farm-Name")}</Label>
          <Input id="fa-name" value={farmName} onChange={(e) => setFarmName(e.target.value)} className={simple ? "h-11 text-base" : undefined} />
        </div>
        {showsOptional(level) && (
          <div>
            <Label htmlFor="fa-prov">{t("farmAudit.province", "Provinz")}</Label>
            <Input id="fa-prov" value={province} onChange={(e) => setProvince(e.target.value)} />
          </div>
        )}
      </div>

      {/* Self-assessment */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/75">{t("farmAudit.selfAssessment", "Selbsteinschätzung")}</h2>
            <SpeakButton text={SELF_ASSESSMENT_QUESTIONS.map(questionLabel).join(". ")} />
          </div>
          <span className={cn("text-sm font-bold", score >= PRE_AUDIT_PASS_THRESHOLD ? "text-emerald-300" : "text-amber-300")}>
            {score}% {score >= PRE_AUDIT_PASS_THRESHOLD ? "✓" : ""}
          </span>
        </div>
        {showsHelp(level) && (
          <p className="mb-3 text-xs text-white/45">{t("farmAudit.selfAssessmentHelp", "Hake nur an, was wirklich stimmt. Das ist keine Prüfung — es hilft uns nur einzuschätzen, wo du stehst.")}</p>
        )}
        <div className="space-y-2">
          {SELF_ASSESSMENT_QUESTIONS.map((q) => (
            <label key={q} className={cn("flex items-center gap-2 text-white/80", simple ? "text-base" : "text-sm")}>
              <Checkbox checked={answers[q]} onCheckedChange={(c) => setAnswers((a) => ({ ...a, [q]: c === true }))} />
              {questionLabel(q)}
            </label>
          ))}
        </div>
      </div>

      {/* Documents + integrity */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
        <div className="mb-3 flex items-center gap-2">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/75">{t("farmAudit.documents", "Dokumente")}</h2>
          <SpeakButton text={simple ? t("farmAudit.documentsHelp", "Lade drei Dokumente hoch: GACP-Zertifikat, Analysenzertifikat und deine Lizenz. Tippe auf Hochladen und wähle die Datei.") : t("farmAudit.documents", "Dokumente")} />
        </div>
        {showsHelp(level) && (
          <p className="mb-3 text-xs text-white/45">{t("farmAudit.documentsHelp", "Lade drei Dokumente hoch: GACP-Zertifikat, Analysenzertifikat und deine Lizenz. Tippe auf Hochladen und wähle die Datei.")}</p>
        )}
        <div className="space-y-2">
          {REQUIRED_DOC_TYPES.map((dt) => {
            const have = docs.find((d) => d.docType === dt);
            return (
              <div key={dt} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/20 p-2.5">
                <span className={cn("text-white/80", simple ? "text-base" : "text-sm")}>{t(`farmAudit.doc.${dt}`, dt)}</span>
                {have ? (
                  <span className="flex items-center gap-2 text-xs text-emerald-300">
                    {have.filename}
                    <button aria-label="remove" onClick={() => setDocs((p) => p.filter((d) => d.id !== have.id))} className="text-white/50 hover:text-white"><X className="h-3 w-3" /></button>
                  </span>
                ) : (
                  <label className={cn("inline-flex cursor-pointer items-center gap-1 text-cyan-300 hover:text-cyan-200", simple ? "text-sm font-semibold" : "text-xs")}>
                    <Upload className="h-3 w-3" /> {t("farmAudit.upload", "Hochladen")}
                    <input type="file" className="hidden" onChange={(e) => addDoc(dt, e.target.files?.[0])} />
                  </label>
                )}
              </div>
            );
          })}
        </div>

        {/* Integrity report */}
        <div className={cn("mt-4 rounded-xl border p-3", integrity.riskScore >= 25 ? "border-red-300/30 bg-red-400/5" : "border-emerald-300/20 bg-emerald-400/5")}>
          <div className="flex items-center gap-2 text-sm font-bold">
            {integrity.riskScore >= 25 ? <ShieldAlert className="h-4 w-4 text-red-300" /> : <ShieldCheck className="h-4 w-4 text-emerald-300" />}
            {t("farmAudit.integrity", "Integritäts-Check")} · {t("farmAudit.risk", "Risiko")} {integrity.riskScore}/100
          </div>
          {integrity.flags.length > 0 && (
            <ul className="mt-2 space-y-0.5 text-xs text-white/60">
              {integrity.flags.map((f, i) => (
                <li key={i} className={cn(f.severity === "high" ? "text-red-300" : "text-amber-300")}>• {t(`farmAudit.flag.${f.code.split(":")[0]}`, f.code)}</li>
              ))}
            </ul>
          )}
          <div className="mt-2 text-[11px] text-white/45">{t("farmAudit.humanNote", "Heuristischer Check — die finale Freigabe trifft ein Mensch.")}</div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button disabled={!canSubmit} onClick={submit} className={simple ? "h-12 px-8 text-base" : undefined}>
          {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {simple ? t("farmAudit.submitSimple", "Fertig — abschicken") : t("farmAudit.submit", "Zur Freigabe einreichen")}
        </Button>
      </div>
    </div>
  );
}
