# Konzept: Admin/Staff Back-Office + AI-Support-Triage

> **Status:** Architektur-/Umsetzungskonzept. Diskussionsgrundlage, kein Rechtsrat.
> **Stand:** 2026-06. Domäne ist reguliert (EU-Medizinal-B2B) → Datenhoheit & RLS sind
> First-Class-Anforderungen, nicht Nachgedanken.
>
> **Aufgabenteilung (festgelegt):** **Codex = Eingang** (E-Mail + Chat-Widget, Front-of-House).
> **Dieses Repo / ich = Back-Office** (AI-Triage, Eskalation, Mitarbeiter-Verwaltung, interne
> Kommunikation). Die beiden treffen sich an *einem* Daten-Contract (§6/§13).

---

## 1. Ziel in einem Satz
Aus losen Modulen einen echten **Verwaltungs-Layer** machen: Admin + Mitarbeiter können Partner,
Anfragen und Support **wirklich managen** — mit einem **AI-Vorfilter (Tier 0)**, der das Volumen
abfängt, und klaren **Eskalationsstufen** dahinter.

## 2. Architektur-Überblick — wo läuft was
```
 Partner (B2B)                CODEX (Eingang)              DIESES REPO (Back-Office)
 ┌──────────┐   Mail/Chat    ┌─────────────────┐  schreibt ┌────────────────────────┐
 │ E-Mail   │ ─────────────▶ │ Mail-Parser +   │ ────────▶ │ support_conversations  │
 │ Chat-    │                │ Chat-Widget     │  Inbound  │ support_messages       │
 │ Widget   │ ◀───────────── │ (Front-of-House)│ ◀──────── │  + AI-Triage (Haiku)   │
 └──────────┘   Antwort      └─────────────────┘  Outbound │  + Eskalation + Inbox  │
                                                            └────────────────────────┘
                                          alles in der Cloud (Supabase + Edge Functions),
                                          unabhängig von irgendeinem lokalen Computer.
```
- **Frontend:** Vite/React-SPA (Vercel), nur UI — keine Secrets, kein direkter Tabellen-Write für Sensibles.
- **Backend:** geteiltes Supabase (Postgres + RLS + Realtime + Edge Functions), immer an.
- **AI:** läuft serverseitig in einer Edge Function, ruft das Triage-Modell (Haiku) — Key als Server-Secret.

> **Wichtig:** Nichts davon hängt an einem offenen Laptop. Inbound trifft eine *immer erreichbare*
> Edge Function; Mitarbeiter loggen sich nur ein, wenn sie arbeiten.

---

## 3. Workstream A — Admin/Staff-Management-Console
Was heute fehlt, um real zu verwalten:
- **Team & Rollen:** Mitarbeiter einladen, `app_role` zuweisen/entziehen, deaktivieren (UI auf `user_roles`).
- **Work-Queues & Zuweisung:** Sample-Requests / Trade-Cases / Dokument-Reviews / Support-Konversationen
  einem Mitarbeiter zuweisen; „Meine Queue"; Aging/SLA-Anzeige.
- **Ops-Cockpit:** echtes Command-Center (offene Konversationen, ausstehende Reviews, überfällige Audits,
  Eskalationen) statt statischer Kacheln.
- **Aktivitäts-/Audit-Log:** wer hat was getan (`activity_log`, existiert bereits).

## 4. Workstream B — Interner Chat + AI-Triage + Eskalation
- **Conversation-Modell:** Threads je Support-Fall / Trade-Case / Sample-Request / Partner + Mitarbeiter-DMs
  (baut auf dem vorhandenen `session_messages`-/`use-session-chat`-Muster auf).
- **AI-Triage (Tier 0):** jede Inbound-Nachricht wird serverseitig klassifiziert (Kategorie, Dringlichkeit,
  **Compliance-Sensibilität**), FAQ wird auto-beantwortet, Antwort-Entwurf erstellt.
- **Eskalationsstufen:** Tier 0 AI-Auto → Tier 1 Mitarbeiter → Tier 2 Spezialist (Compliance/QP/Regulatory)
  → Tier 3 Admin. Regeln aus AI-Klassifikation + SLA-Timer + Schlüsselwörtern (Legal/Safety → sofort Tier 2).

