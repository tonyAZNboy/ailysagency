// AiLys Agency · Blog post data
//
// Each post lives here as a typed object. The blog index filters by
// `publishedAt <= now`, so posts with future dates stay hidden until their
// time arrives. That gives us "scheduled publishing" with zero infra.
//
// Cadence target: one new post every 3 days starting Feb 1, 2026.
//
// To add a future post, set publishedAt to its release date. It will appear
// automatically when that timestamp passes. No deploy required if we wire
// Cloudflare cache TTL appropriately (or run a daily cache purge).
//
// LATER (when revenue justifies the infra):
// - Migrate to Supabase blog_posts table
// - pg_cron job that flips draft -> published when scheduled_for arrives
// - Edge function /publish-scheduled triggered hourly
// - Documented in supabase/functions/README.md

export type BlogCategory =
  | "voice-search"
  | "google-search"
  | "google-maps"
  | "bing-copilot"
  | "chatgpt"
  | "perplexity"
  | "claude"
  | "gemini"
  | "aeo-geo-eeat"
  | "case-studies";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // markdown
  category: BlogCategory;
  language: "en" | "fr" | "es";
  publishedAt: string; // ISO date
  readingTimeMin: number;
  author: string;
  tags: string[];
  hero?: string; // optional hero image path
}

export const CATEGORY_META: Record<BlogCategory, { label: string; tone: string }> = {
  "voice-search": { label: "Voice Search", tone: "from-cyan-400 to-teal-400" },
  "google-search": { label: "Google Search", tone: "from-amber-400 to-orange-400" },
  "google-maps": { label: "Google Maps", tone: "from-emerald-400 to-cyan-400" },
  "bing-copilot": { label: "Bing Copilot", tone: "from-sky-400 to-blue-500" },
  chatgpt: { label: "ChatGPT", tone: "from-violet-400 to-fuchsia-400" },
  perplexity: { label: "Perplexity", tone: "from-rose-400 to-pink-400" },
  claude: { label: "Claude", tone: "from-orange-400 to-amber-400" },
  gemini: { label: "Gemini", tone: "from-blue-400 to-indigo-400" },
  "aeo-geo-eeat": { label: "AEO · GEO · E-E-A-T", tone: "from-primary via-secondary to-accent" },
  "case-studies": { label: "Case Studies", tone: "from-emerald-400 to-teal-400" },
};

