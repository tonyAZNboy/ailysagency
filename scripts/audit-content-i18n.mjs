// Audit blog post + help article i18n coverage for the 6 major languages.
// Reports any post/article that is missing a translation field.
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const MAJORS = ["fr", "es", "zh", "ru", "ar"]; // EN is canonical

async function audit(filePath, contentField) {
  const raw = await readFile(filePath, "utf8");

  // Find every entry slug
  const slugMatches = [...raw.matchAll(/^\s*slug:\s*"([^"]+)",/gm)];
  const slugs = slugMatches.map((m) => ({ slug: m[1], idx: m.index }));

  // For each slug, find its block by locating next slug or end
  const report = [];
  for (let i = 0; i < slugs.length; i++) {
    const start = slugs[i].idx;
    const end = i + 1 < slugs.length ? slugs[i + 1].idx : raw.length;
    const block = raw.slice(start, end);
    const r = { slug: slugs[i].slug, missing: [] };
    for (const lang of MAJORS) {
      const langRe = new RegExp(`^\\s*${lang}:\\s*\\{`, "m");
      if (!langRe.test(block)) {
        r.missing.push(`${lang}:absent`);
        continue;
      }
      // Has the lang block — check title, excerpt, content/body presence
      const langStart = block.search(langRe);
      // Find matching brace to bound the lang block
      let depth = 0;
      let langEnd = -1;
      const openIdx = block.indexOf("{", langStart);
      for (let j = openIdx; j < block.length; j++) {
        const ch = block[j];
        if (ch === "{") depth++;
        else if (ch === "}") {
          depth--;
          if (depth === 0) { langEnd = j; break; }
        }
      }
      const langBlock = block.slice(openIdx, langEnd + 1);
      if (!/title:/.test(langBlock)) r.missing.push(`${lang}:title`);
      if (!/excerpt:/.test(langBlock)) r.missing.push(`${lang}:excerpt`);
      const hasContent = new RegExp(`${contentField}:`).test(langBlock);
      if (!hasContent) r.missing.push(`${lang}:${contentField}`);
    }
    report.push(r);
  }
  return report;
}

console.log("\n=== Blog posts i18n coverage ===\n");
const blogReport = await audit(path.join(ROOT, "src/data/blog-posts.ts"), "content");
for (const r of blogReport) {
  if (r.missing.length === 0) console.log(`OK    ${r.slug}`);
  else console.log(`GAP   ${r.slug}  →  ${r.missing.join(", ")}`);
}

console.log("\n=== Help articles i18n coverage ===\n");
const helpReport = await audit(path.join(ROOT, "src/data/help-articles.ts"), "body");
for (const r of helpReport) {
  if (r.missing.length === 0) console.log(`OK    ${r.slug}`);
  else console.log(`GAP   ${r.slug}  →  ${r.missing.join(", ")}`);
}

console.log("\n=== Summary ===\n");
const blogGaps = blogReport.filter((r) => r.missing.length > 0).length;
const helpGaps = helpReport.filter((r) => r.missing.length > 0).length;
console.log(`Blog posts: ${blogReport.length - blogGaps}/${blogReport.length} fully translated`);
console.log(`Help articles: ${helpReport.length - helpGaps}/${helpReport.length} fully translated`);
