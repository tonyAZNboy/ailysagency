// Sync methodology + FAQ + about strings that were updated in EN canonical
// when we removed the active-link-building scope. The 11 keys cover:
//   - step5Short / step5Detail / step5Signal (methodology section 5: GEO)
//   - svc5Desc / svc8Desc (pricing builder service descs)
//   - d5Body (citations vs link-building disclosure)
//   - phase3Body (about: how we deliver)
//   - body3 (about: classical SEO + entity authority)
//   - q3 / a3 (FAQ: do you do Reddit?)
//   - a5 (FAQ: what is GEO?)
//
// Translated to the 5 MAJOR locales (FR-CA + ES + ZH + AR + RU). The 10
// secondaries (DE/HI/IT/JA/KO/NL/PL/PT/TR/VI) fall back to EN until a
// future pass — acceptable per CLAUDE.md hard rule #8 which gates on
// MAJOR completeness.
//
// Brand names + acronyms (AiLys, Reviuzy, ChatGPT, Perplexity, Claude,
// Gemini, GBP, NFC, AEO, GEO, E-E-A-T, NAP, Wikidata, Yelp, BBB,
// Crunchbase, Avvo, Healthgrades, OpenTable, Reddit, Wikipedia) stay
// Latin per CLAUDE.md hard rule #4.
//
// 11 keys × 5 locales = 55 strings.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANS_DIR = path.resolve(__dirname, "../src/i18n/translations");
const TMP = path.resolve(__dirname, "../node_modules/.cache/i18n-meth-faq");
await mkdir(TMP, { recursive: true });

async function load(file) {
  const code = await readFile(path.join(TRANS_DIR, file), "utf8");
  const stripped = code
    .replace(/export const (\w+) =/g, "export const $1 =")
    .replace(/export type \w+\s*=[^;]+;/g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/as const/g, "")
    .replace(/:\s*[A-Z][\w<>[\]| ]+(\[\])?\s*=/g, " =");
  const tmp = path.join(TMP, file.replace(".ts", ".mjs"));
  await writeFile(tmp, stripped, "utf8");
  const url = `file://${tmp.replace(/\\/g, "/")}?t=${Date.now()}`;
  const mod = await import(url);
  const m = code.match(/export const (\w+)\s*=/);
  return { name: m[1], obj: mod[m[1]] };
}

const VALID_KEY = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
const serializeKey = (k) => (VALID_KEY.test(k) ? k : JSON.stringify(k));
function serialize(value, indent = "  ", depth = 1) {
  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return `[${value.map((v) => serialize(v, indent, depth + 1)).join(", ")}]`;
  if (typeof value === "object") {
    const pad = indent.repeat(depth);
    const padClose = indent.repeat(depth - 1);
    const lines = Object.entries(value).map(
      ([k, v]) => `${pad}${serializeKey(k)}: ${serialize(v, indent, depth + 1)},`,
    );
    return `{\n${lines.join("\n")}\n${padClose}}`;
  }
  throw new Error(`Cannot serialize ${typeof value}`);
}

// Each entry is namespaced: methodology.* | services.* | pricingBuilder.* | about.* | faq.*
// We split namespace into the structure when assigning.

