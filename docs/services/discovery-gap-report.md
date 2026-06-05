# CannaWorld Service-Discovery – Lücken- & Fundliste

> Stand 2026-06-06. Begleitdokument zu `master-service-register.csv` (679 Services) und
> `service-taxonomy.md`. Dies ist eine **Discovery**, keine Strategie: kein Paket, kein Preis,
> kein Tier. Salus ist nur ein Datenpunkt, kein Bezugsrahmen.

## 1. Was gesucht/verbunden war (Quellen-Inventur)

| Quelle | Verbunden? | Ergebnis | Services |
|---|---|---|---|
| **Code – cannaworld-gateway + sdk** | ✅ lokal `/Users/gm/.openclaw/workspace/` | Tief gemined (Edge Functions, Pages, Hooks, App-Nav, SDK-APIs) | 192 (GW 172 / SDK 20) |
| **Code – cannaworld-aicert + europe** | ✅ | ShinrAi/Audit-AI/CAPA/Doc-AI-Engines, EU-/QP-Portal | 131 (AC 109 / EU 22) |
| **Code – cannaworld-marketplace + onchain** | ✅ | Trade/Escrow/Auction/Matching + On-Chain-Anchoring | 87 (MP 83 / OC 4) |
| **Code – cannaworld-germany** | ✅ | Backbone aus dem vorhandenen 80-Code-Register übernommen | 80 |
| **Google Drive** | ✅ | **Framework gefunden** (s. §3) + Salus/Green-Chrono-Kataloge, Investor-/Farmer-Reden | 77 |
| **cannaworld-customer MCP** | ✅ (Pilot) | Live Kundenservice-Oberfläche (Onboarding, Facility-Readiness, Audit-Gap, Compliance-Docs, Batch-Snapshot, Connector) | 7 |
| **HubSpot CRM** | ✅ | **Markt-/Ökosystem-Verzeichnis** (213 Companies mit `[SERVICE]`-Tags) – siehe Lücke §4 | 25 |
| **Gmail** | ✅ | Wenige echte Business-Threads (Salus-Dispatch, AIHEF-Speaker, Apothekergateway/Ads) | 12 |
| **Google Calendar** | ✅ | Wiederkehrende Operationen (Farm-Sourcing, Vor-Ort-Audits, GMP-Checks, Juslaws-Recht, Messen) | 21 |
| **Strategie-Docs (prior branch)** | ✅ | Gatekeeper-/Hub-&-Spoke-/Funnel-/Master-Lizenz-Operating-Model | 18 (ST-) |
| **AIHF×CannaWorld-Integration** | teils | Eigene Service-Quelle synthetisiert (s. §5) | 14 (AIHF-) + 3 verwandt |
| **507-Pricing-Katalog (verworfen)** | ✅ | Auf ~20 distinkte Service-**Typen** kollabiert (s. §6) | 15 (CAT-) |

**Summe Master-Register: 679 Services.** 644 `[BELEGT]` / 35 `[ANNAHME]`.

## 2. Verfahren (kurz)

7 parallele Mining-Agents (4× Code, Gmail, HubSpot, Kalender, Drive) lieferten strukturierte
Datensätze im 11-Feld-Schema; der Founder-Backbone (80-Code-Register), die cannaworld-customer-MCP,
die Strategie-Docs, die AIHF-Integration und der kollabierte 507-Katalog wurden ergänzt und alles
zu einem Register normalisiert. Jeder Datensatz trägt **Beleg-Quelle** (Datei-Pfad / Edge-Function /
Thread-ID / Company-Tag / Doc-Titel) und ein **`[BELEGT]`/`[ANNAHME]`-Flag**.

## 3. Der alte „openclaw"/Framework-Entwurf — GEFUNDEN ✅

Der gesuchte frühere Framework-Entwurf existiert **mehrfach**:

1. **Google Drive: `Cannaworld_Service_Framework_v2`** (Doc-ID `1Nvj…umllA`, „Service Framework,
   Pricing Logic & Commercial Catalogue", v2.0, 11.05.2026) — Module/Revenue-Streams, vollständige
   Service-Substanz. Quelle der `DR-`-Services. *Hinweis: stark preis-/paket-getrieben — als
   Service-Quelle ausgewertet, Preis-/Paketlogik bewusst verworfen.*
2. **Lokale Katalog-JSONs** unter `/Users/gm/.openclaw/workspace/memory/`:
   `full-service-catalog-final.json` (507 Einträge), `-500`, `-300`, plus kleines Master-JSON.
   → reine **Preis-SKU-Matrix** (Blueprint × Level × Größe …), auf ~20 distinkte Typen kollabiert
   (`CAT-`). **Nicht** „hunderte distinkte Services", sondern aufgeblähte Preisvarianten —
   bestätigt die Founder-Einschätzung „zu wenig Substanz".
3. **Prior-Branch `claude/cannaworld-services-nve1T`**: code-belegtes 80-Service-Register
   (`docs/services/service-register.csv/.md`) + Strategie-Docs + der bestätigte AIHF-Kontext.
   Diese Discovery **baut darauf auf** (neuer Branch = Fortsetzung).

Weitere Drive-Funde: Salus 30-Monats-Export-Ramp-Up (S-01…S-16), Green-Chrono-Priority-Pricing,
Investor-Pitch-Speech, Post-Harvest-Farmer-Speech, „QP Support Service-Modell" (nur Stub).

## 4. Lücken / leere oder schwache Quellen

- **HubSpot = Marktverzeichnis, kein Sales-System.** 213 Companies (Labore, Bestrahler, Cold-Chain,
  CDMOs, Apotheken, Verbände, Telemedizin) mit `[SERVICE]`-Tags, aber **0 Deals, 0 Line-Items,
  0 Products, 0 echte Tickets, 0 Pipelines.** → „was Kunden tatsächlich kaufen" ist im CRM
  **nicht** abgebildet. Die HS-Services beschreiben das **Ökosystem/Durchlauf-Netzwerk** (was
  CannaWorld orchestriert), nicht abgeschlossene Verkäufe. *Lücke: keine bestätigte Kauf-Historie.*
- **Gmail jung & dünn.** Account `k.crane@cannaworld-europe.com` erst seit ~06/2025; wenige echte
  Business-Threads (1 Salus-Dispatch, 1 AIHEF-Speaker-Reply, 1 Requirements-Package, Apothekergateway-/
  Ads-Setup), viel Plattform-Spam. Keine Rechnungen/CoA-/Batch-Freigaben/QP-Dokumente im Postfach.
- **Pumchai & Tanadee tauchen weder in Gmail noch im Kalender auf.** Die AIHF-Partnerschaft läuft
  **off-channel** (vermutlich WhatsApp/LINE/persönlich). → AIHF-Integration überwiegend `[ANNAHME]`.
- **cannaworld-customer MCP = Pilot.** Antwortet im „Pilot mode: no live customer account data" —
  Service-**Oberfläche** belegt, aber keine echten Kundendaten dahinter.
- **cannaworld-onchain** dünn (nur 4 Services ableitbar) — On-Chain-Layer real, aber Umfang
  größtenteils Anchoring/Hash-Verkettung, kein breiter Smart-Contract-Service-Stack.
- **Salus / Innoleaf / Green Chrono** stehen **nicht** im HubSpot als Unternehmen; nur Grünhorn ist
  als `[ANCHOR BUYER / SALUS DEAL]` getaggt. Partner-Detail liegt in Drive/Verträgen, nicht im CRM.

## 5. AIHF (Asia International Hemp Federation) — als eigene Service-Quelle

**Identität ist geklärt** (BELEGT, `docs/notes/cannaworld-context.md`): eigenständige Föderation,
zeremoniell bestätigt durch Präsident **Pumchai** + **Tanadee**, **≠ GMP-AICert**. Discovery-offen
war nur die **Service-Oberfläche der Integration** — dafür 14 `AIHF-`-Services modelliert
(Beglaubigung/zeremonielle Anerkennung, Federation-Membership/Marktzugang, Co-Zertifizierung,
gemeinsame Standards/Governance, Trust-Mark, Registry, Advocacy, Joint-Education, Cross-Recognition,
co-gebrandeter Marketplace-Zugang). Plus 3 verwandte Funde (AIHEF-Speaker `GM-004`, THTA `HS-23`,
Kalender-Anbahnung `CA-20`).

**Beleg-Lage ehrlich:**
- `[BELEGT]`: AIHF-Beglaubigung/Anerkennung (`AIHF-01`, Kontext-Notiz) und **AIHEF-Speaker-Auftritt**
  (`AIHF-06`/`GM-004`, Gmail-Thread mit Sunpit Boonyasampan). *Hinweis: „AIHEF" (Asia Int'l Hemp &
  Cannabis Expo/Forum) und „AIHF" (Federation) sind eng verbunden, aber nicht garantiert dieselbe
  Entität — vom Founder zu bestätigen.*
