# Vertiefung der Skalierungswege A · B · D · F

> **Status:** Vertiefung zum Konzept (`thailand-gatekeeper-konzept.md`).
> Strategie/Operating-Model, kein Rechtsrat. A, B, D, F sind die **strukturellen
> Skalierungswege** (C Piggyback und E Lighthouse sind taktisch/übergangsweise und
> hier bewusst ausgespart). Zusammenspiel siehe §5.

---

## Weg A — Hub & Spoke (das Rückgrat)

### Grundprinzip
Trenne die **billige, horizontal skalierbare GACP-Schicht** (viele Farmen) von der
**teuren, langsamen GMP-Schicht** (wenige zentrale Werke). Jede Farm ist ein **Spoke**
auf GACP; ein **Hub** trägt EU-GMP für Verarbeitung, QC-Labor und Chargenzertifizierung.

### Warum das der Hebel ist (Ökonomie)
- EU-GMP pro Farm = Jahre + sechsstellige Kosten + Dauer-Compliance-Last → **nicht skalierbar**.
- EU-GMP einmal zentral = eine Investition trägt **20–50+ Farmen**.
- Farmen bleisten nur GACP (Wochen, günstig, via OneCert) → **Onboarding-Geschwindigkeit** entkoppelt von der GMP-Bremse.

### Kapazitäts-/Mengenplanung (Mass Balance)
- Hub-Durchsatz (kg/Monat Verarbeitung + Laborkapazität) ist die **echte Obergrenze** — nicht die Farm-Anzahl.
- Faustregel: erst Hub-Durchsatz fixieren, dann so viele Spokes anbinden, dass der Hub **ausgelastet, nicht überlastet** ist.
- Erntesaisonalität (TH-Klima/Indoor vs. Outdoor) gegen Hub-Gleichlast puffern → Lager-/Trocknungspuffer einplanen.

### Verantwortungs-Schnitt (wer haftet wofür)
| Schicht | Wer | Trägt Verantwortung für |
|---|---|---|
| Spoke (Farm) | Produzent | Anbau, Ernte, Felddoku, GACP-Konformität, Rückverfolgbarkeit |
| Hub | Verarbeiter | Verarbeitung, QC, GMP, Chargenbildung + -doku |
| EU-Freigabe | Importeur/QP | Re-Testing, Chargenzertifizierung, Inverkehrbringen |

Klare **Qualitätssicherungsvereinbarungen (QAA)** an jeder Schnittstelle Spoke↔Hub↔Importeur.

### Resilienz
- **Single Point of Failure:** ein Hub = Klumpenrisiko (Audit-Stopp, Brand, Lizenzentzug → ganze Kette steht).
- Mittelfristig **zweiter Hub** (geografisch/rechtlich getrennt), Spokes dual-anbindbar (`farm_hub_links` erlaubt das im Datenmodell).

### Plattform-Abbildung
`processing_hubs` + `farm_hub_links` + Tier-3-Gate „hub_linked" (siehe `onboarding-datenmodell.md`).

---

## Weg B — Kooperativ-/Cluster-Modell (Mengen-Multiplikator)

### Grundprinzip
Statt jede Klein-Farm einzeln zu zertifizieren: bündele sie zu **Kooperativen** und
nutze **Gruppen-Zertifizierung** mit einem **Internen Kontrollsystem (ICS)** — exakt das
Modell, das im Bio-Bereich Tausende Smallholder unter *ein* Zertifikat bringt. OneCert
kann Gruppen-/ICS-Zertifizierung.

### Wie Gruppen-Zertifizierung funktioniert
1. Die Kooperative betreibt ein **ICS**: eigene interne Inspektoren prüfen **jede** Mitgliedsfarm jährlich gegen die GACP-SOPs.
2. Die externe Stelle (OneCert) **auditiert das ICS** + zieht eine **Stichprobe** der Farmen (Wurzel-aus-N-Logik).
3. Ein **Dach-Zertifikat** deckt die ganze Gruppe → **Dutzende Farmen pro Audit-Zyklus** statt Einzel-Audits.

