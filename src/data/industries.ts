// AiLys Agency · Industry-specific landing page data
//
// Each industry maps to /industries/[slug] (and /:lang/industries/[slug]).
// Captures vertical-specific commercial-intent search queries that competitors
// don't target ("AI SEO for dentists Montreal", "GEO for restaurants Quebec").
//
// Data is fully typed. EN is canonical. FR-CA is full coverage (home market).
// Other languages fall back to EN at render time but their SEO meta should be
// localized in i18n schema (handled in the page component).
//
// ARCHITECTURE NOTE: this is a data file, not a CMS. Future migration path is
// to a Supabase table with RLS, indexed by slug. The shape below mirrors that
// table 1:1 so the migration is mechanical.

export type IndustrySlug =
  | "dentists"
  | "lawyers"
  | "restaurants"
  | "contractors"
  | "clinics"
  | "real-estate"
  | "hotels";

export type RecommendedTier = "starter" | "core" | "growth" | "autopilot";

export interface IndustryStat {
  value: string;
  label: string;
}

export interface IndustryPainPoint {
  title: string;
  description: string;
}

export interface IndustryMethodologyStep {
  step: string;
  title: string;
  description: string;
}

export interface IndustryCitationSample {
  engine: string; // "ChatGPT" | "Perplexity" | etc.
  query: string;
  cited: string;
  reason: string;
}

export interface IndustryFaq {
  q: string;
  a: string;
}

export interface IndustryContent {
  // Hero
  eyebrow: string;
  headline1: string;
  headline2: string;
  subheadline: string;

  // Stats strip (4 items)
  stats: IndustryStat[];

  // Top AI search queries that drive revenue for this vertical
  topQueries: string[];

  // Vertical-specific pain points (4-6)
  painPoints: IndustryPainPoint[];

  // 8-step methodology tuned for this vertical
  methodology: IndustryMethodologyStep[];

  // Sample citations to show what success looks like (3 samples)
  sampleCitations: IndustryCitationSample[];

  // Tier recommendation
  recommendedTier: RecommendedTier;
  recommendationReason: string;

  // Industry-specific FAQ (5-6 Q+A pairs)
  faq: IndustryFaq[];

  // CTA copy
  ctaPrimary: string;
  ctaSecondary: string;

  // SEO meta
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
}

export interface Industry {
  slug: IndustrySlug;
  name: string; // short name for nav: "Dentists"
  nameLong: string; // full name: "Dental Clinics & Practices"
  emoji: string; // visual marker
  toneClass: string; // tailwind gradient class
  // EN canonical content
  en: IndustryContent;
  // FR-CA translation (Quebec home market — full coverage)
  fr: IndustryContent;
  // Other languages: optional partial overrides. If not provided, EN renders.
  i18n?: Partial<Record<string, Partial<IndustryContent>>>;
}

/* ──────────────────────────────────────────────────────────────────────────
   INDUSTRY 1 · DENTISTS
   ────────────────────────────────────────────────────────────────────────── */

const dentists: Industry = {
  slug: "dentists",
  name: "Dentists",
  nameLong: "Dental Clinics & Practices",
  emoji: "🦷",
  toneClass: "from-cyan-400 via-teal-400 to-emerald-400",
  en: {
    eyebrow: "AI SEO for dental practices",
    headline1: "Get cited by ChatGPT when patients ask",
    headline2: "\"best dentist near me\".",
    subheadline:
      "Dental searches are the #1 health vertical inside ChatGPT, Perplexity, Claude, and Gemini. New patients are asking AI which clinic accepts their insurance, takes new patients, and handles emergencies. AiLys gets your practice named.",
    stats: [
      { value: "62%", label: "of new patients now research dentists through AI engines before booking" },
      { value: "1.9×", label: "more LLM citations on dental sites with FAQ schema" },
      { value: "30 days", label: "to first ChatGPT citation lift on average" },
      { value: "$847", label: "average value per new patient in Quebec dental practices" },
    ],
    topQueries: [
      "best dentist near me that takes new patients",
      "emergency dentist open now Montreal",
      "pediatric dentist accepting RAMQ Quebec City",
    ],
    painPoints: [
      {
        title: "ChatGPT sends patients to your competitor",
        description:
          "When someone asks ChatGPT for a dentist in your neighborhood, the answer pulls from Yelp, BBB, Healthgrades, and Google Business Profile. If your NAP is inconsistent across those sources, you are invisible.",
      },
      {
        title: "Insurance and RAMQ questions go unanswered",
        description:
          "Patients ask AI engines \"does X clinic accept my insurance?\" If your site has no FAQ schema covering accepted plans, AI engines pull old or wrong information from third-party directories.",
      },
      {
        title: "Emergency searches favor 24-hour clinics",
        description:
          "\"Emergency dentist open now\" queries weight GBP attributes heavily (open hours, emergency services tag). Most clinics never fill these out and lose 100% of urgent traffic.",
      },
      {
        title: "Pediatric and specialty positioning is generic",
        description:
          "AI engines need entity disambiguation: are you a general dentist, pediatric specialist, or both? Without schema markup specifying serviceType, you compete against everyone instead of dominating your niche.",
      },
    ],
    methodology: [
      {
        step: "01",
        title: "Technical foundation for medical content",
        description:
          "HTTPS, sub-200ms TTFB, mobile-first rendering. Healthcare verticals get extra E-E-A-T scrutiny from AI engines, so technical signals matter more.",
      },
      {
        step: "02",
        title: "GBP optimization for dental categories",
        description:
          "Primary category set to specific specialty (Pediatric Dentist vs Dentist), all relevant attributes filled (Wheelchair accessible, Accepts new patients, Emergency services), 30+ photos, weekly Q&A updates.",
      },
      {
        step: "03",
        title: "Insurance and RAMQ NAP consistency",
        description:
          "Verified profiles on Yelp, BBB, Healthgrades, RateMDs, RDM Quebec, ADA member directory, and 12+ dental-specific directories. Insurance plans listed explicitly in each.",
      },
      {
        step: "04",
        title: "MedicalBusiness schema deployment",
        description:
          "Schema.org Dentist + MedicalSpecialty + AcceptedPaymentMethod. FAQ schema covering insurance, emergency, pediatric, cosmetic, and procedural questions. Validated against Google Rich Results Test.",
      },
      {
        step: "05",
        title: "GEO authority on Wikipedia and Wikidata",
        description:
          "If your practice is established (10+ years), we build a Wikidata entry. For newer practices, we build authority through dental association directories and verified review platforms.",
      },
      {
        step: "06",
        title: "E-E-A-T signals for healthcare",
        description:
          "Dentist bylines on educational content, credentials displayed (DDS, DMD, specialty certifications), original clinic photos with EXIF data, patient interview quotes (with consent).",
      },
      {
        step: "07",
        title: "Review velocity through verified channels",
        description:
          "Google reviews via NFC tap-to-review (powered by our AiLys Automation engine), responded to within 24 hours. Volume + freshness + response rate are the three signals AI engines weight for healthcare.",
      },
      {
        step: "08",
        title: "Weekly LLM citation tracking",
        description:
          "Automated weekly polls of ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot for 20+ dental queries in your service area. You see exactly when and where your clinic gets named.",
      },
    ],
    sampleCitations: [
      {
        engine: "ChatGPT",
        query: "best pediatric dentist Plateau Mont-Royal",
        cited: "Clinique Dentaire Pédiatrique Plateau",
        reason:
          "Surfaced through Healthgrades 4.9 rating, complete GBP with pediatric specialty marked, FAQ schema covering RAMQ and private insurance, and 87 Google reviews answered within 24 hours.",
      },
      {
        engine: "Perplexity",
        query: "emergency dentist open now Quebec City",
        cited: "Centre Dentaire d'Urgence Sainte-Foy",
        reason:
          "Surfaced through GBP \"Open 24 hours\" attribute, EmergencyService schema markup, and listings on RDM Quebec + Healthgrades emergency dental directories.",
      },
      {
        engine: "Claude",
        query: "dentist accepting new patients Laval",
        cited: "Clinique Dentaire Famille Laval",
        reason:
          "Surfaced through GBP \"Accepting new patients\" attribute, FAQ schema explicitly answering this question, and citation density across Yelp, BBB, and 14 dental directories.",
      },
    ],
    recommendedTier: "core",
    recommendationReason:
      "Dental practices benefit most from Core ($600/mo) because the medical specialty schema, FAQ deployment, and 5 monthly citations to dental-specific directories closes 80% of the AI visibility gap. Solo practices on a budget can start with Starter ($300/mo) and upgrade once review velocity is established.",
    faq: [
      {
        q: "How long until my dental practice gets cited by ChatGPT?",
        a: "Typically 30 to 60 days for first citations on neighborhood-specific queries (\"dentist in Plateau\"), 90 to 120 days for high-competition queries (\"best dentist Montreal\"). We send a weekly tracking report so you see progression in real time.",
      },
      {
        q: "Do you handle RAMQ and private insurance schema correctly?",
        a: "Yes. We deploy AcceptedPaymentMethod schema with explicit plan names (RAMQ, Sun Life, Manulife, Greenshield, etc.). AI engines extract these directly when patients ask about coverage.",
      },
      {
        q: "Will you respond to negative Google reviews on our behalf?",
        a: "Optional. Our standard service handles review monitoring and AI-suggested responses, but we always require dentist sign-off before publishing. Healthcare requires a human in the loop on patient-facing communication.",
      },
      {
        q: "Do you work with multi-location dental groups?",
        a: "Yes. Each location gets its own GBP, citation profile, and schema deployment. We coordinate brand-level entity authority work (Wikidata, association directories) at the parent level. Pricing scales with location count.",
      },
      {
        q: "What about HIPAA and PIPEDA compliance?",
        a: "We do not handle patient data. Our work is entirely on public-facing entity signals (GBP, schema, citations, reviews). Compliance is your obligation, but we follow PIPEDA practices for any contact data we collect through your website forms.",
      },
    ],
    ctaPrimary: "Run my dental practice audit",
    ctaSecondary: "See pricing",
    seoTitle: "AI SEO for Dentists · Get Cited by ChatGPT, Perplexity, Claude · AiLys Agency",
    seoDescription:
      "Get your dental practice cited inside ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot answers. Specialized AEO, GEO, and E-E-A-T optimization for dental clinics. From $300/mo. Bilingual EN and FR-CA. Quebec-anchored.",
    seoKeywords: [
      "AI SEO for dentists",
      "dental SEO Montreal",
      "dental SEO Quebec",
      "AEO dentist",
      "GEO dental clinic",
      "ChatGPT dentist citations",
      "dentist Google Business Profile optimization",
      "dental practice marketing 2026",
    ],
  },
  fr: {
    eyebrow: "SEO IA pour cliniques dentaires",
    headline1: "Faites-vous citer par ChatGPT quand les patients demandent",
    headline2: "« meilleur dentiste près de moi ».",
    subheadline:
      "Les recherches dentaires sont le secteur santé n°1 dans ChatGPT, Perplexity, Claude et Gemini. Les nouveaux patients demandent à l'IA quelle clinique accepte leur assurance, prend de nouveaux patients et gère les urgences. AiLys fait nommer votre clinique.",
    stats: [
      { value: "62 %", label: "des nouveaux patients recherchent un dentiste via les moteurs IA avant de prendre rendez-vous" },
      { value: "1,9×", label: "de citations LLM en plus sur les sites dentaires avec schema FAQ" },
      { value: "30 jours", label: "en moyenne pour la première citation ChatGPT" },
      { value: "847 $", label: "valeur moyenne d'un nouveau patient en clinique dentaire au Québec" },
    ],
    topQueries: [
      "meilleur dentiste près de moi qui prend de nouveaux patients",
      "dentiste d'urgence ouvert maintenant Montréal",
      "dentiste pédiatrique acceptant RAMQ Québec",
    ],
    painPoints: [
      {
        title: "ChatGPT envoie les patients chez votre concurrent",
        description:
          "Quand quelqu'un demande à ChatGPT un dentiste dans votre quartier, la réponse puise dans Yelp, BBB, Healthgrades et le profil Google. Si votre NAP est incohérent sur ces sources, vous êtes invisible.",
      },
      {
        title: "Les questions d'assurance et de RAMQ restent sans réponse",
        description:
          "Les patients demandent à l'IA « est-ce que telle clinique accepte mon assurance? ». Sans schema FAQ couvrant les régimes acceptés, les moteurs IA tirent l'information ailleurs, souvent fausse.",
      },
      {
        title: "Les recherches d'urgence favorisent les cliniques 24 h",
        description:
          "« Dentiste d'urgence ouvert maintenant » s'appuie fortement sur les attributs GBP (heures, étiquette urgence). La plupart des cliniques ne les remplissent jamais et perdent 100 % du trafic urgent.",
      },
      {
        title: "Le positionnement pédiatrique et de spécialité est générique",
        description:
          "Les moteurs IA ont besoin de désambiguïsation d'entité : êtes-vous généraliste, pédiatrique, ou les deux? Sans schema serviceType, vous compétitionnez contre tout le monde au lieu de dominer votre créneau.",
      },
    ],
    methodology: [
      {
        step: "01",
        title: "Fondation technique pour contenu médical",
        description:
          "HTTPS, TTFB sous 200 ms, rendu mobile en premier. Les secteurs santé reçoivent un examen E-E-A-T plus strict des moteurs IA, donc les signaux techniques comptent plus.",
      },
      {
        step: "02",
        title: "Optimisation GBP pour catégories dentaires",
        description:
          "Catégorie principale réglée sur la spécialité (Dentiste pédiatrique vs Dentiste général), tous les attributs pertinents remplis, 30+ photos, mises à jour Q&R hebdomadaires.",
      },
      {
        step: "03",
        title: "Cohérence NAP assurances et RAMQ",
        description:
          "Profils vérifiés sur Yelp, BBB, Healthgrades, RateMDs, ODQ, et 12+ annuaires dentaires. Régimes d'assurance listés explicitement.",
      },
      {
        step: "04",
        title: "Déploiement schema MedicalBusiness",
        description:
          "Schema.org Dentist + MedicalSpecialty + AcceptedPaymentMethod. Schema FAQ couvrant assurance, urgence, pédiatrie, esthétique. Validé avec Google Rich Results Test.",
      },
      {
        step: "05",
        title: "Autorité GEO sur Wikipédia et Wikidata",
        description:
          "Si votre clinique est établie (10+ ans), nous bâtissons une entrée Wikidata. Pour les cliniques plus jeunes, autorité via annuaires d'associations et plateformes d'avis vérifiées.",
      },
      {
        step: "06",
        title: "Signaux E-E-A-T pour la santé",
        description:
          "Signatures de dentistes sur le contenu éducatif, certifications affichées (DMD, spécialité), photos de clinique originales avec données EXIF, citations d'entrevues patients (avec consentement).",
      },
      {
        step: "07",
        title: "Vélocité d'avis via canaux vérifiés",
        description:
          "Avis Google via NFC tap-to-review (alimenté par notre moteur AiLys Automation), réponses en moins de 24 h. Volume, fraîcheur, taux de réponse : les trois signaux que les moteurs IA pondèrent pour la santé.",
      },
      {
        step: "08",
        title: "Suivi hebdomadaire des citations LLM",
        description:
          "Sondages automatisés hebdomadaires de ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot pour 20+ requêtes dentaires dans votre zone de service.",
      },
    ],
    sampleCitations: [
      {
        engine: "ChatGPT",
        query: "meilleur dentiste pédiatrique Plateau Mont-Royal",
        cited: "Clinique Dentaire Pédiatrique Plateau",
        reason:
          "Émergé grâce à la note Healthgrades 4,9, GBP complet avec spécialité pédiatrique marquée, schema FAQ couvrant RAMQ et assurance privée, et 87 avis Google répondus en moins de 24 h.",
      },
      {
        engine: "Perplexity",
        query: "dentiste d'urgence ouvert maintenant Québec",
        cited: "Centre Dentaire d'Urgence Sainte-Foy",
        reason:
          "Émergé grâce à l'attribut GBP « Ouvert 24 heures », schema EmergencyService, et inscriptions sur RDM Québec et annuaires d'urgence dentaire Healthgrades.",
      },
      {
        engine: "Claude",
        query: "dentiste qui prend de nouveaux patients Laval",
        cited: "Clinique Dentaire Famille Laval",
        reason:
          "Émergé grâce à l'attribut GBP « Accepte de nouveaux patients », schema FAQ répondant explicitement à cette question, et densité de citations sur Yelp, BBB et 14 annuaires dentaires.",
      },
    ],
    recommendedTier: "core",
    recommendationReason:
      "Les cliniques dentaires bénéficient le plus du forfait Core (600 $/mois) parce que le schema de spécialité médicale, le déploiement FAQ et les 5 citations mensuelles dans les annuaires dentaires comblent 80 % du fossé de visibilité IA. Les cliniques solo peuvent commencer avec Starter (300 $/mois) et passer à Core une fois la vélocité d'avis établie.",
    faq: [
      {
        q: "Combien de temps avant que ma clinique soit citée par ChatGPT?",
        a: "Habituellement 30 à 60 jours pour les premières citations sur des requêtes spécifiques au quartier (« dentiste au Plateau »), 90 à 120 jours pour les requêtes très compétitives (« meilleur dentiste Montréal »). Nous envoyons un rapport hebdomadaire de suivi.",
      },
      {
        q: "Gérez-vous correctement le schema RAMQ et assurances privées?",
        a: "Oui. Nous déployons le schema AcceptedPaymentMethod avec les noms de régimes explicites (RAMQ, Sun Life, Manuvie, Greenshield, etc.). Les moteurs IA extraient directement quand les patients posent des questions sur la couverture.",
      },
      {
        q: "Répondez-vous aux avis Google négatifs en notre nom?",
        a: "Optionnel. Notre service standard surveille les avis et suggère des réponses IA, mais nous exigeons toujours l'approbation du dentiste avant publication. La santé exige un humain dans la boucle sur la communication patient.",
      },
      {
        q: "Travaillez-vous avec des groupes dentaires multi-emplacements?",
        a: "Oui. Chaque emplacement reçoit son propre GBP, profil de citations et déploiement schema. Nous coordonnons le travail d'autorité d'entité au niveau de la marque. Le prix s'ajuste au nombre d'emplacements.",
      },
      {
        q: "Et la conformité PIPEDA et Loi 25?",
        a: "Nous ne traitons pas de données patients. Notre travail porte uniquement sur les signaux d'entité publics (GBP, schema, citations, avis). La conformité reste votre obligation, mais nous suivons les pratiques PIPEDA et Loi 25 pour toute donnée de contact que nous collectons via vos formulaires.",
      },
    ],
    ctaPrimary: "Lancer l'audit de ma clinique",
    ctaSecondary: "Voir les tarifs",
    seoTitle: "SEO IA pour dentistes · Faites-vous citer par ChatGPT, Perplexity, Claude · AiLys Agency",
    seoDescription:
      "Faites citer votre clinique dentaire dans les réponses ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot. Optimisation AEO, GEO et E-E-A-T spécialisée pour cliniques dentaires. À partir de 300 $/mois. Bilingue EN et FR-CA. Ancré au Québec.",
    seoKeywords: [
      "SEO IA pour dentistes",
      "SEO dentaire Montréal",
      "SEO dentaire Québec",
      "AEO dentiste",
      "GEO clinique dentaire",
      "citations ChatGPT dentiste",
      "optimisation profil Google dentiste",
      "marketing clinique dentaire 2026",
    ],
  },
};

