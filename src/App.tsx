import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileCheck,
  Fingerprint,
  FolderOpen,
  Globe2,
  LayoutDashboard,
  Mail,
  Menu,
  Network,
  Package,
  PackageCheck,
  Scale,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Truck,
  User,
  Warehouse,
  X,
} from "lucide-react";

const logo = "/cannaworld-logo-new.webp";

type SupabaseClient = typeof import("./integrations/supabase/client")["supabase"];

async function loadSupabase(): Promise<SupabaseClient> {
  const module = await import("./integrations/supabase/client");
  return module.supabase;
} 

const networkLinks = [
  ["Gateway", "https://cannaworld-thailand.com"],
  ["Europe", "https://cannaworld-europe.com"],
  ["Marketplace", "https://cannaworld-marketplace.com"],
  ["AICert", "https://gmp-aicert.com"],
] as const;

const stats = [
  ["DE", "B2B Intake"],
  ["EU-GMP", "Dokumentenpfad"],
  ["GDP", "Lieferkette"],
  ["GACP", "Cultivation Proof"],
  ["ShinrAi", "Trust Layer"],
  ["AICert", "Pre-Audit"],
];

const groups = [
  "Apotheken (Direct Import vs. Managed Import)",
  "Pharma-Großhändler und GDP-Strukturen",
  "Cannabis-Importeure und Herstellbetriebe",
  "Einkauf, QA/QP, Regulatory Affairs und Geschäftsführung",
];

const cards = [
  {
    icon: Building2,
    title: "Deutscher Intake",
    text: "Rolle, Lizenzstatus, Bedarf und regulatorischer Pfad werden strukturiert vorqualifiziert.",
  },
  {
    icon: FileCheck,
    title: "Dokumente zuerst",
    text: "CoA, Batch Records, EU-GMP/GDP/GACP-Nachweise und Release-Pfad vor kommerzieller Diskussion.",
  },
  {
    icon: ShieldCheck,
    title: "Proof of Trust",
    text: "AICert, ShinrAi und Auditdaten bilden die prüfbare Vertrauensebene zwischen Supply und deutschem Markt.",
  },
];

const steps = [
  [Mail, "Import-Anfrage", "Bedarf, Rolle, Zielmenge, Zeithorizont und Ausgangslage erfassen."],
  [ClipboardCheck, "Qualifizierung", "Prüfen, ob Apotheke, Großhandel, Importeur oder Herstellbetrieb in den Prozess fällt."],
  [ShieldCheck, "Dokumentenprüfung", "EU-GMP/GDP/GACP, CoA, Batch-Dokumentation, QP-/Release-Pfad einordnen."],
  [PackageCheck, "Supply Matching", "Geeignete geprüfte Lieferpartner und Chargen über das CannaWorld-Ökosystem vorbereiten."],
] as const;

