# Konzept: Thailand → EU als Gatekeeper

> **Status:** Strategie-Entwurf / Diskussionsgrundlage. Kein Rechtsrat.
> Vor Umsetzung anwaltliche und regulatorische Prüfung in **beiden** Jurisdiktionen
> (Thailand + DE/EU) einholen. B2B-only, compliance-first — keine Verbraucher-,
> Heilungs- oder Wirkversprechen in der Außendarstellung.
> **Stand:** 2026-06
>
> **Validierung:** Die harten regulatorischen Aussagen wurden über einen Multi-Quellen-
> Deep-Research-Lauf gegengeprüft — siehe `quellen-validierung.md` (Verdikte + Quellen).
> Inline-Marker: ✅ belegt · 🟡 belegt mit Nuance · ⚠️ Annahme/Extrapolation · ⛔ anwaltlich
> zu klären. Methodik-Vorbehalt: Belege aus quergeprüften Such-Auszügen der Primärquellen
> (direkter Seitenabruf war geblockt) — Statut-Wortlaute hochkonfident, nicht verbatim.

---

## 1. Das Ziel in einem Satz

CannaWorld wird die **qualifizierende Schleuse („Gatekeeper")** zwischen thailändischen
Cannabis-Farmen/Produzenten und dem EU-Medizinalmarkt: wir bündeln die Nachfrage (Apotheken,
Großhändler, Importeure in DE/EU), prüfen Herkunft + Qualität + Dokumentation und lassen
**nur konforme Ware** durch die regulatorische Tür.

Wichtig: Gatekeeper heißt **Orchestrierung + Qualifizierung + Vertrauensschicht** — nicht
„wir machen alles selbst". Die formale Akkreditierung (Audit, Zertifikat, Batch-Freigabe)
borgen wir uns am Anfang von Partnern (OneCert, TÜV, EU-GMP-Importeur) und ziehen sie
schrittweise ins eigene Haus.

---

## 2. Die regulatorische Realität — warum „nur Thai GACP" die EU-Tür nicht öffnet

Das ist der zentrale Denkfehler, den wir vermeiden müssen. Medizinal-Cannabis kommt als
**pharmazeutischer Wirkstoff / Herbal Drug** in die EU. Die Wertschöpfungskette hat zwei
getrennte Qualitäts-Layer:

| Stufe | Tätigkeit | Geforderter Standard | Wer trägt die Last |
|---|---|---|---|
| **Anbau & Ernte** ✅ | Aussaat, Kultivierung, Ernte, Trocknung (Feld) | **GACP** (EMA/HMPC, EMEA/HMPC/246816/2005 Rev.1) — *hier passt Thai GACP als Basis* | Farm |
| **Verarbeitung & Freigabe** ✅ | Trimmen, Bestrahlung, Mahlen, QC-Labor, Verpackung, Chargenzertifizierung | **EU-GMP** (EudraLex Annex 7; Part II Wirkstoff) | Zentrales Verarbeitungs-/QC-Werk |
| **EU-Import & Marktfreigabe** ✅ | Einfuhr, Re-Testing, Chargenfreigabe durch **QP** | **MIA + QP** (RL 2001/83/EG; Annex 16: Voll-Re-Test mangels MRA) | EU-Importeur |
| **Export-/Einfuhr-Kontrolle** 🟡 | Export-/Import-Genehmigungen | TH: **geschichtet** — Blüte über DTAM (Section 46) + Thai FDA, Extrakte >0,2 % THC über FDA/ONCB ↔ DE: **BfArM** Einfuhrerlaubnis (§§12/14 MedCanG, Verfahren via BtMAHV) | beide Seiten |

> 🟡 **Thailand-Status aktualisiert (Stand 06/2026):** Cannabis wurde 2022 von der Narkotika-Liste
> gestrichen (Extrakte >0,2 % THC bleiben kontrolliert), **seit 25.06.2025** ist die Blüte aber
> ein **„controlled herb"** unter dem Thai-Traditional-Medicine-Act → **verschreibungspflichtig,
> medizinisch-only**. Export bleibt **lizenziert für medizinisch/wissenschaftlich** zulässig
> (Ministerialverordnung 30.04.2026). Detail + Quellen: `quellen-validierung.md` §2.

**Konsequenz für die Strategie:**
- **Thai GACP** 🟡 (vom *Department of Thai Traditional and Alternative Medicine*, DTAM — DTAM
  **erkennt Äquivalente an**: Organic Thailand, EU-GMP, GLOBAL GAP, IFOAM, DOA-Herbal-GAP) bringt
  uns die **Anbaustufe** sauber und ist **schnell + günstig skalierbar** → genau das richtige
  Werkzeug, um *viele Farmen schnell* an Bord zu holen.
- Aber Thai GACP ≠ EU-GMP ✅. Die EU-Tür öffnet erst die **GMP-Schicht** (Verarbeitung/Freigabe)
  + **QP-Chargenfreigabe** in der EU. Das ist teuer und langsam — also **zentralisieren** wir
  sie, statt sie jeder Farm aufzubürden.
- ⚠️ **Realer Engpass:** Ende 2025 gab es in TH nur **~149 GACP-zertifizierte Farmen** (bei
  ~11.800 Lizenznehmern). „Viele Farmen schnell" heißt daher v. a. **GACP-Zertifizierung
  beschleunigen**, nicht nur registrieren.

→ **Das ist der Hebel des gesamten Konzepts** (siehe Weg A, Hub-&-Spoke).

---

## 3. Die Gatekeeper-Rolle — was wir *sind* (und was nicht)

CannaWorld ist **nicht** (am Anfang) die akkreditierte Zertifizierungs- oder Inspektionsstelle.
Wir sind:

1. **Nachfrage-Aggregator** — wir bringen die EU-Käufer (das tut diese Plattform bereits für DE).
2. **Compliance-Dossier-Manager** — wir sammeln, prüfen und versionieren die Dokumente jeder
   Farm/Charge (GACP-Zertifikat, CoA, Pestizid-/Schwermetall-/Mikrobiologie-Reports,
   Export-Permits). *Das ist exakt das, was die Plattform technisch schon kann.*
3. **Qualifizierungs-Schleuse** — standardisiertes Onboarding, Pre-Audit, Tier-Einstufung.
4. **Vertrauens-Broker** — wir koppeln die formale Akkreditierung von OneCert/TÜV/QP an.

Was wir **nicht** behaupten dürfen, bevor wir es sind: „akkreditiert", „GMP-zertifiziert",
„zugelassen". Bis dahin gilt: *„qualifiziert in Partnerschaft mit OneCert/TÜV"*.

---

## 4. Partner-Architektur (vor eigener Akkreditierung)

Drei Vertrauens-Layer, die wir uns am Anfang einkaufen und später internalisieren:

### 4.1 OneCert — der Agrar-/GACP-Layer (schnell, on-the-ground in Asien)
- Stärke 🟡: **Bio-Zertifizierung** (USDA-NOP, NPOP, JAS) ✅, **GACP** (WHO-GACP, Heil-/Aromapflanzen) ✅
  und **Gruppen-/Cluster-Zertifizierung mit ICS** ✅ (zertifiziert lt. eigener Angabe 24 Grower
  Groups außerhalb Indiens). Sitz Jaipur/Indien; ⚠️ Südostasien-Präsenz nicht separat belegt,
  ⚠️ **cannabis-spezifisches** GACP nicht explizit ausgewiesen (vorab anfragen).
- Rolle bei uns: **Farm-Level-Audits + GACP/Bio-Zertifikate**, vor allem die
  **Gruppen-Zertifizierung** für Kooperativen (→ viele Farmen mit *einem* Dach-Audit).
- Warum zuerst: günstig, schnell, skaliert horizontal über viele Farmen.

### 4.2 TÜV (SÜD) + cannabis-spezifische Zertifizierer — der Pharma-/GMP-Layer
- TÜV SÜD ✅: belegt **Pharma-GMP-Audits + Lieferanten-Qualifizierung** — ein Name, dem EU-Apotheken
  & Großhändler vertrauen. ⚠️ **GACP-(Cannabis-)Audits sind für TÜV nicht belegt.**
- 🟡 **Korrektur:** Die etablierten **cannabis-spezifischen GACP/GMP-Zertifizierer sind
  SGS, Control Union (CUMCS) und Q-Cert** — TÜV ist es nach aktueller Recherche *nicht*. Für den
  GACP-Audit-Layer also **SGS/Control Union als primäre Kandidaten** prüfen; TÜV für GMP-Readiness/
  Werks-Qualifizierung des Hubs.
- Rolle bei uns: **Audit & Qualifizierung des zentralen Verarbeitungs-/QC-Werks (Hub)**,
  GMP-Gap-Assessments, Begleitung Richtung EU-GMP-Zertifikat.

### 4.3 EU-GMP-Importeur mit QP — der Marktzugangs-Layer (sofortiger Türöffner)
- Ein bestehender deutscher **MIA-/QP-Inhaber** macht die **Chargenfreigabe in der EU**,
  während wir unsere eigene Einfuhrerlaubnis aufbauen.
- Rolle: *Wir liefern Supply + Dossier, er liefert die Lizenz.* Schnellster Weg zu erstem Umsatz.

### 4.4 Akkreditierungs-Fahrplan (Internalisierung)
```
Phase 1  Partner-getragen      OneCert (GACP) + TÜV (GMP-Audit) + Fremd-MIA/QP (Freigabe)
Phase 2  Eigene Konformitäts-  CannaWorld als Conformity-Assessment-/Plattform-Layer,
         bewertung             eigenes QMS, eigene SOP-Bibliothek, Auditoren-Pool
Phase 3  Eigene Lizenz         Eigene EU-Einfuhr-/Großhandelserlaubnis + eigene QP,
                               ggf. ISO 17065-Pfad für eigene Konformitätsbewertung
```

---

## 5. Mehrere Wege zum Ziel „viele Farmen in kurzer Zeit"

Nicht *ein* Weg — ein **Portfolio**. Empfehlung: **A + B + C parallel** fahren.

### ⭐ Weg A — Hub & Spoke (das Rückgrat, klar empfohlen)
- Viele Farmen = **GACP-Spokes** (Thai GACP + ggf. Bio über OneCert).
- **Ein** (später wenige) **EU-GMP-zertifiziertes zentrales Verarbeitungs-/QC-/Freigabe-Werk** = Hub.
- Farmen brauchen **kein** eigenes GMP → Onboarding in Wochen statt Jahren.
- Die teure, langsame GMP-Last trägt nur der Hub.
- **Skalierung:** 20–50 Farmen auf GACP in wenigen Monaten realistisch, ein GMP-Hub trägt sie alle.

### Weg B — Kooperativ-/Cluster-Modell (Mengen-Multiplikator)
- Smallholder-Farmen zu **Kooperativen** bündeln: gemeinsame SOPs, ein Qualitätsmanager,
  **Gruppen-Zertifizierung** (wie bei Bio-Gruppenzertifikaten) über OneCert.
- Ein Dach-Audit deckt einen ganzen Cluster ab → Dutzende Farmen pro Audit-Zyklus.
- Passt kulturell/strukturell zur thailändischen Klein-Farm-Landschaft.
- ⚠️ **Kritische Annahme (vor Skalierung verbindlich klären):** Gruppen-/ICS-Zertifizierung ist
  **für Bio formal etabliert** (IFOAM, EU-Öko-VO 2018/848, √N-Stichprobe), aber eine formale
  **ICS-Gruppenroute für Medizinal-Cannabis-GACP ist nicht dokumentiert** — GACP-Cannabis wird
  bislang **per Standort** zertifiziert. Weg B steht und fällt damit: vorab mit Zertifizierer
  (OneCert / Control Union) klären, ob Gruppen-GACP für Cannabis akzeptiert wird. Sonst Fallback
  auf Weg F (Master-Umbrella) oder Einzel-GACP.

### Weg C — Piggyback auf bestehenden EU-GMP-Importeur (Time-to-Market)
- Partner-MIA/QP macht heute schon Freigabe → **erster Umsatz, während** A/B aufgebaut werden.
- Risiko niedrig, Investition niedrig, Lernkurve sofort.

### Weg D — Tiered Digital Onboarding-Funnel (Plattform-Hebel)
- Genau das, was diese App kann: Self-Assessment → Remote-Pre-Audit → physisches Audit.
- **Tier 0** registriert · **Tier 1** GACP-ready · **Tier 2** GACP-zertifiziert · **Tier 3** GMP-Hub-angebunden.
- Viele Farmen treten **sofort** auf Tier 0/1 ein und werden „hochgezüchtet" → großes Funnel-Volumen früh.

### Weg E — Lighthouse-/Anchor-Farm (Blueprint-Replikation)
- 1–2 Vorzeige-Farmen vollständig EU-konform aufstellen als **Proof + Vorlage**.
- Dann **exakt denselben SOP-/Trainings-/Dossier-Pack** über alle weiteren Farmen ausrollen.
- Geschwindigkeit durch **Standardisierung statt Einzelfall**.

### Weg F — Master-Lizenz / Vertragsanbau-Umbrella
- Ein Master-EU-GMP-Operator nimmt Farmen als **Anbaustandorte unter sein QMS** (Contract Cultivation).
- Farmen operieren unter dem GACP/GMP-Dach des Masters statt einzeln zu zertifizieren.

**Empfohlene Kombination:** **A** (Architektur) + **B** (Mengen) + **C** (Sofort-Marktzugang),
getragen über **D** (Plattform-Funnel), validiert durch **E** (Lighthouse).

---

## 6. Phasen-Roadmap

| Phase | Zeitfenster | Meilensteine |
|---|---|---|
| **0 — Setup** | M0–M2 | Gatekeeper-Entity + Rollen geklärt; MoUs mit OneCert + TÜV (Vorlagen in `vorlagen/`); Ziel-Hub-Werk identifiziert; Rechts-/Regulatory-Check TH + DE. |
| **1 — Lighthouse** | M2–M6 | 1–2 Anchor-Farmen auf Thai GACP (OneCert); Hub-GMP-Gap-Audit (TÜV); Fremd-MIA/QP-Partner (Weg C) für erste Charge; Export-/Einfuhr-Permits (ONCB ↔ BfArM). |
| **2 — Skalierung** | M6–M14 | Cluster-/Gruppen-Onboarding (Weg B) über Plattform-Funnel (Weg D); Hub Richtung EU-GMP-Zertifikat; SOP-Pack-Replikation (Weg E). |
| **3 — Internalisierung** | M14+ | Eigene Einfuhr-/Großhandelserlaubnis + eigene QP; eigenes QMS/Auditoren-Pool; Partner werden Backup statt Pflicht. |

---

## 7. MoU-Strategie (die Dateien auf dem Rechner)

Zwei Vorlagen liegen unter `docs/strategie/vorlagen/`:

1. **`mou-zertifizierungspartner-vorlage.md`** — für **OneCert** und **TÜV**.
   Rahmen: nicht-bindende Absichtserklärung, Rollenabgrenzung (wer auditiert was), Pilotumfang,
   Exklusivität/Gebietsfragen, Datenfluss in die Plattform, Übergang zur eigenen Akkreditierung.
2. **`mou-farm-onboarding-vorlage.md`** — für **Thai-Farmen / Kooperativen**.
   Rahmen: Liefer-/Qualitätsabsicht, GACP-Verpflichtung, Dokumentenpflichten, Audit-Zustimmung,
   Tier-Einstufung, Exklusivität/Abnahme, Compliance-Klauseln (kein Verbraucher, kein THC-Missbrauch).

> MoUs sind **Absichtserklärungen, nicht bindend** — der bindende Teil kommt später in
> Liefer-/Audit-/Qualitätssicherungsverträgen (QAA). Beide Vorlagen sind bewusst als Gerüst
> mit `[Platzhaltern]` gehalten und vor Versand anwaltlich zu prüfen.

---

## 8. Risiken & rote Linien

- **Standard-Verwechslung:** Thai GACP ≠ EU-GMP nicht verschleiern — sonst Glaubwürdigkeits-
  und Haftungsrisiko gegenüber EU-Käufern. Immer transparent kommunizieren, welcher Layer
  von wem getragen wird.
- **Export-/Einfuhr-Recht 🟡:** TH-Exportlizenz **geschichtet** (Blüte: DTAM/Section 46 + Thai FDA;
  Extrakte >0,2 % THC: FDA/ONCB, ausländische Firmen ausgeschlossen) + deutsche Einfuhrerlaubnis
  (BfArM, §§12/14 MedCanG via BtMAHV) sind **harte Tür-Voraussetzungen**. DE-Erlaubnis-Stack:
  §4 MedCanG + §52a/§72/§13 AMG + DAB-Cannabisblüten-Monographie. ⛔ Welche TH-Behörde die
  Exportlizenz *formal* ausstellt (DTAM vs. FDA), ist quellenuneinheitlich — anwaltlich klären.
- **Regulatorische Volatilität (neu, wichtig):**
  - **TH:** kein einheitliches Cannabis-Gesetz; Regime = Ministerialverordnungen, Blüte seit
    06/2025 verschreibungspflichtig/medizinisch-only → Verträge **mit Regulatory-Change-Klausel**.
  - **DE:** Kabinettsentwurf 08/2025 verschärft (Arzt-Präsenzpflicht, **Versandhandelsverbot für
    Blüten**) — bleibt im MedCanG, Stand 06/2026 noch nicht in Kraft, aber im Verfahren beobachten.
- **Bestrahlung & Re-Testing ✅:** QP-Chargenfreigabe in der EU verlangt Identitäts-/Voll-Retest
  (Annex 16, mangels MRA); Bestrahlungsakzeptanz vorab klären.
- **Marketing-Compliance:** B2B-only, keine Heil-/Wirkversprechen, keine Sortenwerbung
  (deckt sich mit `CLAUDE.md`-Vorgaben dieses Repos).
- **Datenschutz/RLS:** Farm- und Charge-Dossiers laufen über die geteilte Supabase-Plattform —
  RLS/Rollen respektieren, keine Service-Role-Keys im Browser, keine PII in Logs.
- **Über-Abhängigkeit von einem Hub:** Single Point of Failure → mittelfristig zweiter GMP-Hub.

---

## 9. Andockpunkt an diese Plattform

Das Konzept ist nicht nur Papier — es bildet sich technisch in dieser App ab:
- **Onboarding-Wizard** (`src/components/onboarding/`) → Tier-Funnel (Weg D).
- **Dokumente / Batches / Compliance / Audit Passport** Module → Compliance-Dossier-Manager (§3.2).
- **Target-Market-/Marketplace-SDK** (`vendor/cannaworld-sdk`) → Nachfrage-Aggregation.
- **`germany_*`-Tabellen + Edge Functions** → Erweiterung um `thailand_*`/`farm_*`-Onboarding-
  und Audit-Status, sobald der Datenfluss steht (separater Implementierungs-Task).

---

*Nächster konkreter Schritt:* MoU-Vorlagen mit echten Ansprechpartnern bei OneCert und TÜV
befüllen, Ziel-Hub-Werk auswählen, Pilot-Farmen für die Lighthouse-Phase benennen.
