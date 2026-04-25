import { CheckCircle2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import type { RoleConfig } from "./config/role-configs";

interface Props {
  currentStep: number;
  completedSteps: number[];
  hasNDA: boolean;
  roleConfig: RoleConfig;
}

export function OnboardingProgress({ currentStep, completedSteps, hasNDA, roleConfig }: Props) {
  const { t } = useTranslation();
  const completedPct = Math.round((completedSteps.length / 5) * 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{t("ob.progress", "Progress")}</span>
        <span className="font-medium">{completedPct}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${completedPct}%` }} />
      </div>

      <div className="flex items-center justify-between gap-1">
        {roleConfig.steps.map((step, i) => {
          const isCompleted = completedSteps.includes(step.num);
          const isCurrent = currentStep === step.num;
          const isLocked = step.needsNDA && !hasNDA;

          return (
            <div key={step.num} className="flex items-center gap-1 flex-1">
              <div className="flex flex-col items-center gap-1 min-w-0">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    isCompleted && "bg-primary text-primary-foreground",
                    isCurrent && !isCompleted && "bg-primary/20 text-primary border-2 border-primary",
                    !isCurrent && !isCompleted && !isLocked && "bg-secondary text-muted-foreground",
                    isLocked && "bg-secondary/50 text-muted-foreground/50"
                  )}
                >
                  {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : isLocked ? <Lock className="h-4 w-4" /> : step.num}
                </div>
                <span
                  className={cn(
                    "text-xs text-center truncate max-w-[80px]",
                    isCurrent ? "text-foreground font-medium" : "text-muted-foreground",
                    isLocked && "text-muted-foreground/50"
                  )}
                >
                  {t(step.label, step.label)}
                </span>
              </div>
              {i < roleConfig.steps.length - 1 && (
                <div className={cn("h-px flex-1 mx-1 mt-[-20px]", isCompleted ? "bg-primary/40" : "bg-border")} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
