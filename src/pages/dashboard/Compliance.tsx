import { useMemo, useState } from "react";
import { CheckCircle2, AlertTriangle, XCircle, MinusCircle, Shield, FileDown } from "lucide-react";

type Status = "covered" | "partial" | "missing" | "na";

interface Requirement {
  key: string;
  label: string;
  hint: string;
  status: Status;
}

interface Framework {
  key: "eu_gmp" | "gdp" | "gacp";
  title: string;
  subtitle: string;
  requirements: Requirement[];
}

// Baseline matrix derived from EU-GMP Part I/II Annex 1+7+13, EU GDP guideline 2013/C 343/01,
// and the WHO/CarePath GACP 2003 reference. Status is a default placeholder — the live
// score lives in AICert's ShinrAi Engine.
const FRAMEWORKS: Framework[] = [
  {
    key: "eu_gmp",
    title: "EU-GMP",
    subtitle: "Good Manufacturing Practice — Annex 1 (sterile), Annex 7 (herbal), Annex 13 (IMPs)",
    requirements: [
      { key: "qms", label: "Quality Management System", hint: "Chapter 1 — Pharmaceutical Quality System", status: "covered" },
      { key: "personnel", label: "Personnel & Training", hint: "Chapter 2 — Key personnel, training records", status: "covered" },
      { key: "premises", label: "Premises & Equipment", hint: "Chapter 3 — Cleanrooms, calibration", status: "partial" },
      { key: "documentation", label: "Documentation (ALCOA+)", hint: "Chapter 4 — Batch records, SOPs, deviations", status: "covered" },
      { key: "production", label: "Production Controls", hint: "Chapter 5 — Process validation, change control", status: "partial" },
      { key: "qc", label: "Quality Control", hint: "Chapter 6 — Stability, OOS, sampling", status: "missing" },
      { key: "outsourced", label: "Outsourced Activities", hint: "Chapter 7 — Contractor quality agreements", status: "partial" },
      { key: "complaints", label: "Complaints & Recall", hint: "Chapter 8 — Defect investigation, recall procedure", status: "missing" },
      { key: "self_inspection", label: "Self-Inspection", hint: "Chapter 9 — Internal audit program", status: "missing" },
      { key: "qp_release", label: "QP Certification & Release", hint: "Annex 16 — Batch release responsibility", status: "partial" },
    ],
  },
  {
    key: "gdp",
    title: "GDP",
    subtitle: "Good Distribution Practice — Guidelines 2013/C 343/01",
    requirements: [
      { key: "qms_gdp", label: "Distribution QMS", hint: "Chapter 1 — Quality system for wholesale", status: "covered" },
      { key: "personnel_gdp", label: "Personnel & RP", hint: "Chapter 2 — Responsible Person designated", status: "missing" },
      { key: "premises_gdp", label: "Premises (storage & transport)", hint: "Chapter 3 — Temperature mapping, security", status: "partial" },
      { key: "operations_gdp", label: "Operations", hint: "Chapter 5 — Receipt, storage, picking, shipping", status: "partial" },
      { key: "complaints_gdp", label: "Complaints, Returns, Falsified Meds", hint: "Chapter 6 — Pharmacovigilance link", status: "missing" },
      { key: "transport_gdp", label: "Transport & Cold Chain", hint: "Chapter 9 — GDP-compliant carrier qualification", status: "partial" },
      { key: "brokers_gdp", label: "Broker / Agent Operations", hint: "Chapter 10 — Brokering activities registered", status: "na" },
    ],
  },
  {
    key: "gacp",
    title: "GACP",
    subtitle: "Good Agricultural & Collection Practice — EMEA/HMPC/246816/2005",
    requirements: [
      { key: "site", label: "Site Selection", hint: "Soil, climate, contamination history", status: "covered" },
      { key: "cultivation", label: "Cultivation Practices", hint: "Seeds/cuttings, irrigation, fertilisation", status: "partial" },
      { key: "harvest", label: "Harvest & Handling", hint: "Timing, mechanical damage, contamination", status: "partial" },
      { key: "drying", label: "Drying & Stabilisation", hint: "Temperature, humidity, microbiological control", status: "missing" },
      { key: "packaging_gacp", label: "Primary Packaging", hint: "Materials, labelling, batch separation", status: "partial" },
      { key: "storage_gacp", label: "Storage at Farm", hint: "Pest control, FIFO, traceability", status: "covered" },
      { key: "personnel_gacp", label: "Personnel Training", hint: "GACP awareness, hygiene", status: "partial" },
      { key: "records_gacp", label: "Records & Traceability", hint: "Lot codes, treatment records", status: "covered" },
    ],
  },
];

