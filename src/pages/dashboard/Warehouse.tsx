import { useState, useMemo } from "react";
import { useInventory, type InventoryRow } from "@/hooks/useInventory";
import { Warehouse as WarehouseIcon, Loader2, AlertTriangle, Search } from "lucide-react";

function stockTint(item: InventoryRow) {
  if (item.quantity_on_hand === 0) return "bg-red-400/10 text-red-300 border-red-300/30";
  if (item.quantity_on_hand <= item.minimum_stock) return "bg-amber-400/10 text-amber-300 border-amber-300/30";
  return "bg-emerald-400/10 text-emerald-300 border-emerald-300/30";
}

function stockLabel(item: InventoryRow) {
  if (item.quantity_on_hand === 0) return "Out of stock";
  if (item.quantity_on_hand <= item.minimum_stock) return "Low stock";
  return "OK";
}

export default function Warehouse() {
  const { data: items = [], isLoading, isError, error } = useInventory();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "low" | "ok">("all");

  const filtered = useMemo(() => {
    return items.filter((i: InventoryRow) => {
      if (filter === "low" && i.quantity_on_hand > i.minimum_stock) return false;
      if (filter === "ok" && i.quantity_on_hand <= i.minimum_stock) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (i.product_name?.toLowerCase().includes(q) || i.location?.toLowerCase().includes(q));
    });
  }, [items, query, filter]);

  const summary = useMemo(() => {
    const total = items.length;
    const low = items.filter((i: InventoryRow) => i.quantity_on_hand <= i.minimum_stock && i.quantity_on_hand > 0).length;
    const out = items.filter((i: InventoryRow) => i.quantity_on_hand === 0).length;
    const onHand = items.reduce((s: number, i: InventoryRow) => s + (i.quantity_on_hand || 0), 0);
    return { total, low, out, onHand };
  }, [items]);

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/12 via-white/[0.045] to-emerald-300/10 p-6 shadow-[0_0_42px_rgba(34,211,238,0.08)] md:p-8">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="relative max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
            <WarehouseIcon className="h-4 w-4" /> Inventory Control
          </div>
          <h1 className="text-3xl font-black tracking-tight md:text-5xl">Warehouse</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">
            Quarantäne-, Released-, Reserved-Status für die deutsche Lieferkette. Bewegungen
            erfolgen weiterhin über die Gateway Operations-Layer.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-3xl border border-cyan-300/25 bg-cyan-400/5 p-5">
          <div className="text-2xl font-black text-cyan-300">{summary.total}</div>
          <div className="text-sm font-semibold text-cyan-100">Positionen</div>
        </div>
        <div className="rounded-3xl border border-emerald-300/25 bg-emerald-400/5 p-5">
          <div className="text-2xl font-black text-emerald-300">{summary.onHand}</div>
          <div className="text-sm font-semibold text-emerald-100">Einheiten on-hand</div>
        </div>
        <div className="rounded-3xl border border-amber-300/25 bg-amber-400/5 p-5">
          <div className="text-2xl font-black text-amber-300">{summary.low}</div>
          <div className="text-sm font-semibold text-amber-100">Low-Stock</div>
        </div>
        <div className="rounded-3xl border border-red-300/25 bg-red-400/5 p-5">
          <div className="text-2xl font-black text-red-300">{summary.out}</div>
          <div className="text-sm font-semibold text-red-100">Out-of-Stock</div>
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
              placeholder="Produkt oder Lagerort suchen…"
              className="w-full rounded-xl border border-white/10 bg-black/30 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-white/30 focus:border-cyan-300/60 focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "ok", "low"] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setFilter(opt)}
                className={`rounded-xl px-3 py-2.5 text-xs font-bold transition ${
                  filter === opt
                    ? "bg-cyan-300 text-[#061016]"
                    : "border border-white/10 bg-white/5 text-white/70 hover:border-cyan-300/40 hover:text-cyan-200"
                }`}
              >
                {opt === "all" ? "Alle" : opt === "ok" ? "OK" : "Low / Out"}
              </button>
            ))}
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
              <div className="font-bold">Inventar konnte nicht geladen werden</div>
              <div className="mt-1 text-red-200/80">{error instanceof Error ? error.message : "Unbekannter Fehler"}</div>
            </div>
          </div>
        </div>
      )}

      {!isLoading && !isError && filtered.length === 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">
          <WarehouseIcon className="mx-auto mb-4 h-10 w-10 text-white/30" />
          <div className="text-lg font-bold text-white">Keine Positionen gefunden</div>
        </div>
      )}

      {!isLoading && !isError && filtered.length > 0 && (
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/[0.04] text-[10px] font-bold uppercase tracking-wider text-white/45">
                <tr>
                  <th className="py-3 pl-4 pr-2">Produkt</th>
                  <th className="px-2 py-3">Lagerort</th>
                  <th className="px-2 py-3 text-right">On-Hand</th>
                  <th className="px-2 py-3 text-right">Reserved</th>
                  <th className="px-2 py-3 text-right">Min</th>
                  <th className="py-3 pl-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item: InventoryRow) => (
                  <tr key={item.id} className="border-b border-white/5">
                    <td className="py-3 pl-4 pr-2">
                      <div className="text-sm font-bold text-white">{item.product_name}</div>
                    </td>
                    <td className="px-2 py-3 text-sm text-white/70">{item.location}</td>
                    <td className="px-2 py-3 text-right text-sm font-bold text-white">
                      {item.quantity_on_hand} {item.unit}
                    </td>
                    <td className="px-2 py-3 text-right text-sm text-white/55">
                      {item.quantity_reserved} {item.unit}
                    </td>
                    <td className="px-2 py-3 text-right text-sm text-white/45">
                      {item.minimum_stock} {item.unit}
                    </td>
                    <td className="py-3 pl-2 pr-4">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${stockTint(item)}`}>
                        {stockLabel(item)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
