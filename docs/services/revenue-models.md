# CannaWorld – Erlös- & Geschäftsmodelle (evidenzbasiert)

> Pro Modul **ein Erlösmodell**, verankert an **realen Belegen** — nicht erfundene Pakete.
> Quellen: Stripe-Code (`billing-api.ts`), **GreenChrono Priority-Partner-Rate-Card** (Drive, 03.06.2026,
> Standardsätze THB), **Framework v2** (Drive), **MOU §5** (AIHF), echte **Rechnung CW-INV-2026-001**.
> Flags: **[BELEGT]** = aus realer Quelle · **[Entwurf]** = vorgeschlagenes Modell · **[offen]** = Zahl fehlt.
> Währung: Thai-Supply-Module (M1–M9) in **THB**; Germany (M10) in **EUR**; M11/M12 markiert.

## Belegbasis (die echten Anker)
| Anker | Inhalt | Quelle |
|---|---|---|
| ~~Stripe-Tiers~~ **GESTRICHEN** | Stripe-Integration ist verdrahtet, aber die `PLANS`-Preise (€499/€1199) sind **Platzhalter, kein realer Tarif** [Founder] — **kein** Anker | Code `billing-api.ts` |
| **GreenChrono-Rate-Card** | Std-Sätze: Modul A 220k · E 120–150k/Audit · F 100k · Retainers 45–120k/Mon · Batch 25–90k · COA 15–45k · Buyer-Fee 2–5% | Drive (THB) [BELEGT] |
| **Framework v2** | 7 Revenue-Streams + Jahres-Memberships 120k–2,4M | Drive (THB) [BELEGT] |
| **MOU §5** | AIHF-Referral → CannaWorld zahlt Commission/Revenue-Share | MOU 21.05.2026 [BELEGT] |
| **Rechnung kilokings** | M1+M2 **geliefert & fakturiert, aber UNBEZAHLT** (Kunde verweigert Zahlung) — beweist *Leistung*, **nicht** *Erlös* | CW-INV-2026-001 |

## Erlösmodell je Modul

| Modul | Erlös-Typ | Referenz (belegt) | Flag |
|---|---|---|---|
| **M1 GACP Readiness** | **Einmal-Projekt**, milestone-abgerechnet | 220k / 5 Milestones | [BELEGT] |
| **M2 Digital Compliance Infra** | **Abo (Tiers, monatlich)** | 5k–45k/Mon (Framework) · GreenChrono Compliance-Retainer 45k/Mon | [BELEGT] |
| **M3 Education & Training** | **Hybrid:** Setup einmalig + Monats-Upkeep + per-Session | Framework-Training-Katalog (8k–60k) | [BELEGT] |
| **M4 Supplier Onboarding & Review** | **Onboarding einmalig + Semiannual per-Review + Verified-Supplier-Retainer** | F 100k · E 120–150k/Audit · 75k/Mon | [BELEGT] |
| **M5 B2B Marketplace & Buyer Access** | **Abo (Supplier+Buyer-Tiers) + Buyer-Desk-Retainer + Transaction-Fee** | Buyer-Desk 120k/Mon · Fee fix 50–250k **oder 2–5 %** | [BELEGT] |
| **M6 Export Readiness** | **Per-Case** (+ optional Monats-Maintenance) | Light 60–90k · Standard 120–180k | [BELEGT] |
| **M7 Batch/COA/CAPA/DD** | **Per-Case** | Batch 25–90k · COA 15–45k · Buyer-DD 35–120k | [BELEGT] |
| **M8 AI Compliance Desk** | **Abo-Retainer (Tiers)** | 18k–45k/Mon (Framework) | [BELEGT] |
| **M9 Authority Liaison** | **Per-Application** (+ per Klärungsrunde) | 35–80k / Application | [BELEGT] |
| **M10 Germany/Apotheke** | **Abo (DE-SaaS) + optional Per-Import-Fee** | **kein belegter Tarif** (Stripe-Preise = Platzhalter) | **[Entwurf/offen]** |
| **M11 Trust & Proof** | **Enabler (gebündelt) + Premium-Add-on „Verified Passport"** | kein Std-Preis | **[Entwurf/offen]** |
| **M12 AIHF Partner Layer** | **Revenue-Share an AIHF** (Cost-of-Sale) auf vermittelte Deals | §5 „separat" · Decke: Framework-Success-Fee 2–5 % | **[Entwurf/offen]** |

