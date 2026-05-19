import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, AlertTriangle, FileSignature, Loader2 } from "lucide-react";
import { ANNEX_16_CHECKLIST, isChecklistComplete, emptyChecklistState, type ChecklistState } from "@/lib/annex16-checklist";

interface QPReleaseChecklistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseId: string;
  caseRef: string;
  initialState?: ChecklistState;
  /**
   * Called when the QP submits a complete (all critical items checked) checklist.
   * Receives the final checklist state to persist into the milestone metadata.
   */
  onRelease: (state: ChecklistState) => Promise<void> | void;
  /** Called when the QP marks the batch as rejected (with reason). */
  onReject: (reason: string) => Promise<void> | void;
}

function storageKey(caseId: string) {
  return `cw-germany.qp-checklist.${caseId}`;
}

export default function QPReleaseChecklistDialog({
  open,
  onOpenChange,
  caseId,
  caseRef,
  initialState,
  onRelease,
  onReject,
}: QPReleaseChecklistDialogProps) {
  const [state, setState] = useState<ChecklistState>(() => initialState ?? emptyChecklistState());
  const [busy, setBusy] = useState(false);
  const [rejectMode, setRejectMode] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  // Restore from localStorage when the dialog opens for this case
  useEffect(() => {
    if (!open) return;
    if (initialState) {
      setState(initialState);
      return;
    }
    try {
      const raw = localStorage.getItem(storageKey(caseId));
      if (raw) setState(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, [open, caseId, initialState]);

  // Persist as the user works
  useEffect(() => {
    if (!open) return;
    try {
      localStorage.setItem(storageKey(caseId), JSON.stringify(state));
    } catch {
      /* ignore quota errors */
    }
  }, [state, caseId, open]);

  const status = useMemo(() => isChecklistComplete(state), [state]);
  const completedCount = useMemo(() => Object.values(state).filter((v) => v.checked).length, [state]);

  const setItem = (key: string, patch: Partial<{ checked: boolean; comment: string }>) => {
    setState((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));
  };

  const handleRelease = async () => {
    if (!status.ok) return;
    setBusy(true);
    try {
      await onRelease(state);
      try { localStorage.removeItem(storageKey(caseId)); } catch { /* ignore */ }
      onOpenChange(false);
    } finally {
      setBusy(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) return;
    setBusy(true);
    try {
      await onReject(rejectReason.trim());
      onOpenChange(false);
    } finally {
      setBusy(false);
      setRejectMode(false);
      setRejectReason("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSignature className="h-5 w-5 text-cyan-500" />
            QP Release Checklist · Annex 16
          </DialogTitle>
          <DialogDescription>
            Trade Case <span className="font-mono font-semibold">{caseRef}</span> ·{" "}
            <span className={status.ok ? "text-emerald-600" : "text-amber-600"}>
              {completedCount} / {ANNEX_16_CHECKLIST.length} Items, {status.missing.length} kritische ausstehend
            </span>
          </DialogDescription>
        </DialogHeader>

        {!rejectMode ? (
          <div className="space-y-3 py-2">
            {ANNEX_16_CHECKLIST.map((item) => {
              const itemState = state[item.key] ?? { checked: false };
              return (
                <div
                  key={item.key}
                  className={`rounded-2xl border p-4 transition ${
                    itemState.checked
                      ? "border-emerald-500/40 bg-emerald-500/5"
                      : item.critical
                        ? "border-amber-500/30 bg-amber-500/[0.03]"
                        : "border-border bg-card/40"
                  }`}
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <Checkbox
                      checked={itemState.checked}
                      onCheckedChange={(checked) => setItem(item.key, { checked: !!checked })}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{item.label}</span>
                        {item.critical && (
                          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-600">
                            Kritisch
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 text-xs text-muted-foreground">{item.reference}</div>
                    </div>
                  </label>
                  <Textarea
                    placeholder="Anmerkung / Evidenz-Referenz (optional)"
                    value={itemState.comment ?? ""}
                    onChange={(e) => setItem(item.key, { comment: e.target.value })}
                    className="mt-3 min-h-[60px] text-xs"
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3 py-4">
            <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-4">
              <div className="flex items-center gap-2 font-semibold text-red-600">
                <AlertTriangle className="h-4 w-4" /> Charge ablehnen
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Eine Rejection wird als finale QP-Entscheidung gespeichert und kann nur durch eine neue
                Charge oder einen formalen Change-Control aufgehoben werden. Begründung pflichtig.
              </p>
              <Textarea
                placeholder="Begründung für die Ablehnung (deviation reference, OOS, etc.)"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="mt-3 min-h-[120px]"
              />
            </div>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-2">
          {!rejectMode ? (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => setRejectMode(true)}
                disabled={busy}
                className="border-red-500/30 text-red-600 hover:bg-red-500/10"
              >
                <AlertTriangle className="mr-2 h-4 w-4" /> Charge ablehnen
              </Button>
              <Button
                type="button"
                onClick={handleRelease}
                disabled={!status.ok || busy}
                className="bg-emerald-500 text-white hover:bg-emerald-600"
              >
                {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
                {status.ok ? "Charge freigeben" : `Noch ${status.missing.length} kritische Items offen`}
              </Button>
            </>
          ) : (
            <>
              <Button type="button" variant="outline" onClick={() => setRejectMode(false)} disabled={busy}>
                Zurück zur Checklist
              </Button>
              <Button
                type="button"
                onClick={handleReject}
                disabled={busy || !rejectReason.trim()}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <AlertTriangle className="mr-2 h-4 w-4" />}
                Ablehnung bestätigen
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
