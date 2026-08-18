#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const baseline = Number(process.argv[2]);
if (!Number.isInteger(baseline) || baseline < 0) {
  console.error("Usage: node scripts/typecheck-ratchet.mjs <non-negative baseline>");
  process.exit(2);
}

const tscPath = fileURLToPath(new URL("../node_modules/typescript/bin/tsc", import.meta.url));
const result = spawnSync(process.execPath, [tscPath, "-p", "tsconfig.app.json", "--noEmit", "--pretty", "false", "--incremental", "false"], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
if (output) process.stdout.write(output);
if (result.error) {
  console.error(`TypeScript could not start: ${result.error.message}`);
  process.exit(1);
}
const errors = output.match(/error TS\d+:/g)?.length ?? 0;
if (result.status === 0 && errors === 0) {
  console.log(`TypeScript ratchet passed: 0 errors (baseline ${baseline}).`);
  process.exit(0);
}
if (errors === 0) {
  console.error(`TypeScript exited with status ${result.status} without parseable diagnostics.`);
  process.exit(1);
}
if (errors > baseline) {
  console.error(`TypeScript ratchet failed: ${errors} errors exceed baseline ${baseline}.`);
  process.exit(1);
}
console.log(`TypeScript ratchet passed: ${errors} errors do not exceed baseline ${baseline}.`);
