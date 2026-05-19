import { Link } from "react-router-dom";
import { FileCheck, ArrowRight, ExternalLink, Scale, Stethoscope, Network, ShieldCheck } from "lucide-react";

const PATHS = [
  {
    key: "managed",
    title: "Managed Import",
    badge: "Full-Service",
    tint: "border-emerald-400/25 from-emerald-400/12 to-emerald-300/5 text-emerald-200",
    icon: Network,
    summary:
      "CannaWorld koordiniert Supplier, EU-Import-QP, Zoll und GDP-Logistik. Apotheke erhält geprüfte, release-fähige Ware ohne eigene Import-Infrastruktur.",
    bullets: [
      "Kein eigenes BfArM-Verfahren nötig",
      "Lieferant + QP + Logistik vorqualifiziert",
      "Apotheke startet nach BtM-Erlaubnis sofort",
    ],
    ctaLabel: "Im Gateway starten",
    ctaHref: "https://cannaworld-thailand.com",
    external: true,
  },
  {
    key: "direct",
    title: "Direct Import",
    badge: "§73 Abs. 3 AMG",
    tint: "border-cyan-400/25 from-cyan-400/12 to-cyan-300/5 text-cyan-200",
    icon: Stethoscope,
    summary:
      "Apotheke importiert direkt für individuelle Patienten. BfArM-Importgenehmigung erforderlich. Geeignet bei Sondersorten oder etabliertem Lieferanten-Verhältnis.",
    bullets: [
      "Patientenbezogenes Rezept als Trigger",
      "BfArM-Einzelfall-Importerlaubnis",
      "QP-Zertifikat der ausländischen Charge (EU-GMP-äquivalent)",
    ],
    ctaLabel: "Decision Tree öffnen",
    ctaHref: "/dashboard/regulatory",
    external: false,
  },
  {
    key: "specialty",
    title: "Spezialversorgung",
    badge: "Schwerpunkt-Apotheke",
    tint: "border-fuchsia-400/25 from-fuchsia-400/12 to-fuchsia-300/5 text-fuchsia-200",
    icon: ShieldCheck,
    summary:
      "Cannabis-Schwerpunktapotheke mit kontinuierlichem Patientenstamm und etablierten Importpfaden. Empfohlen bei hohem Volumen oder seltenen Sorten.",
    bullets: [
      "Etabliertes Apotheken-Hersteller-Verhältnis",
      "Rahmenverträge nach §73a AMG möglich",
      "BfArM-Anzeige nach §3 BtMG",
    ],
    ctaLabel: "EU-Portal: Spezialversorgung",
    ctaHref: "https://cannaworld-europe.com",
    external: true,
  },
] as const;

export default function PharmacyImport() {
  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/12 via-white/[0.045] to-emerald-300/10 p-6 shadow-[0_0_42px_rgba(34,211,238,0.08)] md:p-8">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="relative max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
            <FileCheck className="h-4 w-4" /> Apotheken-Workflow
          </div>
          <h1 className="text-3xl font-black tracking-tight md:text-5xl">Apotheken-Import</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">
            Drei Pfade für den deutschen Apothekenmarkt. Wähle die Variante, die zu deinem
            Volumen und deiner Lizenzlage passt. Detailliertes Decision-Tree mit Lizenzcheck und
            Pfad-Empfehlung im Regulatory-Modul.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {PATHS.map((path) => {
          const Icon = path.icon;
          const Body = (
            <div className={`group relative h-full overflow-hidden rounded-3xl border bg-gradient-to-br p-6 transition hover:-translate-y-0.5 ${path.tint}`}>
              <div className="mb-4 flex items-center justify-between">
                <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${path.tint}`}>
                  {path.badge}
                </span>
                <Icon className="h-6 w-6 opacity-60" />
              </div>
              <h3 className="text-xl font-bold text-white">{path.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/60">{path.summary}</p>
              <ul className="mt-4 space-y-1.5 text-xs text-white/55">
                {path.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-cyan-300">•</span> {b}
                  </li>
                ))}
              </ul>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white transition group-hover:gap-3">
                {path.ctaLabel} {path.external ? <ExternalLink className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
              </div>
            </div>
          );
          return path.external ? (
            <a key={path.key} href={path.ctaHref} target="_blank" rel="noopener noreferrer" className="block">
              {Body}
            </a>
          ) : (
            <Link key={path.key} to={path.ctaHref} className="block">
              {Body}
            </Link>
          );
        })}
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.045] p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-2 flex items-center gap-2">
              <Scale className="h-4 w-4 text-cyan-300" />
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/75">Unsicher welcher Pfad?</h3>
            </div>
            <p className="text-sm leading-6 text-white/60">
              Das interaktive Regulatory-Decision-Tree fragt 2–3 Punkte ab (Rolle, Bedarf, Skalierung)
              und gibt eine konkrete Pfad-Empfehlung mit Lizenz-Checkliste aus.
            </p>
          </div>
          <Link
            to="/dashboard/regulatory"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-bold text-[#061016] transition hover:bg-cyan-200"
          >
            Decision Tree starten <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
