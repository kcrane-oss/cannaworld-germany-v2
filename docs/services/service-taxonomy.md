# CannaWorld – Service-Taxonomie (gegliederte Übersicht)

> Discovery-Artefakt, Stand 2026-06-06. Generiert aus `master-service-register.csv`.
> **Keine Pakete, keine Preise, keine Tiers** — reine Service-Discovery über alle CannaWorld-Verticals,
> die CannaWorld×AIHF-Integration, Code, Drive/Framework, Gmail, HubSpot und Kalender.
> Jeder Eintrag ist im Master-Register mit Beleg-Quelle und `[BELEGT]`/`[ANNAHME]`-Flag hinterlegt.

**Gesamt: 679 Services.**

## Kennzahlen

| Dimension | Verteilung |
|---|---|
| **Status** | BELEGT 644 · ANNAHME 35 |
| **Reifegrad** | live 428 · im-Code 132 · Konzept 104 · Idee 15 |
| **Delivery** | automatisiert 413 · menschlich 171 · AI-gestützt 77 · Durchlauf-extern 18 |
| **AIHF-Bezug** | ja 17 · nein 662 |

## Domänen-Index (Service-Zählung je Domäne)

| # | Domäne | Services |
|---|---|---:|
| 1 | Quality/GxP | 94 |
| 2 | Regulatory | 78 |
| 3 | Platform/Identity | 78 |
| 4 | Trust/Audit | 73 |
| 5 | Trade | 65 |
| 6 | Data/AI | 39 |
| 7 | Education | 30 |
| 8 | Logistics | 30 |
| 9 | Support/BackOffice | 30 |
| 10 | Documents | 25 |
| 11 | Cultivation | 25 |
| 12 | Facility | 25 |
| 13 | Billing | 25 |
| 14 | Pharmacy | 16 |
| 15 | Advisory | 15 |
| 16 | Marketing/GTM | 15 |
| 17 | Federation/Partnership | 11 |
| 18 | Sourcing | 5 |
| | **Summe** | **679** |

## CannaWorld-Teil (Vertical)

| Teil | Services |
|---|---:|
| Gateway | 245 |
| AICert | 141 |
| Marketplace | 115 |
| übergreifend | 76 |
| Germany | 46 |
| Europe | 37 |
| AIHF | 16 |
| AICert/Marketplace | 2 |
| Germany/Europe | 1 |

---

## Taxonomie: Domäne → CannaWorld-Teil → Service

### Quality/GxP  ·  94 Services

**Gateway** (38)

- `CAT-02` **GACP Readiness Audit (Katalog-Kernleistung)** — Farm · AI-gestützt · Konzept · ≈ANNAHME
- `CAT-12` **Extraktions-Prozess-Service** — Processor/Hersteller · menschlich · Konzept · ≈ANNAHME
- `CUST-06` **Batch-Snapshot-Abruf** — Exporteur/Importeur · automatisiert · live · ✓BELEGT
- `DR-001` **GACP Readiness Preparation Program — M1: Initial Inspection, Diagnostic & Gap Assessment** — Thai cannabis cultivator / operator · menschlich · Konzept · ✓BELEGT
- `DR-002` **GACP Readiness Preparation Program — M2: Digital Infrastructure & Hygiene/SOP Awareness** — Thai cannabis cultivator / operator · menschlich · Konzept · ✓BELEGT
- `DR-003` **GACP Readiness Preparation Program — M3: SOP, Records, Traceability & Documentation Logic** — Thai cannabis cultivator / operator · menschlich · Konzept · ✓BELEGT
- `DR-004` **GACP Readiness Preparation Program — M4: Mock Audit & Deficiency List** — Thai cannabis cultivator / operator · menschlich · Konzept · ✓BELEGT
- `DR-038` **Batch / Lot Compliance Review — per batch** — Thai cannabis supplier / EU buyer · menschlich · Konzept · ✓BELEGT
- `DR-039` **COA & Laboratory Coordination — per sample/batch** — Thai cannabis supplier · menschlich · Konzept · ✓BELEGT
- `DR-041` **Deviation & CAPA Management — per case** — Thai cannabis supplier · menschlich · Konzept · ✓BELEGT
- `DR-042` **Complaint Handling Procedure Setup** — Thai cannabis supplier · menschlich · Konzept · ✓BELEGT
- `DR-052` **Custom SOP Library Creation** — Thai cannabis operator · menschlich · Konzept · ✓BELEGT
- `DR-054` **Retroactive Record Cleanup** — Thai cannabis operator · menschlich · Konzept · ✓BELEGT
- `DR-065` **Compliance Management Retainer (monthly)** — Thai cannabis supplier · menschlich · Konzept · ✓BELEGT
- `DR-072` **EU-GACP Upgrade Pathway** — Thai cannabis farm with Thai GACP status · menschlich · Idee · ≈ANNAHME
- `GW-004` **AI Batch Analyse (Submit)** — Exporter, Farm · AI-gestützt · live · ✓BELEGT
- `GW-005` **AI Batch Analyse (Dokument OCR/Extraktion)** — Exporter, Farm · AI-gestützt · live · ✓BELEGT
- `GW-024` **CAPA Tracker** — Auditor, Inspector, Farm, Exporter · automatisiert · live · ✓BELEGT
- `GW-025` **CAPA / RCA KI-Analyse** — QA-Manager, Auditor · AI-gestützt · live · ✓BELEGT
- `GW-026` **Abweichungs-Management (Deviation)** — QA-Manager, Farm, Exporter · automatisiert · live · ✓BELEGT
- `GW-029` **QP Release Dashboard (Übersicht)** — Admin, Auditor, Inspector · automatisiert · live · ✓BELEGT
- `GW-030` **QP Release DTrust (eIDAS QES)** — EU QP · automatisiert · im-Code · ✓BELEGT
- `GW-031` **QP Release DocuSign** — EU QP, Admin · automatisiert · im-Code · ✓BELEGT
- `GW-033` **Post-Harvest Operation öffnen (EU GMP)** — EU GMP Production Manager · automatisiert · live · ✓BELEGT
- `GW-034` **Post-Harvest Operation abschließen (EU GMP)** — EU GMP QA Manager · automatisiert · live · ✓BELEGT
- `GW-035` **Post-Harvest Services Dashboard** — Exporter, Auditor, Farm · automatisiert · live · ✓BELEGT
- `GW-037` **CoA Panel-Validator** — Lab, QA · automatisiert · live · ✓BELEGT
- `GW-038` **LIMS Integration (Proxy)** — Lab, QA · automatisiert · live · ✓BELEGT
- `GW-039` **LIMS Webhook – Labor-Ergebnis-Eingang** — Lab-System · automatisiert · live · ✓BELEGT
- `GW-040` **LIMS Lab Dashboard** — Lab Provider · automatisiert · live · ✓BELEGT
- `GW-041` **LIMS Integration Dashboard** — Admin, Lab Provider · automatisiert · live · ✓BELEGT
- `GW-052` **GS1 GTIN-Validierung und -Generierung** — Exporter, Logistics, Warehouse · automatisiert · live · ✓BELEGT
- `GW-053` **GS1 Management Dashboard** — Exporter, Warehouse · automatisiert · live · ✓BELEGT
- `HS-01` **GACP-Konformitätsberatung Thailand** — Thai Cannabis Cultivator · menschlich · im-Code · ✓BELEGT
- `HS-02` **Cannabis-Laboranalyse & COA-Ausstellung Thailand** — Thai Cultivator / Exporter · Durchlauf-extern · live · ✓BELEGT
- `HS-25` **Cannabis-Gammabestrahlung Thailand (TINT)** — Thai Cannabis Exporter · Durchlauf-extern · im-Code · ✓BELEGT
- `ST-02` **Kooperativ-/Cluster-Zertifizierung (ICS-Gruppenmodell)** — Farm-Kooperative · menschlich · Konzept · ✓BELEGT
- `ST-09` **GACP-Partner-Orchestrierung (OneCert-Layer)** — Farm/Kooperative · Durchlauf-extern · Konzept · ✓BELEGT

**Marketplace** (12)

- `DR-018` **Supplier Onboarding & Initial Qualification** — Thai cannabis supplier seeking B2B marketplace access · menschlich · Konzept · ✓BELEGT
- `GE-QUA-03` **Batch-Provenance/Herkunftslinks** — Farm/Hersteller · automatisiert · im-Code · ✓BELEGT
- `MP-001` **ShinrAi Batch-Analyse (Dokument-Upload)** — Exporter · AI-gestützt · live · ✓BELEGT
- `MP-007` **Compliance Score API** — Exporter/Partner-Systeme · automatisiert · live · ✓BELEGT
- `MP-015` **Qualitäts-Prognose (Shelf Life)** — Exporter/Importer · AI-gestützt · live · ✓BELEGT
- `MP-029` **Dokument-Ablauf-Monitor** — Exporter/Admin · automatisiert · live · ✓BELEGT
- `MP-056` **Supplier-Case-Files (Compliance-Profile)** — Admin/Exporter · menschlich · live · ✓BELEGT
- `MP-057` **Post-Harvest-Services (5 Dienste)** — Exporter · menschlich · live · ✓BELEGT
- `MP-059` **Compliance-Dashboard** — Exporter · automatisiert · live · ✓BELEGT
- `MP-060` **Compliance-Reports (PDF-Export-Paket)** — Exporter/Importer · menschlich · im-Code · ✓BELEGT
- `MP-069` **Batch-Detail (Exporter-Ansicht)** — Exporter · automatisiert · live · ✓BELEGT
- `MP-078` **Abweichungs-Management / CAPA** — Exporter (QA) · menschlich · im-Code · ✓BELEGT

**AICert** (27)

- `AC-001` **ShinrAi Export-Validierung** — Exporteur/Facility · AI-gestützt · live · ✓BELEGT
- `AC-005` **CAPA-AI Engine** — QA-Manager / CAPA-Owner · AI-gestützt · live · ✓BELEGT
- `AC-017` **LIMS Integration (CoA-Parse & QP-Release)** — Laborleiter / QP · AI-gestützt · live · ✓BELEGT
- `AC-018` **LIMS Webhook Empfang** — LIMS-System (extern) · automatisiert · live · ✓BELEGT
- `AC-026` **Sample Tracking Lifecycle** — Labor / QC-Manager · automatisiert · live · ✓BELEGT
- `AC-031` **Zertifikat-Ablauf-Check** — QA-Manager / Admin · automatisiert · live · ✓BELEGT
- `AC-063` **CAPA Tracker** — QA-Manager / CAPA-Owner · automatisiert · live · ✓BELEGT
- `AC-064` **Deviations Management** — QA-Manager · automatisiert · live · ✓BELEGT
- `AC-067` **Batch Traceability** — QA-Manager / Exporteur · automatisiert · live · ✓BELEGT
- `AC-070` **Change Control** — QA-Manager / Change Control Board · menschlich · live · ✓BELEGT
- `AC-071` **Complaint Management** — QA-Manager / Customer Service · menschlich · live · ✓BELEGT
- `AC-075` **Labor Dashboard (LIMS + CoA + QP-Freigabe)** — Laborleiter / QP · automatisiert · live · ✓BELEGT
- `AC-076` **Calibration Tracker** — QC / Facility-Manager · automatisiert · live · ✓BELEGT
- `AC-077` **Stability Studies** — QA-Manager / Regulatory Affairs · menschlich · live · ✓BELEGT
- `AC-078` **Cleaning Validation** — QA-Manager / Facility · menschlich · live · ✓BELEGT
- `AC-079` **Validation Master Plan (VMP)** — QA-Manager / Regulatory Affairs · menschlich · live · ✓BELEGT
- `AC-080` **APQR (Annual Product Quality Review)** — QP / QA-Manager · menschlich · live · ✓BELEGT
- `AC-081` **Management Review** — QP / Management · menschlich · live · ✓BELEGT
- `CA-03` **GMP-Check / GMP-Readiness-Bewertung** — Farm · menschlich · live · ✓BELEGT
- `CA-08` **Thailand-GMP-Zertifizierungs-Consulting (Drittmarkt)** — Partner · menschlich · im-Code · ✓BELEGT
- `CAT-01` **GMP Compliance Audit (Katalog-Kernleistung)** — Facility/Hersteller · AI-gestützt · Konzept · ≈ANNAHME
- `CUST-02` **Facility-Readiness-Abfrage** — Farm/Facility · automatisiert · live · ✓BELEGT
- `DR-057` **Reduced ICH Q7 Gap Screening** — Thai cannabis extractor / API producer · menschlich · Konzept · ✓BELEGT
- `DR-058` **On-Site Assessment — senior facility visit** — Thai cannabis supplier · menschlich · Konzept · ✓BELEGT
- `GE-QUA-07` **Pre-Audit Gap-Report** — Farm/Hersteller · AI-gestützt · im-Code · ✓BELEGT
- `GM-012` **Computerized System Validation (CSV) / GxP-Beratung** — intern / Kunde · Durchlauf-extern · Idee · ≈ANNAHME
- `ST-10` **GMP-Audit-Orchestrierung (TÜV/SGS/Control-Union-Layer)** — Hub-/Verarbeitungswerk · Durchlauf-extern · Konzept · ✓BELEGT

