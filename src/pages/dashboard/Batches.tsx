import { useState, useMemo } from "react";
import { useBatches, type BatchRow } from "@/hooks/useBatches";
import { Package, Loader2, AlertTriangle, Search, ExternalLink } from "lucide-react";

const STATUS_TINT: Record<string, string> = {
  draft: "bg-white/5 text-white/60 border-white/15",
  submitted: "bg-cyan-400/10 text-cyan-300 border-cyan-300/30",
  under_review: "bg-amber-400/10 text-amber-300 border-amber-300/30",
  approved: "bg-emerald-400/10 text-emerald-300 border-emerald-300/30",
  released: "bg-emerald-400/10 text-emerald-300 border-emerald-300/30",
  rejected: "bg-red-400/10 text-red-300 border-red-300/30",
  recalled: "bg-red-400/10 text-red-300 border-red-300/30",
};

function BatchRow({ batch }: { batch: BatchRow }) {
  const tint = STATUS_TINT[batch.status ?? ""] ?? STATUS_TINT.draft;
  return (
    <tr className="border-b border-white/5 transition hover:bg-white/[0.025]">
      <td className="py-3 pl-4 pr-2">
        <div className="text-sm font-bold text-white">{batch.batch_number ?? "—"}</div>
        <div className="text-xs text-white/45">{new Date(batch.created_at).toLocaleDateString("de-DE")}</div>
      </td>
      <td className="px-2 py-3">
        <div className="text-sm text-white">{batch.product_name ?? "—"}</div>
        <div className="text-xs text-white/45">
          {[batch.strain, batch.category].filter(Boolean).join(" · ") || "—"}
        </div>
      </td>
      <td className="px-2 py-3 text-sm text-white/70">
        {batch.quantity != null ? `${batch.quantity} ${batch.unit ?? ""}` : "—"}
      </td>
      <td className="px-2 py-3 text-sm text-white/70">{batch.origin_country ?? "—"}</td>
      <td className="px-2 py-3">
        <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${tint}`}>
          {batch.status ?? "—"}
        </span>
      </td>
      <td className="py-3 pl-2 pr-4 text-right">
        <a
          href="https://cannaworld-marketplace.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-300 hover:text-cyan-200"
        >
          Marketplace <ExternalLink className="h-3 w-3" />
        </a>
      </td>
    </tr>
  );
}

export default function Batches() {
  const { data: batches = [], isLoading, isError, error } = useBatches();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return batches;
    const q = query.toLowerCase();
    return batches.filter(
      (b: BatchRow) =>
        b.batch_number?.toLowerCase().includes(q) ||
        b.product_name?.toLowerCase().includes(q) ||
        b.strain?.toLowerCase().includes(q) ||
        b.origin_country?.toLowerCase().includes(q),
    );
  }, [batches, query]);

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/12 via-white/[0.045] to-emerald-300/10 p-6 shadow-[0_0_42px_rgba(34,211,238,0.08)] md:p-8">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="relative max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
            <Package className="h-4 w-4" /> Batch Intelligence
          </div>
          <h1 className="text-3xl font-black tracking-tight md:text-5xl">Batches</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">
            Letzte 50 Chargen aus der DE-Pipeline. Stammdaten + CoA + Release-State werden im
            CannaWorld Marketplace gemastert — Germany zeigt den deutschen Auszug.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Charge suchen (Nummer, Produkt, Sorte, Herkunft)…"
              className="w-full rounded-xl border border-white/10 bg-black/30 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-white/30 focus:border-cyan-300/60 focus:outline-none"
            />
          </div>
          <div className="shrink-0 text-xs text-white/45">
            {filtered.length} / {batches.length}
          </div>
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
              <div className="font-bold">Chargen konnten nicht geladen werden</div>
              <div className="mt-1 text-red-200/80">{error instanceof Error ? error.message : "Unbekannter Fehler"}</div>
            </div>
          </div>
        </div>
      )}

      {!isLoading && !isError && filtered.length === 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">
          <Package className="mx-auto mb-4 h-10 w-10 text-white/30" />
          <div className="text-lg font-bold text-white">Keine Chargen gefunden</div>
          <div className="mt-2 text-sm text-white/55">
            {query
              ? "Suchbegriff anpassen oder im Marketplace stöbern."
              : "Chargen werden im Marketplace gemastert. Im Verified Pool stöbern?"}
          </div>
          <a
            href="https://cannaworld-marketplace.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-5 py-2.5 text-sm font-bold text-[#061016] transition hover:bg-cyan-200"
          >
            Marketplace öffnen <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )}

      {!isLoading && !isError && filtered.length > 0 && (
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/[0.04] text-[10px] font-bold uppercase tracking-wider text-white/45">
                <tr>
                  <th className="py-3 pl-4 pr-2">Batch</th>
                  <th className="px-2 py-3">Produkt / Sorte</th>
                  <th className="px-2 py-3">Menge</th>
                  <th className="px-2 py-3">Herkunft</th>
                  <th className="px-2 py-3">Status</th>
                  <th className="py-3 pl-2 pr-4 text-right">Aktion</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b: BatchRow) => (
                  <BatchRow key={b.id} batch={b} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
