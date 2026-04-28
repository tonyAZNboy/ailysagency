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
  slug: 'ga4-local-business-baseline-setup',
  title: 'GA4 baseline setup for a single-location Quebec business',
  metaDescription:
    'A practical Google Analytics 4 baseline for a single-location Quebec business. The events, the consent layer, the AI traffic surface, and the report you actually read.',
  tldr: 'A useful GA4 setup for a single-location Quebec business is small. Five events (page_view, click_call, click_directions, click_book, form_submit), four custom dimensions (page_lang, location_id, ai_engine, ai_referrer), one consent layer per Loi 25, and one weekly report that names AI engine traffic, conversion rate, and the top three landing pages. Anything else is noise.',
  category: 'analytics-attribution',
  tags: ['ga4', 'quebec', 'local seo', 'analytics', 'loi 25', 'analytics-attribution'],
  publishedDate: '2026-04-26',
  updatedDate: '2026-04-26',
  author: AUTHORS.research,
  readTimeMinutes: 8,
  images: {
    hero: '/blog-images/ga4-local-business-baseline-setup/hero.webp',
    mid: '/blog-images/ga4-local-business-baseline-setup/mid.webp',
    end: '/blog-images/ga4-local-business-baseline-setup/end.webp',
  },
  faqItems: [
    {
      question: 'Do I need GA4 if I already track conversions in Google Business Profile?',
      answer:
        'GBP Insights covers events that happen on the GBP listing itself: phone calls, direction requests, photo views. It does not cover what happens once a visitor lands on your website. GA4 picks up there. For a single-location Quebec business that takes any kind of online action (form, booking, online order), GA4 plus GBP Insights is the minimum honest pair.',
    },
    {
      question: 'How do I make GA4 compliant with Loi 25?',
      answer:
        'Wire GA4 behind a consent banner that defaults to denied on first visit, gates analytics_storage and ad_storage to explicit accept, logs the consent decision with a hashed visitor token in your own ledger, and offers a clear withdraw link in the footer. The banner copy must explain what is collected and why in plain Quebec French. The implementation is in the Loi 25 section below.',
    },
    {
      question: 'Which GA4 events should a small business actually track?',
      answer:
        'Five events are enough for a single-location business. page_view (auto), click_call (clicks on tel links), click_directions (clicks on map links), click_book (clicks on booking links or buttons), form_submit (every form including contact, quote, newsletter). Adding a sixth event for online order or checkout if you sell. More than that is dashboard noise that nobody reads.',
    },
    {
      question: 'Can I see traffic from ChatGPT or Perplexity inside GA4 without a custom setup?',
      answer:
        'Partially. GA4 sees the referrer host (chat.openai.com, perplexity.ai, etc.) but does not auto-classify it as AI traffic. You need a custom dimension and a small JavaScript snippet that reads the referrer and the utm_source on landing, writes to a hidden form field or a custom event parameter, and surfaces the AI engine name. Our companion guide on tracking ChatGPT traffic in GA4 has the snippet.',
    },
    {
      question: 'What is the cheapest way to keep GA4 reliable long term?',
      answer:
        'Server-side tagging via Cloudflare Workers or Vercel Functions for the measurement protocol endpoint, a single GA4 property (not one per language or per page kind), and a quarterly review of custom dimensions to drop any that no team member opens. Hosting cost is typically zero to twenty dollars CAD a month at low traffic. Our companion guide on server-side tagging on Vercel covers the practical setup.',
    },
  ],
  relatedSlugs: [
    'track-chatgpt-traffic-in-ga4',
    'utm-strategy-multi-location-business',
    'server-side-tagging-on-vercel-quebec',
    'call-tracking-google-maps-bookings',
  ],
  headings: [
    { id: 'why-baseline-not-blank', text: 'Why a baseline beats a blank GA4 property' },
    { id: 'the-five-events', text: 'The five events that cover a local business' },
    { id: 'custom-dimensions', text: 'Custom dimensions, four are enough' },
    { id: 'loi-25-consent-layer', text: 'The Loi 25 consent layer' },
    { id: 'ai-traffic-surface', text: 'Surfacing AI engine traffic inside GA4' },
    { id: 'one-weekly-report', text: 'The one weekly report you actually read' },
    { id: 'common-mistakes', text: 'Common mistakes that quietly break attribution' },
    { id: 'shipping-checklist', text: 'A two-hour shipping checklist' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        A useful GA4 setup for a single-location Quebec business is small.
        Five events. Four custom dimensions. One consent layer that satisfies
        Loi 25. One weekly report that names what changed. Everything else is
        a dashboard nobody opens after week three.
      </p>

      <StatHighlight
        stats={[
          { value: '5 events', label: 'cover most local-business reporting needs' },
          { value: '4 dimensions', label: 'enough to slice by lang, location, AI engine, referrer' },
          { value: '~2 hours', label: 'to set up the baseline end to end' },
        ]}
      />

      <p>
        This guide is the baseline AiLys ships for Starter and Core clients on
        their first onboarding week. It is opinionated. It assumes a single
        location, a bilingual EN and FR-CA site, and a Loi 25 obligation.
        Multi-location and Agency-tier setups extend it but never replace it.
      </p>

      <SectionDivider />

      <h2 id="why-baseline-not-blank">Why a baseline beats a blank GA4 property</h2>
      <p>
        A blank GA4 property starts auto-tracking page_view, scroll, click,
        file_download, and a few others. The data lands somewhere. The team
        still cannot answer the only three questions that matter: did anyone
        call, did anyone book, where did they come from. A baseline names
        those questions in advance and wires the events that answer them.
      </p>

      <CalloutBox type="tip">
        The smallest useful question a local business can ask GA4 is: of the
        people who landed on the site this week, how many did one of the four
        things we built the site to enable. Everything else is supporting
        evidence.
      </CalloutBox>

      <SectionDivider />

      <h2 id="the-five-events">The five events that cover a local business</h2>
      <p>
        page_view comes free. The other four are explicit clicks or submits
        that the team needs to wire. Each one maps to a real human action.
      </p>
      <ul>
        <li><strong>click_call</strong>: every click on a `tel:` link, with the page path as parameter</li>
        <li><strong>click_directions</strong>: every click on a Google Maps directions link, Apple Maps link, or "Get directions" button</li>
        <li><strong>click_book</strong>: every click that opens a booking flow, whether internal calendar, Calendly, OpenTable, or a `mailto:` for an enquiry</li>
        <li><strong>form_submit</strong>: every form on the site, including the newsletter and contact</li>
      </ul>
      <p>
        That is enough to compute the single number a local business reads
        every week: the conversion rate from session to action.
      </p>

      <SectionDivider />

      <h2 id="custom-dimensions">Custom dimensions, four are enough</h2>
      <p>
        Custom dimensions make events sliceable. Four are enough. Adding more
        creates a maintenance burden no team member will pay.
      </p>
      <ul>
        <li><strong>page_lang</strong>: en or fr, read from the html lang attribute on landing</li>
        <li><strong>location_id</strong>: the location slug, usually a single value for now but ready for the second site when it opens</li>
        <li><strong>ai_engine</strong>: chatgpt, perplexity, claude, gemini, copilot, googleaio, or empty if not from an AI engine</li>
        <li><strong>ai_referrer</strong>: the referrer host name when the visitor came directly from chat.openai.com, perplexity.ai, gemini.google.com, copilot.microsoft.com, or similar</li>
      </ul>

      <CalloutBox type="info">
        Custom dimensions cost nothing to define but cost a lot to clean up
        once a stale one is referenced in fifteen reports. Four is the
        ceiling for a single-location baseline. Add a fifth only when a
        named question forces it.
      </CalloutBox>

      <SectionDivider />

      <h2 id="loi-25-consent-layer">The Loi 25 consent layer</h2>
      <p>
        Quebec's Loi 25 modernization act mandates explicit consent before
        any non-essential data collection. GA4 default-loaded on every page
        is non-compliant. The fix is a consent banner that defaults to
        denied, surfaces analytics_storage and ad_storage explicitly, and
        gates the gtag config call behind the accept event.
      </p>
      <p>
        The five-layer compliance shape AiLys ships:
      </p>
      <ol>
        <li>Banner appears on first visit, defaults to denied for analytics_storage and ad_storage</li>
        <li>Plain Quebec French copy explains what is collected and why</li>
        <li>Accept and refuse buttons are equally prominent (not greyed out)</li>
        <li>The consent decision is logged with a hashed visitor token in your own ledger, kept seven years per Loi 25 retention rules</li>
        <li>A withdraw consent link sits in the footer, removes the cookies, and re-locks the property</li>
      </ol>

      <InlineCTA
        variant="audit"
        text="Curious whether your current site already passes a Loi 25 review? Our free 24-hour AI Visibility audit names the gaps."
      />

      <SectionDivider />

      <h2 id="ai-traffic-surface">Surfacing AI engine traffic inside GA4</h2>
      <p>
        AI engine traffic does not appear inside GA4 as "AI" by default. It
        lands as direct, or as referral with a host like chat.openai.com or
        perplexity.ai. The custom dimensions ai_engine and ai_referrer fix
        this. A small inline script reads the referrer and any utm_source
        on landing, normalizes both into a six-name vocabulary, and writes
        the value to a session-level user property.
      </p>

      <InternalLink
        to="/blog/track-chatgpt-traffic-in-ga4"
        title="Track ChatGPT traffic in GA4"
        description="The companion guide with the exact snippet, UTM convention, and a sample explore report"
      />

      <p>
        Once the dimension is populated, every standard GA4 explore can slice
        traffic by ai_engine. Per-engine conversion rate, top landing pages
        per engine, citation freshness alerts when an engine drops to zero
        for a week. All of it works without leaving the standard GA4 UI.
      </p>

      <CalloutBox type="warning">
        Do not put AI engine names inside utm_source in your own outbound
        links. utm_source is for traffic you control. The AI engine is the
        referrer, not the source. Conflating the two corrupts attribution
        across your other campaigns.
      </CalloutBox>

      <SectionDivider />

      <h2 id="one-weekly-report">The one weekly report you actually read</h2>
      <p>
        Build one explore. Title it "Weekly local read." Six rows. The list
        below. Send it as a Looker Studio link to the team every Monday
        morning at 8:00 AM Eastern.
      </p>
      <ol>
        <li>Sessions, last 7 days vs prior 7</li>
        <li>Conversion rate (any of the four custom events / sessions)</li>
        <li>Sessions by ai_engine, top six</li>
        <li>Top three landing pages by sessions</li>
        <li>Top three landing pages by conversion rate</li>
        <li>Loi 25 consent acceptance rate (accept events / banner impressions)</li>
      </ol>

      <QuickQuiz
        question="Which row in the weekly report is the most useful for a local business owner who has limited time?"
        options={[
          'Sessions, last 7 days vs prior 7 (volume only)',
          'Conversion rate (action / sessions)',
          'Top three landing pages by sessions (popularity)',
          'Loi 25 consent acceptance rate (compliance signal)',
        ]}
        correctIndex={1}
        explanation="Volume alone hides whether the site does its job. The conversion rate row collapses every interaction signal into one number that answers the question that matters: are visitors actually doing the four things we built the site to enable. The other rows are useful supporting evidence but the conversion rate is the headline."
      />

      <SectionDivider />

      <h2 id="common-mistakes">Common mistakes that quietly break attribution</h2>
      <ul>
        <li>Loading gtag before the consent banner clears (Loi 25 violation, also pollutes the data with bot pre-loads)</li>
        <li>Two GA4 properties (one for EN site, one for FR site). Use one property and split with the page_lang dimension.</li>
        <li>UTM-decorating links that go between your own pages. Internal navigation should never carry utm parameters; they overwrite real session sources.</li>
        <li>Tracking scroll depth on every page. The default scroll trigger fires at 90% and is rarely actionable for a local business.</li>
        <li>Skipping form_submit because there is "only the contact form." Newsletter signups, quote requests, callback forms all qualify and matter.</li>
      </ul>

      <CalloutBox type="danger">
        The single biggest attribution killer is internal links carrying
        utm_source. A click from your own homepage to a service page should
        never overwrite the visitor's original source. If you find utm_source
        on internal links, strip them today.
      </CalloutBox>

      <SectionDivider />

      <h2 id="shipping-checklist">A two-hour shipping checklist</h2>
      <ol>
        <li>Create a single GA4 property and paste the measurement ID into the site config (10 min)</li>
        <li>Wire the four custom events (click_call, click_directions, click_book, form_submit) via gtag (30 min)</li>
        <li>Define the four custom dimensions and confirm they appear in the GA4 admin (10 min)</li>
        <li>Drop in the consent banner with the Loi 25 five-layer pattern (40 min)</li>
        <li>Add the AI engine detection snippet that populates ai_engine and ai_referrer (15 min)</li>
        <li>Build the weekly explore in Looker Studio with the six rows above (10 min)</li>
        <li>Test on a private window, accept consent, click each tracked element, confirm events appear in DebugView (5 min)</li>
      </ol>

      <KeyTakeaway
        points={[
          'Five events and four custom dimensions cover most single-location reporting',
          'The consent layer is not optional in Quebec; Loi 25 mandates explicit accept before analytics_storage',
          'AI engine traffic is invisible until you wire ai_engine and ai_referrer dimensions',
          'One weekly report with six rows beats a 40-tile dashboard that nobody opens',
          'Internal links with utm_source are the single biggest attribution killer; strip them',
        ]}
      />

      <InlineCTA
        variant="pricing"
        text="Want this baseline plus citation tracking, GBP optimization, and AI Visibility shipped in week one? See the AiLys plans built for local businesses."
      />

      <img
        src={meta.images.end}
        alt="Looker Studio weekly explore with the six row local business report tiled on a quiet Monday morning desk"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <InlineCTA
        variant="book"
        text="Want a 60-minute strategy call to walk through your current GA4 baseline? No pitch, strategy doc sent regardless."
      />

      <h2 id="faq">Frequently Asked Questions</h2>
      {meta.faqItems.map((f, i) => (
        <details key={i} className="my-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <summary className="font-semibold text-white/90 cursor-pointer">{f.question}</summary>
          <p className="mt-3 text-white/70 text-[0.95rem] leading-relaxed">{f.answer}</p>
        </details>
      ))}
    </article>
  )
}
