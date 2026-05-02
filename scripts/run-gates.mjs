#!/usr/bin/env node
/**
 * Local gate runner.
 *
 * Mirrors the CI gates from .github/workflows/deploy.yml minus Gate 19
 * (post-deploy production smoke; only meaningful after a real deploy).
 * Reports pass/fail count + total time. Exits 1 if any gate fails.
 *
 * Why this exists
 * ---------------
 * PR #146 shipped functions/lib/README.md with em-dashes that broke
 * Gate 4 on main. The author (me) ran tsc + a few smokes locally
 * before pushing but skipped the em-dash sweep, which would have
 * caught the regression in 0.2 seconds. A single command that runs
 * the full gate suite locally removes the human error.
 *
 * Usage
 * -----
 *   npm run gates           # full suite (~60-90 seconds)
 *   npm run gates -- --fast # skip build + bundle smokes (~30 seconds)
 *
 * The full suite is what CI runs on every push. Run it before any
 * `git push` that touches code in functions/, src/, scripts/, or
 * .github/workflows/.
 */
import { spawnSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";

const reset = "\x1b[0m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const dim = "\x1b[2m";
const bold = "\x1b[1m";

const args = process.argv.slice(2);
const fast = args.includes("--fast");

/**
 * Each gate definition: name + cmd to run + optional notes.
 * `cmd` is an array of [bin, ...args] passed to spawnSync.
 * `slow: true` excludes the gate from --fast mode.
 * `inline: true` runs the cmd as a shell one-liner instead of an exec.
 */
const gates = [
  { name: "Gate 1 typecheck", cmd: ["npx", "tsc", "--noEmit"] },
  { name: "Gate 1b ESLint", cmd: ["npm", "run", "lint", "--", "--max-warnings", "21"] },
  { name: "Gate 2 i18n-deep", cmd: ["node", "scripts/audit-translations-deep.mjs"], warnOnly: true },
  { name: "Gate 3 blog-translations", cmd: ["node", "scripts/audit-blog-translations.mjs"] },
  { name: "Gate 4 em-dash sweep", inline: true, cmd: 'matches=$(grep -rn "—" src/i18n/translations/ src/blog/posts/ functions/ 2>/dev/null | grep -v "functions/api/chat-advisor.ts" || true); if [ -n "$matches" ]; then echo "$matches"; exit 1; fi' },
  { name: "Gate 5 audit-pdf-validation", cmd: ["npx", "tsx", "scripts/smoke-audit-pdf-validation.mjs"] },
  { name: "Gate 6 audit-pdf-render", cmd: ["npx", "tsx", "scripts/smoke-audit-pdf-render.mjs"] },
  { name: "Gate 7 audit-pdf-hmac", cmd: ["npx", "tsx", "scripts/smoke-audit-pdf-hmac.mjs"] },
  { name: "Gate 8 audit-pdf-onboarding", cmd: ["npx", "tsx", "scripts/smoke-audit-pdf-onboarding.mjs"] },
  { name: "Gate 9 cron-guard", cmd: ["npx", "tsx", "scripts/smoke-cron-guard.mjs"] },
  { name: "Gate 10 admin-audit-pdf-stats", cmd: ["npx", "tsx", "scripts/smoke-admin-audit-pdf-stats.mjs"] },
  { name: "Gate 11 visibility-report-pdf", cmd: ["npx", "tsx", "scripts/smoke-visibility-report-pdf.mjs"] },
  { name: "Gate 12 instant-ai-vis", cmd: ["npx", "tsx", "scripts/smoke-instant-ai-vis.mjs"] },
  { name: "Gate 13 quote-pdf", cmd: ["npx", "tsx", "scripts/smoke-quote-pdf.mjs"] },
  { name: "Gate 14 admin-endpoint-stats", cmd: ["npx", "tsx", "scripts/smoke-admin-endpoint-stats.mjs"] },
  { name: "Gate 15 client-error", cmd: ["npx", "tsx", "scripts/smoke-client-error.mjs"] },
  { name: "Gate 16 help-article-fr-routing", cmd: ["node", "scripts/smoke-help-article-fr-routing.mjs"] },
  { name: "Gate 17 lang-route-sync", cmd: ["node", "scripts/smoke-lang-route-sync.mjs"] },
  { name: "Gate 18 popup-sensitivity", cmd: ["node", "scripts/smoke-popup-sensitivity.mjs"] },
  { name: "Gate 22 partner-application", cmd: ["npx", "tsx", "scripts/smoke-partner-application.mjs"] },
  { name: "Gate 23 rate-limit", cmd: ["npx", "tsx", "scripts/smoke-rate-limit.mjs"] },
  { name: "Gate 24 system-health", cmd: ["npx", "tsx", "scripts/smoke-system-health.mjs"] },
  { name: "Gate 25 server-error", cmd: ["npx", "tsx", "scripts/smoke-server-error.mjs"] },
  { name: "Gate 26 supabase-insert", cmd: ["npx", "tsx", "scripts/smoke-supabase-insert.mjs"] },
  { name: "Gate 27 html-escape", cmd: ["npx", "tsx", "scripts/smoke-html-escape.mjs"] },
  { name: "Gate 28 crypto", cmd: ["npx", "tsx", "scripts/smoke-crypto.mjs"] },
  { name: "Gate 29 origin", cmd: ["npx", "tsx", "scripts/smoke-origin.mjs"] },
  { name: "Gate 30 email", cmd: ["npx", "tsx", "scripts/smoke-email.mjs"] },
  { name: "Gate 31 structured-log", cmd: ["npx", "tsx", "scripts/smoke-structured-log.mjs"] },
  { name: "Gate 32 string-clip", cmd: ["npx", "tsx", "scripts/smoke-string-clip.mjs"] },
  { name: "Gate 33 json-response", cmd: ["npx", "tsx", "scripts/smoke-json-response.mjs"] },
  { name: "Gate 34 hmac", cmd: ["npx", "tsx", "scripts/smoke-hmac.mjs"] },
  { name: "Gate 35 no-inline-duplicates", cmd: ["node", "scripts/smoke-no-inline-duplicates.mjs"] },
  { name: "Gate 36 STATE size", cmd: ["node", "scripts/smoke-state-size.mjs"] },
  { name: "Gate 7 build", cmd: ["npm", "run", "build"], slow: true },
  { name: "Gate 20 bundle-shape", cmd: ["node", "scripts/smoke-bundle-shape.mjs"], slow: true, requiresBuild: true },
  { name: "Gate 21 bundle-load", cmd: ["node", "--experimental-vm-modules", "scripts/smoke-bundle-load.mjs"], slow: true, requiresBuild: true },
];

const filtered = fast ? gates.filter((g) => !g.slow) : gates;

console.log(`${bold}Running ${filtered.length} gates${fast ? " (--fast mode, skipping build + bundle)" : ""}${reset}\n`);

const startTotal = Date.now();
let passed = 0;
let failed = 0;
let warned = 0;
const results = [];

for (const gate of filtered) {
  const start = Date.now();
  process.stdout.write(`${dim}${gate.name}...${reset} `);

  const result = gate.inline
    ? spawnSync("bash", ["-c", gate.cmd], { stdio: "pipe", encoding: "utf8" })
    : spawnSync(gate.cmd[0], gate.cmd.slice(1), { stdio: "pipe", encoding: "utf8", shell: process.platform === "win32" });

  const ms = Date.now() - start;
  const ok = result.status === 0;

  if (ok) {
    passed++;
    process.stdout.write(`${green}PASS${reset} ${dim}(${ms}ms)${reset}\n`);
  } else if (gate.warnOnly) {
    warned++;
    process.stdout.write(`${yellow}WARN${reset} ${dim}(${ms}ms, warn-only)${reset}\n`);
  } else {
    failed++;
    process.stdout.write(`${red}${bold}FAIL${reset} ${dim}(${ms}ms)${reset}\n`);
    const stderr = (result.stderr ?? "").trim();
    const stdout = (result.stdout ?? "").trim();
    const tail = (stderr || stdout).split("\n").slice(-10).join("\n");
    if (tail) console.error(`${dim}--- last 10 lines of output ---${reset}\n${tail}\n${dim}-------------------------------${reset}`);
  }

  results.push({ name: gate.name, ok: ok || gate.warnOnly, ms });
}

const totalMs = Date.now() - startTotal;
const totalSec = (totalMs / 1000).toFixed(1);

console.log(`\n${bold}Summary${reset}`);
console.log(`  ${green}${passed} passed${reset}`);
if (warned > 0) console.log(`  ${yellow}${warned} warned${reset} ${dim}(warn-only gates failed but do not block)${reset}`);
if (failed > 0) console.log(`  ${red}${failed} failed${reset}`);
console.log(`  ${dim}total time: ${totalSec}s${reset}`);

if (failed > 0) {
  console.error(`\n${red}${bold}${failed} gate(s) failed. Fix before pushing.${reset}`);
  process.exit(1);
}

console.log(`\n${green}${bold}All gates pass.${reset}`);
