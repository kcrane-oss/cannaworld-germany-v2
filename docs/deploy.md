# Production deployment

The live site **cannaworld-germany.de** is served by the Vercel project
**`cw-germany-final-public-v100`** (org `kcrane-oss-projects`).

This project is now **connected to GitHub** (`kcrane-oss/cannaworld-germany-v2`,
production branch `master`). Previously it was updated by ad-hoc `vercel --prod`
uploads from a local machine; that is no longer needed.

## How deploys happen now

- **Primary — automatic:** every push/merge to `master` triggers a Vercel
  production deployment automatically (native Git integration). Both Claude Code
  (via merge) and OpenClaw (via push) use this path.
- **Manual fallback (optional):** `VERCEL_TOKEN=… ./scripts/deploy-prod.sh`
  builds and deploys from a local checkout. Useful if you ever need to deploy
  without pushing.

Production environment variables are read from the Vercel project, so
`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (and, once set,
`VITE_BTM_SALT`) are baked into the build.

## VITE_BTM_SALT (only for the pharmacy BtM dispense feature)

Not required for the site to go live. It is only used to hash BtM prescription
numbers in the pharmacy *dispense* flow. Until it is set in the project's
Production environment variables, that single action is blocked at runtime
(see `PharmacyDispense.tsx`) — the rest of the app works normally.

When you do set it: use a **stable secret** that must never change after
go-live and must match what the `pharmacy-dispense` backend expects.
