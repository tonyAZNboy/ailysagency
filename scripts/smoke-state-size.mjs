#!/usr/bin/env node
/**
 * STATE.md size guard.
 *
 * Background: STATE.md is the canonical session-state document at
 * the repo root. CLAUDE.md "START HERE" rule mandates every new
 * session reads it FIRST. The Claude Code Read tool refuses files
 * larger than 256 KB; once STATE.md crosses that limit the START
 * HERE flow breaks. PR #139 (2026-05-02) had to archive 25
 * historical session-close blocks (3748 lines, 269KB -> 68KB) to
 * unbreak it.
 *
 * This gate prevents the regression. Threshold is 200 KB (78%
 * of the 256 KB Read tool limit). When tripped, archive older
 * session-close blocks to docs/state-archive-<period>.md and
 * cross-link them from STATE.md head.
 *
 * Run: node scripts/smoke-state-size.mjs
 * Exits 0 if STATE.md is under threshold, 1 otherwise.
 */
import { statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const reset = "\x1b[0m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const bold = "\x1b[1m";

// 200 KB threshold leaves ~56 KB headroom under the Read tool limit
// (256 KB), enough for several SESSION OPEN entries before the gate
// re-trips and forces another archive pass.
const THRESHOLD_BYTES = 200 * 1024;

// Soft warning at 80% of threshold so authors see it coming.
const WARN_BYTES = Math.floor(THRESHOLD_BYTES * 0.8);

const repoRoot = fileURLToPath(new URL("..", import.meta.url)).replace(/[\\/]$/, "");
const stateMd = join(repoRoot, "STATE.md");

let size;
try {
  size = statSync(stateMd).size;
} catch (err) {
  console.error(`${red}FAIL${reset}  cannot stat STATE.md: ${err.message}`);
  process.exit(1);
}

const sizeKb = (size / 1024).toFixed(1);
const thresholdKb = (THRESHOLD_BYTES / 1024).toFixed(0);
const warnKb = (WARN_BYTES / 1024).toFixed(0);

if (size > THRESHOLD_BYTES) {
  console.error(
    `${red}${bold}FAIL${reset}  STATE.md is ${sizeKb} KB, over the ${thresholdKb} KB threshold.`,
  );
  console.error(`\nTo fix:`);
  console.error(
    `  1. Identify the oldest "## 🏁 SESSION CLOSE" or "## ✅ PHASE ... SHIPPED" blocks in STATE.md.`,
  );
  console.error(
    `  2. Move them to docs/state-archive-<YYYY-MM>.md (create the file if it does not exist).`,
  );
  console.error(`  3. Add a cross-link near the head of STATE.md pointing to the archive.`);
  console.error(`  4. Re-run this script; STATE.md should now be under ${thresholdKb} KB.\n`);
  console.error(
    `Reference: PR #139 (2026-05-02) did this archive op when STATE.md hit 269 KB and broke the Read tool's 256 KB limit.`,
  );
  process.exit(1);
}

if (size > WARN_BYTES) {
  console.log(
    `${yellow}WARN${reset}  STATE.md is ${sizeKb} KB, over the soft warning threshold (${warnKb} KB).`,
  );
  console.log(
    `Plan a STATE.md archive pass soon. Hard threshold is ${thresholdKb} KB.\n`,
  );
}

console.log(
  `${green}PASS${reset}  STATE.md is ${sizeKb} KB (under ${thresholdKb} KB threshold).`,
);
console.log(`\n${bold}1/1 cases pass${reset}`);
