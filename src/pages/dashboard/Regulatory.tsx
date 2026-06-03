import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight, Building2, ClipboardCheck, FileText, Globe2, RotateCcw, Scale, Stethoscope } from "lucide-react";

type EntityType = "pharmacy" | "wholesale" | "importer" | "manufacturer";
type ImportMode = "direct" | "managed" | "specialty" | null;
type Cadence = "one_off" | "recurring" | "scaling" | null;

interface I18nText {
  key: string;
  de: string;
}

interface PathRecommendation {
  title: I18nText;
  badge: I18nText;
  badgeTint: string;
  description: I18nText;
  required: I18nText[];
  next: I18nText;
  externalUrl?: string;
  externalLabel?: I18nText;
}

const ENTITY_LABELS: Record<EntityType, { label: I18nText; icon: typeof Stethoscope; hint: I18nText }> = {
  pharmacy: {
    label: { key: "regulatory.entityPharmacyLabel", de: "Apotheke" },
    icon: Stethoscope,
    hint: { key: "regulatory.entityPharmacyHint", de: "Betriebserlaubnis nach §1 ApoG + ggf. BtM-Erlaubnis" },
  },
  wholesale: {
    label: { key: "regulatory.entityWholesaleLabel", de: "Pharma-Großhandel" },
    icon: Building2,
    hint: { key: "regulatory.entityWholesaleHint", de: "Großhandelserlaubnis nach §52a AMG + GDP-Compliance" },
  },
  importer: {
    label: { key: "regulatory.entityImporterLabel", de: "Importeur" },
    icon: Globe2,
    hint: { key: "regulatory.entityImporterHint", de: "Herstellungserlaubnis §13 AMG + EU-GMP für Import-QP" },
  },
  manufacturer: {
    label: { key: "regulatory.entityManufacturerLabel", de: "Hersteller" },
    icon: ClipboardCheck,
    hint: { key: "regulatory.entityManufacturerHint", de: "Herstellungserlaubnis §13 AMG + eigene Produktion" },
  },
};

