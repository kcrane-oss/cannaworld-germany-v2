import { useState, useEffect, useRef } from 'react';
import {
  Leaf, Shield, Truck, FileCheck, FlaskConical, Building2,
  ArrowRight, Mail, Globe, Sparkles, Package
} from 'lucide-react';
import { RoleOnboardingWizard } from './components/onboarding/RoleOnboardingWizard';
import products from './data/products.json';

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

type Series = 'all' | string;

const IMPORT_SERVICES = [
  { icon: <Shield size={22}/>, title: 'EU-GMP Zertifizierung', desc: 'Kompletter GMP-Zertifizierungsprozess — AI-gestützt über unsere AICert-Plattform.', color: '#22C55E' },
  { icon: <Leaf size={22}/>, title: 'GACP Compliance', desc: 'Qualifizierung thailändischer Anbauflächen nach EU-Standards.', color: '#4ADE80' },
  { icon: <FlaskConical size={22}/>, title: 'Laboranalyse & QC', desc: 'EU-Pharmakopöe konforme Prüfung: Potenz, Pestizide, Schwermetalle.', color: '#818CF8' },
  { icon: <FileCheck size={22}/>, title: 'Export-Dokumentation', desc: 'Thai FDA Exportlizenz, Phytosanitärzertifikate, Zolldokumentation.', color: '#F59E0B' },
  { icon: <Truck size={22}/>, title: 'Import & Logistik', desc: 'BfArM-Importgenehmigungen, EU-Zollabwicklung, GDP-Transport.', color: '#06B6D4' },
  { icon: <Building2 size={22}/>, title: 'Distribution', desc: 'QP-Chargenfreigabe, Marktzulassung, Apotheken-Vertriebsnetzwerk.', color: '#EC4899' },
];

const SERIES_LIST = ['all', ...Array.from(new Set(products.map(p => p.series)))];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState<Series>('all');

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const filtered = filter === 'all' ? products : products.filter(p => p.series === filter);

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
            <a href="#import" className="hover:text-text transition-colors">Import Services</a>
            <a href="#onboarding" className="hover:text-text transition-colors">Onboarding</a>
            <a href="#contact" className="hover:text-text transition-colors">Kontakt</a>
          </div>
          <a href="#onboarding" className="px-5 py-2 rounded-xl text-white text-sm font-semibold transition-all hover:scale-[1.03]" style={{ background: 'linear-gradient(135deg, #22C55E, #16A34A)' }}>
            Start Onboarding
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
                  Enterprise Ready
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight mb-6">
                <span className="block text-text">Apotheken Netzwerk.</span>
                <span className="block text-accent">Cannabis Import.</span>
              </h1>

              <p className="text-muted text-base md:text-lg max-w-md mb-3 leading-relaxed">
                Professionelle Import-Services und direktes Onboarding für den deutschen Apothekenmarkt. EU-GMP & GACP Excellence.
              </p>
              <p className="text-muted/30 text-sm italic mb-8">
                Von Berlin bis Bangkok — Innovation trifft Compliance.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <a href="#onboarding" className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold text-sm transition-all hover:scale-[1.03]" style={{ background: 'linear-gradient(135deg, #22C55E, #16A34A)' }}>
                  Jetzt Onboarding starten <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                </a>
                <a href="#import" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-muted hover:text-text transition-all text-sm" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                  Import Services
                </a>
              </div>

              <div className="flex gap-6">
                {[
                  { icon: <Sparkles size={13}/>, text: 'Enterprise Modul' },
                  { icon: <Shield size={13}/>, text: 'EU-GMP Partner' },
                  { icon: <Globe size={13}/>, text: 'Thailand → DE' },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-muted text-xs">
                    <span className="text-accent">{b.icon}</span>{b.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
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
              Von der thailändischen Farm bis zur deutschen Apotheke — mit AI-gestützter Compliance.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {IMPORT_SERVICES.map((s, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="rounded-2xl p-6 h-full transition-all hover:scale-[1.02]" style={{ background: `${s.color}04`, border: `1px solid ${s.color}10` }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${s.color}12` }}>
                    <span style={{ color: s.color }}>{s.icon}</span>
                  </div>
                  <h3 className="font-bold text-base mb-2">{s.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ECOSYSTEM
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4">Das Ökosystem</p>
              <h2 className="text-3xl font-semibold tracking-tight">Teil von etwas Größerem.</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'CannaWorld Europe', desc: 'EU-Importinfrastruktur. Farm-to-Pharmacy.', url: 'https://cannaworld-europe.com', color: '#22C55E' },
              { name: 'GMP-AICert', desc: 'AI-gestützte GMP-Audits und Compliance.', url: 'https://gmp-aicert.com', color: '#818CF8' },
              { name: 'Marketplace', desc: 'B2B-Marktplatz für verifizierten Handel.', url: 'https://cannaworld-marketplace.com', color: '#F59E0B' },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="group block rounded-2xl p-6 h-full transition-all hover:scale-[1.02]" style={{ background: `${p.color}04`, border: `1px solid ${p.color}10` }}>
                  <div className="w-3 h-3 rounded-full mb-4" style={{ background: p.color, boxShadow: `0 0 20px ${p.color}40` }}/>
                  <h3 className="font-bold text-base mb-2 group-hover:text-accent transition-colors">{p.name}</h3>
                  <p className="text-muted text-sm mb-3">{p.desc}</p>
                  <span className="text-xs font-semibold flex items-center gap-1" style={{ color: p.color }}>Besuchen <ArrowRight size={12}/></span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════════════════════════ */}
      <section id="onboarding" className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <RoleOnboardingWizard role="farm" />
        </div>
      </section>
      <section id="contact" className="py-32 border-t border-white/5" style={{ background: 'rgba(34,197,94,0.015)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Reveal>
            <Leaf size={32} className="text-accent mx-auto mb-4"/>
            <p className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4">Kontakt</p>
            <h2 className="text-4xl md:text-5xl font-semibold mb-5">Bereit für die nächste Stufe?</h2>
            <p className="text-muted text-lg mb-10 max-w-xl mx-auto">Starte jetzt dein Onboarding oder kontaktiere uns für Import-Partnerschaften.</p>
            <a href="mailto:info@cannaworld-germany.de?subject=Anfrage"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-semibold transition-all hover:scale-[1.03]" style={{ background: 'linear-gradient(135deg, #22C55E, #16A34A)' }}>
              <Mail size={16}/> info@cannaworld-germany.de
            </a>
            <p className="text-muted/40 text-sm mt-4">Berlin · Bangkok · Schnelle Antwort garantiert</p>
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
            <a href="#import" className="hover:text-text transition-colors">Import</a>
            <a href="#onboarding" className="hover:text-text transition-colors">Onboarding</a>
            <a href="#contact" className="hover:text-text transition-colors">Kontakt</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