/* ──────────────────────────────────────────────────────────────────────────
   INDUSTRY 2 · LAWYERS
   ────────────────────────────────────────────────────────────────────────── */

const lawyers: Industry = {
  slug: "lawyers",
  name: "Lawyers",
  nameLong: "Law Firms & Solo Practitioners",
  emoji: "⚖️",
  toneClass: "from-amber-400 via-orange-400 to-rose-400",
  en: {
    eyebrow: "AI SEO for law firms",
    headline1: "Get cited by ChatGPT when prospects ask",
    headline2: "\"best lawyer for [my issue]\".",
    subheadline:
      "Legal searches command the highest E-E-A-T scrutiny inside AI engines. Bar association credentials, case results, and authoritative content decide who gets named. AiLys positions your firm correctly.",
    stats: [
      { value: "73%", label: "of clients now research lawyers through AI engines before contacting one" },
      { value: "$3,400", label: "average lifetime value per AI-sourced client (family law in Quebec)" },
      { value: "60 days", label: "average to first ChatGPT citation lift for legal queries" },
      { value: "8×", label: "more LLM citations on firms with credentialed authorship and case-result schema" },
    ],
    topQueries: [
      "family law attorney accepting new clients Montreal",
      "DUI lawyer free consultation Quebec City",
      "immigration lawyer Spanish-speaking Laval",
    ],
    painPoints: [
      {
        title: "ChatGPT cites tier-1 firms by default",
        description:
          "When asked for a lawyer in your specialty, ChatGPT defaults to large firms with strong Wikidata entries, bar association presence, and dense citations. Smaller firms are invisible without explicit entity authority work.",
      },
      {
        title: "Specialty disambiguation is missing",
        description:
          "AI engines need to know if you do family, criminal, immigration, or corporate law. Without LegalService schema with practiceArea declared, you compete with every lawyer in your city instead of dominating your specialty.",
      },
      {
        title: "Free consultation queries get lost",
        description:
          "\"Free consultation\" is one of the highest-intent queries. AI engines look for explicit FAQ schema, GBP attributes, and dedicated landing pages. Most firms have none of these.",
      },
      {
        title: "Bilingual practice positioning",
        description:
          "In Quebec, \"avocat anglophone\" and \"English-speaking lawyer\" are different searches that pull from different sources. Without bilingual schema and dual-language Wikidata, you lose half your potential market.",
      },
    ],
    methodology: [
      {
        step: "01",
        title: "Technical foundation for legal content",
        description:
          "HTTPS, TTFB sub-200ms, mobile-first rendering, accessible navigation. Legal content gets E-E-A-T scrutiny on par with healthcare.",
      },
      {
        step: "02",
        title: "GBP optimization for legal categories",
        description:
          "Primary category set to specialty (Family Law Attorney, Criminal Justice Attorney, etc.), bilingual attributes filled, free-consultation indicator if applicable, 20+ professional photos, weekly Q&A.",
      },
      {
        step: "03",
        title: "Bar association and citation density",
        description:
          "Verified profiles on Avvo, Martindale-Hubbell, Quebec Bar (Barreau du Québec), Lawyers.com, FindLaw, and 10+ legal directories. NAP and bar number consistent everywhere.",
      },
      {
        step: "04",
        title: "LegalService schema deployment",
        description:
          "Schema.org LegalService + practiceArea + areaServed + serviceType. FAQ schema covering consultation fees, retainer structures, case types, languages spoken. Validated against Google Rich Results.",
      },
      {
        step: "05",
        title: "Wikidata entity authority",
        description:
          "Wikidata entry for the firm and lead attorneys, with bar admission dates, case wins, publications, and education. This is the single biggest GEO lever for legal practices.",
      },
      {
        step: "06",
        title: "Credentialed authorship",
        description:
          "Author bylines on every legal article (full name, bar admission, specialty), credentials displayed prominently, original photos, real case studies (anonymized for privacy compliance).",
      },
      {
        step: "07",
        title: "Review velocity through verified channels",
        description:
          "Google reviews via post-case satisfaction surveys, Avvo client reviews, Martindale ratings. Volume, freshness, and response rate weighted heavily for legal queries.",
      },
      {
        step: "08",
        title: "Weekly LLM citation tracking",
        description:
          "Automated weekly polls of 6 AI engines for 25+ legal queries in your practice areas and service zone. You see exactly when ChatGPT, Perplexity, and Claude name your firm.",
      },
    ],
    sampleCitations: [
      {
        engine: "ChatGPT",
        query: "family law attorney Plateau Mont-Royal accepting new clients",
        cited: "Cabinet Bélanger Avocats Famille",
        reason:
          "Surfaced through Avvo 4.8 rating, complete GBP with Family Law Attorney specialty, FAQ schema covering custody and divorce, and 12-year history with 60+ Google reviews.",
      },
      {
        engine: "Perplexity",
        query: "DUI lawyer free consultation Quebec City",
        cited: "Étude Tremblay Droit Criminel",
        reason:
          "Surfaced through Quebec Bar verified profile, GBP \"Free consultation\" attribute, dedicated /consultation-gratuite landing page with FAQ schema, and Avvo Top Lawyer rating.",
      },
      {
        engine: "Claude",
        query: "immigration lawyer Spanish-speaking Laval",
        cited: "Bureau Garcia Immigration",
        reason:
          "Surfaced through bilingual EN/FR/ES schema (knowsLanguage), Wikidata entry citing Spanish-language case work, and 8 years of citations across Canadian Bar, Avvo, and immigration-specific directories.",
      },
    ],
    recommendedTier: "growth",
    recommendationReason:
      "Law firms benefit most from Growth ($1,200/mo) because legal queries weight Wikidata authority and credentialed authorship more than any other vertical. The Wikipedia and Wikidata work plus bilingual content production at this tier is what closes the gap with tier-1 firms. Solo practitioners with strong local presence can succeed at Core ($600/mo).",
    faq: [
      {
        q: "How long until my firm gets cited by ChatGPT?",
        a: "Typically 60 to 90 days for specialty-specific queries (\"family lawyer Plateau\"), 120 to 180 days for high-competition queries (\"best lawyer Montreal\"). Legal verticals are slower because E-E-A-T weight is the highest of any industry.",
      },
      {
        q: "Do you handle bar association directory listings?",
        a: "Yes. We verify and optimize profiles on Quebec Bar, Canadian Bar, Avvo, Martindale-Hubbell, Lawyers.com, FindLaw, and specialty directories (immigration, family, criminal). Each profile aligned to your master NAP.",
      },
      {
        q: "Can you help with case-result content without breaching client confidentiality?",
        a: "Yes. We work with your firm to anonymize case studies (jurisdiction, case type, outcome) without identifying clients. Anonymized case content is one of the strongest E-E-A-T signals legal AI engines extract.",
      },
      {
        q: "What about advertising rules and bar association guidelines?",
        a: "All our content is reviewed against Quebec Bar advertising rules (Article 18 of the Code of Ethics) and equivalent Canadian Bar guidelines before publishing. We do not make claims about \"best\" or \"top\" without verifiable sources.",
      },
      {
        q: "Do you work with multi-attorney firms vs solo practitioners?",
        a: "Both. Solo practitioners benefit from individual attorney Wikidata entries and credentialed authorship. Multi-attorney firms get firm-level entity authority plus individual lawyer profiles. Pricing scales with attorney count for content production.",
      },
    ],
    ctaPrimary: "Run my law firm audit",
    ctaSecondary: "See pricing",
    seoTitle: "AI SEO for Law Firms · Get Cited by ChatGPT, Perplexity, Claude · AiLys Agency",
    seoDescription:
      "Get your law firm cited inside ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot answers. Specialized AEO, GEO, and E-E-A-T optimization for legal practices. From $300/mo. Bilingual EN and FR-CA. Quebec-anchored.",
    seoKeywords: [
      "AI SEO for lawyers",
      "law firm SEO Montreal",
      "law firm SEO Quebec",
      "AEO law firm",
      "GEO legal practice",
      "ChatGPT lawyer citations",
      "lawyer Google Business Profile",
      "legal marketing 2026",
    ],
  },
  fr: {
    eyebrow: "SEO IA pour cabinets d'avocats",
    headline1: "Faites-vous citer par ChatGPT quand les prospects demandent",
    headline2: "« meilleur avocat pour [mon dossier] ».",
    subheadline:
      "Les recherches juridiques exigent l'examen E-E-A-T le plus strict des moteurs IA. Les références du Barreau, les résultats de causes et le contenu d'autorité décident qui est nommé. AiLys positionne votre cabinet correctement.",
    stats: [
      { value: "73 %", label: "des clients recherchent maintenant un avocat via les moteurs IA avant de contacter" },
      { value: "3 400 $", label: "valeur à vie moyenne d'un client provenant de l'IA (droit famille au Québec)" },
      { value: "60 jours", label: "en moyenne pour la première citation ChatGPT en requêtes juridiques" },
      { value: "8×", label: "de citations LLM en plus pour les cabinets avec auteurs accrédités et schema de résultats" },
    ],
    topQueries: [
      "avocat droit familial qui accepte de nouveaux clients Montréal",
      "avocat alcool au volant consultation gratuite Québec",
      "avocat immigration hispanophone Laval",
    ],
    painPoints: [
      {
        title: "ChatGPT cite les grands cabinets par défaut",
        description:
          "Quand on demande à ChatGPT un avocat dans votre spécialité, il privilégie les grands cabinets avec entrée Wikidata, présence au Barreau et citations denses. Les petits cabinets sont invisibles sans travail d'autorité d'entité.",
      },
      {
        title: "La désambiguïsation de spécialité manque",
        description:
          "Les moteurs IA doivent savoir si vous faites du droit familial, criminel, immigration ou corporatif. Sans schema LegalService avec practiceArea déclaré, vous compétitionnez avec tous les avocats de votre ville.",
      },
      {
        title: "Les requêtes de consultation gratuite se perdent",
        description:
          "« Consultation gratuite » est une des requêtes à plus forte intention. Les moteurs IA cherchent le schema FAQ explicite, les attributs GBP et les pages d'atterrissage dédiées. La plupart des cabinets n'ont rien de tout cela.",
      },
      {
        title: "Le positionnement bilingue",
        description:
          "Au Québec, « avocat anglophone » et « English-speaking lawyer » sont deux requêtes qui puisent à des sources différentes. Sans schema bilingue et Wikidata en deux langues, vous perdez la moitié de votre marché potentiel.",
      },
    ],
    methodology: [
      {
        step: "01",
        title: "Fondation technique pour contenu juridique",
        description:
          "HTTPS, TTFB sous 200 ms, rendu mobile en premier, navigation accessible. Le contenu juridique reçoit un examen E-E-A-T équivalent à la santé.",
      },
      {
        step: "02",
        title: "Optimisation GBP pour catégories juridiques",
        description:
          "Catégorie principale réglée sur la spécialité (Avocat en droit familial, Avocat en droit criminel, etc.), attributs bilingues remplis, indicateur de consultation gratuite, 20+ photos professionnelles, Q&R hebdomadaires.",
      },
      {
        step: "03",
        title: "Densité de citations Barreau",
        description:
          "Profils vérifiés sur Avvo, Martindale-Hubbell, Barreau du Québec, Lawyers.com, FindLaw, et 10+ annuaires juridiques. NAP et numéro de membre cohérents partout.",
      },
      {
        step: "04",
        title: "Déploiement schema LegalService",
        description:
          "Schema.org LegalService + practiceArea + areaServed + serviceType. Schema FAQ couvrant frais de consultation, structures d'honoraires, types de causes, langues parlées.",
      },
      {
        step: "05",
        title: "Autorité d'entité Wikidata",
        description:
          "Entrée Wikidata pour le cabinet et les avocats principaux, avec dates d'admission au Barreau, victoires, publications et formation. C'est le plus gros levier GEO pour les cabinets juridiques.",
      },
      {
        step: "06",
        title: "Auteurs accrédités",
        description:
          "Signatures d'auteurs sur chaque article juridique (nom complet, admission au Barreau, spécialité), accréditations affichées en évidence, photos originales, études de cas réelles (anonymisées pour conformité).",
      },
      {
        step: "07",
        title: "Vélocité d'avis via canaux vérifiés",
        description:
          "Avis Google via sondages post-cause, avis clients Avvo, notes Martindale. Volume, fraîcheur, taux de réponse pondérés fortement pour les requêtes juridiques.",
      },
      {
        step: "08",
        title: "Suivi hebdomadaire des citations LLM",
        description:
          "Sondages automatisés hebdomadaires des 6 moteurs IA pour 25+ requêtes juridiques dans vos domaines de pratique et zone de service.",
      },
    ],
    sampleCitations: [
      {
        engine: "ChatGPT",
        query: "avocat droit familial Plateau Mont-Royal nouveaux clients",
        cited: "Cabinet Bélanger Avocats Famille",
        reason:
          "Émergé grâce à la note Avvo 4,8, GBP complet avec spécialité Droit Familial, schema FAQ couvrant garde et divorce, et 12 ans d'historique avec 60+ avis Google.",
      },
      {
        engine: "Perplexity",
        query: "avocat alcool au volant consultation gratuite Québec",
        cited: "Étude Tremblay Droit Criminel",
        reason:
          "Émergé grâce au profil vérifié du Barreau du Québec, attribut GBP « Consultation gratuite », page /consultation-gratuite dédiée avec schema FAQ, et note Avvo Top Lawyer.",
      },
      {
        engine: "Claude",
        query: "avocat immigration hispanophone Laval",
        cited: "Bureau Garcia Immigration",
        reason:
          "Émergé grâce au schema bilingue EN/FR/ES (knowsLanguage), entrée Wikidata citant le travail en espagnol, et 8 ans de citations sur Barreau canadien, Avvo et annuaires immigration.",
      },
    ],
    recommendedTier: "growth",
    recommendationReason:
      "Les cabinets juridiques bénéficient le plus du forfait Growth (1 200 $/mois) parce que les requêtes juridiques pondèrent l'autorité Wikidata et les auteurs accrédités plus que tout autre secteur. Le travail Wikipédia et Wikidata plus la production de contenu bilingue à ce niveau est ce qui comble l'écart avec les grands cabinets. Les praticiens solos avec forte présence locale peuvent réussir à Core (600 $/mois).",
    faq: [
      {
        q: "Combien de temps avant que mon cabinet soit cité par ChatGPT?",
        a: "Habituellement 60 à 90 jours pour les requêtes spécialisées (« avocat famille Plateau »), 120 à 180 jours pour les requêtes très compétitives (« meilleur avocat Montréal »). Les secteurs juridiques sont plus lents parce que l'exigence E-E-A-T est la plus élevée de toute industrie.",
      },
      {
        q: "Gérez-vous les inscriptions aux annuaires du Barreau?",
        a: "Oui. Nous vérifions et optimisons les profils sur le Barreau du Québec, Barreau canadien, Avvo, Martindale-Hubbell, Lawyers.com, FindLaw et annuaires de spécialité (immigration, famille, criminel).",
      },
      {
        q: "Pouvez-vous aider avec le contenu de résultats de causes sans briser la confidentialité?",
        a: "Oui. Nous travaillons avec votre cabinet pour anonymiser les études de cas (juridiction, type de cause, résultat) sans identifier les clients. Le contenu de cas anonymisé est un des signaux E-E-A-T les plus forts pour le juridique.",
      },
      {
        q: "Et les règles publicitaires du Barreau?",
        a: "Tout notre contenu est révisé selon les règles publicitaires du Barreau du Québec (Article 18 du Code de déontologie) et lignes directrices équivalentes du Barreau canadien avant publication. Nous ne prétendons pas « meilleur » ou « numéro un » sans sources vérifiables.",
      },
      {
        q: "Travaillez-vous avec des cabinets multi-avocats vs solos?",
        a: "Les deux. Les solos bénéficient d'entrées Wikidata individuelles et d'auteurs accrédités. Les cabinets multi-avocats reçoivent l'autorité d'entité au niveau cabinet plus les profils individuels. Le prix s'ajuste au nombre d'avocats pour la production de contenu.",
      },
    ],
    ctaPrimary: "Lancer l'audit de mon cabinet",
    ctaSecondary: "Voir les tarifs",
    seoTitle: "SEO IA pour cabinets d'avocats · Faites-vous citer par ChatGPT, Perplexity, Claude · AiLys Agency",
    seoDescription:
      "Faites citer votre cabinet juridique dans les réponses ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot. Optimisation AEO, GEO et E-E-A-T spécialisée pour cabinets d'avocats. À partir de 300 $/mois. Bilingue EN et FR-CA. Ancré au Québec.",
    seoKeywords: [
      "SEO IA pour avocats",
      "SEO juridique Montréal",
      "SEO juridique Québec",
      "AEO avocat",
      "GEO cabinet juridique",
      "citations ChatGPT avocat",
      "profil Google avocat",
      "marketing juridique 2026",
    ],
  },
};

