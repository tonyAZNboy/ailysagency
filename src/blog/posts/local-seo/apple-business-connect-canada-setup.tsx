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
  slug: 'apple-business-connect-canada-setup',
  title: 'Apple Business Connect Canada, the 2026 setup and duplicate fix guide',
  metaDescription:
    'Apple Business Connect setup for Canadian local owners. Claim, verify, fix duplicates, ship bilingual hours. Quebec EN plus FR-CA workflow.',
  tldr: 'Apple Business Connect launched globally in 2024 and is now a real second pillar next to Google Business Profile for Canadian local owners. Claim the listing with an Apple ID, verify by phone or postal mail, then ship bilingual hours and bilingual location names so Apple Maps surfaces both EN and FR-CA queries. The most common pain is duplicate listings auto-created from user submissions: the fix is to claim each duplicate then request a merge through the support form. Apple Business Connect is not the same as the older Apple Maps Place Cards, which are deprecated.',
  category: 'local-seo',
  tags: ['apple business connect', 'apple maps', 'canada setup', 'duplicate listings', 'local-seo'],
  publishedDate: '2026-03-15',
  updatedDate: '2026-03-15',
  author: AUTHORS.strategy,
  readTimeMinutes: 9,
  images: {
    hero: '/blog-images/apple-business-connect-canada-setup/hero.webp',
    mid: '/blog-images/apple-business-connect-canada-setup/mid.webp',
    end: '/blog-images/apple-business-connect-canada-setup/end.webp',
  },
  faqItems: [
    {
      question: 'How do I remove a duplicate Apple Business Connect listing?',
      answer:
        'You cannot directly delete a duplicate. The Apple Business Connect support flow works in two steps. First, claim each duplicate listing through Apple Business Connect using the same Apple ID. Second, submit a merge request through the support form (Apple Business Connect support, "Report a problem with a place"), naming the canonical listing and the duplicates by their Apple Maps URLs. Apple typically resolves the merge in 5 to 10 business days, with the canonical listing absorbing the duplicates ratings and ordering history when the data matches.',
    },
    {
      question: 'Is Apple Business Connect available in Canada?',
      answer:
        'Yes. Apple Business Connect launched globally in 2024 with full feature support in Canada, including bilingual fields for EN and FR-CA. Canadian businesses can claim, verify, and edit listings through businessconnect.apple.com using an Apple ID. The feature parity with US listings is high, with one difference: postal mail verification in Canada uses Canada Post and arrival times are typically 7 to 14 business days, slightly slower than US ZIP-based mailers.',
    },
    {
      question: 'Do I need an Apple developer account to use Apple Business Connect?',
      answer:
        'No. Apple Business Connect is free and only requires a regular Apple ID. The developer-program account ($99 USD a year) is unrelated. The only paid Apple feature for local businesses is the Showcase Card upgrade, which currently lives in beta in select industries (restaurants, hotels) and is not required for local pack visibility on Apple Maps.',
    },
    {
      question: 'How does Apple Business Connect verify Canadian businesses?',
      answer:
        'Apple offers two verification methods for Canadian listings. Phone verification calls the public business phone number with a 6-digit code, usually within minutes. Postal mail verification ships a letter with a verification code to the business address via Canada Post, typically arriving in 7 to 14 business days. Apple does not currently support video or live-agent verification in Canada, so phone or mail are the only paths. Pick phone verification when the business phone is reliably answered during business hours.',
    },
    {
      question: 'Can I show different EN and FR-CA names on Apple Maps in Quebec?',
      answer:
        'Yes, partially. Apple Business Connect lets you ship the location name in a single primary language (typically French in Quebec for compliance with Bill 96) and add an English alternative name in the alternate names field. Apple Maps surfaces the alternative name when the user device language is set to English. Hours, descriptions, and special hours can be edited bilingually with separate fields for each locale. Photos and category labels are shared across locales and cannot be language-specific.',
    },
    {
      question: 'What is the difference between Apple Business Connect and Apple Maps Place Cards?',
      answer:
        'Apple Maps Place Cards (sometimes called Maps Connect) was the previous tool Apple offered for business listings, launched in 2014. It was deprecated and rolled into Apple Business Connect in early 2024. Existing Place Cards listings were migrated automatically, but the Connect dashboard is a complete rebuild with new fields (Showcases, ordering integrations, gallery photos), a different verification flow, and bilingual support that the old tool did not offer. Operators who have not logged in since 2023 will see a migrated listing waiting for them.',
    },
    {
      question: 'How long does Apple Business Connect take to show edits on Apple Maps?',
      answer:
        'Edits to a verified listing typically appear on Apple Maps within 24 to 72 hours, with most edits visible within 24 hours. The exception is category and primary name changes, which trigger a manual review and can take up to 7 business days. Photo additions show within 24 hours. Hours edits and special hours (holidays, temporary closures) typically push within 12 hours, faster than other field edits because Apple weights operational accuracy.',
    },
  ],
  relatedSlugs: ['nap-consistency-audit-quebec', 'wikidata-for-local-businesses'],
  headings: [
    { id: 'why-apple-business-connect-matters-for-canadian-owners', text: 'Why Apple Business Connect matters for Canadian owners' },
    { id: 'how-to-claim-your-listing-step-by-step', text: 'How to claim your listing, step by step' },
    { id: 'verification-phone-vs-canada-post', text: 'Verification, phone vs Canada Post' },
    { id: 'shipping-bilingual-hours-and-names-in-quebec', text: 'Shipping bilingual hours and location names in Quebec' },
    { id: 'fixing-duplicate-listings-the-merge-flow', text: 'Fixing duplicate listings, the merge flow' },
    { id: 'why-this-is-not-apple-maps-place-cards', text: 'Why this is not the same as Apple Maps Place Cards' },
    { id: 'monthly-maintenance-checklist', text: 'Monthly maintenance checklist' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        Apple Business Connect is the listing platform every Canadian local owner should claim in 2026. Apple Maps reaches every iPhone, every CarPlay dashboard, and every Siri voice query in Canada, and the Connect dashboard is now the only canonical surface for editing your listing. This guide walks the claim and verification flow, the bilingual hours and name workflow for Quebec compliance, and the duplicate listing merge process that trips up most operators. The whole setup runs about 30 minutes plus the verification wait.
      </p>

      <StatHighlight
        stats={[
          { value: '2024', label: 'Year Apple Business Connect launched globally' },
          { value: '7-14 days', label: 'Canada Post verification mailer arrival window' },
          { value: '24-72 hr', label: 'Time for edits to appear on Apple Maps' },
        ]}
      />

      <SectionDivider />

      <h2 id="why-apple-business-connect-matters-for-canadian-owners">Why Apple Business Connect matters for Canadian owners</h2>
      <p>
        Apple Maps is the default mapping surface on iOS, which means every iPhone user in Canada starts navigation, hours lookups, and "near me" queries inside Apple Maps unless they have explicitly switched. The market share of iOS in Canada hovers around 55 to 60 percent of smartphones, well above the global average. A local business that is unclaimed on Apple Business Connect is invisible or wrong on more than half of Canadian smartphone searches, regardless of how strong its Google Business Profile is.
      </p>
      <p>
        Apple Business Connect closes that gap. The Connect dashboard lets you set hours, photos, location name, business description, ordering links, gallery cards, and category labels. Apple Maps reads the Connect data first and falls back to crowdsourced edits only when a field is empty. Claimed listings outrank unclaimed listings inside Apple Maps "near me" results, and the difference is large enough to matter on every category we have measured.
      </p>

      <CalloutBox type="info">
        <p>Apple Business Connect is also the data feed that Siri and CarPlay read for local queries. A claimed listing with current hours is the only way to ensure Siri answers "is the clinic open right now" correctly when the user is driving with CarPlay, where the friction of a wrong answer is highest.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Want to know if your business is correctly claimed on Apple Business Connect across all your locations? Run the free 24-hour AI Visibility audit." />

      <SectionDivider />

      <h2 id="how-to-claim-your-listing-step-by-step">How to claim your listing, step by step</h2>
      <p>
        The claim flow runs through businessconnect.apple.com. You sign in with an Apple ID (any Apple ID works, including a personal one, but we recommend a dedicated business Apple ID tied to a business email address for handover and team access). After sign-in, you search for your business by name and address. Apple matches against existing Apple Maps records and offers you the listing if it finds a match.
      </p>

      <h3>The five-step claim sequence</h3>
      <ol>
        <li>Sign in to businessconnect.apple.com with the business Apple ID</li>
        <li>Search for the business by exact name and full street address</li>
        <li>Pick the correct match from the suggested listings (or create a new listing if none match)</li>
        <li>Confirm your role (owner, manager, marketing) in the prompt</li>
        <li>Choose a verification method (phone or Canada Post mail) and follow the next step</li>
      </ol>

      <p>
        If the listing does not yet exist on Apple Maps, the create-new flow lets you submit the full record up front: name, address, phone, primary category, hours. The new listing routes through Apple's review and typically appears in Apple Maps within 5 business days, separately from the verification step that happens in parallel.
      </p>

      <CalloutBox type="tip">
        <p>Use a dedicated business Apple ID, not a personal one. The personal Apple ID is tied to the owner's family sharing, calendar, and photos, which creates a handover headache when the owner sells or steps back. A business Apple ID with the email like apple@yourbusiness.ca lives in the company password manager and survives team turnover.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="verification-phone-vs-canada-post">Verification, phone vs Canada Post</h2>
      <p>
        Apple Business Connect verifies Canadian listings through two methods. Phone verification calls the listing's public business phone number with an automated 6-digit code, usually within 5 minutes of the verification request. The code is read aloud and you enter it back into the Connect dashboard. Pick phone verification when the business phone is reliably answered during business hours, the line is not voicemail-only, and the number on the listing matches the number you actually pick up.
      </p>
      <p>
        Postal mail verification ships a letter with a 6-digit code via Canada Post to the listing's street address. Arrival is typically 7 to 14 business days from the request. Pick mail verification when the business phone is unreliable (mobile-only, shared answering service, virtual receptionist) or when the listing has multiple verification claims pending. Mail verification is also the only method that works for businesses without a public phone, like consultancies that take inquiries by email only.
      </p>

      <h3>What Apple does not offer in Canada (yet)</h3>
      <ul>
        <li>Video verification (live screen-share with an Apple representative). Available in select US markets, not in Canada in 2026.</li>
        <li>Live-agent verification (real-time chat to confirm identity). Not available in Canada.</li>
        <li>Email verification with a domain match. Not offered for Apple Business Connect in any market.</li>
      </ul>

      <p>
        For most Canadian operators, phone is the right pick. Mail is the fallback when phone fails. The verification window does not block listing creation, but it does block edit submissions: an unverified listing can be claimed but not edited until the code is entered.
      </p>

      <QuickQuiz
        question="Which Apple Business Connect verification method works for a Quebec business with no public phone number?"
        options={[
          'Phone verification only, with a redirect to a private mobile',
          'Email verification using the business domain',
          'Postal mail via Canada Post to the business address',
          'Video verification with an Apple representative',
        ]}
        correctIndex={2}
        explanation="Apple Business Connect supports phone and Canada Post mail verification in Canada. Email verification is not offered, and video verification is not available in Canada in 2026. For a business without a public phone, postal mail is the only path. The mailer arrives in 7 to 14 business days with a 6-digit code."
      />

      <SectionDivider />

      <h2 id="shipping-bilingual-hours-and-names-in-quebec">Shipping bilingual hours and location names in Quebec</h2>
      <p>
        Quebec local listings need bilingual EN and FR-CA fields to comply with Bill 96 and to surface correctly on iPhones whose system language is English. Apple Business Connect handles bilingual setup with a primary language plus alternative-name and translated-description fields. Hours, special hours (holidays, temporary closures), and contact info live in shared fields that are language-neutral.
      </p>

      <h3>The bilingual setup checklist</h3>
      <ol>
        <li>Set the primary location name in French (the legal Quebec business name)</li>
        <li>Add the English alternative name in the alternate names field</li>
        <li>Write the business description in French as the primary, with the English description in the translated-description field</li>
        <li>Hours and special hours apply to both languages, no separate edit needed</li>
        <li>Confirm the address city is the French legal name (Montréal with the accent, not Montreal)</li>
      </ol>

      <p>
        Apple Maps surfaces the alternative name when the iPhone system language is set to English. The local pack and the navigation card show the matching language to the user, which improves trust and click-through on both EN and FR-CA queries. For the broader NAP consistency framework that ties Apple Business Connect to your other citations, see <InternalLink to="/glossary/nap" title="NAP glossary entry" description="Definitions for Name, Address, Phone consistency" /> and run a full audit through <InternalLink to="/audit" title="Free 24-hour AI Visibility audit" description="Includes Apple Business Connect status check" />.
      </p>

      <CalloutBox type="warning">
        <p>Do not enter the English name as the primary on a Quebec-registered business. The Quebec Office québécois de la langue française monitors public commercial listings, and an Apple Maps listing where the primary name is English on a registered French commercial name can trigger compliance follow-up. Primary in French, alternative in English, every time.</p>
      </CalloutBox>

      <img
        src={meta.images.mid}
        alt="Apple Business Connect bilingual fields screen showing French primary name, English alternative name, and shared hours for a Quebec business"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <InlineCTA variant="pricing" text="See AiLys tiers that include Apple Business Connect setup and bilingual maintenance, from Core at 799 dollars CAD a month." />

      <SectionDivider />

      <h2 id="fixing-duplicate-listings-the-merge-flow">Fixing duplicate listings, the merge flow</h2>
      <p>
        Duplicate Apple Maps listings are the most common pain Canadian operators face on Apple Business Connect. The duplicates are usually auto-created from user submissions, where an iPhone user added the business through the "Report an issue" flow on Apple Maps before the owner ever logged into Connect. The duplicate often has a slightly different name spelling, a stale phone number, or an outdated address, and it competes for the same query in the local pack.
      </p>
      <p>
        Apple does not let owners delete duplicates directly. The merge flow is the only path, and it runs in two steps. First, claim each duplicate listing through Apple Business Connect using the same Apple ID. The dashboard shows all listings claimed under the account in a single view. Second, submit a merge request through the support form, naming the canonical listing and the duplicates by their Apple Maps URLs. Apple typically resolves the merge in 5 to 10 business days.
      </p>

      <h3>The merge request walkthrough</h3>
      <ol>
        <li>Open Apple Business Connect support: select "Listings" then "Report a problem with a place"</li>
        <li>In the form, select "Duplicate listings" as the issue type</li>
        <li>Paste the Apple Maps URL of the canonical listing (the one you want to keep)</li>
        <li>Paste the Apple Maps URLs of every duplicate (one per line)</li>
        <li>Add a one-paragraph note explaining that you own all listings and want them merged into the canonical record</li>
        <li>Submit and wait for the email confirmation</li>
      </ol>

      <p>
        When the merge resolves, the canonical listing absorbs the ratings, ordering history, and photo records of the duplicates when the data matches across them. Mismatched fields (different phone numbers, different hours) are not auto-merged: Apple keeps the canonical listing's data and discards the duplicates' divergent fields. This is why claiming the duplicates first matters: it lets you correct the divergent data before the merge, so nothing gets lost.
      </p>

      <CalloutBox type="info">
        <p>Apple Maps does not penalize businesses with historical duplicates. The local pack ranking after a merge typically improves within 2 to 4 weeks because the canonical listing now consolidates all the engagement signals that were previously split.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="why-this-is-not-apple-maps-place-cards">Why this is not the same as Apple Maps Place Cards</h2>
      <p>
        Apple Maps Place Cards (sometimes called Maps Connect) was the previous tool Apple offered for business listings, launched in 2014 and deprecated in early 2024 when Apple Business Connect replaced it. Operators who have not logged in since 2023 will see a migrated listing waiting for them on Connect, with the old fields preserved but the new feature set unlocked.
      </p>
      <p>
        The migration was automatic and silent, so most owners do not realize their listing moved. The Connect dashboard adds Showcases (rich cards with images and CTAs), gallery photos, ordering integrations, bilingual fields, and a redesigned verification flow. The old Place Cards URL (mapsconnect.apple.com) redirects to businessconnect.apple.com, but the new URL is the canonical surface for every edit going forward.
      </p>

      <p>
        For owners coming back after a long pause, the practical action is to log in to businessconnect.apple.com, accept the migrated listing, and run the bilingual setup checklist on it. The migrated listing keeps the original verification status, so no re-verification is needed unless the address or phone has changed.
      </p>

      <SectionDivider />

      <h2 id="monthly-maintenance-checklist">Monthly maintenance checklist</h2>
      <p>
        Apple Business Connect is lower-touch than Google Business Profile because Apple does not currently support GBP-style posts. The monthly maintenance is light but not zero.
      </p>

      <h3>What to check every month</h3>
      <ol>
        <li>Hours accuracy, including special hours for the upcoming month (statutory holidays, scheduled closures)</li>
        <li>Photo refresh: add 2 to 4 new photos a month to keep the gallery active</li>
        <li>Description and tagline review: confirm the bilingual descriptions still match the current service mix</li>
        <li>Showcase cards (if enabled): rotate to highlight the current promotion or seasonal service</li>
        <li>Duplicate scan: search Apple Maps for the business name and address, confirm no new duplicates have appeared from user submissions</li>
      </ol>

      <p>
        The full monthly check takes about 15 minutes per location. Operators on multi-location plans typically batch the check on the first business day of each month, paired with the Google Business Profile monthly review. For multi-industry maintenance scripts that include Apple Maps in the per-vertical playbooks, see <InternalLink to="/industries" title="Industry playbooks" description="Per-vertical local SEO and Apple Business Connect maintenance playbooks" />.
      </p>

      <InlineCTA variant="book" text="Want a 60-minute walk-through of your Apple Business Connect setup, duplicate scan, and bilingual workflow? Book a no-pitch session, strategy doc sent regardless." />

      <SectionDivider />

      <KeyTakeaway
        points={[
          'Apple Business Connect launched globally in 2024 and is the canonical surface for editing Apple Maps listings in Canada.',
          'Claim through businessconnect.apple.com with a dedicated business Apple ID, not a personal one.',
          'Verify by phone (5 minutes) or Canada Post mail (7 to 14 business days). Phone is the default in Canada.',
          'Quebec listings need French as the primary name, English in the alternative-name field, bilingual descriptions.',
          'Duplicate listings cannot be deleted. Claim each duplicate, then submit a merge request through the support form.',
          'Apple Maps Place Cards migrated automatically into Connect in 2024. Owners who have not logged in since 2023 see a migrated listing.',
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
        alt="Apple Business Connect monthly maintenance checklist for a Quebec local business with bilingual fields"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
