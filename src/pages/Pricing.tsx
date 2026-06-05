import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  FlaskConical,
  Globe2,
  Minus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sprout,
} from "lucide-react";
import UniverseBar from "@/components/UniverseBar";
import { setAppLanguage, type AppLanguage } from "@/i18n";

const logo = "/cannaworld-lockup.webp";

type Tint = "emerald" | "blue" | "purple" | "cyan";

const TINTS: Record<Tint, { ring: string; badge: string; iconBg: string; stripe: string; cta: string }> = {
  emerald: {
    ring: "border-emerald-300/25",
    badge: "border-emerald-300/25 bg-emerald-300/10 text-emerald-200",
    iconBg: "bg-emerald-400/15 text-emerald-300 ring-emerald-300/25",
    stripe: "from-emerald-300 via-teal-400 to-cyan-300",
    cta: "bg-emerald-300 text-[#06160f] hover:bg-emerald-200",
  },
  blue: {
    ring: "border-blue-400/25",
    badge: "border-blue-400/25 bg-blue-400/10 text-blue-200",
    iconBg: "bg-blue-400/15 text-blue-300 ring-blue-300/25",
    stripe: "from-blue-400 via-sky-400 to-cyan-300",
    cta: "bg-blue-300 text-[#06101a] hover:bg-blue-200",
  },
  purple: {
    ring: "border-purple-400/30",
    badge: "border-purple-400/25 bg-purple-400/10 text-purple-200",
    iconBg: "bg-purple-400/15 text-purple-300 ring-purple-300/25",
    stripe: "from-purple-400 via-violet-400 to-blue-300",
    cta: "bg-purple-300 text-[#0d0618] hover:bg-purple-200",
  },
  cyan: {
    ring: "border-cyan-300/25",
    badge: "border-cyan-300/25 bg-cyan-300/10 text-cyan-200",
    iconBg: "bg-cyan-400/15 text-cyan-300 ring-cyan-300/25",
    stripe: "from-cyan-300 via-sky-400 to-emerald-300",
    cta: "bg-cyan-300 text-[#061016] hover:bg-cyan-200",
  },
};

interface Pkg {
  key: string;
  icon: typeof Sprout;
  tint: Tint;
  monthly: number; // THB / month
  from?: boolean; // price is a "from" floor
  popular?: boolean;
  txKey: string;
  txFallback: string;
  features: string[]; // i18n keys for highlighted bullets (fallback handled in locale)
}

// Pricing is locale-neutral and lives in code; copy is threaded through i18n.
const PACKAGES: Pkg[] = [
  {
    key: "farm",
    icon: Sprout,
    tint: "emerald",
    monthly: 4900,
    txKey: "pricing.pkg.farm.tx",
    txFallback: "฿3.500 / GACP-Audit",
    features: ["pricing.pkg.farm.f1", "pricing.pkg.farm.f2", "pricing.pkg.farm.f3", "pricing.pkg.farm.f4"],
  },
  {
    key: "exporter",
    icon: ShoppingBag,
    tint: "blue",
    monthly: 9900,
    txKey: "pricing.pkg.exporter.tx",
    txFallback: "4 % Seller-Commission + ฿1.500 / Listing",
    features: [
      "pricing.pkg.exporter.f1",
      "pricing.pkg.exporter.f2",
      "pricing.pkg.exporter.f3",
      "pricing.pkg.exporter.f4",
    ],
  },
  {
    key: "producer",
    icon: ShieldCheck,
    tint: "purple",
    monthly: 29000,
    popular: true,
    txKey: "pricing.pkg.producer.tx",
    txFallback: "฿35.000 / AI-Video-Audit · ฿59.000 Cert-Setup",
    features: [
      "pricing.pkg.producer.f1",
      "pricing.pkg.producer.f2",
      "pricing.pkg.producer.f3",
      "pricing.pkg.producer.f4",
    ],
  },
  {
    key: "lab",
    icon: FlaskConical,
    tint: "cyan",
    monthly: 14900,
    txKey: "pricing.pkg.lab.tx",
    txFallback: "฿900 / verifiziertem CoA",
    features: ["pricing.pkg.lab.f1", "pricing.pkg.lab.f2", "pricing.pkg.lab.f3", "pricing.pkg.lab.f4"],
  },
  {
    key: "enterprise",
    icon: Building2,
    tint: "emerald",
    monthly: 120000,
    from: true,
    txKey: "pricing.pkg.enterprise.tx",
    txFallback: "reduzierte Provisionen + API-Quoten",
    features: [
      "pricing.pkg.enterprise.f1",
      "pricing.pkg.enterprise.f2",
      "pricing.pkg.enterprise.f3",
      "pricing.pkg.enterprise.f4",
    ],
  },
];

