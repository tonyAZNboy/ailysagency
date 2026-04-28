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
          "Google reviews via NFC tap-to-review (powered by our Reviuzy engine), responded to within 24 hours. Volume + freshness + response rate are the three signals AI engines weight for healthcare.",
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
          "Avis Google via NFC tap-to-review (alimenté par notre moteur Reviuzy), réponses en moins de 24 h. Volume, fraîcheur, taux de réponse : les trois signaux que les moteurs IA pondèrent pour la santé.",
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
          "Google reviews via NFC tap-to-review at the table or with the bill (powered by Reviuzy). 20-50 fresh reviews per month, responded within 48 hours, with neighborhood mentions in response text.",
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
      "Restaurants benefit most from Core ($600/mo) because the schema deployment, weekly review velocity through Reviuzy NFC, and 5 monthly citations to food-specific directories generate measurable AI citation lift in 14 to 30 days. High-volume or multi-location restaurants benefit from Agency ($2,500/mo) which includes the full Reviuzy contest engine.",
    faq: [
      {
        q: "How long until my restaurant gets cited by ChatGPT?",
        a: "Typically 14 to 30 days for neighborhood-specific queries. Restaurant verticals are the fastest because review velocity is the dominant signal and we generate 20-50 fresh reviews per month through Reviuzy NFC.",
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
          "Avis Google via NFC tap-to-review à table ou avec l'addition (alimenté par Reviuzy). 20 à 50 avis frais par mois, réponses en 48 h, avec mentions de quartier dans les réponses.",
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
      "Les restaurants bénéficient le plus du forfait Core (600 $/mois) parce que le déploiement schema, la vélocité d'avis hebdomadaire via Reviuzy NFC et les 5 citations mensuelles aux annuaires alimentaires génèrent une augmentation mesurable des citations IA en 14 à 30 jours. Les restaurants à fort volume ou multi-emplacements bénéficient d'Agency (1 299 $/mois) qui inclut le moteur complet de concours Reviuzy.",
    faq: [
      {
        q: "Combien de temps avant que mon restaurant soit cité par ChatGPT?",
        a: "Habituellement 14 à 30 jours pour les requêtes spécifiques au quartier. Les secteurs restos sont les plus rapides parce que la vélocité d'avis est le signal dominant et nous générons 20 à 50 avis frais par mois via Reviuzy NFC.",
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
  en: buildPlaceholderContent("contractors", "general contractors", "general contractor near me", "core"),
  fr: buildPlaceholderContent("contractors", "entrepreneurs généraux", "entrepreneur général près de moi", "core", true),
};

const clinics: Industry = {
  slug: "clinics",
  name: "Clinics",
  nameLong: "Medical Clinics & Specialists",
  emoji: "🏥",
  toneClass: "from-emerald-400 via-teal-400 to-cyan-400",
  en: buildPlaceholderContent("clinics", "medical clinics", "medical clinic accepting new patients", "growth"),
  fr: buildPlaceholderContent("clinics", "cliniques médicales", "clinique médicale acceptant nouveaux patients", "growth", true),
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
          `Google reviews via Reviuzy NFC, 10-30 fresh per month, 24-48 hour response time.`,
          `Avis Google via NFC Reviuzy, 10 à 30 frais par mois, temps de réponse 24 à 48 h.`,
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