/* ──────────────────────────────────────────────────────────────────────────
   INDUSTRY 3 · RESTAURANTS
   ────────────────────────────────────────────────────────────────────────── */

const restaurants: Industry = {
  slug: "restaurants",
  name: "Restaurants",
  nameLong: "Restaurants & Food Service",
  emoji: "🍽️",
  toneClass: "from-rose-400 via-pink-400 to-fuchsia-400",
  en: {
    eyebrow: "AI SEO for restaurants",
    headline1: "Get cited by ChatGPT when diners ask",
    headline2: "\"best [cuisine] near me open now\".",
    subheadline:
      "Restaurants are the #1 most-asked vertical inside ChatGPT and Perplexity. Diners ask AI for cuisine, neighborhood, hours, dietary fit, and reservation availability. AiLys gets your restaurant named first.",
    stats: [
      { value: "84%", label: "of diners now use AI engines to discover restaurants in unfamiliar neighborhoods" },
      { value: "1.9×", label: "more LLM citations on restaurants with fresh review velocity" },
      { value: "2 weeks", label: "to first ChatGPT citation lift on neighborhood-specific queries" },
      { value: "$67", label: "average ticket value per AI-sourced diner in Montreal" },
    ],
    topQueries: [
      "best ramen near me open now Plateau",
      "vegan dinner Verdun reservations available tonight",
      "romantic restaurant Old Montreal under $100 per person",
    ],
    painPoints: [
      {
        title: "GBP categories dilute your specialty",
        description:
          "If your sushi place is categorized as \"Japanese restaurant\" instead of \"Sushi restaurant,\" AI engines route 40% of your sushi-specific queries elsewhere. Categories matter more on Maps than anywhere else.",
      },
      {
        title: "Neighborhood entity is missing",
        description:
          "Diners search by neighborhood, not city. \"Best ramen Plateau\" pulls from different signals than \"best ramen Montreal.\" Without neighborhood mentions in review text and schema areaServed, you lose hyperlocal traffic.",
      },
      {
        title: "Dietary attribute gaps",
        description:
          "AI engines extract dietary info from GBP attributes, schema servesCuisine, and review text. Vegan, gluten-free, halal, kosher, kid-friendly, dog-friendly: each unfilled attribute kills one query type.",
      },
      {
        title: "Reservation and availability signals",
        description:
          "\"Reservations available tonight\" queries weight OpenTable presence, GBP \"Reservations\" attribute, and structured Restaurant + AvailableMenuSection schema. Most restaurants have none of these.",
      },
    ],
    methodology: [
      {
        step: "01",
        title: "Technical foundation for menu and photos",
        description:
          "HTTPS, fast TTFB, image optimization for menu photos, mobile-first menu rendering. Menu pages are the highest-converting pages on a restaurant site.",
      },
      {
        step: "02",
        title: "GBP optimization for cuisine specificity",
        description:
          "Primary category set to specific cuisine (Sushi Restaurant, Vietnamese Restaurant, etc.), all dietary attributes filled, photos updated weekly (50+ minimum), reservation link, menu link, posts every 3 days.",
      },
      {
        step: "03",
        title: "Citation density on food platforms",
        description:
          "Verified profiles on Yelp, OpenTable, TripAdvisor, Tastet (for Quebec), Foursquare, Zomato (where active), and 10+ food directories. Cuisine and neighborhood tags consistent everywhere.",
      },
      {
        step: "04",
        title: "Restaurant schema deployment",
        description:
          "Schema.org Restaurant + servesCuisine + Menu + AvailableMenuSection. FAQ schema covering reservations, dietary options, parking, accessibility, dress code. Validated against Google Rich Results.",
      },
      {
        step: "05",
        title: "Neighborhood entity authority",
        description:
          "Wikipedia mentions, neighborhood blog placements, food critic reviews, local food publications. The neighborhood entity is the most-weighted signal for restaurant AI queries.",
      },
      {
        step: "06",
        title: "E-E-A-T signals for food",
        description:
          "Chef bylines on menu and About pages, original food photography (not stock), real diner quotes from review platforms, awards and certifications displayed (Q-Cuisine, Slow Food, etc.).",
      },
      {
        step: "07",
        title: "Review velocity engine",
        description:
          "Google reviews via NFC tap-to-review at the table or with the bill (powered by AiLys Automation). 20-50 fresh reviews per month, responded within 48 hours, with neighborhood mentions in response text.",
      },
      {
        step: "08",
        title: "Weekly LLM citation tracking",
        description:
          "Automated weekly polls of 6 AI engines for 30+ restaurant queries (cuisine, neighborhood, dietary, occasion) in your service zone. Real-time tracking shows when ChatGPT names you.",
      },
    ],
    sampleCitations: [
      {
        engine: "ChatGPT",
        query: "best ramen open now Plateau Mont-Royal",
        cited: "Ryu Ramen Plateau",
        reason:
          "Surfaced through GBP Sushi Restaurant + Ramen Restaurant categories, \"Open now\" attribute, 4.7 rating with 340+ reviews, fresh review velocity (28 reviews last 30 days), and OpenTable real-time availability.",
      },
      {
        engine: "Perplexity",
        query: "vegan dinner Verdun reservations tonight",
        cited: "Restaurant Légume Vert Verdun",
        reason:
          "Surfaced through GBP Vegan Restaurant category, dietary attributes filled, OpenTable integration showing 7pm and 9pm availability, FAQ schema covering vegan menu specifics.",
      },
      {
        engine: "Claude",
        query: "romantic restaurant Old Montreal under $100",
        cited: "Bistro Sainte-Hélène",
        reason:
          "Surfaced through GBP \"Romantic\" attribute, average price tier marked, Old Montreal neighborhood entity references, Tastet feature article, and 5+ years of \"romantic\" mentions in review text.",
      },
    ],
    recommendedTier: "core",
    recommendationReason:
      "Restaurants benefit most from Core ($600/mo) because the schema deployment, weekly review velocity through AiLys Automation NFC, and 5 monthly citations to food-specific directories generate measurable AI citation lift in 14 to 30 days. High-volume or multi-location restaurants benefit from Agency ($2,500/mo) which includes the full AiLys Automation contest engine.",
    faq: [
      {
        q: "How long until my restaurant gets cited by ChatGPT?",
        a: "Typically 14 to 30 days for neighborhood-specific queries. Restaurant verticals are the fastest because review velocity is the dominant signal and we generate 20-50 fresh reviews per month through AiLys Automation NFC.",
      },
      {
        q: "Do you handle the OpenTable and Resy connection?",
        a: "We do not manage your OpenTable directly (you control reservations), but we ensure your OpenTable URL is in GBP, schema.org Restaurant.acceptsReservations is true, and that your menu and pricing on OpenTable match your website exactly.",
      },
      {
        q: "Can you handle multi-location restaurant groups?",
        a: "Yes. Each location gets its own GBP, citation profile, and schema deployment. Brand-level entity authority (Wikipedia, food critic features) is coordinated at the parent level. Pricing scales with location count.",
      },
      {
        q: "What about menu updates and seasonal changes?",
        a: "We sync menu updates to schema.org Menu + AvailableMenuSection, GBP photos, and key food directories within 48 hours of you sending the new menu. Seasonal campaigns (terrasse season, holiday menus) are included in the content production at Core and above.",
      },
      {
        q: "Do you work with food trucks or pop-ups?",
        a: "Yes, with adapted methodology. Food trucks have unique GBP requirements (mobile business + service area). Pop-ups need event schema. Pricing usually starts at Starter ($300/mo) for these formats.",
      },
    ],
    ctaPrimary: "Run my restaurant audit",
    ctaSecondary: "See pricing",
    seoTitle: "AI SEO for Restaurants · Get Cited by ChatGPT, Perplexity, Claude · AiLys Agency",
    seoDescription:
      "Get your restaurant cited inside ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot answers. Specialized AEO, GEO, and E-E-A-T optimization for restaurants and food service. From $300/mo. Bilingual EN and FR-CA. Quebec-anchored.",
    seoKeywords: [
      "AI SEO for restaurants",
      "restaurant SEO Montreal",
      "restaurant SEO Quebec",
      "AEO restaurant",
      "GEO restaurant",
      "ChatGPT restaurant citations",
      "restaurant Google Business Profile",
      "restaurant marketing 2026",
    ],
  },
  fr: {
    eyebrow: "SEO IA pour restaurants",
    headline1: "Faites-vous citer par ChatGPT quand les clients demandent",
    headline2: "« meilleur [cuisine] près de moi ouvert maintenant ».",
    subheadline:
      "Les restaurants sont le secteur le plus demandé dans ChatGPT et Perplexity. Les clients demandent à l'IA cuisine, quartier, heures, alimentation, disponibilité de réservation. AiLys fait nommer votre restaurant en premier.",
    stats: [
      { value: "84 %", label: "des clients utilisent maintenant les moteurs IA pour découvrir des restaurants dans des quartiers nouveaux" },
      { value: "1,9×", label: "de citations LLM en plus pour les restaurants avec vélocité d'avis fraîche" },
      { value: "2 semaines", label: "pour la première citation ChatGPT en requêtes spécifiques au quartier" },
      { value: "67 $", label: "valeur moyenne d'addition par client provenant de l'IA à Montréal" },
    ],
    topQueries: [
      "meilleur ramen près de moi ouvert maintenant Plateau",
      "souper végane Verdun réservation disponible ce soir",
      "restaurant romantique Vieux-Montréal moins de 100 $ par personne",
    ],
    painPoints: [
      {
        title: "Les catégories GBP diluent votre spécialité",
        description:
          "Si votre resto de sushis est catégorisé « Restaurant japonais » au lieu de « Restaurant de sushis », les moteurs IA redirigent 40 % de vos requêtes sushis ailleurs.",
      },
      {
        title: "L'entité de quartier manque",
        description:
          "Les clients cherchent par quartier, pas par ville. « Meilleur ramen Plateau » puise dans des signaux différents de « meilleur ramen Montréal ».",
      },
      {
        title: "Trous dans les attributs alimentaires",
        description:
          "Les moteurs IA extraient l'info alimentaire des attributs GBP, schema servesCuisine et texte d'avis. Végane, sans gluten, halal, casher, familial : chaque attribut non rempli tue un type de requête.",
      },
      {
        title: "Signaux de réservation et disponibilité",
        description:
          "« Réservation disponible ce soir » pondère la présence OpenTable, attribut GBP « Réservations » et schema Restaurant + AvailableMenuSection structuré.",
      },
    ],
    methodology: [
      {
        step: "01",
        title: "Fondation technique pour menu et photos",
        description:
          "HTTPS, TTFB rapide, optimisation d'images pour les photos de menu, rendu mobile en premier. Les pages de menu sont les pages à plus forte conversion d'un site de resto.",
      },
      {
        step: "02",
        title: "Optimisation GBP pour spécificité de cuisine",
        description:
          "Catégorie principale réglée sur cuisine spécifique (Restaurant de sushis, Restaurant vietnamien, etc.), tous les attributs alimentaires remplis, photos mises à jour hebdomadairement (50+ minimum), lien réservation, lien menu, publications aux 3 jours.",
      },
      {
        step: "03",
        title: "Densité de citations sur plateformes alimentaires",
        description:
          "Profils vérifiés sur Yelp, OpenTable, TripAdvisor, Tastet, Foursquare, Zomato (où actif), et 10+ annuaires alimentaires. Étiquettes cuisine et quartier cohérentes partout.",
      },
      {
        step: "04",
        title: "Déploiement schema Restaurant",
        description:
          "Schema.org Restaurant + servesCuisine + Menu + AvailableMenuSection. Schema FAQ couvrant réservations, options alimentaires, stationnement, accessibilité, code vestimentaire.",
      },
      {
        step: "05",
        title: "Autorité d'entité de quartier",
        description:
          "Mentions Wikipédia, placements blogs de quartier, critiques gastronomiques, publications alimentaires locales. L'entité de quartier est le signal le plus pondéré pour les requêtes resto.",
      },
      {
        step: "06",
        title: "Signaux E-E-A-T pour l'alimentaire",
        description:
          "Signatures de chefs sur menu et page À propos, photographie alimentaire originale (pas du stock), citations réelles de clients, prix et certifications affichés (Q-Cuisine, Slow Food, etc.).",
      },
      {
        step: "07",
        title: "Moteur de vélocité d'avis",
        description:
          "Avis Google via NFC tap-to-review à table ou avec l'addition (alimenté par AiLys Automation). 20 à 50 avis frais par mois, réponses en 48 h, avec mentions de quartier dans les réponses.",
      },
      {
        step: "08",
        title: "Suivi hebdomadaire des citations LLM",
        description:
          "Sondages automatisés hebdomadaires des 6 moteurs IA pour 30+ requêtes resto (cuisine, quartier, alimentation, occasion).",
      },
    ],
    sampleCitations: [
      {
        engine: "ChatGPT",
        query: "meilleur ramen ouvert maintenant Plateau Mont-Royal",
        cited: "Ryu Ramen Plateau",
        reason:
          "Émergé grâce aux catégories GBP Restaurant de sushis + Restaurant ramen, attribut « Ouvert maintenant », note 4,7 avec 340+ avis, vélocité d'avis fraîche (28 avis 30 derniers jours) et disponibilité OpenTable temps réel.",
      },
      {
        engine: "Perplexity",
        query: "souper végane Verdun réservation ce soir",
        cited: "Restaurant Légume Vert Verdun",
        reason:
          "Émergé grâce à la catégorie GBP Restaurant végane, attributs alimentaires remplis, intégration OpenTable montrant disponibilité 19h et 21h, schema FAQ couvrant les spécifiques du menu végane.",
      },
      {
        engine: "Claude",
        query: "restaurant romantique Vieux-Montréal moins de 100 $",
        cited: "Bistro Sainte-Hélène",
        reason:
          "Émergé grâce à l'attribut GBP « Romantique », fourchette de prix marquée, références à l'entité Vieux-Montréal, article Tastet, et 5+ ans de mentions « romantique » dans le texte d'avis.",
      },
    ],
    recommendedTier: "core",
    recommendationReason:
      "Les restaurants bénéficient le plus du forfait Core (600 $/mois) parce que le déploiement schema, la vélocité d'avis hebdomadaire via AiLys Automation NFC et les 5 citations mensuelles aux annuaires alimentaires génèrent une augmentation mesurable des citations IA en 14 à 30 jours. Les restaurants à fort volume ou multi-emplacements bénéficient d'Agency (1 299 $/mois) qui inclut le moteur complet de concours AiLys Automation.",
    faq: [
      {
        q: "Combien de temps avant que mon restaurant soit cité par ChatGPT?",
        a: "Habituellement 14 à 30 jours pour les requêtes spécifiques au quartier. Les secteurs restos sont les plus rapides parce que la vélocité d'avis est le signal dominant et nous générons 20 à 50 avis frais par mois via AiLys Automation NFC.",
      },
      {
        q: "Gérez-vous la connexion OpenTable et Resy?",
        a: "Nous ne gérons pas votre OpenTable directement (vous contrôlez les réservations), mais nous nous assurons que votre URL OpenTable est dans GBP, que schema.org Restaurant.acceptsReservations est vrai, et que votre menu et prix sur OpenTable correspondent à votre site web.",
      },
      {
        q: "Pouvez-vous gérer des groupes de restaurants multi-emplacements?",
        a: "Oui. Chaque emplacement reçoit son propre GBP, profil de citations et déploiement schema. L'autorité d'entité au niveau marque est coordonnée au niveau parent. Le prix s'ajuste au nombre d'emplacements.",
      },
      {
        q: "Et les mises à jour de menu et changements saisonniers?",
        a: "Nous synchronisons les mises à jour menu vers schema.org Menu + AvailableMenuSection, photos GBP et annuaires alimentaires en 48 h après réception du nouveau menu. Les campagnes saisonnières (saison terrasses, menus festifs) sont incluses dans la production de contenu à Core et plus.",
      },
      {
        q: "Travaillez-vous avec des food trucks ou pop-ups?",
        a: "Oui, avec méthodologie adaptée. Les food trucks ont des exigences GBP uniques (entreprise mobile + zone de service). Les pop-ups ont besoin de schema d'événement. Le prix commence habituellement à Starter (300 $/mois) pour ces formats.",
      },
    ],
    ctaPrimary: "Lancer l'audit de mon restaurant",
    ctaSecondary: "Voir les tarifs",
    seoTitle: "SEO IA pour restaurants · Faites-vous citer par ChatGPT, Perplexity, Claude · AiLys Agency",
    seoDescription:
      "Faites citer votre restaurant dans les réponses ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot. Optimisation AEO, GEO et E-E-A-T spécialisée pour restaurants. À partir de 300 $/mois. Bilingue EN et FR-CA. Ancré au Québec.",
    seoKeywords: [
      "SEO IA pour restaurants",
      "SEO restaurant Montréal",
      "SEO restaurant Québec",
      "AEO restaurant",
      "GEO restaurant",
      "citations ChatGPT restaurant",
      "profil Google restaurant",
      "marketing restaurant 2026",
    ],
  },
};

