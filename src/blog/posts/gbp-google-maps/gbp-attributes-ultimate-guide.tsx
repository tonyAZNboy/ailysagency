/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import { AUTHORS } from '../../authors'
import { CalloutBox, InlineCTA, StatHighlight, KeyTakeaway, InternalLink, SectionDivider, QuickQuiz } from '../../components/shared'

export const meta: BlogPostMeta = {
  slug: 'gbp-attributes-ultimate-guide',
  title: 'GBP attributes, the ultimate guide for Quebec local owners',
  metaDescription:
    'Google Business Profile attributes explained for Quebec owners. The full BOOL toggle list, bilingual handling, accessibility flags, payment options, and the audit cadence that keeps the panel honest.',
  tldr: 'GBP attributes are boolean toggles (wheelchair accessible, free wifi, accepts cards, women-owned, gender-neutral washroom, dog-friendly, and many more) that surface in the Google Business Profile knowledge panel and feed AI engines through Google\'s entity graph. Quebec owners need to manage attributes in both English and French because the customer-facing panel renders in the searcher\'s language. The right cadence is a quarterly audit, a monthly check after policy changes, and a same-day update when a physical change happens at the location. AiLys ships the attribute audit inside the free 24-hour deliverable and updates attributes through the GBP API on Core and above.',
  category: 'gbp-google-maps',
  tags: ['gbp', 'attributes', 'quebec', 'accessibility', 'gbp-google-maps'],
  publishedDate: '2026-04-16',
  updatedDate: '2026-04-16',
  author: AUTHORS.strategy,
  readTimeMinutes: 9,
  images: {
    hero: '/blog-images/gbp-attributes-ultimate-guide/hero.webp',
    mid: '/blog-images/gbp-attributes-ultimate-guide/mid.webp',
    end: '/blog-images/gbp-attributes-ultimate-guide/end.webp',
  },
  faqItems: [
    {
      question: 'How do I add bilingual attributes to my Quebec GBP?',
      answer:
        'Attributes themselves are language-neutral booleans (the toggle for free wifi is the same toggle for everyone). What changes by language is the rendered label in the customer-facing panel, which Google handles automatically based on the searcher\'s language preference. Quebec owners do not toggle attributes in two languages, they toggle once and trust Google to render the French labels for FR-CA searchers and the English labels for EN-CA searchers. The work that does require bilingual care is the description, services, and any custom attribute the owner adds, since those fields are free text and need to be authored in both languages.',
    },
    {
      question: 'Which GBP attributes matter most for AI Visibility?',
      answer:
        'Three groups carry the most weight in AI engine retrieval. Accessibility (wheelchair accessible entrance, accessible parking, accessible washroom) because Perplexity and Google AIO weight these heavily for inclusive intent queries. Payment and amenities (accepts credit cards, free wifi, accepts reservations) because they answer pre-visit questions directly and AI engines cite them. Identity attributes (women-owned, LGBTQ-friendly, gender-neutral washroom, Indigenous-owned) because they filter discovery queries that searchers type explicitly. Other attributes matter, but these three groups produce the visible AI Visibility lift.',
    },
    {
      question: 'How often should I audit my GBP attributes?',
      answer:
        'Run a full attribute audit every quarter, a quick check every month, and an immediate update whenever a physical change happens at the location (new ramp installed, payment terminal upgraded to tap, hours change creates a new "open Sunday" reality). Google adds new attributes to categories regularly, so a quarterly audit catches the new toggles before competitors flip them. The AiLys Core tier ships the quarterly attribute audit as a deliverable and surfaces missing toggles inside the AI Visibility report.',
    },
    {
      question: 'Can a wrong attribute hurt my GBP ranking?',
      answer:
        'Yes, in two ways. First, an attribute that does not match physical reality (claiming wheelchair accessible when the entrance has stairs) can trigger a Google policy review if a customer reports the mismatch, and the listing can be suspended pending verification. Second, missing accessibility or payment attributes that competitors have can hurt local pack ranking on filter-based searches. Searchers who filter for wheelchair accessible see a smaller candidate list, and a missing toggle removes the listing from that filtered set entirely, even if the place is in fact accessible.',
    },
    {
      question: 'Do GBP attributes feed Loi 25 transparency requirements?',
      answer:
        'GBP attributes themselves are not a Loi 25 disclosure surface, since the data lives on Google\'s side and the customer relationship is between the searcher and Google. However, attributes that imply data collection (online appointment booking, ordering, gift cards) trigger downstream Loi 25 obligations on the linked website (privacy policy, consent banner, data retention disclosure). Quebec operators should treat any attribute that links to a booking, ordering, or contact flow as a trigger to review the linked site for Loi 25 compliance.',
    },
  ],
  relatedSlugs: ['gbp-photo-upload-cheat-sheet', 'gbp-categories-best-primary-pick', 'nap-consistency-audit-quebec'],
  headings: [
    { id: 'what-gbp-attributes-actually-are', text: 'What GBP attributes actually are' },
    { id: 'the-attribute-categories-that-matter', text: 'The attribute categories that matter' },
    { id: 'accessibility-attributes-the-honest-checklist', text: 'Accessibility attributes, the honest checklist' },
    { id: 'payment-and-amenity-toggles', text: 'Payment and amenity toggles' },
    { id: 'identity-attributes-and-why-they-help', text: 'Identity attributes and why they help' },
    { id: 'bilingual-rendering-for-quebec-owners', text: 'Bilingual rendering for Quebec owners' },
    { id: 'the-quarterly-audit-cadence', text: 'The quarterly audit cadence' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        GBP attributes are the boolean toggles that describe what your Google Business Profile actually offers. Wheelchair accessible entrance, free wifi, accepts credit cards, women-owned, gender-neutral washroom, dog-friendly, accepts reservations, online appointments, gift cards, and many more. Each toggle is a yes-or-no flag that surfaces in the customer-facing panel, filters local pack results, and feeds AI engines through Google\'s entity graph. For Quebec local owners, attributes are one of the highest-impact GBP fields because they are quick to update, render bilingually by default, and directly answer pre-visit questions that searchers ask AI engines daily.
      </p>

      <StatHighlight
        stats={[
          { value: '60+ toggles', label: 'Attribute count available across common GBP categories' },
          { value: '15 minutes', label: 'Time to run a full attribute audit on a single listing' },
          { value: 'Quarterly', label: 'Audit cadence that catches new attributes Google adds each quarter' },
        ]}
      />

      <SectionDivider />

      <h2 id="what-gbp-attributes-actually-are">What GBP attributes actually are</h2>
      <p>
        GBP attributes are structured boolean fields that Google surfaces inside the knowledge panel and uses to filter local pack results. They differ from the description (free text), the categories (taxonomy), and the services (per-category list) because the value is a strict yes or no with no nuance. The toggle is on or off. The rendering happens automatically in the searcher\'s language, so a single toggle covers EN, FR, ES, ZH, and every other language Google supports.
      </p>
      <p>
        The attribute set varies by category. A restaurant has a different attribute list than a dental clinic, which has a different list than a contractor. When you change the primary category, the attribute panel refreshes with the new options. Some attributes are universal (accepts credit cards, wheelchair accessible entrance), others are category-specific (outdoor seating only appears for restaurants, accepts new patients only appears for healthcare).
      </p>
      <p>
        Searchers see attributes in three places: the knowledge panel on the right side of search results, the local pack tile when a filter matches, and the GBP page on Google Maps. AI engines (especially Perplexity, Google AIO, and Bing Copilot) read attributes when they answer pre-visit questions like "do they accept reservations" or "is there free parking".
      </p>

      <CalloutBox type="info">
        <p>The attribute panel inside the GBP dashboard groups the toggles into categories (Accessibility, Amenities, Crowd, Highlights, Offerings, Pets, Planning, Service options, From the business). The labels and grouping change occasionally as Google iterates the product. The boolean values themselves are stable. See the <InternalLink to="/glossary/gbp" title="Google Business Profile glossary entry" description="Definitions and core fields" /> for the full taxonomy.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Want a per-attribute audit of your current GBP toggles, with the missing flags compared against your top three competitors? Run the free 24-hour AI Visibility audit." />

      <SectionDivider />

      <h2 id="the-attribute-categories-that-matter">The attribute categories that matter</h2>
      <p>
        Three attribute groups produce the visible AI Visibility and local pack lift for Quebec local owners:
      </p>
      <ol>
        <li>Accessibility. Wheelchair accessible entrance, accessible parking, accessible washroom, accessible seating. Critical for inclusive intent queries and a hard ranking factor on filter-based searches.</li>
        <li>Payment and amenities. Accepts credit cards, accepts debit cards, free wifi, free parking, paid parking, on-site parking, accepts reservations, has takeout, has delivery. Directly answer pre-visit questions and AI engines cite them.</li>
        <li>Identity. Women-owned, LGBTQ-friendly, transgender safe space, gender-neutral washroom, Indigenous-owned, veteran-owned. Filter discovery queries that searchers type explicitly and that Google weights heavily on local pack inclusion.</li>
      </ol>

      <p>
        Other attribute groups (Crowd, Highlights, Offerings, From the business, Planning) matter on the margin and are worth toggling correctly, but the lift from toggling them is smaller than the lift from the three priority groups above. Spend the first audit pass on Accessibility, Payment, and Identity. Spend the second pass on the rest.
      </p>

      <h2 id="accessibility-attributes-the-honest-checklist">Accessibility attributes, the honest checklist</h2>
      <p>
        Accessibility attributes carry the most weight per toggle in the AI Visibility lane. Perplexity, Google AIO, and Bing Copilot weight accessibility flags heavily because they answer queries like "wheelchair accessible dentist near me" or "clinic with accessible parking in Laval". The flags also feed local pack filters, where a missing toggle removes the listing from the filtered candidate set entirely.
      </p>
      <p>
        The honest checklist for a Quebec local listing:
      </p>
      <ul>
        <li>Wheelchair accessible entrance: only on if the door is wide enough and there are no stairs or a permanent ramp covers them</li>
        <li>Wheelchair accessible parking: only on if there is a designated accessible spot or accessible street parking adjacent</li>
        <li>Wheelchair accessible washroom: only on if the inside washroom meets the local accessibility code (door clearance, grab bars, turning radius)</li>
        <li>Wheelchair accessible seating: only on for restaurants and clinics that have low-height counters or accessible-height tables</li>
        <li>Wheelchair accessible elevator: only on if elevators are present and reach the relevant floors of the business</li>
      </ul>
      <p>
        Honesty matters. Toggling wheelchair accessible when the entrance has stairs creates a Google policy violation risk and a real-world trust failure when an accessibility user shows up and cannot enter. The right move when accessibility is partial (ramp at the side door, washroom on the second floor only) is to leave the toggle off and use the description field to explain the partial accessibility honestly.
      </p>

      <CalloutBox type="warning">
        <p>Do not flip an accessibility attribute on without verifying the physical reality. Google policy treats accessibility misrepresentation as a violation that can suspend the listing, and a single user report is enough to trigger a review. The cost of an incorrect toggle is far higher than the lift from the toggle.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="payment-and-amenity-toggles">Payment and amenity toggles</h2>
      <p>
        Payment and amenity toggles answer the pre-visit questions that searchers ask AI engines most often. The list to verify on every Quebec listing:
      </p>
      <ul>
        <li>Accepts credit cards: on if you accept Visa, Mastercard, or Amex</li>
        <li>Accepts debit cards: on if you accept Interac in store</li>
        <li>Accepts NFC mobile payments: on if you accept tap (Apple Pay, Google Pay)</li>
        <li>Free wifi: on if customer wifi is open or self-serve with a posted password</li>
        <li>Free parking lot or free street parking: on if the parking is free for customers</li>
        <li>Paid parking lot: on if parking is paid (clarifies expectation for visitors)</li>
        <li>Accepts reservations: on if a booking system is offered (linked or by phone)</li>
        <li>Has takeout, has delivery, has dine-in: on per the actual offering for restaurants</li>
        <li>Online appointments: on for healthcare and service businesses with a booking link</li>
      </ul>
      <p>
        Each toggle is a small lift on its own. Together, they answer the bulk of pre-visit questions that AI engines surface, and they shorten the path from query to visit by eliminating the click to a third-party page just to confirm "do they take cards".
      </p>

      <QuickQuiz
        question="Which group of GBP attributes carries the most weight per toggle for AI Visibility?"
        options={[
          'Crowd attributes (good for groups, good for kids, good for tourists)',
          'Accessibility attributes (wheelchair accessible entrance, parking, washroom, seating)',
          'Highlights attributes (live music, has games, has fireplace)',
          'From the business attributes (identifies as women-owned, LGBTQ-friendly)',
        ]}
        correctIndex={1}
        explanation="Accessibility attributes carry the most weight per toggle. Perplexity, Google AIO, and Bing Copilot weight them heavily for inclusive intent queries, and they directly feed local pack filters. Identity attributes (the From the business group) are the second priority. Crowd and Highlights matter on the margin and are worth toggling correctly, but the lift per toggle is smaller."
      />

      <SectionDivider />

      <h2 id="identity-attributes-and-why-they-help">Identity attributes and why they help</h2>
      <p>
        Identity attributes (the From the business group inside the GBP dashboard) are toggles that describe ownership identity or service inclusivity. Women-owned, LGBTQ-friendly, transgender safe space, Indigenous-owned, veteran-owned, gender-neutral washroom. They differ from the other attribute groups because they are searcher-driven filters that change discovery patterns directly. A searcher who filters for women-owned restaurants in Montreal sees a smaller candidate set, and the listings without the toggle are removed from that set entirely, regardless of physical reality.
      </p>
      <p>
        For Quebec owners, identity attributes are one of the few GBP fields that change the local pack inclusion list directly. The toggle is on or off, and the inclusion is binary on filtered searches. The right approach is to toggle identity attributes that genuinely apply to the business and to leave the rest off. The wrong approach is to flip identity toggles speculatively in hopes of broader inclusion, since misrepresentation can trigger a Google policy review.
      </p>

      <InlineCTA variant="pricing" text="GBP attribute audits ship on every paid AiLys tier, starting at the Core tier (799 dollars CAD a month). See the four AiLys tiers side by side." />

      <SectionDivider />

      <h2 id="bilingual-rendering-for-quebec-owners">Bilingual rendering for Quebec owners</h2>
      <p>
        Quebec local owners worry about bilingual attribute handling more than they need to. The good news is that attribute toggles themselves are language-neutral booleans. The toggle for free wifi is one toggle, and Google renders it as Wifi gratuit for FR-CA searchers and Free wifi for EN-CA searchers automatically. There is no two-pass workflow for the boolean attributes.
      </p>
      <p>
        The fields that do require bilingual care are the description (free text), the services list (per-category labels and descriptions), and any custom attribute that takes a free-text value (for example "languages spoken" if you want to add it). Those fields need to be authored in both EN and FR-CA, and the language selector inside the GBP dashboard handles the second-pass entry. The AiLys bilingual content workflow ships description and services in EN and FR-CA inside the same week, hand-authored in Quebec French (courriel, magasiner, fin de semaine).
      </p>
      <p>
        For Loi 25 transparency, attribute toggles themselves do not trigger Loi 25 obligations because the data lives on Google\'s side. However, attributes that link out to a booking flow, an ordering page, or a contact form (online appointments, has online care, has gift cards) trigger downstream Loi 25 obligations on the linked website. The audit cadence below covers the cross-check.
      </p>

      <CalloutBox type="tip">
        <p>If you are running a multi-location business in Quebec, the attribute audit should be run per location, not once per brand. Accessibility, payment terminals, parking, and amenities differ by location, and a brand-wide attribute set hides location-specific gaps that competitors will fill before you do.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="the-quarterly-audit-cadence">The quarterly audit cadence</h2>
      <p>
        The right attribute audit cadence is quarterly, with a quick monthly check and an immediate update on physical changes. The full quarterly audit takes about 15 minutes per location:
      </p>
      <ol>
        <li>Open the GBP dashboard, switch to the attribute panel, scroll the full list</li>
        <li>Compare each toggle against physical reality (visit the location or review recent photos and floor plan)</li>
        <li>Flip toggles that have changed since the last audit (new ramp, new payment terminal, new identity declaration)</li>
        <li>Note attributes Google has added since the last audit (the panel surfaces new toggles in italic or with a "new" label briefly)</li>
        <li>Cross-check competitor listings on the same primary category to spot toggles your competitors have flipped on that you have not considered</li>
        <li>Update the description and services if any new attribute group surfaced and document the changes in your GBP change log</li>
      </ol>
      <p>
        AiLys ships the attribute audit inside the free <InternalLink to="/audit" title="Free 24-hour AI Visibility audit" description="Per-attribute audit and competitor comparison" /> deliverable on the GBP layer. On the Core tier and above, the AiLys engine pushes attribute updates through the GBP API automatically once the operator approves the change set. The full GBP attribute toolset lives in the <InternalLink to="/glossary/gbp" title="GBP glossary" description="Core fields, attributes, and toolset" /> page, and the photo cadence guide covers the visual side at <InternalLink to="/blog/gbp-photo-upload-cheat-sheet" title="GBP photo upload cheat sheet" description="Cadence, EXIF, and weighting" />.
      </p>

      <InlineCTA variant="book" text="Want a 60-minute walkthrough of your current GBP attribute panel against your top three competitors? No pitch, attribute change list sent regardless." />

      <SectionDivider />

      <KeyTakeaway
        points={[
          'GBP attributes are boolean toggles that surface in the knowledge panel and feed AI engines through the entity graph.',
          'Three groups carry the most weight: accessibility, payment and amenity, and identity attributes.',
          'Toggle accessibility attributes only when physical reality matches, since misrepresentation can suspend the listing.',
          'Attribute toggles render bilingually by default, so Quebec owners do not run a two-pass workflow for the boolean fields.',
          'Run a full attribute audit quarterly, a quick check monthly, and an immediate update whenever physical reality changes.',
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
        alt="GBP attribute audit summary showing accessibility, payment, and identity toggles compared against three competitors"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
