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
  slug: 'track-chatgpt-traffic-in-ga4',
  title: 'Track ChatGPT traffic in GA4, the working setup for local owners',
  metaDescription:
    'How to see ChatGPT traffic inside Google Analytics 4. The referral patterns to watch, the channel group rule, the UTM convention, and the conversion tracker for AI search.',
  tldr: 'GA4 does not track ChatGPT traffic out of the box. Most of it lands as Direct because ChatGPT strips referrers on most click types. The fix is a custom channel group with a referral host list, a UTM convention for links you control, and a small Looker Studio view that pulls AI Traffic into one panel. Setup takes about 90 minutes and produces a clean signal inside one week.',
  category: 'analytics-attribution',
  tags: ['ga4', 'chatgpt', 'analytics', 'attribution', 'ai-traffic'],
  publishedDate: '2026-02-15',
  updatedDate: '2026-02-15',
  author: AUTHORS.product,
  readTimeMinutes: 9,
  images: {
    hero: '/blog-images/track-chatgpt-traffic-in-ga4/hero.webp',
    mid: '/blog-images/track-chatgpt-traffic-in-ga4/mid.webp',
    end: '/blog-images/track-chatgpt-traffic-in-ga4/end.webp',
  },
  faqItems: [
    {
      question: 'How do I see traffic from ChatGPT in Google Analytics 4?',
      answer:
        'Build a custom channel group with a referral host list that covers the ChatGPT hosts and the other AI engines like Perplexity, Gemini, and Bing Copilot. Add a UTM convention on every link you publish so the click is taggable when ChatGPT preserves the parameters. Then build a Looker Studio panel that filters Traffic Acquisition by your AI Engines channel.',
    },
    {
      question: 'Why does ChatGPT traffic show up as Direct in GA4?',
      answer:
        'ChatGPT strips referrers on many click types because the answer panel routes through a redirect that does not pass the referer header. Some clicks preserve the host, most do not. The mix shows up in GA4 as Direct because Direct is the fallback channel when the referrer is missing. The fix is a custom channel group plus UTMs on the links you control inside your own content and citations.',
    },
    {
      question: 'Do I need server side tagging to track ChatGPT traffic?',
      answer:
        'No, the basic setup works inside GA4 with the standard tag. Server side tagging gives you cleaner attribution and lets you enrich the AI Engines channel with first-party context, but it is not required for week one. Start with the channel group and the UTM convention. Add server side tagging in a later sprint if AI Traffic becomes a meaningful share of conversions.',
    },
    {
      question: 'Which UTM source value should I use for AI engines?',
      answer:
        'Use a stable convention so cross-engine reports stay clean. We use utm_source=chatgpt, utm_source=perplexity, utm_source=claude, utm_source=gemini, utm_source=googleaio, utm_source=bingcopilot. utm_medium stays as ai_search across all of them. utm_campaign names the content piece. The convention matters more than the exact words. Pick one, document it, and stop changing it.',
    },
    {
      question: 'How fast does AI Traffic show up after the GA4 setup?',
      answer:
        'You can see the first AI Engines channel hits inside 24 hours if you publish content that earns AI citations and your channel group rule is correct. Meaningful weekly volume usually shows by week two for a local business that already ranks in AI Overviews. If the panel stays empty for two weeks, the issue is upstream, namely the AI engines do not cite your site yet.',
    },
  ],
  relatedSlugs: [],
  headings: [
    { id: 'why-chatgpt-traffic-is-invisible-by-default', text: 'Why ChatGPT traffic is invisible in GA4 by default' },
    { id: 'the-ga4-custom-channel-group', text: 'The GA4 custom channel group for AI engines' },
    { id: 'the-utm-convention-that-survives-ai-routing', text: 'The UTM convention that survives AI routing' },
    { id: 'the-referral-host-list-to-watch', text: 'The referral host list to watch for ChatGPT and friends' },
    { id: 'looker-studio-panel-for-ai-traffic', text: 'A Looker Studio panel that surfaces AI Traffic in one view' },
    { id: 'conversion-tracking-for-ai-search', text: 'Conversion tracking for AI search, what counts and what does not' },
    { id: 'common-failure-modes-and-fixes', text: 'Common failure modes and the 5 minute fixes' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        Google Analytics 4 does not track chatgpt traffic in google analytics out of the box. Most of it lands as Direct because the AI panels strip referrers on common click types. The working fix has three parts: a custom channel group with a referral host list, a UTM convention on the links you control, and a small Looker Studio view that pulls AI Traffic into one panel. Setup takes about 90 minutes and produces a clean signal inside one week. This guide walks through every step with the exact configuration values.
      </p>

      <StatHighlight
        stats={[
          { value: '90 min', label: 'Setup time end to end inside GA4' },
          { value: '24 hours', label: 'Until the first AI Engines hits show up' },
          { value: '6 sources', label: 'AI engines worth tracking by name today' },
        ]}
      />

      <h2 id="why-chatgpt-traffic-is-invisible-by-default">Why ChatGPT traffic is invisible in GA4 by default</h2>
      <p>
        GA4 classifies traffic into Default Channels using a rule cascade that checks the referrer, the medium, and the source. When a user clicks a citation inside a ChatGPT answer, the click often passes through a redirect that does not preserve the referer header. The browser arrives at your site with no referrer at all, and GA4 falls back to Direct as the bucket for missing context.
      </p>
      <p>
        Direct is a noisy bucket. It mixes bookmarked visits, manually typed URLs, app deep links, email clicks from desktop clients that strip referrers, and AI engine clicks. If you check Traffic Acquisition and see Direct climbing while other channels stay flat, the suspects are AI engine clicks and email opens, not real type-ins. The job is to separate the AI engine slice out so the report tells the truth.
      </p>
      <p>
        The 2025 GA4 default channel groups added a vague "Organic Search Other" bucket that catches some AI engine traffic, but the coverage is partial and the bucket still mixes in Yandex and Baidu and a long tail of small engines. A custom channel group is the only clean fix that scales as new AI engines enter the mix.
      </p>

      <CalloutBox type="info">
        <p>The AI engine ecosystem moves fast. ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot are the six worth tracking by name today. Add a placeholder rule for "Other AI" so the next engine that emerges has a bucket waiting. Updating the rule list every quarter is part of the maintenance.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="the-ga4-custom-channel-group">The GA4 custom channel group for AI engines</h2>
      <p>
        Create a custom channel group inside GA4. Admin, Property Settings, Channel Groups, then Create new channel group. Name it AI Engines. Add a channel for each engine using a Source matches regex rule. The regex covers the host variations so a domain change at the source does not silently drop the traffic.
      </p>
      <ul>
        <li><strong>ChatGPT:</strong> source matches regex covering both the legacy chat host and the chatgpt.com host.</li>
        <li><strong>Perplexity:</strong> source matches regex <code>perplexity\.ai</code></li>
        <li><strong>Claude:</strong> source matches regex <code>claude\.ai</code></li>
        <li><strong>Gemini:</strong> source matches regex <code>gemini\.google\.com</code></li>
        <li><strong>Google AIO:</strong> source matches regex with the AI Overview parameter your tagging adds, since AIO does not always pass a distinct host.</li>
        <li><strong>Bing Copilot:</strong> source matches regex <code>copilot\.microsoft\.com|bing\.com\/copilot</code></li>
      </ul>
      <p>
        Add the channel group as a secondary dimension on the Traffic Acquisition report. The order of channels inside the group matters because GA4 evaluates rules top down and stops on the first match. Put the most specific engine first and the catch-all "Other AI" last so an unknown engine still gets bucketed into AI rather than slipping into Direct.
      </p>

      <InternalLink
        to="/glossary"
        title="AiLys Glossary"
        description="Plain-language definitions for AI Traffic, Share of Model, AEO, GEO, and the rest of the AI search vocabulary."
      />

      <SectionDivider />

      <h2 id="the-utm-convention-that-survives-ai-routing">The UTM convention that survives AI routing</h2>
      <p>
        The channel group catches traffic when the referrer survives. The UTM convention catches the rest. Tag every link you control inside your own content, your citations, your business directory listings, and your blog posts with a stable UTM set. ChatGPT preserves UTM parameters more often than referrers, especially on cited links inside answer panels.
      </p>
      <p>
        Use a stable source convention. utm_source=chatgpt, utm_source=perplexity, utm_source=claude, utm_source=gemini, utm_source=googleaio, utm_source=bingcopilot. utm_medium stays as ai_search across all engines, which lets you build a single rule that catches every AI engine medium even when the source is unfamiliar. utm_campaign names the content piece or the citation surface, like wikidata_entry or yelp_listing.
      </p>
      <p>
        Document the convention in a single page that the team can reference. The exact words matter less than the consistency. The most common mistake is changing the source value mid-quarter, which shatters cohort comparisons and forces ugly regex rewrites. Pick one set, write it down, and stop changing it.
      </p>

      <CalloutBox type="tip">
        <p>The fastest UTM-convention enforcement is a tiny redirect tag at the edge that lowercases every UTM and rewrites a known-bad alias to the canonical value before GA4 ingests the hit. One redirect rule fixes a year of accidental drift without touching the channel group.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="the-referral-host-list-to-watch">The referral host list to watch for ChatGPT and friends</h2>
      <p>
        Beyond the GA4 channel group, the operator should keep a watch list of referral hosts that show up adjacent to AI traffic. These are the hosts that signal AI engine intent even when the click did not pass through the answer panel directly. Pin them inside Reports, Acquisition, Traffic Acquisition, and add the host as a secondary dimension when you want a fast spot check.
      </p>
      <ul>
        <li><strong>chatgpt.com</strong> and the legacy chat host for ChatGPT search clicks.</li>
        <li><strong>perplexity.ai</strong> for Perplexity citations and follow-up questions.</li>
        <li><strong>claude.ai</strong> for Claude search results.</li>
        <li><strong>gemini.google.com</strong> for Gemini chat referrals.</li>
        <li><strong>google.com/search</strong> with the AI Overview snippet parameter for AIO.</li>
        <li><strong>copilot.microsoft.com, bing.com/copilot</strong> for Bing Copilot.</li>
        <li><strong>duckduckgo.com</strong> for the AI assistant integration.</li>
        <li><strong>kagi.com</strong> for the FastGPT and Universal Summarizer features.</li>
      </ul>
      <p>
        Treat the list as a living document. New AI engines enter the mix every quarter and old ones rebrand or merge. The maintenance habit is to review the host list monthly against the actual referrers showing up in GA4 and the AiLys AI Visibility engine, then add any new host that appears with non-trivial volume.
      </p>

      <img
        src={meta.images.mid}
        alt="Looker Studio panel showing weekly AI Traffic from ChatGPT, Perplexity, and Google AIO with conversion overlay"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <QuickQuiz
        question="A local clinic sees Direct traffic climbing fast in GA4 while Organic Search stays flat. What is the most likely culprit before checking anything else?"
        options={[
          'Customers are typing the URL by hand more than usual',
          'AI engine clicks are landing as Direct because the referrer header is stripped',
          'Google Analytics is undercounting Organic Search this month',
          'A competitor is buying brand traffic on Bing',
        ]}
        correctIndex={1}
        explanation="ChatGPT and other AI panels often route clicks through redirects that drop the referer header. GA4 has nowhere to attribute the click and falls back to Direct. A custom AI Engines channel group plus UTM tags on cited links fixes the gap inside one week."
      />

      <SectionDivider />

      <h2 id="looker-studio-panel-for-ai-traffic">A Looker Studio panel that surfaces AI Traffic in one view</h2>
      <p>
        GA4 reports answer point questions but they are slow for daily monitoring. Build a Looker Studio panel that pulls AI Traffic into one view, filtered by the custom channel group. The panel needs five widgets: weekly AI Traffic by engine, top landing pages by AI engine, conversion rate by AI engine, average session duration by AI engine, and a referral host trend that exposes new engines as they emerge.
      </p>
      <p>
        Connect Looker Studio to the GA4 property using the official connector. Add the AI Engines custom channel group as a dimension. Set the date range to last 28 days for the trend widgets and a 90 day comparison for the conversion widgets. Pin the panel to a saved bookmark so the team checks it weekly without rebuilding the view.
      </p>
      <p>
        For multi-location operators, layer a location filter on top so each branch owner sees the AI Traffic that landed on their location pages. The location filter also exposes the neighborhood entity work that compounds review velocity and AI Overview citations. Owners who track this every week catch the next engine ranking shift inside one or two cycles.
      </p>

      <InlineCTA variant="audit" />

      <SectionDivider />

      <h2 id="conversion-tracking-for-ai-search">Conversion tracking for AI search, what counts and what does not</h2>
      <p>
        AI search conversions usually land later in the funnel than classic SEO. A user reads an AI answer, clicks through to a service page, leaves, then returns through Direct or branded search the next day to book or call. GA4's default conversion modeling will credit the second visit. The fix is to build assisted conversion paths that include the AI Engines channel anywhere in the user journey.
      </p>
      <p>
        Inside GA4, open Advertising, Attribution, Conversion paths. Add the AI Engines custom channel group to the path view. The first-touch and assisted conversion columns reveal the share that AI engines actually opened. We see local clinics where 12 percent of bookings have an AI Engines first-touch even when the same channel is only 3 percent of last-click conversions. The gap is real and it sits inside that report.
      </p>
      <p>
        Define the conversion events that matter for a local business: phone call from the GBP, form submit on the contact page, online booking, calendar tap. Each event needs to be a key event in GA4. Tie the events to the AI Engines channel through the path report and you can argue the AI search ROI with a number that survives a CFO review.
      </p>

      <CalloutBox type="warning">
        <p>The conversion path view is hidden inside Advertising, not Reports. Operators who never open the Advertising surface will miss the AI assist data entirely and conclude that AI search drives nothing. The data is there, the navigation is just buried two clicks deeper than the default Reports view.</p>
      </CalloutBox>

      <InlineCTA variant="book" text="Want a 60 minute walk-through of the GA4 channel group, the UTM doc, and the Looker Studio panel on your own property? Book a strategy call, no pitch." />

      <InternalLink
        to="/glossary/ai-traffic"
        title="AI Traffic glossary"
        description="Plain-language definitions for first-touch, assisted conversion, channel group, and the rest of the AI search analytics vocabulary."
      />

      <KeyTakeaway
        points={[
          'GA4 does not see ChatGPT traffic by default, the custom channel group is the only clean fix.',
          'UTM tagging catches the slice that referrer headers miss, pick a convention and freeze it.',
          'Looker Studio with five widgets gives the operator a daily AI Traffic dashboard.',
          'Conversion path reports reveal the AI Engines first-touch share, which is usually 3 to 4 times the last-click share.',
        ]}
      />

      <SectionDivider />

      <h2 id="common-failure-modes-and-fixes">Common failure modes and the 5 minute fixes</h2>
      <p>
        Failure mode one, the channel group rule order is wrong. GA4 evaluates top down and stops on the first match, so a generic rule placed above ChatGPT will swallow the ChatGPT traffic. Fix by reordering, most specific first. Failure mode two, the regex is too tight. A rule that looks for the legacy chat host only misses the chatgpt.com host that has been more common since 2024. Fix by using the regex with the OR operator that covers both hosts.
      </p>
      <p>
        Failure mode three, the UTM convention drifts. A team that uses utm_source=chatgpt one quarter and utm_source=ChatGPT the next breaks every regex that assumes case sensitivity. Fix by lowercasing every UTM and writing a redirect tag that normalizes case before GA4 ingests the hit. Failure mode four, conversion modeling defaults hide the AI assist. Fix by adding the AI Engines channel to the conversion path view explicitly.
      </p>
      <p>
        For a working template that includes the channel group, the UTM doc, and the Looker Studio panel, see the <InternalLink to="/services/analytics-attribution" title="Analytics and Attribution service" /> page or run the free <InternalLink to="/audit" title="AI Visibility Audit" />, which now ships with a GA4 AI Traffic readiness check. Owners who want a 60 minute walkthrough can <InternalLink to="/book-call" title="book a strategy call" />.
      </p>

      <InlineCTA variant="pricing" text="Need the GA4 channel group, the UTM tag library, the Looker Studio panel, and the conversion path audit shipped for you? See AiLys plans for local businesses." />

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
        alt="Local business owner reviewing a Looker Studio AI Traffic dashboard with weekly trends across six AI engines"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
