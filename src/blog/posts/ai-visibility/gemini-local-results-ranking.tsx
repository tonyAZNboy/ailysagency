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
  slug: 'gemini-local-results-ranking',
  title: 'How to rank in Gemini local results, the 2026 ranking factors',
  metaDescription:
    'How local businesses surface inside Gemini local answers. The five ranking layers (GBP attributes, schema density, photo EXIF freshness, citation graph depth, NAP consistency) with the order to fix them.',
  tldr: 'Gemini local results pull from Google Business Profile, the public web, and the structured data graph that Google maintains around each business. The five ranking layers that move Gemini citations are attribute completeness on GBP, schema density on the public site, photo EXIF freshness, citation graph depth on third-party sites, and NAP consistency across every directory. Fixing them in that order is the playbook that closes the visibility gap inside Gemini and adjacent AI surfaces.',
  category: 'ai-visibility',
  tags: ['gemini', 'local seo', 'ai visibility', 'ranking factors', 'gbp'],
  publishedDate: '2026-03-27',
  updatedDate: '2026-03-27',
  author: AUTHORS.research,
  readTimeMinutes: 10,
  images: {
    hero: '/blog-images/gemini-local-results-ranking/hero.webp',
    mid: '/blog-images/gemini-local-results-ranking/mid.webp',
    end: '/blog-images/gemini-local-results-ranking/end.webp',
  },
  faqItems: [
    {
      question: 'How do I get my business into Gemini local results?',
      answer:
        'Gemini surfaces local businesses by pulling from Google Business Profile data, the public web, and the structured data graph Google maintains. Five ranking layers move the needle in priority order: GBP attribute completeness (boolean toggles fully filled), schema density on the public site (LocalBusiness, Service, FAQ, Review), photo EXIF freshness, citation graph depth on third-party directories, and NAP consistency. Fix them in that order and Gemini citations follow inside two to three months.',
    },
    {
      question: 'Does Gemini use Google Business Profile the same way as Google Maps?',
      answer:
        'Gemini reads the same Google Business Profile data, but it weights the signals differently. Maps weights proximity, reviews, and category match heavily. Gemini weights attribute completeness, photo freshness, and the surrounding citation graph more, because it composes a generative answer rather than ranking a list. A profile that is strong in Maps can still be invisible in Gemini if the attributes and the third-party citations are thin.',
    },
    {
      question: 'How long does it take to see Gemini citations after the fixes?',
      answer:
        'In our reference cases, the first Gemini citations land 8 to 10 weeks after the GBP attribute completeness work and the first schema density push. Photo EXIF freshness compounds over months because Gemini weights the cadence of fresh photos, not the count. Citation graph depth and NAP consistency are slower signals that move over a quarter or two as third-party directories re-crawl and re-index.',
    },
    {
      question: 'What schema types matter most for Gemini local visibility?',
      answer:
        'LocalBusiness is the foundation, with the right sub-type (Dentist, Restaurant, AutoRepair). Service entries with areaServed and the priceRange property add depth. FAQ schema attached to the right page improves snippet extraction. Review schema with the aggregate rating and individual review properties feeds the trust signal. The combined density of these schemas on the public site, more than any single one, is what moves Gemini citation rate.',
    },
    {
      question: 'Why is photo EXIF freshness a Gemini ranking signal?',
      answer:
        'Gemini favors places that prove ongoing operation. Fresh photos with real EXIF data (recent date, GPS coordinates that match the business address, camera fingerprint that does not look stock) are the cheapest proof of life that the engine can read at scale. Stock photos, lifted photos, and photos with stripped EXIF read as a degraded signal. Two fresh photos a week with proper EXIF beat twenty stock photos uploaded once.',
    },
  ],
  relatedSlugs: ['google-ai-overviews-citation-gap-2027', 'share-of-model-metric-explained', 'ai-visibility-audit-checklist-2026'],
  headings: [
    { id: 'how-gemini-builds-a-local-answer', text: 'How Gemini builds a local answer' },
    { id: 'the-five-ranking-layers-in-order', text: 'The five ranking layers, in order' },
    { id: 'gbp-attribute-completeness', text: 'Layer one, GBP attribute completeness' },
    { id: 'schema-density-on-the-public-site', text: 'Layer two, schema density on the public site' },
    { id: 'photo-exif-freshness', text: 'Layer three, photo EXIF freshness' },
    { id: 'citation-graph-depth', text: 'Layer four, citation graph depth' },
    { id: 'nap-consistency-across-directories', text: 'Layer five, NAP consistency across directories' },
    { id: 'a-90-day-plan-to-close-the-gap', text: 'A 90-day plan to close the gap' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        Gemini local results pull from three sources: Google Business Profile (see the <InternalLink to="/glossary/gbp" title="GBP glossary entry" description="The full definition of Google Business Profile and the ranking signals it carries" /> for the surface), the public web, and the structured data graph Google maintains around each business. The engine composes a generative answer rather than ranking a list, which means classic local SEO signals matter, but in a different weighting. The five ranking layers that move Gemini citations are GBP attribute completeness, schema density on the public site, photo EXIF freshness, citation graph depth on third-party directories, and NAP consistency. This page walks the layers in priority order, with the order to fix them and the cadence to expect.
      </p>

      <StatHighlight
        stats={[
          { value: '5 layers', label: 'Ranking factors that move Gemini citations' },
          { value: '8 to 10 weeks', label: 'First citations after GBP plus schema work' },
          { value: '2 photos / week', label: 'Minimum cadence for EXIF freshness signal' },
        ]}
      />

      <SectionDivider />

      <h2 id="how-gemini-builds-a-local-answer">How Gemini builds a local answer</h2>
      <p>
        Classic Google local search ranks a list. The map pack returns three businesses, the user picks one, and the click flows through. Gemini composes an answer. The user asks "best dentist near me with Saturday hours and free parking", and Gemini returns a paragraph that names two or three businesses, summarizes why each fits, and links back to the GBP listing or the public site. The composition step is where local SEO turns into AI Visibility, because the engine is now choosing what to say about the business, not just whether to list it.
      </p>
      <p>
        The composition relies on data the engine can extract and verify. GBP attributes feed the eligibility filter (Saturday hours, parking). Schema on the public site feeds the description and the trust signals. Photo EXIF feeds the proof of operation. The citation graph feeds the corroboration that the business exists across multiple sources. NAP consistency feeds the disambiguation between this business and a similarly named one across town. A gap in any one of the layers reduces the chance Gemini will compose the business into the answer.
      </p>

      <CalloutBox type="info">
        <p>For a deeper background on how AI engines pick which businesses to cite, see <InternalLink to="/glossary/share-of-model" title="Share of Model glossary entry" description="The metric AiLys uses to track citation share across ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot" />. Gemini citation share follows the same shape as the other engines, with extra weight on GBP attributes and photo freshness.</p>
      </CalloutBox>

      <InlineCTA variant="audit" />

      <SectionDivider />

      <h2 id="the-five-ranking-layers-in-order">The five ranking layers, in order</h2>
      <p>
        The order matters because each layer feeds the next. Filling GBP attributes first gives the engine a clean eligibility filter. Adding schema density second gives it a public source to corroborate the GBP data. Photo EXIF freshness third gives it the proof of operation. Citation graph depth fourth gives it the third-party corroboration. NAP consistency last cleans the disambiguation. Skipping the order, fixing NAP first while the GBP attributes are 30 percent filled, wastes effort because the engine never gets through the eligibility filter to read the citation graph.
      </p>
      <p>
        The order also matches the cost curve. GBP attribute work is cheap and fast (a few hours of dashboard work). Schema density is medium effort (a developer day or two for a small site). Photo EXIF freshness is ongoing low effort (two photos a week from the client phone). Citation graph depth is medium-to-high effort (NAP rewrites across twenty to fifty directories). NAP consistency is the slow signal that moves over a quarter as directories re-crawl. Doing the cheap and fast layers first builds momentum.
      </p>

      <h3>The five layers in one table</h3>
      <ul>
        <li>Layer 1, GBP attribute completeness: boolean toggles fully filled, primary and secondary categories, services list, hours including holidays</li>
        <li>Layer 2, schema density: LocalBusiness with the right sub-type, Service entries, FAQ schema, Review aggregate</li>
        <li>Layer 3, photo EXIF freshness: two photos a week minimum, real EXIF, GPS that matches the business address</li>
        <li>Layer 4, citation graph depth: NAP-consistent listings on twenty to fifty directories with industry relevance</li>
        <li>Layer 5, NAP consistency: identical name, address, phone format across every public surface</li>
      </ul>

      <SectionDivider />

      <h2 id="gbp-attribute-completeness">Layer one, GBP attribute completeness</h2>
      <p>
        GBP attributes are the boolean toggles on the profile (wheelchair accessible, free Wi-Fi, has a patio, accepts reservations, Saturday hours, free parking). Most profiles fill 30 to 50 percent of the available attributes, because the dashboard hides the long list under sub-menus and most owners stop at the obvious ones. The engine reads every toggle. The unfilled ones are silent gaps that exclude the business from queries that filter on those attributes.
      </p>
      <p>
        See the <InternalLink to="/glossary/gbp" title="GBP glossary entry" description="Full definition of Google Business Profile and the ranking signals it carries" /> for the full attribute list per business type. The shortcut is to open the profile in edit mode, walk every sub-menu, and toggle every attribute that applies. This is two to three hours of work for a single-location business, and it is the single most powerful move on the list, because every later layer corroborates an attribute filter that does not exist if the toggles are blank.
      </p>

      <CalloutBox type="tip">
        <p>The Reviuzy add-on surfaces the gaps in the dashboard with one-tap fix flows. If the operator already has Reviuzy, the attribute audit is a single screen that shows the unfilled toggles per location and lets the owner fix them in batch. Without Reviuzy, the same audit is a manual walk through every sub-menu in the GBP dashboard.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="schema-density-on-the-public-site">Layer two, schema density on the public site</h2>
      <p>
        Schema density on the public site is the second layer because it gives Gemini a public source to corroborate the GBP data. The minimum schema set for a local business is LocalBusiness with the right sub-type (Dentist, Restaurant, AutoRepair, MedicalClinic), Service entries with areaServed and priceRange, FAQ schema attached to the FAQ section, and Review aggregate with the rating and review count. Each schema entry is a structured paragraph the engine can read without parsing prose.
      </p>
      <p>
        The density matters more than any single schema. A site with LocalBusiness only is thin. A site with LocalBusiness, three Service entries, an FAQ block, and Review aggregate is dense. The engine treats density as a confidence signal, because a site that ships structured data on every relevant entity is a site whose author understood the technical surface, which correlates with operational seriousness. This is not a Gemini-specific quirk. It is how every modern AI engine reads the public web.
      </p>

      <QuickQuiz
        question="Which ranking layer should a local business fix FIRST to start showing up in Gemini local results?"
        options={[
          'NAP consistency across every directory',
          'GBP attribute completeness on the profile',
          'Backlink count from authority domains',
          'Press release distribution',
        ]}
        correctIndex={1}
        explanation="GBP attribute completeness is the first layer because it feeds the eligibility filter. Until the boolean toggles are fully filled, queries that filter on attributes (Saturday hours, free parking, wheelchair accessible) silently exclude the business. Every later layer corroborates an attribute filter that does not exist if the toggles are blank."
      />

      <SectionDivider />

      <h2 id="photo-exif-freshness">Layer three, photo EXIF freshness</h2>
      <p>
        Photo EXIF freshness is the proof of operation signal. A profile with twelve photos uploaded three years ago reads as static. A profile with two fresh photos a week, every week, reads as actively operating. The engine prefers actively operating businesses for any local query, because the user intent is almost always present-tense ("open now", "this weekend", "today"). EXIF data is the cheapest proof the engine can verify at scale, because it carries a timestamp, GPS coordinates, and a camera fingerprint that all need to align.
      </p>
      <p>
        The cadence to maintain is two photos a week minimum, with variety across interior, exterior, food or product, team, and storefront categories. The photos must come from a real device on-site, not a stock library and not a stripped JPEG with no metadata. The Reviuzy app on the client phone enforces this by capturing through the native camera and pushing the file with EXIF intact. Stock photos and lifted photos are detectable by Google and they erode rather than build the freshness signal.
      </p>

      <img
        src={meta.images.mid}
        alt="Photo EXIF metadata diagram showing timestamp, GPS coordinates, and camera fingerprint that feed the Gemini freshness signal"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="citation-graph-depth">Layer four, citation graph depth</h2>
      <p>
        Citation graph depth is the third-party corroboration. Gemini reads the public web and treats a business that appears on twenty to fifty industry-relevant directories with consistent NAP as more real than one that appears on three. The depth matters more than the volume. Twenty hand-picked, relevant directories beat one hundred low-relevance ones. For a Quebec clinic, the relevant set includes the provincial medical college directory, the local Chamber of Commerce, RDV Santé, and the major Canadian directories (Yellow Pages, Yelp Canada, Apple Business Connect, Bing Places). For a restaurant, the set includes OpenTable, Tourisme Quebec, Tripadvisor, and the local food guides.
      </p>
      <p>
        The work to build the citation graph is rewriting NAP across each directory, claiming any unclaimed listings, and adding the business to the missing ones. This is a two to three month project for a single location, and it pays off as the directories re-crawl and re-index. The early Gemini citations land before the full graph is built, because the engine reads the highest-authority directories first, but the full lift compounds over a quarter.
      </p>

      <CalloutBox type="warning">
        <p>Avoid citation farms and link aggregators. They are the cheap shortcut that looks like progress on the spreadsheet but signals the wrong thing to the engine. A profile linked from forty link farms reads as gamed. A profile linked from twenty industry-relevant directories reads as real. The cheap shortcut is the slow road, because the engine deweights the farm-linked profile and the operator pays again to clean up.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="nap-consistency-across-directories">Layer five, NAP consistency across directories</h2>
      <p>
        NAP consistency is the disambiguation layer. Across every directory, every social profile, every public page, the business name, address, and phone must match. Match means literally identical: the same suite number format, the same phone format, the same business name spelling. The engine matches across surfaces with a string comparison, and any drift between surfaces (123 Rue Saint-Denis on one site, 123 St-Denis Street on another) feeds an entity-resolution problem that the engine resolves by deweighting both surfaces.
      </p>
      <p>
        The audit work is straightforward. List every public surface that names the business. Pick the canonical NAP format. Rewrite every surface to match. Submit corrections through each directory's edit flow, which is sometimes immediate and sometimes a 30-day approval queue. The slow surface is the one the engine respects, because slow corrections are harder to spoof. This is why NAP consistency is the slow signal that moves over a quarter or two, and why it sits last in the priority order even though it sounds like a foundation.
      </p>

      <InlineCTA variant="pricing" text="See the four AiLys tiers that ship the five-layer fix work, from Starter at 300 dollars CAD to Agency at 2,500 dollars CAD." />

      <InlineCTA variant="book" text="Want a 60-minute audit walkthrough that scores all five layers for your business, no pitch, scorecard sent regardless?" />

      <SectionDivider />

      <h2 id="a-90-day-plan-to-close-the-gap">A 90-day plan to close the gap</h2>
      <p>
        Week one and two: GBP attribute completeness across every sub-menu. This is the cheapest, fastest, most impactful layer. Week three and four: schema density on the public site, with a developer pushing LocalBusiness with the right sub-type, three Service entries, FAQ schema, and Review aggregate. Week five through twelve: photo EXIF freshness on a two-a-week cadence, with the photos coming from the client device. Week six through ten in parallel: citation graph depth, with NAP rewrites across twenty industry-relevant directories. Week eight through twelve in parallel: NAP consistency audit and corrections.
      </p>
      <p>
        The first Gemini citations typically land in week eight to ten in our reference cases, after the GBP attribute work and the first schema push. The full lift compounds through week twelve and beyond, as the citation graph and NAP corrections re-index. Past 90 days, the maintenance cadence is the photo upload, the monthly attribute review, and the quarterly NAP audit. The five layers are not a one-time fix. They are an ongoing posture.
      </p>

      <SectionDivider />

      <KeyTakeaway
        points={[
          'Gemini local results pull from GBP, the public web, and the Google structured data graph. The five ranking layers move citations.',
          'The order is GBP attribute completeness, then schema density, then photo EXIF freshness, then citation graph depth, then NAP consistency.',
          'GBP attribute completeness is the most powerful first move because every later layer corroborates an attribute filter.',
          'Photo EXIF freshness needs two photos a week minimum, from the client device, with intact metadata.',
          'First citations land in 8 to 10 weeks. Full lift compounds over a quarter as the citation graph re-indexes.',
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
        alt="90-day plan timeline to fix the five Gemini local ranking layers in priority order"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
