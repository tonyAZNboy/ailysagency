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
  slug: 'google-review-velocity-playbook',
  title: 'Google review velocity, how many reviews you need for the local pack',
  metaDescription:
    'How many Google reviews do you need to rank in the local pack? Here is the velocity playbook with monthly targets, recency weighting, and the ratios that actually move ranking.',
  tldr: 'Most local businesses need 80 to 150 lifetime Google reviews with 4 to 6 fresh ones every month to hold a local pack position. Total count matters less than recency. Google now weights the last 60 days more heavily, so steady velocity beats a one-time burst. The exact target depends on the competitor floor in your category and city.',
  category: 'reputation-reviews',
  tags: ['google reviews', 'review velocity', 'local pack', 'reputation', 'local seo'],
  publishedDate: '2026-02-13',
  updatedDate: '2026-02-13',
  author: AUTHORS.strategy,
  readTimeMinutes: 9,
  images: {
    hero: '/blog-images/google-review-velocity-playbook/hero.webp',
    mid: '/blog-images/google-review-velocity-playbook/mid.webp',
    end: '/blog-images/google-review-velocity-playbook/end.webp',
  },
  faqItems: [
    {
      question: 'How many Google reviews do I need to rank in the local pack?',
      answer:
        'Most local businesses need 80 to 150 lifetime reviews with 4 to 6 fresh ones every month to hold a local pack position. The exact target is set by the competitor floor in your category and city. Audit the second-place and fifth-place competitors in the local pack, then beat the average between them by 25 percent on lifetime count and match them on monthly velocity.',
    },
    {
      question: 'Does review recency matter more than total review count?',
      answer:
        'Yes since the 2024 weighting shift on Google and the iOS 18.2 change on Apple Maps. A clinic with 80 reviews and 5 in the last 30 days now outranks a clinic with 400 reviews and zero recent activity. Recency reads as a signal that the business is currently operating and currently delivering. The honest target is steady velocity, not a quarterly burst followed by silence.',
    },
    {
      question: 'How fast should I respond to a Google review?',
      answer:
        'Within 24 hours for negative reviews, within 72 hours for positive ones. Response speed and rate are direct ranking inputs. Businesses that respond to over 80 percent of reviews inside one week outrank businesses with no response habit, even when star averages are equal. Use a template stack so the response is fast without sounding generic.',
    },
    {
      question: 'Are review gating tools allowed by Google?',
      answer:
        'No. Sending only happy customers to Google while routing unhappy ones to a private feedback form violates Google review policies and can flag your listing. The compliant version is to ask every customer for a review with the same prompt, then handle service recovery separately if the experience was poor. Most enforcement actions we have seen come from a survey question that filters by satisfaction before showing the Google link.',
    },
    {
      question: 'How do I get more Google reviews without violating policy?',
      answer:
        'Send a review request inside 24 hours of the visit, with a direct link to your Google Business Profile review page. Ask every customer, not just happy ones. Use a routing tool that signs the request with the staff name. Service-keyword variety in the prompt boosts AI Overview citation rates as a bonus. Skip incentives that condition payment on a positive review, since Google penalizes those.',
    },
  ],
  relatedSlugs: [],
  headings: [
    { id: 'what-review-velocity-actually-means', text: 'What Google review velocity actually means in 2026' },
    { id: 'the-numbers-by-category', text: 'The numbers by category, what 80, 150, and 300 reviews really buy you' },
    { id: 'the-recency-window-google-watches', text: 'The recency window Google watches and why it changed' },
    { id: 'how-to-engineer-the-monthly-pace', text: 'How to engineer the monthly pace without violating policy' },
    { id: 'response-rate-as-a-ranking-input', text: 'Response rate as a ranking input most owners ignore' },
    { id: 'review-text-keywords-and-ai-engines', text: 'Review text keywords and how AI engines reuse them' },
    { id: 'a-90-day-velocity-build', text: 'A 90 day velocity build plan for stalled listings' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        Most local businesses need 80 to 150 lifetime Google reviews with 4 to 6 fresh ones every month to hold a local pack position in 2026. The exact google review velocity target depends on the competitor floor in your category and city, but the framework is the same. Total count matters less than recency, response rate matters more than most owners realize, and the keyword variety inside review text now feeds AI Overview citations directly. Here is how the math plays out and how to engineer the pace without violating Google policy.
      </p>

      <StatHighlight
        stats={[
          { value: '80-150', label: 'Lifetime reviews most local businesses need' },
          { value: '4-6', label: 'Fresh reviews per month to hold ranking' },
          { value: '60 days', label: 'Recency window Google now weights heaviest' },
        ]}
      />

      <h2 id="what-review-velocity-actually-means">What Google review velocity actually means in 2026</h2>
      <p>
        Review velocity is the number of new reviews per unit of time, weighted by recency. Two business profiles with the same star average and the same lifetime count can rank very differently if one is earning steady reviews each month and the other has been silent since the holidays. Google reads silence as a sign that the business may be in decline, even if the operator knows the work is going great.
      </p>
      <p>
        Velocity is not the same as volume. A clinic that earns 30 reviews in one launch week and zero for the next 12 weeks ranks below a clinic that earns 1 review every four days for the same quarter. The local pack algorithm has learned to discount bursts. The pattern looks contrived, and the recency weighting kicks in immediately after the burst ends.
      </p>
      <p>
        Velocity also interacts with response rate. A profile that earns 6 reviews per month and replies to all 6 outranks a profile that earns 6 reviews per month and replies to none. The reply text itself becomes a citation surface for AI engines, which is a quiet bonus that owners with active reply habits collect for free.
      </p>

      <CalloutBox type="info">
        <p>The google review velocity floor is set by the competitor cluster, not by an absolute number. In dense urban categories, the floor is higher because the cluster is more competitive. In rural or specialty markets, 30 lifetime reviews and 2 per month can hold the top map pack position. Audit your cluster before you set your monthly target.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="the-numbers-by-category">The numbers by category, what 80, 150, and 300 reviews really buy you</h2>
      <p>
        The honest answer to "how many Google reviews do I need" is "what does your local pack look like." We pulled review counts from the top 30 local pack winners across six AiLys client categories in Quebec to build a working baseline. The pattern is consistent across categories.
      </p>
      <ul>
        <li><strong>Dental clinics:</strong> 80 to 150 lifetime reviews, 4 to 6 fresh per month, average 4.7 stars or higher.</li>
        <li><strong>Restaurants in dense neighborhoods:</strong> 200 to 400 lifetime reviews, 8 to 15 fresh per month, average 4.5 stars or higher.</li>
        <li><strong>Law firms (family or immigration):</strong> 30 to 80 lifetime reviews, 2 to 4 fresh per month, average 4.8 stars or higher.</li>
        <li><strong>Specialty retailers:</strong> 100 to 250 lifetime reviews, 5 to 10 fresh per month, depending on transaction frequency.</li>
        <li><strong>Home service contractors:</strong> 50 to 120 lifetime reviews, 3 to 6 fresh per month, response rate over 80 percent.</li>
        <li><strong>Hotels and B and Bs:</strong> 150 to 350 lifetime reviews split across Google, TripAdvisor, and Booking.</li>
      </ul>
      <p>
        These are floors, not ceilings. Hitting the floor gets you into the local pack. Beating the cluster average by 25 percent on lifetime count and matching it on monthly velocity moves you into the top three positions. Going beyond is diminishing returns unless your competitor density is unusually high.
      </p>

      <InternalLink
        to="/audit"
        title="Free AI Visibility Audit"
        description="Includes a review velocity benchmark against your top five local pack competitors."
      />

      <SectionDivider />

      <h2 id="the-recency-window-google-watches">The recency window Google watches and why it changed</h2>
      <p>
        Google quietly shifted toward a 60 day recency window during 2024 and held it through 2025. The change was a response to review graveyards, the listings with thousands of legacy ratings and zero current activity. Apple shipped the same shift inside iOS 18.2 with a 30 to 60 day window. The two algorithms converged on the same answer because the same problem applied.
      </p>
      <p>
        For an operator, the implication is sharp. A clinic that earned 80 reviews two years ago and stopped asking is sliding down the ranking even as its star average holds steady. A clinic that earns 5 reviews every month is climbing. The reordering can happen inside one quarter, which is faster than most owners expect from a review-driven signal.
      </p>
      <p>
        The fix is steady velocity, not a campaign. A campaign that doubles your monthly count for a month and then ends will not hold the new ranking. Build a system that pushes a review request after every transaction and you will keep the recency weighting on your side without working harder.
      </p>

      <CalloutBox type="tip">
        <p>The single biggest edit to a stalled review program is moving the request from "next-day batched email" to "same-day SMS sent at the front desk." Same-day SMS roughly doubles response rates because the visit is still fresh in the customer's mind, which is exactly the moment the review writes itself.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="how-to-engineer-the-monthly-pace">How to engineer the monthly pace without violating policy</h2>
      <p>
        The mechanics are simple. Send a review request inside 24 hours of the visit, with a direct link to the Google Business Profile review page. Ask every customer, not just the happy ones. Use a routing tool that signs the request with the staff name and language preference. Service-keyword variety in the prompt boosts AI Overview citation rates as a bonus.
      </p>
      <p>
        What to avoid: review gating tools that filter by satisfaction before showing the Google link. Google calls this practice deceptive and has issued enforcement actions on listings caught doing it. The compliant version is to ask everyone with the same prompt, then handle service recovery separately if the experience was poor. The unhappy customer can still leave a review. The right move is to respond well, not to hide them.
      </p>
      <p>
        Incentives are also restricted. Google forbids conditioning payment, discounts, or services on a positive review. A flat thank-you email or a small post-review token of appreciation that does not depend on star rating is the safe surface. The Reviuzy add-on inside the AiLys stack handles the routing, the recency pace, and the policy guardrails out of the box.
      </p>

      <img
        src={meta.images.mid}
        alt="Diagram showing the 24 hour review request flow from appointment to Google Business Profile review page"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <QuickQuiz
        question="Two local businesses share the same star average and the same lifetime review count. Why does Google rank one higher in the local pack?"
        options={[
          'Whichever business signed up for Google Ads earlier',
          'The business that hides negative reviews behind a satisfaction filter',
          'The business with steady recent review velocity, weighted by the last 60 days',
          'Whichever business has the older Google Business Profile creation date',
        ]}
        correctIndex={2}
        explanation="Google now weights the last 60 days of reviews more heavily than total count. A business with 5 fresh reviews this month outranks a business that earned all its reviews two years ago, because recency reads as a signal that the operation is currently delivering."
      />

      <SectionDivider />

      <h2 id="response-rate-as-a-ranking-input">Response rate as a ranking input most owners ignore</h2>
      <p>
        Response rate is a direct ranking input that most owners underweight. Businesses that respond to over 80 percent of reviews inside one week outrank businesses with no response habit, even when star averages are equal. Negative reviews carry the highest payoff for replies because the response is visible to every future customer skimming the profile.
      </p>
      <p>
        Build a template stack, not a script. The stack should cover four scenarios: positive review with a service mention, positive review with a generic comment, negative review with a fact-correctable claim, and negative review with an opinion. Each template stays under 100 words and ends with a personalized close that names the staff member. A response that takes 90 seconds beats a response that sounds generic.
      </p>
      <p>
        Reply within 24 hours for negative reviews, within 72 hours for positive ones. Speed signals that the operator is paying attention. The reply text becomes part of the page's citation surface for AI engines like Google AIO and Perplexity, which now lift response patterns into their summaries about the business.
      </p>

      <InlineCTA variant="audit" />

      <SectionDivider />

      <h2 id="review-text-keywords-and-ai-engines">Review text keywords and how AI engines reuse them</h2>
      <p>
        Review text is no longer just a star rating. AI engines mine the words inside reviews to answer service-specific queries. A clinic with multiple reviews mentioning "pediatric" will surface for "kid friendly dentist near me" voice queries and AI Overview answers. A clinic with reviews that all read "great clinic" wins nothing on differentiation.
      </p>
      <p>
        Engineer the keyword variety. After a pediatric appointment, ask the parent to describe the visit by service. After a whitening, ask the patient to mention whitening by name. The prompt should sound natural and short. Three or four service mentions across the last 60 days are usually enough to start surfacing for the matching query.
      </p>
      <p>
        Track the inventory the same way you would track a content calendar. Pull the last 30 days of review text, count mentions of each priority service, and patch the weakest one with the next round of prompts. This work compounds and it raises citation rates on Siri, Google AIO, and Perplexity at the same time.
      </p>

      <CalloutBox type="warning">
        <p>Avoid services that promise hundreds of reviews from purchased accounts or that funnel reviews through third-party landing pages designed to filter unhappy customers. Google detects both patterns and applies enforcement actions that can suspend the listing entirely. The compliant fix list is short and durable: same-day prompts, equal access to the review link, and zero conditional incentives.</p>
      </CalloutBox>

      <InlineCTA variant="book" text="Want a 60 minute walk-through of the cluster benchmark and the response template stack on your own listing? Book a strategy call, no pitch." />

      <InternalLink
        to="/glossary/review-velocity"
        title="Review velocity glossary"
        description="Plain-language definitions for recency window, response rate, and the rest of the local pack ranking vocabulary."
      />

      <KeyTakeaway
        points={[
          'Most local businesses need 80 to 150 lifetime reviews with 4 to 6 fresh per month to hold ranking.',
          'Recency now beats total count. Google watches the last 60 days, Apple the last 30 to 60.',
          'Response rate over 80 percent inside one week is a direct ranking input.',
          'Review text keywords feed AI Overview and voice search citations, engineer the variety.',
        ]}
      />

      <SectionDivider />

      <h2 id="a-90-day-velocity-build">A 90 day velocity build plan for stalled listings</h2>
      <p>
        Day 1 to 14, audit the cluster. Pull the lifetime count and last 30 day count for the top five local pack competitors in your category. Set the monthly target to 4 reviews above the cluster average, with response rate over 80 percent. Day 15 to 30, install the routing tool that sends a review request inside 24 hours of every visit, with bilingual support if the market requires it.
      </p>
      <p>
        Day 31 to 60, build the response template stack and assign the daily reply window to a named owner. Aim for 24 hour reply on negatives, 72 hour reply on positives. Day 61 to 90, audit the keyword inventory, patch the weakest service, and rerun the cluster benchmark. Most stalled listings move two positions in the local pack inside this 90 day window if the system runs every day, not just at the launch.
      </p>
      <p>
        Past day 90, the work becomes maintenance. Schedule the cluster benchmark each quarter, the keyword audit each month, and the response habit every business day. For the dentist-specific version of the velocity build, see the <InternalLink to="/industries" title="industry playbooks" /> hub. Owners who want a fast diagnostic can run the free <InternalLink to="/audit" title="AI Visibility Audit" /> first, then book a strategy call to size the program.
      </p>

      <InlineCTA variant="pricing" text="Need a managed review velocity program with the SMS routing, the response stack, and the cluster benchmark on autopilot? See AiLys plans for local businesses." />

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
        alt="Local business owner reviewing a Google review velocity dashboard with monthly pace and response rate"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