## 5. Workstream C — Codex-Integrationsnaht
- Codex schreibt **Inbound** in `support_conversations`/`support_messages` (oder ruft eine Inbound-API).
- Meine Triage liest/klassifiziert/routet; Mitarbeiter antworten in der Back-Office-Inbox.
- Outbound (Antwort) wird als Message mit `direction='outbound'` markiert → Codex versendet sie über
  seinen Kanal (Mail/Chat). Contract: §13.

---

## 6. Datenmodell (Vorschlag fürs Gateway — nicht aus diesem Repo migrieren)
```sql
-- Konversationen (ein Support-Fall / Thread)
create table support_conversations (
  id           uuid primary key default gen_random_uuid(),
  channel      text check (channel in ('email','chat','internal')) not null,
  partner_id   uuid,                       -- optionaler Partner-Bezug
  subject      text,
  status       text check (status in ('open','triaged','assigned','waiting','resolved','closed'))
               not null default 'open',
  tier         smallint not null default 0,        -- 0 AI · 1 Staff · 2 Spezialist · 3 Admin
  priority     text check (priority in ('low','normal','high','urgent')) default 'normal',
  assigned_to  uuid,                       -- user_roles/auth.uid()
  external_ref text,                       -- Codex-seitige Mail-/Chat-ID
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Nachrichten innerhalb einer Konversation
create table support_messages (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references support_conversations(id) on delete cascade,
  direction       text check (direction in ('inbound','outbound','internal')) not null,
  author_kind     text check (author_kind in ('partner','staff','ai')) not null,
  author_id       uuid,                    -- staff: auth.uid(); partner/ai: null
  body            text not null,
  delivered       boolean not null default false,   -- Outbound von Codex versendet?
  created_at      timestamptz not null default now()
);

-- AI-Triage-Ergebnis je Inbound-Nachricht (Audit + Erklärbarkeit)
create table support_triage_results (
  id              uuid primary key default gen_random_uuid(),
  message_id      uuid not null references support_messages(id) on delete cascade,
  model           text not null,           -- z. B. 'claude-haiku-4-5'
  category        text,                    -- 'status' | 'docs' | 'compliance' | 'commercial' | ...
  urgency         text,                    -- 'low' | 'normal' | 'high' | 'urgent'
  compliance_flag boolean not null default false,
  suggested_reply text,
  auto_resolved   boolean not null default false,   -- per FAQ-Cache/Modell direkt beantwortet
  cache_hit       boolean not null default false,   -- Embedding-FAQ-Treffer (kein LLM-Call)
  created_at      timestamptz not null default now()
);

-- FAQ-Wissensbasis für den Embedding-Cache (Schritt 1 der Triage-Treppe)
create table support_faq (
  id         uuid primary key default gen_random_uuid(),
  question   text not null,
  answer     text not null,
  embedding  vector(1536),                 -- pgvector
  active     boolean not null default true
);

-- Mitarbeiter-Profil/Skills für die Zuweisung (ergänzt user_roles)
create table germany_staff_profiles (
  user_id    uuid primary key,
  display    text,
  skills     text[] default '{}',          -- z. B. {'compliance','qp','logistics'}
  active     boolean not null default true,
  created_at timestamptz not null default now()
);
```
RLS: `support_*` SELECT für Staff-Rollen (admin/compliance/…); INSERT/UPDATE für Sensibles **nur**
über Edge Functions (Service-Role). Partner sehen **nie** interne Nachrichten (`direction='internal'`).

---

## 7. Triage-Pipeline (die Treppe) — Modell als Config
```
1. Embedding-FAQ-Cache    → support_faq-Treffer? Antwort ohne LLM-Call        (≈ 0 €, cache_hit=true)
2. Haiku 4.5 (Triage)     → klassifizieren + Standardantwort/Entwurf          (Cent-Bereich)
3. Sonnet (Eskalation)    → nur bei Tier≥2: Entwurf für den Spezialisten      (selten)
```
- **Default-Modell:** `claude-haiku-4-5` — über Env-Variable austauschbar:
  `CW_TRIAGE_MODEL` (Default Haiku), `CW_DRAFT_MODEL` (Default Sonnet). So sind Flash / GPT-mini /
  self-hosted DeepSeek-Qwen ohne Code-Umbau testbar.
