import { useState } from "react";
import { ArrowLeft, ArrowRight, Building2, ClipboardCheck, FileText, Globe2, RotateCcw, Scale, Stethoscope } from "lucide-react";

type EntityType = "pharmacy" | "wholesale" | "importer" | "manufacturer";
type ImportMode = "direct" | "managed" | "specialty" | null;
type Cadence = "one_off" | "recurring" | "scaling" | null;

interface PathRecommendation {
  title: string;
  badge: string;
  badgeTint: string;
  description: string;
  required: string[];
  next: string;
  externalUrl?: string;
  externalLabel?: string;
}

const ENTITY_LABELS: Record<EntityType, { label: string; icon: typeof Stethoscope; hint: string }> = {
  pharmacy: { label: "Apotheke", icon: Stethoscope, hint: "Betriebserlaubnis nach §1 ApoG + ggf. BtM-Erlaubnis" },
  wholesale: { label: "Pharma-Großhandel", icon: Building2, hint: "Großhandelserlaubnis nach §52a AMG + GDP-Compliance" },
  importer: { label: "Importeur", icon: Globe2, hint: "Herstellungserlaubnis §13 AMG + EU-GMP für Import-QP" },
  manufacturer: { label: "Hersteller", icon: ClipboardCheck, hint: "Herstellungserlaubnis §13 AMG + eigene Produktion" },
};

