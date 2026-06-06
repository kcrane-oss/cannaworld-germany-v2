# CannaWorld – Service-Register aus dem Code (belegt)

> Faktenbasis aus dem Repo `cannaworld-germany-v2`, Stand 2026-06-05. Jeder Eintrag ist
> code-belegt (siehe `service-register.csv`, Spalte „Beleg"). **Kein Raten, keine Pakete,
> keine Preise** — nur was der Code tatsächlich implementiert. Seed für die große
> Discovery-Session (Code ist nur EINE Quelle; Drive/Gmail/CRM/weitere Repos fehlen noch).

## ⚠️ Wichtigster Fund (widerlegt eine Annahme)
Im Code existiert **bereits ein echtes 3-Stufen-Stripe-Billing** — nicht das erfundene
5-Pakete-THB-Modell:

| Plan | Preis | Stripe |
|---|---|---|
| **Testzugang** | €0 Trial → danach €499 | `price_1T5Dtj…` / `prod_U3KY0…` |
| **GMP** | **€499** | `price_1T5DMF…` / `prod_U3K0Y…` |
| **Enterprise** | **€1.199** | `price_1T5DMW…` / `prod_U3K08…` |

Quelle: `src/lib/billing-api.ts` (`PLANS`) + `createCheckout/checkSubscription/openCustomerPortal`
+ vollständiges Invoicing (`createInvoice/sendInvoice/markInvoicePaid/listInvoices`).
→ **In EUR, monatlich, 3 Tiers.** Bevor wir neue Pakete bauen, muss das hier der Ausgangspunkt
sein, nicht meine erfundenen THB-Pakete.

## Domänen-Übersicht (Anzahl Services)
| Domäne | # | Beispiele |
|---|---|---|
| Cultivation/Farm | 6 | Self-Audit, Freigabe, Produzenten-Register, Workspace |
| Quality/GxP | 9 | Batch, Batch-Verify, CoA-Parsing (LIMS), QP-Release, Annex-16, Pre-Audit-Gap |
| Trust/Audit | 8 | Audit Passport, Post-Quantum Audit-Chain, Cert-Verify, AICert-Scan, Integritäts-Scan |
| Regulatory | 7 | Cert-Hierarchie, Regulatory AI-Scan, Updates/Alerts, Target-Market-Analyse, BtM |
| Trade/Marketplace | 7 | Listings, Orders, Stats, Sample-Requests, Trade Cases, Suppliers |
| Logistics | 4 | Logistik, Shipment-/Customs-Sync, Warehouse/Inventory |
| Documents/Data | 2 | Document Vault, Document AI |
| Pharmacy (DE) | 3 | Import (Managed/Direct), Wareneingang, Abgabe |
| Facility | 5 | Planner (Zonen/Verbindungen), Blueprints, Im-/Export, Register |
| Education/Sessions | 7 | Classroom (live), Chat, Notizen, Classroom-AI, Live-Übersetzung, TTS, Guidance |
| Support/Back-Office | 8 | Inbox, Codex-Bridge, Triage (AI), Eskalation, Staff-Rollen |
| Platform/Identity | 12 | Auth, RBAC, Cross-Login (SSO), Cross-Platform-Sync, Onboarding, Analytics |
| Billing | 2 | Abo (Stripe), Invoicing |
| Federation/Partner (AIHF) | 7 | Referral-Intake, Commission/Revenue-Share, AIHEF-Expo-Matching, Membership→Marktzugang, Standards-Kooperation |
| **Summe** | **~87** | |

> Hinweis: Die 7 **AIHF**-Services (Präfix `AIHF-*`) sind **nicht** code-belegt, sondern
> **MOU-belegt** (Draft MOU CannaWorld ↔ AIHF, 21.05.2026) — Reife „Konzept". Mehrere mappen
> in bestehende Domänen (Billing, Regulatory, Education, Data/AI); hier gebündelt dargestellt.

## Überraschende, bisher nicht eingepreiste Service-Domänen
Diese tauchten in keinem der bisherigen Paket-Entwürfe auf, sind aber im Code real:
- **Education/Academy**: Live-Classroom-Sessions mit AI-Transkript, Live-Übersetzung und TTS
  (`use-sessions`, `use-classroom-ai`, `use-live-translation`, `use-native-speech`).
  → Eigene Erlös-/Service-Linie (Training/Remote-Inspektion).
- **Post-Quantum-Security**: Dilithium-Signatur + Kyber-KEM + verkettete Audit-Hashes
  (`src/lib/quantum-crypto.ts`). → starkes Trust-Differenzierungsmerkmal.
- **Facility-Planner**: vollwertiges Zonen-/Blueprint-Planungstool (`use-facility-plans`,
  `facility-blueprint-templates`). → Advisory/SaaS-Produkt für sich.
- **Target-Market-Intelligence**: `analyzeTargetMarkets` + `KEY_MARKETS`. → Markt-/Regulatory-Intelligence.

## Lücken / nächste Quellen
Dieses Register ist **nur der Code**. Noch nicht erfasst (für die Discovery-Session):
- Weitere Repos (Gateway/Thailand, Marketplace, AICert, Europe) via `list_repos`/`add_repo`.
- Drive (alte Framework-/openclaw-Entwürfe), Gmail (Kunden-Threads), HubSpot (Deals/Line-Items), Kalender.
- **AIHF** (Asia International **Herbs** Federation) – ✅ jetzt erfasst (7 Services `AIHF-*`,
  MOU-belegt, 21.05.2026). Personen: Tanadee Pantumkomon (VP BizDev & Compliance), Sunpit
  Boonyasampan (VP Intl Affairs); AIHEF = zugehörige Expo. Siehe `docs/notes/cannaworld-context.md`.
  Offen: Klausel-5-Provisionsmodell konkretisieren; Phumchai-Rolle (Präsident) in finaler MOU bestätigen.