const dashboardNav = [
  { key: "overview", label: "Overview", icon: LayoutDashboard, path: "/dashboard" },
  { key: "marketplace", label: "Marketplace", icon: ShoppingBag, path: "/dashboard/marketplace" },
  { key: "pharmacy-import", label: "Apotheken-Import", icon: FileCheck, path: "/dashboard/pharmacy-import" },
  { key: "trade-cases", label: "Trade Cases", icon: FileCheck, path: "/dashboard/trade-cases" },
  { key: "batches", label: "Batches", icon: Package, path: "/dashboard/batches" },
  { key: "qp-release", label: "QP Release", icon: ClipboardCheck, path: "/dashboard/qp-release" },
  { key: "compliance", label: "Compliance", icon: Shield, path: "/dashboard/compliance" },
  { key: "logistics", label: "Logistics", icon: Truck, path: "/dashboard/logistics" },
  { key: "suppliers", label: "Suppliers", icon: Building2, path: "/dashboard/suppliers" },
  { key: "documents", label: "Documents", icon: FolderOpen, path: "/dashboard/documents" },
  { key: "regulatory", label: "Regulatory", icon: Scale, path: "/dashboard/regulatory" },
  { key: "warehouse", label: "Warehouse", icon: Warehouse, path: "/dashboard/warehouse" },
  { key: "audit-passport", label: "Audit Passport", icon: Fingerprint, path: "/dashboard/audit-passport" },
  { key: "services", label: "Gateway Services", icon: Sparkles, path: "/dashboard/services" },
  { key: "analytics", label: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
];

const moduleData: Record<string, { title: string; eyebrow: string; description: string; stats: string[]; actions: string[] }> = {
  overview: {
    eyebrow: "Germany Command Center",
    title: "Importer Dashboard",
    description: "Kontrollraum für deutsche Importqualifizierung: Nachfrage, Supply, Dokumente, Auditstatus und regulatorischer Fortschritt in einer Oberfläche.",
    stats: ["12 aktive Trade Cases", "7 Chargen in Prüfung", "94% Dokumentenabdeckung", "3 QP-Reviews offen"],
    actions: ["Neue Import-Anfrage anlegen", "Dokumente prüfen", "Compliance-Gap starten"],
  },
  marketplace: {
    eyebrow: "Qualified Supply",
    title: "Marketplace",
    description: "Vorgeprüfte internationale Batches, Supplier-Profile und Dokumentenstände für deutsche B2B-Abnehmer.",
    stats: ["EU-ready Batch Pool", "CoA / Batch Records", "Supplier Trust Score", "Sample Request Flow"],
    actions: ["Batch anfragen", "Supplier vergleichen", "Sample Request vorbereiten"],
  },
  "pharmacy-import": {
    eyebrow: "Apotheken-Workflow",
    title: "Apotheken-Import",
    description: "Zwei Pfade für den deutschen Markt: 'Managed Import' (Full-Service über das CannaWorld-Ökosystem) oder 'Direct Import' (Apotheke importiert selbst + QP Freigabe).",
    stats: ["Managed Import Route", "Direct Import (Bester Deal)", "QP Release Integration", "GDP-konforme Lieferung"],
    actions: ["Managed Import starten", "Direct Import Kalkulation", "QP-Freigabe anfragen"],
  },
  "trade-cases": {
    eyebrow: "Deal Desk",
    title: "Trade Cases",
    description: "Jeder Importvorgang als strukturierter Case mit Rollen, Mengen, Dokumenten, Release-Pfad und Statushistorie.",
    stats: ["Importer Intake", "QA/QP Status", "Commercial Terms", "Decision Log"],
    actions: ["Case öffnen", "Milestone setzen", "Stakeholder einladen"],
  },
  batches: {
    eyebrow: "Batch Intelligence",
    title: "Batches",
    description: "Chargenübersicht für Potenz, CoA, Stabilität, Verpackung, Herkunft und Release-Fähigkeit.",
    stats: ["CoA vorhanden", "EU Pharmacopeia Check", "Stability Window", "Batch Traceability"],
    actions: ["Batch prüfen", "CoA importieren", "Release Risiko bewerten"],
  },
  "qp-release": {
    eyebrow: "Release Control",
    title: "QP Release",
    description: "QP-nahe Freigabelogik mit Dokumentenpaket, Abweichungen, Verantwortlichkeiten und finalem Release-Readiness Signal.",
    stats: ["QP Checklist", "Deviation Flags", "Release Evidence", "Final Sign-off"],
    actions: ["QP Pack erstellen", "Abweichung markieren", "Freigabe vorbereiten"],
  },
  compliance: {
    eyebrow: "AICert / ShinrAi",
    title: "Compliance Dashboard",
    description: "EU-GMP/GDP/GACP-Abdeckung als prüfbare Matrix. Ideal für schnelle Gap-Analyse vor Importgesprächen.",
    stats: ["GACP Proof", "GDP Chain", "EU-GMP Evidence", "CAPA Status"],
    actions: ["Pre-Audit starten", "Gap Report exportieren", "CAPA prüfen"],
  },
  logistics: {
    eyebrow: "Thailand → Germany",
    title: "Logistics",
    description: "Transportkette, GDP-Anforderungen, Export-/Importdokumente, Temperaturführung und Zollpunkte in einem Flow.",
    stats: ["GDP Lane", "Temp Control", "Export Docs", "Customs Pack"],
    actions: ["Lane planen", "Dokumente bündeln", "ETA aktualisieren"],
  },
  suppliers: {
    eyebrow: "Verified Network",
    title: "Suppliers",
    description: "Supplier-Profile mit Lizenzstatus, Auditdaten, Cultivation Proof, Batch-Historie und Trust Layer.",
    stats: ["Supplier Score", "Audit Passport", "License Evidence", "Batch History"],
    actions: ["Supplier prüfen", "Auditdaten öffnen", "Shortlist bauen"],
  },
  documents: {
    eyebrow: "Document Vault",
    title: "Documents",
    description: "Zentrale Ablage für CoA, Batch Records, SOPs, Lizenznachweise, Importdokumente und QP-Pakete.",
    stats: ["CoA", "Batch Records", "Licenses", "SOP Evidence"],
    actions: ["Upload starten", "Dokument klassifizieren", "Pack exportieren"],
  },
  regulatory: {
    eyebrow: "German / EU Rules",
    title: "Regulatory",
    description: "Regulatorische Checkpoints für Deutschland und EU: Rollen, Verantwortlichkeiten, Nachweise und Entscheidungspunkte.",
    stats: ["BfArM Path", "AMG/Betäubungsmittel", "GDP Scope", "Import License Fit"],
    actions: ["Pfad prüfen", "Regulatory Memo erstellen", "Risiko markieren"],
  },
  warehouse: {
    eyebrow: "Inventory Control",
    title: "Warehouse",
    description: "Bestands-, Quarantäne- und Release-Status für medizinische Cannabis-Chargen in der Lieferkette.",
    stats: ["Quarantine", "Released", "Reserved", "Rejected"],
    actions: ["Bestand ansehen", "Charge reservieren", "Status ändern"],
  },
  "audit-passport": {
    eyebrow: "Proof Layer",
    title: "Audit Passport",
    description: "Prüfbarer Vertrauenspass für Supplier, Facility, Batch und Dokumentenstand — anschlussfähig an AICert/ShinrAi.",
    stats: ["Facility Proof", "Batch Proof", "Document Proof", "Decision Trail"],
    actions: ["Passport öffnen", "Nachweise prüfen", "PDF vorbereiten"],
  },
  analytics: {
    eyebrow: "Performance Intelligence",
    title: "Analytics",
    description: "Pipeline-, Compliance-, Dokumenten- und Supplier-Metriken für schnelle Management-Entscheidungen.",
    stats: ["Pipeline Value", "Case Velocity", "Gap Density", "Supplier Quality"],
    actions: ["Report ansehen", "Filter setzen", "Management Snapshot"],
  },
  services: {
    eyebrow: "Gateway Service Transfer",
    title: "Gateway Services for Germany",
    description: "Gateway-Angebote für die deutsche B2B-Rolle übersetzt: Intake, Qualifizierung, Dokumentenprüfung, Trade Matching und Trust Layer — ohne eigenes Germany-Backend.",
    stats: ["24 Service-Bausteine", "4 Service-Layer", "DE Intake", "Gateway Handoff"],
    actions: ["Service auswählen", "Import-Fit prüfen", "Gateway-Handoff vorbereiten"],
  },
  settings: {
    eyebrow: "Workspace",
    title: "Settings",
    description: "Organisation, Rollen, Benachrichtigungen und Integrationen für den deutschen CannaWorld-Arbeitsbereich.",
    stats: ["Roles", "Notifications", "Integrations", "Language"],
    actions: ["Rolle ändern", "Benachrichtigung setzen", "Integration prüfen"],
  },
  profile: {
    eyebrow: "Account",
    title: "Profile",
    description: "Kontakt-, Rollen- und Organisationsdaten für die deutsche B2B-Qualifizierung.",
    stats: ["Company", "Role", "License Status", "Contact"],
    actions: ["Profil aktualisieren", "Rolle bestätigen", "Lizenzstatus ergänzen"],
  },
};


const serviceGroups = [
  {
    title: "Digital Platform",
    subtitle: "Germany als Intake- und Prüfoberfläche auf dem gemeinsamen Gateway/Supabase Backend.",
    items: [
      [Shield, "Compliance Gateway", "BfArM/GDP/GMP-Fit vor kommerzieller Weiterleitung prüfen."],
      [Globe2, "Regulatory Gateway", "Deutsche Rollen, Lizenzstatus und Importfähigkeit strukturiert einordnen."],
      [Package, "Batch Tracking", "Nur dokumentierte, release-nahe Chargen in die deutsche Pipeline lassen."],
      [Database, "Document Intelligence", "CoA, Batch Records, SOPs und Lizenzen zu buyer-ready Packs bündeln."],
      [Sparkles, "ShinrAi Risk Scoring", "Supplier-, Facility-, Batch- und Dokumentenrisiken früh markieren."],
      [FileCheck, "AI Video Audit", "Remote-Facility-Proof als Vorfilter für deutsche Abnehmer."],
    ],
  },
  {
    title: "Compliance & Advisory",
    subtitle: "Service-Schicht für Vertrauen, nicht nur Software-Demo.",
    items: [
      [ClipboardCheck, "Pre-Audit Gap Analysis", "Schnelle Lückenanalyse bevor Zeit in ungeeignete Supplier fließt."],
      [ShieldCheck, "QMS / SOP Readiness", "Qualitätssystem und SOP-Reife für deutsche Käufer erklärbar machen."],
      [BadgeCheck, "Certification Roadmap", "GACP/EU-GMP-nahe Nachweise in einen belastbaren Plan übersetzen."],
      [Scale, "Regulatory Positioning", "B2B-konforme Claims, Rollen und Marktpfad sauber halten."],
      [FolderOpen, "Due Diligence Packs", "Supplier-, Facility- und Batch-Dossiers für Entscheider erstellen."],
      [Fingerprint, "Audit Trail", "ALCOA+, Evidence Chain und Trust Passport als Prüfschicht."],
    ],
  },
  {
    title: "Trade & Logistics",
    subtitle: "Von qualifizierter Nachfrage zu qualifizierter Supply.",
    items: [
      [Building2, "Supplier Qualification", "Nur vorgeprüfte Farmen, Hersteller und Partner in den DE-Funnel."],
      [Stethoscope, "Lab / CoA Review", "Potenz, Kontamination, Methodik und Plausibilität verständlich prüfen."],
      [Truck, "GDP Logistics", "Transport-, Zoll- und Cold-Chain-Readiness für Deutschland abbilden."],
      [ClipboardCheck, "QP Release Support", "Realistisch einschätzen, ob ein Batch QP-fähig ist."],
      [Network, "Commercial Matching", "Deutsche Nachfrage mit compliance-gefilterter Supply verbinden."],
      [Database, "Cross-Platform Sync", "Germany als Frontdoor; Backend läuft über das gemeinsame Gateway/Supabase-Ökosystem."],
    ],
  },
  {
    title: "Trust & Intelligence",
    subtitle: "Proof statt Marketing-Versprechen.",
    items: [
      [Fingerprint, "Audit Passport", "Prüfbarer Supplier-/Batch-/Facility-Pass für erste Käuferprüfung."],
      [User, "Identity / KYC", "Seriöse lizenzierte Teilnehmer von Rauschen trennen."],
      [FileCheck, "Remote Inspector Toolkit", "Video, Evidenz, Checklisten und Report als Remote-Prüfung."],
      [BarChart3, "Analytics", "Pipeline, Gap Density und Supplier-Readiness sichtbar machen."],
      [Warehouse, "Warehouse / Inventory", "Quarantäne, Reservierung, Release und Statuslogik abbilden."],
      [LayoutDashboard, "Facility Planner", "Plausibilität von Facility-Zonen und Audit-Readiness darstellen."],
    ],
  },
] as const;

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold text-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.12)]">{children}</span>;
}

