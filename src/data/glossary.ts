// AiLys Agency · Glossary
//
// Routes: /glossary, /glossary/:slug, /:lang/glossary, /:lang/glossary/:slug
// Each term is its own page targeting definitional search queries
// ("what is AEO", "what is GEO", "schema markup explained").
// Generates semantic SEO + internal-link density on landing pages.
//
// EN canonical. FR-CA full coverage. Other languages fall back to EN.

export interface GlossaryTerm {
  slug: string;
  term: string; // EN
  termFr: string; // FR-CA
  category: "ai-search" | "classical-seo" | "schema" | "review-velocity" | "tooling";
  // Short definition (1 sentence, used in tooltips, internal-links, meta-description)
  shortEn: string;
  shortFr: string;
  // Long definition (3-5 paragraphs, the actual page content)
  longEn: string;
  longFr: string;
  // Related terms (slugs)
  related: string[];
  // Optional related blog post slug
  relatedBlogSlug?: string;
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "aeo",
    term: "AEO (Answer Engine Optimization)",
    termFr: "AEO (Answer Engine Optimization)",
    category: "ai-search",
    shortEn:
      "Answer Engine Optimization. The practice of structuring content so AI engines like ChatGPT and Perplexity can extract a clean, direct answer from your site.",
    shortFr:
      "Answer Engine Optimization. La pratique de structurer le contenu pour que les moteurs IA comme ChatGPT et Perplexity puissent en extraire une réponse claire et directe.",
    longEn:
      "AEO is Answer Engine Optimization. It is the practice of structuring website content so AI search engines (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot) can extract a clean, direct answer when users ask buying questions.\n\nThe core AEO disciplines are: schema markup (Schema.org FAQPage, Service, LocalBusiness, HowTo, Review), Q&A formatted content (real questions, short direct answers), entity disambiguation (telling search engines what your business actually is, not just what it sells), and structured data validation against Google Rich Results.\n\nAEO matters because LLM-powered search engines do not crawl the web the way classical Google did. They retrieve from a layered system that weights structured data extremely heavily. A page with FAQ schema and explicit answers is 1.9x more likely to be cited than the same content without schema, according to internal AiLys data over 60 days.\n\nAEO is part of the AiLys methodology starting at the Core tier ($600/mo), which includes FAQ + Review + LocalBusiness + HowTo schema deployment validated against Google Rich Results.",
    longFr:
      "L'AEO est l'optimisation pour moteurs de réponse. C'est la pratique de structurer le contenu d'un site pour que les moteurs IA (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot) puissent en extraire une réponse claire et directe quand les utilisateurs posent des questions d'achat.\n\nLes disciplines AEO de base sont : balisage schema (Schema.org FAQPage, Service, LocalBusiness, HowTo, Review), contenu format Q&R (vraies questions, réponses courtes et directes), désambiguïsation d'entité (dire aux moteurs ce qu'est votre entreprise, pas juste ce qu'elle vend), et validation des données structurées contre Google Rich Results.\n\nL'AEO compte parce que les moteurs IA ne crawlent pas le web comme Google classique. Ils récupèrent depuis un système en couches qui pondère fortement les données structurées. Une page avec schema FAQ et réponses explicites est 1,9× plus susceptible d'être citée que le même contenu sans schema, selon les données internes AiLys sur 60 jours.\n\nL'AEO fait partie de la méthodologie AiLys à partir du forfait Core (600 $/mois), qui inclut le déploiement schema FAQ + Review + LocalBusiness + HowTo validé contre Google Rich Results.",
    related: ["geo", "schema-markup", "e-e-a-t", "faq-schema"],
  },
  {
    slug: "geo",
    term: "GEO (Generative Engine Optimization)",
    termFr: "GEO (Generative Engine Optimization)",
    category: "ai-search",
    shortEn:
      "Generative Engine Optimization. The practice of building entity authority so AI engines name your brand inside their generated responses.",
    shortFr:
      "Generative Engine Optimization. La pratique de bâtir l'autorité d'entité pour que les moteurs IA nomment votre marque dans leurs réponses générées.",
    longEn:
      "GEO is Generative Engine Optimization. While AEO focuses on extractable answers, GEO focuses on whether your brand gets named inside the actual generated response from ChatGPT, Perplexity, Claude, and Gemini.\n\nThe core GEO levers are: Wikipedia and Wikidata entries (the single biggest signal for entity authority), digital PR placements on high-DA publications, Reddit and forum discussions where your brand is mentioned naturally, podcast appearances and interview content, and authoritative directory listings beyond the basic NAP set.\n\nGEO matters because LLMs train on (and retrieve from) sources that build trust over time. A brand mentioned in 50 forum threads with consistent context will outrank a brand mentioned in 500 spammy citations. Quality and authoritative source diversity beat raw volume.\n\nGEO is the Growth tier work ($1,200/mo) at AiLys, which includes Wikipedia and Wikidata entry building, digital PR outreach, and Reddit and forum strategy. Solo Wikidata entries take roughly two weeks once we have your incorporation records, BBB profile, and three independent news mentions.",
    longFr:
      "Le GEO est l'optimisation pour moteurs génératifs. Alors que l'AEO se concentre sur les réponses extractibles, le GEO se concentre sur la nomination réelle de votre marque dans les réponses générées par ChatGPT, Perplexity, Claude et Gemini.\n\nLes leviers GEO de base sont : entrées Wikipédia et Wikidata (le plus gros signal d'autorité d'entité), placements de RP numérique sur des publications à forte autorité, discussions Reddit et forums où votre marque est mentionnée naturellement, apparitions en podcast et contenu d'entrevue, et inscriptions à des annuaires d'autorité au-delà du NAP de base.\n\nLe GEO compte parce que les LLM s'entraînent sur (et récupèrent depuis) des sources qui bâtissent la confiance avec le temps. Une marque mentionnée dans 50 fils de forum avec contexte cohérent battra une marque mentionnée dans 500 citations de spam. La qualité et la diversité de sources d'autorité battent le volume brut.\n\nLe GEO est le travail du forfait Growth (1 200 $/mois) chez AiLys, qui inclut la construction d'entrées Wikipédia et Wikidata, la sensibilisation RP numérique, et la stratégie Reddit et forums. Les entrées Wikidata solos prennent environ deux semaines une fois qu'on a vos registres d'incorporation, profil BBB et trois mentions indépendantes en média.",
    related: ["aeo", "e-e-a-t", "wikidata", "entity-authority"],
  },
  {
    slug: "e-e-a-t",
    term: "E-E-A-T (Experience, Expertise, Authoritativeness, Trust)",
    termFr: "E-E-A-T (Expérience, Expertise, Autorité, Confiance)",
    category: "ai-search",
    shortEn:
      "Experience, Expertise, Authoritativeness, Trust. Google's framework for evaluating content quality, now used by all major AI engines to pick whose content to cite.",
    shortFr:
      "Expérience, Expertise, Autorité, Confiance. Le cadre de Google pour évaluer la qualité du contenu, maintenant utilisé par tous les moteurs IA majeurs pour choisir qui citer.",
    longEn:
      "E-E-A-T stands for Experience, Expertise, Authoritativeness, and Trust. It is Google's framework for evaluating content quality. The original framework was E-A-T (Expertise, Authoritativeness, Trust); Experience was added in late 2022 to penalize content that reads as second-hand summary instead of first-hand knowledge.\n\nAI engines use the same signals when picking whose content to cite. The signals AI engines extract for E-E-A-T are: author bylines with credentials, original photography (with EXIF metadata showing real shoot data), real customer testimonials with attribution, professional certifications displayed prominently, awards and press mentions, time on platform, and a publishing track record.\n\nE-E-A-T weight varies by vertical. Healthcare and legal verticals have the strictest E-E-A-T requirements. AI engines specifically downweight content that reads as AI-generated boilerplate without first-hand markers.\n\nAt AiLys, E-E-A-T is Step 6 of the 8-step methodology and runs in every plan. Building E-E-A-T means adding author bylines, displaying credentials, deploying original photography, gathering real testimonials with consent, and shipping monthly content with measurable expertise depth.",
    longFr:
      "E-E-A-T signifie Expérience, Expertise, Autorité et Confiance. C'est le cadre de Google pour évaluer la qualité du contenu. Le cadre original était E-A-T (Expertise, Autorité, Confiance); l'Expérience a été ajoutée fin 2022 pour pénaliser le contenu qui se lit comme résumé de seconde main plutôt que connaissance directe.\n\nLes moteurs IA utilisent les mêmes signaux pour choisir qui citer. Les signaux que les moteurs IA extraient pour l'E-E-A-T sont : signatures d'auteur avec accréditations, photographie originale (avec métadonnées EXIF montrant des données de prise de vue réelles), témoignages clients réels avec attribution, certifications professionnelles affichées en évidence, prix et mentions médias, temps en plateforme, et historique de publication.\n\nLe poids de l'E-E-A-T varie selon le secteur. La santé et le juridique ont les exigences E-E-A-T les plus strictes. Les moteurs IA pondèrent spécifiquement à la baisse le contenu qui se lit comme du texte générique généré par IA sans marqueurs de première main.\n\nChez AiLys, l'E-E-A-T est l'Étape 6 de la méthodologie 8 étapes et fait partie de chaque forfait. Bâtir l'E-E-A-T signifie ajouter des signatures d'auteur, afficher les accréditations, déployer de la photographie originale, recueillir de vrais témoignages avec consentement, et publier du contenu mensuel avec profondeur d'expertise mesurable.",
    related: ["aeo", "geo", "credentialed-authorship"],
  },
  {
    slug: "schema-markup",
    term: "Schema markup",
    termFr: "Balisage schema",
    category: "schema",
    shortEn:
      "Structured data added to a webpage so search engines and AI engines can understand the content as data, not just text.",
    shortFr:
      "Données structurées ajoutées à une page web pour que les moteurs de recherche et IA puissent comprendre le contenu comme des données, pas juste du texte.",
    longEn:
      "Schema markup is structured data, in JSON-LD or microdata format, added to a webpage so search engines and AI engines can understand the content as machine-readable data instead of just text.\n\nThe vocabulary is defined at Schema.org, a collaborative project between Google, Microsoft, Yahoo, and Yandex. Common schema types for local businesses are: LocalBusiness, Service, Restaurant, Dentist, Attorney, Hotel, Product, Review, FAQPage, HowTo, Article, BreadcrumbList, Organization, Person.\n\nSchema markup matters more in 2026 than it did in 2022 because AI search engines retrieve from structured data more aggressively than classical Google ever did. A page without LocalBusiness schema is invisible to most LLM citation pipelines.\n\nAt AiLys, schema deployment is Step 4 of the 8-step methodology. We deploy schema, validate against Google Rich Results Test, and re-validate after every content change. Standard at the Core tier and above.",
    longFr:
      "Le balisage schema est des données structurées, en format JSON-LD ou microdata, ajoutées à une page web pour que les moteurs de recherche et IA puissent comprendre le contenu comme des données lisibles par machine plutôt que juste du texte.\n\nLe vocabulaire est défini sur Schema.org, un projet collaboratif entre Google, Microsoft, Yahoo et Yandex. Les types schema courants pour les commerces locaux sont : LocalBusiness, Service, Restaurant, Dentist, Attorney, Hotel, Product, Review, FAQPage, HowTo, Article, BreadcrumbList, Organization, Person.\n\nLe balisage schema compte plus en 2026 qu'en 2022 parce que les moteurs IA récupèrent depuis les données structurées plus agressivement que Google classique ne l'a jamais fait. Une page sans schema LocalBusiness est invisible pour la plupart des pipelines de citations LLM.\n\nChez AiLys, le déploiement schema est l'Étape 4 de la méthodologie 8 étapes. On déploie le schema, valide contre Google Rich Results Test et revalide après chaque changement de contenu. Standard au forfait Core et plus.",
    related: ["aeo", "faq-schema", "local-business-schema"],
  },
  {
    slug: "faq-schema",
    term: "FAQ schema",
    termFr: "Schema FAQ",
    category: "schema",
    shortEn:
      "A specific Schema.org type (FAQPage) that lets AI engines extract question-answer pairs from your page directly.",
    shortFr:
      "Un type Schema.org spécifique (FAQPage) qui permet aux moteurs IA d'extraire les paires question-réponse directement de votre page.",
    longEn:
      "FAQ schema is a specific Schema.org type (FAQPage) that wraps question-answer pairs in structured data. It tells search engines and AI engines: \"these are real questions with real answers, extract them directly.\"\n\nFAQ schema is one of the highest-ROI single tactics in AEO. AI engines like ChatGPT, Perplexity, and Claude actively extract FAQ schema content because it is pre-formatted for the question-answer format their interfaces use. A page with FAQ schema is more likely to be cited verbatim than a page with the same content in prose.\n\nGood FAQ schema covers real customer questions, not invented FAQs. Bad FAQ schema (\"What makes us the best?\") is downweighted. Best practice is to mine actual customer support tickets, sales call transcripts, and review text to find the real questions, then write direct answers.\n\nAt AiLys, FAQ schema is deployed on every service page at the Core tier and above, validated against Google Rich Results Test.",
    longFr:
      "Le schema FAQ est un type Schema.org spécifique (FAQPage) qui enveloppe les paires question-réponse dans des données structurées. Il dit aux moteurs de recherche et IA : « ce sont de vraies questions avec de vraies réponses, extrayez-les directement ».\n\nLe schema FAQ est une des tactiques uniques au plus fort retour en AEO. Les moteurs IA comme ChatGPT, Perplexity et Claude extraient activement le contenu schema FAQ parce qu'il est pré-formaté pour le format question-réponse que leurs interfaces utilisent. Une page avec schema FAQ est plus susceptible d'être citée verbatim qu'une page avec le même contenu en prose.\n\nUn bon schema FAQ couvre les vraies questions clients, pas des FAQ inventées. Un mauvais schema FAQ (« Qu'est-ce qui fait de nous les meilleurs? ») est pondéré à la baisse. La meilleure pratique est d'extraire les vraies questions des billets de support, transcriptions d'appels de vente et textes d'avis, puis d'écrire des réponses directes.\n\nChez AiLys, le schema FAQ est déployé sur chaque page de service au forfait Core et plus, validé contre Google Rich Results Test.",
    related: ["schema-markup", "aeo"],
  },
  {
    slug: "nap",
    term: "NAP (Name, Address, Phone)",
    termFr: "NAP (Nom, Adresse, Téléphone)",
    category: "classical-seo",
    shortEn:
      "Name, Address, Phone. The three core identity fields that must be identical across every directory and citation source for AI engines to recognize your business as one entity.",
    shortFr:
      "Nom, Adresse, Téléphone. Les trois champs d'identité de base qui doivent être identiques sur chaque annuaire et source de citation pour que les moteurs IA reconnaissent votre entreprise comme une entité.",
    longEn:
      "NAP stands for Name, Address, Phone. It is the three-field minimum that AI engines and classical search engines use to identify your business as a single entity across the web.\n\nNAP consistency means the exact same business name, address (down to the street suffix), and phone number on every directory listing: Google Business Profile, Yelp, BBB, Yellow Pages, Crunchbase, industry-specific directories. \"Restaurant Le Petit Coin\" is a different entity to AI engines than \"Le Petit Coin Restaurant\" or \"Restaurant Le Petit-Coin\".\n\nOne inconsistent NAP triple cuts citation odds by roughly half. AI engines see the inconsistency as evidence that the business may not be the same entity, so they hedge by citing competitors with cleaner NAP.\n\nAt AiLys, NAP consistency is enforced as part of Step 3 (Citations) in the 8-step methodology. We audit your existing NAP across 20+ high-DA directories, fix inconsistencies, and monitor monthly for drift.",
    longFr:
      "NAP signifie Nom, Adresse, Téléphone. C'est le minimum à trois champs que les moteurs IA et les moteurs de recherche classiques utilisent pour identifier votre entreprise comme une entité unique sur le web.\n\nLa cohérence NAP signifie exactement le même nom d'entreprise, adresse (jusqu'au suffixe de rue) et numéro de téléphone sur chaque inscription d'annuaire : Google Business Profile, Yelp, BBB, Pages Jaunes, Crunchbase, annuaires spécialisés. « Restaurant Le Petit Coin » est une entité différente pour les moteurs IA que « Le Petit Coin Restaurant » ou « Restaurant Le Petit-Coin ».\n\nUn seul triplet NAP incohérent réduit les chances de citation d'environ la moitié. Les moteurs IA voient l'incohérence comme preuve que l'entreprise pourrait ne pas être la même entité, donc ils se couvrent en citant les concurrents avec NAP plus propre.\n\nChez AiLys, la cohérence NAP est appliquée comme partie de l'Étape 3 (Citations) dans la méthodologie 8 étapes. On audite votre NAP existant sur 20+ annuaires à forte autorité, corrige les incohérences et surveille mensuellement la dérive.",
    related: ["citation-building", "gbp"],
  },
  {
    slug: "gbp",
    term: "GBP (Google Business Profile)",
    termFr: "GBP (Profil d'entreprise Google)",
    category: "classical-seo",
    shortEn:
      "Google Business Profile (formerly Google My Business). The free Google product that controls how your business appears in Google Maps, the local pack, and increasingly inside AI search answers.",
    shortFr:
      "Profil d'entreprise Google (anciennement Google My Business). Le produit Google gratuit qui contrôle comment votre entreprise apparaît dans Google Maps, le local pack et de plus en plus dans les réponses de recherche IA.",
    longEn:
      "GBP is Google Business Profile, the rebranded successor to Google My Business. It is the free Google product that controls how your business appears in Google Maps, the local 3-pack, and increasingly inside Google AI Overviews and competing AI search engines that pull GBP data.\n\nA fully optimized GBP includes: primary category set to your most specific specialty (Sushi Restaurant, not Japanese Restaurant), all relevant attributes filled (Wheelchair accessible, Accepts new patients, Free Wi-Fi), 30+ photos updated weekly, Q&A section answered, posts published every 3 days, services listed with prices, and book-an-appointment integration where applicable.\n\nGBP is a top-3 ranking signal for local AI search queries. A well-optimized GBP can lift Google Maps rankings by 5-10 positions in 30 days based on AiLys internal data.\n\nGBP optimization is Step 2 of the AiLys 8-step methodology and runs in every plan starting at Starter ($300/mo).",
    longFr:
      "Le GBP est le profil d'entreprise Google, le successeur rebaptisé de Google My Business. C'est le produit Google gratuit qui contrôle comment votre entreprise apparaît dans Google Maps, le local pack 3, et de plus en plus dans Google AI Overviews et les moteurs IA concurrents qui tirent les données GBP.\n\nUn GBP entièrement optimisé inclut : catégorie principale réglée sur votre spécialité la plus précise (Restaurant de sushis, pas Restaurant japonais), tous les attributs pertinents remplis (Accessible aux fauteuils roulants, Accepte de nouveaux patients, Wi-Fi gratuit), 30+ photos mises à jour hebdomadairement, section Q&R répondue, publications aux 3 jours, services listés avec prix, et intégration de prise de rendez-vous où applicable.\n\nLe GBP est un signal de classement top 3 pour les requêtes IA de recherche locale. Un GBP bien optimisé peut faire monter le classement Google Maps de 5 à 10 positions en 30 jours selon les données internes AiLys.\n\nL'optimisation GBP est l'Étape 2 de la méthodologie AiLys 8 étapes et fait partie de chaque forfait à partir de Starter (300 $/mois).",
    related: ["nap", "local-pack", "citation-building"],
  },
  {
    slug: "citation-building",
    term: "Citation building",
    termFr: "Construction de citations",
    category: "classical-seo",
    shortEn:
      "The work of getting your business listed (with consistent NAP) on high-authority directories, both general and industry-specific, that AI engines pull from when answering local queries.",
    shortFr:
      "Le travail d'inscrire votre entreprise (avec NAP cohérent) sur des annuaires à forte autorité, généraux et spécialisés, dont les moteurs IA tirent quand ils répondent aux requêtes locales.",
    longEn:
      "Citation building is the work of getting your business listed (with consistent Name, Address, Phone) on high-authority directories that AI engines actively pull from when answering local queries.\n\nThere are two layers: general citations (Yelp, BBB, Yellow Pages, Crunchbase, Foursquare, Apple Maps Connect) and industry-specific citations (Healthgrades and RateMDs for medical, Avvo and Martindale for legal, OpenTable and Tastet for restaurants, HomeStars for contractors).\n\nThe list that actually moves AI search citation rankings is shorter than most agencies pretend. AiLys focuses on a curated 20-25 high-DA targets per vertical, plus the 10-15 general citations every business needs. Quality and authority diversity beat raw volume.\n\nCitation building is Step 3 of the AiLys 8-step methodology. Core tier ($600/mo) builds 5 new high-DA citations per month. Growth tier ($1,200/mo) builds 10+ per month with active outreach to publications and industry associations.",
    longFr:
      "La construction de citations est le travail d'inscrire votre entreprise (avec Nom, Adresse, Téléphone cohérents) sur des annuaires à forte autorité dont les moteurs IA tirent activement quand ils répondent aux requêtes locales.\n\nIl y a deux couches : citations générales (Yelp, BBB, Pages Jaunes, Crunchbase, Foursquare, Apple Maps Connect) et citations spécialisées (Healthgrades et RateMDs pour médical, Avvo et Martindale pour juridique, OpenTable et Tastet pour restos, HomeStars pour entrepreneurs).\n\nLa liste qui fait vraiment bouger les classements de citations IA est plus courte que ce que la plupart des agences prétendent. AiLys se concentre sur une sélection de 20 à 25 cibles à forte autorité par secteur, plus les 10 à 15 citations générales que toute entreprise doit avoir. Qualité et diversité d'autorité battent le volume brut.\n\nLa construction de citations est l'Étape 3 de la méthodologie AiLys 8 étapes. Core (600 $/mois) bâtit 5 nouvelles citations à forte autorité par mois. Growth (1 200 $/mois) bâtit 10+ par mois avec sensibilisation active aux publications et associations sectorielles.",
    related: ["nap", "gbp", "high-da"],
  },
  {
    slug: "wikidata",
    term: "Wikidata",
    termFr: "Wikidata",
    category: "ai-search",
    shortEn:
      "The structured-data sister project to Wikipedia. A Wikidata entry for your business is the single biggest GEO signal AI engines use to disambiguate your brand.",
    shortFr:
      "Le projet sœur de Wikipédia pour les données structurées. Une entrée Wikidata pour votre entreprise est le plus gros signal GEO que les moteurs IA utilisent pour distinguer votre marque.",
    longEn:
      "Wikidata is the structured-data sister project to Wikipedia. While Wikipedia stores prose articles, Wikidata stores facts (entity types, relationships, identifiers, dates, locations) in a queryable database.\n\nFor AI search visibility, Wikidata is enormous. ChatGPT, Perplexity, Claude, and Gemini all retrieve from Wikidata when disambiguating entities. A business with a Wikidata entry is treated as a confirmed real-world entity. A business without one is treated as ambiguous.\n\nGetting a Wikidata entry takes roughly two weeks if you have the prerequisites: incorporation records, BBB profile, three independent news mentions, and at least one external authority listing (industry association, government registry). Most local businesses have all of these but have never thought to compile them.\n\nAt AiLys, Wikidata entry building is part of Step 5 (GEO entity authority) at the Growth tier ($1,200/mo). We assemble the prerequisites, draft the entry, and submit it through Wikidata's review process.",
    longFr:
      "Wikidata est le projet sœur de Wikipédia pour les données structurées. Alors que Wikipédia stocke des articles en prose, Wikidata stocke des faits (types d'entité, relations, identifiants, dates, emplacements) dans une base de données interrogeable.\n\nPour la visibilité de recherche IA, Wikidata est énorme. ChatGPT, Perplexity, Claude et Gemini tirent tous de Wikidata quand ils désambiguïsent les entités. Une entreprise avec une entrée Wikidata est traitée comme une entité réelle confirmée. Une entreprise sans entrée est traitée comme ambiguë.\n\nObtenir une entrée Wikidata prend environ deux semaines si vous avez les prérequis : registres d'incorporation, profil BBB, trois mentions indépendantes en média, et au moins une inscription d'autorité externe (association sectorielle, registre gouvernemental). La plupart des commerces locaux ont tout ça mais n'ont jamais pensé à les compiler.\n\nChez AiLys, la construction d'entrées Wikidata fait partie de l'Étape 5 (Autorité d'entité GEO) au forfait Growth (1 200 $/mois). On assemble les prérequis, rédige l'entrée et la soumet via le processus de révision de Wikidata.",
    related: ["geo", "entity-authority", "wikipedia"],
  },
  {
    slug: "llm-citation-tracking",
    term: "LLM citation tracking",
    termFr: "Suivi des citations LLM",
    category: "tooling",
    shortEn:
      "Automated weekly polling of AI search engines (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot) to track when and where your brand gets cited.",
    shortFr:
      "Sondage automatisé hebdomadaire des moteurs IA (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot) pour suivre quand et où votre marque est citée.",
    longEn:
      "LLM citation tracking is the practice of automatically polling AI search engines on a defined query set to detect when and where your brand gets named in their generated responses.\n\nClassical SEO tools (Ahrefs, SEMrush, Moz) track Google rankings. They do not yet have visibility into ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews, or Bing Copilot. LLM citation tracking is a separate discipline that requires direct API integration with each engine plus structured query rotation across vertical-specific buying questions.\n\nAt AiLys, citation tracking runs weekly across 6 AI engines for 20-30 vertical-specific queries per client. Each query is rotated through the 6 engines and the results are stored, diffed against the previous week, and surfaced in the monthly report. You see exactly when your brand newly appeared, what answer pulled you in, and what queries are still gated.\n\nLLM citation tracking is included in every AiLys plan starting at Starter ($300/mo).",
    longFr:
      "Le suivi des citations LLM est la pratique de sonder automatiquement les moteurs de recherche IA sur un ensemble défini de requêtes pour détecter quand et où votre marque est nommée dans leurs réponses générées.\n\nLes outils SEO classiques (Ahrefs, SEMrush, Moz) suivent les classements Google. Ils n'ont pas encore de visibilité dans ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews ou Bing Copilot. Le suivi des citations LLM est une discipline séparée qui requiert une intégration API directe avec chaque moteur plus une rotation structurée des requêtes sur des questions d'achat sectorielles.\n\nChez AiLys, le suivi des citations s'exécute hebdomadairement sur 6 moteurs IA pour 20 à 30 requêtes sectorielles par client. Chaque requête est tournée à travers les 6 moteurs et les résultats sont stockés, comparés à la semaine précédente et présentés dans le rapport mensuel. Vous voyez exactement quand votre marque est nouvellement apparue, quelle réponse vous a fait entrer, et quelles requêtes sont encore bloquées.\n\nLe suivi des citations LLM est inclus dans chaque forfait AiLys à partir de Starter (300 $/mois).",
    related: ["aeo", "geo"],
  },
  {
    slug: "review-velocity",
    term: "Review velocity",
    termFr: "Vélocité d'avis",
    category: "review-velocity",
    shortEn:
      "The rate at which fresh reviews accumulate on your business profiles. AI engines weight velocity (recency + frequency) more than total review count.",
    shortFr:
      "Le rythme auquel les avis frais s'accumulent sur vos profils d'entreprise. Les moteurs IA pondèrent la vélocité (fraîcheur + fréquence) plus que le nombre total d'avis.",
    longEn:
      "Review velocity is the rate at which fresh reviews accumulate on your business profiles (Google, Yelp, industry-specific platforms). It combines recency and frequency: 10 reviews in the last 30 days outweigh 100 reviews from 3 years ago.\n\nAI engines weight velocity heavily because it signals an active, currently-operational business. A business with 500 lifetime reviews but zero in the last 90 days reads as either inactive or struggling. A business with 200 lifetime reviews and 25 in the last 30 days reads as thriving.\n\nThe AiLys benchmark for review velocity is 10-30 fresh reviews per month for single-location businesses, scaled by location count for multi-location operations. We achieve this through the Reviuzy NFC tap-to-review system, which lets customers leave reviews in 15 seconds via NFC tap or QR scan, with AI assistance to help them write a detailed review.\n\nReview velocity is Step 7 of the AiLys 8-step methodology. The Agency tier ($2,500/mo) bundles the full Reviuzy NFC + contest engine; lower tiers can add it as a paid module.",
    longFr:
      "La vélocité d'avis est le rythme auquel les avis frais s'accumulent sur vos profils d'entreprise (Google, Yelp, plateformes spécialisées). Elle combine fraîcheur et fréquence : 10 avis dans les 30 derniers jours valent plus que 100 avis d'il y a 3 ans.\n\nLes moteurs IA pondèrent la vélocité fortement parce qu'elle signale une entreprise active et opérationnelle. Une entreprise avec 500 avis à vie mais zéro dans les 90 derniers jours se lit comme inactive ou en difficulté. Une entreprise avec 200 avis à vie et 25 dans les 30 derniers jours se lit comme florissante.\n\nLe benchmark AiLys pour la vélocité d'avis est de 10 à 30 avis frais par mois pour les entreprises à un emplacement, ajusté selon le nombre d'emplacements. On atteint ça via le système NFC tap-to-review Reviuzy, qui permet aux clients de laisser un avis en 15 secondes via NFC ou QR, avec assistance IA pour les aider à écrire un avis détaillé.\n\nLa vélocité d'avis est l'Étape 7 de la méthodologie AiLys 8 étapes. Le forfait Agency (1 299 $/mois) intègre le moteur NFC Reviuzy complet; les forfaits plus bas peuvent l'ajouter comme module payant.",
    related: ["reviuzy", "nfc-tap-to-review"],
  },
  {
    slug: "high-da",
    term: "High DA (Domain Authority)",
    termFr: "Forte DA (Autorité de domaine)",
    category: "classical-seo",
    shortEn:
      "Domain Authority is a 0-100 score (originally from Moz) that estimates how authoritative a website is. AI engines weight citations from high-DA sources more heavily.",
    shortFr:
      "L'autorité de domaine est un score 0-100 (originalement de Moz) qui estime à quel point un site web est autoritaire. Les moteurs IA pondèrent les citations de sources à forte DA plus fortement.",
    longEn:
      "Domain Authority (DA) is a 0-100 score, originally introduced by Moz, that estimates how authoritative a website is based on its backlink profile, age, and structural quality. Ahrefs has a similar metric called Domain Rating (DR). Both are third-party estimates, not Google's actual internal score.\n\nAI engines weight citations from high-DA sources more heavily than citations from low-DA sources. A mention on Yelp (DA 92) outweighs ten mentions on small directories with DA under 30. This is why AiLys focuses citation building on a curated list of 20-25 high-DA targets per vertical instead of chasing volume on low-DA listing sites.\n\nReference DA values for common citation targets: Yelp (92), BBB (88), Crunchbase (90), Yellow Pages (85), Glassdoor (90), Healthgrades (85), Avvo (78), OpenTable (87), TripAdvisor (93), Yellowpages (84), Foursquare (87), Apple Maps Connect (100, treated separately as a primary source).\n\nDA is one input we use for citation prioritization. The other inputs are vertical relevance, citation freshness expectation, and AI engine retrieval frequency.",
    longFr:
      "L'autorité de domaine (DA) est un score 0-100, originalement introduit par Moz, qui estime à quel point un site web est autoritaire selon son profil de backlinks, son âge et sa qualité structurelle. Ahrefs a une mesure similaire appelée Domain Rating (DR). Les deux sont des estimations tierces, pas le score interne réel de Google.\n\nLes moteurs IA pondèrent les citations de sources à forte DA plus fortement que les citations de sources à faible DA. Une mention sur Yelp (DA 92) vaut plus que dix mentions sur des petits annuaires avec DA sous 30. C'est pourquoi AiLys se concentre sur une liste sélectionnée de 20 à 25 cibles à forte DA par secteur au lieu de chasser le volume sur des sites à faible DA.\n\nValeurs DA de référence pour les cibles de citations courantes : Yelp (92), BBB (88), Crunchbase (90), Pages Jaunes (85), Glassdoor (90), Healthgrades (85), Avvo (78), OpenTable (87), TripAdvisor (93), Foursquare (87), Apple Maps Connect (100, traité séparément).\n\nLa DA est un des intrants utilisés pour la priorisation des citations. Les autres intrants sont la pertinence sectorielle, la fraîcheur de citation attendue, et la fréquence de récupération par les moteurs IA.",
    related: ["citation-building", "nap"],
  },
  {
    slug: "local-pack",
    term: "Local pack",
    termFr: "Local pack",
    category: "classical-seo",
    shortEn:
      "The 3-result map block at the top of Google search results for local queries. Ranking inside the local pack is the highest-conversion local SEO outcome.",
    shortFr:
      "Le bloc de 3 résultats avec carte en haut des résultats Google pour les requêtes locales. Apparaître dans le local pack est le résultat SEO local le plus convertissant.",
    longEn:
      "The local pack (or 3-pack) is the block of 3 map-pinned business results that appears at the top of Google search results for local queries. \"Best dentist Plateau Montreal\" or \"emergency plumber near me\" both trigger the local pack.\n\nRanking inside the local pack is the highest-conversion outcome in local SEO. Click-through rate from local pack is roughly 33% to the top result, 22% to the second, and 13% to the third (based on industry studies). The first organic result below the pack rarely exceeds 8%.\n\nLocal pack ranking factors are: GBP completeness (categories, attributes, photos, posts), proximity to searcher location, prominence (review velocity, citation density, brand mentions), behavioral signals (clicks, calls, direction requests from GBP), and increasingly, AI-engine alignment as Google AI Overviews start replacing the classical pack for some queries.\n\nLocal pack ranking is an output of the AiLys 8-step methodology, not a step itself. We work the inputs (GBP, citations, schema, reviews) and the pack ranking follows.",
    longFr:
      "Le local pack (ou 3-pack) est le bloc de 3 résultats d'entreprise épinglés sur carte qui apparaît en haut des résultats Google pour les requêtes locales. « Meilleur dentiste Plateau Montréal » ou « plombier d'urgence près de moi » déclenchent le local pack.\n\nApparaître dans le local pack est le résultat le plus convertissant en SEO local. Le taux de clic du local pack est d'environ 33 % vers le premier résultat, 22 % vers le deuxième et 13 % vers le troisième (selon les études de l'industrie). Le premier résultat organique sous le pack dépasse rarement 8 %.\n\nLes facteurs de classement du local pack sont : complétude GBP (catégories, attributs, photos, publications), proximité de l'emplacement du chercheur, prominence (vélocité d'avis, densité de citations, mentions de marque), signaux comportementaux (clics, appels, demandes d'itinéraire depuis le GBP), et de plus en plus, l'alignement avec les moteurs IA alors que Google AI Overviews commence à remplacer le pack classique pour certaines requêtes.\n\nLe classement local pack est un résultat de la méthodologie AiLys 8 étapes, pas une étape en soi. On travaille les intrants (GBP, citations, schema, avis) et le classement du pack suit.",
    related: ["gbp", "local-seo"],
  },
  {
    slug: "entity-authority",
    term: "Entity authority",
    termFr: "Autorité d'entité",
    category: "ai-search",
    shortEn:
      "The accumulation of structured signals (Wikidata entry, Wikipedia mention, association directories, news coverage) that tell AI engines your business is a verifiable real-world entity worth citing.",
    shortFr:
      "L'accumulation de signaux structurés (entrée Wikidata, mention Wikipédia, annuaires d'associations, couverture médias) qui disent aux moteurs IA que votre entreprise est une entité vérifiable digne d'être citée.",
    longEn:
      "Entity authority is the cumulative weight of structured signals that tell AI engines your business is a verifiable real-world entity worth citing. The core signals are: Wikidata entry, Wikipedia mention, industry association directory listings, government registry presence (incorporation, professional licenses), news coverage on high-DA publications, podcast appearances, conference speaking, and credentialed authorship on industry publications.\n\nThe difference between a low-entity-authority business and a high-entity-authority business is whether AI engines see you as \"verified\" or \"unverified.\" Verified entities get cited; unverified entities get hedged against.\n\nBuilding entity authority is slow work. A typical timeline is 90-180 days for first measurable lift, 365 days for compounding effect. There are no shortcuts. AiLys focuses on the highest-leverage signals (Wikidata, association directories, digital PR) at the Growth tier ($1,200/mo) instead of chasing low-leverage volume.",
    longFr:
      "L'autorité d'entité est le poids cumulatif des signaux structurés qui disent aux moteurs IA que votre entreprise est une entité vérifiable digne d'être citée. Les signaux de base sont : entrée Wikidata, mention Wikipédia, inscriptions à des annuaires d'associations sectorielles, présence dans les registres gouvernementaux (incorporation, licences professionnelles), couverture médias sur des publications à forte autorité, apparitions en podcast, conférences, et auteurs accrédités sur des publications sectorielles.\n\nLa différence entre une entreprise à faible autorité d'entité et une à forte autorité d'entité est de savoir si les moteurs IA vous voient comme « vérifié » ou « non vérifié ». Les entités vérifiées sont citées; les entités non vérifiées sont écartées.\n\nBâtir l'autorité d'entité est un travail lent. Le calendrier typique est de 90 à 180 jours pour la première hausse mesurable, 365 jours pour l'effet composé. Il n'y a pas de raccourci. AiLys se concentre sur les signaux à plus fort levier (Wikidata, annuaires d'associations, RP numérique) au forfait Growth (1 200 $/mois) au lieu de chasser le volume à faible levier.",
    related: ["geo", "wikidata", "wikipedia"],
  },
  {
    slug: "credentialed-authorship",
    term: "Credentialed authorship",
    termFr: "Auteurs accrédités",
    category: "ai-search",
    shortEn:
      "Publishing content with a real human author byline, displayed credentials (DDS, JD, MBA, etc.), and verifiable work history. A core E-E-A-T signal AI engines extract.",
    shortFr:
      "Publier du contenu avec une vraie signature d'auteur humain, des accréditations affichées (DMD, JD, MBA, etc.) et un parcours professionnel vérifiable. Un signal E-E-A-T de base que les moteurs IA extraient.",
    longEn:
      "Credentialed authorship is the practice of publishing content with a real human author byline, displayed professional credentials, verifiable work history, and a linked author bio. AI engines extract authorship signals as a primary E-E-A-T input.\n\nThe schema-level implementation uses Schema.org Person and Article.author with explicit credentials, alumniOf, jobTitle, and sameAs (linking to LinkedIn, ORCID, association profiles). The visible-page implementation includes author name, professional title, photo, short bio, and a link to a full bio page.\n\nFor regulated verticals (healthcare, legal, financial), credentialed authorship is non-negotiable. AI engines actively penalize content in these verticals when authorship cannot be verified. For unregulated verticals (restaurants, retail, hospitality), credentialed authorship still matters but the bar is lower.\n\nAt AiLys, credentialed authorship is part of Step 6 (E-E-A-T signals) and runs in every plan. We help clients set up author bylines, credential displays, and bio pages, then deploy the schema markup.",
    longFr:
      "Les auteurs accrédités est la pratique de publier du contenu avec une vraie signature d'auteur humain, des accréditations professionnelles affichées, un parcours professionnel vérifiable et une bio d'auteur liée. Les moteurs IA extraient les signaux d'auteur comme intrant principal d'E-E-A-T.\n\nL'implémentation au niveau schema utilise Schema.org Person et Article.author avec accréditations explicites, alumniOf, jobTitle et sameAs (liant vers LinkedIn, ORCID, profils d'associations). L'implémentation visible inclut nom d'auteur, titre professionnel, photo, courte bio et lien vers une page bio complète.\n\nPour les secteurs réglementés (santé, juridique, financier), les auteurs accrédités sont non négociables. Les moteurs IA pénalisent activement le contenu dans ces secteurs quand l'autorité ne peut être vérifiée. Pour les secteurs non réglementés (restos, détail, hôtellerie), les auteurs accrédités comptent encore mais la barre est plus basse.\n\nChez AiLys, les auteurs accrédités font partie de l'Étape 6 (Signaux E-E-A-T) et fait partie de chaque forfait. On aide les clients à mettre en place les signatures d'auteurs, l'affichage des accréditations et les pages bio, puis on déploie le balisage schema.",
    related: ["e-e-a-t", "schema-markup"],
  },
  {
    slug: "local-business-schema",
    term: "LocalBusiness schema",
    termFr: "Schema LocalBusiness",
    category: "schema",
    shortEn:
      "The Schema.org type that identifies a webpage as belonging to a physical local business. The foundation schema for any local-SEO play.",
    shortFr:
      "Le type Schema.org qui identifie une page web comme appartenant à un commerce local physique. Le schema de fondation pour toute stratégie SEO local.",
    longEn:
      "LocalBusiness is the Schema.org type that identifies a webpage as belonging to a physical local business. It carries the core entity facts: name, address, phone, opening hours, geo coordinates, image, URL, price range, accepted payment methods.\n\nLocalBusiness has many more specific subtypes that should be used when applicable: Restaurant, Dentist, Attorney, Hotel, AutoRepair, BeautySalon, etc. The more specific the type, the better AI engines disambiguate your business from generic mentions.\n\nA LocalBusiness schema block on every page is the foundation. Without it, AI engines treat your pages as content but not as a verifiable business entity. With it, your name-address-phone is machine-extractable everywhere on your site.\n\nLocalBusiness schema is part of Step 4 (Schema deployment) at AiLys, standard at the Core tier ($600/mo) and validated against Google Rich Results Test.",
    longFr:
      "LocalBusiness est le type Schema.org qui identifie une page web comme appartenant à un commerce local physique. Il porte les faits d'entité de base : nom, adresse, téléphone, heures d'ouverture, coordonnées géo, image, URL, fourchette de prix, méthodes de paiement acceptées.\n\nLocalBusiness a beaucoup de sous-types plus spécifiques à utiliser quand applicable : Restaurant, Dentist, Attorney, Hotel, AutoRepair, BeautySalon, etc. Plus le type est spécifique, mieux les moteurs IA distinguent votre entreprise des mentions génériques.\n\nUn bloc schema LocalBusiness sur chaque page est la fondation. Sans ça, les moteurs IA traitent vos pages comme du contenu mais pas comme une entité d'entreprise vérifiable. Avec ça, votre nom-adresse-téléphone est extractible par machine partout sur votre site.\n\nLe schema LocalBusiness fait partie de l'Étape 4 (Déploiement schema) chez AiLys, standard au forfait Core (600 $/mois) et validé contre Google Rich Results Test.",
    related: ["schema-markup", "gbp", "nap"],
  },
  {
    slug: "wikipedia",
    term: "Wikipedia",
    termFr: "Wikipédia",
    category: "ai-search",
    shortEn:
      "The free encyclopedia. A Wikipedia article about your business is a top-tier GEO signal but the bar for inclusion is high (notability standard).",
    shortFr:
      "L'encyclopédie libre. Un article Wikipédia sur votre entreprise est un signal GEO de premier ordre mais la barre d'inclusion est haute (norme de notoriété).",
    longEn:
      "Wikipedia is the free encyclopedia. For AI search visibility, a Wikipedia article about your business is one of the strongest GEO signals possible. ChatGPT, Perplexity, Claude, and Gemini all train on and retrieve from Wikipedia. A Wikipedia article makes your brand a first-class entity in their internal models.\n\nThe catch: Wikipedia has a strict notability standard. Most local businesses do not qualify. To pass notability, you typically need: significant coverage in independent reliable sources (3+ news articles in major publications, not press releases), independent secondary sources (not your own website), regional, national, or industry-wide significance.\n\nFor businesses that do qualify, a Wikipedia article takes 4-12 weeks to draft, submit, and survive deletion review. The work is precise, source-heavy, and unforgiving of conflicts of interest (you cannot edit the article about your own business; an independent editor must handle it).\n\nAt AiLys, we evaluate Wikipedia eligibility during the Growth-tier intake. If your business qualifies, we coordinate with independent Wikipedia editors. If it does not yet qualify, we focus on Wikidata (lower bar) and digital PR to build the source base for a future Wikipedia attempt.",
    longFr:
      "Wikipédia est l'encyclopédie libre. Pour la visibilité de recherche IA, un article Wikipédia sur votre entreprise est un des signaux GEO les plus forts possibles. ChatGPT, Perplexity, Claude et Gemini s'entraînent tous sur et récupèrent de Wikipédia. Un article Wikipédia fait de votre marque une entité de première classe dans leurs modèles internes.\n\nLe hic : Wikipédia a une norme de notoriété stricte. La plupart des commerces locaux ne se qualifient pas. Pour passer la notoriété, vous avez typiquement besoin de : couverture significative dans des sources fiables indépendantes (3+ articles de presse dans des publications majeures, pas des communiqués), sources secondaires indépendantes (pas votre propre site), importance régionale, nationale ou sectorielle.\n\nPour les entreprises qui se qualifient, un article Wikipédia prend 4 à 12 semaines à rédiger, soumettre et survivre à la révision de suppression. Le travail est précis, lourd en sources et impitoyable envers les conflits d'intérêts (vous ne pouvez pas modifier l'article sur votre propre entreprise; un éditeur indépendant doit le gérer).\n\nChez AiLys, on évalue l'éligibilité Wikipédia pendant l'intake du forfait Growth. Si votre entreprise se qualifie, on coordonne avec des éditeurs Wikipédia indépendants. Si elle ne se qualifie pas encore, on se concentre sur Wikidata (barre plus basse) et la RP numérique pour bâtir la base de sources pour une tentative Wikipédia future.",
    related: ["wikidata", "geo", "entity-authority"],
  },
  {
    slug: "reviuzy",
    term: "Reviuzy",
    termFr: "Reviuzy",
    category: "tooling",
    shortEn:
      "Sister product to AiLys Agency. A self-serve SaaS for review collection, NFC tap-to-review, and Google Business Profile automation. Powers the Agency tier delivery.",
    shortFr:
      "Produit sœur de AiLys Agency. Un SaaS libre-service pour la collecte d'avis, NFC tap-to-review et automatisation du Profil Google. Alimente la livraison du forfait Agency.",
    longEn:
      "Reviuzy is the sister product to AiLys Agency. It is a self-serve SaaS that handles review collection, NFC tap-to-review campaigns, automated review responses (with human approval), and Google Business Profile automation.\n\nReviuzy can be used standalone (subscription starts at $20/mo) or bundled into the AiLys Agency tier ($2,500/mo) where AiLys handles strategy and Reviuzy handles delivery.\n\nThe NFC tap-to-review system ships physical NFC cards or stickers to each business location. Customers tap their phone, get a 15-second guided review flow with AI assistance, and submit to Google directly. Conversion from tap to posted review is roughly 60-70% in our internal data, vs roughly 5-10% for traditional \"please leave us a review\" emails.\n\nReviuzy and AiLys are two separate products with two separate pricing structures. They share infrastructure (Supabase backend, edge functions) but are sold and operated independently.",
    longFr:
      "Reviuzy est le produit sœur de AiLys Agency. C'est un SaaS libre-service qui gère la collecte d'avis, les campagnes NFC tap-to-review, les réponses automatisées aux avis (avec approbation humaine) et l'automatisation du Profil Google.\n\nReviuzy peut être utilisé seul (abonnement à partir de 20 $/mois) ou intégré au forfait AiLys Agency (1 299 $/mois) où AiLys gère la stratégie et Reviuzy gère la livraison.\n\nLe système NFC tap-to-review livre des cartes ou autocollants NFC physiques à chaque emplacement d'entreprise. Les clients tapent leur téléphone, obtiennent un flux d'avis guidé de 15 secondes avec assistance IA, et soumettent directement à Google. La conversion du tap à l'avis publié est d'environ 60 à 70 % dans nos données internes, vs environ 5 à 10 % pour les courriels traditionnels « laissez-nous un avis ».\n\nReviuzy et AiLys sont deux produits séparés avec deux structures de prix séparées. Ils partagent l'infrastructure (backend Supabase, fonctions edge) mais sont vendus et opérés indépendamment.",
    related: ["nfc-tap-to-review", "review-velocity"],
  },
  {
    slug: "nfc-tap-to-review",
    term: "NFC tap-to-review",
    termFr: "NFC tap-to-review",
    category: "review-velocity",
    shortEn:
      "Physical NFC cards or stickers placed at the business location that, when tapped with a phone, open a 15-second review flow with AI assistance.",
    shortFr:
      "Cartes ou autocollants NFC physiques placés à l'emplacement de l'entreprise qui, lorsque tapés avec un téléphone, ouvrent un flux d'avis de 15 secondes avec assistance IA.",
    longEn:
      "NFC tap-to-review is the practice of placing physical NFC (Near-Field Communication) cards or stickers at the business location so customers can tap their phone and instantly access a review-writing flow.\n\nThe customer experience: tap, see a screen with check-boxes for what they liked (\"food\", \"service\", \"atmosphere\"), watch AI generate a personalized review based on their selections, edit if desired, submit to Google. End-to-end takes 15 seconds.\n\nNFC tap-to-review beats traditional review-request methods (post-purchase emails, follow-up SMS) because it removes the time gap and the friction of finding the business listing. The review happens at the moment of satisfaction, not days later.\n\nAt AiLys, NFC tap-to-review is delivered through our sister product Reviuzy and bundled in the Agency tier ($2,500/mo). Lower tiers can add it as a paid module starting at $20/mo per location.",
    longFr:
      "Le NFC tap-to-review est la pratique de placer des cartes ou autocollants NFC (Near-Field Communication) physiques à l'emplacement de l'entreprise pour que les clients puissent taper leur téléphone et accéder instantanément à un flux d'écriture d'avis.\n\nL'expérience client : tap, voir un écran avec cases à cocher pour ce qu'ils ont aimé (« nourriture », « service », « ambiance »), regarder l'IA générer un avis personnalisé selon leurs sélections, modifier si désiré, soumettre à Google. De bout en bout prend 15 secondes.\n\nLe NFC tap-to-review bat les méthodes traditionnelles de demande d'avis (courriels post-achat, SMS de suivi) parce qu'il élimine l'écart temporel et la friction de trouver l'inscription de l'entreprise. L'avis arrive au moment de la satisfaction, pas des jours plus tard.\n\nChez AiLys, le NFC tap-to-review est livré via notre produit sœur Reviuzy et intégré au forfait Agency (1 299 $/mois). Les forfaits plus bas peuvent l'ajouter comme module payant à partir de 20 $/mois par emplacement.",
    related: ["reviuzy", "review-velocity"],
  },
  {
    slug: "local-seo",
    term: "Local SEO",
    termFr: "SEO local",
    category: "classical-seo",
    shortEn:
      "Search engine optimization tuned for businesses serving a defined geographic area. Foundation of any AI search visibility play in 2026.",
    shortFr:
      "Optimisation pour moteurs de recherche ajustée pour les entreprises servant une zone géographique définie. Fondation de toute stratégie de visibilité en recherche IA en 2026.",
    longEn:
      "Local SEO is search engine optimization tuned for businesses that serve a defined geographic area (a city, a neighborhood, a service zone). The disciplines are: GBP optimization, NAP consistency across directories, citation building, on-page schema (LocalBusiness), neighborhood-specific content, and local-intent backlinks.\n\nLocal SEO is the foundation of any AI search visibility play in 2026. AI engines retrieve from the same web index that Google uses for the local pack. A business with weak local SEO foundation cannot have strong AI search visibility, full stop.\n\nThis is why every AiLys plan includes the classical local SEO foundation (Steps 1-3 of the 8-step methodology) before adding the AI layer (Steps 4-8). Skip the foundation and the AI layer has nothing to stand on.\n\nLocal SEO is what classical local SEO consultancies (Sterling Sky, Rablab) specialize in. AiLys covers the same foundation plus the AI layer at SMB pricing.",
    longFr:
      "Le SEO local est l'optimisation pour moteurs de recherche ajustée pour les entreprises qui servent une zone géographique définie (une ville, un quartier, une zone de service). Les disciplines sont : optimisation GBP, cohérence NAP sur les annuaires, construction de citations, schema sur la page (LocalBusiness), contenu spécifique au quartier, et backlinks à intention locale.\n\nLe SEO local est la fondation de toute stratégie de visibilité en recherche IA en 2026. Les moteurs IA récupèrent depuis le même index web que Google utilise pour le local pack. Une entreprise avec une fondation SEO local faible ne peut pas avoir une forte visibilité de recherche IA, point final.\n\nC'est pourquoi chaque forfait AiLys inclut la fondation SEO local classique (Étapes 1-3 de la méthodologie 8 étapes) avant d'ajouter la couche IA (Étapes 4-8). Sautez la fondation et la couche IA n'a rien sur quoi se tenir.\n\nLe SEO local est ce sur quoi les consultations SEO local classiques (Sterling Sky, Rablab) se spécialisent. AiLys couvre la même fondation plus la couche IA à un prix PME.",
    related: ["gbp", "nap", "citation-building", "local-pack"],
  },
];

export const glossaryCategoryLabels: Record<GlossaryTerm["category"], { en: string; fr: string }> = {
  "ai-search": { en: "AI Search", fr: "Recherche IA" },
  "classical-seo": { en: "Classical SEO", fr: "SEO classique" },
  schema: { en: "Schema", fr: "Schema" },
  "review-velocity": { en: "Review Velocity", fr: "Vélocité d'avis" },
  tooling: { en: "Tooling", fr: "Outillage" },
};

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((t) => t.slug === slug);
}

export function getRelatedTerms(slugs: string[]): GlossaryTerm[] {
  return slugs
    .map((s) => glossaryTerms.find((t) => t.slug === s))
    .filter((t): t is GlossaryTerm => t !== undefined);
}
