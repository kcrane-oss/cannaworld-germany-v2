# Codex ↔ Back-Office — Integrations-Contract v1

> **Zweck:** Schnittstelle zwischen **Codex (Eingang: Mail + Chat-Widget)** und dem
> **CannaWorld-Germany Back-Office (Triage, Eskalation, Verwaltung)**. Dieses Dokument ist
> die Übergabe an das Codex-Team — eigenständig lesbar, ohne den Rest des Konzepts.
> **Version:** v1 · **Stand:** 2026-06 · Vollkontext: `admin-support-konzept.md`.

---

## 1. Rollen — wer macht was

| | **Codex (Front-of-House)** | **Back-Office (dieses Repo)** |
|---|---|---|
| E-Mail empfangen/parsen | ✅ | — |
| Chat-Widget (Partner-UI) | ✅ | — |
| Inbound in den Store schreiben | ✅ | — |
| **AI-Triage / Klassifikation** | ❌ | ✅ |
| **Eskalation / Tier-Logik** | ❌ | ✅ |
| Mitarbeiter-Inbox / Antworten | ❌ | ✅ |
| Outbound (Antwort) **versenden** | ✅ | — (erzeugt nur die Message) |

**Codex ist reiner Transport.** Keine Triage, keine Eskalation, keine internen Nachrichten in Codex.

---

## 2. Datenmodell (geteilt, Gateway-provisioniert)
Codex berührt **nur** diese zwei Tabellen (Felder, die Codex betreffen):

### `support_conversations`
| Feld | Wer schreibt | Bedeutung |
|---|---|---|
| `id` (uuid) | Store | Konversations-ID (Back-Office-seitig) |
| `channel` ('email'\|'chat') | **Codex** | Eingangskanal |
| `partner_id` (uuid, null) | Codex (optional) | bekannter Partner-Account |
| `subject` (text) | **Codex** | Betreff/erste Zeile |
| `external_ref` (text, **unique**) | **Codex** | Codex-seitige Mail-/Chat-Thread-ID (Idempotenz + Mapping) |
| `status`, `tier`, `priority`, `assigned_to` | Back-Office | **nicht** von Codex schreiben |

### `support_messages`
| Feld | Wer schreibt | Bedeutung |
|---|---|---|
| `id` (uuid) | Store | Message-ID |
| `conversation_id` (uuid) | Codex/Store | FK auf Konversation |
| `direction` ('inbound'\|'outbound'\|'internal') | s. u. | Codex schreibt **nur** `inbound`, liest `outbound` |
| `author_kind` ('partner'\|'staff'\|'ai') | Codex='partner' | Urheber |
| `body` (text) | je nach Richtung | Inhalt |
| `delivered` (bool) | **Codex** setzt bei Outbound auf `true` | versendet? |
| `created_at` | Store | Zeitstempel |

> Codex sieht/verschickt **nie** `direction='internal'` — das sind reine Staff-Notizen.

---

## 3. Inbound — neue Partner-Nachricht (Codex → Back-Office)
**Bevorzugt: Edge-Function-API** (kein direkter DB-Zugriff/RLS nötig):

```
POST /functions/v1/germany-support-inbound
Authorization: Bearer <CODEX_SERVICE_TOKEN>
Content-Type: application/json

{
  "external_ref": "gmail-thread-AAQk...",   // Pflicht, eindeutig pro Thread
  "channel": "email",                        // 'email' | 'chat'
  "partner_id": null,                         // optional, falls bekannt
  "subject": "Frage zu CoA Charge B-2026-014",
  "body": "Hallo, ist die Charge schon QP-freigegeben?",
  "from": "einkauf@apo-nord.de"              // optional, fürs Partner-Matching
}
```
**Antwort:**
```json
{ "conversation_id": "uuid", "message_id": "uuid", "created": true }
```
**Idempotenz:** Gleiche `external_ref` + neue `body` → neue Message an **bestehender** Konversation
(kein Duplikat). Retries sind sicher.

*Alternative (falls Codex direkten Service-Role-Zugriff hat):* Insert in `support_conversations`
(per `external_ref` upsert) + `support_messages (direction='inbound', author_kind='partner')`.

---

## 4. Outbound — Antwort versenden (Back-Office → Codex)
Das Back-Office erzeugt die Antwort als `support_messages (direction='outbound', delivered=false)`.
Codex holt sie ab und versendet sie über den Original-Kanal.

**Variante A — Polling:**
```
GET /functions/v1/germany-support-outbound?since=<iso>
Authorization: Bearer <CODEX_SERVICE_TOKEN>
→ [{ "message_id","conversation_id","external_ref","channel","body","created_at" }, ...]
```
Nach erfolgreichem Versand bestätigen:
```
POST /functions/v1/germany-support-outbound-ack
{ "message_id": "uuid" }     // setzt delivered=true
```

**Variante B — Realtime/Webhook:** Codex abonniert `support_messages`
(`direction='outbound' AND delivered=false`) bzw. erhält einen Webhook; danach gleicher `-ack`-Call.

---

## 5. Sequenz (ein Fall)
```
Partner ─Mail─▶ Codex ─POST inbound──▶ support_conversations/messages
                                         │
                          Back-Office: AI-Triage + ggf. Eskalation + Staff-Antwort
                                         │
              support_messages(outbound, delivered=false)
                                         ▼
Partner ◀─Mail─ Codex ◀─GET outbound / Realtime ── (versenden) ── POST ack(delivered=true)
```

---

## 6. Auth & Sicherheit
- Codex authentifiziert sich gegen die Edge Functions mit einem **Service-Token** (nicht im Browser).
- Kein Partner-/Endkundenzugriff auf diese Endpunkte.
- TLS überall; PII-Minimierung (nur nötige Felder).
- Rate-Limits serverseitig aktiv.

## 7. Do / Don't für Codex
- ✅ Inbound idempotent schreiben (per `external_ref`).
- ✅ Outbound versenden + `-ack` setzen.
- ✅ `external_ref` stabil pro Thread halten (Mapping-Schlüssel).
- ❌ Keine Triage/Klassifikation/Eskalation.
- ❌ `status`/`tier`/`priority`/`assigned_to` nicht schreiben.
- ❌ `direction='internal'` nie lesen/versenden.

## 8. Versionierung
Contract ist **v1**. Änderungen an Feldern/Endpunkten erhöhen die Version; Codex und Back-Office
pinnen auf dieselbe Major-Version. Breaking Changes werden hier dokumentiert.

## 9. Status der Umsetzung (ehrlich)
Die `support_*`-Tabellen und die Endpunkte (`germany-support-inbound` / `-outbound` / `-outbound-ack`)
sind **noch nicht provisioniert** — sie werden im `cannaworld-gateway` angelegt bzw. als Edge Functions
in diesem Repo deployed (Phase B0/B1 der Roadmap). Dieser Contract ist die **Spezifikation, gegen die
beide Seiten parallel bauen** können, bevor das Backend steht.
