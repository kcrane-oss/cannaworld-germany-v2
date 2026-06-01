#!/usr/bin/env bash
# Deploy the current checkout to the live Vercel production project
# (cw-germany-final-public-v100 -> cannaworld-germany.de).
#
# Use this for local / OpenClaw-driven deploys. CI does the same thing on
# every push to master via .github/workflows/deploy-production.yml.
#
# Requires: Vercel CLI (`npm i -g vercel`) and a token.
#   VERCEL_TOKEN=xxxxx ./scripts/deploy-prod.sh
#
# The production env vars (incl. VITE_BTM_SALT) are pulled from the Vercel
# project, so they are baked into the build correctly.
set -euo pipefail

export VERCEL_ORG_ID="${VERCEL_ORG_ID:-team_3iEs5XA0LAgcHxWzWq3SfSUJ}"
export VERCEL_PROJECT_ID="${VERCEL_PROJECT_ID:-prj_tedvOhFjpxDgdFKYPGLTZdrmKHsS}"

if [ -z "${VERCEL_TOKEN:-}" ]; then
  echo "ERROR: set VERCEL_TOKEN (a Vercel access token) before running." >&2
  exit 1
fi
TOKEN_ARG=(--token "$VERCEL_TOKEN")

echo "==> Verifying (lint + tests)"
npm run lint
npm test

echo "==> Pulling production project settings + env vars"
vercel pull --yes --environment=production "${TOKEN_ARG[@]}"

echo "==> Building with production env"
vercel build --prod "${TOKEN_ARG[@]}"

echo "==> Guard: build must not contain the dev BtM salt"
if grep -rqF "DEV_SALT_REPLACE_IN_PROD" .vercel/output; then
  echo "ERROR: VITE_BTM_SALT not set in Vercel production env (dev salt placeholder still in build). Aborting." >&2
  exit 1
fi
echo "    guard passed."

echo "==> Deploying to production"
vercel deploy --prebuilt --prod "${TOKEN_ARG[@]}"
echo "==> Done. Live on cannaworld-germany.de"
