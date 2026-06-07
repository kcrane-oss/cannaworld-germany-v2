# CannaWorld – Module ↔ Service Mapping (Reconciliation)

> Verbindet den **kommerziellen** Schnitt (`service-definitions.md`, Framework v2: 9 Module)
> mit dem **technischen** Register (`service-register.csv`: 114 Services). Zeigt, welche
> Register-IDs welches kommerzielle Modul bedienen — plus Lücken (Module ohne Code) und
> Orphans (Services ohne kommerzielles Modul). Stand 2026-06-06.

## Mapping: Framework-Modul → Register-Service-IDs

| Modul (kommerziell) | Bedienende Register-Services | Abdeckung |
|---|---|---|
| **M1 GACP Readiness** | ADV-01…07 (Site-Inspektion, Gap-Report, Blueprint, Facility-Monitoring, SOP/Hygiene, Koordination), CUL-01/02, FAC-01…04, QUA-06/07 | **stark** (abgerechnet: CW-INV-2026-001) |
| **M2 Digital Compliance Infrastructure** | DOC-01/02, TRU-02/03/04/05, QUA-01, CUL-04, ADV-15, PLT-07 | **stark** (Code-live) |
| **M3 Education & Training** | EDU-01…07 (Classroom, Sessions, AI-Transkript, Live-Übersetzung, TTS, Guidance), ADV-27 | **stark** (Code-Plattform vorhanden) |
| **M4 Supplier Onboarding & Compliance Review** | MKT-07, CUL-01/02, TRU-01/07/08, ADV-08/09/10, PLT-10, QUA-07 | mittel (Review-Workflow teils manuell) |
| **M5 B2B Marketplace & Buyer Access** | MKT-01…06, ADV-12/13/14/15/16/21/25/26, AIHF-01/03/04, PLT-03 | **stark** |
| **M6 Export Readiness** | ADV-17/23/24, LOG-01/02/03, QUA-03/05, REG-05 | mittel |
| **M7 Batch/COA/CAPA/Buyer-DD** | QUA-02/04/08, TRU-06, ADV-14/18/19/20, SUP-07 | **stark** |
| **M8 AI-Supported Compliance Desk** | DOC-02, REG-02, TRU-07, QUA-07, EDU-04, SUP-06, AIHF-06 | mittel (AI-Bausteine verstreut) |
| **M9 Authority Liaison & Application Mgmt** | ADV-07/22, REG-01/05/06, DOC-01 | **schwach** (überwiegend manuell) |

## Lücken (kommerziell definiert, technisch dünn)
- **M9 Authority-Liaison**: kaum Code — fast reine Handarbeit (DTAM-Termin, Antrags-File).
- **M4 Compliance-Review-Workflow**: Status-Modell (Pending→Compliance-Reviewed→…) ist im
  Framework definiert, im Code aber nur teilweise (Farm-Audit-Submit/Decide) abgebildet.
- **M8 AI-Desk**: existiert als verstreute AI-Funktionen, **nicht** als gebündeltes Desk-Produkt.

## Orphans — Register-Services OHNE kommerzielles Framework-Modul
Diese laufen im Code/Ops, sind aber im kommerziellen Framework **nicht** als Leistung definiert/
abgegrenzt — Kandidaten für „neue Module" oder bewusst interne Enabler:

- **Ganze Vertikale fehlt im Framework — Germany/Apotheke:** PHA-01/02/03 (Import/Receive/Dispense),
  REG-06/07 (BtM-Lizenz/Rezepte), QUA-02 (Batch-Verification für Apotheken). → Das Framework ist
  **rein Thai-Supply-seitig**; die DE-Käufer-/Apothekenseite ist kommerziell **nicht** abgegrenzt.
- **Trust-Differenzierung ohne Modul:** TRU-05 (Post-Quantum Audit-Chain), TRU-01 (Audit Passport
  als Produkt), Marketplace-On-Chain-Anchoring. → starke USPs, aber nicht als verkaufte Leistung definiert.
- **Plattform-Enabler (bewusst intern):** PLT-01/02/03/04/05/06/08/09/11/12, SUP-01…08, BIL-01/02.
  → Infrastruktur/Back-Office; tragen Module, sind aber keine Line-Items.
- **AIHF-Partnerlayer:** AIHF-01…07 — neu (MOU 21.05.2026), im Framework v2 noch **nicht** enthalten.

## Kernaussagen
1. **Die Abgrenzung existiert bereits** (Framework v2) — aber **nur** für die 9 Thai-Supply-Module.
2. **Drei Bereiche sind technisch real, kommerziell aber undefiniert:** (a) Germany/Apotheke,
   (b) Trust/On-Chain/Post-Quantum, (c) AIHF-Partnerschaft. → das sind die echten „neuen Module".
3. **M9 ist die größte Definition-↔-Code-Lücke** (kommerziell sauber, technisch kaum gestützt).
4. ✅ **Erledigt:** Die 3 Bereiche sind jetzt als **M10 (Germany/Apotheke), M11 (Trust/On-Chain/
   Post-Quantum), M12 (AIHF)** in `service-definitions.md` abgegrenzt (Entwurf) — Definition +
   includes/excludes vollständig. Offen bleibt nur das **kommerzielle Modell** je Bereich (s. dort).
