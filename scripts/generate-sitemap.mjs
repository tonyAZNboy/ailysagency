#!/usr/bin/env node
// AiLys Agency · sitemap generator (multi-language with staged rollout)
//
// Outputs:
//   public/sitemap.xml             ← master sitemap index pointing to per-lang files
//   public/sitemap-en.xml          ← English (submit to GSC first)
//   public/sitemap-fr.xml          ← French Canada (submit to GSC second)
//   public/sitemap-{lang}.xml      ← one per supported language
//
// Submit to Google Search Console one at a time:
//   1. Verify ailysagency.ca ownership
//   2. Submit sitemap-en.xml first, wait 2-4 weeks for indexing
//   3. Submit sitemap-fr.xml second, wait
//   4. Add additional languages one per week as translations land
//
// Run: node scripts/generate-sitemap.mjs

import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, "..");
const BASE = "https://www.ailysagency.ca";
const TODAY = new Date().toISOString().slice(0, 10);

// Indexing priority order. EN ships first to GSC, FR second, then weekly cadence.
const LANGS = [
  { code: "en", hreflang: "en-CA", isDefault: true, indexPriority: 1 },
  { code: "fr", hreflang: "fr-CA", indexPriority: 2 },
  { code: "es", hreflang: "es", indexPriority: 3 },
  { code: "zh", hreflang: "zh", indexPriority: 4 },
  { code: "ar", hreflang: "ar", indexPriority: 5 },
  { code: "ru", hreflang: "ru", indexPriority: 6 },
  { code: "de", hreflang: "de", indexPriority: 7 },
  { code: "it", hreflang: "it", indexPriority: 8 },
  { code: "pt", hreflang: "pt", indexPriority: 9 },
  { code: "ja", hreflang: "ja", indexPriority: 10 },
  { code: "ko", hreflang: "ko", indexPriority: 11 },
  { code: "hi", hreflang: "hi", indexPriority: 12 },
  { code: "nl", hreflang: "nl", indexPriority: 13 },
  { code: "pl", hreflang: "pl", indexPriority: 14 },
  { code: "tr", hreflang: "tr", indexPriority: 15 },
  { code: "vi", hreflang: "vi", indexPriority: 16 },
];