- **Prompt-Caching:** System-Prompt + Compliance-Regeln + FAQ-Kontext sind je Nachricht gleich →
  cachen, das drückt die Rechnung stärker als der Token-Preis.
- **Async-Queue:** Edge Function schreibt einen Triage-Job; ein Worker arbeitet ihn ab → Lastspitzen
  werden geglättet, keine Rate-Limit-Crashes.
- **Edge Functions (neu):** `germany-support-triage` (klassifiziert eine Inbound-Nachricht),
  `germany-support-reply` (Staff/AI-Antwort → Outbound, Codex versendet),
  `germany-support-assign` (Zuweisung/Tier-Wechsel, role-gated) — alle nach Repo-Muster
  (`authenticate` → role-check → `isRateLimited` → `json`).

---

## 8. Eskalations-Logik
| Auslöser | Aktion |
|---|---|
| `cache_hit` oder `auto_resolved` | Tier 0 — AI antwortet, Konversation `resolved` (Partner kann reopen) |
| `category=compliance` **oder** `compliance_flag=true` **oder** Keywords (Legal/Safety/Recall) | **direkt Tier 2** (Spezialist), nie AI-Auto |
| `urgency=urgent/high` | Priorität hoch, SLA-Timer kurz, Tier 1 sofort |
| SLA-Timer überschritten (keine Staff-Reaktion) | Auto-Eskalation Tier 1 → 2 → 3 |
| Staff klickt „eskalieren" | manueller Tier-Wechsel + Re-Assign nach `skills` |

Compliance-sensible Fälle werden **nie** vom AI allein beantwortet — harte Regel der Domäne.

---

## 9. Kapazität & Skalierung
**Maßstab:** B2B → Hunderte bis niedrige Tausende Partner-Accounts, nicht Millionen Endkunden.

| Schicht | Trägt | Engpass |
|---|---|---|
| Postgres/Supabase | Mio. Nachrichten/Requests | nur schlechte Queries/fehlende Indizes |
| Realtime-Chat | Dutzende Staff + Hunderte Partner online | gleichzeitige Connections (Plan-Limit) → nur pro offenem Thread subscriben |
| Edge Functions | viele parallele Calls | Invocation-/Timeout-Limits pro Plan |
| **🔴 AI-Triage** | **der Flaschenhals** | Provider-Rate-Limits + Kosten → Cache + Billig-Modell + Async-Queue |
| **🔴 Mitarbeiter** | das menschliche Limit | hängt an der **Deflection-Rate** (Tier-0-Auto-Quote) |

**Grob-Sizing (Annahmen, ehrlich):** Daten/Chat bis ~5.000 Accounts + Hunderttausende Nachrichten ohne
Architektur-Änderung (nur Plan-Upgrade). Die zu steuernde Zahl ist **Volumen × (1 − Cache-Quote)** —
nicht die DB. Löst die AI 60–70 % selbst, trägt ein 3-Personen-Team ein Vielfaches.

---

## 10. Wo läuft was & was kostet was (+ AI-Aus-Schalter)
| Topf | Was | Computer offen nötig? | Kosten |
|---|---|---|---|
| Bau-Werkzeug | Claude Code / Codex | nur beim Entwickeln | Dev-Abo |
| Hosting | Vercel + Supabase (DB/Functions/Realtime) | **nein, immer an** | fix monatlich |
| **AI-Laufzeit** | Haiku-Triage (+ selten Sonnet) | **nein** | **variabel, pro Nachricht** |

- **AI ist ein optionaler Aufsatz.** Back-Office (Chat, Verwaltung, manuelle Eskalation) läuft **ohne AI
  und ohne deinen PC** — Start mit **0 € AI**. Triage per Feature-Flag (`CW_AI_TRIAGE_ENABLED`) zuschaltbar,
  wenn das Volumen die Mitarbeiter überlastet.
