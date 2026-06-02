# CannaWorld Thailand — Marketing-/Werbe-Paket

Praxis-Paket für die B2B-Vermarktung des Korridors **Thailand → Deutschland/EU**
(LinkedIn / Facebook / LINE). Alles compliance-first: B2B-only, kein Heil-/Sorten-/THC-/
Konsumbezug. **Kein Rechtsrat** — Plattform-Policies & TH/EU-Regulatorik vor Go-live prüfen.

> Die regulatorischen und plattformbezogenen Aussagen sind gegen Primär-/Fachquellen
> verifiziert (Stand 2026-06-02) — siehe **`compliance-sources.md`**.

| Datei | Inhalt |
|---|---|
| `cannaworld-thailand-ads-strategy.md` | Gesamtstrategie: Plattform-Realität (Cannabis-Ad-Verbote), Funnel, Kanäle, KPIs, 90-Tage-Rollout |
| `compliance-sources.md` | Verifizierter Faktenstand + Quellen zu Plattform-Policies, EU-GMP/QP/GDP, Thailand-Export-Lizenz, DE/IT-Spezifika |
| `profile-copy-de-en-th.md` | Fertige Profiltexte: LinkedIn (DU + Company), Facebook, LINE — DE/EN/TH |
| `30-day-content-calendar.md` | 30-Tage-Redaktionsplan mit ausformulierten Post-Vorlagen + Recycling-Regel |
| `lead-magnet-import-readiness.md` | EU-GMP Import-Readiness Checkliste (Lead-Magnet) |
| `outbound-templates.md` | Vorlagen: LinkedIn-Sequenz, LINE, Messenger, Cold-E-Mail, Webinar |
| `faq-objection-handling.md` | Einwand-Behandlung & FAQ für Gespräche/DMs: Vertrauen, Bedarf/Timing, Compliance, Preis, heikle Fragen sauber abgrenzen |
| `newsletter-issue-01.md` | LinkedIn-Newsletter „The Compliant Corridor", Ausgabe #1 (voll ausformuliert) + Setup + Promo-Post |
| `newsletter-issue-02.md` | Newsletter Ausgabe #2 „EU-GMP vs. GMP" (voll ausformuliert) + Promo-Post + Karussell-Ableitung |
| `newsletter-issue-03.md` | Newsletter Ausgabe #3 „QP-Freigabe entschlüsselt" (voll ausformuliert) + Promo-Post + Karussell-Ableitung |
| `newsletter-issue-04.md` | Newsletter Ausgabe #4 „GDP-Logistik ohne Lücken" (voll ausformuliert) + Promo-Post + Karussell-Ableitung |
| `newsletter-issue-05.md` | Newsletter Ausgabe #5 „Der Audit-Passport" (Serienfinale, voll ausformuliert) + Promo-Post + Karussell + Serien-Überblick |
| `webinar-export-readiness.md` | Online-Webinar: Run of Show, Foliengerüst, Promo-Plan, Q&A, Follow-up-Sequenz, Compliance-Check |
| `webinar-deck.html` | Präsentationsfertiges, eigenständiges HTML-Deck (16 Folien, offline, Pfeiltasten-Navigation) — im Browser öffnen |
| `social-assets.html` | Newsletter-Cover + 3 Social-Promo-Karten (Newsletter / Webinar / Checkliste) im gleichen Look |
| `operating-plan-budget-roles.md` | Umsetzungsplan: 3 Betriebsmodelle, Rollen, Tooling mit Budget, Zeitaufwand, Compliance-Gate |
| `tracking-crm-setup.md` | UTM-Schema, HubSpot-Feldschema, Pipeline-Stufen, KPI-Zielwerte, Reporting-Rhythmus |
| `partner-onepager-pitch.md` | One-Pager, Partner-Pitch-Deck-Outline, Firmen-Boilerplate, E-Mail-Signatur |
| `events-pr-partnerships.md` | Event-Landschaft, Teilnahme-Stufen, PR/Thought-Leadership, Partnerschaften, Event-Funnel |

## Grafiken & Vorschauen (Render)
Die `*.html`-Dateien sind die **Single Source of Truth**. PNG-Vorschauen werden daraus
generiert und sind **bewusst nicht eingecheckt** (siehe `.gitignore`), um die History
schlank zu halten.

**So siehst du sie:**
- **Schnell:** `webinar-deck.html` / `social-assets.html` einfach im Browser öffnen.
- **Als Bilder:** mit einem Headless-Browser screenshotten, z. B. (lokal, einmalig):
  ```bash
  npx playwright install chromium
  # Deck-Folien:  open webinar-deck.html, je Folie show(i) aufrufen, screenshot
  # Social-Cards: Element-Screenshot je #id (nl-cover, promo-square, promo-webinar, promo-checklist)
  ```
- **Demo-Werte:** Im Deck die `[…]`-Platzhalter (Datum, Name, KPIs auf Folie 14) direkt
  im HTML ersetzen — eine separate Demo-Datei wird bewusst nicht gepflegt.

## Reihenfolge zum Loslegen
1. **Strategie** lesen → Plattform-Realität & Funnel verstehen.
2. **Profile** aufsetzen (Texte aus `profile-copy-…`), TH muttersprachlich prüfen lassen.
3. **Lead-Magnet** als PDF/Notion umsetzen.
4. **Redaktionsplan** starten (DU postest 4×/Woche + tägl. Engagement-Routine).
5. **Outbound** parallel (Sales Navigator / LINE / E-Mail).

> Hinweis: Im Repo ist ein HubSpot-CRM-Kontext angebunden — eingehende Leads dort taggen
> (UTM + „Wie gefunden?"), um Kanäle nach Lead-Qualität zu steuern.
