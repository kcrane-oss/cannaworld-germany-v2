import { useMemo } from "react";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useSuppliers, type Supplier } from "@/hooks/use-suppliers";
import { useBatches } from "@/hooks/useBatches";
import { BarChart3, Loader2, ExternalLink, Activity, Building2, Package } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const SUPPLIER_COLORS: Record<string, string> = {
  qualified: "#34d399",
  conditionally_qualified: "#fbbf24",
  under_review: "#22d3ee",
  pending: "#94a3b8",
  suspended: "#fb923c",
  disqualified: "#f87171",
};

const BATCH_COLORS: Record<string, string> = {
  draft: "#94a3b8",
  submitted: "#22d3ee",
  under_review: "#fbbf24",
  approved: "#34d399",
  released: "#34d399",
  rejected: "#f87171",
  recalled: "#f87171",
};

export default function Analytics() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: suppliers = [], isLoading: suppliersLoading } = useSuppliers();
  const { data: batches = [], isLoading: batchesLoading } = useBatches();

  const supplierBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const s of suppliers) counts[s.status] = (counts[s.status] || 0) + 1;
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [suppliers]);

  const batchBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const b of batches) {
      const key = b.status ?? "unknown";
      counts[key] = (counts[key] || 0) + 1;
    }
    return Object.entries(counts).map(([status, count]) => ({ status, count }));
  }, [batches]);

  const isLoading = statsLoading || suppliersLoading || batchesLoading;

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[2rem] border border-purple-400/25 bg-gradient-to-br from-purple-400/12 via-white/[0.045] to-cyan-400/10 p-6 shadow-[0_0_42px_rgba(168,85,247,0.08)] md:p-8">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-purple-400/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-400/25 bg-purple-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-purple-200">
              <BarChart3 className="h-4 w-4" /> Performance Intelligence
            </div>
            <h1 className="text-3xl font-black tracking-tight md:text-5xl">Analytics</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">
              Snapshot der deutschen Pipeline: Trade-Cases, Chargen, Supplier-Qualität,
              Inventar-Health. Tiefere Time-Series, Cohort-Analysen und ShinrAi-Scoring
              im AICert Analytics-Layer.
            </p>
          </div>
          <a
            href="https://gmp-aicert.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-purple-300 px-5 py-3 text-sm font-bold text-[#1a0533] transition hover:bg-purple-200"
          >
            AICert Analytics öffnen <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {[
          { icon: Activity, label: "Aktive Trade-Cases", value: stats?.activeTradeCases ?? 0, tint: "text-cyan-300" },
          { icon: Package, label: "Chargen in Prüfung", value: stats?.batchesInProgress ?? 0, tint: "text-amber-300" },
          { icon: Building2, label: "Verified Suppliers", value: suppliers.filter((s: Supplier) => s.status === "qualified").length, tint: "text-emerald-300" },
          { icon: BarChart3, label: "Sendungen aktiv", value: stats?.activeShipments ?? 0, tint: "text-purple-300" },
        ].map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
              <Icon className={`mb-3 h-5 w-5 ${m.tint}`} />
              <div className={`text-3xl font-black ${m.tint}`}>{isLoading ? <Loader2 className="h-7 w-7 animate-spin" /> : m.value}</div>
              <div className="mt-1 text-sm font-semibold text-white">{m.label}</div>
            </div>
          );
        })}
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white/75">Supplier-Verteilung nach Status</h3>
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-cyan-300" />
            </div>
          ) : supplierBreakdown.length === 0 ? (
            <div className="flex h-64 items-center justify-center text-sm text-white/40">Keine Supplier-Daten</div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={supplierBreakdown}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={2}
                >
                  {supplierBreakdown.map((entry) => (
                    <Cell key={entry.name} fill={SUPPLIER_COLORS[entry.name] ?? "#64748b"} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#0b121b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }}
                  itemStyle={{ color: "#e2e8f0" }}
                />
                <Legend wrapperStyle={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white/75">Chargen-Verteilung nach Status</h3>
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-cyan-300" />
            </div>
          ) : batchBreakdown.length === 0 ? (
            <div className="flex h-64 items-center justify-center text-sm text-white/40">Keine Batch-Daten</div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={batchBreakdown}>
                <XAxis dataKey="status" stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 11 }} />
                <YAxis stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ background: "#0b121b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }}
                  itemStyle={{ color: "#e2e8f0" }}
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {batchBreakdown.map((entry) => (
                    <Cell key={entry.status} fill={BATCH_COLORS[entry.status] ?? "#64748b"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-xs text-white/45">
        Hinweis: Daten kommen direkt aus dem geteilten CannaWorld Gateway / Supabase Backend (live, kein Cache).
        Für historische Trends, Vorhersage-Modelle und Cohort-Analysen die AI-gestützte AICert Analytics-Engine nutzen.
      </section>
    </div>
  );
}
