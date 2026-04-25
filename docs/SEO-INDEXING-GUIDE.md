# AiLys Agency · SEO indexing playbook

How to get the site indexed in Google Search Console (GSC), Bing Webmaster
Tools, and AI search engines, language by language.

## TL;DR

1. Verify ownership of `ailysagency.ca` in GSC + Bing Webmaster.
2. Submit `sitemap-en.xml` to GSC first. Wait 2 to 4 weeks for full indexing.
3. Submit `sitemap-fr.xml` second. Wait.
4. Add additional language sitemaps weekly as translations land and stabilize.
5. Repeat for Bing Webmaster Tools.
6. Use IndexNow for fast invalidation when content changes.

## Step 1 — Verify ownership

### Google Search Console
1. Go to https://search.google.com/search-console
2. Add property → Domain → enter `ailysagency.ca`
3. Pick the DNS verification method
4. Add the TXT record Google gives you to Cloudflare DNS for `ailysagency.ca`
5. Wait 5 minutes, click Verify

Domain property covers all subdomains and protocols automatically.

### Bing Webmaster Tools
1. Go to https://www.bing.com/webmasters
2. Add site `https://www.ailysagency.ca`
3. Two options for verification:
   - Easiest: import the property from GSC (Bing offers this on first add)
   - Or: add the meta tag from Bing into `index.html` (replace `REPLACE_WITH_BING_VERIFICATION_CODE`)

### Yandex (optional, only if you target Russian-speaking markets)
1. Go to https://webmaster.yandex.com
2. Add site, verify with the meta tag in `index.html`

## Step 2 — Submit sitemaps in priority order

Per-language sitemaps live at:
```
https://www.ailysagency.ca/sitemap.xml          ← master index
https://www.ailysagency.ca/sitemap-en.xml       ← submit first
https://www.ailysagency.ca/sitemap-fr.xml       ← submit second
https://www.ailysagency.ca/sitemap-es.xml
https://www.ailysagency.ca/sitemap-zh.xml
... 16 total
```

Recommended GSC submission cadence:

| Week | Language | Why this order |
|---|---|---|
| 1 | EN | Primary content, native quality |
| 3 | FR-CA | Quebec home market, native quality |
| 5 | ES | Spanish-speaking buyers, native quality |
| 7 | ZH | Chinese partner network, native quality |
| 9 | AR | Arabic partner network, native quality |
| 11 | RU | Russian partner network, native quality |
| 13+ | DE, IT, PT, JA, KO, HI, NL, PL, TR, VI | One per week as translations land |

Why staged rollout: submitting all 16 at once forces Google to crawl 432 URLs
from a brand new domain. This wastes crawl budget and can cause partial
indexing across all languages. Sequencing one language at a time lets each
language land cleanly before the next is added.

To submit a sitemap:
1. GSC → Sitemaps → enter `sitemap-en.xml` → Submit
2. Wait 24 hours, check status (should say "Success")
3. After 1 to 2 weeks, check Coverage report for indexed page count
4. Once 80%+ of EN URLs are indexed, submit FR-CA

## Step 3 — Bing Webmaster Tools

Bing accepts all 16 at once without crawl-budget concerns at this scale.
Submit the master index:
- Bing Webmaster → Sitemaps → Submit `https://www.ailysagency.ca/sitemap.xml`

Bing typically picks up new content within 48 hours.

## Step 4 — IndexNow (fast indexing for content updates)

IndexNow is the protocol Bing, Yandex, Naver, and Yep use for instant content
indexing. Google does not officially support it but does not penalize it.

To enable:
1. Generate an API key (any UUID works), e.g. `f4c8a9b6e2d3c1a5b8f7e6d4c2b1a9f8`
2. Place a verification file at `public/{api-key}.txt` containing just the key
3. Submit URL changes via:
   ```
   POST https://api.indexnow.org/indexnow
   Content-Type: application/json
   {
     "host": "www.ailysagency.ca",
     "key": "{api-key}",
     "keyLocation": "https://www.ailysagency.ca/{api-key}.txt",
     "urlList": ["https://www.ailysagency.ca/blog/some-new-post"]
   }
   ```
4. We can wire this as a Cloudflare Worker that fires on git push (see
   `supabase/functions/README.md` once we deploy that infrastructure).

## Step 5 — AI search engine indexing

LLM crawlers do not have submission consoles. They discover via:
- `robots.txt` (already configured to allow GPTBot, ClaudeBot, PerplexityBot, etc.)
- Crawl backlinks from the open web
- Schema markup (already configured: BreadcrumbList, Article, TechArticle, FAQPage, Speakable)

To get cited faster:
- Earn 3 to 5 high-DA backlinks (Yelp, BBB, industry directory, news mention)
- Submit a Wikidata entry for AiLys Agency (manual process at https://www.wikidata.org)
- Be active on Reddit in `/r/seo`, `/r/smallbusiness`, `/r/quebec` with substantive answers

## Step 6 — Monitor

| Tool | What to watch |
|---|---|
| Google Search Console | Coverage report, average position, click-through rate |
| Bing Webmaster | Index status, search performance |
| Cloudflare Analytics | Real-user metrics (Core Web Vitals) |
| AiLys admin (`/admin/posts`) | Per-blog-post views and read completion |

## Verification codes

Replace these placeholders in `index.html` with the real codes from each console:

```html
<meta name="google-site-verification" content="REPLACE_WITH_GSC_VERIFICATION_CODE" />
<meta name="msvalidate.01" content="REPLACE_WITH_BING_VERIFICATION_CODE" />
<meta name="yandex-verification" content="REPLACE_WITH_YANDEX_VERIFICATION_CODE" />
<meta name="p:domain_verify" content="REPLACE_WITH_PINTEREST_VERIFICATION_CODE" />
```

Pinterest is optional but useful if your clients run visual industries (restaurants, salons).

## Common mistakes to avoid

- Submitting sitemap.xml master index to GSC instead of `sitemap-en.xml`
  on first round. Master index is fine, but per-language gives finer-grained
  control over indexing.
- Skipping the DNS-level domain property in GSC. URL-prefix properties miss
  data for `www` vs `non-www` and `https` vs `http`.
- Forgetting to add Cloudflare TXT record for verification. Most "verification
  failed" issues are a missed DNS update.
- Leaving the verification meta tags as `REPLACE_WITH_*` after deploy. Search
  consoles need real codes.

## Resources

- GSC docs: https://support.google.com/webmasters
- Bing Webmaster: https://www.bing.com/webmasters/help
- IndexNow: https://www.indexnow.org
- Schema.org: https://schema.org
- Yandex Webmaster: https://webmaster.yandex.com
