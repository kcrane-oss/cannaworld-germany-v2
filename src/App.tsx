import { useState, useEffect, useRef } from 'react';
import {
  Leaf, Shield, Truck, FileCheck, FlaskConical, Building2,
  ArrowRight, Mail, Globe, Sparkles, Package
} from 'lucide-react';

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.05 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(32px)',
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(.16,1,.3,1) ${delay}ms`
    }}>{children}</div>
  );
}

// ── Glasfilter Products ──
const GLASFILTER = [
  {
    name: 'Twister Glasfilter',
    desc: 'Spiralförmiger Rauchweg für maximale Kühlung. Handgefertigt aus Premium-Borosilikatglas.',
    features: ['Spiraldesign', 'Borosilikat', 'Wiederverwendbar', 'Handgefertigt'],
    badge: 'Bestseller',
    color: '#22C55E',
  },
  {
    name: 'Diamond Tip',
    desc: 'Facettierter Diamantschliff an der Spitze. Elegant, funktional, unzerstörbar.',
    features: ['Diamantschliff', 'Premium-Glas', 'Spülmaschinenfest', 'Langlebig'],
    badge: 'Premium',
    color: '#818CF8',
  },
  {
    name: 'Glow-in-the-Dark',
    desc: 'Leuchtet im Dunkeln. Phosphoreszierende Beschichtung auf Borosilikatglas. Der Hingucker.',
    features: ['Phosphoreszierend', 'UV-reaktiv', 'Borosilikat', 'Party-Ready'],
    badge: 'Neu',
    color: '#F59E0B',
  },
  {
    name: 'Classic Round Tip',
    desc: 'Der Klassiker. Abgerundete Spitze, perfekter Zug, kristallklares Glas.',
    features: ['Abgerundet', 'Universell', 'Kristallklar', 'Nachhaltig'],
    badge: null,
    color: '#06B6D4',
  },
  {
    name: 'Flat Tip Pro',
    desc: 'Flache Form für stabilen Halt. Perfekt für Dreher die Präzision lieben.',
    features: ['Flache Form', 'Stabiler Halt', 'Pro-Serie', 'Borosilikat'],
    badge: null,
    color: '#EC4899',
  },
  {
    name: 'Colour Edition',
    desc: 'Handgefärbtes Borosilikatglas in verschiedenen Farben. Jedes Stück ein Unikat.',
    features: ['Handgefärbt', 'Unikat', 'Sammelbar', 'Premium-Glas'],
    badge: 'Limited',
    color: '#C9A96E',
  },
];

// ── Import Services ──
const IMPORT_SERVICES = [
  { icon: <Shield size={22}/>, title: 'EU-GMP Zertifizierung', desc: 'Wir begleiten den kompletten GMP-Zertifizierungsprozess — von der Vorbereitung bis zur Audit-Bestehung. AI-gestützt über unsere AICert-Plattform.', color: '#22C55E' },
  { icon: <Leaf size={22}/>, title: 'GACP Compliance', desc: 'Qualifizierung thailändischer Anbauflächen nach EU-Standards. Boden, Wasser, Ernte, Trocknung — alles verifiziert.', color: '#4ADE80' },
  { icon: <FlaskConical size={22}/>, title: 'Laboranalyse & QC', desc: 'EU-Pharmakopöe konforme Prüfung: Potenz, Pestizide, Schwermetalle, Mikrobiologie. Volle COA-Dokumentation.', color: '#818CF8' },
  { icon: <FileCheck size={22}/>, title: 'Export-Dokumentation', desc: 'Thai FDA Exportlizenz, Phytosanitärzertifikate, CITES-Genehmigungen, Zolldokumentation. Jeder Papierkram erledigt.', color: '#F59E0B' },
  { icon: <Truck size={22}/>, title: 'Import & Logistik', desc: 'BfArM-Importgenehmigungen, EU-Zollabwicklung, GDP-konformer Transport, Kühlkettenmanagement.', color: '#06B6D4' },
  { icon: <Building2 size={22}/>, title: 'Distribution', desc: 'QP-Chargenfreigabe, Marktzulassung, Zugang zum Apotheken-Vertriebsnetzwerk. Vom Feld zum Patienten.', color: '#EC4899' },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div className="min-h-screen bg-dark text-text overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass' : ''}`}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <Leaf size={20} className="text-accent"/>
            <span className="font-bold text-lg">Canna<span className="text-accent">World</span> <span className="text-muted text-sm font-normal">Germany</span></span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted">
            <a href="#glasfilter" className="hover:text-text transition-colors">Glasfilter</a>
            <a href="#import" className="hover:text-text transition-colors">Import Services</a>
            <a href="#contact" className="hover:text-text transition-colors">Kontakt</a>
          </div>
          <a href="#glasfilter" className="px-5 py-2 rounded-xl text-white text-sm font-semibold transition-all hover:scale-[1.03]" style={{ background: 'linear-gradient(135deg, #22C55E, #16A34A)' }}>
            Shop
          </a>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-[120px]" style={{ background: '#22C55E' }}/>
          <div className="absolute bottom-1/3 left-1/3 w-[300px] h-[300px] rounded-full opacity-6 blur-[100px]" style={{ background: '#4ADE80' }}/>
        </div>

        <div className="max-w-6xl mx-auto px-4 pt-28 md:pt-36 pb-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold" style={{ background: 'rgba(34,197,94,0.1)', color: '#4ADE80', border: '1px solid rgba(34,197,94,0.2)' }}>
                  🇩🇪 Made for Germany
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold" style={{ background: 'rgba(201,169,110,0.1)', color: '#C9A96E', border: '1px solid rgba(201,169,110,0.2)' }}>
                  ✨ Premium Glas
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight mb-6">
                <span className="block text-text">Smoking & Grow-Tech</span>
                <span className="block text-accent">der nächsten Generation.</span>
              </h1>

              <p className="text-muted text-base md:text-lg max-w-md mb-3 leading-relaxed">
                Premium Glasfilter aus Borosilikatglas. Professionelle Cannabis-Import-Services. Innovation trifft Compliance.
              </p>
              <p className="text-muted/30 text-sm italic mb-8">
                Von Berlin bis Bangkok — wir verbinden Qualität mit Legalität.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <a href="#glasfilter" className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold text-sm transition-all hover:scale-[1.03]" style={{ background: 'linear-gradient(135deg, #22C55E, #16A34A)' }}>
                  Glasfilter entdecken <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                </a>
                <a href="#import" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-muted hover:text-text transition-all text-sm" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                  Import Services
                </a>
              </div>

              <div className="flex gap-6">
                {[
                  { icon: <Sparkles size={13}/>, text: 'Handgefertigt' },
                  { icon: <Shield size={13}/>, text: 'EU-GMP Partner' },
                  { icon: <Globe size={13}/>, text: 'Thailand → DE' },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-muted text-xs">
                    <span className="text-accent">{b.icon}</span>{b.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Visual */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="w-80 h-80 rounded-[3rem] flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(34,197,94,0.02))', border: '1px solid rgba(34,197,94,0.1)' }}>
                  <div className="text-center">
                    <div className="text-8xl mb-4">🔬</div>
                    <div className="text-accent text-sm font-semibold tracking-wider uppercase">Premium Borosilikat</div>
                    <div className="text-muted text-xs mt-1">Handgefertigt · Wiederverwendbar</div>
                  </div>
                </div>
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 px-3 py-1.5 rounded-xl text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #22C55E, #16A34A)' }}>
                  NEU 2026
                </div>
                <div className="absolute -bottom-3 -left-3 px-3 py-1.5 rounded-xl text-xs font-bold" style={{ background: 'rgba(201,169,110,0.15)', color: '#C9A96E', border: '1px solid rgba(201,169,110,0.25)' }}>
                  ♻️ Nachhaltig
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          GLASFILTER — Product Showcase
      ══════════════════════════════════════════════════════════════ */}
      <section id="glasfilter" className="py-32 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <div className="text-center mb-20">
              <p className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4">Glasfilter Kollektion</p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">Jeder Zug. Perfektioniert.</h2>
              <p className="text-muted text-lg mt-4 max-w-lg mx-auto">Premium-Borosilikatglas. Handgefertigt. Wiederverwendbar. Nachhaltig.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GLASFILTER.map((p, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="group rounded-3xl p-7 h-full flex flex-col transition-all duration-500 hover:scale-[1.02]" style={{ background: `${p.color}04`, border: `1px solid ${p.color}10` }}>
                  {p.badge && (
                    <span className="self-start px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4" style={{ background: `${p.color}15`, color: p.color }}>
                      {p.badge}
                    </span>
                  )}
                  <div className="w-full h-40 rounded-2xl mb-5 flex items-center justify-center" style={{ background: `${p.color}06`, border: `1px solid ${p.color}08` }}>
                    <div className="text-5xl opacity-60">🔬</div>
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors">{p.name}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-4 flex-1">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.features.map(f => (
                      <span key={f} className="text-[10px] px-2 py-0.5 rounded-full text-muted/60" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>{f}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <div className="text-center mt-12">
              <a href="mailto:info@cannaworld-germany.de?subject=Glasfilter Bestellung" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold transition-all hover:scale-[1.03]" style={{ background: 'linear-gradient(135deg, #22C55E, #16A34A)' }}>
                <Package size={16}/> Jetzt bestellen
              </a>
              <p className="text-muted/40 text-xs mt-3">Mindestbestellung: 50 Stück · B2B & Retail</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          IMPORT SERVICES
      ══════════════════════════════════════════════════════════════ */}
      <section id="import" className="py-32 border-t border-white/5" style={{ background: 'rgba(34,197,94,0.015)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <div className="text-center mb-6">
              <p className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4">Import Services</p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">Cannabis-Import.<br/>Komplett abgedeckt.</h2>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-center text-muted text-lg max-w-2xl mx-auto mb-20 leading-relaxed">
              Von der thailändischen Farm bis zur deutschen Apotheke. Wir managen den kompletten Import-Prozess — 
              mit AI-gestützter Compliance und lückenloser Dokumentation.
            </p>
          </Reveal>

          <div className="space-y-5">
            {IMPORT_SERVICES.map((s, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="flex items-start gap-6 p-6 md:p-8 rounded-3xl transition-all hover:scale-[1.01]" style={{ background: `${s.color}04`, border: `1px solid ${s.color}10` }}>
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <div className="text-3xl font-black opacity-15">{String(i + 1).padStart(2, '0')}</div>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${s.color}12` }}>
                      <span style={{ color: s.color }}>{s.icon}</span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                    <p className="text-muted text-sm leading-relaxed max-w-2xl">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ECOSYSTEM — Link to other platforms
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4">Das Ökosystem</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Teil von etwas Größerem.</h2>
              <p className="text-muted text-lg mt-4 max-w-lg mx-auto">CannaWorld Germany ist eingebettet in ein internationales Compliance-Ökosystem.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'CannaWorld Europe', desc: 'EU-Importinfrastruktur. Farm-to-Pharmacy Pipeline.', url: 'https://cannaworld-europe.com', color: '#22C55E' },
              { name: 'GMP-AICert', desc: 'AI-gestützte GMP-Audits und Compliance-Plattform.', url: 'https://gmp-aicert.com', color: '#818CF8' },
              { name: 'Marketplace', desc: 'B2B-Marktplatz für verifizierten Cannabis-Handel.', url: 'https://cannaworld-marketplace.com', color: '#F59E0B' },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="group block rounded-2xl p-6 h-full transition-all hover:scale-[1.02]" style={{ background: `${p.color}04`, border: `1px solid ${p.color}10` }}>
                  <div className="w-3 h-3 rounded-full mb-4" style={{ background: p.color, boxShadow: `0 0 20px ${p.color}40` }}/>
                  <h3 className="font-bold text-base mb-2 group-hover:text-accent transition-colors">{p.name}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-3">{p.desc}</p>
                  <span className="text-xs font-semibold flex items-center gap-1" style={{ color: p.color }}>
                    Besuchen <ArrowRight size={12}/>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          WHY US
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-32 border-t border-white/5" style={{ background: 'rgba(34,197,94,0.015)' }}>
        <div className="max-w-5xl mx-auto px-4">
          <Reveal>
            <div className="rounded-3xl p-8 md:p-14" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.06), rgba(10,10,15,0.95))', border: '1px solid rgba(34,197,94,0.1)' }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4">Warum CannaWorld</p>
                  <h2 className="text-3xl md:text-4xl font-semibold mb-5 leading-tight">
                    Innovation.<br/>
                    <span className="text-accent">Compliance.</span><br/>
                    Qualität.
                  </h2>
                  <p className="text-muted leading-relaxed mb-5">
                    CannaWorld Germany verbindet Premium-Raucherzubehör mit professionellen Import-Dienstleistungen.
                    Unser Netzwerk reicht von Bangkok bis Berlin — mit AI-gestützter Technologie und EU-konformer Compliance.
                  </p>
                  <p className="text-muted/60 leading-relaxed">
                    Gegründet mit dem Ziel, den deutschen Cannabis-Markt mit Qualität und Legalität zu versorgen.
                    Jedes Produkt, jeder Import — 100% compliant.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: '🇩🇪', label: 'Sitz in Deutschland' },
                    { value: '🇹🇭', label: 'Partner in Thailand' },
                    { value: 'AI', label: 'Gestützte Compliance' },
                    { value: 'GMP', label: 'EU-zertifiziert' },
                  ].map((m, i) => (
                    <div key={i} className="text-center p-5 rounded-2xl" style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.08)' }}>
                      <div className="text-2xl md:text-3xl font-bold text-accent mb-1">{m.value}</div>
                      <div className="text-muted text-xs">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════════════════════════ */}
      <section id="contact" className="py-32 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Reveal>
            <Leaf size={32} className="text-accent mx-auto mb-4"/>
            <p className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4">Kontakt</p>
            <h2 className="text-4xl md:text-5xl font-semibold mb-5 leading-tight">
              Bereit für<br/>die nächste Stufe?
            </h2>
            <p className="text-muted text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Ob Glasfilter-Bestellung oder Import-Partnerschaft — wir freuen uns auf deine Anfrage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
              <a href="mailto:info@cannaworld-germany.de?subject=Anfrage"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-semibold transition-all hover:scale-[1.03]" style={{ background: 'linear-gradient(135deg, #22C55E, #16A34A)' }}>
                <Mail size={16}/> info@cannaworld-germany.de
              </a>
            </div>
            <p className="text-muted/40 text-sm">Berlin · Bangkok · Schnelle Antwort garantiert</p>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-muted/40 text-xs">
          <div className="flex items-center gap-2">
            <Leaf size={14} className="text-accent"/>
            <span className="font-semibold text-text">Canna<span className="text-accent">World</span> Germany</span>
          </div>
          <div>© {new Date().getFullYear()} CannaWorld Germany — Berlin · Bangkok</div>
          <div className="flex gap-4">
            <a href="#glasfilter" className="hover:text-text transition-colors">Glasfilter</a>
            <a href="#import" className="hover:text-text transition-colors">Import</a>
            <a href="#contact" className="hover:text-text transition-colors">Kontakt</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
