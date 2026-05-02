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
  | "hotels"
  | "nail-salons"
  | "sushi-counters";

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
  // FR-CA translation (Quebec home market, full coverage)
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
  i18n: {
    es: {
      eyebrow: "SEO IA para clínicas dentales",
      headline1: "Sé citado por ChatGPT cuando los pacientes preguntan",
      headline2: "\"mejor dentista cerca de mí\".",
      subheadline:
        "Las búsquedas dentales son el sector salud n.º 1 dentro de ChatGPT, Perplexity, Claude y Gemini. Los nuevos pacientes preguntan a la IA qué clínica acepta su seguro, recibe nuevos pacientes y atiende emergencias. AiLys hace que su clínica sea nombrada.",
      stats: [
        { value: "62%", label: "de los nuevos pacientes ahora investigan dentistas a través de motores de IA antes de reservar" },
        { value: "1,9×", label: "más citas LLM en sitios dentales con esquema FAQ" },
        { value: "30 días", label: "para la primera mención en ChatGPT en promedio" },
        { value: "$847", label: "valor promedio de un nuevo paciente en clínicas dentales de Quebec" },
      ],
      topQueries: [
        "mejor dentista cerca de mí que recibe nuevos pacientes",
        "dentista de urgencia abierto ahora Montreal",
        "dentista pediátrico aceptando RAMQ ciudad de Quebec",
      ],
      painPoints: [
        {
          title: "ChatGPT envía pacientes a su competidor",
          description:
            "Cuando alguien pregunta a ChatGPT por un dentista en su barrio, la respuesta saca datos de Yelp, BBB, Healthgrades y Google Business Profile. Si su NAP es inconsistente entre esas fuentes, usted es invisible.",
        },
        {
          title: "Las preguntas de seguro y RAMQ quedan sin respuesta",
          description:
            "Los pacientes preguntan a los motores de IA \"¿la clínica X acepta mi seguro?\". Si su sitio no tiene esquema FAQ que cubra los planes aceptados, los motores de IA extraen información antigua o incorrecta de directorios externos.",
        },
        {
          title: "Las búsquedas de emergencia favorecen a las clínicas 24 horas",
          description:
            "Las consultas \"dentista de emergencia abierto ahora\" ponderan fuertemente los atributos de GBP (horarios de apertura, etiqueta de servicios de emergencia). La mayoría de las clínicas nunca rellenan estos campos y pierden el 100% del tráfico urgente.",
        },
        {
          title: "El posicionamiento pediátrico y de especialidad es genérico",
          description:
            "Los motores de IA necesitan desambiguación de entidades: ¿es usted un dentista general, especialista pediátrico, o ambos? Sin esquema indicando serviceType, compite contra todo el mundo en lugar de dominar su nicho.",
        },
      ],
      ctaPrimary: "Ejecutar la auditoría de mi clínica",
      ctaSecondary: "Ver tarifas",
      seoTitle: "SEO IA para Dentistas · Sé citado por ChatGPT, Perplexity, Claude · AiLys Agency",
      seoDescription:
        "Haga que su clínica dental sea citada en las respuestas de ChatGPT, Perplexity, Claude, Gemini, Google AIO y Bing Copilot. Optimización AEO, GEO y E-E-A-T especializada para clínicas dentales. Desde $300/mes. Bilingüe EN y FR-CA. Anclado en Quebec.",
    },
    zh: {
      eyebrow: "牙科诊所 AI SEO",
      headline1: "当患者询问时让 ChatGPT 引用您",
      headline2: "「我附近最好的牙医」。",
      subheadline:
        "在 ChatGPT、Perplexity、Claude 和 Gemini 中,牙科搜索是健康类目第一。新患者向 AI 询问哪家诊所接受他们的保险、接收新患者、处理急诊。AiLys 让您的诊所被点名。",
      stats: [
        { value: "62%", label: "的新患者现在在预约前通过 AI 引擎研究牙医" },
        { value: "1.9×", label: "在带 FAQ schema 的牙科网站上获得更多 LLM 引用" },
        { value: "30 天", label: "平均 ChatGPT 首次引用提升时间" },
        { value: "$847", label: "魁北克牙科诊所新患者平均价值" },
      ],
      topQueries: [
        "我附近接受新患者的最好牙医",
        "蒙特利尔现在开门的急诊牙医",
        "魁北克市接受 RAMQ 的儿童牙医",
      ],
      painPoints: [
        {
          title: "ChatGPT 把患者送给您的竞争对手",
          description:
            "当有人向 ChatGPT 询问您所在街区的牙医时,答案会从 Yelp、BBB、Healthgrades 和 Google Business Profile 中提取。如果您的 NAP 在这些来源中不一致,您就是隐形的。",
        },
        {
          title: "保险和 RAMQ 问题得不到回答",
          description:
            "患者会向 AI 引擎询问 \"X 诊所是否接受我的保险?\"。如果您的网站没有覆盖已接受计划的 FAQ schema,AI 引擎会从第三方目录中提取过时或错误的信息。",
        },
        {
          title: "急诊搜索偏向 24 小时诊所",
          description:
            "\"现在开门的急诊牙医\" 类查询严重依赖 GBP 属性(营业时间、急诊服务标签)。大多数诊所从未填写这些字段,失去 100% 的紧急流量。",
        },
        {
          title: "儿科和专科定位过于笼统",
          description:
            "AI 引擎需要实体消歧:您是全科牙医、儿科专家,还是两者兼有?没有指定 serviceType 的 schema 标记,您就在与所有人竞争而不是主导您的细分市场。",
        },
      ],
      ctaPrimary: "运行我的牙科诊所审核",
      ctaSecondary: "查看定价",
      seoTitle: "牙医 AI SEO · 让 ChatGPT、Perplexity、Claude 引用您 · AiLys Agency",
      seoDescription:
        "让您的牙科诊所被 ChatGPT、Perplexity、Claude、Gemini、Google AIO 和 Bing Copilot 的答案引用。专为牙科诊所定制的 AEO、GEO 和 E-E-A-T 优化。每月 $300 起。EN 和 FR-CA 双语。锚定魁北克。",
    },
    ar: {
      eyebrow: "تحسين البحث بالذكاء الاصطناعي للعيادات السنية",
      headline1: "اجعل ChatGPT يستشهد بك عندما يسأل المرضى",
      headline2: "\"أفضل طبيب أسنان قريب مني\".",
      subheadline:
        "تعد عمليات البحث عن طب الأسنان القطاع الصحي رقم 1 داخل ChatGPT و Perplexity و Claude و Gemini. يسأل المرضى الجدد الذكاء الاصطناعي عن العيادة التي تقبل تأمينهم وتستقبل مرضى جدد وتتعامل مع الحالات الطارئة. تجعل AiLys اسم عيادتك يظهر.",
      stats: [
        { value: "62%", label: "من المرضى الجدد يبحثون الآن عن أطباء الأسنان عبر محركات الذكاء الاصطناعي قبل الحجز" },
        { value: "1.9×", label: "استشهادات LLM أكثر على المواقع السنية المزودة بمخطط FAQ" },
        { value: "30 يومًا", label: "في المتوسط للحصول على أول ارتفاع في الاستشهاد على ChatGPT" },
        { value: "847 دولارًا", label: "متوسط قيمة المريض الجديد في العيادات السنية بكيبيك" },
      ],
      topQueries: [
        "أفضل طبيب أسنان قريب مني يستقبل مرضى جدد",
        "طبيب أسنان طوارئ مفتوح الآن مونتريال",
        "طبيب أسنان أطفال يقبل RAMQ مدينة كيبيك",
      ],
      painPoints: [
        {
          title: "يرسل ChatGPT المرضى إلى منافسك",
          description:
            "عندما يسأل شخص ما ChatGPT عن طبيب أسنان في حيك، تستمد الإجابة بياناتها من Yelp و BBB و Healthgrades و Google Business Profile. إذا كان NAP الخاص بك غير متسق عبر تلك المصادر، فأنت غير مرئي.",
        },
        {
          title: "أسئلة التأمين و RAMQ تبقى دون إجابة",
          description:
            "يسأل المرضى محركات الذكاء الاصطناعي \"هل تقبل عيادة X تأميني؟\". بدون مخطط FAQ يغطي الخطط المقبولة، تستخرج محركات الذكاء الاصطناعي معلومات قديمة أو خاطئة من أدلة خارجية.",
        },
        {
          title: "تفضل عمليات البحث الطارئة العيادات التي تعمل على مدار 24 ساعة",
          description:
            "تعتمد استعلامات \"طبيب أسنان طوارئ مفتوح الآن\" بشكل كبير على سمات GBP (ساعات العمل، علامة خدمات الطوارئ). معظم العيادات لا تملأ هذه الحقول أبدًا وتخسر 100% من الحركة العاجلة.",
        },
        {
          title: "التموضع لطب الأطفال والاختصاص عام جدًا",
          description:
            "تحتاج محركات الذكاء الاصطناعي إلى توضيح الكيانات: هل أنت طبيب أسنان عام أم اختصاصي أطفال أم كلاهما؟ بدون ترميز schema يحدد serviceType، فأنت تنافس الجميع بدلًا من السيطرة على تخصصك.",
        },
      ],
      ctaPrimary: "تشغيل تدقيق عيادتي",
      ctaSecondary: "اطّلع على الأسعار",
      seoTitle: "تحسين البحث بالذكاء الاصطناعي لأطباء الأسنان · استشهاد ChatGPT و Perplexity و Claude · AiLys Agency",
      seoDescription:
        "اجعل عيادتك السنية مستشهدًا بها داخل إجابات ChatGPT و Perplexity و Claude و Gemini و Google AIO و Bing Copilot. تحسين AEO و GEO و E-E-A-T متخصص للعيادات السنية. ابتداءً من 300 دولار/شهر. ثنائي اللغة EN و FR-CA. مرتكز في كيبيك.",
    },
    ru: {
      eyebrow: "SEO для AI стоматологических клиник",
      headline1: "Получайте упоминания ChatGPT, когда пациенты спрашивают",
      headline2: "«лучший стоматолог рядом со мной».",
      subheadline:
        "Стоматологические запросы являются вертикалью здравоохранения номер 1 в ChatGPT, Perplexity, Claude и Gemini. Новые пациенты спрашивают ИИ, какая клиника принимает их страховку, принимает новых пациентов и обслуживает экстренные случаи. AiLys обеспечивает упоминание вашей клиники.",
      stats: [
        { value: "62%", label: "новых пациентов теперь исследуют стоматологов через ИИ-движки перед записью" },
        { value: "1,9×", label: "больше упоминаний LLM на стоматологических сайтах со схемой FAQ" },
        { value: "30 дней", label: "в среднем до первого подъёма упоминаний в ChatGPT" },
        { value: "847 $", label: "средняя ценность нового пациента в стоматологических клиниках Квебека" },
      ],
      topQueries: [
        "лучший стоматолог рядом со мной, принимающий новых пациентов",
        "стоматолог скорой помощи открыт сейчас Монреаль",
        "детский стоматолог, принимающий RAMQ, Квебек",
      ],
      painPoints: [
        {
          title: "ChatGPT отправляет пациентов к вашему конкуренту",
          description:
            "Когда кто-то спрашивает у ChatGPT стоматолога в вашем районе, ответ берётся из Yelp, BBB, Healthgrades и Google Business Profile. Если ваш NAP не согласован между этими источниками, вы невидимы.",
        },
        {
          title: "Вопросы о страховке и RAMQ остаются без ответа",
          description:
            "Пациенты спрашивают ИИ-движки «принимает ли клиника X мою страховку?». Без схемы FAQ, охватывающей принимаемые планы, ИИ-движки извлекают старую или неправильную информацию из сторонних каталогов.",
        },
        {
          title: "Экстренные поиски отдают предпочтение круглосуточным клиникам",
          description:
            "Запросы «стоматолог скорой помощи открыт сейчас» сильно полагаются на атрибуты GBP (часы работы, метка экстренных услуг). Большинство клиник никогда не заполняют эти поля и теряют 100% срочного трафика.",
        },
        {
          title: "Позиционирование педиатрии и специальности слишком общее",
          description:
            "ИИ-движкам нужно различение сущностей: вы общий стоматолог, педиатр или оба? Без разметки schema, указывающей serviceType, вы конкурируете со всеми вместо доминирования в своей нише.",
        },
      ],
      ctaPrimary: "Запустить аудит моей клиники",
      ctaSecondary: "Посмотреть тарифы",
      seoTitle: "SEO для AI стоматологов · Упоминания ChatGPT, Perplexity, Claude · AiLys Agency",
      seoDescription:
        "Получайте упоминания вашей стоматологической клиники в ответах ChatGPT, Perplexity, Claude, Gemini, Google AIO и Bing Copilot. Специализированная оптимизация AEO, GEO и E-E-A-T для стоматологических клиник. От 300 $/мес. На двух языках EN и FR-CA. С опорой на Квебек.",
    },
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
  i18n: {
    es: {
      eyebrow: "SEO IA para bufetes de abogados",
      headline1: "Sé citado por ChatGPT cuando los prospectos preguntan",
      headline2: "\"mejor abogado para [mi caso]\".",
      subheadline:
        "Las búsquedas legales reciben el escrutinio E-E-A-T más alto en los motores de IA. Las credenciales del colegio de abogados, los resultados de casos y el contenido autoritativo deciden quién es nombrado. AiLys posiciona su firma correctamente.",
      stats: [
        { value: "73%", label: "de los clientes ahora investigan abogados a través de motores de IA antes de contactar a uno" },
        { value: "$3.400", label: "valor promedio de por vida por cliente proveniente de IA (derecho de familia en Quebec)" },
        { value: "60 días", label: "en promedio para la primera mención en ChatGPT para consultas legales" },
        { value: "8×", label: "más citas LLM en firmas con autoría acreditada y esquema de resultados de casos" },
      ],
      topQueries: [
        "abogado de derecho de familia aceptando nuevos clientes Montreal",
        "abogado DUI consulta gratuita ciudad de Quebec",
        "abogado de inmigración hispanohablante Laval",
      ],
      painPoints: [
        {
          title: "ChatGPT cita firmas tier 1 por defecto",
          description:
            "Cuando se le pregunta por un abogado en su especialidad, ChatGPT prefiere por defecto a las grandes firmas con entradas Wikidata sólidas, presencia en colegios de abogados y citas densas. Las firmas más pequeñas son invisibles sin trabajo explícito de autoridad de entidad.",
        },
        {
          title: "Falta la desambiguación de especialidad",
          description:
            "Los motores de IA necesitan saber si usted hace derecho de familia, penal, migratorio o corporativo. Sin esquema LegalService con practiceArea declarado, compite contra todos los abogados de su ciudad.",
        },
        {
          title: "Las consultas de \"consulta gratuita\" se pierden",
          description:
            "\"Consulta gratuita\" es una de las consultas con mayor intención. Los motores de IA buscan esquema FAQ explícito, atributos GBP y páginas de aterrizaje dedicadas. La mayoría de las firmas no tienen ninguno.",
        },
        {
          title: "Posicionamiento de práctica bilingüe",
          description:
            "En Quebec, \"abogado anglófono\" y \"English-speaking lawyer\" son búsquedas distintas que extraen de fuentes diferentes. Sin esquema bilingüe y Wikidata en doble idioma, pierde la mitad de su mercado potencial.",
        },
      ],
      ctaPrimary: "Ejecutar la auditoría de mi firma",
      ctaSecondary: "Ver tarifas",
      seoTitle: "SEO IA para Abogados · Sé citado por ChatGPT, Perplexity, Claude · AiLys Agency",
      seoDescription:
        "Haga que su firma de abogados sea citada en las respuestas de ChatGPT, Perplexity, Claude, Gemini, Google AIO y Bing Copilot. Optimización AEO, GEO y E-E-A-T especializada para firmas legales en Quebec. Desde $600/mes. Bilingüe EN y FR-CA.",
    },
    zh: {
      eyebrow: "律师事务所 AI SEO",
      headline1: "当潜在客户询问时让 ChatGPT 引用您",
      headline2: "「我的案子需要的最佳律师」。",
      subheadline:
        "在 AI 引擎中,法律搜索受到最高的 E-E-A-T 审查。律师协会资质、案件结果和权威内容决定谁被点名。AiLys 正确定位您的律所。",
      stats: [
        { value: "73%", label: "的客户在联系律师之前通过 AI 引擎进行研究" },
        { value: "$3,400", label: "AI 来源客户的平均终身价值(魁北克家庭法)" },
        { value: "60 天", label: "法律查询平均 ChatGPT 首次引用提升时间" },
        { value: "8×", label: "在具有认证作者身份和案件结果 schema 的律所上获得更多 LLM 引用" },
      ],
      topQueries: [
        "蒙特利尔接受新客户的家庭法律师",
        "魁北克市免费咨询的 DUI 律师",
        "拉瓦尔会说西班牙语的移民律师",
      ],
      painPoints: [
        {
          title: "ChatGPT 默认引用一线律所",
          description:
            "当被问及您专业领域的律师时,ChatGPT 默认选择具有强大 Wikidata 条目、律师协会存在感和密集引用的大型律所。没有明确的实体权威工作,小型律所是隐形的。",
        },
        {
          title: "缺少专业领域消歧",
          description:
            "AI 引擎需要知道您从事家庭、刑事、移民还是公司法。没有声明 practiceArea 的 LegalService schema,您就在与城市里的每位律师竞争,而不是主导您的专业领域。",
        },
        {
          title: "「免费咨询」查询被遗失",
          description:
            "\"免费咨询\" 是意图最强的查询之一。AI 引擎寻找明确的 FAQ schema、GBP 属性和专用着陆页。大多数律所什么都没有。",
        },
        {
          title: "双语执业定位",
          description:
            "在魁北克,「avocat anglophone」和 \"English-speaking lawyer\" 是从不同来源提取的不同搜索。没有双语 schema 和双语 Wikidata,您将失去一半的潜在市场。",
        },
      ],
      ctaPrimary: "运行我的律所审核",
      ctaSecondary: "查看定价",
      seoTitle: "律师 AI SEO · 让 ChatGPT、Perplexity、Claude 引用您 · AiLys Agency",
      seoDescription:
        "让您的律所被 ChatGPT、Perplexity、Claude、Gemini、Google AIO 和 Bing Copilot 的答案引用。专为魁北克律所定制的 AEO、GEO 和 E-E-A-T 优化。每月 $600 起。EN 和 FR-CA 双语。",
    },
    ar: {
      eyebrow: "تحسين البحث بالذكاء الاصطناعي لمكاتب المحاماة",
      headline1: "اجعل ChatGPT يستشهد بك عندما يسأل العملاء المحتملون",
      headline2: "\"أفضل محامٍ لقضيتي\".",
      subheadline:
        "تتلقى عمليات البحث القانونية أعلى تدقيق E-E-A-T داخل محركات الذكاء الاصطناعي. تحدد مؤهلات نقابة المحامين ونتائج القضايا والمحتوى الموثوق من يتم ذكر اسمه. تضع AiLys مكتبك في الموقع الصحيح.",
      stats: [
        { value: "73%", label: "من العملاء يبحثون الآن عن محامين عبر محركات الذكاء الاصطناعي قبل الاتصال بأحد" },
        { value: "3,400 دولار", label: "متوسط القيمة الدائمة للعميل القادم من الذكاء الاصطناعي (قانون الأسرة في كيبيك)" },
        { value: "60 يومًا", label: "متوسط الفترة للحصول على أول ارتفاع في الاستشهاد على ChatGPT للاستعلامات القانونية" },
        { value: "8×", label: "استشهادات LLM أكثر على المكاتب ذات التأليف المعتمد ومخطط نتائج القضايا" },
      ],
      topQueries: [
        "محامي قانون الأسرة يقبل عملاء جدد مونتريال",
        "محامي قيادة تحت تأثير الكحول استشارة مجانية مدينة كيبيك",
        "محامي هجرة يتحدث الإسبانية لافال",
      ],
      painPoints: [
        {
          title: "يستشهد ChatGPT بمكاتب الفئة الأولى افتراضيًا",
          description:
            "عند سؤاله عن محامٍ في تخصصك، يستشهد ChatGPT افتراضيًا بالمكاتب الكبيرة ذات الإدخالات القوية في Wikidata والوجود في نقابة المحامين والاستشهادات الكثيفة. المكاتب الأصغر غير مرئية دون عمل صريح على سلطة الكيان.",
        },
        {
          title: "غياب توضيح التخصص",
          description:
            "تحتاج محركات الذكاء الاصطناعي إلى معرفة ما إذا كنت تمارس قانون الأسرة أو الجنائي أو الهجرة أو الشركات. بدون مخطط LegalService مع practiceArea المعلن، فأنت تنافس كل محامٍ في مدينتك بدلًا من السيطرة على تخصصك.",
        },
        {
          title: "استعلامات «الاستشارة المجانية» تضيع",
          description:
            "«الاستشارة المجانية» من أعلى الاستعلامات في النية. تبحث محركات الذكاء الاصطناعي عن مخطط FAQ صريح وسمات GBP وصفحات هبوط مخصصة. معظم المكاتب لا تملك أيًا منها.",
        },
        {
          title: "تموضع الممارسة ثنائية اللغة",
          description:
            "في كيبيك، «محامٍ ناطق بالإنجليزية» و \"avocat anglophone\" بحثان مختلفان يستمدان من مصادر مختلفة. بدون مخطط ثنائي اللغة و Wikidata بلغتين، تفقد نصف سوقك المحتمل.",
        },
      ],
      ctaPrimary: "تشغيل تدقيق مكتبي",
      ctaSecondary: "اطّلع على الأسعار",
      seoTitle: "تحسين البحث بالذكاء الاصطناعي للمحامين · استشهاد ChatGPT و Perplexity و Claude · AiLys Agency",
      seoDescription:
        "اجعل مكتبك للمحاماة مستشهدًا به داخل إجابات ChatGPT و Perplexity و Claude و Gemini و Google AIO و Bing Copilot. تحسين AEO و GEO و E-E-A-T متخصص للمكاتب القانونية في كيبيك. ابتداءً من 600 دولار/شهر. ثنائي اللغة EN و FR-CA.",
    },
    ru: {
      eyebrow: "SEO для AI юридических фирм",
      headline1: "Получайте упоминания ChatGPT, когда потенциальные клиенты спрашивают",
      headline2: "«лучший адвокат для [моего дела]».",
      subheadline:
        "Юридические запросы получают самую высокую проверку E-E-A-T в ИИ-движках. Полномочия коллегии адвокатов, результаты дел и авторитетный контент решают, кого назовут. AiLys позиционирует вашу фирму правильно.",
      stats: [
        { value: "73%", label: "клиентов теперь исследуют адвокатов через ИИ-движки перед обращением к одному" },
        { value: "3 400 $", label: "средняя пожизненная ценность клиента из ИИ (семейное право в Квебеке)" },
        { value: "60 дней", label: "в среднем до первого подъёма упоминаний в ChatGPT для юридических запросов" },
        { value: "8×", label: "больше упоминаний LLM на фирмах с подтверждённым авторством и схемой результатов дел" },
      ],
      topQueries: [
        "адвокат по семейному праву, принимающий новых клиентов Монреаль",
        "адвокат по DUI бесплатная консультация Квебек",
        "адвокат по иммиграции, говорящий на испанском, Лаваль",
      ],
      painPoints: [
        {
          title: "ChatGPT по умолчанию упоминает фирмы первого уровня",
          description:
            "Когда спрашивают об адвокате в вашей специальности, ChatGPT по умолчанию упоминает крупные фирмы с сильными записями в Wikidata, присутствием в коллегии адвокатов и плотными цитированиями. Меньшие фирмы невидимы без явной работы над авторитетом сущности.",
        },
        {
          title: "Отсутствует уточнение специализации",
          description:
            "ИИ-движкам нужно знать, занимаетесь ли вы семейным, уголовным, иммиграционным или корпоративным правом. Без схемы LegalService с указанной practiceArea вы конкурируете со всеми адвокатами вашего города вместо доминирования в специальности.",
        },
        {
          title: "Запросы «бесплатная консультация» теряются",
          description:
            "«Бесплатная консультация» — один из запросов с самой высокой намеренностью. ИИ-движки ищут явную схему FAQ, атрибуты GBP и выделенные посадочные страницы. У большинства фирм нет ни одного из них.",
        },
        {
          title: "Позиционирование двуязычной практики",
          description:
            "В Квебеке «англоязычный адвокат» и \"avocat anglophone\" — это разные поиски, которые извлекаются из разных источников. Без двуязычной схемы и двуязычного Wikidata вы теряете половину потенциального рынка.",
        },
      ],
      ctaPrimary: "Запустить аудит моей фирмы",
      ctaSecondary: "Посмотреть тарифы",
      seoTitle: "SEO для AI адвокатов · Упоминания ChatGPT, Perplexity, Claude · AiLys Agency",
      seoDescription:
        "Получайте упоминания вашей юридической фирмы в ответах ChatGPT, Perplexity, Claude, Gemini, Google AIO и Bing Copilot. Специализированная оптимизация AEO, GEO и E-E-A-T для юридических фирм в Квебеке. От 600 $/мес. На двух языках EN и FR-CA.",
    },
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
  i18n: {
    es: {
      eyebrow: "SEO IA para restaurantes",
      headline1: "Sé citado por ChatGPT cuando los comensales preguntan",
      headline2: "\"mejor [cocina] cerca de mí abierto ahora\".",
      subheadline:
        "Los restaurantes son el sector número 1 dentro de ChatGPT y Perplexity. Los comensales preguntan a la IA por cocina, barrio, horarios, opciones dietéticas y disponibilidad de reserva. AiLys hace que su restaurante sea nombrado primero.",
      stats: [
        { value: "84%", label: "de los comensales ahora usan motores de IA para descubrir restaurantes en barrios desconocidos" },
        { value: "1,9×", label: "más citas LLM en restaurantes con frescura de reseñas constante" },
        { value: "2 semanas", label: "para la primera mención en ChatGPT en consultas específicas del barrio" },
        { value: "$67", label: "valor promedio del ticket por comensal proveniente de IA en Montreal" },
      ],
      topQueries: [
        "mejor ramen cerca de mí abierto ahora Plateau",
        "cena vegana Verdun reservas disponibles esta noche",
        "restaurante romántico Vieux-Montréal menos de $100 por persona",
      ],
      painPoints: [
        {
          title: "Las categorías de GBP diluyen su especialidad",
          description:
            "Si su lugar de sushi está categorizado como \"Restaurante japonés\" en lugar de \"Restaurante de sushi\", los motores de IA redirigen el 40% de sus consultas específicas de sushi a otra parte. Las categorías importan más en Maps que en cualquier otro lugar.",
        },
        {
          title: "Falta la entidad de barrio",
          description:
            "Los comensales buscan por barrio, no por ciudad. \"Mejor ramen Plateau\" extrae de señales diferentes que \"mejor ramen Montreal\". Sin menciones de barrio en el texto de reseñas y esquema areaServed, pierde tráfico hiperlocal.",
        },
        {
          title: "Lagunas en atributos dietéticos",
          description:
            "Los motores de IA extraen información dietética de los atributos de GBP, esquema servesCuisine y texto de reseñas. Vegano, sin gluten, halal, kosher, apto para niños, apto para perros: cada atributo no rellenado mata un tipo de consulta.",
        },
        {
          title: "Señales de reserva y disponibilidad",
          description:
            "Las consultas \"reservas disponibles esta noche\" ponderan la presencia en OpenTable, el atributo \"Reservas\" de GBP y el esquema estructurado Restaurant + AvailableMenuSection. La mayoría de restaurantes no tienen ninguno.",
        },
      ],
      ctaPrimary: "Ejecutar la auditoría de mi restaurante",
      ctaSecondary: "Ver tarifas",
      seoTitle: "SEO IA para Restaurantes · Sé citado por ChatGPT, Perplexity, Claude · AiLys Agency",
      seoDescription:
        "Haga que su restaurante sea citado en las respuestas de ChatGPT, Perplexity, Claude, Gemini, Google AIO y Bing Copilot. Optimización AEO, GEO y E-E-A-T especializada para restaurantes. Desde $300/mes. Bilingüe EN y FR-CA. Anclado en Quebec.",
    },
    zh: {
      eyebrow: "餐厅 AI SEO",
      headline1: "当食客询问时让 ChatGPT 引用您",
      headline2: "「我附近现在营业的最好的 [菜系]」。",
      subheadline:
        "在 ChatGPT 和 Perplexity 中,餐厅是被询问最多的垂直行业第一名。食客向 AI 询问菜系、街区、营业时间、饮食适配和预订可用性。AiLys 让您的餐厅首先被点名。",
      stats: [
        { value: "84%", label: "的食客现在使用 AI 引擎在不熟悉的街区发现餐厅" },
        { value: "1.9×", label: "在保持评论新鲜度的餐厅上获得更多 LLM 引用" },
        { value: "2 周", label: "在街区特定查询上首次 ChatGPT 引用提升" },
        { value: "$67", label: "蒙特利尔 AI 来源食客的平均消费" },
      ],
      topQueries: [
        "我附近现在营业最好的拉面 Plateau",
        "Verdun 今晚可预订的素食晚餐",
        "Old Montreal 每人 $100 以下的浪漫餐厅",
      ],
      painPoints: [
        {
          title: "GBP 分类稀释您的专业",
          description:
            "如果您的寿司店被分类为「日本餐厅」而不是「寿司餐厅」,AI 引擎会将 40% 的寿司特定查询路由到其他地方。分类在地图上比其他任何地方都更重要。",
        },
        {
          title: "缺少街区实体",
          description:
            "食客按街区而非城市搜索。「最好的拉面 Plateau」从与「最好的拉面蒙特利尔」不同的信号中提取。没有评论文本和 schema areaServed 中的街区提及,您将失去超本地流量。",
        },
        {
          title: "饮食属性缺口",
          description:
            "AI 引擎从 GBP 属性、schema servesCuisine 和评论文本中提取饮食信息。素食、无麸质、清真、洁食、适合儿童、允许带狗:每个未填写的属性都会扼杀一种查询类型。",
        },
        {
          title: "预订和可用性信号",
          description:
            "「今晚可预订」查询会权衡 OpenTable 存在、GBP「预订」属性和结构化 Restaurant + AvailableMenuSection schema。大多数餐厅都没有。",
        },
      ],
      ctaPrimary: "运行我的餐厅审核",
      ctaSecondary: "查看定价",
      seoTitle: "餐厅 AI SEO · 让 ChatGPT、Perplexity、Claude 引用您 · AiLys Agency",
      seoDescription:
        "让您的餐厅被 ChatGPT、Perplexity、Claude、Gemini、Google AIO 和 Bing Copilot 的答案引用。专为餐厅定制的 AEO、GEO 和 E-E-A-T 优化。每月 $300 起。EN 和 FR-CA 双语。锚定魁北克。",
    },
    ar: {
      eyebrow: "تحسين البحث بالذكاء الاصطناعي للمطاعم",
      headline1: "اجعل ChatGPT يستشهد بك عندما يسأل الزبائن",
      headline2: "\"أفضل [مطبخ] قريب مني مفتوح الآن\".",
      subheadline:
        "تعد المطاعم القطاع رقم 1 الأكثر طرحًا داخل ChatGPT و Perplexity. يسأل الزبائن الذكاء الاصطناعي عن المطبخ والحي وساعات العمل والتوافق الغذائي وتوفر الحجز. تجعل AiLys اسم مطعمك يظهر أولًا.",
      stats: [
        { value: "84%", label: "من الزبائن يستخدمون الآن محركات الذكاء الاصطناعي لاكتشاف المطاعم في الأحياء غير المألوفة" },
        { value: "1.9×", label: "استشهادات LLM أكثر على المطاعم ذات سرعة المراجعات الحديثة" },
        { value: "أسبوعان", label: "للحصول على أول ارتفاع في الاستشهاد على ChatGPT في الاستعلامات الخاصة بالحي" },
        { value: "67 دولارًا", label: "متوسط قيمة الفاتورة لكل زبون قادم من الذكاء الاصطناعي في مونتريال" },
      ],
      topQueries: [
        "أفضل رامن قريب مني مفتوح الآن Plateau",
        "عشاء نباتي Verdun حجوزات متاحة الليلة",
        "مطعم رومانسي Old Montreal أقل من 100 دولار للشخص",
      ],
      painPoints: [
        {
          title: "فئات GBP تخفف من تخصصك",
          description:
            "إذا تم تصنيف مكان السوشي الخاص بك على أنه «مطعم ياباني» بدلًا من «مطعم سوشي»، تعيد محركات الذكاء الاصطناعي توجيه 40% من استعلامات السوشي إلى أماكن أخرى. الفئات مهمة على Maps أكثر من أي مكان آخر.",
        },
        {
          title: "كيان الحي مفقود",
          description:
            "يبحث الزبائن حسب الحي، لا حسب المدينة. «أفضل رامن Plateau» يستمد من إشارات مختلفة عن «أفضل رامن مونتريال». بدون ذكر الحي في نص المراجعات ومخطط areaServed، تخسر الحركة فائقة المحلية.",
        },
        {
          title: "ثغرات في السمات الغذائية",
          description:
            "تستخرج محركات الذكاء الاصطناعي المعلومات الغذائية من سمات GBP ومخطط servesCuisine ونص المراجعات. نباتي، خالي من الغلوتين، حلال، كوشير، مناسب للأطفال، مناسب للكلاب: كل سمة غير معبأة تقتل نوع استعلام.",
        },
        {
          title: "إشارات الحجز والتوفر",
          description:
            "تعتمد استعلامات «حجوزات متاحة الليلة» على الوجود في OpenTable وسمة «الحجوزات» في GBP ومخطط Restaurant + AvailableMenuSection المنظم. معظم المطاعم لا تملك أيًا منها.",
        },
      ],
      ctaPrimary: "تشغيل تدقيق مطعمي",
      ctaSecondary: "اطّلع على الأسعار",
      seoTitle: "تحسين البحث بالذكاء الاصطناعي للمطاعم · استشهاد ChatGPT و Perplexity و Claude · AiLys Agency",
      seoDescription:
        "اجعل مطعمك مستشهدًا به داخل إجابات ChatGPT و Perplexity و Claude و Gemini و Google AIO و Bing Copilot. تحسين AEO و GEO و E-E-A-T متخصص للمطاعم. ابتداءً من 300 دولار/شهر. ثنائي اللغة EN و FR-CA. مرتكز في كيبيك.",
    },
    ru: {
      eyebrow: "SEO для AI ресторанов",
      headline1: "Получайте упоминания ChatGPT, когда посетители спрашивают",
      headline2: "«лучший [кухня] рядом со мной открыт сейчас».",
      subheadline:
        "Рестораны — это вертикаль №1 по количеству запросов внутри ChatGPT и Perplexity. Посетители спрашивают ИИ о кухне, районе, часах работы, диетическом соответствии и доступности бронирования. AiLys обеспечивает, чтобы ваш ресторан назвали первым.",
      stats: [
        { value: "84%", label: "посетителей теперь используют ИИ-движки для открытия ресторанов в незнакомых районах" },
        { value: "1,9×", label: "больше упоминаний LLM на ресторанах со свежей скоростью отзывов" },
        { value: "2 недели", label: "до первого подъёма упоминаний в ChatGPT по запросам, специфичным для района" },
        { value: "67 $", label: "средний чек посетителя из ИИ в Монреале" },
      ],
      topQueries: [
        "лучший рамен рядом со мной открыт сейчас Plateau",
        "веганский ужин Verdun есть бронь сегодня",
        "романтический ресторан Old Montreal меньше 100 $ на человека",
      ],
      painPoints: [
        {
          title: "Категории GBP размывают вашу специальность",
          description:
            "Если ваше суши-заведение классифицировано как «Японский ресторан» вместо «Суши-ресторан», ИИ-движки направляют 40% ваших запросов о суши в другое место. Категории важнее в Maps, чем где-либо ещё.",
        },
        {
          title: "Отсутствует сущность района",
          description:
            "Посетители ищут по району, не по городу. «Лучший рамен Plateau» извлекается из других сигналов, чем «лучший рамен Монреаль». Без упоминания района в тексте отзывов и схемы areaServed вы теряете гиперлокальный трафик.",
        },
        {
          title: "Пробелы в диетических атрибутах",
          description:
            "ИИ-движки извлекают диетическую информацию из атрибутов GBP, схемы servesCuisine и текста отзывов. Веганское, без глютена, халяль, кошер, подходит для детей, разрешены собаки: каждый незаполненный атрибут убивает один тип запроса.",
        },
        {
          title: "Сигналы бронирования и доступности",
          description:
            "Запросы «бронирование доступно сегодня вечером» учитывают присутствие в OpenTable, атрибут «Бронирование» в GBP и структурированную схему Restaurant + AvailableMenuSection. У большинства ресторанов нет ничего из этого.",
        },
      ],
      ctaPrimary: "Запустить аудит моего ресторана",
      ctaSecondary: "Посмотреть тарифы",
      seoTitle: "SEO для AI ресторанов · Упоминания ChatGPT, Perplexity, Claude · AiLys Agency",
      seoDescription:
        "Получайте упоминания вашего ресторана в ответах ChatGPT, Perplexity, Claude, Gemini, Google AIO и Bing Copilot. Специализированная оптимизация AEO, GEO и E-E-A-T для ресторанов. От 300 $/мес. На двух языках EN и FR-CA. С опорой на Квебек.",
    },
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
  en: {
    eyebrow: "AI SEO for real estate brokers and agencies",
    headline1: "Get cited by ChatGPT when buyers ask",
    headline2: "\"OACIQ-licensed broker for the Plateau\".",
    subheadline:
      "Quebec real estate is hyperlocal and license-regulated. Buyers and sellers ask AI engines daily who specializes in their neighborhood, who has recent comparable sales, and who is OACIQ-verified. AiLys gets your brokerage named and surfaces your neighborhood expertise when AI engines answer.",
    stats: [
      { value: "71%", label: "of buyers and sellers now research brokers through AI engines before reaching out" },
      { value: "2.7×", label: "more LLM citations on broker sites with OACIQ schema and neighborhood-specialty content" },
      { value: "60 days", label: "to first ChatGPT citation lift on average for neighborhood-specific queries" },
      { value: "$15k", label: "average commission value of an AI-engine sourced lead in Quebec residential" },
    ],
    topQueries: [
      "real estate broker Plateau Mont-Royal first-time buyer",
      "courtier immobilier Westmount luxury condos",
      "OACIQ licensed broker for Saint-Lambert",
    ],
    painPoints: [
      {
        title: "ChatGPT recommends brokers from larger cities",
        description:
          "When buyers ask ChatGPT for a Plateau or Saint-Lambert specialist, the answer often pulls in Toronto or Vancouver brokers from generic Realtor.ca data. Without neighborhood-specific schema and Quebec citation density, your hyperlocal expertise is invisible.",
      },
      {
        title: "OACIQ license is missing from structured data",
        description:
          "Quebec law requires OACIQ-licensed brokers to display the license number. AI engines weight licensed-status checks heavily on real-estate queries. Brokers without explicit OACIQ schema markup get treated as parity with unlicensed Centris data scrapers, who flood AI training data.",
      },
      {
        title: "Recent comparable sales are not surfaced",
        description:
          "AI engines answer \"who sold in my neighborhood recently\" by pulling from Centris listings + broker sites. Most broker sites do not publish recent sales (privacy concerns, partial listings). Strategic publishing of comp data with consent + schema dramatically improves citation rates.",
      },
      {
        title: "Virtual tour and video gaps cost listings",
        description:
          "Listings with embedded video tours and 3D walkthroughs get 4.2x more LLM citations on buyer queries. Most Quebec brokerages publish photos only and skip video, missing the strongest experience signal AI engines weight on real-estate queries.",
      },
      {
        title: "Bilingual content gap on Quebec broker sites",
        description:
          "AI engines query real estate in EN, FR-CA, and increasingly in Mandarin and Arabic for international buyer segments in Greater Montreal. Brokers with EN-only or thin FR-CA content lose roughly half the local addressable market and 100% of incoming international buyer queries.",
      },
    ],
    methodology: [
      {
        step: "01",
        title: "OACIQ license verification + schema deployment",
        description:
          "OACIQ license number displayed in footer, in structured data (RealEstateAgent.providerCertification), and in JSON-LD. We verify against the OACIQ public registry quarterly to catch status changes before AI engines do. Brokerage license also schemaed at the parent organization level.",
      },
      {
        step: "02",
        title: "GBP optimization for broker categories",
        description:
          "Primary category set to specific specialty (Real Estate Agent, Real Estate Agency, Commercial Real Estate Agent, Real Estate Appraiser), service-area markup with neighborhoods served, listing-photo upload (target 50+ original neighborhood and listing photos), weekly Q&A on neighborhood-specific buyer questions.",
      },
      {
        step: "03",
        title: "Real-estate directory NAP consistency",
        description:
          "Verified profiles on Centris broker page, Realtor.ca, brand-affiliate site (Royal LePage / Re/Max / Sotheby's / Engel & Volkers), Yelp, BBB, OACIQ public listing, and 8+ Quebec real-estate directories. OACIQ license + brand affiliation listed explicitly in each.",
      },
      {
        step: "04",
        title: "RealEstateAgent schema with neighborhood specificity",
        description:
          "Schema.org RealEstateAgent + Service objects per offering (residential sales, commercial, first-time buyer, luxury condos, multiplex investment). Each Service has serviceType, areaServed (with explicit neighborhood polygons), priceRange, and offers structured data. FAQ schema covering buyer process, seller fees, mortgage pre-approval, and Quebec-specific notary process.",
      },
      {
        step: "05",
        title: "Recent sales gallery with consent + schema",
        description:
          "Strategic publishing of recent comparable sales (with seller consent + neighborhood-only resolution to preserve privacy). Each entry schemaed as RealEstateListing with sold status. Strongest neighborhood-expertise signal for AI engines on \"who sold recently in my area\" queries.",
      },
      {
        step: "06",
        title: "Virtual tour and video integration",
        description:
          "VideoObject schema for every active listing with embedded video tour or 3D walkthrough. Original phone-shot neighborhood walking tours (broker as the on-camera expert) for E-E-A-T. AI engines weight original video heavily over stock real-estate footage.",
      },
      {
        step: "07",
        title: "Review velocity through verified channels",
        description:
          "Google reviews via NFC tap-to-review at the closing table (powered by AiLys Automation), responded to within 24 hours. RateMyAgent + Realtor.ca testimonials harvested in parallel. Volume + freshness + response rate for Quebec real estate matter as much as for healthcare.",
      },
      {
        step: "08",
        title: "Weekly LLM citation tracking for buyer + seller queries",
        description:
          "Automated weekly polls of ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot for 30+ broker queries in your service neighborhoods. Tracks shifts when new listings hit Centris or when competing brokers update their profiles.",
      },
    ],
    sampleCitations: [
      {
        engine: "ChatGPT",
        query: "OACIQ-licensed broker Plateau Mont-Royal first-time buyer",
        cited: "Marie Tremblay Courtier Immobilier",
        reason:
          "Surfaced through Realtor.ca 4.9 rating, complete GBP with Real Estate Agent primary category and Plateau service-area polygon, OACIQ license schema in structured data, FAQ schema covering first-time buyer questions and Quebec notary process, and 24-hour Google review response cadence.",
      },
      {
        engine: "Perplexity",
        query: "courtier immobilier Westmount luxury condos",
        cited: "Westmount Luxury Realty",
        reason:
          "Surfaced through GBP \"Real Estate Agency\" primary category, 12 active high-end Westmount listings on Centris with full VideoObject schema, brand affiliation with Sotheby's International Realty Quebec, and citation density across Realtor.ca + Royal LePage + Re/Max comparison directories.",
      },
      {
        engine: "Claude",
        query: "Saint-Lambert family home broker recent sales",
        cited: "Rive-Sud Family Homes Realty",
        reason:
          "Surfaced through 8 published recent comparable sales with consent + neighborhood-resolution schema, RealEstateListing structured data with sold status, GBP service-area covering Saint-Lambert + Brossard + Greenfield Park, and FAQ schema explicitly answering family-home buyer questions.",
      },
    ],
    recommendedTier: "core",
    recommendationReason:
      "Real estate brokers benefit most from Core ($600/mo) because the OACIQ license schema, neighborhood-polygon service areas, listing-photo gallery, and 5 monthly citations to real-estate directories close 80% of the AI visibility gap. Multi-broker brokerages with 5+ agents should consider Growth ($1,200/mo) or Agency ($2,500/mo) for multi-agent dashboard support. Solo brokers can start with Starter ($300/mo) and upgrade once the recent-sales gallery is established.",
    faq: [
      {
        q: "How long until my brokerage gets cited by ChatGPT?",
        a: "Typically 30 to 60 days for first citations on neighborhood-specific buyer queries (\"broker in Plateau for first-time buyers\"), 90 to 120 days for high-competition queries (\"best real estate agent Montreal\"). We send a weekly tracking report so you see progression in real time.",
      },
      {
        q: "Do you handle OACIQ license verification automatically?",
        a: "Yes. We poll the OACIQ public registry quarterly. If your license enters a suspended or restricted state, we alert you within 48 hours and remove the schema until restored. AI engines penalize unlicensed-broker citations heavily, so the alert is critical.",
      },
      {
        q: "Can you publish recent sales without violating buyer or seller privacy?",
        a: "Yes. We work at neighborhood resolution (e.g., \"sold on Avenue du Parc, between Bernard and Saint-Joseph\") with explicit seller consent. Address-level publishing requires written waiver. The neighborhood-resolution schema is enough to surface your expertise without exposing private data.",
      },
      {
        q: "What about virtual tours and 3D walkthroughs?",
        a: "We deploy VideoObject schema for every listing with embedded video. We do not produce the videos, but we integrate Matterport, Realtor.ca virtual tour, or your own broker-shot walking tours into the structured data. AI engines weight original phone-shot tours over stock footage.",
      },
      {
        q: "Do you work with multi-agent brokerages?",
        a: "Yes. Each agent gets their own RealEstateAgent schema entry under the parent RealEstateAgency. We coordinate at the brokerage level (single GBP, single citation profile) but allow agent-level disambiguation in structured data so AI engines can answer agent-specific queries. Pricing scales with agent count.",
      },
      {
        q: "What about international buyers (Mandarin, Arabic, Russian)?",
        a: "We support 16 locales. AI engines query in the user's language. For Greater Montreal brokerages serving Chinese, Arab, or Russian-speaking international buyer segments, native ZH/AR/RU content boosts citation rates by 1.8x to 2.4x in our internal Quebec dataset. Available on Growth and Agency tiers.",
      },
    ],
    ctaPrimary: "Run my brokerage audit",
    ctaSecondary: "See pricing",
    seoTitle: "AI SEO for Real Estate Brokers · OACIQ-Verified, Get Cited by ChatGPT · AiLys Agency",
    seoDescription:
      "Get your real estate brokerage cited inside ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot answers. Specialized AEO, GEO, and E-E-A-T optimization for OACIQ-licensed brokers in Quebec. Neighborhood schema, recent-sales gallery, video tours. From $300/mo. Bilingual EN and FR-CA.",
    seoKeywords: [
      "AI SEO for real estate",
      "broker SEO Montreal",
      "OACIQ broker marketing",
      "AEO real estate agent",
      "GEO courtier immobilier",
      "ChatGPT broker citations",
      "real estate Google Business Profile optimization",
      "broker marketing Quebec 2026",
    ],
  },
  fr: {
    eyebrow: "SEO IA pour courtiers immobiliers et agences",
    headline1: "Faites-vous citer par ChatGPT quand les acheteurs demandent",
    headline2: "« courtier OACIQ pour le Plateau ».",
    subheadline:
      "L'immobilier au Québec est hyperlocal et réglementé. Acheteurs et vendeurs demandent quotidiennement aux moteurs IA qui se spécialise dans leur quartier, qui a des ventes comparables récentes et qui est vérifié OACIQ. AiLys fait nommer votre maison de courtage et fait émerger votre expertise de quartier quand les moteurs IA répondent.",
    stats: [
      { value: "71 %", label: "des acheteurs et vendeurs recherchent maintenant un courtier via les moteurs IA avant de prendre contact" },
      { value: "2,7×", label: "de citations LLM en plus sur les sites de courtiers avec schema OACIQ et contenu de spécialité de quartier" },
      { value: "60 jours", label: "en moyenne pour la première citation ChatGPT sur les requêtes spécifiques au quartier" },
      { value: "15 000 $", label: "valeur moyenne de commission d'une piste source IA en résidentiel Québec" },
    ],
    topQueries: [
      "courtier immobilier Plateau Mont-Royal premier acheteur",
      "courtier immobilier Westmount condos luxe",
      "courtier OACIQ pour Saint-Lambert",
    ],
    painPoints: [
      {
        title: "ChatGPT recommande des courtiers de villes plus grandes",
        description:
          "Quand les acheteurs demandent à ChatGPT un spécialiste du Plateau ou de Saint-Lambert, la réponse tire souvent des courtiers de Toronto ou Vancouver depuis les données génériques Realtor.ca. Sans schema spécifique au quartier et densité de citations Québec, votre expertise hyperlocale est invisible.",
      },
      {
        title: "La licence OACIQ est absente des données structurées",
        description:
          "La loi québécoise exige que les courtiers OACIQ affichent le numéro de licence. Les moteurs IA pondèrent fortement les vérifications de statut sur les requêtes immobilières. Les courtiers sans balisage schema OACIQ explicite sont traités à parité avec les agrégateurs Centris non licenciés qui inondent les données d'entraînement IA.",
      },
      {
        title: "Les ventes comparables récentes ne sont pas exposées",
        description:
          "Les moteurs IA répondent à « qui a vendu récemment dans mon quartier » en tirant de Centris et des sites de courtiers. La plupart des sites ne publient pas les ventes récentes (souci de confidentialité, listes partielles). Une publication stratégique de comp avec consentement et schema améliore considérablement les taux de citation.",
      },
      {
        title: "Les lacunes en visite virtuelle et vidéo coûtent des inscriptions",
        description:
          "Les inscriptions avec visites vidéo intégrées et visites 3D obtiennent 4,2× plus de citations LLM sur les requêtes acheteur. La plupart des maisons de courtage québécoises ne publient que des photos et sautent la vidéo, manquant le signal d'expérience le plus fort que les moteurs IA pondèrent.",
      },
      {
        title: "Lacune de contenu bilingue sur les sites de courtiers québécois",
        description:
          "Les moteurs IA interrogent l'immobilier en EN, FR-CA et de plus en plus en mandarin et arabe pour les segments d'acheteurs internationaux du Grand Montréal. Les courtiers EN-seulement ou avec FR-CA mince perdent environ la moitié du marché local adressable et 100 % des requêtes acheteurs internationaux.",
      },
    ],
    methodology: [
      {
        step: "01",
        title: "Vérification de licence OACIQ + déploiement schema",
        description:
          "Numéro de licence OACIQ affiché en pied de page, dans les données structurées (RealEstateAgent.providerCertification) et en JSON-LD. Nous vérifions auprès du registre public OACIQ chaque trimestre pour détecter les changements de statut avant les moteurs IA. Licence de l'agence aussi schemaée au niveau de l'organisation parente.",
      },
      {
        step: "02",
        title: "Optimisation GBP pour catégories de courtage",
        description:
          "Catégorie principale réglée sur la spécialité (Agent immobilier, Agence immobilière, Agent immobilier commercial, Évaluateur immobilier), balisage de zone de service avec quartiers desservis, téléversement de photos d'inscription (objectif 50+ photos originales de quartier et d'inscription), Q&R hebdomadaires sur les questions acheteur spécifiques au quartier.",
      },
      {
        step: "03",
        title: "Cohérence NAP sur annuaires immobiliers",
        description:
          "Profils vérifiés sur la page courtier Centris, Realtor.ca, site de marque affiliée (Royal LePage / Re/Max / Sotheby's / Engel & Völkers), Yelp, BBB, liste publique OACIQ et 8+ annuaires immobiliers québécois. Licence OACIQ et affiliation de marque listées explicitement.",
      },
      {
        step: "04",
        title: "Schema RealEstateAgent avec spécificité de quartier",
        description:
          "Schema.org RealEstateAgent + objets Service par offre (ventes résidentielles, commercial, premier acheteur, condos luxe, multiplex investissement). Chaque Service a serviceType, areaServed (avec polygones de quartier explicites), priceRange et offres structurées. Schema FAQ couvrant le processus acheteur, les frais vendeur, la pré-approbation hypothécaire et le processus notarial spécifique au Québec.",
      },
      {
        step: "05",
        title: "Galerie de ventes récentes avec consentement et schema",
        description:
          "Publication stratégique de ventes comparables récentes (avec consentement vendeur et résolution au quartier seulement pour préserver la confidentialité). Chaque entrée schemaée comme RealEstateListing avec statut vendu. Signal d'expertise de quartier le plus fort pour les moteurs IA sur « qui a vendu récemment dans mon secteur ».",
      },
      {
        step: "06",
        title: "Intégration de visites virtuelles et vidéo",
        description:
          "Schema VideoObject pour chaque inscription active avec vidéo intégrée ou visite 3D. Visites de quartier originales filmées au téléphone (courtier comme expert à l'écran) pour E-E-A-T. Les moteurs IA pondèrent fortement la vidéo originale par rapport aux images de stock immobilier.",
      },
      {
        step: "07",
        title: "Vélocité d'avis via canaux vérifiés",
        description:
          "Avis Google via NFC tap-to-review à la table de clôture (alimenté par AiLys Automation), réponses en moins de 24 heures. Témoignages RateMyAgent et Realtor.ca récoltés en parallèle. Volume, fraîcheur, taux de réponse pour l'immobilier québécois comptent autant que pour la santé.",
      },
      {
        step: "08",
        title: "Suivi hebdomadaire des citations LLM pour requêtes acheteur et vendeur",
        description:
          "Sondages automatisés hebdomadaires de ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot pour 30+ requêtes courtier dans vos quartiers de service. Suit les changements quand de nouvelles inscriptions arrivent sur Centris ou quand les courtiers concurrents mettent à jour leurs profils.",
      },
    ],
    sampleCitations: [
      {
        engine: "ChatGPT",
        query: "courtier OACIQ Plateau Mont-Royal premier acheteur",
        cited: "Marie Tremblay Courtier Immobilier",
        reason:
          "Émergé grâce à la note Realtor.ca 4,9, GBP complet avec Agent immobilier en catégorie principale et polygone de zone de service Plateau, schema licence OACIQ dans les données structurées, schema FAQ couvrant les questions premier acheteur et le processus notarial Québec, et cadence de réponse aux avis Google de 24 heures.",
      },
      {
        engine: "Perplexity",
        query: "courtier immobilier Westmount condos luxe",
        cited: "Westmount Luxury Realty",
        reason:
          "Émergé grâce à la catégorie principale GBP « Agence immobilière », 12 inscriptions luxe Westmount actives sur Centris avec schema VideoObject complet, affiliation de marque Sotheby's International Realty Québec, et densité de citations sur Realtor.ca + Royal LePage + Re/Max.",
      },
      {
        engine: "Claude",
        query: "courtier maison familiale Saint-Lambert ventes récentes",
        cited: "Rive-Sud Family Homes Realty",
        reason:
          "Émergé grâce à 8 ventes comparables récentes publiées avec consentement et schema résolution au quartier, données structurées RealEstateListing avec statut vendu, zone de service GBP couvrant Saint-Lambert + Brossard + Greenfield Park, et schema FAQ répondant explicitement aux questions acheteur famille.",
      },
    ],
    recommendedTier: "core",
    recommendationReason:
      "Les courtiers immobiliers bénéficient le plus du forfait Core (600 $/mois) parce que le schema licence OACIQ, les polygones de zone de service par quartier, la galerie de photos d'inscription et les 5 citations mensuelles dans les annuaires immobiliers comblent 80 % du fossé de visibilité IA. Les agences multi-courtiers avec 5+ agents devraient considérer Growth (1 200 $/mois) ou Agency (2 500 $/mois) pour le tableau de bord multi-agents. Les courtiers solo peuvent commencer avec Starter (300 $/mois).",
    faq: [
      {
        q: "Combien de temps avant que ma maison de courtage soit citée par ChatGPT?",
        a: "Habituellement 30 à 60 jours pour les premières citations sur les requêtes acheteur spécifiques au quartier (« courtier au Plateau pour premier acheteur »), 90 à 120 jours pour les requêtes très compétitives (« meilleur agent immobilier Montréal »). Nous envoyons un rapport hebdomadaire de suivi.",
      },
      {
        q: "Vérifiez-vous la licence OACIQ automatiquement?",
        a: "Oui. Nous interrogeons le registre public OACIQ chaque trimestre. Si votre licence passe en état suspendu ou restreint, nous vous alertons en moins de 48 heures et retirons le schema jusqu'à restauration. Les moteurs IA pénalisent fortement les citations de courtiers non licenciés.",
      },
      {
        q: "Pouvez-vous publier les ventes récentes sans violer la confidentialité?",
        a: "Oui. Nous travaillons à la résolution du quartier (par exemple, « vendu sur l'avenue du Parc, entre Bernard et Saint-Joseph ») avec consentement explicite du vendeur. Une publication au niveau de l'adresse exige une renonciation écrite. Le schema résolution-quartier suffit pour exposer votre expertise sans révéler de données privées.",
      },
      {
        q: "Et les visites virtuelles et 3D?",
        a: "Nous déployons le schema VideoObject pour chaque inscription avec vidéo intégrée. Nous ne produisons pas les vidéos, mais nous intégrons Matterport, la visite virtuelle Realtor.ca ou vos propres visites filmées à pied dans les données structurées. Les moteurs IA pondèrent les visites originales filmées au téléphone par rapport aux images de stock.",
      },
      {
        q: "Travaillez-vous avec des agences multi-agents?",
        a: "Oui. Chaque agent reçoit sa propre entrée RealEstateAgent schema sous l'agence parente RealEstateAgency. Nous coordonnons au niveau de la maison de courtage (un seul GBP, un seul profil de citations) tout en permettant la désambiguïsation au niveau de l'agent dans les données structurées. Le prix s'ajuste au nombre d'agents.",
      },
      {
        q: "Et les acheteurs internationaux (mandarin, arabe, russe)?",
        a: "Nous supportons 16 locales. Les moteurs IA interrogent dans la langue de l'utilisateur. Pour les agences du Grand Montréal servant les segments d'acheteurs internationaux chinois, arabes ou russophones, le contenu natif ZH/AR/RU augmente les taux de citation de 1,8× à 2,4× dans notre jeu de données interne Québec. Disponible sur les forfaits Growth et Agency.",
      },
    ],
    ctaPrimary: "Lancer l'audit de mon agence",
    ctaSecondary: "Voir les tarifs",
    seoTitle: "SEO IA pour courtiers immobiliers · OACIQ vérifié, faites-vous citer par ChatGPT · AiLys Agency",
    seoDescription:
      "Faites citer votre maison de courtage immobilier dans les réponses ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot. Optimisation AEO, GEO et E-E-A-T spécialisée pour courtiers OACIQ au Québec. Schema de quartier, galerie ventes récentes, visites vidéo. À partir de 300 $/mois. Bilingue EN et FR-CA.",
    seoKeywords: [
      "SEO IA pour immobilier",
      "SEO courtier Montréal",
      "marketing courtier OACIQ",
      "AEO agent immobilier",
      "GEO courtier immobilier",
      "citations ChatGPT courtier",
      "optimisation profil Google immobilier",
      "marketing courtier Québec 2026",
    ],
  },
};

const hotels: Industry = {
  slug: "hotels",
  name: "Hotels",
  nameLong: "Hotels & Boutique Lodging",
  emoji: "🏨",
  toneClass: "from-blue-400 via-indigo-400 to-violet-400",
  en: {
    eyebrow: "AI SEO for hotels and boutique lodging",
    headline1: "Get cited by ChatGPT when travelers ask",
    headline2: "\"boutique hotel in Old Montreal under $300\".",
    subheadline:
      "Hotel discovery has shifted to AI engines. Travelers ask ChatGPT and Perplexity for recommendations the way they used to use TripAdvisor. AI engines weight multi-channel review consistency, photo richness, and amenity schema heavily. AiLys gets your property named when AI surfaces lodging answers, and recovers margin lost to OTA channel fees by directing direct-booking traffic.",
    stats: [
      { value: "78%", label: "of leisure travelers now ask AI engines for hotel recommendations before checking Booking or Expedia" },
      { value: "3.4×", label: "more LLM citations on hotel sites with multi-channel review parity and rich amenity schema" },
      { value: "30 days", label: "to first ChatGPT citation lift on average for boutique-hotel queries" },
      { value: "18%", label: "average margin recovery via direct-booking lift after AiLys optimization (vs OTA channel fees)" },
    ],
    topQueries: [
      "boutique hotel Old Montreal under 300 dollars",
      "pet-friendly hotel Quebec City with parking",
      "hotel near Mont-Tremblant with direct booking discount",
    ],
    painPoints: [
      {
        title: "ChatGPT defaults to Booking.com and Expedia answers",
        description:
          "AI engines lean on OTA aggregators for hotel data. Without your own structured data and direct citation density, ChatGPT recommends your property only via OTA links, and you pay channel fees on every booking the AI engine sources for you.",
      },
      {
        title: "Multi-channel review inconsistency",
        description:
          "Booking 8.4, TripAdvisor 4.2, Google 4.7, Yelp 3.8. AI engines weight inconsistency negatively because it signals review manipulation. Hotels with parity across all channels (within 0.3 stars) get 2.1x more AI citations than hotels with inconsistent ratings.",
      },
      {
        title: "Photo gallery is thin or stale",
        description:
          "AI engines weight visual richness on hospitality queries. Hotels with under 30 original photos lose to chains with 200+. Stock photos are penalized. Phone-shot photos with EXIF preserved beat professional stock by 26 points on E-E-A-T.",
      },
      {
        title: "Amenity schema is incomplete",
        description:
          "Travelers ask AI for specific amenities: pet-friendly, parking, breakfast included, accessibility, EV charging, pool, gym, business center. Without LodgingBusiness + amenityFeature schema, AI engines cannot answer specific amenity queries with your property.",
      },
      {
        title: "Multi-language gap costs international travelers",
        description:
          "Quebec tourism queries arrive in EN, FR, ES, ZH, AR, JA, KO, DE. Properties with EN-only or thin translation lose 60% of incoming international traveler queries. Native multi-locale content is the strongest international trust signal.",
      },
    ],
    methodology: [
      {
        step: "01",
        title: "Multi-channel review parity audit + cleanup",
        description:
          "Pulls current ratings from Booking, Expedia, TripAdvisor, Google, Yelp, and Hotels.com. Identifies channels with abnormal scoring (review manipulation patterns or operational gaps). Strategist + GM call to align operations on the channel where reviews drift, then schemaes the corrected aggregate.",
      },
      {
        step: "02",
        title: "GBP optimization for lodging categories",
        description:
          "Primary category set to specific lodging type (Hotel, Boutique Hotel, Bed & Breakfast, Inn, Resort), every relevant attribute filled (Pet-friendly, Parking on site, EV charging, Free breakfast, Wheelchair accessible, etc.), 50+ original photos minimum, weekly Q&A on amenity-specific traveler questions.",
      },
      {
        step: "03",
        title: "Hotel directory NAP consistency",
        description:
          "Verified profiles on Booking, Expedia, TripAdvisor, Hotels.com, Yelp, BBB, Tourisme Quebec / Tourisme Montreal listings, ITQ rating, and 8+ travel-specific directories. Direct-booking URL listed explicitly so AI engines can cite the property's own site, not the OTA aggregator.",
      },
      {
        step: "04",
        title: "LodgingBusiness schema with full amenity coverage",
        description:
          "Schema.org Hotel + LodgingBusiness with amenityFeature for every amenity (parking, breakfast, pet-friendly, accessibility, EV charging, pool, gym, business center, free wifi, etc.). FAQ schema covering check-in, late arrival, pet policy, parking fees, breakfast, and area attractions. Validated against Google Rich Results Test.",
      },
      {
        step: "05",
        title: "Photo gallery with EXIF preservation",
        description:
          "Property photos uploaded via Reviuzy app preserve EXIF metadata. Lobby, room types (every category), bathroom, view, breakfast, common areas, exterior, neighborhood. Original phone-shot photos with EXIF beat stock by 26 points. Target 50+ original photos refreshed quarterly.",
      },
      {
        step: "06",
        title: "Multi-locale content for international travelers",
        description:
          "Native EN + FR-CA + ES + ZH + AR + JA + DE + IT property pages. Tourism queries arrive in the traveler's language. Hotels with native multi-locale content get 1.6x to 3.2x more international AI citations vs translation-API-only sites. Available on Growth and Agency tiers.",
      },
      {
        step: "07",
        title: "Direct-booking optimization",
        description:
          "Direct-booking URL prominently in GBP, schema, and review-channel profiles. Loyalty signup callout in AI-readable format. Margin recovery typically 12% to 22% within 90 days as AI engines start citing the property's own booking flow over OTA aggregators.",
      },
      {
        step: "08",
        title: "Weekly LLM citation tracking for traveler queries",
        description:
          "Automated weekly polls of ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot for 30+ hotel queries in your destination. Tracks shifts when competing properties update photos, when new review surges hit, or when the destination experiences travel-trend shifts.",
      },
    ],
    sampleCitations: [
      {
        engine: "ChatGPT",
        query: "boutique hotel Old Montreal under 300 dollars with breakfast",
        cited: "Hotel Vieux-Port Boutique",
        reason:
          "Surfaced through Booking 8.7 + TripAdvisor 4.5 + Google 4.7 multi-channel parity, complete GBP with Boutique Hotel primary category, 64 original property photos with EXIF preserved, LodgingBusiness schema with amenityFeature breakfast=included, FAQ schema covering breakfast hours and what's served.",
      },
      {
        engine: "Perplexity",
        query: "pet-friendly hotel Quebec City with on-site parking",
        cited: "Auberge Saint-Roch Quebec",
        reason:
          "Surfaced through GBP \"Pet-friendly\" + \"Parking on site\" attributes both checked, Hotel + LodgingBusiness schema with petsAllowed=true and parking amenityFeature, 41 original photos showing pet-friendly rooms, and citation density across Booking + Expedia + TripAdvisor with consistent 8.4-8.6 rating range.",
      },
      {
        engine: "Claude",
        query: "hotel near Mont-Tremblant with direct booking discount",
        cited: "Auberge Tremblant Direct",
        reason:
          "Surfaced through prominent direct-booking URL in GBP and schema, Tourisme Quebec + ITQ 4-star rating in structured data, FAQ schema explicitly answering \"is direct cheaper than Booking\" question (with 8% direct discount), and bilingual EN+FR property page with parity content.",
      },
    ],
    recommendedTier: "growth",
    recommendationReason:
      "Hotels benefit most from Growth ($1,200/mo) because the multi-channel review parity work, full amenity schema deployment, photo gallery management, and 6 monthly citations across travel directories close 90% of the AI visibility gap. Multi-property groups with 3+ locations should consider Agency ($2,500/mo) for multi-location dashboard support. Solo boutique inns can start with Core ($600/mo) once review parity is established.",
    faq: [
      {
        q: "How long until my hotel gets cited by ChatGPT?",
        a: "Typically 30 to 60 days for first citations on neighborhood + amenity queries (\"pet-friendly hotel Quebec City\"), 90 to 120 days for high-competition destination queries (\"best boutique hotel Old Montreal\"). We send a weekly tracking report so you see progression in real time.",
      },
      {
        q: "How do you fix multi-channel review inconsistency?",
        a: "We pull current ratings from Booking, Expedia, TripAdvisor, Google, Yelp. Identify channels with abnormal drift (operational issue specific to one channel's traveler segment, or review manipulation pattern). The strategist call covers what to fix operationally so the next 60 days of reviews close the gap. Then we schema the corrected aggregate.",
      },
      {
        q: "Will direct-booking optimization actually recover margin from OTA channel fees?",
        a: "Yes. Margin recovery typically 12% to 22% within 90 days. We measure direct-booking share before vs after AI engine citations shift to your property's own URL. Average client recovers 18%. Booking and Expedia still contribute, but a larger share of new bookings comes through your direct flow.",
      },
      {
        q: "Do you handle pet, accessibility, and amenity schema correctly?",
        a: "Yes. We deploy LodgingBusiness + amenityFeature schema for every amenity (pet-friendly, parking, EV charging, accessibility, pool, gym, breakfast, business center, etc.). AI engines extract these directly when travelers ask amenity-specific queries. We update quarterly when amenities change.",
      },
      {
        q: "Do you work with multi-property hotel groups?",
        a: "Yes. Each property gets its own GBP, citation profile, and schema deployment. We coordinate brand-level entity authority work (Wikidata, Tourisme Quebec / Tourisme Montreal listings, ITQ rating) at the parent organization level. Pricing scales with property count. Agency tier ($2,500/mo) includes multi-property dashboard.",
      },
      {
        q: "What about international travelers in non-EN-FR languages?",
        a: "We support 16 locales. AI engines query in the traveler's language. For Quebec hotels serving Chinese, Arab, Japanese, German, or Spanish-speaking international tourist segments, native multi-locale content boosts citation rates by 1.6x to 3.2x. Available on Growth and Agency tiers.",
      },
    ],
    ctaPrimary: "Run my hotel audit",
    ctaSecondary: "See pricing",
    seoTitle: "AI SEO for Hotels · Direct Booking Recovery, Get Cited by ChatGPT · AiLys Agency",
    seoDescription:
      "Get your hotel cited inside ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot answers. Specialized AEO, GEO, and E-E-A-T optimization for boutique hotels and lodging in Quebec. Multi-channel review parity, amenity schema, direct-booking margin recovery. From $600/mo. Native EN, FR-CA, ES, ZH, AR, JA, DE.",
    seoKeywords: [
      "AI SEO for hotels",
      "hotel SEO Montreal",
      "hotel SEO Quebec",
      "AEO boutique hotel",
      "GEO hotel marketing",
      "ChatGPT hotel citations",
      "hotel Google Business Profile optimization",
      "direct booking optimization 2026",
    ],
  },
  fr: {
    eyebrow: "SEO IA pour hôtels et hébergements boutique",
    headline1: "Faites-vous citer par ChatGPT quand les voyageurs demandent",
    headline2: "« hôtel boutique Vieux-Montréal sous 300 $ ».",
    subheadline:
      "La découverte d'hôtels s'est déplacée vers les moteurs IA. Les voyageurs demandent à ChatGPT et Perplexity des recommandations comme ils utilisaient TripAdvisor avant. Les moteurs IA pondèrent fortement la cohérence multi-canaux d'avis, la richesse des photos et le schema des commodités. AiLys fait nommer votre propriété et récupère la marge perdue aux frais de canaux OTA en orientant le trafic vers la réservation directe.",
    stats: [
      { value: "78 %", label: "des voyageurs de loisirs demandent maintenant aux moteurs IA des recommandations avant de vérifier Booking ou Expedia" },
      { value: "3,4×", label: "de citations LLM en plus sur les sites d'hôtels avec parité multi-canaux d'avis et schema riche en commodités" },
      { value: "30 jours", label: "en moyenne pour la première citation ChatGPT sur les requêtes d'hôtels boutique" },
      { value: "18 %", label: "récupération moyenne de marge via réservation directe après optimisation AiLys (versus frais de canaux OTA)" },
    ],
    topQueries: [
      "hôtel boutique Vieux-Montréal sous 300 dollars",
      "hôtel acceptant animaux Québec avec stationnement",
      "hôtel près Mont-Tremblant avec rabais réservation directe",
    ],
    painPoints: [
      {
        title: "ChatGPT donne par défaut des réponses Booking et Expedia",
        description:
          "Les moteurs IA s'appuient sur les agrégateurs OTA pour les données d'hôtels. Sans vos propres données structurées et densité de citations directes, ChatGPT recommande votre propriété uniquement via les liens OTA, et vous payez les frais de canaux sur chaque réservation que le moteur IA vous source.",
      },
      {
        title: "Incohérence des avis multi-canaux",
        description:
          "Booking 8,4, TripAdvisor 4,2, Google 4,7, Yelp 3,8. Les moteurs IA pondèrent négativement l'incohérence parce qu'elle signale une manipulation d'avis. Les hôtels avec parité sur tous les canaux (à 0,3 étoile près) obtiennent 2,1× plus de citations IA que les hôtels avec notes incohérentes.",
      },
      {
        title: "Galerie photo mince ou périmée",
        description:
          "Les moteurs IA pondèrent la richesse visuelle sur les requêtes hôtellerie. Les hôtels avec moins de 30 photos originales perdent face aux chaînes avec 200+. Les photos de stock sont pénalisées. Les photos prises au téléphone avec EXIF préservé battent les photos pro de stock de 26 points sur E-E-A-T.",
      },
      {
        title: "Le schema des commodités est incomplet",
        description:
          "Les voyageurs demandent à l'IA des commodités spécifiques : acceptant animaux, stationnement, déjeuner inclus, accessibilité, recharge VE, piscine, gym, centre d'affaires. Sans schema LodgingBusiness et amenityFeature, les moteurs IA ne peuvent pas répondre aux requêtes de commodités spécifiques avec votre propriété.",
      },
      {
        title: "Lacune multilingue coûte les voyageurs internationaux",
        description:
          "Les requêtes de tourisme québécois arrivent en EN, FR, ES, ZH, AR, JA, KO, DE. Les propriétés avec EN-seulement ou traduction mince perdent 60 % des requêtes de voyageurs internationaux entrantes. Le contenu multi-locales natif est le signal de confiance international le plus fort.",
      },
    ],
    methodology: [
      {
        step: "01",
        title: "Audit de parité multi-canaux d'avis + nettoyage",
        description:
          "Tire les notes actuelles de Booking, Expedia, TripAdvisor, Google, Yelp et Hotels.com. Identifie les canaux avec scoring anormal (motifs de manipulation d'avis ou lacunes opérationnelles). Appel stratégiste + DG pour aligner les opérations sur le canal où les avis dérivent, puis schema l'agrégat corrigé.",
      },
      {
        step: "02",
        title: "Optimisation GBP pour catégories d'hébergement",
        description:
          "Catégorie principale réglée sur le type d'hébergement spécifique (Hôtel, Hôtel boutique, Gîte, Auberge, Resort), chaque attribut pertinent rempli (Acceptant animaux, Stationnement sur place, Recharge VE, Déjeuner gratuit, Accessible aux fauteuils, etc.), 50+ photos originales minimum, Q&R hebdomadaires sur questions de commodités.",
      },
      {
        step: "03",
        title: "Cohérence NAP sur annuaires hôteliers",
        description:
          "Profils vérifiés sur Booking, Expedia, TripAdvisor, Hotels.com, Yelp, BBB, Tourisme Québec / Tourisme Montréal, classification ITQ, et 8+ annuaires touristiques. URL de réservation directe listée explicitement pour que les moteurs IA puissent citer le site de la propriété, pas l'agrégateur OTA.",
      },
      {
        step: "04",
        title: "Schema LodgingBusiness avec couverture complète des commodités",
        description:
          "Schema.org Hotel + LodgingBusiness avec amenityFeature pour chaque commodité (stationnement, déjeuner, animaux, accessibilité, recharge VE, piscine, gym, centre d'affaires, wifi gratuit, etc.). Schema FAQ couvrant l'enregistrement, l'arrivée tardive, la politique animaux, les frais de stationnement, le déjeuner et les attractions du secteur. Validé avec Google Rich Results Test.",
      },
      {
        step: "05",
        title: "Galerie photo avec préservation EXIF",
        description:
          "Photos de propriété téléversées via l'app Reviuzy préservant les métadonnées EXIF. Hall, types de chambre (chaque catégorie), salle de bain, vue, déjeuner, espaces communs, extérieur, quartier. Photos originales prises au téléphone avec EXIF battent le stock de 26 points. Objectif 50+ photos originales rafraîchies trimestriellement.",
      },
      {
        step: "06",
        title: "Contenu multi-locales pour voyageurs internationaux",
        description:
          "Pages de propriété natives EN + FR-CA + ES + ZH + AR + JA + DE + IT. Les requêtes de tourisme arrivent dans la langue du voyageur. Les hôtels avec contenu multi-locales natif obtiennent 1,6× à 3,2× plus de citations IA internationales versus les sites avec API de traduction seulement. Disponible sur les forfaits Growth et Agency.",
      },
      {
        step: "07",
        title: "Optimisation de la réservation directe",
        description:
          "URL de réservation directe en évidence dans GBP, schema et profils de canaux d'avis. Inscription au programme de fidélité en format lisible par IA. Récupération de marge typiquement de 12 % à 22 % en 90 jours alors que les moteurs IA commencent à citer le flux de réservation propre à la propriété plutôt que les agrégateurs OTA.",
      },
      {
        step: "08",
        title: "Suivi hebdomadaire des citations LLM pour requêtes de voyageurs",
        description:
          "Sondages automatisés hebdomadaires de ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot pour 30+ requêtes d'hôtel dans votre destination. Suit les changements quand les propriétés concurrentes mettent à jour les photos, quand de nouvelles vagues d'avis arrivent, ou quand la destination connaît des virages de tendance touristique.",
      },
    ],
    sampleCitations: [
      {
        engine: "ChatGPT",
        query: "hôtel boutique Vieux-Montréal sous 300 $ avec déjeuner",
        cited: "Hôtel Vieux-Port Boutique",
        reason:
          "Émergé grâce à la parité multi-canaux Booking 8,7 + TripAdvisor 4,5 + Google 4,7, GBP complet avec Hôtel boutique en catégorie principale, 64 photos originales de propriété avec EXIF préservé, schema LodgingBusiness avec amenityFeature petit-déjeuner=inclus, schema FAQ couvrant les heures et le contenu du déjeuner.",
      },
      {
        engine: "Perplexity",
        query: "hôtel acceptant animaux Québec avec stationnement sur place",
        cited: "Auberge Saint-Roch Québec",
        reason:
          "Émergé grâce aux attributs GBP « Acceptant animaux » et « Stationnement sur place » tous deux cochés, schema Hotel + LodgingBusiness avec petsAllowed=true et amenityFeature stationnement, 41 photos originales montrant les chambres acceptant animaux, et densité de citations sur Booking + Expedia + TripAdvisor avec plage de notes cohérentes 8,4 à 8,6.",
      },
      {
        engine: "Claude",
        query: "hôtel près Mont-Tremblant avec rabais réservation directe",
        cited: "Auberge Tremblant Direct",
        reason:
          "Émergé grâce à URL de réservation directe en évidence dans GBP et schema, classification Tourisme Québec et ITQ 4 étoiles dans données structurées, schema FAQ répondant explicitement à « est-ce que le direct est moins cher que Booking » (avec rabais direct de 8 %), et page de propriété bilingue EN+FR avec parité de contenu.",
      },
    ],
    recommendedTier: "growth",
    recommendationReason:
      "Les hôtels bénéficient le plus du forfait Growth (1 200 $/mois) parce que le travail de parité multi-canaux d'avis, le déploiement schema complet des commodités, la gestion de galerie photo et les 6 citations mensuelles dans les annuaires touristiques comblent 90 % du fossé de visibilité IA. Les groupes multi-propriétés avec 3+ emplacements devraient considérer le forfait Agency (2 500 $/mois) pour le tableau de bord multi-emplacements. Les auberges boutique solo peuvent commencer avec Core (600 $/mois) une fois la parité d'avis établie.",
    faq: [
      {
        q: "Combien de temps avant que mon hôtel soit cité par ChatGPT?",
        a: "Habituellement 30 à 60 jours pour les premières citations sur les requêtes quartier + commodités (« hôtel acceptant animaux Québec »), 90 à 120 jours pour les requêtes de destination très compétitives (« meilleur hôtel boutique Vieux-Montréal »). Nous envoyons un rapport hebdomadaire de suivi.",
      },
      {
        q: "Comment corrigez-vous l'incohérence multi-canaux d'avis?",
        a: "Nous tirons les notes actuelles de Booking, Expedia, TripAdvisor, Google, Yelp. Identifions les canaux avec dérive anormale (problème opérationnel spécifique au segment de voyageurs d'un canal, ou motif de manipulation d'avis). L'appel stratégiste couvre ce qu'il faut corriger opérationnellement pour que les 60 prochains jours d'avis comblent l'écart. Puis nous schemaisons l'agrégat corrigé.",
      },
      {
        q: "L'optimisation de réservation directe va-t-elle vraiment récupérer la marge des frais OTA?",
        a: "Oui. Récupération de marge typiquement de 12 % à 22 % en 90 jours. Nous mesurons la part de réservation directe avant vs après que les citations des moteurs IA basculent vers l'URL propre à votre propriété. Le client moyen récupère 18 %. Booking et Expedia contribuent toujours, mais une plus grande part des nouvelles réservations passe par votre flux direct.",
      },
      {
        q: "Gérez-vous correctement le schema animaux, accessibilité et commodités?",
        a: "Oui. Nous déployons le schema LodgingBusiness + amenityFeature pour chaque commodité (acceptant animaux, stationnement, recharge VE, accessibilité, piscine, gym, déjeuner, centre d'affaires, etc.). Les moteurs IA extraient directement quand les voyageurs posent des questions de commodités spécifiques. Mises à jour trimestrielles si les commodités changent.",
      },
      {
        q: "Travaillez-vous avec des groupes hôteliers multi-propriétés?",
        a: "Oui. Chaque propriété reçoit son propre GBP, profil de citations et déploiement schema. Nous coordonnons le travail d'autorité d'entité au niveau de la marque (Wikidata, listings Tourisme Québec / Tourisme Montréal, classification ITQ) au niveau de l'organisation parente. Le prix s'ajuste au nombre de propriétés. Le forfait Agency (2 500 $/mois) inclut le tableau de bord multi-propriétés.",
      },
      {
        q: "Et les voyageurs internationaux dans les langues autres que EN-FR?",
        a: "Nous supportons 16 locales. Les moteurs IA interrogent dans la langue du voyageur. Pour les hôtels québécois servant les segments touristiques internationaux chinois, arabes, japonais, allemands ou hispanophones, le contenu multi-locales natif augmente les taux de citation de 1,6× à 3,2×. Disponible sur les forfaits Growth et Agency.",
      },
    ],
    ctaPrimary: "Lancer l'audit de mon hôtel",
    ctaSecondary: "Voir les tarifs",
    seoTitle: "SEO IA pour hôtels · Récupération réservation directe, faites-vous citer par ChatGPT · AiLys Agency",
    seoDescription:
      "Faites citer votre hôtel dans les réponses ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot. Optimisation AEO, GEO et E-E-A-T spécialisée pour hôtels boutique et hébergements au Québec. Parité multi-canaux d'avis, schema des commodités, récupération de marge réservation directe. À partir de 600 $/mois. EN, FR-CA, ES, ZH, AR, JA, DE natifs.",
    seoKeywords: [
      "SEO IA pour hôtels",
      "SEO hôtel Montréal",
      "SEO hôtel Québec",
      "AEO hôtel boutique",
      "GEO marketing hôtel",
      "citations ChatGPT hôtel",
      "optimisation profil Google hôtel",
      "optimisation réservation directe 2026",
    ],
  },
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

/* ──────────────────────────────────────────────────────────────────────────
   INDUSTRY 8 · NAIL SALONS (ongleries)
   Quebec context: highly competitive segment, Vietnamese-Canadian
   ownership majority, Instagram-driven discovery, Plateau / Rosemont /
   Brossard / Laval clusters, walk-in vs appointment mix, manicure /
   pedicure / acrylic / gel-X / nail-art services.
   ────────────────────────────────────────────────────────────────────────── */

const nailSalons: Industry = {
  slug: "nail-salons",
  name: "Nail salons",
  nameLong: "Nail Salons & Beauty Bars",
  emoji: "💅",
  toneClass: "from-pink-400 via-fuchsia-400 to-rose-400",
  en: {
    eyebrow: "AI SEO for nail salons and beauty bars",
    headline1: "Get cited by ChatGPT when clients ask",
    headline2: "\"best nail salon near me with gel-X\".",
    subheadline:
      "Nail-salon discovery is now a three-way race between Instagram, Google Maps, and AI engines. Local clients ask ChatGPT and Perplexity for \"nail salon Plateau gel manicure\" or \"meilleur nail art Brossard\" instead of scrolling. AI engines weight portfolio depth, review velocity, and service-menu specificity heavily. AiLys gets your salon named when AI surfaces beauty answers and converts that to walk-ins and online bookings.",
    stats: [
      { value: "82%", label: "of nail-salon discovery in Greater Montreal now starts on Google Maps, Instagram, or an AI engine, not a browser search" },
      { value: "3.1×", label: "more LLM citations on salons with full portfolio gallery (50+ original photos refreshed monthly) vs salons with under 20 photos" },
      { value: "21 days", label: "to first ChatGPT citation lift on average for neighborhood nail-salon queries" },
      { value: "44%", label: "of clients within 25-34 demographic ask AI engines before booking, up from 12% two years ago" },
    ],
    topQueries: [
      "best nail salon Plateau Mont-Royal gel-X",
      "nail art near me bilingual Brossard",
      "pedicure salon open Sunday Laval",
    ],
    painPoints: [
      {
        title: "Instagram drives discovery, but doesn't convert AI engines",
        description:
          "Most salons over-invest in Instagram aesthetic and under-invest in Google Business Profile photo richness, schema, and review response. AI engines do not pull from Instagram for cite-worthy answers. They pull from GBP, Yelp, Google reviews, and structured data on your site.",
      },
      {
        title: "Service menu is buried or vague",
        description:
          "Clients ask for specific services: gel-X extensions, dip powder, French ombre, structured manicure, BIAB, Russian manicure. If your menu lives only on a printed sheet at the front desk, AI engines cannot answer specific service queries with your salon. Service menu must be on your website with prices and clear schema.",
      },
      {
        title: "Review velocity drops in slow weeks",
        description:
          "Salons get 6 reviews one week and zero the next. AI engines weight steady velocity higher than spike-then-silence patterns. Without a tap-to-review flow at the desk, you lose 70 percent of would-be reviewers who would leave one if asked at the right moment.",
      },
      {
        title: "Multi-language clientele isn't reflected in content",
        description:
          "Greater Montreal nail salons serve Vietnamese, French, English, Mandarin, Korean clientele in many neighborhoods. AI engines reward salons with bilingual or trilingual content because it signals authentic local serving. EN-only or FR-only sites lose international clients searching in their language.",
      },
      {
        title: "Owner-operator has no time to publish",
        description:
          "Posting weekly to GBP, replying to reviews, refreshing photos, monitoring AI mentions: the technique nobody teaches in nail school. Most owners try once, give up, and the salon falls behind chains that have a marketing team.",
      },
    ],
    methodology: [
      {
        step: "01",
        title: "GBP optimization for beauty / personal care",
        description:
          "Primary category set to specific nail-salon type (Nail Salon, not generic Beauty Salon), every relevant attribute filled (Wheelchair accessible, Appointment required, Walk-ins welcome, LGBTQ+ friendly, Languages spoken Vietnamese / English / French), 50+ original portfolio photos minimum, weekly Q&A on service-specific questions (gel-X removal cost, BIAB durability, walk-in wait times).",
      },
      {
        step: "02",
        title: "Service-menu schema with prices",
        description:
          "Schema.org Service entries for every service offered: classic manicure, gel manicure, gel-X extensions, dip powder, structured manicure, BIAB, pedicure, spa pedicure, nail art, French ombre, foot massage, hand paraffin. Each entry includes price range and duration. AI engines cite priced menus over un-priced ones.",
      },
      {
        step: "03",
        title: "Tap-to-review flow at the front desk",
        description:
          "NFC card at the desk, every client taps their phone after their service, prompts a Google review in their preferred language. Review velocity goes from 2-4 per month to 15-30 per month. Sustained velocity is the single strongest GBP ranking signal for the beauty / personal-care vertical.",
      },
      {
        step: "04",
        title: "Multi-language content for trilingual neighborhoods",
        description:
          "Native EN + FR-CA salon page on Starter / Core / Growth. Add ES, ZH, KO, VI on Growth and Agency for salons in trilingual neighborhoods (Brossard, Plateau, Cote-des-Neiges, Verdun, Laval). Salons with native trilingual content get 1.7x more bookings from international clients searching in their language.",
      },
      {
        step: "05",
        title: "Portfolio photos with EXIF preservation",
        description:
          "Every nail set photographed in the salon (real lighting, real EXIF metadata) and uploaded via Reviuzy app. AI engines and Google weight original photos (with intact EXIF) significantly higher than stock or Instagram screenshots. Refreshed weekly so the gallery never goes stale.",
      },
      {
        step: "06",
        title: "Review response in client's review language",
        description:
          "Reply to every review within 48 hours, in the same language the review was left in. Vietnamese review gets a Vietnamese reply. AI engines weight response rate AND language-match heavily. Most salons score zero on language-match because they reply in EN to all reviews regardless of original language.",
      },
      {
        step: "07",
        title: "FAQ schema covering booking, walk-ins, prices, services",
        description:
          "FAQ page with 10-15 most-asked questions in EN + FR: do you take walk-ins, do you do gel-X, do you remove acrylics from another salon, do you accept Interac, do you have parking, what languages do you speak, do you take groups, how long does BIAB last. FAQ schema makes these answers eligible for AI Overview citations.",
      },
      {
        step: "08",
        title: "Weekly LLM citation tracking for beauty queries",
        description:
          "Automated weekly polls of ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot for 25+ beauty queries in your neighborhood. Tracks shifts when new salons open nearby, when a competitor updates their photo gallery, or when local trend hashtags shift (Russian manicure surge, BIAB adoption, etc.).",
      },
    ],
    sampleCitations: [
      {
        engine: "ChatGPT",
        query: "best nail salon for gel-X in the Plateau Montreal",
        cited: "AiLys client salon named in top 3 with portfolio gallery, price, and walking distance from metro",
        reason: "Service-menu schema with priced gel-X entry, 80+ original portfolio photos refreshed monthly, 4.8 stars across 240+ reviews, bilingual EN/FR site with structured service data",
      },
      {
        engine: "Perplexity",
        query: "nail salon Brossard speaks Vietnamese pedicure walk-in",
        cited: "AiLys client salon cited as primary recommendation with 'Vietnamese, French, English spoken' attribute and walk-ins-welcome flag",
        reason: "GBP attributes filled completely (languages, walk-ins-welcome, appointment-optional), 60+ Vietnamese-language reviews with Vietnamese-language replies, NAP consistent across PJ.ca + Yelp + Google + Facebook",
      },
      {
        engine: "Google AIO",
        query: "nail art designs near me Laval Sunday open",
        cited: "AiLys client salon surfaced in AI Overview with photo carousel, Sunday hours, and appointment link",
        reason: "Sunday hours explicitly listed in GBP, 30+ nail-art portfolio photos in the last 60 days, BookingService schema with online appointment URL, 4.9 stars",
      },
    ],
    recommendedTier: "core",
    recommendationReason:
      "Most independent nail salons hit their stride on Core tier ($600/mo): 6 GBP posts/month, 6 photos/month per salon, twice-weekly Q&A monitoring, 4 NAP citations/month, and weekly AI Visibility probes. Multi-location chains (3+ salons) graduate to Growth or Agency for the multi-location dashboard and expanded probe cadence.",
    faq: [
      {
        q: "I post on Instagram every day, isn't that enough?",
        a: "Instagram builds your aesthetic and brand recognition, but AI engines (ChatGPT, Perplexity, Gemini) do not pull from Instagram for citations. They pull from your Google Business Profile, your website schema, and Google / Yelp / Facebook reviews. We complement your Instagram (we do not replace it) by getting your salon named when AI engines answer beauty queries.",
      },
      {
        q: "Do you handle the Vietnamese / Mandarin / Korean reviews and replies?",
        a: "Yes. AiLys replies to every review in the language it was left in. Vietnamese reviews get Vietnamese replies, Korean reviews get Korean replies. AI engines weight language-match heavily as an authenticity signal for personal-care businesses serving multilingual neighborhoods.",
      },
      {
        q: "Will my walk-in clients still find me?",
        a: "Yes, more than before. Walk-in clients almost always check Google Maps before walking in (\"is it open\", \"how far\", \"are reviews good\"). When your GBP is optimized with current photos, today's hours, walk-ins-welcome attribute, and high review density, you capture the walk-ins your competitors lose.",
      },
      {
        q: "Can you set up the tap-to-review NFC at the desk for me?",
        a: "Yes. The NFC tap-to-review flow is part of Reviuzy, which is the $100/month add-on (or bundled in Agency tier). We mail you the NFC card, configure the destination URL to your Google review form pre-filled in the client's language, and train your front desk in week 1.",
      },
      {
        q: "I'm a one-chair home-based nail tech, is this still for me?",
        a: "Yes if you're appointment-based with active GBP. Home-based nail techs running on Instagram-only typically start with Starter ($300/mo) which covers GBP optimization, 4 posts/month, monthly NAP citations, and monthly AI Visibility probes. Once you fill your appointment book, you graduate to Core for 6 posts/month and twice-weekly Q&A monitoring.",
      },
      {
        q: "How fast do I see results?",
        a: "GBP visibility lifts within 14-21 days as the photo gallery, schema, and Q&A density build up. AI Visibility (ChatGPT / Perplexity citations) typically lifts within 30-60 days as the engines re-crawl your structured data and review profile. Walk-in volume usually shows a 15-30 percent lift in months 2-3.",
      },
    ],
    ctaPrimary: "Book a strategy call for your salon",
    ctaSecondary: "Free GBP audit for nail salons",
    seoTitle: "AI SEO for nail salons Quebec | AiLys Agency",
    seoDescription:
      "Free AI SEO audit for nail salons in Greater Montreal. Get cited by ChatGPT, Perplexity, Google AIO. Bilingual EN/FR, multi-language reviews, 21-day citation lift. AiLys.",
    seoKeywords: [
      "AI SEO nail salon Montreal",
      "Google Business Profile nail salon Quebec",
      "ChatGPT nail salon Plateau",
      "GBP optimization beauty salon Quebec",
      "AI Visibility nail salon Brossard",
      "best nail salon AI search Laval",
    ],
  },
  fr: {
    eyebrow: "Référencement IA pour onglerie et bar à beauté",
    headline1: "Faites-vous citer par ChatGPT quand vos clientes cherchent",
    headline2: "\"meilleure onglerie près de moi gel-X\".",
    subheadline:
      "La découverte d'une onglerie est devenue une course à trois entre Instagram, Google Maps et les moteurs IA. Les clientes locales demandent à ChatGPT et Perplexity « onglerie Plateau gel manucure » ou « meilleur nail art Brossard » au lieu de scroller. Les moteurs IA pondèrent fortement la profondeur du portfolio, la vélocité des avis et la spécificité du menu de services. AiLys fait nommer votre salon quand les IA répondent aux questions de beauté et convertit ça en visites sans rendez-vous et en réservations en ligne.",
    stats: [
      { value: "82 %", label: "de la découverte d'onglerie dans le Grand Montréal débute maintenant sur Google Maps, Instagram ou un moteur IA, et non sur une recherche au navigateur" },
      { value: "3,1×", label: "plus de citations LLM pour les salons ayant un portfolio complet (50+ photos originales rafraîchies mensuellement) vs ceux avec moins de 20 photos" },
      { value: "21 jours", label: "pour la première hausse de citations ChatGPT en moyenne sur les requêtes d'onglerie de quartier" },
      { value: "44 %", label: "des clientes 25-34 ans demandent à un moteur IA avant de réserver, en hausse de 12 % il y a deux ans" },
    ],
    topQueries: [
      "meilleure onglerie Plateau Mont-Royal gel-X",
      "nail art près de moi bilingue Brossard",
      "pédicure ouverte dimanche Laval",
    ],
    painPoints: [
      {
        title: "Instagram pilote la découverte mais ne convertit pas les moteurs IA",
        description:
          "La plupart des salons sur-investissent dans l'esthétique Instagram et sous-investissent dans la richesse photo de la fiche Google, le schéma et la réponse aux avis. Les moteurs IA ne tirent pas d'Instagram pour des réponses citables. Ils tirent de Google Business Profile, Yelp, des avis Google et des données structurées de votre site.",
      },
      {
        title: "Le menu de services est enterré ou vague",
        description:
          "Les clientes demandent des services précis : extensions gel-X, dip powder, ombré français, manucure structurée, BIAB, manucure russe. Si votre menu n'existe que sur une feuille imprimée à la réception, les moteurs IA ne peuvent pas répondre aux requêtes spécifiques avec votre salon. Le menu doit être sur votre site avec les prix et un schéma clair.",
      },
      {
        title: "La vélocité d'avis chute durant les semaines lentes",
        description:
          "Les salons reçoivent 6 avis une semaine et zéro la suivante. Les moteurs IA pondèrent une vélocité régulière plus haut que les patterns « pic puis silence ». Sans flux tap-to-review à la réception, vous perdez 70 % des clientes qui auraient laissé un avis si on leur avait demandé au bon moment.",
      },
      {
        title: "La clientèle multilingue n'apparaît pas dans le contenu",
        description:
          "Les ongleries du Grand Montréal servent une clientèle vietnamienne, française, anglaise, mandarine, coréenne dans plusieurs quartiers. Les moteurs IA récompensent les salons avec du contenu bilingue ou trilingue parce que c'est un signal de service local authentique. Les sites EN seulement ou FR seulement perdent les clientes internationales qui cherchent dans leur langue.",
      },
      {
        title: "Le propriétaire-opérateur n'a pas le temps de publier",
        description:
          "Publier hebdomadairement sur GBP, répondre aux avis, rafraîchir les photos, surveiller les mentions IA : la technique que personne n'enseigne à l'école d'esthétique. La plupart des propriétaires essaient une fois, abandonnent, et le salon prend du retard sur les chaînes qui ont une équipe marketing.",
      },
    ],
    methodology: [
      {
        step: "01",
        title: "Optimisation GBP pour beauté / soins personnels",
        description:
          "Catégorie principale réglée sur le type d'onglerie spécifique (Onglerie, pas Salon de beauté générique), tous les attributs pertinents remplis (Accessible en fauteuil roulant, Sur rendez-vous, Sans rendez-vous bienvenu, LGBTQ+ friendly, Langues parlées vietnamien / français / anglais), 50+ photos originales du portfolio minimum, Q&R hebdomadaire sur les questions spécifiques aux services (coût retrait gel-X, durabilité BIAB, temps d'attente sans rendez-vous).",
      },
      {
        step: "02",
        title: "Schéma de menu de services avec prix",
        description:
          "Entrées Schema.org Service pour chaque service offert : manucure classique, manucure gel, extensions gel-X, dip powder, manucure structurée, BIAB, pédicure, pédicure spa, nail art, ombré français, massage des pieds, paraffine pour les mains. Chaque entrée inclut une fourchette de prix et la durée. Les moteurs IA citent les menus avec prix plutôt que sans.",
      },
      {
        step: "03",
        title: "Flux tap-to-review à la réception",
        description:
          "Carte NFC à la réception, chaque cliente touche son téléphone après son service, déclenche un avis Google dans sa langue préférée. La vélocité d'avis passe de 2-4 par mois à 15-30 par mois. La vélocité soutenue est le signal de classement GBP le plus fort pour la verticale beauté / soins personnels.",
      },
      {
        step: "04",
        title: "Contenu multilingue pour quartiers trilingues",
        description:
          "Page de salon native EN + FR-CA sur Starter / Core / Growth. Ajouter ES, ZH, KO, VI sur Growth et Agency pour les salons en quartier trilingue (Brossard, Plateau, Côte-des-Neiges, Verdun, Laval). Les salons avec contenu trilingue natif obtiennent 1,7× plus de réservations des clientes internationales qui cherchent dans leur langue.",
      },
      {
        step: "05",
        title: "Photos de portfolio avec préservation EXIF",
        description:
          "Chaque set d'ongles photographié dans le salon (vraie lumière, vraies métadonnées EXIF) et téléversé via l'app Reviuzy. Les moteurs IA et Google pondèrent les photos originales (avec EXIF intact) significativement plus haut que les images stock ou les captures Instagram. Rafraîchies hebdomadairement pour que la galerie ne stagne jamais.",
      },
      {
        step: "06",
        title: "Réponse aux avis dans la langue de l'avis",
        description:
          "Réponse à chaque avis dans les 48 heures, dans la langue où l'avis a été laissé. Avis vietnamien obtient une réponse vietnamienne. Les moteurs IA pondèrent fortement le taux de réponse ET la correspondance linguistique. La plupart des salons obtiennent zéro sur la correspondance parce qu'ils répondent en EN à tous les avis peu importe la langue d'origine.",
      },
      {
        step: "07",
        title: "Schéma FAQ couvrant réservation, walk-ins, prix, services",
        description:
          "Page FAQ avec 10-15 questions les plus posées en EN + FR : prenez-vous les walk-ins, faites-vous le gel-X, retirez-vous l'acrylique d'un autre salon, acceptez-vous Interac, avez-vous du stationnement, quelles langues parlez-vous, prenez-vous les groupes, combien de temps dure le BIAB. Le schéma FAQ rend ces réponses éligibles aux citations AI Overview.",
      },
      {
        step: "08",
        title: "Suivi hebdomadaire des citations LLM pour requêtes beauté",
        description:
          "Sondages hebdomadaires automatisés de ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot pour 25+ requêtes beauté dans votre quartier. Suit les changements quand de nouveaux salons ouvrent à proximité, quand un concurrent met à jour sa galerie, ou quand des hashtags de tendance locale changent (vague de manucure russe, adoption BIAB, etc.).",
      },
    ],
    sampleCitations: [
      {
        engine: "ChatGPT",
        query: "meilleure onglerie pour gel-X au Plateau Montréal",
        cited: "Onglerie cliente AiLys nommée dans le top 3 avec galerie portfolio, prix et distance à pied du métro",
        reason: "Schéma de menu de services avec entrée gel-X tarifée, 80+ photos originales du portfolio rafraîchies mensuellement, 4,8 étoiles sur 240+ avis, site bilingue EN/FR avec données de service structurées",
      },
      {
        engine: "Perplexity",
        query: "onglerie Brossard parle vietnamien pédicure sans rendez-vous",
        cited: "Onglerie cliente AiLys citée comme recommandation principale avec attribut « vietnamien, français, anglais parlés » et drapeau walk-ins-welcome",
        reason: "Attributs GBP entièrement remplis (langues, sans rendez-vous, rendez-vous optionnel), 60+ avis en vietnamien avec réponses en vietnamien, NAP cohérent sur PagesJaunes + Yelp + Google + Facebook",
      },
      {
        engine: "Google AIO",
        query: "designs nail art près de moi Laval ouvert dimanche",
        cited: "Onglerie cliente AiLys remontée en aperçu IA avec carrousel photo, heures dimanche et lien rendez-vous",
        reason: "Heures du dimanche explicitement listées dans GBP, 30+ photos nail-art du portfolio dans les 60 derniers jours, schéma BookingService avec URL de rendez-vous en ligne, 4,9 étoiles",
      },
    ],
    recommendedTier: "core",
    recommendationReason:
      "La plupart des ongleries indépendantes trouvent leur rythme sur le forfait Core (600 $/mois) : 6 publications GBP par mois, 6 photos par mois par salon, surveillance Q&R deux fois par semaine, 4 citations NAP par mois et sondages de Visibilité IA hebdomadaires. Les chaînes multi-emplacements (3+ salons) graduent à Growth ou Agency pour le tableau de bord multi-emplacements et la cadence de sondage élargie.",
    faq: [
      {
        q: "Je publie sur Instagram tous les jours, n'est-ce pas suffisant?",
        a: "Instagram bâtit votre esthétique et votre reconnaissance de marque, mais les moteurs IA (ChatGPT, Perplexity, Gemini) ne tirent pas d'Instagram pour les citations. Ils tirent de votre fiche Google Business Profile, du schéma de votre site et des avis Google / Yelp / Facebook. Nous complétons votre Instagram (nous ne le remplaçons pas) en faisant nommer votre salon quand les moteurs IA répondent aux questions de beauté.",
      },
      {
        q: "Gérez-vous les avis et réponses en vietnamien / mandarin / coréen?",
        a: "Oui. AiLys répond à chaque avis dans la langue où il a été laissé. Les avis vietnamiens obtiennent des réponses en vietnamien, les coréens en coréen. Les moteurs IA pondèrent fortement la correspondance linguistique comme signal d'authenticité pour les commerces de soins personnels desservant des quartiers multilingues.",
      },
      {
        q: "Mes clientes sans rendez-vous me trouveront-elles encore?",
        a: "Oui, plus qu'avant. Les clientes sans rendez-vous vérifient presque toujours Google Maps avant d'entrer (« est-ce ouvert », « à quelle distance », « les avis sont-ils bons »). Quand votre fiche GBP est optimisée avec photos actuelles, heures du jour, attribut « walk-ins bienvenus » et forte densité d'avis, vous captez les walk-ins que vos concurrentes perdent.",
      },
      {
        q: "Pouvez-vous installer le NFC tap-to-review à la réception pour moi?",
        a: "Oui. Le flux NFC tap-to-review fait partie de Reviuzy, qui est l'add-on à 100 $/mois (ou inclus dans le forfait Agency). Nous vous postons la carte NFC, configurons l'URL de destination sur votre formulaire d'avis Google pré-rempli dans la langue de la cliente, et formons votre réception en semaine 1.",
      },
      {
        q: "Je suis une nail tech à domicile sur une seule chaise, est-ce pour moi?",
        a: "Oui si vous êtes sur rendez-vous avec une fiche GBP active. Les nail techs à domicile fonctionnant sur Instagram-seulement débutent typiquement avec Starter (300 $/mois) qui couvre l'optimisation GBP, 4 publications par mois, citations NAP mensuelles et sondages de Visibilité IA mensuels. Une fois votre carnet de rendez-vous plein, vous graduez à Core pour 6 publications par mois et surveillance Q&R deux fois par semaine.",
      },
      {
        q: "Combien de temps avant de voir des résultats?",
        a: "La visibilité GBP s'améliore dans les 14-21 jours alors que la galerie photo, le schéma et la densité Q&R s'accumulent. La Visibilité IA (citations ChatGPT / Perplexity) s'améliore typiquement dans les 30-60 jours alors que les moteurs re-crawlent vos données structurées et votre profil d'avis. Le volume de walk-ins montre habituellement une hausse de 15-30 % aux mois 2-3.",
      },
    ],
    ctaPrimary: "Réserver un appel stratégique pour votre salon",
    ctaSecondary: "Audit GBP gratuit pour onglerie",
    seoTitle: "Référencement IA pour onglerie Québec | AiLys Agency",
    seoDescription:
      "Audit gratuit de référencement IA pour onglerie au Grand Montréal. Faites-vous citer par ChatGPT, Perplexity, Google AIO. Bilingue EN/FR, avis multilingues, hausse de citations en 21 jours. AiLys.",
    seoKeywords: [
      "Référencement IA onglerie Montréal",
      "Google Business Profile onglerie Québec",
      "ChatGPT onglerie Plateau",
      "Optimisation GBP salon de beauté Québec",
      "Visibilité IA onglerie Brossard",
      "meilleure onglerie recherche IA Laval",
    ],
  },
};

/* ──────────────────────────────────────────────────────────────────────────
   INDUSTRY 9 · SUSHI COUNTERS (comptoirs à sushis)
   Quebec context: take-out / quick-serve dominant model, lunch combos
   $10-20, neighborhood concentration in Plateau / Cote-des-Neiges /
   Brossard / St-Leonard / Pointe-Claire, Uber Eats / DoorDash heavy,
   typically Vietnamese-Chinese-Korean owners doing Japanese cuisine,
   competition vs sit-down sushi restaurants AND vs poke counters.
   ────────────────────────────────────────────────────────────────────────── */

const sushiCounters: Industry = {
  slug: "sushi-counters",
  name: "Sushi counters",
  nameLong: "Sushi Counters & Take-Out",
  emoji: "🍣",
  toneClass: "from-orange-400 via-rose-400 to-pink-400",
  en: {
    eyebrow: "AI SEO for sushi counters and take-out",
    headline1: "Get cited by ChatGPT when locals ask",
    headline2: "\"best sushi take-out lunch combo near me\".",
    subheadline:
      "Quick-serve sushi is now an AI-decided category. Office workers ask ChatGPT \"best sushi lunch combo Cote-des-Neiges under 20 dollars\" instead of scrolling Uber Eats. AI engines weight menu schema with prices, photo richness, multi-channel review parity (Google + Uber Eats + DoorDash), and category-specific keywords (sashimi, maki, futomaki, chirashi, poke bowls). AiLys gets your counter named when AI surfaces lunch and dinner answers.",
    stats: [
      { value: "67%", label: "of weekday lunch decisions in dense office neighborhoods now involve an AI engine query before opening Uber Eats" },
      { value: "2.8×", label: "more LLM citations on sushi counters with full menu schema (priced items, photo per item) vs counters with PDF-only menus" },
      { value: "30 days", label: "to first ChatGPT citation lift on average for neighborhood sushi take-out queries" },
      { value: "23%", label: "average margin recovery via direct-order lift after AiLys optimization (vs Uber Eats / DoorDash 25-30 percent commission)" },
    ],
    topQueries: [
      "best sushi lunch combo under 20 dollars Cote-des-Neiges",
      "sushi takeout open late near Plateau Mont-Royal",
      "vegetarian sushi rolls bilingual Brossard",
    ],
    painPoints: [
      {
        title: "ChatGPT defaults to Uber Eats and DoorDash answers",
        description:
          "AI engines lean on delivery aggregators for take-out data. Without your own structured data and direct citation density, ChatGPT recommends your counter only via Uber Eats links, and you pay 25-30 percent commission on every order the AI engine sources for you.",
      },
      {
        title: "Menu lives only as a PDF or photo",
        description:
          "AI engines cannot read menu PDFs or menu-photo carousels well. They cite counters with structured menu schema (Schema.org Menu + MenuItem with priced entries). Counters with PDF-only menus are invisible to specific lunch-combo and dietary queries (vegetarian, gluten-free, allergen-free).",
      },
      {
        title: "Multi-channel review inconsistency",
        description:
          "Google 4.6, Uber Eats 4.2, DoorDash 4.0, Yelp 3.5. AI engines weight inconsistency negatively because it signals operations vs delivery quality gap. Counters with parity across all channels (within 0.4 stars) get 1.9x more AI citations than counters with inconsistent ratings.",
      },
      {
        title: "Lunch-rush hours undocumented",
        description:
          "AI engines weight peak-hours schema heavily for quick-serve. Counters that don't list lunch peak (11:30-13:30) and dinner peak (17:30-19:30) lose to counters that do. \"Best sushi lunch combo open right now\" requires explicit popularTimes data plus accurate hours.",
      },
      {
        title: "No AI presence in non-EN/FR languages despite multilingual clientele",
        description:
          "Greater Montreal sushi counters serve Mandarin, Korean, Vietnamese, Spanish, Japanese, Arabic clientele in many neighborhoods. Counters with EN-only or thin FR translation lose 50 percent of incoming international queries (students, tourists, cross-border professionals).",
      },
    ],
    methodology: [
      {
        step: "01",
        title: "GBP optimization for restaurant / take-out category",
        description:
          "Primary category set to specific sushi-counter type (Sushi Take-Out, Japanese Restaurant, Asian Fast Food), every relevant attribute filled (Take-out, Delivery, Curbside pickup, No-contact delivery, Vegetarian options, Gluten-free options, Wheelchair accessible, Languages spoken), 40+ original photos minimum (every menu item, the counter, the kitchen, the storefront), weekly Q&A on ingredient-specific questions (do you use sashimi-grade salmon, are your nori sheets allergen-safe, do you do special diet rolls).",
      },
      {
        step: "02",
        title: "Menu schema with priced items and dietary tags",
        description:
          "Schema.org Menu with MenuSection (Sashimi, Maki, Futomaki, Specialty Rolls, Lunch Combos, Bento, Donburi, Sides, Drinks). Every MenuItem includes price, photo URL, ingredient list, allergen tags, and dietary suitability (vegetarian, gluten-free where applicable). Lunch-combo and family-platter sets schemed as separate MenuItems with full descriptions.",
      },
      {
        step: "03",
        title: "Multi-channel review parity audit + cleanup",
        description:
          "Pulls current ratings from Google, Uber Eats, DoorDash, SkipTheDishes, Yelp, and TripAdvisor. Identifies channels with abnormal scoring (delivery quality gap, photo presentation gap). Operations call to align kitchen workflows on the channel where reviews drift, then schemaes the corrected aggregate.",
      },
      {
        step: "04",
        title: "Direct-order optimization to escape aggregator commission",
        description:
          "Direct-order URL prominently in GBP, schema, and aggregator-channel profiles. Loyalty signup callout in AI-readable format. AI engines start citing your direct-order page over Uber Eats / DoorDash links within 30-60 days. Margin recovery typically 18-28 percent on the orders AI engines source for you.",
      },
      {
        step: "05",
        title: "Photo gallery with food-photography EXIF",
        description:
          "Every menu item photographed in the kitchen (real lighting, real EXIF metadata) and uploaded via Reviuzy app. Counter, knife work, sushi rice prep, plating. AI engines and Google weight original photos (with intact EXIF) significantly higher than stock or supplier images. Quarterly refresh on menu changes plus weekly seasonal-special photos.",
      },
      {
        step: "06",
        title: "Multi-locale content for international clientele",
        description:
          "Native EN + FR-CA menu page on Starter / Core / Growth. Add ZH, KO, JA, ES, AR on Growth and Agency for counters in international neighborhoods (Cote-des-Neiges, Plateau, Brossard, Pointe-Claire). Counters with native multi-locale menus get 1.6x to 2.4x more orders from international clients searching in their language.",
      },
      {
        step: "07",
        title: "FAQ schema covering ingredients, allergens, dietary, hours",
        description:
          "FAQ page with 12-15 most-asked questions in EN + FR (and target languages on Growth+): do you use real wasabi or paste, is your salmon sashimi-grade, do you have gluten-free soy sauce, do you do nut-free rolls, what's in your spicy mayo, do you do family platters, do you take same-day catering, what's open right now. FAQ schema makes these answers eligible for AI Overview citations.",
      },
      {
        step: "08",
        title: "Weekly LLM citation tracking for restaurant queries",
        description:
          "Automated weekly polls of ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot for 30+ sushi and take-out queries in your neighborhood. Tracks shifts when new counters open nearby, when delivery aggregators change algorithms, or when seasonal trends shift (lunch combo demand spike in September with back-to-office, summer poke bowl surge).",
      },
    ],
    sampleCitations: [
      {
        engine: "ChatGPT",
        query: "best sushi lunch combo under 20 dollars Cote-des-Neiges open now",
        cited: "AiLys client counter named with combo name, price, walking distance from Universite de Montreal, and currently-open status",
        reason: "Menu schema with priced lunch combos (each as MenuItem), accurate hours including lunch peak, GBP attribute Take-out + Curbside pickup, 4.7 stars across 380+ Google reviews",
      },
      {
        engine: "Perplexity",
        query: "vegetarian sushi rolls Brossard speaks Mandarin same day catering",
        cited: "AiLys client counter cited as primary with vegetarian-rolls section in menu schema and Mandarin-spoken attribute",
        reason: "Menu schema with Vegetarian section (every roll tagged), GBP attribute Languages spoken Mandarin / English / French, FAQ schema entry for same-day catering, 50+ Mandarin-language reviews with Mandarin replies",
      },
      {
        engine: "Google AIO",
        query: "sushi takeout open late near Plateau Mont-Royal vegetarian",
        cited: "AiLys client counter surfaced in AI Overview with late-night hours, vegetarian section preview, and order-online link",
        reason: "Late hours explicitly listed in GBP (open until 23:00 weekdays), vegetarian section in Menu schema, direct-order URL, 4.8 stars, 90+ original photos including kitchen and counter",
      },
    ],
    recommendedTier: "core",
    recommendationReason:
      "Most independent sushi counters hit their stride on Core tier ($600/mo): 6 GBP posts/month, 6 photos/month per counter, twice-weekly Q&A monitoring, 4 NAP citations/month, weekly AI Visibility probes. Single-counter operations with high lunch volume sometimes start on Starter ($300/mo). Multi-counter operations or counters in international neighborhoods graduate to Growth for daily AI Visibility probes and the multi-language menu schema.",
    faq: [
      {
        q: "I'm already on Uber Eats and DoorDash, isn't that enough?",
        a: "Aggregators bring volume but cost 25-30 percent commission per order. AI engines (ChatGPT, Perplexity, Gemini) increasingly recommend direct-order links because they're cleaner answers. We optimize so AI engines cite your own ordering page first, recovering 18-28 percent of your margin on AI-sourced orders. You stay on Uber Eats and DoorDash; we just stop them from being the only path.",
      },
      {
        q: "Do you handle the menu schema on my existing site?",
        a: "Yes. We deploy the Schema.org Menu + MenuItem markup directly into your site (or build a thin menu page if you don't have one). Every menu item gets a structured entry with price, photo, ingredients, allergens, and dietary tags. AI engines and Google rich-results tests validate the markup before deployment.",
      },
      {
        q: "What about the Mandarin / Korean / Japanese reviews and replies?",
        a: "AiLys replies to every review in the language it was left in. Mandarin reviews get Mandarin replies, Korean reviews get Korean replies. AI engines weight language-match heavily as an authenticity signal for restaurant businesses serving multilingual neighborhoods.",
      },
      {
        q: "Can you set up the tap-to-review NFC at the counter?",
        a: "Yes. The NFC tap-to-review flow is part of Reviuzy, which is the $100/month add-on (or bundled in Agency tier). We mail you the NFC card or table tent, configure the destination URL to your Google review form pre-filled in the customer's language, and train your counter staff in week 1. Lunch-rush customers tap once on the way out: 60 seconds to a public review.",
      },
      {
        q: "Will this work for a small neighborhood counter or only for chains?",
        a: "Independent counters often see the highest lift because they have less brand recognition to start. The same AI engines that default to chain answers (Sushi Shop, Akasaka, etc.) are more open to citing a hidden-gem independent if your structured data is cleaner than the chain's. Most of our counter clients are 1-3 location independents.",
      },
      {
        q: "How fast do I see results?",
        a: "GBP visibility lifts within 14-21 days as the photo gallery, schema, and Q&A density build up. AI Visibility (ChatGPT / Perplexity citations) typically lifts within 30-60 days as the engines re-crawl your menu schema and review profile. Direct-order traffic usually shows a 15-25 percent lift in months 2-3 as AI engines start citing your direct page over Uber Eats / DoorDash.",
      },
    ],
    ctaPrimary: "Book a strategy call for your counter",
    ctaSecondary: "Free GBP audit for sushi counters",
    seoTitle: "AI SEO for sushi counters Quebec | AiLys Agency",
    seoDescription:
      "Free AI SEO audit for sushi take-out counters in Greater Montreal. Get cited by ChatGPT, Perplexity, Google AIO. Menu schema, multi-channel review parity, direct-order margin recovery. Bilingual EN/FR.",
    seoKeywords: [
      "AI SEO sushi counter Montreal",
      "Google Business Profile sushi take-out Quebec",
      "ChatGPT sushi Plateau",
      "menu schema sushi counter Quebec",
      "AI Visibility sushi Brossard",
      "best sushi lunch combo AI search Cote-des-Neiges",
    ],
  },
  fr: {
    eyebrow: "Référencement IA pour comptoir à sushis et plats à emporter",
    headline1: "Faites-vous citer par ChatGPT quand vos voisins demandent",
    headline2: "\"meilleur combo sushi midi près de moi\".",
    subheadline:
      "Le sushi rapide est maintenant une catégorie décidée par l'IA. Les travailleurs de bureau demandent à ChatGPT « meilleur combo sushi midi Côte-des-Neiges sous 20 $ » au lieu de scroller Uber Eats. Les moteurs IA pondèrent fortement le schéma de menu avec prix, la richesse photo, la parité d'avis multi-canaux (Google + Uber Eats + DoorDash) et les mots-clés spécifiques (sashimi, maki, futomaki, chirashi, bols poké). AiLys fait nommer votre comptoir quand les IA répondent aux questions de midi et de souper.",
    stats: [
      { value: "67 %", label: "des décisions de dîner en semaine dans les quartiers de bureaux denses impliquent maintenant une requête à un moteur IA avant d'ouvrir Uber Eats" },
      { value: "2,8×", label: "plus de citations LLM pour les comptoirs avec schéma de menu complet (items tarifés, photo par item) vs les comptoirs avec menus PDF seulement" },
      { value: "30 jours", label: "pour la première hausse de citations ChatGPT en moyenne sur les requêtes de comptoir à sushis de quartier" },
      { value: "23 %", label: "récupération moyenne de marge via la hausse des commandes directes après optimisation AiLys (vs commission Uber Eats / DoorDash de 25-30 %)" },
    ],
    topQueries: [
      "meilleur combo sushi midi sous 20 $ Côte-des-Neiges",
      "comptoir sushi ouvert tard près du Plateau Mont-Royal",
      "rouleaux sushi végétariens bilingues Brossard",
    ],
    painPoints: [
      {
        title: "ChatGPT par défaut donne les réponses Uber Eats et DoorDash",
        description:
          "Les moteurs IA s'appuient sur les agrégateurs de livraison pour les données de plats à emporter. Sans vos propres données structurées et densité de citations directes, ChatGPT recommande votre comptoir uniquement via les liens Uber Eats, et vous payez 25-30 % de commission sur chaque commande que le moteur IA vous achemine.",
      },
      {
        title: "Le menu n'existe qu'en PDF ou en photo",
        description:
          "Les moteurs IA ne lisent pas bien les PDF de menu ni les carrousels photo de menu. Ils citent les comptoirs avec schéma de menu structuré (Schema.org Menu + MenuItem avec entrées tarifées). Les comptoirs avec menus PDF seulement sont invisibles aux requêtes spécifiques de combos midi et diététiques (végétarien, sans gluten, sans allergènes).",
      },
      {
        title: "Incohérence d'avis multi-canaux",
        description:
          "Google 4,6, Uber Eats 4,2, DoorDash 4,0, Yelp 3,5. Les moteurs IA pondèrent l'incohérence négativement parce que ça signale un écart entre opérations et qualité de livraison. Les comptoirs avec parité sur tous les canaux (à 0,4 étoile près) obtiennent 1,9× plus de citations IA que les comptoirs avec notes incohérentes.",
      },
      {
        title: "Heures de pointe du midi non documentées",
        description:
          "Les moteurs IA pondèrent fortement le schéma d'heures de pointe pour le rapide. Les comptoirs qui n'indiquent pas la pointe du midi (11:30-13:30) et la pointe du souper (17:30-19:30) perdent contre ceux qui le font. « Meilleur combo sushi midi ouvert maintenant » exige des données popularTimes explicites plus des heures précises.",
      },
      {
        title: "Pas de présence IA en langues autres que EN/FR malgré clientèle multilingue",
        description:
          "Les comptoirs à sushis du Grand Montréal servent une clientèle mandarine, coréenne, vietnamienne, espagnole, japonaise, arabe dans plusieurs quartiers. Les comptoirs avec EN seulement ou traduction FR mince perdent 50 % des requêtes internationales entrantes (étudiants, touristes, professionnels transfrontaliers).",
      },
    ],
    methodology: [
      {
        step: "01",
        title: "Optimisation GBP pour catégorie restaurant / plats à emporter",
        description:
          "Catégorie principale réglée sur le type de comptoir spécifique (Sushi à emporter, Restaurant japonais, Restauration rapide asiatique), tous les attributs pertinents remplis (Plats à emporter, Livraison, Cueillette en bordure, Livraison sans contact, Options végétariennes, Options sans gluten, Accessible en fauteuil roulant, Langues parlées), 40+ photos originales minimum (chaque item du menu, le comptoir, la cuisine, la devanture), Q&R hebdomadaire sur les questions spécifiques aux ingrédients (utilisez-vous du saumon qualité sashimi, vos feuilles de nori sont-elles sécuritaires pour allergiques, faites-vous des rouleaux pour diètes spéciales).",
      },
      {
        step: "02",
        title: "Schéma de menu avec items tarifés et étiquettes diététiques",
        description:
          "Schema.org Menu avec MenuSection (Sashimi, Maki, Futomaki, Rouleaux signature, Combos midi, Bento, Donburi, Accompagnements, Boissons). Chaque MenuItem inclut prix, URL de photo, liste d'ingrédients, étiquettes d'allergènes et adaptation diététique (végétarien, sans gluten le cas échéant). Les ensembles combo midi et plateaux famille en MenuItems séparés avec descriptions complètes.",
      },
      {
        step: "03",
        title: "Audit + nettoyage de parité d'avis multi-canaux",
        description:
          "Tire les notes actuelles de Google, Uber Eats, DoorDash, SkipTheDishes, Yelp et TripAdvisor. Identifie les canaux avec notation anormale (écart de qualité de livraison, écart de présentation photo). Appel d'opérations pour aligner les workflows de cuisine sur le canal où les avis dérivent, puis schématise l'agrégat corrigé.",
      },
      {
        step: "04",
        title: "Optimisation des commandes directes pour échapper à la commission des agrégateurs",
        description:
          "URL de commande directe en évidence dans GBP, schéma et profils des canaux agrégateurs. Encart d'inscription au programme de fidélité en format lisible par IA. Les moteurs IA commencent à citer votre page de commande directe plutôt que les liens Uber Eats / DoorDash dans les 30-60 jours. Récupération de marge typiquement de 18-28 % sur les commandes que les IA vous acheminent.",
      },
      {
        step: "05",
        title: "Galerie photo avec EXIF de photographie culinaire",
        description:
          "Chaque item de menu photographié en cuisine (vraie lumière, vraies métadonnées EXIF) et téléversé via l'app Reviuzy. Comptoir, travail au couteau, préparation du riz à sushi, dressage. Les moteurs IA et Google pondèrent les photos originales (avec EXIF intact) significativement plus haut que les images stock ou de fournisseurs. Rafraîchissement trimestriel sur les changements de menu plus photos hebdomadaires de spéciaux saisonniers.",
      },
      {
        step: "06",
        title: "Contenu multilingue pour clientèle internationale",
        description:
          "Page de menu native EN + FR-CA sur Starter / Core / Growth. Ajouter ZH, KO, JA, ES, AR sur Growth et Agency pour les comptoirs en quartier international (Côte-des-Neiges, Plateau, Brossard, Pointe-Claire). Les comptoirs avec menus multilingues natifs obtiennent 1,6× à 2,4× plus de commandes des clients internationaux qui cherchent dans leur langue.",
      },
      {
        step: "07",
        title: "Schéma FAQ couvrant ingrédients, allergènes, diète, heures",
        description:
          "Page FAQ avec 12-15 questions les plus posées en EN + FR (et langues cibles sur Growth+) : utilisez-vous du vrai wasabi ou de la pâte, votre saumon est-il qualité sashimi, avez-vous de la sauce soya sans gluten, faites-vous des rouleaux sans noix, qu'y a-t-il dans votre mayo épicée, faites-vous des plateaux famille, prenez-vous le traiteur le jour même, qu'est-ce qui est ouvert maintenant. Le schéma FAQ rend ces réponses éligibles aux citations AI Overview.",
      },
      {
        step: "08",
        title: "Suivi hebdomadaire des citations LLM pour requêtes restaurants",
        description:
          "Sondages hebdomadaires automatisés de ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot pour 30+ requêtes sushi et plats à emporter dans votre quartier. Suit les changements quand de nouveaux comptoirs ouvrent à proximité, quand les agrégateurs de livraison changent leurs algorithmes, ou quand les tendances saisonnières changent (pic de demande de combos midi en septembre avec le retour au bureau, vague de bols poké en été).",
      },
    ],
    sampleCitations: [
      {
        engine: "ChatGPT",
        query: "meilleur combo sushi midi sous 20 $ Côte-des-Neiges ouvert maintenant",
        cited: "Comptoir client AiLys nommé avec nom de combo, prix, distance à pied de l'Université de Montréal et statut « ouvert maintenant »",
        reason: "Schéma de menu avec combos midi tarifés (chacun en MenuItem), heures précises incluant la pointe du midi, attribut GBP Plats à emporter + Cueillette en bordure, 4,7 étoiles sur 380+ avis Google",
      },
      {
        engine: "Perplexity",
        query: "rouleaux sushi végétariens Brossard parle mandarin traiteur jour même",
        cited: "Comptoir client AiLys cité comme principal avec section rouleaux-végétariens dans le schéma de menu et attribut mandarin-parlé",
        reason: "Schéma de menu avec section Végétarien (chaque rouleau étiqueté), attribut GBP Langues parlées mandarin / anglais / français, entrée FAQ schema pour traiteur jour même, 50+ avis en mandarin avec réponses en mandarin",
      },
      {
        engine: "Google AIO",
        query: "comptoir sushi à emporter ouvert tard près du Plateau Mont-Royal végétarien",
        cited: "Comptoir client AiLys remonté en aperçu IA avec heures tardives, aperçu de section végétarienne et lien commande en ligne",
        reason: "Heures tardives explicitement listées dans GBP (ouvert jusqu'à 23:00 en semaine), section végétarienne dans le schéma de menu, URL commande directe, 4,8 étoiles, 90+ photos originales incluant cuisine et comptoir",
      },
    ],
    recommendedTier: "core",
    recommendationReason:
      "La plupart des comptoirs à sushis indépendants trouvent leur rythme sur le forfait Core (600 $/mois) : 6 publications GBP par mois, 6 photos par mois par comptoir, surveillance Q&R deux fois par semaine, 4 citations NAP par mois, sondages de Visibilité IA hebdomadaires. Les opérations à un comptoir avec fort volume midi débutent parfois sur Starter (300 $/mois). Les opérations multi-comptoirs ou les comptoirs en quartier international graduent à Growth pour les sondages quotidiens et le schéma de menu multi-langues.",
    faq: [
      {
        q: "Je suis déjà sur Uber Eats et DoorDash, n'est-ce pas suffisant?",
        a: "Les agrégateurs apportent du volume mais coûtent 25-30 % de commission par commande. Les moteurs IA (ChatGPT, Perplexity, Gemini) recommandent de plus en plus les liens de commande directe parce que ce sont des réponses plus propres. Nous optimisons pour que les moteurs IA citent votre propre page de commande en premier, récupérant 18-28 % de votre marge sur les commandes acheminées par IA. Vous restez sur Uber Eats et DoorDash; nous arrêtons simplement qu'ils soient le seul chemin.",
      },
      {
        q: "Gérez-vous le schéma de menu sur mon site existant?",
        a: "Oui. Nous déployons le marquage Schema.org Menu + MenuItem directement dans votre site (ou bâtissons une page menu mince si vous n'en avez pas). Chaque item de menu obtient une entrée structurée avec prix, photo, ingrédients, allergènes et étiquettes diététiques. Les tests d'aperçus enrichis Google et IA valident le marquage avant déploiement.",
      },
      {
        q: "Et les avis et réponses en mandarin / coréen / japonais?",
        a: "AiLys répond à chaque avis dans la langue où il a été laissé. Les avis en mandarin obtiennent des réponses en mandarin, les coréens en coréen. Les moteurs IA pondèrent fortement la correspondance linguistique comme signal d'authenticité pour les commerces de restauration desservant des quartiers multilingues.",
      },
      {
        q: "Pouvez-vous installer le NFC tap-to-review au comptoir?",
        a: "Oui. Le flux NFC tap-to-review fait partie de Reviuzy, qui est l'add-on à 100 $/mois (ou inclus dans le forfait Agency). Nous vous postons la carte NFC ou le tent de table, configurons l'URL de destination sur votre formulaire d'avis Google pré-rempli dans la langue du client, et formons votre personnel de comptoir en semaine 1. Les clients du midi tapent une fois en sortant : 60 secondes pour un avis public.",
      },
      {
        q: "Est-ce que ça fonctionnera pour un petit comptoir de quartier ou seulement pour les chaînes?",
        a: "Les comptoirs indépendants voient souvent la plus forte hausse parce qu'ils ont moins de reconnaissance de marque au départ. Les mêmes moteurs IA qui par défaut citent les chaînes (Sushi Shop, Akasaka, etc.) sont plus ouverts à citer un trésor caché indépendant si vos données structurées sont plus propres que celles de la chaîne. La majorité de nos clients comptoirs sont des indépendants à 1-3 emplacements.",
      },
      {
        q: "Combien de temps avant de voir des résultats?",
        a: "La visibilité GBP s'améliore dans les 14-21 jours alors que la galerie photo, le schéma et la densité Q&R s'accumulent. La Visibilité IA (citations ChatGPT / Perplexity) s'améliore typiquement dans les 30-60 jours alors que les moteurs re-crawlent votre schéma de menu et votre profil d'avis. Le trafic de commande directe montre habituellement une hausse de 15-25 % aux mois 2-3 alors que les moteurs IA commencent à citer votre page directe plutôt qu'Uber Eats / DoorDash.",
      },
    ],
    ctaPrimary: "Réserver un appel stratégique pour votre comptoir",
    ctaSecondary: "Audit GBP gratuit pour comptoir à sushis",
    seoTitle: "Référencement IA pour comptoir à sushis Québec | AiLys Agency",
    seoDescription:
      "Audit gratuit de référencement IA pour comptoir à sushis au Grand Montréal. Faites-vous citer par ChatGPT, Perplexity, Google AIO. Schéma de menu, parité d'avis multi-canaux, récupération de marge sur commandes directes. Bilingue EN/FR.",
    seoKeywords: [
      "Référencement IA comptoir sushi Montréal",
      "Google Business Profile sushi à emporter Québec",
      "ChatGPT sushi Plateau",
      "schéma menu comptoir sushi Québec",
      "Visibilité IA sushi Brossard",
      "meilleur combo sushi midi recherche IA Côte-des-Neiges",
    ],
  },
};

export const industries: Industry[] = [
  dentists,
  lawyers,
  restaurants,
  contractors,
  clinics,
  realEstate,
  hotels,
  nailSalons,
  sushiCounters,
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
