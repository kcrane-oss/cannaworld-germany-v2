# Schema-Vorschlag fürs Gateway — Farm-Onboarding & Charge-Herkunft

> **Status:** Vorschlag zur Abstimmung im `cannaworld-gateway`. **Nicht** aus diesem Repo
> migrieren (DB-Reconciliation lebt im Gateway, siehe `CLAUDE.md` / `backend-db-staging-status.md`).
> Deckt die Tabellen, die das Thailand-Onboarding (Weg D) und die Marktplatz-Provenance brauchen.

---

## Warum

Die App liest bereits gegen diese (noch nicht existierenden) Relationen — über untypisierte
Client-Views, die **graceful** zurückfallen, solange die Tabellen fehlen:

| App-Code | Erwartete Relation |
|---|---|
| `src/hooks/useFarmProducers.ts` | `farm_producers` |
| `src/hooks/useBatchProvenanceLinks.ts` | `farm_batch_provenance` (View) |

Sobald die Tabellen im Gateway stehen und `src/integrations/supabase/types.ts` neu generiert
ist, fallen die `as unknown as SupabaseClient`-Casts in beiden Hooks weg, und der Marktplatz
zeigt pro Charge die **echte Farm-Tier-Herkunft** statt der Status-Inferenz.

---

## Tabellen

### `farm_producers` — die Thailand-Farmen (Onboarding-Funnel, Weg D)
```sql
create type farm_tier as enum (
  'tier_0_registered', 'tier_1_gacp_ready', 'tier_2_gacp_certified', 'tier_3_hub_linked'
);

create table farm_producers (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  type          text check (type in ('farm','cooperative')) default 'farm',
  province      text,
  country       text not null default 'TH',
  tier          farm_tier not null default 'tier_0_registered',
  status        text check (status in ('active','suspended','offboarded')) default 'active',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
```

### `farm_hub_links` — Spoke→Hub (Weg A, Hub-&-Spoke)
```sql
create table processing_hubs (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  location      text,
  gmp_status    text check (gmp_status in ('none','gap_assessed','in_progress','eu_gmp_certified'))
                default 'none',
  valid_until   date
);

create table farm_hub_links (
  id            uuid primary key default gen_random_uuid(),
  producer_id   uuid not null references farm_producers(id) on delete cascade,
  hub_id        uuid not null references processing_hubs(id) on delete cascade,
  active        boolean not null default true,
  linked_at     timestamptz not null default now()
);
```

### Charge→Farm-Verknüpfung + Provenance-View
Die geteilte `batches`-Tabelle bleibt read-mostly. Die Verknüpfung läuft über eine
**eigene** Join-Tabelle (Germany/Thailand-owned), nicht über eine Spalte in `batches`:

```sql
create table farm_batch_links (
  id            uuid primary key default gen_random_uuid(),
  batch_id      uuid not null,                       -- referenziert batches(id)
  producer_id   uuid not null references farm_producers(id) on delete cascade,
  created_at    timestamptz not null default now(),
  unique (batch_id)
);

-- View, die der Marktplatz liest: batch_id -> aktueller Tier der Herkunftsfarm
create view farm_batch_provenance as
  select fbl.batch_id, fp.tier as producer_tier
  from   farm_batch_links fbl
  join   farm_producers   fp on fp.id = fbl.producer_id;
```

### `germany_sample_requests` — In-App B2B Sample-Requests (Marktplatz)
Befüllt **nur** über die Edge Function `germany-sample-request` (auth + rate-limit + validiert),
nicht direkt vom Browser.
```sql
create table germany_sample_requests (
  id                 uuid primary key default gen_random_uuid(),
  requested_by       uuid,                              -- auth.uid()
  requested_by_email text,
  company            text not null,
  contact_email      text not null,
  product_category   text check (product_category in ('flower','extract','other')) not null,
  quantity_kg        numeric not null check (quantity_kg > 0),
  target_pathway     text check (target_pathway in ('wholesale','pharmacy_supply','processing')) not null,
  context            text,
  b2b_confirmed      boolean not null default false,
  status             text not null default 'received',
  metadata           jsonb not null default '{}',
  created_at         timestamptz not null default now()
);
-- + Spalten für den Admin-Workflow:
--   updated_at timestamptz, updated_by uuid
-- RLS: INSERT + UPDATE nur via Service-Role (Edge Functions germany-sample-request /
--   germany-sample-request-status); SELECT für admin/compliance.
-- Status-Workflow server-seitig erzwungen: received → in_review → fulfilled | declined.
```

### `farm_audit_submissions` — Self-Service Farm-Self-Audit (Mensch-Freigabe)
Befüllt über `germany-farm-audit-submit` (status='pending'); Freigabe über
`germany-farm-audit-decide` (admin/compliance) → bei Approval `farm_producers` (tier_1).
```sql
create table farm_audit_submissions (
  id                    uuid primary key default gen_random_uuid(),
  submitted_by          uuid,
  submitted_by_email    text,
  farm_name             text not null,
  province              text,
  country               text not null default 'TH',
  self_assessment_score numeric,
  risk_score            numeric default 0,        -- aus dem Integritäts-Check
  document_count        int default 0,
  missing_required      text[] default '{}',
  documents             jsonb not null default '[]',  -- UploadedDocMeta[] (Metadaten)
  integrity             jsonb not null default '{}',  -- IntegrityReport
  status                text check (status in ('pending','approved','rejected')) default 'pending',
  decided_by            uuid,
  decision_note         text,
  decided_at            timestamptz,
  created_at            timestamptz not null default now()
);
-- RLS: INSERT/UPDATE nur via Edge Functions (Service-Role); SELECT admin/compliance.
-- HINWEIS: Der Integritäts-Check ist heuristisch (Vollständigkeit, Doppel-Datei,
-- Format/Größe) — KEINE garantierte Fälschungserkennung; Mensch gibt frei.
```

### `farm_onboarding_events` — Audit-Trail der Tier-Übergänge
```sql
create table farm_onboarding_events (
  id            uuid primary key default gen_random_uuid(),
  producer_id   uuid not null references farm_producers(id) on delete cascade,
  from_tier     farm_tier,
  to_tier       farm_tier not null,
  gate_passed   boolean not null default false,
  actor         uuid,                                -- auth.uid()
  created_at    timestamptz not null default now()
);
```

---

## RLS (Pflicht — Browser ist untrusted)
- `farm_producers`, `farm_batch_provenance`: SELECT für berechtigte Rollen
  (`admin`, `compliance`, `importer`, …) gemäß ökosystem-RLS-Modell; **kein** anonymer Zugriff.
- Schreibzugriff (Tier-Übergänge) **nur** server-seitig über die Edge Function
  `thailand-farm-tier-transition` (gated, siehe `onboarding-datenmodell.md`), nicht direkt vom Client.

## Nach der Provisionierung im Gateway
1. `farm_tier`-Enum + Tabellen + `farm_batch_provenance`-View anlegen, RLS-Policies setzen.
2. `src/integrations/supabase/types.ts` neu generieren.
3. Casts in `useFarmProducers.ts` + `useBatchProvenanceLinks.ts` auf den typisierten Client zurücknehmen.
4. Onboarding den `farm_batch_links`-Eintrag bei Chargenanlage befüllen → Marktplatz zeigt echten Tier.
