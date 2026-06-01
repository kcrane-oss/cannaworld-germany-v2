import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowRightLeft, Import, Loader2, Pill, Sparkles } from "lucide-react";
import { RoleOnboardingWizard } from "@/components/onboarding/RoleOnboardingWizard";
import { useOnboardingGate } from "@/hooks/useOnboardingGate";
import {
  ALL_ONBOARDING_ROLES,
  type OnboardingRole,
} from "@/components/onboarding/config/role-configs";

/** sessionStorage flag set when a user defers onboarding, so the dashboard index stops redirecting. */
export const ONBOARDING_SKIP_KEY = "germany_onboarding_skipped";

const ROLE_CHOICES: { role: OnboardingRole; icon: typeof Pill; title: string; desc: string }[] = [
  {
    role: "pharmacy",
    icon: Pill,
    title: "Apotheke",
    desc: "Medizinisches Cannabis für Apotheken — Lizenz, BtM-Handling, sichere Lagerung und Abgabe.",
  },
  {
    role: "importer",
    icon: Import,
    title: "Importeur / Herstellbetrieb",
    desc: "Import-Lizenz, GDP-Strukturen, Lager und Compliance-Nachweise für den deutschen Markt.",
  },
  {
    role: "trader",
    icon: ArrowRightLeft,
    title: "Großhandel / Distribution",
    desc: "Handelslizenz, AML, Lieferketten- und Vertriebsnachweise für regulierten B2B-Handel.",
  },
];

const ROLE_LABELS: Record<OnboardingRole, string> = {
  pharmacy: "Apotheke",
  importer: "Importeur / Herstellbetrieb",
  trader: "Großhandel / Distribution",
};

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const gate = useOnboardingGate();
  const [picked, setPicked] = useState<OnboardingRole | null>(null);

  function deferOnboarding() {
    try {
      sessionStorage.setItem(ONBOARDING_SKIP_KEY, "1");
    } catch {
      /* sessionStorage unavailable — non-fatal */
    }
    navigate("/dashboard");
  }

  if (gate.loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-300" />
      </div>
    );
  }

  // An existing onboarding entry → resume it. RoleOnboardingWizard renders its own
  // draft / submitted / under_review / approved / rejected screens.
  const existing = gate.entries.find((e) => (ALL_ONBOARDING_ROLES as string[]).includes(e.role));
  const activeRole: OnboardingRole | null =
    picked ?? (existing ? (existing.role as OnboardingRole) : null);

  if (activeRole) {
    return (
      <div className="space-y-7">
        <section className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/12 via-white/[0.045] to-emerald-300/10 p-6 shadow-[0_0_42px_rgba(34,211,238,0.08)] md:p-8">
          <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-[2rem] bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-300" />
          <div className="relative flex items-center justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
                <Sparkles className="h-4 w-4" /> {t("ob.wizard_eyebrow", "Qualifizierung läuft")}
              </div>
              <h1 className="text-2xl font-black tracking-tight md:text-3xl">
                {t(`ob.picker_${activeRole}_title`, ROLE_LABELS[activeRole])}
              </h1>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-2">
              <button
                onClick={() => (picked ? setPicked(null) : deferOnboarding())}
                className="text-sm font-semibold text-white/55 transition hover:text-white"
              >
                ←{" "}
                {picked
                  ? t("ob.picker_back", "Andere Rolle wählen")
                  : t("ob.defer_short", "Später · zum Dashboard")}
              </button>
              <button
                onClick={deferOnboarding}
                className="text-sm font-semibold text-white/45 transition hover:text-white"
              >
                {t("ob.defer", "Später abschließen")}
              </button>
            </div>
          </div>
        </section>
        <RoleOnboardingWizard role={activeRole} />
      </div>
    );
  }

  // No entry yet → role picker.
  return (
    <div className="mx-auto max-w-3xl space-y-7 py-2">
      <section className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/12 via-white/[0.045] to-emerald-300/10 p-6 shadow-[0_0_42px_rgba(34,211,238,0.08)] md:p-8">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-[2rem] bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-300" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
              <Sparkles className="h-4 w-4" /> B2B-Qualifizierung
            </div>
            <h1 className="text-3xl font-black tracking-tight md:text-5xl">
              {t("ob.pageTitle", "Partnerzugang einrichten")}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">
              {t("ob.pageDesc", "Wähle deine Rolle, um den passenden Qualifizierungspfad zu starten. Import-Pfad, Dokumente und Compliance werden danach vorbereitet.")}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/60">
            Germany scope · B2B · Compliance-first
          </div>
        </div>
      </section>
      <div className="grid gap-4 sm:grid-cols-3">
        {ROLE_CHOICES.map((choice) => (
          <button
            key={choice.role}
            onClick={() => setPicked(choice.role)}
            className="group rounded-2xl border border-white/10 bg-white/[0.045] p-5 text-left transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-cyan-300/10"
          >
            <choice.icon className="mb-4 h-8 w-8 text-cyan-300" />
            <div className="font-bold text-white">
              {t(`ob.picker_${choice.role}_title`, choice.title)}
            </div>
            <div className="mt-2 text-sm leading-6 text-white/55">
              {t(`ob.picker_${choice.role}_desc`, choice.desc)}
            </div>
            <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
              {t("ob.picker_start", "Onboarding starten")} <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </button>
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={deferOnboarding}
          className="text-sm font-semibold text-white/50 transition hover:text-white"
        >
          {t("ob.defer_explore", "Später abschließen · Dashboard zuerst erkunden")}
        </button>
      </div>
    </div>
  );
}
