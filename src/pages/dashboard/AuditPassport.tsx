import { useSuppliers, type Supplier } from "@/hooks/use-suppliers";
import { Fingerprint, ExternalLink, Loader2, AlertTriangle, Shield, FileText, ShieldCheck } from "lucide-react";

function passportSignals(s: Supplier) {
  const facilityProof = s.gmp_score != null && s.gmp_score >= 70;
  const docProof = s.documentation_score != null && s.documentation_score >= 70;
  const isoProof = s.iso_certified;
  const qualified = s.status === "qualified" || s.status === "conditionally_qualified";
  const total = 4;
  const met = [facilityProof, docProof, isoProof, qualified].filter(Boolean).length;
  return { facilityProof, docProof, isoProof, qualified, met, total };
}

export default function AuditPassport() {
  const { data: suppliers = [], isLoading, isError, error } = useSuppliers();
  const ranked = suppliers
    .slice()
    .sort((a: Supplier, b: Supplier) => (b.overall_score ?? 0) - (a.overall_score ?? 0));

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[2rem] border border-purple-400/25 bg-gradient-to-br from-purple-400/12 via-white/[0.045] to-cyan-400/10 p-6 shadow-[0_0_42px_rgba(168,85,247,0.08)] md:p-8">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-purple-400/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-400/25 bg-purple-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-purple-200">
              <Fingerprint className="h-4 w-4" /> Proof Layer
            </div>
            <h1 className="text-3xl font-black tracking-tight md:text-5xl">Audit Passport</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">
              Prüfbarer Vertrauenspass für Supplier, Facility, Batch und Dokumentenstand. Generiert
              und live berechnet im GMP-AICert AI-Audit-Stack (ShinrAi 6-Achsen-Score).
            </p>
          </div>
          <a
            href="https://gmp-aicert.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-purple-300 px-5 py-3 text-sm font-bold text-[#1a0533] transition hover:bg-purple-200"
          >
            Vollständige Audits in AICert <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-4">
        {[
          { icon: Shield, label: "Facility Proof", hint: "GMP-Score ≥ 70" },
          { icon: FileText, label: "Document Proof", hint: "Doc-Score ≥ 70" },
          { icon: ShieldCheck, label: "ISO Proof", hint: "ISO 9001 oder höher" },
          { icon: Fingerprint, label: "Qualified Status", hint: "Qualified oder Conditional" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-2xl bg-purple-400/10 text-purple-300 ring-1 ring-purple-300/30">
                <Icon className="h-4 w-4" />
              </div>
              <div className="text-sm font-bold text-white">{s.label}</div>
              <div className="text-xs text-white/45">{s.hint}</div>
            </div>
          );
        })}
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.045] p-6">
        <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-white/75">
          Supplier Passport-Status
        </h2>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-purple-300" />
          </div>
        )}

        {isError && (
          <div className="rounded-2xl border border-red-300/30 bg-red-400/5 p-4 text-sm text-red-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
              <div>{error instanceof Error ? error.message : "Unbekannter Fehler"}</div>
            </div>
          </div>
        )}

        {!isLoading && !isError && ranked.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-10 text-center text-sm text-white/55">
            Noch keine Supplier mit Passport-relevanten Scores erfasst.
          </div>
        )}

        {!isLoading && !isError && ranked.length > 0 && (
          <div className="space-y-2">
            {ranked.slice(0, 20).map((s: Supplier) => {
              const sig = passportSignals(s);
              const fill = (sig.met / sig.total) * 100;
              return (
                <div key={s.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-purple-200">{s.supplier_number}</div>
                      <div className="mt-1 truncate text-sm font-bold text-white">{s.name}</div>
                      <div className="text-xs text-white/45">
                        {[s.category, s.country].filter(Boolean).join(" · ")} · Overall {s.overall_score ?? "—"}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {[
                        { ok: sig.facilityProof, icon: Shield, title: "Facility ≥70" },
                        { ok: sig.docProof, icon: FileText, title: "Docs ≥70" },
                        { ok: sig.isoProof, icon: ShieldCheck, title: "ISO" },
                        { ok: sig.qualified, icon: Fingerprint, title: "Qualified" },
                      ].map(({ ok, icon: Icon, title }) => (
                        <div
                          key={title}
                          title={title}
                          className={`flex h-7 w-7 items-center justify-center rounded-lg border ${
                            ok ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-300" : "border-white/10 bg-white/[0.03] text-white/25"
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                    <div
                      className={`h-full transition-all ${
                        fill >= 75 ? "bg-emerald-400" : fill >= 50 ? "bg-amber-400" : "bg-red-400"
                      }`}
                      style={{ width: `${fill}%` }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-white/45">
                    <span>
                      {sig.met} von {sig.total} Passport-Signalen erfüllt
                    </span>
                    <a
                      href="https://gmp-aicert.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-purple-300 hover:text-purple-200"
                    >
                      Vollständiger Passport <ExternalLink className="h-3 w-3" />
                    </a>
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
