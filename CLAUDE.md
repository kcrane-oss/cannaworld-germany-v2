# CLAUDE.md

Guidance for AI assistants (and humans) working in this repository.

## What this is

**CannaWorld Germany** is a Vite + React + TypeScript single-page app — the German
B2B "front door" of the wider CannaWorld ecosystem (Gateway / AICert / Marketplace /
Europe / Thailand). Its job is to qualify German market participants (pharmacies,
wholesalers, importers, manufacturers) for medical-cannabis import, review their
documents, and hand qualified demand off to the shared backend. It is **compliance-first
and B2B-only**: no consumer sales, no strain advertising, no therapeutic claims.

The public site (`/`, `/login`, `/register`) markets and qualifies. Everything under
`/dashboard` is a Supabase-session-protected partner cockpit (Marketplace, Trade Cases,
Batches, QP Release, Compliance, Logistics, Suppliers, Documents, Regulatory, Warehouse,
Audit Passport, Analytics, Pharmacy import/dispense flows, etc.).

The app is also PWA- and Capacitor-aware (mobile shells), so browser APIs are accessed
defensively.

## Backend model — read this before touching data code

There is **no Germany-owned database or server-side app**. Runtime data access goes
directly to the **shared CannaWorld Supabase project** (`twabuzdrwuactukamyed`) from the
browser, gated by that project's RLS and role model.

- Auth/data uses browser-safe env vars only:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`
- **Never** put a service-role key in browser env. `src/integrations/supabase/client.ts`
  actively throws if it detects a service-role key.
- The Supabase project is shared with other verticals. Tables this repo *owns* are
  prefixed `germany_*` (e.g. `germany_btm_licenses`, `germany_batch_verifications`,
  `germany_function_rate_limits`). Shared tables (`batches`, `user_roles`, etc.) belong
  to the ecosystem — treat their schema as read-mostly and RLS-governed.
- **Do not apply production DB migrations from this repo.** Migration reconciliation lives
  in `cannaworld-gateway`. See `docs/backend-db-staging-status.md`.

> Note: `README.md` / `docs/backend-db-staging-status.md` say "no `supabase/functions`."
> That is now stale — a small set of **Germany-owned Edge Functions** exists under
> `supabase/functions/germany-*` (added later). The "no separate backend / shared Supabase"
> principle still holds; these functions live in the shared project and are the only
> functions this repo owns (declared in `supabase/config.toml`).

## Tech stack

- **Build/dev:** Vite 8, `@vitejs/plugin-react-swc`, TypeScript ~5.9 (strict, project refs)
- **UI:** React 18, React Router 7 (`BrowserRouter`), Tailwind CSS v4 (`@tailwindcss/vite`),
  Radix UI primitives + shadcn-style components, lucide-react icons, framer-motion, sonner toasts
- **Data:** `@tanstack/react-query` v5, `@supabase/supabase-js` v2
- **Forms/validation:** react-hook-form + zod (`@hookform/resolvers`)
- **i18n:** i18next + react-i18next (German default, English fallback locale)
- **Mobile/PWA:** Capacitor 8 plugins, `vite-plugin-pwa` (Workbox)
- **Shared SDK:** `cannaworld-sdk` vendored at `vendor/cannaworld-sdk` (file: dependency)
- **Tests:** Vitest + Testing Library (jsdom)
- **Deploy:** Vercel (`vercel.json`), SPA rewrites + strict security headers/CSP

## Commands

```bash
npm install        # uses .npmrc -> legacy-peer-deps=true
npm run dev        # Vite dev server on http://localhost:8080
npm run build      # tsc -b (typecheck) + vite build  -> dist/
npm run lint       # eslint .
npm test           # vitest run (one-shot)
npm run test:watch # vitest watch
npm run preview    # preview the production build
```

**Verification gates before considering work done:** `npm run build` and `npm run lint`
must pass (CI runs lint, build, test — see `.github/workflows/ci.yml`). Run `npm test`
when you touch anything with a `*.test.tsx` neighbor.

## Project structure

```
src/
  App.tsx                  # All routes + landing/login/register/dashboard-shell in one file
  main.tsx                 # Root render; imports ./i18n side-effect, ./index.css
  index.css                # Tailwind entry + global styles
  i18n/                    # i18next init + locales/{de,en}.json
  integrations/supabase/   # client.ts (the singleton client) + types.ts (GENERATED, do not edit)
  hooks/                   # ~37 hooks: useAuth, useUserRoles, useHasRole, data hooks (use*-/use-*)
  components/
    RoleGuard.tsx          # Route-level RBAC + BtM-license gate
    UniverseBar.tsx        # Cross-app nav between CannaWorld verticals
    CrossAppCTA.tsx        # Per-module cross-app call-to-action
    onboarding/            # Role onboarding wizard, steps/, config/role-configs.ts
    ui/                    # shadcn-style primitives (button, dialog, ...) + mobile helpers
  pages/dashboard/         # One file per dashboard module; *.test.tsx live alongside
  lib/                     # API wrappers, domain logic, validation-schemas, utils (cn)
  types/                   # Ambient type decls (e.g. i18next.d.ts)
  test/                    # Vitest setup.ts (jest-dom, i18n, matchMedia/IO stubs)
