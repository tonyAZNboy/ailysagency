// One-shot script to inject 12 missing srSeo keys into 10 secondary locales.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANS_DIR = path.resolve(__dirname, "../src/i18n/translations");

const SECTIONS = [
  "heroAuditCard",
  "services",
  "pricingDrivers",
  "pricingBuilder",
  "methodology",
  "process",
  "bookCall",
  "whyAilys",
  "auditCta",
  "about",
  "faqLanding",
  "footerExt",
];

const LOCALES = ["de", "hi", "it", "ja", "ko", "nl", "pl", "pt", "tr", "vi"];

// Load EN
const enRaw = await readFile(path.join(TRANS_DIR, "en.ts"), "utf8");
const stripped = enRaw
  .replace(/export const (\w+) =/g, "export const $1 =")
  .replace(/export type \w+\s*=[^;]+;/g, "")
  .replace(/^\s*\/\/.*$/gm, "")
  .replace(/as const/g, "");
const tmp = path.join(TRANS_DIR, "../../node_modules/.cache/srseo-en.mjs");
await mkdir(path.dirname(tmp), { recursive: true });
await writeFile(tmp, stripped, "utf8");
const mod = await import(`file://${tmp.replace(/\\/g, "/")}?t=${Date.now()}`);
const en = mod.en;

const srSeoValues = {};
for (const sec of SECTIONS) {
  if (!en[sec] || typeof en[sec].srSeo !== "string") {
    console.error(`Missing en.${sec}.srSeo`);
    process.exit(1);
  }
  srSeoValues[sec] = en[sec].srSeo;
}

function jsEscape(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

// Top-level section closes are lines that match exactly "  },"
// They follow a section opening line "  <name>: {".
// Strategy: for each locale, build an ordered list of section open lines and use the
// last "  }," line that appears before the next section's open (or before the file's
// final "};") as the close for the current section.
const TOP_SECTION_OPEN_RE = /^  (\w+):\s*\{\s*$/;
const TOP_CLOSE_RE = /^  \},?\s*$/;

for (const code of LOCALES) {
  const file = path.join(TRANS_DIR, `${code}.ts`);
  let content = await readFile(file, "utf8");
  let lines = content.split("\n");

  // find all top-level opens
  const opens = []; // {name, line}
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(TOP_SECTION_OPEN_RE);
    if (m) opens.push({ name: m[1], line: i });
  }

  // For each section we need to insert into, find its close = last TOP_CLOSE_RE line before next open (or end of file).
  // We do insertions from bottom to top so line indices stay valid.
  const targets = SECTIONS.filter((s) => opens.find((o) => o.name === s));
  const sectionRanges = []; // {name, open, close}
  for (const sec of targets) {
    const idx = opens.findIndex((o) => o.name === sec);
    const open = opens[idx].line;
    const nextOpenLine = idx + 1 < opens.length ? opens[idx + 1].line : lines.length;
    // find last TOP_CLOSE_RE between (open, nextOpenLine)
    let close = -1;
    for (let i = nextOpenLine - 1; i > open; i--) {
      if (TOP_CLOSE_RE.test(lines[i])) {
        close = i;
        break;
      }
    }
    if (close === -1) {
      console.error(`[${code}] cannot find close for ${sec}`);
      continue;
    }
    sectionRanges.push({ name: sec, open, close });
  }

  // Check if srSeo already in section
  function hasSrSeo(open, close) {
    for (let i = open; i <= close; i++) {
      if (/^\s+srSeo:\s*"/.test(lines[i])) return true;
    }
    return false;
  }

  // Sort by close descending so insertion preserves indices
  sectionRanges.sort((a, b) => b.close - a.close);

  for (const r of sectionRanges) {
    if (hasSrSeo(r.open, r.close)) {
      console.log(`[${code}] ${r.name}.srSeo already present, skipping`);
      continue;
    }
    const escaped = jsEscape(srSeoValues[r.name]);
    const newLine = `    srSeo: "${escaped}",`;
    // insert with blank line above for readability
    const before = lines[r.close - 1];
    if (before && before.trim() !== "") {
      lines.splice(r.close, 0, "", newLine);
    } else {
      lines.splice(r.close, 0, newLine);
    }
  }

  await writeFile(file, lines.join("\n"), "utf8");
  console.log(`[${code}] written`);
}

console.log("Done.");