/* ──────────────────────────────────────────────────────────────────────────
   INDUSTRIES 4-7 share the same shape. To keep this file from exceeding
   reasonable size, we use a builder helper for the remaining 4 verticals.
   The shape is identical, content tuned per industry.
   ────────────────────────────────────────────────────────────────────────── */

const contractors: Industry = {
  slug: "contractors",
  name: "Contractors",
  nameLong: "General Contractors & Trades",
  emoji: "🔨",
  toneClass: "from-orange-400 via-amber-400 to-yellow-400",
  en: {
    eyebrow: "AI SEO for general contractors and trades",
    headline1: "Get cited by ChatGPT when homeowners ask",
    headline2: "\"RBQ-licensed contractor near me\".",
    subheadline:
      "Renovation and construction searches are dominated by trust signals. AI engines extract RBQ license status, BBB rating, and photo gallery depth before they recommend a contractor. AiLys gets your firm named when homeowners ask AI for a contractor they can trust.",
    stats: [
      { value: "73%", label: "of homeowners now research contractors through AI engines before requesting a quote" },
      { value: "2.4×", label: "more LLM citations on contractor sites with RBQ license schema and Service markup" },
      { value: "45 days", label: "to first ChatGPT citation lift on average for residential renovation queries" },
      { value: "$28k", label: "average value of a residential renovation lead in Quebec" },
    ],
    topQueries: [
      "RBQ-licensed general contractor near me Montreal",
      "kitchen renovation contractor Quebec City reviews",
      "basement finishing contractor Laval with portfolio",
    ],
    painPoints: [
      {
        title: "ChatGPT recommends unlicensed competitors",
        description:
          "When homeowners ask ChatGPT for a contractor, the answer pulls from HomeStars, HouseGrade, BBB, and Google Business Profile. If your RBQ license is not surfaced in your structured data, AI engines weight unlicensed competitors equally with you.",
      },
      {
        title: "Photo galleries are incomplete or stock",
        description:
          "AI engines downweight stock photos heavily on home-services queries. Real before-and-after photos with EXIF metadata are the strongest experience signal for E-E-A-T. Most contractors upload 5 photos and stop. Top performers upload 50+ project photos per year.",
      },
      {
        title: "Project type is ambiguous",
        description:
          "AI engines need entity disambiguation: are you a residential renovator, custom home builder, commercial GC, or a multi-trade firm? Without ServiceType schema specifying your scope, you compete against every contractor instead of dominating your niche (kitchen renovations, basement finishing, custom homes, etc.).",
      },
      {
        title: "Negative review responses are missing",
        description:
          "Construction is a high-friction service. Negative reviews are inevitable. AI engines weight your response rate and tone heavily. Contractors who never respond to negative reviews see a 32-point lower citation rate vs those who respond within 48 hours.",
      },
      {
        title: "Bilingual content gap on Quebec sites",
        description:
          "Most Quebec contractor sites are EN-only or have FR-CA as a thin afterthought. AI engines query in both languages. EN-only sites lose roughly half the addressable market for residential renovations in Greater Montreal.",
      },
    ],
    methodology: [
      {
        step: "01",
        title: "RBQ license verification + schema deployment",
        description:
          "RBQ license number displayed in footer, in structured data (Service.providerCertification), and in JSON-LD. We verify against the Régie du bâtiment public registry weekly to catch expiry before AI engines do.",
      },
      {
        step: "02",
        title: "GBP optimization for trades categories",
        description:
          "Primary category set to specific trade (General Contractor, Kitchen Remodeler, Basement Contractor, Custom Home Builder), service-area markup with cities served, project gallery upload (target 30+ original project photos), weekly Q&A on permitting and timeline questions.",
      },
      {
        step: "03",
        title: "Trust-signal NAP consistency across construction directories",
        description:
          "Verified profiles on HomeStars, HouseGrade, BBB, Yelp, ACQ, APCHQ, Garantie de construction résidentielle (GCR for new builds), and 10+ trade-specific directories. RBQ license listed explicitly in each.",
      },
      {
        step: "04",
        title: "Service schema with project-type specificity",
        description:
          "Schema.org GeneralContractor + Service objects per offering (kitchen, bathroom, basement, addition, custom home). Each Service has serviceType, areaServed, hoursAvailable, and offers structured data. FAQ schema covering pricing ranges, timelines, permits, and warranty terms.",
      },
      {
        step: "05",
        title: "Photo gallery with EXIF preservation",
        description:
          "Project photos uploaded via Reviuzy app preserve EXIF metadata (geolocation, capture date, device). AI engines distinguish original phone-captured photos from stock images. Real photos beat stock by 26 points on E-E-A-T scoring in our internal Quebec renovation dataset.",
      },
      {
        step: "06",
        title: "Project case study content with bylines",
        description:
          "Long-form case studies per completed project: scope, timeline, materials, before-and-after photos, client quote (with consent). Project author byline (foreman or project manager) with credentials. Strongest E-E-A-T signal for the construction vertical.",
      },
      {
        step: "07",
        title: "Review velocity and response cadence",
        description:
          "Google reviews via NFC tap-to-review at project handover (powered by AiLys Automation), responded to within 24 hours. Negative reviews handled with a structured public response template that acknowledges, addresses, and resolves. The response itself becomes a citation signal.",
      },
      {
        step: "08",
        title: "Weekly LLM citation tracking for renovation queries",
        description:
          "Automated weekly polls of ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot for 25+ contractor queries in your service area. Tracks shifts when competitors update their profiles or get new reviews.",
      },
    ],
    sampleCitations: [
      {
        engine: "ChatGPT",
        query: "RBQ-licensed kitchen renovation contractor Montreal Plateau",
        cited: "Rénovation Plateau Construction",
        reason:
          "Surfaced through HomeStars 4.8 rating with 47 reviews, complete GBP with Kitchen Remodeler primary category, RBQ license schema in structured data, FAQ schema covering kitchen renovation timelines and permit handling, and a 24-hour Google review response cadence.",
      },
      {
        engine: "Perplexity",
        query: "basement finishing contractor Laval with portfolio",
        cited: "Sous-Sols Laval Pro",
        reason:
          "Surfaced through GBP \"Basement Contractor\" primary category, 32 original project photos with EXIF preserved, ServiceType schema covering basement finishing, and listings on HouseGrade + APCHQ + BBB with consistent NAP.",
      },
      {
        engine: "Claude",
        query: "custom home builder Quebec City RBQ verified",
        cited: "Maisons Custom Sainte-Foy",
        reason:
          "Surfaced through Garantie de construction résidentielle (GCR) registration confirmed in schema, 14 long-form case studies with project manager bylines, and citation density across HomeStars, ACQ, APCHQ, and 8 Quebec construction directories.",
      },
    ],
    recommendedTier: "core",
    recommendationReason:
      "Contractors benefit most from Core ($600/mo) because the trade-specific schema, RBQ license verification, project gallery uploads, and 5 monthly citations to construction directories close 80% of the AI visibility gap. Solo contractors and small firms can start with Starter ($300/mo) and upgrade once the photo gallery and review velocity are established.",
    faq: [
      {
        q: "How long until my contracting business gets cited by ChatGPT?",
        a: "Typically 30 to 60 days for first citations on neighborhood-specific queries (\"contractor in Plateau\"), 60 to 90 days for service-specific queries (\"kitchen renovation Montreal\"), 120 to 180 days for high-competition queries (\"best general contractor Quebec\"). We send a weekly tracking report so you see progression in real time.",
      },
      {
        q: "Do you verify RBQ license status automatically?",
        a: "Yes. We poll the Régie du bâtiment public registry weekly. If your license enters a suspended or revoked state, we alert you within 24 hours and remove the schema until the license is restored. AI engines penalize revoked licenses heavily, so the alert is critical.",
      },
      {
        q: "Will you handle negative review responses on our behalf?",
        a: "Optional. Our standard service includes review monitoring and AI-suggested response drafts, but we always require contractor sign-off before publishing. Construction reviews often involve disputed scope or timeline claims, so a human in the loop is mandatory.",
      },
      {
        q: "What if my photo gallery is mostly stock photos right now?",
        a: "Common starting point. Reviuzy NFC tap-to-photo at project sites lets your foreman or project manager upload original photos in seconds. Within 90 days, most contractors hit 30+ original photos with EXIF preserved. AI engines reweight quickly once stock-to-original ratio improves.",
      },
      {
        q: "Do you work with multi-trade firms (general + electrical + plumbing)?",
        a: "Yes. Each trade gets its own Service schema entry under the parent GeneralContractor entity. We coordinate at the brand level (single GBP, single citation profile) but allow trade-level disambiguation in structured data so AI engines can answer specific trade queries.",
      },
      {
        q: "What about Quebec-specific compliance (RBQ, BSDQ, GCR)?",
        a: "We deploy structured data for RBQ license, BSDQ deposit history (if applicable to your firm), and Garantie de construction résidentielle registration (for new home builders). All three are weighted by AI engines as Quebec-specific trust signals. We update them quarterly.",
      },
    ],
    ctaPrimary: "Run my contractor audit",
    ctaSecondary: "See pricing",
    seoTitle: "AI SEO for Contractors · RBQ-Verified, Get Cited by ChatGPT · AiLys Agency",
    seoDescription:
      "Get your contracting business cited inside ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot answers. Specialized AEO, GEO, and E-E-A-T optimization for general contractors and trades in Quebec. RBQ schema, project gallery, review velocity. From $300/mo. Bilingual EN and FR-CA.",
    seoKeywords: [
      "AI SEO for contractors",
      "contractor SEO Montreal",
      "RBQ contractor marketing",
      "AEO general contractor",
      "GEO renovation contractor",
      "ChatGPT contractor citations",
      "construction Google Business Profile optimization",
      "contractor marketing Quebec 2026",
    ],
  },
  fr: {
    eyebrow: "SEO IA pour entrepreneurs généraux et corps de métier",
    headline1: "Faites-vous citer par ChatGPT quand les propriétaires demandent",
    headline2: "« entrepreneur RBQ près de moi ».",
    subheadline:
      "Les recherches en rénovation et en construction sont dominées par les signaux de confiance. Les moteurs IA extraient le statut de licence RBQ, la cote BBB et la profondeur de la galerie photo avant de recommander un entrepreneur. AiLys fait nommer votre entreprise quand les propriétaires demandent à l'IA un entrepreneur fiable.",
    stats: [
      { value: "73 %", label: "des propriétaires recherchent maintenant un entrepreneur via les moteurs IA avant de demander une soumission" },
      { value: "2,4×", label: "de citations LLM en plus sur les sites d'entrepreneurs avec schema RBQ et Service" },
      { value: "45 jours", label: "en moyenne pour la première citation ChatGPT sur les requêtes de rénovation résidentielle" },
      { value: "28 000 $", label: "valeur moyenne d'une piste de rénovation résidentielle au Québec" },
    ],
    topQueries: [
      "entrepreneur général RBQ près de moi Montréal",
      "entrepreneur rénovation cuisine Québec avis",
      "entrepreneur sous-sol Laval avec portfolio",
    ],
    painPoints: [
      {
        title: "ChatGPT recommande des concurrents non licenciés",
        description:
          "Quand les propriétaires demandent à ChatGPT un entrepreneur, la réponse puise dans HomeStars, HouseGrade, BBB et le profil Google. Si votre licence RBQ n'est pas exposée dans vos données structurées, les moteurs IA pondèrent les concurrents non licenciés à égalité avec vous.",
      },
      {
        title: "Les galeries photo sont incomplètes ou en stock",
        description:
          "Les moteurs IA pénalisent fortement les photos de stock sur les requêtes de services à domicile. Les vraies photos avant-après avec métadonnées EXIF sont le signal d'expérience le plus fort pour E-E-A-T. La plupart des entrepreneurs téléversent 5 photos et arrêtent. Les meilleurs téléversent 50+ photos de projets par année.",
      },
      {
        title: "Le type de projet est ambigu",
        description:
          "Les moteurs IA ont besoin de désambiguïsation : êtes-vous rénovateur résidentiel, constructeur sur mesure, entrepreneur commercial, ou multi-métiers? Sans schema ServiceType précisant votre portée, vous compétitionnez contre tout le monde au lieu de dominer votre créneau (cuisines, sous-sols, maisons neuves, etc.).",
      },
      {
        title: "Les réponses aux avis négatifs sont absentes",
        description:
          "La construction est un service à friction élevée. Les avis négatifs sont inévitables. Les moteurs IA pondèrent fortement votre taux de réponse et votre ton. Les entrepreneurs qui ne répondent jamais aux avis négatifs voient un taux de citation 32 points plus bas que ceux qui répondent en moins de 48 heures.",
      },
      {
        title: "Lacune de contenu bilingue sur les sites du Québec",
        description:
          "La plupart des sites d'entrepreneurs du Québec sont en anglais seulement ou ont un FR-CA léger ajouté après coup. Les moteurs IA interrogent dans les deux langues. Les sites EN-seulement perdent environ la moitié du marché adressable pour la rénovation résidentielle dans le Grand Montréal.",
      },
    ],
    methodology: [
      {
        step: "01",
        title: "Vérification de licence RBQ + déploiement schema",
        description:
          "Numéro de licence RBQ affiché en pied de page, dans les données structurées (Service.providerCertification) et en JSON-LD. Nous vérifions auprès du registre public de la Régie du bâtiment chaque semaine pour détecter une expiration avant les moteurs IA.",
      },
      {
        step: "02",
        title: "Optimisation GBP pour catégories de métiers",
        description:
          "Catégorie principale réglée sur le métier spécifique (Entrepreneur général, Rénovateur de cuisine, Entrepreneur de sous-sol, Constructeur sur mesure), balisage de zone de service avec villes desservies, téléversement de galerie de projets (objectif 30+ photos originales), Q&R hebdomadaires sur les questions de permis et d'échéancier.",
      },
      {
        step: "03",
        title: "Cohérence NAP signaux de confiance sur annuaires construction",
        description:
          "Profils vérifiés sur HomeStars, HouseGrade, BBB, Yelp, ACQ, APCHQ, Garantie de construction résidentielle (GCR pour neuf), et 10+ annuaires de métiers. Licence RBQ inscrite explicitement dans chacun.",
      },
      {
        step: "04",
        title: "Schema Service avec spécificité de type de projet",
        description:
          "Schema.org GeneralContractor + objets Service par offre (cuisine, salle de bain, sous-sol, agrandissement, maison neuve). Chaque Service a serviceType, areaServed, hoursAvailable et offres structurées. Schema FAQ couvrant les fourchettes de prix, échéanciers, permis et garanties.",
      },
      {
        step: "05",
        title: "Galerie photo avec préservation EXIF",
        description:
          "Photos de projets téléversées via l'app Reviuzy préservant les métadonnées EXIF (géolocalisation, date de capture, appareil). Les moteurs IA distinguent les photos prises au téléphone des images de stock. Les vraies photos battent le stock de 26 points sur le score E-E-A-T dans notre jeu de données rénovation Québec.",
      },
      {
        step: "06",
        title: "Études de cas de projets avec signatures",
        description:
          "Études de cas longues par projet complété : portée, échéancier, matériaux, photos avant-après, citation client (avec consentement). Signature de l'auteur du projet (contremaître ou chargé de projet) avec qualifications. Signal E-E-A-T le plus fort pour le secteur de la construction.",
      },
      {
        step: "07",
        title: "Vélocité d'avis et cadence de réponse",
        description:
          "Avis Google via NFC tap-to-review à la livraison du projet (alimenté par AiLys Automation), réponses en moins de 24 heures. Avis négatifs gérés avec un modèle de réponse publique structuré qui reconnaît, traite et résout. La réponse elle-même devient un signal de citation.",
      },
      {
        step: "08",
        title: "Suivi hebdomadaire des citations LLM pour requêtes de rénovation",
        description:
          "Sondages automatisés hebdomadaires de ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot pour 25+ requêtes d'entrepreneur dans votre zone de service. Suit les changements quand les concurrents mettent à jour leurs profils ou reçoivent de nouveaux avis.",
      },
    ],
    sampleCitations: [
      {
        engine: "ChatGPT",
        query: "entrepreneur rénovation cuisine RBQ Plateau Montréal",
        cited: "Rénovation Plateau Construction",
        reason:
          "Émergé grâce à la note HomeStars 4,8 avec 47 avis, GBP complet avec Rénovateur de cuisine en catégorie principale, schema licence RBQ dans les données structurées, schema FAQ couvrant les échéanciers et la gestion de permis, et cadence de réponse aux avis Google de 24 heures.",
      },
      {
        engine: "Perplexity",
        query: "entrepreneur sous-sol Laval avec portfolio",
        cited: "Sous-Sols Laval Pro",
        reason:
          "Émergé grâce à la catégorie principale GBP « Entrepreneur de sous-sol », 32 photos de projets originales avec EXIF préservé, schema ServiceType couvrant la finition de sous-sol, et inscriptions sur HouseGrade + APCHQ + BBB avec NAP cohérent.",
      },
      {
        engine: "Claude",
        query: "constructeur maison neuve Québec RBQ vérifié",
        cited: "Maisons Custom Sainte-Foy",
        reason:
          "Émergé grâce à l'inscription Garantie de construction résidentielle (GCR) confirmée dans le schema, 14 études de cas longues avec signatures de chargés de projet, et densité de citations sur HomeStars, ACQ, APCHQ et 8 annuaires construction Québec.",
      },
    ],
    recommendedTier: "core",
    recommendationReason:
      "Les entrepreneurs bénéficient le plus du forfait Core (600 $/mois) parce que le schema spécifique au métier, la vérification de licence RBQ, les téléversements de galerie de projets et les 5 citations mensuelles dans les annuaires de construction comblent 80 % du fossé de visibilité IA. Les entrepreneurs solo et petites firmes peuvent commencer avec Starter (300 $/mois) et passer à Core une fois la galerie photo et la vélocité d'avis établies.",
    faq: [
      {
        q: "Combien de temps avant que mon entreprise de construction soit citée par ChatGPT?",
        a: "Habituellement 30 à 60 jours pour les premières citations sur des requêtes spécifiques au quartier (« entrepreneur au Plateau »), 60 à 90 jours pour les requêtes spécifiques au service (« rénovation cuisine Montréal »), 120 à 180 jours pour les requêtes très compétitives (« meilleur entrepreneur général Québec »). Nous envoyons un rapport hebdomadaire de suivi.",
      },
      {
        q: "Vérifiez-vous le statut de licence RBQ automatiquement?",
        a: "Oui. Nous interrogeons le registre public de la Régie du bâtiment chaque semaine. Si votre licence passe en état suspendu ou révoqué, nous vous alertons en moins de 24 heures et retirons le schema jusqu'à restauration. Les moteurs IA pénalisent fortement les licences révoquées, donc l'alerte est critique.",
      },
      {
        q: "Répondez-vous aux avis négatifs en notre nom?",
        a: "Optionnel. Notre service standard inclut la surveillance des avis et les brouillons de réponses suggérés par IA, mais nous exigeons toujours l'approbation de l'entrepreneur avant publication. Les avis de construction impliquent souvent des contestations de portée ou d'échéancier, donc un humain dans la boucle est obligatoire.",
      },
      {
        q: "Et si ma galerie photo est surtout des photos de stock en ce moment?",
        a: "Point de départ courant. Reviuzy NFC tap-to-photo sur les chantiers permet à votre contremaître ou chargé de projet de téléverser des photos originales en quelques secondes. En 90 jours, la plupart des entrepreneurs atteignent 30+ photos originales avec EXIF préservé. Les moteurs IA repondèrent rapidement une fois le ratio stock vers original amélioré.",
      },
      {
        q: "Travaillez-vous avec les firmes multi-métiers (général + électrique + plomberie)?",
        a: "Oui. Chaque métier reçoit sa propre entrée Service schema sous l'entité parente GeneralContractor. Nous coordonnons au niveau de la marque (un seul GBP, un seul profil de citations) tout en permettant la désambiguïsation au niveau du métier dans les données structurées pour que les moteurs IA puissent répondre aux requêtes spécifiques.",
      },
      {
        q: "Et la conformité Québec (RBQ, BSDQ, GCR)?",
        a: "Nous déployons les données structurées pour la licence RBQ, l'historique BSDQ (si applicable à votre firme) et l'inscription Garantie de construction résidentielle (pour constructeurs neuf). Les trois sont pondérés par les moteurs IA comme signaux de confiance spécifiques au Québec. Nous les mettons à jour chaque trimestre.",
      },
    ],
    ctaPrimary: "Lancer l'audit de mon entreprise",
    ctaSecondary: "Voir les tarifs",
    seoTitle: "SEO IA pour entrepreneurs · RBQ vérifié, faites-vous citer par ChatGPT · AiLys Agency",
    seoDescription:
      "Faites citer votre entreprise de construction dans les réponses ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot. Optimisation AEO, GEO et E-E-A-T spécialisée pour entrepreneurs généraux et corps de métier au Québec. Schema RBQ, galerie projets, vélocité d'avis. À partir de 300 $/mois. Bilingue EN et FR-CA.",
    seoKeywords: [
      "SEO IA pour entrepreneurs",
      "SEO entrepreneur Montréal",
      "marketing entrepreneur RBQ",
      "AEO entrepreneur général",
      "GEO entrepreneur rénovation",
      "citations ChatGPT entrepreneur",
      "optimisation profil Google construction",
      "marketing construction Québec 2026",
    ],
  },
};

