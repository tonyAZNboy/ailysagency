#!/usr/bin/env node
/**
 * Smoke test: structured-data emission across critical pages.
 *
 * Curls live URLs (or local dev server with --base flag) and asserts that
 * each page emits the expected JSON-LD types. Catches regressions like
 * the react-helmet-async v2 inline-script-stripping bug that PR #88 + #91
 * fixed: SEOHead and HelpArticle were silently shipping without structured
 * data, which would have continued unnoticed without an end-to-end check.
 *
 * Usage:
 *   npx tsx scripts/smoke-jsonld.mjs            # against production
 *   npx tsx scripts/smoke-jsonld.mjs --base=http://localhost:8080  # local
 *
 * Note: this checks the static HTML response (what crawlers see). For pages
 * that inject JSON-LD via useEffect after hydration (SEOHead.tsx pattern),
 * the static HTML will only contain the index.html static graph + any
 * server-rendered ones. To check post-hydration JSON-LD, run from a real
 * browser via mcp__Claude_Preview tools, NOT this curl-based smoke.
 *
 * What this CAN catch:
 * - Pages returning non-200
 * - The static index.html JSON-LD graph regressing
 * - Missing canonical URL
 * - Missing OG meta tags
 * - Pricing drift in static schema
 *
 * Exits 0 on success, 1 on any failure.
 */

const args = process.argv.slice(2);
const baseFlag = args.find((a) => a.startsWith("--base="));
const BASE = baseFlag ? baseFlag.split("=")[1] : "https://www.ailysagency.ca";

const reset = "\x1b[0m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const bold = "\x1b[1m";

const cases = [];
function record(name, ok, hint = "") {
  cases.push({ name, ok, hint });
}

const PAGES = [
  { path: "/", expectStaticTypes: ["WebSite", "BreadcrumbList", "ProfessionalService", "Service"] },
  { path: "/badge", expectStaticTypes: ["WebSite"] },
  { path: "/concierge-demo", expectStaticTypes: ["WebSite"] },
  { path: "/industry-reports", expectStaticTypes: ["WebSite"] },
  { path: "/industry-reports/dentists-quebec-q1-2026", expectStaticTypes: ["WebSite"] },
  { path: "/help/wikidata-q-number-explained", expectStaticTypes: ["WebSite"] },
  { path: "/help/ailys-concierge-overview", expectStaticTypes: ["WebSite"] },
  { path: "/help/tech-health-pack-explained", expectStaticTypes: ["WebSite"] },
  { path: "/audit", expectStaticTypes: ["WebSite"] },
  { path: "/forfaits-complets", expectStaticTypes: ["WebSite"] },
];

async function check(page) {
  const url = `${BASE}${page.path}`;
  let resp;
  try {
    resp = await fetch(url, { redirect: "follow" });
  } catch (err) {
    record(`GET ${page.path}`, false, `network error: ${err.message}`);
    return;
  }
  record(`GET ${page.path}: 200`, resp.status === 200, `status=${resp.status}`);
  if (resp.status !== 200) return;

  const html = await resp.text();

  // Extract JSON-LD scripts
  const matches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  const types = new Set();
  let parseErrors = 0;
  for (const [, body] of matches) {
    try {
      const json = JSON.parse(body);
      const collect = (node) => {
        if (Array.isArray(node)) {
          node.forEach(collect);
          return;
        }
        if (!node || typeof node !== "object") return;
        if (node["@type"]) {
          if (Array.isArray(node["@type"])) {
            node["@type"].forEach((t) => types.add(t));
          } else {
            types.add(node["@type"]);
          }
        }
        if (Array.isArray(node["@graph"])) {
          node["@graph"].forEach(collect);
        }
      };
      collect(json);
    } catch {
      parseErrors++;
    }
  }
  record(`${page.path}: JSON-LD parses cleanly`, parseErrors === 0, `${parseErrors} parse error(s)`);

  for (const expected of page.expectStaticTypes) {
    record(`${page.path}: has ${expected} schema`, types.has(expected), `types found: ${[...types].join(", ")}`);
  }

  // Extract canonical
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)?.[1];
  record(`${page.path}: has canonical`, !!canonical, "canonical link missing");

  // Extract og:title
  const ogTitle = html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/)?.[1];
  record(`${page.path}: has og:title`, !!ogTitle, "og:title missing");

  // For pages that should NOT have stale Autopilot pricing
  const hasStaleAutopilot = /Autopilot[^a-z]/i.test(html.replace(/data-page-jsonld[^>]+>/g, ""));
  record(`${page.path}: no stale Autopilot mention`, !hasStaleAutopilot, "stale Autopilot tier reference found");

  const has1299 = /\$1,299|\$1299/.test(html);
  record(`${page.path}: no stale $1,299 pricing`, !has1299, "stale $1,299 pricing found");
}

(async () => {
  console.log(`${bold}\nJSON-LD smoke test against ${BASE}\n${reset}`);
  for (const page of PAGES) {
    await check(page);
  }

  const passed = cases.filter((c) => c.ok).length;
  const total = cases.length;
  const failed = total - passed;

  for (const c of cases) {
    const mark = c.ok ? `${green}PASS${reset}` : `${red}FAIL${reset}`;
    console.log(`${mark}  ${c.name}${c.ok ? "" : `\n      ${yellow}${c.hint}${reset}`}`);
  }

  console.log(`\n${bold}${passed}/${total} cases pass${reset}`);
  if (failed > 0) {
    console.log(`${red}${failed} failing case(s)${reset}\n`);
    process.exit(1);
  }
  console.log(`${green}All ${total} cases pass.${reset}\n`);
})();
