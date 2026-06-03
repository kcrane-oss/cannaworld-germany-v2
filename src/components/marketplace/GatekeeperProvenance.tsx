import { useTranslation } from "react-i18next";
import { ShieldCheck, Clock, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BatchProvenance, ProvenanceState } from "@/lib/marketplace-provenance";

// Compact per-listing badge showing the gatekeeper chain (GACP → EU-GMP → QP).
// Props-driven so it renders/tests without any data dependency.

const STATE_STYLES: Record<ProvenanceState, string> = {
  verified: "border-emerald-300/30 bg-emerald-400/10 text-emerald-300",
  pending: "border-amber-300/30 bg-amber-400/10 text-amber-300",
  unknown: "border-white/15 bg-white/5 text-white/40",
};

const STATE_ICON: Record<ProvenanceState, typeof ShieldCheck> = {
  verified: ShieldCheck,
  pending: Clock,
  unknown: HelpCircle,
};

export function GatekeeperProvenance({ provenance }: { provenance: BatchProvenance }) {
  const { t } = useTranslation();

  return (
    <div className="mt-3 border-t border-white/10 pt-3">
      <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-white/40">
        {t("mpProvenance.title", "Gatekeeper-Herkunft")}
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {provenance.stages.map((stage) => {
          const Icon = STATE_ICON[stage.state];
          return (
            <span
              key={stage.key}
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold",
                STATE_STYLES[stage.state]
              )}
            >
              <Icon className="h-3 w-3" /> {t(stage.key, stage.labelDe)}
            </span>
          );
        })}
      </div>
    </div>
  );
}