const MAIN_ROUTES = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/audit", priority: 0.95, changefreq: "weekly" },
  { path: "/audit/gbp", priority: 0.95, changefreq: "weekly" },
  { path: "/audit/ai-visibility", priority: 0.9, changefreq: "weekly" },
  { path: "/audit/nap", priority: 0.9, changefreq: "weekly" },
  { path: "/conformite-quebec", priority: 0.85, changefreq: "monthly" },
  { path: "/pouls-local", priority: 0.85, changefreq: "weekly" },
  { path: "/concours-pme", priority: 0.85, changefreq: "monthly" },
  { path: "/garantie", priority: 0.85, changefreq: "monthly" },
  { path: "/trousse-nfc", priority: 0.8, changefreq: "monthly" },
  { path: "/reception-ia", priority: 0.85, changefreq: "monthly" },
  { path: "/whatsapp-business", priority: 0.85, changefreq: "monthly" },
  { path: "/pricing-details", priority: 0.92, changefreq: "weekly" },
  { path: "/book-call", priority: 0.85, changefreq: "monthly" },
  { path: "/blog", priority: 0.85, changefreq: "daily" },
  { path: "/help", priority: 0.7, changefreq: "monthly" },
  // Industries (commercial-intent traffic capture)
  { path: "/industries", priority: 0.9, changefreq: "weekly" },
  { path: "/industries/dentists", priority: 0.85, changefreq: "weekly" },
  { path: "/industries/lawyers", priority: 0.85, changefreq: "weekly" },
  { path: "/industries/restaurants", priority: 0.85, changefreq: "weekly" },
  { path: "/industries/contractors", priority: 0.8, changefreq: "weekly" },
  { path: "/industries/clinics", priority: 0.8, changefreq: "weekly" },
  { path: "/industries/real-estate", priority: 0.8, changefreq: "weekly" },
  { path: "/industries/hotels", priority: 0.8, changefreq: "weekly" },
  { path: "/industries/nail-salons", priority: 0.8, changefreq: "weekly" },
  { path: "/industries/sushi-counters", priority: 0.8, changefreq: "weekly" },
  // Comparisons (bottom-funnel competitor traffic)
  { path: "/vs/sterling-sky", priority: 0.85, changefreq: "monthly" },
  { path: "/vs/brightlocal", priority: 0.85, changefreq: "monthly" },
  { path: "/vs/localiq", priority: 0.85, changefreq: "monthly" },
  // Glossary (semantic SEO + internal-link authority)
  { path: "/glossary", priority: 0.75, changefreq: "monthly" },
  { path: "/glossary/aeo", priority: 0.7, changefreq: "monthly" },
  { path: "/glossary/geo", priority: 0.7, changefreq: "monthly" },
  { path: "/glossary/e-e-a-t", priority: 0.7, changefreq: "monthly" },
  { path: "/glossary/schema-markup", priority: 0.65, changefreq: "monthly" },
  { path: "/glossary/faq-schema", priority: 0.65, changefreq: "monthly" },
  { path: "/glossary/nap", priority: 0.65, changefreq: "monthly" },
  { path: "/glossary/gbp", priority: 0.65, changefreq: "monthly" },
  { path: "/glossary/citation-building", priority: 0.65, changefreq: "monthly" },
  { path: "/glossary/wikidata", priority: 0.65, changefreq: "monthly" },
  { path: "/glossary/llm-citation-tracking", priority: 0.7, changefreq: "monthly" },
  { path: "/glossary/review-velocity", priority: 0.65, changefreq: "monthly" },
  { path: "/glossary/high-da", priority: 0.6, changefreq: "monthly" },
  { path: "/glossary/local-pack", priority: 0.65, changefreq: "monthly" },
  { path: "/glossary/entity-authority", priority: 0.65, changefreq: "monthly" },
  { path: "/glossary/credentialed-authorship", priority: 0.6, changefreq: "monthly" },
  { path: "/glossary/local-business-schema", priority: 0.65, changefreq: "monthly" },
  { path: "/glossary/wikipedia", priority: 0.6, changefreq: "monthly" },
  { path: "/glossary/reviuzy", priority: 0.6, changefreq: "monthly" },
  { path: "/glossary/nfc-tap-to-review", priority: 0.6, changefreq: "monthly" },
  { path: "/glossary/local-seo", priority: 0.65, changefreq: "monthly" },
  // Free tools (lead magnets, backlink magnets)
  { path: "/tools/ai-visibility-score", priority: 0.85, changefreq: "monthly" },
  // Bonus A: AiLys Verified Badge (public marketing surface)
  { path: "/badge", priority: 0.85, changefreq: "monthly" },
  // Feature 5: AI Concierge demo (public preview)
  { path: "/concierge-demo", priority: 0.85, changefreq: "monthly" },
  // F3.0: Partner Program waitlist (demand-validation MVP)
  { path: "/agencies/partner-program", priority: 0.85, changefreq: "monthly" },
  // Bonus B: Quarterly Industry Reports (lead magnets, high backlink potential)
  { path: "/industry-reports", priority: 0.9, changefreq: "weekly" },
  { path: "/industry-reports/dentists-quebec-q1-2026", priority: 0.85, changefreq: "monthly" },
  { path: "/industry-reports/clinics-quebec-q1-2026", priority: 0.85, changefreq: "monthly" },
  { path: "/industry-reports/contractors-quebec-q1-2026", priority: 0.85, changefreq: "monthly" },
  { path: "/industry-reports/restaurants-quebec-q1-2026", priority: 0.85, changefreq: "monthly" },
  { path: "/industry-reports/lawyers-quebec-q1-2026", priority: 0.85, changefreq: "monthly" },
  // Legal
  { path: "/privacy", priority: 0.3, changefreq: "yearly" },
  { path: "/terms", priority: 0.3, changefreq: "yearly" },
  { path: "/cookies", priority: 0.3, changefreq: "yearly" },
];

function buildLangUrl(lang, path) {
  if (lang === "en") return `${BASE}${path}`;
  if (path === "/") return `${BASE}/${lang}`;
  return `${BASE}/${lang}${path}`;
}

function buildHreflangBlock(path) {
  return (
    LANGS.map(
      (l) =>
        `    <xhtml:link rel="alternate" hreflang="${l.hreflang}" href="${buildLangUrl(l.code, path)}" />`,
    ).join("\n") +
    `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${buildLangUrl("en", path)}" />`
  );
}

