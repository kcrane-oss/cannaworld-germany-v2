# Production deployment

The live site **cannaworld-germany.de** is served by the Vercel project
**`cw-germany-final-public-v100`** (org `kcrane-oss-projects`).

Previously this project was updated by ad-hoc `vercel --prod` uploads from a
local machine, so nothing in GitHub reached the live site automatically. That
is now wired up.

## How deploys happen now

- **Via Claude Code / a merge:** any push to `master` runs
  `.github/workflows/deploy-production.yml`, which lint+tests, builds with the
  project's **production env vars**, and deploys to the live project.
- **Via OpenClaw / locally:** run `VERCEL_TOKEN=… ./scripts/deploy-prod.sh`
  from a checkout. It does the exact same steps.

Both paths pull the production environment variables from Vercel
(`vercel pull --environment=production`) so `VITE_SUPABASE_URL`,
`VITE_SUPABASE_PUBLISHABLE_KEY` and `VITE_BTM_SALT` are baked in correctly.

## One-time setup

1. **GitHub secret** — repo → Settings → Secrets and variables → Actions →
   add `VERCEL_TOKEN` (a Vercel access token with deploy rights).
2. **Vercel production env vars** — project `cw-germany-final-public-v100` →
   Settings → Environment Variables → Production:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_BTM_SALT` — **stable secret**, must never change after go-live and
     must match what the `pharmacy-dispense` backend expects.

## BtM salt guard

Both the workflow and the script abort **before** deploying if the built
output still contains `DEV_SALT_REPLACE_IN_PROD` — i.e. if `VITE_BTM_SALT`
is not set in the Vercel production env. This prevents shipping a build that
would generate wrong BtM prescription hashes.