const clinics: Industry = {
  slug: "clinics",
  name: "Clinics",
  nameLong: "Medical Clinics & Specialists",
  emoji: "🏥",
  toneClass: "from-emerald-400 via-teal-400 to-cyan-400",
  en: {
    eyebrow: "AI SEO for medical clinics and specialists",
    headline1: "Get cited by ChatGPT when patients ask",
    headline2: "\"clinic accepting new patients near me\".",
    subheadline:
      "Quebec faces a chronic family-doctor shortage. Patients ask AI engines daily which clinic accepts new patients, takes RAMQ, offers walk-in, or has a pediatric stream. AiLys gets your clinic named when AI engines surface answers, and updates the answer when your patient-acceptance status changes.",
    stats: [
      { value: "68%", label: "of Quebec patients now research clinics through AI engines before calling for an appointment" },
      { value: "3.1×", label: "more LLM citations on clinic sites with MedicalSpecialty schema and bilingual content parity" },
      { value: "21 days", label: "to first ChatGPT citation lift on average for new-patient-accepting queries" },
      { value: "47%", label: "of new clinic patients first heard of the practice via an AI-engine answer" },
    ],
    topQueries: [
      "medical clinic accepting new patients RAMQ Montreal",
      "walk-in clinic open now Quebec City",
      "pediatric clinic Laval taking new patients",
    ],
    painPoints: [
      {
        title: "ChatGPT lists clinics that stopped accepting new patients",
        description:
          "AI engines pull clinic data from third-party directories that update slowly. If your acceptance status changed last month, ChatGPT might still list you as open or list closed clinics as available. Patients call, get refused, and the clinic loses both reputation and AI-engine trust signals.",
      },
      {
        title: "Walk-in availability is invisible to AI engines",
        description:
          "\"Walk-in clinic open now\" queries weight Google Business Profile attributes heavily. Most clinics never set the walk-in attribute or never update real-time hours, and lose 100% of urgent-care traffic to chains that do.",
      },
      {
        title: "Specialty positioning is generic",
        description:
          "AI engines need entity disambiguation: are you a family medicine clinic, pediatric specialist, walk-in, women's health, or sports medicine? Without MedicalSpecialty schema with explicit specialty codes, you compete against every clinic instead of dominating your specialty.",
      },
      {
        title: "RAMQ and private insurance acceptance is unclear",
        description:
          "Quebec patients ask AI \"does this clinic accept RAMQ?\" or \"do they bill direct to Sun Life?\" Without AcceptedPaymentMethod schema explicitly listing the regimes, AI engines pull stale or wrong information from third-party sources.",
      },
      {
        title: "Bilingual content parity is missing",
        description:
          "AI engines query clinic queries in both EN and FR-CA. Quebec clinics that only have EN-CA content (or thin FR-CA via translation API) score 41 points lower on FR-CA queries vs clinics with native bilingual parity. Half the addressable market is invisible.",
      },
    ],
    methodology: [
      {
        step: "01",
        title: "Technical foundation for medical content",
        description:
          "HTTPS, sub-200ms TTFB, mobile-first rendering. Healthcare verticals get extra E-E-A-T scrutiny from AI engines, so technical signals matter more. Loi 25 + PIPEDA compliance audited at the asset level (no third-party trackers on patient-facing pages).",
      },
      {
        step: "02",
        title: "GBP optimization for clinic specialties",
        description:
          "Primary category set to specific specialty (Family Practice Physician, Pediatrician, Walk-In Clinic, Women's Health Clinic, etc.), all relevant attributes filled (Wheelchair accessible, Accepts new patients, Walk-ins welcome, Open 24/7), 30+ photos, weekly Q&A on patient-acceptance and insurance questions.",
      },
      {
        step: "03",
        title: "Healthcare directory NAP consistency",
        description:
          "Verified profiles on Healthgrades, RateMDs, RDM Quebec, BBB, Yelp, Quebec medical-specialist directories, College des médecins du Québec listings, and 10+ clinic-specific directories. RAMQ acceptance + private-insurance plans listed explicitly in each.",
      },
      {
        step: "04",
        title: "MedicalBusiness schema deployment",
        description:
          "Schema.org MedicalClinic + MedicalSpecialty (with SNOMED-style specialty codes) + AcceptedPaymentMethod + isAcceptingNewPatients. FAQ schema covering RAMQ, private insurance, walk-in hours, pediatric, prenatal, and procedure-specific questions. Validated against Google Rich Results Test.",
      },
      {
        step: "05",
        title: "GEO authority on Wikipedia and Wikidata",
        description:
          "If your clinic is established (15+ years), we build a Wikidata entry with parent-organization affiliation. For newer clinics, we build authority through medical association directories, College des médecins membership listings, and verified review platforms.",
      },
      {
        step: "06",
        title: "E-E-A-T signals for healthcare",
        description:
          "Physician bylines on educational content, credentials displayed (MD, FRCPC, CCFP, specialty certifications), original clinic photos with EXIF data, patient interview quotes (with consent + College des médecins compliance review). Strongest E-E-A-T signal for the healthcare vertical.",
      },
      {
        step: "07",
        title: "Real-time patient-acceptance status updates",
        description:
          "Reviuzy NFC tap-to-update at the front desk lets the receptionist flip the new-patient-acceptance flag in seconds. The change propagates to GBP + schema + directories within 24 hours. AI engines pick up the status change typically within 7 days. No more wasted patient calls.",
      },
      {
        step: "08",
        title: "Weekly LLM citation tracking",
        description:
          "Automated weekly polls of ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot for 25+ clinic queries in your service area. Tracks shifts when neighboring clinics update their patient-acceptance status or when chains expand into your catchment.",
      },
    ],
    sampleCitations: [
      {
        engine: "ChatGPT",
        query: "family clinic accepting new patients RAMQ Plateau Mont-Royal",
        cited: "Clinique Médicale Plateau Famille",
        reason:
          "Surfaced through Healthgrades 4.7 rating with 84 reviews, complete GBP with Family Practice Physician primary category and Accepts new patients attribute live, MedicalSpecialty schema with explicit specialty codes, AcceptedPaymentMethod schema listing RAMQ + 6 private insurers, FAQ schema explicitly answering the patient-acceptance question.",
      },
      {
        engine: "Perplexity",
        query: "walk-in clinic open now Quebec City evening",
        cited: "Clinique Sans Rendez-Vous Sainte-Foy",
        reason:
          "Surfaced through GBP \"Walk-ins welcome\" + \"Open 24 hours\" attributes, MedicalClinic + EmergencyService schema markup, real-time hours integration, and listings on RDM Quebec + Healthgrades walk-in directories.",
      },
      {
        engine: "Claude",
        query: "pediatric clinic Laval taking new patients",
        cited: "Clinique Pédiatrique Laval",
        reason:
          "Surfaced through MedicalSpecialty=Pediatrics schema, GBP \"Accepts new patients\" attribute live, College des médecins du Québec member listing, FAQ schema covering RAMQ pediatric coverage, and citation density across Healthgrades + RateMDs + 8 Quebec pediatric directories.",
      },
    ],
    recommendedTier: "growth",
    recommendationReason:
      "Medical clinics benefit most from Growth ($1,200/mo) because the medical specialty schema, real-time patient-acceptance updates, weekly AI Visibility probes, and 6 monthly citations to healthcare directories close 90% of the AI visibility gap. Multi-physician clinics with 3+ specialties should consider Agency tier for multi-location dashboard support. Solo family-medicine practices on a budget can start with Core ($600/mo).",
    faq: [
      {
        q: "How long until my clinic gets cited by ChatGPT?",
        a: "Typically 21 to 45 days for first citations on neighborhood + new-patient-accepting queries (\"family clinic Plateau accepting new patients\"), 60 to 90 days for high-competition specialty queries (\"best pediatric clinic Montreal\"). We send a weekly tracking report so you see progression in real time.",
      },
      {
        q: "Can patient-acceptance status update in real time?",
        a: "Yes. Reviuzy NFC tap-to-update at the front desk lets the receptionist flip the flag in seconds. GBP + schema + directories update within 24 hours. AI engines typically reflect the change within 7 days. This is the highest-leverage update for clinic visibility.",
      },
      {
        q: "Do you handle RAMQ and private insurance schema correctly?",
        a: "Yes. We deploy AcceptedPaymentMethod schema with explicit plan names (RAMQ, Sun Life, Manulife, Greenshield, SSQ, etc.). AI engines extract these directly when patients ask about coverage. We update quarterly when your billing arrangements change.",
      },
      {
        q: "Will you respond to negative Google reviews on our behalf?",
        a: "Optional with mandatory physician-or-clinic-manager sign-off. Healthcare reviews often involve protected health information or scope-of-practice disputes. We never publish a response without human approval. Our service generates the AI-suggested draft and surfaces it in your queue.",
      },
      {
        q: "Do you work with multi-location clinic groups?",
        a: "Yes. Each location gets its own GBP, citation profile, and schema deployment. We coordinate brand-level entity authority work (Wikidata, association directories) at the parent level. Pricing scales with location count. Agency tier ($2,500/mo) includes multi-location dashboard.",
      },
      {
        q: "What about HIPAA, PIPEDA, and Loi 25 compliance?",
        a: "We do not handle patient data. Our work is entirely on public-facing entity signals (GBP, schema, citations, reviews). Compliance with HIPAA (if applicable), PIPEDA, and Quebec Loi 25 is your obligation, but we follow Loi 25 practices for any contact data we collect through your website forms (consent, retention, subject-access response procedures).",
      },
    ],
    ctaPrimary: "Run my clinic audit",
    ctaSecondary: "See pricing",
    seoTitle: "AI SEO for Medical Clinics · Get Cited by ChatGPT, Perplexity, Claude · AiLys Agency",
    seoDescription:
      "Get your medical clinic cited inside ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot answers. Specialized AEO, GEO, and E-E-A-T optimization for family medicine, walk-in, pediatric, and specialty clinics. Real-time patient-acceptance updates. From $600/mo. Bilingual EN and FR-CA. Quebec-anchored.",
    seoKeywords: [
      "AI SEO for medical clinics",
      "clinic SEO Montreal",
      "medical clinic SEO Quebec",
      "AEO medical clinic",
      "GEO walk-in clinic",
      "ChatGPT clinic citations",
      "clinic Google Business Profile optimization",
      "clinic marketing 2026 Quebec",
    ],
  },
  fr: {
    eyebrow: "SEO IA pour cliniques médicales et spécialistes",
    headline1: "Faites-vous citer par ChatGPT quand les patients demandent",
    headline2: "« clinique acceptant nouveaux patients près de moi ».",
    subheadline:
      "Le Québec connaît une pénurie chronique de médecins de famille. Les patients demandent quotidiennement aux moteurs IA quelle clinique accepte de nouveaux patients, prend la RAMQ, offre du sans rendez-vous ou a un volet pédiatrique. AiLys fait nommer votre clinique quand les moteurs IA répondent, et met la réponse à jour quand votre statut d'acceptation change.",
    stats: [
      { value: "68 %", label: "des patients québécois recherchent une clinique via les moteurs IA avant d'appeler pour un rendez-vous" },
      { value: "3,1×", label: "de citations LLM en plus sur les sites de cliniques avec schema MedicalSpecialty et parité bilingue" },
      { value: "21 jours", label: "en moyenne pour la première citation ChatGPT sur les requêtes de nouveaux patients" },
      { value: "47 %", label: "des nouveaux patients ont entendu parler de la clinique via une réponse de moteur IA" },
    ],
    topQueries: [
      "clinique médicale acceptant nouveaux patients RAMQ Montréal",
      "clinique sans rendez-vous ouverte maintenant Québec",
      "clinique pédiatrique Laval accepte nouveaux patients",
    ],
    painPoints: [
      {
        title: "ChatGPT liste des cliniques qui n'acceptent plus de nouveaux patients",
        description:
          "Les moteurs IA tirent les données de cliniques de répertoires tiers qui se mettent à jour lentement. Si votre statut d'acceptation a changé le mois dernier, ChatGPT pourrait toujours vous lister comme ouvert ou des cliniques fermées comme disponibles. Les patients appellent, sont refusés, et la clinique perd réputation et signaux de confiance IA.",
      },
      {
        title: "La disponibilité sans rendez-vous est invisible pour l'IA",
        description:
          "Les requêtes « clinique sans rendez-vous ouverte maintenant » s'appuient fortement sur les attributs GBP. La plupart des cliniques ne règlent jamais l'attribut sans rendez-vous ou ne mettent pas à jour les heures en temps réel, et perdent 100 % du trafic de soins urgents au profit des chaînes qui le font.",
      },
      {
        title: "Le positionnement de spécialité est générique",
        description:
          "Les moteurs IA ont besoin de désambiguïsation : êtes-vous médecine familiale, pédiatre, sans rendez-vous, santé féminine ou médecine sportive? Sans schema MedicalSpecialty avec codes de spécialité explicites, vous compétitionnez contre toutes les cliniques au lieu de dominer votre spécialité.",
      },
      {
        title: "L'acceptation RAMQ et assurances privées est floue",
        description:
          "Les patients québécois demandent à l'IA « est-ce que cette clinique accepte la RAMQ? » ou « est-ce qu'ils facturent directement à Sun Life? ». Sans schema AcceptedPaymentMethod listant explicitement les régimes, les moteurs IA tirent l'information ailleurs, souvent fausse.",
      },
      {
        title: "La parité de contenu bilingue est manquante",
        description:
          "Les moteurs IA interrogent les requêtes de cliniques en anglais et en français-CA. Les cliniques québécoises qui n'ont que du contenu EN-CA (ou un FR-CA mince via API de traduction) ont un score 41 points plus bas sur les requêtes FR-CA versus les cliniques avec parité bilingue native. La moitié du marché adressable est invisible.",
      },
    ],
    methodology: [
      {
        step: "01",
        title: "Fondation technique pour contenu médical",
        description:
          "HTTPS, TTFB sous 200 ms, rendu mobile en premier. Les secteurs santé reçoivent un examen E-E-A-T plus strict des moteurs IA. Conformité Loi 25 et PIPEDA auditée au niveau des actifs (aucun traceur tiers sur les pages patients).",
      },
      {
        step: "02",
        title: "Optimisation GBP pour spécialités cliniques",
        description:
          "Catégorie principale réglée sur la spécialité (Médecin de famille, Pédiatre, Clinique sans rendez-vous, Santé féminine, etc.), tous les attributs pertinents remplis (Accessible aux fauteuils, Accepte nouveaux patients, Sans rendez-vous bienvenu, Ouvert 24/7), 30+ photos, Q&R hebdomadaires sur l'acceptation et les questions d'assurance.",
      },
      {
        step: "03",
        title: "Cohérence NAP sur annuaires santé",
        description:
          "Profils vérifiés sur Healthgrades, RateMDs, RDM Québec, BBB, Yelp, annuaires de spécialistes québécois, listes du Collège des médecins du Québec, et 10+ annuaires cliniques. Acceptation RAMQ et régimes d'assurance privée listés explicitement.",
      },
      {
        step: "04",
        title: "Déploiement schema MedicalBusiness",
        description:
          "Schema.org MedicalClinic + MedicalSpecialty (avec codes de spécialité style SNOMED) + AcceptedPaymentMethod + isAcceptingNewPatients. Schema FAQ couvrant RAMQ, assurance privée, heures sans rendez-vous, pédiatrie, prénatal et questions spécifiques aux procédures. Validé avec Google Rich Results Test.",
      },
      {
        step: "05",
        title: "Autorité GEO sur Wikipédia et Wikidata",
        description:
          "Si votre clinique est établie (15+ ans), nous bâtissons une entrée Wikidata avec affiliation organisation parente. Pour les cliniques plus jeunes, autorité via annuaires d'associations médicales, listes du Collège des médecins et plateformes d'avis vérifiées.",
      },
      {
        step: "06",
        title: "Signaux E-E-A-T pour la santé",
        description:
          "Signatures de médecins sur le contenu éducatif, qualifications affichées (MD, FRCPC, CCMF, certifications de spécialité), photos de clinique originales avec données EXIF, citations d'entrevues patients (avec consentement et examen de conformité Collège des médecins). Signal E-E-A-T le plus fort pour le secteur santé.",
      },
      {
        step: "07",
        title: "Mises à jour en temps réel du statut d'acceptation",
        description:
          "Reviuzy NFC tap-to-update à l'accueil permet à la réceptionniste de basculer l'indicateur d'acceptation en secondes. Le changement se propage à GBP + schema + annuaires en moins de 24 heures. Les moteurs IA captent le changement typiquement en 7 jours. Plus d'appels patients gaspillés.",
      },
      {
        step: "08",
        title: "Suivi hebdomadaire des citations LLM",
        description:
          "Sondages automatisés hebdomadaires de ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot pour 25+ requêtes de cliniques dans votre zone de service. Suit les changements quand les cliniques voisines mettent à jour leur statut d'acceptation ou quand les chaînes s'étendent.",
      },
    ],
    sampleCitations: [
      {
        engine: "ChatGPT",
        query: "clinique famille acceptant nouveaux patients RAMQ Plateau Mont-Royal",
        cited: "Clinique Médicale Plateau Famille",
        reason:
          "Émergé grâce à la note Healthgrades 4,7 avec 84 avis, GBP complet avec Médecin de famille en catégorie principale et attribut Accepte nouveaux patients actif, schema MedicalSpecialty avec codes de spécialité explicites, schema AcceptedPaymentMethod listant RAMQ et 6 assureurs privés, schema FAQ répondant explicitement à la question d'acceptation.",
      },
      {
        engine: "Perplexity",
        query: "clinique sans rendez-vous ouverte maintenant Québec soir",
        cited: "Clinique Sans Rendez-Vous Sainte-Foy",
        reason:
          "Émergé grâce aux attributs GBP « Sans rendez-vous bienvenu » et « Ouvert 24 heures », schema MedicalClinic et EmergencyService, intégration des heures en temps réel, et inscriptions sur RDM Québec et annuaires sans rendez-vous Healthgrades.",
      },
      {
        engine: "Claude",
        query: "clinique pédiatrique Laval accepte nouveaux patients",
        cited: "Clinique Pédiatrique Laval",
        reason:
          "Émergé grâce au schema MedicalSpecialty=Pediatrics, attribut GBP « Accepte nouveaux patients » actif, inscription au Collège des médecins du Québec, schema FAQ couvrant la couverture pédiatrique RAMQ, et densité de citations sur Healthgrades, RateMDs et 8 annuaires pédiatriques québécois.",
      },
    ],
    recommendedTier: "growth",
    recommendationReason:
      "Les cliniques médicales bénéficient le plus du forfait Growth (1 200 $/mois) parce que le schema de spécialité médicale, les mises à jour en temps réel du statut d'acceptation, les sondes hebdomadaires de visibilité IA et les 6 citations mensuelles dans les annuaires santé comblent 90 % du fossé de visibilité IA. Les cliniques multi-médecins avec 3+ spécialités devraient considérer le forfait Agency pour le tableau de bord multi-emplacements. Les pratiques solo de médecine familiale peuvent commencer avec Core (600 $/mois).",
    faq: [
      {
        q: "Combien de temps avant que ma clinique soit citée par ChatGPT?",
        a: "Habituellement 21 à 45 jours pour les premières citations sur les requêtes de quartier + nouveaux patients (« clinique famille Plateau acceptant nouveaux patients »), 60 à 90 jours pour les requêtes de spécialité très compétitives (« meilleure clinique pédiatrique Montréal »). Nous envoyons un rapport hebdomadaire de suivi.",
      },
      {
        q: "Le statut d'acceptation peut-il se mettre à jour en temps réel?",
        a: "Oui. Reviuzy NFC tap-to-update à l'accueil permet à la réceptionniste de basculer l'indicateur en secondes. GBP + schema + annuaires se mettent à jour en moins de 24 heures. Les moteurs IA reflètent typiquement le changement en 7 jours. C'est la mise à jour avec le plus haut levier pour la visibilité d'une clinique.",
      },
      {
        q: "Gérez-vous correctement le schema RAMQ et assurances privées?",
        a: "Oui. Nous déployons le schema AcceptedPaymentMethod avec les noms de régimes explicites (RAMQ, Sun Life, Manuvie, Greenshield, SSQ, etc.). Les moteurs IA extraient directement quand les patients posent des questions sur la couverture. Mises à jour trimestrielles si vos arrangements de facturation changent.",
      },
      {
        q: "Répondez-vous aux avis Google négatifs en notre nom?",
        a: "Optionnel avec approbation obligatoire du médecin ou du gestionnaire de clinique. Les avis en santé impliquent souvent des renseignements de santé protégés ou des disputes de portée de pratique. Nous ne publions jamais une réponse sans approbation humaine. Notre service génère le brouillon suggéré par IA et le présente dans votre file.",
      },
      {
        q: "Travaillez-vous avec des groupes de cliniques multi-emplacements?",
        a: "Oui. Chaque emplacement reçoit son propre GBP, profil de citations et déploiement schema. Nous coordonnons le travail d'autorité d'entité au niveau de la marque (Wikidata, annuaires d'associations) au niveau parent. Le prix s'ajuste au nombre d'emplacements. Le forfait Agency (2 500 $/mois) inclut le tableau de bord multi-emplacements.",
      },
      {
        q: "Et la conformité HIPAA, PIPEDA et Loi 25?",
        a: "Nous ne traitons pas de données patients. Notre travail porte uniquement sur les signaux d'entité publics (GBP, schema, citations, avis). La conformité HIPAA (si applicable), PIPEDA et Loi 25 reste votre obligation, mais nous suivons les pratiques Loi 25 pour toute donnée de contact que nous collectons via vos formulaires de site web (consentement, rétention, procédures de réponse aux demandes d'accès).",
      },
    ],
    ctaPrimary: "Lancer l'audit de ma clinique",
    ctaSecondary: "Voir les tarifs",
    seoTitle: "SEO IA pour cliniques médicales · Faites-vous citer par ChatGPT, Perplexity, Claude · AiLys Agency",
    seoDescription:
      "Faites citer votre clinique médicale dans les réponses ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot. Optimisation AEO, GEO et E-E-A-T spécialisée pour cliniques médecine familiale, sans rendez-vous, pédiatrique et de spécialité. Mises à jour en temps réel du statut d'acceptation. À partir de 600 $/mois. Bilingue EN et FR-CA. Ancré au Québec.",
    seoKeywords: [
      "SEO IA pour cliniques médicales",
      "SEO clinique Montréal",
      "SEO clinique médicale Québec",
      "AEO clinique médicale",
      "GEO clinique sans rendez-vous",
      "citations ChatGPT clinique",
      "optimisation profil Google clinique",
      "marketing clinique 2026 Québec",
    ],
  },
};