**Europe** (6)

- `DR-063` **EU-GMP Roadmap Advisory — per work package** — Thai cannabis supplier / EU tolling partner · menschlich · Konzept · ✓BELEGT
- `EU-007` **EU Compliance Framework-Checker** — EU-Importeur / QP · automatisiert · live · ✓BELEGT
- `HS-03` **Gamma-/E-Beam-/X-Ray-Dekontamination (EU-GMP)** — Cannabis Exporter (TH/IL/AU) · Durchlauf-extern · live · ✓BELEGT
- `HS-07` **Cannabis-ISO-Laboranalyse EU** — EU Importer / Wholesaler / Pharmacy · Durchlauf-extern · live · ✓BELEGT
- `HS-08` **Pharma-CMO/CDMO Cannabis** — Pharma-Unternehmen / Cannabis-Brand · Durchlauf-extern · live · ✓BELEGT
- `HS-09` **Pharma-Verpackungslösungen Cannabis** — Cannabis CMO / Pharma-Unternehmen · Durchlauf-extern · live · ✓BELEGT

**Germany** (8)

- `DR-075` **QP Support & Export Gate Control** — EU importer / pharmacy (requiring QP-released batches) · menschlich · Idee · ≈ANNAHME
- `GE-QUA-01` **Batch-Verwaltung (Master)** — Farm/Hersteller · automatisiert · im-Code · ✓BELEGT
- `GE-QUA-02` **Batch-Verifizierung** — Farm/Hersteller · AI-gestützt · im-Code · ✓BELEGT
- `GE-QUA-04` **CoA-Parsing (LIMS)** — Farm/Hersteller · AI-gestützt · im-Code · ✓BELEGT
- `GE-QUA-05` **QP-Release** — Farm/Hersteller · menschlich · im-Code · ✓BELEGT
- `GE-QUA-06` **Annex-16-Checkliste** — Farm/Hersteller · automatisiert · im-Code · ✓BELEGT
- `GE-QUA-08` **Batch-Compliance-Pruefung** — Farm/Hersteller · automatisiert · im-Code · ✓BELEGT
- `GE-QUA-09` **Facility-Compliance-Pruefung** — Farm/Hersteller · automatisiert · im-Code · ✓BELEGT

**übergreifend** (3)

- `SDK-008` **Compliance Score Sync (SDK)** — Marketplace-System · automatisiert · live · ✓BELEGT
- `ST-04` **Master-Lizenz / Vertragsanbau-Umbrella** — Farm/Master-Operator · menschlich · Konzept · ✓BELEGT
- `ST-17` **Qualitätssicherungsvereinbarung (QAA) je Schnittstelle** — Farm/Hub/Importeur · menschlich · Konzept · ✓BELEGT


### Regulatory  ·  78 Services

**Gateway** (33)

- `CA-14` **Behörden-/Regelwerk-Meeting** — Behörde · menschlich · Konzept · ✓BELEGT
- `CAT-14` **Waste-Management-Service (Cannabis)** — Farm/Processor · menschlich · Konzept · ≈ANNAHME
- `DR-005` **GACP Readiness Preparation Program — M5: Final Report, Authority Coordination & Digital Handover** — Thai cannabis cultivator / operator · menschlich · Konzept · ✓BELEGT
- `DR-034` **Export Readiness Review — per export case** — Thai cannabis supplier targeting EU export · menschlich · Konzept · ✓BELEGT
- `DR-037` **AEO / Pre-Clearance Documentation Support** — Thai cannabis supplier / EU importer · menschlich · Konzept · ✓BELEGT
- `DR-049` **Authority Liaison & Application Management Support — standalone** — Thai cannabis operator filing GACP application · menschlich · Konzept · ✓BELEGT
- `DR-050` **Additional Clarification Round (authority)** — Thai cannabis operator · menschlich · Konzept · ✓BELEGT
- `DR-051` **Application Resubmission** — Thai cannabis operator · menschlich · Konzept · ✓BELEGT
- `DR-066` **Licence Verification Pack** — Thai cannabis operator · menschlich · Konzept · ✓BELEGT
- `GW-027` **QP Release Thai (RP-Freigabe)** — Thai RP · automatisiert · live · ✓BELEGT
- `GW-028` **QP Release EU (Annex-16-Freigabe)** — EU Qualified Person · automatisiert · live · ✓BELEGT
- `GW-032` **QP Netzwerk (Qualified Person Network)** — Admin, Exporter · automatisiert · live · ✓BELEGT
- `GW-042` **Recall initiieren** — EU QP, Thai RP, Regulierer · automatisiert · live · ✓BELEGT
- `GW-043` **Recall Management Dashboard** — Admin, QP, Regulierer · automatisiert · live · ✓BELEGT
- `GW-073` **Target Market Analyse (Batch-Eligibility)** — Exporter, Trader · automatisiert · live · ✓BELEGT
- `GW-074` **Target Market Proxy (mit Cache)** — Frontend · automatisiert · live · ✓BELEGT
- `GW-075` **Regulatory Monitor (Baseline + AI-Scan)** — Admin, Exporter · AI-gestützt · live · ✓BELEGT
- `GW-076` **Regulatory Gateway Dashboard** — Exporter, Auditor, Inspector · automatisiert · live · ✓BELEGT
- `GW-077` **Regulatory Intelligence Dashboard** — Admin, Exporter · automatisiert · live · ✓BELEGT
- `GW-078` **Regulatory Reporting** — Exporter, Auditor, Farm · automatisiert · live · ✓BELEGT
- `GW-079` **Compliance-Route-Konfigurator** — Exporter, Trader · automatisiert · live · ✓BELEGT
- `GW-080` **Compliance Route Dashboard** — Exporter, Importer, Auditor · automatisiert · live · ✓BELEGT
- `GW-081` **Compliance Action Blocker** — System/intern · automatisiert · live · ✓BELEGT
- `GW-082` **Rule Engine – Regulatorische Regelauswertung** — System/intern · automatisiert · live · ✓BELEGT
- `GW-083` **Readiness-Gatekeeper (Export-Freigabe)** — Exporter, Farm · automatisiert · live · ✓BELEGT
- `GW-084` **Compliance Overview Dashboard** — Admin, Auditor · automatisiert · live · ✓BELEGT
- `GW-109` **KYC Screening** — Admin, Compliance · automatisiert · live · ✓BELEGT
- `GW-116` **Import/Export Lizenzen** — Exporter, Importer · automatisiert · live · ✓BELEGT
- `GW-140` **Legal Acceptance & Consent** — Alle Rollen · automatisiert · live · ✓BELEGT
- `GW-141` **Consent Management Dashboard** — Alle Rollen · automatisiert · live · ✓BELEGT
- `GW-157` **Critical Path Tracker** — Exporter, Admin · automatisiert · live · ✓BELEGT
- `GW-167` **Compliance Gaps Übersicht** — Exporter, Auditor · automatisiert · live · ✓BELEGT
- `ST-12` **Export-Permit-Handling Thailand** — Thai Exporteur · menschlich · Konzept · ✓BELEGT

**Marketplace** (7)

- `MP-008` **Regulatorischer Monitor (4 Aktionen)** — Exporter/Admin · AI-gestützt · live · ✓BELEGT
- `MP-009` **Zielmarkt-Analyse** — Exporter · automatisiert · live · ✓BELEGT
- `MP-013` **Carbon Footprint Calculator** — Exporter/Importer · automatisiert · live · ✓BELEGT
- `MP-030` **Compliance-Routen-Konfigurator** — Exporter/Importer · automatisiert · live · ✓BELEGT
- `MP-061` **Regulatory Intelligence Feed** — Exporter/Importer · automatisiert · live · ✓BELEGT
- `MP-062` **Regulatory Watch (Scan-Trigger)** — Admin/Exporter · AI-gestützt · live · ✓BELEGT
- `MP-076` **Data-Governance-Pack (Policy-Viewer)** — Exporter/Importer · menschlich · live · ✓BELEGT

**AICert** (15)

- `AC-002` **ShinrAi Länder-Anforderungs-Lookup** — Plattform-intern / API-Nutzer · automatisiert · live · ✓BELEGT
- `AC-010` **Policy Impact Analyzer** — Regulatory Affairs / QA · AI-gestützt · live · ✓BELEGT
- `AC-011` **Regulatory Watch / Regulatory Briefing** — Regulatory Affairs · AI-gestützt · live · ✓BELEGT
- `AC-014` **EMVS Serialisierung & Registrierung** — Hersteller / Importeur · automatisiert · live · ✓BELEGT
- `AC-015` **EudraGMDP Verifikation** — QP / Importeur · automatisiert · live · ✓BELEGT
- `AC-068` **Pharmacovigilance Reporting** — QP / Regulatory Affairs / Behörden · menschlich · live · ✓BELEGT
- `AC-069` **Recall Oversight** — QA-Lead / Regulatory Affairs · menschlich · live · ✓BELEGT
- `AC-093` **Global Compliance Dashboard** — Regulatory Affairs / Management · automatisiert · live · ✓BELEGT
- `AC-094` **Regulatorische Matrix** — Regulatory Affairs / QP · automatisiert · live · ✓BELEGT
- `AC-095` **Regulatory Hub** — Regulatory Affairs / QA · automatisiert · live · ✓BELEGT
- `AC-096` **Regulatory Watch (Frontend)** — Regulatory Affairs · automatisiert · live · ✓BELEGT
- `AC-097` **EMVS Registrierung (Frontend)** — Hersteller / Compliance-Manager · automatisiert · live · ✓BELEGT
- `DR-048` **AI-Supported Compliance Desk — Authority Communication Drafts** — Thai cannabis supplier / operator · AI-gestützt · Konzept · ✓BELEGT
- `DR-061` **Tolling-Partner Route Memo** — Thai cannabis supplier / EU buyer · menschlich · Konzept · ✓BELEGT
- `GE-REG-02` **Regulatory AI-Scan** — Exporteur/Importeur · AI-gestützt · im-Code · ✓BELEGT

**Europe** (6)

- `DR-064` **API-Route Conversion Plan (optional premium, per Phase 5 activation)** — Thai cannabis supplier with mature EU export route · menschlich · Idee · ✓BELEGT
- `EU-006` **EU Regulatory Pfad-Advisor** — EU-Importeur / Apotheke · automatisiert · live · ✓BELEGT
- `GE-REG-03` **Regulatory Updates/Alerts** — Exporteur/Importeur · AI-gestützt · im-Code · ✓BELEGT
- `GE-REG-04` **Target-Market-Analyse** — Exporteur/Importeur · AI-gestützt · im-Code · ✓BELEGT
- `HS-11` **Klinische Studien & CRO-Services Cannabis** — Pharma / Cannabis API Manufacturer · Durchlauf-extern · Konzept · ✓BELEGT
- `ST-11` **EU-GMP-Importeur/QP-Piggyback (Marktzugang)** — Exporteur/Importeur · Durchlauf-extern · Konzept · ✓BELEGT

**Germany** (4)

- `GE-REG-01` **Regulatorische Anforderungen/Cert-Hierarchie** — Exporteur/Importeur · automatisiert · im-Code · ✓BELEGT
- `GE-REG-06` **BtM-Lizenz-Verifizierung** — Exporteur/Importeur · AI-gestützt · im-Code · ✓BELEGT
- `GE-REG-07` **BtM-Rezepte** — Exporteur/Importeur · automatisiert · im-Code · ✓BELEGT
- `ST-13` **Import-Permit-Handling Deutschland (BfArM)** — DE-Importeur/Apotheke · menschlich · Konzept · ✓BELEGT

