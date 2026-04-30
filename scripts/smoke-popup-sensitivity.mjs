#!/usr/bin/env node
/**
 * Phase E.21 smoke: popup sensitivity tuning constants.
 *
 * Locks in the post-tuning thresholds so a future PR cannot regress
 * them silently below the operator-validated values.
 *
 * Wired into .github/workflows/deploy.yml as Gate 18.
 */
import { readFileSync } from "node:fs";

const FAIL = (m) => { console.error(`FAIL: ${m}`); process.exitCode = 1; };
const PASS = (m) => console.log(`PASS: ${m}`);

const exit = readFileSync("src/components/landing/ExitIntentModal.tsx", "utf8");
const chat = readFileSync("src/components/landing/LandingChatWidget.tsx", "utf8");
const cookie = readFileSync("src/components/CookieConsentBanner.tsx", "utf8");

// ── ExitIntentModal ────────────────────────────────────────────────
if (/MIN_DELAY_MS\s*=\s*60_000/.test(exit)) PASS("ExitIntent MIN_DELAY_MS = 60_000 (60s, was 8000)");
else FAIL("ExitIntent MIN_DELAY_MS regressed below 60_000");

if (/SUPPRESS_HOURS\s*=\s*24\s*\*\s*7/.test(exit)) PASS("ExitIntent SUPPRESS_HOURS = 24*7 (7 days, was 24)");
else FAIL("ExitIntent SUPPRESS_HOURS regressed below 168");

if (/MIN_SCROLL_DEPTH\s*=\s*0\.25/.test(exit)) PASS("ExitIntent MIN_SCROLL_DEPTH = 0.25 engagement gate");
else FAIL("ExitIntent missing or weakened MIN_SCROLL_DEPTH gate");

if (/MIN_EXIT_VELOCITY_PX_PER_SEC\s*=\s*200/.test(exit)) PASS("ExitIntent MIN_EXIT_VELOCITY_PX_PER_SEC = 200 fast-upward gesture gate");
else FAIL("ExitIntent missing or weakened velocity gate");

// Mobile scroll-up trigger must be removed (false-positive engine).
if (!/scrollUpAccumulator/.test(exit)) PASS("ExitIntent mobile scroll-up trigger REMOVED");
else FAIL("ExitIntent mobile scrollUpAccumulator still present, was supposed to be removed in E.21");

// Suppressed routes expanded to cover funnel pages.
const expectedRoutes = ["/audit", "/book-call", "/contact", "/contacte", "/pricing-details", "/forfaits-complets", "/founding-clients"];
const allRoutesPresent = expectedRoutes.every((r) => exit.includes(`"${r}"`));
if (allRoutesPresent) PASS(`ExitIntent SUPPRESSED_ROUTES covers all ${expectedRoutes.length} expected funnel paths`);
else FAIL(`ExitIntent SUPPRESSED_ROUTES missing one of: ${expectedRoutes.join(", ")}`);

// ── LandingChatWidget ──────────────────────────────────────────────
if (/setTimeout\(\s*\(\)\s*=>\s*setIsVisible\(true\)\s*,\s*120_000\s*\)/.test(chat)) PASS("ChatWidget delay = 120s (was 45s)");
else FAIL("ChatWidget delay regressed below 120s");

if (/ailys_chat_widget_dismissed_at/.test(chat)) PASS("ChatWidget persists dismissedAt to localStorage");
else FAIL("ChatWidget missing localStorage dismissedAt cooldown");

// ── CookieConsentBanner ────────────────────────────────────────────
if (/setTimeout\(\s*\(\)\s*=>\s*setVisible\(true\)\s*,\s*2500\s*\)/.test(cookie)) PASS("Cookie banner delay = 2500ms (was 1200ms)");
else FAIL("Cookie banner delay regressed below 2500ms");

if (process.exitCode && process.exitCode !== 0) {
  console.error("\nSmoke FAILED.");
  process.exit(process.exitCode);
}
console.log("\nAll Phase E.21 popup sensitivity smoke cases pass.");