function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#070b10] text-[#f4f8fb] selection:bg-cyan-400/25">
      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_75%_10%,rgba(34,197,94,0.14),transparent_28%),linear-gradient(180deg,#070b10,#091018_48%,#070b10)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      </div>

      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#070b10]/78 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="CannaWorld" className="h-12 w-auto object-contain" />
          </Link>
          <div className="hidden items-center gap-5 text-sm font-medium text-white/60 md:flex">
            <a href="#proof" className="transition hover:text-white">Proof</a>
            <a href="#dashboard-preview" className="transition hover:text-white">Dashboard</a>
            <a href="#prozess" className="transition hover:text-white">Prozess</a>
            <div className="h-5 w-px bg-white/10" />
            {networkLinks.map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-xs transition hover:text-cyan-200">{label}</a>
            ))}
          </div>
          <Link to="/login" className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2.5 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300/70 hover:bg-cyan-400/20">
            Partner Login
          </Link>
        </div>
      </nav>

      <main id="top" className="relative">
        <section className="relative mx-auto grid min-h-[92vh] max-w-7xl items-center gap-14 px-5 pb-20 pt-32 md:px-8 lg:grid-cols-[1.04fr_0.96fr]">
          <div className="space-y-8 text-center lg:text-left">
            <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
              <Badge>CannaWorld Germany</Badge>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold text-emerald-300">B2B · Medizinisch · Reguliert</span>
            </div>

            <div className="space-y-5">
              <h1 className="text-4xl font-extrabold leading-[0.95] tracking-[-0.045em] md:text-6xl xl:text-7xl">
                Deutscher Ansprechpartner für
                <span className="block bg-gradient-to-r from-cyan-300 via-sky-300 to-emerald-300 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(34,211,238,0.28)]">
                  medizinischen Cannabis-Import.
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg leading-8 text-white/62 md:text-xl lg:mx-0">
                Für Apotheken, Großhandel, Importeure und Herstellbetriebe, die geprüfte internationale Supply, belastbare Dokumentation und einen klaren EU-GMP/GDP/GACP-Pfad benötigen.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Link to="/login" className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-300 px-8 py-4 font-bold text-[#061016] shadow-[0_0_34px_rgba(34,211,238,0.25)] transition hover:-translate-y-0.5 hover:bg-cyan-200">
                Partnerzugang öffnen <ArrowRight className="h-5 w-5" />
              </Link>
              <a href="mailto:info@cannaworld-germany.de?subject=CannaWorld Germany Import-Anfrage" className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-8 py-4 font-semibold text-white transition hover:border-cyan-300/50 hover:bg-white/10">
                Import-Anfrage stellen
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
              {[[ShieldCheck, "EU-GMP/GDP Dokumentenpfad"], [Truck, "Import- & Lieferketten-Koordination"], [Globe2, "Thailand → Deutschland/EU"]].map(([Icon, label]) => (
                <div key={String(label)} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/65">
                  <Icon className="h-3.5 w-3.5 text-cyan-300" /> {String(label)}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-[2rem] bg-cyan-400/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-cyan-300/20 bg-white/[0.055] p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl md:p-8">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-300" />
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-300 ring-1 ring-cyan-300/25">
                  <Stethoscope className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Proof-of-Trust Intake</p>
                  <h2 className="text-2xl font-bold">Für regulierte Marktteilnehmer</h2>
                </div>
              </div>
              <div className="space-y-3">
                {groups.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                    <p className="text-sm leading-6 text-white/68">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100/85">
                Keine Abgabe an Endkunden. Keine Sortenwerbung. Keine Therapie- oder Heilversprechen. Reiner B2B-/Compliance-/Import-Intake.
              </div>
            </div>
          </div>
        </section>

        <section className="relative border-y border-white/10 bg-white/[0.035] py-10">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 text-center md:grid-cols-3 lg:grid-cols-6">
            {stats.map(([value, label]) => (
              <div key={label}>
                <div className="text-2xl font-bold text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.24)] md:text-3xl">{value}</div>
                <div className="mt-1 text-sm text-white/45">{label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="proof" className="relative mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <Badge>Warum .de?</Badge>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-5xl">Vertrauensanker für deutsche Apotheken und Importeure.</h2>
            <p className="mt-4 text-white/58">CannaWorld Germany ist die deutsche Eintrittsstelle: klare Ansprechpartner, regulatorische Sprache und saubere Weiterleitung in AICert, Marketplace oder Europe.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {cards.map((card) => (
              <div key={card.title} className="rounded-3xl border border-white/10 bg-white/[0.045] p-7 shadow-[0_0_30px_rgba(34,211,238,0.06)] backdrop-blur transition hover:border-cyan-300/30">
                <card.icon className="mb-5 h-9 w-9 text-cyan-300" />
                <h3 className="text-xl font-bold">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/56">{card.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="dashboard-preview" className="relative border-y border-white/10 bg-white/[0.03] py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <Badge>Protected Partner Cockpit</Badge>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-5xl">Geschützter B2B-Bereich für deutsche Importfähigkeit.</h2>
              <p className="mt-4 text-white/58">Die öffentliche Seite qualifiziert Interesse. Das Dashboard bleibt hinter Login: Marketplace, Trade Cases, Batches, QP Release, Compliance, Logistics, Suppliers, Documents, Regulatory, Warehouse, Audit Passport und Analytics für freigeschaltete Partner.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {dashboardNav.slice(1).map((item) => (
                <Link key={item.key} to={item.path} className="group rounded-3xl border border-white/10 bg-[#0b121b]/80 p-5 backdrop-blur transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-cyan-300/10">
                  <item.icon className="mb-4 h-7 w-7 text-cyan-300" />
                  <div className="font-bold">{item.label}</div>
                  <div className="mt-2 text-sm leading-6 text-white/48">Zum Germany-Modul öffnen</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <GatewayServicesPreview />

        <section id="prozess" className="relative mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <Badge>Ablauf</Badge>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-5xl">Vom Erstkontakt zur qualifizierten Importprüfung.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-4">
            {steps.map(([Icon, title, text], index) => (
              <div key={title} className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b121b]/80 p-6 backdrop-blur">
                <div className="absolute right-5 top-4 text-5xl font-black text-cyan-300/10">0{index + 1}</div>
                <Icon className="mb-5 h-8 w-8 text-cyan-300" />
                <h3 className="font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/54">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="kontakt" className="relative mx-auto max-w-5xl px-5 py-24 text-center md:px-8">
          <div className="rounded-[2rem] border border-cyan-300/20 bg-white/[0.055] p-8 shadow-[0_0_40px_rgba(34,211,238,0.1)] backdrop-blur-xl md:p-12">
            <Sparkles className="mx-auto mb-5 h-10 w-10 text-cyan-300" />
            <h2 className="text-3xl font-extrabold md:text-5xl">Import-Anfrage stellen.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/58">Kurze Qualifizierung für Apotheken, Großhändler, Importeure und QA-/QP-nahe Entscheider mit realem medizinischem Bedarf.</p>
            <div className="mx-auto mt-8 grid max-w-2xl gap-3 text-left text-sm text-white/62 sm:grid-cols-2">
              {[[Database, "Geprüfte internationale Supply"], [BadgeCheck, "EU-GMP/GDP/GACP-Dokumentation"], [Network, "Importfähigkeit & Release-Pfad"], [Sparkles, "AICert/ShinrAi Vorprüfung"]].map(([Icon, label]) => (
                <div key={String(label)} className="flex gap-2 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" /> {String(label)}
                </div>
              ))}
            </div>
            <a href="mailto:info@cannaworld-germany.de?subject=CannaWorld Germany Import-Anfrage" className="mt-9 inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-300 px-8 py-4 font-bold text-[#061016] shadow-[0_0_34px_rgba(34,211,238,0.24)] transition hover:bg-cyan-200">
              info@cannaworld-germany.de <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </section>
      </main>

      <footer className="relative border-t border-white/10 py-10 text-center text-xs text-white/35">
        © 2026 CannaWorld Germany · Berlin · Bangkok · B2B Compliance Intake
      </footer>
    </div>
  );
}


function GatewayServicesPreview() {
  return (
    <section id="gateway-services" className="relative mx-auto max-w-7xl px-5 py-24 md:px-8">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <Badge>Gateway Services → Germany</Badge>
        <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-5xl">Gateway-Angebot logisch auf den deutschen Markt übertragen.</h2>
        <p className="mt-4 text-white/58">Germany ist nicht die Operations-App. Germany ist der deutsche Frontdoor: Nachfrage qualifizieren, Compliance-Packs prüfen, Supplier filtern und sauber ins CannaWorld-Ökosystem übergeben.</p>
      </div>
      <div className="grid gap-6">
        {serviceGroups.map((group) => (
          <div key={group.title} className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur">
            <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <h3 className="text-2xl font-bold">{group.title}</h3>
              <p className="text-sm text-white/48">{group.subtitle}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {group.items.map(([Icon, title, text]) => (
                <Link key={title} to="/login" className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-cyan-300/10">
                  <Icon className="mb-3 h-6 w-6 text-cyan-300" />
                  <div className="font-bold">{title}</div>
                  <div className="mt-2 text-sm leading-6 text-white/52">{text}</div>
                  <div className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300/75">Partner Login erforderlich</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || "/dashboard";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const supabase = await loadSupabase();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        setError(error.message);
        return;
      }
      navigate(from, { replace: true });
    } catch (error) {
      setLoading(false);
      setError("Login ist noch nicht konfiguriert. Bitte Zugang manuell über CannaWorld freischalten lassen.");
      console.error("Supabase login unavailable", error);
    }
  }

  return (
    <div className="min-h-screen bg-[#071016] px-5 py-10 text-white">
      <Link to="/" className="inline-flex items-center gap-3 text-sm font-semibold text-white/60 hover:text-white">
        <img src={logo} alt="CannaWorld" className="h-8 w-auto" /> Zurück zur Landing
      </Link>
      <main className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-md items-center">
        <form onSubmit={handleSubmit} className="w-full rounded-[2rem] border border-cyan-300/20 bg-white/[0.055] p-7 shadow-[0_0_44px_rgba(34,211,238,0.11)] backdrop-blur-xl">
          <Badge>Protected Dashboard</Badge>
          <h1 className="mt-5 text-3xl font-black tracking-tight">CannaWorld Germany Login</h1>
          <p className="mt-3 text-sm leading-6 text-white/56">Das Dashboard ist nur für qualifizierte B2B-Partner, Import-/QA-Rollen und interne CannaWorld-Operatoren sichtbar.</p>
          <label className="mt-7 block text-sm font-bold text-white/70">
            E-Mail
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/60"
              placeholder="name@company.com"
            />
          </label>
          <label className="mt-4 block text-sm font-bold text-white/70">
            Passwort
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/60"
              placeholder="••••••••"
            />
          </label>
          {error && <div className="mt-4 rounded-xl border border-red-300/20 bg-red-400/10 p-3 text-sm text-red-100">{error}</div>}
          <button disabled={loading} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 font-black text-[#061016] transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Prüfe Login…" : "Dashboard öffnen"} <ArrowRight className="h-4 w-4" />
          </button>
          <p className="mt-5 text-xs leading-5 text-white/38">Kein Account? Zugang wird manuell nach B2B-Qualifizierung freigeschaltet. Sensible Supplier-, Batch-, Dokumenten- und Trade-Case-Daten bleiben geschützt.</p>
        </form>
      </main>
    </div>
  );
}

function ProtectedDashboard() {
  const location = useLocation();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    let unsubscribe: (() => void) | undefined;
    loadSupabase()
      .then((supabase) => {
        supabase.auth.getSession().then(({ data }) => {
          if (mounted) setAllowed(Boolean(data.session));
        });
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
          if (mounted) setAllowed(Boolean(session));
        });
        unsubscribe = () => listener.subscription.unsubscribe();
      })
      .catch((error) => {
        console.error("Supabase auth unavailable", error);
        if (mounted) setAllowed(false);
      });
    return () => {
      mounted = false;
      unsubscribe?.();
    }; 
  }, []);

  if (allowed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#071016] text-sm font-semibold text-cyan-200">
        Prüfe Dashboard-Zugang…
      </div>
    );
  }

  if (!allowed) return <Navigate to="/login" replace state={{ from: location }} />;

  return <DashboardLayout />;
}

function DashboardLayout() {
  const [open, setOpen] = useState(false);

  async function handleSignOut() {
    try {
      const supabase = await loadSupabase();
      await supabase.auth.signOut();
    } finally {
      window.location.href = "/login";
    }
  }

  return (
    <div className="min-h-screen bg-[#071016] text-white">
      {open && <button aria-label="Close sidebar" className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-[#09131d]/95 backdrop-blur-xl transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-20 items-center gap-3 border-b border-white/10 px-5">
          <img src={logo} alt="CannaWorld" className="h-10 w-auto" />
          <div className="leading-none">
            <div className="text-sm font-black tracking-wide">CANNAWORLD</div>
            <div className="text-[10px] font-bold tracking-[0.28em] text-cyan-300">GERMANY</div>
          </div>
          <button className="ml-auto rounded-lg p-2 text-white/60 hover:bg-white/10 lg:hidden" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="h-[calc(100vh-5rem)] space-y-1 overflow-y-auto p-3">
          {dashboardNav.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              end={item.path === "/dashboard"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive ? "bg-cyan-300/15 text-cyan-200 ring-1 ring-cyan-300/20" : "text-white/58 hover:bg-white/7 hover:text-white"
                }`
              }
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b border-white/10 bg-[#071016]/82 px-5 backdrop-blur-xl lg:px-8">
          <button className="rounded-xl border border-white/10 p-2 text-white/70 hover:bg-white/10 lg:hidden" onClick={() => setOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">CannaWorld Germany</div>
            <div className="text-lg font-bold">B2B Import Command Center</div>
          </div>
          <div className="ml-auto hidden items-center gap-3 md:flex">
            <Link to="/" className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 hover:bg-white/10">Landing</Link>
            <button onClick={handleSignOut} className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 hover:bg-white/10">Logout</button>
            <a href="mailto:info@cannaworld-germany.de?subject=CannaWorld Germany Import-Anfrage" className="rounded-xl bg-cyan-300 px-4 py-2 text-sm font-bold text-[#061016] hover:bg-cyan-200">Import-Anfrage</a>
          </div>
        </header>
        <main className="p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function DashboardModule({ moduleKey }: { moduleKey: string }) {
  const data = moduleData[moduleKey] ?? moduleData.overview;
  const current = dashboardNav.find((item) => item.key === moduleKey) ?? dashboardNav[0];
  const Icon = current.icon;

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/12 via-white/[0.045] to-emerald-300/10 p-6 shadow-[0_0_42px_rgba(34,211,238,0.08)] md:p-8">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
              <Icon className="h-4 w-4" /> {data.eyebrow}
            </div>
            <h1 className="text-3xl font-black tracking-tight md:text-5xl">{data.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">{data.description}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/60">
            Germany scope · B2B · Compliance-first
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {data.stats.map((stat, index) => (
          <div key={stat} className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-300 ring-1 ring-cyan-300/20">
              <span className="text-sm font-black">0{index + 1}</span>
            </div>
            <div className="font-bold">{stat}</div>
            <div className="mt-2 text-sm leading-6 text-white/45">Live-Daten-Anschluss vorbereitet; aktuell als Germany-Control-Surface abgebildet.</div>
          </div>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6">
          <h2 className="text-xl font-bold">Operational Flow</h2>
          <div className="mt-5 space-y-4">
            {steps.map(([StepIcon, title, text], index) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-300 ring-1 ring-cyan-300/20">
                  <StepIcon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{index + 1}. {title}</div>
                  <div className="mt-1 text-sm leading-6 text-white/50">{text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6">
          <h2 className="text-xl font-bold">Quick Actions</h2>
          <div className="mt-5 space-y-3">
            {data.actions.map((action) => (
              <button key={action} className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm font-semibold text-white/72 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 hover:text-white">
                {action}
                <ArrowRight className="h-4 w-4 text-cyan-300" />
              </button>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100/80">
            Modul ist als Germany-Dashboard-Oberfläche integriert. Es gibt kein separates Germany-Backend; Transaktionen laufen erst nach Rollen-, Auth- und Datenquellen-Freigabe über das gemeinsame Gateway/Supabase Backend.
          </div>
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedDashboard />}>
          <Route index element={<DashboardModule moduleKey="overview" />} />
          {dashboardNav.slice(1).map((item) => (
            <Route
              key={item.key}
              path={item.key}
              element={item.key === "services" ? <GatewayServicesPreview /> : <DashboardModule moduleKey={item.key} />}
            />
          ))}
          <Route path="settings" element={<DashboardModule moduleKey="settings" />} />
          <Route path="profile" element={<DashboardModule moduleKey="profile" />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