function recommend(entity: EntityType, mode: ImportMode, cadence: Cadence): PathRecommendation {
  if (entity === "pharmacy" && mode === "direct") {
    return {
      title: { key: "regulatory.pathPharmDirectTitle", de: "Direct Import durch Apotheke nach §73 Abs. 3 AMG" },
      badge: { key: "regulatory.pathPharmDirectBadge", de: "Direkter Pfad" },
      badgeTint: "bg-cyan-400/10 text-cyan-200 border-cyan-300/40",
      description: {
        key: "regulatory.pathPharmDirectDescription",
        de: "Apotheke importiert direkt für individuelle Patienten-Bedarfe. Voraussetzung: ärztliches Rezept, keine Bevorratung im großen Stil, BfArM-Importgenehmigung.",
      },
      required: [
        { key: "regulatory.pathPharmDirectReq1", de: "Betriebserlaubnis nach §1 ApoG" },
        { key: "regulatory.pathPharmDirectReq2", de: "BtM-Erlaubnis nach §3 BtMG für Cannabis-Bedarfe" },
        { key: "regulatory.pathPharmDirectReq3", de: "BfArM Importerlaubnis (§72 AMG i.V.m. §73 Abs. 3)" },
        { key: "regulatory.pathPharmDirectReq4", de: "QP-Zertifikat der ausländischen Charge (EU-GMP-äquivalent)" },
        { key: "regulatory.pathPharmDirectReq5", de: "Patientenbezogenes Rezept als Trigger" },
      ],
      next: { key: "regulatory.pathPharmDirectNext", de: "Patienten-Rezept + BfArM-Antrag vorbereiten" },
      externalUrl: "https://cannaworld-europe.com",
      externalLabel: { key: "regulatory.pathPharmDirectExternal", de: "EU-Portal: §73 Pfad-Details" },
    };
  }
  if (entity === "pharmacy" && mode === "managed") {
    return {
      title: { key: "regulatory.pathPharmManagedTitle", de: "Managed Import via CannaWorld Gateway" },
      badge: { key: "regulatory.pathPharmManagedBadge", de: "Managed" },
      badgeTint: "bg-emerald-400/10 text-emerald-200 border-emerald-300/40",
      description: {
        key: "regulatory.pathPharmManagedDescription",
        de: "Cannaworld koordiniert Lieferanten, EU-Import-QP, Zoll und GDP-Logistik. Apotheke erhält geprüfte, release-fähige Ware ohne eigene Import-Infrastruktur.",
      },
      required: [
        { key: "regulatory.pathPharmManagedReq1", de: "Apotheker-Onboarding + Lizenz-Verifikation auf CannaWorld" },
        { key: "regulatory.pathPharmManagedReq2", de: "Bedarfsanforderung mit Indikation und Menge" },
        { key: "regulatory.pathPharmManagedReq3", de: "BtM-Erlaubnis nach §3 BtMG" },
      ],
      next: { key: "regulatory.pathPharmManagedNext", de: "Managed-Import-Anfrage über Gateway starten" },
      externalUrl: "https://cannaworld-thailand.com",
      externalLabel: { key: "regulatory.pathPharmManagedExternal", de: "Gateway: Managed Import" },
    };
  }
  if (entity === "wholesale") {
    return {
      title: { key: "regulatory.pathWholesaleTitle", de: "Großhandel + GDP-Distribution" },
      badge: { key: "regulatory.pathWholesaleBadge", de: "Wholesale GDP" },
      badgeTint: "bg-blue-400/10 text-blue-200 border-blue-300/40",
      description: {
        key: "regulatory.pathWholesaleDescription",
        de: "Großhändler übernimmt Lagerhaltung und GDP-konforme Distribution zwischen QP-Freigabe und Apotheke. Responsible Person (RP) muss benannt sein.",
      },
      required: [
        { key: "regulatory.pathWholesaleReq1", de: "Großhandelserlaubnis §52a AMG" },
        { key: "regulatory.pathWholesaleReq2", de: "GDP-Konformitätsnachweis" },
        { key: "regulatory.pathWholesaleReq3", de: "Benannte Responsible Person (RP)" },
        { key: "regulatory.pathWholesaleReq4", de: "Temperaturüberwachung Lager + Transport" },
        { key: "regulatory.pathWholesaleReq5", de: "BtM-Lagerung gemäß §15 BtMG" },
      ],
      next: { key: "regulatory.pathWholesaleNext", de: "RP-Bestellung dokumentieren + GDP-Audit-Pack erstellen" },
      externalUrl: "https://cannaworld-thailand.com",
      externalLabel: { key: "regulatory.pathWholesaleExternal", de: "Gateway: Wholesale-Onboarding" },
    };
  }
  if (entity === "importer") {
    return {
      title: { key: "regulatory.pathImporterTitle", de: "EU-GMP-Importeur mit eigener QP" },
      badge: { key: "regulatory.pathImporterBadge", de: "Importer + QP" },
      badgeTint: "bg-purple-400/10 text-purple-200 border-purple-300/40",
      description: {
        key: "regulatory.pathImporterDescription",
        de: "Importeur hält eigene Herstellungserlaubnis §13 AMG mit Import-Scope, eigene QP führt EU-Release durch. Geeignet für skalierende Mengen.",
      },
      required: [
        { key: "regulatory.pathImporterReq1", de: "Herstellungserlaubnis §13 AMG mit Import-Scope" },
        { key: "regulatory.pathImporterReq2", de: "Qualified Person mit EU-GMP-Qualifikation" },
        { key: "regulatory.pathImporterReq3", de: "Import-QC-Labor (eigen oder vertraglich)" },
        { key: "regulatory.pathImporterReq4", de: "EU-GMP-konformes QMS" },
        { key: "regulatory.pathImporterReq5", de: "Stabilitäts- und Re-Test-Programm" },
      ],
      next: { key: "regulatory.pathImporterNext", de: "QP-Pack (Annex 16) für nächste Charge vorbereiten" },
      externalUrl: "https://gmp-aicert.com",
      externalLabel: { key: "regulatory.pathImporterExternal", de: "AICert: QP-Release-Engine" },
    };
  }
  if (entity === "manufacturer") {
    return {
      title: { key: "regulatory.pathManufacturerTitle", de: "Hersteller mit eigener Produktion + QP" },
      badge: { key: "regulatory.pathManufacturerBadge", de: "Manufacturer" },
      badgeTint: "bg-amber-400/10 text-amber-200 border-amber-300/40",
      description: {
        key: "regulatory.pathManufacturerDescription",
        de: "Hersteller produziert in DE/EU unter eigener Herstellungserlaubnis. Cannaworld liefert ggf. API-Rohstoff oder qualifiziert Vorlieferanten.",
      },
      required: [
        { key: "regulatory.pathManufacturerReq1", de: "Herstellungserlaubnis §13 AMG mit Produktions-Scope" },
        { key: "regulatory.pathManufacturerReq2", de: "EU-GMP-Audit bestanden" },
        { key: "regulatory.pathManufacturerReq3", de: "Eigene QP + QC-Infrastruktur" },
        { key: "regulatory.pathManufacturerReq4", de: "Supplier-Qualifikation für API/Wirkstoff-Vorlieferanten" },
      ],
      next: { key: "regulatory.pathManufacturerNext", de: "API-Supplier-Qualifikation via CannaWorld Supplier-Programm" },
      externalUrl: "https://gmp-aicert.com",
      externalLabel: { key: "regulatory.pathManufacturerExternal", de: "AICert: Supplier Audit" },
    };
  }
  // Fallback for pharmacy + specialty
  if (entity === "pharmacy" && mode === "specialty") {
    return {
      title: { key: "regulatory.pathPharmSpecialtyTitle", de: "Spezialversorgung über Cannabis-Schwerpunktapotheke" },
      badge: { key: "regulatory.pathPharmSpecialtyBadge", de: "Specialty" },
      badgeTint: "bg-fuchsia-400/10 text-fuchsia-200 border-fuchsia-300/40",
      description: {
        key: "regulatory.pathPharmSpecialtyDescription",
        de: "Schwerpunktapotheke mit kontinuierlichem Cannabis-Patientenstamm und etablierten Importpfaden. Empfohlen bei hohem Volumen oder seltenen Sorten.",
      },
      required: [
        { key: "regulatory.pathPharmSpecialtyReq1", de: "Etablierte Cannabis-Schwerpunktversorgung" },
        { key: "regulatory.pathPharmSpecialtyReq2", de: "BtM-Erlaubnis + Lagerinfrastruktur" },
        { key: "regulatory.pathPharmSpecialtyReq3", de: "Etabliertes Apotheken-Hersteller-Verhältnis" },
        { key: "regulatory.pathPharmSpecialtyReq4", de: "Ggf. Rahmenverträge nach §73a AMG" },
      ],
      next: { key: "regulatory.pathPharmSpecialtyNext", de: "Rahmenvertrag mit Lieferanten + BfArM-Anzeige" },
      externalUrl: "https://cannaworld-europe.com",
      externalLabel: { key: "regulatory.pathPharmSpecialtyExternal", de: "EU-Portal: Spezialversorgung" },
    };
  }
  return {
    title: { key: "regulatory.pathFallbackTitle", de: "Pfad wird ausgewählt" },
    badge: { key: "regulatory.pathFallbackBadge", de: "—" },
    badgeTint: "bg-white/5 text-white/40 border-white/15",
    description: {
      key: "regulatory.pathFallbackDescription",
      de: "Bitte alle Schritte beantworten, um eine Pfad-Empfehlung zu erhalten.",
    },
    required: [],
    next: { key: "regulatory.pathFallbackNext", de: "Wähle einen Pfad oben" },
  };
}

