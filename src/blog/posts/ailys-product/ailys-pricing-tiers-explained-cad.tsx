/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import { AUTHORS } from '../../authors'
import {
  CalloutBox,
  InlineCTA,
  StatHighlight,
  KeyTakeaway,
  InternalLink,
  SectionDivider,
  QuickQuiz,
} from '../../components/shared'

export const meta: BlogPostMeta = {
  slug: 'ailys-pricing-tiers-explained-cad',
  title: 'AiLys pricing tiers explained, $300 to $2,500 CAD per month',
  metaDescription:
    'A tier-by-tier breakdown of AiLys pricing in Canadian dollars. What ships at Starter, Core, Growth, and Agency. Add-ons, guarantees, and how to pick a plan.',
  tldr: 'AiLys runs four monthly tiers in CAD. Starter at $300 ships technical SEO, GBP, NAP consistency, monthly AI Visibility probe, 4 GBP posts, 4 photos and 2 citations. Core at $600 adds AEO schema, 4 monthly citations, bilingual content, 6 GBP posts, 6 photos, weekly AI Visibility, sentiment analysis. Growth at $1,200 adds GEO entity authority, Wikipedia and Wikidata work, 8 GBP posts, 8 photos, 6 citations, weekly bilingual content, multi-location dashboard up to 3 locations. Agency at $2,500 adds unlimited multi-location dashboard, white-label PDF, Slack SLA under 4 hours, API access, daily AI Visibility probes, 12 GBP posts, up to 12 photos per domain, 8 citations per domain, and a dedicated senior strategist.',
  category: 'ailys-product',
  tags: ['pricing', 'plans', 'cad', 'ailys-product', 'starter', 'core', 'growth', 'agency'],
  publishedDate: '2026-03-09',
  updatedDate: '2026-03-09',
  author: AUTHORS.product,
  readTimeMinutes: 9,
  images: {
    hero: '/blog-images/ailys-pricing-tiers-explained-cad/hero.webp',
    mid: '/blog-images/ailys-pricing-tiers-explained-cad/mid.webp',
    end: '/blog-images/ailys-pricing-tiers-explained-cad/end.webp',
  },
  faqItems: [
    {
      question: 'What is included in the AiLys $300 starter tier?',
      answer:
        'The Starter tier at $300 CAD per month includes technical SEO, Google Business Profile optimization, NAP consistency work, monthly AI Visibility probe across the major AI engines, four GBP posts per month, four GBP photos per month, and two citations per month. It is the entry tier for a single location that wants AI Visibility shipped on a fixed monthly fee with no hourly billing.',
    },
    {
      question: 'How much does the AiLys Core plan cost in Canadian dollars?',
      answer:
        'Core is $600 CAD per month. It includes everything in Starter plus AEO schema work, four monthly citations on quality directories, bilingual content production in EN and FR-CA (4 unique blog topics per month), six GBP posts per month, six GBP photos per month, weekly AI Visibility probes, and sentiment analysis on AI mentions. Core is the most common pick for a single-location operator who wants weekly content and citation velocity.',
    },
    {
      question: 'What does the Growth tier add beyond Core?',
      answer:
        'Growth at $1,200 CAD per month adds GEO entity authority work, Wikipedia and Wikidata presence where eligible, eight GBP posts per month, eight GBP photos per month, six citations per month, six unique blog topics per month split EN and FR-CA, multi-location dashboard up to 3 locations, and competitive monitoring across the AI engines. It fits an operator who wants to compound entity signals across the open web rather than only optimizing their own pages.',
    },
    {
      question: 'When does the Agency tier at $2,500 make sense?',
      answer:
        'Agency at $2,500 CAD per month makes sense for multi-location operators or for partners who need an unlimited multi-location dashboard, white-label PDF reporting, a Slack SLA under four hours, API access, custom integrations, daily AI Visibility probes, twelve GBP posts per month, up to twelve photos per month per domain, eight citations per month per domain, eight unique blog topics per month per domain, and a dedicated senior strategist. It bundles the Reviuzy reputation automation add-on and Domain Shield at no extra cost.',
    },
    {
      question: 'Are AiLys plans month-to-month with a guarantee?',
      answer:
        'Yes. Every AiLys plan is month-to-month with no annual lock-in, and every plan ships with a 30-day satisfaction guarantee. If the first month does not meet expectations, the plan ends without penalty. Add-ons follow the same month-to-month rule.',
    },
    {
      question: 'What add-ons can be stacked on a Starter or Core plan?',
      answer:
        'The available add-ons are Reviuzy review automation at $100 per month (bundled in Agency), Domain Shield at $35 per month, Domain Speed Boost at $35 per month, Dedicated strategist at $35 per month, the Premium Ops trio at $79 per month, and Extra languages at $50 per month each. Add-ons can be combined with any tier, so a Starter plan with Reviuzy and Domain Shield runs $435 per month.',
    },
  ],
  relatedSlugs: ['ailys-vs-traditional-seo-agency', 'ai-visibility-audit-checklist-2026'],
  headings: [
    { id: 'how-the-four-tiers-fit-together', text: 'How the four tiers fit together' },
    { id: 'starter-300-the-foundation-tier', text: 'Starter at $300, the foundation tier' },
    { id: 'core-600-the-content-and-aeo-tier', text: 'Core at $600, the content and AEO tier' },
    { id: 'growth-1200-the-entity-authority-tier', text: 'Growth at $1,200, the entity authority tier' },
    { id: 'agency-2500-the-multi-location-tier', text: 'Agency at $2,500, the multi-location tier' },
    { id: 'add-ons-and-how-to-stack-them', text: 'Add-ons and how to stack them' },
    { id: 'month-to-month-and-the-30-day-guarantee', text: 'Month-to-month and the 30-day guarantee' },
    { id: 'how-to-pick-a-tier', text: 'How to pick a tier' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        AiLys ships four monthly tiers in Canadian dollars. Starter at $300, Core at $600, Growth at $1,200, and Agency at $2,500. Each tier is a fixed scope with a published deliverable list, no hourly billing, and the entire stack is month-to-month with a 30-day satisfaction guarantee. This page explains tier by tier what ships, which add-ons stack on which plan, and how a single-location operator picks a starting tier without overbuying.
      </p>

      <StatHighlight
        stats={[
          { value: '$300 to $2,500', label: 'AiLys monthly tiers in CAD' },
          { value: '30 days', label: 'Satisfaction guarantee on every plan' },
          { value: 'Month-to-month', label: 'No annual lock-in on any tier' },
        ]}
      />

      <SectionDivider />

      <h2 id="how-the-four-tiers-fit-together">How the four tiers fit together</h2>
      <p>
        The four tiers stack additively. Each higher tier inherits everything in the tier below and adds new scope on top. Starter is the foundation: technical SEO, Google Business Profile, NAP consistency, monthly AI Visibility probe, four GBP posts per month, four GBP photos per month, two citations per month. Core layers in AEO schema, four monthly citations, bilingual content, six GBP posts, six photos, weekly AI Visibility, sentiment analysis. Growth layers in GEO entity authority and Wikidata work, eight GBP posts, eight photos, six citations, multi-location dashboard up to 3 locations. Agency layers in unlimited multi-location infrastructure, daily probes, white-label PDF and dedicated senior strategist for partners and operators with several brands.
      </p>
      <p>
        The reason the structure matters is that an operator never needs to reshop the contract when they want a small upgrade. The path from Starter to Core is one click in the dashboard, no new agreement, no new SOW. Plans pro-rate on the day the upgrade lands.
      </p>

      <CalloutBox type="info">
        <p>The pricing page lists every deliverable at every tier with the same wording used in the contract. See the live matrix at <InternalLink to="/pricing" title="AiLys pricing matrix" description="Live tier comparison with all deliverables" /> and run the free <InternalLink to="/audit" title="Free 24-hour AI Visibility audit" description="See gaps before picking a tier" /> if you want a tier recommendation grounded in your real citation share.</p>
      </CalloutBox>

      <InlineCTA variant="pricing" text="See the four AiLys tiers side by side, from Starter at $300 CAD to Agency at $2,500 CAD." />

      <SectionDivider />

      <h2 id="starter-300-the-foundation-tier">Starter at $300, the foundation tier</h2>
      <p>
        Starter is the entry point for a single location that wants AI Visibility shipped on a fixed monthly fee. The scope covers technical SEO on the website, full Google Business Profile optimization (categories, attributes, services, hours, primary photos), NAP consistency on the top citation sources, and weekly LLM citation tracking across ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot. Each month ships one GBP post and four GBP photos.
      </p>
      <p>
        Starter fits a single-location clinic, restaurant, law office, or contractor that wants a baseline of local SEO hygiene plus a citation tracker that flags when the AI engines start naming the brand. The tracker output lands in the dashboard every week with the citation share and the queries that triggered it. No content production runs at this tier, so an operator on Starter typically writes their own blog posts or buys content separately.
      </p>

      <h3>Starter monthly deliverables</h3>
      <ul>
        <li>Technical SEO audit and fixes (sitemaps, schema basics, Core Web Vitals review)</li>
        <li>Google Business Profile full optimization</li>
        <li>NAP consistency on the top citation sources</li>
        <li>Monthly AI Visibility probe across the major AI engines</li>
        <li>4 GBP posts per month, 4 GBP photos per month</li>
        <li>2 citations per month (max per domain)</li>
      </ul>

      <SectionDivider />

      <h2 id="core-600-the-content-and-aeo-tier">Core at $600, the content and AEO tier</h2>
      <p>
        Core doubles the citation volume and turns on bilingual content production. On top of everything in Starter, Core ships AEO schema work (FAQ, HowTo, LocalBusiness, MedicalBusiness or LegalService where appropriate), four monthly citations on quality directories, bilingual content production in EN and FR-CA (4 unique blog topics per month), six GBP posts per month, and six GBP photos per month, plus weekly AI Visibility probes and sentiment analysis on AI mentions. The bilingual content is hand-authored, never piped through a translation API, which is why it ranks the same in Quebec French as in English.
      </p>
      <p>
        Core is the most common starting point for a single-location operator who wants the weekly cadence to compound. Citation share starts moving inside two to three months on Core because the GBP post velocity, the new schema, and the monthly directory citations feed the AI engines fresh signals each week.
      </p>

      <CalloutBox type="tip">
        <p>If your operator math says you can carry Core but you are nervous about the jump from Starter, run Starter for one month, watch the citation tracker baseline, then upgrade. The pro-rated Core fee for the remainder of the month plus the next 30 days is the safest way to test the content velocity.</p>
      </CalloutBox>

      <InlineCTA variant="audit" />

      <SectionDivider />

      <h2 id="growth-1200-the-entity-authority-tier">Growth at $1,200, the entity authority tier</h2>
      <p>
        Growth adds the part of AI Visibility that compounds the longest. On top of everything in Core, Growth ships GEO entity authority work, Wikipedia and Wikidata presence where the brand qualifies, eight GBP posts per month, eight GBP photos per month, six citations per month, weekly bilingual content production (6 unique blog topics per month split EN and FR-CA), multi-location dashboard up to 3 locations, and competitive monitoring that watches what the AI engines say about the top three competitors in the local pack.
      </p>
      <p>
        Wikidata in particular is the unsung lever. The AI engines lean heavily on structured open data when they pick which local entity to cite, and a clean Wikidata item with proper P-properties (founder, address, area served, official website, social profiles) often unlocks citation share in queries the brand never targeted directly. Growth is the tier that ships that work.
      </p>

      <QuickQuiz
        question="Which AiLys tier is the first one to include Wikipedia and Wikidata entity authority work?"
        options={[
          'Starter at $300 CAD',
          'Core at $600 CAD',
          'Growth at $1,200 CAD',
          'Agency at $2,500 CAD',
        ]}
        correctIndex={2}
        explanation="Growth at $1,200 CAD per month is the first tier that ships GEO entity authority, including Wikipedia and Wikidata where the brand qualifies. Starter and Core focus on GBP, citations, and content, while Agency adds multi-location infrastructure on top of everything in Growth."
      />

      <h3>Growth monthly deliverables on top of Core</h3>
      <ul>
        <li>GEO entity authority work (knowledge graph signals, structured data alignment)</li>
        <li>Wikipedia and Wikidata presence where eligible</li>
        <li>8 GBP posts per month, 8 photos per month</li>
        <li>6 citations per month (max per domain)</li>
        <li>Weekly bilingual content production (6 unique blog topics per month, EN+FR)</li>
        <li>Multi-location dashboard up to 3 locations</li>
        <li>Competitive monitoring across the AI engines</li>
      </ul>

      <SectionDivider />

      <h2 id="agency-2500-the-multi-location-tier">Agency at $2,500, the multi-location tier</h2>
      <p>
        Agency is built for partners and for operators with several brands or several locations. On top of everything in Growth, Agency ships an unlimited multi-location dashboard, white-label PDF reporting (so a partner can hand a branded deliverable to their own client), a Slack SLA under four hours during business days, API access, custom integrations, twelve GBP posts per month, up to twelve photos per month per domain, eight citations per month per domain, daily AI Visibility probes, all schema layers plus custom JSON-LD, eight unique blog topics per month per domain, and a dedicated senior strategist who runs the account end to end.
      </p>
      <p>
        The Reviuzy review automation add-on bundles into Agency at no extra cost. For a multi-location operator that already pays for review automation separately, that bundling alone covers a meaningful slice of the tier upgrade math. API access at this tier is the other operator-grade lever: anything that runs in the dashboard can be triggered from a partner's own backend, so the citation tracker output, the GBP post scheduler, and the photo uploader can all sit inside an existing partner workflow.
      </p>

      <CalloutBox type="warning">
        <p>Agency is not a "premium Starter". It is a different scope built for multi-location and partner workflows. If you operate a single location, even a high-end one, Growth at $1,200 is almost always the right ceiling. Agency makes sense when the dashboard handles three or more domains, or when white-label PDFs leave the building.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="add-ons-and-how-to-stack-them">Add-ons and how to stack them</h2>
      <p>
        Add-ons attach to any tier and price independently. The list is small on purpose, every add-on is a real product with its own scope, none of them are repackaged tier features.
      </p>

      <ul>
        <li>Reviuzy review automation: $100 per month (bundled at no cost in Agency)</li>
        <li>Domain Shield: $35 per month for monitoring of brand impersonation, look-alike domains, and citation poisoning</li>
        <li>Domain Speed Boost: $35 per month for performance work that pushes Core Web Vitals into the green band</li>
        <li>Dedicated strategist: $35 per month for direct strategist time on Starter, Core, or Growth (Agency includes a senior strategist by default)</li>
        <li>Premium Ops trio: $79 per month bundling Domain Shield, Speed Boost, and Dedicated strategist for operators who want all three</li>
        <li>Extra languages: $50 per month each for content production beyond EN and FR-CA</li>
      </ul>

      <p>
        A common Starter stack that ships well is Starter plus Reviuzy ($400 per month total) for a clinic that wants the citation tracker plus full review automation. A common Core stack is Core plus Premium Ops trio ($679 per month total) for a law office that wants the content cadence plus the safety and performance layer. See the <InternalLink to="/blog/reviuzy-review-automation-guide" title="Reviuzy review automation guide" description="What ships in the $100 add-on" /> for the Reviuzy scope detail.
      </p>

      <InlineCTA variant="book" text="Want a 30-minute call to map your add-on stack against the tier ceiling, no pitch?" />

      <SectionDivider />

      <h2 id="month-to-month-and-the-30-day-guarantee">Month-to-month and the 30-day guarantee</h2>
      <p>
        Every plan is month-to-month with a 30-day satisfaction guarantee. The math is simple. If the first month does not meet expectations (citation share did not move, deliverables did not ship, the dashboard does not feel right), the plan ends without penalty. This is the same rule for every tier and every add-on. We do not write annual contracts and we do not gate the guarantee behind a setup fee.
      </p>
      <p>
        The reason we ship that policy is operator math. Local owners typically run on tight cash flow and an annual contract on a service they have not tested before is a hard sell. The 30-day guarantee plus the free 24-hour audit means an operator can see the citation gaps, run a single month of work, and decide on month two with full information.
      </p>

      <SectionDivider />

      <h2 id="how-to-pick-a-tier">How to pick a tier</h2>
      <p>
        Three questions decide the tier. First, do you want content produced for you in EN and FR-CA every week? If yes, Core at $600 is the floor. If no, Starter at $300 covers the GBP and citation tracker baseline. Second, does the brand qualify for Wikipedia or Wikidata, or do you want competitive monitoring across the AI engines? If yes, Growth at $1,200 is the right tier. Third, do you operate three or more domains, or do you ship work under a partner brand? If yes, Agency at $2,500 is the operator-grade fit.
      </p>
      <p>
        For most single-location operators in Quebec, the right starting tier is Core at $600 with the option to add Premium Ops trio when budget allows. Growth becomes the right tier once the brand has a Wikipedia or Wikidata foothold to defend, or once two competitors in the local pack also start citing weekly content. Run the free <InternalLink to="/audit" title="Free 24-hour AI Visibility audit" description="See citation gaps before picking a tier" /> first, then read the live <InternalLink to="/pricing" title="Pricing matrix" description="Tier-by-tier deliverable list" /> with your own gaps in front of you.
      </p>

      <InlineCTA variant="pricing" text="Read the live tier matrix with deliverables, add-ons, and the 30-day guarantee in plain language." />

      <SectionDivider />

      <KeyTakeaway
        points={[
          'Starter at $300 CAD ships technical SEO, GBP, NAP, monthly AI Visibility probe, 4 GBP posts, 4 photos and 2 citations per month.',
          'Core at $600 CAD adds AEO schema, 4 monthly citations, bilingual content, 6 GBP posts, 6 photos per month, weekly AI Visibility, sentiment analysis.',
          'Growth at $1,200 CAD adds GEO entity authority, Wikipedia and Wikidata, 8 GBP posts, 8 photos, 6 citations per month, weekly content, multi-location dashboard up to 3.',
          'Agency at $2,500 CAD adds multi-location dashboard, white-label PDF, Slack SLA under 4 hours, API access, dedicated senior strategist, and bundles Reviuzy.',
          'Every plan is month-to-month with a 30-day satisfaction guarantee. Add-ons stack independently on any tier.',
        ]}
      />

      <SectionDivider />

      <h2 id="faq">Frequently Asked Questions</h2>
      {meta.faqItems.map((f, i) => (
        <details key={i} className="my-3 rounded-lg border border-white/10 bg-white/[0.02] p-4">
          <summary className="cursor-pointer font-semibold text-white/90">{f.question}</summary>
          <p className="mt-3 text-white/70 text-[0.95rem]">{f.answer}</p>
        </details>
      ))}

      <img
        src={meta.images.end}
        alt="Decision matrix to pick the right AiLys tier based on content needs, entity authority, and multi-location scope"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