**AIHF** (2)

- `AIHF-04` **AIHF-Governance & Standards-Harmonisierung** — Föderationsmitglieder/Regulatoren · menschlich · Konzept · ≈ANNAHME · 🅰️AIHF
- `AIHF-09` **AIHF Regulatory-Advocacy / Lobby-Vertretung** — Föderationsmitglieder/Regulatoren · menschlich · Konzept · ≈ANNAHME · 🅰️AIHF

**übergreifend** (10)

- `CA-07` **Rechtsberatung & Unternehmens-Compliance (Juslaws)** — intern · menschlich · live · ✓BELEGT
- `SDK-007` **Regulatory Sync (SDK)** — Marketplace-System · automatisiert · live · ✓BELEGT
- `SDK-013` **Regulatory Updates aggregieren (SDK)** — Gateway-Frontend, Marketplace · automatisiert · live · ✓BELEGT
- `SDK-014` **Regulatory Alert synchronisieren (SDK)** — System/intern · automatisiert · live · ✓BELEGT
- `SDK-015` **Regulatory Updates abrufen – Quelle (SDK)** — Gateway-Frontend · automatisiert · live · ✓BELEGT
- `SDK-016` **AICert AI-Scan triggern (SDK)** — Admin · AI-gestützt · live · ✓BELEGT
- `SDK-017` **Marketplace AI-Scan triggern (SDK)** — Admin · AI-gestützt · live · ✓BELEGT
- `SDK-018` **Target Market Analyse – Batch-Eligibility (SDK)** — Marketplace, Gateway-Frontend · automatisiert · live · ✓BELEGT
- `SDK-019` **Regulierungs-Daten abrufen (SDK)** — Marketplace, Gateway-Frontend · automatisiert · live · ✓BELEGT
- `SDK-020` **Regulatory AI-Scan (SDK-Target-Market)** — Admin · AI-gestützt · live · ✓BELEGT

**Germany/Europe** (1)

- `GE-REG-05` **Regulatory-Modul (DE/EU)** — Exporteur/Importeur · automatisiert · im-Code · ✓BELEGT


### Platform/Identity  ·  78 Services

**Gateway** (26)

- `GE-PLT-10` **Exporter-Onboarding** — alle Rollen · automatisiert · im-Code · ✓BELEGT
- `GW-093` **Performance Monitoring** — Admin · automatisiert · live · ✓BELEGT
- `GW-097` **Exporter Onboarding Wizard** — Neuer Exporter · automatisiert · live · ✓BELEGT
- `GW-098` **Onboarding AI-Extract (Dokument-Analyse)** — Neuer Exporter/Importer · AI-gestützt · live · ✓BELEGT
- `GW-099` **Exporter Verifizierung (Admin)** — Admin · menschlich · live · ✓BELEGT
- `GW-100` **Bewerbungsbestätigung per E-Mail** — Neuer Benutzer · automatisiert · live · ✓BELEGT
- `GW-101` **Rollen-Anfrage (Request Role Change)** — Benutzer, Admin · automatisiert · live · ✓BELEGT
- `GW-102` **Admin Rollen-Management** — Admin · automatisiert · live · ✓BELEGT
- `GW-103` **Rollen-Management (Gesamt)** — Admin · automatisiert · live · ✓BELEGT
- `GW-104` **Permission Matrix** — Admin · automatisiert · live · ✓BELEGT
- `GW-105` **Auth Sync (Cross-Platform)** — System/intern · automatisiert · live · ✓BELEGT
- `GW-106` **Cross-Login (App-übergreifend)** — Eingeloggter Benutzer · automatisiert · live · ✓BELEGT
- `GW-107` **Cross-Platform API (Maschine-zu-Maschine)** — Marketplace, AICert (API-Key) · automatisiert · live · ✓BELEGT
- `GW-108` **Cross-Platform Sync (Hook)** — Frontend · automatisiert · live · ✓BELEGT
- `GW-138` **Benachrichtigungs-Center** — Alle Rollen · automatisiert · live · ✓BELEGT
- `GW-139` **Webhook Events (Send/Verify)** — System/intern, Admin · automatisiert · live · ✓BELEGT
- `GW-149` **Team Management** — Admin, Exporter · automatisiert · live · ✓BELEGT
- `GW-151` **Platform Settings (Admin)** — Admin · automatisiert · live · ✓BELEGT
- `GW-152` **Admin Korrekturen** — Admin · menschlich · live · ✓BELEGT
- `GW-153` **Verbindungsgesundheit (Connection Health)** — Admin · automatisiert · live · ✓BELEGT
- `GW-154` **Dashboard Übersicht (Executive KPIs)** — Alle Rollen · automatisiert · live · ✓BELEGT
- `GW-155` **Executive Command Center** — Exporter, Trader (Executive) · automatisiert · live · ✓BELEGT
- `GW-156` **Governance Enforcement (Action Guard)** — Frontend/System · automatisiert · live · ✓BELEGT
- `GW-158` **Onboarding Gate & Banner** — Neuer Benutzer · automatisiert · live · ✓BELEGT
- `GW-162` **Golden Path Demo** — Admin · menschlich · live · ✓BELEGT
- `ST-03` **Tiered Digital Onboarding-Funnel (Tier 0–3)** — Farm/Produzent · automatisiert · im-Code · ✓BELEGT

**Marketplace** (18)

- `DR-022` **B2B Marketplace — Supplier Profile (Basic, monthly)** — Thai cannabis supplier · automatisiert · im-Code · ✓BELEGT
- `DR-023` **B2B Marketplace — Compliance-Reviewed Supplier Access (monthly)** — Compliance-Reviewed Thai cannabis supplier · automatisiert · im-Code · ✓BELEGT
- `DR-024` **B2B Marketplace — Export-Ready Supplier Access (monthly)** — Export-Ready Thai cannabis supplier · automatisiert · Konzept · ✓BELEGT
- `DR-025` **B2B Marketplace — Managed Export Supplier (monthly)** — Large/strategic Thai cannabis supplier · menschlich · Konzept · ✓BELEGT
- `DR-026` **B2B Marketplace — Buyer Access Basic (monthly)** — EU importer / buyer · automatisiert · im-Code · ✓BELEGT
- `DR-027` **B2B Marketplace — Buyer Access Standard (monthly)** — EU importer / pharmacy group · automatisiert · Konzept · ✓BELEGT
- `DR-028` **B2B Marketplace — Buyer Access Enterprise (monthly)** — Large EU importer / pharmacy group / wholesaler · menschlich · Konzept · ✓BELEGT
- `DR-029` **Buyer Onboarding** — EU importer / buyer applying for marketplace access · menschlich · Konzept · ✓BELEGT
- `MP-033` **API-Key-Management (Marketplace)** — Admin/Partner · automatisiert · live · ✓BELEGT
- `MP-034` **Admin-Rollen-Verwaltung (Marketplace)** — Admin · automatisiert · live · ✓BELEGT
- `MP-037` **Auth-Sync (Willkommens-E-Mail + Profile-Sync)** — Neue Nutzer · automatisiert · live · ✓BELEGT
- `MP-052` **Exporter-Onboarding (3-Schritt-Wizard)** — Exporter (TH) · menschlich · live · ✓BELEGT
- `MP-053` **Importer-Onboarding (EU-Wizard)** — Importer (EU) · menschlich · live · ✓BELEGT
- `MP-055` **Verifikations-Status-Tracking (Exporter)** — Exporter · automatisiert · live · ✓BELEGT
- `MP-079` **Importer-Dashboard** — Importer · automatisiert · live · ✓BELEGT
- `MP-080` **Exporter-Verifikations-Übersicht (Admin)** — Admin · menschlich · im-Code · ✓BELEGT
- `MP-082` **Onboarding Gate (Feature-Lock)** — Alle Nutzer · automatisiert · live · ✓BELEGT
- `MP-083` **Pull-to-Refresh / Network-Status (Mobile)** — Mobile User · automatisiert · live · ✓BELEGT

**AICert** (12)

- `AC-032` **Compliance-Erinnerungen (automatisiert)** — QA-Manager / Facility-Nutzer · automatisiert · live · ✓BELEGT
- `AC-040` **Cross-Platform Auth** — Alle Cannaworld-Apps · automatisiert · live · ✓BELEGT
- `AC-041` **API-Key Verwaltung (Admin)** — Admin · automatisiert · live · ✓BELEGT
- `AC-042` **Webhook Event Bus** — Interne Systeme / Partner-Plattformen · automatisiert · live · ✓BELEGT
- `AC-048` **Admin Rollen-Verwaltung** — Admin · automatisiert · live · ✓BELEGT
- `AC-049` **Admin User-Verwaltung** — Admin · automatisiert · live · ✓BELEGT
- `AC-050` **Auth Sync** — Plattform-intern · automatisiert · live · ✓BELEGT
- `AC-051` **Legal Acceptance Tracking** — AICert-Nutzer · automatisiert · live · ✓BELEGT
- `AC-052` **Terms Confirmation** — AICert-Nutzer · automatisiert · live · ✓BELEGT
- `AC-105` **Facility API Key Management (Frontend)** — Facility-Manager · automatisiert · live · ✓BELEGT
- `AC-106` **API Dokumentation** — Entwickler / API-Kunden · automatisiert · live · ✓BELEGT
- `GE-PLT-08` **Analytics** — alle Rollen · automatisiert · im-Code · ✓BELEGT

**Europe** (4)

- `EU-019` **EU Notification Service** — EU-Nutzer · automatisiert · live · ✓BELEGT
- `EU-020` **EU Exporter Onboarding Gate** — Exporteur · automatisiert · live · ✓BELEGT
- `EU-021` **EU Cannaworld SDK** — Entwickler · automatisiert · live · ✓BELEGT
- `EU-022` **EU Access Request (Käufer-Registrierung)** — Neuer EU-Käufer · menschlich · live · ✓BELEGT

**Germany** (4)

- `GE-PLT-05` **Benachrichtigungen** — alle Rollen · automatisiert · im-Code · ✓BELEGT
- `GE-PLT-07` **Dashboard-Stats** — alle Rollen · automatisiert · im-Code · ✓BELEGT
- `GE-PLT-09` **Onboarding (Rollen-Wizard)** — alle Rollen · automatisiert · im-Code · ✓BELEGT
- `GE-PLT-11` **E-Mail-Benachrichtigung** — alle Rollen · automatisiert · im-Code · ✓BELEGT

**AIHF** (1)

- `AIHF-12` **AIHF-Mitglieder-Onboarding in CannaWorld-Plattform** — AIHF-Mitglied/Farm · automatisiert · Idee · ≈ANNAHME · 🅰️AIHF

**übergreifend** (13)

- `CUST-01` **Customer Onboarding-Status-Abfrage** — Kunde/Farm/Exporteur · automatisiert · live · ✓BELEGT
- `DR-074` **Compliance SaaS Platform (subscription)** — Any cannabis operator / buyer · automatisiert · im-Code · ✓BELEGT
- `GE-PLT-01` **Auth/Session** — alle Rollen · automatisiert · im-Code · ✓BELEGT
- `GE-PLT-02` **Rollen/RBAC** — alle Rollen · automatisiert · im-Code · ✓BELEGT
- `GE-PLT-03` **Cross-Login (SSO ueber Verticals)** — alle Rollen · automatisiert · im-Code · ✓BELEGT
- `GE-PLT-04` **Cross-Platform-Sync** — alle Rollen · automatisiert · im-Code · ✓BELEGT
- `GE-PLT-06` **Presence** — alle Rollen · automatisiert · im-Code · ✓BELEGT
- `GE-PLT-12` **Webhook-Events** — alle Rollen · automatisiert · im-Code · ✓BELEGT
- `MP-035` **Cross-Login (SSO Magic-Link)** — Alle Nutzer · automatisiert · live · ✓BELEGT
- `MP-036` **Cross-Platform-API (Sync-Orchestrator)** — Partner-Systeme/Apps · automatisiert · live · ✓BELEGT
- `OC-004` **On-Chain Deployment & Migration (Hardhat)** — DevOps/Admin · menschlich · live · ✓BELEGT
- `SDK-009` **Notification Sync (SDK)** — Marketplace-Benutzer · automatisiert · live · ✓BELEGT
- `SDK-010` **Verbindungs-Status prüfen (SDK)** — Admin-Dashboard · automatisiert · live · ✓BELEGT


