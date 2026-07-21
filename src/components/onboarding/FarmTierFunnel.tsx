import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Sprout, ClipboardCheck, BadgeCheck, Factory } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FARM_TIERS,
  FARM_TIER_LABELS,
  computeFunnelMetrics,
  type FarmTier,
} from "@/lib/farm-onboarding";

// Weg D — visual onboarding funnel for Thailand farm producers.
// Presentational + props-driven (no DB dependency) so it renders and tests
// without the `farm_producers` table existing yet. Feed it producers from
// useFarmProducers() at the call site.

interface Props {
  producers: { tier: FarmTier | null }[];
  className?: string;
}

const TIER_ICONS: Record<FarmTier, typeof Sprout> = {
  tier_0_registered: Sprout,
  tier_1_gacp_ready: ClipboardCheck,
  tier_2_gacp_certified: BadgeCheck,
  tier_3_hub_linked: Factory,
};

export function FarmTierFunnel({ producers, className }: Props) {
  const { t } = useTranslation();

  const metrics = useMemo(() => {
    const tiers = producers
      .map((p) => p.tier)
      .filter((tier): tier is FarmTier => tier != null && FARM_TIERS.includes(tier));
    return computeFunnelMetrics(tiers);
  }, [producers]);

  const maxAtOrBeyond = metrics.stages[0]?.atOrBeyond || 1;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">
          {t("farmFunnel.title", "Thailand-Onboarding-Funnel")}
        </span>
        <span className="text-muted-foreground">
          {t("farmFunnel.total", "Farmen gesamt")}: {metrics.total}
        </span>
      </div>

      <div className="space-y-2">
        {metrics.stages.map((stage, i) => {
          const Icon = TIER_ICONS[stage.tier];
          const label = FARM_TIER_LABELS[stage.tier];
          const widthPct = Math.max(6, Math.round((stage.atOrBeyond / maxAtOrBeyond) * 100));
          const conversionPct = Math.round(stage.conversionFromPrevious * 100);

          return (
            <div key={stage.tier} className="space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {t(label.key, label.de)}
                </span>
                <span>
                  <span className="font-medium text-foreground">{stage.atOrBeyond}</span>
                  {i > 0 && <span className="ml-2 text-primary">{conversionPct}%</span>}
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500/70 to-sky-400/70 transition-all duration-500"
                  style={{ width: `${widthPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
