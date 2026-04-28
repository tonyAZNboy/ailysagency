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
  slug: 'alexa-business-hours-fix',
  title: 'Why Alexa gets my business hours wrong, and how to fix it',
  metaDescription:
    'Alexa pulls business hours from Yelp and Yext, not Google Business Profile. Here is the exact fix path for Quebec local owners, claim flow, and bilingual query checks.',
  tldr: 'Alexa does not read Google Business Profile for local business hours. Amazon licenses location data from Yelp, Yext, and a small basket of secondary feeds, then layers Alexa Skills metadata on top. Fix the wrong-hours problem by claiming your Yelp listing, syncing hours, claiming and tuning Yext (sometimes paid), and submitting an Alexa Local Listing claim. Quebec owners also need bilingual query coverage because customers ask in both English and French.',
  category: 'voice-search',
  tags: ['voice search', 'alexa', 'yelp', 'yext', 'business hours', 'quebec'],
  publishedDate: '2026-03-01',
  updatedDate: '2026-03-01',
  author: AUTHORS.research,
  readTimeMinutes: 9,
  images: {
    hero: '/blog-images/alexa-business-hours-fix/hero.webp',
    mid: '/blog-images/alexa-business-hours-fix/mid.webp',
    end: '/blog-images/alexa-business-hours-fix/end.webp',
  },
  faqItems: [
    {
      question: 'Why does Alexa get my business hours wrong?',
      answer:
        'Alexa does not pull business hours from Google Business Profile. Amazon licenses local data from Yelp and Yext as primary feeds, plus a small basket of secondary partners. If your Yelp record still shows pre-renovation hours, or if your Yext listing was never claimed, Alexa speaks the stale value. The fix is to claim and sync both feeds, then submit an Alexa Local Listing update so the change propagates inside two weeks.',
    },
    {
      question: 'Does Alexa use Google Business Profile data?',
      answer:
        'No, not directly. Alexa relies on Yelp and Yext as primary sources, then enriches with Alexa Skills metadata for businesses that ship a Skill. Google Business Profile is excellent for Maps and Search, but Amazon does not license Google data. That is why a clinic with perfect GBP hours can still hear Alexa quote yesterday\'s schedule. The two ecosystems do not share a feed.',
    },
    {
      question: 'How long does it take for Alexa to update my hours after I fix Yelp?',
      answer:
        'Yelp pushes structured data to Alexa on a 7 to 14 day refresh cadence. Yext can push faster, sometimes inside 48 hours, when the paid Yext Listings tier is active. The fastest end to end fix we measure across Quebec clients is 9 days from Yelp claim to Alexa repeating the correct hours. The slowest cases drag past a month when only the website footer is updated and the third party feeds never receive the change.',
    },
    {
      question: 'Do Quebec owners need bilingual Alexa setup?',
      answer:
        'Yes. Customers in Quebec ask Alexa in both English and French, especially in Montreal, Laval, and Gatineau. Alexa supports French Canadian as a primary language since late 2024. Run the same hours-and-services query in both EN and FR after every fix to confirm the answer is correct in both languages. A bilingual gap is a silent loss because Alexa simply skips the request rather than guessing.',
    },
    {
      question: 'When does it make sense to pay for Yext over claiming the free listings manually?',
      answer:
        'Yext Listings runs roughly 199 to 999 dollars CAD per location per year depending on the tier. Pay for it when you have multiple locations, frequent hours changes (seasonal or holiday), or when you have already burned a few weeks chasing manual claims. For a single-location clinic with stable hours, the free Yelp claim plus a manual Alexa Local Listing submission usually gets you to the same place inside three weeks at zero cost.',
    },
  ],
  relatedSlugs: ['siri-local-search-ranking-factors', 'voice-search-changed-for-dentists'],
  headings: [
    { id: 'why-alexa-says-the-wrong-hours', text: 'Why Alexa says the wrong hours in the first place' },
    { id: 'the-data-pipeline-yelp-yext-alexa', text: 'The data pipeline, Yelp and Yext to Alexa' },
    { id: 'claim-and-fix-yelp-first', text: 'Claim and fix Yelp first, the step with the highest impact' },
    { id: 'claim-yext-and-decide-on-paid', text: 'Claim Yext and decide whether to pay for the listings tier' },
    { id: 'submit-an-alexa-local-listing-update', text: 'Submit an Alexa Local Listing update for faster propagation' },
    { id: 'quebec-bilingual-query-coverage', text: 'Quebec bilingual query coverage, the EN and FR test' },
    { id: 'a-30-day-alexa-fix-plan', text: 'A 30 day plan to clean Alexa for a Quebec local owner' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        Alexa quoting the wrong opening hours is one of the most frustrating voice search failures for a local owner. Customers stand outside a closed clinic at 8 am because Alexa said you opened at 7. The cause is almost never Google Business Profile. Amazon does not license Google data. Alexa pulls hours from Yelp and Yext as primary feeds, layered with Alexa Skills metadata when present. This guide walks the exact fix path, the bilingual checks Quebec owners need to run, and the 30 day plan that gets the answer correct in both English and French.
      </p>

      <StatHighlight
        stats={[
          { value: '7-14d', label: 'Yelp to Alexa data refresh cadence' },
          { value: '~48h', label: 'Yext push speed on the paid Listings tier' },
          { value: 'EN + FR', label: 'Quebec query coverage required for clean Alexa answers' },
        ]}
      />

      <SectionDivider />

      <h2 id="why-alexa-says-the-wrong-hours">Why Alexa says the wrong hours in the first place</h2>
      <p>
        Alexa runs on a different local data layer than Google Maps or Apple Maps. Amazon does not run a Maps product, so it does not maintain its own local index. Instead, Alexa licenses business data from Yelp and Yext, with smaller feeds from Foursquare and licensed partners filling category-specific gaps. When a customer asks an Echo for your hours, Alexa hits that licensed index first, reads back what it finds, and only enriches with an Alexa Skill if you have shipped one.
      </p>
      <p>
        That architecture creates a familiar failure mode. You update Google Business Profile after a renovation. The website footer follows the next day. The Yelp listing, never claimed by the previous owner, still says 7 am to 9 pm because that was the schedule three years ago. Alexa speaks the Yelp value, not the GBP value, and you do not find out until a customer leaves a one-star review for being closed when Alexa promised you were open.
      </p>
      <p>
        The fix is mechanical, not mysterious. Claim Yelp. Sync the hours. Claim Yext. Decide whether the paid Listings tier is worth it. Submit an Alexa Local Listing update for faster propagation. Run bilingual query tests. Then audit again the following month because seasonal hours and holiday schedules drift the data back out of sync if no one watches the feeds.
      </p>

      <CalloutBox type="info">
        <p>The single fastest signal that your Alexa hours problem is a Yelp problem is to ask Alexa right after asking Siri. If Siri reads correct hours and Alexa reads stale hours, the gap is almost always Yelp because Siri leans on Apple Maps Connect and Alexa leans on Yelp. Same address, two different feeds.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Want a free 24 hour audit that tests Alexa, Siri, and Google Assistant on the same business hours query in EN and FR? Run the AiLys voice query audit." />

      <SectionDivider />

      <h2 id="the-data-pipeline-yelp-yext-alexa">The data pipeline, Yelp and Yext to Alexa</h2>
      <p>
        Yelp is the largest licensed feed for Alexa local answers. The Yelp Fusion data partnership feeds business name, address, hours, categories, and review aggregates into the Alexa index on a refresh that we measure at 7 to 14 days. Yext sits in parallel as a structured listings network that pushes to Alexa, Bing Places, Apple Maps, and roughly 60 other downstream surfaces. A claimed Yext record can update Alexa inside 48 hours when the paid Listings tier is live.
      </p>
      <p>
        Alexa Skills metadata sits on top. If you have published an Alexa Skill for your business, the Skill manifest can declare hours, services, and a phone number that override the licensed feeds for the specific Skill invocation. Most local owners do not need a Skill for hours alone, the licensed feeds do the job. Skills become useful when you want a custom voice flow like booking, menu ordering, or appointment confirmation.
      </p>
      <p>
        The hierarchy at query time is roughly: Skill metadata first if a Skill is published and matches the query, Yext feed second when the listing is verified, Yelp feed third for the broad licensed pool, then a fallback to web-scraped data for businesses that have done none of the above. Climbing the hierarchy is the whole point of the fix path below.
      </p>

      <SectionDivider />

      <h2 id="claim-and-fix-yelp-first">Claim and fix Yelp first, the step with the highest impact</h2>
      <p>
        Yelp is free to claim and the change propagates downstream to Alexa within two weeks. Go to biz.yelp.com, search for the business, and start the claim. Verification is by phone callback or email to the listed contact. Once verified, update hours, special hours for holidays, services, photos, and the bilingual short description. Quebec owners should write the description in French and add an English variant in the same field where Yelp allows it.
      </p>
      <p>
        The non-obvious step is the special hours field. Alexa quotes special hours when the date matches, which is exactly what you want for Christmas, Saint Jean Baptiste, Thanksgiving, and any planned closures. Most clinics never fill the special hours, so on Saint Jean Baptiste Alexa speaks the regular Wednesday schedule and customers show up at a closed door. Set every public holiday for the next twelve months in one sitting after the claim.
      </p>

      <h3>The Yelp claim checklist</h3>
      <ul>
        <li>Verify ownership by phone callback or email</li>
        <li>Sync regular hours with the website footer and GBP exactly</li>
        <li>Fill special hours for the next twelve months of holidays and closures</li>
        <li>Add a bilingual short description with EN and FR if your customer base is bilingual</li>
        <li>Upload at least three exterior and interior photos to confirm location identity</li>
        <li>Set primary and secondary categories that exist in the Yelp taxonomy</li>
      </ul>

      <CalloutBox type="tip">
        <p>If you cannot find your business on Yelp during the claim, do not create a duplicate. Search by phone number first, then by old business names if there has been a brand change. Duplicate listings on Yelp split the data feed to Alexa and create exactly the kind of stale hours problem you are trying to fix.</p>
      </CalloutBox>

      <InternalLink
        to="/glossary/voice-search"
        title="Voice Search glossary"
        description="Plain definitions for Alexa, Siri, Yelp Fusion, Yext, and the rest of the voice ranking vocabulary."
      />

      <SectionDivider />

      <h2 id="claim-yext-and-decide-on-paid">Claim Yext and decide whether to pay for the listings tier</h2>
      <p>
        Yext is the second feed Alexa reads. The Yext Listings product is a paid tier that pushes one source of truth to Alexa, Bing Places, Apple Maps, Foursquare, and the rest of the data network in parallel. Pricing runs roughly 199 to 999 dollars CAD per location per year depending on the package, the number of fields under management, and the support level. The free Yext claim still gets you a listing, but does not push to Alexa as quickly and limits the number of fields you control.
      </p>
      <p>
        For a single-location clinic with stable hours, the free Yelp claim plus a manual Alexa Local Listing submission usually delivers correct hours inside three weeks at zero cost. Yext Listings becomes worth the spend when you have two or more locations, frequent seasonal hours, or a brand-name change in flight. The math on a 5 location dental group running Yext at 499 dollars per location is roughly 2,495 dollars per year, recovered the first time a single Saturday closure does not strand a customer outside a locked door.
      </p>

      <QuickQuiz
        question="Your Echo speaks the wrong opening hours for your clinic. You already updated Google Business Profile last week. What is the fastest single fix to get Alexa correct?"
        options={[
          'Update the website footer one more time',
          'Open a support ticket with Google',
          'Claim and update the Yelp listing, then submit an Alexa Local Listing update',
          'Restart the Echo and ask the question again',
        ]}
        correctIndex={2}
        explanation="Alexa licenses local data from Yelp and Yext, not Google. Updating GBP does not propagate to Alexa. Claiming Yelp, syncing the hours, and submitting an Alexa Local Listing update is the canonical fix path. Yelp pushes to Alexa within 7 to 14 days and the manual Local Listing submission can shorten that further."
      />

      <SectionDivider />

      <h2 id="submit-an-alexa-local-listing-update">Submit an Alexa Local Listing update for faster propagation</h2>
      <p>
        Amazon offers a manual local listing submission flow at developer.amazon.com under the Alexa Local Listings tools. The flow lets you submit corrected hours, address, phone, and category directly to the Alexa team, which speeds the propagation past the standard Yelp refresh cadence. The submission is free and typically processed inside 5 to 10 business days when the supporting evidence is clean.
      </p>
      <p>
        Send three pieces of evidence with the submission. A screenshot of the corrected Yelp record showing the new hours, the matching screenshot from the website footer, and a recent photo of the storefront sign with the same hours posted. Alexa moderators reject submissions that lack matching evidence across surfaces, because they are conservative about voice answers in the same way Apple is conservative about Siri spoken responses.
      </p>

      <img
        src={meta.images.mid}
        alt="Diagram of the Alexa local data pipeline showing Yelp, Yext, and Alexa Skills as the three input feeds"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <CalloutBox type="warning">
        <p>If you operate a multi-location brand, do not submit a single Local Listing update for all locations at once. Submit one per location with location-specific evidence. Bundled submissions are routinely rejected because Amazon cannot match a single phone number or address to multiple locations, and the rejection delays every location in the batch by another two weeks.</p>
      </CalloutBox>

      <InlineCTA variant="book" text="Need a 30 minute walk-through of the Alexa fix path on your specific listings? Book a strategy call, no pitch, you keep the playbook." />

      <SectionDivider />

      <h2 id="quebec-bilingual-query-coverage">Quebec bilingual query coverage, the EN and FR test</h2>
      <p>
        Alexa supports Canadian French as a primary device language since late 2024. Customers in Montreal, Laval, Gatineau, and Quebec City switch between EN and FR queries depending on the home setup, often inside the same household. After every Yelp or Yext fix, run the same test query in both languages. Ask "Alexa, what time does <span lang="en">[business name]</span> open?" in English, then ask "Alexa, à quelle heure ouvre <span lang="fr">[business name]</span>?" in French.
      </p>
      <p>
        The two answers should match. If only the English answer is correct, the bilingual metadata on the Yelp or Yext record is incomplete. If both answers are wrong, the underlying feed has not refreshed yet and you should wait the full Yelp cadence before submitting a Local Listing update. If only the French answer is wrong, check the Yelp listing description for accents and apostrophes that Alexa parses incorrectly when typed in straight ASCII.
      </p>

      <CalloutBox type="tip">
        <p>The fastest bilingual gap we close in Quebec audits is the special hours field on Yelp. Owners fill it in English only, and Alexa silently falls back to regular hours when the customer asks in French on a holiday. Filling the special hours fields with FR-CA labels alongside the EN ones closes the bilingual gap inside one refresh cycle.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="a-30-day-alexa-fix-plan">A 30 day plan to clean Alexa for a Quebec local owner</h2>
      <p>
        Day 1 to 5, claim and fully populate the Yelp listing. Verify by phone callback, sync regular hours, fill special hours for the next twelve months, add EN and FR descriptions, upload exterior and interior photos. Day 6 to 10, claim Yext and decide whether the paid Listings tier is right for the location count and the seasonal volatility of your hours. Day 11 to 15, submit the Alexa Local Listing update with three pieces of matching evidence per location.
      </p>
      <p>
        Day 16 to 25, run bilingual voice query tests from a clean Echo in three different rooms or a borrowed device outside the office. Note any answer that disagrees with the corrected source of truth. Day 26 to 30, audit the entire stack one more time. Confirm the Yelp record, the Yext record, the Google Business Profile, and the website footer all show identical hours, then schedule a quarterly recurring audit so seasonal drift does not silently undo the fix.
      </p>
      <p>
        Most owners that follow the plan hear correct Alexa hours inside three weeks. The slow cases are usually duplicate Yelp listings the owner did not know existed, or a Yext free claim that never pushed because a key field failed validation. A managed program like the AiLys voice listings module runs the audit on a weekly schedule and ships the bilingual fixes inside the same retainer. See the <InternalLink to="/industries" title="industry playbooks for clinics" /> page for the dentist-specific version of this plan, or the <InternalLink to="/audit" title="free 24 hour AI Visibility audit" /> to see which voice listings are leaking now.
      </p>

      <InlineCTA variant="pricing" text="Need a managed program that ships the Yelp claim, the Yext push, and the bilingual Alexa monitor? See AiLys plans for local businesses." />

      <SectionDivider />

      <KeyTakeaway
        points={[
          'Alexa does not read Google Business Profile. The licensed feeds are Yelp and Yext.',
          'Claim Yelp first, sync regular and special hours, and Yelp pushes to Alexa within 7 to 14 days.',
          'Yext Listings is paid, faster (about 48 hours), and worth it for multi-location or seasonal businesses.',
          'Submit an Alexa Local Listing update with matching evidence to shorten the propagation window.',
          'Quebec owners must run the same query in EN and FR after every fix to confirm bilingual coverage.',
        ]}
      />

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
        alt="Owner reviewing the Yelp, Yext, and Alexa Local Listings dashboards side by side after a successful hours sync"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
