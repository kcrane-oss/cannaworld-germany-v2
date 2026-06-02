# Technisches Onboarding- & Datenmodell — Thailand-Farmen

> **Status:** Implementierungs-Skizze / Diskussionsgrundlage zum Konzept
> (`thailand-gatekeeper-konzept.md`). Noch **kein** Code, keine Migration.
> Erinnerung aus `CLAUDE.md`: kein DB-Migrations-Apply aus diesem Repo (läuft über
> `cannaworld-gateway`); RLS-governed, Browser ist untrusted; `germany_*`/künftig
> `thailand_*` als eigene Präfixe, geteilte Tabellen read-mostly.

---

## 1. Das Tier-Modell als Zustandsmaschine

Der Funnel aus dem Konzept (Weg D) als Status, den eine Farm durchläuft:

```
tier_0_registered  →  tier_1_gacp_ready  →  tier_2_gacp_certified  →  tier_3_hub_linked
   (Basisdaten)        (Self-Assessment        (OneCert / Thai-GACP-     (an EU-GMP-Hub
                        + Pre-Audit ok)          Zertifikat hinterlegt)    gekoppelt, EU-fähig)
```

Übergänge sind **gated** — jeder Schritt verlangt nachgewiesene Artefakte:

| Übergang | Gate (was muss vorliegen) |
|---|---|
| 0 → 1 | Self-Assessment-Fragebogen vollständig + Remote-Pre-Audit „passed" |
| 1 → 2 | gültiges GACP-Zertifikat (OneCert/DTAM) im Dossier, Auditbericht verknüpft |
| 2 → 3 | Liefer-/QAA-Vertrag + Anbindung an einen `processing_hub` mit EU-GMP-Status |

Zustandswechsel laufen idealerweise server-seitig (Edge Function), nie nur Client-Gate.

## 2. Datenmodell-Entwurf (`thailand_*` / `farm_*`)

Konzeptionell, an `germany_*`-Konventionen angelehnt — finale Schemapflege im Gateway.

```
farm_producers
  id, name, type (farm | cooperative), province, country='TH',
  tier (enum: tier_0..tier_3), exclusivity (none|regional|exclusive),
  status (active|suspended|offboarded), created_at, updated_at

farm_cooperative_members        -- für Cluster-/Gruppen-Zertifizierung (Weg B)
  id, cooperative_id -> farm_producers.id, member_farm_id -> farm_producers.id

farm_documents                  -- das Compliance-Dossier je Farm
  id, producer_id, doc_type (gacp_cert | coa | pesticide | heavy_metal |
       microbio | license | export_permit | mou), file_ref, issued_at,
       expires_at, verification_status (pending|verified|rejected), verified_by

farm_audits
  id, producer_id, audit_type (pre_audit | gacp | bio | gmp_readiness),
  partner (onecert | tuv | internal), result (pass|fail|conditional),
  score, report_ref, performed_at, valid_until

processing_hubs                 -- die GMP-Schicht (Weg A Hub-&-Spoke)
  id, name, location, gmp_status (none|gap_assessed|in_progress|eu_gmp_certified),
  certifying_body, valid_until

farm_hub_links                  -- Spoke -> Hub
  id, producer_id, hub_id, linked_at, active

farm_onboarding_events          -- Audit-Trail der Tier-Übergänge
  id, producer_id, from_tier, to_tier, gate_passed (bool), actor, created_at
```

Reuse statt Neubau: **Batches / Audit Passport / Documents / Compliance** existieren
schon in der App — `farm_documents`/`farm_audits` sollten an diese Module andocken,
nicht parallel laufen.

## 3. Anbindung an bestehende App-Bausteine

| Konzept-Baustein | Bestehender Code | Erweiterung |
|---|---|---|
| Tier-Funnel | `src/components/onboarding/` (Wizard, `config/role-configs.ts`) | Farm-Onboarding-Flow + Tier-Step |
| Dossier | Documents-Modul + `farm_documents` | Doc-Type-Verifikations-UI |
| Audits | Audit-Passport-Modul + `farm_audits` | Partner-Auditberichte einlesen |
| Daten-Hooks | Muster `useBatches.ts` | `useFarmProducers`, `useFarmDocuments`, `useFarmAudits` |
| RBAC | `RoleGuard`, `app_role`-Enum | ggf. Rolle/Scope für Thailand-Onboarding |
| Server-Logik | `supabase/functions/germany-*` | `thailand-farm-tier-transition` (gated) |

## 4. React-Query-Hook-Skizze (Muster `useBatches.ts`)

```ts
// src/hooks/useFarmProducers.ts  (Skizze)
export interface FarmProducer {
  id: string;
  name: string;
  type: "farm" | "cooperative";
  province: string;
  tier: "tier_0" | "tier_1" | "tier_2" | "tier_3";
  status: "active" | "suspended" | "offboarded";
}

export function useFarmProducers() {
  return useQuery({
    queryKey: ["thailand-farm-producers"],
    queryFn: async (): Promise<FarmProducer[]> => {
      const { data, error } = await supabase
        .from("farm_producers")
        .select("id,name,type,province,tier,status")
        .eq("country", "TH")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
}
```

## 5. Tier-Übergang als Edge Function (gated, server-enforced)

```
supabase/functions/thailand-farm-tier-transition/
  - authenticate(req)                     // _shared/cors.ts
  - role-check gegen user_roles (admin|compliance)
  - isRateLimited(...)
  - prüfe Gate-Bedingung (Doku/Audit vorhanden, verifiziert)
  - update farm_producers.tier + insert farm_onboarding_events
  - json(req, { ok, newTier })
```

Client-seitige Tier-Anzeige ist nur UX — die **Wahrheit** über erlaubte Übergänge
liegt server-seitig (RLS + Function), wie im Repo vorgegeben.

## 6. Nächste Schritte (wenn implementiert werden soll)
1. Schema-Vorschlag im **Gateway** abstimmen (nicht aus diesem Repo migrieren).
2. Hooks + Onboarding-Step + Doc-Verifikations-UI bauen (mit `*.test.tsx`).
3. `thailand-farm-tier-transition` Edge Function + `supabase/config.toml`-Eintrag.
4. i18n-Keys (de/en) für alle Strings; `npm run build && npm run lint && npm test`.