- Bau-Tools (ich/Codex) sind **keine Laufzeit** — das Produkt läuft nach dem Deploy ohne uns.

---

## 11. EU-Datenhoheit & Compliance (harte Anforderungen)
- Triage-Modell mit **EU-Datenverarbeitung + DPA + „kein Training auf unseren Daten"**.
  Default Haiku 4.5 (EU-Optionen vorhanden). **China-gehostete APIs (z. B. native DeepSeek) ausgeschlossen.**
- Kein API-Key im Browser — nur Server-Secret in der Edge Function.
- B2B-only, keine Heil-/Wirkversprechen; AI-Antworten compliance-gefiltert, sensible Fälle nie AI-Auto.
- Datenminimierung an den AI-Provider: nur das Nötige (Nachrichtentext + Klassifikations-Prompt), keine
  überflüssige PII; pseudonymisieren wo möglich.

## 12. Sicherheit / RLS
- Browser ist untrusted: Sensibles (Statuswechsel, Zuweisung, Outbound) **nur** über role-gated Edge Functions.
- Partner sehen nie `direction='internal'`; RLS trennt Partner-Sicht von Staff-Sicht.
- Rate-Limits auf allen Support-Functions (`isRateLimited`).

## 13. Codex-Contract (das „Abstimmungs"-Artefakt)
Was Codex liefert / nutzt:
1. **Inbound schreiben:** neue Mail/Chat → `support_conversations` (channel, external_ref) +
   `support_messages` (direction='inbound', author_kind='partner'). Alternativ Inbound-API
   `POST germany-support-inbound`.
2. **Outbound abholen:** Messages mit `direction='outbound' AND delivered=false` versenden, danach
   `delivered=true` setzen (oder Webhook von uns abonnieren).
3. **Identitäts-Mapping:** `external_ref` (Codex-Mail-/Chat-ID) ↔ `support_conversations.id`.
4. **Keine Triage/Eskalation in Codex** — das macht das Back-Office. Codex bleibt reiner Transport.

> Sobald die `support_*`-Tabellen im Gateway stehen, ist dieser Contract die Schnittstelle, gegen die
> Codex baut. Bis dahin laufen alle Hooks graceful (leer) wie bei `useFarmProducers`/`useSampleRequests`.

---

## 14. Andockpunkte an die bestehende App
- `use-session-chat.ts` / `session_messages` → Vorlage fürs Conversation-Modell.
- `app_role`-Enum + `user_roles` + `RoleGuard` → Staff-Rollen & Route-Gating.
- `activity_log` → Audit-Log im Ops-Cockpit.
- Edge-Function-Muster (`supabase/functions/germany-*` + `_shared/cors.ts`) → die neuen Support-Functions.
- `useSampleRequests` + `SampleRequests`-Seite → Vorlage für die Back-Office-Inbox/Queue-UI.

## 15. Roadmap (phasiert)
| Phase | Inhalt | AI? |
|---|---|---|
| **B0 — Fundament** | `support_*`-Schema (Gateway), Conversation-Modell, Back-Office-Inbox (Liste + Antworten), Zuweisung, RoleGuard | nein |
| **B1 — Codex-Naht** | Inbound/Outbound-Contract live, `external_ref`-Mapping, Outbound-Versand | nein |
| **B2 — AI-Triage** | `germany-support-triage` (Haiku), FAQ-Embedding-Cache, Klassifikation + Auto-Resolve, Feature-Flag | ja (zuschaltbar) |
| **B3 — Eskalation** | SLA-Timer, Tier-Regeln, Skill-basiertes Re-Assign, Ops-Cockpit-Metriken | ja |
| **A — Admin-Console** | Team-/Rollen-Verwaltung, übergreifendes Cockpit, Audit-Log-Ansicht | nein |

**Empfohlener Start:** **B0** (Fundament ohne AI) — sofort nützlich, 0 € AI, und schafft genau die
Tabellen, gegen die Codex (B1) bauen kann. AI (B2) folgt, wenn das Volumen es rechtfertigt.