- `[ANNAHME]`: alle weiteren 12 AIHF-Services sind **plausible Integrations-Hypothesen**, weil die
  Föderation den Service-Stack noch nicht in Code/CRM/Mail/Kalender hinterlassen hat. Sie markieren,
  **welche** Services aus der Hochzeit entstehen *könnten* — zur Founder-Bestätigung, nicht als Fakt.

## 6. Bewusste Dedup-/Alias-Notizen

Granularität war gewollt („lieber zu fein"); Services dürfen mehrfach über Verticals auftreten.
Bekannte **Synonyme/Überlappungen** (nicht zusammengelegt, hier dokumentiert):

- **ShinrAi (6-Achsen-Trust/Batch-Validierung)** erscheint in AICert (`AC-001` ShinrAi-Export-
  Validierung), Marketplace (`MP-001` ShinrAi-Batch-Analyse) und Gateway (`GW-004` AI-Batch-Analyse)
  — **eine Engine, drei Einbettungen.**
- **Batch-Lebenszyklus** (anlegen/listen/Detail/verifizieren) erscheint in Germany (`GE-…`), Gateway
  (`GW-001..`) und als öffentliches Tracking (`MP-065`) — gleiche Domäne, verschiedene Apps.
- **GACP/GMP-Audit** erscheint als Code-Service, Strategie-Service (`ST-09/10`), Katalog-Typ
  (`CAT-01/02`), HubSpot-Berater (`HS-01`) und Kalender-Operation (`CA-03/08`) — **fünf Belege für
  dieselbe Kernleistung** aus fünf Quellen (genau das gewollte Triangulieren).
- **Onboarding/Tier-Funnel** erscheint als Code, Strategie (`ST-03`/`ST-07`) und MCP (`CUST-01`).
- **Compliance-Dossier/Document-Vault** als Code, Strategie (`ST-05`) und MCP (`CUST-04/05`).

→ Für eine spätere Konsolidierung: nach „Service-Kern" gruppieren und Quellen als Belege je Kern
hängen. Für die **Discovery** bewusst breit gelassen.

## 7. Bewusst verworfen (nicht als Wahrheit behandeln)

- **5-Pakete-/Tier-Logik** und **THB/EUR-Preise** aus `Cannaworld_Service_Framework_v2`,
  `docs/pricing/*`, `src/pages/Pricing.tsx`, `full-service-catalog-*.json`. Diese Dateien bleiben
  **unverändert** im Repo — nur als „so **nicht**" referenziert.
- **Salus-Bezugsrahmen.** Salus-Material (Drive `DR-`, Kalender `CA-13`) als Datenpunkt verwertet,
  nicht als Strukturgeber.
- *Hinweis Memory-Konflikt:* Eine ältere Memory-Notiz stuft `cannaworld-germany` als „nicht mehr
  Kern-Scope" ein — diese Discovery behandelt Germany dennoch als vollwertiges Vertical, da der
  aktuelle Auftrag es explizit nennt und der Code live ist.

## 8. Empfohlene nächste Discovery-Schritte (offen, kein Auftrag)

1. **AIHF-Integration mit dem Founder verifizieren** (AIHEF=AIHF? welche der 12 `[ANNAHME]`-Services
   sind real geplant?) → `[ANNAHME]`→`[BELEGT]` hochstufen.
2. **Vertrags-/Billing-Quellen** (Bärenpartner-Verträge, Rechnungs-PDFs, `cannaverse-billing-config`)
   als weitere Quelle für *real abgerechnete* Services einbeziehen (im aktuellen Lauf nicht gemined).
3. **InfinityYou OS** (Smart-Glasses-Audit/Education) als angrenzende Service-Quelle prüfen.
4. HubSpot um echte **Deals/Line-Items** anreichern, sobald Verkäufe laufen → schließt Lücke §4.
