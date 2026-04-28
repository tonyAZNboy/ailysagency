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
  slug: 'nap-consistency-audit-quebec',
  title: 'NAP consistency audit for Quebec local businesses',
  metaDescription:
    'A NAP consistency audit playbook for Quebec local businesses. Find every directory mismatch, fix the canonical record, and rebuild trust signals across 50 sources.',
  tldr:
    'Run a NAP consistency audit by exporting every directory citation under your brand, locking a canonical NAP record, normalizing phone formats and accent-bearing street names, then issuing fixes in priority order. Quebec adds a bilingual layer: French street names and accents must match exactly across all 50 directories or AI engines split the entity.',
  category: 'local-seo',
  tags: ['nap', 'citations', 'local seo', 'audit', 'quebec', 'bilingual'],
  publishedDate: '2026-02-05',
  updatedDate: '2026-02-05',
  author: AUTHORS.strategy,
  readTimeMinutes: 9,
  images: {
    hero: '/blog-images/nap-consistency-audit-quebec/hero.webp',
    mid: '/blog-images/nap-consistency-audit-quebec/mid.webp',
    end: '/blog-images/nap-consistency-audit-quebec/end.webp',
  },
  faqItems: [
    {
      question: 'How do I fix inconsistent NAP across 50 directories?',
      answer:
        'Lock a canonical record (Name, Address, Phone in their final form), export every existing citation, group the mismatches into four categories (name, address, phone, hours), then issue fixes in priority order: GBP first, then top 10 directories by domain authority, then the long tail. Quebec adds a bilingual layer: French street names and accents must match exactly. Most 50-directory cleanups take 4 to 6 weeks of operator work.',
    },
    {
      question: 'What counts as a NAP mismatch for Google and AI engines?',
      answer:
        "Anything that breaks the entity match. Different phone format (514-555-0100 vs (514) 555-0100), different street suffix (St. vs Saint), missing or wrong accents on French names (rue Berri vs rue Berri with the wrong de accent), abbreviated business name on one citation and full legal name on another, suite number on some entries and not others. The engine treats each variant as a separate entity until it can reconcile them, which weakens the local signal for all variants.",
    },
    {
      question: 'How does NAP inconsistency hurt Quebec businesses specifically?',
      answer:
        "Quebec adds a bilingual layer that the rest of North America does not. Street names like rue Sainte-Catherine, boulevard René-Lévesque, and avenue du Mont-Royal must carry their accents on every citation or the engine splits them. The same business can show up as both Sainte-Catherine and Sainte Catherine across directories, and the trust signal halves. Add the French and English versions of the legal name and the audit complexity doubles compared to a unilingual market.",
    },
    {
      question: 'Which directories matter most for a Quebec NAP audit?',
      answer:
        'Start with GBP, Apple Business Connect, Bing Places, and Yelp. Then the Quebec-specific directories: Pages Jaunes (Yellow Pages Canada), 411.ca, Canada411, and the Chamber of Commerce listing for your municipality. After that, the industry verticals (RAMQ-adjacent for clinics, Restaurants Canada for restos, Barreau du Quebec listings for lawyers). 50 directories is a reasonable target for a fully optimized Quebec local business.',
    },
    {
      question: 'How long does a NAP consistency audit take to ship?',
      answer:
        'The audit itself takes one to two days for a single location. The fixes take longer because some directories require human verification, postcards, or phone callbacks before they accept changes. Plan four to six weeks for a 50-directory cleanup. AiLys Core ships five citations per month with full NAP cleanup, Growth ships ten, and Agency ships fifteen with bilingual French and English coverage on every citation.',
    },
  ],
  relatedSlugs: [],
  headings: [
    { id: 'why-nap-consistency-still-decides-local-rank', text: 'Why NAP consistency still decides local rank' },
    { id: 'lock-the-canonical-record-before-you-touch-anything', text: 'Lock the canonical record before you touch anything' },
    { id: 'export-every-existing-citation-the-quebec-way', text: 'Export every existing citation, the Quebec way' },
    { id: 'classify-mismatches-into-four-buckets', text: 'Classify mismatches into four buckets' },
    { id: 'fix-order-gbp-first-long-tail-last', text: 'Fix order: GBP first, long tail last' },
    { id: 'the-bilingual-trap-that-only-hits-quebec', text: 'The bilingual trap that only hits Quebec' },
    { id: 'maintain-the-record-after-the-cleanup', text: 'Maintain the record after the cleanup' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        To fix inconsistent NAP across 50 directories, lock a canonical NAP record (Name, Address, Phone in their final form), export every existing citation under your brand, group the mismatches into four categories, then issue fixes in priority order starting with GBP. Quebec adds a bilingual layer: French street names and accents must match exactly across every citation, or AI engines split the entity into duplicates and the trust signal collapses.
      </p>

      <StatHighlight
        stats={[
          { value: '50', label: 'Target directory count for a fully cleaned Quebec local business' },
          { value: '5 / 10 / 15', label: 'Citations per month at Core, Growth, and Agency tiers' },
          { value: '4-6 weeks', label: 'Typical cleanup timeline for a 50-directory backlog' },
        ]}
      />

      <SectionDivider />

      <h2 id="why-nap-consistency-still-decides-local-rank">Why NAP consistency still decides local rank</h2>
      <p>
        NAP consistency was the foundation of local SEO ten years ago and it still is. The reason is the way Google, Apple, Bing, and the major AI engines build entity records. Every directory citation is a vote that says "this business exists at this address with this phone." If 47 of 50 votes agree and 3 disagree, the engine treats the disagreement as ambiguity, not noise. The trust signal for the entity drops, and the local pack ranking drops with it.
      </p>
      <p>
        The 3 disagreeing votes do not need to be wildly wrong. A different phone format, a missing accent, an abbreviation. Each one cracks the entity match a little. Stack five small cracks across 50 directories and the engine starts treating your business as two or three half-entities, none of which rank as well as the unified original.
      </p>
      <p>
        AI engines amplify the cost. ChatGPT, Perplexity, and Google AIO all pull from the directory layer when they decide which local business to name in an answer. A fragmented NAP profile means the engine cannot confidently name the business, so it names a competitor with cleaner records. See the <InternalLink to="/glossary/nap" title="NAP glossary entry" description="Definition and ranking impact of NAP consistency" /> for the full definition.
      </p>

      <SectionDivider />

      <h2 id="lock-the-canonical-record-before-you-touch-anything">Lock the canonical record before you touch anything</h2>
      <p>
        The most common mistake is starting the cleanup before deciding the canonical form. Owners begin updating directories one at a time, each with a slightly different phone format or street suffix, and the audit ends with more inconsistency than it started. Lock the record first, then update.
      </p>
      <p>
        The canonical record is one document with five fields. Legal business name in its exact final form. Trading name (DBA) if different. Full address with the suite number, postal code, and accents on French street names. Phone number in one consistent format (we use 514-555-0100 with hyphens, no parentheses, no dots). Hours of operation in the format Google expects. Save this document, share it with anyone who edits citations, and never deviate from it.
      </p>
      <p>
        For multi-location businesses, lock one canonical record per location. Do not let "branding consistency" push you toward a single hours format that hides the differences. Each location is its own entity in the eyes of every engine.
      </p>

      <CalloutBox type="warning">
        <p>Decide on the phone format before you start. We standardize on 514-555-0100 with hyphens because Google parses it cleanly, every directory accepts it, and AI engines extract it without normalization errors. Mixing parentheses (514) 555-0100 with hyphenated 514-555-0100 across 50 directories is the single most common NAP mismatch we find on Quebec audits.</p>
      </CalloutBox>

      <QuickQuiz
        question="A Quebec clinic is listed in 47 directories with the address rue Sainte-Catherine, and 3 directories with rue Sainte Catherine (no hyphen, no accent). What does Google do?"
        options={[
          'Treats all 50 as the same entity because the addresses are similar',
          'Splits the entity into two halves, weakening the trust signal for both',
          'Picks the most common variant and ignores the others',
          'Sends an email to the owner asking for clarification',
        ]}
        correctIndex={1}
        explanation="Each variant is a different string to an entity-matching algorithm. Google treats the disagreement as ambiguity, splits the trust into two partial entities, and the local pack ranking drops because no single entity has the full vote count."
      />

      <SectionDivider />

      <h2 id="export-every-existing-citation-the-quebec-way">Export every existing citation, the Quebec way</h2>
      <p>
        Use a citation aggregator (BrightLocal, Yext, or Whitespark all work, we use a hybrid pipeline at AiLys) to pull every existing citation under the brand. The export should give you the directory name, the listed Name, Address, Phone, and Hours, and a confidence score on entity match. For Quebec businesses, also pull from the French-language directory layer: Pages Jaunes, 411.ca, Canada411 in French mode, and the municipal Chamber of Commerce listing.
      </p>
      <p>
        Expect to find 30 to 70 citations on a moderately established business, more if the business has been around for a decade. New businesses with thin profiles can have 10 or fewer citations and need building rather than cleaning. The audit shape changes accordingly.
      </p>
      <p>
        Compare each citation to the canonical record. Tag every field that differs, even by one character. The accent issue alone usually accounts for 15 to 25 percent of mismatches on Quebec audits.
      </p>

      <CalloutBox type="tip">
        <p>Run the export with the canonical record visible in a second tab. The brain catches mismatches faster when the right answer is one glance away. Owners who try to memorize the canonical record while scrolling 50 directories miss roughly 30 percent more mismatches than owners working with both visible at once.</p>
      </CalloutBox>

      <InlineCTA variant="pricing" />

      <SectionDivider />

      <h2 id="classify-mismatches-into-four-buckets">Classify mismatches into four buckets</h2>
      <p>
        Every mismatch falls into one of four buckets. Sorting them this way speeds up the fix queue.
      </p>
      <ol>
        <li><strong>Name mismatches</strong>. Abbreviated vs full, with or without "Inc.", "SARL", "SENC", DBA versus legal name, French versus English version of the same name. These are the highest-priority fixes because they break the entity match completely.</li>
        <li><strong>Address mismatches</strong>. Suite number missing or wrong, street suffix variants (Saint vs St., boulevard vs boul.), accents missing on French names, postal code with or without a space. Address mismatches break the geo signal, which kills "near me" queries first.</li>
        <li><strong>Phone mismatches</strong>. Format variants (parentheses vs hyphens), country code present or missing, old number not yet retired, fax number listed where main number should be. Phone mismatches confuse AI engines that route customers based on extracted phone strings.</li>
        <li><strong>Hours mismatches</strong>. Different open hours, holiday hours not matching, seasonal hours stuck on the off-season values. Hours mismatches kill "open now" queries first and are the easiest to keep updated through the canonical record discipline.</li>
      </ol>

      <SectionDivider />

      <h2 id="fix-order-gbp-first-long-tail-last">Fix order: GBP first, long tail last</h2>
      <p>
        Fix in priority order. GBP first, always. Apple Business Connect, Bing Places, and Yelp second. Then the Quebec-specific directories: Pages Jaunes, 411.ca, Canada411, the municipal Chamber of Commerce. Then the industry verticals (Restaurants Canada, Barreau du Quebec, College of Physicians of Quebec listings, contractor associations). The long tail of small directories last.
      </p>
      <p>
        The reason is propagation. GBP is the source of truth for most other directories. Some aggregators ingest GBP data automatically, so fixing GBP first cleans up 5 to 15 secondary citations at zero marginal cost. If you fix the long tail first, you risk having to redo it after GBP propagates.
      </p>
      <p>
        Some directories require additional verification. Pages Jaunes occasionally asks for a postcard, Bing Places sometimes triggers a phone callback, and Yelp can take a week to publish a change. Plan around these. See the <InternalLink to="/audit/gbp" title="GBP audit deep dive" description="GBP-specific verification flow and attribute checklist" /> for the GBP-specific verification flow.
      </p>

      <CalloutBox type="info">
        <p>Some Quebec directories list businesses in both French and English with no obvious cross-link. Pages Jaunes and Yellow Pages Canada are technically the same data layer, but the French listing carries the French street name (rue Saint-Joseph) and the English listing carries the anglicized form (St. Joseph St.). Update both. Do not assume the French side propagates to the English side.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="the-bilingual-trap-that-only-hits-quebec">The bilingual trap that only hits Quebec</h2>
      <p>
        Quebec is the only major North American market with a hard bilingual NAP requirement. A clinic on rue Saint-Catherine appears in directories as "rue Saint-Catherine," "rue Sainte-Catherine," "Saint-Catherine St.," "Sainte-Catherine Street," and the unaccented "rue Sainte Catherine." Each variant is technically the same address, but each is a different string to an AI engine doing entity matching.
      </p>
      <p>
        The fix is to choose one form and enforce it. We recommend the French canonical form with full accents, because Quebec law (Charter of the French Language) often requires it for official communications, and Quebec-based AI engines weight the French form as primary. The English-language directories can carry the same French street name with the accents preserved (rue Sainte-Catherine, not Saint-Catherine St.). Most directories now accept Unicode accents without breaking the listing.
      </p>
      <p>
        For bilingual business names, list the legal French name as the primary and the English DBA as the alternate. Never list the English name as primary unless your legal incorporation is in English. The order matters for the entity record.
      </p>

      <InlineCTA variant="audit" />

      <InternalLink to="/industries/restaurants" title="Local SEO for Quebec restaurants" description="NAP and citation playbook tuned for resto operators" />

      <SectionDivider />

      <h2 id="maintain-the-record-after-the-cleanup">Maintain the record after the cleanup</h2>
      <p>
        The cleanup is the start, not the finish. New citations appear monthly through directory partnerships and aggregator ingestion. Old citations drift when a directory updates its data model. Without monthly maintenance, a fully cleaned 50-directory profile typically loses consistency on 5 to 10 citations per quarter.
      </p>
      <p>
        Maintenance has three components. First, the canonical record stays under version control. Any change (new suite number, new phone, new hours) propagates from one source to all 50. Second, monthly citation building adds 5 to 15 new citations at the AiLys Core, Growth, and Agency tiers, all using the canonical record. Third, a quarterly drift audit reruns the export and flags any directory that no longer matches.
      </p>
      <p>
        For Quebec local businesses doing this work in-house, plan one half-day per quarter on the drift audit. For agencies, the AiLys workflow lives inside the operator dashboard with reminder triggers when a citation slips out of consistency.
      </p>

      <KeyTakeaway
        points={[
          'Lock the canonical NAP record before touching any directory.',
          'Standardize the phone format. Hyphens beat parentheses for AI engine extraction.',
          'Sort mismatches into four buckets: name, address, phone, hours.',
          'Fix in priority order: GBP first, big four second, Quebec directories third, long tail last.',
          'Quebec needs French accents preserved on every citation, on both French and English directory layers.',
          'Maintain the cleanup with monthly building and a quarterly drift audit.',
        ]}
      />

      <SectionDivider />

      <h2 id="faq">Frequently Asked Questions</h2>
      <p>
        Want a NAP audit run on your Quebec business? The free version returns inside 24 hours and tells you which of the four mismatch buckets is leaking. Cleanup ships through the Core tier and up.
      </p>
      <InlineCTA variant="book" />
    </article>
  )
}