### Trust/Audit  ·  73 Services

**Gateway** (16)

- `GW-013` **Zertifikat-Verifizierung (öffentlich)** — Externer Verifizierer · automatisiert · live · ✓BELEGT
- `GW-014` **ShinrAi Trust Score – 6-Achsen-Bewertung** — Exporter, Auditor, Admin · AI-gestützt · live · ✓BELEGT
- `GW-015` **ShinrAi Dokument-Analyse & Score** — Exporter, Auditor · AI-gestützt · live · ✓BELEGT
- `GW-016` **Blockchain Anker – Batch Audit-Kette** — Auditor, Exporter · automatisiert · im-Code · ✓BELEGT
- `GW-017` **Supply Chain Event Tracking** — Exporter, Auditor, Regulierer · automatisiert · live · ✓BELEGT
- `GW-018` **Audit Trail Dashboard** — Auditor, Exporter, Admin · automatisiert · live · ✓BELEGT
- `GW-019` **Audit Passport** — Exporter, Auditor, Behörde · automatisiert · live · ✓BELEGT
- `GW-020` **Audit Report Export** — Auditor, Behörde, Exporter · automatisiert · live · ✓BELEGT
- `GW-021` **Selbst-Audit Tool** — Exporter, Farm · automatisiert · live · ✓BELEGT
- `GW-022` **Realtime Audit Voice/Vision Session** — Auditor, Admin · AI-gestützt · im-Code · ✓BELEGT
- `GW-023` **Gemini Audio-Relay (Audit)** — Auditor · AI-gestützt · im-Code · ✓BELEGT
- `GW-095` **Integrity Alert Proxy** — System/intern, Admin · automatisiert · live · ✓BELEGT
- `GW-096` **Audit Status Proxy** — Exporter, Auditor · automatisiert · live · ✓BELEGT
- `GW-161` **Proof Moments (Admin-Audit-Trail-Snapshot)** — Admin · automatisiert · live · ✓BELEGT
- `GW-163` **Batch Traceability Auditor** — Auditor, Regulierer · automatisiert · live · ✓BELEGT
- `ST-07` **Qualifizierungs-Schleuse / Pre-Audit & Tier-Einstufung** — Farm/Produzent · AI-gestützt · im-Code · ✓BELEGT

**Marketplace** (10)

- `DR-019` **Semiannual Supplier Compliance Review** — Compliance-Reviewed Supplier on Cannaworld marketplace · menschlich · Konzept · ✓BELEGT
- `DR-020` **Third-Party Supplier Review (for upstream/downstream client)** — EU buyer / importer commissioning review of their Thai supplier · menschlich · Konzept · ✓BELEGT
- `DR-021` **Supplier-Risk Scorecard Update (interim)** — Active marketplace supplier · menschlich · Konzept · ✓BELEGT
- `DR-040` **Buyer / Importer Due Diligence — per buyer** — Thai cannabis supplier evaluating EU buyer counterparty · menschlich · Konzept · ✓BELEGT
- `MP-012` **Audit-Routen-Optimizer** — Auditor/Admin · automatisiert · live · ✓BELEGT
- `MP-031` **Integrity Alert (Audit-Ketten-Bruch)** — Admin · automatisiert · live · ✓BELEGT
- `MP-043` **Batch-Token-Verifizierung (Öffentlich)** — Endkunde/Apotheke/Behörde · automatisiert · live · ✓BELEGT
- `MP-066` **Batch-Verifizierung (Public QR-Check)** — Öffentlich/Behörde · automatisiert · live · ✓BELEGT
- `MP-072` **Data-Integrity-Dashboard (Audit-Ketten-Viewer)** — Admin/Exporter · automatisiert · im-Code · ✓BELEGT
- `MP-077` **Quantum Security (Post-Quantum-Kryptografie)** — Platform · automatisiert · im-Code · ✓BELEGT

**AICert** (27)

- `AC-003` **AI Audit-Chat (GMP/GDP-Compliance-Chat)** — Auditor / QP / Facility-Manager · AI-gestützt · live · ✓BELEGT
- `AC-006` **Video-Audit Frame-Analyse** — Auditor / Remote-Inspector · AI-gestützt · live · ✓BELEGT
- `AC-012` **Remote QP Teleaudit (AR-Stream-Enrichment)** — EU-QP / Thai Facility-Operator · AI-gestützt · live · ✓BELEGT
- `AC-013` **Audit-Session KI-Zusammenfassung** — Auditor / QP · AI-gestützt · live · ✓BELEGT
- `AC-028` **Audit-Report Generierung** — Auditor / QP · automatisiert · live · ✓BELEGT
- `AC-029` **Audit Status API** — Externe Systeme / Käufer · automatisiert · live · ✓BELEGT
- `AC-030` **Zertifikat-Verifikation (Public)** — Käufer / Inspektor / Öffentlichkeit · automatisiert · live · ✓BELEGT
- `AC-039` **LiveKit Teleaudit Token** — Auditor / QP / Facility-Operator · automatisiert · live · ✓BELEGT
- `AC-057` **Admin Zertifikats-Übersicht** — Admin / Certification Body · automatisiert · live · ✓BELEGT
- `AC-060` **Audit-Management (CRUD + Self-Audit)** — Auditor / QA-Manager / Facility · automatisiert · live · ✓BELEGT
- `AC-061` **Audit-Session (Realtime-Walkthrough)** — Auditor / QP · automatisiert · live · ✓BELEGT
- `AC-062` **Video-Audit (Standalone)** — Auditor / Remote-Inspector · AI-gestützt · live · ✓BELEGT
- `AC-066` **Checklist-Templates** — QA-Manager / Auditor · automatisiert · live · ✓BELEGT
- `AC-083` **Audit Closing Reports** — QA-Manager / QP · automatisiert · live · ✓BELEGT
- `AC-084` **Zertifikats-Verzeichnis (Certificates Page)** — QA-Manager / QP · automatisiert · live · ✓BELEGT
- `AC-085` **Verify Audit Report (Public)** — Käufer / Inspektor · automatisiert · live · ✓BELEGT
- `AC-086` **Zertifikat-Verifikation (Frontend)** — Käufer / Öffentlichkeit · automatisiert · live · ✓BELEGT
- `AC-087` **Inspector Portal** — Externer Inspektor / Behörde · automatisiert · live · ✓BELEGT
- `AC-101` **Certification Body OS** — Zertifizierungsstellen (CB) · automatisiert · live · ✓BELEGT
- `CA-02` **Vor-Ort-Partner-Audit / Farm-Visitation** — Farm · menschlich · live · ✓BELEGT
- `CAT-03` **Gemini-Facility-Walkthrough-Audit (Katalog)** — Facility/Auditor · AI-gestützt · Konzept · ≈ANNAHME
- `CUST-03` **Audit-Gap-Zusammenfassung** — Auditor/Facility · AI-gestützt · live · ✓BELEGT
- `DR-059` **Supplier Compliance Audit (for export context, per audit)** — Thai cannabis supplier / EU buyer commissioning supplier audit · menschlich · Konzept · ✓BELEGT
- `DR-068` **GMP-AICert Trust Engine — AI Gap Assessment & Evidence Verification** — All marketplace participants; EU buyers; QPs · AI-gestützt · Konzept · ✓BELEGT
- `DR-076` **Impartiality Vehicle — Structurally Separated Compliance Review Entity (ISO 17065 roadmap)** — All marketplace participants requiring accredited certification authority · Durchlauf-extern · Idee · ✓BELEGT
- `GE-TRU-01` **Audit Passport** — Auditor/Facility · automatisiert · im-Code · ✓BELEGT
- `GE-TRU-07` **AICert-Scan** — Auditor/Facility · AI-gestützt · im-Code · ✓BELEGT

**Europe** (1)

- `EU-002` **Audit Passport (Consent-basiertes Daten-Sharing)** — EU-Importeur / Buyer · automatisiert · live · ✓BELEGT

**Germany** (1)

- `GE-TRU-04` **Dokumenten-Integritaets-Scan** — Auditor/Facility · AI-gestützt · im-Code · ✓BELEGT

**AIHF** (3)

- `AIHF-03` **CannaWorld×AIHF Co-Zertifizierung / gemeinsamer Standard** — Farm/Produzent/Auditor · menschlich · Konzept · ≈ANNAHME · 🅰️AIHF
- `AIHF-05` **AIHF-endorsed Trust-Mark / Siegel** — Buyer/Importeur/Apotheke · AI-gestützt · Idee · ≈ANNAHME · 🅰️AIHF
- `AIHF-11` **AIHF Cross-Recognition von CannaWorld-Readiness** — Farm/Produzent · menschlich · Konzept · ≈ANNAHME · 🅰️AIHF

**übergreifend** (14)

- `GE-TRU-02` **Audit-Logging** — Auditor/Facility · automatisiert · im-Code · ✓BELEGT
- `GE-TRU-03` **Realtime-Audit** — Auditor/Facility · automatisiert · im-Code · ✓BELEGT
- `GE-TRU-05` **Post-Quantum Audit-Chain (Dilithium/Kyber)** — Auditor/Facility · automatisiert · im-Code · ✓BELEGT
- `GE-TRU-08` **Universe-/Company-Compliance-Stats** — Auditor/Facility · automatisiert · im-Code · ✓BELEGT
- `MP-005` **InfinityYou Escrow Guard (AR Hard Freeze)** — Platform/BackOffice · automatisiert · live · ✓BELEGT
- `MP-014` **Blockchain-Anchor auf Polygon** — Exporter/Platform · automatisiert · live · ✓BELEGT
- `MP-042` **Polygon-Mint Audit-Passport NFT** — Exporter/Importer · automatisiert · live · ✓BELEGT
- `OC-001` **AuditPassport ERC-721 Smart Contract** — Exporter/Importer/Behörde · automatisiert · live · ✓BELEGT
- `OC-002` **HashStore Smart Contract (On-Chain Batch-Hash-Ankrung)** — Platform · automatisiert · live · ✓BELEGT
- `OC-003` **IPFS-Metadaten-Pinning (Pinata)** — Platform · automatisiert · live · ✓BELEGT
- `SDK-006` **Audit-Sync (SDK)** — Marketplace-System · automatisiert · live · ✓BELEGT
- `SDK-011` **Zertifikat-Verifikation via Marketplace (SDK)** — Extern, Marketplace · automatisiert · live · ✓BELEGT
- `SDK-012` **Audit Query via Marketplace (SDK)** — Marketplace, Gateway · automatisiert · live · ✓BELEGT
- `ST-08` **Vertrauens-Broker (Akkreditierungs-Kopplung)** — Farm/Buyer · menschlich · Konzept · ✓BELEGT

**AICert/Marketplace** (1)

- `GE-TRU-06` **Zertifikats-Verifizierung** — Auditor/Facility · automatisiert · im-Code · ✓BELEGT


### Trade  ·  65 Services

**Gateway** (24)