### Voraussetzungen (sonst kippt das Modell)
- Homogene Mitglieder (ähnliche Größe, Anbau, Risiko) — heterogene Gruppen sind schwer zertifizierbar.
- Funktionierendes ICS: interne Inspektoren, ein **Qualitätsmanager**, gemeinsame SOPs, Sanktionskatalog.
- Lückenlose Mitglieder-/Flächen-/Mengen-Liste (Rückverfolgbarkeit bis zur Einzelfarm).

### Risiken
- **Weakest-Member-Risiko:** ein kontaminierter Betrieb (Pestizid/Schwermetall) kann die Gruppen-Charge gefährden → ICS muss früh aussortieren.
- ICS-Schwäche = Zertifikats-Entzug für die **ganze** Gruppe → Governance ist kritisch.

### Skalierungsmathematik
- Einzel-Audit: 1 Audit ≈ 1 Farm.
- Gruppen-Audit: 1 Audit ≈ ICS + √N Stichprobe → **N Farmen** unter einem Zertifikat. Bei N=49 → ~7 Stichproben-Audits decken 49 Farmen.

### Plattform-Abbildung
`farm_producers.type = cooperative` + `farm_cooperative_members` + ICS-Inspektionen als interne `farm_audits (audit_type = pre_audit, partner = internal)`.

---

## Weg D — Tiered Digital Onboarding-Funnel (Plattform-Hebel)

### Grundprinzip
Die App **ist** der Akquise- und Qualifizierungsmotor. Mach den Eintritt fast reibungslos
(viel Top-of-Funnel) und **gate** die teuren Schritte (physisches Audit) erst spät — so
qualifizierst du viele früh und investierst Audit-Geld nur in die, die durchkommen.

### Funnel-Stufen & Konversion
```
Tier 0 registriert    →  Tier 1 GACP-ready      →  Tier 2 GACP-zertifiziert  →  Tier 3 Hub-linked
viel Volumen,             Self-Assessment +          externes Audit              an Hub gekoppelt,
fast frei                 Remote-Pre-Audit           (OneCert) — teuer            EU-fähig
```
- **Tier 0→1 vollautomatisch:** Self-Assessment-Fragebogen → Score; Remote-Pre-Audit (Doku/Fotos/Video) → „passed/conditional/failed". Kein Außendienst nötig → **Tausende parallel** möglich.
- **Erst Tier 1→2 kostet** physisches Audit → nur auf Vorqualifizierte angewendet (Audit-Budget gezielt).

### Warum das Volumen bringt
- Entkoppelt **Reichweite** (digital, grenzenlos) von **Audit-Kapazität** (knapp, teuer).
- Der Funnel **priorisiert automatisch**: schwache Kandidaten fallen vor dem teuren Schritt raus.
- Self-Assessment erzeugt nebenbei das **Dossier** (Daten/Doku liegen schon strukturiert vor).

### Steuerungs-KPIs
- Konversion je Stufe (0→1, 1→2, 2→3), Pre-Audit-Pass-Rate, Time-to-Tier-2, Audit-Kosten je zertifizierter Farm, Funnel-Velocity (Farmen/Monat in Tier 2).

### Verbindung zu A/B/F
Der Funnel ist die **Eingangsschicht** für alle drei: aus Tier-1-Kandidaten formst du
**Cluster (B)** oder hängst sie unter eine **Master-Lizenz (F)**, dann an den **Hub (A)**.

### Plattform-Abbildung
Onboarding-Wizard (`src/components/onboarding/`) + `farm_onboarding_events` (Audit-Trail) + server-enforced Tier-Übergänge (`thailand-farm-tier-transition`).

---

## Weg F — Master-Lizenz / Vertragsanbau-Umbrella

### Grundprinzip
Ein **Master-Operator** (Inhaber von GACP-**und** EU-GMP-Qualitätssystem) nimmt Farmen als
**vertraglich gebundene Anbaustandorte unter sein eigenes QMS**. Die Farmen zertifizieren
sich **nicht selbst** — sie operieren unter dem **Dach-Zertifikat/Lizenz des Masters** und
bauen exakt nach dessen SOPs an (Contract Cultivation).

