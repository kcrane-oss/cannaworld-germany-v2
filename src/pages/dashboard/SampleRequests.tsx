import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Inbox, Loader2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSampleRequests, type SampleRequestRow } from "@/hooks/useSampleRequests";
import { updateSampleRequestStatus } from "@/lib/sample-request-api";
import {
  SAMPLE_REQUEST_STATUS_LABELS,
  nextStatuses,
  type SampleRequestStatus,
} from "@/lib/sample-request-status";
import { Button } from "@/components/ui/button";

const STATUS_TINT: Record<SampleRequestStatus, string> = {
  received: "border-cyan-300/30 bg-cyan-400/10 text-cyan-200",
  in_review: "border-amber-300/30 bg-amber-400/10 text-amber-200",
  fulfilled: "border-emerald-300/30 bg-emerald-400/10 text-emerald-300",
  declined: "border-red-300/30 bg-red-400/10 text-red-200",
};

export default function SampleRequests() {
  const { t } = useTranslation();
  const { data: requests = [], isLoading, isError, error, refetch } = useSampleRequests();
  const [busyId, setBusyId] = useState<string | null>(null);

  async function transition(id: string, to: SampleRequestStatus) {
    setBusyId(id);
    try {
      await updateSampleRequestStatus(id, to);
      toast.success(t("sampleAdmin.updated", "Status aktualisiert"));
      await refetch();
    } catch (err) {
      toast.error(
        t("sampleAdmin.updateError", "Aktualisierung fehlgeschlagen") +
          (err instanceof Error ? `: ${err.message}` : "")
      );
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Inbox className="h-5 w-5 text-cyan-300" />
        <h1 className="text-2xl font-black tracking-tight">
          {t("sampleAdmin.title", "Sample-Requests")}
        </h1>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-cyan-300" />
        </div>
      )}

      {isError && (
        <div className="rounded-2xl border border-red-300/30 bg-red-400/5 p-4 text-sm text-red-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <div className="font-bold">{t("sampleAdmin.loadError", "Requests konnten nicht geladen werden")}</div>
              <div className="mt-1 text-red-200/80">{error instanceof Error ? error.message : ""}</div>
            </div>
          </div>
        </div>
      )}

      {!isLoading && !isError && requests.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-black/20 p-10 text-center">
          <Inbox className="mx-auto mb-3 h-8 w-8 text-white/30" />
          <div className="text-sm font-bold text-white">{t("sampleAdmin.empty", "Keine Sample-Requests")}</div>
        </div>
      )}

      {!isLoading && !isError && requests.length > 0 && (
        <div className="space-y-3">
          {requests.map((r: SampleRequestRow) => {
            const status = (r.status ?? "received") as SampleRequestStatus;
            const label = SAMPLE_REQUEST_STATUS_LABELS[status] ?? { key: "", de: status };
            return (
              <div key={r.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white">{r.company ?? "—"}</div>
                    <div className="mt-0.5 text-xs text-white/55">
                      {[r.contact_email, r.product_category, r.quantity_kg != null ? `${r.quantity_kg} kg` : null, r.target_pathway]
                        .filter(Boolean)
                        .join(" · ")}
                    </div>
                    {r.context && <div className="mt-2 text-xs text-white/45">{r.context}</div>}
                  </div>
                  <span
                    className={cn(
                      "inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase",
                      STATUS_TINT[status] ?? "border-white/15 bg-white/5 text-white/50"
                    )}
                  >
                    {t(label.key, label.de)}
                  </span>
                </div>

                {nextStatuses(status).length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2 border-t border-white/10 pt-3">
                    {nextStatuses(status).map((to) => (
                      <Button
                        key={to}
                        size="sm"
                        variant="outline"
                        disabled={busyId === r.id}
                        onClick={() => transition(r.id, to)}
                      >
                        {busyId === r.id && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                        → {t(SAMPLE_REQUEST_STATUS_LABELS[to].key, SAMPLE_REQUEST_STATUS_LABELS[to].de)}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
