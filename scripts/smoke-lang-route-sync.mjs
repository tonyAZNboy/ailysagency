#!/usr/bin/env node
/**
 * Phase E.20 smoke: LangContext route-aware re-detection.
 *
 * Verifies the LangRouteSync component is shape-correct + mounted
 * inside BrowserRouter + has the idempotency guard so it does not
 * loop with the lang switcher.
 *
 * Wired into .github/workflows/deploy.yml as Gate 17.
 */
import { readFileSync } from "node:fs";

const FAIL = (msg) => {
  console.error(`FAIL: ${msg}`);
  process.exitCode = 1;
};
const PASS = (msg) => console.log(`PASS: ${msg}`);

const lrs = readFileSync("src/i18n/LangRouteSync.tsx", "utf8");
const app = readFileSync("src/App.tsx", "utf8");

// 1. LangRouteSync.tsx exists (the readFileSync above would have thrown).
PASS("src/i18n/LangRouteSync.tsx exists");

// 2. Uses useLocation from react-router-dom.
if (lrs.includes("useLocation") && lrs.includes("react-router-dom")) {
  PASS("LangRouteSync uses useLocation from react-router-dom");
} else {
  FAIL("LangRouteSync missing useLocation/react-router-dom import");
}

// 3. Uses useLang and SUPPORTED_LANGS allow-list.
if (lrs.includes("useLang") && lrs.includes("SUPPORTED_LANGS")) {
  PASS("LangRouteSync uses useLang + SUPPORTED_LANGS allow-list");
} else {
  FAIL("LangRouteSync missing useLang or SUPPORTED_LANGS");
}

// 4. Idempotency guard: must NOT call setLang when prefix already
// matches current lang. Look for the comparison.
if (
  /segment\s*===\s*lang/.test(lrs) ||
  /lang\s*===\s*segment/.test(lrs)
) {
  PASS("LangRouteSync has idempotency equality guard");
} else {
  FAIL("LangRouteSync missing 'segment === lang' guard, may infinite-loop");
}

// 5. Mounted inside BrowserRouter as the first child of the Router.
const m = app.match(/<BrowserRouter>\s*<LangRouteSync\s*\/?>/);
if (m) {
  PASS("App.tsx mounts <LangRouteSync /> as first child inside <BrowserRouter>");
} else {
  FAIL("App.tsx does not mount <LangRouteSync /> inside <BrowserRouter>");
}

if (process.exitCode && process.exitCode !== 0) {
  console.error("\nSmoke FAILED.");
  process.exit(process.exitCode);
}
console.log("\nAll Phase E.20 LangRouteSync smoke cases pass.");
