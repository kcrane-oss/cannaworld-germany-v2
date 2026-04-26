# CannaWorld Germany

Germany is a Vite/React frontend vertical for German B2B intake, importer qualification, document review, and Gateway service presentation.

## Backend contract

- No separate Germany backend exists in this repo.
- No `api/` server routes, no local `supabase/functions`, and no standalone database are owned here.
- Runtime auth/data access uses the shared CannaWorld Supabase project (`twabuzdrwuactukamyed`) via browser-safe Vite env vars:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`
- Operational backend capabilities are shared with the CannaWorld Gateway / AICert / Marketplace ecosystem and must stay role/RLS gated there.

## Local development

```bash
npm install
npm run dev
```

For authenticated dashboard work, provide the same public Supabase env vars locally. Never use a service-role key in browser env.

## Verification gates

```bash
npm run build
npm run lint
```

`/dashboard` is protected by Supabase session auth. Partner/role approval remains a shared-backend/RLS concern, not a Germany-local backend claim.
