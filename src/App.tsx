import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileCheck,
  Globe2,
  Mail,
  Network,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Truck,
} from "lucide-react";

const logo = "/cannaworld-logo-new.webp";

const stats = [
  ["DE", "B2B Intake"],
  ["EU-GMP", "Dokumentenpfad"],
  ["GDP", "Lieferkette"],
  ["GACP", "Cultivation Proof"],
  ["ShinrAi", "Trust Layer"],
  ["AICert", "Pre-Audit"],
];

const groups = [
  "Apotheken mit Import- oder Versorgungsinteresse",
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
];

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold text-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.12)]">{children}</span>;
}

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#070b10] text-[#f4f8fb] selection:bg-cyan-400/25">
      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_75%_10%,rgba(34,197,94,0.14),transparent_28%),linear-gradient(180deg,#070b10,#091018_48%,#070b10)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      </div>

      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#070b10]/78 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="#top" className="flex items-center gap-3">
            <img src={logo} alt="CannaWorld" className="h-12 w-auto object-contain" />
          </a>
          <div className="hidden items-center gap-8 text-sm font-medium text-white/60 md:flex">
            <a href="#proof" className="transition hover:text-white">Proof</a>
            <a href="#prozess" className="transition hover:text-white">Prozess</a>
            <a href="#kontakt" className="transition hover:text-white">Kontakt</a>
          </div>
          <a href="mailto:info@cannaworld-germany.de?subject=CannaWorld Germany Import-Anfrage" className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2.5 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300/70 hover:bg-cyan-400/20">
            Anfrage
          </a>
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
              <a href="mailto:info@cannaworld-germany.de?subject=CannaWorld Germany Import-Anfrage" className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-300 px-8 py-4 font-bold text-[#061016] shadow-[0_0_34px_rgba(34,211,238,0.25)] transition hover:-translate-y-0.5 hover:bg-cyan-200">
                Import-Anfrage stellen <ArrowRight className="h-5 w-5" />
              </a>
              <a href="#proof" className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-8 py-4 font-semibold text-white transition hover:border-cyan-300/50 hover:bg-white/10">
                Proof-of-Trust ansehen
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

        <section id="prozess" className="relative border-y border-white/10 bg-white/[0.03] py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <Badge>Ablauf</Badge>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-5xl">Vom Erstkontakt zur qualifizierten Importprüfung.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-4">
              {steps.map(([Icon, title, text], index) => (
                <div key={String(title)} className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b121b]/80 p-6 backdrop-blur">
                  <div className="absolute right-5 top-4 text-5xl font-black text-cyan-300/10">0{index + 1}</div>
                  <Icon className="mb-5 h-8 w-8 text-cyan-300" />
                  <h3 className="font-bold">{String(title)}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/54">{String(text)}</p>
                </div>
              ))}
            </div>
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
