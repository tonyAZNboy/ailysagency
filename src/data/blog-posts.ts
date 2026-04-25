// AiLys Agency · Blog post data
//
// Each post lives here as a typed object. The blog index filters by
// `publishedAt <= now`, so posts with future dates stay hidden until their
// time arrives. That gives us "scheduled publishing" with zero infra.
//
// Cadence target: one new post every 3 days starting Feb 1, 2026.
//
// To add a future post, set publishedAt to its release date. It will appear
// automatically when that timestamp passes. No deploy required if we wire
// Cloudflare cache TTL appropriately (or run a daily cache purge).
//
// LATER (when revenue justifies the infra):
// - Migrate to Supabase blog_posts table
// - pg_cron job that flips draft -> published when scheduled_for arrives
// - Edge function /publish-scheduled triggered hourly
// - Documented in supabase/functions/README.md

export type BlogCategory =
  | "voice-search"
  | "google-search"
  | "google-maps"
  | "bing-copilot"
  | "chatgpt"
  | "perplexity"
  | "claude"
  | "gemini"
  | "aeo-geo-eeat"
  | "case-studies";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // markdown
  category: BlogCategory;
  language: "en" | "fr" | "es";
  publishedAt: string; // ISO date
  readingTimeMin: number;
  author: string;
  tags: string[];
  hero?: string; // optional hero image path
  i18n?: {
    [lang: string]: {
      title?: string;
      excerpt?: string;
      content?: string;
      body?: string;
    };
  };
}

export const CATEGORY_META: Record<BlogCategory, { label: string; tone: string }> = {
  "voice-search": { label: "Voice Search", tone: "from-cyan-400 to-teal-400" },
  "google-search": { label: "Google Search", tone: "from-amber-400 to-orange-400" },
  "google-maps": { label: "Google Maps", tone: "from-emerald-400 to-cyan-400" },
  "bing-copilot": { label: "Bing Copilot", tone: "from-sky-400 to-blue-500" },
  chatgpt: { label: "ChatGPT", tone: "from-violet-400 to-fuchsia-400" },
  perplexity: { label: "Perplexity", tone: "from-rose-400 to-pink-400" },
  claude: { label: "Claude", tone: "from-orange-400 to-amber-400" },
  gemini: { label: "Gemini", tone: "from-blue-400 to-indigo-400" },
  "aeo-geo-eeat": { label: "AEO · GEO · E-E-A-T", tone: "from-primary via-secondary to-accent" },
  "case-studies": { label: "Case Studies", tone: "from-emerald-400 to-teal-400" },
};

