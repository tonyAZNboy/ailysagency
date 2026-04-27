// Dump EN values for priority UI keys (excluding srSeo, skip-list items, and long bodies).
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANS_DIR = path.resolve(__dirname, "../src/i18n/translations");
const TMP = path.resolve(__dirname, "../node_modules/.cache/i18n-prio");
await mkdir(TMP, { recursive: true });

async function load(file) {
  const code = await readFile(path.join(TRANS_DIR, file), "utf8");
  const stripped = code
    .replace(/export const (\w+) =/g, "export const $1 =")
    .replace(/export type \w+\s*=[^;]+;/g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/as const/g, "");
  const tmp = path.join(TMP, file.replace(".ts", ".mjs"));
  await writeFile(tmp, stripped, "utf8");
  const mod = await import(`file://${tmp.replace(/\\/g, "/")}?t=${Date.now()}`);
  const m = code.match(/export const (\w+)\s*=/);
  return mod[m[1]];
}
function getVal(obj, dotPath) {
  return dotPath.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
}

const en = await load("en.ts");
const report = JSON.parse(await readFile(path.resolve(__dirname, "../docs/i18n-audit-report.json"), "utf8"));

// Filter to UI surface only (skip srSeo, skip audit.pulse.signals.*, skip long bodies)
const SKIP_PATTERNS = [
  /\.srSeo$/,
  /\.srOnly$/,
  /^audit\.pulse\.signals\./,
  /^methodology\.step\d+(Detail|Signal)$/,
  /^process\.phase\d+Body$/,
  /^services\.tier\d+Feat[4-9]$/,    // keep Feat1-3 only
  /^services\.tier\d+Feat10$/,
  /^whyAilys\.row\d+(Examples|Weakness|Ailys|Price)$/, // skip long
  /^services\.compareRow\d+(Right|Left)$/,            // many are EN-only/code refs
  /^services\.why300Body$/,                            // long
  /^bookCall\.languagesNote$/,                         // long
  /^bookCall\.placeholderName$/,                       // proper noun
  /^bookCall\.placeholderBusiness$/,
  /^services\.compareAilys$/,
  /^services\.tier3Name$/,                             // brand-tier
  /^pricingBuilder\.tierAutopilot$/,
  /^pricingBuilder\.lang(2|3|4)$/,                     // codes
  /^pricingBuilder\.svc3Desc$/,                        // schema names
  /^methodology\.layerAeoGeo$/,                        // acronym
  /^methodology\.step\d+Signal$/,                      // brand lists
  /^audit\.fields\.industryOptions\.lawyer$/,          // sometimes language-specific, but spec calls these out — translate
  /^hero\.trustEngines$/,                              // brand list
  /^audit\.unlockPlaceholder$/,                        // your@email.com
  /^audit\.fields\.emailPlaceholder$/,                 // generic placeholder
  /^heroAuditCard\.placeholderEmail$/,
  /^bookCall\.placeholderEmail$/,
  /^who\./,
  /^testimonials\./,
  /^footer\./,                                         // legacy review-app footer
  /^pain\./, /^how\./, /^features\./, /^guardrails\./,
  /^category\./, /^ranking\./, /^trust\./,
  /^cta\./, /^pricing\./, /^faq\./,
  /^about\.signatureBrand$/,
  /^footerExt\.locationLine$/,
  /^whyAilys\.row\d+Examples$/,
  /^services\.compareRow2Right$/,
];

function shouldSkip(k) {
  return SKIP_PATTERNS.some((re) => re.test(k));
}

const code = "de"; // any locale, we just want the key list
const list = report.locales[code].enValueCopy.filter((k) => !shouldSkip(k));

const out = {};
for (const k of list) {
  out[k] = getVal(en, k);
}
console.log(JSON.stringify(out, null, 2));
console.error("count:", list.length);
