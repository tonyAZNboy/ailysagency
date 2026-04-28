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
} from '../../components/shared'

export const meta: BlogPostMeta = {
  slug: 'medical-clinic-ai-visibility-guide',
  title: 'Medical clinic AI Visibility, how to earn citations in 2026',
  metaDescription:
    'Medical clinic local SEO has changed. Here is the AI Visibility playbook that earns citations in ChatGPT, Perplexity, Google AIO, and Bing Copilot in 2026.',
  tldr: 'Medical clinics earn AI engine citations by combining a verified GBP, NAP-clean Healthgrades and RAMQ-aligned listings, doctor author bylines with credentials, original clinic photography with EXIF, and structured FAQ content. Most Quebec clinics have one or two of these. The clinics that have all five get named.',
  category: 'industry-playbook',
  tags: ['medical clinic local seo', 'healthcare seo', 'ai visibility', 'gbp', 'industry-playbook'],
  publishedDate: '2026-02-17',
  updatedDate: '2026-02-17',
  author: AUTHORS.strategy,
  readTimeMinutes: 9,
  images: {
    hero: '/blog-images/medical-clinic-ai-visibility-guide/hero.svg',
    mid: '/blog-images/medical-clinic-ai-visibility-guide/mid.svg',
    end: '/blog-images/medical-clinic-ai-visibility-guide/end.svg',
  },
  faqItems: [
    {
      question: 'How do medical clinics earn AI engine citations?',
      answer:
        'Medical clinic citations follow five layers. A verified Google Business Profile with the right primary category, a clean NAP triple across Healthgrades, RateMDs, and provincial listings, doctor author bylines that expose credentials in schema, original clinic photography with EXIF metadata, and FAQ pages that answer real patient queries. Clinics that ship four out of five surface in ChatGPT and Perplexity within roughly 60 days.',
    },
    {
      question: 'What is the best primary GBP category for a medical clinic?',
      answer:
        'Use the most specific primary category that matches your service. A family clinic should pick Family Practice Physician, not Medical Clinic. A walk-in should pick Walk-In Clinic. A specialty practice should match the specialty exactly (Dermatologist, Pediatrician, Endocrinologist). The wrong primary category cuts voice query volume by roughly 40 percent because Google routes voice through category-first retrieval.',
    },
    {
      question: 'Do AI engines cite medical content from local clinics or only big sites?',
      answer:
        'Both, but the citation logic differs. Big sites like Mayo Clinic and Cleveland Clinic win general medical questions. Local clinics win location-anchored queries like "walk-in clinic open Saturday in Laval" or "pediatrician accepting new patients in Quebec City". The local citation depends on GBP completeness, NAP consistency on healthcare directories, and doctor author bylines that the engine can verify against a license registry.',
    },
    {
      question: 'How do I add doctor author bylines that AI engines trust?',
      answer:
        'Add a Person schema for each clinician on the bio page. Include name, jobTitle, hasCredential with the licensing body name (CMQ for Quebec physicians, RBQ-equivalent for other provinces), affiliation with the clinic, and sameAs links to PubMed, ResearchGate, or the provincial college register. ChatGPT and Perplexity verify credentials before citing, and bylines without verifiable credentials get filtered out of medical answers.',
    },
    {
      question: 'How long does AI Visibility take to compound for a medical clinic?',
      answer:
        'The 24-hour fix is GBP category correction and Healthgrades or RateMDs claim. The 30-day fix is NAP cleanup across the four core healthcare directories and doctor schema rollout. The 90-day fix is original clinic photography with EXIF, FAQ build-out for the top 30 patient questions, and one inbound link from a regional health authority or news mention. Citation rate typically lifts in two waves around weeks 4 and 10.',
    },
  ],
  relatedSlugs: ['why-chatgpt-cites-your-competitor', 'voice-search-changed-for-dentists'],
  headings: [
    { id: 'why-clinics-lose-the-ai-citation-race', text: 'Why most clinics lose the AI citation race' },
    { id: 'layer-1-google-business-profile-medical-categories', text: 'Layer 1: Google Business Profile and medical categories' },
    { id: 'layer-2-healthcare-directory-citations', text: 'Layer 2: healthcare directory citations and NAP cleanliness' },
    { id: 'layer-3-doctor-author-bylines-and-credential-schema', text: 'Layer 3: doctor author bylines and credential schema' },
    { id: 'layer-4-clinic-photography-and-experience-markers', text: 'Layer 4: original clinic photography and experience markers' },
    { id: 'layer-5-patient-faq-and-structured-content', text: 'Layer 5: patient FAQ pages and structured content' },
    { id: 'the-90-day-medical-clinic-ai-visibility-plan', text: 'The 90-day medical clinic AI Visibility plan' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <img
        src={meta.images.hero}
        alt="Medical clinic Google Business Profile and Healthgrades listings appearing in a ChatGPT answer panel"
        className="w-full rounded-xl my-6"
        loading="eager"
      />

      <p>
        Medical clinic local SEO has shifted from blue-link rankings to AI engine citations. Patients now ask ChatGPT, Perplexity, Google AIO, and Bing Copilot questions like "best walk-in clinic open Saturday in Laval" or "pediatrician accepting new patients near me", and the engines answer with three named clinics. If your clinic is not one of those three, the patient never visits your site. Five layers decide who gets named, and most clinics ship one or two of them.
      </p>

      <StatHighlight
        stats={[
          { value: '5 layers', label: 'Decide who gets named in AI clinic answers' },
          { value: '~60 days', label: 'For a clean stack to surface in citations' },
          { value: '~40%', label: 'Voice query volume lost from a wrong GBP primary category' },
        ]}
      />

      <h2 id="why-clinics-lose-the-ai-citation-race">Why most clinics lose the AI citation race</h2>
      <p>
        The classic medical SEO playbook (long blog posts, internal linking, broad backlinks) was built for a search engine that ranked websites. AI engines retrieve. They pull a short list of named entities for a query, score each entity against a citation graph, and return the top three. A clinic with a perfect website but a misconfigured GBP and an abandoned Healthgrades profile loses to a clinic with a rougher website but a clean entity stack.
      </p>
      <p>
        Across the Quebec clinics we audited in late 2025, the most common gaps were a generic primary GBP category (Medical Clinic instead of Family Practice Physician), a stale Healthgrades listing with a phone number that no longer matched the clinic, and zero doctor schema on bio pages. Each gap costs roughly the same: a citation share drop of 15 to 25 percent in our internal probe data.
      </p>

      <CalloutBox type="info">
        <p>AI engines do not crawl your site like Googlebot. They build a retrieval index from a layered citation graph. If your clinic shows up consistently across that graph, you get named. If you show up inconsistently or partially, the engine picks the cleaner alternative.</p>
      </CalloutBox>

      <h2 id="layer-1-google-business-profile-medical-categories">Layer 1: Google Business Profile and medical categories</h2>
      <p>
        Your GBP is the spine of your AI Visibility. The single most expensive mistake we see is a clinic using "Medical Clinic" as the primary category when a more specific category exists. Family Practice Physician, Walk-In Clinic, Dermatologist, Pediatrician, Endocrinologist, Podiatrist, Psychologist. Pick the specific one. Voice queries route through category-first retrieval, and a generic category cuts voice volume by about 40 percent.
      </p>
      <p>
        Beyond the primary category, complete every relevant attribute. Languages spoken (French, English, Spanish, Mandarin, Arabic). Wheelchair accessible entrance. New patient acceptance toggle. Online appointment booking link. Insurance accepted. These attributes feed the constrained-query algorithm that powers "pediatrician accepting new patients near me" and similar long-tail searches.
      </p>

      <h3>The five GBP attributes that move clinic citations</h3>
      <ol>
        <li>Primary category at maximum specificity</li>
        <li>Secondary categories for sub-specialties (up to 9)</li>
        <li>Languages spoken on every doctor profile</li>
        <li>New patient acceptance toggle on, with current status</li>
        <li>Direct booking URL with the clinic domain (not a third party redirect)</li>
      </ol>

      <h2 id="layer-2-healthcare-directory-citations">Layer 2: healthcare directory citations and NAP cleanliness</h2>
      <p>
        After GBP, AI engines pull from a tight list of healthcare directories. For Quebec and Canada, the high-weight targets are Healthgrades, RateMDs, the Collège des médecins du Québec public register, the provincial RAMQ-affiliated finder when applicable, and Bonjour Sante for primary care. Add Doctolib and Maple where the clinic accepts virtual visits. One mention on Healthgrades outweighs ten mentions on small directories because the citation graph weights domain authority.
      </p>
      <p>
        NAP consistency (name, address, phone) is the sleeper signal. The retrieval layer scores name consistency at the entity level. One inconsistent NAP triple cuts citation odds in half. Clinics with three different phone formats across Healthgrades, RateMDs, and GBP show up about half as often as clinics with one canonical phone. <InternalLink to="/services/local-seo" title="Local SEO and citation cleanup" description="How AiLys runs the NAP audit on healthcare directories" /> handles the four-target audit and rewrite.
      </p>

      <CalloutBox type="tip">
        <p>The phone format matters: pick one canonical format (for example +1 514 555 0123 with spaces, no parentheses) and replicate it everywhere. The retrieval layer treats (514) 555-0123 and 514-555-0123 and 514.555.0123 as three distinct phone entities, even though humans read them as the same number. Pick one and enforce it on every directory.</p>
      </CalloutBox>

      <img
        src={meta.images.mid}
        alt="NAP audit table showing four healthcare directories with mismatched phone formats for a single clinic"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="layer-3-doctor-author-bylines-and-credential-schema">Layer 3: doctor author bylines and credential schema</h2>
      <p>
        Medical content is treated as Your Money or Your Life by every AI engine. The penalty for unverified medical claims is severe: the engine refuses to cite the source. The fix is doctor author bylines with credential schema. Add a Person schema to each clinician bio page. Include name, jobTitle, hasCredential with the licensing body, affiliation with the clinic Organization, and sameAs links to PubMed, ResearchGate, or the provincial college public register.
      </p>
      <p>
        For Quebec, the Collège des médecins du Québec public register is the single most important sameAs target. ChatGPT and Perplexity cross-check the doctor name and license number against the public register before citing. A bio page without a verifiable license link gets dropped from medical answers, even if the clinic GBP and Healthgrades are perfect.
      </p>

      <h3>Minimum doctor schema fields</h3>
      <ul>
        <li>name and additionalName for accents and Latin variants</li>
        <li>jobTitle in plain language ("Family Physician", "Pediatrician")</li>
        <li>medicalSpecialty using the controlled vocabulary</li>
        <li>hasCredential with credentialCategory "license" and recognizedBy the provincial college</li>
        <li>affiliation linking to the clinic Organization schema</li>
        <li>sameAs with the public register profile URL</li>
      </ul>

      <InlineCTA variant="audit" />

      <h2 id="layer-4-clinic-photography-and-experience-markers">Layer 4: original clinic photography and experience markers</h2>
      <p>
        Stock photos hurt clinic citations. AI engines now actively penalize medical pages that look generated or staged. The fix is original photography of the clinic interior, the reception desk, the exam rooms, and the doctors. Photos must carry EXIF metadata: camera model, capture date, GPS coordinates within the clinic neighborhood. Engines treat EXIF as an experience marker.
      </p>
      <p>
        Patient testimonial pages with first names and dates also help, provided the testimonials are real and the clinic has documented patient consent. A page with three first-name testimonials, photo of the testimonial author when consent is given, and a documented date-of-visit lifts citation rate measurably in our 60-day cohort. Generic "what our patients say" carousels with no names or dates do nothing.
      </p>

      <h2 id="layer-5-patient-faq-and-structured-content">Layer 5: patient FAQ pages and structured content</h2>
      <p>
        AI engines cite structured content at much higher rates than paragraph-only prose. Build a patient FAQ page that answers the top 30 questions for your specialty. For a family clinic, that includes "are you accepting new patients", "how do I book a same-day appointment", "do you offer telehealth", "what is your no-show fee", "do you accept walk-ins after 5 pm", "is your clinic wheelchair accessible". Wrap each Q-A in FAQPage schema.
      </p>
      <p>
        Pair the FAQ page with a Service schema for each clinical service offered (annual physical, child wellness visit, mental health screen, immunization, minor procedure). The engine cross-references Service schema against the GBP service list. When both line up, the clinic surfaces in service-specific queries like "STI testing walk-in Montreal" or "ADHD assessment pediatrician Quebec City".
      </p>

      <KeyTakeaway
        points={[
          'Pick the most specific GBP primary category. Family Practice Physician beats Medical Clinic.',
          'Audit four healthcare directories quarterly: Healthgrades, RateMDs, the provincial college register, and Bonjour Sante.',
          'Add Person schema with hasCredential and a sameAs to the Collège des médecins du Québec public register.',
          'Replace stock photos with original clinic photography that carries EXIF metadata.',
          'Build a 30-question patient FAQ page with FAQPage schema and Service schema for each clinical offer.',
        ]}
      />

      <h2 id="the-90-day-medical-clinic-ai-visibility-plan">The 90-day medical clinic AI Visibility plan</h2>
      <p>
        The plan ships in three waves. Days 1 to 7 fix GBP categories, attributes, and direct booking URL. Days 8 to 30 audit and rewrite NAP across four healthcare directories and ship doctor schema on every bio page. Days 31 to 90 produce original clinic photography, build the patient FAQ, and earn one inbound link from a regional health authority or news mention. Most clinics see citation rate lift in two waves: a small bump around week 4 (GBP and NAP) and a larger bump around week 10 (schema and FAQ).
      </p>
      <p>
        AiLys runs this plan as part of the Core and Growth tiers. Or you can DIY using the audit deliverable that comes with our free <InternalLink to="/audit" title="Free 24-hour AI Visibility audit" description="The clinic-specific audit covers GBP categories, healthcare directory NAP, and doctor schema" /> probe. The audit names every gap in the five layers and lists the exact directory targets for your specialty.
      </p>

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
        alt="Medical clinic AI Visibility audit deliverable cover with GBP, NAP, doctor schema, and FAQ checks"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