function recommend(entity: EntityType, mode: ImportMode, cadence: Cadence): PathRecommendation {
  if (entity === "pharmacy" && mode === "direct") {
    return {
      title: "Direct Import durch Apotheke nach §73 Abs. 3 AMG",
      badge: "Direkter Pfad",
      badgeTint: "bg-cyan-400/10 text-cyan-200 border-cyan-300/40",
      description:
        "Apotheke importiert direkt für individuelle Patienten-Bedarfe. Voraussetzung: ärztliches Rezept, keine Bevorratung im großen Stil, BfArM-Importgenehmigung.",
      required: [
        "Betriebserlaubnis nach §1 ApoG",
        "BtM-Erlaubnis nach §3 BtMG für Cannabis-Bedarfe",
        "BfArM Importerlaubnis (§72 AMG i.V.m. §73 Abs. 3)",
        "QP-Zertifikat der ausländischen Charge (EU-GMP-äquivalent)",
        "Patientenbezogenes Rezept als Trigger",
      ],
      next: "Patienten-Rezept + BfArM-Antrag vorbereiten",
      externalUrl: "https://cannaworld-europe.com",
      externalLabel: "EU-Portal: §73 Pfad-Details",
    };
  }
  if (entity === "pharmacy" && mode === "managed") {
    return {
      title: "Managed Import via CannaWorld Gateway",
      badge: "Managed",
      badgeTint: "bg-emerald-400/10 text-emerald-200 border-emerald-300/40",
      description:
        "Cannaworld koordiniert Lieferanten, EU-Import-QP, Zoll und GDP-Logistik. Apotheke erhält geprüfte, release-fähige Ware ohne eigene Import-Infrastruktur.",
      required: [
        "Apotheker-Onboarding + Lizenz-Verifikation auf CannaWorld",
        "Bedarfsanforderung mit Indikation und Menge",
        "BtM-Erlaubnis nach §3 BtMG",
      ],
      next: "Managed-Import-Anfrage über Gateway starten",
      externalUrl: "https://cannaworld-thailand.com",
      externalLabel: "Gateway: Managed Import",
    };
  }
  if (entity === "wholesale") {
    return {
      title: "Großhandel + GDP-Distribution",
      badge: "Wholesale GDP",
      badgeTint: "bg-blue-400/10 text-blue-200 border-blue-300/40",
      description:
        "Großhändler übernimmt Lagerhaltung und GDP-konforme Distribution zwischen QP-Freigabe und Apotheke. Responsible Person (RP) muss benannt sein.",
      required: [
        "Großhandelserlaubnis §52a AMG",
        "GDP-Konformitätsnachweis",
        "Benannte Responsible Person (RP)",
        "Temperaturüberwachung Lager + Transport",
        "BtM-Lagerung gemäß §15 BtMG",
      ],
      next: "RP-Bestellung dokumentieren + GDP-Audit-Pack erstellen",
      externalUrl: "https://cannaworld-thailand.com",
      externalLabel: "Gateway: Wholesale-Onboarding",
    };
  }
  if (entity === "importer") {
    return {
      title: "EU-GMP-Importeur mit eigener QP",
      badge: "Importer + QP",
      badgeTint: "bg-purple-400/10 text-purple-200 border-purple-300/40",
      description:
        "Importeur hält eigene Herstellungserlaubnis §13 AMG mit Import-Scope, eigene QP führt EU-Release durch. Geeignet für skalierende Mengen.",
      required: [
        "Herstellungserlaubnis §13 AMG mit Import-Scope",
        "Qualified Person mit EU-GMP-Qualifikation",
        "Import-QC-Labor (eigen oder vertraglich)",
        "EU-GMP-konformes QMS",
        "Stabilitäts- und Re-Test-Programm",
      ],
      next: "QP-Pack (Annex 16) für nächste Charge vorbereiten",
      externalUrl: "https://gmp-aicert.com",
      externalLabel: "AICert: QP-Release-Engine",
    };
  }
  if (entity === "manufacturer") {
    return {
      title: "Hersteller mit eigener Produktion + QP",
      badge: "Manufacturer",
      badgeTint: "bg-amber-400/10 text-amber-200 border-amber-300/40",
      description:
        "Hersteller produziert in DE/EU unter eigener Herstellungserlaubnis. Cannaworld liefert ggf. API-Rohstoff oder qualifiziert Vorlieferanten.",
      required: [
        "Herstellungserlaubnis §13 AMG mit Produktions-Scope",
        "EU-GMP-Audit bestanden",
        "Eigene QP + QC-Infrastruktur",
        "Supplier-Qualifikation für API/Wirkstoff-Vorlieferanten",
      ],
      next: "API-Supplier-Qualifikation via CannaWorld Supplier-Programm",
      externalUrl: "https://gmp-aicert.com",
      externalLabel: "AICert: Supplier Audit",
    };
  }
  // Fallback for pharmacy + specialty
  if (entity === "pharmacy" && mode === "specialty") {
    return {
      title: "Spezialversorgung über Cannabis-Schwerpunktapotheke",
      badge: "Specialty",
      badgeTint: "bg-fuchsia-400/10 text-fuchsia-200 border-fuchsia-300/40",
      description:
        "Schwerpunktapotheke mit kontinuierlichem Cannabis-Patientenstamm und etablierten Importpfaden. Empfohlen bei hohem Volumen oder seltenen Sorten.",
      required: [
        "Etablierte Cannabis-Schwerpunktversorgung",
        "BtM-Erlaubnis + Lagerinfrastruktur",
        "Etabliertes Apotheken-Hersteller-Verhältnis",
        "Ggf. Rahmenverträge nach §73a AMG",
      ],
      next: "Rahmenvertrag mit Lieferanten + BfArM-Anzeige",
      externalUrl: "https://cannaworld-europe.com",
      externalLabel: "EU-Portal: Spezialversorgung",
    };
  }
  return {
    title: "Pfad wird ausgewählt",
    badge: "—",
    badgeTint: "bg-white/5 text-white/40 border-white/15",
    description: "Bitte alle Schritte beantworten, um eine Pfad-Empfehlung zu erhalten.",
    required: [],
    next: "Wähle einen Pfad oben",
  };
}