- `GE-MKT-06` **Trade Cases** — Exporteur/Importeur · automatisiert · im-Code · ✓BELEGT
- `GE-MKT-07` **Supplier-Verwaltung** — Exporteur/Importeur · automatisiert · im-Code · ✓BELEGT
- `GW-001` **Batch erstellen** — Exporter, Farm · automatisiert · live · ✓BELEGT
- `GW-002` **Charge-Liste & Detail** — Exporter, Farm, Importer, Lab · automatisiert · live · ✓BELEGT
- `GW-008` **Marketplace Batch-Listing (Übersicht)** — Importer, Shop, Trader, Pharmacy · automatisiert · live · ✓BELEGT
- `GW-009` **Marketplace Order erstellen** — Importer, Shop, Trader · automatisiert · live · ✓BELEGT
- `GW-010` **Marketplace Order-Status aktualisieren** — Exporter, Admin · automatisiert · live · ✓BELEGT
- `GW-011` **Marketplace Sync (Batch→Marketplace)** — System/intern · automatisiert · live · ✓BELEGT
- `GW-012` **Marketplace Auto-Sync (alle Chargen)** — System/intern · automatisiert · live · ✓BELEGT
- `GW-044` **Rejection Management** — Importer, Auditor, Logistics · automatisiert · live · ✓BELEGT
- `GW-058` **Inventory Management** — Exporter, Farm, Logistics, Shop · automatisiert · live · ✓BELEGT
- `GW-071` **Genetik-Royalty-Router** — System/intern · automatisiert · im-Code · ✓BELEGT
- `GW-072` **Preis-Intelligenz (Quick-Estimate)** — Exporter, Trader, Importer · automatisiert · live · ✓BELEGT
- `GW-085` **Golden Route TH-DE (Vollständige Export-Pipeline)** — Exporter, Importer, Auditor · automatisiert · live · ✓BELEGT
- `GW-086` **Export Foundation Checker** — Exporter, Auditor · automatisiert · live · ✓BELEGT
- `GW-087` **Import-Workflow (Importer-seitig)** — Importer · automatisiert · live · ✓BELEGT
- `GW-088` **Export Cases Management** — Exporter, Trader, Farm, Auditor · automatisiert · live · ✓BELEGT
- `GW-089` **Trade Cases** — Exporter, Importer, Trader, Farm · automatisiert · live · ✓BELEGT
- `GW-110` **CRM Pipeline (HubSpot-fähig)** — Admin, Trader · automatisiert · live · ✓BELEGT
- `GW-145` **SAP Business One Integration** — Admin (SAP-Nutzer) · automatisiert · im-Code · ✓BELEGT
- `GW-146` **SAP S/4HANA Integration** — Admin (SAP-Nutzer) · automatisiert · im-Code · ✓BELEGT
- `GW-147` **SAP Integration Dashboard** — Admin · automatisiert · live · ✓BELEGT
- `GW-148` **Business Partner Management** — Admin · automatisiert · live · ✓BELEGT
- `GW-164` **Batch Operations (Shipment & Trade-Case-Verwaltung)** — Exporter, Logistics, Admin · automatisiert · live · ✓BELEGT

**Marketplace** (27)

- `CA-13` **Buyer/Deal-Gespräch (COO-Level)** — Buyer · menschlich · live · ✓BELEGT
- `CA-18` **China-Lieferanten-Sourcing** — Partner · menschlich · Idee · ✓BELEGT
- `DR-032` **B2B Transaction Support — Fixed Fee** — Thai supplier + EU buyer (transaction parties) · menschlich · Konzept · ✓BELEGT
- `DR-033` **B2B Transaction Support — Success-Fee Brokerage** — Thai supplier + EU buyer · menschlich · Konzept · ✓BELEGT
- `DR-055` **Export & Buyer Desk (monthly retainer)** — Thai supplier with active EU export ambition · menschlich · Konzept · ✓BELEGT
- `DR-056` **Buyer Sourcing & Opportunity Registration — per buyer** — Thai cannabis supplier · menschlich · Konzept · ✓BELEGT
- `DR-060` **Conditional EU Test-Batch PO Documentation Package** — Thai cannabis supplier preparing first EU export · menschlich · Konzept · ✓BELEGT
- `DR-062` **Triangular Transaction Structuring — per buyer/deal** — Thai supplier + EU buyer · menschlich · Konzept · ✓BELEGT
- `GE-MKT-01` **Marketplace Listings/Batches** — Exporteur/Importeur · automatisiert · im-Code · ✓BELEGT
- `GE-MKT-02` **Marketplace Orders** — Exporteur/Importeur · automatisiert · im-Code · ✓BELEGT
- `GE-MKT-03` **Marketplace Stats/Health** — Exporteur/Importeur · automatisiert · im-Code · ✓BELEGT
- `GM-009` **E-Commerce-Shop (Shopify/Printify/UPS)** — unbekannt (Consumer oder B2B-Kanal) · automatisiert · Konzept · ≈ANNAHME
- `MP-003` **Auto-Trade-Matcher** — Importer/Exporter · automatisiert · live · ✓BELEGT
- `MP-004` **Escrow Milestone Controller** — Importer/Exporter · automatisiert · live · ✓BELEGT
- `MP-006` **Marketplace-Preis-Intelligence** — Exporter/Importer · AI-gestützt · live · ✓BELEGT
- `MP-016` **Yield Finance Scorer** — Importer/Platform · automatisiert · live · ✓BELEGT
- `MP-028` **Forex-Raten-Service** — Platform/Frontend · automatisiert · live · ✓BELEGT
- `MP-048` **Marketplace-Listing (Batch-Catalog)** — Importer/Exporter · automatisiert · live · ✓BELEGT
- `MP-049` **Verdecktes Gebot / Auction (Bid-System)** — Importer/Exporter · automatisiert · live · ✓BELEGT
- `MP-050` **Deal-Room (Private Verhandlungs-Workspace)** — Importer/Exporter · automatisiert · live · ✓BELEGT
- `MP-051` **Importer-Deal-Pipeline** — Importer · automatisiert · live · ✓BELEGT
- `MP-071` **Importer-Spezifikations-Profil** — Importer · menschlich · live · ✓BELEGT
- `MP-081` **Favoriten-Verwaltung (Batches)** — Importer · automatisiert · live · ✓BELEGT
- `SDK-001` **Marketplace Batch auflisten** — Marketplace-Frontend, externe Integrationen · automatisiert · live · ✓BELEGT
- `SDK-002` **Marketplace Batch-Detail** — Marketplace-Frontend · automatisiert · live · ✓BELEGT
- `SDK-004` **Marketplace Order erstellen (SDK)** — Marketplace-Frontend · automatisiert · live · ✓BELEGT
- `SDK-005` **Marketplace Order aktualisieren (SDK)** — Marketplace-Frontend, System · automatisiert · live · ✓BELEGT

**AICert** (4)

- `AC-023` **Marketplace Listing Management** — Seller / Admin · automatisiert · live · ✓BELEGT
- `AC-024` **Specification Matching Engine** — Importeur / Marketplace · automatisiert · live · ✓BELEGT
- `AC-025` **Importer-Spezifikationen CRUD** — Importeur · automatisiert · live · ✓BELEGT
- `AC-098` **Seller Listing Dashboard** — Exporteur / Seller · automatisiert · live · ✓BELEGT

**Europe** (6)

- `EU-003` **Golden Route Engine** — EU-Importeur / Buyer · AI-gestützt · live · ✓BELEGT
- `EU-004` **EU Import Intake (EuIntake)** — EU-Importeur · menschlich · live · ✓BELEGT
- `EU-005` **Wholesale Hub** — EU-Großhändler / Distributor · menschlich · live · ✓BELEGT
- `EU-012` **EU Marketplace** — EU-Käufer / Importeur · automatisiert · live · ✓BELEGT
- `EU-013` **Trade Cases Management** — EU-Importeur / Trade-Manager · menschlich · live · ✓BELEGT
- `ST-06` **Nachfrage-Aggregation (EU-Buyer-Bündelung)** — EU-Buyer/Importeur · menschlich · im-Code · ✓BELEGT

**Germany** (1)

- `GE-MKT-05` **Sample-Requests** — Exporteur/Importeur · automatisiert · im-Code · ✓BELEGT

**AIHF** (2)

- `AIHF-07` **AIHF Marktzugang Asien (Cross-Border-Netzwerk)** — Exporteur/Buyer · menschlich · Idee · ≈ANNAHME · 🅰️AIHF
- `AIHF-13` **AIHF Co-Branded Marketplace-Zugang** — AIHF-Mitglied/Buyer · automatisiert · Idee · ≈ANNAHME · 🅰️AIHF

**AICert/Marketplace** (1)

- `GE-MKT-04` **Marketplace-Scan** — Exporteur/Importeur · AI-gestützt · im-Code · ✓BELEGT


### Data/AI  ·  39 Services

**Gateway** (12)

- `DR-006` **Digital Compliance Data Room — Basic (post-project monthly)** — Thai cannabis cultivator / operator · automatisiert · im-Code · ✓BELEGT
- `DR-007` **Digital Compliance Data Room — Compliance Data Management (monthly)** — Thai cannabis cultivator / operator · menschlich · im-Code · ✓BELEGT
- `DR-008` **Digital Compliance Data Room — Managed Compliance (monthly)** — Thai cannabis cultivator / operator · menschlich · im-Code · ✓BELEGT
- `DR-009` **Digital Compliance Data Room — Enterprise / Multi-Site (monthly)** — Multi-site Thai cannabis operator / buyer · menschlich · Konzept · ✓BELEGT
- `DR-053` **Data Migration from Chat / Photo Archives** — Thai cannabis operator with pre-existing informal records · menschlich · Konzept · ✓BELEGT
- `GW-006` **AI Batch Jobs Dashboard** — Exporter, Farm · automatisiert · live · ✓BELEGT
- `GW-007` **AI Batch Cron-Tick** — System/intern · automatisiert · live · ✓BELEGT
- `GW-090` **Batch Trend-Analyse** — Exporter, Farm, Trader, Auditor · automatisiert · live · ✓BELEGT
- `GW-091` **Risk Prediction Dashboard** — Exporter, Auditor, Admin · AI-gestützt · live · ✓BELEGT
- `GW-092` **AI-Analyse Dashboard** — Exporter, Auditor · automatisiert · live · ✓BELEGT
- `GW-094` **Data Integrity Dashboard** — Admin, Auditor · automatisiert · live · ✓BELEGT
- `GW-166` **AI-gestützte Dokumentenanalyse (Hook)** — Exporter, Farm · AI-gestützt · live · ✓BELEGT

**Marketplace** (10)

- `DR-030` **Restricted Data Room Access per Buyer (monthly)** — EU buyer evaluating specific Thai supplier · automatisiert · im-Code · ✓BELEGT
- `DR-067` **AI-Powered Supply-Demand Matching Engine** — All marketplace participants (suppliers + buyers) · automatisiert · Konzept · ✓BELEGT
- `DR-073` **Data & Market Intelligence (recurring)** — EU buyers / investors / platform participants · automatisiert · Idee · ✓BELEGT
- `MP-002` **ShinrAi Batch-Cron (Anthropic Batch API Queue)** — Platform/BackOffice · automatisiert · live · ✓BELEGT
- `MP-039` **SAP-Integration (Goods Receipt / QM / Delivery Note)** — Importer (SAP-Nutzer) · automatisiert · live · ✓BELEGT
- `MP-040` **SAP S/4HANA OData Push** — Importer (SAP S/4HANA) · automatisiert · im-Code · ✓BELEGT
- `MP-041` **Daten-Export (CSV/Multi-Entity)** — Exporter/Admin · automatisiert · live · ✓BELEGT
- `MP-073` **AI Batch Jobs Dashboard** — Admin/Exporter · automatisiert · im-Code · ✓BELEGT
- `MP-075` **SAP-Integration-Dashboard** — IT/Admin · menschlich · im-Code · ✓BELEGT
- `SDK-003` **Marketplace KPI-Stats** — Marketplace-Dashboard · automatisiert · live · ✓BELEGT

**AICert** (13)

- `AC-008` **Risiko-Prediktion (AI Dashboard Insights)** — QA-Lead / Management · AI-gestützt · live · ✓BELEGT
- `AC-027` **AI Data Connector (MCP/OpenAPI)** — Externe AI-Systeme / API-Kunden · automatisiert · live · ✓BELEGT
- `AC-056` **Benchmark Score Update (Admin)** — Admin / System · automatisiert · live · ✓BELEGT
- `AC-082` **Audit Trail** — QP / Regulatory Inspector · automatisiert · live · ✓BELEGT
- `AC-092` **Reports Dashboard** — QA-Manager / Management · automatisiert · live · ✓BELEGT
- `AC-104` **Data Governance Dokumentation** — Alle Nutzer / DPO · menschlich · live · ✓BELEGT
- `AC-107` **Compliance Score Tracking** — QA-Manager / Management · automatisiert · live · ✓BELEGT
- `DR-043` **AI-Supported Compliance Desk — SOP Drafting** — Thai cannabis supplier / operator · AI-gestützt · im-Code · ✓BELEGT
- `DR-044` **AI-Supported Compliance Desk — Training Content** — Thai cannabis supplier / operator · AI-gestützt · im-Code · ✓BELEGT
- `DR-045` **AI-Supported Compliance Desk — Translation Support** — Thai cannabis supplier / EU buyer · AI-gestützt · im-Code · ✓BELEGT
- `DR-046` **AI-Supported Compliance Desk — Gap Report Structuring** — Thai cannabis supplier / operator · AI-gestützt · im-Code · ✓BELEGT
- `DR-047` **AI-Supported Compliance Desk — Document Classification** — Thai cannabis supplier / operator · AI-gestützt · im-Code · ✓BELEGT
- `DR-077` **Cooperative Document Review Integration (AI engine 3rd-party)** — Thai cannabis supplier / Cannaworld operations · AI-gestützt · Idee · ✓BELEGT

