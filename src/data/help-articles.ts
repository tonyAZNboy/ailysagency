// AiLys Agency · Help Center articles (static data)
//
// Each article has its own URL for SEO (people Google "how does AEO work").
// Migrate to Supabase later if the doc center grows beyond ~50 articles.

export type HelpCategory =
  | "getting-started"
  | "aeo-geo-eeat"
  | "pricing-plans"
  | "audit"
  | "account-billing"
  | "glossary";

export interface HelpArticle {
  slug: string;
  title: string;
  excerpt: string;
  body: string; // markdown
  category: HelpCategory;
  updatedAt: string;
  readingTimeMin: number;
  i18n?: {
    [lang: string]: {
      title?: string;
      excerpt?: string;
      content?: string;
      body?: string;
    };
  };
}

export const HELP_CATEGORY_META: Record<
  HelpCategory,
  { label: string; description: string; tone: string }
> = {
  "getting-started": {
    label: "Getting started",
    description: "First steps. Onboarding. What to expect.",
    tone: "from-cyan-400 to-teal-400",
  },
  "aeo-geo-eeat": {
    label: "AEO · GEO · E-E-A-T",
    description: "The disciplines we deliver, explained.",
    tone: "from-violet-400 to-fuchsia-400",
  },
  "pricing-plans": {
    label: "Pricing & plans",
    description: "Tier breakdowns, what each plan includes.",
    tone: "from-amber-400 to-rose-400",
  },
  audit: {
    label: "AI Visibility Audit",
    description: "How the audit works, what you get, turnaround.",
    tone: "from-emerald-400 to-cyan-400",
  },
  "account-billing": {
    label: "Account & billing",
    description: "Invoicing, cancellation, refunds.",
    tone: "from-sky-400 to-blue-500",
  },
  glossary: {
    label: "AI search glossary",
    description: "Quick definitions for the terms we throw around.",
    tone: "from-rose-400 to-pink-400",
  },
};

