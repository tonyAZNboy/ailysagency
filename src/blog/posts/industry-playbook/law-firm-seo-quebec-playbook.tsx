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
  slug: 'law-firm-seo-quebec-playbook',
  title: 'Law firm SEO Quebec, the AI Overviews and local pack playbook for 2026',
  metaDescription:
    'How family and immigration law firms in Quebec rank in AI Overviews, the local pack, and Perplexity. Barreau credentials, bilingual landing pages, Attorney schema, and citation work.',
  tldr: 'Family and immigration law firms in Quebec rank in AI Overviews when four signals stack: Order des avocats du Quebec credentials wired into Attorney schema, bilingual landing pages with practice-area pillars in EN and FR, NAP-consistent citations across Avvo, Lawyer.com, Lexology, and LegalDirectories.com, and structured FAQ pages that answer the long-tail questions clients actually type. Done in this order, a Quebec firm typically earns AI Overview citations on three to five practice-area queries inside one quarter.',
  category: 'industry-playbook',
  tags: ['law firm seo', 'quebec', 'industry-playbook', 'ai overviews', 'family law', 'immigration law'],
  publishedDate: '2026-03-03',
  updatedDate: '2026-03-03',
  author: AUTHORS.strategy,
  readTimeMinutes: 11,
  images: {
    hero: '/blog-images/law-firm-seo-quebec-playbook/hero.webp',
    mid: '/blog-images/law-firm-seo-quebec-playbook/mid.webp',
    end: '/blog-images/law-firm-seo-quebec-playbook/end.webp',
  },
  faqItems: [
    {
      question: 'How do family law firms in Quebec rank in AI Overviews?',
      answer:
        'Family law firms in Quebec earn AI Overview citations when four signals line up. First, the firm has Order des avocats du Quebec credentials referenced inside Attorney schema and visible on every lawyer bio page. Second, bilingual landing pages cover each practice area with parallel EN and FR-CA pillars. Third, citations on Avvo, Lawyer.com, Lexology, and LegalDirectories.com all carry identical NAP. Fourth, FAQ pages answer the long-tail questions in plain language. AI engines cite firms that read as authoritative, current, and locally compliant, which is exactly what those four signals demonstrate.',
    },
    {
      question: 'Does Order des avocats du Quebec credential matter for SEO?',
      answer:
        'Yes, in two ways. The Barreau membership number anchors E-E-A-T trust signals, especially for Google AI Overviews and Perplexity which both cite legal directories that pull from Barreau records. The credential is also a hard requirement for ProBono Avocat, JuriBistro, and several other Quebec legal directories that feed the citation graph. Firms without the credential displayed in Attorney schema lose AI Overview citations to firms that surface the number cleanly on every lawyer bio page.',
    },
    {
      question: 'Do Quebec law firms need both English and French landing pages?',
      answer:
        'Yes. Family law and immigration law searches in Montreal split roughly 55 percent French and 45 percent English, with immigration leaning slightly more English-heavy and family law leaning slightly more French-heavy. Google ranks EN and FR as separate surfaces with their own AI Overviews. A firm that publishes only in English misses about half the local market and forfeits the AI Overview citations on FR queries to the next firm with bilingual coverage. Quebec French is mandatory, hand-authored, with regional spellings.',
    },
    {
      question: 'Which legal directories matter most for AI Overview citations in Quebec?',
      answer:
        'In our weekly AI Overview probes for family and immigration law in Montreal, the directories that show up most often as cited sources are Lexology, LegalDirectories.com, Avvo, Lawyer.com, and the JuriBistro directory operated by CAIJ. The Barreau du Quebec lawyer directory itself is the highest-trust source when a firm has the credential displayed. Firms cited by two or more of these directories with consistent NAP earn AI Overview placement faster than firms that rely only on Google Business Profile.',
    },
    {
      question: 'How long until a Quebec law firm sees AI Overview citations after starting the playbook?',
      answer:
        'Quick wins on credential schema and bilingual page coverage show inside two to three weeks. Citation cleanup across the five priority directories takes 60 to 90 days because directory moderation queues run weekly. The first AI Overview citation usually lands in the second month, and stable citation share across three to five practice-area queries lands in the third month. Patience matters because legal queries have higher trust thresholds than retail or hospitality queries.',
    },
  ],
  relatedSlugs: ['nap-consistency-audit-quebec', 'aeo-geo-eeat-explained-for-local-owners'],
  headings: [
    { id: 'why-quebec-law-firms-need-a-different-playbook', text: 'Why Quebec law firms need a different SEO playbook' },
    { id: 'order-des-avocats-credential-and-attorney-schema', text: 'Order des avocats du Quebec credential and Attorney schema' },
    { id: 'bilingual-landing-pages-by-practice-area', text: 'Bilingual landing pages by practice area, EN and FR-CA' },
    { id: 'nap-consistency-across-legal-directories', text: 'NAP consistency across Avvo, Lawyer.com, Lexology, JuriBistro' },
    { id: 'ai-overviews-citation-patterns-for-legal-queries', text: 'AI Overviews citation patterns for legal queries in Quebec' },
    { id: 'faq-pages-that-answer-the-long-tail', text: 'FAQ pages that answer the long-tail family and immigration questions' },
    { id: 'a-90-day-rollout-for-quebec-law-firms', text: 'A 90 day rollout plan for a Quebec law firm' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        Family law and immigration law are the two highest-volume practice areas for AI Overviews in Quebec, and they are also the two where most firms are leaving citations on the table. The fix is not more content, it is structured trust signals that AI engines can verify in one pass. Order des avocats du Quebec credentials wired into Attorney schema, bilingual landing pages by practice area, NAP-consistent citations across Avvo, Lawyer.com, Lexology, and LegalDirectories.com, and FAQ pages that answer the questions clients actually type. This is the law firm seo Quebec playbook for 2026.
      </p>

      <StatHighlight
        stats={[
          { value: '55 / 45', label: 'FR / EN split for family law searches in Montreal' },
          { value: '5', label: 'Priority directories that move AI Overview citations' },
          { value: '60-90d', label: 'Window to citation share across practice-area queries' },
        ]}
      />

      <SectionDivider />

      <h2 id="why-quebec-law-firms-need-a-different-playbook">Why Quebec law firms need a different SEO playbook</h2>
      <p>
        Legal SEO advice written for the United States or Ontario does not transfer cleanly to Quebec. Three local factors change the calculus. The Order des avocats du Quebec is the only credentialing body, and AI engines have learned to trust the Barreau directory above generic listing sites. Quebec is a bilingual market where French queries outweigh English queries in family law, and the language split is not a translation problem but a separate ranking surface. Civil law differs from common law in vocabulary and procedure, so the long-tail questions clients type are different from the ones a Toronto firm targets.
      </p>
      <p>
        That regional reality means a Quebec firm needs to build credentialed Attorney schema, not just generic LocalBusiness schema. It means landing pages must exist in EN and FR-CA with parallel structure and hand-authored copy. It means citation work targets a Quebec-aware directory list, not a generic North American one. AI engines score authority through cross-source consistency, and the cross-source set in Quebec is tighter and more specific than the generic North American set most national agency playbooks assume.
      </p>
      <p>
        The good news is that the Quebec-specific signals are easier to ship than they look. The Barreau directory is free to maintain. Bilingual landing pages are mechanical work once the practice-area outline is set. The five priority directories cover the citation graph that most AI engines actually probe. The structured FAQ pages can be drafted in two sittings per practice area. The work is sequenced, not exotic.
      </p>

      <CalloutBox type="info">
        <p>The single largest lever we measure for Quebec law firm AI Overview citations is the Attorney schema with a verified Barreau membership number. Firms that surface the credential cleanly in JSON-LD on every lawyer bio page earn citations roughly twice as often as firms that bury the credential in a footer or skip it entirely. AI engines treat the credentialed schema as a trust verification path, not a vanity badge.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Want a free 24 hour audit of your firm's Attorney schema, bilingual coverage, and AI Overview citation share? Run the AiLys audit." />

      <SectionDivider />

      <h2 id="order-des-avocats-credential-and-attorney-schema">Order des avocats du Quebec credential and Attorney schema</h2>
      <p>
        Every lawyer in a Quebec firm has a Barreau membership number. That number is the trust anchor for AI engines. The fix is to wire the number into Attorney schema on every lawyer bio page, with the credential type set to ProfessionalService and the membership encoded as an Organization reference back to the Barreau du Quebec entity on Wikidata. Combined with LocalBusiness schema on the firm-level page, this gives Google, Perplexity, and Bing Copilot the structured trust signals they look for.
      </p>
      <p>
        The implementation is straightforward in JSON-LD. On a lawyer bio page, ship an Attorney schema block with name, image, jobTitle, alumniOf, and a memberOf array that references the Barreau du Quebec. On the firm-level page, ship a LocalBusiness or LegalService schema block with the firm's NAP, opening hours, areaServed, and a department array that references each lawyer. AI engines parse the relationships and score authority based on the cross-references, not the individual blocks alone.
      </p>

      <h3>The Attorney schema checklist</h3>
      <ul>
        <li>Lawyer bio pages ship Attorney or Person schema with Barreau membership encoded</li>
        <li>Firm page ships LegalService schema with NAP, hours, and areaServed</li>
        <li>Each lawyer bio cross-references the firm via worksFor and the firm cross-references each lawyer via department</li>
        <li>Practice-area pages ship Service schema with provider pointing back to the firm</li>
        <li>FAQ pages ship FAQPage schema with practice-area-specific question and answer pairs</li>
        <li>Breadcrumb schema on every page so AI engines can map the firm's information architecture</li>
      </ul>

      <CalloutBox type="tip">
        <p>If you inherit a firm website without any schema, do not bolt on a generic LocalBusiness block and call it done. The Attorney schema with Barreau credential is the asymmetric move because most competing firms have not done it yet. Six hours of structured data work usually outranks six months of unstructured content production for AI Overview citations on legal queries.</p>
      </CalloutBox>

      <InternalLink
        to="/glossary/schema"
        title="Schema and structured data glossary"
        description="Plain definitions for Attorney, LegalService, FAQPage, and the rest of the schema vocabulary that AI engines parse."
      />

      <SectionDivider />

      <h2 id="bilingual-landing-pages-by-practice-area">Bilingual landing pages by practice area, EN and FR-CA</h2>
      <p>
        Family law in Montreal sees roughly 55 percent French queries to 45 percent English queries, with seasonal swings around the September school year and tax season. Immigration law sees the inverse with about 45 percent French and 55 percent English, weighted by the source country of the immigrant population. The implication is the same for both: every practice-area landing page needs an FR-CA twin with parallel structure and hand-authored copy.
      </p>
      <p>
        The pillar pages should cover the practice areas the firm actually litigates: divorce, child custody, alimony, common-law separation, marriage contracts for family. Permanent residence, sponsorship, refugee claims, work permits, study permits for immigration. Each pillar should have a 1,500 to 2,500 word page in EN and a parallel FR-CA page with the same heading structure, the same internal links, and hand-authored Quebec French. The pages should not be machine translations because AI engines detect translation artifacts and downweight the source.
      </p>
      <p>
        Internal linking matters as much as the content. The English divorce pillar should link to the French divorce pillar via a hreflang tag and a visible language switcher. Each pillar should link to two or three FAQ pages on the same practice area. The lawyer bio pages should link to the practice areas each lawyer covers. This information architecture is what gives AI engines the citation graph they reward.
      </p>

      <QuickQuiz
        question="A Montreal family law firm publishes only English landing pages and earns a strong local pack ranking on EN queries. What is the largest blind spot in their AI Overview citation share?"
        options={[
          'Their pages are too long for Google to index',
          'They forfeit roughly half the FR-CA query volume to firms with bilingual coverage',
          'They need to add more lawyer photos to the bio pages',
          'They should pay for Google Ads to fix the gap',
        ]}
        correctIndex={1}
        explanation="Family law searches in Montreal split roughly 55 percent French to 45 percent English. A firm with EN-only landing pages cannot earn AI Overview citations on FR queries because the AI engine has nothing to cite. Bilingual landing pages with hand-authored Quebec French close the gap, and Google Ads does not substitute for organic FR coverage."
      />

      <SectionDivider />

      <h2 id="nap-consistency-across-legal-directories">NAP consistency across Avvo, Lawyer.com, Lexology, JuriBistro</h2>
      <p>
        AI engines cross-check business identity across multiple directories before citing a source. For Quebec law firms, the priority directory list is tight: Avvo for the broad legal graph, Lawyer.com for the international recognition, Lexology for the publishing trust signal, LegalDirectories.com for the citation density, and JuriBistro from CAIJ for the Quebec-specific authority. The Barreau du Quebec directory itself is the apex source. NAP must match exactly across all six surfaces.
      </p>
      <p>
        NAP failure modes are predictable. The phone number written as 514-555-1234 on the website but 514.555.1234 on Avvo and (514) 555-1234 on Lawyer.com reads as three different numbers to a brittle parser. The address written with "Suite 500" on one directory, "Bureau 500" on another, and "#500" on a third reads as three different locations. Audit the entire six-source list once, normalize to a single canonical form, then update every directory in the same week so the change propagates without conflicting versions.
      </p>

      <img
        src={meta.images.mid}
        alt="Diagram of the six-source citation graph for a Quebec law firm spanning Barreau, Avvo, Lawyer.com, Lexology, LegalDirectories.com, and JuriBistro"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <CalloutBox type="warning">
        <p>The silent killer for Quebec firms is the bilingual NAP variant. Some directories accept "Suite" and others want "Bureau" for accessibility in Quebec. If you let the directory auto-translate, you end up with mixed NAP that fails the cross-source check. Pick one canonical NAP per language, and apply the EN form on EN directories and the FR form on FR directories. Do not mix.</p>
      </CalloutBox>

      <InlineCTA variant="book" text="Want a 60 minute walk-through of the six-source citation audit on your firm? Book a strategy call, no pitch, you keep the doc." />

      <SectionDivider />

      <h2 id="ai-overviews-citation-patterns-for-legal-queries">AI Overviews citation patterns for legal queries in Quebec</h2>
      <p>
        Google AI Overviews on legal queries cite differently than retail queries. The trust threshold is higher, so AI Overviews tend to cite directories first (Barreau, Lexology, JuriBistro) and individual firm pages second. A firm earns the second-tier citation by being the most authoritative match on the directory side, not by writing the longest blog post. Perplexity behaves similarly with a slightly stronger lean on Wikipedia and government sources for procedural questions.
      </p>
      <p>
        The pattern for family law queries like "how do I file for divorce in Quebec" is consistent. The first cited source is usually the Quebec government Justice page. The second is often a Barreau or JuriBistro page. The third is a firm page that ranks because the firm has Attorney schema, bilingual coverage, and an FAQ page that answers the procedural question in plain language. Climb to the third citation slot and AI Overviews send referral traffic worth more than most paid placements.
      </p>
      <p>
        For immigration law, the pattern shifts toward Immigration, Refugees and Citizenship Canada (IRCC) for procedural answers, then law firm pages for the strategic and case-specific answers. A firm that publishes a clear page on "what is the difference between a study permit and a work permit in Quebec" can earn the AI Overview citation for that long-tail query in two to three months if the schema and bilingual coverage are clean.
      </p>

      <CalloutBox type="info">
        <p>AI Overviews update on a continuous basis but with a noticeable two to four week lag from when a page goes live to when it can earn a citation. Do not panic if a fresh page does not appear in the AI Overview citation set the same week. Wait one full month, then audit the schema and the bilingual coverage before assuming the page is the problem.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="faq-pages-that-answer-the-long-tail">FAQ pages that answer the long-tail family and immigration questions</h2>
      <p>
        AI engines cite FAQ pages disproportionately on legal queries because the question and answer format matches the way users phrase voice and chat queries. Build one FAQ page per practice area in EN, with a parallel FAQ page in FR-CA. Each page should answer 8 to 12 questions, each answer 60 to 120 words, in plain language without legalese. Ship FAQPage schema on each page and link from the practice-area pillar to the FAQ page and back.
      </p>
      <p>
        The questions should come from real client intake notes, not invented variations. Common family law questions include "how is alimony calculated in Quebec," "what is the cost of a divorce in Quebec," "how long does a divorce take," and "do I need a lawyer for an uncontested divorce." Common immigration questions include "what is the difference between Quebec selection and federal sponsorship," "how long does PR processing take in Quebec," and "what happens if my work permit expires before renewal." Real questions earn real citations.
      </p>
      <p>
        Update the FAQ pages quarterly. Procedural answers shift when the Quebec government publishes new guidelines or when IRCC updates immigration program rules. AI engines penalize stale procedural content because the cost of a wrong answer is higher in legal than in retail. A quarterly review cycle keeps the firm cited and prevents the slow erosion that happens when last year's answer becomes this year's misinformation.
      </p>

      <InternalLink
        to="/blog/aeo-geo-eeat-explained-for-local-owners"
        title="AEO, GEO, and E-E-A-T explained for local owners"
        description="The plain language version of the trust signals AI engines use to decide which sources to cite."
      />

      <SectionDivider />

      <h2 id="a-90-day-rollout-for-quebec-law-firms">A 90 day rollout plan for a Quebec law firm</h2>
      <p>
        Day 1 to 14, audit the schema. Implement Attorney schema with Barreau credential on every lawyer bio page. Implement LegalService schema on the firm page with NAP, hours, areaServed, and a department reference for each lawyer. Implement FAQPage schema on existing FAQ pages or create one stub per practice area. Day 15 to 45, build or rebuild the bilingual practice-area pillars. One pillar per practice area in EN and a parallel FR-CA twin, hand-authored, 1,500 to 2,500 words each, with internal links and hreflang tags.
      </p>
      <p>
        Day 46 to 75, run the citation audit across the six priority directories. Normalize NAP to one canonical EN form and one canonical FR form. Update Avvo, Lawyer.com, Lexology, LegalDirectories.com, JuriBistro, and the Barreau directory in the same week. Track every change in a sheet so the next audit can confirm the change held. Day 76 to 90, ship one FAQ page per practice area that answers 8 to 12 real client questions, in EN and FR-CA, with FAQPage schema and internal links from the pillar.
      </p>
      <p>
        Most Quebec firms that follow this plan see the first AI Overview citation in the second month and stable citation share across three to five practice-area queries by the end of the third month. The bar is lower than firms expect because most competitors have not done the structured trust work. See the <InternalLink to="/industries" title="industry playbooks for legal firms" /> page for the family-law and immigration-law specific versions of this plan, or run the free <InternalLink to="/audit" title="AI Visibility Audit" /> to see which signals are leaking right now.
      </p>

      <InlineCTA variant="pricing" text="Need a managed program that ships the Attorney schema, the bilingual pillars, the citation cleanup, and the FAQ build? See AiLys plans for legal firms." />

      <SectionDivider />

      <KeyTakeaway
        points={[
          'Order des avocats du Quebec credential wired into Attorney schema is the asymmetric AI Overview lever.',
          'Bilingual landing pages with hand-authored EN and FR-CA close the family law and immigration coverage gap.',
          'NAP consistency across Avvo, Lawyer.com, Lexology, LegalDirectories.com, and JuriBistro feeds the citation graph.',
          'FAQ pages with FAQPage schema earn disproportionate AI Overview citations on legal procedural queries.',
          'Quebec firms that ship in this order typically earn AI Overview citations on three to five practice-area queries inside one quarter.',
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
        alt="Quebec law firm partner reviewing the AI Overview citation report alongside the Barreau credential and bilingual landing page audit"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
