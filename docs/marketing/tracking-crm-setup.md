# Tracking & CRM-Setup

> Damit du Kanäle nach **Lead-Qualität** steuerst, nicht nach Bauchgefühl.
> Bezug: Im Repo-Kontext ist HubSpot angebunden — Felder/Pipeline dort anlegen.
> B2B, compliance-first: nur Geschäftsdaten erfassen, kein Patienten-/Gesundheits-PII.

---

## 1. UTM-Schema (einheitlich = auswertbar)

Format: `?utm_source=…&utm_medium=…&utm_campaign=…&utm_content=…`

| Parameter | Werte (kontrolliert halten!) |
|---|---|
| `utm_source` | `linkedin` · `linkedin-dm` · `facebook` · `line` · `newsletter` · `webinar` · `email` |
| `utm_medium` | `organic` · `dm` · `broadcast` · `bio` · `paid-neutral` |
| `utm_campaign` | `corridor-2026q3` · `newsletter-the-compliant-corridor` · `webinar-export-readiness` · `leadmagnet-checklist` |
| `utm_content` | freie Kennung, z. B. `issue-02` · `post-eu-gmp` · `cta-checklist` |

**Beispiel (Newsletter #2 CTA zur Checkliste):**
`cannaworld-thailand.com/import?utm_source=newsletter&utm_medium=organic&utm_campaign=newsletter-the-compliant-corridor&utm_content=issue-02-checklist`

> Regel: **eine** Schreibweise je Wert (klein, mit Bindestrich). Eine Tabelle „erlaubte
> Werte" pflegen, sonst zerfasert die Auswertung.

---

## 2. Lead-Tracking — Feldschema (HubSpot-Kontakt/Deal)

| Feld | Typ | Werte/Notiz |
|---|---|---|
| Rolle | Dropdown | Apotheke · Großhandel · Importeur · Hersteller · QP/Regulatory · Sonstiges |
| Zielmarkt | Dropdown | DE · EU-allg. · IT · andere |
| Lead-Quelle | Dropdown | LinkedIn-organisch · LinkedIn-DM · Newsletter · Webinar · LINE · FB · Empfehlung |
| „Wie gefunden?" | Freitext | im Onboarding/Erstkontakt abfragen (Cross-Check zu UTM) |
| Import-Readiness-Score | Zahl | aus Lead-Magnet-Self-Check (0–7+) |
| Lead-Stufe | Dropdown | MQL → SQL → Discovery → Onboarding |
| Lizenz/Compliance-Status | Dropdown | unbekannt · in Prüfung · EU-GMP belegt · vollständig |
| Einwilligung (Marketing) | Bool + Datum | für LINE/E-Mail-Broadcasts (Opt-in dokumentieren) |

> **Datenschutz:** nur B2B-/Firmendaten; keine Patienten-/Gesundheitsdaten. Einwilligungen
> mit Zeitstempel; Opt-out jederzeit (vgl. Broadcast-Vorlagen in `outbound-templates.md`).

---

## 3. Pipeline-Stufen (Funnel aus der Strategie, operationalisiert)

| Stufe | Definition | Übergangskriterium |
|---|---|---|
| **MQL** | hat Lead-Magnet geladen / Newsletter abonniert / Webinar besucht | Kontaktdaten + Rolle bekannt |
| **SQL** | passt zu ICP (Rolle + Zielmarkt + Import-Absicht) | Rolle qualifiziert, Bedarf erkennbar |
| **Discovery** | Call gebucht/geführt | Termin stattgefunden |
| **Onboarding** | `/import`-Registrierung / Korridor-Bewertung gestartet | Prozess im Gateway angelegt |

---

## 4. KPI-Zielwerte (Start-Benchmarks, konservativ)

> Als Startannahmen zum Steuern — nach 8 Wochen mit echten Zahlen ersetzen.

| Ebene | Kennzahl | Start-Ziel (Monat 1–3) |
|---|---|---|
| Awareness | LinkedIn-Impressions (DU) | 15k–40k/Monat |
| Awareness | Follower-Wachstum (DU) | +150–400/Monat |
| Engagement | Ø Engagement-Rate je Post | 2–5 % |
| Engagement | Newsletter-Abonnenten | +50–150/Monat |
| Lead | Lead-Magnet-Downloads | 20–60/Monat |
| Lead | qualifizierte SQLs | 5–15/Monat |
| Pipeline | Discovery-Calls | 3–8/Monat |
| Pipeline | `/import`-Registrierungen | 1–4/Monat |

---

## 5. Reporting-Rhythmus
- **Wöchentlich (15 Min.):** Was lief, was floppte → nächste Woche justieren.
- **Monatlich:** KPI-Tabelle gegen Ziele; Kanäle nach **SQL-Qualität** gewichten (nicht nach Reichweite).
- **Quartalsweise:** Budget umschichten (siehe `operating-plan-budget-roles.md`), Zielwerte neu kalibrieren.

---

## 6. Minimal-Setup, wenn (noch) kein CRM
Ein Spreadsheet mit Spalten = den Feldern aus §2 + einer UTM-Spalte reicht für den Start.
Eine Quelle der Wahrheit ist wichtiger als das Tool.
