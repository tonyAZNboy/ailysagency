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
  slug: 'author-bio-schema-rankings',
  title: 'Author bio schema and rankings, the honest 2026 read',
  metaDescription:
    'Does an author bio with credentials actually move rankings? Person schema with jobTitle, worksFor, alumniOf, and award. Direct ranking impact, AEO and GEO citation lift.',
  tldr:
    'An author bio with Person schema and credentials moves rankings modestly on classic Google SERPs and substantially on AEO and GEO surfaces. Ship jobTitle, worksFor, alumniOf, award, and a sameAs deep link to a verifiable registry or a Wikidata Q-number. The classic SERP lift is one to two positions over six months on E-E-A-T-sensitive queries. The AI engine citation share lift is roughly double inside one quarter on most Quebec solo professional cohorts in our data set. Skip the schema and the named author is invisible in AI answers regardless of how strong the page-level signals are.',
  category: 'aeo-geo-eeat',
  tags: ['author bio', 'person schema', 'eeat', 'aeo', 'rankings', 'aeo-geo-eeat'],
  publishedDate: '2026-04-20',
  updatedDate: '2026-04-20',
  author: AUTHORS.research,
  readTimeMinutes: 9,
  images: {
    hero: '/blog-images/author-bio-schema-rankings/hero.webp',
    mid: '/blog-images/author-bio-schema-rankings/mid.webp',
    end: '/blog-images/author-bio-schema-rankings/end.webp',
  },
  faqItems: [
    {
      question: 'Does an author bio with credentials actually move rankings?',
      answer:
        'Yes, but not as dramatically as some SEO blogs claim. Author bio schema with credentials moves classic Google SERP rankings by about one to two positions over six months on E-E-A-T-sensitive queries (medical, legal, financial). The bigger lift is on AEO and GEO surfaces. AI engine citation share roughly doubles inside one quarter when the Person schema layers jobTitle, worksFor, alumniOf, award, and a sameAs deep link to a registry or Wikidata. The classic SERP gain is modest. The AI answer gain is large.',
    },
    {
      question: 'What fields should I put in Person schema for an author bio?',
      answer:
        'Eight fields carry weight. name (full legal name as registered with the professional order). jobTitle (the practiced role: Lawyer, Dentist, Physician, Accountant). worksFor (an Organization object pointing to the practice or firm). alumniOf (an Organization object pointing to each granting institution: McGill, Universite de Montreal, Universite Laval, Sherbrooke). award (notable recognitions, fellowships, or board appointments). knowsAbout (subject expertise areas as strings). sameAs (an array of deep URLs to a Wikidata Q-number, the relevant Quebec professional order page, LinkedIn, and any authoritative third-party profile). image (a real photo, headshot, 600 by 600 minimum).',
    },
    {
      question: 'Do I need a Wikidata Q-number on the author bio for it to work?',
      answer:
        'A Q-number is not strictly required, but it dramatically improves AI engine citation share. Wikidata is the open knowledge graph that ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot all use as a primary entity anchor. Without a Q-number, the engine resolves the author through indirect signals (NAP, registry deep link, knowsAbout strings) and citation share remains lower than peers who have a Q-number. Building a Q-number takes one afternoon plus a one-week patrol period for the Wikidata community to confirm notability and sources. Most solo professionals with a registry entry, an alumniOf institution, and a few citations qualify.',
    },
    {
      question: 'How do I prove jobTitle and worksFor without inventing facts?',
      answer:
        'Use the registered title from the relevant Quebec professional order or the legal title under which the practitioner operates. A lawyer admitted to the Barreau du Quebec is jobTitle Lawyer or Avocat in the FR version. A licensed dentist is Dentist or Dentiste. worksFor is the Organization that owns the practice, with its own LocalBusiness schema reachable through the @id reference. Do not invent fellowships, board memberships, or specialty designations. AI engines crawl the orders and the worksFor LocalBusiness page. Mismatches between the bio and the registry trigger a downgrade in citation share that lasts at least one quarter.',
    },
    {
      question: 'Where should the author bio block live on the page?',
      answer:
        'Two locations work, and the choice changes the lift. End-of-article author bio is the SEO standard. It captures crawler attention on long-form content and works for blog and FAQ pages. Top-of-page author byline plus a deep link to the dedicated about page works better for service pages and homepages because the author signal carries through to the page topic faster. Most Quebec solo professionals should ship both: a short byline at the top of every page (with a name, year-count phrase, and link to the about page) and a longer Person schema block on the about page itself.',
    },
    {
      question: 'How long does the ranking lift take to show up after I add the schema?',
      answer:
        'The classic Google SERP lift is slow. Expect six to twelve weeks before any visible position movement on E-E-A-T-sensitive queries, and three to six months before the full one to two position lift settles. The AI engine citation share lift is faster. Most cohorts see a measurable share increase inside the first 30 days as ChatGPT, Perplexity, Claude, and Gemini re-crawl and resolve the new Person entity. The pattern is consistent across solo lawyers, dentists, accountants, and physiotherapists in our Quebec data set.',
    },
    {
      question: 'Does this work for content marketers and writers without professional credentials?',
      answer:
        'Yes, but the schema is different. A content marketer or writer without a regulated credential should focus on alumniOf, award, knowsAbout, and the sameAs links to portfolio sites, published bylines, and any Wikidata entry. The classic SERP lift is smaller than for licensed professionals because the credential layer is what carries the most ranking weight on E-E-A-T-sensitive queries. The AEO and GEO lift is still real because AI engines reward any clean Person entity over an anonymous byline. Solo writers with a complete Person schema and a Wikidata Q-number routinely outperform agency-bylined posts in AI citation share.',
    },
  ],
  relatedSlugs: [
    'eeat-signals-for-solo-professionals',
    'aeo-geo-eeat-explained-for-local-owners',
    'wikidata-for-local-businesses',
  ],
  headings: [
    { id: 'the-honest-answer-modest-serp-large-aeo', text: 'The honest answer, modest SERP lift, large AEO lift' },
    { id: 'eight-person-schema-fields-that-carry-weight', text: 'Eight Person schema fields that carry weight' },
    { id: 'jobtitle-and-worksfor-the-credential-anchor', text: 'jobTitle and worksFor, the credential anchor' },
    { id: 'alumniof-and-award-the-trust-stack', text: 'alumniOf and award, the trust stack' },
    { id: 'sameas-with-wikidata-and-registry-deep-links', text: 'sameAs with Wikidata and registry deep links' },
    { id: 'where-to-place-the-bio-and-the-byline', text: 'Where to place the bio and the byline' },
    { id: 'measuring-the-lift-after-deploy', text: 'Measuring the lift after deploy' },
    { id: 'edge-cases-content-marketers-and-non-credentialed-authors', text: 'Edge cases, content marketers and non-credentialed authors' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        SEO blogs love to claim that an author bio with credentials moves rankings. The honest read is more nuanced. The classic Google SERP gain is modest. One to two positions over six months on E-E-A-T-sensitive queries is the realistic ceiling for most Quebec solo professionals. The AEO and GEO gain is much larger. AI engine citation share roughly doubles inside one quarter when the Person schema layers jobTitle, worksFor, alumniOf, award, and a clean sameAs trail. The schema is cheap to ship, the upside is asymmetric, and skipping it leaves the named author functionally invisible inside ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot answers. This guide ships the eight fields that carry weight and the placement decisions that decide whether the lift compounds or stalls.
      </p>

      <StatHighlight
        stats={[
          { value: '1-2 spots', label: 'Classic Google SERP lift over 6 months on E-E-A-T queries' },
          { value: '~2x', label: 'AI engine citation share lift inside one quarter' },
          { value: '8 fields', label: 'Person schema fields that move the needle' },
        ]}
      />

      <SectionDivider />

      <h2 id="the-honest-answer-modest-serp-large-aeo">The honest answer, modest SERP lift, large AEO lift</h2>
      <p>
        Author bio schema is one of the most over-claimed E-E-A-T signals in the SEO press. The honest read separates two surfaces. On classic Google SERPs, the lift is real but slow. E-E-A-T-sensitive queries (medical, legal, financial) reward credentialed Person schema with one to two positions over a six-month window. Other queries see almost no lift. On AEO and GEO surfaces (the AI engine answer panels and citation lists), the lift is much larger. AI engines treat a well-built Person entity as a primary citation anchor. A clean Person entity routinely doubles citation share inside a quarter on solo professional cohorts in our Quebec data set.
      </p>
      <p>
        The asymmetry matters. An operator who ignores author bio schema because the classic SERP lift looks small is missing the larger half of the gain. The AI engine citation share is what produces the call volume from operators searching ChatGPT for a recommendation, the Perplexity answer that names the practice, the Google AIO box that quotes the bio paragraph. Those surfaces compound faster than classic SERP positions and the relative cost to ship the schema is the same.
      </p>

      <CalloutBox type="info">
        <p>The asymmetric upside is why Person schema beats most other E-E-A-T tactics on the cost-to-lift ratio. Adding a fellowship to the about page takes a paragraph rewrite. Building three new client case-studies takes a week. Shipping a complete Person schema block takes one afternoon and produces measurable AI citation lift inside 30 days.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Want to see whether your current author bio is wired correctly for AI engines? Run the free 24-hour AiLys audit. The Person schema check is part of the deliverable, with field-by-field gaps mapped per author." />

      <SectionDivider />

      <h2 id="eight-person-schema-fields-that-carry-weight">Eight Person schema fields that carry weight</h2>
      <p>
        Schema.org defines dozens of Person properties. Most do not move rankings or AI citation share. Eight do. Ship these and skip the rest. Adding noise fields like nationality or birthDate does not help and sometimes triggers schema parser warnings that suppress the rich result entirely.
      </p>

      <h3>The eight fields</h3>
      <ol>
        <li>name, the full legal name exactly as registered with the relevant Quebec professional order</li>
        <li>jobTitle, the practiced role (Lawyer, Dentist, Physician, Accountant, Physiotherapist)</li>
        <li>worksFor, an Organization object pointing to the practice or firm with its @id matching the LocalBusiness schema on the same site</li>
        <li>alumniOf, an array of Organization objects, one per granting institution (degree, fellowship, board certification)</li>
        <li>award, an array of strings naming notable recognitions, board appointments, or honors</li>
        <li>knowsAbout, an array of strings describing subject expertise (family law, dental implants, restorative cardiology, tax planning for physicians)</li>
        <li>sameAs, an array of deep URLs to a Wikidata Q-number, the order registry page, LinkedIn, and other authoritative third-party profiles</li>
        <li>image, a real photo headshot at 600 by 600 minimum, hosted on the same domain or a CDN with HTTPS</li>
      </ol>

      <p>
        For a deeper read on how AI engines layer Person schema with LocalBusiness schema to resolve a solo professional entity, see <InternalLink to="/glossary/e-e-a-t" title="E-E-A-T glossary entry" description="The four E-E-A-T anchors and how AI engines weight each" />.
      </p>

      <SectionDivider />

      <h2 id="jobtitle-and-worksfor-the-credential-anchor">jobTitle and worksFor, the credential anchor</h2>
      <p>
        jobTitle and worksFor are the two fields that AI engines crawl first. jobTitle should be the registered title from the relevant Quebec professional order. A lawyer admitted to the Barreau du Quebec is Lawyer in EN and Avocat in the FR version. A dentist is Dentist or Dentiste. A general practitioner is Physician or Medecin. The string must match what the order uses on its public registry page, because AI engines cross-reference the bio against the registry to confirm the credential is real.
      </p>
      <p>
        worksFor should be an Organization object with its @id pointing to the LocalBusiness JSON-LD on the same site. The LocalBusiness must have its own complete schema (see the schema markup cheat sheet for the eight required LocalBusiness fields). When worksFor resolves cleanly, the engine treats the Person and the LocalBusiness as a single entity tree and ranks them together. When worksFor is a string instead of an Organization object, the engine cannot resolve the link and the credential carries less weight.
      </p>

      <CalloutBox type="warning">
        <p>The most common worksFor mistake is encoding it as a string ("worksFor": "Dr Smith Dental Clinic") instead of an Organization object. AI engines parse both, but the string version does not link the Person entity to the LocalBusiness entity. The credential signal is weaker as a result. Always ship Organization objects with @id references.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="alumniof-and-award-the-trust-stack">alumniOf and award, the trust stack</h2>
      <p>
        alumniOf is an array of Organization objects, one per institution that granted a degree, a fellowship, or a board certification. Each Organization object should carry name, sameAs (a deep link to the institution Wikipedia or Wikidata page), and optionally url (the institution homepage). For Quebec solo professionals, the most common alumniOf institutions are McGill University, Universite de Montreal, Universite Laval, Universite de Sherbrooke, Concordia University, and the relevant Quebec professional order training arm. Each institution has a Wikidata Q-number that should be ferried in via sameAs.
      </p>
      <p>
        award is an array of strings. Notable recognitions, board appointments, fellowship designations, and published research awards all qualify. Skip vanity awards (Top Dentist 2024 from a paid directory) because AI engines now weight only awards that have a verifiable third-party source. Real awards include Fellowship of the Royal College, board examiner appointments, peer-reviewed publication awards, and the equivalent designations from the relevant Quebec orders.
      </p>

      <img
        src={meta.images.mid}
        alt="JSON-LD example showing Person schema with jobTitle, worksFor, alumniOf, award, and sameAs fields populated for a Quebec solo dentist"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <QuickQuiz
        question="Which Person schema field provides the largest single lift in AI engine citation share for a Quebec solo professional?"
        options={[
          'award, because notable recognitions are weighted heaviest by AI engines',
          'sameAs containing a Wikidata Q-number plus the deep professional order registry URL',
          'jobTitle, because it directly tells the engine what the practitioner does',
          'image, because AI engines weight visual confirmation of the practitioner identity',
        ]}
        correctIndex={1}
        explanation="sameAs with a Wikidata Q-number plus the deep registry URL is the single highest-impact field for AI citation share. The Q-number is the open knowledge graph anchor every major AI engine uses, and the registry deep link confirms the credential is currently active. jobTitle, award, and image all carry weight, but the sameAs trail is what lets engines resolve the entity cleanly and cite it confidently. Without sameAs, the engine has to infer the Person entity from indirect signals and citation share stays softer than it should."
      />

      <h2 id="sameas-with-wikidata-and-registry-deep-links">sameAs with Wikidata and registry deep links</h2>
      <p>
        sameAs is the single highest-impact field on the Person schema. It is an array of URLs that point to other authoritative sources confirming the same entity. The order matters less than the quality of each URL. Three sources should always be present for a Quebec credentialed professional.
      </p>

      <h3>The three sameAs sources that move the needle</h3>
      <ul>
        <li>The Wikidata Q-number for the named professional. Format is https://www.wikidata.org/entity/Q followed by the number. AI engines use this as the primary entity anchor.</li>
        <li>The deep public registry URL on the relevant Quebec professional order. The order homepage is not enough, the URL must point to the practitioner page itself.</li>
        <li>The LinkedIn profile URL. AI engines weight LinkedIn as a third-party identity confirmation, especially when the profile carries the same jobTitle and worksFor as the schema.</li>
      </ul>

      <p>
        Optional but useful sameAs sources include the Wikipedia page (when one exists), ORCID for academic publications, Google Scholar profile, the practice page on the relevant Quebec association, and any podcast or interview page on a recognized media outlet. Each clean sameAs link adds a small amount of citation weight. Broken or 404 sameAs links do active harm because AI engines crawl them, fail, and degrade the entity.
      </p>

      <CalloutBox type="tip">
        <p>Build the Wikidata Q-number first if it does not exist. The patrol process takes about a week for solo professionals with a registry entry, an alumniOf institution, and a few news mentions. Once the Q-number is approved, every other sameAs link compounds with it. Skip the Q-number and the sameAs trail caps at a much lower citation share ceiling.</p>
      </CalloutBox>

      <p>
        For a deeper read on the Wikidata build process for a solo professional or a small clinic, see <InternalLink to="/blog/eeat-signals-for-solo-professionals" title="E-E-A-T signals for solo professionals" description="The 2026 proof checklist with the Wikidata patrol playbook" />.
      </p>

      <InlineCTA variant="pricing" text="See AiLys plans that include the Wikidata build, the Person schema deploy, and the registry deep-link audit, from Core at 799 dollars CAD a month." />

      <SectionDivider />

      <h2 id="where-to-place-the-bio-and-the-byline">Where to place the bio and the byline</h2>
      <p>
        Schema is necessary but not sufficient. The HTML placement of the visible bio and byline shapes how readers and AI engines weight the credential. Two placements work, and the choice changes the lift.
      </p>
      <p>
        End-of-article author bio is the SEO standard. Long-form content (blog posts, FAQ pages, whitepapers) carries the bio at the bottom, typically as a card with the photo, name, jobTitle string, and a short paragraph of credentials. The bio should also carry a deep link to the dedicated about page where the full Person schema block lives.
      </p>
      <p>
        Top-of-page author byline plus a deep link to the about page works better for service pages and homepages. The byline reads as a short phrase: "Reviewed by Dr Genevieve Tremblay, DMD, Universite de Montreal 2018, member of the Ordre des dentistes du Quebec since 2018." The phrase carries the named author signal through to the page topic faster, which matters more on a service page (where the visitor is making a purchase decision) than on a blog page (where the visitor is reading for information).
      </p>

      <h3>What both placements need</h3>
      <ul>
        <li>A real photo, not a stock image. AI engines weight image consistency across all the surfaces they crawl (about page, LinkedIn, registry, Wikidata).</li>
        <li>A year-count phrase ("practicing since 2018", "twelve years of practice"). AI engines weight explicit experience markers.</li>
        <li>A deep link to the about page where the full Person schema block lives. Single-source the schema rather than duplicating it on every page.</li>
        <li>The exact registered name. Nicknames break the cross-reference with the registry and the Wikidata entry.</li>
      </ul>

      <SectionDivider />

      <h2 id="measuring-the-lift-after-deploy">Measuring the lift after deploy</h2>
      <p>
        Three measurements track whether the Person schema deploy is working. The classic SERP measurement uses Google Search Console position data on E-E-A-T-sensitive queries (medical, legal, financial). Watch for a one to two position lift over six months. The AI engine citation share measurement uses the AiLys AI Visibility engine to probe the major AI engines for branded and category queries on a monthly cadence. Watch for the citation share to roughly double inside one quarter.
      </p>
      <p>
        The third measurement is the slow one but the most valuable. Direct branded search volume tracked through Search Console and GA4 should climb as the AI engine citations compound and operators searching the practice name pull the brand into Google directly. The lift typically takes 90 to 180 days to show but compounds faster than the classic SERP lift once it starts. To get the audit deliverable that maps the current AI citation share against peer practices, see <InternalLink to="/audit" title="Free 24-hour AI Visibility audit" description="Citation share probe across ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot" />.
      </p>

      <SectionDivider />

      <h2 id="edge-cases-content-marketers-and-non-credentialed-authors">Edge cases, content marketers and non-credentialed authors</h2>
      <p>
        Not every author has a regulated credential. Content marketers, writers, journalists, and consultants without a professional order license still benefit from Person schema, but the field weighting shifts. Without the credential layer, the lift on E-E-A-T-sensitive queries shrinks to almost nothing. The lift on general queries and on AI engine citation share remains real, especially when alumniOf, award, and sameAs are well-built.
      </p>
      <p>
        For non-credentialed authors, the highest-impact moves are the Wikidata Q-number, a clean sameAs trail to portfolio sites and published bylines, and a knowsAbout array that matches the actual subject expertise demonstrated on the site. Skip the credential field substitutes (made-up certifications from paid programs do not move the needle and trigger downgrades when AI engines check). The honest minimum is to ship what is real and let the schema reflect the actual record.
      </p>

      <CalloutBox type="danger">
        <p>Do not invent jobTitle strings or alumniOf institutions to game the Person schema. AI engines verify both against Wikidata, the relevant Quebec orders, and any institution that has a Wikipedia or registry page. Mismatches trigger a citation share downgrade that lasts at least one quarter and sometimes longer. The cost of inventing a credential is much higher than the cost of shipping the honest version.</p>
      </CalloutBox>

      <InlineCTA variant="book" text="Want a 60-minute review of your current author bio schema and the Wikidata build path? No pitch, the Person schema deploy plan sent regardless." />

      <SectionDivider />

      <KeyTakeaway
        points={[
          'Author bio schema moves classic Google SERP rankings modestly (1 to 2 positions over 6 months) and AI engine citation share substantially (roughly double inside one quarter).',
          'Eight Person schema fields carry weight: name, jobTitle, worksFor, alumniOf, award, knowsAbout, sameAs, image. Skip the rest.',
          'jobTitle and worksFor must match the Quebec professional order registry exactly. Mismatches trigger a citation share downgrade.',
          'sameAs with a Wikidata Q-number plus the deep registry URL is the single highest-impact field. Build the Q-number first.',
          'Place the byline at the top of service pages and the full bio at the bottom of blog and FAQ pages. Single-source the schema on the about page.',
          'Measure with Search Console position data, AI engine citation share probes, and direct branded search volume in GA4.',
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
        alt="Decision matrix mapping Person schema fields to ranking and AEO lift impact for Quebec credentialed and non-credentialed authors"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