export default function Regulatory() {
  const [step, setStep] = useState(1);
  const [entity, setEntity] = useState<EntityType | null>(null);
  const [mode, setMode] = useState<ImportMode>(null);
  const [cadence, setCadence] = useState<Cadence>(null);

  const reset = () => {
    setStep(1);
    setEntity(null);
    setMode(null);
    setCadence(null);
  };

  const recommendation = entity ? recommend(entity, mode, cadence) : null;

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/12 via-white/[0.045] to-emerald-300/10 p-6 shadow-[0_0_42px_rgba(34,211,238,0.08)] md:p-8">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="relative max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
            <Scale className="h-4 w-4" /> Regulatory Pfad-Wahl
          </div>
          <h1 className="text-3xl font-black tracking-tight md:text-5xl">BfArM · Direct · Managed</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">
            Interaktiver Entscheidungspfad für deutsche Cannabis-Import-Rollen. Output ist eine
            Pfad-Empfehlung mit erforderlichen Lizenzen und nächstem Schritt. Diese Seite ersetzt
            keine Rechtsberatung — sie beschleunigt Vorbereitung und Triage.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.045] p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/55">Schritt {step} von 3</div>
          {(entity || mode || cadence) && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/55 hover:text-cyan-200"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Neu starten
            </button>
          )}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Welche Rolle übernimmt deine Organisation?</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {(Object.keys(ENTITY_LABELS) as EntityType[]).map((key) => {
                const meta = ENTITY_LABELS[key];
                const Icon = meta.icon;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setEntity(key);
                      setStep(2);
                    }}
                    className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-black/20 p-5 text-left transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
                  >
                    <Icon className="mt-1 h-6 w-6 shrink-0 text-cyan-300" />
                    <div className="flex-1">
                      <div className="font-bold text-white">{meta.label}</div>
                      <div className="mt-1 text-xs text-white/55">{meta.hint}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-white/30 transition group-hover:text-cyan-300" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && entity === "pharmacy" && (
          <div className="space-y-4">
            <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/55 hover:text-white">
              <ArrowLeft className="h-3.5 w-3.5" /> Zurück
            </button>
            <h2 className="text-xl font-bold text-white">Wie soll der Import abgewickelt werden?</h2>
            <div className="grid gap-3 md:grid-cols-3">
              {([
                { key: "direct", label: "Direct Import", hint: "Apotheke importiert selbst nach §73 Abs. 3 AMG" },
                { key: "managed", label: "Managed Import", hint: "CannaWorld koordiniert Supplier + Logistik + EU-Release" },
                { key: "specialty", label: "Spezialversorgung", hint: "Schwerpunktapotheke mit hohem Volumen / Sondersorten" },
              ] as { key: ImportMode; label: string; hint: string }[]).map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => {
                    setMode(opt.key);
                    setStep(3);
                  }}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4 text-left transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
                >
                  <div className="font-bold text-white">{opt.label}</div>
                  <div className="mt-1 text-xs text-white/55">{opt.hint}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && entity !== "pharmacy" && (
          <div className="space-y-4">
            <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/55 hover:text-white">
              <ArrowLeft className="h-3.5 w-3.5" /> Zurück
            </button>
            <h2 className="text-xl font-bold text-white">Mit welcher Häufigkeit / Skalierung?</h2>
            <div className="grid gap-3 md:grid-cols-3">
              {([
                { key: "one_off", label: "Einzelimport", hint: "Patientenbezogen / proof-of-concept" },
                { key: "recurring", label: "Wiederkehrend", hint: "Monatliche Lieferungen, stabiler Bedarf" },
                { key: "scaling", label: "Skalierend", hint: "Wachsender Bedarf, mehrere Lieferanten" },
              ] as { key: Cadence; label: string; hint: string }[]).map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => {
                    setCadence(opt.key);
                    setStep(3);
                  }}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4 text-left transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
                >
                  <div className="font-bold text-white">{opt.label}</div>
                  <div className="mt-1 text-xs text-white/55">{opt.hint}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && recommendation && (
          <div className="space-y-5">
            <button type="button" onClick={() => setStep(2)} className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/55 hover:text-white">
              <ArrowLeft className="h-3.5 w-3.5" /> Zurück
            </button>
            <div>
              <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold ${recommendation.badgeTint}`}>
                {recommendation.badge}
              </span>
              <h2 className="mt-3 text-2xl font-black text-white">{recommendation.title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-white/60">{recommendation.description}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">Erforderlich</div>
              <ul className="space-y-2 text-sm text-white/70">
                {recommendation.required.map((r) => (
                  <li key={r} className="flex gap-2">
                    <FileText className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" /> {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-bold text-[#061016] transition hover:bg-cyan-200"
              >
                {recommendation.next} <ArrowRight className="h-4 w-4" />
              </button>
              {recommendation.externalUrl && (
                <a
                  href={recommendation.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-white"
                >
                  {recommendation.externalLabel} <ArrowRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
