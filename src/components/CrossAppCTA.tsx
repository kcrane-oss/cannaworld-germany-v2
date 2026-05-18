import { ArrowUpRight, Building2, Globe, Network, Shield, ShoppingBag } from "lucide-react";

// Maps each Germany dashboard module key to the canonical CannaWorld operations
// app that actually executes the workflow. Germany is the DE frontdoor — most
// operational data lives in Gateway / Marketplace / AICert / Europe.
const TARGETS: Record<
  string,
  { app: string; label: string; url: string; icon: typeof Globe; tint: string; rationale: string }
> = {
  marketplace: {
    app: "Marketplace",
    label: "Verifizierte Batches im Marketplace ansehen",
    url: "https://cannaworld-marketplace.com",
    icon: ShoppingBag,
    tint: "blue",
    rationale: "Listings, Auctions, Sample Requests und Buyer/Seller-Flow laufen im CannaWorld Marketplace.",
  },
  batches: {
    app: "Marketplace",
    label: "Batch-Pool im Marketplace öffnen",
    url: "https://cannaworld-marketplace.com",
    icon: ShoppingBag,
    tint: "blue",
    rationale: "Batch-Master, CoA-Anhänge und Release-State sind im Marketplace gemastert.",
  },
  "audit-passport": {
    app: "AICert",
    label: "Audit Passport in GMP-AICert öffnen",
    url: "https://gmp-aicert.com",
    icon: Shield,
    tint: "purple",
    rationale: "Facility-/Batch-/Document-Proof und ShinrAi-Score werden im GMP-AICert AI-Audit-Stack erzeugt.",
  },
  compliance: {
    app: "AICert",
    label: "EU-GMP/GDP/GACP Gap-Analyse in AICert starten",
    url: "https://gmp-aicert.com",
    icon: Shield,
    tint: "purple",
    rationale: "Compliance-Matrix und CAPA laufen über die AICert Audit-Engine.",
  },
  suppliers: {
    app: "Gateway",
    label: "Supplier-Stammdaten im Gateway öffnen",
    url: "https://cannaworld-thailand.com",
    icon: Globe,
    tint: "emerald",
    rationale: "Supplier-Profile, Lizenzen und Audit-Historie werden im Gateway gepflegt.",
  },
  "trade-cases": {
    app: "Gateway",
    label: "Trade-Case im Gateway Deal-Desk öffnen",
    url: "https://cannaworld-thailand.com",
    icon: Globe,
    tint: "emerald",
    rationale: "Trade-Case-Workflows (Intake → QA/QP → Commercial Terms) sind im Gateway gemastert.",
  },
  regulatory: {
    app: "Europe",
    label: "EU-Portal für Regulatory öffnen",
    url: "https://cannaworld-europe.com",
    icon: Network,
    tint: "emerald",
    rationale: "EU-weite Importpfade, BfArM-Annexpfade und QP-Netzwerk laufen über das Europe-Portal.",
  },
  analytics: {
    app: "AICert",
    label: "AI-Analytics in AICert ansehen",
    url: "https://gmp-aicert.com",
    icon: Shield,
    tint: "purple",
    rationale: "Pipeline-, Compliance- und Supplier-Metriken werden im AICert-Analytics-Layer aggregiert.",
  },
  "pharmacy-import": {
    app: "Gateway",
    label: "Managed Import im Gateway starten",
    url: "https://cannaworld-thailand.com",
    icon: Globe,
    tint: "emerald",
    rationale: "Managed Import (Full-Service) wird über das Gateway-Operations-Backend abgewickelt.",
  },
};

const TINT_CLASSES: Record<string, { ring: string; bg: string; text: string; hoverBorder: string; iconBg: string }> = {
  blue: {
    ring: "border-blue-400/25",
    bg: "from-blue-300/10 via-white/[0.045] to-blue-400/5",
    text: "text-blue-200",
    hoverBorder: "hover:border-blue-300/55",
    iconBg: "bg-blue-400/15 text-blue-300 ring-blue-300/25",
  },
  purple: {
    ring: "border-purple-400/25",
    bg: "from-purple-300/10 via-white/[0.045] to-purple-400/5",
    text: "text-purple-200",
    hoverBorder: "hover:border-purple-300/55",
    iconBg: "bg-purple-400/15 text-purple-300 ring-purple-300/25",
  },
  emerald: {
    ring: "border-emerald-400/25",
    bg: "from-emerald-300/10 via-white/[0.045] to-emerald-400/5",
    text: "text-emerald-200",
    hoverBorder: "hover:border-emerald-300/55",
    iconBg: "bg-emerald-400/15 text-emerald-300 ring-emerald-300/25",
  },
};

interface CrossAppCTAProps {
  moduleKey: string;
}

const CrossAppCTA = ({ moduleKey }: CrossAppCTAProps) => {
  const target = TARGETS[moduleKey];
  if (!target) return null;
  const tint = TINT_CLASSES[target.tint] ?? TINT_CLASSES.emerald;
  const Icon = target.icon;

  return (
    <section
      className={`relative overflow-hidden rounded-3xl border bg-gradient-to-br p-6 shadow-[0_0_28px_rgba(34,211,238,0.05)] backdrop-blur ${tint.ring} ${tint.bg} ${tint.hoverBorder} transition`}
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 ${tint.iconBg}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <div className={`text-xs font-bold uppercase tracking-[0.22em] ${tint.text}`}>
              CannaWorld {target.app} · operatives Master-System
            </div>
            <h3 className="text-lg font-bold text-white">{target.label}</h3>
            <p className="text-sm leading-6 text-white/55 max-w-2xl">{target.rationale}</p>
          </div>
        </div>
        <a
          href={target.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex shrink-0 items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15 ${tint.hoverBorder}`}
        >
          In {target.app} öffnen <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
};

export default CrossAppCTA;