supabase/
  config.toml              # Declares the germany-* edge functions (verify_jwt = true)
  functions/germany-*/     # Germany-owned Deno edge functions
  functions/_shared/cors.ts# Origin allowlist, authenticate(), json(), isRateLimited()
vendor/cannaworld-sdk/     # Vendored shared SDK (marketplace/regulatory/target-market APIs)
docs/                      # Backend/DB/staging status notes
```

## Conventions

- **Import alias:** `@/` → `src/` (configured in vite, vitest, tsconfig). Prefer `@/...`
  over deep relative paths.
- **Supabase access:** always import the shared singleton `supabase` from
  `@/integrations/supabase/client`. Don't construct new clients.
- **Data fetching:** wrap reads in React Query hooks under `src/hooks/`. Pattern: a typed
  `RowType` interface + `useQuery({ queryKey: ["germany-..."], queryFn })` that selects
  explicit columns, orders, and `throw error` on failure. See `useBatches.ts` as the
  canonical example. Query client defaults: `staleTime 30s`, no refetch-on-focus, `retry 1`.
- **Auth:** `AuthProvider`/`useAuth` (`src/hooks/useAuth.tsx`) wrap the app and expose
  `session`/`user`/`loading`/`signOut`. Note `App.tsx` also lazy-loads the client directly
  in a couple of route guards (`loadSupabase()`) — both patterns exist.
- **RBAC:** gate sensitive routes with `<RoleGuard allowedRoles={[...]}>`. Roles come from
  the `app_role` enum (`admin | auditor | importer | exporter | compliance | inspector |
  logistics | farm | shop | trader | pharmacy | lab_provider`); `admin` always passes.
  Use `requireBtMLicense` for BtM (narcotics) routes — it additionally checks
  `germany_btm_licenses`. Roles are read via `useUserRoles` / `useHasRole`.
- **i18n:** user-facing strings go through `t("key", "German fallback")`. German is the
  default language; English is a fallback locale. Keep keys in
  `src/i18n/locales/{de,en}.json`.
- **Styling:** Tailwind utility classes inline; dark, cyan/emerald glass aesthetic. Use the
  `cn()` helper from `@/lib/utils` to merge classes. Reuse `components/ui/*` primitives.
- **Edge functions:** Deno + `Deno.serve`. Always `authenticate(req)`, role-check against
  `user_roles`, `isRateLimited(...)`, and respond via `json(req, ...)`. CORS origins are
  allowlisted in `_shared/cors.ts`. Server-side secrets use `SB_SECRET_KEY` /
  `SUPABASE_SERVICE_ROLE_KEY` from the function env (never shipped to the browser).
- **Generated code:** `src/integrations/supabase/types.ts` is generated and eslint-ignored
  — **do not hand-edit**. Regenerate from the schema instead.
- **Tests:** colocate `*.test.tsx` next to the unit; mock hooks with `vi.mock`, render with
  Testing Library, assert on visible text/roles. Setup (`src/test/setup.ts`) initializes
  i18n and stubs `matchMedia`/`IntersectionObserver`.

## Lint posture

ESLint (flat config) is intentionally lenient to keep CI green while legacy debt is paid
down: `no-explicit-any` is off, and several rules (`no-unused-vars`, `exhaustive-deps`,
`react-refresh/only-export-components`, etc.) are `warn`, not `error`. Don't add new
violations, but don't take a `warn` as license to lower quality.

## Security notes (this is a regulated domain)

- No service-role keys, secrets, or PII in browser code, commits, or logs.
- Keep B2B/compliance framing — no consumer/medical claims in copy.
- Respect RLS: the browser is an untrusted client; never assume client-side role checks are
  authoritative. They're UX gating on top of server-enforced RLS.
- `vercel.json` ships a strict CSP and security headers — keep new external origins in mind
  (script-src is `'self'`; connect-src allows `https:`/`wss:`).

## Git / workflow

- Commit style follows Conventional Commits: `feat(scope): …`, `fix(scope): …`,
  `chore(...)`, `test: …`.
- CI (`.github/workflows/ci.yml`) runs on push/PR to `main`/`master`: install → lint →
  build → test. Make those four pass locally before pushing.
- Do not open pull requests unless explicitly asked.
</content>
</invoke>
