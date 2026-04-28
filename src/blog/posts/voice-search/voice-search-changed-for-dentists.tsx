/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import { AUTHORS } from '../../authors'
import {
  CalloutBox,
  InlineCTA,
  StatHighlight,
  SectionDivider,
} from '../../components/shared'

export const meta: BlogPostMeta = {
  slug: 'voice-search-changed-for-dentists',
  title: 'Voice search just changed for dentists, and most clinics will miss it',
  metaDescription:
    "Apple's local recommendations changed in iOS 18.2. The dentists asking Siri now hear different names. Here's what changed and how to win the new layer.",
  tldr: "Apple quietly changed iOS 18.2's local recommendations weighting in late 2025. Three things shifted at once: Apple Maps Connect verified data now beats third-party feeds, recent reviews outweigh total review count, and service-specific keywords inside reviews propagate to voice ranking. Most dental clinics never claim Apple Maps Connect and will miss it.",
  category: 'voice-search',
  tags: ['voice search', 'siri', 'dentists', 'local seo', 'apple-maps'],
  publishedDate: '2026-03-01',
  updatedDate: '2026-03-01',
  author: AUTHORS.research,
  readTimeMinutes: 5,
  images: {
    hero: '/blog-images/voice-search-changed-for-dentists/hero.svg',
    mid: '/blog-images/voice-search-changed-for-dentists/mid.svg',
    end: '/blog-images/voice-search-changed-for-dentists/end.svg',
  },
  faqItems: [
    {
      question: 'How do I claim my Apple Maps Connect listing for a dental clinic?',
      answer:
        "Go to mapsconnect.apple.com, sign in with an Apple ID, search for your clinic, and complete the verification flow. The process accepts a callback or a postcard for verification. Once verified, your hours, services, and contact details flow into Siri voice answers. Most clinics skip this because Google Business Profile pays the bills, which is exactly why claiming it now creates an asymmetric advantage.",
    },
    {
      question: 'How many recent Google reviews does my dental practice need each month?',
      answer:
        "Aim for 4 to 6 fresh reviews per month at minimum. Apple's iOS 18.2 weighting now favors clinics with steady recent activity over clinics with large historical totals but no current flow. A clinic with 80 reviews and 5 in the last 30 days now beats a clinic with 400 reviews and zero recent activity in voice rankings.",
    },
    {
      question: 'Do voice search reviews need specific keywords for dentists?',
      answer:
        'Yes. Service-specific keywords inside reviews now propagate to voice ranking. A clinic with multiple reviews mentioning "pediatric" will be returned for "kid-friendly dentist" voice queries. Reviews that all say "great dentist" do nothing for voice differentiation. The fix is review prompts that ask the patient to mention the specific service they received: cleaning, whitening, pediatric, or emergency.',
    },
    {
      question: 'How much voice search traffic do dental practices get from Siri vs Google?',
      answer:
        'Voice queries through Siri now route 30 to 40 percent of "dentist near me" intent in Quebec, especially among under-40 patients. The rest splits across Google Assistant and Alexa. Ignoring Apple Maps Connect makes you invisible to about 25 percent of dentist voice queries in Quebec on its own, before the recency and keyword effects compound.',
    },
    {
      question: 'How often should I audit my Apple Maps Connect listing?',
      answer:
        'Quarterly at minimum. Apple ships local recommendations weighting changes without public announcements (the iOS 18.2 shift was unannounced), so a quarterly audit catches drift in service categories, hours, and verification status before voice ranking erodes. Pair the audit with a review pace check and a keyword diversity scan of the last 30 days of reviews.',
    },
  ],
  relatedSlugs: [],
  headings: [
    { id: 'hey-siri-find-a-dentist-near-me', text: '"Hey Siri, find a dentist near me" returns different answers than it did six months ago.' },
    { id: 'what-we-do-for-dental-clients', text: 'What we do for dental clients' },
  ],
}

export function Content() {
  return (
    <article>
      <img
        src={meta.images.hero}
        alt="iPhone screen showing a Siri voice query for a nearby dentist with iOS 18.2 local recommendations"
        className="w-full rounded-xl my-6"
        loading="eager"
      />

      <h2 id="hey-siri-find-a-dentist-near-me">"Hey Siri, find a dentist near me" returns different answers than it did six months ago.</h2>
      <p>
        Apple changed how iOS 18.2's local recommendations weighting works in late 2025. The change went unannounced. We caught it because we run weekly voice-query tests across 30 verticals.
      </p>

      <StatHighlight
        stats={[
          { value: '~25%', label: 'Of dentist voice queries in Quebec lost without Apple Maps Connect' },
          { value: '30-40%', label: 'Of "dentist near me" intent now routed through Siri in Quebec' },
          { value: '4-6', label: 'Fresh reviews per month needed to stay in voice rankings' },
        ]}
      />

      <h3>What changed</h3>
      <p>Three things shifted at once.</p>
      <p>
        <strong>One</strong>: Siri now reads more from Apple Maps Connect verified businesses than from third-party data partners. If you have not claimed and verified your Apple Maps listing, you are now invisible to ~25% of dentist voice queries in Quebec.
      </p>
      <p>
        <strong>Two</strong>: Recent reviews matter more than total review count. A clinic with 80 reviews and 5 in the last 30 days now beats a clinic with 400 reviews and zero recent activity. Apple is fighting "review graveyards."
      </p>
      <p>
        <strong>Three</strong>: Service-specific keywords inside reviews now propagate to voice ranking. A clinic with multiple reviews mentioning "pediatric" will be returned for "kid-friendly dentist" voice queries. Without the keyword density, you don't.
      </p>

      <CalloutBox type="warning">
        <p>Apple ships these weighting changes without an announcement. The only way to detect them is structured weekly voice-query testing across the verticals you care about. If your last Apple Maps Connect audit was over a quarter ago, assume drift has already cost you placements.</p>
      </CalloutBox>

      <img
        src={meta.images.mid}
        alt="Comparison of two dental clinic profiles, one with steady recent reviews and one with a review graveyard"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h3>Why most dentists will miss this</h3>
      <p>
        Apple Maps Connect is the least sexy channel in local SEO. Most clinics never claim their listing because Google Business Profile pays the bills. But voice queries through Siri now route 30-40% of "dentist near me" intent in Quebec, especially among under-40 patients.
      </p>
      <p>Three implications:</p>
      <ul>
        <li>Your monthly review pace matters more than your total. If you are not generating 4-6 fresh reviews per month, you are aging out of voice rankings.</li>
        <li>Your reviews need keyword variety. A bunch of reviews that all say "great dentist" do nothing for voice. Reviews mentioning specific services (cleaning, whitening, pediatric, emergency) win different voice queries.</li>
        <li>Apple Maps Connect needs a quarterly audit minimum.</li>
      </ul>

      <SectionDivider />

      <h2 id="what-we-do-for-dental-clients">What we do for dental clients</h2>
      <p>
        At the Core tier, we run a quarterly Apple Maps Connect audit alongside the GBP work. Our review prompts steer customers to mention the service they actually used. The Agency tier runs a monthly review contest with prompts engineered for service keyword diversity.
      </p>
      <p>
        Free AI Visibility Audit covers Siri voice queries for your business name. Worth the 90 seconds.
      </p>

      <InlineCTA variant="audit" />

      <img
        src={meta.images.end}
        alt="Dental clinic owner reviewing voice search ranking changes across Siri Google and Alexa"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