**Europe** (2)

- `EU-015` **EU Analytics Dashboard** — EU-Management / Compliance-Team · automatisiert · live · ✓BELEGT
- `EU-017` **EU Data Governance** — DPO / Nutzer · menschlich · live · ✓BELEGT

**übergreifend** (2)

- `CA-21` **Dev-/Technologie-Partner-Koordination** — Partner · menschlich · im-Code · ✓BELEGT
- `CUST-07` **Connector-Profil-Abruf** — Kunde/intern · automatisiert · live · ✓BELEGT


### Education  ·  30 Services

**Gateway** (19)

- `DR-010` **Training Documentation Setup** — Thai cannabis cultivator / operator · menschlich · Konzept · ✓BELEGT
- `DR-011` **Digital Training Material Package** — Thai cannabis cultivator / operator · AI-gestützt · Konzept · ✓BELEGT
- `DR-012` **Documented Digital Awareness Training Session** — Thai cannabis farm staff · menschlich · Konzept · ✓BELEGT
- `DR-013` **Documented On-Site Training** — Thai cannabis farm staff · menschlich · Konzept · ✓BELEGT
- `DR-014` **Quarterly On-Site Training Refresher** — Thai cannabis farm staff · menschlich · Konzept · ✓BELEGT
- `DR-015` **Monthly Training Material Update** — Thai cannabis cultivator / operator · AI-gestützt · Konzept · ✓BELEGT
- `DR-016` **Training Records Management (monthly)** — Thai cannabis cultivator / operator · menschlich · Konzept · ✓BELEGT
- `DR-017` **AI-Supported Training Content Desk (monthly)** — Thai cannabis cultivator / operator · AI-gestützt · Konzept · ✓BELEGT
- `DR-070` **Post-Harvest Export Readiness Education Event** — Thai cannabis farm owners / cultivators · menschlich · Konzept · ✓BELEGT
- `GW-117` **Training Matrix (GxP-Schulungsplanung)** — Farm, Exporter, QA · automatisiert · live · ✓BELEGT
- `GW-118` **Training Records** — Alle Rollen · automatisiert · live · ✓BELEGT
- `GW-119` **E-Learning (GxP-Module)** — Alle Rollen · automatisiert · live · ✓BELEGT
- `GW-120` **Knowledge Tests** — Alle Rollen · automatisiert · live · ✓BELEGT
- `GW-121` **Live Classroom (Session Lobby)** — Alle Rollen · automatisiert · live · ✓BELEGT
- `GW-122` **Live Classroom (Video-Session mit KI)** — Instructor, Teilnehmer · AI-gestützt · live · ✓BELEGT
- `GW-123` **Session Notes & Chat KI** — Instructor, Auditor · AI-gestützt · live · ✓BELEGT
- `GW-124` **Education Statistiken** — Admin, Instructor · automatisiert · live · ✓BELEGT
- `GW-125` **Education Landing (öffentlich)** — Extern · automatisiert · live · ✓BELEGT
- `HS-21` **Thai R&D-Partnerschaft (NSTDA/CP-Group)** — Thai Regulator / Investor · menschlich · Konzept · ✓BELEGT

**Marketplace** (1)

- `MP-058` **GMP-Training-Records (Schulungsnachweise)** — Exporter (Facility) · menschlich · im-Code · ✓BELEGT

**AICert** (2)

- `AC-100` **Classroom / Education Sessions** — Facility-Mitarbeiter / Nutzer · automatisiert · live · ✓BELEGT
- `CAT-04` **GMP/GACP-Auditor-Zertifizierung (Train-the-Auditor)** — Auditor · menschlich · Konzept · ≈ANNAHME

**Germany** (1)

- `GE-EDU-07` **Guidance-Level (Read-Aloud/Barrierearm)** — Mitarbeiter/Auditor · automatisiert · im-Code · ✓BELEGT

**AIHF** (1)

- `AIHF-10` **AIHF×CannaWorld Joint-Education / Curriculum** — Farmer/Auditor/Mitarbeiter · menschlich · Idee · ≈ANNAHME · 🅰️AIHF

**übergreifend** (6)

- `GE-EDU-01` **Classroom-Sessions (geplant/live)** — Mitarbeiter/Auditor · automatisiert · im-Code · ✓BELEGT
- `GE-EDU-02` **Session-Chat** — Mitarbeiter/Auditor · automatisiert · im-Code · ✓BELEGT
- `GE-EDU-03` **Session-Notizen** — Mitarbeiter/Auditor · automatisiert · im-Code · ✓BELEGT
- `GE-EDU-04` **Classroom-AI (Transkript)** — Mitarbeiter/Auditor · AI-gestützt · im-Code · ✓BELEGT
- `GE-EDU-05` **Live-Uebersetzung** — Mitarbeiter/Auditor · AI-gestützt · im-Code · ✓BELEGT
- `GE-EDU-06` **Native Speech/TTS** — Mitarbeiter/Auditor · AI-gestützt · im-Code · ✓BELEGT


### Logistics  ·  30 Services

**Gateway** (16)

- `CAT-13` **Packaging-Prozess-Service** — Processor/Hersteller · menschlich · Konzept · ≈ANNAHME
- `DR-036` **Logistics Partner Coordination — per export case** — Thai cannabis supplier preparing physical shipment · menschlich · Konzept · ✓BELEGT
- `GW-036` **EU Intake – Wareneingang bestätigen** — EU Wholesaler RP, EU GMP QA · automatisiert · live · ✓BELEGT
- `GW-045` **Cold Chain Monitoring** — Logistics, Exporter, Auditor · automatisiert · live · ✓BELEGT
- `GW-046` **RFID Integration & Tracking** — Logistics, Warehouse, Customs · automatisiert · live · ✓BELEGT
- `GW-047` **Logistics Sync (Status-Propagation)** — System/intern · automatisiert · live · ✓BELEGT
- `GW-048` **Logistik & Versand Dashboard** — Exporter, Logistics, Farm · automatisiert · live · ✓BELEGT
- `GW-049` **Freight Forwarder Booking** — Exporter, Logistics · automatisiert · live · ✓BELEGT
- `GW-050` **Customs Integration – ATLAS EU-Abfertigung** — Logistics, Customs Broker · automatisiert · im-Code · ✓BELEGT
- `GW-051` **ICS2 Deklaration Thailand (Narcotics HS Code)** — Exporter, Customs Broker · automatisiert · im-Code · ✓BELEGT
- `GW-054` **Label-Generator (ZPL/SBPL/GS1-DataMatrix)** — Warehouse, Logistics · automatisiert · live · ✓BELEGT
- `GW-055` **Label Printing Dashboard** — Warehouse, Logistics · automatisiert · live · ✓BELEGT
- `GW-056` **Packaging Management (GS1-Hierarchie)** — Warehouse, Logistics · automatisiert · live · ✓BELEGT
- `GW-057` **Warehouse Management** — Warehouse, Logistics · automatisiert · live · ✓BELEGT
- `GW-069` **Geofencing – Zonen & Positions-Tracking** — Logistics, Regulierer · automatisiert · live · ✓BELEGT
- `HS-04` **GDP-Cold-Chain-Logistik TH→EU** — Cannabis Exporter / Plattformkunde · Durchlauf-extern · live · ✓BELEGT

**Marketplace** (5)

- `MP-010` **Supply-Chain-Tracker (Batch-Tracking + RFC-3161-Timestamping)** — Exporter/Importer/Logistik · automatisiert · live · ✓BELEGT
- `MP-011` **Carrier-Webhook (DHL/FedEx/UPS/DPD)** — Platform/BackOffice · automatisiert · live · ✓BELEGT
- `MP-063` **Logistik-Dashboard (GDP-Shipment-Tracking)** — Exporter/Importer · automatisiert · live · ✓BELEGT
- `MP-064` **Batch-Scan (Mobile Event-Erfassung)** — Logistik-Personal · automatisiert · live · ✓BELEGT
- `MP-065` **Batch-Track (Öffentliches Tracking)** — Öffentlich/Apotheke · automatisiert · live · ✓BELEGT

**AICert** (1)

- `AC-016` **GS1 Registry (GTIN-Verwaltung)** — Hersteller / Exporteur · automatisiert · live · ✓BELEGT

**Europe** (3)

- `EU-009` **EU Batch-Tracking** — EU-Importeur / Warehouse · automatisiert · live · ✓BELEGT
- `EU-010` **EU Lager-Management** — EU-Warehouse-Manager · automatisiert · live · ✓BELEGT
- `EU-011` **EU Logistik-Dashboard** — EU-Logistik-Manager · automatisiert · live · ✓BELEGT

**Germany** (2)

- `GE-LOG-01` **Logistik-Modul** — Exporteur/Spediteur · automatisiert · im-Code · ✓BELEGT
- `GE-LOG-04` **Warehouse/Inventory** — Exporteur/Spediteur · automatisiert · im-Code · ✓BELEGT

**übergreifend** (3)

- `GE-LOG-02` **Shipment-Status-Sync** — Exporteur/Spediteur · automatisiert · im-Code · ✓BELEGT
- `GE-LOG-03` **Customs/Zoll-Sync** — Exporteur/Spediteur · automatisiert · im-Code · ✓BELEGT
- `HS-05` **Aktive Temp-Container-Leihe (Air-Cargo)** — Exporter / Freight Forwarder · Durchlauf-extern · live · ✓BELEGT


### Support/BackOffice  ·  30 Services

**Gateway** (14)

- `GM-005` **Onboarding Requirements Package (Partner/Visa)** — externer Kontakt/Mitarbeiter · menschlich · Konzept · ✓BELEGT
- `GW-126` **Komms-Bot-Router (AI-Chat-Kanal)** — Benutzer aller Rollen · AI-gestützt · live · ✓BELEGT
- `GW-127` **Notification Dispatcher (Multi-Channel)** — Admin, Abonnenten · automatisiert · live · ✓BELEGT
- `GW-128` **E-Mail Versand (Transaktional)** — Alle Rollen · automatisiert · live · ✓BELEGT
- `GW-129` **Kontakt-E-Mail (öffentliches Formular)** — Extern · automatisiert · live · ✓BELEGT
- `GW-130` **Resend Webhook (Bounce/Suppression)** — System/intern · automatisiert · live · ✓BELEGT
- `GW-131` **SMS-Alerts (Twilio)** — Farm, Logistics, Admin · automatisiert · live · ✓BELEGT
- `GW-132` **WhatsApp-Alerts** — Farm, Logistics, Admin · automatisiert · live · ✓BELEGT
- `GW-133` **Telegram-Alerts & Channel-Abo** — Admin, Farm, Logistics · automatisiert · live · ✓BELEGT
- `GW-134` **LINE-Relay (Ingest)** — LINE-Benutzer · automatisiert · live · ✓BELEGT
- `GW-135` **LINE-Broadcast** — LINE-Abonnenten · automatisiert · live · ✓BELEGT
- `GW-136` **LINE Source-Tracking** — LINE-Benutzer · automatisiert · live · ✓BELEGT
- `GW-137` **Kontakt-Inbox (Dashboard)** — Admin · automatisiert · live · ✓BELEGT
- `GW-150` **HR & Recruiting** — Admin · automatisiert · live · ✓BELEGT

**Marketplace** (3)

- `MP-044` **Service-Anfrage Notification (Email)** — CannaWorld-Team · automatisiert · live · ✓BELEGT
- `MP-045` **Marketplace-Benachrichtigungsmail (Event-Templates)** — Exporter/Importer/Admin · automatisiert · live · ✓BELEGT
- `MP-054` **Admin-Onboarding-Review** — Admin · menschlich · live · ✓BELEGT

**AICert** (3)

- `AC-053` **Send Contact / Service-Inquiry Benachrichtigung** — Sales / Admin · automatisiert · live · ✓BELEGT
- `AC-054` **Send Invitation** — Neue Nutzer · automatisiert · live · ✓BELEGT
- `AC-055` **Notify Admin Registration** — Admin · automatisiert · live · ✓BELEGT

**Germany** (8)

