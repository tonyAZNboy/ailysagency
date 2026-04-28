/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import { AUTHORS } from '../../authors'
import {
  CalloutBox,
  InlineCTA,
  StatHighlight,
  KeyTakeaway,
  QuickQuiz,
  InternalLink,
  SectionDivider,
} from '../../components/shared'

export const meta: BlogPostMeta = {
  slug: 'yellow-pages-canada-citation-cleanup',
  title: 'Yellow Pages Canada citation cleanup, Yelp and Pages Jaunes for Quebec',
  metaDescription:
    'Should a Quebec restaurant list on both Yelp and Yellow Pages Canada (yellowpages.ca, pagesjaunes.ca)? The honest answer, the NAP rules, and the cleanup playbook.',
  tldr:
    'Yes, a Quebec restaurant should list on Yelp, on Yellow Pages Canada (yellowpages.ca), and on Pages Jaunes (pagesjaunes.ca, the French brand of Yellow Pages Canada owned by the same parent). The catch is NAP consistency: same name, same address with the right accents, same phone format, same hours, on every directory. Mismatches across these three citations cost more than skipping one of them.',
  category: 'local-seo',
  tags: ['citations', 'yellow pages', 'pages jaunes', 'yelp', 'quebec', 'nap', 'local-seo'],
  publishedDate: '2026-03-31',
  updatedDate: '2026-03-31',
  author: AUTHORS.strategy,
  readTimeMinutes: 9,
  images: {
    hero: '/blog-images/yellow-pages-canada-citation-cleanup/hero.webp',
    mid: '/blog-images/yellow-pages-canada-citation-cleanup/mid.webp',
    end: '/blog-images/yellow-pages-canada-citation-cleanup/end.webp',
  },
  faqItems: [
    {
      question: 'Should a Quebec restaurant list on both Yelp and Yellow Pages?',
      answer:
        'Yes, both. Yelp drives a meaningful share of pre-purchase research traffic and feeds Apple Maps, Siri, and Alexa with local data. Yellow Pages Canada (yellowpages.ca) is one of the top 10 highest-authority business directories in Canada and feeds many secondary aggregators. The same applies to Pages Jaunes (pagesjaunes.ca), the French brand of Yellow Pages Canada under the same parent. The cost is in NAP consistency, not in choosing one over the other.',
    },
    {
      question: 'Are Yellow Pages Canada and Pages Jaunes the same company?',
      answer:
        'Yes, sort of. Yellow Pages Canada (the parent company often abbreviated as YP) operates both yellowpages.ca and pagesjaunes.ca. The two domains share much of the same backend listing database, but the public-facing brands are separated for the bilingual market: yellowpages.ca serves the English-Canada audience, pagesjaunes.ca serves Quebec and other French-speaking pockets. Both should appear on a Quebec local citation list, with the listing surface targeted to the right language.',
    },
    {
      question: 'How important is Yelp for Quebec local businesses in 2026?',
      answer:
        'Less important than five years ago, still meaningful. Yelp traffic has declined in Quebec relative to Google Maps and Apple Maps, but Yelp still feeds Apple Maps, Siri, and Alexa with restaurant and service data. For restaurants specifically, Yelp also feeds OpenTable and several reservation aggregators. A clean Yelp listing with current photos, hours, and replies to reviews is worth the maintenance, even if direct Yelp traffic is modest.',
    },
    {
      question: 'What if my Yellow Pages listing has the wrong NAP and I cannot edit it?',
      answer:
        'Most legacy Yellow Pages listings can be edited through the YP business portal at no cost. The free edit covers name, address, phone, hours, and website. Some legacy listings duplicated through scraping require a manual claim, which YP processes within 5 to 10 business days. If the duplicate is on yellowpages.ca and a clean original is on pagesjaunes.ca, ask YP support to merge the records rather than editing the duplicate, otherwise the bad NAP keeps surfacing.',
    },
    {
      question: 'Does NAP inconsistency across these directories really hurt rankings?',
      answer:
        'Yes, both for Google local pack ranking and for AI engine entity resolution. Google reads citation consistency as a trust signal, and Quebec adds the bilingual layer where accent mismatches (Sainte-Catherine vs Sainte Catherine) split the entity. AI engines (ChatGPT, Perplexity, Claude, Gemini) pull from these directories during retrieval and treat conflicting NAP as multiple entities until they reconcile, weakening citations across all variants. The cost compounds across the citation graph.',
    },
    {
      question: 'How long does a 50-directory NAP cleanup take?',
      answer:
        'Four to six weeks of operator work. Week one locks the canonical NAP record. Weeks two and three fix the top ten directories by domain authority (Google Business Profile, Yelp, Yellow Pages Canada, Pages Jaunes, Apple Business Connect, Bing Places, Facebook, Foursquare, TomTom, HERE). Weeks four to six fix the long tail of secondary aggregators. AiLys ships this cleanup work as part of the Core tier deliverable on a 6-week schedule.',
    },
  ],
  relatedSlugs: ['nap-consistency-audit-quebec', 'apple-business-connect-canada-setup'],
  headings: [
    { id: 'the-honest-answer-list-on-both', text: 'The honest answer, list on both' },
    { id: 'yellow-pages-and-pages-jaunes-the-same-parent', text: 'Yellow Pages and Pages Jaunes, the same parent' },
    { id: 'why-yelp-still-matters-in-quebec', text: 'Why Yelp still matters in Quebec' },
    { id: 'the-canonical-nap-record', text: 'The canonical NAP record' },
    { id: 'the-six-week-cleanup-schedule', text: 'The six-week cleanup schedule' },
    { id: 'bilingual-listings-and-accent-rules', text: 'Bilingual listings and accent rules' },
    { id: 'measuring-the-impact-on-local-pack', text: 'Measuring the impact on local pack and AI engines' },
    { id: 'common-cleanup-mistakes', text: 'Common cleanup mistakes' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        A Quebec restaurant owner asked us last week whether listing on both Yelp and Yellow Pages was worth the effort, given how much Google Maps dominates restaurant discovery in 2026. The honest answer is yes, list on both. Add Pages Jaunes too. The work is not in choosing one directory over another, the work is in NAP consistency across the three at once. This playbook walks the why, the canonical record, and the six-week cleanup schedule for a Quebec restaurant juggling Yelp, yellowpages.ca, and pagesjaunes.ca.
      </p>

      <StatHighlight
        stats={[
          { value: '3', label: 'Citations to maintain: Yelp, Yellow Pages, Pages Jaunes' },
          { value: '6 weeks', label: 'AiLys schedule for a 50-directory NAP cleanup' },
          { value: 'EN and FR', label: 'Bilingual listing surface for Quebec restaurants' },
        ]}
      />

      <SectionDivider />

      <h2 id="the-honest-answer-list-on-both">The honest answer, list on both</h2>
      <p>
        Yelp still drives a meaningful slice of pre-purchase research traffic for restaurants, even in 2026 when Google Maps owns the top of the local pack. The reason is downstream: Yelp feeds Apple Maps, Siri, Alexa, OpenTable, and several reservation aggregators with restaurant data, hours, photos, and review summaries. A Quebec restaurant that ignores Yelp surrenders the Apple ecosystem at no cost saving, since the Yelp listing maintenance work is modest after the initial setup.
      </p>
      <p>
        Yellow Pages Canada (yellowpages.ca) is one of the top 10 highest-authority business directories in Canada by domain authority and inbound link profile. Many secondary aggregators (411.ca, Cylex, Hotfrog, FindOpen) scrape Yellow Pages as their primary source for Canadian listings, which means a clean YP listing flows down to dozens of secondary citations automatically. Skipping Yellow Pages costs the business those downstream citations and the trust signal that comes with them.
      </p>

      <CalloutBox type="info">
        <p>For the foundational definition of NAP and why it matters, see <InternalLink to="/glossary/nap" title="NAP glossary entry" description="Name, Address, Phone consistency across local citations" />. Cleanup work assumes you already understand the canonical record discipline, but the glossary entry catches readers up in two minutes.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Want a free audit that scans Yelp, Yellow Pages Canada, Pages Jaunes, GBP, and 47 other directories for NAP mismatches? Run the AiLys 24-hour audit." />

      <SectionDivider />

      <h2 id="yellow-pages-and-pages-jaunes-the-same-parent">Yellow Pages and Pages Jaunes, the same parent</h2>
      <p>
        Pages Jaunes (pagesjaunes.ca) is the French brand of Yellow Pages Canada, owned by the same parent company often abbreviated as YP. The two public-facing domains share much of the backend listing database, but the brand split exists to serve the bilingual market: yellowpages.ca for English Canada, pagesjaunes.ca for Quebec and other French-speaking pockets. The split is real, the SEO surface is real, and a Quebec local business should claim both listings even though the parent is the same.
      </p>
      <p>
        Why both? Two reasons. First, the user-facing search experience differs between the two domains. A French-language search on pagesjaunes.ca returns French listings with French street name spellings, French category labels, and French review snippets. The same query on yellowpages.ca returns the English-language version. Second, the inbound link profiles of the two domains differ, and Google reads the two as separate citation sources for trust scoring. The combined trust signal from a clean listing on both is higher than either alone.
      </p>

      <h3>What changes between the two listings</h3>
      <ul>
        <li>Business name: same legal name on both, but the description and tagline can be language-specific</li>
        <li>Address: identical street address, but the spelling on pagesjaunes.ca should carry French street accents (rue Sainte-Catherine, boulevard Rene-Levesque with the proper accents)</li>
        <li>Phone: identical phone number, identical format</li>
        <li>Hours: identical hours, but day labels are auto-translated by the platform</li>
        <li>Categories: pick the closest match in each language, not always a literal translation (the YP category taxonomy differs between the two domains)</li>
      </ul>

      <SectionDivider />

      <h2 id="why-yelp-still-matters-in-quebec">Why Yelp still matters in Quebec</h2>
      <p>
        Yelp direct traffic in Quebec has declined relative to Google Maps and Apple Maps over the last five years. The honest read is that Yelp is no longer a top-three pre-purchase research surface for Quebec users on its own. What it still does is feed downstream platforms that matter: Apple Maps reads Yelp data heavily, Siri voice queries pull from Apple Maps and therefore from Yelp, Alexa pulls from Yelp for restaurant queries, and OpenTable plus several reservation aggregators sync to Yelp listing data.
      </p>
      <p>
        For a Quebec restaurant, that downstream feed is the value. A clean Yelp listing with current photos, accurate hours, the right category (Italian, Vietnamese, French Bistro), and replies to recent reviews flows down to Apple Maps and the reservation aggregators automatically. Skipping Yelp leaves those downstream surfaces with stale or missing data, which costs more than the maintenance work of keeping the Yelp listing fresh.
      </p>

      <CalloutBox type="warning">
        <p>The one exception where Yelp gets ignored: businesses with a long history of fake or weaponized Yelp reviews where the platform refused to remove them. In that narrow case, doubling down on GBP, Apple Business Connect, and Yellow Pages while letting the Yelp listing run on minimal maintenance is the pragmatic call. The new reviews still surface, but the operator stops pouring time into a hostile review surface.</p>
      </CalloutBox>

      <QuickQuiz
        question="A Quebec restaurant owner asks if Pages Jaunes and Yellow Pages Canada are the same company. What is the right answer?"
        options={[
          'No, they are competing directories owned by different parent companies',
          'Yes, both are operated by Yellow Pages Canada, with separate domains for English and French audiences',
          'No, Pages Jaunes is a France-based directory unrelated to Yellow Pages Canada',
          'Yes, but they are merging into a single domain in 2026',
        ]}
        correctIndex={1}
        explanation="Yellow Pages Canada (the parent company often abbreviated as YP) operates both yellowpages.ca and pagesjaunes.ca. The two domains share much of the backend database, but the public-facing brands are separated for the bilingual market. A Quebec local business should claim both listings."
      />

      <SectionDivider />

      <h2 id="the-canonical-nap-record">The canonical NAP record</h2>
      <p>
        Before touching any directory, lock the canonical NAP record. This is the single source of truth that every citation will mirror. The record covers seven fields, not three: name, address with accents, phone with format, hours, website URL, primary category, and short description. Treat the record as a contract with future-you. Once it is locked, no directory edit deviates from it without updating the canonical record first.
      </p>

      <h3>The canonical record fields and the discipline</h3>
      <ul>
        <li>Name: legal name as registered with the Quebec Registraire des entreprises, no abbreviations, no slogans appended</li>
        <li>Address: full street address with proper French accents (rue Sainte-Catherine, boulevard Rene-Levesque with their accents intact), suite number consistently formatted, city name and postal code in standard Canada Post format</li>
        <li>Phone: one phone format used everywhere (514 555 0100 with spaces, or 514-555-0100 with hyphens, but not both across listings)</li>
        <li>Hours: standard 7-day hours including holiday hours noted for the next 12 months</li>
        <li>Website: canonical URL with or without the www prefix, but consistent everywhere; no UTM parameters in the listing URL</li>
        <li>Primary category: closest match across each platform, mapped from the GBP primary category</li>
        <li>Short description: 250 characters, hand-written for each language (EN and FR-CA), no machine translation</li>
      </ul>

      <p>
        Lock the record in a spreadsheet or a Notion doc and treat it as the canonical source for all 50 directories. AiLys ships the canonical record as the first deliverable on the Core tier, before any citation work begins. The cleanup is only as good as the canonical record behind it.
      </p>

      <InlineCTA variant="pricing" text="See the AiLys tiers that include canonical NAP record building, citation cleanup, and bilingual directory work." />

      <SectionDivider />

      <h2 id="the-six-week-cleanup-schedule">The six-week cleanup schedule</h2>
      <p>
        A 50-directory cleanup runs on a six-week schedule when handled by one operator with strategist support. The schedule front-loads the highest-authority directories so the trust signal lift starts early.
      </p>

      <h3>Week-by-week cleanup map</h3>
      <ol>
        <li>Week 1: Lock the canonical NAP record. Audit existing citations across the 50 target directories. Build the mismatch list grouped by name, address, phone, hours, website.</li>
        <li>Week 2: Fix Google Business Profile, Apple Business Connect, Bing Places. These three feed the major map ecosystems and AI engines. Confirm GBP categories and primary category match the canonical record.</li>
        <li>Week 3: Fix Yelp, Yellow Pages Canada (yellowpages.ca), Pages Jaunes (pagesjaunes.ca), Facebook. These four cover the bilingual citation surface and feed downstream aggregators.</li>
        <li>Week 4: Fix Foursquare, TomTom, HERE, OpenTable (for restaurants), and the GPS data aggregators that feed automotive navigation systems.</li>
        <li>Week 5: Fix the next 20 directories by Canadian domain authority, including 411.ca, Cylex, Hotfrog, FindOpen, Canada411.</li>
        <li>Week 6: Fix the long tail and run a verification scan. The verification scan probes each citation again to confirm the fix held and to catch any reverts from automated scrapers.</li>
      </ol>

      <p>
        The six-week schedule is realistic for one operator working two hours a day on the cleanup. Compressing to four weeks is possible but adds operator overtime and increases the error rate. Stretching to eight weeks is fine if the operator runs the cleanup as a side stream alongside other work. For multi-location operators, multiply the schedule per location and add a coordination week at the end.
      </p>

      <img
        src={meta.images.mid}
        alt="Six-week NAP citation cleanup gantt chart for a Quebec restaurant covering Yelp, Yellow Pages, Pages Jaunes, GBP, Apple Business Connect"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="bilingual-listings-and-accent-rules">Bilingual listings and accent rules</h2>
      <p>
        Quebec adds a bilingual layer that the rest of North America does not. Street names like rue Sainte-Catherine, boulevard Rene-Levesque (with the proper accents on Rene-Levesque), avenue du Mont-Royal, and rue Saint-Denis must carry their accents on every citation. A listing that drops the accents on yellowpages.ca but keeps them on pagesjaunes.ca creates an entity split inside Google and inside the AI engines. The two variants are read as separate businesses until the engine reconciles them, which takes weeks and weakens the trust signal in the meantime.
      </p>
      <p>
        The discipline is simple: pick one canonical accent-bearing form and use it everywhere, including on the English-language directories. yellowpages.ca accepts French accents in the address field without trouble, Yelp accepts them, GBP accepts them, Apple Business Connect accepts them. Bing Places sometimes strips accents during normalization, so verify the listing after submission. Facebook accepts accents but its address validator occasionally flags valid Quebec addresses; in that case, save the listing manually past the validator.
      </p>

      <CalloutBox type="tip">
        <p>For the restaurant industry playbook specifically, see <InternalLink to="/industries/restaurants" title="Restaurant industry playbook" description="Local SEO and AI Visibility for Quebec restaurants and food service" />. The playbook covers menu schema, OpenTable integration, photo cadence, and the Yelp plus Yellow Pages plus Pages Jaunes citation stack as one coordinated workflow.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="measuring-the-impact-on-local-pack">Measuring the impact on local pack and AI engines</h2>
      <p>
        The right measurement runs on two surfaces in parallel. On the local pack side, track share of voice on a locked grid of high-intent queries (best Italian restaurant Plateau, sushi delivery Mile End, family restaurant Laval, brunch Vieux-Port) over the six-week cleanup window. A clean NAP cleanup typically lifts local pack share of voice by 8 to 15 percentage points over the first quarter, with most of the lift landing in weeks 6 to 10 after the cleanup completes.
      </p>
      <p>
        On the AI engine side, run a weekly probe of ChatGPT, Perplexity, Claude, Gemini, Bing Copilot, and Google AIO on the same query set. Track citation share, the percentage of queries where the business is named in the AI answer with a clean attribution. AiLys runs this probe automatically inside the AI Visibility audit. For the audit hub, see <InternalLink to="/audit" title="Free AI Visibility audit" description="Includes NAP citation scan, GBP probe, and AI engine citation share" />.
      </p>

      <SectionDivider />

      <h2 id="common-cleanup-mistakes">Common cleanup mistakes</h2>
      <p>
        Three patterns derail NAP cleanups at most local businesses. Each costs time and citation trust.
      </p>

      <ol>
        <li>Editing duplicate listings instead of merging them. If a Yellow Pages listing has a duplicate from scraper data, ask YP support to merge the records rather than fixing one and ignoring the other. Fixing the wrong duplicate leaves the bad NAP live.</li>
        <li>Using machine translation for the French listing description. The 250-character description on pagesjaunes.ca should be hand-written in Quebec French, not translated from the English description. Machine translation breaks the regional spelling discipline that Google reads.</li>
        <li>Skipping the verification scan in week 6. Several scrapers re-overwrite listings with stale data within 30 days of the cleanup. The verification scan catches the reverts and triggers a second-pass fix before the bad NAP propagates back through the citation graph.</li>
      </ol>

      <p>
        AiLys ships the cleanup with the canonical record build, the bilingual hand-written descriptions, the merge-not-edit discipline on duplicate listings, and the week-6 verification scan. For operators on the Starter tier, the cleanup is delivered as a one-time engagement at 1,499 dollars CAD for a 50-directory scope.
      </p>

      <InlineCTA variant="book" text="Want a 60-minute walk-through of Yelp, Yellow Pages Canada, and Pages Jaunes citation cleanup for your Quebec business? Book a no-pitch session." />

      <KeyTakeaway
        points={[
          'Yes, list on both Yelp and Yellow Pages. Add Pages Jaunes (pagesjaunes.ca) for Quebec, the French brand of Yellow Pages Canada under the same parent.',
          'NAP consistency across all three matters more than which directory you pick. Lock a canonical record before any cleanup work.',
          'A 50-directory cleanup runs on a six-week schedule with one operator working two hours a day.',
          'Quebec accents on French street names must be identical across all citations. Mismatch creates entity splits in Google and AI engines.',
          'Run a verification scan in week 6 to catch scraper-driven reverts before the bad NAP propagates back.',
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
        alt="Verification scan results showing matched NAP across Yelp, Yellow Pages, Pages Jaunes, GBP and Apple Business Connect for a Quebec restaurant"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
