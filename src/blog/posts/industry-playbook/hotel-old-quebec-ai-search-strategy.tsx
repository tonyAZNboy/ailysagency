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
  slug: 'hotel-old-quebec-ai-search-strategy',
  title: 'Hotel Old Quebec AI search strategy, beating booking sites in 2026',
  metaDescription:
    'How boutique hotels in Old Quebec compete with Booking, Expedia, and Hotels.com inside ChatGPT, Perplexity, Google AIO, and voice search. Schema, FAQ, and citation playbook.',
  tldr: 'Boutique hotels in Old Quebec lose direct bookings to Booking.com, Expedia, and Hotels.com because AI engines cite the OTAs first. The fix is direct citation work: Hotel schema with the right amenity set, FAQ pages that answer concrete travel questions, NAP consistency across travel directories, and signed local concierge content. Hotels that ship this stack typically pull a measurable share of brand and category queries back into AI answers within a quarter.',
  category: 'industry-playbook',
  tags: ['hotels', 'old quebec', 'ai search', 'booking sites', 'industry-playbook'],
  publishedDate: '2026-04-22',
  updatedDate: '2026-04-22',
  author: AUTHORS.strategy,
  readTimeMinutes: 9,
  images: {
    hero: '/blog-images/hotel-old-quebec-ai-search-strategy/hero.webp',
    mid: '/blog-images/hotel-old-quebec-ai-search-strategy/mid.webp',
    end: '/blog-images/hotel-old-quebec-ai-search-strategy/end.webp',
  },
  faqItems: [
    {
      question: 'How do hotels in Old Quebec compete with booking sites in AI search?',
      answer:
        'Boutique hotels compete by becoming the direct citation source AI engines reach for, not by trying to beat Booking.com on price. The playbook is a stack: Hotel schema markup with full amenity data, FAQ pages that answer real traveler questions like best boutique hotel Old Quebec or hotel near Chateau Frontenac with parking, NAP consistency across travel directories, and signed local concierge content authored by named staff. ChatGPT, Perplexity, and Google AIO cite primary sources when the structured data is clean enough to trust.',
    },
    {
      question: 'What schema markup do boutique hotels need for AI citation?',
      answer:
        'Hotel schema (Schema.org Hotel type) with starRating, priceRange, amenityFeature, checkinTime, checkoutTime, address, and geo coordinates. LocalBusiness schema alone is not enough for hotel queries since AI engines disambiguate by hotel-specific properties. Add FAQPage schema for the top traveler questions, BreadcrumbList for navigation, and Organization schema with sameAs links to Booking, Expedia, TripAdvisor, and the official tourism office. The schema becomes the spine the AI engines lift.',
    },
    {
      question: 'Why does ChatGPT cite Booking instead of my hotel website?',
      answer:
        'ChatGPT cites Booking because the OTA pages have denser structured data, more reviews per property, and stronger trust signals than most boutique hotel sites. The independent hotel page often lacks Hotel schema, has thin FAQ content, and shows fewer cited reviews. The fix is to publish the hotel-specific data the AI engines need: full amenity list, room type breakdown, reception hours, breakfast policy, parking, pet policy, and bilingual concierge content. When the primary site holds the canonical answer, AI engines start citing it alongside or above the OTA.',
    },
    {
      question: 'Does NAP consistency still matter for hotels in 2026?',
      answer:
        'Yes, more than ever inside AI search. NAP (Name, Address, Phone) consistency across Google Business Profile, Apple Business Connect, TripAdvisor, Booking, Expedia, Hotels.com, Tourism Quebec, and the Old Quebec merchant directories is the trust spine AI engines use to verify the hotel exists and is currently operating. A single mismatch (an old phone number on Yellow Pages, a different street format on TripAdvisor) is enough to soften citation rates because the engines hedge when sources disagree.',
    },
    {
      question: 'How long does it take to win AI citations as a boutique hotel?',
      answer:
        'Most properties see measurable citation share movement within 8 to 12 weeks of shipping the full stack. Schema and FAQ pages index inside two to four weeks. NAP cleanup propagates across travel directories over the next month. Concierge content earns its first AI citations once the engines have crawled the bilingual pages and confirmed the structured data lines up. The compounding effect kicks in around month three when reviews, citations, and direct traffic start reinforcing each other.',
    },
  ],
  relatedSlugs: ['restaurant-marketing-montreal-guide', 'why-chatgpt-cites-your-competitor'],
  headings: [
    { id: 'why-otas-win-the-default-ai-citation', text: 'Why OTAs win the default AI citation slot' },
    { id: 'the-hotel-schema-stack-that-actually-cites', text: 'The Hotel schema stack that actually earns citations' },
    { id: 'faq-pages-for-real-traveler-questions', text: 'FAQ pages for real traveler questions' },
    { id: 'nap-across-travel-directories', text: 'NAP consistency across travel directories' },
    { id: 'local-concierge-content-old-quebec', text: 'Local concierge content, the Old Quebec edge' },
    { id: 'reviews-and-the-citation-feedback-loop', text: 'Reviews and the citation feedback loop' },
    { id: 'a-90-day-rollout-for-boutique-hotels', text: 'A 90 day rollout for boutique hotels' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        A traveler asks ChatGPT for the best boutique hotel near Chateau Frontenac. The answer cites Booking.com, Expedia, and Hotels.com. The hotel that actually owns the property, the one with the bilingual concierge and the seventeenth century stonework, is nowhere in the citation set. This is the default state for most boutique hotels in Old Quebec inside AI search, and it is fixable. The path is direct citation work: Hotel schema, FAQ pages, NAP consistency, and signed local concierge content that gives the AI engines a primary source they trust more than the OTA.
      </p>

      <StatHighlight
        stats={[
          { value: '8-12 weeks', label: 'Typical time to measurable AI citation share' },
          { value: '4-6', label: 'Travel directories that need NAP cleanup' },
          { value: 'EN and FR', label: 'Bilingual concierge content baseline' },
        ]}
      />

      <SectionDivider />

      <h2 id="why-otas-win-the-default-ai-citation">Why OTAs win the default AI citation slot</h2>
      <p>
        Booking.com, Expedia, and Hotels.com win the default citation slot because their pages are denser than the average boutique hotel website. Each property page on an OTA carries Hotel schema, hundreds of reviews, structured amenity data, room type breakdowns, and verified address fields. The independent hotel website often has a hero image, a contact form, and a booking widget. ChatGPT, Perplexity, and Google AIO read the OTA page as the more authoritative source because the structured data is more complete.
      </p>
      <p>
        The frustrating part for owners is that the OTA page is a copy of data the hotel originally provided. Booking did not invent the amenity list. The hotel sent it, then Booking wrapped it in better schema and richer review density. The fix is not to leave Booking, the fix is to publish the same data on the hotel website with stronger schema and bilingual depth, so the AI engines have a primary source to cite alongside or above the OTA.
      </p>
      <p>
        Old Quebec adds a second wrinkle. Travel queries about the historic district pull from Tourism Quebec, the Old Quebec merchant association directory, and bilingual heritage guides. Hotels that show up in these directories with consistent NAP and schema get cited as part of the historic experience, not just as a room to sleep in. That positioning is worth real bookings.
      </p>

      <CalloutBox type="info">
        <p>The boutique hotels that win AI citations in Old Quebec all share three traits. They publish bilingual content that names specific neighborhoods (Petit Champlain, Place Royale, Quartier du Petit Champlain), they carry full Hotel schema with amenity arrays, and they keep NAP consistent across at least six travel directories. None of these are exotic moves. They just compound.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Curious where your hotel ranks in ChatGPT and Perplexity for Old Quebec queries today? Run the free 24 hour AI Visibility audit, citation gaps named per engine." />

      <SectionDivider />

      <h2 id="the-hotel-schema-stack-that-actually-cites">The Hotel schema stack that actually earns citations</h2>
      <p>
        Schema is the structured spine AI engines lift. For a boutique hotel, the right stack is Hotel (Schema.org type), not LocalBusiness. The Hotel type carries properties the AI engines need: starRating, priceRange, amenityFeature (an array of LocationFeatureSpecification), checkinTime, checkoutTime, numberOfRooms, petsAllowed, smokingAllowed, address (PostalAddress with full streetAddress, addressLocality, addressRegion, postalCode, addressCountry), and geo coordinates. Each property is a citation hook.
      </p>
      <p>
        Add FAQPage schema for the top traveler questions. The questions become AI Overview answers and voice search responses. Add BreadcrumbList so the navigation reads cleanly to crawlers. Add Organization schema with a sameAs array linking to your Booking, Expedia, TripAdvisor, Tourism Quebec, and Google Business Profile pages. The sameAs array tells the AI engines all these pages reference the same entity, which strengthens entity resolution.
      </p>

      <h3>Required Hotel schema properties for Old Quebec boutique hotels</h3>
      <ul>
        <li>starRating with bestRating set to the actual classification, never inflated</li>
        <li>priceRange in CAD with realistic seasonal range, not a single dollar sign</li>
        <li>amenityFeature array covering wifi, breakfast, parking, pets, accessibility, air conditioning, elevator</li>
        <li>checkinTime and checkoutTime in ISO 8601 format</li>
        <li>address with full PostalAddress, including addressRegion as QC and addressCountry as CA</li>
        <li>geo with latitude and longitude, accurate to the building footprint</li>
        <li>availableLanguage array listing English and French at minimum</li>
      </ul>

      <CalloutBox type="warning">
        <p>Do not stuff schema with amenities the property does not actually offer. AI engines compare schema claims against review text and OTA listings. A mismatch (claiming a spa that does not exist) gets caught and softens citation trust across the entire profile. The compliant move is to publish only what is real and to refresh the schema when amenities change.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="faq-pages-for-real-traveler-questions">FAQ pages for real traveler questions</h2>
      <p>
        FAQ pages are the highest impact page on a boutique hotel website for AI citation. Each FAQ entry is a candidate for a featured snippet, an AI Overview citation, and a voice search answer. The questions need to be real traveler questions, not invented marketing prompts. Pull the questions from the Google Business Profile Q and A tab, the front desk call log, and the email inbox.
      </p>
      <p>
        For Old Quebec specifically, the highest volume questions cluster around parking inside the walls, walking distance to Chateau Frontenac, breakfast hours, language at reception, accessibility on the cobblestone streets, and pet policy. Each of these questions has a direct answer that can fit inside 40 to 80 words. That word count is the sweet spot for AI engines pulling extractive snippets.
      </p>

      <p>
        Mark the FAQ section with FAQPage schema. Confirm each Question and Answer pair renders inside a structured data testing tool. Bilingual hotels should publish the FAQ in English and French, not as a translated copy but as separately authored answers that respect Quebec French nuance and regional spelling. This is exactly the kind of work the <InternalLink to="/industries/hotels" title="AiLys hotels playbook" description="Industry-specific AI Visibility playbook for hotels" /> covers in detail.
      </p>

      <QuickQuiz
        question="Why does ChatGPT cite Booking.com instead of an independent boutique hotel website by default?"
        options={[
          'Booking.com pays ChatGPT for citation placement',
          'Booking pages carry denser Hotel schema, richer review counts, and structured amenity data',
          'ChatGPT only cites OTA sites by policy',
          'The hotel website is technically blocked from AI crawling',
        ]}
        correctIndex={1}
        explanation="OTAs win the default citation slot because their pages have more complete structured data and review density than most independent hotel sites. The fix is to publish stronger schema and richer FAQ content on the hotel website, not to abandon the OTA channel."
      />

      <SectionDivider />

      <h2 id="nap-across-travel-directories">NAP consistency across travel directories</h2>
      <p>
        NAP consistency is the trust spine of local AI search. For a hotel in Old Quebec, the directory list is longer than for most local businesses because travel surfaces multiply. The minimum set is Google Business Profile, Apple Business Connect, TripAdvisor, Booking, Expedia, Hotels.com, Tourism Quebec (Quebec City tourism office), and the Old Quebec merchant association directory. Add Wikidata for entity disambiguation, which compounds AI citation rates over time.
      </p>
      <p>
        The most common NAP mismatch on Old Quebec hotels is the street format. Rue is sometimes spelled out, sometimes abbreviated. Postal codes sometimes carry the space, sometimes do not. Phone numbers vary between the international format with the +1 prefix and the local format. Each variant is a soft trust signal that AI engines hedge against. The cleanup is mechanical and one-time: pick a canonical format, push it everywhere, and audit quarterly.
      </p>

      <img
        src={meta.images.mid}
        alt="Citation map showing NAP consistency check across Booking Expedia TripAdvisor and Tourism Quebec for an Old Quebec boutique hotel"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <p>
        The full vocabulary on this work lives in the <InternalLink to="/glossary/aeo" title="AEO glossary" description="Answer Engine Optimization terms for local hotels and travel" /> reference. Operators who want a fast diagnostic can pull the gap report from the free <InternalLink to="/audit" title="AI Visibility Audit" description="24 hour citation gap report across the major AI engines" /> before deciding what to fix first.
      </p>

      <InlineCTA variant="pricing" text="Want a managed program that handles Hotel schema, NAP cleanup across travel directories, and bilingual concierge content on a fixed monthly tier? See AiLys plans for hotels in Quebec." />

      <SectionDivider />

      <h2 id="local-concierge-content-old-quebec">Local concierge content, the Old Quebec edge</h2>
      <p>
        Concierge content is the differentiator that pulls citations away from OTAs and into the hotel website. Booking cannot publish a signed guide to walking from your front door to the Plains of Abraham at sunrise. Expedia cannot tell a guest which boulangerie on rue Saint-Jean opens at six in the morning. The boutique hotel can, and the AI engines reward that specificity because it answers traveler questions OTAs structurally cannot.
      </p>
      <p>
        Author concierge content under a named byline with author schema. The byline carries E-E-A-T weight: experience, expertise, authoritativeness, trustworthiness. A concierge who has worked at the property for five years is a more credible source than an anonymous content writer. Publish in English and Quebec French in parallel, not as a translation. The bilingual depth is read by the AI engines as a quality signal for the local market.
      </p>
      <p>
        Topic priority is set by the questions the front desk actually fields. Walking routes, restaurant recommendations by neighborhood, parking strategies during festival season, the Quebec Winter Carnival schedule, accessibility tips for the cobblestone walks, language tips for non-French speakers. Each topic earns its citation by being concrete, signed, and bilingual. Two or three pieces a month for a quarter is enough to start surfacing in AI answers.
      </p>

      <CalloutBox type="tip">
        <p>The fastest way to seed concierge content is to record front desk calls for one week (with consent) and transcribe the question patterns. The most common ten questions become your first ten FAQ entries and your first three concierge guides. The work is already in the building, it just needs to be published in a form the AI engines can cite.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="reviews-and-the-citation-feedback-loop">Reviews and the citation feedback loop</h2>
      <p>
        Reviews close the loop on AI citation. ChatGPT, Perplexity, and Google AIO read review text to verify schema claims and to extract service-specific keywords. A boutique hotel with reviews mentioning the bilingual reception, the cobblestone walk to Chateau Frontenac, and the breakfast at the in-house cafe gets cited for those exact queries. A hotel with reviews that all read great stay wins nothing on differentiation.
      </p>
      <p>
        The mechanics are the same as any local business. Send a review request inside 24 hours of checkout, with a direct link to the Google Business Profile review page. Ask in the customer's language. Reply to every review inside 72 hours, longer for negatives. The reply text becomes part of the page's citation surface, which is a quiet bonus that compounding owners collect for free.
      </p>
      <p>
        Old Quebec hotels also need to manage TripAdvisor and Booking reviews because the OTAs feed AI engines too. Same prompts, same reply discipline, same bilingual care. The total review velocity across Google, TripAdvisor, and Booking is what AI engines look at when deciding whether to cite the hotel as a primary source for an Old Quebec query.
      </p>

      <InlineCTA variant="book" text="Want a 60 minute strategy call to map the citation gaps on your hotel against the top three OTAs and the top boutique competitor? No pitch, deliverable sent regardless." />

      <SectionDivider />

      <h2 id="a-90-day-rollout-for-boutique-hotels">A 90 day rollout for boutique hotels</h2>
      <p>
        Day 1 to 14, audit the schema and NAP. Pull the structured data from the hotel site, score it against the Hotel schema requirements, and run a NAP audit across Booking, Expedia, TripAdvisor, Hotels.com, Google Business Profile, Apple Business Connect, Tourism Quebec, and the Old Quebec merchant association. Document every mismatch.
      </p>
      <p>
        Day 15 to 45, ship the schema upgrade and NAP cleanup. Hotel schema with the full property set lands first, then FAQPage schema on the questions pulled from the front desk log, then NAP corrections pushed through the travel directories. Wikidata entry created or updated in parallel.
      </p>
      <p>
        Day 46 to 75, author the concierge content. Two bilingual guides per month under named bylines, mapped to the questions traveler actually ask. Walking routes, restaurant picks, accessibility tips, festival schedules. Add author schema with sameAs links to the named staff member.
      </p>
      <p>
        Day 76 to 90, rerun the AI Visibility audit. Compare citation share before and after across ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot. Most boutique hotels see citation share movement on at least three of the six engines inside this window. The compounding effect runs from month four onward, when reviews, schema, NAP, and content reinforce each other.
      </p>

      <KeyTakeaway
        points={[
          'OTAs win the default AI citation slot because their pages carry denser schema and review counts than most independent hotel sites.',
          'Hotel schema with amenity arrays, FAQPage schema, and Organization schema with sameAs links is the structured spine.',
          'NAP consistency across at least six travel directories is the trust signal AI engines verify before citing.',
          'Bilingual concierge content under named bylines is the differentiator OTAs cannot match.',
          'Most boutique hotels see measurable AI citation share movement inside 8 to 12 weeks of shipping the stack.',
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
        alt="AI Visibility report card for an Old Quebec boutique hotel showing citation share gains across ChatGPT Perplexity and Google AIO"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
