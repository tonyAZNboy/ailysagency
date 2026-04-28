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
  slug: 'contractor-service-area-gbp-strategy',
  title: 'Contractor service area GBP strategy, one profile across many towns',
  metaDescription:
    'Do contractors need a separate GBP for each service area? No. One Service Area Business profile per legal entity, address hidden, multiple towns declared. Quebec RBQ rules included.',
  tldr: 'Contractors who serve customers at the customer location run one Google Business Profile per legal entity, declare up to twenty service areas, and hide the street address. Spinning up a second GBP for a second town is a policy violation that gets the listing suspended. The Quebec angle adds an RBQ license requirement (Régie du bâtiment du Québec) that should appear in the business description and on the website footer to feed E-E-A-T signals across AI engines.',
  category: 'industry-playbook',
  tags: ['contractors', 'gbp', 'service area business', 'quebec', 'rbq', 'industry-playbook'],
  publishedDate: '2026-04-06',
  updatedDate: '2026-04-06',
  author: AUTHORS.strategy,
  readTimeMinutes: 10,
  images: {
    hero: '/blog-images/contractor-service-area-gbp-strategy/hero.webp',
    mid: '/blog-images/contractor-service-area-gbp-strategy/mid.webp',
    end: '/blog-images/contractor-service-area-gbp-strategy/end.webp',
  },
  faqItems: [
    {
      question: 'Do contractors need a separate GBP for each service area?',
      answer:
        'No. Google policy is one Google Business Profile per legal entity. A contractor who serves customers at the customer location creates a single Service Area Business profile, hides the street address, and declares up to twenty service areas inside that one listing. Spinning up a second GBP for a second town gets the listing flagged for duplicates and suspended, which destroys six to twelve months of ranking work in one moderation queue cycle.',
    },
    {
      question: 'What is a Service Area Business on Google Business Profile?',
      answer:
        'A Service Area Business or SAB is a profile type for businesses that travel to customer locations rather than receive customers at a storefront. Plumbers, electricians, roofers, landscapers, painters, and general contractors typically qualify. The profile hides the street address from public view and instead surfaces the list of cities, neighborhoods, or postal codes the business serves. Google ranks SABs in the local pack of any town inside the declared service area, weighted by proximity to the hidden address and by citation signals.',
    },
    {
      question: 'How many service areas can a contractor declare on one GBP?',
      answer:
        'Up to twenty service areas per profile. Each area can be a city, a county, a postal code, or a custom polygon up to roughly two hours of drive time from the hidden address. The honest play is to declare only the towns you actually service, not every town within driving range. Over-declaration thins the proximity signal and reduces ranking on the towns that matter most. Quebec contractors typically declare a primary city plus eight to twelve adjacent towns, not the full twenty slots.',
    },
    {
      question: 'Does Quebec require an RBQ license for contractors on GBP?',
      answer:
        'Yes for most construction trades. The Régie du bâtiment du Québec issues licenses for general contractors, electricians, plumbers, roofers, and several other trades. The RBQ number should appear in the GBP business description, on the website footer, on every quote, and inside LocalBusiness schema as an identifier. AI engines like ChatGPT and Perplexity now cite RBQ licensed contractors more often than unlicensed ones because the credential reads as a verifiable trust signal.',
    },
    {
      question: 'Should the street address be hidden on a contractor GBP?',
      answer:
        'Yes if the contractor does not receive customers at the address. The address must still be entered during verification so Google can mail a postcard or run video verification, but the public face of the listing hides the address and shows only the service area map. Owners who leave the address visible on a SAB profile sometimes get flagged for misrepresentation, especially if the address is a residential one. The hidden address play is the policy-compliant version.',
    },
  ],
  relatedSlugs: ['nap-consistency-audit-quebec', 'gbp-categories-best-primary-pick'],
  headings: [
    { id: 'why-one-gbp-per-legal-entity-not-per-town', text: 'Why one GBP per legal entity, not one per town' },
    { id: 'what-a-service-area-business-actually-is', text: 'What a Service Area Business actually is on GBP' },
    { id: 'how-to-declare-service-areas-the-right-way', text: 'How to declare service areas the right way' },
    { id: 'the-quebec-rbq-license-angle', text: 'The Quebec RBQ license angle and how to surface it' },
    { id: 'ranking-in-towns-without-a-storefront', text: 'Ranking in towns where you have no storefront' },
    { id: 'common-violations-that-trigger-suspension', text: 'Common violations that trigger SAB suspension' },
    { id: 'a-90-day-rollout-for-quebec-contractors', text: 'A 90 day rollout for Quebec contractors' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        Contractors ask the same question on every onboarding call. Should I create one Google Business Profile per town I service, or one profile for the whole company? The honest answer is one profile per legal entity, with the street address hidden and up to twenty service areas declared inside that single listing. Spinning up a second GBP for a second town is a policy violation, not a growth hack, and Google moderation queues catch it. This is the contractor service area GBP strategy that holds up across Quebec, including the RBQ license signals that AI engines now reward.
      </p>

      <StatHighlight
        stats={[
          { value: '1', label: 'GBP per legal entity, never per town' },
          { value: '20', label: 'Maximum service areas per profile' },
          { value: 'RBQ', label: 'Quebec license that feeds AI engine trust signals' },
        ]}
      />

      <SectionDivider />

      <h2 id="why-one-gbp-per-legal-entity-not-per-town">Why one GBP per legal entity, not one per town</h2>
      <p>
        Google policy is explicit. A business gets one Google Business Profile per legal entity at one verified address. A contractor that operates as a single incorporated company cannot legally run a second GBP for the next town, even if that town is two hours away. The duplicate detection runs on phone number, business name, and operator email, and it catches duplicates fast. Suspension typically arrives inside thirty to sixty days of the second profile going live, and the suspended listing loses every review, every photo, and every citation built up over years of work.
      </p>
      <p>
        The exception is real. A contractor that operates two distinct legal entities, with separate incorporation, separate phone numbers, separate addresses, and separate staff, can run one GBP per entity. That is two businesses, not one business with two profiles. The vast majority of small and mid-sized contractors are one entity, so the rule that applies is one profile, multiple service areas, hidden address.
      </p>

      <CalloutBox type="warning">
        <p>The cost of a suspension is not abstract. We see contractors lose 80 to 200 reviews and twelve months of ranking momentum from a single duplicate-listing flag. Recovery through the GBP appeals process takes two to four months when it succeeds, and many appeals fail. Do not run a second profile for a second town.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Want a 24 hour audit of your contractor GBP setup including service area coverage and RBQ schema? The free AI Visibility audit covers it all." />

      <SectionDivider />

      <h2 id="what-a-service-area-business-actually-is">What a Service Area Business actually is on GBP</h2>
      <p>
        A Service Area Business, or SAB, is the GBP profile type for operators who travel to customer locations rather than receive customers at a storefront. Plumbers, electricians, roofers, landscapers, painters, snow removal companies, foundation specialists, general contractors, HVAC technicians, and most trade contractors qualify. The defining test is simple. Do customers come to you, or do you go to them? If the answer is the second one, you are an SAB.
      </p>
      <p>
        The SAB profile does three things differently from a storefront profile. First, it hides the street address from public view. Customers see a service area map instead. Second, it requires service area declarations, up to twenty cities, counties, postal codes, or custom polygons. Third, it ranks in the local pack of any town inside the declared service area, weighted by proximity to the hidden address and by citation signals. That third behavior is what lets a single profile cover an entire metro area.
      </p>

      <h3>Trades that qualify as SAB</h3>
      <ul>
        <li>General contractors and renovation specialists</li>
        <li>Plumbers, electricians, HVAC technicians</li>
        <li>Roofers, siding installers, foundation specialists</li>
        <li>Landscapers, snow removal, tree services</li>
        <li>Painters, flooring installers, drywall finishers</li>
        <li>Pool builders, deck builders, fence installers</li>
      </ul>

      <SectionDivider />

      <h2 id="how-to-declare-service-areas-the-right-way">How to declare service areas the right way</h2>
      <p>
        The service area editor inside GBP accepts up to twenty entries. Each entry can be a city name, a county, a postal code, or a custom polygon drawn on the map. The honest play is to declare only the towns you actually service, weighted toward the towns where you have completed jobs in the last twelve months. Over-declaration thins the proximity signal and reduces ranking on the towns that matter most. A Quebec contractor based in Longueuil with active jobs across the South Shore typically declares Longueuil, Boucherville, Saint-Hubert, Brossard, Saint-Lambert, Greenfield Park, and a few adjacent municipalities, not every town in Monteregie.
      </p>
      <p>
        Drive time matters too. Google rewards service areas within roughly a two-hour radius of the hidden address. Beyond that radius, the algorithm starts to discount the proximity signal even when the area is technically inside the declared list. A contractor that declares Quebec City and Montreal on the same profile will see weak ranking in both, because the proximity signal gets averaged across an unreasonable spread.
      </p>

      <CalloutBox type="tip">
        <p>The cleanest service area list is six to twelve entries that match your actual job log from the last twelve months. Pull the customer addresses from your invoicing software, plot them on a map, and declare the cluster. That tight list outranks a twenty-entry list every time.</p>
      </CalloutBox>

      <h3>Service area declaration formats</h3>
      <ul>
        <li>City name, the most common and the easiest to verify</li>
        <li>Postal code, useful for dense urban areas with sub-neighborhood targeting</li>
        <li>County or regional county municipality, useful for rural Quebec coverage</li>
        <li>Custom polygon, drawn on the map for non-standard service boundaries</li>
      </ul>

      <SectionDivider />

      <h2 id="the-quebec-rbq-license-angle">The Quebec RBQ license angle and how to surface it</h2>
      <p>
        Quebec construction trades are regulated by the Régie du bâtiment du Québec, abbreviated RBQ. General contractors, electricians, plumbers, roofers, foundation specialists, and several other trades require an RBQ license to operate legally. The license number is a verifiable credential, and AI engines have learned to weight verifiable credentials higher than self-declared expertise when ranking contractor responses to user queries.
      </p>
      <p>
        Surface the RBQ number in four places to feed the trust signal across both classic SEO and AI Visibility surfaces. First, in the GBP business description, in the form RBQ followed by the eight-digit number. Second, on the website footer, visible on every page. Third, on every quote and invoice, which feeds the document-level trust signal that some AI engines pull from cached PDFs. Fourth, inside LocalBusiness schema as an identifier, which feeds Google AI Overviews and Perplexity directly.
      </p>

      <QuickQuiz
        question="A general contractor incorporates one company in Quebec and services Longueuil, Boucherville, and Brossard. How many GBP profiles should they run?"
        options={[
          'Three, one per town',
          'Two, one for Longueuil and one combined for the other two',
          'One, with all three declared as service areas',
          'One per neighborhood inside each town',
        ]}
        correctIndex={2}
        explanation="One legal entity gets one GBP. The contractor declares Longueuil, Boucherville, and Brossard as service areas inside the single profile, hides the street address, and runs the RBQ number in the description. Spinning up a second profile for any of those towns triggers duplicate detection."
      />

      <SectionDivider />

      <h2 id="ranking-in-towns-without-a-storefront">Ranking in towns where you have no storefront</h2>
      <p>
        The mechanic that lets a single SAB rank across multiple towns without a storefront in each one is proximity weighting plus citation depth. Google weights proximity to the hidden address as a primary signal, but it also weights citation depth, review velocity, photo coverage, and on-page service-area landing pages as secondary signals. A contractor with strong secondary signals can outrank a competitor with closer proximity but thinner citations and reviews.
      </p>
      <p>
        That is why the page-level work matters. Build a dedicated landing page for each declared service area on your website. Plumber in Longueuil, Plombier a Boucherville, Plumber in Brossard. Each page covers the same services with town-specific copy, town-specific testimonials, and town-specific citation references. AI engines treat each landing page as a separate ranking surface, and they cite the page that names the town in the URL and headline. <InternalLink to="/glossary/gbp" title="GBP glossary entry" description="Service Area Business profile mechanics explained" /> covers the proximity-versus-citation balance in more depth.
      </p>

      <CalloutBox type="info">
        <p>Bilingual service area pages double the surface. A Quebec contractor that ships English and Quebec French versions of every service area landing page covers both ranking surfaces. Google ranks EN and FR-CA as separate AI Overview targets, which means a single bilingual page set can earn citations on both sides of the language split.</p>
      </CalloutBox>

      <InlineCTA variant="pricing" text="See how AiLys Core ships bilingual GBP and service area landing pages for contractors at 799 dollars CAD a month." />

      <SectionDivider />

      <h2 id="common-violations-that-trigger-suspension">Common violations that trigger SAB suspension</h2>
      <p>
        Five mistakes show up repeatedly in Quebec contractor suspensions. Naming each one helps owners avoid them.
      </p>
      <ol>
        <li>Running a second GBP profile for a second town under the same legal entity</li>
        <li>Leaving the street address visible on the public profile when the address is residential</li>
        <li>Stuffing the business name with keywords or city names that are not on the legal incorporation papers</li>
        <li>Declaring service areas that include towns outside a reasonable drive radius from the hidden address</li>
        <li>Using a virtual office or mailbox address as the verification address without disclosing it</li>
      </ol>
      <p>
        The first one accounts for the majority of contractor suspensions we audit. The fix is not to find a workaround, the fix is to consolidate to one profile and rebuild the service area declarations correctly. The second-most common is the address visibility issue, which is a one-click fix inside the GBP dashboard that many owners never make.
      </p>

      <SectionDivider />

      <h2 id="a-90-day-rollout-for-quebec-contractors">A 90 day rollout for Quebec contractors</h2>
      <p>
        Days one through fifteen, audit the existing profile and consolidate any duplicates. Hide the street address if it is currently visible. Declare six to twelve service areas based on the last twelve months of job locations. Add the RBQ number to the business description in the format RBQ followed by the eight-digit license number.
      </p>
      <p>
        Days sixteen through forty-five, build bilingual landing pages for the top three to five service areas. Add LocalBusiness schema with the RBQ number as an identifier. Run a NAP consistency check across the major Canadian directories: Yellow Pages, 411.ca, Cylex, ProfileCanada, and the trade-specific directories like RBQ Constructo and HouzzPro for Quebec. <InternalLink to="/audit/gbp" title="GBP audit tool" description="Run the free 24 hour GBP audit" /> covers the full check list.
      </p>
      <p>
        Days forty-six through ninety, ship weekly GBP posts in EN and FR-CA, request reviews from the last twelve months of completed jobs with a target of one review per ten jobs, and upload photos from each declared service area to feed the geo-tagged photo signal. By day ninety, the profile typically shows ranking improvements in three to five of the declared service areas, with first AI Overview citations on RBQ-licensed contractor queries inside Quebec. The full <InternalLink to="/industries/contractors" title="Contractors industry playbook" description="Quebec contractor SEO and AI Visibility methodology" /> walks through every step in production-ready detail.
      </p>

      <img
        src={meta.images.mid}
        alt="GBP service area declaration map showing six to twelve adjacent Quebec towns within a two hour drive radius"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <InlineCTA variant="book" text="Want a 60 minute strategy call to map out your service area GBP strategy across Quebec? Strategy doc sent regardless." />

      <SectionDivider />

      <KeyTakeaway
        points={[
          'One GBP per legal entity. Never one per town. Duplicates trigger suspension inside thirty to sixty days.',
          'Declare six to twelve service areas based on the last twelve months of job locations, not every town within driving range.',
          'Hide the street address on the public profile if you do not receive customers there.',
          'Surface the RBQ license in the business description, on the website footer, on quotes, and inside LocalBusiness schema.',
          'Build bilingual EN and FR-CA service area landing pages to cover both ranking surfaces in Quebec.',
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
        alt="Decision matrix showing one GBP profile with multiple declared service areas versus the suspended duplicate-profile pattern"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