- `GE-SUP-01` **Support-Inbox (Konversationen)** — intern/Kunde · automatisiert · im-Code · ✓BELEGT
- `GE-SUP-02` **Support Inbound (Codex-Bruecke)** — intern/Kunde · automatisiert · im-Code · ✓BELEGT
- `GE-SUP-03` **Support Outbound (+Ack)** — intern/Kunde · automatisiert · im-Code · ✓BELEGT
- `GE-SUP-04` **Support-Reply** — intern/Kunde · menschlich · im-Code · ✓BELEGT
- `GE-SUP-05` **Support-Zuweisung** — intern/Kunde · menschlich · im-Code · ✓BELEGT
- `GE-SUP-06` **Support-Triage (AI)** — intern/Kunde · AI-gestützt · im-Code · ✓BELEGT
- `GE-SUP-07` **Eskalation** — intern/Kunde · automatisiert · im-Code · ✓BELEGT
- `GE-SUP-08` **Staff-Rollen-Verwaltung** — intern/Kunde · menschlich · im-Code · ✓BELEGT

**übergreifend** (2)

- `CA-06` **Recruiting-Interview (Digital & In-Person)** — Mitarbeiter · menschlich · live · ✓BELEGT
- `CA-12` **Qualifikationsmatrix & Staff-Onboarding** — Mitarbeiter · menschlich · live · ✓BELEGT


### Documents  ·  25 Services

**Gateway** (4)

- `DR-035` **Export Case File Maintenance (monthly per active buyer)** — Thai cannabis supplier with active repeat EU export · menschlich · Konzept · ✓BELEGT
- `GW-142` **Signaturfang (Öffentliche Signatur-URL)** — Extern (Unterzeichner) · automatisiert · live · ✓BELEGT
- `GW-165` **Dokumenten-Vault (Dashboard)** — Alle Rollen · automatisiert · live · ✓BELEGT
- `ST-16` **MoU-Farm-Onboarding (Vorlage/Instrument)** — Farm/Kooperative · menschlich · Konzept · ✓BELEGT

**Marketplace** (1)

- `MP-032` **Legal Acceptance & Consent-Logging** — Exporter/Importer · automatisiert · live · ✓BELEGT

**AICert** (8)

- `AC-004` **Document-AI Analyse** — QA-Manager / Auditor · AI-gestützt · live · ✓BELEGT
- `AC-009` **SOP-Generierung** — QA-Manager / SOP-Author · AI-gestützt · live · ✓BELEGT
- `AC-020` **D-Trust QES (Qualifizierte Elektronische Signatur)** — QP / Auditor · automatisiert · live · ✓BELEGT
- `AC-021` **DocuSign Integration** — QP / Vertragspartner · automatisiert · im-Code · ✓BELEGT
- `AC-022` **QMS Signature Verifier** — Importeur / Käufer · automatisiert · live · ✓BELEGT
- `AC-065` **SOP Bibliothek & Manager** — QA-Manager / SOP-Author · automatisiert · live · ✓BELEGT
- `AC-090` **Signature Capture (eSignature)** — QP / Auditor / Manager · automatisiert · live · ✓BELEGT
- `AC-091` **Document Archive** — QA-Manager · automatisiert · live · ✓BELEGT

**Europe** (1)

- `EU-014` **EU Dokumenten-Verwaltung** — EU-Importeur / QP · automatisiert · live · ✓BELEGT

**Germany** (2)

- `GE-DOC-01` **Document Vault** — Kunde/Partner · automatisiert · im-Code · ✓BELEGT
- `GE-DOC-02` **Document AI** — Kunde/Partner · AI-gestützt · im-Code · ✓BELEGT

**übergreifend** (9)

- `CA-05` **Vertrags-/Onboarding-Gespräch (Work Agreement)** — Mitarbeiter · menschlich · live · ✓BELEGT
- `CUST-04` **Compliance-Dokument-Abruf** — Kunde/Auditor · automatisiert · live · ✓BELEGT
- `CUST-05` **Compliance-Dokument-Suche** — Kunde/Auditor · AI-gestützt · live · ✓BELEGT
- `GM-001` **36-Monats-Kooperationsvorschlag (Anchor-Buyer-Modell)** — Anchor-Buyer / interner Vertrieb · menschlich · live · ✓BELEGT
- `GM-002` **Phase-0 Statement of Work (SOW)** — Partner / Kunde · menschlich · live · ✓BELEGT
- `GM-003` **Bilateraler Dokumenten-Dispatch mit Integritätsprüfung** — Partner / internes Team · menschlich · live · ✓BELEGT
- `GM-010` **Bilinguales EN/TH Dokument-Branding-Paket** — Partner in Thailand (TH-Markt) · menschlich · live · ≈ANNAHME
- `ST-05` **Compliance-Dossier-Management (Gatekeeper-Kern)** — Farm/Exporteur/Importeur · AI-gestützt · im-Code · ✓BELEGT
- `ST-15` **MoU-Zertifizierungspartner (Vorlage/Instrument)** — Zertifizierungspartner · menschlich · Konzept · ✓BELEGT


### Cultivation  ·  25 Services

**Gateway** (15)

- `CAT-10` **Drying-/Trocknungs-Prozess-Service** — Farm/Processor · menschlich · Konzept · ≈ANNAHME
- `CAT-11` **Trimming-Prozess-Service** — Farm/Processor · menschlich · Konzept · ≈ANNAHME
- `CAT-15` **Post-Harvest-Management (Gesamtprozess)** — Farm/Processor · menschlich · Konzept · ≈ANNAHME
- `GE-CUL-03` **Farm-Produzenten-Register** — Farm · automatisiert · im-Code · ✓BELEGT
- `GW-003` **Meine Chargen (Farm-View)** — Farm · automatisiert · live · ✓BELEGT
- `GW-063` **Facility Farm Dashboard** — Farm · automatisiert · live · ✓BELEGT
- `GW-064` **IoT Gateway – Sensor-Daten-Eingang** — IoT-Geräte, Farm-System · automatisiert · live · ✓BELEGT
- `GW-065` **IoT Anomalie-Detektor** — Farm, QA · automatisiert · live · ✓BELEGT
- `GW-066` **Autonomer Farm Controller** — Farm-Automation · AI-gestützt · im-Code · ✓BELEGT
- `GW-067` **Predictive Yield Engine** — Farm, Exporter · AI-gestützt · im-Code · ✓BELEGT
- `GW-070` **Strain-Registrierung (Genetik IP)** — Züchter, Farm · automatisiert · live · ✓BELEGT
- `GW-143` **Offline Sync Resolver (Farm-PWA)** — Farm (Field-Mode PWA) · automatisiert · live · ✓BELEGT
- `GW-172` **Field Mode PWA (Offline-Farm-UI)** — Farm-Worker · automatisiert · live · ✓BELEGT
- `HS-06` **Post-Harvest-Equipment (Trim/Dry/Cure)** — Thai/EU Cultivator-Processor · Durchlauf-extern · live · ✓BELEGT
- `HS-19` **Thai Staatspharmaka-Produktion (GPO)** — Thai Krankenhaus / Exporteur · Durchlauf-extern · live · ✓BELEGT

**Marketplace** (2)

- `MP-067` **Batch-Erstellen (Exporter)** — Exporter · menschlich · live · ✓BELEGT
- `MP-068` **Meine Batches (Exporter-Verwaltung)** — Exporter · automatisiert · live · ✓BELEGT

**AICert** (3)

- `AC-019` **Trolmaster IoT Integration** — Grow-Manager / QA · automatisiert · live · ✓BELEGT
- `AC-073` **IoT Monitoring Hub** — Grow-Manager / QA · automatisiert · live · ✓BELEGT
- `AC-074` **Trolmaster Dashboard** — Grow-Manager · automatisiert · live · ✓BELEGT

**Germany** (5)

- `GE-CUL-01` **Farm Self-Audit (Einreichung)** — Farm · AI-gestützt · im-Code · ✓BELEGT
- `GE-CUL-02` **Farm-Audit Freigabe/Entscheidung** — Farm · menschlich · im-Code · ✓BELEGT
- `GE-CUL-04` **Farm-Workspace** — Farm · automatisiert · im-Code · ✓BELEGT
- `GE-CUL-05` **Farm-Dashboard** — Farm · automatisiert · im-Code · ✓BELEGT
- `GE-CUL-06` **Farm-Onboarding** — Farm · automatisiert · im-Code · ✓BELEGT


### Facility  ·  25 Services

**Gateway** (11)

- `CAT-05` **Facility-Blueprint-Planung** — Farm/Facility · menschlich · Konzept · ≈ANNAHME
- `CAT-06` **HVAC-Engineering (Facility)** — Farm/Facility · menschlich · Konzept · ≈ANNAHME
- `CAT-07` **Bewässerungs-/Irrigation-Engineering** — Farm · menschlich · Konzept · ≈ANNAHME
- `CAT-08` **Beleuchtungs-/Lighting-Engineering** — Farm · menschlich · Konzept · ≈ANNAHME
- `CAT-09` **Facility-Layout-Planung** — Farm/Facility · menschlich · Konzept · ≈ANNAHME
- `GW-059` **Facility Planner (Grundriss & Zonen)** — Farm, Exporter, Auditor · automatisiert · live · ✓BELEGT
- `GW-060` **Facility Import (Bulk)** — Admin · automatisiert · live · ✓BELEGT
- `GW-061` **Facility Layout Generator (KI)** — Farm, Exporter · AI-gestützt · im-Code · ✓BELEGT
- `GW-062` **Facility Integration Hub** — Admin, Farm · automatisiert · live · ✓BELEGT
- `GW-068` **Sanierungs-Schedule Enforcer** — Farm, QA · automatisiert · live · ✓BELEGT
- `GW-144` **InfinityYou AR-Gateway** — InfinityYou OS, Farm-Inspector · automatisiert · live · ✓BELEGT

**Marketplace** (3)

- `CA-10` **Facility-Kunden-Erstgespräch** — Partner · menschlich · live · ✓BELEGT
- `MP-047` **Real-Estate-Matching (Facility/Standort)** — Importer/Investor · automatisiert · live · ✓BELEGT
- `MP-070` **Buyer-Präferenzen-Profil (Real Estate)** — Importer/Investor · automatisiert · live · ✓BELEGT

**AICert** (10)

- `AC-007` **Facility AI Planner** — Facility-Designer / Investor · AI-gestützt · live · ✓BELEGT
- `AC-037` **Facility CRUD API** — Facility-Manager / Admin · automatisiert · live · ✓BELEGT
- `AC-038` **Facility Bulk Import** — Admin / Sales-Ops · automatisiert · live · ✓BELEGT
- `AC-058` **Facility Compliance Onboarding** — Neue Facility / Grow-Manager · automatisiert · live · ✓BELEGT
- `AC-059` **Facility Onboarding Wizard** — Facility-Manager · automatisiert · live · ✓BELEGT
- `AC-072` **Environmental Monitoring** — QC / Facility-Manager · automatisiert · live · ✓BELEGT
- `GE-FAC-01` **Facility-Planner (Plaene/Zonen/Verbindungen)** — Farm/Facility · automatisiert · im-Code · ✓BELEGT
- `GE-FAC-02` **Facility-Blueprint-Templates** — Farm/Facility · automatisiert · im-Code · ✓BELEGT
- `GE-FAC-03` **Facility-Plan Export** — Farm/Facility · automatisiert · im-Code · ✓BELEGT
- `GE-FAC-04` **Facility-Plan Import** — Farm/Facility · automatisiert · im-Code · ✓BELEGT

**Germany** (1)

- `GE-FAC-05` **Facilities-Register** — Farm/Facility · automatisiert · im-Code · ✓BELEGT


### Billing  ·  25 Services

**Gateway** (4)

- `GW-111` **Billing Dashboard & Invoice-Management** — Admin, Exporter · automatisiert · live · ✓BELEGT
- `GW-112` **Invoice PDF-Generierung** — Admin · automatisiert · live · ✓BELEGT
- `GW-113` **Überfälligkeits-Checker (Cron)** — Admin · automatisiert · live · ✓BELEGT
- `GW-114` **Stripe Webhook Verarbeitung** — System/intern · automatisiert · im-Code · ✓BELEGT

**Marketplace** (11)

