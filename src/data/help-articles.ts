// AiLys Agency · Help Center articles (static data)
//
// Each article has its own URL for SEO (people Google "how does AEO work").
// Migrate to Supabase later if the doc center grows beyond ~50 articles.

export type HelpCategory =
  | "getting-started"
  | "aeo-geo-eeat"
  | "pricing-plans"
  | "audit"
  | "account-billing"
  | "glossary";

export interface HelpArticle {
  slug: string;
  title: string;
  excerpt: string;
  body: string; // markdown
  category: HelpCategory;
  updatedAt: string;
  readingTimeMin: number;
}

export const HELP_CATEGORY_META: Record<
  HelpCategory,
  { label: string; description: string; tone: string }
> = {
  "getting-started": {
    label: "Getting started",
    description: "First steps. Onboarding. What to expect.",
    tone: "from-cyan-400 to-teal-400",
  },
  "aeo-geo-eeat": {
    label: "AEO · GEO · E-E-A-T",
    description: "The disciplines we deliver, explained.",
    tone: "from-violet-400 to-fuchsia-400",
  },
  "pricing-plans": {
    label: "Pricing & plans",
    description: "Tier breakdowns, what each plan includes.",
    tone: "from-amber-400 to-rose-400",
  },
  audit: {
    label: "AI Visibility Audit",
    description: "How the audit works, what you get, turnaround.",
    tone: "from-emerald-400 to-cyan-400",
  },
  "account-billing": {
    label: "Account & billing",
    description: "Invoicing, cancellation, refunds.",
    tone: "from-sky-400 to-blue-500",
  },
  glossary: {
    label: "AI search glossary",
    description: "Quick definitions for the terms we throw around.",
    tone: "from-rose-400 to-pink-400",
  },
};

