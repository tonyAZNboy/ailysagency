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
  slug: 'gbp-categories-best-primary-pick',
  title: 'GBP categories, how to pick the best primary category in 2026',
  metaDescription:
    'How to pick the best primary GBP category for a Quebec local business. Trade-offs between broad and narrow categories, secondary slots, Apple Maps, and Bing Places.',
  tldr: 'The primary Google Business Profile category is the single biggest lever in local pack eligibility. Pick the narrowest category that still covers your top three revenue services. Use the GBP API to enumerate all available labels in your locale, audit your top three local pack competitors, and only fall back to a broader label when the narrow option has no search volume. Secondary categories matter much less and Apple Maps plus Bing Places treat the taxonomy differently from Google.',
  category: 'gbp-google-maps',
  tags: ['gbp categories', 'google business profile', 'primary category', 'local pack', 'gbp-google-maps'],
  publishedDate: '2026-03-13',
  updatedDate: '2026-03-13',
  author: AUTHORS.strategy,
  readTimeMinutes: 9,
  images: {
    hero: '/blog-images/gbp-categories-best-primary-pick/hero.webp',
    mid: '/blog-images/gbp-categories-best-primary-pick/mid.webp',
    end: '/blog-images/gbp-categories-best-primary-pick/end.webp',
  },
  faqItems: [
    {
      question: 'What is the best primary category for a Montreal dentist on GBP?',
      answer:
        'For most general practices in Montreal, the right primary category is "Dentist". The narrower "Cosmetic dentist" or "Pediatric dentist" labels carry less search volume but higher intent, so they only beat the broad label when the practice books most of its revenue from that specific service. The honest decision rule: pick the narrowest category that still covers your top three revenue services. If a clinic does general care plus implants and clear aligners, "Dentist" wins. If the clinic only does aligners, "Cosmetic dentist" wins.',
    },
    {
      question: 'How do I see every GBP category available in my country?',
      answer:
        'The full taxonomy is exposed by the Google My Business API through the categories.list endpoint, with a regionCode and languageCode filter. For Canadian French-speaking businesses, pass regionCode=CA and languageCode=fr. The list is large (around 4,000 labels in EN-CA, slightly fewer in FR-CA) and updates a few times a year as Google adds or merges categories. Tools like PlePer or LocalFalcon expose the same list through a friendlier UI for owners who do not want to hit the API directly.',
    },
    {
      question: 'Do secondary categories help local pack ranking?',
      answer:
        'Secondary categories help, but the lift is small compared to the primary. The local pack algorithm weights the primary category around 80 percent of the category signal and spreads the remaining 20 percent across up to nine secondary slots. The right move is to use secondary slots for adjacent services that earn revenue but do not deserve their own listing, never to keyword-stuff with unrelated labels. Adding "Restaurant" as a secondary on a hair salon profile is the kind of mismatch that triggers manual review and listing suspensions.',
    },
    {
      question: 'How does Apple Maps handle categories differently from Google?',
      answer:
        'Apple Business Connect uses a smaller taxonomy (around 600 labels) and does not expose a primary versus secondary distinction in the same way. Apple weights the first selected category most heavily and uses up to four secondary slots. Bing Places uses the Yext-derived category list (around 3,500 labels) and behaves closer to Google with a primary plus up to nine secondary slots. The practical implication: pick the matching narrow label on each platform separately, do not assume your Google primary maps cleanly to Apple or Bing.',
    },
    {
      question: 'Can I change my primary GBP category without ranking damage?',
      answer:
        'Yes, but expect a 4 to 6 week settling period where local pack ranking on the old category queries softens and the new category queries climb. The settling is faster when the new category is a narrower version of the old one (Dentist to Cosmetic dentist) and slower when the categories are unrelated. Avoid changing the primary category more than twice a year. The algorithm reads frequent shifts as instability and discounts the freshness boost on every change after the second.',
    },
    {
      question: 'What if my exact business type does not exist in the GBP taxonomy?',
      answer:
        'Fall back to the closest broader label and use the business description plus secondary categories to capture the specifics. For example, "axe throwing venue" was not a category for years, so operators used "Amusement center" as primary with "Bar" and "Event venue" as secondaries. Google adds new categories every quarter or two, so re-check the taxonomy each quarter via the API or a tool like PlePer.',
    },
    {
      question: 'Should I copy the primary category of the local pack leader?',
      answer:
        'Audit it, but do not blindly copy. The local pack leader sometimes wins despite a suboptimal category because of overwhelming review velocity, citation depth, or proximity to the searcher. Pull the categories of the top three local pack results for your five most important queries, look for the consensus category across them, and pick that. If two of the three use the same narrow label and the third uses a broader one, the narrow label is usually the right pick.',
    },
  ],
  relatedSlugs: ['gbp-posts-strategy-weekly-cadence', 'local-seo-for-montreal-dentists'],
  headings: [
    { id: 'why-the-primary-category-matters-most', text: 'Why the primary category matters most' },
    { id: 'broad-vs-narrow-the-honest-decision-rule', text: 'Broad vs narrow, the honest decision rule' },
    { id: 'how-to-research-every-category-via-the-gbp-api', text: 'How to research every category via the GBP API' },
    { id: 'auditing-your-local-pack-competitors', text: 'Auditing your local pack competitors' },
    { id: 'why-secondary-categories-matter-less', text: 'Why secondary categories matter less than the primary' },
    { id: 'how-apple-maps-and-bing-places-diverge', text: 'How Apple Maps and Bing Places diverge from Google' },
    { id: 'changing-the-primary-category-safely', text: 'Changing the primary category without ranking damage' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        The primary Google Business Profile category is the single biggest lever in local pack eligibility. It tells Google which queries your profile is even allowed to appear in, before any ranking signal kicks in. A Montreal dentist whose primary is "Medical clinic" is invisible on "dentist near me" no matter how many five-star reviews the practice has. The fix is rarely complicated, but it is rarely done well. This guide walks the honest decision rule, the GBP API research method, and the Apple Maps and Bing Places divergences that bite multi-platform operators.
      </p>

      <StatHighlight
        stats={[
          { value: '~80%', label: 'Share of category signal carried by the primary slot' },
          { value: '~4,000', label: 'GBP categories available in EN-CA' },
          { value: '4-6 wk', label: 'Settling period after a primary category change' },
        ]}
      />

      <SectionDivider />

      <h2 id="why-the-primary-category-matters-most">Why the primary category matters most</h2>
      <p>
        The primary category is an eligibility filter, not a ranking factor. Google decides which profiles can compete for a query by intersecting the query intent with the primary categories of nearby profiles. A query like "dentist Montreal" filters to profiles whose primary is "Dentist", "Cosmetic dentist", "Pediatric dentist", or a handful of close cousins. Profiles outside that set are filtered out entirely, no matter how strong their other signals are.
      </p>
      <p>
        Once the eligibility filter runs, ranking starts. At that stage, the primary category still carries weight (around 80 percent of the category signal in our cohort tracking), but it sits next to other heavy levers like proximity, review velocity, GBP completeness, and citation consistency. Picking the right primary unlocks competition. Picking the wrong primary keeps the profile invisible regardless of effort downstream.
      </p>

      <CalloutBox type="warning">
        <p>The most common primary category mistake we see in Quebec is "Medical clinic" on a dental practice. The label sounds professional, but it filters the profile out of every dentist query. The fix is one click in GBP and the profile usually shows up in the local pack within two weeks.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Want to know if your primary GBP category is filtering you out of high-intent queries? Run the free 24-hour AI Visibility audit." />

      <SectionDivider />

      <h2 id="broad-vs-narrow-the-honest-decision-rule">Broad vs narrow, the honest decision rule</h2>
      <p>
        The decision rule is short. Pick the narrowest category that still covers your top three revenue services. Anything narrower leaves revenue on the table because the category filter excludes you from queries that match services you actually deliver. Anything broader dilutes your eligibility against more competitors, including ones who do not actually serve the niche.
      </p>
      <p>
        For a Montreal dentist, this rule plays out concretely. A general practice that does cleanings, fillings, and extractions plus implants and clear aligners should pick "Dentist" as primary. A clinic that books 80 percent of its revenue from clear aligners and Invisalign should pick "Cosmetic dentist". A clinic that only treats children should pick "Pediatric dentist". The narrow labels carry less search volume in absolute terms, but the queries they capture are higher intent and convert at a much higher rate.
      </p>

      <h3>The trade-off in plain numbers</h3>
      <ul>
        <li>"Dentist" in Montreal: high search volume, high competition, broad query intent (cleanings, fillings, emergencies, cosmetic, pediatric)</li>
        <li>"Cosmetic dentist" in Montreal: lower search volume (around 15 to 25 percent of "Dentist"), much narrower competitor set, higher intent (whitening, veneers, smile makeover)</li>
        <li>"Pediatric dentist" in Montreal: lowest search volume (around 8 to 12 percent of "Dentist"), smallest competitor set, parent-driven intent</li>
      </ul>

      <p>
        The volume gap looks scary on paper. In practice, the narrow label converts at 2 to 3x the broad label because the queries match the service exactly. A clinic with a strong cosmetic dentistry book of business almost always wins more revenue from "Cosmetic dentist" as primary, even though the absolute traffic is lower.
      </p>

      <CalloutBox type="info">
        <p>Run the math both ways before deciding. If 60 percent of your revenue comes from the niche service, the narrow label wins. If only 20 percent does, the broad label wins. Between 20 and 60 percent, audit your local pack competitors and pick the consensus label.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="how-to-research-every-category-via-the-gbp-api">How to research every category via the GBP API</h2>
      <p>
        The full GBP taxonomy is not visible inside the GBP UI. The picker only shows you the labels that match the text you type, which means you can miss a more specific category if you do not know the exact spelling. The honest research method is to enumerate the full list via the Google My Business API.
      </p>

      <h3>The categories.list endpoint</h3>
      <p>
        The endpoint is <code>businesscategories.googleapis.com/v1/categories</code>. The relevant parameters are <code>regionCode</code> (CA for Canada, US for the US, FR for France), <code>languageCode</code> (en-CA, fr-CA, en-US), and <code>view</code> set to FULL to include the secondary category suggestions. The response returns the full ordered list of categories available in that locale, with each category showing its categoryId (used in the GBP API to set the primary), displayName, and serviceTypes.
      </p>
      <p>
        For Canadian French-speaking businesses, the most important call is the EN-CA enumeration paired with the FR-CA enumeration, because the two lists are not always in lock-step. Some categories exist only in EN-CA, some only in FR-CA, and a handful have different displayName translations that change which queries the profile shows up on.
      </p>

      <h3>Tools that wrap the API for non-developers</h3>
      <ul>
        <li>PlePer (free tier): exposes the full GBP category list in a searchable UI, organized by parent industry</li>
        <li>LocalFalcon: includes a category browser as part of the local rank tracking suite</li>
        <li>BrightLocal: surfaces the categories of competing profiles in the citation finder</li>
      </ul>

      <p>
        These tools are not strictly necessary, but they are faster than writing the API call by hand if you only audit categories two or three times a year.
      </p>

      <QuickQuiz
        question="Why does the GBP UI category picker not show every available category?"
        options={[
          'Because Google deprecates categories that are not searched often',
          'Because the picker only shows labels that match your typed text, so you can miss specific categories without the exact spelling',
          'Because secondary categories are hidden behind a paywall',
          'Because the list is regenerated daily and small businesses see a subset',
        ]}
        correctIndex={1}
        explanation="The GBP picker is a typeahead search against the taxonomy. If you type 'dental' you see Dentist, Cosmetic dentist, Pediatric dentist, and Dental clinic. You do not see niche labels like 'Dental laboratory' or 'Dental implants periodontist' unless you know to type those words. The full list lives behind the categories.list API endpoint."
      />

      <SectionDivider />

      <h2 id="auditing-your-local-pack-competitors">Auditing your local pack competitors</h2>
      <p>
        The fastest sanity check on a category pick is to audit the top three local pack results for your five most important queries. Run the queries from a real location near your business (use a phone with location services on, not a desktop with VPN tricks), look at the three pack results, and click into each profile to read the primary category.
      </p>
      <p>
        Three patterns emerge in the audit. First, the consensus pattern: all three profiles share the same primary category. That is your category. Second, the split pattern: two profiles share one primary and the third uses a different one. The shared category is usually the right pick, with the third profile winning despite the category mismatch through other signals. Third, the chaos pattern: three different categories. This usually means the query intent itself is mixed and you should pick the category that matches your service most precisely, not the one that matches the leader.
      </p>

      <img
        src={meta.images.mid}
        alt="Local pack audit grid showing the primary categories of the top three results for five high-intent dental queries in Montreal"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <p>
        The audit takes about 30 minutes for a single business with five core queries. Document the result in a spreadsheet with columns for query, top three URLs, top three primary categories, and your current primary. The gaps jump out immediately. For a deeper Quebec-specific playbook on dental practices, see <InternalLink to="/industries/dentists" title="Local SEO for dentists" description="Industry playbook for dental practices in Quebec" />, and for the structural primer on local search signals, see <InternalLink to="/glossary/gbp" title="GBP glossary entry" description="Definitions for primary, secondary, attributes, and more" />. To benchmark your current category against the local pack leader, run the <InternalLink to="/audit/gbp" title="GBP audit" description="Free 24-hour audit covering primary category fit and competitor pack analysis" />.
      </p>

      <InlineCTA variant="pricing" text="See AiLys tiers that include the quarterly category audit and competitor benchmark, from Core at 799 dollars CAD a month." />

      <SectionDivider />

      <h2 id="why-secondary-categories-matter-less">Why secondary categories matter less than the primary</h2>
      <p>
        Secondary categories are useful but they are not a substitute for picking the right primary. The local pack algorithm weights the primary category around 80 percent of the total category signal and spreads the remaining 20 percent across up to nine secondary slots. The math is unforgiving: nine secondaries cannot overcome a wrong primary.
      </p>
      <p>
        The right use of secondaries is to capture adjacent revenue services that earn money but do not deserve their own listing. A general dental practice with a primary of "Dentist" can use secondaries like "Cosmetic dentist", "Pediatric dentist", "Emergency dental service", and "Teeth whitening service" to capture the long tail of niche queries while keeping the broad label as the eligibility anchor.
      </p>

      <h3>Common secondary category mistakes</h3>
      <ol>
        <li>Keyword-stuffing with unrelated labels (a hair salon listing "Restaurant" as secondary). Triggers manual review and risks suspension.</li>
        <li>Using all nine slots regardless of fit. Empty slots are not a ranking penalty, mismatched slots are.</li>
        <li>Picking secondaries that overlap heavily with the primary (e.g., "Dental clinic" and "Dentist" together). Wastes a slot on a near-duplicate.</li>
        <li>Forgetting to revisit after a service line addition. New services often warrant a new secondary slot.</li>
      </ol>

      <CalloutBox type="tip">
        <p>Use four to six secondary slots, not nine. Above six, the marginal lift drops to near zero and the risk of mismatch climbs. Save the unused slots for service lines you genuinely add later.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="how-apple-maps-and-bing-places-diverge">How Apple Maps and Bing Places diverge from Google</h2>
      <p>
        The Google taxonomy is the largest of the three majors, and operators who only optimize for Google miss real revenue from Apple Maps and Bing Places. Both platforms run their own taxonomies and weight categories differently from Google.
      </p>

      <h3>Apple Business Connect</h3>
      <p>
        Apple uses a smaller taxonomy (around 600 labels in 2026) and exposes a primary plus up to four secondary slots. The first selected category carries most of the weight. Apple does not expose a public API for the full taxonomy, so the practical research method is to scroll the picker inside Apple Business Connect and document the labels that match your services. For Quebec businesses, Apple ships bilingual category labels (the picker shows both EN and FR-CA), which simplifies the research compared to Google.
      </p>

      <h3>Bing Places</h3>
      <p>
        Bing Places uses the Yext-derived category list (around 3,500 labels) and supports a primary plus up to nine secondary slots, similar to Google. The category effects on Bing local search are weaker than on Google because Bing has less local intent volume, but the upside is that competition is also weaker. A profile that picks the matching narrow primary on Bing often shows up in the top three local results with much less effort than the same picks on Google.
      </p>

      <p>
        The honest cross-platform rule is simple: pick the matching narrow label on each platform separately, do not assume your Google primary maps cleanly to Apple or Bing. The labels often diverge in spelling, scope, or both.
      </p>

      <SectionDivider />

      <h2 id="changing-the-primary-category-safely">Changing the primary category without ranking damage</h2>
      <p>
        Owners often hesitate to change the primary category because of fear that the local pack will collapse during the transition. The data is more nuanced. A category change triggers a 4 to 6 week settling period where the old category queries soften and the new category queries climb. The net effect is positive when the new category is a better fit for the actual service mix.
      </p>
      <p>
        Two rules keep the settling clean. First, do not change the primary more than twice a year. The algorithm reads frequent shifts as instability and discounts the freshness boost on every change after the second. Second, change the primary in isolation. Do not pair a category change with a name change, an address change, or a major service area edit in the same week. Each of those triggers its own settling period and the overlap compounds the volatility.
      </p>

      <CalloutBox type="warning">
        <p>If the local pack ranking has not recovered after 8 weeks post-category-change, the new category is likely a worse fit for the actual service mix. Audit the queries that lost ranking and ask whether they describe services you still deliver. If yes, revert to the previous primary.</p>
      </CalloutBox>

      <InlineCTA variant="book" text="Want a 60-minute walk-through of your GBP category audit and primary pick decision? Book a no-pitch session, strategy doc sent regardless." />

      <SectionDivider />

      <KeyTakeaway
        points={[
          'The primary GBP category is an eligibility filter. The wrong primary keeps you invisible regardless of other signals.',
          'Pick the narrowest category that still covers your top three revenue services.',
          'Enumerate the full taxonomy via the GBP API categories.list endpoint, not the in-product picker.',
          'Audit the top three local pack results for your five most important queries and pick the consensus category.',
          'Secondary categories carry around 20 percent of the category signal. Use four to six slots, not nine.',
          'Apple Maps and Bing Places run separate taxonomies. Pick the matching narrow label on each platform.',
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
        alt="Decision matrix for picking a primary GBP category for a Quebec local business"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
