import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowRightLeft, Import, Loader2, Pill, Sprout } from "lucide-react";
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
    role: "farm",
    icon: Sprout,
    title: "Thai Farm Fast Lane",
    desc: "Niedriger Einstieg für Farmen: Basisdaten, vorhandene Dokumente und kurzer GACP-Readiness-Check.",
  },
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
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
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
        <RoleOnboardingWizard role={activeRole} />
      </div>
    );
  }

  // No entry yet → role picker.
  return (
    <div className="mx-auto max-w-5xl space-y-8 py-2">
      <div className="text-center">
        <h1 className="text-3xl font-black tracking-tight text-white">
          {t("ob.picker_title", "Willkommen bei CannaWorld Germany")}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-white/60">
          {t(
            "ob.picker_subtitle",
            "Ein kurzes Onboarding qualifiziert Farm-Einstieg, Import-Pfad, Dokumente und Compliance-Status. Wählen Sie zum Start Ihre Rolle.",
          )}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