// Feature matrix. Cell values: "yes" | "no" | token-key. Tokens resolve via i18n.
// Any feature not included in a package ("no") is offered à la carte — the cell
// renders the add-on price taken from the row's `addKey`/`addFb`.
type Cell = "yes" | "no" | { t: string; fb: string };
const T = (t: string, fb: string): Cell => ({ t, fb });

interface MatrixRow {
  labelKey: string;
  labelFb: string;
  cells: [Cell, Cell, Cell, Cell, Cell]; // farm, exporter, producer, lab, enterprise
  addKey?: string; // i18n key for the à-la-carte price shown in "no" cells
  addFb?: string;
}

const MATRIX: MatrixRow[] = [
  { labelKey: "pricing.feat.gateway", labelFb: "Gateway-Onboarding (TH)", cells: ["yes", "yes", "yes", "yes", "yes"] },
  {
    labelKey: "pricing.feat.selfAudit",
    labelFb: "Farm Self-Audit",
    cells: ["yes", "no", "yes", "no", "yes"],
    addKey: "pricing.add.selfAudit",
    addFb: "+฿1.900/Mon",
  },
  {
    labelKey: "pricing.feat.gacp",
    labelFb: "GACP-Roadmap (DTAM)",
    cells: ["yes", "no", "yes", "no", "yes"],
    addKey: "pricing.add.gacp",
    addFb: "+฿2.500/Mon",
  },
  {
    labelKey: "pricing.feat.vault",
    labelFb: "Document Vault",
    cells: [T("pricing.tok.basic", "Basis"), "yes", "yes", "yes", "yes"],
  },
  {
    labelKey: "pricing.feat.passport",
    labelFb: "Audit Passport",
    cells: [
      T("pricing.tok.read", "Lesen"),
      T("pricing.tok.read", "Lesen"),
      T("pricing.tok.create", "Erstellen"),
      T("pricing.tok.contrib", "Beitrag"),
      T("pricing.tok.create", "Erstellen"),
    ],
  },
  {
    labelKey: "pricing.feat.aiAudit",
    labelFb: "AI Video Audit / ShinrAi",
    cells: ["no", "no", "yes", "no", "yes"],
    addKey: "pricing.add.aiAudit",
    addFb: "฿35.000/Audit",
  },
  {
    labelKey: "pricing.feat.euGmp",
    labelFb: "EU-GMP-Roadmap + CAPA",
    cells: ["no", "no", "yes", "no", "yes"],
    addKey: "pricing.add.euGmp",
    addFb: "+฿6.900/Mon",
  },
  {
    labelKey: "pricing.feat.listings",
    labelFb: "Marketplace Listings / Auctions",
    cells: ["no", "yes", "no", "no", "yes"],
    addKey: "pricing.add.listings",
    addFb: "+฿4.900/Mon",
  },
  {
    labelKey: "pricing.feat.sample",
    labelFb: "Sample-Request-Fulfillment",
    cells: ["no", "yes", "yes", "no", "yes"],
    addKey: "pricing.add.sample",
    addFb: "+฿1.500/Mon",
  },
  {
    labelKey: "pricing.feat.coa",
    labelFb: "CoA-Upload & -Verifizierung",
    cells: ["no", "no", "yes", T("pricing.tok.master", "Master"), "yes"],
    addKey: "pricing.add.coa",
    addFb: "฿900/CoA",
  },
  {
    labelKey: "pricing.feat.batch",
    labelFb: "Batch-Master + Release-State",
    cells: ["no", "yes", "yes", "no", "yes"],
    addKey: "pricing.add.batch",
    addFb: "+฿2.400/Mon",
  },
  {
    labelKey: "pricing.feat.export",
    labelFb: "Export-Docs / GDP Cold-Chain",
    cells: ["no", "yes", "yes", "no", "yes"],
    addKey: "pricing.add.export",
    addFb: "+฿3.200/Mon",
  },
  {
    labelKey: "pricing.feat.permit",
    labelFb: "อย. / Narcotics-Permit-Tracking",
    cells: ["no", "no", "yes", "no", "yes"],
    addKey: "pricing.add.permit",
    addFb: "+฿2.800/Mon",
  },
  {
    labelKey: "pricing.feat.europe",
    labelFb: "Europe-Portal (EU-Zielseite)",
    cells: ["no", "no", "no", "no", "yes"],
    addKey: "pricing.add.europe",
    addFb: "+฿9.900/Mon",
  },
  {
    labelKey: "pricing.feat.api",
    labelFb: "API-Zugang",
    cells: ["no", "no", "no", T("pricing.tok.read", "Lesen"), T("pricing.tok.full", "Voll")],
    addKey: "pricing.add.api",
    addFb: "+฿5.900/Mon",
  },
  {
    labelKey: "pricing.feat.seats",
    labelFb: "User / Standorte",
    cells: [
      T("pricing.tok.seats3", "3 / 1"),
      T("pricing.tok.seats5", "5 / 1"),
      T("pricing.tok.seats15", "15 / Multi"),
      T("pricing.tok.seats8", "8 / 1"),
      T("pricing.tok.seatsInf", "∞ / Multi"),
    ],
    addKey: "pricing.add.seats",
    addFb: "+฿2.900/Standort",
  },
];

