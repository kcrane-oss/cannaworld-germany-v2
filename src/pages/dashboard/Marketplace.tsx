import { useBatches, type BatchRow } from "@/hooks/useBatches";
import { useFarmProducers } from "@/hooks/useFarmProducers";
import { useBatchProvenanceLinks } from "@/hooks/useBatchProvenanceLinks";
import { ShoppingBag, ExternalLink, ArrowRight, Loader2, AlertTriangle, Package, Sprout } from "lucide-react";
import { deriveBatchProvenance, tierByBatchId } from "@/lib/marketplace-provenance";
import { GatekeeperProvenance } from "@/components/marketplace/GatekeeperProvenance";
import { SampleRequestDialog } from "@/components/marketplace/SampleRequestDialog";
import { FarmTierFunnel } from "@/components/onboarding/FarmTierFunnel";

const QUALIFIED_STATUSES = new Set(["released", "approved"]);

export default function Marketplace() {
  const { data: allBatches = [], isLoading, isError, error } = useBatches();
  const { data: farmProducers = [], isError: farmsError } = useFarmProducers();
  const { data: provenanceLinks = [], isError: linksError } = useBatchProvenanceLinks();
  const qualified = allBatches.filter((b: BatchRow) => QUALIFIED_STATUSES.has(b.status ?? "")).slice(0, 6);
  const showPipeline = !farmsError && farmProducers.length > 0;
  // Real per-batch farm tier (Weg D) when the link table exists; empty otherwise
  // so deriveBatchProvenance falls back to status inference.
  const tierMap = linksError ? new Map() : tierByBatchId(provenanceLinks);

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-2xl border border-[#E8874A]/25 bg-gradient-to-br from-[#E8874A]/12 via-white/[0.045] to-[#B8C2D1]/8 p-6 shadow-[0_0_42px_rgba(232,135,74,0.08)] md:p-8">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-[#E8874A]/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-[#E8874A] via-[#B8C2D1] to-white" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E8874A]/25 bg-[#E8874A]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#F2B18D]">
              <ShoppingBag className="h-4 w-4" /> Qualified Supply
            </div>
            <h1 className="text-3xl font-black tracking-tight md:text-5xl">Marketplace</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">
              Vorgeprüfte internationale Batches, Supplier-Profile und Dokumentenstände für deutsche
              B2B-Abnehmer. Listings, Auctions und Sample-Requests laufen im CannaWorld Marketplace —
              Germany zeigt die deutsche Vorschau.
            </p>
          </div>
          <a
            href="https://cannaworld-marketplace.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#E8874A] px-5 py-3 text-sm font-bold text-[#080C14] transition hover:bg-[#F2B18D]"
          >
            Marketplace öffnen <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>

      {showPipeline && (
        <section className="rounded-2xl border border-gold/20 bg-white/[0.045] p-6">
          <div className="mb-4 flex items-center gap-2">
            <Sprout className="h-4 w-4 text-gold" />
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/75">
              Supply-Pipeline · Thailand-Farmen
            </h2>
          </div>
          <FarmTierFunnel producers={farmProducers} />
        </section>
      )}

      <section className="rounded-2xl border border-white/10 bg-white/[0.045] p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-cyan-300" />
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/75">EU-ready Batch Pool · Letzte 6 freigegebene Chargen</h2>
          </div>
          <a
            href="/dashboard/batches"
            className="text-xs font-semibold text-cyan-300 hover:text-cyan-200"
          >
            Alle Chargen →
          </a>
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
                <div className="font-bold">Batches konnten nicht geladen werden</div>
                <div className="mt-1 text-red-200/80">{error instanceof Error ? error.message : "Unbekannter Fehler"}</div>
              </div>
            </div>
          </div>
        )}

        {!isLoading && !isError && qualified.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-10 text-center">
            <Package className="mx-auto mb-3 h-8 w-8 text-white/30" />
            <div className="text-sm font-bold text-white">Aktuell keine freigegebenen Chargen</div>
            <div className="mt-1 text-xs text-white/55">
              Im vollständigen Pool im CannaWorld Marketplace stöbern.
            </div>
          </div>
        )}

        {!isLoading && !isError && qualified.length > 0 && (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {qualified.map((b: BatchRow) => (
              <div key={b.id} className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-[#E8874A]/40">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#F2B18D]">{b.batch_number ?? "—"}</div>
                    <div className="mt-1 truncate text-sm font-bold text-white">{b.product_name ?? "—"}</div>
                    <div className="mt-0.5 text-xs text-white/55">
                      {[b.strain, b.category, b.origin_country].filter(Boolean).join(" · ")}
                    </div>
                  </div>
                  <span className="inline-flex shrink-0 items-center rounded-full border border-emerald-300/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-300">
                    {b.status}
                  </span>
                </div>
                <GatekeeperProvenance
                  provenance={deriveBatchProvenance({
                    status: b.status,
                    originCountry: b.origin_country,
                    producerTier: tierMap.get(b.id) ?? null,
                  })}
                />
                <div className="mt-3 flex items-center justify-between text-xs text-white/55">
                  <span>{b.quantity != null ? `${b.quantity} ${b.unit ?? ""}` : "—"}</span>
                  <a
                    href={`https://cannaworld-marketplace.com/batch/${b.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-[#E8874A] hover:text-[#F2B18D]"
                  >
                    Im Marketplace ansehen <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-cyan-300/10 via-white/[0.045] to-white/[0.025] p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h3 className="text-lg font-bold text-white">Sample-Request für deutsche Importer</h3>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Bedarf strukturieren (Indikation, Menge, Pfad) und CannaWorld koordiniert qualifizierten
              Supplier, EU-Release und Logistik. Keine Endkunden, kein Therapieversprechen — reiner
              B2B-/Compliance-Intake.
            </p>
          </div>
          <SampleRequestDialog />
        </div>
      </section>
    </div>
  );
}
