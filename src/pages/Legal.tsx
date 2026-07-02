import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import UniverseBar from "../components/UniverseBar";

function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#070b10] pt-8 text-[#f4f8fb] selection:bg-cyan-400/25">
      <UniverseBar current="germany" />
      <nav className="fixed inset-x-0 top-8 z-50 border-b border-white/10 bg-[#070b10]/78 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-4xl items-center justify-between px-5 md:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-cyan-200">
            <ArrowLeft className="h-4 w-4" /> Zurück zur Startseite
          </Link>
        </div>
      </nav>
      <main className="relative mx-auto max-w-4xl px-5 pb-24 pt-40 md:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h1>
        <div className="mt-10 space-y-8 text-sm leading-7 text-white/70 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-white [&_h3]:font-semibold [&_h3]:text-white/90">
          {children}
        </div>
      </main>
      <footer className="relative border-t border-white/10 py-10 text-center text-xs text-white/35">
        <div className="space-x-4">
          <Link to="/impressum" className="transition hover:text-white/70">Impressum</Link>
          <Link to="/datenschutz" className="transition hover:text-white/70">Datenschutz</Link>
        </div>
        <div className="mt-3">© 2026 CannaWorld Germany · Berlin · Bangkok · B2B Compliance Intake</div>
      </footer>
    </div>
  );
}

export function ImpressumPage() {
  return (
    <LegalLayout title="Impressum">
      <section>
        <h2>Angaben gemäß § 5 DDG</h2>
        <p className="mt-3">
          CannaWorld Co., Ltd.
          <br />
          140 One Pacific Place Building, Suite 1705, 17th Floor
          <br />
          Sukhumvit Road, Khlong Toey Sub-District, Khlong Toey District
          <br />
          Bangkok, Thailand
        </p>
      </section>
      <section>
        <h2>Registrierung</h2>
        <p className="mt-3">
          Registriert beim Department of Business Development (DBD), Ministry of Commerce, Thailand
          <br />
          Juristic Person Registration No. / Tax ID: 0105567045912
        </p>
      </section>
      <section>
        <h2>Vertretungsberechtigte Direktoren</h2>
        <p className="mt-3">Yuthana Promsin, Kevin Crane</p>
      </section>
      <section>
        <h2>Kontakt</h2>
        <p className="mt-3">
          E-Mail:{" "}
          <a href="mailto:info@cannaworld-germany.de" className="text-cyan-300 transition hover:text-cyan-200">
            info@cannaworld-germany.de
          </a>
        </p>
      </section>
      <section>
        <h2>Verantwortlich für den Inhalt</h2>
        <p className="mt-3">Kevin Crane (Anschrift wie oben)</p>
      </section>
      <section>
        <h2>Hinweis zum Leistungsumfang</h2>
        <p className="mt-3">
          CannaWorld Germany ist ein reiner B2B-Compliance- und Import-Intake für regulierte Marktteilnehmer
          (Apotheken, Großhandel, Importeure, Herstellbetriebe). CannaWorld ist keine Zertifizierungsstelle,
          kein pharmazeutischer Großhändler, kein Importeur, keine Apotheke und kein Labor. Es erfolgt keine
          Abgabe von Arzneimitteln an Endkunden, keine Sortenwerbung und keine Therapie- oder Heilversprechen.
        </p>
      </section>
      <section>
        <h2>Streitbeilegung</h2>
        <p className="mt-3">
          Dieses Angebot richtet sich ausschließlich an Unternehmen (B2B). Zur Teilnahme an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir weder verpflichtet noch
          bereit.
        </p>
      </section>
    </LegalLayout>
  );
}

export function DatenschutzPage() {
  return (
    <LegalLayout title="Datenschutzerklärung">
      <section>
        <h2>1. Verantwortlicher</h2>
        <p className="mt-3">
          CannaWorld Co., Ltd., 140 One Pacific Place Building, Suite 1705, 17th Floor, Sukhumvit Road,
          Khlong Toey, Bangkok, Thailand
          <br />
          E-Mail:{" "}
          <a href="mailto:info@cannaworld-germany.de" className="text-cyan-300 transition hover:text-cyan-200">
            info@cannaworld-germany.de
          </a>
        </p>
      </section>
      <section>
        <h2>2. Hosting</h2>
        <p className="mt-3">
          Diese Website wird bei Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, USA) gehostet. Beim
          Aufruf der Website verarbeitet Vercel technisch notwendige Daten (u.&nbsp;a. IP-Adresse, Datum und
          Uhrzeit des Zugriffs, Browsertyp) in Server-Logfiles. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
          DSGVO (berechtigtes Interesse am sicheren und stabilen Betrieb). Mit Vercel besteht ein Vertrag
          über Auftragsverarbeitung; Übermittlungen in die USA erfolgen auf Grundlage der
          EU-Standardvertragsklauseln.
        </p>
      </section>
      <section>
        <h2>3. Registrierung und Partner-Login</h2>
        <p className="mt-3">
          Bei der B2B-Registrierung verarbeiten wir die von Ihnen angegebenen Unternehmens- und Kontaktdaten
          (z.&nbsp;B. Firma, Ansprechpartner, E-Mail, Lizenz- und Compliance-Angaben) zur Prüfung und
          Verwaltung Ihres Partnerzugangs. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung
          und -durchführung). Die Daten werden in einer Supabase-Datenbank in der EU (Region eu-west-1)
          gespeichert.
        </p>
      </section>
      <section>
        <h2>4. Kontaktaufnahme per E-Mail</h2>
        <p className="mt-3">
          Wenn Sie uns per E-Mail kontaktieren (z.&nbsp;B. für eine Import-Anfrage), verarbeiten wir Ihre
          Angaben zur Bearbeitung der Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO bzw. Art. 6
          Abs. 1 lit. f DSGVO.
        </p>
      </section>
      <section>
        <h2>5. Cookies und lokale Speicherung</h2>
        <p className="mt-3">
          Wir setzen keine Tracking- oder Marketing-Cookies ein. Für den Partner-Login werden technisch
          notwendige Sitzungsdaten (Authentifizierungs-Token) im lokalen Speicher Ihres Browsers abgelegt
          (Art. 6 Abs. 1 lit. b DSGVO, § 25 Abs. 2 TDDDG).
        </p>
      </section>
      <section>
        <h2>6. Google Fonts</h2>
        <p className="mt-3">
          Zur einheitlichen Darstellung von Schriftarten nutzt diese Website Schriften von Google Fonts
          (Google Ireland Limited). Beim Seitenaufruf lädt Ihr Browser die Schriften von Google-Servern;
          dabei wird Ihre IP-Adresse an Google übermittelt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
        </p>
      </section>
      <section>
        <h2>7. Ihre Rechte</h2>
        <p className="mt-3">
          Sie haben nach Maßgabe der DSGVO das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung
          (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie
          Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (Art. 21). Ihnen
          steht zudem ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu (Art. 77 DSGVO).
        </p>
      </section>
      <section>
        <h2>8. Speicherdauer</h2>
        <p className="mt-3">
          Wir speichern personenbezogene Daten nur so lange, wie es für die genannten Zwecke erforderlich ist
          oder gesetzliche Aufbewahrungspflichten bestehen.
        </p>
      </section>
      <p className="text-white/40">Stand: Juli 2026</p>
    </LegalLayout>
  );
}