interface AddOn {
  key: string;
  nameFb: string;
  priceFb: string;
  forFb: string;
}
const ADDONS: AddOn[] = [
  { key: "seller", nameFb: "Marketplace-Seller-Zusatz", priceFb: "฿4.900/Mon + 4 %", forFb: "Producer GMP" },
  { key: "facility", nameFb: "Zusätzliche Facility / Farm", priceFb: "฿2.900/Mon je Standort", forFb: "Producer · Enterprise" },
  { key: "express", nameFb: "Express-AI-Video-Audit (72 h)", priceFb: "+฿15.000", forFb: "Producer GMP" },
  { key: "qp", nameFb: "QP-Release-Begleitung (EU)", priceFb: "฿12.000 / Release", forFb: "Producer · Enterprise" },
  { key: "memo", nameFb: "Regulatory-Memo (อย. ↔ EU)", priceFb: "฿8.000 / Stück", forFb: "alle Supply-Rollen" },
  { key: "matching", nameFb: "Priority-Buyer-Matching", priceFb: "฿6.900/Mon", forFb: "Marketplace Exporter" },
];

const FAQ_KEYS = ["thb", "upgrade", "lockin", "commission", "group", "lang"] as const;

const GTM_KEYS = ["funnel", "scale", "anchor", "trust"] as const;

const LANGS: { code: AppLanguage; label: string }[] = [
  { code: "de", label: "DE" },
  { code: "en", label: "EN" },
  { code: "th", label: "ไทย" },
];

function formatTHB(value: number): string {
  return "฿" + value.toLocaleString("en-US");
}

