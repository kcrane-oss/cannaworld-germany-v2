import { useState } from "react";
import { useBatchVerifications, useVerifyBatch, type BatchVerificationRow } from "@/hooks/useBatchVerifications";
import { ShieldCheck, CheckCircle2, XCircle, Clock, AlertTriangle, Loader2, Search } from "lucide-react";

const DECISION_META: Record<BatchVerificationRow["decision"], { label: string; tint: string; icon: typeof CheckCircle2 }> = {
  verified: { label: "Verified", tint: "bg-emerald-400/10 text-emerald-300 border-emerald-300/30", icon: CheckCircle2 },
  rejected: { label: "Rejected", tint: "bg-red-400/10 text-red-300 border-red-300/30", icon: XCircle },
  expired: { label: "Expired", tint: "bg-amber-400/10 text-amber-300 border-amber-300/30", icon: Clock },
  unknown_token: { label: "Unknown Token", tint: "bg-white/5 text-white/55 border-white/15", icon: AlertTriangle },
};

export default function BatchVerification() {
  const [token, setToken] = useState("");
  const [license, setLicense] = useState("");
  const [lastResult, setLastResult] = useState<{ decision: string; reason: string | null; batch_id: string | null } | null>(null);
  const { data: history = [], isLoading: histLoading } = useBatchVerifications();
  const verifyMutation = useVerifyBatch();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim() || !license.trim()) return;
    try {
      const result = await verifyMutation.mutateAsync({ token: token.trim(), pharmacy_license: license.trim() });
      setLastResult(result);
      if (result.decision === "verified") setToken("");
    } catch (err) {
      setLastResult({ decision: "error", reason: err instanceof Error ? err.message : "Unbekannter Fehler", batch_id: null });
    }
  };

  const resultMeta = lastResult ? DECISION_META[lastResult.decision as BatchVerificationRow["decision"]] : null;

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/12 via-white/[0.045] to-emerald-300/10 p-6 shadow-[0_0_42px_rgba(34,211,238,0.08)] md:p-8">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="relative max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
            <ShieldCheck className="h-4 w-4" /> Batch Verifikation
          </div>
          <h1 className="text-3xl font-black tracking-tight md:text-5xl">Cannabis-Batch verifizieren</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">
            Vor Abgabe an Patient: Token vom Lieferschein / DataMatrix scannen, eigene Apotheken-Lizenz
            bestätigen. Verifikation läuft über die <code className="rounded bg-black/30 px-1.5 py-0.5 text-xs text-cyan-200">germany-batch-verify</code> Edge Function
            mit Rate-Limit (30/min), Rollen-Check (pharmacy/compliance/admin) und Audit-Trail.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.045] p-6">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white/75">Neue Verifikation</h2>
        <form onSubmit={handleVerify} className="grid gap-3 md:grid-cols-[2fr_1fr_auto]">
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Batch Token (z.B. BV-2026-AB12CD34EF)"
            className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-cyan-300/60 focus:outline-none"
          />
          <input
            type="text"
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            placeholder="Apotheken-Lizenz"
            className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-cyan-300/60 focus:outline-none"
          />
          <button
            type="submit"
            disabled={verifyMutation.isPending || !token.trim() || !license.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-300 px-6 py-3 text-sm font-bold text-[#061016] transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {verifyMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            Verifizieren
          </button>
        </form>

        {lastResult && resultMeta && (
          <div className={`mt-4 rounded-2xl border p-4 ${resultMeta.tint}`}>
            <div className="flex items-start gap-3">
              <resultMeta.icon className="mt-0.5 h-5 w-5 shrink-0" />
              <div className="flex-1">
                <div className="font-bold">{resultMeta.label}</div>
                {lastResult.reason && <div className="mt-1 text-xs opacity-80">{lastResult.reason}</div>}
                {lastResult.batch_id && (
                  <div className="mt-1 font-mono text-[11px] text-white/55">
                    Batch ID: {lastResult.batch_id}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.045] p-6">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white/75">Letzte 50 Verifikationen</h2>
        {histLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-5 w-5 animate-spin text-cyan-300" />
          </div>
        )}
        {!histLoading && history.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-8 text-center text-sm text-white/55">
            Noch keine Verifikationen erfasst.
          </div>
        )}
        {!histLoading && history.length > 0 && (
          <div className="space-y-2">
            {history.map((row: BatchVerificationRow) => {
              const meta = DECISION_META[row.decision];
              const Icon = meta.icon;
              return (
                <div key={row.id} className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-black/20 p-4 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${meta.tint}`}>
                        <Icon className="h-3 w-3" /> {meta.label}
                      </span>
                      <span className="font-mono text-xs text-white/55">{row.token.slice(0, 24)}…</span>
                    </div>
                    {row.reason && <div className="mt-1 text-xs text-white/55">{row.reason}</div>}
                    <div className="mt-1 text-[11px] text-white/40">
                      License {row.pharmacy_license} · {row.verified_by_email ?? "—"} · {new Date(row.created_at).toLocaleString("de-DE")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
