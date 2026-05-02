#!/usr/bin/env node
/**
 * Smoke: bundle-shape regression guard.
 *
 * Catches the class of bug shipped between PR #96 and PR #105:
 * splitting react-helmet-async (or any React-coupled lib) into its own
 * vendor chunk triggers TDZ "Cannot access X before initialization" at
 * module init, producing a blank page with no console errors.
 *
 * What this asserts:
 *  - dist/ exists and was actually built
 *  - No vendor-helmet-*.js (react-helmet-async must stay co-located
 *    with React in the entry chunk)
 *  - No vendor-react-*.js as a separate chunk (same TDZ risk)
 *  - The entry chunk is reasonably small (under 1.5MB raw) — guards
 *    against accidentally reverting to the 4.7MB monolith
 *  - Lazy data chunks present (i18n, blog-posts-en, blog-posts-fr) —
 *    guards against accidentally removing the data-only split that
 *    keeps initial load under 800KB
 *
 * Add new chunk-shape rules here as we learn about more regressions.
 * Runs in pre-deploy gates (.github/workflows/deploy.yml).
 *
 * Usage: node scripts/smoke-bundle-shape.mjs
 * Exits 0 on pass, 1 on any failure.
 */
import { readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const reset = "\x1b[0m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const bold = "\x1b[1m";

const cases = [];
function record(name, ok, hint = "") {
  cases.push({ name, ok, hint });
}

const distAssets = "dist/assets";

if (!existsSync(distAssets)) {
  console.error(`${red}${bold}FAIL${reset} dist/assets not found. Run \`npx vite build\` first.`);
  process.exit(1);
}

const files = readdirSync(distAssets);

// 1. Forbidden vendor chunks (TDZ-prone)
const FORBIDDEN_CHUNKS = ["vendor-helmet", "vendor-react", "vendor-router", "vendor-helmet-async"];
for (const forbidden of FORBIDDEN_CHUNKS) {
  const hit = files.some((f) => f.startsWith(forbidden + "-") || f === forbidden + ".js");
  record(
    `no ${forbidden}-*.js chunk`,
    !hit,
    hit ? `found in dist/assets — splitting React-coupled libs into vendors triggers TDZ at module init (see PR #96/#105 postmortem in STATE.md)` : ""
  );
}

// 2. Entry chunk size guard (reasonable budget)
const indexFile = files.find((f) => f.startsWith("index-") && f.endsWith(".js"));
record("entry chunk index-*.js exists", !!indexFile);
if (indexFile) {
  const sz = statSync(join(distAssets, indexFile)).size;
  const MB = sz / 1024 / 1024;
  record(`entry chunk under 1.5MB raw (got ${MB.toFixed(2)} MB)`, sz < 1.5 * 1024 * 1024, `actual=${sz} bytes`);
}

// 3. Lazy data chunks must exist (data-only split shape)
const REQUIRED_LAZY_CHUNKS = ["i18n", "blog-posts-en", "blog-posts-fr"];
for (const required of REQUIRED_LAZY_CHUNKS) {
  const hit = files.some((f) => f.startsWith(required + "-") && f.endsWith(".js"));
  record(`lazy chunk ${required}-*.js present`, hit, hit ? "" : `missing — vite.config.ts manualChunks regression`);
}

// Summary
let pass = 0;
let fail = 0;
for (const c of cases) {
  const tag = c.ok ? `${green}PASS${reset}` : `${red}FAIL${reset}`;
  console.log(`${tag}  ${c.name}${c.hint ? `  (${c.hint})` : ""}`);
  if (c.ok) pass++; else fail++;
}
console.log(`\n${bold}${pass}/${cases.length} cases pass${reset}`);
if (fail) {
  console.error(`${red}${bold}${fail} cases failed${reset}`);
  process.exit(1);
}