- `MP-017` **Autonomes Rechnungs-Engine (CannaLedger)** — Exporter/Importer · automatisiert · live · ✓BELEGT
- `MP-018` **Interner Billing-Router (5 Service-Features)** — Exporter/Importer · automatisiert · live · ✓BELEGT
- `MP-019` **Rechnungs-Zahlung erstellen (Invoice Payment)** — Importer · automatisiert · live · ✓BELEGT
- `MP-020` **Produkt-Kaufcheckout erstellen** — Importer · automatisiert · live · ✓BELEGT
- `MP-021` **Service-Zahlung erstellen (Post-Harvest etc.)** — Exporter · automatisiert · live · ✓BELEGT
- `MP-022` **Abonnement-Checkout erstellen** — Exporter/Importer · automatisiert · live · ✓BELEGT
- `MP-023` **Stripe-Webhook-Verarbeitung** — Platform/BackOffice · automatisiert · live · ✓BELEGT
- `MP-024` **Zahlungsverifizierung (Checkout-Session)** — Importer/Exporter · automatisiert · live · ✓BELEGT
- `MP-025` **Service-Zahlungsverifizierung** — Exporter · automatisiert · live · ✓BELEGT
- `MP-026` **Kunden-Portal (Stripe)** — Exporter/Importer · automatisiert · live · ✓BELEGT
- `MP-027` **Abonnement-Status-Check** — Frontend · automatisiert · live · ✓BELEGT

**AICert** (5)

- `AC-043` **Checkout (Revolut/SumUp)** — AICert-Kunde · automatisiert · live · ✓BELEGT
- `AC-044` **Payment Provider Webhook** — Payment-Provider · automatisiert · live · ✓BELEGT
- `AC-045` **Subscription Check** — AICert-Nutzer · automatisiert · live · ✓BELEGT
- `AC-046` **Customer Portal** — AICert-Kunde · automatisiert · live · ✓BELEGT
- `AC-047` **Admin Billing Dashboard** — Admin · automatisiert · live · ✓BELEGT

**übergreifend** (5)

- `CA-16` **Kalkulation & Finanzplanung (Partner-Koop)** — Partner · menschlich · im-Code · ✓BELEGT
- `GE-BIL-01` **Abo-Billing (Stripe) Testzugang/GMP/Enterprise** — Kunde · automatisiert · live · ✓BELEGT
- `GE-BIL-02` **Rechnungsstellung/Invoicing** — Kunde · automatisiert · im-Code · ✓BELEGT
- `HS-13` **Cannabis-konformes Banking** — Cannabis-Operator · Durchlauf-extern · Konzept · ✓BELEGT
- `HS-14` **Cannabis-freundliche Zahlungsabwicklung** — Cannabis-Händler / Plattform · automatisiert · Konzept · ✓BELEGT


### Pharmacy  ·  16 Services

**Gateway** (2)

- `GW-159` **Pharmacy Dispense** — Apotheker · automatisiert · live · ✓BELEGT
- `GW-160` **Pharmacy Receive** — Apotheker · automatisiert · live · ✓BELEGT

**AICert** (3)

- `AC-088` **QP Inbox** — QP (Qualified Person) · automatisiert · live · ✓BELEGT
- `AC-089` **QP Release Form** — QP · menschlich · live · ✓BELEGT
- `AC-108` **CannaWorld Germany Intake (AICert-Seite)** — Deutsche Apotheke / Importeur · menschlich · live · ✓BELEGT

**Europe** (3)

- `DR-069` **Pharmacy Access Layer — Direct & Pharmacy-Near Import Model** — German / EU pharmacy · automatisiert · Idee · ✓BELEGT
- `EU-001` **EU Batch Import & QP-Freigabe** — EU-QP / Importeur · menschlich · live · ✓BELEGT
- `EU-018` **Klinisches Feedback Aggregator** — Pharmakovigilanz / Regulatory · automatisiert · live · ✓BELEGT

**Germany** (8)

- `GE-PHA-01` **Apotheken-Import (Managed/Direct)** — Apotheke · automatisiert · im-Code · ✓BELEGT
- `GE-PHA-02` **Apotheken-Wareneingang** — Apotheke · automatisiert · im-Code · ✓BELEGT
- `GE-PHA-03` **Apotheken-Abgabe** — Apotheke · automatisiert · im-Code · ✓BELEGT
- `GM-007` **Apothekergateway (cannaworld-germany.de) Betrieb** — Apotheken (Deutschland) · automatisiert · live · ✓BELEGT
- `HS-15` **EU-GMP-Import Thai-Cannabis → DE-Apotheke** — Deutsche Apotheke / Großhändler · menschlich · live · ✓BELEGT
- `HS-16` **Telemedizin & Cannabis-Rezeptierung DE** — Deutscher Cannabis-Patient · AI-gestützt · live · ✓BELEGT
- `HS-17` **Online-Apotheken-Versand Cannabis DE** — Deutscher Patient / Apotheke · Durchlauf-extern · live · ✓BELEGT
- `HS-18` **Stationäres Cannabis-Apotheken-Netzwerk DE** — Deutscher Patient · menschlich · live · ✓BELEGT


### Advisory  ·  15 Services

**Gateway** (1)

- `ST-14` **Lighthouse-/Anchor-Farm-Blueprint-Replikation** — Farm/Produzent · menschlich · Konzept · ✓BELEGT

**Marketplace** (1)

- `DR-031` **Buyer Q&A Coordination (hourly)** — EU buyer / Thai supplier · menschlich · Konzept · ✓BELEGT

**AICert** (6)

- `AC-033` **Concierge Buchung (Farm-Visit)** — Auditor / Concierge-Client · automatisiert · live · ✓BELEGT
- `AC-034` **Concierge Dossier-Berechnung** — Sales / Concierge-Team · automatisiert · live · ✓BELEGT
- `AC-035` **Concierge Fragebogen-Einladung** — Facility-Kontakt · automatisiert · live · ✓BELEGT
- `AC-036` **Concierge Visit-Pass** — Auditor / Inspector · automatisiert · live · ✓BELEGT
- `AC-102` **Pre-Audit Service (3-Tier)** — Facility / Exporteur · AI-gestützt · live · ✓BELEGT
- `AC-103` **Concierge Service (Gesamt-Workflow)** — Neuer Facility-Kunde · menschlich · live · ✓BELEGT

**Europe** (2)

- `HS-10` **Cannabis-Marktintelligenz & Regulierungsberatung EU** — Cannabis-Unternehmen / Investor · menschlich · live · ✓BELEGT
- `HS-22` **EU-Markt-Zugang-Beratung für Thai-Exporter** — Thai Cannabis Exporter · menschlich · im-Code · ≈ANNAHME

**übergreifend** (5)

- `CA-04` **Remote-Evaluierung (Digital Meeting/Evaluation)** — Partner · menschlich · live · ✓BELEGT
- `CA-17` **Coaching & Management-Beratung** — intern · menschlich · im-Code · ✓BELEGT
- `HS-12` **Cannabis-Versicherung** — Cannabis-Operator (TH/EU) · menschlich · Konzept · ✓BELEGT
- `ST-01` **Hub-&-Spoke-Architektur-Orchestrierung** — Farm/Hub-Betreiber/Importeur · menschlich · Konzept · ✓BELEGT
- `ST-18` **Mass-Balance-/Kapazitätsplanung Hub** — Hub-Betreiber/intern · menschlich · Konzept · ✓BELEGT


### Marketing/GTM  ·  15 Services

**Gateway** (6)

- `DR-071` **Regional Partner Farm Onboarding Event & Free Readiness Assessment** — Thai cannabis farm owners seeking EU market access · menschlich · Konzept · ✓BELEGT
- `GM-006` **Bangkok Hemp Expo — Messeauftritt / Video-Content** — B2B-Zielgruppe (Apotheker, Händler) · menschlich · live · ✓BELEGT
- `GW-168` **Import-Seite (öffentlich)** — EU-Importeur (Extern) · automatisiert · live · ✓BELEGT
- `GW-169` **Solutions Seite (öffentlich)** — Extern · automatisiert · live · ✓BELEGT
- `GW-170` **Compliance Service Detail (öffentlich)** — Extern · automatisiert · live · ✓BELEGT
- `GW-171` **InfinityYou Produktseite (öffentlich)** — Extern · automatisiert · live · ✓BELEGT

**Marketplace** (3)

- `MP-038` **CRM-Integration (HubSpot)** — Sales/Admin · automatisiert · im-Code · ✓BELEGT
- `MP-046` **SEO Indexing Notify (Google)** — Platform/SEO · automatisiert · live · ✓BELEGT
- `MP-074` **CRM-Pipeline (Vertriebs-Dashboard)** — Sales/Admin · menschlich · im-Code · ✓BELEGT

**AICert** (1)

- `AC-109` **Guarantee Page** — Interessent / Kunde · automatisiert · live · ✓BELEGT

**Europe** (1)

- `EU-016` **EU Services Übersicht (Gateway Services)** — EU-Interessent / Kunde · automatisiert · live · ✓BELEGT

**Germany** (1)

- `GM-008` **Google Ads Kampagne (reguliertes Cannabis/Pharma)** — Apotheken / B2B-Einkäufer (Deutschland) · automatisiert · live · ✓BELEGT

**übergreifend** (3)

- `CA-09` **Messe- & Branchen-Repräsentanz** — Partner · menschlich · live · ✓BELEGT
- `CA-15` **PR & Medienpartnerschaft** — Partner · menschlich · Konzept · ✓BELEGT
- `CA-19` **Marketing-Strategie & Content-Partner** — Partner · menschlich · im-Code · ✓BELEGT


### Federation/Partnership  ·  11 Services

**Gateway** (2)

- `GM-011` **CannaWorld als Messe-Aussteller (Industry Presence)** — Branchenkontakte (Apotheker, Händler, Behörden) · menschlich · live · ≈ANNAHME
- `HS-23` **Thai Verbands-/Regulierungsnetzwerk (THTA)** — Thai Cannabis Operator · menschlich · Konzept · ✓BELEGT · 🅰️AIHF

**Europe** (1)

- `HS-24` **EU Cannabis-Verbands-/Lobby-Anbindung** — EU Cannabis-Unternehmen / Partner · menschlich · Konzept · ✓BELEGT

**AIHF** (7)

- `AIHF-01` **AIHF-Beglaubigung / zeremonielle Anerkennung von CannaWorld** — CannaWorld / Markt-Öffentlichkeit · menschlich · live · ✓BELEGT · 🅰️AIHF
- `AIHF-02` **AIHF Federation-Membership-Vermittlung** — Farm/Produzent/Exporteur · menschlich · Konzept · ≈ANNAHME · 🅰️AIHF
- `AIHF-06` **AIHEF Konferenz- & Speaker-Plattform** — Branche/Föderationsnetzwerk · menschlich · live · ✓BELEGT · 🅰️AIHF
- `AIHF-08` **AIHF Federation-Registry / Mitglieder-Directory** — Föderationsmitglieder/Buyer · automatisiert · Idee · ≈ANNAHME · 🅰️AIHF
- `AIHF-14` **AIHF Ceremonial-Endorsement-Issuance (Partner)** — Partner/Farm/Produzent · menschlich · Konzept · ≈ANNAHME · 🅰️AIHF
- `CA-20` **AIHF-Partnerschaftsgespräch** — Partner · menschlich · Konzept · ≈ANNAHME · 🅰️AIHF
- `GM-004` **AIHEF Speaker-Participation (Federation-Konferenz-Redner)** — AIHEF / Sunpit Boonyasampan · menschlich · live · ✓BELEGT · 🅰️AIHF

**übergreifend** (1)

- `CA-11` **Business-Development-Kooperation** — Partner · menschlich · im-Code · ✓BELEGT


### Sourcing  ·  5 Services

**Gateway** (2)

- `GW-115` **Supplier Qualification** — Exporter, Admin · automatisiert · live · ✓BELEGT
- `HS-20` **Thai Cultivator-Exporter-Integration** — EU Importer / Marketplace · menschlich · im-Code · ✓BELEGT

**Marketplace** (1)

- `CA-01` **Farm-Sourcing via Facebook-Lead** — Farm · menschlich · live · ✓BELEGT

**AICert** (1)

- `AC-099` **Supplier-Qualifikation & Audit** — QA-Manager / Procurement · menschlich · live · ✓BELEGT

**Europe** (1)

- `EU-008` **EU Lieferanten-Verwaltung** — EU-Importeur / Procurement · menschlich · live · ✓BELEGT

