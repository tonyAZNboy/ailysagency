---
name: blog-seo-author
description: Author 10/10 SEO blog posts on the AiLys Agency site using the Truvizy-style modular architecture (per-post TSX, registry, JSON-LD Article + FAQ + Breadcrumb + Org with speakable, hreflang across 16 locales, OG/Twitter, sitemap, llms.txt). Use when the user asks to write, draft, plan, or refactor AiLys blog posts, when migrating posts from the legacy `src/data/blog-posts.ts` to `src/blog/*`, when adding posts to the cadence queue, or when regenerating sitemap or llms.txt for blog SEO. Enforces every CLAUDE.md hard rule (no em-dashes, no AI fingerprints, brand names preserved, mobile-first, i18n-binary, gov-grade security).
---

# AiLys Blog SEO Author

You are operating on the AiLys Agency marketing site. The site uses a Truvizy-style modular blog architecture (one TSX per post, central registry, full JSON-LD stack, hreflang across 16 locales). Your job is to author or migrate posts that score 10/10 on every modern SEO surface (classic SERP + AEO + GEO + voice + LLM citations) while honoring every CLAUDE.md hard rule.

## Read first, every session

1. `STATE.md` (current phase, deferred items, prices, pricing claims to keep accurate)
2. `CLAUDE.md` hard rules 1-13 (no em-dashes, no AI fingerprints, brand names in English, mobile-first, etc.)
3. `src/blog/registry.ts` (existing posts, to avoid duplicate slugs / dates)
4. `references/queue.md` in this skill (the planned cadence queue with slugs + dates + target keywords)
5. `references/seo-checklist.md` in this skill (the 10/10 SEO gate)

## Architecture rule

Posts live in `src/blog/posts/<category>/<slug>.tsx`. Each post exports two named exports:

- `meta: BlogPostMeta` (frontmatter equivalent: slug, title, metaDescription, tldr, category, tags, publishedDate, updatedDate, author, readTimeMinutes, images, faqItems, relatedSlugs, headings, schemaType?, speakable?)
- `Content: () => JSX.Element` (the actual article body using shared blocks: `CalloutBox`, `InlineCTA`, `StatHighlight`, `KeyTakeaway`, `QuickQuiz`, `InternalLink`, `SectionDivider`)

Every post is registered in `src/blog/registry.ts` with a lazy `load: () => import('./posts/<cat>/<slug>')`.

## Categories (AiLys-native)

| id | label | scope |
|---|---|---|
| `ai-visibility` | AI Visibility | ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot citations |
| `gbp-google-maps` | Google Business Profile | GBP posts, photos, Q&A, attributes, categories |
| `local-seo` | Local SEO | NAP, citations, Wikidata, schema, internal linking |
| `aeo-geo-eeat` | AEO / GEO / E-E-A-T | Answer Engine Optimization, Generative Engine Optimization, E-E-A-T |
| `voice-search` | Voice Search | Siri, Alexa, Google Assistant, voice queries |
| `industry-playbook` | Industry Playbooks | Dentists, lawyers, restaurants, contractors, clinics, real estate, hotels |
| `reputation-reviews` | Reputation and Reviews | Review velocity, sentiment, Reviuzy add-on |
| `analytics-attribution` | Analytics and Attribution | AI Traffic, UTM, conversion tracking |
| `ailys-product` | AiLys | How AiLys works, methodology, comparisons |

When a topic does not fit, do NOT invent a category. Pick the closest existing one and refine the tags.

## SEO 10/10 gate (must pass before declaring done)

### On-page SEO
- [ ] H1 = post title (matches `meta.title`), single H1 per page
- [ ] Meta description 140-160 chars, contains primary keyword + secondary
- [ ] Slug is hyphen-cased lowercase, ASCII only, 3-7 words, contains primary keyword
- [ ] Title 50-65 chars, contains primary keyword, value/promise word ("playbook", "checklist", "guide", "in 2026")
- [ ] First 100 words contain primary keyword + 2 secondary terms naturally
- [ ] At least 7 H2 sections, each with an `id` matching `meta.headings[i].id`
- [ ] Word count: 1,400-2,200 for tactical posts, 2,200-3,500 for pillar posts
- [ ] Internal links: minimum 3 to other AiLys pages (industries, services, glossary, blog, audit)
- [ ] External links: 1-3 to authoritative sources (Google Search Central, Schema.org, Wikipedia, Wikidata) with `rel="noopener"` for safety
- [ ] **Density target (Truvizy parity)** per post:
  - 1 StatHighlight (numbers from AiLys reality only)
  - **3 CalloutBox** (mix tip / info / warning / danger)
  - **3 InlineCTA** (mix audit / pricing / book variants, spread across the article)
  - 1 KeyTakeaway near the conclusion
  - **3+ InternalLink** to AiLys pages
  - **6-8 SectionDivider** between every major section (this is what gives the Truvizy visual rhythm)
  - 1 QuickQuiz mid-article on a key concept