export default function Regulatory() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [entity, setEntity] = useState<EntityType | null>(null);
  const [mode, setMode] = useState<ImportMode>(null);
  const [cadence, setCadence] = useState<Cadence>(null);

  const tx = (text: I18nText) => t(text.key, text.de);

  const reset = () => {
    setStep(1);
    setEntity(null);
    setMode(null);
    setCadence(null);
  };

  const recommendation = entity ? recommend(entity, mode, cadence) : null;

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-cyan-300/12 via-white/[0.045] to-emerald-300/10 p-6 shadow-[0_0_42px_rgba(34,211,238,0.08)] md:p-8">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-300" />
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

      <section className="rounded-2xl border border-white/10 bg-white/[0.045] p-6">
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
                      <div className="font-bold text-white">{tx(meta.label)}</div>
                      <div className="mt-1 text-xs text-white/55">{tx(meta.hint)}</div>
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
                {tx(recommendation.badge)}
              </span>
              <h2 className="mt-3 text-2xl font-black text-white">{tx(recommendation.title)}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-white/60">{tx(recommendation.description)}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">Erforderlich</div>
              <ul className="space-y-2 text-sm text-white/70">
                {recommendation.required.map((r) => (
                  <li key={r.key} className="flex gap-2">
                    <FileText className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" /> {tx(r)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-bold text-[#061016] transition hover:bg-cyan-200"
              >
                {tx(recommendation.next)} <ArrowRight className="h-4 w-4" />
              </button>
              {recommendation.externalUrl && recommendation.externalLabel && (
                <a
                  href={recommendation.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-white"
                >
                  {tx(recommendation.externalLabel)} <ArrowRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
