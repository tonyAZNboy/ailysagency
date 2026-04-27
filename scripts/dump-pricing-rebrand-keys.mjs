// Extract the 33 newly added EN keys for the pricing rebrand
// (PricingBuilderSection languages + 4 add-ons + bundle, plus Services
// addOn badges) so Opus 4.7 can translate them to 15 locales.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANS_DIR = path.resolve(__dirname, "../src/i18n/translations");
const TMP = path.resolve(__dirname, "../node_modules/.cache/i18n-rebrand-extract");
await mkdir(TMP, { recursive: true });

async function load(file) {
  const code = await readFile(path.join(TRANS_DIR, file), "utf8");
  const stripped = code
    .replace(/export const (\w+) =/g, "export const $1 =")
    .replace(/export type \w+\s*=[^;]+;/g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/as const/g, "")
    .replace(/:\s*[A-Z][\w<>[\]| ]+(\[\])?\s*=/g, " =");
  const tmp = path.join(TMP, file.replace(".ts", ".mjs"));
  await writeFile(tmp, stripped, "utf8");
  const url = `file://${tmp.replace(/\\/g, "/")}?t=${Date.now()}`;
  const mod = await import(url);
  const m = code.match(/export const (\w+)\s*=/);
  return mod[m[1]];
}

const en = await load("en.ts");

const KEYS = [
  // pricingBuilder languages and per-X suffixes
  "pricingBuilder.langIncluded",
  "pricingBuilder.langEs",
  "pricingBuilder.langZh",
  "pricingBuilder.langAr",
  "pricingBuilder.langRu",
  "pricingBuilder.langUk",
  "pricingBuilder.langSr",
  "pricingBuilder.perLangSuffix",
  "pricingBuilder.perMoSuffix",
  // pricingBuilder add-ons
  "pricingBuilder.addOnSectionLabel",
  "pricingBuilder.addOnLabel",
  "pricingBuilder.addOnDesc",
  "pricingBuilder.addOnPrice",
  "pricingBuilder.addOnIncludedNote",
  "pricingBuilder.addOnRowLabel",
  "pricingBuilder.addOnRowOn",
  "pricingBuilder.addOnRowOff",
  "pricingBuilder.premiumOpsTitle",
  "pricingBuilder.premiumOpsDesc",
  "pricingBuilder.premiumOpsRowLabel",
  "pricingBuilder.bundleAppliedLabel",
  "pricingBuilder.bundleSavingsHint",
  "pricingBuilder.domainShieldLabel",
  "pricingBuilder.domainShieldDesc",
  "pricingBuilder.domainSpeedBoostLabel",
  "pricingBuilder.domainSpeedBoostDesc",
  "pricingBuilder.dedicatedStrategistLabel",
  "pricingBuilder.dedicatedStrategistDesc",
  // services addOn badges
  "services.addOnEyebrow",
  "services.addOnTitle",
  "services.addOnBody",
  "services.addOnBadgeAvailable",
  "services.addOnBadgeIncluded",
];

function get(obj, dotPath) {
  return dotPath.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
}

const out = {};
for (const k of KEYS) {
  out[k] = get(en, k);
}
console.log(JSON.stringify(out, null, 2));