- [ ] FAQ section with 5-7 questions answering long-tail queries
- [ ] FAQ heading entry included in `meta.headings` array (with id `faq`, last entry)

### Schema / structured data (BlogJsonLd component handles most)
- [ ] `Article` schema with author, publisher, datePublished, dateModified, image, mainEntityOfPage
- [ ] `FAQPage` schema generated from `meta.faqItems`
- [ ] `BreadcrumbList` schema (Home -> Blog -> Category -> Post)
- [ ] `Organization` schema with `knowsAbout` listing AiLys topics
- [ ] `speakable` property on Article (`.prose-blog h2, .prose-blog p:first-of-type`) for voice assistants
- [ ] `inLanguage` set per locale; `isAccessibleForFree: true` for AI crawlers

### AEO / GEO / LLM citation optimization
- [ ] First paragraph answers the headline question in 40-60 words (LLM extractive snippet target)
- [ ] TLDR field populated (used as featured snippet candidate)
- [ ] Each H2 starts with a question or a definitional statement (LLMs prefer Q-A format)
- [ ] Lists and tables present (LLMs cite structured content more)
- [ ] Brand names always in English / Latin script: AiLys, Reviuzy, ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot, GBP, AEO, GEO, E-E-A-T, NAP
- [ ] No em-dashes anywhere (CLAUDE.md hard rule 2). Use periods, commas, colons, parentheses
- [ ] No AI-fingerprint phrases ("It's not just X, it's Y", "Whether you're X or Y", "leverage", "robust", "delve", excessive triadic listings) per CLAUDE.md hard rule 3

### Distribution / discoverability
- [ ] Slug added to `src/blog/registry.ts`
- [ ] Slug appears in `public/sitemap.xml` after `node scripts/generate-sitemap.mjs`
- [ ] Slug appears in `public/llms.txt` "Recent posts" section if marquee post (>= 1.5k words)
- [ ] Hero image at `/blog-images/<slug>/hero.svg` (1200x630). Real `.webp` photos are preferred when available, but `.svg` placeholders are auto-generated by `scripts/generate-blog-placeholders.mjs`. OG image (1200x630, < 200 KB) is a separate file at `/blog-images/og/<slug>.png` for social sharing.
- [ ] Twitter card type `summary_large_image`
- [ ] Hreflang block: 16 alternates + x-default

### i18n discipline (CLAUDE.md hard rule 8 + project rule)
- **All translations hand-authored. No translation APIs, ever.** Not Anthropic, not Google Translate, not DeepL, not OpenAI. Quebec French in particular needs human nuance and brand discipline (hard rule 4).
- Ship cadence per locale: (1) EN canonical first, (2) FR-CA hand-authored second (in-house bilingual, can ship same commit), (3) ES + ZH + AR + RU follow-up commits when capacity allows, (4) the 10 secondaries (DE, IT, PT, NL, PL, JA, KO, TR, VI, HI) tracked in `docs/i18n-translation-queue.md` and shipped later.
- A post is "fully shipped" only when all 6 majors render: EN, FR-CA, ES, ZH, AR, RU. Until then, mark `status: published-en-fr-only` (or similar) in `references/queue.md`.
- Translations live as additional locale exports inside the post file OR in sister files `<slug>.fr.tsx`, `<slug>.es.tsx`, etc. Pick the convention used by neighboring posts in the same category and stay consistent.
- Brand names stay in Latin script in every locale.

## Cadence rule

The standing cadence is 1 post every 2 days. The reference queue lives in `references/queue.md`. To pick the next slug:

1. Open `references/queue.md`, find the next entry whose `publishedDate` is in the past or within 48 hours, and whose `status` is `pending`
2. Author the post per the SEO 10/10 gate
3. Set `status: published` in the queue, write the actual `publishedDate` on the post meta to the planned date (do NOT post-date), and add the post to `registry.ts`

If the user asks for a topic outside the queue, add it as a new entry in `references/queue.md` first (slug, target keywords, long-tail Q, category) so the queue stays the source of truth.

## Workflow

When the user asks for "the next post" or "Feb 7 post" or "post for /vs/ChatGPT":

1. **Plan** (no code yet)
   - Pick the slug, category, target primary keyword, 2-4 secondary keywords, and 1-2 long-tail questions
   - Sketch the 7-9 H2 outline
   - Sketch 5-7 FAQ items (real long-tail searches, not invented)
   - Confirm with user (one-line summary) before writing the body

2. **Author**
   - Copy `templates/post-template.tsx` to `src/blog/posts/<category>/<slug>.tsx`
   - Fill `meta` per the 10/10 gate
   - Write the body using shared blocks for visual rhythm (every ~400 words, insert a Callout / Stat / CTA)
   - Generate FAQ items as real questions, real answers (40-90 words each)

3. **Register**
   - Add import + registry entry to `src/blog/registry.ts`
   - Update `references/queue.md` (status -> published)

4. **SEO surfaces**
   - Run `node scripts/generate-sitemap.mjs` (regenerates `public/sitemap.xml` + 16 per-language sitemaps)
   - If marquee post, add slug to "Recent posts" in `public/llms.txt`
   - Verify post URL renders in dev: `npm run dev` then visit `/blog/<slug>` and `/fr/blog/<slug>`

5. **Test gates** (CLAUDE.md hard rule 12)
   - `npx tsc --noEmit` clean
   - `node scripts/audit-translations-deep.mjs` exit 0
   - `grep -rn "—" src/blog/` returns zero
   - Open `/blog`, then click into the new post, verify hero image, FAQ accordion, JSON-LD via DevTools
   - Mobile viewport 375x812 check

## Templates and references

- `templates/post-template.tsx` -- starter file for a new post, fully wired with shared blocks and FAQ
- `templates/architecture/` -- the canonical Truvizy-style files (types, authors, categories, registry, JsonLd) ready to copy into `src/blog/`
- `references/seo-checklist.md` -- printable version of the 10/10 gate
- `references/keyword-research.md` -- AiLys-specific keyword universe (primary, secondary, long-tail) by industry
- `references/queue.md` -- the cadence queue (Feb 1 onward, every 2 days)

## Hard "no" rules (do not violate)

0. **No translation APIs, ever.** Translations are hand-authored in repo files (per-post i18n overrides or sister `<slug>.fr.tsx`, etc.). Never call Anthropic, Google Translate, DeepL, OpenAI, or similar at build time or runtime. If a script scaffolds a translation file, it scaffolds empty keys or `// TODO translate` placeholders, never auto-translated content. Quebec French in particular requires human nuance.
1. No em-dashes (`—`). Replace with `.`, `,`, `:`, `(`, `)`, ` and `, ` et `.
2. No AI fingerprint phrases (see CLAUDE.md hard rule 3 for the full ban list).
3. No proprietary AI provider disclosure inside post bodies (CLAUDE.md hard rule 10): never name Anthropic, Claude, OpenAI, GPT-4 inside post text as "the engine we use". Topical mentions ("ChatGPT cites...") are fine, but do not say "we use Claude under the hood". Refer to AiLys engines as "our AI engine", "the AiLys AI Visibility engine".
4. No fake stats. If you cite a number, link the source. If you do not have a source, write the qualitative version ("most local clinics", not "78% of clinics").
5. No "Whether you are X or Y" / "It is not just X, it is Y" / "leverage" / "robust" / "delve". These are AI tells.
6. No bilingual EN-FR translations are optional. Hard rule 8 requires EN + FR-CA + 4 other majors before claiming shipped. If you cannot translate, mark `status: published-en-only` in the queue and ship a follow-up commit.
7. No new posts dated in the future for cadence purposes. The cadence pretends to backfill (Feb 1 onward), but `publishedDate` is the planned cadence date, not "tomorrow".
8. No skipping `registry.ts`. A post that is not in the registry is not on the site.