const TRANSLATIONS = {
  fr: {
    methodology: {
      step5Short: "Données structurées Wikidata + graphe d'entité",
      step5Detail: "ChatGPT, Perplexity et Claude pondèrent fortement les graphes de connaissances structurés. Nous construisons des entrées Wikidata vérifiables avec les bons identifiants externes (Google Place ID, Yelp ID, GBP CID, site web, fondateur, date de fondation) pour que le corpus LLM ait une seule entité canonique pour votre commerce. Nous ne menons pas de campagnes de démarchage actif ni de presse payée ; le graphe d'entité est lui-même le signal.",
      step5Signal: "Q-number Wikidata · 8+ IDs externes liés · entité stable sur 90 jours",
    },
    pricingBuilder: {
      svc5Desc: "Cadence de citations agressive, NAP-cohérent partout.",
      svc8Desc: "Données structurées Wikidata + signaux de graphe d'entité.",
    },
    services: {
      d5Body: "La construction de citations est un effort de soumission vérifiée. Cinq citations à haut DA par mois en Core, dix en Growth, quinze en Agency. Chacune demande recherche, normalisation NAP et vérification spécifique à l'annuaire (carte postale, téléphone, courriel). La différence de coût reflète ces heures.",
    },
    process: {
      phase3Body: "Implémentation de schema, construction de citations, optimisation GBP, production de contenu, travail d'entité Wikidata. Bilingue où ça compte. On fait le travail, vous gardez votre journée.",
    },
    about: {
      body3: "Nous sommes nés d'une discipline SEO classique appliquée à l'ère de la recherche IA, pas l'inverse. Chaque plan que nous livrons est bâti sur la même fondation qui fonctionnait pour Google en 2010 et fonctionne encore en 2026 : SEO technique propre, Google Business Profile complet, cohérence NAP, citations sur des sources de haute autorité. Sur cette fondation, nous ajoutons le travail AEO, GEO et E-E-A-T accordé à l'ère LLM, plus le travail d'entité Wikidata qui donne aux LLM une entrée canonique de graphe de connaissances pour votre commerce. Le link-building actif n'est pas notre service : on fait l'autorité d'entité à la place.",
    },
    faq: {
      q3: "Faites-vous de la participation Reddit et forums ?",
      a3: "Nous surveillons les principaux subreddits et forums de votre industrie pour les mentions de marque et la visibilité concurrentielle, mais nous n'opérons pas de campagnes de participation active en votre nom. La voix authentique sur Reddit ne peut pas être externalisée ou bottée, parce que Reddit la détecte et parce que le compromis sur le karma est trop fragile. Si vous voulez participer vous-même, nous fournissons un guide du centre d'aide expliquant comment faire sans vous faire bannir.",
      a5: "Generative Engine Optimization. Nous faisons en sorte que votre marque soit nommée à l'intérieur des vraies réponses de ChatGPT, Perplexity, Claude et Gemini. Le travail consiste en données structurées Wikidata avec les bons identifiants externes, citations sur des annuaires haute autorité, couches de schema (LocalBusiness, Service, FAQPage, Person), et contenu accordé pour E-E-A-T. Nous ne menons pas de campagnes de PR digitale payée ni de link-building actif. Dépend des fondations SEO classiques (SEO technique propre, GBP complet, cohérence NAP) pour être efficace.",
    },
  },
  es: {
    methodology: {
      step5Short: "Datos estructurados Wikidata + grafo de entidades",
      step5Detail: "ChatGPT, Perplexity y Claude ponderan fuertemente los grafos de conocimiento estructurados. Construimos entradas Wikidata verificables con los IDs externos correctos (Google Place ID, Yelp ID, GBP CID, sitio web, fundador, fecha de fundación) para que el corpus LLM tenga una única entidad canónica para tu negocio. No realizamos campañas de outreach activo ni prensa pagada; el grafo de entidades es la señal en sí mismo.",
      step5Signal: "Q-number Wikidata · 8+ IDs externos vinculados · entidad estable en 90 días",
    },
    pricingBuilder: {
      svc5Desc: "Ritmo agresivo de citaciones, NAP consistente en todo.",
      svc8Desc: "Datos estructurados Wikidata + señales de grafo de entidades.",
    },
    services: {
      d5Body: "La construcción de citaciones es un esfuerzo de directorio verificado. Cinco citaciones de alto DA por mes en Core, diez en Growth, quince en Agency. Cada una requiere investigación, normalización de NAP y verificación específica del listado (postal, teléfono, correo). La diferencia de costo refleja esas horas.",
    },
    process: {
      phase3Body: "Implementación de schema, construcción de citaciones, optimización GBP, producción de contenido, trabajo de entidad Wikidata. Bilingüe donde importa. Nosotros hacemos el trabajo, tú mantienes tu día.",
    },
    about: {
      body3: "Crecimos a partir de la disciplina SEO clásica aplicada a la era de búsqueda IA, no al revés. Cada plan que entregamos está construido sobre la misma base que funcionó para Google en 2010 y sigue funcionando en 2026: SEO técnico limpio, Google Business Profile completo, consistencia NAP, citaciones en fuentes de alta autoridad. Sobre esa base agregamos trabajo AEO, GEO y E-E-A-T ajustado a la era LLM, más trabajo de entidad Wikidata que le da a los LLM una entrada canónica de grafo de conocimiento para tu negocio. El link-building activo no es nuestro servicio: hacemos autoridad de entidad en su lugar.",
    },
    faq: {
      q3: "¿Hacen participación en Reddit y foros?",
      a3: "Monitoreamos los subreddits y foros principales de tu industria para menciones de marca y visibilidad competitiva, pero no operamos campañas de participación activa en tu nombre. La voz auténtica en Reddit no puede subcontratarse o automatizarse, tanto porque Reddit lo detecta como porque el equilibrio de karma es demasiado frágil. Si quieres participar tú mismo, proveemos una guía del centro de ayuda que explica cómo hacerlo sin que te baneen.",
      a5: "Generative Engine Optimization. Hacemos que tu marca sea nombrada dentro de las respuestas reales de ChatGPT, Perplexity, Claude y Gemini. El trabajo consiste en datos estructurados Wikidata con los IDs externos correctos, citaciones en directorios de alta autoridad, capas de schema (LocalBusiness, Service, FAQPage, Person) y contenido ajustado para E-E-A-T. No realizamos campañas de PR digital pagada ni link-building activo. Depende de bases SEO clásicas (SEO técnico limpio, GBP completo, consistencia NAP) para ser efectivo.",
    },
  },
  zh: {
    methodology: {
      step5Short: "Wikidata 结构化数据 + 实体图谱",
      step5Detail: "ChatGPT、Perplexity 和 Claude 高度重视结构化知识图谱。我们构建可验证的 Wikidata 条目,带有正确的外部 ID(Google Place ID、Yelp ID、GBP CID、网站、创始人、成立日期),让 LLM 语料库拥有您业务的单一规范实体。我们不进行主动外联活动或付费公关;实体图谱本身就是信号。",
      step5Signal: "Wikidata Q-number · 8+ 外部 ID 链接 · 90 天稳定实体",
    },
    pricingBuilder: {
      svc5Desc: "积极的引用节奏,全面 NAP 一致。",
      svc8Desc: "Wikidata 结构化数据 + 实体图谱信号。",
    },
    services: {
      d5Body: "引用建设是已验证目录的工作。Core 每月五个高 DA 引用,Growth 十个,Agency 十五个。每个都需要研究、NAP 标准化和列表特定的验证(明信片、电话、电子邮件)。成本差异反映这些工时。",
    },
    process: {
      phase3Body: "Schema 实施、引用建设、GBP 优化、内容制作、Wikidata 实体工作。在重要的地方双语。我们做工作,您保留您的日子。",
    },
    about: {
      body3: "我们从应用于 AI 搜索时代的经典 SEO 学科中成长起来,而不是反过来。我们交付的每个计划都建立在 2010 年对 Google 有效、2026 年仍然有效的同一基础上:干净的技术 SEO、完整的 Google Business Profile、NAP 一致性、来自高权威来源的引用。在该基础之上,我们添加针对 LLM 时代调整的 AEO、GEO 和 E-E-A-T 工作,以及为 LLM 提供您业务规范知识图谱条目的 Wikidata 实体工作。主动链接建设不是我们的服务:我们做实体权威。",
    },
    faq: {
      q3: "你们做 Reddit 和论坛参与吗?",
      a3: "我们监控您行业中顶级的 subreddits 和论坛以发现品牌提及和竞争对手可见性,但我们不代表您运行主动参与活动。Reddit 上真实的声音无法外包或机器人化,因为 Reddit 会检测到,也因为 karma 权衡太脆弱。如果您想自己参与,我们提供一个帮助中心剧本,解释如何在不被封禁的情况下做到这一点。",
      a5: "Generative Engine Optimization。我们让您的品牌出现在 ChatGPT、Perplexity、Claude 和 Gemini 的实际响应中。工作包括带有正确外部 ID 的 Wikidata 结构化数据、高权威目录上的引用、schema 层(LocalBusiness、Service、FAQPage、Person)以及为 E-E-A-T 调整的内容。我们不运行付费数字 PR 或主动链接建设活动。需要依赖经典 SEO 基础(干净的技术 SEO、完整的 GBP、NAP 一致性)才能有效。",
    },
  },
  ar: {
    methodology: {
      step5Short: "بيانات Wikidata المنظَّمة + رسم الكيانات",
      step5Detail: "ChatGPT و Perplexity و Claude يعطون وزنًا كبيرًا لرسوم المعرفة المنظَّمة. نبني إدخالات Wikidata قابلة للتحقق بمعرفات خارجية صحيحة (Google Place ID و Yelp ID و GBP CID والموقع والمؤسس وتاريخ التأسيس) ليكون لدى مكتبة LLM كيان قانوني واحد لعملك. لا نُجري حملات تواصل نشطة أو علاقات عامة مدفوعة ; رسم الكيانات نفسه هو الإشارة.",
      step5Signal: "Q-number في Wikidata · 8+ معرف خارجي مرتبط · كيان مستقر على مدى 90 يومًا",
    },
    pricingBuilder: {
      svc5Desc: "وتيرة اقتباسات قوية، NAP متسق في كل مكان.",
      svc8Desc: "بيانات Wikidata منظَّمة + إشارات رسم الكيانات.",
    },
    services: {
      d5Body: "بناء الاقتباسات هو جهد دليل مُتحقَّق منه. خمسة اقتباسات بـ DA عالٍ شهريًا في Core، عشرة في Growth، خمسة عشر في Agency. كل واحدة تتطلب بحثًا، وتطبيع NAP، وتحققًا خاصًا بالقائمة (بطاقة بريدية، هاتف، بريد). فرق التكلفة يعكس هذه الساعات.",
    },
    process: {
      phase3Body: "تنفيذ Schema، بناء الاقتباسات، تحسين GBP، إنتاج المحتوى، عمل كيان Wikidata. ثنائي اللغة حيث يهم. نحن نقوم بالعمل، أنت تحتفظ بيومك.",
    },
    about: {
      body3: "خرجنا من انضباط SEO الكلاسيكي المُطبَّق على عصر البحث بالذكاء الاصطناعي، وليس العكس. كل خطة نقدمها مبنية على نفس الأساس الذي عمل لـ Google في 2010 وما زال يعمل في 2026 : SEO تقني نظيف، Google Business Profile كامل، اتساق NAP، اقتباسات عبر مصادر عالية السلطة. فوق هذا الأساس، نضيف عمل AEO و GEO و E-E-A-T مُكيَّفًا لعصر LLM، إضافة إلى عمل كيان Wikidata الذي يمنح LLMs إدخال رسم معرفة قانوني لعملك. بناء الروابط النشط ليس خدمتنا : نقوم بسلطة الكيان بدلاً من ذلك.",
    },
    faq: {
      q3: "هل تقومون بالمشاركة على Reddit والمنتديات ؟",
      a3: "نراقب أهم subreddits ومنتديات صناعتك لرصد ذكر العلامة التجارية ورؤية المنافسين، لكننا لا نُدير حملات مشاركة نشطة نيابة عنك. لا يمكن إسناد الصوت الأصيل على Reddit أو أتمتته، لأن Reddit يكتشف ذلك ولأن مقايضة الكارما هشّة جدًا. إن أردت المشاركة بنفسك، نوفر دليلًا في مركز المساعدة يشرح كيفية القيام بذلك دون التعرض للحظر.",
      a5: "Generative Engine Optimization. نجعل علامتك تُذكر داخل الردود الفعلية لـ ChatGPT و Perplexity و Claude و Gemini. العمل هو بيانات Wikidata منظَّمة بمعرفات خارجية صحيحة، اقتباسات على أدلة عالية السلطة، طبقات Schema (LocalBusiness و Service و FAQPage و Person)، ومحتوى مُكيَّف لـ E-E-A-T. لا نُجري حملات PR رقمية مدفوعة أو بناء روابط نشط. يعتمد على أسس SEO الكلاسيكية (SEO تقني نظيف، GBP كامل، اتساق NAP) ليكون فعالًا.",
    },
  },
  ru: {
    methodology: {
      step5Short: "Структурированные данные Wikidata + граф сущностей",
      step5Detail: "ChatGPT, Perplexity и Claude сильно учитывают структурированные графы знаний. Мы создаём проверяемые записи Wikidata с правильными внешними ID (Google Place ID, Yelp ID, GBP CID, сайт, основатель, дата основания), чтобы корпус LLM имел единую каноническую сущность для вашего бизнеса. Мы не проводим активных кампаний по информированию или платных PR ; сам граф сущностей и есть сигнал.",
      step5Signal: "Wikidata Q-number · 8+ внешних ID связано · стабильная сущность за 90 дней",
    },
    pricingBuilder: {
      svc5Desc: "Агрессивный темп цитирований, NAP-согласованный везде.",
      svc8Desc: "Структурированные данные Wikidata + сигналы графа сущностей.",
    },
    services: {
      d5Body: "Построение цитирований — это работа с проверенными каталогами. Пять высокоавторитетных цитирований в месяц на Core, десять на Growth, пятнадцать на Agency. Каждое требует исследования, нормализации NAP и специфической верификации (открытка, телефон, email). Разница в цене отражает эти часы.",
    },
    process: {
      phase3Body: "Внедрение schema, построение цитирований, оптимизация GBP, производство контента, работа с сущностью Wikidata. Двуязычно там, где это важно. Мы делаем работу, вы сохраняете свой день.",
    },
    about: {
      body3: "Мы выросли из дисциплины классического SEO, применённой к эре AI-поиска, а не наоборот. Каждый план, который мы поставляем, построен на том же фундаменте, который работал для Google в 2010 году и работает в 2026 : чистое техническое SEO, полный Google Business Profile, NAP-согласованность, цитирования на высокоавторитетных источниках. На этой основе мы добавляем работу AEO, GEO и E-E-A-T, настроенную под LLM-эпоху, плюс работу с сущностью Wikidata, которая даёт LLM каноническую запись графа знаний для вашего бизнеса. Активный линкбилдинг — не наша услуга : мы делаем авторитет сущности вместо этого.",
    },
    faq: {
      q3: "Делаете ли вы участие на Reddit и форумах ?",
      a3: "Мы мониторим топ-subreddits и форумы вашей индустрии на предмет упоминаний бренда и видимости конкурентов, но мы не ведём активные кампании участия от вашего имени. Аутентичный голос на Reddit нельзя отдать на аутсорс или ботам, потому что Reddit это обнаруживает и потому что компромисс по карме слишком хрупок. Если хотите участвовать сами, мы предоставляем руководство в центре помощи, как делать это без бана.",
      a5: "Generative Engine Optimization. Мы делаем так, чтобы ваш бренд назывался внутри фактических ответов ChatGPT, Perplexity, Claude и Gemini. Работа включает структурированные данные Wikidata с правильными внешними ID, цитирования на высокоавторитетных каталогах, слои schema (LocalBusiness, Service, FAQPage, Person) и контент, настроенный под E-E-A-T. Мы не ведём платные digital PR и активные кампании линкбилдинга. Зависит от классических SEO-основ (чистое техническое SEO, полный GBP, NAP-согласованность) для эффективности.",
    },
  },
};

let total = 0;
for (const [locale, namespaces] of Object.entries(TRANSLATIONS)) {
  const file = `${locale}.ts`;
  const { name, obj } = await load(file);
  for (const [ns, entries] of Object.entries(namespaces)) {
    if (!obj[ns]) obj[ns] = {};
    for (const [key, value] of Object.entries(entries)) {
      obj[ns][key] = value;
      total++;
    }
  }
  const out = `export const ${name} = ${serialize(obj)};\n`;
  await writeFile(path.join(TRANS_DIR, file), out, "utf8");
  console.log(`  ${file}: 11 keys across 5 namespaces`);
}
console.log(`\nTotal: ${total} strings updated.`);