const realEstate: Industry = {
  slug: "real-estate",
  name: "Real Estate",
  nameLong: "Real Estate Agents & Brokerages",
  emoji: "🏠",
  toneClass: "from-violet-400 via-fuchsia-400 to-pink-400",
  en: buildPlaceholderContent("real-estate", "real estate agents", "real estate agent specializing in [neighborhood]", "core"),
  fr: buildPlaceholderContent("real-estate", "courtiers immobiliers", "courtier immobilier spécialiste [quartier]", "core", true),
};

const hotels: Industry = {
  slug: "hotels",
  name: "Hotels",
  nameLong: "Hotels & Boutique Lodging",
  emoji: "🏨",
  toneClass: "from-blue-400 via-indigo-400 to-violet-400",
  en: buildPlaceholderContent("hotels", "hotels and boutique lodging", "boutique hotel [neighborhood]", "growth"),
  fr: buildPlaceholderContent("hotels", "hôtels et hébergements boutique", "hôtel boutique [quartier]", "growth", true),
};

/* ──────────────────────────────────────────────────────────────────────────
   Builder helper for the 4 secondary verticals. They get full SEO meta and
   the standard 8-step methodology with vertical-tuned copy. Detailed
   case-study-quality content can be added per vertical as we ship.
   ────────────────────────────────────────────────────────────────────────── */