const STATUS_META: Record<Status, { label: string; icon: typeof CheckCircle2; tint: string; rank: number }> = {
  covered: { label: "abgedeckt", icon: CheckCircle2, tint: "text-emerald-300 bg-emerald-400/10 border-emerald-300/30", rank: 0 },
  partial: { label: "teilweise", icon: AlertTriangle, tint: "text-amber-300 bg-amber-400/10 border-amber-300/30", rank: 1 },
  missing: { label: "fehlt", icon: XCircle, tint: "text-red-300 bg-red-400/10 border-red-300/30", rank: 2 },
  na: { label: "n/a", icon: MinusCircle, tint: "text-white/40 bg-white/5 border-white/15", rank: 3 },
};

function renderRow(req: Requirement) {
  const meta = STATUS_META[req.status];
  const Icon = meta.icon;
  return (
    <div key={req.key} className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-black/20 p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex-1">
        <div className="text-sm font-bold text-white">{req.label}</div>
        <div className="text-xs leading-5 text-white/45">{req.hint}</div>
      </div>
      <span className={`inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border px-3 py-1 text-xs font-bold ${meta.tint}`}>
        <Icon className="h-3.5 w-3.5" /> {meta.label}
      </span>
    </div>
  );
}

export default function Compliance() {
  const [activeFramework, setActiveFramework] = useState<Framework["key"]>("eu_gmp");
  const active = useMemo(() => FRAMEWORKS.find((f) => f.key === activeFramework)!, [activeFramework]);

  const overallCounts = useMemo(() => {
    const counts: Record<Status, number> = { covered: 0, partial: 0, missing: 0, na: 0 };
    for (const f of FRAMEWORKS) {
      for (const r of f.requirements) {
        counts[r.status]++;
      }
    }
    const total = Object.values(counts).reduce((s, c) => s + c, 0);
    const coverage = total === 0 ? 0 : Math.round(((counts.covered + counts.partial * 0.5) / (total - counts.na)) * 100);
    return { ...counts, total, coverage };
  }, []);

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/12 via-white/[0.045] to-emerald-300/10 p-6 shadow-[0_0_42px_rgba(34,211,238,0.08)] md:p-8">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
              <Shield className="h-4 w-4" /> Compliance Readiness Matrix
            </div>
            <h1 className="text-3xl font-black tracking-tight md:text-5xl">EU-GMP / GDP / GACP</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">
              Statische Default-Matrix als Diskussionsgrundlage. Der tatsächliche, live berechnete ShinrAi-Score
              kommt aus der AICert Audit-Engine — siehe CTA unten.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-center text-sm text-white/60">
            <div className="text-3xl font-black text-cyan-300">{overallCounts.coverage}%</div>
            <div className="text-xs text-white/45">Gesamtcoverage</div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-3xl border border-emerald-300/25 bg-emerald-400/5 p-5">
          <div className="text-2xl font-black text-emerald-300">{overallCounts.covered}</div>
          <div className="text-sm font-semibold text-emerald-100">Abgedeckt</div>
        </div>
        <div className="rounded-3xl border border-amber-300/25 bg-amber-400/5 p-5">
          <div className="text-2xl font-black text-amber-300">{overallCounts.partial}</div>
          <div className="text-sm font-semibold text-amber-100">Teilweise</div>
        </div>
        <div className="rounded-3xl border border-red-300/25 bg-red-400/5 p-5">
          <div className="text-2xl font-black text-red-300">{overallCounts.missing}</div>
          <div className="text-sm font-semibold text-red-100">Fehlt</div>
        </div>
        <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
          <div className="text-2xl font-black text-white/60">{overallCounts.na}</div>
          <div className="text-sm font-semibold text-white/60">N/A</div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.045] p-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2">
            {FRAMEWORKS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setActiveFramework(f.key)}
                className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                  activeFramework === f.key
                    ? "bg-cyan-300 text-[#061016]"
                    : "border border-white/10 bg-white/5 text-white/70 hover:border-cyan-300/40 hover:text-cyan-200"
                }`}
              >
                {f.title}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/70 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-white"
          >
            <FileDown className="h-4 w-4" /> Gap-Report drucken / PDF
          </button>
        </div>
        <div className="mb-4 text-sm text-white/55">{active.subtitle}</div>
        <div className="space-y-3">
          {active.requirements
            .slice()
            .sort((a, b) => STATUS_META[a.status].rank - STATUS_META[b.status].rank)
            .map(renderRow)}
        </div>
      </section>
    </div>
  );
}
