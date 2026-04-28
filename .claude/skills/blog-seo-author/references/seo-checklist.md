# AiLys Blog SEO 10/10 Checklist

Print this. Tick every box before declaring a post shipped. Each item carries a one-sentence reason so the gate is self-explanatory.

## On-page SEO

- [ ] H1 equals `meta.title` exactly, single H1 on the page. Search engines and screen readers anchor topical relevance to the H1.
- [ ] Meta description is 140 to 160 characters and contains the primary keyword plus one secondary term. SERP click-through depends on a description that previews the answer.
- [ ] Slug is kebab-case lowercase ASCII, 3 to 7 words, contains the primary keyword. Short keyword-bearing slugs win the breadcrumb and are easier to cite by AI engines.
- [ ] Title is 50 to 65 characters with primary keyword plus a value word like playbook, checklist, guide, or in 2026. Titles that promise an artifact outperform generic titles in CTR studies.
- [ ] First 100 words contain the primary keyword and at least 2 secondary terms placed naturally. LLMs and classic engines weight early-paragraph terms heavily for topical match.
- [ ] At least 7 H2 sections, each with an `id` that matches its entry in `meta.headings`. Anchored H2s power table-of-contents navigation, jump links from AI Overviews, and speakable schema.
- [ ] Word count: 1,400 to 2,200 for tactical posts, 2,200 to 3,500 for pillar posts. AI engines cite long-form structured content disproportionately.
- [ ] At least 3 internal links to other AiLys pages (industries, services, glossary, blog index, audit). Internal links pass topical authority and let crawlers discover the service tier.
- [ ] 1 to 3 external links to authoritative sources (Google Search Central, Schema.org, Wikipedia, Wikidata) with `rel="noopener"`. Authoritative outbound links signal that the post is part of a real research surface.
- [ ] At least one StatHighlight, one CalloutBox, one InlineCTA, and one KeyTakeaway block. Visual rhythm raises dwell time and gives LLMs structured snippets to lift.
- [ ] FAQ section with 5 to 7 long-tail question and answer pairs. FAQs power FAQPage schema and feed both classic People Also Ask and ChatGPT followups.

## Schema and structured data

- [ ] `Article` schema includes author, publisher, datePublished, dateModified, image, mainEntityOfPage. This is the minimum Google requires to show rich results.
- [ ] `FAQPage` schema is generated from `meta.faqItems` and matches the visible FAQ. Mismatched FAQ schema can be flagged as deceptive markup.
- [ ] `BreadcrumbList` schema reflects Home then Blog then Category then Post. Breadcrumbs replace the URL in SERP and improve click-through.
- [ ] `Organization` schema includes `knowsAbout` listing AiLys topics (AI Visibility, GBP, NAP, AEO, GEO). Knowledge graph linking helps LLMs disambiguate the brand.
- [ ] `speakable` is set on the Article using a CSS selector for the H2s and the first paragraph. Voice assistants pick speakable nodes when a user asks a question aloud.
- [ ] `inLanguage` is set per locale and `isAccessibleForFree` is true. This is a quiet but real input to AI crawlers deciding whether to ingest a page.

## AEO, GEO, and LLM citation optimization

- [ ] First paragraph answers the headline question in 40 to 60 words. Extractive answer engines pull this near-verbatim.
- [ ] `tldr` field is populated and reads like a featured-snippet candidate (30 to 50 words). The tldr feeds llms.txt and the AI Overview lift target.
- [ ] Each H2 starts with a question or a definitional statement. LLMs prefer Q-A formatted blocks when assembling citations.
- [ ] Lists, tables, and step-numbered procedures are present. Structured content is cited at much higher rates than paragraph-only prose.
- [ ] Brand names always render in Latin script: AiLys, Reviuzy, ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot, GBP, AEO, GEO, E-E-A-T, NAP. Cross-locale brand integrity is required by CLAUDE.md hard rule 4.
- [ ] No em-dashes anywhere. CLAUDE.md hard rule 2 forbids them; replace with periods, commas, colons, parentheses, or the words and / et.
- [ ] No AI fingerprint phrases. Banned: "It is not just X, it is Y", "Whether you are X or Y", "leverage", "robust", "delve", excessive triadic listings. These are the cleanest signals of AI-written content.

## Distribution and discoverability

- [ ] Slug is registered in `src/blog/registry.ts` with a lazy `load: () => import(...)`. A post that is not in the registry is not on the site.
- [ ] Slug appears in `public/sitemap.xml` after running `node scripts/generate-sitemap.mjs`. Sitemaps are how Bing Copilot and AI crawlers discover new URLs fast.
- [ ] Marquee posts (1,500+ words) appear in the Recent posts section of `public/llms.txt`. The llms.txt manifest is read by ChatGPT, Perplexity, and Claude search.
- [ ] OG image exists at `/blog-images/<slug>/hero.webp`, sized 1200 by 630, under 200 KB. This is the share card on every social network.
- [ ] Twitter card type is `summary_large_image`. The large-image card has measurably higher engagement on X and LinkedIn previews.
- [ ] Hreflang block emits 16 alternates plus x-default. Misconfigured hreflang creates duplicate-content competition between EN and FR-CA.

## i18n discipline (CLAUDE.md hard rule 8)

- [ ] Six majors render before the post is shipped: EN, FR-CA, ES, ZH, AR, RU. Anything less and the post stays in `published-en-only` status in the queue.
- [ ] Translations live as `metaFr`, `ContentFr` exports in the same file or as a sister file `<slug>.fr.tsx`, matching the convention used by neighboring posts in the same category. Consistency is what keeps the registry and sitemap script honest.
- [ ] Brand names stay in Latin script in every locale. Translating AiLys to a localized form breaks knowledge-graph linking on every AI engine.
- [ ] French-Canadian copy uses Quebec spellings and idioms (courriel, magasiner, fin de semaine where appropriate). Generic France French erodes trust with Quebec local owners.
- [ ] No mixed-locale leakage in the translated copy (no English fragments inside the FR body, no untranslated UI strings). Mixed locales cause Google to demote both versions.