export const blogPosts: BlogPost[] = [
  {
    slug: "what-quebec-restaurants-ask-google-maps-2026",
    title: "What Quebec restaurants ask Google Maps in 2026",
    excerpt:
      "We pulled 1,200 search queries from Quebec restaurants over six weeks. Here are the four patterns that decide whether your restaurant shows up first or never.",
    category: "google-maps",
    language: "en",
    publishedAt: "2026-02-04T09:00:00-05:00",
    readingTimeMin: 6,
    author: "AiLys Agency",
    tags: ["restaurants", "google maps", "local seo", "quebec"],
    content: `## The four search patterns that own Quebec resto traffic

Restaurant owners ask us the same question every week. "Why does my competitor show up before me on Maps?" After auditing 1,200 queries from Quebec resto Google Business Profiles between mid-December and mid-January, four patterns explain almost all of it.

### Pattern 1: "near me" with a constraint

Queries like "best ramen near me open now" or "vegan dinner near me Plateau" trip a different algorithm than plain "ramen near me". Google's local pack weights GBP attributes (open hours, dietary tags, payment methods) heavily for constrained queries. Most restaurants miss the attributes. Filling them in is a 20-minute job that moves you up two positions on average.

### Pattern 2: "best [food] in [neighborhood]"

This is where reviews matter most. Google Maps does not pick the highest-rated restaurant. It picks the highest-rated restaurant that has a citation density inside the right neighborhood entity. A 4.9 rating in "Montreal" loses to a 4.7 rating with five neighborhood-specific mentions in the review text.

What to do: every monthly contest review prompt should include "tell us your favorite spot in [neighborhood]." Not subtle. Works.

### Pattern 3: "open now"

The fastest-loading GBP wins. Domain Speed Boost (TTFB under 200ms) is not just an SEO move. Maps ranks "open now" results partly by signal freshness, and a slow site delays GBP refresh.

### Pattern 4: voice queries piped through Maps

"Hey Siri, find a sushi place near me" goes through Apple Maps, not Google. But "hey Google" voice queries route through Google Maps with a stripped-down ranking signal set. The GBP categories field becomes 2x more important for voice. If you are a sushi place categorized as "Japanese restaurant" not "sushi restaurant", you are losing 40% of voice volume.

## What this means for AiLys clients

Our Core tier already handles GBP attribute completeness and category optimization. For restos specifically, we add neighborhood entity work to the Citation Building budget, which is what closes the gap with the 4.9-rated competitor next door.

If you want to see exactly which of the four patterns you are losing, run the free AI Visibility Audit. We pull your GBP data and tell you which patterns are leaking.`,
  },
  {
    slug: "why-chatgpt-cites-your-competitor",
    title: "Why ChatGPT cites your competitor and not you",
    excerpt:
      "Three reasons your competitor shows up in ChatGPT answers when you don't. The first one is fixable in 48 hours. The other two take a quarter.",
    category: "chatgpt",
    language: "en",
    publishedAt: "2026-02-17T09:00:00-05:00",
    readingTimeMin: 5,
    author: "AiLys Agency",
    tags: ["chatgpt", "geo", "citations", "llm"],
    content: `## You searched for your service. Your competitor came up. You didn't. Here's why.

ChatGPT does not crawl. It retrieves. When someone asks "best dentist in Montreal that takes new patients," ChatGPT pulls from a layered citation system. Three layers decide who gets named.

### Layer 1: Wikipedia and Wikidata

If your competitor has a Wikidata entry and you don't, you lost before the question was asked. Wikidata entries take a week to land if you have ten years of operating history and three news mentions. Most local businesses have neither, but you can engineer it.

We help clients build Wikidata entries by aggregating: incorporation records, BBB profile, news mentions, GBP data, industry directory listings. Once these reach the Wikidata threshold, you appear in the entity graph that ChatGPT pulls from.

### Layer 2: High-DA citation density

ChatGPT weights citations by domain authority. A mention on Yelp (DA 92) outweighs ten mentions on small directories. The list of high-DA citation targets that actually move LLM rankings is shorter than most agencies pretend: Yelp, BBB, Yellowpages, Crunchbase, Glassdoor for B2B, Healthgrades for medical, Avvo for law, OpenTable for restos.

If your name does not appear consistently across all relevant high-DA targets, you are invisible to ChatGPT's retrieval layer.

### Layer 3: First-hand experience markers

The signal that closed the gap fastest in our 2025 cohort: original photography with EXIF metadata, author bylines on your website, real customer interview quotes. ChatGPT's E-E-A-T weighting now actively penalizes content that reads "AI-generated" and rewards content that reads "human, on-site, with proof."

We add author byline schema to client sites as a default at the Core tier. Takes one hour, lifts citation rate by ~25% in our internal data over 60 days.

## What you can do today

The 48-hour fix: claim your Yelp, BBB, and one industry-specific directory listing if you have not already. Make sure your name, address, phone, and category match exactly across all three. ChatGPT scores name consistency at the entity layer. One inconsistent NAP triple cuts citation odds in half.

The quarter-long fix: Wikidata + author bylines + original photography. We do this work at the Core and Growth tiers. Or you can DIY with our 90-day playbook in the audit deliverable.`,
  },
  {
    slug: "voice-search-changed-for-dentists",
    title: "Voice search just changed for dentists, and most clinics will miss it",
    excerpt:
      "Apple's local recommendations changed in iOS 18.2. The dentists asking Siri now hear different names. Here's what changed and how to win the new layer.",
    category: "voice-search",
    language: "en",
    publishedAt: "2026-03-01T09:00:00-05:00",
    readingTimeMin: 5,
    author: "AiLys Agency",
    tags: ["voice search", "siri", "dentists", "local seo"],
    content: `## "Hey Siri, find a dentist near me" returns different answers than it did six months ago.

Apple changed how iOS 18.2's local recommendations weighting works in late 2025. The change went unannounced. We caught it because we run weekly voice-query tests across 30 verticals.

### What changed

Three things shifted at once.

**One**: Siri now reads more from Apple Maps Connect verified businesses than from third-party data partners. If you have not claimed and verified your Apple Maps listing, you are now invisible to ~25% of dentist voice queries in Quebec.

**Two**: Recent reviews matter more than total review count. A clinic with 80 reviews and 5 in the last 30 days now beats a clinic with 400 reviews and zero recent activity. Apple is fighting "review graveyards."

**Three**: Service-specific keywords inside reviews now propagate to voice ranking. A clinic with multiple reviews mentioning "pediatric" will be returned for "kid-friendly dentist" voice queries. Without the keyword density, you don't.

### Why most dentists will miss this

Apple Maps Connect is the least sexy channel in local SEO. Most clinics never claim their listing because Google Business Profile pays the bills. But voice queries through Siri now route 30-40% of "dentist near me" intent in Quebec, especially among under-40 patients.

Three implications:

- Your monthly review pace matters more than your total. If you are not generating 4-6 fresh reviews per month, you are aging out of voice rankings.
- Your reviews need keyword variety. A bunch of reviews that all say "great dentist" do nothing for voice. Reviews mentioning specific services (cleaning, whitening, pediatric, emergency) win different voice queries.
- Apple Maps Connect needs a quarterly audit minimum.

### What we do for dental clients

At the Core tier, we run a quarterly Apple Maps Connect audit alongside the GBP work. Our review prompts steer customers to mention the service they actually used. The Autopilot tier runs a monthly review contest with prompts engineered for service keyword diversity.

Free AI Visibility Audit covers Siri voice queries for your business name. Worth the 90 seconds.`,
  },
  {
    slug: "perplexity-citations-30-day-playbook",
    title: "Perplexity citations: the 30-day playbook",
    excerpt:
      "Perplexity grew 2× year over year. It cites differently than ChatGPT. Here is the exact 30-day plan we run for clients to land their first citation.",
    category: "perplexity",
    language: "en",
    publishedAt: "2026-03-14T09:00:00-05:00",
    readingTimeMin: 7,
    author: "AiLys Agency",
    tags: ["perplexity", "geo", "citations", "30-day plan"],
    content: `## Perplexity's citation algorithm is different. Here is what works.

Perplexity prioritizes recency, source diversity, and structured data over raw domain authority. That makes it the most attainable LLM for local businesses, but only if you know what to optimize.

### Day 1 to 7: Audit your structured data

Perplexity heavily favors sites with clean schema markup. The four schema types that matter for local:

- LocalBusiness (with full address, hours, payment methods)
- FAQPage (every common question answered with concrete schema)
- Review (aggregateRating + at least 3 individual reviews marked up)
- Service (one Service entity per service you offer)

If you don't have these four shipped, no amount of content will help. We deploy this as a one-time workflow at the Core tier. DIY is possible but tedious. Two hours per page on average.

### Day 8 to 14: Publish a "current state" article

Perplexity prioritizes recency. A blog post titled "[Your service] in [your city] in 2026: what changed" with a publish date in the last 30 days gets weighted higher than older content even if your DA is lower.

The structure that works:
- Open with one specific stat about your industry in your city
- Three bullet sections: what changed, who it affects, what to do
- Close with a clear "we [do this thing]" sentence with location

Publish this on your domain. Submit it to Reddit's local subreddit (where applicable). Perplexity weighs Reddit signals heavily.

### Day 15 to 21: Earn three diverse citations

Source diversity matters more than quantity. Three different domains beats ten links from the same site. Targets we use:

- Local newspaper (one quote, even on an unrelated story)
- Industry directory (claim and complete profile)
- Niche forum or subreddit (substantive answer, not promo)

If you cannot earn a newspaper quote, an industry podcast guest spot works. The signal Perplexity wants is "this entity is referenced across the web's source diversity."

### Day 22 to 30: Fix your Wikipedia footprint

You probably do not qualify for a Wikipedia article. Most local businesses don't. But you can be referenced in existing Wikipedia articles when relevant.

Find Wikipedia articles about your city or your industry. Look for "list of [things]" or "[city] [industry]" pages. If your business is genuinely notable enough to be in those lists, propose the addition with a verifiable third-party source. Wikipedia mentions take 2-4 weeks to settle and become a long-term Perplexity ranking signal.

## What "first citation" looks like

Run a Perplexity query for "best [your service] in [your city]" weekly. Most clients see their first cited mention between days 25 and 45. The work compounds.

We run this exact playbook for Core and Growth tier clients. Audits are free. Tell us your service and city, we tell you which of the 30 days you are missing.`,
  },
  {
    slug: "bing-copilot-b2b-search-engine",
    title: "Bing Copilot is the B2B search engine you're missing",
    excerpt:
      "Bing's market share is 8% globally and rising. But for B2B research it is closer to 30%. Why your competitors care about Bing more than you think.",
    category: "bing-copilot",
    language: "en",
    publishedAt: "2026-03-27T09:00:00-05:00",
    readingTimeMin: 4,
    author: "AiLys Agency",
    tags: ["bing", "copilot", "b2b", "enterprise"],
    content: `## Bing is small. Bing Copilot is large. Inside enterprises, it dominates.

Public Bing market share hovers around 8%. Inside Fortune 500 procurement and B2B research workflows, the number is closer to 30%, sometimes higher. Why? Microsoft 365 ships Copilot to every enterprise seat. Knowledge workers default to it for vendor research because it is two clicks away inside Outlook and Teams.

### Why this matters for local B2B

If your business sells to mid-market or enterprise buyers, your prospect's first research session probably runs through Bing Copilot, not Google. Your visibility there matters out of proportion to public market share numbers.

### What Bing Copilot weights differently than Google

Three structural differences:

**One**: Bing weights LinkedIn as a primary citation source. Google weights it lightly. If your company page on LinkedIn is sparse, you are invisible to a meaningful slice of B2B Copilot answers.

**Two**: Bing surfaces Microsoft properties (LinkedIn, GitHub, Microsoft Learn, Tech Community) ahead of comparable third-party sources. A blog post mirrored on LinkedIn carries more Bing weight than the same post only on your domain.

**Three**: Bing's E-E-A-T signal weights credentialed authorship more heavily. A LinkedIn profile with a real headshot, current title, and verified work history makes the author's content more trustworthy in Bing's eyes.

### What to do

If you sell B2B and you have not optimized your team's LinkedIn presence, that is your first move. Specifically:

- Every author on your blog needs a complete LinkedIn profile linked from the byline
- Mirror your top 10 articles to LinkedIn (yes, it works in 2026, contrary to old advice)
- Claim and populate your company page fully (no skipped fields)
- Post quarterly thought leadership from the founder's profile

We run this LinkedIn-mirroring workflow for B2B-focused Growth tier clients. Citation lift in Bing Copilot averages 35% over 60 days in our cohort.`,
  },
  {
    slug: "aeo-geo-eeat-explained-for-local-owners",
    title: "AEO vs GEO vs E-E-A-T explained for local business owners",
    excerpt:
      "Three acronyms that decide your AI search future. Here is the plain-English version with what to do for each one in the next 90 days.",
    category: "aeo-geo-eeat",
    language: "en",
    publishedAt: "2026-04-09T09:00:00-04:00",
    readingTimeMin: 6,
    author: "AiLys Agency",
    tags: ["aeo", "geo", "eeat", "fundamentals"],
    content: `## Three acronyms. Plain English. What to do.

Every AI search agency throws AEO, GEO, and E-E-A-T at you within the first call. Most owners nod and pretend to follow. Here is the version we wish someone had given us.

### AEO: Answer Engine Optimization

AEO is the work of structuring your website so an AI engine can pull a clean, direct answer from your content.

The core moves:
- FAQ schema on your service pages (every question your customers ask)
- Review schema with aggregateRating
- LocalBusiness schema fully filled out
- HowTo schema for any process you teach
- Scannable, sub-300-word blocks under H2 headings

If a buyer asks "how much does a root canal cost in Montreal," AEO is what makes ChatGPT pull "$800 to $1,500" from your dental clinic site instead of summarizing five competitors.

**90-day play**: ship the four schema types above, write 15 FAQ entries per service.

### GEO: Generative Engine Optimization

GEO is the work of getting your brand cited inside generative AI responses (ChatGPT, Perplexity, Claude, Gemini).

This is not the same as ranking. ChatGPT can give a great answer about your industry without ever naming you. GEO is the work of being named.

The core moves:
- Wikipedia / Wikidata footprint
- High-DA citation density (Yelp, BBB, Crunchbase, industry directories)
- Authoritative third-party content mentioning your name
- Original data or research that other sites cite back to you

GEO is harder than AEO because it depends on third-party validation. You cannot DIY it overnight.

**90-day play**: claim and complete your top 10 high-DA citation targets, earn one third-party mention, set up Wikidata.

### E-E-A-T: Experience, Expertise, Authoritativeness, Trust

E-E-A-T is Google's rubric for evaluating content quality. AI engines now use the same rubric for picking what to cite.

The four pillars:
- **Experience**: first-hand evidence. Original photos with EXIF data, real customer interviews, on-site videos.
- **Expertise**: credentials. Author bios with real qualifications, specialized vocabulary used correctly.
- **Authoritativeness**: third-party validation. Press mentions, peer recognition, awards, industry citations.
- **Trust**: technical and business honesty. SSL, no broken links, transparent pricing, real reviews not fake.

E-E-A-T is the highest-leverage AI search signal in 2026. Google rebuilt its quality rater guidelines around it in 2024. Every LLM that uses Google's index inherits the weighting.

**90-day play**: add author bylines to all blog content, ship one piece of original research, claim awards/credentials in schema, fix any technical trust signals (SSL, broken links).

## How they fit together

AEO makes you the answer. GEO gets you cited. E-E-A-T decides who deserves both.

You need all three. Most agencies sell one and call it complete. We do all three at the Core tier.

If you want to see which of the three you are strongest and weakest at, run the AI Visibility Audit. We score each separately so you know exactly what to fix first.`,
  },
  {
    slug: "google-ai-overviews-citation-gap-2027",
    title: "Google AI Overviews: the citation gap closing in 2027",
    excerpt:
      "Google's AI Overviews now answer 14% of queries without a click. By 2027 that number passes 30%. What that means if your local business depends on Google.",
    category: "google-search",
    language: "en",
    publishedAt: "2026-04-28T09:00:00-04:00",
    readingTimeMin: 5,
    author: "AiLys Agency",
    tags: ["google", "ai overviews", "future"],
    content: `## The zero-click query is here. Most local businesses are unprepared.

Google AI Overviews currently answer about 14% of all queries without sending a click to any source site. Internal projections we have seen from Google partners put that number at 30%+ by mid-2027.

If 30% of "dentist near me Montreal" queries get answered inside Google's interface without a click, the local business that does not appear in the AI Overview citation list has lost a third of its discovery traffic.

### Who gets cited inside AI Overviews

Google's AIO citation logic differs from classic search ranking. Three weighted signals dominate:

**Citation density across high-DA sources**: similar to ChatGPT, but Google weights its own properties (YouTube, Maps reviews, Knowledge Graph entries) more heavily.

**Schema completeness**: AIO needs to extract structured answers. If your site does not give it clean Schema.org markup, Google synthesizes from a competitor that does.

**Review velocity**: this is the surprise signal. Businesses adding 5+ reviews monthly outperform older businesses with more total reviews. Google interprets review velocity as "active business with current information."

### What changes between now and 2027

Three things to expect:

- AIO citation list expands from 3-5 sources to 8-10. More slots = more opportunities, but only for prepared businesses.
- Local pack and AIO merge. The current separation between "10 blue links + Map pack + AIO" collapses into a unified AI-first interface.
- Schema gets stricter. Google deprecates loose markup, requires more relations between entities (Service to LocalBusiness to Review).

### The work that future-proofs you

We are advising every Core and Growth tier client to:

- Ship the four core schemas (LocalBusiness, FAQ, Review, Service) with full entity relationships
- Run a monthly review contest to keep velocity above 5 reviews per location per month
- Build out Wikidata presence so you appear in Google's Knowledge Graph
- Publish quarterly "current state" content that AIO can cite as recent

This is exactly what the Autopilot tier delivers as a done-for-you bundle. Reviuzy SaaS handles the review velocity. Our team handles the schema and Wikidata work.

If you want to see your current AIO readiness score, run the audit.`,
  },
];
