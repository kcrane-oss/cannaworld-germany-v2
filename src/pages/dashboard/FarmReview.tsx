import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { ClipboardCheck, Loader2, ShieldAlert, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFarmAuditSubmissions, type FarmAuditSubmissionRow } from "@/hooks/useFarmAuditSubmissions";
import { decideFarmAudit } from "@/lib/farm-audit-api";
import { Button } from "@/components/ui/button";

const STATUS_TINT: Record<string, string> = {
  pending: "border-amber-300/30 bg-amber-400/10 text-amber-200",
  approved: "border-emerald-300/30 bg-emerald-400/10 text-emerald-300",
  rejected: "border-red-300/30 bg-red-400/10 text-red-200",
};

export default function FarmReview() {
  const { t } = useTranslation();
  const { data: subs = [], isLoading, isError, refetch } = useFarmAuditSubmissions();
  const [busyId, setBusyId] = useState<string | null>(null);

  async function decide(id: string, decision: "approved" | "rejected") {
    setBusyId(id);
    try {
      await decideFarmAudit(id, decision);
      toast.success(decision === "approved" ? t("farmReview.approved", "Farm freigegeben") : t("farmReview.rejected", "Abgelehnt"));
      await refetch();
    } catch (err) {
      toast.error(t("farmReview.error", "Entscheidung fehlgeschlagen") + (err instanceof Error ? `: ${err.message}` : ""));
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <ClipboardCheck className="h-5 w-5 text-cyan-300" />
        <h1 className="text-2xl font-black tracking-tight">{t("farmReview.title", "Farm-Freigabe")}</h1>
      </div>

      {isLoading && <Loader2 className="h-6 w-6 animate-spin text-cyan-300" />}
      {isError && <div className="text-sm text-red-200">{t("farmReview.loadError", "Einreichungen konnten nicht geladen werden")}</div>}
      {!isLoading && !isError && subs.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-black/20 p-10 text-center text-sm text-white/55">
          {t("farmReview.empty", "Keine Einreichungen")}
        </div>
      )}

      <div className="space-y-3">
        {subs.map((s: FarmAuditSubmissionRow) => {
          const status = s.status ?? "pending";
          const risky = (s.risk_score ?? 0) >= 25;
          return (
            <div key={s.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-white">{s.farm_name ?? "—"}</div>
                  <div className="mt-0.5 text-xs text-white/55">
                    {[s.province, `Self ${s.self_assessment_score ?? 0}%`, `${s.document_count ?? 0} Dok.`].filter(Boolean).join(" · ")}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {risky && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-red-300/30 bg-red-400/10 px-2 py-0.5 text-[10px] font-bold uppercase text-red-300">
                      <ShieldAlert className="h-3 w-3" /> {t("farmReview.risk", "Risiko")} {s.risk_score}
                    </span>
                  )}
                  <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase", STATUS_TINT[status] ?? "border-white/15 bg-white/5 text-white/50")}>
                    {t(`farmReview.status.${status}`, status)}
                  </span>
                </div>
              </div>

              {status === "pending" && (
                <div className="mt-3 flex gap-2 border-t border-white/10 pt-3">
                  <Button size="sm" disabled={busyId === s.id} onClick={() => decide(s.id, "approved")}>
                    <Check className="mr-1 h-3 w-3" /> {t("farmReview.approve", "Freigeben")}
                  </Button>
                  <Button size="sm" variant="outline" disabled={busyId === s.id} onClick={() => decide(s.id, "rejected")}>
                    <X className="mr-1 h-3 w-3" /> {t("farmReview.reject", "Ablehnen")}
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
