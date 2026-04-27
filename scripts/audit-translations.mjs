// Audit i18n coverage across all locale files.
// Compares each locale to en.ts and reports missing keys + total coverage.
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANS_DIR = path.resolve(__dirname, "../src/i18n/translations");

// Critical keys actually used on the AiLys public site (must be translated)
const CRITICAL_KEYS = [
  "nav.features", "nav.howItWorks", "nav.audit", "nav.blog",
  "nav.pricing", "nav.faq", "nav.login", "nav.startTrial",
  "hero.eyebrow", "hero.eyebrowPills", "hero.headline1", "hero.headline2",
  "hero.subheadline", "hero.subheadlineSupport",
  "hero.flowCard1Label", "hero.flowCard1Stat",
  "hero.flowCard2Label", "hero.flowCard2Stat",
  "hero.flowCard3Label", "hero.flowCard3Stat",
  "hero.cta1", "hero.cta2", "hero.ctaCompliance",
  "hero.tickerGoal", "hero.tickerStatus",
  "hero.trustLabel", "hero.trustEngines",
  "hero.industriesLabel", "hero.compliance", "hero.srOnly",
  "blog.pageHeading", "blog.pageSubheadline",
  "blog.allPosts", "blog.searchPlaceholder",
  "blog.minRead", "blog.viewAll",
  "blog.backToBlog", "blog.relatedArticles",
];

const MAJOR_LANGS = ["en", "fr", "es", "zh", "ar", "ru"];

function flatten(obj, prefix = "") {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) {
      Object.assign(out, flatten(v, key));
    } else {
      out[key] = v;
    }
  }
  return out;
}

async function loadLocale(code) {
  // Use dynamic import for the compiled-on-the-fly module via tsx is overkill.
  // Instead read the raw file and eval the export object using a regex strip.
  const raw = await readFile(path.join(TRANS_DIR, `${code}.ts`), "utf8");
  // Strip "export const xx = " and trailing "as const" / "; export type..."
  const m = raw.match(/export const \w+\s*=\s*(\{[\s\S]*?\})\s*;[\s\S]*$/);
  if (!m) throw new Error(`Could not parse ${code}.ts`);
  const body = m[1];
  // The TS object uses unquoted keys + template literals etc. For audit purposes
  // we just need to know which keys exist, so use a simple key-matching pass.
  return body;
}

function hasKey(body, key) {
  // key is dot-path. Check that each segment appears in nested order.
  const segments = key.split(".");
  // Look for "segments[0]: {" then within that block "segments[1]: " etc.
  let cursor = body;
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    // Match `seg:` or `"seg":`
    const re = new RegExp(`(?:^|[\\s,{])(?:"?)${seg}(?:"?)\\s*:`, "m");
    const match = re.exec(cursor);
    if (!match) return false;
    if (i === segments.length - 1) return true;
    // Find the opening brace for this object value
    const afterColon = cursor.slice(match.index + match[0].length);
    const braceIdx = afterColon.indexOf("{");
    if (braceIdx < 0) return false;
    // Find matching closing brace
    let depth = 0;
    let end = -1;
    for (let j = braceIdx; j < afterColon.length; j++) {
      const ch = afterColon[j];
      if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) { end = j; break; }
      }
    }
    if (end < 0) return false;
    cursor = afterColon.slice(braceIdx + 1, end);
  }
  return true;
}

const codes = ["en", "fr", "es", "zh", "ar", "ru", "de", "hi", "it", "ja", "ko", "nl", "pl", "pt", "tr", "vi"];
const bodies = {};
for (const c of codes) bodies[c] = await loadLocale(c);

console.log("\n=== AiLys i18n Audit ===\n");
console.log("Critical keys for public-facing UI:", CRITICAL_KEYS.length);
console.log("\nMajor language coverage:\n");

for (const code of MAJOR_LANGS) {
  const missing = CRITICAL_KEYS.filter((k) => !hasKey(bodies[code], k));
  const pct = Math.round(((CRITICAL_KEYS.length - missing.length) / CRITICAL_KEYS.length) * 100);
  console.log(`${code.padEnd(4)} ${pct}%  (${CRITICAL_KEYS.length - missing.length}/${CRITICAL_KEYS.length})`);
  if (missing.length > 0) {
    console.log(`     missing: ${missing.join(", ")}`);
  }
}

console.log("\nSecondary languages (informational):\n");
for (const code of codes) {
  if (MAJOR_LANGS.includes(code)) continue;
  const missing = CRITICAL_KEYS.filter((k) => !hasKey(bodies[code], k));
  const pct = Math.round(((CRITICAL_KEYS.length - missing.length) / CRITICAL_KEYS.length) * 100);
  console.log(`${code.padEnd(4)} ${pct}%  (${CRITICAL_KEYS.length - missing.length}/${CRITICAL_KEYS.length})`);
}