### Unterschied zu Weg B (wichtig — oft verwechselt)
| | **Weg B — Kooperative** | **Weg F — Vertragsanbau-Umbrella** |
|---|---|---|
| Struktur | horizontal: Farmen = Peers in eigener Genossenschaft | vertikal: Farmen = Auftrags-Standorte des Masters |
| Zertifikat | Gruppen-Zertifikat der Kooperative (ICS) | Master-Lizenz/QMS deckt die Standorte ab |
| Kontrolle | ICS der Kooperative | QMS + Audit des Masters |
| Eigenständigkeit Farm | hoch | gering (folgt Master-SOPs) |
| Schnellster bei | vielen homogenen Smallholdern | wenigen, eng führbaren Vertragsfarmen mit GMP-Nähe |

### Wann F statt B
- Wenn der **Master schon EU-GMP-nah** ist → Farmen erben die Vertrauensschicht **direkt**, ohne eigenen Zertifizierungsweg.
- Wenn **enge Prozesskontrolle** nötig ist (z. B. pharmazeutischer Chemotyp-Korridor, strikte SOP-Treue).
- Wenn Farmen zu klein/unstrukturiert für ein eigenes ICS sind.

### Vertrags-/Haftungsstruktur
- **Cultivation Agreement** + **QAA**: Master gibt SOPs, Saatgut/Genetik, Schulung, Inputs vor; Farm liefert exklusiv an den Master.
- Haftung/Qualitätsverantwortung liegt stärker beim **Master** (er „besitzt" das QMS) → höhere Kontrolle, aber auch höheres Master-Risiko.
- Audit: Master-interne Audits + externe Audits des Masters (TÜV/OneCert) decken die Standorte mit ab.

### CannaWorld-Rolle hier
CannaWorld kann **selbst der Master werden** (sobald eigene Lizenz/QMS steht — Phase 3) oder
zunächst einen bestehenden Master-Operator als **Partner** einsetzen (analog Weg C, aber für Anbau).

### Plattform-Abbildung
`farm_producers` mit Verweis auf Master-QMS/`processing_hub`; SOP-Pack-Versionierung im Dossier; `exclusivity = exclusive`.

---

## §5 — Wie A · B · D · F zu *einem* Operating-Model zusammengreifen

```
                 ┌─────────────────────────────────────────────┐
   D  FUNNEL ───▶│  viele Kandidaten digital qualifizieren     │  (Eingang, Volumen)
                 └───────────────┬─────────────────────────────┘
                                 │  Tier-1-Kandidaten formen zu …
              ┌──────────────────┴───────────────────┐
   B  CLUSTER │ horizontale Genossenschaften (ICS)    │   F  UMBRELLA  │ vertikale Vertragsfarmen
              │ Gruppen-Zertifikat                    │                │ unter Master-QMS/Lizenz
              └──────────────────┬───────────────────┘                │
                                 ▼                                     ▼
                 ┌─────────────────────────────────────────────┐
   A  HUB ──────▶│  zentrales EU-GMP-Werk: Verarbeitung/QC/     │  (Rückgrat, Türöffner)
                 │  Chargenfreigabe → EU-Importeur/QP           │
                 └─────────────────────────────────────────────┘
```

- **D** ist der **Trichter** (Reichweite ohne Audit-Kosten-Explosion).
- **B** und **F** sind **zwei Onboarding-Formen** für dieselbe Pipeline: horizontal (Genossenschaft) vs. vertikal (Vertragsanbau) — je nach Farm-Typ wählbar, **parallel** nutzbar.
- **A** ist das **gemeinsame Rückgrat**: alles fließt in den GMP-Hub, der die EU-Tür öffnet.

**Operative Empfehlung:** D dauerhaft als Motor laufen lassen; pro Region zwischen B und F
entscheiden (homogene Smallholder → B, eng führbare/GMP-nahe Farmen → F); A so dimensionieren,
dass der Hub-Durchsatz die anvisierte Farm-Menge real verarbeiten kann (Mass-Balance zuerst).
