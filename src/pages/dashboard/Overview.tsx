import { Link } from "react-router-dom";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useAuth } from "@/hooks/useAuth";
import {
  ArrowRight,
  Clock,
  ClipboardCheck,
  Package,
  Truck,
  Warehouse,
  AlertTriangle,
  Loader2,
  Network,
  LayoutDashboard,
} from "lucide-react";

interface KpiTile {
  key: string;
  label: string;
  value: number | string;
  hint: string;
  icon: typeof Package;
  tone: "neutral" | "warn" | "alert" | "ok";
  href?: string;
}

const TONE_CLASSES: Record<KpiTile["tone"], string> = {
  neutral: "from-cyan-300/12 via-white/[0.04] to-cyan-400/5 ring-cyan-300/25 text-cyan-200",
  warn: "from-amber-300/15 via-white/[0.04] to-amber-400/5 ring-amber-300/25 text-amber-200",
  alert: "from-red-300/15 via-white/[0.04] to-red-400/5 ring-red-300/25 text-red-200",
  ok: "from-emerald-300/12 via-white/[0.04] to-emerald-400/5 ring-emerald-300/25 text-emerald-200",
};

export default function Overview() {
  const { user, loading: authLoading } = useAuth();
  const { data, isLoading, isError, error, refetch, isFetching } = useDashboardStats();

  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-cyan-300" />
      </div>
    );
  }

  const tiles: KpiTile[] = [
    {
      key: "trade_cases",
      label: "Aktive Trade Cases",
      value: data?.activeTradeCases ?? "–",
      hint: "Importvorgänge in Bearbeitung",
      icon: ClipboardCheck,
      tone: "neutral",
      href: "/dashboard/trade-cases",
    },
    {
      key: "batches",
      label: "Chargen in Prüfung",
      value: data?.batchesInProgress ?? "–",
      hint: "submitted / under_review",
      icon: Package,
      tone: "neutral",
      href: "/dashboard/batches",
    },
    {
      key: "qp",
      label: "QP Release ausstehend",
      value: data?.batchesInProgress ?? "–",
      hint: "Chargen wartet auf QP-Freigabe",
      icon: ClipboardCheck,
      tone: "warn",
      href: "/dashboard/qp-release",
    },
    {
      key: "shipments",
      label: "Aktive Sendungen",
      value: data?.activeShipments ?? "–",
      hint: "planned / picked_up / transit / customs",
      icon: Truck,
      tone: "neutral",
      href: "/dashboard/logistics",
    },
    {
      key: "inventory",
      label: "Inventar-Positionen",
      value: data?.totalInventoryItems ?? "–",
      hint: `${data?.lowStockAlerts ?? 0} Low-Stock-Alerts`,
      icon: Warehouse,
      tone: (data?.lowStockAlerts ?? 0) > 0 ? "warn" : "ok",
      href: "/dashboard/warehouse",
    },
    {
      key: "recalls",
      label: "Offene Recalls",
      value: data?.openRecalls ?? "–",
      hint: "Rückrufe nicht abgeschlossen",
      icon: AlertTriangle,
      tone: (data?.openRecalls ?? 0) > 0 ? "alert" : "ok",
      href: "/dashboard/compliance",
    },
  ];

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/12 via-white/[0.045] to-emerald-300/10 p-6 shadow-[0_0_42px_rgba(34,211,238,0.08)] md:p-8">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
              <LayoutDashboard className="h-4 w-4" /> Germany Command Center
            </div>
            <h1 className="text-3xl font-black tracking-tight md:text-5xl">Importer Dashboard</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">
              Live-Kontrollraum für deutsche Importqualifizierung. Daten kommen aus dem geteilten CannaWorld Gateway / Supabase Backend.
              {user?.email && <span className="block mt-2 text-xs text-cyan-300/80">Angemeldet als {user.email}</span>}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-cyan-300" />
              <span>Auto-refresh alle 60s {isFetching && "· lädt…"}</span>
            </div>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-2 text-xs font-semibold text-cyan-300 hover:text-cyan-200"
            >
              Jetzt aktualisieren
            </button>
          </div>
        </div>
      </section>

      {isError && (
        <div className="rounded-3xl border border-red-300/30 bg-red-400/5 p-5 text-sm text-red-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <div className="font-bold">KPIs konnten nicht geladen werden</div>
              <div className="mt-1 text-red-200/80">{error instanceof Error ? error.message : "Unbekannter Fehler"}</div>
            </div>
          </div>
        </div>
      )}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tiles.map((tile) => {
          const Icon = tile.icon;
          const toneClass = TONE_CLASSES[tile.tone];
          const Body = (
            <div
              className={`rounded-3xl border bg-gradient-to-br p-5 ring-1 transition hover:-translate-y-0.5 hover:shadow-[0_8_24px_rgba(34,211,238,0.1)] ${toneClass}`}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15 ${toneClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                {tile.href && <ArrowRight className="h-4 w-4 text-white/40" />}
              </div>
              <div className="text-3xl font-black text-white">
                {isLoading ? <Loader2 className="h-7 w-7 animate-spin text-white/40" /> : tile.value}
              </div>
              <div className="mt-1 text-sm font-semibold text-white">{tile.label}</div>
              <div className="mt-1 text-xs text-white/45">{tile.hint}</div>
            </div>
          );
          return tile.href ? (
            <Link key={tile.key} to={tile.href} className="block">
              {Body}
            </Link>
          ) : (
            <div key={tile.key}>{Body}</div>
          );
        })}
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.045] p-6">
        <div className="mb-4 flex items-center gap-2">
          <Network className="h-4 w-4 text-cyan-300" />
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/75">Quick Pivot zu CannaWorld-Operations</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <a
            href="https://cannaworld-thailand.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-emerald-400/25 bg-emerald-400/5 p-4 text-sm text-emerald-100 transition hover:border-emerald-300/55 hover:bg-emerald-400/10"
          >
            <div className="font-bold">Gateway öffnen →</div>
            <div className="text-xs text-emerald-100/70">Trade-Cases, Supplier-Stamm, Compliance-Operations</div>
          </a>
          <a
            href="https://cannaworld-marketplace.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-blue-400/25 bg-blue-400/5 p-4 text-sm text-blue-100 transition hover:border-blue-300/55 hover:bg-blue-400/10"
          >
            <div className="font-bold">Marketplace öffnen →</div>
            <div className="text-xs text-blue-100/70">Verifizierte Batches, Auctions, Sample Requests</div>
          </a>
          <a
            href="https://gmp-aicert.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-purple-400/25 bg-purple-400/5 p-4 text-sm text-purple-100 transition hover:border-purple-300/55 hover:bg-purple-400/10"
          >
            <div className="font-bold">AICert öffnen →</div>
            <div className="text-xs text-purple-100/70">Audit Passport, ShinrAi Score, CAPA</div>
          </a>
        </div>
      </section>
    </div>
  );
}