export const helpArticles: HelpArticle[] = [
  // ─── Getting started ───────────────────────────────────────
  {
    slug: "what-is-ailys-agency",
    title: "What is AiLys Agency?",
    excerpt:
      "AiLys is a Quebec-based LLM Visibility & Optimization agency. Here is what we do, who we serve, and what makes us different.",
    category: "getting-started",
    updatedAt: "2026-04-01",
    readingTimeMin: 3,
    body: `## What we do

AiLys delivers AEO, GEO, and E-E-A-T services for local businesses. Translation: we get your business cited inside ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews, and Bing Copilot answers.

## Who we serve

Local businesses across four primary verticals: restaurants, dentists, lawyers, and multi-location franchises. Plus growth-stage businesses that depend on local discovery (clinics, real estate, hotels, contractors).

We are anchored in Quebec but serve clients across Canada, the United States, and Latin America.

## What makes us different

Three things:

- **Pricing**: We start at $300/mo. Comparable agencies start at $2,000/mo. We can charge less because Reviuzy SaaS automates the operational layer.
- **Languages**: 8 languages via partner network (EN, FR, ES, ZH, AR, RU, UK, SR). Most agencies do EN+FR.
- **Focus**: We do one thing, LLM visibility, deeply. Not a generalist agency.

## How to start

Run the free AI Visibility Audit. Results in 24 hours. No call required.`,
    i18n: {
      fr: {
        title: "Qu'est-ce que AiLys Agency?",
        excerpt:
          "AiLys est une agence québécoise de visibilité et d'optimisation pour les LLM. Voici ce que nous faisons, qui nous servons et ce qui nous distingue.",
        body: `## Ce que nous faisons

AiLys offre des services AEO, GEO et E-E-A-T pour les entreprises locales. En clair : nous faisons en sorte que votre entreprise soit citée dans les réponses de ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews et Bing Copilot.

## Qui nous servons

Des entreprises locales dans quatre verticales principales : restaurants, dentistes, avocats et franchises multi-emplacements. Plus les entreprises en phase de croissance qui dépendent de la découverte locale (cliniques, immobilier, hôtels, entrepreneurs).

Nous sommes ancrés au Québec, mais nous servons des clients partout au Canada, aux États-Unis et en Amérique latine.

## Ce qui nous distingue

Trois choses :

- **Tarification** : nous commençons à 300 $/mois. Des agences comparables commencent à 2 000 $/mois. Nous pouvons demander moins parce que Reviuzy SaaS automatise la couche opérationnelle.
- **Langues** : 8 langues via réseau de partenaires (EN, FR, ES, ZH, AR, RU, UK, SR). La plupart des agences font EN et FR.
- **Spécialisation** : nous faisons une chose, la visibilité LLM, en profondeur. Pas une agence généraliste.

## Comment commencer

Lancez l'AI Visibility Audit gratuit. Résultats en 24 heures. Aucun appel requis.`,
      },
      es: {
        title: "¿Qué es AiLys Agency?",
        excerpt:
          "AiLys es una agencia con base en Quebec dedicada a la visibilidad y optimización para LLM. Esto es lo que hacemos, a quién atendemos y qué nos hace diferentes.",
        body: `## Qué hacemos

AiLys entrega servicios AEO, GEO y E-E-A-T para negocios locales. Traducción: hacemos que su negocio aparezca citado dentro de las respuestas de ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews y Bing Copilot.

## A quién atendemos

Negocios locales en cuatro verticales principales: restaurantes, dentistas, abogados y franquicias multi-sucursal. Más empresas en etapa de crecimiento que dependen del descubrimiento local (clínicas, inmobiliarias, hoteles, contratistas).

Estamos anclados en Quebec, pero atendemos clientes en Canadá, Estados Unidos y América Latina.

## Qué nos hace diferentes

Tres cosas:

- **Precio**: arrancamos en $300/mes. Agencias comparables arrancan en $2,000/mes. Podemos cobrar menos porque Reviuzy SaaS automatiza la capa operativa.
- **Idiomas**: 8 idiomas vía red de socios (EN, FR, ES, ZH, AR, RU, UK, SR). La mayoría de las agencias trabaja en EN y FR.
- **Foco**: hacemos una sola cosa, visibilidad en LLM, a profundidad. No somos una agencia generalista.

## Cómo empezar

Ejecute el AI Visibility Audit gratuito. Resultados en 24 horas. Sin llamada requerida.`,
      },
      zh: {
        title: "AiLys Agency 是什么?",
        excerpt:
          "AiLys 是一家总部位于魁北克的 LLM 可见度与优化代理。以下是我们做什么、服务谁,以及我们的差异化。",
        body: `## 我们做什么

AiLys 为本地企业提供 AEO、GEO 和 E-E-A-T 服务。换句话说: 让您的企业出现在 ChatGPT、Perplexity、Claude、Gemini、Google AI Overviews 和 Bing Copilot 的回答中被引用。

## 我们服务谁

四个主要垂直领域的本地企业: 餐厅、牙医、律师和多门店连锁。还包括依赖本地发现流量的成长期企业(诊所、房地产、酒店、承包商)。

我们扎根魁北克,但服务遍及加拿大、美国和拉丁美洲的客户。

## 我们的差异化在哪

三点:

- **价格**: 我们起步 $300/月。同类代理起步 $2,000/月。我们能更便宜,是因为 Reviuzy SaaS 把运营层自动化了。
- **语言**: 通过合作伙伴网络支持 8 种语言(EN、FR、ES、ZH、AR、RU、UK、SR)。多数代理只做 EN 加 FR。
- **聚焦**: 我们只做一件事——LLM 可见度,且做得深。不做综合代理。

## 如何开始

运行免费的 AI Visibility Audit。24 小时内出结果。无需通话。`,
      },
      ru: {
        title: "Что такое AiLys Agency?",
        excerpt:
          "AiLys, агентство из Квебека по видимости и оптимизации в LLM. Вот чем мы занимаемся, кому помогаем и чем отличаемся.",
        body: `## Чем мы занимаемся

AiLys предоставляет услуги AEO, GEO и E-E-A-T для локального бизнеса. Если перевести на простой язык: мы делаем так, чтобы ваш бизнес упоминался в ответах ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews и Bing Copilot.

## Кому мы помогаем

Локальному бизнесу в четырёх основных направлениях: рестораны, стоматологии, юридические практики и сетевые франшизы. А также компаниям на стадии роста, которые зависят от локального трафика (клиники, недвижимость, отели, подрядчики).

Наша база в Квебеке, но мы работаем с клиентами по всей Канаде, в США и Латинской Америке.

## Чем мы отличаемся

Тремя вещами:

- **Цены**: мы стартуем от $300/мес. Аналогичные агентства начинают с $2,000/мес. Мы можем брать меньше, потому что Reviuzy SaaS автоматизирует операционный слой.
- **Языки**: 8 языков через партнёрскую сеть (EN, FR, ES, ZH, AR, RU, UK, SR). Большинство агентств работает только на EN и FR.
- **Фокус**: мы делаем одно дело, видимость в LLM, и делаем его глубоко. Мы не агентство широкого профиля.

## Как начать

Закажите бесплатный AI Visibility Audit. Результаты в течение 24 часов. Звонок не нужен.`,
      },
      ar: {
        title: "ما هي AiLys Agency؟",
        excerpt:
          "AiLys وكالة مقرّها كيبيك متخصصة في تحسين الظهور داخل نماذج LLM. إليك ما نقدّمه ومن نخدم وما يميّزنا.",
        body: `## ما الذي نقدّمه

تقدّم AiLys خدمات AEO وGEO وE-E-A-T للأعمال المحلية. بعبارة أوضح، نجعل اسم عملك يظهر داخل إجابات ChatGPT وPerplexity وClaude وGemini وGoogle AI Overviews وBing Copilot.

## من نخدم

أعمال محلية في أربع فئات رئيسية: المطاعم، عيادات الأسنان، المكاتب القانونية، والامتيازات التجارية متعددة الفروع. ونعمل أيضاً مع الشركات في طور النمو التي تعتمد على الاكتشاف المحلي مثل العيادات والعقارات والفنادق ومقاولي الخدمات.

مقرّنا الأساسي في كيبيك، لكننا نخدم عملاء في كل أنحاء كندا والولايات المتحدة وأمريكا اللاتينية.

## ما الذي يميّزنا

ثلاثة عناصر:

- **التسعير**: نبدأ من $300 شهرياً. تبدأ الوكالات المماثلة من $2,000 شهرياً. نستطيع تقديم سعر أقل لأن Reviuzy SaaS يؤتمت الطبقة التشغيلية.
- **اللغات**: ثماني لغات عبر شبكة شركاء (EN, FR, ES, ZH, AR, RU, UK, SR). معظم الوكالات تعمل بالإنجليزية والفرنسية فقط.
- **التركيز**: نقوم بمهمة واحدة وهي الظهور داخل LLM، ونتعمّق فيها. لسنا وكالة عامة.

## كيفية البدء

اطلب AI Visibility Audit المجاني. النتائج خلال 24 ساعة. لا يلزم إجراء أي مكالمة.`,
      },
    },
  },
  {
    slug: "first-30-days",
    title: "What happens in your first 30 days",
    excerpt:
      "Day-by-day expectation of the first month, from contract signature to your first monthly report.",
    category: "getting-started",
    updatedAt: "2026-04-05",
    readingTimeMin: 4,
    body: `## Days 1 to 3: Onboarding

- Welcome email with payment portal and onboarding form
- 60-minute kickoff call with your AiLys lead
- Access granted to your client portal
- Service agreement countersigned

## Days 4 to 7: Audit & strategy

- Deep technical audit of your site, GBP, and citation footprint
- Strategy doc delivered (Google Doc, you can comment)
- 30-minute review call to lock priorities

## Days 8 to 21: Execution starts

- Schema markup deployed (FAQ, Review, LocalBusiness, Service)
- GBP optimization (categories, attributes, Q&A, photos)
- First batch of citation submissions
- Content calendar approved

## Days 22 to 30: First report

- Monthly performance report delivered (PDF + Google Doc)
- Citation tracking baseline established
- 30-minute strategy call to review wins and adjust

## What you should expect

Schema and GBP improvements show up in Google within 30 to 60 days. LLM citation lift typically takes 90 to 120 days. We send a monthly report regardless of magnitude. No vanity metrics.`,
    i18n: {
      fr: {
        title: "Ce qui se passe pendant vos 30 premiers jours",
        excerpt:
          "Attentes jour après jour du premier mois, de la signature du contrat jusqu'à votre premier rapport mensuel.",
        body: `## Jours 1 à 3 : intégration

- Courriel de bienvenue avec portail de paiement et formulaire d'intégration
- Appel de lancement de 60 minutes avec votre responsable AiLys
- Accès accordé à votre portail client
- Entente de service contresignée

## Jours 4 à 7 : audit et stratégie

- Audit technique approfondi de votre site, de votre GBP et de votre empreinte de citations
- Document de stratégie livré (Google Doc, vous pouvez commenter)
- Appel de revue de 30 minutes pour verrouiller les priorités

## Jours 8 à 21 : début de l'exécution

- Balisage schema déployé (FAQ, Review, LocalBusiness, Service)
- Optimisation du GBP (catégories, attributs, Q et R, photos)
- Premier lot de soumissions de citations
- Calendrier de contenu approuvé

## Jours 22 à 30 : premier rapport

- Rapport mensuel de performance livré (PDF et Google Doc)
- Référence de suivi des citations établie
- Appel de stratégie de 30 minutes pour passer en revue les gains et ajuster

## À quoi vous attendre

Les améliorations de schema et de GBP apparaissent dans Google en 30 à 60 jours. La hausse des citations LLM prend généralement 90 à 120 jours. Nous envoyons un rapport mensuel peu importe l'ampleur. Pas de métriques de vanité.`,
      },
      es: {
        title: "Qué ocurre en sus primeros 30 días",
        excerpt:
          "Expectativa día a día del primer mes, desde la firma del contrato hasta su primer reporte mensual.",
        body: `## Días 1 a 3: onboarding

- Correo de bienvenida con portal de pago y formulario de onboarding
- Llamada de arranque de 60 minutos con su líder en AiLys
- Acceso otorgado a su portal de cliente
- Acuerdo de servicio firmado por ambas partes

## Días 4 a 7: auditoría y estrategia

- Auditoría técnica profunda de su sitio, GBP y huella de citas
- Documento de estrategia entregado (Google Doc, puede comentar)
- Llamada de revisión de 30 minutos para fijar prioridades

## Días 8 a 21: arranca la ejecución

- Schema desplegado (FAQ, Review, LocalBusiness, Service)
- Optimización de GBP (categorías, atributos, P y R, fotos)
- Primer lote de envíos de citas
- Calendario de contenido aprobado

## Días 22 a 30: primer reporte

- Reporte mensual de desempeño entregado (PDF y Google Doc)
- Línea base de seguimiento de citas establecida
- Llamada de estrategia de 30 minutos para revisar logros y ajustar

## Qué esperar

Las mejoras de schema y GBP se reflejan en Google en 30 a 60 días. El alza de citas en LLM suele tomar entre 90 y 120 días. Enviamos reporte mensual sin importar la magnitud. Sin métricas de vanidad.`,
      },
      zh: {
        title: "您前 30 天会经历什么",
        excerpt:
          "首月日程预期: 从合同签署到您拿到首份月报。",
        body: `## 第 1 至 3 天: 入驻

- 欢迎邮件,附支付门户与入驻表单
- 与您的 AiLys 负责人进行 60 分钟启动通话
- 开通客户门户访问
- 双方签署服务协议

## 第 4 至 7 天: 审计与策略

- 对您的站点、GBP 和引用足迹进行深度技术审计
- 交付策略文档(Google Doc,您可以批注)
- 30 分钟评审通话,锁定优先事项

## 第 8 至 21 天: 执行启动

- 上线 schema 标记(FAQ、Review、LocalBusiness、Service)
- GBP 优化(类别、属性、Q 与 A、图片)
- 首批引用提交
- 内容日历获批

## 第 22 至 30 天: 首份报告

- 交付月度绩效报告(PDF 与 Google Doc)
- 建立引用追踪基线
- 30 分钟策略通话,回顾成果并做调整

## 您应有的预期

Schema 与 GBP 的改进会在 30 到 60 天内反映到 Google 中。LLM 引用提升通常需要 90 到 120 天。无论数据规模大小,我们都会按月发送报告。不做虚荣指标。`,
      },
      ru: {
        title: "Что происходит в первые 30 дней",
        excerpt:
          "Что ожидать день за днём в первый месяц, от подписания договора до первого ежемесячного отчёта.",
        body: `## Дни 1–3: онбординг

- Приветственное письмо со ссылкой на платёжный портал и форму онбординга
- Стартовый звонок на 60 минут с вашим менеджером AiLys
- Открытие доступа к клиентскому порталу
- Подписание договора об оказании услуг с обеих сторон

## Дни 4–7: аудит и стратегия

- Глубокий технический аудит вашего сайта, GBP и текущих упоминаний
- Доставка стратегического документа (Google Doc, можно оставлять комментарии)
- Звонок-обзор на 30 минут для фиксации приоритетов

## Дни 8–21: запуск работ

- Развёртывание разметки schema (FAQ, Review, LocalBusiness, Service)
- Оптимизация GBP (категории, атрибуты, вопросы и ответы, фото)
- Первая партия отправок в каталоги и базы упоминаний
- Утверждение контент-календаря

## Дни 22–30: первый отчёт

- Доставка ежемесячного отчёта об эффективности (PDF и Google Doc)
- Установление базовой линии для отслеживания упоминаний
- Стратегический звонок на 30 минут для разбора результатов и корректировок

## Чего ожидать

Улучшения по schema и GBP отражаются в Google в течение 30–60 дней. Рост упоминаний в LLM обычно занимает 90–120 дней. Мы присылаем отчёт каждый месяц независимо от масштаба изменений. Без показных метрик.`,
      },
      ar: {
        title: "ما يحدث خلال أول 30 يوماً",
        excerpt:
          "توقعات يوماً بيوم خلال الشهر الأول، من توقيع العقد إلى تقريرك الشهري الأول.",
        body: `## الأيام 1 إلى 3: الإعداد

- رسالة ترحيب مع بوابة الدفع ونموذج الإعداد
- مكالمة انطلاق مدتها 60 دقيقة مع المسؤول عنك في AiLys
- منح الوصول إلى بوابة العميل الخاصة بك
- توقيع اتفاقية الخدمة من الطرفين

## الأيام 4 إلى 7: التدقيق والاستراتيجية

- تدقيق فني عميق لموقعك، وGBP، وبصمتك من الاستشهادات
- تسليم وثيقة الاستراتيجية (Google Doc، يمكنك التعليق عليها)
- مكالمة مراجعة مدتها 30 دقيقة لتثبيت الأولويات

## الأيام 8 إلى 21: انطلاق التنفيذ

- نشر ترميز Schema (FAQ، Review، LocalBusiness، Service)
- تحسين GBP (الفئات، السمات، الأسئلة والأجوبة، الصور)
- الدفعة الأولى من إرسالات الاستشهاد
- اعتماد تقويم المحتوى

## الأيام 22 إلى 30: التقرير الأول

- تسليم تقرير الأداء الشهري (PDF وGoogle Doc)
- ضبط خط الأساس لتتبع الاستشهادات
- مكالمة استراتيجية مدتها 30 دقيقة لمراجعة النتائج وإجراء التعديلات

## ما ينبغي توقعه

تظهر تحسينات Schema وGBP داخل Google خلال 30 إلى 60 يوماً. أما الارتفاع في الاستشهادات داخل LLM فيستغرق عادة من 90 إلى 120 يوماً. نرسل تقريراً شهرياً مهما كان حجم التغيير، دون أي مقاييس استعراضية.`,
      },
    },
  },
  {
    slug: "communication-cadence",
    title: "How we communicate with clients",
    excerpt:
      "Email, calls, Slack, monthly reports. Here is the rhythm and how to reach us between scheduled touchpoints.",
    category: "getting-started",
    updatedAt: "2026-04-10",
    readingTimeMin: 2,
    body: `## Scheduled touchpoints

Each tier includes a different cadence:

- **Starter**: Monthly 30-min call + monthly report
- **Core**: Bi-weekly 30-min call + monthly report
- **Growth**: Weekly 30-min call + monthly report + quarterly in-person review (Quebec, Toronto, Montreal)
- **Autopilot**: Same as Growth, plus Reviuzy SaaS dashboard access

## Between calls

- **Email**: hello@ailysagency.ca, response within 12 business hours
- **Slack** (Core+): shared channel with your AiLys team
- **Emergency**: text the lead listed in your welcome email, response within 2 hours during business days

## Reports

Monthly reports land on the 5th of each month. They cover:

- Citation tracking across 6 AI engines
- AEO, GEO, E-E-A-T scores vs prior month
- GBP performance (impressions, calls, direction requests)
- Schema deployment status
- Next month's priorities

Real numbers, plain language, no fluff.`,
    i18n: {
      fr: {
        title: "Comment nous communiquons avec les clients",
        excerpt:
          "Courriel, appels, Slack, rapports mensuels. Voici le rythme et comment nous joindre entre les points de contact prévus.",
        body: `## Points de contact prévus

Chaque forfait inclut une cadence différente :

- **Starter** : appel mensuel de 30 min et rapport mensuel
- **Core** : appel bimensuel de 30 min et rapport mensuel
- **Growth** : appel hebdomadaire de 30 min, rapport mensuel et revue trimestrielle en personne (Québec, Toronto, Montréal)
- **Autopilot** : identique à Growth, plus accès au tableau de bord Reviuzy SaaS

## Entre les appels

- **Courriel** : hello@ailysagency.ca, réponse en 12 heures ouvrables
- **Slack** (Core et plus) : canal partagé avec votre équipe AiLys
- **Urgence** : envoyez un texto au responsable indiqué dans votre courriel de bienvenue, réponse en 2 heures les jours ouvrables

## Rapports

Les rapports mensuels arrivent le 5 de chaque mois. Ils couvrent :

- Suivi des citations sur 6 moteurs IA
- Scores AEO, GEO et E-E-A-T comparés au mois précédent
- Performance GBP (impressions, appels, demandes d'itinéraire)
- État du déploiement schema
- Priorités du mois suivant

Vrais chiffres, langage clair, sans bourrage.`,
      },
      es: {
        title: "Cómo nos comunicamos con los clientes",
        excerpt:
          "Email, llamadas, Slack, reportes mensuales. Este es el ritmo y cómo contactarnos entre puntos de contacto programados.",
        body: `## Puntos de contacto programados

Cada plan incluye una cadencia distinta:

- **Starter**: llamada mensual de 30 min y reporte mensual
- **Core**: llamada quincenal de 30 min y reporte mensual
- **Growth**: llamada semanal de 30 min, reporte mensual y revisión trimestral en persona (Quebec, Toronto, Montreal)
- **Autopilot**: igual que Growth, más acceso al dashboard de Reviuzy SaaS

## Entre llamadas

- **Email**: hello@ailysagency.ca, respuesta en 12 horas hábiles
- **Slack** (Core en adelante): canal compartido con su equipo AiLys
- **Emergencia**: envíe SMS al líder indicado en su correo de bienvenida, respuesta en 2 horas en días hábiles

## Reportes

Los reportes mensuales llegan el día 5 de cada mes. Cubren:

- Seguimiento de citas en 6 motores de IA
- Puntajes AEO, GEO y E-E-A-T contra el mes anterior
- Desempeño de GBP (impresiones, llamadas, solicitudes de ruta)
- Estado del despliegue de schema
- Prioridades del próximo mes

Números reales, lenguaje claro, sin relleno.`,
      },
      zh: {
        title: "我们如何与客户沟通",
        excerpt:
          "邮件、通话、Slack、月度报告。以下是节奏,以及在固定接触点之间如何联系我们。",
        body: `## 固定接触点

每个套餐节奏不同:

- **Starter**: 每月一次 30 分钟通话加月度报告
- **Core**: 每两周一次 30 分钟通话加月度报告
- **Growth**: 每周一次 30 分钟通话、月度报告,加每季度一次现场评审(魁北克、多伦多、蒙特利尔)
- **Autopilot**: 与 Growth 相同,另含 Reviuzy SaaS 仪表盘访问权

## 通话之间

- **邮件**: hello@ailysagency.ca,12 个工作小时内回复
- **Slack**(Core 及以上): 与您的 AiLys 团队共享频道
- **紧急情况**: 短信联系欢迎邮件中列出的负责人,工作日 2 小时内回复

## 报告

月度报告每月 5 日送达。涵盖:

- 在 6 个 AI 引擎上的引用追踪
- AEO、GEO、E-E-A-T 评分与上月对比
- GBP 表现(展示、来电、路线请求)
- Schema 部署状态
- 次月优先事项

真实数字,直白语言,不掺水。`,
      },
      ru: {
        title: "Как мы общаемся с клиентами",
        excerpt:
          "Email, звонки, Slack, ежемесячные отчёты. Вот наш ритм и способы связаться с нами между запланированными точками контакта.",
        body: `## Запланированные точки контакта

В каждом тарифе своя частота:

- **Starter**: ежемесячный звонок на 30 минут и ежемесячный отчёт
- **Core**: звонок раз в две недели на 30 минут и ежемесячный отчёт
- **Growth**: еженедельный звонок на 30 минут, ежемесячный отчёт и ежеквартальная очная встреча (Квебек, Торонто, Монреаль)
- **Autopilot**: то же, что и Growth, плюс доступ к панели Reviuzy SaaS

## Между звонками

- **Email**: hello@ailysagency.ca, ответ в течение 12 рабочих часов
- **Slack** (от Core и выше): общий канал с вашей командой AiLys
- **Срочные вопросы**: SMS ответственному менеджеру, указанному в приветственном письме, ответ в течение 2 часов в рабочие дни

## Отчёты

Ежемесячные отчёты приходят 5-го числа каждого месяца. Они охватывают:

- Отслеживание упоминаний в 6 движках ИИ
- Оценки AEO, GEO и E-E-A-T в сравнении с прошлым месяцем
- Эффективность GBP (показы, звонки, запросы маршрутов)
- Статус развёртывания schema
- Приоритеты на следующий месяц

Реальные цифры, понятный язык, без воды.`,
      },
      ar: {
        title: "كيف نتواصل مع العملاء",
        excerpt:
          "البريد الإلكتروني، المكالمات، Slack، التقارير الشهرية. إليك إيقاع التواصل وطرق الوصول إلينا بين نقاط التواصل المجدولة.",
        body: `## نقاط التواصل المجدولة

كل خطة تشمل وتيرة مختلفة:

- **Starter**: مكالمة شهرية مدتها 30 دقيقة وتقرير شهري
- **Core**: مكالمة كل أسبوعين مدتها 30 دقيقة وتقرير شهري
- **Growth**: مكالمة أسبوعية مدتها 30 دقيقة، تقرير شهري، ومراجعة فصلية حضورية (كيبيك، تورونتو، مونتريال)
- **Autopilot**: نفس Growth إضافة إلى الوصول إلى لوحة تحكم Reviuzy SaaS

## بين المكالمات

- **البريد الإلكتروني**: hello@ailysagency.ca، الرد خلال 12 ساعة عمل
- **Slack** (من Core فأعلى): قناة مشتركة مع فريق AiLys الخاص بك
- **الحالات الطارئة**: أرسل رسالة نصية إلى المسؤول المذكور في رسالة الترحيب، الرد خلال ساعتين في أيام العمل

## التقارير

تصل التقارير الشهرية في اليوم الخامس من كل شهر. وتغطي:

- تتبّع الاستشهادات عبر 6 محركات ذكاء اصطناعي
- درجات AEO وGEO وE-E-A-T مقارنة بالشهر السابق
- أداء GBP (مرات الظهور، المكالمات، طلبات الاتجاهات)
- حالة نشر Schema
- أولويات الشهر القادم

أرقام حقيقية، لغة واضحة، دون حشو.`,
      },
    },
  },

  // ─── AEO / GEO / E-E-A-T ───────────────────────────────────
  {
    slug: "what-is-aeo",
    title: "What is AEO (Answer Engine Optimization)?",
    excerpt:
      "Plain English: AEO is the work of structuring your site so AI engines can pull a clean answer from your content.",
    category: "aeo-geo-eeat",
    updatedAt: "2026-04-12",
    readingTimeMin: 3,
    body: `## The 30-second version

AEO stands for Answer Engine Optimization. When someone asks ChatGPT, Bing Copilot, or Google AIO a question, those engines try to extract a direct answer from a website. AEO is the work of making your site the source they extract from.

## The four core moves

1. **FAQ schema** on every service page. Each common question gets structured answer markup.
2. **LocalBusiness schema** with full NAP, hours, payment methods, attributes.
3. **Review schema** with aggregateRating + at least 3 individual reviews marked up.
4. **Service schema**: one entity per service you offer, with relations back to LocalBusiness.

## Why it matters

AI engines are increasingly answering questions without sending a click to any source. By 2027, Google AI Overviews are projected to answer 30%+ of all queries. The businesses cited inside those answers will keep growing. The ones not cited will quietly fade.

## What we do

Schema deployment is part of the Core tier. Our team writes the markup, deploys it to your site, and monitors validation. Most clients ship in week 2 of onboarding.

Run the audit to see your current AEO score.`,
    i18n: {
      fr: {
        title: "Qu'est-ce que l'AEO (Answer Engine Optimization)?",
        excerpt:
          "En français clair : l'AEO est le travail consistant à structurer votre site pour que les moteurs IA puissent en tirer une réponse propre.",
        body: `## La version en 30 secondes

AEO signifie Answer Engine Optimization. Quand quelqu'un pose une question à ChatGPT, Bing Copilot ou Google AIO, ces moteurs tentent d'extraire une réponse directe depuis un site Web. L'AEO consiste à faire de votre site la source qu'ils extraient.

## Les quatre mouvements de base

1. **FAQ schema** sur chaque page de service. Chaque question courante reçoit un balisage de réponse structuré.
2. **LocalBusiness schema** avec NAP complet, heures, modes de paiement, attributs.
3. **Review schema** avec aggregateRating et au moins 3 avis individuels balisés.
4. **Service schema** : une entité par service offert, avec relations vers LocalBusiness.

## Pourquoi cela compte

Les moteurs IA répondent de plus en plus aux questions sans envoyer un clic à aucune source. D'ici 2027, on projette que les Google AI Overviews répondront à plus de 30 % de toutes les requêtes. Les entreprises citées dans ces réponses continueront de grandir. Celles qui ne le sont pas s'effaceront en silence.

## Ce que nous faisons

Le déploiement du schema fait partie du forfait Core. Notre équipe rédige le balisage, le déploie sur votre site et surveille la validation. La plupart des clients livrent en semaine 2 de l'intégration.

Lancez l'audit pour voir votre score AEO actuel.`,
      },
      es: {
        title: "¿Qué es el AEO (Answer Engine Optimization)?",
        excerpt:
          "En español sencillo: el AEO es el trabajo de estructurar su sitio para que los motores de IA extraigan una respuesta limpia desde su contenido.",
        body: `## La versión en 30 segundos

AEO significa Answer Engine Optimization. Cuando alguien hace una pregunta a ChatGPT, Bing Copilot o Google AIO, esos motores intentan extraer una respuesta directa desde un sitio web. El AEO consiste en lograr que su sitio sea la fuente desde la que extraen.

## Los cuatro movimientos base

1. **FAQ schema** en cada página de servicio. Cada pregunta común recibe marcado de respuesta estructurado.
2. **LocalBusiness schema** con NAP completo, horarios, métodos de pago, atributos.
3. **Review schema** con aggregateRating y al menos 3 reseñas individuales marcadas.
4. **Service schema**: una entidad por cada servicio ofrecido, con relaciones hacia LocalBusiness.

## Por qué importa

Los motores de IA cada vez responden más preguntas sin enviar clics a ninguna fuente. Para 2027, se proyecta que Google AI Overviews respondan más del 30 % de todas las consultas. Los negocios citados dentro de esas respuestas seguirán creciendo. Los no citados se irán apagando en silencio.

## Qué hacemos

El despliegue de schema forma parte del plan Core. Nuestro equipo redacta el marcado, lo despliega en su sitio y monitorea la validación. La mayoría de los clientes lo lanza en la semana 2 del onboarding.

Ejecute la auditoría para ver su puntaje AEO actual.`,
      },
      zh: {
        title: "什么是 AEO(Answer Engine Optimization)?",
        excerpt:
          "大白话: AEO 就是把您的网站结构化好,让 AI 引擎能从您的内容中提取出干净的答案。",
        body: `## 30 秒版本

AEO 即 Answer Engine Optimization(答案引擎优化)。当有人向 ChatGPT、Bing Copilot 或 Google AIO 提问时,这些引擎会尝试从某个网站中提取直接答案。AEO 就是让您的站点成为它们提取的源头。

## 四个核心动作

1. 在每个服务页面部署 **FAQ schema**。每个常见问题都获得结构化答案标记。
2. **LocalBusiness schema**,完整的 NAP、营业时间、支付方式、属性。
3. 带 aggregateRating 的 **Review schema**,以及至少 3 条单独标注的评论。
4. **Service schema**: 每项服务一个实体,并与 LocalBusiness 建立关系。

## 为什么重要

AI 引擎正在越来越多地无点击回答问题。预计到 2027 年,Google AI Overviews 将回答超过 30% 的全部查询。被这些答案引用的企业会持续增长。未被引用的则会无声地淡出。

## 我们做什么

Schema 部署属于 Core 套餐。我们的团队撰写标记、将其部署到您的站点,并监控验证。多数客户在入驻第 2 周即上线。

运行审计,查看您当前的 AEO 评分。`,
      },
      ru: {
        title: "Что такое AEO (Answer Engine Optimization)?",
        excerpt:
          "Простыми словами: AEO, это работа по структурированию вашего сайта так, чтобы движки ИИ могли вытянуть из него чистый ответ.",
        body: `## Версия за 30 секунд

AEO расшифровывается как Answer Engine Optimization. Когда кто-то задаёт вопрос ChatGPT, Bing Copilot или Google AIO, эти движки пытаются извлечь прямой ответ с какого-то сайта. AEO означает работу над тем, чтобы ваш сайт стал источником, из которого они извлекают ответ.

## Четыре базовых шага

1. **FAQ schema** на каждой странице услуг. Каждый частый вопрос получает структурированную разметку ответа.
2. **LocalBusiness schema** с полным NAP, часами работы, способами оплаты и атрибутами.
3. **Review schema** с aggregateRating плюс минимум 3 отдельно размеченных отзыва.
4. **Service schema**: одна сущность на каждую услугу, со связями обратно к LocalBusiness.

## Почему это важно

Движки ИИ всё чаще отвечают на вопросы, не отправляя клик ни одному источнику. По прогнозам, к 2027 году Google AI Overviews будут отвечать более чем на 30% всех запросов. Бизнесы, которых цитируют внутри этих ответов, продолжат расти. Те, кого не цитируют, тихо уйдут на второй план.

## Что делаем мы

Развёртывание schema входит в тариф Core. Наша команда пишет разметку, выкладывает её на ваш сайт и следит за валидацией. Большинство клиентов выкатывают её на 2-й неделе онбординга.

Запустите аудит, чтобы увидеть свою текущую оценку AEO.`,
      },
      ar: {
        title: "ما هو AEO (تحسين محركات الإجابة)؟",
        excerpt:
          "بعبارة بسيطة: AEO هو العمل على هيكلة موقعك بحيث يمكن لمحركات الذكاء الاصطناعي استخراج إجابة نظيفة من محتواك.",
        body: `## النسخة المختصرة في 30 ثانية

AEO اختصار لـ Answer Engine Optimization. عندما يطرح شخص سؤالاً على ChatGPT أو Bing Copilot أو Google AIO، تحاول هذه المحركات استخراج إجابة مباشرة من أحد المواقع. AEO هو العمل الذي يجعل موقعك المصدر الذي تستخرج منه الإجابة.

## الخطوات الأربع الأساسية

1. **FAQ schema** على كل صفحة خدمة. كل سؤال شائع يحصل على ترميز إجابة منظّم.
2. **LocalBusiness schema** مع NAP كامل وساعات العمل وطرق الدفع والسمات.
3. **Review schema** مع aggregateRating وما لا يقل عن 3 مراجعات فردية مرمَّزة.
4. **Service schema**: كيان واحد لكل خدمة تقدّمها، مع علاقات تربطه بـ LocalBusiness.

## لماذا يهم هذا

تجيب محركات الذكاء الاصطناعي على عدد متزايد من الأسئلة دون إرسال أي نقرة لأي مصدر. وتشير التوقعات إلى أن Google AI Overviews ستجيب على أكثر من 30% من جميع الاستفسارات بحلول 2027. الأعمال التي يُستشهد بها داخل هذه الإجابات ستواصل النمو. أما الأعمال غير المُستشهد بها فستتلاشى بهدوء.

## ما نقوم به

نشر Schema جزء من خطة Core. فريقنا يكتب الترميز، وينشره على موقعك، ويراقب التحقق منه. يطلق معظم العملاء النشر في الأسبوع الثاني من الإعداد.

اطلب التدقيق لمعرفة درجة AEO الحالية لديك.`,
      },
    },
  },
  {
    slug: "what-is-geo",
    title: "What is GEO (Generative Engine Optimization)?",
    excerpt:
      "Getting your brand cited inside generative AI responses, not just the answers themselves.",
    category: "aeo-geo-eeat",
    updatedAt: "2026-04-12",
    readingTimeMin: 3,
    body: `## GEO is different from AEO

AEO is about being the answer. GEO is about being named inside the answer.

ChatGPT can give a great answer about your industry without naming a single business. GEO is the work of being one of the businesses it names.

## The signals that drive GEO

- **Wikipedia and Wikidata footprint**: the entity layer LLMs pull from
- **High-DA citation density**: Yelp, BBB, Crunchbase, industry directories
- **Authoritative third-party content**: news mentions, podcast guest spots, industry publications
- **Original data or research** that other sites cite back to you

## Why GEO is harder than AEO

AEO is mostly your own work on your own site. GEO depends on third-party validation. You cannot DIY it overnight.

## What we do

The Core tier includes 5 citation submissions per month, plus our standard Wikipedia/Wikidata workflow. The Growth tier adds dedicated PR outreach and original research production.`,
    i18n: {
      fr: {
        title: "Qu'est-ce que le GEO (Generative Engine Optimization)?",
        excerpt:
          "Faire citer votre marque dans les réponses des IA génératives, pas seulement les réponses elles-mêmes.",
        body: `## Le GEO diffère de l'AEO

L'AEO consiste à être la réponse. Le GEO consiste à être nommé à l'intérieur de la réponse.

ChatGPT peut donner une excellente réponse sur votre secteur sans nommer une seule entreprise. Le GEO, c'est le travail d'être l'une des entreprises nommées.

## Les signaux qui font bouger le GEO

- **Empreinte Wikipedia et Wikidata** : la couche d'entités à laquelle les LLM puisent
- **Densité de citations à haute DA** : Yelp, BBB, Crunchbase, annuaires sectoriels
- **Contenu tiers faisant autorité** : mentions presse, passages en balado, publications sectorielles
- **Données ou recherches originales** que d'autres sites citent à leur tour

## Pourquoi le GEO est plus difficile que l'AEO

L'AEO est surtout du travail sur votre propre site. Le GEO dépend de la validation par des tiers. Impossible de le bâcler du jour au lendemain.

## Ce que nous faisons

Le forfait Core inclut 5 soumissions de citations par mois, plus notre flux standard Wikipedia et Wikidata. Le forfait Growth ajoute un démarchage RP dédié et la production de recherche originale.`,
      },
      es: {
        title: "¿Qué es el GEO (Generative Engine Optimization)?",
        excerpt:
          "Lograr que su marca sea citada dentro de las respuestas de IA generativa, no solo las respuestas en sí.",
        body: `## El GEO es distinto del AEO

El AEO es ser la respuesta. El GEO es ser nombrado dentro de la respuesta.

ChatGPT puede dar una respuesta excelente sobre su sector sin nombrar a un solo negocio. El GEO es el trabajo de ser uno de los negocios que sí nombra.

## Las señales que mueven el GEO

- **Huella en Wikipedia y Wikidata**: la capa de entidades de la que extraen los LLM
- **Densidad de citas en sitios de alta DA**: Yelp, BBB, Crunchbase, directorios sectoriales
- **Contenido externo con autoridad**: menciones de prensa, participaciones en podcasts, publicaciones sectoriales
- **Datos o investigación original** que otros sitios citen de regreso

## Por qué el GEO es más difícil que el AEO

El AEO es principalmente trabajo propio en su propio sitio. El GEO depende de validación de terceros. No puede improvisarse de un día para otro.

## Qué hacemos

El plan Core incluye 5 envíos de citas por mes, más nuestro flujo estándar de Wikipedia y Wikidata. El plan Growth añade gestión de PR dedicada y producción de investigación original.`,
      },
      zh: {
        title: "什么是 GEO(Generative Engine Optimization)?",
        excerpt:
          "让您的品牌出现在生成式 AI 回答中被引用,而不只是回答本身。",
        body: `## GEO 与 AEO 不同

AEO 是成为答案,GEO 是在答案中被点名。

ChatGPT 可以就您的行业给出一段精彩回答,却一家企业都不点名。GEO 就是让自己成为它点名的企业之一。

## 推动 GEO 的信号

- **Wikipedia 与 Wikidata 足迹**: LLM 取用的实体层
- **高 DA 引用密度**: Yelp、BBB、Crunchbase、行业目录
- **权威第三方内容**: 媒体提及、播客嘉宾席位、行业刊物
- 让其他站点反向引用您的**原始数据或研究**

## 为什么 GEO 比 AEO 更难

AEO 主要是您在自家站点上的工作。GEO 依赖第三方验证,无法一夜搞定。

## 我们做什么

Core 套餐每月包含 5 次引用提交,以及我们标准的 Wikipedia 与 Wikidata 工作流。Growth 套餐增加专属 PR 拓展和原创研究产出。`,
      },
      ru: {
        title: "Что такое GEO (Generative Engine Optimization)?",
        excerpt:
          "Как добиться, чтобы ваш бренд называли внутри ответов генеративного ИИ, а не только сами ответы.",
        body: `## GEO отличается от AEO

AEO про то, чтобы быть ответом. GEO про то, чтобы вас называли внутри ответа.

ChatGPT может выдать отличный ответ про вашу отрасль, не назвав ни одной компании. GEO означает работу над тем, чтобы вашу компанию назвали.

## Сигналы, которые двигают GEO

- **Присутствие в Wikipedia и Wikidata**: слой сущностей, из которого черпают LLM
- **Плотность упоминаний на ресурсах с высоким DA**: Yelp, BBB, Crunchbase, отраслевые каталоги
- **Авторитетный сторонний контент**: упоминания в прессе, гостевые выпуски подкастов, отраслевые издания
- **Оригинальные данные или исследования**, на которые ссылаются другие сайты

## Почему GEO сложнее, чем AEO

AEO в основном работа на собственном сайте. GEO зависит от подтверждения третьими сторонами. Сделать его за одну ночь невозможно.

## Что делаем мы

Тариф Core включает 5 отправок упоминаний в месяц плюс наш стандартный процесс по Wikipedia и Wikidata. Тариф Growth добавляет выделенный PR-аутрич и производство оригинальных исследований.`,
      },
      ar: {
        title: "ما هو GEO (تحسين المحركات التوليدية)؟",
        excerpt:
          "جعل علامتك التجارية مذكورة داخل ردود الذكاء الاصطناعي التوليدي، وليس مجرد الردود نفسها.",
        body: `## GEO يختلف عن AEO

AEO يعني أن تكون أنت الإجابة. أما GEO فيعني أن يُذكر اسمك داخل الإجابة.

يمكن لـ ChatGPT أن يقدّم إجابة ممتازة عن قطاعك دون أن يذكر أي شركة. أما GEO فهو العمل الذي يجعل عملك واحداً من الأسماء التي تُذكر.

## الإشارات التي تحرّك GEO

- **البصمة في Wikipedia وWikidata**: طبقة الكيانات التي تستقي منها نماذج LLM
- **كثافة الاستشهاد على مواقع ذات DA مرتفع**: Yelp وBBB وCrunchbase والأدلة القطاعية
- **محتوى خارجي ذو سلطة**: تغطيات صحفية، استضافات في البودكاست، منشورات قطاعية
- **بيانات أو أبحاث أصلية** يشير إليها الآخرون مرة أخرى

## لماذا GEO أصعب من AEO

AEO يعتمد بشكل أساسي على عملك على موقعك الخاص. أما GEO فيعتمد على تحقق طرف ثالث، ولا يمكن إنجازه بين عشية وضحاها.

## ما نقوم به

تشمل خطة Core 5 إرسالات استشهاد شهرياً إضافة إلى سير العمل المعتمد لدينا في Wikipedia وWikidata. تضيف خطة Growth جهود علاقات عامة مخصّصة وإنتاج أبحاث أصلية.`,
      },
    },
  },
  {
    slug: "what-is-eeat",
    title: "What is E-E-A-T?",
    excerpt:
      "Experience, Expertise, Authoritativeness, Trust. The rubric AI engines use to pick whose content to cite.",
    category: "aeo-geo-eeat",
    updatedAt: "2026-04-13",
    readingTimeMin: 3,
    body: `## The four pillars

- **Experience**: first-hand evidence. Original photos with EXIF data, real customer interviews, on-site videos.
- **Expertise**: credentials. Author bios with real qualifications, industry-specific vocabulary used correctly.
- **Authoritativeness**: third-party validation. Press, awards, peer recognition, industry citations.
- **Trust**: business honesty. SSL, no broken links, transparent pricing, real reviews not fake.

## Why E-E-A-T is your highest leverage

Google rebuilt its quality rater guidelines around E-E-A-T in 2024. Every LLM that uses Google's index inherits the weighting. AI search engines now actively penalize content that reads as AI-generated and reward content that reads as human, on-site, with proof.

## What "fixing" E-E-A-T looks like

Three concrete moves we ship for clients:

1. Author bylines added to all blog content (we use Person schema with credentials)
2. Original photography or video for every service page (no stock)
3. Award and credential schema markup so AI engines can verify your authority

## Common mistakes

- "AI-written" content with no human review and no byline
- Stock photos everywhere
- Pricing hidden behind a "contact us" form
- No author profile pages

The first two we fix with content production. The last two are policy decisions you make with your AiLys lead.`,
    i18n: {
      fr: {
        title: "Qu'est-ce que E-E-A-T?",
        excerpt:
          "Experience, Expertise, Authoritativeness, Trust. La grille que les moteurs IA utilisent pour choisir quel contenu citer.",
        body: `## Les quatre piliers

- **Experience** : preuves de première main. Photos originales avec données EXIF, entrevues clients réelles, vidéos sur place.
- **Expertise** : qualifications. Biographies d'auteur avec qualifications réelles, vocabulaire sectoriel utilisé correctement.
- **Authoritativeness** : validation par des tiers. Presse, prix, reconnaissance par les pairs, citations sectorielles.
- **Trust** : honnêteté commerciale. SSL, aucun lien brisé, prix transparents, vrais avis et non factices.

## Pourquoi E-E-A-T est votre plus fort levier

Google a refondu ses lignes directrices d'évaluateurs qualité autour de E-E-A-T en 2024. Chaque LLM qui utilise l'index de Google hérite de cette pondération. Les moteurs de recherche IA pénalisent désormais activement le contenu qui sent l'IA et récompensent celui qui sent l'humain, sur place, avec preuves.

## À quoi ressemble la « correction » d'E-E-A-T

Trois mouvements concrets que nous livrons aux clients :

1. Signatures d'auteur ajoutées à tout le contenu de blogue (Person schema avec qualifications)
2. Photos ou vidéos originales pour chaque page de service (pas de banque d'images)
3. Balisage schema pour prix et accréditations afin que les moteurs IA puissent vérifier votre autorité

## Erreurs fréquentes

- Contenu « écrit par IA » sans revue humaine ni signature
- Photos de banques partout
- Prix caché derrière un formulaire « contactez-nous »
- Aucune page de profil d'auteur

Les deux premières se règlent par la production de contenu. Les deux dernières sont des décisions de politique que vous prenez avec votre responsable AiLys.`,
      },
      es: {
        title: "¿Qué es E-E-A-T?",
        excerpt:
          "Experience, Expertise, Authoritativeness, Trust. La rúbrica que los motores de IA usan para elegir qué contenido citar.",
        body: `## Los cuatro pilares

- **Experience**: evidencia de primera mano. Fotos originales con datos EXIF, entrevistas reales con clientes, videos in situ.
- **Expertise**: credenciales. Biografías de autor con calificaciones reales, vocabulario sectorial bien usado.
- **Authoritativeness**: validación externa. Prensa, premios, reconocimiento de pares, citas sectoriales.
- **Trust**: honestidad comercial. SSL, sin enlaces rotos, precios transparentes, reseñas reales y no falsas.

## Por qué E-E-A-T es su mayor palanca

Google reconstruyó sus guías para evaluadores de calidad alrededor de E-E-A-T en 2024. Todo LLM que usa el índice de Google hereda esa ponderación. Los motores de búsqueda con IA hoy penalizan activamente el contenido que se lee como generado por IA y premian el que se lee humano, en sitio, con pruebas.

## Cómo se ve "arreglar" E-E-A-T

Tres movimientos concretos que entregamos a clientes:

1. Firmas de autor añadidas a todo el contenido del blog (usamos Person schema con credenciales)
2. Fotografía o video original para cada página de servicio (sin imágenes de stock)
3. Marcado schema de premios y credenciales para que los motores IA puedan verificar su autoridad

## Errores comunes

- Contenido "escrito por IA" sin revisión humana ni firma
- Fotos de stock en todas partes
- Precios escondidos detrás de un formulario "contáctenos"
- Sin páginas de perfil de autor

Los dos primeros se arreglan con producción de contenido. Los dos últimos son decisiones de política que se toman con su líder en AiLys.`,
      },
      zh: {
        title: "什么是 E-E-A-T?",
        excerpt:
          "Experience(经验)、Expertise(专业)、Authoritativeness(权威)、Trust(可信)。AI 引擎用来挑选引用内容的标尺。",
        body: `## 四大支柱

- **Experience**: 第一手证据。带 EXIF 数据的原创图片、真实的客户访谈、现场视频。
- **Expertise**: 资历。作者简介中包含真实资格,行业术语使用正确。
- **Authoritativeness**: 第三方背书。媒体、奖项、同行认可、行业引用。
- **Trust**: 商业诚信。SSL、无失效链接、价格透明、真实评论而非作假。

## 为什么 E-E-A-T 是您最大的杠杆

Google 在 2024 年围绕 E-E-A-T 重写了质量评估员指南。任何使用 Google 索引的 LLM 都继承了这套加权。AI 搜索引擎如今主动惩罚那些读起来像 AI 生成的内容,奖励那些读起来由人类完成、现场制作、附带证据的内容。

## "修复" E-E-A-T 的样子

我们为客户落地的三项具体动作:

1. 为所有博客内容添加作者署名(使用带资历的 Person schema)
2. 每个服务页配备原创图片或视频(不用图库)
3. 部署奖项与资历的 schema 标记,让 AI 引擎可验证您的权威性

## 常见错误

- "AI 撰写"的内容,既无人工审稿也无署名
- 到处都是图库照片
- 价格藏在"联系我们"表单后
- 没有作者档案页

前两项我们用内容生产解决。后两项是您与 AiLys 负责人共同决定的策略问题。`,
      },
      ru: {
        title: "Что такое E-E-A-T?",
        excerpt:
          "Experience, Expertise, Authoritativeness, Trust. Шкала, по которой движки ИИ выбирают, чей контент цитировать.",
        body: `## Четыре опоры

- **Experience**: личный опыт. Оригинальные фотографии с EXIF-данными, реальные интервью с клиентами, видео, снятые на месте.
- **Expertise**: квалификация. Биографии авторов с реальными регалиями, отраслевая лексика, употребляемая корректно.
- **Authoritativeness**: подтверждение со стороны. Пресса, награды, признание коллег, отраслевые упоминания.
- **Trust**: добросовестность бизнеса. SSL, отсутствие битых ссылок, прозрачные цены, реальные отзывы вместо накрученных.

## Почему E-E-A-T даёт максимальный эффект

В 2024 году Google переписал свои руководства для оценщиков качества вокруг E-E-A-T. Каждый LLM, использующий индекс Google, наследует это взвешивание. Поисковики на ИИ теперь активно понижают контент, который читается как сгенерированный ИИ, и поощряют тот, что выглядит человеческим, написан на месте и подкреплён доказательствами.

## Как выглядит «починка» E-E-A-T

Три конкретных шага, которые мы внедряем для клиентов:

1. Добавление авторских подписей ко всему блоговому контенту (используем Person schema с регалиями)
2. Оригинальная фотография или видео для каждой страницы услуг (без стоков)
3. Разметка наград и квалификаций через schema, чтобы движки ИИ могли проверить вашу авторитетность

## Частые ошибки

- Контент, «написанный ИИ», без редактуры человеком и без подписи
- Стоковые фото повсюду
- Цены спрятаны за формой «свяжитесь с нами»
- Нет страниц с профилями авторов

Первые две проблемы решаем через контент-продакшн. Последние две, это решения по политике, которые вы принимаете вместе со своим менеджером AiLys.`,
      },
      ar: {
        title: "ما هو E-E-A-T؟",
        excerpt:
          "Experience، Expertise، Authoritativeness، Trust. المعيار الذي تستخدمه محركات الذكاء الاصطناعي لاختيار المحتوى الذي تستشهد به.",
        body: `## الركائز الأربع

- **Experience**: دليل مباشر من الميدان. صور أصلية ببيانات EXIF، مقابلات حقيقية مع العملاء، مقاطع فيديو مصوّرة في الموقع.
- **Expertise**: المؤهلات. سير ذاتية للمؤلفين بمؤهلات حقيقية، واستخدام مصطلحات القطاع بشكل صحيح.
- **Authoritativeness**: تحقق من طرف ثالث. تغطية صحفية، جوائز، اعتراف من الأقران، استشهادات قطاعية.
- **Trust**: نزاهة العمل. SSL، غياب الروابط المعطوبة، أسعار شفافة، مراجعات حقيقية وليست مزيّفة.

## لماذا E-E-A-T هو أعلى نقطة تأثير لديك

أعادت Google صياغة إرشادات مقيّمي الجودة حول E-E-A-T في 2024. كل نموذج LLM يستخدم فهرس Google يرث هذا الترجيح. تعاقب محركات بحث الذكاء الاصطناعي اليوم بشكل فعّال المحتوى الذي يبدو من إنتاج الذكاء الاصطناعي، وتكافئ المحتوى الذي يبدو بشرياً وميدانياً ومدعوماً بالأدلة.

## كيف يبدو «إصلاح» E-E-A-T

ثلاث خطوات ملموسة ننفّذها للعملاء:

1. إضافة توقيع المؤلف لكل محتوى المدوّنة (نستخدم Person schema مع المؤهلات)
2. تصوير فوتوغرافي أو فيديو أصلي لكل صفحة خدمة (لا صور مخزنة)
3. ترميز Schema للجوائز والمؤهلات حتى تتمكن محركات الذكاء الاصطناعي من التحقق من سلطتك

## الأخطاء الشائعة

- محتوى «مكتوب بالذكاء الاصطناعي» دون مراجعة بشرية ودون توقيع
- صور مخزنة في كل مكان
- أسعار مخفية خلف نموذج «اتصل بنا»
- لا توجد صفحات تعريف للمؤلفين

نعالج أول مشكلتين عبر إنتاج المحتوى. أما الأخيرتان فهما قرارات سياسة تتخذها مع المسؤول عنك في AiLys.`,
      },
    },
  },

  // ─── Pricing ─────────────────────────────────────────────
  {
    slug: "which-tier-is-right-for-me",
    title: "Which tier is right for my business?",
    excerpt:
      "Quick decision tree to pick between Starter, Core, Growth, and Autopilot.",
    category: "pricing-plans",
    updatedAt: "2026-04-15",
    readingTimeMin: 3,
    body: `## Quick decision tree

**Starter, $300/mo** is right if:
- Solo restaurant, indie professional, or small salon
- One location
- No prior agency engagement
- You want to dip a toe in AI search optimization

**Core, $600/mo** (most chosen) is right if:
- Dental practice, contractor, growing restaurant
- One to three locations
- You need schema implementation and citation building
- You want bilingual content production

**Growth, $1,200/mo** is right if:
- Multi-location, franchise, or aggressive expansion plan
- 4+ locations
- You need GEO entity authority work and weekly content
- You want competitive monitoring

**Autopilot, $1,599/mo** is right if:
- Everything Growth covers, plus you want zero ops
- You want Reviuzy SaaS bundled in
- You want a monthly review contest run for you
- You want NFC tap cards shipped to your locations

## The "I am unsure" rule

Pick Core. It is the most-chosen tier for a reason: it covers 80% of what most local businesses need. You can upgrade to Growth or Autopilot any time, no penalty.`,
    i18n: {
      fr: {
        title: "Quel forfait convient à mon entreprise?",
        excerpt:
          "Arbre de décision rapide pour choisir entre Starter, Core, Growth et Autopilot.",
        body: `## Arbre de décision rapide

**Starter, 300 $/mois** convient si :
- Restaurant indépendant, professionnel solo ou petit salon
- Un seul emplacement
- Aucune expérience préalable avec une agence
- Vous voulez tâter le terrain en optimisation pour la recherche IA

**Core, 600 $/mois** (le plus choisi) convient si :
- Cabinet dentaire, entrepreneur, restaurant en croissance
- Un à trois emplacements
- Vous avez besoin d'implémentation schema et de citation building
- Vous voulez une production de contenu bilingue

**Growth, 1 200 $/mois** convient si :
- Multi-emplacements, franchise ou plan d'expansion agressif
- 4 emplacements ou plus
- Vous avez besoin de travail d'autorité d'entité GEO et de contenu hebdomadaire
- Vous voulez une surveillance concurrentielle

**Autopilot, 1 299 $/mois** convient si :
- Tout ce que couvre Growth, plus vous voulez zéro opération
- Vous voulez Reviuzy SaaS inclus dans le lot
- Vous voulez un concours d'avis mensuel mené pour vous
- Vous voulez des cartes NFC à toucher livrées à vos emplacements

## La règle « je ne sais pas »

Choisissez Core. C'est le forfait le plus choisi pour une raison : il couvre 80 % des besoins de la plupart des entreprises locales. Vous pouvez passer à Growth ou Autopilot n'importe quand, sans pénalité.`,
      },
      es: {
        title: "¿Qué plan es el adecuado para mi negocio?",
        excerpt:
          "Árbol de decisión rápido para elegir entre Starter, Core, Growth y Autopilot.",
        body: `## Árbol de decisión rápido

**Starter, $300/mes** le conviene si:
- Restaurante solo, profesional independiente o salón pequeño
- Una sola sucursal
- Sin trabajo previo con agencias
- Quiere meter el pie en la optimización para búsqueda IA

**Core, $600/mes** (el más elegido) le conviene si:
- Consultorio dental, contratista, restaurante en crecimiento
- Una a tres sucursales
- Necesita implementación de schema y citation building
- Quiere producción de contenido bilingüe

**Growth, $1,200/mes** le conviene si:
- Multi-sucursal, franquicia o plan de expansión agresivo
- 4 sucursales o más
- Necesita trabajo de autoridad de entidad GEO y contenido semanal
- Quiere monitoreo competitivo

**Autopilot, $1,599/mes** le conviene si:
- Todo lo que cubre Growth, más cero operaciones de su lado
- Quiere Reviuzy SaaS incluido
- Quiere un concurso mensual de reseñas operado por nosotros
- Quiere tarjetas NFC enviadas a sus sucursales

## La regla "no estoy seguro"

Elija Core. Es el más elegido por una razón: cubre el 80 % de lo que necesita la mayoría de los negocios locales. Puede subir a Growth o Autopilot en cualquier momento, sin penalización.`,
      },
      zh: {
        title: "哪个套餐适合我的企业?",
        excerpt:
          "快速决策树,帮您在 Starter、Core、Growth 与 Autopilot 中做选择。",
        body: `## 快速决策树

**Starter,$300/月** 适合:
- 独立餐厅、独立从业者或小型沙龙
- 单一门店
- 此前未与代理合作过
- 想初步尝试 AI 搜索优化

**Core,$600/月**(最受欢迎)适合:
- 牙科诊所、承包商、成长中的餐厅
- 1 到 3 家门店
- 需要 schema 实施与 citation building
- 希望进行双语内容产出

**Growth,$1,200/月** 适合:
- 多门店、连锁或激进扩张计划
- 4 家及以上门店
- 需要 GEO 实体权威工作与每周内容
- 希望进行竞争对手监测

**Autopilot,$1,599/月** 适合:
- 涵盖 Growth 的全部,且您希望运营全部托管
- 希望打包 Reviuzy SaaS
- 希望由我们代为运行每月评论征集活动
- 希望我们将 NFC 触碰卡寄送到各门店

## "我不确定" 法则

选 Core。它成为最受欢迎套餐是有原因的: 覆盖了大多数本地企业 80% 的需求。您可以随时升级到 Growth 或 Autopilot,无任何罚则。`,
      },
      ru: {
        title: "Какой тариф подойдёт моему бизнесу?",
        excerpt:
          "Быстрое дерево решений для выбора между Starter, Core, Growth и Autopilot.",
        body: `## Быстрое дерево решений

**Starter, $300/мес.** подойдёт, если:
- Независимый ресторан, частный специалист или небольшой салон
- Одна локация
- Раньше не работали с агентствами
- Хотите попробовать оптимизацию под поиск ИИ

**Core, $600/мес.** (выбирают чаще всего) подойдёт, если:
- Стоматология, подрядчик, растущий ресторан
- От одной до трёх локаций
- Нужно внедрение schema и работа по citation building
- Хотите двуязычное производство контента

**Growth, $1,200/мес.** подойдёт, если:
- Несколько локаций, франшиза или агрессивный план расширения
- 4 локации и больше
- Нужна работа с авторитетом сущности под GEO и еженедельный контент
- Хотите мониторинг конкурентов

**Autopilot, $1,599/мес.** подойдёт, если:
- Всё, что покрывает Growth, плюс вы хотите ноль операционки
- Хотите Reviuzy SaaS в комплекте
- Хотите ежемесячный конкурс отзывов, организованный за вас
- Хотите NFC-карты с тапом, отправленные в ваши локации

## Правило «я не уверен»

Берите Core. Это самый популярный тариф не просто так: он закрывает 80% потребностей большинства локальных бизнесов. Перейти на Growth или Autopilot можно в любой момент без штрафов.`,
      },
      ar: {
        title: "أي خطة تناسب نشاطي التجاري؟",
        excerpt:
          "شجرة قرار سريعة للاختيار بين Starter وCore وGrowth وAutopilot.",
        body: `## شجرة القرار السريعة

**Starter بسعر $300 شهرياً** مناسبة إذا:
- كنت تدير مطعماً منفرداً أو مهنياً مستقلاً أو صالوناً صغيراً
- لديك فرع واحد فقط
- لم تتعامل مع وكالة من قبل
- ترغب في تجربة تحسين البحث بالذكاء الاصطناعي بشكل مبدئي

**Core بسعر $600 شهرياً** (الأكثر اختياراً) مناسبة إذا:
- كنت تدير عيادة أسنان أو شركة مقاولات أو مطعماً في طور النمو
- لديك من فرع إلى ثلاثة فروع
- تحتاج إلى تطبيق Schema وبناء الاستشهادات
- ترغب في إنتاج محتوى ثنائي اللغة

**Growth بسعر $1,200 شهرياً** مناسبة إذا:
- كنت تدير فروعاً متعددة أو امتيازاً تجارياً أو خطة توسّع طموحة
- لديك 4 فروع أو أكثر
- تحتاج إلى عمل سلطة الكيان لـ GEO ومحتوى أسبوعي
- ترغب في مراقبة المنافسين

**Autopilot بسعر $1,599 شهرياً** مناسبة إذا:
- أردت كل ما تشمله Growth، إضافة إلى تشغيل بلا أي عمليات من جانبك
- أردت Reviuzy SaaS ضمن الباقة
- أردت إدارة مسابقة مراجعات شهرية بالنيابة عنك
- أردت إرسال بطاقات NFC إلى فروعك

## قاعدة «لست متأكداً»

اختر Core. هذه هي الأكثر اختياراً لسبب وجيه، فهي تغطي 80% مما تحتاجه معظم الأعمال المحلية. يمكنك الترقية إلى Growth أو Autopilot في أي وقت دون أي غرامة.`,
      },
    },
  },
  {
    slug: "what-is-the-money-back-guarantee",
    title: "How does the 30-day money-back guarantee work?",
    excerpt:
      "If you do not see measurable schema or citation improvements in 30 days, we refund the month. Here is the fine print.",
    category: "pricing-plans",
    updatedAt: "2026-04-16",
    readingTimeMin: 2,
    body: `## What is covered

If, at the end of your first 30 days, you do not see at least one of:

- Schema validated and live on your site
- A measurable lift in your monthly citation tracking baseline
- A new GBP ranking position improvement

...you can request a full refund of the first month's fee. No clawback. You keep the schema we shipped and the citations we landed.

## How to request

Email hello@ailysagency.ca within 35 days of your start date with subject line "Refund request". We process within 5 business days, no questions, no guilt trip.

## What is not covered

- Months 2 onward (these are month-to-month, you can cancel any time with 2 weeks notice)
- Reviuzy SaaS fees inside the Autopilot tier (these are separate and follow Reviuzy's own refund policy)

## Why we offer this

Buying agency services on the internet is a credibility test. We are early stage and we know it. Removing financial risk on the first month is the cheapest way to earn the relationship.`,
    i18n: {
      fr: {
        title: "Comment fonctionne la garantie satisfait ou remboursé de 30 jours?",
        excerpt:
          "Si vous ne constatez pas d'améliorations mesurables au schema ou aux citations en 30 jours, nous remboursons le mois. Voici les détails.",
        body: `## Ce qui est couvert

Si, à la fin de vos 30 premiers jours, vous ne constatez aucun de :

- Schema validé et en ligne sur votre site
- Une hausse mesurable de votre référence mensuelle de suivi des citations
- Une nouvelle amélioration de position GBP

...vous pouvez demander un remboursement intégral des frais du premier mois. Aucune reprise. Vous conservez le schema livré et les citations décrochées.

## Comment en faire la demande

Envoyez un courriel à hello@ailysagency.ca dans les 35 jours suivant votre date de début avec comme objet « Demande de remboursement ». Nous traitons en 5 jours ouvrables, sans questions, sans culpabilisation.

## Ce qui n'est pas couvert

- Les mois 2 et suivants (ils sont au mois, vous pouvez résilier en tout temps avec 2 semaines de préavis)
- Les frais Reviuzy SaaS inclus dans le forfait Autopilot (ils sont distincts et suivent la politique de remboursement de Reviuzy)

## Pourquoi nous l'offrons

Acheter des services d'agence sur internet est un test de crédibilité. Nous sommes en début de parcours et nous le savons. Retirer le risque financier au premier mois est le moyen le moins coûteux de mériter la relation.`,
      },
      es: {
        title: "¿Cómo funciona la garantía de devolución de 30 días?",
        excerpt:
          "Si no ve mejoras medibles en schema o citas en 30 días, le devolvemos el mes. Esta es la letra chica.",
        body: `## Qué cubre

Si, al final de sus primeros 30 días, no observa al menos uno de:

- Schema validado y publicado en su sitio
- Un alza medible en la línea base mensual de seguimiento de citas
- Una nueva mejora de posición en GBP

...puede solicitar el reembolso completo de la cuota del primer mes. Sin retroactivo. Conserva el schema que desplegamos y las citas que conseguimos.

## Cómo solicitarlo

Envíe correo a hello@ailysagency.ca dentro de los 35 días desde su fecha de inicio con el asunto "Solicitud de reembolso". Procesamos en 5 días hábiles, sin preguntas, sin culpabilizar.

## Qué no cubre

- Mes 2 en adelante (son mes a mes, puede cancelar cuando guste con 2 semanas de aviso)
- Las cuotas de Reviuzy SaaS dentro del plan Autopilot (son aparte y siguen la política de reembolso de Reviuzy)

## Por qué la ofrecemos

Comprar servicios de agencia por internet es una prueba de credibilidad. Estamos en etapa temprana y lo sabemos. Quitar el riesgo financiero del primer mes es la forma más barata de ganarse la relación.`,
      },
      zh: {
        title: "30 天退款保证如何运作?",
        excerpt:
          "如果 30 天内您看不到可衡量的 schema 或引用改进,我们退还当月费用。以下是细则。",
        body: `## 涵盖范围

如果在您的前 30 天结束时,您没有看到以下任意一项:

- Schema 验证通过并已在您的站点上线
- 月度引用追踪基线出现可衡量的提升
- GBP 排名出现新的位置改善

...您可以申请全额退还首月费用。不追讨。您保留我们部署的 schema 和已拿下的引用。

## 如何申请

请在开始日期起 35 天内发邮件至 hello@ailysagency.ca,主题写"Refund request"。我们在 5 个工作日内处理,不盘问、不施压。

## 不涵盖范围

- 第 2 个月及以后(按月计费,任何时候可提前 2 周通知取消)
- Autopilot 套餐内的 Reviuzy SaaS 费用(独立计费,遵循 Reviuzy 自有的退款政策)

## 我们为什么提供它

在网上购买代理服务是一场信任考验。我们处于早期阶段,我们清楚这一点。在首月去除财务风险,是赢得这段关系最低成本的方式。`,
      },
      ru: {
        title: "Как работает 30-дневная гарантия возврата денег?",
        excerpt:
          "Если за 30 дней вы не увидите измеримых улучшений по schema или упоминаниям, мы возвращаем деньги за месяц. Вот мелкий шрифт.",
        body: `## Что покрывается

Если по итогам первых 30 дней вы не увидите хотя бы одно из:

- Schema провалидирован и работает на вашем сайте
- Измеримый рост базовой линии ежемесячного отслеживания упоминаний
- Новое улучшение позиции в выдаче GBP

...вы можете запросить полный возврат оплаты за первый месяц. Без обратного отбора. Вы оставляете у себя весь развёрнутый schema и все полученные упоминания.

## Как запросить

Напишите на hello@ailysagency.ca в течение 35 дней с даты старта с темой «Refund request». Обрабатываем за 5 рабочих дней, без расспросов и попыток отговорить.

## Что не покрывается

- Месяц 2 и далее (это помесячная оплата, отменить можно в любой момент за 2 недели до даты)
- Платежи Reviuzy SaaS внутри тарифа Autopilot (они отдельные и подчиняются собственной политике возврата Reviuzy)

## Почему мы это предлагаем

Покупка агентских услуг через интернет, это проверка доверия. Мы на ранней стадии и понимаем это. Снять финансовый риск с первого месяца, самый дешёвый способ заслужить ваше доверие.`,
      },
      ar: {
        title: "كيف يعمل ضمان استرداد الأموال خلال 30 يوماً؟",
        excerpt:
          "إن لم ترَ تحسينات قابلة للقياس في Schema أو الاستشهادات خلال 30 يوماً، نُعيد رسوم الشهر. إليك التفاصيل الدقيقة.",
        body: `## ما الذي يشمله الضمان

إذا، في نهاية أول 30 يوماً، لم تلاحظ أياً من التالي:

- Schema تم التحقق منه ومنشور على موقعك
- ارتفاع قابل للقياس في خط أساس تتبّع الاستشهادات الشهري
- تحسّن جديد في موضع الترتيب على GBP

...يمكنك طلب استرداد كامل لرسوم الشهر الأول. دون أي استرجاع لاحق. تحتفظ بكل ما نشرناه من Schema وكل استشهاد حصلنا عليه.

## كيفية تقديم الطلب

أرسل بريداً إلكترونياً إلى hello@ailysagency.ca خلال 35 يوماً من تاريخ بدء الخدمة بعنوان «Refund request». نعالج الطلب خلال 5 أيام عمل، دون أسئلة ودون محاولات إقناع.

## ما لا يشمله الضمان

- الشهر الثاني وما بعده (الفوترة شهرية، ويمكنك الإلغاء في أي وقت بإشعار قبل أسبوعين)
- رسوم Reviuzy SaaS داخل خطة Autopilot (مستقلة وتخضع لسياسة استرداد Reviuzy الخاصة)

## لماذا نقدّم هذا الضمان

شراء خدمات وكالة عبر الإنترنت اختبار للمصداقية. نحن في مرحلة مبكرة وندرك ذلك. إزالة المخاطر المالية في الشهر الأول هي أرخص وسيلة لكسب هذه العلاقة.`,
      },
    },
  },

  // ─── Audit ────────────────────────────────────────────────
  {
    slug: "what-is-the-ai-visibility-audit",
    title: "What's in the free AI Visibility Audit?",
    excerpt:
      "We run your business through 6 AI search engines and score AEO, GEO, E-E-A-T. Here is exactly what you get and how long it takes.",
    category: "audit",
    updatedAt: "2026-04-18",
    readingTimeMin: 3,
    body: `## What you get

A 12-page PDF report covering:

- **LLM citation map**: side-by-side test of ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot for 5 high-intent prompts in your service + city
- **AEO score** (0 to 100): schema completeness, structured Q&A, scannability, entity disambiguation
- **GEO score** (0 to 100): authoritative publications presence, Wikipedia/Wikidata, forum signals, digital PR
- **E-E-A-T audit**: experience, expertise, authoritativeness, trust signals checked
- **90-day action plan**: prioritized list of fixes with effort estimates and expected lift

## How long it takes

24 hours from form submission. We run it during business hours Quebec time, so submit before 6pm if you want it next morning.

## What it costs

Nothing. No credit card. No discovery call required.

## What to do with it

Three options:

1. DIY using the action plan (we keep the plan substantive enough to action without us)
2. Hire AiLys to execute (most clients pick this)
3. Hand it to your existing agency (we are fine with that, the audit alone is valuable)`,
    i18n: {
      fr: {
        title: "Que contient l'AI Visibility Audit gratuit?",
        excerpt:
          "Nous testons votre entreprise dans 6 moteurs de recherche IA et notons AEO, GEO et E-E-A-T. Voici exactement ce que vous obtenez et combien de temps cela prend.",
        body: `## Ce que vous obtenez

Un rapport PDF de 12 pages couvrant :

- **Carte de citations LLM** : test côte à côte de ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot sur 5 prompts à forte intention dans votre service et votre ville
- **Score AEO** (0 à 100) : complétude schema, Q et R structurées, lisibilité, désambiguïsation d'entité
- **Score GEO** (0 à 100) : présence dans les publications faisant autorité, Wikipedia et Wikidata, signaux forums, RP numérique
- **Audit E-E-A-T** : signaux d'expérience, d'expertise, d'autorité et de confiance vérifiés
- **Plan d'action de 90 jours** : liste priorisée de correctifs avec estimations d'effort et hausse attendue

## Combien de temps cela prend

24 heures à partir de la soumission du formulaire. Nous le menons pendant les heures de bureau, heure du Québec, donc soumettez avant 18 h pour l'avoir le lendemain matin.

## Ce que cela coûte

Rien. Aucune carte de crédit. Aucun appel de découverte requis.

## Quoi en faire

Trois options :

1. Le faire vous-même avec le plan d'action (nous le gardons assez substantiel pour être actionnable sans nous)
2. Engager AiLys pour exécuter (la plupart des clients choisissent cela)
3. Le remettre à votre agence actuelle (cela ne nous dérange pas, l'audit seul a de la valeur)`,
      },
      es: {
        title: "¿Qué contiene el AI Visibility Audit gratuito?",
        excerpt:
          "Pasamos su negocio por 6 motores de búsqueda IA y puntuamos AEO, GEO y E-E-A-T. Esto es exactamente lo que recibe y cuánto demora.",
        body: `## Qué recibe

Un reporte PDF de 12 páginas que cubre:

- **Mapa de citas LLM**: prueba lado a lado en ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot con 5 prompts de alta intención sobre su servicio y ciudad
- **Puntaje AEO** (0 a 100): completitud de schema, P y R estructuradas, escaneabilidad, desambiguación de entidad
- **Puntaje GEO** (0 a 100): presencia en publicaciones con autoridad, Wikipedia y Wikidata, señales de foros, PR digital
- **Auditoría E-E-A-T**: señales de experiencia, experticia, autoridad y confianza revisadas
- **Plan de acción a 90 días**: lista priorizada de arreglos con estimación de esfuerzo y alza esperada

## Cuánto demora

24 horas desde el envío del formulario. Lo ejecutamos en horario laboral hora de Quebec, así que envíelo antes de las 6 pm si lo quiere a la mañana siguiente.

## Cuánto cuesta

Nada. Sin tarjeta. Sin llamada de descubrimiento requerida.

## Qué hacer con él

Tres opciones:

1. Hacerlo por su cuenta con el plan de acción (lo dejamos lo bastante sustantivo para accionarlo sin nosotros)
2. Contratar a AiLys para ejecutar (la mayoría de los clientes elige esto)
3. Pasarlo a su agencia actual (no hay problema, la auditoría por sí sola tiene valor)`,
      },
      zh: {
        title: "免费的 AI Visibility Audit 包含什么?",
        excerpt:
          "我们将您的企业放到 6 个 AI 搜索引擎中跑一遍,为 AEO、GEO 与 E-E-A-T 打分。以下是您具体能拿到什么以及耗时多长。",
        body: `## 您能拿到什么

一份 12 页的 PDF 报告,涵盖:

- **LLM 引用地图**: 在 ChatGPT、Perplexity、Claude、Gemini、Google AIO、Bing Copilot 上,针对您所在服务与城市的 5 条高意图 prompt 做并排测试
- **AEO 评分**(0 到 100): schema 完整度、结构化 Q 与 A、可扫读性、实体消歧
- **GEO 评分**(0 到 100): 权威刊物存在感、Wikipedia 与 Wikidata、论坛信号、数字 PR
- **E-E-A-T 审计**: 经验、专业、权威与信任信号逐项核查
- **90 天行动计划**: 排序后的修复清单,附工作量估计与预期提升

## 耗时多长

从表单提交起 24 小时。我们在魁北克时间的工作时间内运行,如果您希望次日早上拿到,请在 18:00 前提交。

## 费用如何

零费用。不需要信用卡,不需要必须的探索通话。

## 拿到后怎么用

三个选项:

1. 自行执行行动计划(我们让计划足够实在,不依赖我们也能落地)
2. 委托 AiLys 执行(多数客户选择这一项)
3. 交给您现有的代理(我们不介意,审计本身就具有价值)`,
      },
      ru: {
        title: "Что входит в бесплатный AI Visibility Audit?",
        excerpt:
          "Мы прогоняем ваш бизнес через 6 ИИ-поисковиков и оцениваем AEO, GEO и E-E-A-T. Вот что вы получите и сколько это займёт.",
        body: `## Что вы получаете

12-страничный PDF-отчёт, в котором есть:

- **Карта упоминаний LLM**: параллельный тест в ChatGPT, Perplexity, Claude, Gemini, Google AIO и Bing Copilot по 5 высокоинтентным промптам по вашей услуге и вашему городу
- **Оценка AEO** (от 0 до 100): полнота schema, структурированные вопросы и ответы, удобство сканирования, дезамбигуация сущности
- **Оценка GEO** (от 0 до 100): присутствие в авторитетных публикациях, Wikipedia и Wikidata, форумные сигналы, цифровой PR
- **Аудит E-E-A-T**: проверены сигналы опыта, экспертизы, авторитетности и доверия
- **План действий на 90 дней**: упорядоченный по приоритету список правок с оценкой трудозатрат и ожидаемым эффектом

## Сколько это занимает

24 часа с момента отправки формы. Мы запускаем аудит в рабочее время по Квебеку, поэтому отправляйте до 18:00, если хотите получить результат к утру следующего дня.

## Сколько это стоит

Ничего. Без банковской карты. Без обязательного звонка-знакомства.

## Что с этим делать

Три варианта:

1. Сделать своими силами по плану действий (мы оставляем план достаточно содержательным, чтобы запустить его без нас)
2. Нанять AiLys для исполнения (этот вариант выбирают большинство клиентов)
3. Передать его вашему текущему агентству (нам это нормально, аудит сам по себе ценен)`,
      },
      ar: {
        title: "ما الذي يتضمّنه AI Visibility Audit المجاني؟",
        excerpt:
          "نمرّر نشاطك عبر 6 محركات بحث ذكاء اصطناعي ونقيّم AEO وGEO وE-E-A-T. إليك بالضبط ما ستحصل عليه والمدة التي يستغرقها.",
        body: `## ما الذي ستحصل عليه

تقرير PDF من 12 صفحة يغطي:

- **خريطة استشهادات LLM**: اختبار جنباً إلى جنب على ChatGPT وPerplexity وClaude وGemini وGoogle AIO وBing Copilot على 5 طلبات عالية النية تتعلق بخدمتك ومدينتك
- **درجة AEO** (من 0 إلى 100): اكتمال Schema، الأسئلة والأجوبة المنظّمة، قابلية المسح، توضيح الكيان
- **درجة GEO** (من 0 إلى 100): الحضور في المنشورات ذات السلطة، Wikipedia وWikidata، إشارات المنتديات، العلاقات العامة الرقمية
- **تدقيق E-E-A-T**: فحص إشارات التجربة والخبرة والسلطة والثقة
- **خطة عمل لمدة 90 يوماً**: قائمة مرتّبة بالأولوية للإصلاحات مع تقديرات الجهد والارتفاع المتوقع

## كم تستغرق

24 ساعة من لحظة إرسال النموذج. نشغّلها خلال ساعات العمل بتوقيت كيبيك، لذا أرسل قبل الساعة 6 مساءً إذا رغبت في استلامها صباح اليوم التالي.

## كم تكلّف

لا شيء. دون بطاقة ائتمان. دون اشتراط مكالمة استكشافية.

## ماذا تفعل بها

ثلاثة خيارات:

1. التنفيذ بنفسك عبر خطة العمل (نحرص على أن تبقى الخطة عملية بما يكفي لتنفيذها بمعزل عنّا)
2. توظيف AiLys للتنفيذ (يختار معظم العملاء هذا الخيار)
3. تسليمها إلى وكالتك الحالية (لا مانع لدينا، فالتدقيق وحده ذو قيمة)`,
      },
    },
  },

  // ─── Glossary ─────────────────────────────────────────────
  {
    slug: "ai-search-glossary",
    title: "AI search glossary: terms we use",
    excerpt:
      "Quick definitions for AEO, GEO, E-E-A-T, schema, entity authority, citation density, share of model, and more.",
    category: "glossary",
    updatedAt: "2026-04-20",
    readingTimeMin: 4,
    body: `## A to Z

**AEO**: Answer Engine Optimization. Structuring content so AI engines pull direct answers from your site.

**AI Overviews / AIO**: Google's AI-summarized search results that appear above the traditional 10 blue links.

**Authority**: how much weight an AI engine gives a source. Higher authority sources get cited more often.

**Citation density**: how often your business name appears across the web. More citations across more domains equals stronger LLM signal.

**E-E-A-T**: Experience, Expertise, Authoritativeness, Trust. Google's content quality rubric, inherited by most LLMs.

**Entity authority**: your business as a "thing" Google's Knowledge Graph and Wikidata recognize, separate from any single page.

**GBP**: Google Business Profile, formerly Google My Business. Your local listing.

**GEO**: Generative Engine Optimization. Getting your brand named inside generative AI responses.

**LLM**: Large Language Model. The category of AI that powers ChatGPT, Claude, Gemini, etc.

**NAP**: Name, Address, Phone. The triple that needs to be consistent across the web for local SEO.

**Schema**: Schema.org markup. Structured data that helps engines understand your content.

**Share of model**: a measurement of how often your brand is mentioned in LLM answers vs competitors. Sometimes called Share of Voice in AI Search.

**TTFB**: Time To First Byte. How fast your server responds. Faster = better LLM ranking.

**Voice search**: queries spoken to assistants (Siri, Alexa, Google Assistant). Different ranking signals than typed search.`,
    i18n: {
      fr: {
        title: "Glossaire de la recherche IA : les termes que nous utilisons",
        excerpt:
          "Définitions rapides pour AEO, GEO, E-E-A-T, schema, autorité d'entité, densité de citations, share of model et plus encore.",
        body: `## De A à Z

**AEO** : Answer Engine Optimization. Structurer le contenu pour que les moteurs IA tirent des réponses directes de votre site.

**AI Overviews / AIO** : résultats de recherche résumés par l'IA de Google qui apparaissent au-dessus des 10 liens bleus traditionnels.

**Authority** : poids qu'un moteur IA accorde à une source. Les sources de plus haute autorité sont citées plus souvent.

**Citation density** : fréquence à laquelle le nom de votre entreprise apparaît sur le web. Plus de citations sur plus de domaines équivaut à un signal LLM plus fort.

**E-E-A-T** : Experience, Expertise, Authoritativeness, Trust. La grille de qualité de contenu de Google, héritée par la plupart des LLM.

**Entity authority** : votre entreprise comme « chose » que reconnaissent le Knowledge Graph de Google et Wikidata, distincte de toute page individuelle.

**GBP** : Google Business Profile, anciennement Google My Business. Votre fiche locale.

**GEO** : Generative Engine Optimization. Faire nommer votre marque dans les réponses des IA génératives.

**LLM** : Large Language Model. La catégorie d'IA qui alimente ChatGPT, Claude, Gemini, etc.

**NAP** : Name, Address, Phone. Le triplet qui doit rester cohérent sur le web pour le SEO local.

**Schema** : balisage Schema.org. Données structurées qui aident les moteurs à comprendre votre contenu.

**Share of model** : mesure de la fréquence à laquelle votre marque est mentionnée dans les réponses LLM par rapport aux concurrents. Parfois appelée Share of Voice in AI Search.

**TTFB** : Time To First Byte. Vitesse de réponse de votre serveur. Plus rapide égale meilleur classement LLM.

**Voice search** : requêtes parlées aux assistants (Siri, Alexa, Google Assistant). Signaux de classement différents de la recherche tapée.`,
      },
      es: {
        title: "Glosario de búsqueda con IA: términos que usamos",
        excerpt:
          "Definiciones rápidas de AEO, GEO, E-E-A-T, schema, autoridad de entidad, densidad de citas, share of model y más.",
        body: `## De la A a la Z

**AEO**: Answer Engine Optimization. Estructurar contenido para que los motores IA extraigan respuestas directas desde su sitio.

**AI Overviews / AIO**: resultados de búsqueda resumidos por la IA de Google que aparecen sobre los 10 enlaces azules tradicionales.

**Authority**: cuánto peso da un motor IA a una fuente. Las fuentes con más autoridad se citan con más frecuencia.

**Citation density**: con qué frecuencia aparece el nombre de su negocio por la web. Más citas en más dominios igual a señal LLM más fuerte.

**E-E-A-T**: Experience, Expertise, Authoritativeness, Trust. La rúbrica de calidad de contenido de Google, heredada por la mayoría de los LLM.

**Entity authority**: su negocio como una "cosa" que reconocen el Knowledge Graph de Google y Wikidata, separada de cualquier página individual.

**GBP**: Google Business Profile, antes Google My Business. Su ficha local.

**GEO**: Generative Engine Optimization. Lograr que su marca sea nombrada dentro de respuestas de IA generativa.

**LLM**: Large Language Model. La categoría de IA que impulsa ChatGPT, Claude, Gemini, etc.

**NAP**: Name, Address, Phone. El triplete que debe ser consistente en la web para SEO local.

**Schema**: marcado Schema.org. Datos estructurados que ayudan a los motores a entender su contenido.

**Share of model**: medición de cuán seguido se menciona su marca en respuestas LLM frente a competidores. A veces llamado Share of Voice in AI Search.

**TTFB**: Time To First Byte. Velocidad de respuesta de su servidor. Más rápido igual a mejor ranking LLM.

**Voice search**: consultas habladas a asistentes (Siri, Alexa, Google Assistant). Señales de ranking distintas a las de búsqueda escrita.`,
      },
      zh: {
        title: "AI 搜索术语表: 我们常用的词",
        excerpt:
          "AEO、GEO、E-E-A-T、schema、实体权威、引用密度、share of model 等术语的快速定义。",
        body: `## 从 A 到 Z

**AEO**: Answer Engine Optimization。把内容结构化,让 AI 引擎从您的站点提取直接答案。

**AI Overviews / AIO**: Google 的 AI 摘要式搜索结果,出现在传统的 10 条蓝色链接上方。

**Authority**(权威): AI 引擎赋予某个来源的权重。权威越高的来源被引用越频繁。

**Citation density**(引用密度): 您的企业名称在网络上出现的频率。在更多域名上获得更多引用即更强的 LLM 信号。

**E-E-A-T**: Experience、Expertise、Authoritativeness、Trust。Google 的内容质量标尺,被多数 LLM 继承。

**Entity authority**(实体权威): 您的企业作为 Google Knowledge Graph 和 Wikidata 所承认的"实体",独立于任何单个页面。

**GBP**: Google Business Profile,前称 Google My Business。您的本地商家信息。

**GEO**: Generative Engine Optimization。让您的品牌出现在生成式 AI 回答中被点名。

**LLM**: Large Language Model(大语言模型)。驱动 ChatGPT、Claude、Gemini 等的 AI 类别。

**NAP**: Name、Address、Phone。本地 SEO 中需在网络上保持一致的三元组。

**Schema**: Schema.org 标记。帮助引擎理解您内容的结构化数据。

**Share of model**: 衡量您的品牌在 LLM 回答中相对于竞争对手被提及的频率。有时也称作 Share of Voice in AI Search。

**TTFB**: Time To First Byte。您的服务器响应有多快。越快即 LLM 排名越好。

**Voice search**(语音搜索): 对助手(Siri、Alexa、Google Assistant)说出的查询。其排名信号与文字搜索不同。`,
      },
      ru: {
        title: "Глоссарий поиска ИИ: термины, которые мы используем",
        excerpt:
          "Краткие определения для AEO, GEO, E-E-A-T, schema, авторитета сущности, плотности упоминаний, share of model и не только.",
        body: `## От А до Я

**AEO**: Answer Engine Optimization. Структурирование контента так, чтобы движки ИИ извлекали прямые ответы с вашего сайта.

**AI Overviews / AIO**: суммированные ИИ результаты поиска Google, которые появляются над привычными 10 синими ссылками.

**Authority**: вес, который движок ИИ присваивает источнику. Источники с более высоким авторитетом цитируются чаще.

**Citation density**: насколько часто название вашего бизнеса появляется по всему вебу. Больше упоминаний на большем количестве доменов означает более сильный сигнал для LLM.

**E-E-A-T**: Experience, Expertise, Authoritativeness, Trust. Шкала качества контента от Google, унаследованная большинством LLM.

**Entity authority**: ваш бизнес как «вещь», которую распознают Knowledge Graph Google и Wikidata, отдельно от любой одной страницы.

**GBP**: Google Business Profile, ранее Google My Business. Ваша локальная карточка.

**GEO**: Generative Engine Optimization. Сделать так, чтобы ваш бренд называли внутри ответов генеративного ИИ.

**LLM**: Large Language Model. Категория ИИ, на которой работают ChatGPT, Claude, Gemini и другие.

**NAP**: Name, Address, Phone. Тройка, которая должна быть согласованной по всему вебу для локального SEO.

**Schema**: разметка Schema.org. Структурированные данные, помогающие движкам понимать ваш контент.

**Share of model**: показатель того, как часто ваш бренд упоминается в ответах LLM по сравнению с конкурентами. Иногда называется Share of Voice in AI Search.

**TTFB**: Time To First Byte. Скорость ответа вашего сервера. Чем быстрее, тем лучше ранжирование в LLM.

**Voice search**: запросы, произнесённые голосовым ассистентам (Siri, Alexa, Google Assistant). Сигналы ранжирования отличаются от тех, что для текстового поиска.`,
      },
      ar: {
        title: "مسرد بحث الذكاء الاصطناعي: المصطلحات التي نستخدمها",
        excerpt:
          "تعريفات سريعة لـ AEO وGEO وE-E-A-T وSchema وسلطة الكيان وكثافة الاستشهاد وShare of Model وغيرها.",
        body: `## من الألف إلى الياء

**AEO**: Answer Engine Optimization. هيكلة المحتوى بحيث تستخرج محركات الذكاء الاصطناعي إجابات مباشرة من موقعك.

**AI Overviews / AIO**: نتائج البحث الملخّصة بالذكاء الاصطناعي من Google والتي تظهر فوق روابط البحث الزرقاء العشرة التقليدية.

**Authority**: مقدار الوزن الذي يمنحه محرك ذكاء اصطناعي لمصدر ما. المصادر ذات السلطة الأعلى يُستشهد بها أكثر.

**Citation density**: عدد المرات التي يظهر فيها اسم نشاطك التجاري عبر الويب. كلما زادت الاستشهادات وزاد عدد النطاقات، قويت إشارة LLM.

**E-E-A-T**: Experience وExpertise وAuthoritativeness وTrust. معيار جودة المحتوى من Google، وقد ورثته معظم نماذج LLM.

**Entity authority**: نشاطك التجاري بوصفه «كياناً» يتعرّف عليه Knowledge Graph من Google وWikidata، بشكل مستقل عن أي صفحة بعينها.

**GBP**: Google Business Profile، كان يُعرف سابقاً بـ Google My Business. بطاقتك المحلية.

**GEO**: Generative Engine Optimization. جعل علامتك التجارية مذكورة داخل ردود الذكاء الاصطناعي التوليدي.

**LLM**: Large Language Model. فئة الذكاء الاصطناعي التي تشغّل ChatGPT وClaude وGemini وغيرها.

**NAP**: Name وAddress وPhone. الثلاثية التي يجب أن تبقى متطابقة عبر الويب من أجل السيو المحلي.

**Schema**: ترميز Schema.org. بيانات منظّمة تساعد المحركات على فهم محتواك.

**Share of model**: قياس عدد المرات التي تُذكر فيها علامتك داخل ردود LLM مقارنة بالمنافسين. يسمّى أحياناً Share of Voice in AI Search.

**TTFB**: Time To First Byte. سرعة استجابة خادمك. كلما كان أسرع، كان ترتيب LLM أفضل.

**Voice search**: استفسارات منطوقة للمساعدات الصوتية (Siri وAlexa وGoogle Assistant). إشاراتها للترتيب مختلفة عن البحث الكتابي.`,
      },
    },
  },
];
