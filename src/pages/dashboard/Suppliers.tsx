import { useState, useMemo } from "react";
import { useSuppliers, type Supplier, type SupplierStatus } from "@/hooks/use-suppliers";
import { Building2, Loader2, AlertTriangle, ShieldCheck, Search, ExternalLink } from "lucide-react";

const STATUS_META: Record<SupplierStatus, { label: string; tint: string }> = {
  qualified: { label: "Qualified", tint: "bg-emerald-400/10 text-emerald-300 border-emerald-300/30" },
  conditionally_qualified: { label: "Conditional", tint: "bg-amber-400/10 text-amber-300 border-amber-300/30" },
  under_review: { label: "Under Review", tint: "bg-cyan-400/10 text-cyan-300 border-cyan-300/30" },
  pending: { label: "Pending", tint: "bg-white/5 text-white/60 border-white/15" },
  suspended: { label: "Suspended", tint: "bg-orange-400/10 text-orange-300 border-orange-300/30" },
  disqualified: { label: "Disqualified", tint: "bg-red-400/10 text-red-300 border-red-300/30" },
};

function scoreColor(score: number | null) {
  if (score == null) return "text-white/40";
  if (score >= 80) return "text-emerald-300";
  if (score >= 60) return "text-amber-300";
  return "text-red-300";
}

function SupplierCard({ supplier }: { supplier: Supplier }) {
  const status = STATUS_META[supplier.status] ?? STATUS_META.pending;
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 transition hover:border-cyan-300/30">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-white/45">
            <Building2 className="h-3.5 w-3.5 text-cyan-300" /> {supplier.supplier_number}
          </div>
          <div className="mt-2 truncate text-lg font-bold text-white">{supplier.name}</div>
          <div className="mt-0.5 text-xs text-white/45">
            {[supplier.category, supplier.country].filter(Boolean).join(" · ")}
          </div>
        </div>
        <span className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${status.tint}`}>
          {status.label}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-2 rounded-2xl bg-black/20 p-3">
        {[
          ["GMP", supplier.gmp_score],
          ["Quality", supplier.quality_score],
          ["Delivery", supplier.delivery_score],
          ["Docs", supplier.documentation_score],
        ].map(([label, score]) => (
          <div key={label as string} className="text-center">
            <div className={`text-lg font-black ${scoreColor(score as number | null)}`}>
              {score == null ? "–" : score}
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-white/40">{label}</div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-white/55">
        <span>
          {supplier.iso_certified && <span className="mr-2 inline-flex items-center gap-1 text-cyan-300"><ShieldCheck className="h-3 w-3" /> ISO</span>}
          {supplier.gmp_certificate_expiry && <span>GMP gültig bis {new Date(supplier.gmp_certificate_expiry).toLocaleDateString("de-DE")}</span>}
        </span>
        <a
          href="https://cannaworld-thailand.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200"
        >
          Im Gateway öffnen <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}

export default function Suppliers() {
  const { data: suppliers = [], isLoading, isError, error } = useSuppliers();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<SupplierStatus | "all">("all");

  const filtered = useMemo(() => {
    return suppliers.filter((s: Supplier) => {
      if (statusFilter !== "all" && s.status !== statusFilter) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        s.name?.toLowerCase().includes(q) ||
        s.supplier_number?.toLowerCase().includes(q) ||
        s.country?.toLowerCase().includes(q) ||
        s.category?.toLowerCase().includes(q)
      );
    });
  }, [suppliers, query, statusFilter]);

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/12 via-white/[0.045] to-emerald-300/10 p-6 shadow-[0_0_42px_rgba(34,211,238,0.08)] md:p-8">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="relative max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
            <Building2 className="h-4 w-4" /> Verified Network
          </div>
          <h1 className="text-3xl font-black tracking-tight md:text-5xl">Suppliers</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">
            Supplier-Stammdaten aus dem geteilten CannaWorld Gateway Backend. Stammdatenpflege (Audits,
            Re-Qualifizierung) erfolgt im Gateway — Germany zeigt den read-only Status.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Supplier suchen (Name, Nummer, Land, Kategorie)…"
              className="w-full rounded-xl border border-white/10 bg-black/30 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-white/30 focus:border-cyan-300/60 focus:outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as SupplierStatus | "all")}
            className="rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white focus:border-cyan-300/60 focus:outline-none"
          >
            <option value="all">Alle Status</option>
            {(Object.keys(STATUS_META) as SupplierStatus[]).map((s) => (
              <option key={s} value={s}>
                {STATUS_META[s].label}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-2 text-xs text-white/45">
          {filtered.length} von {suppliers.length} Suppliers
        </div>
      </section>

      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-cyan-300" />
        </div>
      )}

      {isError && (
        <div className="rounded-3xl border border-red-300/30 bg-red-400/5 p-5 text-sm text-red-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <div className="font-bold">Supplier-Liste konnte nicht geladen werden</div>
              <div className="mt-1 text-red-200/80">{error instanceof Error ? error.message : "Unbekannter Fehler"}</div>
            </div>
          </div>
        </div>
      )}

      {!isLoading && !isError && filtered.length === 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">
          <Building2 className="mx-auto mb-4 h-10 w-10 text-white/30" />
          <div className="text-lg font-bold text-white">Keine Supplier gefunden</div>
          <div className="mt-2 text-sm text-white/55">
            {query || statusFilter !== "all"
              ? "Filter anpassen oder neuen Supplier im Gateway anlegen."
              : "Suppliers werden im CannaWorld Gateway angelegt und qualifiziert."}
          </div>
        </div>
      )}

      {!isLoading && !isError && filtered.length > 0 && (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((s: Supplier) => (
            <SupplierCard key={s.id} supplier={s} />
          ))}
        </section>
      )}
    </div>
  );
}
