import { Stethoscope, ClipboardCheck, AlertTriangle, FileText, Lock } from "lucide-react";

/**
 * Scaffolded BtM prescription workspace. This page is RoleGuard-gated by both
 * the `pharmacy` app_role AND a verified BtM license entry in
 * `germany_btm_licenses`. Full prescription workflows ship in Phase 5b after
 * the legal review concludes.
 */
export default function BtmPrescriptions() {
  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/12 via-white/[0.045] to-emerald-300/10 p-6 shadow-[0_0_42px_rgba(34,211,238,0.08)] md:p-8">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
              <Stethoscope className="h-4 w-4" /> BtM-Rezept Workspace
            </div>
            <h1 className="text-3xl font-black tracking-tight md:text-5xl">BtM-Rezepte</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">
              Verwaltung von Betäubungsmittel-Rezepten nach §3 BtMG für medizinisches Cannabis.
              Zugriff nur mit verifizierter BtM-Erlaubnis. Strukturierte Workflows (Einlösung,
              Restmengen, Rückgaben, Vernichtung, BtM-Buch) erscheinen in einem späteren Release
              nach Abschluss der juristischen Prüfung.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-amber-300/30 bg-amber-400/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-200">
            <Lock className="h-3.5 w-3.5" /> Scaffolding · Legal-Review pending
          </span>
        </div>
      </section>

      <section className="rounded-3xl border border-amber-300/30 bg-amber-400/[0.04] p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
          <div className="text-sm leading-6 text-white/70">
            <div className="font-bold text-white">Hinweis</div>
            <p className="mt-1">
              Dieses Modul existiert aktuell als technisches Scaffolding (Route + RBAC + DB-Schema
              + Edge-Function für Lizenz-Verifikation). Die operative Verarbeitung von
              Betäubungsmittel-Rezepten erfordert vorher: rechtliche Prüfung des Workflows durch
              eine auf Apothekenrecht spezialisierte Kanzlei, Abnahme durch die zuständige
              Landesbehörde, und vollständige Implementierung des BtM-Buchs nach §13 BtMVV.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { icon: FileText, title: "Rezept-Einlösung", hint: "Erfassung neuer BtM-Rezepte mit Patientenkürzel, Substanz, Menge" },
          { icon: ClipboardCheck, title: "BtM-Buch", hint: "Lückenlose Verbrauchs- und Rückgabenrechnung gemäß §13 BtMVV" },
          { icon: AlertTriangle, title: "Restmengen + Vernichtung", hint: "Dokumentation von Rückgaben, Vernichtung und Bestandskorrekturen" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <Icon className="mb-3 h-5 w-5 text-cyan-300" />
              <div className="text-sm font-bold text-white">{item.title}</div>
              <div className="mt-1 text-xs leading-5 text-white/55">{item.hint}</div>
              <div className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white/30">
                Kommt mit Phase 5b
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
