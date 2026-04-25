import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Send, Shield, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { OnboardingData } from "@/hooks/useRoleOnboarding";
import type { RoleConfig, ShinraiAxis } from "../config/role-configs";
import { ShinraiScoreRadar } from "../ShinraiScoreRadar";

interface Props {
  data: OnboardingData;
  roleConfig: RoleConfig;
  onSave: (patch: Partial<OnboardingData>) => Promise<void>;
  onBack: () => void;
  onSubmit: () => Promise<void>;
  saving: boolean;
}

function computeScore(axes: ShinraiAxis[], answers: Record<string, number>) {
  let totalWeighted = 0;
  let totalWeight = 0;

  const axisScores = axes.map((axis) => {
    const maxPerQ = 4; // max value per question
    let axisSum = 0;
    let axisCount = 0;

    axis.questions.forEach((q) => {
      const val = answers[q.key];
      if (val !== undefined) {
        axisSum += val;
        axisCount++;
      }
    });

    const score = axisCount > 0 ? Math.round((axisSum / (axisCount * maxPerQ)) * 100) : 0;
    totalWeighted += score * axis.weight;
    totalWeight += axis.weight;

    return { key: axis.key, label: axis.label, score, weight: axis.weight };
  });

  const total = totalWeight > 0 ? Math.round(totalWeighted / totalWeight) : 0;

  let rating = "insufficient";
  if (total >= 90) rating = "excellence";
  else if (total >= 70) rating = "compliant";
  else if (total >= 50) rating = "developing";
  else if (total >= 30) rating = "basic";

  let tier = "basic";
  if (total >= 80) tier = "premium";
  else if (total >= 50) tier = "verified";

  return { axisScores, total, rating, tier };
}

export function ShinraiAssessmentStep({ data, roleConfig, onSave, onBack, onSubmit, saving }: Props) {
  const { t } = useTranslation();
  const axes = roleConfig.shinraiAxes;

  // Initialize answers from existing assessment
  const [answers, setAnswers] = useState<Record<string, number>>(() => {
    const existing = data.shinrai_assessment || {};
    const init: Record<string, number> = {};
    Object.values(existing).forEach((axis: any) => {
      if (axis?.answers) {
        Object.entries(axis.answers).forEach(([k, v]) => {
          init[k] = v as number;
        });
      }
    });
    return init;
  });

  const { axisScores, total, rating, tier } = useMemo(() => computeScore(axes, answers), [axes, answers]);

  const totalQuestions = axes.reduce((sum, a) => sum + a.questions.length, 0);
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount >= totalQuestions;

  const handleAnswer = (key: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    // Build assessment structure per axis
    const assessment: Record<string, any> = {};
    axes.forEach((axis) => {
      const axisAnswers: Record<string, number> = {};
      axis.questions.forEach((q) => {
        if (answers[q.key] !== undefined) axisAnswers[q.key] = answers[q.key];
      });
      const axScore = axisScores.find((a) => a.key === axis.key);
      assessment[axis.key] = { answers: axisAnswers, score: axScore?.score ?? 0 };
    });

    const completed = data.completed_steps.includes(5) ? data.completed_steps : [...data.completed_steps, 5];
    await onSave({
      shinrai_assessment: assessment,
      shinrai_score: total,
      shinrai_rating: rating,
      tier,
      completed_steps: completed,
    });

    await onSubmit();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-amber-500/10">
          <Shield className="h-6 w-6 text-amber-500" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{t("ob.shinrai_title", "ShinrAi Self-Assessment")}</h2>
          <p className="text-sm text-muted-foreground">
            {t("ob.shinrai_desc", "Rate your current compliance readiness across all dimensions")}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>{answeredCount}/{totalQuestions} {t("ob.questions_answered", "questions answered")}</span>
        <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(answeredCount / totalQuestions) * 100}%` }} />
        </div>
      </div>

      {/* Live Radar */}
      {answeredCount > 0 && (
        <ShinraiScoreRadar
          axes={axisScores.map((a) => ({ ...a, label: t(a.label, a.key) }))}
          totalScore={total}
          rating={rating}
          size={260}
        />
      )}

      {/* Questions by Axis */}
      <div className="space-y-8">
        {axes.map((axis) => (
          <div key={axis.key} className="space-y-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {t(axis.label, axis.key)}
              <span className="text-xs text-muted-foreground font-normal">({axis.weight}%)</span>
            </h3>

            {axis.questions.map((q) => (
              <div key={q.key} className="pl-4 space-y-2">
                <p className="text-sm text-foreground">{t(q.label, q.key)}</p>
                <RadioGroup
                  value={answers[q.key]?.toString()}
                  onValueChange={(v) => handleAnswer(q.key, parseInt(v))}
                  className="flex flex-wrap gap-3"
                >
                  {q.options.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-1.5 cursor-pointer">
                      <RadioGroupItem value={opt.value.toString()} />
                      <span className="text-xs text-muted-foreground">{t(opt.label, opt.label)}</span>
                    </label>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}><ArrowLeft className="mr-2 h-4 w-4" />{t("ob.back", "Back")}</Button>
        <Button
          onClick={handleSubmit}
          disabled={!allAnswered || saving}
          size="lg"
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          {saving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send className="mr-2 h-4 w-4" />
          )}
          {t("ob.submit", "Submit for Review")}
        </Button>
      </div>
    </div>
  );
}
