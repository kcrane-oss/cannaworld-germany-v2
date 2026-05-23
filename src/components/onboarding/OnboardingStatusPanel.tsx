import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  AlertTriangle,
  ArrowRight,
  Clock,
  FileText,
  HelpCircle,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useOnboardingGate, type GateStatus } from "@/hooks/useOnboardingGate";

const SUPPORT_MAILTO =
  "mailto:info@cannaworld-germany.de?subject=Onboarding%20Support";

const VISIBLE_STATUSES = new Set<GateStatus>([
  "no_onboarding",
  "draft",
  "submitted",
  "under_review",
  "rejected",
]);

const ACTION_REQUIRED = new Set<GateStatus>([
  "no_onboarding",
  "draft",
  "rejected",
]);

type VisibleStatus = Exclude<GateStatus, "loading" | "not_logged_in" | "approved">;

type StatusCopy = {
  label: string;
  title: string;
  description: string;
  nextStep: string;
  icon: LucideIcon;
  tone: string;
  border: string;
};

export default function OnboardingStatusPanel() {
  const { status, loading } = useOnboardingGate();
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (loading || !VISIBLE_STATUSES.has(status)) return null;

  const isActionRequired = ACTION_REQUIRED.has(status);

  const statusCopy: Record<VisibleStatus, StatusCopy> = {
    no_onboarding: {
      label: t("onboardingStatus.noOnboardingLabel", "Onboarding offen"),
      title: t("onboardingStatus.noOnboardingTitle", "Verifizierung noch nicht gestartet"),
      description: t("onboardingStatus.noOnboardingDesc", "Unternehmens-, Lizenz- und Compliance-Daten fehlen noch."),
      nextStep: t("onboardingStatus.noOnboardingNext", "Nächster Schritt: Onboarding starten und Rolle wählen."),
      icon: Rocket,
      tone: "text-cyan-300",
      border: "border-cyan-300/30 bg-cyan-300/10",
    },
    draft: {
      label: t("onboardingStatus.draftLabel", "Entwurf"),
      title: t("onboardingStatus.draftTitle", "Onboarding ist angefangen"),
      description: t("onboardingStatus.draftDesc", "Eingaben gespeichert, aber noch nicht zur Prüfung eingereicht."),
      nextStep: t("onboardingStatus.draftNext", "Nächster Schritt: fehlende Bereiche ergänzen und einreichen."),
      icon: FileText,
      tone: "text-blue-300",
      border: "border-blue-300/30 bg-blue-300/10",
    },
    submitted: {
      label: t("onboardingStatus.submittedLabel", "Eingereicht"),
      title: t("onboardingStatus.submittedTitle", "Antrag liegt bei CannaWorld"),
      description: t("onboardingStatus.submittedDesc", "Die Unterlagen wurden übermittelt und warten auf Review."),
      nextStep: t("onboardingStatus.submittedNext", "Nächster Schritt: Benachrichtigungen auf Review-Ergebnis oder Rückfrage prüfen."),
      icon: Clock,
      tone: "text-amber-300",
      border: "border-amber-300/30 bg-amber-300/10",
    },
    under_review: {
      label: t("onboardingStatus.underReviewLabel", "In Prüfung"),
      title: t("onboardingStatus.underReviewTitle", "Compliance-Review läuft"),
      description: t("onboardingStatus.underReviewDesc", "Der Antrag wird aktuell geprüft."),
      nextStep: t("onboardingStatus.underReviewNext", "Nächster Schritt: keine Aktion nötig, außer eine Nachforderung erscheint."),
      icon: ShieldCheck,
      tone: "text-blue-300",
      border: "border-blue-300/30 bg-blue-300/10",
    },
    rejected: {
      label: t("onboardingStatus.rejectedLabel", "Korrektur nötig"),
      title: t("onboardingStatus.rejectedTitle", "Antrag kann so nicht freigegeben werden"),
      description: t("onboardingStatus.rejectedDesc", "Der Antrag muss korrigiert und erneut eingereicht werden."),
      nextStep: t("onboardingStatus.rejectedNext", "Nächster Schritt: Feedback prüfen, Datei korrigieren und erneut einreichen."),
      icon: AlertTriangle,
      tone: "text-red-300",
      border: "border-red-300/30 bg-red-300/10",
    },
  };

  const copy = statusCopy[status as VisibleStatus];
  const StatusIcon = copy.icon;

  return (
    <section className={`mb-6 rounded-2xl border p-5 ${copy.border}`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/30 ${copy.tone}`}>
          <StatusIcon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
              {t("onboardingStatus.statusLabel", "Status")}
            </span>
            <span className={`rounded-full border px-3 py-1 text-xs font-bold ${copy.border} ${copy.tone}`}>
              {copy.label}
            </span>
          </div>
          <div>
            <p className="text-sm font-bold text-white">{copy.title}</p>
            <p className="text-sm leading-6 text-white/65">{copy.description}</p>
          </div>
          <p className="text-sm font-semibold text-white/85">{copy.nextStep}</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
          <button
            onClick={() => navigate("/dashboard/onboarding")}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-cyan-300 px-4 py-2 text-sm font-bold text-[#061016] transition hover:bg-cyan-200"
          >
            {isActionRequired
              ? t("onboardingStatus.actionCta", "Onboarding öffnen")
              : t("onboardingStatus.statusCta", "Status ansehen")}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
          <a
            href={SUPPORT_MAILTO}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/75 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-white"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            {t("onboardingStatus.supportCta", "Support kontaktieren")}
          </a>
        </div>
      </div>
    </section>
  );
}