## Das übergreifende Geschäftsmodell (aus den Belegen, nicht erfunden)
**Land-and-Expand-Treppe** (so verkauft GreenChrono real):
1. **Projekt** (M1, 220k einmalig) — Einstieg, hohe Sichtbarkeit, milestone-gesichert.
2. **Recurring** (M2/M4/M5/M8-Retainer 45–120k/Mon) — der eigentliche Wert; Jahres-Membership
   bündelt Projekt → Retainer (Framework §12: 120k–2,4M/Jahr).
3. **Per-Case** (M6/M7) — skaliert mit Aktivität (Batch/COA/Export/DD).
4. **Transaction/Commission** (M5-Fee 2–5 %, M12-Referral) — skaliert mit Handelsvolumen.
> GreenChrono-Year-1-Indikation (belegt): **~925k–1.090k THB** (Projekt + 12× Retainer + 1 Audit + Onboarding).

## Die 3 neuen Modelle im Detail

### M10 — Germany / Apotheke [Entwurf]
- **Modell:** monatliches **B2B-SaaS-Abo** für qualifizierte DE-Teilnehmer + **Per-Import-Fee** für
  Managed Import (Full-Service-Koordination); Direct Import im Abo enthalten.
- **Anker:** **keiner.** Die Stripe-Integration ist zwar im Code verdrahtet, aber die `PLANS`-Preise
  (€499/€1199) sind **Platzhalter und kein realer Tarif** [Founder] — nicht verwenden.
- **Offen:** der **gesamte** DE-Preis (Abo-Höhe + Per-Import-Fee bzw. Provision) — gehört dir, kein Anker vorhanden.

### M11 — Trust & Proof [Entwurf]
- **Modell-Optionen:** (a) **Enabler** — in M2/M4/M5 eingepreist, kein Einzelverkauf;
  (b) **Premium-Add-on** „Verified Audit Passport / Public Verify" als Aufpreis;
  (c) **Per-Verify-/Seal-Fee** (z. B. je Zertifikats-/CoA-Verifikation).
- **Empfehlung:** (a)+(b) — Standard als Trust-Enabler, „Public Verify + Post-Quantum-Siegel" als
  bezahltes Differenzierungs-Add-on. **Kein** Token/Krypto-Asset (s. Abgrenzung M11).
- **Offen:** Add-on-Preis; ob Buyer- oder Supplier-seitig berechnet.

### M12 — AIHF Partner Layer [Entwurf]
- **Modell:** **Revenue-Share / Commission an AIHF** für vermittelte Kunden (MOU §5) — also primär
  eine **Cost-of-Sale**, kein Verkaufsprodukt. Gegenwert: planbarer Lead-Zufluss + Verbands-Marktzugang + Co-Promotion auf AIHEF.
- **Decke/Anker:** Framework-Transaction-Success-Fee **2–5 %** als Orientierung, was teilbar ist.
- **Offen:** konkrete %-Sätze/Tiers (MOU sagt „separat zu vereinbaren"). ⚠️ **Phumchai-COI** (AIHF×Salus)
  offenlegen, da Vermittler und Lieferant dieselbe Person sein können.

## Querschnitt-Regeln (aus Framework v2, gelten für alle Modelle)
- **Pass-through getrennt:** Labor/Behörden/Anwalt/Übersetzung/Reise + (Trade) Salus-QP ~500k,
  CoA-Panel ~20k → **zu Kosten + Handling-Marge** durchreichen, **nie** im Festpreis verstecken.
- **Drei Kostenebenen trennen:** CannaWorld-Service-Fee · Third-Party/Client-Kosten · Facility/CAPEX.
- **Marge folgt der Besetzung** (frühere Analyse): Thai-QA günstig, Expat/DE-Auditor teuer → Delivery-Mix
  bestimmt die Marge, nicht der Listenpreis.
- **VAT 7 % (TH)**, Zahlungsziele (Net 7 Projekt / Net 14 Retainer), Suspension bei Default.
- ⚠️ **Zahlungsausfall ist real, nicht theoretisch:** kilokings hat M1+M2 erhalten und **verweigert
  die Zahlung**. Konsequenz fürs Modell: **Vorkasse/Milestone-vor-Lieferung**, Net-7, Liefer-Stopp bei
  Default und SOW-Unterschrift **vor** Arbeitsbeginn sind Pflicht — gilt besonders fürs Einmal-Projekt M1.

## Was bewusst NICHT festgelegt ist
- Keine neuen erfundenen THB/EUR-Zahlen für M10–M12 — nur **Modell-Typ + realer Anker + [offen]-Flag**.
- Keine Endkunden-/Konsumentenmodelle (B2B/Compliance-Framing gewahrt).