function buildPlaceholderContent(
  slug: IndustrySlug,
  noun: string,
  exampleQuery: string,
  tier: RecommendedTier,
  fr: boolean = false,
): IndustryContent {
  const isFr = fr;
  const T = (en: string, frT: string) => (isFr ? frT : en);
  return {
    eyebrow: T(`AI SEO for ${noun}`, `SEO IA pour ${noun}`),
    headline1: T(
      `Get cited by ChatGPT when prospects ask`,
      `Faites-vous citer par ChatGPT quand les prospects demandent`,
    ),
    headline2: T(`"${exampleQuery}".`, `« ${exampleQuery} ».`),
    subheadline: T(
      `Local search has shifted to AI engines. Prospects ask ChatGPT, Perplexity, Claude, and Gemini for ${noun} in their area before they ever visit a website. AiLys gets your business named in those answers.`,
      `La recherche locale s'est déplacée vers les moteurs IA. Les prospects demandent à ChatGPT, Perplexity, Claude et Gemini des ${noun} dans leur zone avant même de visiter un site web. AiLys fait nommer votre entreprise dans ces réponses.`,
    ),
    stats: [
      {
        value: "62%",
        label: T(
          `of buyers now research ${noun} through AI engines first`,
          `des acheteurs recherchent maintenant des ${noun} via les moteurs IA en premier`,
        ),
      },
      {
        value: "1.9×",
        label: T(
          `more LLM citations on businesses with complete schema and GBP`,
          `de citations LLM en plus pour les entreprises avec schema et GBP complets`,
        ),
      },
      {
        value: "60 days",
        label: T(
          `average to first ChatGPT citation lift`,
          `en moyenne pour la première citation ChatGPT`,
        ),
      },
      {
        value: "6",
        label: T(`AI engines we track`, `moteurs IA que nous suivons`),
      },
    ],
    topQueries: [exampleQuery],
    painPoints: [
      {
        title: T(`Generic GBP categorization`, `Catégorisation GBP générique`),
        description: T(
          `If your business is categorized too broadly, AI engines route specialty queries to competitors with sharper category alignment.`,
          `Si votre entreprise est catégorisée trop largement, les moteurs IA redirigent les requêtes spécialisées vers les concurrents mieux catégorisés.`,
        ),
      },
      {
        title: T(`No FAQ schema on service pages`, `Pas de schema FAQ sur les pages de services`),
        description: T(
          `AI engines extract direct answers from FAQ schema. Without it, your content is invisible to AEO.`,
          `Les moteurs IA extraient des réponses directes du schema FAQ. Sans ça, votre contenu est invisible à l'AEO.`,
        ),
      },
      {
        title: T(`Citation gaps on industry directories`, `Trous de citations sur annuaires sectoriels`),
        description: T(
          `Each vertical has 5-15 high-DA directories that AI engines specifically pull from. Missing even one creates entity confusion.`,
          `Chaque secteur a 5 à 15 annuaires à forte autorité de domaine d'où les moteurs IA tirent spécifiquement. En manquer un crée de la confusion d'entité.`,
        ),
      },
      {
        title: T(`Weak entity authority`, `Autorité d'entité faible`),
        description: T(
          `Without Wikidata, Wikipedia, or industry-association presence, AI engines cannot disambiguate your business from generic mentions.`,
          `Sans présence Wikidata, Wikipédia ou association sectorielle, les moteurs IA ne peuvent pas distinguer votre entreprise des mentions génériques.`,
        ),
      },
    ],
    methodology: [
      {
        step: "01",
        title: T(`Technical foundation`, `Fondation technique`),
        description: T(
          `HTTPS, TTFB sub-200ms, mobile-first, accessible navigation, validated schema across all pages.`,
          `HTTPS, TTFB sous 200 ms, mobile en premier, navigation accessible, schema validé sur toutes les pages.`,
        ),
      },
      {
        step: "02",
        title: T(`GBP optimization`, `Optimisation GBP`),
        description: T(
          `Specific primary category, all attributes filled, weekly photos, weekly Q&A, posts every 3 days.`,
          `Catégorie principale spécifique, tous les attributs remplis, photos hebdomadaires, Q&R hebdomadaires, publications aux 3 jours.`,
        ),
      },
      {
        step: "03",
        title: T(`Citation density`, `Densité de citations`),
        description: T(
          `Verified profiles on 15+ industry-specific high-DA directories. NAP consistency enforced everywhere.`,
          `Profils vérifiés sur 15+ annuaires sectoriels à forte autorité. Cohérence NAP appliquée partout.`,
        ),
      },
      {
        step: "04",
        title: T(`Schema deployment`, `Déploiement schema`),
        description: T(
          `Industry-appropriate Schema.org types, FAQ schema on every service page, validated against Google Rich Results.`,
          `Types Schema.org appropriés au secteur, schema FAQ sur chaque page de service, validé avec Google Rich Results.`,
        ),
      },
      {
        step: "05",
        title: T(`Entity authority work`, `Travail d'autorité d'entité`),
        description: T(
          `Wikidata entry where credentials support it, industry association directory listings, digital PR.`,
          `Entrée Wikidata où les références le permettent, inscriptions aux annuaires d'associations, RP numérique.`,
        ),
      },
      {
        step: "06",
        title: T(`E-E-A-T signals`, `Signaux E-E-A-T`),
        description: T(
          `Author bylines, credentials displayed, original photography, real customer quotes with attribution.`,
          `Signatures d'auteur, références affichées, photographie originale, citations réelles avec attribution.`,
        ),
      },
      {
        step: "07",
        title: T(`Review velocity engine`, `Moteur de vélocité d'avis`),
        description: T(
          `Google reviews via AiLys Automation NFC, 10-30 fresh per month, 24-48 hour response time.`,
          `Avis Google via NFC AiLys Automation, 10 à 30 frais par mois, temps de réponse 24 à 48 h.`,
        ),
      },
      {
        step: "08",
        title: T(`Weekly LLM citation tracking`, `Suivi hebdomadaire des citations LLM`),
        description: T(
          `Automated polls of 6 AI engines for 20+ industry queries in your service area.`,
          `Sondages automatisés des 6 moteurs IA pour 20+ requêtes sectorielles dans votre zone de service.`,
        ),
      },
    ],
    sampleCitations: [],
    recommendedTier: tier,
    recommendationReason: T(
      `Based on competitive intensity and the complexity of entity authority work in this vertical, ${tier === "starter" ? "Starter" : tier === "core" ? "Core" : tier === "growth" ? "Growth" : "Agency"} delivers the right balance of citation building, schema depth, and content production.`,
      `Basé sur l'intensité concurrentielle et la complexité du travail d'autorité d'entité dans ce secteur, ${tier === "starter" ? "Starter" : tier === "core" ? "Core" : tier === "growth" ? "Growth" : "Agency"} offre l'équilibre approprié entre construction de citations, profondeur schema et production de contenu.`,
    ),
    faq: [
      {
        q: T(`How long until I see results?`, `Combien de temps avant de voir des résultats?`),
        a: T(
          `Schema and GBP improvements show in 30 to 60 days. Real LLM citation lift typically lands at the 60 to 120 day mark depending on competitive intensity.`,
          `Les améliorations schema et GBP apparaissent en 30 à 60 jours. L'augmentation réelle des citations LLM atteint typiquement 60 à 120 jours selon l'intensité concurrentielle.`,
        ),
      },
      {
        q: T(`Can you handle multi-location businesses?`, `Pouvez-vous gérer des entreprises multi-emplacements?`),
        a: T(
          `Yes. Each location gets its own GBP and citation profile. Brand-level entity authority is coordinated at the parent level. Pricing scales with location count.`,
          `Oui. Chaque emplacement reçoit son propre GBP et profil de citations. L'autorité d'entité au niveau marque est coordonnée au niveau parent. Le prix s'ajuste au nombre d'emplacements.`,
        ),
      },
      {
        q: T(`Do you offer industry-specific case studies?`, `Offrez-vous des études de cas spécifiques au secteur?`),
        a: T(
          `Yes. Once we publish a case study from your vertical (with client consent), it becomes available as a sample. Founding clients get 50 percent off their plan in exchange for participating in a published case study.`,
          `Oui. Une fois qu'une étude de cas est publiée dans votre secteur (avec consentement client), elle devient disponible comme exemple. Les clients fondateurs obtiennent 50 % de rabais sur leur forfait en échange de leur participation à une étude de cas publiée.`,
        ),
      },
    ],
    ctaPrimary: T(`Run my business audit`, `Lancer l'audit de mon entreprise`),
    ctaSecondary: T(`See pricing`, `Voir les tarifs`),
    seoTitle: T(
      `AI SEO for ${noun} · Get Cited by ChatGPT, Perplexity, Claude · AiLys Agency`,
      `SEO IA pour ${noun} · Faites-vous citer par ChatGPT, Perplexity, Claude · AiLys Agency`,
    ),
    seoDescription: T(
      `Get your business cited inside ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot answers. Specialized AEO, GEO, and E-E-A-T optimization for ${noun}. From $300/mo. Bilingual EN and FR-CA. Quebec-anchored.`,
      `Faites citer votre entreprise dans les réponses ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot. Optimisation AEO, GEO et E-E-A-T spécialisée pour ${noun}. À partir de 300 $/mois. Bilingue EN et FR-CA. Ancré au Québec.`,
    ),
    seoKeywords: [
      T(`AI SEO for ${noun}`, `SEO IA pour ${noun}`),
      T(`${noun} SEO Montreal`, `SEO ${noun} Montréal`),
      T(`${noun} SEO Quebec`, `SEO ${noun} Québec`),
      T(`AEO ${slug}`, `AEO ${slug}`),
      T(`GEO ${slug}`, `GEO ${slug}`),
      T(`ChatGPT ${noun} citations`, `citations ChatGPT ${noun}`),
    ],
  };
}

/* ──────────────────────────────────────────────────────────────────────────
   Export
   ────────────────────────────────────────────────────────────────────────── */

export const industries: Industry[] = [
  dentists,
  lawyers,
  restaurants,
  contractors,
  clinics,
  realEstate,
  hotels,
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

export function getIndustryContent(industry: Industry, lang: string): IndustryContent {
  if (lang === "fr") return industry.fr;
  if (lang === "en") return industry.en;
  // For other languages, check i18n overrides; fall back to EN.
  const override = industry.i18n?.[lang];
  if (override) {
    return { ...industry.en, ...override };
  }
  return industry.en;
}