function buildUrlEntry(lang, path, priority, changefreq, lastmod = TODAY) {
  const url = buildLangUrl(lang, path);
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${buildHreflangBlock(path)}
  </url>`;
}

function loadBlogSlugs() {
  // Primary source: the new modular blog registry at src/blog/registry.ts
  // Each post lives at src/blog/posts/<category>/<slug>.tsx and exposes a meta
  // export with publishedDate (used as sitemap lastmod for SEO freshness).
  try {
    const registrySrc = readFileSync(join(PROJECT_ROOT, "src/blog/registry.ts"), "utf-8");
    const importPaths = [...registrySrc.matchAll(/import\s+\{\s*meta\s+as\s+\w+\s*\}\s+from\s+'\.\/posts\/([^/]+)\/([^']+)'/g)];
    const entries = importPaths.map(([, category, slug]) => {
      const postPath = join(PROJECT_ROOT, "src/blog/posts", category, `${slug}.tsx`);
      let lastmod = TODAY;
      try {
        const postSrc = readFileSync(postPath, "utf-8");
        const updated = postSrc.match(/updatedDate:\s*['"]([^'"]+)['"]/)?.[1];
        const published = postSrc.match(/publishedDate:\s*['"]([^'"]+)['"]/)?.[1];
        lastmod = updated || published || TODAY;
      } catch { /* keep TODAY */ }
      return { slug, lastmod };
    });
    if (entries.length > 0) return entries;
  } catch { /* fall through to legacy */ }

  // Legacy fallback: src/data/blog-posts.ts (pre-modular blog system)
  try {
    const src = readFileSync(join(PROJECT_ROOT, "src/data/blog-posts.ts"), "utf-8");
    return [...src.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => ({
      slug: m[1],
      lastmod: TODAY,
    }));
  } catch {
    return [];
  }
}

function loadHelpSlugs() {
  try {
    const src = readFileSync(join(PROJECT_ROOT, "src/data/help-articles.ts"), "utf-8");
    const slugMatches = [...src.matchAll(/slug:\s*"([^"]+)"/g)];
    const dateMatches = [...src.matchAll(/updatedAt:\s*"([^"]+)"/g)];
    return slugMatches.map((m, i) => ({
      slug: m[1],
      lastmod: dateMatches[i]?.[1] ?? TODAY,
    }));
  } catch {
    return [];
  }
}

const blogPosts = loadBlogSlugs();
const helpArticles = loadHelpSlugs();

// ─── Generate per-language sitemap ─────────────────────────────
function generateLangSitemap(lang) {
  const mainEntries = MAIN_ROUTES.map((r) =>
    buildUrlEntry(lang.code, r.path, r.priority, r.changefreq),
  ).join("\n");

  const blogEntries = blogPosts
    .map(({ slug, lastmod }) =>
      buildUrlEntry(lang.code, `/blog/${slug}`, 0.7, "monthly", lastmod),
    )
    .join("\n");

  const helpEntries = helpArticles
    .map(({ slug, lastmod }) =>
      buildUrlEntry(lang.code, `/help/${slug}`, 0.6, "monthly", lastmod),
    )
    .join("\n");

  const totalUrls =
    MAIN_ROUTES.length + blogPosts.length + helpArticles.length;

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <!--
    AiLys Agency · Sitemap (${lang.hreflang})
    Generated: ${TODAY}
    URLs: ${totalUrls}
    Index priority: ${lang.indexPriority} of ${LANGS.length}
  -->

${mainEntries}
${blogEntries}
${helpEntries}
</urlset>
`;
}

// ─── Generate master sitemap index ─────────────────────────────
function generateMasterIndex() {
  const sitemaps = LANGS.map(
    (l) =>
      `  <sitemap>
    <loc>${BASE}/sitemap-${l.code}.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>`,
  ).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!--
    AiLys Agency · Master sitemap index
    Generated: ${TODAY}

    Submit per-language sitemaps to Google Search Console one at a time:
    1. EN  ← submit first, wait 2-4 weeks for full indexing
    2. FR  ← submit second
    3 to 16 ← weekly cadence as translations land
  -->

${sitemaps}
</sitemapindex>
`;
}

// ─── Write everything ──────────────────────────────────────────
let totalWritten = 0;
for (const lang of LANGS) {
  writeFileSync(
    join(PROJECT_ROOT, `public/sitemap-${lang.code}.xml`),
    generateLangSitemap(lang),
  );
  totalWritten++;
}
writeFileSync(join(PROJECT_ROOT, "public/sitemap.xml"), generateMasterIndex());

const totalUrls = LANGS.length * (MAIN_ROUTES.length + blogPosts.length + helpArticles.length);

console.log(`✓ Master index: public/sitemap.xml`);
console.log(`✓ ${totalWritten} per-language sitemaps written`);
console.log(`  ${totalUrls} total URLs (${MAIN_ROUTES.length + blogPosts.length + helpArticles.length} per language × ${LANGS.length} languages)`);
console.log(``);
console.log(`Next step: submit sitemap-en.xml to Google Search Console first.`);
console.log(`Then add sitemap-fr.xml about 2 weeks later, then weekly cadence after that.`);
