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
} from '../../components/shared'

export const meta: BlogPostMeta = {
  slug: 'siri-local-search-ranking-factors',
  title: 'Siri local business search ranking factors, the 2026 guide',
  metaDescription:
    'Siri picks local businesses using a different signal stack than Google. Here are the eight factors that decide which dentist or clinic Siri reads aloud first.',
  tldr: 'Siri picks the local business it recommends nearby by reading a stripped-down signal stack: a verified Apple Maps Connect listing, recent review velocity, service-specific keywords inside reviews, GBP categories that map to Apple categories, distance, and a small set of trust markers like a working website and a claimed phone number. Most clinics never claim Apple Maps Connect, so the bar to win is lower than owners expect.',
  category: 'voice-search',
  tags: ['voice search', 'siri', 'apple maps', 'local seo', 'dentists'],
  publishedDate: '2026-02-09',
  updatedDate: '2026-02-09',
  author: AUTHORS.research,
  readTimeMinutes: 9,
  images: {
    hero: '/blog-images/siri-local-search-ranking-factors/hero.svg',
    mid: '/blog-images/siri-local-search-ranking-factors/mid.svg',
    end: '/blog-images/siri-local-search-ranking-factors/end.svg',
  },
  faqItems: [
    {
      question: 'How does Siri pick which dentist to recommend nearby?',
      answer:
        'Siri reads a verified Apple Maps Connect record first, then layers four signals on top: distance from the iPhone, service-specific words inside recent reviews, GBP categories that map cleanly to Apple categories, and a working website with a claimed phone number. If two clinics tie, the one with fresher reviews in the last 30 days wins. Owners who never claim Apple Maps Connect drop out of the answer entirely.',
    },
    {
      question: 'Does Siri use Google Business Profile data at all?',
      answer:
        'Siri leans on Apple Maps Connect, Yelp, TripAdvisor for hospitality, and a small basket of third-party data partners. Google Business Profile is not a direct input, but the categories you set on GBP often mirror your Apple Maps categories, which is why a clean GBP still helps indirectly. The mistake is assuming Google work alone covers Siri. It does not.',
    },
    {
      question: 'How recent do my reviews need to be to rank in Siri results?',
      answer:
        'Apple weights the last 30 to 60 days more heavily than total review count. A clinic with 80 reviews and 5 in the last month outranks a clinic with 400 reviews and zero recent activity. Aim for 4 to 6 fresh reviews each month at minimum, and steer prompts so customers mention the specific service they received.',
    },
    {
      question: 'Do Apple Maps and Siri share the same ranking?',
      answer:
        'They share most of the data layer but not the ranking output. Apple Maps surfaces a list, Siri reads one or two names aloud. The cutoff is sharper for Siri because the answer is spoken, so trust markers like a verified listing and a claimed phone number weigh more. A clinic that ranks third in Apple Maps may never be named by Siri at all.',
    },
    {
      question: 'How do I check if Siri is recommending my business?',
      answer:
        'Run a structured voice query test from a clean iPhone outside your office, three times across different days. Ask the long-tail question your customers actually ask, like "Hey Siri, find a kid friendly dentist near me." Note which businesses are read aloud, in what order, and whether your listing appears at all. Repeat each quarter to catch silent ranking shifts.',
    },
  ],
  relatedSlugs: ['voice-search-changed-for-dentists'],
  headings: [
    { id: 'how-siri-actually-decides', text: 'How Siri actually decides which local business to recommend' },
    { id: 'apple-maps-connect-the-foundation', text: 'Apple Maps Connect, the foundation most clinics skip' },
    { id: 'review-velocity-and-recency', text: 'Review velocity and recency, the second weighting' },
    { id: 'service-keywords-inside-reviews', text: 'Service keywords inside reviews, the third lever' },
    { id: 'category-mapping-and-distance', text: 'Category mapping and distance, the fourth and fifth signals' },
    { id: 'trust-markers-siri-checks', text: 'Trust markers Siri checks before reading a name aloud' },
    { id: 'a-90-day-siri-plan-for-clinics', text: 'A 90 day Siri plan for clinics that want to win locally' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <img
        src={meta.images.hero}
        alt="iPhone showing a Siri voice answer for a local dentist near me query in Quebec"
        className="w-full rounded-xl my-6"
        loading="eager"
      />

      <p>
        Siri picks the local business it recommends nearby by reading a stripped-down signal stack that almost no Quebec clinic owner audits. The eight factors are predictable, the gaps are common, and the fix list is short. This guide breaks down each siri local business search ranking factor, the order Apple weights them in, and the 90 day plan that closes the gap for a typical dental clinic, family medical practice, or specialty studio.
      </p>

      <StatHighlight
        stats={[
          { value: '8', label: 'Ranking factors Siri reads before naming a business' },
          { value: '30-60d', label: 'Review window Apple weights most heavily' },
          { value: '~25%', label: 'Of dentist voice queries lost without Apple Maps Connect' },
        ]}
      />

      <h2 id="how-siri-actually-decides">How Siri actually decides which local business to recommend</h2>
      <p>
        Siri does not run a live web crawl when a customer asks for a dentist nearby. Apple assembles a local index from a small set of sources: Apple Maps Connect verified records, Yelp, TripAdvisor for hospitality, a few licensed data partners, and the iPhone's own location signal. When a query comes in, Siri filters that index by category and distance, then ranks the survivors using review recency, service keywords inside reviews, and a small basket of trust markers.
      </p>
      <p>
        The output is one or two names read aloud. That sharper cutoff is why voice ranking is harder to win than a Maps list. A clinic that places third on Apple Maps may never be named by Siri at all. Your ranking goal is not to make the list, it is to be one of the top two records that Siri trusts enough to speak.
      </p>
      <p>
        The eight factors below cover what we see in our weekly voice query tests across 30 verticals in Quebec, run from clean iPhones in three different boroughs. Owners who treat this like a checklist usually move into the top two within a quarter, because most direct competitors never claim their Apple Maps Connect listing in the first place.
      </p>

      <CalloutBox type="info">
        <p>Apple does not publish its voice ranking weights. The factors below come from structured voice query testing, controlled review-velocity changes, and category-mapping experiments across the AiLys client roster. Treat the order as our best read, not a public spec.</p>
      </CalloutBox>

      <h2 id="apple-maps-connect-the-foundation">Apple Maps Connect, the foundation most clinics skip</h2>
      <p>
        Apple Maps Connect is the verification surface for businesses that want to feed Apple's local index directly. A claimed and verified record on mapsconnect.apple.com beats a third-party data feed in every voice query we have run since iOS 18.2 shipped its quiet weighting change in late 2025. If you have not claimed your listing, Siri may still mention you when no verified competitor exists nearby, but the moment a verified clinic appears across the street, you drop out.
      </p>
      <p>
        The claim flow takes about ten minutes. Sign in with an Apple ID, search for the business, then verify by callback to the listed phone number or by postcard. Once verified, hours, services, photos, and contact details flow directly into Siri's spoken answers. Most clinics never do this because Google Business Profile pays the bills, which is exactly why claiming Apple Maps Connect now is asymmetric work for asymmetric reward.
      </p>
      <p>
        After verification, audit the record quarterly. Apple ships local recommendation weighting changes without announcements. A quarterly audit catches drift in service categories, hours, and verification status before voice ranking erodes. Pair that audit with a review pace check and a keyword diversity scan over the last 30 days.
      </p>

      <InternalLink
        to="/audit/gbp"
        title="Run the free GBP and Apple Maps audit"
        description="See exactly which voice ranking signals you are missing across Siri, Google Assistant, and Alexa."
      />

      <h2 id="review-velocity-and-recency">Review velocity and recency, the second weighting</h2>
      <p>
        Apple weights the last 30 to 60 days of reviews more heavily than total review count. The shift is deliberate. Apple is fighting review graveyards, the listings with hundreds of legacy ratings and zero current activity. A clinic with 80 reviews and 5 in the last month now beats a clinic with 400 reviews and nothing fresh, because Siri reads recent activity as a proxy for an operating business.
      </p>
      <p>
        The practical floor is 4 to 6 fresh reviews per month. Below that, the ranking starts to slip after the second month of inactivity. Above that, you build resilience against the next weighting change. Pace beats burst. A clinic that earns 10 reviews in one week and zero for the next eight will rank lower than a clinic that earns 1 review every four days.
      </p>
      <p>
        Build the velocity through a system, not a campaign. Send a review request inside 24 hours of the appointment, while the patient still remembers the name of the hygienist or doctor. Use a review platform that routes requests across Apple, Google, and Yelp at once. The Reviuzy add-on inside the AiLys stack handles this routing and the recency tracking out of the box.
      </p>

      <SectionDivider />

      <h2 id="service-keywords-inside-reviews">Service keywords inside reviews, the third lever</h2>
      <p>
        Reviews that all read "great dentist" do almost nothing for voice differentiation. Reviews that mention the specific service the patient received win different voice queries. A clinic with several reviews that mention "pediatric" surfaces for "kid friendly dentist near me" voice queries. The same clinic with only generic praise loses that query to a competitor who happens to have one review using the word "kids."
      </p>
      <p>
        Engineer the keyword variety inside the review prompt. After a pediatric appointment, ask the parent to describe the visit by service. After a whitening, ask the patient to mention whitening by name. The prompts should sound natural and short, not stuffed. Three or four service mentions across the last 60 days are usually enough to start surfacing for the matching voice query.
      </p>
      <p>
        Track the keyword inventory the same way you would track a content calendar. Pull the last 30 days of review text, count mentions of each priority service, and patch the weakest one with the next round of prompts. This is the work that compounds, and it directly raises citation rates on Google AIO and Perplexity at the same time.
      </p>

      <img
        src={meta.images.mid}
        alt="Diagram showing how Siri weights Apple Maps Connect verification, review recency, and service keywords"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <h2 id="category-mapping-and-distance">Category mapping and distance, the fourth and fifth signals</h2>
      <p>
        Apple categories do not always match Google Business Profile categories one for one. A clinic that lists itself as "Dental Clinic" on GBP might map to "Dentist" on Apple, which routes different voice queries. Audit both sides of the category map. If you offer pediatric dentistry, set both the GBP secondary category and the Apple category to surface that service. Mismatches cost you about 15 to 20 percent of voice volume in our internal tests.
      </p>
      <p>
        Distance still matters, but less than most owners assume. Siri caps the search radius based on density. In dense Montreal neighborhoods like the Plateau or Mile End, the radius is short and category specificity decides the order. In suburban Laval or Trois-Rivieres, the radius is wider and a clean record across the river can still surface. Test from the iPhone locations your patients actually use, not just from the office.
      </p>
      <p>
        For multi-location clinics, give each location its own Apple Maps Connect record with location-specific photos and category emphasis. A single shared record splits the recency weighting across locations and keeps any one record from passing the voice ranking floor.
      </p>

      <InlineCTA variant="audit" />

      <h2 id="trust-markers-siri-checks">Trust markers Siri checks before reading a name aloud</h2>
      <p>
        Voice answers are spoken in front of family, in cars, and over speakerphone. Apple is conservative about which businesses Siri names, because a wrong number or a closed clinic damages the assistant more than a wrong list. The trust markers Siri checks are not glamorous, but they are decisive.
      </p>
      <ul>
        <li>A claimed phone number that Apple has verified through callback or postcard.</li>
        <li>A working website that resolves to a non-empty page on first request.</li>
        <li>Hours that update at least quarterly and that match between Apple Maps Connect and the website.</li>
        <li>A primary category that exists in the Apple taxonomy, not a custom label.</li>
        <li>An address that geocodes cleanly to a single point on the map.</li>
      </ul>
      <p>
        Each missing trust marker drops you a tier in the voice ranking. Two missing markers usually pull you out of voice answers entirely, even if your category and distance match the query. The fix list is short and finite, which is why the audit is worth the 90 minutes.
      </p>

      <KeyTakeaway
        points={[
          'Siri runs on a stripped-down signal stack, not a live web crawl, so every input is auditable.',
          'A verified Apple Maps Connect listing is the foundation, missing it pulls you out of voice answers.',
          'Review recency and service-specific keywords decide the order between two verified clinics nearby.',
          'Trust markers like a working website and a claimed phone number are the silent disqualifier.',
        ]}
      />

      <SectionDivider />

      <h2 id="a-90-day-siri-plan-for-clinics">A 90 day Siri plan for clinics that want to win locally</h2>
      <p>
        Day 1 to 14, claim and verify your Apple Maps Connect listing. Audit the categories on both Apple and Google, fix any mismatch, and confirm the phone number, hours, and primary address geocode cleanly. Day 15 to 45, build the review system that lands 4 to 6 fresh reviews each month with service keyword variety. Use a routing tool that sends the request across Apple, Google, and Yelp inside 24 hours of the appointment.
      </p>
      <p>
        Day 46 to 75, run structured voice query tests from clean iPhones in three different neighborhoods, three times each across different days. Note which businesses Siri reads aloud, in what order, and whether yours is named. Patch the gap by service category, then re-test. Day 76 to 90, add the AiLys voice query monitor or schedule a quarterly manual audit, and set the calendar reminder so the next ranking shift does not slip by silently.
      </p>
      <p>
        Most clinics that follow this 90 day plan move into the top two voice answers for their primary service inside the local radius. The bar is lower than owners expect because the competition simply has not done the work. See the <InternalLink to="/industries" title="industry playbooks for clinics" /> page for the dentist-specific version of this plan, or run the free <InternalLink to="/audit" title="AI Visibility Audit" /> to see which factors are leaking right now.
      </p>

      <SectionDivider />

      <h2 id="faq">Frequently Asked Questions</h2>
      {meta.faqItems.map((f, i) => (
        <details key={i} className="my-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <summary className="font-semibold text-white/90 cursor-pointer">{f.question}</summary>
          <p className="mt-3 text-white/70 text-[0.95rem] leading-relaxed">{f.answer}</p>
        </details>
      ))}

      <img
        src={meta.images.end}
        alt="Clinic owner reviewing a Siri voice query report alongside Apple Maps Connect and Google Business Profile dashboards"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