export const helpArticles: HelpArticle[] = [
  // ─── Getting started ───────────────────────────────────────
  {
    slug: "what-is-ailys-agency",
    title: "What is AiLys Agency?",
    excerpt:
      "AiLys is a Quebec-based LLM Visibility & Optimization agency. Here is what we do, who we serve, and what makes us different.",
    category: "getting-started",
    updatedAt: "2026-04-01",
    readingTimeMin: 3,
    body: `## What we do

AiLys delivers AEO, GEO, and E-E-A-T services for local businesses. Translation: we get your business cited inside ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews, and Bing Copilot answers.

## Who we serve

Local businesses across four primary verticals: restaurants, dentists, lawyers, and multi-location franchises. Plus growth-stage businesses that depend on local discovery (clinics, real estate, hotels, contractors).

We are anchored in Quebec but serve clients across Canada, the United States, and Latin America.

## What makes us different

Three things:

- **Pricing**: We start at $300/mo. Comparable agencies start at $2,000/mo. We can charge less because Reviuzy SaaS automates the operational layer.
- **Languages**: 8 languages via partner network (EN, FR, ES, ZH, AR, RU, UK, SR). Most agencies do EN+FR.
- **Focus**: We do one thing, LLM visibility, deeply. Not a generalist agency.

## How to start

Run the free AI Visibility Audit. Results in 24 hours. No call required.`,
  },
  {
    slug: "first-30-days",
    title: "What happens in your first 30 days",
    excerpt:
      "Day-by-day expectation of the first month, from contract signature to your first monthly report.",
    category: "getting-started",
    updatedAt: "2026-04-05",
    readingTimeMin: 4,
    body: `## Days 1 to 3: Onboarding

- Welcome email with payment portal and onboarding form
- 60-minute kickoff call with your AiLys lead
- Access granted to your client portal
- Service agreement countersigned

## Days 4 to 7: Audit & strategy

- Deep technical audit of your site, GBP, and citation footprint
- Strategy doc delivered (Google Doc, you can comment)
- 30-minute review call to lock priorities

## Days 8 to 21: Execution starts

- Schema markup deployed (FAQ, Review, LocalBusiness, Service)
- GBP optimization (categories, attributes, Q&A, photos)
- First batch of citation submissions
- Content calendar approved

## Days 22 to 30: First report

- Monthly performance report delivered (PDF + Google Doc)
- Citation tracking baseline established
- 30-minute strategy call to review wins and adjust

## What you should expect

Schema and GBP improvements show up in Google within 30 to 60 days. LLM citation lift typically takes 90 to 120 days. We send a monthly report regardless of magnitude. No vanity metrics.`,
  },
  {
    slug: "communication-cadence",
    title: "How we communicate with clients",
    excerpt:
      "Email, calls, Slack, monthly reports. Here is the rhythm and how to reach us between scheduled touchpoints.",
    category: "getting-started",
    updatedAt: "2026-04-10",
    readingTimeMin: 2,
    body: `## Scheduled touchpoints

Each tier includes a different cadence:

- **Starter**: Monthly 30-min call + monthly report
- **Core**: Bi-weekly 30-min call + monthly report
- **Growth**: Weekly 30-min call + monthly report + quarterly in-person review (Quebec, Toronto, Montreal)
- **Autopilot**: Same as Growth, plus Reviuzy SaaS dashboard access

## Between calls

- **Email**: hello@ailysagency.ca, response within 12 business hours
- **Slack** (Core+): shared channel with your AiLys team
- **Emergency**: text the lead listed in your welcome email, response within 2 hours during business days

## Reports

Monthly reports land on the 5th of each month. They cover:

- Citation tracking across 6 AI engines
- AEO, GEO, E-E-A-T scores vs prior month
- GBP performance (impressions, calls, direction requests)
- Schema deployment status
- Next month's priorities

Real numbers, plain language, no fluff.`,
  },

  // ─── AEO / GEO / E-E-A-T ───────────────────────────────────
  {
    slug: "what-is-aeo",
    title: "What is AEO (Answer Engine Optimization)?",
    excerpt:
      "Plain English: AEO is the work of structuring your site so AI engines can pull a clean answer from your content.",
    category: "aeo-geo-eeat",
    updatedAt: "2026-04-12",
    readingTimeMin: 3,
    body: `## The 30-second version

AEO stands for Answer Engine Optimization. When someone asks ChatGPT, Bing Copilot, or Google AIO a question, those engines try to extract a direct answer from a website. AEO is the work of making your site the source they extract from.

## The four core moves

1. **FAQ schema** on every service page. Each common question gets structured answer markup.
2. **LocalBusiness schema** with full NAP, hours, payment methods, attributes.
3. **Review schema** with aggregateRating + at least 3 individual reviews marked up.
4. **Service schema**: one entity per service you offer, with relations back to LocalBusiness.

## Why it matters

AI engines are increasingly answering questions without sending a click to any source. By 2027, Google AI Overviews are projected to answer 30%+ of all queries. The businesses cited inside those answers will keep growing. The ones not cited will quietly fade.

## What we do

Schema deployment is part of the Core tier. Our team writes the markup, deploys it to your site, and monitors validation. Most clients ship in week 2 of onboarding.

Run the audit to see your current AEO score.`,
  },
  {
    slug: "what-is-geo",
    title: "What is GEO (Generative Engine Optimization)?",
    excerpt:
      "Getting your brand cited inside generative AI responses, not just the answers themselves.",
    category: "aeo-geo-eeat",
    updatedAt: "2026-04-12",
    readingTimeMin: 3,
    body: `## GEO is different from AEO

AEO is about being the answer. GEO is about being named inside the answer.

ChatGPT can give a great answer about your industry without naming a single business. GEO is the work of being one of the businesses it names.

## The signals that drive GEO

- **Wikipedia and Wikidata footprint**: the entity layer LLMs pull from
- **High-DA citation density**: Yelp, BBB, Crunchbase, industry directories
- **Authoritative third-party content**: news mentions, podcast guest spots, industry publications
- **Original data or research** that other sites cite back to you

## Why GEO is harder than AEO

AEO is mostly your own work on your own site. GEO depends on third-party validation. You cannot DIY it overnight.

## What we do

The Core tier includes 5 citation submissions per month, plus our standard Wikipedia/Wikidata workflow. The Growth tier adds dedicated PR outreach and original research production.`,
  },
  {
    slug: "what-is-eeat",
    title: "What is E-E-A-T?",
    excerpt:
      "Experience, Expertise, Authoritativeness, Trust. The rubric AI engines use to pick whose content to cite.",
    category: "aeo-geo-eeat",
    updatedAt: "2026-04-13",
    readingTimeMin: 3,
    body: `## The four pillars

- **Experience**: first-hand evidence. Original photos with EXIF data, real customer interviews, on-site videos.
- **Expertise**: credentials. Author bios with real qualifications, industry-specific vocabulary used correctly.
- **Authoritativeness**: third-party validation. Press, awards, peer recognition, industry citations.
- **Trust**: business honesty. SSL, no broken links, transparent pricing, real reviews not fake.

## Why E-E-A-T is your highest leverage

Google rebuilt its quality rater guidelines around E-E-A-T in 2024. Every LLM that uses Google's index inherits the weighting. AI search engines now actively penalize content that reads as AI-generated and reward content that reads as human, on-site, with proof.

## What "fixing" E-E-A-T looks like

Three concrete moves we ship for clients:

1. Author bylines added to all blog content (we use Person schema with credentials)
2. Original photography or video for every service page (no stock)
3. Award and credential schema markup so AI engines can verify your authority

## Common mistakes

- "AI-written" content with no human review and no byline
- Stock photos everywhere
- Pricing hidden behind a "contact us" form
- No author profile pages

The first two we fix with content production. The last two are policy decisions you make with your AiLys lead.`,
  },

  // ─── Pricing ─────────────────────────────────────────────
  {
    slug: "which-tier-is-right-for-me",
    title: "Which tier is right for my business?",
    excerpt:
      "Quick decision tree to pick between Starter, Core, Growth, and Autopilot.",
    category: "pricing-plans",
    updatedAt: "2026-04-15",
    readingTimeMin: 3,
    body: `## Quick decision tree

**Starter, $300/mo** is right if:
- Solo restaurant, indie professional, or small salon
- One location
- No prior agency engagement
- You want to dip a toe in AI search optimization

**Core, $600/mo** (most chosen) is right if:
- Dental practice, contractor, growing restaurant
- One to three locations
- You need schema implementation and citation building
- You want bilingual content production

**Growth, $1,200/mo** is right if:
- Multi-location, franchise, or aggressive expansion plan
- 4+ locations
- You need GEO entity authority work and weekly content
- You want competitive monitoring

**Autopilot, $1,299/mo** is right if:
- Everything Growth covers, plus you want zero ops
- You want Reviuzy SaaS bundled in
- You want a monthly review contest run for you
- You want NFC tap cards shipped to your locations

## The "I am unsure" rule

Pick Core. It is the most-chosen tier for a reason: it covers 80% of what most local businesses need. You can upgrade to Growth or Autopilot any time, no penalty.`,
  },
  {
    slug: "what-is-the-money-back-guarantee",
    title: "How does the 30-day money-back guarantee work?",
    excerpt:
      "If you do not see measurable schema or citation improvements in 30 days, we refund the month. Here is the fine print.",
    category: "pricing-plans",
    updatedAt: "2026-04-16",
    readingTimeMin: 2,
    body: `## What is covered

If, at the end of your first 30 days, you do not see at least one of:

- Schema validated and live on your site
- A measurable lift in your monthly citation tracking baseline
- A new GBP ranking position improvement

...you can request a full refund of the first month's fee. No clawback. You keep the schema we shipped and the citations we landed.

## How to request

Email hello@ailysagency.ca within 35 days of your start date with subject line "Refund request". We process within 5 business days, no questions, no guilt trip.

## What is not covered

- Months 2 onward (these are month-to-month, you can cancel any time with 2 weeks notice)
- Reviuzy SaaS fees inside the Autopilot tier (these are separate and follow Reviuzy's own refund policy)

## Why we offer this

Buying agency services on the internet is a credibility test. We are early stage and we know it. Removing financial risk on the first month is the cheapest way to earn the relationship.`,
  },

  // ─── Audit ────────────────────────────────────────────────
  {
    slug: "what-is-the-ai-visibility-audit",
    title: "What's in the free AI Visibility Audit?",
    excerpt:
      "We run your business through 6 AI search engines and score AEO, GEO, E-E-A-T. Here is exactly what you get and how long it takes.",
    category: "audit",
    updatedAt: "2026-04-18",
    readingTimeMin: 3,
    body: `## What you get

A 12-page PDF report covering:

- **LLM citation map**: side-by-side test of ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot for 5 high-intent prompts in your service + city
- **AEO score** (0 to 100): schema completeness, structured Q&A, scannability, entity disambiguation
- **GEO score** (0 to 100): authoritative publications presence, Wikipedia/Wikidata, forum signals, digital PR
- **E-E-A-T audit**: experience, expertise, authoritativeness, trust signals checked
- **90-day action plan**: prioritized list of fixes with effort estimates and expected lift

## How long it takes

24 hours from form submission. We run it during business hours Quebec time, so submit before 6pm if you want it next morning.

## What it costs

Nothing. No credit card. No discovery call required.

## What to do with it

Three options:

1. DIY using the action plan (we keep the plan substantive enough to action without us)
2. Hire AiLys to execute (most clients pick this)
3. Hand it to your existing agency (we are fine with that, the audit alone is valuable)`,
  },

  // ─── Glossary ─────────────────────────────────────────────
  {
    slug: "ai-search-glossary",
    title: "AI search glossary: terms we use",
    excerpt:
      "Quick definitions for AEO, GEO, E-E-A-T, schema, entity authority, citation density, share of model, and more.",
    category: "glossary",
    updatedAt: "2026-04-20",
    readingTimeMin: 4,
    body: `## A to Z

**AEO**: Answer Engine Optimization. Structuring content so AI engines pull direct answers from your site.

**AI Overviews / AIO**: Google's AI-summarized search results that appear above the traditional 10 blue links.

**Authority**: how much weight an AI engine gives a source. Higher authority sources get cited more often.

**Citation density**: how often your business name appears across the web. More citations across more domains equals stronger LLM signal.

**E-E-A-T**: Experience, Expertise, Authoritativeness, Trust. Google's content quality rubric, inherited by most LLMs.

**Entity authority**: your business as a "thing" Google's Knowledge Graph and Wikidata recognize, separate from any single page.

**GBP**: Google Business Profile, formerly Google My Business. Your local listing.

**GEO**: Generative Engine Optimization. Getting your brand named inside generative AI responses.

**LLM**: Large Language Model. The category of AI that powers ChatGPT, Claude, Gemini, etc.

**NAP**: Name, Address, Phone. The triple that needs to be consistent across the web for local SEO.

**Schema**: Schema.org markup. Structured data that helps engines understand your content.

**Share of model**: a measurement of how often your brand is mentioned in LLM answers vs competitors. Sometimes called Share of Voice in AI Search.

**TTFB**: Time To First Byte. How fast your server responds. Faster = better LLM ranking.

**Voice search**: queries spoken to assistants (Siri, Alexa, Google Assistant). Different ranking signals than typed search.`,
  },
];
