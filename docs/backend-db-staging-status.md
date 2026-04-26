# CannaWorld Germany — Backend / DB / Staging Status

## Germany backend declaration

CannaWorld Germany is a Vite/React frontend vertical. It does not own a separate backend, server, API route layer, Supabase Edge Functions directory, or database.

The app uses the shared CannaWorld Supabase project (`twabuzdrwuactukamyed`) through browser-safe env vars:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Operational backend ownership remains with the shared Gateway/Supabase ecosystem and its RLS/role model.

## DB reconciliation status

Do not apply production migrations from Germany. The apply-ready reconciliation state is in `cannaworld-gateway` at commit `f89be2e`.

Pending isolated dry-run migrations:

- `20260426162500_harden_regulatory_policies.sql` — no-op marker
- `20260426165000_lockdown_user_role_self_assignment.sql` — `role_change_requests` / `user_roles` lockdown with `lab_provider`
- `20260426171100_batch_participant_read_policy.sql` — batch participant read policy

Status: apply-ready only. Production apply requires explicit Kevin approval plus pre-apply snapshots.

## Staging RLS status

No separate staging Supabase ref is currently confirmed for this Germany/Gateway stack. Current validation state is production-readonly inventory plus isolated migration dry-run, not a real staging apply.

Next clean options:

1. Find an existing staging Supabase project/ref and document it.
2. Create a staging project, restore/dump schema safely, then apply RLS migrations there.
3. If no staging exists, keep documentation explicit: `Prod-readonly snapshot + isolated dry-run only`.