export default function PricingPage() {
  const { t, i18n } = useTranslation();
  const [yearly, setYearly] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#071016] pt-8 text-[#f4f8fb] selection:bg-emerald-400/25">
      <UniverseBar current="germany" />
      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.16),transparent_34%),radial-gradient(circle_at_78%_8%,rgba(34,211,238,0.14),transparent_28%),linear-gradient(180deg,#071016,#091018_48%,#071016)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      </div>

      <nav className="fixed inset-x-0 top-8 z-50 border-b border-white/10 bg-[#071016]/78 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="CannaWorld" className="h-12 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setAppLanguage(l.code)}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                    i18n.language === l.code ? "bg-emerald-300/20 text-emerald-200" : "text-white/50 hover:text-white"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <Link
              to="/login"
              className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2.5 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300/70 hover:bg-cyan-400/20"
            >
              {t("app.partnerLogin", "Partner Login")}
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-8">
        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold text-emerald-300">
            {t("pricing.metaBadge", "CannaWorld · Thailand Export Suite")}
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[0.98] tracking-[-0.04em] md:text-6xl">
            {t("pricing.title", "Fünf Pakete für den Export aus Thailand.")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/62">
            {t(
              "pricing.subtitle",
              "Rolle × Tier, Abo + Transaktion. Von der GACP-Farm bis zur exportierenden Producer-Group — Zertifizierung & Proof in Thailand, Absatz im EU-Funnel.",
            )}
          </p>

          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                !yearly ? "bg-emerald-300/20 text-emerald-200" : "text-white/55 hover:text-white"
              }`}
            >
              {t("pricing.billingMonthly", "Monatlich")}
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition ${
                yearly ? "bg-emerald-300/20 text-emerald-200" : "text-white/55 hover:text-white"
              }`}
            >
              {t("pricing.billingYearly", "Jährlich")}
              <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-bold text-emerald-200">
                {t("pricing.billingSave", "−17 %")}
              </span>
            </button>
          </div>
        </div>

        {/* Package cards */}
        <div className="mt-14 grid gap-5 lg:grid-cols-3 xl:grid-cols-5">
          {PACKAGES.map((pkg) => {
            const tint = TINTS[pkg.tint];
            const Icon = pkg.icon;
            const perMonth = yearly ? Math.round((pkg.monthly * 10) / 12) : pkg.monthly;
            return (
              <div
                key={pkg.key}
                className={`relative flex flex-col overflow-hidden rounded-2xl border bg-white/[0.045] p-6 backdrop-blur transition hover:-translate-y-1 ${tint.ring} ${
                  pkg.popular ? "ring-1 ring-purple-300/40" : ""
                }`}
              >
                <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${tint.stripe}`} />
                {pkg.popular && (
                  <span className="absolute right-4 top-4 rounded-full border border-purple-300/30 bg-purple-400/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-200">
                    {t("pricing.popular", "Beliebt")}
                  </span>
                )}
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${tint.iconBg}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold">{t(`pricing.pkg.${pkg.key}.name`, pkg.key)}</h3>
                <div className={`mt-1 text-xs font-bold uppercase tracking-[0.16em] ${tint.badge.split(" ").slice(-1)[0]}`}>
                  {t(`pricing.pkg.${pkg.key}.persona`, "")}
                </div>
                <p className="mt-3 min-h-[48px] text-sm leading-6 text-white/55">
                  {t(`pricing.pkg.${pkg.key}.tagline`, "")}
                </p>

                <div className="mt-5">
                  <div className="flex items-end gap-1">
                    {pkg.from && <span className="mb-1 text-sm font-semibold text-white/50">{t("pricing.from", "ab")}</span>}
                    <span className="text-3xl font-black tracking-tight">{formatTHB(perMonth)}</span>
                    <span className="mb-1 text-sm text-white/45">{t("pricing.perMonth", "/Mon.")}</span>
                  </div>
                  {yearly && (
                    <div className="mt-1 text-xs text-emerald-300/80">
                      {t("pricing.billedYearly", "jährlich abgerechnet · 2 Monate gratis")}
                    </div>
                  )}
                  <div className="mt-3 rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs leading-5 text-white/60">
                    <span className="font-bold text-white/75">+ {t("pricing.txLabel", "Transaktion")}: </span>
                    {t(pkg.txKey, pkg.txFallback)}
                  </div>
                </div>

                <ul className="mt-5 space-y-2.5 text-sm">
                  {pkg.features.map((f, i) => (
                    <li key={f} className="flex gap-2 text-white/68">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                      <span>{t(f, `Feature ${i + 1}`)}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/register"
                  className={`mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition ${tint.cta}`}
                >
                  {t("pricing.cta", "Beratung anfragen")} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Feature matrix */}
        <section className="mt-24">
          <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
            {t("pricing.matrixTitle", "Funktions-Matrix im Vergleich")}
          </h2>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-white/55">
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-emerald-300" /> {t("pricing.legendIncluded", "im Paket enthalten")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="rounded-md border border-amber-300/30 bg-amber-300/10 px-2 py-0.5 font-bold text-amber-200">฿</span>
              {t("pricing.legendAddon", "à la carte zubuchbar (Preis je Zelle)")}
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-white/45">
            {t(
              "pricing.matrixNote",
              "Kein Service ist gesperrt: Funktionen, die ein Paket nicht enthält, lassen sich jederzeit zum angegebenen Preis zubuchen.",
            )}
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03]">
            <table className="w-full min-w-[760px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-left font-bold text-white/70">{t("pricing.matrixFeature", "Funktion")}</th>
                  {PACKAGES.map((p) => (
                    <th key={p.key} className="p-4 text-center font-bold text-white/80">
                      {t(`pricing.pkg.${p.key}.short`, p.key)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATRIX.map((row, ri) => (
                  <tr key={row.labelKey} className={ri % 2 ? "bg-white/[0.015]" : ""}>
                    <td className="p-4 text-left text-white/65">{t(row.labelKey, row.labelFb)}</td>
                    {row.cells.map((cell, ci) => (
                      <td key={ci} className="p-4 text-center">
                        {cell === "yes" ? (
                          <Check className="mx-auto h-4 w-4 text-emerald-300" />
                        ) : cell === "no" ? (
                          row.addKey ? (
                            <span
                              title={t("pricing.legendAddon", "à la carte zubuchbar (Preis je Zelle)")}
                              className="whitespace-nowrap rounded-md border border-amber-300/25 bg-amber-300/10 px-2 py-1 text-xs font-semibold text-amber-200"
                            >
                              {t(row.addKey, row.addFb ?? "")}
                            </span>
                          ) : (
                            <Minus className="mx-auto h-4 w-4 text-white/20" />
                          )
                        ) : (
                          <span className="text-xs font-semibold text-cyan-200">{t(cell.t, cell.fb)}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Add-ons */}
        <section className="mt-24">
          <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
            {t("pricing.addonsTitle", "Add-on-Module (paketübergreifend)")}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {ADDONS.map((a) => (
              <div key={a.key} className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-bold">{t(`pricing.addon.${a.key}.name`, a.nameFb)}</div>
                  <div className="shrink-0 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-200">
                    {t(`pricing.addon.${a.key}.price`, a.priceFb)}
                  </div>
                </div>
                <div className="mt-2 text-sm text-white/50">
                  {t("pricing.addonFor", "Für")}: {t(`pricing.addon.${a.key}.for`, a.forFb)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GTM / positioning */}
        <section className="mt-24 rounded-2xl border border-emerald-300/20 bg-gradient-to-br from-emerald-300/8 via-white/[0.04] to-cyan-300/8 p-6 md:p-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">
            <Globe2 className="h-4 w-4" /> {t("pricing.gtmEyebrow", "Warum diese Struktur trägt")}
          </div>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            {t("pricing.gtmTitle", "Land-and-Expand entlang der Thai-Wertschöpfung.")}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {GTM_KEYS.map((k) => (
              <div key={k} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                <p className="text-sm leading-6 text-white/65">{t(`pricing.gtm.${k}`, "")}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-24">
          <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">{t("pricing.faqTitle", "Pricing-FAQ")}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {FAQ_KEYS.map((k) => (
              <details key={k} className="group rounded-2xl border border-white/10 bg-white/[0.045] p-5 [&_summary]:cursor-pointer">
                <summary className="flex items-center justify-between font-bold text-white/85 marker:content-['']">
                  {t(`pricing.faq.${k}.q`, k)}
                  <ArrowRight className="h-4 w-4 text-emerald-300 transition group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-6 text-white/55">{t(`pricing.faq.${k}.a`, "")}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="mt-24 rounded-2xl border border-cyan-300/20 bg-white/[0.05] p-8 text-center shadow-[0_0_40px_rgba(34,211,238,0.1)] md:p-12">
          <h2 className="text-3xl font-extrabold md:text-4xl">{t("pricing.ctaTitle", "Passendes Paket finden.")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/58">
            {t(
              "pricing.ctaSubtitle",
              "Kurze Qualifizierung für Farms, Hersteller, Labore und Exporteure mit realem EU-Exportbedarf. Wir empfehlen das passende Paket und den Upgrade-Pfad.",
            )}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-300 px-8 py-4 font-bold text-[#06160f] transition hover:bg-emerald-200"
            >
              {t("pricing.cta", "Beratung anfragen")} <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="https://cannaworld-thailand.com/import"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-4 font-semibold text-white transition hover:border-cyan-300/50 hover:bg-white/10"
            >
              {t("pricing.ctaGateway", "Zum Gateway (Thailand)")} <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-6 text-xs leading-5 text-white/35">
            {t(
              "pricing.disclaimer",
              "Alle Preise in THB, zzgl. anwendbarer Steuern. B2B-Konditionen. Marketplace-Provisionen werden auf den EUR-Deal berechnet und transparent in THB ausgewiesen.",
            )}
          </p>
        </section>
      </main>
    </div>
  );
}