export const blogPosts: BlogPost[] = [
  {
    slug: "what-quebec-restaurants-ask-google-maps-2026",
    title: "What Quebec restaurants ask Google Maps in 2026",
    excerpt:
      "We pulled 1,200 search queries from Quebec restaurants over six weeks. Here are the four patterns that decide whether your restaurant shows up first or never.",
    category: "google-maps",
    language: "en",
    publishedAt: "2026-02-04T09:00:00-05:00",
    readingTimeMin: 6,
    author: "AiLys Agency",
    tags: ["restaurants", "google maps", "local seo", "quebec"],
    content: `## The four search patterns that own Quebec resto traffic

Restaurant owners ask us the same question every week. "Why does my competitor show up before me on Maps?" After auditing 1,200 queries from Quebec resto Google Business Profiles between mid-December and mid-January, four patterns explain almost all of it.

### Pattern 1: "near me" with a constraint

Queries like "best ramen near me open now" or "vegan dinner near me Plateau" trip a different algorithm than plain "ramen near me". Google's local pack weights GBP attributes (open hours, dietary tags, payment methods) heavily for constrained queries. Most restaurants miss the attributes. Filling them in is a 20-minute job that moves you up two positions on average.

### Pattern 2: "best [food] in [neighborhood]"

This is where reviews matter most. Google Maps does not pick the highest-rated restaurant. It picks the highest-rated restaurant that has a citation density inside the right neighborhood entity. A 4.9 rating in "Montreal" loses to a 4.7 rating with five neighborhood-specific mentions in the review text.

What to do: every monthly contest review prompt should include "tell us your favorite spot in [neighborhood]." Not subtle. Works.

### Pattern 3: "open now"

The fastest-loading GBP wins. Domain Speed Boost (TTFB under 200ms) is not just an SEO move. Maps ranks "open now" results partly by signal freshness, and a slow site delays GBP refresh.

### Pattern 4: voice queries piped through Maps

"Hey Siri, find a sushi place near me" goes through Apple Maps, not Google. But "hey Google" voice queries route through Google Maps with a stripped-down ranking signal set. The GBP categories field becomes 2x more important for voice. If you are a sushi place categorized as "Japanese restaurant" not "sushi restaurant", you are losing 40% of voice volume.

## What this means for AiLys clients

Our Core tier already handles GBP attribute completeness and category optimization. For restos specifically, we add neighborhood entity work to the Citation Building budget, which is what closes the gap with the 4.9-rated competitor next door.

If you want to see exactly which of the four patterns you are losing, run the free AI Visibility Audit. We pull your GBP data and tell you which patterns are leaking.`,
    i18n: {
      fr: {
        title: "Ce que les restaurants québécois demandent à Google Maps en 2026",
        excerpt:
          "Nous avons analysé 1 200 requêtes de recherche provenant de restaurants québécois sur six semaines. Voici les quatre tendances qui décident si votre restaurant apparaît en premier ou jamais.",
        content: `## Les quatre tendances de recherche qui dominent le trafic des restos québécois

Les propriétaires de restaurants nous posent la même question chaque semaine. « Pourquoi mon concurrent apparaît avant moi sur Maps? » Après avoir audité 1 200 requêtes provenant des fiches Google Business Profile de restos québécois entre la mi-décembre et la mi-janvier, quatre tendances expliquent presque tout.

### Tendance 1 : « près de moi » avec une contrainte

Des requêtes comme « meilleur ramen près de moi ouvert maintenant » ou « souper végane près de moi Plateau » déclenchent un algorithme différent du simple « ramen près de moi ». Le local pack de Google accorde un poids important aux attributs GBP (heures d'ouverture, mentions alimentaires, modes de paiement) pour les requêtes contraintes. La plupart des restaurants négligent les attributs. Les remplir est un travail de 20 minutes qui vous fait gagner deux positions en moyenne.

### Tendance 2 : « meilleur [plat] dans [quartier] »

C'est là que les avis comptent le plus. Google Maps ne choisit pas le restaurant le mieux noté. Il choisit le restaurant le mieux noté qui possède une densité de citations à l'intérieur de la bonne entité de quartier. Une note de 4,9 dans « Montréal » perd contre une note de 4,7 avec cinq mentions spécifiques au quartier dans le texte des avis.

Ce qu'il faut faire : chaque invitation mensuelle à laisser un avis devrait inclure « dites-nous votre endroit préféré dans [quartier] ». Pas subtil. Ça fonctionne.

### Tendance 3 : « ouvert maintenant »

Le GBP qui se charge le plus rapidement gagne. Le Domain Speed Boost (TTFB sous 200 ms) n'est pas qu'une tactique SEO. Maps classe les résultats « ouvert maintenant » en partie selon la fraîcheur du signal, et un site lent retarde la mise à jour du GBP.

### Tendance 4 : requêtes vocales acheminées par Maps

« Dis Siri, trouve un resto de sushis près de moi » passe par Apple Maps, pas Google. Mais les requêtes vocales « OK Google » sont acheminées par Google Maps avec un ensemble de signaux de classement épuré. Le champ catégories du GBP devient deux fois plus important pour la voix. Si vous êtes un resto de sushis catégorisé comme « restaurant japonais » plutôt que « restaurant de sushis », vous perdez 40 % du volume vocal.

## Ce que cela signifie pour les clients AiLys

Notre forfait Core couvre déjà la complétude des attributs GBP et l'optimisation des catégories. Pour les restos précisément, nous ajoutons le travail sur l'entité de quartier au budget Citation Building, ce qui comble l'écart avec le concurrent voisin noté 4,9.

Si vous voulez voir laquelle des quatre tendances vous fait perdre du terrain, lancez l'AI Visibility Audit gratuit. Nous tirons vos données GBP et vous indiquons les tendances qui fuient.`,
      },
      es: {
        title: "Lo que los restaurantes de Quebec le piden a Google Maps en 2026",
        excerpt:
          "Analizamos 1.200 consultas de búsqueda de restaurantes de Quebec durante seis semanas. Estos son los cuatro patrones que deciden si su restaurante aparece primero o nunca.",
        content: `## Los cuatro patrones de búsqueda que dominan el tráfico de los restaurantes en Quebec

Los dueños de restaurantes nos hacen la misma pregunta cada semana. "¿Por qué mi competidor aparece antes que yo en Maps?" Tras auditar 1.200 consultas de fichas Google Business Profile de restaurantes en Quebec entre mediados de diciembre y mediados de enero, cuatro patrones lo explican casi todo.

### Patrón 1: "near me" con una restricción

Consultas como "mejor ramen cerca de mí abierto ahora" o "cena vegana cerca de mí Plateau" activan un algoritmo distinto al simple "ramen cerca de mí". El local pack de Google da un peso fuerte a los atributos del GBP (horarios, etiquetas dietéticas, métodos de pago) en las consultas con restricciones. La mayoría de los restaurantes no completan los atributos. Llenarlos toma 20 minutos y los sube dos posiciones en promedio.

### Patrón 2: "mejor [comida] en [barrio]"

Aquí es donde las reseñas pesan más. Google Maps no elige al restaurante mejor calificado. Elige al restaurante mejor calificado que tiene densidad de citas dentro de la entidad de barrio correcta. Una calificación de 4,9 en "Montreal" pierde frente a una de 4,7 con cinco menciones específicas del barrio en el texto de las reseñas.

Qué hacer: cada invitación mensual a dejar reseña debería incluir "díganos su lugar favorito en [barrio]". Nada sutil. Funciona.

### Patrón 3: "abierto ahora"

Gana el GBP que carga más rápido. El Domain Speed Boost (TTFB por debajo de 200 ms) no es solo una jugada SEO. Maps clasifica los resultados "abierto ahora" en parte por la frescura de la señal, y un sitio lento retrasa la actualización del GBP.

### Patrón 4: consultas por voz canalizadas vía Maps

"Hey Siri, encuentra un lugar de sushi cerca de mí" pasa por Apple Maps, no por Google. Pero las consultas de voz "hey Google" se enrutan por Google Maps con un conjunto reducido de señales de clasificación. El campo de categorías del GBP pasa a ser dos veces más importante para voz. Si usted es un local de sushi categorizado como "restaurante japonés" en lugar de "restaurante de sushi", está perdiendo 40 % del volumen por voz.

## Qué significa esto para los clientes de AiLys

Nuestro plan Core ya cubre la completitud de atributos del GBP y la optimización de categorías. Para restaurantes específicamente, añadimos trabajo de entidad de barrio al presupuesto de Citation Building, que es lo que cierra la brecha con el competidor de al lado con 4,9.

Si quiere ver cuál de los cuatro patrones lo está perdiendo, ejecute el AI Visibility Audit gratuito. Extraemos sus datos del GBP y le indicamos qué patrones tienen fugas.`,
      },
      zh: {
        title: "2026 年魁北克餐厅向 Google Maps 提出的问题",
        excerpt:
          "我们用六周时间提取了魁北克餐厅的 1,200 条搜索查询。以下四种模式决定您的餐厅是排在首位还是被淹没。",
        content: `## 主导魁北克餐厅流量的四种搜索模式

每周都有餐厅老板向我们提出同一个问题。"为什么我的竞争对手在 Maps 上排在我前面?"在审查了 12 月中旬到 1 月中旬期间魁北克餐厅 Google Business Profile 的 1,200 条查询后,四种模式几乎能解释一切。

### 模式 1: "near me" 带限定条件

类似 "best ramen near me open now"(附近现在营业的最佳拉面)或 "vegan dinner near me Plateau"(Plateau 区附近素食晚餐)这样的查询会触发与简单 "ramen near me" 不同的算法。对于带限定条件的查询,Google 本地包会重点参考 GBP 属性(营业时间、饮食标签、支付方式)。大多数餐厅都漏填了属性。填好它们只需 20 分钟,平均能让排名上升两位。

### 模式 2: "best [食物] in [街区]"

这里评论最为关键。Google Maps 不会选择评分最高的餐厅,而是选择在正确街区实体内具有引用密度的最高评分餐厅。在"蒙特利尔"获得 4.9 评分,会输给在评论文本中有五次特定街区提及的 4.7 评分。

应对办法: 每月评论邀请提示都应包含"告诉我们您在[街区]最喜欢的地方"。不必委婉。这一招确实有效。

### 模式 3: "open now"

加载最快的 GBP 胜出。Domain Speed Boost(TTFB 低于 200 毫秒)不只是 SEO 手段。Maps 在排序"open now"结果时会部分参考信号新鲜度,而站点慢会延迟 GBP 刷新。

### 模式 4: 经由 Maps 的语音查询

"Hey Siri,find a sushi place near me" 走的是 Apple Maps,不是 Google。但 "hey Google" 的语音查询会通过 Google Maps 路由,采用精简过的排序信号集。GBP 类别字段在语音搜索中重要性翻倍。如果您是寿司店却被归类为 "Japanese restaurant" 而不是 "sushi restaurant",您将损失 40% 的语音流量。

## 这对 AiLys 客户意味着什么

我们的 Core 套餐已涵盖 GBP 属性完整度和类别优化。专门针对餐厅,我们在 Citation Building 预算中加入街区实体工作,正是这一项缩小了与隔壁那家 4.9 分竞争对手的差距。

如果您想准确知道自己在哪种模式上失分,可以运行免费的 AI Visibility Audit。我们会提取您的 GBP 数据,告诉您哪些模式存在漏洞。`,
      },
    },
  },
  {
    slug: "why-chatgpt-cites-your-competitor",
    title: "Why ChatGPT cites your competitor and not you",
    excerpt:
      "Three reasons your competitor shows up in ChatGPT answers when you don't. The first one is fixable in 48 hours. The other two take a quarter.",
    category: "chatgpt",
    language: "en",
    publishedAt: "2026-02-17T09:00:00-05:00",
    readingTimeMin: 5,
    author: "AiLys Agency",
    tags: ["chatgpt", "geo", "citations", "llm"],
    content: `## You searched for your service. Your competitor came up. You didn't. Here's why.

ChatGPT does not crawl. It retrieves. When someone asks "best dentist in Montreal that takes new patients," ChatGPT pulls from a layered citation system. Three layers decide who gets named.

### Layer 1: Wikipedia and Wikidata

If your competitor has a Wikidata entry and you don't, you lost before the question was asked. Wikidata entries take a week to land if you have ten years of operating history and three news mentions. Most local businesses have neither, but you can engineer it.

We help clients build Wikidata entries by aggregating: incorporation records, BBB profile, news mentions, GBP data, industry directory listings. Once these reach the Wikidata threshold, you appear in the entity graph that ChatGPT pulls from.

### Layer 2: High-DA citation density

ChatGPT weights citations by domain authority. A mention on Yelp (DA 92) outweighs ten mentions on small directories. The list of high-DA citation targets that actually move LLM rankings is shorter than most agencies pretend: Yelp, BBB, Yellowpages, Crunchbase, Glassdoor for B2B, Healthgrades for medical, Avvo for law, OpenTable for restos.

If your name does not appear consistently across all relevant high-DA targets, you are invisible to ChatGPT's retrieval layer.

### Layer 3: First-hand experience markers

The signal that closed the gap fastest in our 2025 cohort: original photography with EXIF metadata, author bylines on your website, real customer interview quotes. ChatGPT's E-E-A-T weighting now actively penalizes content that reads "AI-generated" and rewards content that reads "human, on-site, with proof."

We add author byline schema to client sites as a default at the Core tier. Takes one hour, lifts citation rate by ~25% in our internal data over 60 days.

## What you can do today

The 48-hour fix: claim your Yelp, BBB, and one industry-specific directory listing if you have not already. Make sure your name, address, phone, and category match exactly across all three. ChatGPT scores name consistency at the entity layer. One inconsistent NAP triple cuts citation odds in half.

The quarter-long fix: Wikidata + author bylines + original photography. We do this work at the Core and Growth tiers. Or you can DIY with our 90-day playbook in the audit deliverable.`,
    i18n: {
      fr: {
        title: "Pourquoi ChatGPT cite votre concurrent et pas vous",
        excerpt:
          "Trois raisons pour lesquelles votre concurrent apparaît dans les réponses de ChatGPT alors que vous n'y êtes pas. La première se règle en 48 heures. Les deux autres prennent un trimestre.",
        content: `## Vous avez cherché votre service. Votre concurrent est apparu. Pas vous. Voici pourquoi.

ChatGPT n'effectue pas d'indexation. Il récupère. Quand quelqu'un demande « meilleur dentiste à Montréal qui accepte de nouveaux patients », ChatGPT puise dans un système de citations à plusieurs couches. Trois couches décident qui est nommé.

### Couche 1 : Wikipedia et Wikidata

Si votre concurrent possède une entrée Wikidata et pas vous, vous avez perdu avant même la question. Une entrée Wikidata prend une semaine à se mettre en place si vous comptez dix ans d'historique d'exploitation et trois mentions dans les médias. La plupart des entreprises locales n'ont ni l'un ni l'autre, mais cela peut s'organiser.

Nous aidons nos clients à bâtir leur entrée Wikidata en agrégeant : registres d'incorporation, profil BBB, mentions dans les médias, données GBP, fiches d'annuaires sectoriels. Une fois ces éléments au seuil Wikidata, vous apparaissez dans le graphe d'entités que ChatGPT consulte.

### Couche 2 : densité de citations à haute DA

ChatGPT pondère les citations selon l'autorité de domaine. Une mention sur Yelp (DA 92) pèse plus que dix mentions sur de petits annuaires. La liste des cibles de citation à haute DA qui font vraiment bouger les classements des LLM est plus courte que ce que la plupart des agences prétendent : Yelp, BBB, Yellowpages, Crunchbase, Glassdoor pour le B2B, Healthgrades pour le médical, Avvo pour le droit, OpenTable pour les restos.

Si votre nom n'apparaît pas de manière constante sur toutes les cibles à haute DA pertinentes, vous êtes invisible pour la couche de récupération de ChatGPT.

### Couche 3 : marqueurs d'expérience de première main

Le signal qui a comblé l'écart le plus vite dans notre cohorte de 2025 : photos originales avec métadonnées EXIF, signatures d'auteur sur votre site, citations réelles d'entrevues clients. La pondération E-E-A-T de ChatGPT pénalise désormais activement le contenu qui sent « généré par IA » et récompense celui qui sent « humain, sur place, avec preuves ».

Nous ajoutons par défaut le schéma de signature d'auteur sur les sites clients au forfait Core. Une heure de travail, hausse du taux de citation d'environ 25 % sur 60 jours selon nos données internes.

## Ce que vous pouvez faire aujourd'hui

La correction en 48 heures : revendiquez votre fiche Yelp, votre fiche BBB et une fiche d'annuaire sectoriel si ce n'est pas déjà fait. Assurez-vous que le nom, l'adresse, le téléphone et la catégorie correspondent exactement sur les trois. ChatGPT évalue la cohérence du nom à la couche entité. Un seul triplet NAP incohérent coupe vos chances de citation de moitié.

La correction sur un trimestre : Wikidata, signatures d'auteur et photos originales. Nous faisons ce travail aux forfaits Core et Growth. Ou bien vous pouvez le faire vous-même avec notre plan de 90 jours fourni dans le livrable d'audit.`,
      },
      es: {
        title: "Por qué ChatGPT cita a su competidor y no a usted",
        excerpt:
          "Tres razones por las que su competidor aparece en las respuestas de ChatGPT y usted no. La primera se arregla en 48 horas. Las otras dos toman un trimestre.",
        content: `## Buscó su servicio. Apareció su competidor. Usted no. Esta es la razón.

ChatGPT no rastrea. Recupera. Cuando alguien pregunta "mejor dentista en Montreal que acepte nuevos pacientes", ChatGPT extrae de un sistema de citas en capas. Tres capas deciden a quién se nombra.

### Capa 1: Wikipedia y Wikidata

Si su competidor tiene una entrada en Wikidata y usted no, perdió antes de que se hiciera la pregunta. Una entrada en Wikidata tarda una semana en consolidarse si tiene diez años de historial operativo y tres menciones en prensa. La mayoría de los negocios locales no tiene ninguna de las dos, pero se puede gestionar.

Ayudamos a los clientes a construir entradas en Wikidata agregando: registros de constitución, perfil BBB, menciones en prensa, datos de GBP, fichas en directorios del sector. Una vez que estos elementos alcanzan el umbral de Wikidata, usted aparece en el grafo de entidades del que ChatGPT extrae.

### Capa 2: densidad de citas en sitios de alta DA

ChatGPT pondera las citas por autoridad de dominio. Una mención en Yelp (DA 92) pesa más que diez menciones en directorios pequeños. La lista de objetivos de citación de alta DA que realmente mueven los rankings de LLM es más corta de lo que la mayoría de agencias finge: Yelp, BBB, Yellowpages, Crunchbase, Glassdoor para B2B, Healthgrades para medicina, Avvo para derecho, OpenTable para restaurantes.

Si su nombre no aparece de forma consistente en todos los objetivos de alta DA relevantes, usted es invisible para la capa de recuperación de ChatGPT.

### Capa 3: marcadores de experiencia de primera mano

La señal que más rápido cerró la brecha en nuestra cohorte de 2025: fotografía original con metadatos EXIF, firmas de autor en su sitio, citas reales de entrevistas con clientes. La ponderación E-E-A-T de ChatGPT ahora penaliza activamente el contenido con apariencia de "generado por IA" y premia el que se lee como "humano, in situ, con pruebas".

Añadimos por defecto el schema de firma de autor en los sitios cliente del plan Core. Toma una hora y eleva la tasa de citas alrededor de 25 % en 60 días según nuestros datos internos.

## Qué puede hacer hoy

La corrección de 48 horas: reclame su ficha de Yelp, su perfil BBB y una ficha de directorio sectorial si aún no lo ha hecho. Asegúrese de que el nombre, dirección, teléfono y categoría coincidan exactamente en los tres. ChatGPT puntúa la consistencia del nombre en la capa de entidad. Un solo triplete NAP inconsistente reduce a la mitad las probabilidades de cita.

La corrección de un trimestre: Wikidata, firmas de autor y fotografía original. Hacemos este trabajo en los planes Core y Growth. O puede hacerlo usted mismo con nuestro plan de 90 días incluido en el entregable de la auditoría.`,
      },
      zh: {
        title: "为什么 ChatGPT 引用您的竞争对手而不是您",
        excerpt:
          "您的竞争对手出现在 ChatGPT 答案中而您没有,这有三个原因。第一项可在 48 小时内修复。另外两项需要一个季度。",
        content: `## 您搜索了自己的服务,出现的是竞争对手,不是您。原因如下。

ChatGPT 不爬取网页,它进行检索。当有人问"蒙特利尔接收新患者的最佳牙医"时,ChatGPT 会从一套分层引用系统中提取信息。三个层级决定谁会被点名。

### 第 1 层: Wikipedia 与 Wikidata

如果您的竞争对手有 Wikidata 条目而您没有,问题尚未提出您就已经输了。如果您拥有十年运营历史和三次新闻提及,Wikidata 条目大约一周即可落地。大多数本地企业两者都没有,但这是可以策划构建的。

我们帮助客户建立 Wikidata 条目,通过整合: 公司注册记录、BBB 档案、新闻报道、GBP 数据、行业目录条目。一旦这些达到 Wikidata 门槛,您就会出现在 ChatGPT 检索使用的实体图谱中。

### 第 2 层: 高 DA 引用密度

ChatGPT 按域名权重对引用进行加权。在 Yelp(DA 92)上的一次提及胜过十次小型目录的提及。真正能撼动 LLM 排名的高 DA 引用目标清单,远比多数代理商所宣称的要短: Yelp、BBB、Yellowpages、Crunchbase、面向 B2B 的 Glassdoor、面向医疗的 Healthgrades、面向法律的 Avvo、面向餐厅的 OpenTable。

如果您的名字未在所有相关的高 DA 目标上保持一致出现,您就对 ChatGPT 的检索层而言是隐形的。

### 第 3 层: 第一手体验标记

我们 2025 年群组中最快缩小差距的信号: 带 EXIF 元数据的原创图片、网站上的作者署名、真实客户访谈引述。ChatGPT 的 E-E-A-T 加权现在主动惩罚那些读起来像"AI 生成"的内容,奖励那些读起来"由人类完成、现场制作、附带证据"的内容。

在 Core 套餐中,我们默认为客户网站添加作者署名 schema。耗时一小时,根据我们的内部数据,在 60 天内可将引用率提升约 25%。

## 您今天可以做什么

48 小时修复: 如果尚未完成,请认领您的 Yelp、BBB 和一个行业专属目录条目。确保名称、地址、电话和类别在三处完全一致。ChatGPT 在实体层评估名称一致性。一个不一致的 NAP 三元组会使被引用概率减半。

季度级修复: Wikidata、作者署名和原创图片。我们在 Core 和 Growth 套餐中提供这些工作。您也可以使用我们审计交付物中的 90 天剧本自行实施。`,
      },
    },
  },
  {
    slug: "voice-search-changed-for-dentists",
    title: "Voice search just changed for dentists, and most clinics will miss it",
    excerpt:
      "Apple's local recommendations changed in iOS 18.2. The dentists asking Siri now hear different names. Here's what changed and how to win the new layer.",
    category: "voice-search",
    language: "en",
    publishedAt: "2026-03-01T09:00:00-05:00",
    readingTimeMin: 5,
    author: "AiLys Agency",
    tags: ["voice search", "siri", "dentists", "local seo"],
    content: `## "Hey Siri, find a dentist near me" returns different answers than it did six months ago.

Apple changed how iOS 18.2's local recommendations weighting works in late 2025. The change went unannounced. We caught it because we run weekly voice-query tests across 30 verticals.

### What changed

Three things shifted at once.

**One**: Siri now reads more from Apple Maps Connect verified businesses than from third-party data partners. If you have not claimed and verified your Apple Maps listing, you are now invisible to ~25% of dentist voice queries in Quebec.

**Two**: Recent reviews matter more than total review count. A clinic with 80 reviews and 5 in the last 30 days now beats a clinic with 400 reviews and zero recent activity. Apple is fighting "review graveyards."

**Three**: Service-specific keywords inside reviews now propagate to voice ranking. A clinic with multiple reviews mentioning "pediatric" will be returned for "kid-friendly dentist" voice queries. Without the keyword density, you don't.

### Why most dentists will miss this

Apple Maps Connect is the least sexy channel in local SEO. Most clinics never claim their listing because Google Business Profile pays the bills. But voice queries through Siri now route 30-40% of "dentist near me" intent in Quebec, especially among under-40 patients.

Three implications:

- Your monthly review pace matters more than your total. If you are not generating 4-6 fresh reviews per month, you are aging out of voice rankings.
- Your reviews need keyword variety. A bunch of reviews that all say "great dentist" do nothing for voice. Reviews mentioning specific services (cleaning, whitening, pediatric, emergency) win different voice queries.
- Apple Maps Connect needs a quarterly audit minimum.

### What we do for dental clients

At the Core tier, we run a quarterly Apple Maps Connect audit alongside the GBP work. Our review prompts steer customers to mention the service they actually used. The Autopilot tier runs a monthly review contest with prompts engineered for service keyword diversity.

Free AI Visibility Audit covers Siri voice queries for your business name. Worth the 90 seconds.`,
    i18n: {
      fr: {
        title: "La recherche vocale vient de changer pour les dentistes, et la plupart des cliniques vont passer à côté",
        excerpt:
          "Les recommandations locales d'Apple ont changé dans iOS 18.2. Les patients qui demandent à Siri entendent maintenant des noms différents. Voici ce qui a changé et comment gagner cette nouvelle couche.",
        content: `## « Dis Siri, trouve un dentiste près de moi » donne des réponses différentes qu'il y a six mois.

Apple a modifié la pondération des recommandations locales dans iOS 18.2 à la fin de 2025. Le changement n'a pas été annoncé. Nous l'avons détecté parce que nous menons des tests hebdomadaires de requêtes vocales dans 30 secteurs.

### Ce qui a changé

Trois choses ont bougé en même temps.

**Un** : Siri puise désormais davantage dans les fiches vérifiées d'Apple Maps Connect que dans les partenaires de données tiers. Si vous n'avez pas revendiqué et vérifié votre fiche Apple Maps, vous êtes maintenant invisible pour environ 25 % des requêtes vocales sur les dentistes au Québec.

**Deux** : les avis récents pèsent plus que le total. Une clinique avec 80 avis dont 5 dans les 30 derniers jours bat maintenant une clinique avec 400 avis sans activité récente. Apple combat les « cimetières d'avis ».

**Trois** : les mots-clés spécifiques aux services présents dans les avis se propagent désormais dans le classement vocal. Une clinique avec plusieurs avis mentionnant « pédiatrique » sera retournée pour les requêtes vocales « dentiste pour enfants ». Sans la densité de mots-clés, vous ne sortez pas.

### Pourquoi la plupart des dentistes vont passer à côté

Apple Maps Connect est le canal le moins attrayant du SEO local. La plupart des cliniques ne revendiquent jamais leur fiche parce que c'est Google Business Profile qui paie les factures. Mais les requêtes vocales via Siri acheminent maintenant 30 à 40 % de l'intention « dentiste près de moi » au Québec, surtout chez les patients de moins de 40 ans.

Trois implications :

- Votre rythme mensuel d'avis compte plus que votre total. Si vous ne générez pas 4 à 6 nouveaux avis par mois, vous sortez peu à peu du classement vocal.
- Vos avis ont besoin de variété de mots-clés. Une série d'avis disant tous « excellent dentiste » ne fait rien pour le vocal. Les avis qui mentionnent des services précis (nettoyage, blanchiment, pédiatrique, urgence) gagnent différentes requêtes vocales.
- Apple Maps Connect a besoin d'un audit trimestriel au minimum.

### Ce que nous faisons pour les clients dentaires

Au forfait Core, nous menons un audit trimestriel d'Apple Maps Connect en parallèle du travail GBP. Nos relances d'avis orientent les patients à mentionner le service qu'ils ont réellement utilisé. Le forfait Autopilot mène un concours mensuel d'avis avec des prompts conçus pour diversifier les mots-clés de service.

L'AI Visibility Audit gratuit couvre les requêtes vocales Siri pour votre nom d'entreprise. Ça vaut les 90 secondes.`,
      },
      es: {
        title: "La búsqueda por voz acaba de cambiar para los dentistas, y la mayoría de las clínicas no se va a enterar",
        excerpt:
          "Las recomendaciones locales de Apple cambiaron en iOS 18.2. Los pacientes que le preguntan a Siri ahora escuchan nombres diferentes. Esto es lo que cambió y cómo ganar esta nueva capa.",
        content: `## "Hey Siri, encuéntrame un dentista cerca" devuelve respuestas distintas a las de hace seis meses.

Apple modificó cómo funciona la ponderación de recomendaciones locales de iOS 18.2 a fines de 2025. El cambio no se anunció. Lo detectamos porque hacemos pruebas semanales de consultas por voz en 30 sectores.

### Qué cambió

Tres cosas se movieron al mismo tiempo.

**Una**: Siri ahora se nutre más de fichas verificadas en Apple Maps Connect que de socios de datos externos. Si no ha reclamado y verificado su ficha de Apple Maps, ahora es invisible para alrededor del 25 % de las consultas por voz sobre dentistas en Quebec.

**Dos**: las reseñas recientes pesan más que el total. Una clínica con 80 reseñas y 5 en los últimos 30 días ahora supera a una clínica con 400 reseñas sin actividad reciente. Apple está combatiendo los "cementerios de reseñas".

**Tres**: las palabras clave específicas de servicio dentro de las reseñas ahora se propagan al ranking por voz. Una clínica con varias reseñas que mencionan "pediátrico" aparecerá para consultas por voz como "dentista para niños". Sin esa densidad de palabras clave, no aparece.

### Por qué la mayoría de los dentistas no se va a enterar

Apple Maps Connect es el canal menos llamativo del SEO local. La mayoría de las clínicas nunca reclama su ficha porque Google Business Profile paga las cuentas. Pero las consultas por voz a través de Siri ahora canalizan entre el 30 y el 40 % de la intención "dentista cerca de mí" en Quebec, sobre todo entre pacientes menores de 40 años.

Tres implicaciones:

- Su ritmo mensual de reseñas pesa más que su total. Si no genera entre 4 y 6 reseñas frescas al mes, está saliendo del ranking por voz.
- Sus reseñas necesitan variedad de palabras clave. Un montón de reseñas que dicen "gran dentista" no hace nada para la voz. Las reseñas que mencionan servicios específicos (limpieza, blanqueamiento, pediátrico, urgencia) ganan distintas consultas por voz.
- Apple Maps Connect necesita una auditoría trimestral como mínimo.

### Qué hacemos por nuestros clientes dentales

En el plan Core, ejecutamos una auditoría trimestral de Apple Maps Connect junto al trabajo de GBP. Nuestros mensajes de solicitud de reseñas orientan al paciente a mencionar el servicio que realmente recibió. El plan Autopilot ejecuta un concurso mensual de reseñas con mensajes diseñados para diversificar las palabras clave de servicio.

El AI Visibility Audit gratuito cubre las consultas por voz a Siri sobre el nombre de su negocio. Vale los 90 segundos.`,
      },
      zh: {
        title: "牙医的语音搜索刚刚发生了变化,大多数诊所都会错过",
        excerpt:
          "Apple 在 iOS 18.2 中改变了本地推荐机制。向 Siri 提问的患者现在听到的是不同的名字。以下是变化内容和如何拿下这一新层级。",
        content: `## "Hey Siri,find a dentist near me" 给出的答案,与六个月前不同了。

Apple 在 2025 年末调整了 iOS 18.2 中本地推荐权重的工作方式,变更未对外公告。我们能捕捉到这点,是因为每周都在 30 个垂直行业中进行语音查询测试。

### 变了什么

三件事同时发生。

**第一**: Siri 现在更多地从 Apple Maps Connect 已验证的商家中读取信息,而不是从第三方数据合作伙伴中。如果您尚未认领并验证 Apple Maps 上的商家信息,您现在对魁北克约 25% 的牙医语音查询是隐形的。

**第二**: 最近的评论比评论总数更重要。一家有 80 条评论、其中 5 条在过去 30 天内的诊所,如今已胜过一家有 400 条评论却没有近期活动的诊所。Apple 正在打击"评论坟场"。

**第三**: 评论中针对具体服务的关键词,如今会传导到语音排序。多条评论提到"儿科"的诊所,会被返回到 "kid-friendly dentist" 的语音查询中。没有相应的关键词密度,就不会被返回。

### 为什么大多数牙医会错过

Apple Maps Connect 是本地 SEO 中最不起眼的渠道。多数诊所从不认领它,因为埋单的是 Google Business Profile。但 Siri 上的语音查询如今承载了魁北克 "dentist near me" 意图的 30% 到 40%,在 40 岁以下患者中尤为突出。

三个含义:

- 月度评论节奏比累计总数更重要。如果您每月没有产生 4 到 6 条新评论,您会逐步从语音排名中淡出。
- 评论需要关键词多样性。一堆都说"很棒的牙医"的评论对语音毫无作用。提到具体服务(洗牙、美白、儿科、急诊)的评论才能拿下不同的语音查询。
- Apple Maps Connect 至少需要每季度审计一次。

### 我们为牙科客户做什么

在 Core 套餐中,我们与 GBP 工作并行,每季度做一次 Apple Maps Connect 审计。我们的评论引导文案会让患者提及他们实际接受的服务。Autopilot 套餐则每月运行一次评论征集活动,提示文案专门设计以丰富服务关键词。

免费的 AI Visibility Audit 涵盖了针对您商家名称的 Siri 语音查询。值得花上 90 秒。`,
      },
    },
  },
  {
    slug: "perplexity-citations-30-day-playbook",
    title: "Perplexity citations: the 30-day playbook",
    excerpt:
      "Perplexity grew 2× year over year. It cites differently than ChatGPT. Here is the exact 30-day plan we run for clients to land their first citation.",
    category: "perplexity",
    language: "en",
    publishedAt: "2026-03-14T09:00:00-05:00",
    readingTimeMin: 7,
    author: "AiLys Agency",
    tags: ["perplexity", "geo", "citations", "30-day plan"],
    content: `## Perplexity's citation algorithm is different. Here is what works.

Perplexity prioritizes recency, source diversity, and structured data over raw domain authority. That makes it the most attainable LLM for local businesses, but only if you know what to optimize.

### Day 1 to 7: Audit your structured data

Perplexity heavily favors sites with clean schema markup. The four schema types that matter for local:

- LocalBusiness (with full address, hours, payment methods)
- FAQPage (every common question answered with concrete schema)
- Review (aggregateRating + at least 3 individual reviews marked up)
- Service (one Service entity per service you offer)

If you don't have these four shipped, no amount of content will help. We deploy this as a one-time workflow at the Core tier. DIY is possible but tedious. Two hours per page on average.

### Day 8 to 14: Publish a "current state" article

Perplexity prioritizes recency. A blog post titled "[Your service] in [your city] in 2026: what changed" with a publish date in the last 30 days gets weighted higher than older content even if your DA is lower.

The structure that works:
- Open with one specific stat about your industry in your city
- Three bullet sections: what changed, who it affects, what to do
- Close with a clear "we [do this thing]" sentence with location

Publish this on your domain. Submit it to Reddit's local subreddit (where applicable). Perplexity weighs Reddit signals heavily.

### Day 15 to 21: Earn three diverse citations

Source diversity matters more than quantity. Three different domains beats ten links from the same site. Targets we use:

- Local newspaper (one quote, even on an unrelated story)
- Industry directory (claim and complete profile)
- Niche forum or subreddit (substantive answer, not promo)

If you cannot earn a newspaper quote, an industry podcast guest spot works. The signal Perplexity wants is "this entity is referenced across the web's source diversity."

### Day 22 to 30: Fix your Wikipedia footprint

You probably do not qualify for a Wikipedia article. Most local businesses don't. But you can be referenced in existing Wikipedia articles when relevant.

Find Wikipedia articles about your city or your industry. Look for "list of [things]" or "[city] [industry]" pages. If your business is genuinely notable enough to be in those lists, propose the addition with a verifiable third-party source. Wikipedia mentions take 2-4 weeks to settle and become a long-term Perplexity ranking signal.

## What "first citation" looks like

Run a Perplexity query for "best [your service] in [your city]" weekly. Most clients see their first cited mention between days 25 and 45. The work compounds.

We run this exact playbook for Core and Growth tier clients. Audits are free. Tell us your service and city, we tell you which of the 30 days you are missing.`,
    i18n: {
      fr: {
        title: "Citations Perplexity : le plan d'action sur 30 jours",
        excerpt:
          "Perplexity a doublé d'année en année. Il cite différemment de ChatGPT. Voici le plan exact sur 30 jours que nous menons pour nos clients afin d'obtenir leur première citation.",
        content: `## L'algorithme de citation de Perplexity est différent. Voici ce qui fonctionne.

Perplexity priorise la fraîcheur, la diversité des sources et les données structurées avant l'autorité de domaine brute. Cela en fait le LLM le plus accessible pour les entreprises locales, à condition de savoir quoi optimiser.

### Jour 1 à 7 : auditez vos données structurées

Perplexity favorise fortement les sites au balisage schema propre. Les quatre types de schema qui comptent en local :

- LocalBusiness (avec adresse complète, heures, modes de paiement)
- FAQPage (chaque question courante répondue avec un schema concret)
- Review (aggregateRating et au moins 3 avis individuels balisés)
- Service (une entité Service par service que vous offrez)

Sans ces quatre éléments en place, aucun volume de contenu ne suffira. Nous déployons cela comme une opération unique au forfait Core. Le faire vous-même est possible mais fastidieux. Deux heures par page en moyenne.

### Jour 8 à 14 : publiez un article « état actuel »

Perplexity priorise la fraîcheur. Un billet de blogue intitulé « [Votre service] à [votre ville] en 2026 : ce qui a changé » publié dans les 30 derniers jours est pondéré plus haut que du contenu plus vieux, même si votre DA est plus faible.

La structure qui fonctionne :
- Ouvrir avec une statistique précise sur votre secteur dans votre ville
- Trois sections en puces : ce qui a changé, qui est touché, quoi faire
- Conclure avec une phrase claire « nous [faisons ceci] » avec la localisation

Publiez sur votre domaine. Soumettez-le au sous-reddit local pertinent. Perplexity accorde un poids important aux signaux Reddit.

### Jour 15 à 21 : décrochez trois citations diversifiées

La diversité des sources compte plus que la quantité. Trois domaines différents valent mieux que dix liens du même site. Cibles que nous utilisons :

- Journal local (une citation, même dans un article sans rapport)
- Annuaire sectoriel (revendiquer et compléter la fiche)
- Forum de niche ou subreddit (réponse de fond, pas promotionnelle)

Si vous ne décrochez pas de citation dans un journal, un passage en invité sur un balado sectoriel fonctionne. Le signal que Perplexity veut, c'est « cette entité est référencée dans la diversité des sources du web ».

### Jour 22 à 30 : corrigez votre empreinte Wikipedia

Vous ne qualifiez probablement pas pour un article Wikipedia. La plupart des entreprises locales non plus. Mais vous pouvez être référencé dans des articles Wikipedia existants quand c'est pertinent.

Trouvez les articles Wikipedia sur votre ville ou votre secteur. Cherchez les pages « liste de [choses] » ou « [ville] [secteur] ». Si votre entreprise est réellement assez notable pour figurer dans ces listes, proposez l'ajout avec une source tierce vérifiable. Les mentions Wikipedia prennent 2 à 4 semaines à se stabiliser et deviennent un signal de classement Perplexity à long terme.

## À quoi ressemble une « première citation »

Lancez une requête Perplexity « meilleur [votre service] à [votre ville] » chaque semaine. La plupart des clients voient leur première mention citée entre le jour 25 et le jour 45. Le travail compose.

Nous menons ce plan exact pour les clients des forfaits Core et Growth. Les audits sont gratuits. Dites-nous votre service et votre ville, nous vous indiquons quel jour de la séquence vous manque.`,
      },
      es: {
        title: "Citas en Perplexity: el plan de 30 días",
        excerpt:
          "Perplexity creció 2× año tras año. Cita de forma distinta a ChatGPT. Este es el plan exacto de 30 días que aplicamos con clientes para conseguir su primera cita.",
        content: `## El algoritmo de citas de Perplexity es diferente. Esto es lo que funciona.

Perplexity prioriza la actualidad, la diversidad de fuentes y los datos estructurados por encima de la autoridad de dominio en bruto. Eso lo convierte en el LLM más alcanzable para los negocios locales, pero solo si sabe qué optimizar.

### Día 1 a 7: audite sus datos estructurados

Perplexity favorece fuertemente los sitios con marcado schema limpio. Los cuatro tipos de schema que importan en local:

- LocalBusiness (con dirección completa, horarios, métodos de pago)
- FAQPage (cada pregunta común respondida con schema concreto)
- Review (aggregateRating y al menos 3 reseñas individuales marcadas)
- Service (una entidad Service por cada servicio que ofrece)

Sin estos cuatro listos, ninguna cantidad de contenido le servirá. Lo desplegamos como un flujo de trabajo único en el plan Core. Hacerlo por cuenta propia es posible pero tedioso. Dos horas por página en promedio.

### Día 8 a 14: publique un artículo de "estado actual"

Perplexity prioriza la actualidad. Un blog titulado "[Su servicio] en [su ciudad] en 2026: qué cambió" con fecha de publicación en los últimos 30 días recibe más peso que contenido más antiguo aunque su DA sea menor.

La estructura que funciona:
- Abra con una estadística específica de su sector en su ciudad
- Tres secciones en viñetas: qué cambió, a quién afecta, qué hacer
- Cierre con una frase clara "nosotros [hacemos esto]" con ubicación

Publíquelo en su dominio. Envíelo al subreddit local cuando aplique. Perplexity da peso importante a las señales de Reddit.

### Día 15 a 21: gane tres citas diversas

La diversidad de fuentes importa más que la cantidad. Tres dominios distintos vencen a diez enlaces del mismo sitio. Objetivos que usamos:

- Diario local (una cita, incluso en una nota no relacionada)
- Directorio sectorial (reclamar y completar el perfil)
- Foro de nicho o subreddit (respuesta sustantiva, no promo)

Si no consigue una cita en un diario, una participación como invitado en un podcast del sector funciona. La señal que Perplexity busca es "esta entidad está referenciada con diversidad de fuentes en la web".

### Día 22 a 30: arregle su huella en Wikipedia

Es probable que no califique para un artículo de Wikipedia. La mayoría de los negocios locales no lo hace. Pero sí puede ser referenciado en artículos existentes cuando sea pertinente.

Busque artículos de Wikipedia sobre su ciudad o su sector. Vaya a páginas como "lista de [cosas]" o "[ciudad] [sector]". Si su negocio es genuinamente lo bastante notable para estar en esas listas, proponga la incorporación con una fuente externa verificable. Las menciones en Wikipedia tardan de 2 a 4 semanas en consolidarse y se convierten en señal de ranking a largo plazo en Perplexity.

## Cómo se ve la "primera cita"

Ejecute una consulta semanal en Perplexity sobre "mejor [su servicio] en [su ciudad]". La mayoría de los clientes ve su primera mención citada entre los días 25 y 45. El trabajo se acumula.

Aplicamos exactamente este plan para clientes de los planes Core y Growth. Las auditorías son gratis. Díganos su servicio y ciudad, nosotros le decimos qué día de los 30 le falta.`,
      },
      zh: {
        title: "Perplexity 引用: 30 天行动手册",
        excerpt:
          "Perplexity 同比增长 2×。它的引用方式与 ChatGPT 不同。以下是我们为客户拿下首条引用所采用的精确 30 天方案。",
        content: `## Perplexity 的引用算法不一样,以下方法有效。

Perplexity 在原始域名权重之上,更看重新近性、来源多样性和结构化数据。这使其成为本地企业最容易触达的 LLM,前提是您知道该优化什么。

### 第 1 至 7 天: 审计您的结构化数据

Perplexity 强烈青睐 schema 标记干净的站点。本地业务真正重要的四类 schema:

- LocalBusiness(包含完整地址、营业时间、支付方式)
- FAQPage(每条常见问题都用具体的 schema 进行回答)
- Review(aggregateRating 加至少 3 条单独标注的评论)
- Service(每项服务一个 Service 实体)

如果这四项没有上线,再多内容也救不了您。我们在 Core 套餐中将其作为一次性工作流交付。自己做也行,但繁琐,平均每页两小时。

### 第 8 至 14 天: 发布一篇"现状"文章

Perplexity 注重新近性。一篇标题为"2026 年[您的城市]的[您的服务]: 发生了什么变化"且发布日期在过去 30 天内的博客文章,即使您的 DA 较低,其权重也会高于较旧的内容。

可行的结构:
- 用一个关于您所在城市本行业的具体数据开篇
- 三个项目符号小节: 变了什么、影响了谁、怎么做
- 用一句清晰的"我们[做这件事]"加上所在地收尾

将其发布在您的域名上。在适用情况下提交到所在地的 Reddit 子版块。Perplexity 对 Reddit 信号的权重很高。

### 第 15 至 21 天: 拿下三条多样化引用

来源多样性比数量更重要。三个不同的域名胜过同一站点的十个链接。我们使用的目标:

- 当地报纸(一句引述,哪怕是无关报道)
- 行业目录(认领并完整填写资料)
- 小众论坛或 subreddit(实质性回答,不是宣传)

如果拿不到报纸引述,行业播客嘉宾席位也行。Perplexity 想要的信号是"该实体在网络来源多样性中被引用"。

### 第 22 至 30 天: 完善您的 Wikipedia 足迹

您很可能不符合 Wikipedia 独立条目的标准。大多数本地企业都不符合。但相关时,您可以在已有的 Wikipedia 条目中被引用。

寻找关于您所在城市或行业的 Wikipedia 条目。查找"[事物]列表"或"[城市][行业]"类页面。如果您的企业确实有足够知名度可以列入,提议补充并附上可核实的第三方来源。Wikipedia 提及需要 2 到 4 周才能稳定,并成为 Perplexity 的长期排名信号。

## "首条引用"的样子

每周在 Perplexity 上运行一次"[您所在城市]最佳的[您的服务]"查询。多数客户在第 25 到 45 天看到首次被引用的提及。工作会复利累积。

我们正是用这套方案服务 Core 和 Growth 套餐客户。审计免费。告诉我们您的服务和城市,我们告诉您 30 天中您缺了哪一天。`,
      },
    },
  },
  {
    slug: "bing-copilot-b2b-search-engine",
    title: "Bing Copilot is the B2B search engine you're missing",
    excerpt:
      "Bing's market share is 8% globally and rising. But for B2B research it is closer to 30%. Why your competitors care about Bing more than you think.",
    category: "bing-copilot",
    language: "en",
    publishedAt: "2026-03-27T09:00:00-05:00",
    readingTimeMin: 4,
    author: "AiLys Agency",
    tags: ["bing", "copilot", "b2b", "enterprise"],
    content: `## Bing is small. Bing Copilot is large. Inside enterprises, it dominates.

Public Bing market share hovers around 8%. Inside Fortune 500 procurement and B2B research workflows, the number is closer to 30%, sometimes higher. Why? Microsoft 365 ships Copilot to every enterprise seat. Knowledge workers default to it for vendor research because it is two clicks away inside Outlook and Teams.

### Why this matters for local B2B

If your business sells to mid-market or enterprise buyers, your prospect's first research session probably runs through Bing Copilot, not Google. Your visibility there matters out of proportion to public market share numbers.

### What Bing Copilot weights differently than Google

Three structural differences:

**One**: Bing weights LinkedIn as a primary citation source. Google weights it lightly. If your company page on LinkedIn is sparse, you are invisible to a meaningful slice of B2B Copilot answers.

**Two**: Bing surfaces Microsoft properties (LinkedIn, GitHub, Microsoft Learn, Tech Community) ahead of comparable third-party sources. A blog post mirrored on LinkedIn carries more Bing weight than the same post only on your domain.

**Three**: Bing's E-E-A-T signal weights credentialed authorship more heavily. A LinkedIn profile with a real headshot, current title, and verified work history makes the author's content more trustworthy in Bing's eyes.

### What to do

If you sell B2B and you have not optimized your team's LinkedIn presence, that is your first move. Specifically:

- Every author on your blog needs a complete LinkedIn profile linked from the byline
- Mirror your top 10 articles to LinkedIn (yes, it works in 2026, contrary to old advice)
- Claim and populate your company page fully (no skipped fields)
- Post quarterly thought leadership from the founder's profile

We run this LinkedIn-mirroring workflow for B2B-focused Growth tier clients. Citation lift in Bing Copilot averages 35% over 60 days in our cohort.`,
    i18n: {
      fr: {
        title: "Bing Copilot est le moteur de recherche B2B qui vous échappe",
        excerpt:
          "La part de marché de Bing est de 8 % à l'échelle mondiale et grimpe. Mais pour la recherche B2B, elle frôle les 30 %. Pourquoi vos concurrents se soucient de Bing plus que vous le croyez.",
        content: `## Bing est petit. Bing Copilot est grand. À l'intérieur des entreprises, il domine.

La part de marché publique de Bing oscille autour de 8 %. Dans les flux d'approvisionnement Fortune 500 et la recherche B2B, le chiffre frôle les 30 %, parfois plus. Pourquoi? Microsoft 365 livre Copilot à chaque siège d'entreprise. Les travailleurs du savoir s'en servent par défaut pour leur recherche fournisseurs parce qu'il est à deux clics dans Outlook et Teams.

### Pourquoi cela compte pour le B2B local

Si votre entreprise vend à des acheteurs mid-market ou enterprise, la première session de recherche de votre prospect passe sans doute par Bing Copilot, pas par Google. Votre visibilité y compte de façon disproportionnée par rapport aux chiffres publics de part de marché.

### Ce que Bing Copilot pondère différemment de Google

Trois différences structurelles :

**Un** : Bing traite LinkedIn comme une source de citation primaire. Google le pondère légèrement. Si votre page entreprise sur LinkedIn est anémique, vous êtes invisible pour une tranche significative des réponses Copilot B2B.

**Deux** : Bing met de l'avant les propriétés Microsoft (LinkedIn, GitHub, Microsoft Learn, Tech Community) avant les sources tierces comparables. Un billet de blogue dupliqué sur LinkedIn pèse plus dans Bing que le même billet uniquement sur votre domaine.

**Trois** : le signal E-E-A-T de Bing accorde plus de poids à la paternité accréditée. Un profil LinkedIn avec photo professionnelle réelle, titre actuel et historique d'emploi vérifié rend le contenu de l'auteur plus digne de confiance aux yeux de Bing.

### Ce qu'il faut faire

Si vous vendez B2B et n'avez pas optimisé la présence LinkedIn de votre équipe, c'est votre premier mouvement. Concrètement :

- Chaque auteur sur votre blogue doit avoir un profil LinkedIn complet lié à sa signature
- Dupliquez vos 10 meilleurs articles sur LinkedIn (oui, ça fonctionne en 2026, contrairement aux vieux conseils)
- Revendiquez et remplissez intégralement votre page entreprise (aucun champ sauté)
- Publiez du leadership éclairé chaque trimestre depuis le profil du fondateur

Nous menons ce flux de duplication LinkedIn pour les clients B2B au forfait Growth. La hausse de citations dans Bing Copilot atteint 35 % en moyenne sur 60 jours dans notre cohorte.`,
      },
      es: {
        title: "Bing Copilot es el buscador B2B que se le está escapando",
        excerpt:
          "La cuota de mercado de Bing es del 8 % a nivel global y sube. Pero en investigación B2B se acerca al 30 %. Por qué a sus competidores les importa Bing más de lo que cree.",
        content: `## Bing es pequeño. Bing Copilot es grande. Dentro de las empresas, domina.

La cuota pública de Bing ronda el 8 %. Dentro de los flujos de aprovisionamiento Fortune 500 y la investigación B2B, la cifra se acerca al 30 %, a veces más. ¿Por qué? Microsoft 365 entrega Copilot en cada licencia corporativa. Los trabajadores del conocimiento lo usan por defecto para investigar proveedores porque está a dos clics dentro de Outlook y Teams.

### Por qué importa esto para el B2B local

Si su empresa vende a compradores mid-market o enterprise, la primera sesión de investigación de su prospecto probablemente pasa por Bing Copilot, no por Google. Su visibilidad ahí pesa de forma desproporcionada respecto a las cifras públicas de cuota de mercado.

### Qué pondera Bing Copilot distinto a Google

Tres diferencias estructurales:

**Una**: Bing trata a LinkedIn como fuente de cita primaria. Google le da poco peso. Si su página de empresa en LinkedIn está pobre, es invisible para una porción significativa de las respuestas B2B de Copilot.

**Dos**: Bing eleva las propiedades de Microsoft (LinkedIn, GitHub, Microsoft Learn, Tech Community) por encima de fuentes externas comparables. Un blog replicado en LinkedIn carga más peso en Bing que el mismo artículo solo en su dominio.

**Tres**: la señal E-E-A-T de Bing pondera más fuerte la autoría con credenciales. Un perfil de LinkedIn con foto profesional real, cargo actual e historial laboral verificado vuelve más confiable el contenido del autor a ojos de Bing.

### Qué hacer

Si vende B2B y no ha optimizado la presencia de su equipo en LinkedIn, ese es su primer movimiento. En concreto:

- Cada autor en su blog necesita un perfil de LinkedIn completo enlazado desde la firma
- Replique sus 10 artículos principales en LinkedIn (sí, funciona en 2026, al contrario del consejo viejo)
- Reclame y complete a fondo su página de empresa (sin campos en blanco)
- Publique liderazgo de pensamiento trimestral desde el perfil del fundador

Aplicamos este flujo de replicación en LinkedIn para clientes B2B del plan Growth. El alza de citas en Bing Copilot promedia 35 % en 60 días dentro de nuestra cohorte.`,
      },
      zh: {
        title: "Bing Copilot 是您忽略的 B2B 搜索引擎",
        excerpt:
          "Bing 在全球市场份额为 8% 并在上升,但在 B2B 研究中接近 30%。为什么您的竞争对手对 Bing 的重视程度超出您的预期。",
        content: `## Bing 不大,Bing Copilot 不小。在企业内部,它占主导。

Bing 公开市场份额徘徊在 8% 左右。在 Fortune 500 的采购和 B2B 研究流程中,这一数字接近 30%,有时更高。为什么? Microsoft 365 把 Copilot 推送到每一个企业席位。知识工作者用它做供应商调研已成默认,因为在 Outlook 和 Teams 内只需点击两下。

### 这对本地 B2B 为何重要

如果您的业务面向中端市场或企业级买家,潜在客户的首次调研很可能走的是 Bing Copilot,而不是 Google。您在那里的能见度,比公开市场份额数字所暗示的还要重要得多。

### Bing Copilot 与 Google 加权方式的差异

三处结构性差异:

**第一**: Bing 把 LinkedIn 视作主要引用来源,Google 对其权重很低。如果您在 LinkedIn 的公司主页内容稀薄,您对 B2B Copilot 答案中相当大一块都是隐形的。

**第二**: Bing 把 Microsoft 自家产品(LinkedIn、GitHub、Microsoft Learn、Tech Community)排在同类第三方来源之前。同一篇文章如果在 LinkedIn 上同步发布,在 Bing 中的权重要高于仅发布在您域名上的那一份。

**第三**: Bing 的 E-E-A-T 信号对带认证的作者署名加权更重。一份带有真实头像、当前职衔和已验证工作经历的 LinkedIn 个人主页,会让作者的内容在 Bing 眼中更值得信任。

### 怎么做

如果您做 B2B 业务,且尚未优化团队的 LinkedIn 形象,这就是第一步。具体而言:

- 您博客上的每位作者都需要在署名处链接到完整的 LinkedIn 个人主页
- 把您最好的 10 篇文章同步到 LinkedIn(没错,2026 年这一招仍然有效,与旧建议相反)
- 认领并完整填写公司主页(不要漏掉字段)
- 每季度从创始人主页发布一次思想领导力内容

我们为面向 B2B 的 Growth 套餐客户运行这套 LinkedIn 同步工作流。在我们的客户群组中,Bing Copilot 的引用率在 60 天内平均提升 35%。`,
      },
    },
  },
  {
    slug: "aeo-geo-eeat-explained-for-local-owners",
    title: "AEO vs GEO vs E-E-A-T explained for local business owners",
    excerpt:
      "Three acronyms that decide your AI search future. Here is the plain-English version with what to do for each one in the next 90 days.",
    category: "aeo-geo-eeat",
    language: "en",
    publishedAt: "2026-04-09T09:00:00-04:00",
    readingTimeMin: 6,
    author: "AiLys Agency",
    tags: ["aeo", "geo", "eeat", "fundamentals"],
    content: `## Three acronyms. Plain English. What to do.

Every AI search agency throws AEO, GEO, and E-E-A-T at you within the first call. Most owners nod and pretend to follow. Here is the version we wish someone had given us.

### AEO: Answer Engine Optimization

AEO is the work of structuring your website so an AI engine can pull a clean, direct answer from your content.

The core moves:
- FAQ schema on your service pages (every question your customers ask)
- Review schema with aggregateRating
- LocalBusiness schema fully filled out
- HowTo schema for any process you teach
- Scannable, sub-300-word blocks under H2 headings

If a buyer asks "how much does a root canal cost in Montreal," AEO is what makes ChatGPT pull "$800 to $1,500" from your dental clinic site instead of summarizing five competitors.

**90-day play**: ship the four schema types above, write 15 FAQ entries per service.

### GEO: Generative Engine Optimization

GEO is the work of getting your brand cited inside generative AI responses (ChatGPT, Perplexity, Claude, Gemini).

This is not the same as ranking. ChatGPT can give a great answer about your industry without ever naming you. GEO is the work of being named.

The core moves:
- Wikipedia / Wikidata footprint
- High-DA citation density (Yelp, BBB, Crunchbase, industry directories)
- Authoritative third-party content mentioning your name
- Original data or research that other sites cite back to you

GEO is harder than AEO because it depends on third-party validation. You cannot DIY it overnight.

**90-day play**: claim and complete your top 10 high-DA citation targets, earn one third-party mention, set up Wikidata.

### E-E-A-T: Experience, Expertise, Authoritativeness, Trust

E-E-A-T is Google's rubric for evaluating content quality. AI engines now use the same rubric for picking what to cite.

The four pillars:
- **Experience**: first-hand evidence. Original photos with EXIF data, real customer interviews, on-site videos.
- **Expertise**: credentials. Author bios with real qualifications, specialized vocabulary used correctly.
- **Authoritativeness**: third-party validation. Press mentions, peer recognition, awards, industry citations.
- **Trust**: technical and business honesty. SSL, no broken links, transparent pricing, real reviews not fake.

E-E-A-T is the highest-leverage AI search signal in 2026. Google rebuilt its quality rater guidelines around it in 2024. Every LLM that uses Google's index inherits the weighting.

**90-day play**: add author bylines to all blog content, ship one piece of original research, claim awards/credentials in schema, fix any technical trust signals (SSL, broken links).

## How they fit together

AEO makes you the answer. GEO gets you cited. E-E-A-T decides who deserves both.

You need all three. Most agencies sell one and call it complete. We do all three at the Core tier.

If you want to see which of the three you are strongest and weakest at, run the AI Visibility Audit. We score each separately so you know exactly what to fix first.`,
    i18n: {
      fr: {
        title: "AEO, GEO et E-E-A-T expliqués aux propriétaires d'entreprises locales",
        excerpt:
          "Trois acronymes qui décident de votre avenir dans la recherche par IA. Voici la version en français clair avec ce qu'il faut faire pour chacun dans les 90 prochains jours.",
        content: `## Trois acronymes. Français clair. Quoi faire.

Chaque agence de recherche IA vous balance AEO, GEO et E-E-A-T dès le premier appel. La plupart des propriétaires hochent la tête et font semblant de suivre. Voici la version qu'on aurait aimé recevoir.

### AEO : Answer Engine Optimization

L'AEO consiste à structurer votre site pour qu'un moteur IA puisse en tirer une réponse propre et directe.

Les mouvements de base :
- FAQ schema sur vos pages de service (chaque question que vos clients posent)
- Review schema avec aggregateRating
- LocalBusiness schema entièrement rempli
- HowTo schema pour tout processus que vous expliquez
- Blocs scannables, sous 300 mots, sous des en-têtes H2

Si un acheteur demande « combien coûte un traitement de canal à Montréal », c'est l'AEO qui fait que ChatGPT extrait « 800 $ à 1 500 $ » de votre site de clinique dentaire au lieu de résumer cinq concurrents.

**Plan sur 90 jours** : déployer les quatre types de schema ci-dessus, rédiger 15 entrées FAQ par service.

### GEO : Generative Engine Optimization

Le GEO consiste à faire citer votre marque dans les réponses des IA génératives (ChatGPT, Perplexity, Claude, Gemini).

Ce n'est pas la même chose que le classement. ChatGPT peut donner une excellente réponse sur votre secteur sans jamais vous nommer. Le GEO, c'est le travail d'être nommé.

Les mouvements de base :
- Empreinte Wikipedia et Wikidata
- Densité de citations à haute DA (Yelp, BBB, Crunchbase, annuaires sectoriels)
- Contenu tiers faisant autorité qui mentionne votre nom
- Données ou recherches originales que d'autres sites citent à leur tour

Le GEO est plus difficile que l'AEO parce qu'il dépend d'une validation par des tiers. On ne peut pas le bâcler du jour au lendemain.

**Plan sur 90 jours** : revendiquer et compléter vos 10 principales cibles de citation à haute DA, décrocher une mention tierce, mettre en place Wikidata.

### E-E-A-T : Experience, Expertise, Authoritativeness, Trust

E-E-A-T est la grille de Google pour évaluer la qualité du contenu. Les moteurs IA s'en servent maintenant pour choisir quoi citer.

Les quatre piliers :
- **Experience** : preuves de première main. Photos originales avec données EXIF, entrevues clients réelles, vidéos sur place.
- **Expertise** : qualifications. Biographies d'auteur avec compétences réelles, vocabulaire spécialisé utilisé correctement.
- **Authoritativeness** : validation par des tiers. Mentions presse, reconnaissance par les pairs, prix, citations sectorielles.
- **Trust** : honnêteté technique et commerciale. SSL, aucun lien brisé, prix transparents, vrais avis et non factices.

E-E-A-T est le signal de recherche IA à plus fort effet de levier en 2026. Google a refondu ses lignes directrices d'évaluateurs qualité autour en 2024. Chaque LLM qui utilise l'index de Google hérite de cette pondération.

**Plan sur 90 jours** : ajouter des signatures d'auteur à tout le contenu de blogue, livrer une pièce de recherche originale, déclarer prix et accréditations dans le schema, corriger les signaux techniques de confiance (SSL, liens brisés).

## Comment ils s'articulent

L'AEO fait de vous la réponse. Le GEO vous fait citer. E-E-A-T décide qui mérite les deux.

Vous avez besoin des trois. La plupart des agences en vendent un et déclarent l'affaire close. Nous faisons les trois au forfait Core.

Si vous voulez voir lequel des trois est votre plus fort et votre plus faible, lancez l'AI Visibility Audit. Nous notons chacun séparément pour que vous sachiez exactement par quoi commencer.`,
      },
      es: {
        title: "AEO vs GEO vs E-E-A-T explicados para dueños de negocios locales",
        excerpt:
          "Tres siglas que deciden su futuro en la búsqueda por IA. Esta es la versión en español sencillo con qué hacer para cada una en los próximos 90 días.",
        content: `## Tres siglas. Español sencillo. Qué hacer.

Toda agencia de búsqueda IA le tira AEO, GEO y E-E-A-T en la primera llamada. La mayoría de los dueños asiente y simula seguir. Esta es la versión que nos hubiera gustado recibir.

### AEO: Answer Engine Optimization

El AEO consiste en estructurar su sitio para que un motor de IA pueda extraer de su contenido una respuesta limpia y directa.

Los movimientos base:
- FAQ schema en sus páginas de servicio (cada pregunta que hacen sus clientes)
- Review schema con aggregateRating
- LocalBusiness schema completamente lleno
- HowTo schema para cualquier proceso que enseñe
- Bloques escaneables, de menos de 300 palabras, bajo encabezados H2

Si un comprador pregunta "cuánto cuesta una endodoncia en Montreal", el AEO es lo que hace que ChatGPT extraiga "$800 a $1,500" de su sitio de clínica dental en lugar de resumir a cinco competidores.

**Plan a 90 días**: lanzar los cuatro tipos de schema anteriores, redactar 15 entradas de FAQ por servicio.

### GEO: Generative Engine Optimization

El GEO consiste en lograr que su marca sea citada dentro de respuestas de IA generativa (ChatGPT, Perplexity, Claude, Gemini).

Esto no es lo mismo que rankear. ChatGPT puede dar una respuesta excelente sobre su sector sin nombrarlo nunca. El GEO es el trabajo de ser nombrado.

Los movimientos base:
- Huella en Wikipedia y Wikidata
- Densidad de citas en sitios de alta DA (Yelp, BBB, Crunchbase, directorios sectoriales)
- Contenido externo con autoridad que mencione su nombre
- Datos o investigación original que otros sitios citen de regreso

El GEO es más difícil que el AEO porque depende de validación de terceros. No se puede improvisar de un día para otro.

**Plan a 90 días**: reclamar y completar sus 10 objetivos principales de citación de alta DA, ganar una mención de un tercero, montar Wikidata.

### E-E-A-T: Experience, Expertise, Authoritativeness, Trust

E-E-A-T es la rúbrica de Google para evaluar la calidad de contenido. Los motores de IA ahora usan la misma rúbrica para elegir qué citar.

Los cuatro pilares:
- **Experience**: evidencia de primera mano. Fotos originales con datos EXIF, entrevistas reales con clientes, videos in situ.
- **Expertise**: credenciales. Biografías de autor con calificaciones reales, vocabulario especializado bien usado.
- **Authoritativeness**: validación externa. Menciones de prensa, reconocimiento de pares, premios, citas sectoriales.
- **Trust**: honestidad técnica y comercial. SSL, sin enlaces rotos, precios transparentes, reseñas reales y no falsas.

E-E-A-T es la señal de búsqueda IA con mayor apalancamiento en 2026. Google reconstruyó sus guías para evaluadores de calidad alrededor de ella en 2024. Cada LLM que usa el índice de Google hereda esa ponderación.

**Plan a 90 días**: añadir firmas de autor a todo el contenido del blog, publicar una pieza de investigación original, declarar premios y credenciales en schema, arreglar señales técnicas de confianza (SSL, enlaces rotos).

## Cómo encajan

El AEO lo convierte en la respuesta. El GEO lo hace citado. E-E-A-T decide quién merece ambas.

Necesita las tres. La mayoría de las agencias vende una y la da por completa. Nosotros hacemos las tres en el plan Core.

Si quiere ver en cuál de las tres es más fuerte y más débil, ejecute el AI Visibility Audit. Calificamos cada una por separado para que sepa exactamente por dónde empezar.`,
      },
      zh: {
        title: "面向本地企业老板的 AEO、GEO、E-E-A-T 解释",
        excerpt:
          "三个决定您 AI 搜索未来的缩写。以下是用大白话讲清楚的版本,以及未来 90 天每一项要做的事。",
        content: `## 三个缩写。大白话。怎么做。

每家 AI 搜索代理在第一次电话中就把 AEO、GEO 和 E-E-A-T 一股脑甩给您。多数老板点点头,假装听懂。下面是我们当初希望有人给我们的版本。

### AEO: Answer Engine Optimization(答案引擎优化)

AEO 就是把您的网站组织好,让 AI 引擎能从您的内容中提取出干净、直接的答案。

核心动作:
- 在服务页面部署 FAQ schema(覆盖客户提出的每一个常见问题)
- 带 aggregateRating 的 Review schema
- 完整填写的 LocalBusiness schema
- 凡是您讲解的流程,使用 HowTo schema
- H2 标题之下,采用 300 字以内、可扫读的段落

如果买家问"在蒙特利尔做一次根管治疗多少钱",AEO 就是让 ChatGPT 从您牙科诊所的网站中提取出"$800 到 $1,500",而不是汇总五家竞争对手的内容。

**90 天行动**: 上线上述四种 schema,每项服务撰写 15 条 FAQ。

### GEO: Generative Engine Optimization(生成式引擎优化)

GEO 就是让您的品牌在生成式 AI 的回答中被引用(ChatGPT、Perplexity、Claude、Gemini)。

这与排名不是一回事。ChatGPT 可以就您的行业给出精彩回答而完全不提您。GEO 就是让自己被点名的工作。

核心动作:
- Wikipedia 与 Wikidata 足迹
- 高 DA 引用密度(Yelp、BBB、Crunchbase、行业目录)
- 提及您名字的权威第三方内容
- 让其他网站反向引用您的原始数据或研究

GEO 比 AEO 更难,因为依赖第三方验证,不可能一夜速成。

**90 天行动**: 认领并完整填写您前 10 个高 DA 引用目标,拿下一次第三方提及,搭建 Wikidata。

### E-E-A-T: Experience(经验)、Expertise(专业)、Authoritativeness(权威)、Trust(可信)

E-E-A-T 是 Google 用来评估内容质量的标尺。如今 AI 引擎也用同一把尺子来决定引用谁。

四大支柱:
- **Experience**: 第一手证据。带 EXIF 数据的原创照片、真实的客户访谈、现场视频。
- **Expertise**: 资历。作者简介中包含真实资格,专业术语使用正确。
- **Authoritativeness**: 第三方背书。媒体提及、同行认可、奖项、行业引用。
- **Trust**: 技术与商业上的诚信。SSL、无失效链接、价格透明、真实评论而非作假。

E-E-A-T 是 2026 年 AI 搜索杠杆最大的信号。Google 在 2024 年围绕它重写了质量评估员指南。任何使用 Google 索引的 LLM 都继承了这套加权。

**90 天行动**: 给所有博客内容加上作者署名,发布一份原创研究,在 schema 中声明奖项与资历,修复技术信任信号(SSL、失效链接)。

## 它们如何配合

AEO 让您成为答案。GEO 让您被引用。E-E-A-T 决定谁配得上这两者。

您三者都需要。多数代理只卖其一,就当作齐活。我们在 Core 套餐里把三者全做。

如果想看自己在三者中各自的强弱,就跑一次 AI Visibility Audit。我们对每一项分别打分,让您清楚先修什么。`,
      },
    },
  },
  {
    slug: "google-ai-overviews-citation-gap-2027",
    title: "Google AI Overviews: the citation gap closing in 2027",
    excerpt:
      "Google's AI Overviews now answer 14% of queries without a click. By 2027 that number passes 30%. What that means if your local business depends on Google.",
    category: "google-search",
    language: "en",
    publishedAt: "2026-04-28T09:00:00-04:00",
    readingTimeMin: 5,
    author: "AiLys Agency",
    tags: ["google", "ai overviews", "future"],
    content: `## The zero-click query is here. Most local businesses are unprepared.

Google AI Overviews currently answer about 14% of all queries without sending a click to any source site. Internal projections we have seen from Google partners put that number at 30%+ by mid-2027.

If 30% of "dentist near me Montreal" queries get answered inside Google's interface without a click, the local business that does not appear in the AI Overview citation list has lost a third of its discovery traffic.

### Who gets cited inside AI Overviews

Google's AIO citation logic differs from classic search ranking. Three weighted signals dominate:

**Citation density across high-DA sources**: similar to ChatGPT, but Google weights its own properties (YouTube, Maps reviews, Knowledge Graph entries) more heavily.

**Schema completeness**: AIO needs to extract structured answers. If your site does not give it clean Schema.org markup, Google synthesizes from a competitor that does.

**Review velocity**: this is the surprise signal. Businesses adding 5+ reviews monthly outperform older businesses with more total reviews. Google interprets review velocity as "active business with current information."

### What changes between now and 2027

Three things to expect:

- AIO citation list expands from 3-5 sources to 8-10. More slots = more opportunities, but only for prepared businesses.
- Local pack and AIO merge. The current separation between "10 blue links + Map pack + AIO" collapses into a unified AI-first interface.
- Schema gets stricter. Google deprecates loose markup, requires more relations between entities (Service to LocalBusiness to Review).

### The work that future-proofs you

We are advising every Core and Growth tier client to:

- Ship the four core schemas (LocalBusiness, FAQ, Review, Service) with full entity relationships
- Run a monthly review contest to keep velocity above 5 reviews per location per month
- Build out Wikidata presence so you appear in Google's Knowledge Graph
- Publish quarterly "current state" content that AIO can cite as recent

This is exactly what the Autopilot tier delivers as a done-for-you bundle. Reviuzy SaaS handles the review velocity. Our team handles the schema and Wikidata work.

If you want to see your current AIO readiness score, run the audit.`,
    i18n: {
      fr: {
        title: "Google AI Overviews : l'écart de citation se referme en 2027",
        excerpt:
          "Les AI Overviews de Google répondent maintenant à 14 % des requêtes sans clic. D'ici 2027, ce chiffre dépasse 30 %. Ce que cela signifie si votre entreprise locale dépend de Google.",
        content: `## La requête zéro clic est arrivée. La plupart des entreprises locales ne sont pas prêtes.

Les Google AI Overviews répondent actuellement à environ 14 % de toutes les requêtes sans envoyer un seul clic vers un site source. Les projections internes que nous avons vues chez des partenaires Google placent ce chiffre à plus de 30 % d'ici la mi-2027.

Si 30 % des requêtes « dentiste près de moi Montréal » obtiennent leur réponse à l'intérieur de l'interface Google sans clic, l'entreprise locale qui n'apparaît pas dans la liste de citations de l'AI Overview a perdu un tiers de son trafic de découverte.

### Qui est cité dans les AI Overviews

La logique de citation des AIO diffère du classement de recherche classique. Trois signaux pondérés dominent :

**Densité de citations sur des sources à haute DA** : similaire à ChatGPT, mais Google donne plus de poids à ses propres propriétés (YouTube, avis Maps, fiches du Knowledge Graph).

**Complétude du schema** : les AIO doivent extraire des réponses structurées. Si votre site ne leur fournit pas un balisage Schema.org propre, Google synthétise depuis un concurrent qui le fait.

**Vélocité des avis** : voilà le signal surprise. Les entreprises qui ajoutent 5 avis ou plus par mois surperforment des entreprises plus anciennes avec plus d'avis au total. Google interprète la vélocité d'avis comme « entreprise active avec de l'information à jour ».

### Ce qui change d'ici 2027

Trois choses à attendre :

- La liste de citations AIO passe de 3 à 5 sources à 8 à 10. Plus de places égalent plus d'opportunités, mais seulement pour les entreprises préparées.
- Le local pack et les AIO fusionnent. La séparation actuelle entre « 10 liens bleus, Map pack et AIO » s'effondre en une interface unifiée à logique IA d'abord.
- Le schema devient plus strict. Google déprécie le balisage lâche, exige plus de relations entre entités (Service vers LocalBusiness vers Review).

### Le travail qui vous met à l'abri

Nous recommandons à chaque client Core et Growth de :

- Livrer les quatre schemas centraux (LocalBusiness, FAQ, Review, Service) avec relations d'entités complètes
- Mener un concours d'avis mensuel pour maintenir la vélocité au-dessus de 5 avis par emplacement par mois
- Bâtir une présence Wikidata pour apparaître dans le Knowledge Graph de Google
- Publier chaque trimestre du contenu « état actuel » que les AIO peuvent citer comme récent

C'est exactement ce que le forfait Autopilot livre comme ensemble clé en main. Reviuzy SaaS gère la vélocité d'avis. Notre équipe gère le schema et le travail Wikidata.

Si vous voulez voir votre score de préparation AIO actuel, lancez l'audit.`,
      },
      es: {
        title: "Google AI Overviews: la brecha de citación se cierra en 2027",
        excerpt:
          "Las AI Overviews de Google ya responden el 14 % de las consultas sin clic. Para 2027 ese número supera el 30 %. Qué significa si su negocio local depende de Google.",
        content: `## La consulta sin clic ya está aquí. La mayoría de los negocios locales no está preparada.

Los Google AI Overviews responden actualmente cerca del 14 % de todas las consultas sin enviar un clic a ningún sitio fuente. Las proyecciones internas que hemos visto en socios de Google ponen ese número por encima del 30 % a mediados de 2027.

Si el 30 % de las consultas "dentista cerca de mí Montreal" se contestan dentro de la interfaz de Google sin clic, el negocio local que no aparece en la lista de citas del AI Overview ha perdido un tercio de su tráfico de descubrimiento.

### Quién se cita dentro de los AI Overviews

La lógica de citación de los AIO de Google difiere del ranking de búsqueda clásico. Tres señales ponderadas dominan:

**Densidad de citas en fuentes de alta DA**: similar a ChatGPT, pero Google da más peso a sus propias propiedades (YouTube, reseñas de Maps, fichas del Knowledge Graph).

**Completitud del schema**: los AIO deben extraer respuestas estructuradas. Si su sitio no les entrega marcado Schema.org limpio, Google sintetiza desde un competidor que sí lo hace.

**Velocidad de reseñas**: esta es la señal sorpresa. Los negocios que suman 5 o más reseñas por mes superan a negocios más antiguos con más reseñas totales. Google interpreta la velocidad de reseñas como "negocio activo con información vigente".

### Qué cambia entre ahora y 2027

Tres cosas para esperar:

- La lista de citas AIO se amplía de 3-5 fuentes a 8-10. Más espacios igual a más oportunidades, pero solo para negocios preparados.
- El local pack y los AIO se fusionan. La separación actual entre "10 enlaces azules, Map pack y AIO" colapsa en una interfaz unificada con lógica IA primero.
- El schema se vuelve más estricto. Google retira el marcado flojo, exige más relaciones entre entidades (Service hacia LocalBusiness hacia Review).

### El trabajo que lo blinda a futuro

Estamos aconsejando a cada cliente de los planes Core y Growth:

- Lanzar los cuatro schemas base (LocalBusiness, FAQ, Review, Service) con relaciones de entidad completas
- Ejecutar un concurso mensual de reseñas para mantener la velocidad por encima de 5 reseñas por sucursal por mes
- Construir presencia en Wikidata para aparecer en el Knowledge Graph de Google
- Publicar cada trimestre contenido de "estado actual" que los AIO puedan citar como reciente

Eso es exactamente lo que entrega el plan Autopilot como paquete hecho por nosotros. Reviuzy SaaS maneja la velocidad de reseñas. Nuestro equipo maneja el trabajo de schema y Wikidata.

Si quiere ver su puntuación actual de preparación AIO, ejecute la auditoría.`,
      },
      zh: {
        title: "Google AI Overviews: 2027 年关闭的引用窗口",
        excerpt:
          "Google AI Overviews 现在已无点击地回答了 14% 的查询。到 2027 年这一比例将突破 30%。如果您的本地企业依赖 Google,这意味着什么。",
        content: `## 零点击查询已成现实,大多数本地企业并未准备好。

Google AI Overviews 目前在不向任何来源站点送出点击的情况下,回答了大约 14% 的所有查询。我们从 Google 合作伙伴看到的内部预测显示,到 2027 年中期这一数字将超过 30%。

如果 "dentist near me Montreal" 中有 30% 的查询都在 Google 界面内被无点击地回答,那么没有出现在 AI Overview 引用列表中的本地企业就已损失了三分之一的发现流量。

### 谁会在 AI Overviews 中被引用

Google 的 AIO 引用逻辑与经典搜索排名不同。三个加权信号占主导:

**高 DA 来源的引用密度**: 与 ChatGPT 相似,但 Google 对自家产品(YouTube、Maps 评论、Knowledge Graph 条目)给予更高权重。

**Schema 完整度**: AIO 需要提取结构化答案。如果您的站点没有给出干净的 Schema.org 标记,Google 就会从有标记的竞争对手处合成。

**评论速率**: 这是个出人意料的信号。每月新增 5 条以上评论的企业,表现优于评论总数更多但更老的企业。Google 把评论速率解读为"活跃企业、信息当前"。

### 从现在到 2027 年会发生什么变化

预计三件事:

- AIO 引用列表从 3 到 5 个来源扩展到 8 到 10 个。位置更多即机会更多,但只对有准备的企业开放。
- Local pack 与 AIO 合并。目前"10 条蓝色链接、Map pack 与 AIO"的分隔将坍缩为统一的 AI 优先界面。
- Schema 会变得更严格。Google 弃用松散标记,要求实体之间有更多关系(Service 到 LocalBusiness 到 Review)。

### 让您面向未来不掉队的工作

我们建议每位 Core 和 Growth 套餐客户:

- 上线四个核心 schema(LocalBusiness、FAQ、Review、Service),并建立完整实体关系
- 每月运行一次评论征集活动,把每个门店每月的评论速率维持在 5 条以上
- 拓展 Wikidata 存在感,让您出现在 Google Knowledge Graph 中
- 每季度发布一篇"现状"内容,以便 AIO 把它当作近期来源进行引用

这正是 Autopilot 套餐以全托管打包形式交付的内容。Reviuzy SaaS 处理评论速率。我们的团队处理 schema 和 Wikidata 工作。

想看您当前的 AIO 准备度评分,运行一下审计。`,
      },
    },
  },
];
