/**
 * Blog post page for AiLys non-English (translated) routes.
 *
 * HARD RULE: AiLys translations are 100% hand-authored and live alongside the
 * post module, typically as named exports `Content<Lang>` (a React component)
 * and `meta<Lang>` (an object with translated `title`, `metaDescription`,
 * `tldr`, `headings`, `faqItems`). Sister files like `<slug>.fr.tsx` are
 * also supported as long as the post module re-exports them.
 *
 * This page MUST NOT call any translation API at runtime or build time. If a
 * locale export is missing, we fall back to EN and show a small inline notice
 * so readers and editors know the translation has not been authored yet.
 */

import { useEffect, useMemo, useState, Suspense, type ComponentType } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ChevronRight, Clock, Calendar, Globe } from 'lucide-react'
import { getCategoryInfo } from '../categories'
import { BLOG_POSTS } from '../registry'
import type { BlogPostEntry, BlogFAQItem, BlogHeading } from '../types'
import { useLang } from '@/i18n/LangContext'
import {
  SUPPORTED_LANGS,
  LANG_LABELS,
  isRTL,
  type SupportedLang,
} from '@/i18n'
import { ReadingProgress } from './ReadingProgress'
import { BlogJsonLd } from './BlogJsonLd'
import { BlogFAQ } from './BlogFAQ'
import { BlogCTA } from './BlogCTA'
import { AuthorBio } from './AuthorBio'
import { RelatedPosts } from './RelatedPosts'
import { ShareButtons } from './ShareButtons'
import { TableOfContents } from './TableOfContents'
import { HreflangTags } from './HreflangTags'

const SITE_URL = 'https://www.ailysagency.ca'

/**
 * Shape of an optionally-translated post module. A post file can export any
 * subset of these. Anything missing falls back to EN. We do NOT validate or
 * fetch over the network: this is a synchronous lookup once the module loads.
 */
interface TranslatedMeta {
  title?: string
  metaDescription?: string
  tldr?: string
  headings?: BlogHeading[]
  faqItems?: BlogFAQItem[]
}

interface LoadedPostModule {
  Content: ComponentType
  // Per-locale Content components, e.g. ContentFr, ContentEs.
  [contentExport: `Content${string}`]: ComponentType | undefined
  // Per-locale meta objects, e.g. metaFr, metaEs.
  [metaExport: `meta${string}`]: TranslatedMeta | undefined
}

function capitalize(code: string): string {
  return code.charAt(0).toUpperCase() + code.slice(1).toLowerCase()
}

/** Notice strings shown when a translation is missing. */
const TODO_NOTE: Record<SupportedLang, string> = {
  en: 'Translation in progress',
  fr: 'Traduction en cours',
  es: 'Traducción en curso',
  zh: '翻译进行中',
  de: 'Übersetzung in Arbeit',
  ar: 'الترجمة قيد التنفيذ',
  hi: 'अनुवाद जारी है',
  it: 'Traduzione in corso',
  ja: '翻訳作業中',
  ko: '번역 진행 중',
  nl: 'Vertaling in uitvoering',
  pl: 'Tłumaczenie w toku',
  pt: 'Tradução em andamento',
  ru: 'Перевод выполняется',
  tr: 'Çeviri devam ediyor',
  vi: 'Đang dịch',
}

/** Per-locale UI strings used by the translated layout itself. */
interface BlogUiStrings {
  home: string
  blog: string
  readInEnglish: string
  min: string
  tldr: string
  verifiedBy: string
  researchTeam: string
  orgDescription: string
  relatedHeading: string
}

const UI_STRINGS: Record<SupportedLang, BlogUiStrings> = {
  en: { home: 'Home', blog: 'Journal', readInEnglish: 'Read in English', min: 'min read', tldr: 'TL;DR', verifiedBy: 'Verified by {{team}}', researchTeam: 'AiLys Research', orgDescription: 'The team building the AiLys engine and the Reviuzy SaaS, shipping the tooling that powers AI visibility audits, citation workflows, and reputation automation for local operators.', relatedHeading: 'You Might Also Like' },
  fr: { home: 'Accueil', blog: 'Journal', readInEnglish: 'Lire en anglais', min: 'min de lecture', tldr: 'En bref', verifiedBy: 'Verifie par {{team}}', researchTeam: 'AiLys Research', orgDescription: "L'equipe qui batit le moteur AiLys et le SaaS Reviuzy, livre l'outillage qui propulse les audits AI Visibility, les flux de citations et l'automatisation de reputation pour les operateurs locaux.", relatedHeading: 'Ces articles pourraient aussi vous plaire' },
  es: { home: 'Inicio', blog: 'Blog', readInEnglish: 'Leer en inglés', min: 'min de lectura', tldr: 'En resumen', verifiedBy: 'Verificado por {{team}}', researchTeam: 'AiLys Research', orgDescription: 'El equipo que construye el motor AiLys y el SaaS Reviuzy, entregando las herramientas que impulsan auditorías de visibilidad de IA, flujos de citas y automatización de reputación para operadores locales.', relatedHeading: 'También te podría interesar' },
  zh: { home: '首页', blog: '博客', readInEnglish: '阅读英文版', min: '分钟阅读', tldr: '摘要', verifiedBy: '由 {{team}} 验证', researchTeam: 'AiLys Research', orgDescription: '构建 AiLys 引擎和 Reviuzy SaaS 的团队，为本地经营者提供 AI 可见性审计、引用工作流和声誉自动化的工具。', relatedHeading: '你可能也喜欢' },
  de: { home: 'Startseite', blog: 'Journal', readInEnglish: 'Auf Englisch lesen', min: 'Min. Lesezeit', tldr: 'Kurz gesagt', verifiedBy: 'Verifiziert von {{team}}', researchTeam: 'AiLys Research', orgDescription: 'Das Team, das die AiLys-Engine und das Reviuzy SaaS aufbaut und Tools für KI-Sichtbarkeitsaudits, Zitations-Workflows und Reputationsautomatisierung für lokale Betreiber liefert.', relatedHeading: 'Das könnte dir auch gefallen' },
  ar: { home: 'الرئيسية', blog: 'المدونة', readInEnglish: 'اقرأ بالإنجليزية', min: 'دقيقة قراءة', tldr: 'باختصار', verifiedBy: 'تم التحقق بواسطة {{team}}', researchTeam: 'AiLys Research', orgDescription: 'الفريق الذي يبني محرك AiLys و Reviuzy SaaS، ويقدم الأدوات التي تشغل عمليات تدقيق الرؤية بالذكاء الاصطناعي وسير عمل الاستشهادات وأتمتة السمعة للمشغلين المحليين.', relatedHeading: 'قد يعجبك أيضًا' },
  hi: { home: 'होम', blog: 'ब्लॉग', readInEnglish: 'अंग्रेज़ी में पढ़ें', min: 'मिनट पठन', tldr: 'सारांश', verifiedBy: '{{team}} द्वारा सत्यापित', researchTeam: 'AiLys Research', orgDescription: 'AiLys इंजन और Reviuzy SaaS बनाने वाली टीम, जो स्थानीय संचालकों के लिए AI दृश्यता ऑडिट, उद्धरण वर्कफ़्लो और प्रतिष्ठा स्वचालन को शक्ति प्रदान करने वाले उपकरण प्रदान करती है।', relatedHeading: 'आपको ये भी पसंद आ सकते हैं' },
  it: { home: 'Home', blog: 'Journal', readInEnglish: 'Leggi in inglese', min: 'min di lettura', tldr: 'In breve', verifiedBy: 'Verificato da {{team}}', researchTeam: 'AiLys Research', orgDescription: "Il team che costruisce il motore AiLys e il SaaS Reviuzy, fornendo gli strumenti che alimentano audit di visibilità AI, flussi di citazioni e automazione della reputazione per gli operatori locali.", relatedHeading: 'Potrebbe interessarti anche' },
  ja: { home: 'ホーム', blog: 'ブログ', readInEnglish: '英語で読む', min: '分で読了', tldr: '要約', verifiedBy: '{{team}} により検証済み', researchTeam: 'AiLys Research', orgDescription: 'AiLys エンジンと Reviuzy SaaS を構築するチーム。ローカル事業者向けに AI 可視性監査、引用ワークフロー、評判自動化を支えるツールを提供しています。', relatedHeading: 'こちらもおすすめ' },
  ko: { home: '홈', blog: '블로그', readInEnglish: '영어로 읽기', min: '분 소요', tldr: '요약', verifiedBy: '{{team}} 인증됨', researchTeam: 'AiLys Research', orgDescription: 'AiLys 엔진과 Reviuzy SaaS를 구축하는 팀으로, 로컬 운영자를 위한 AI 가시성 감사, 인용 워크플로우 및 평판 자동화 도구를 제공합니다.', relatedHeading: '함께 보면 좋은 글' },
  nl: { home: 'Home', blog: 'Blog', readInEnglish: 'Lees in het Engels', min: 'min leestijd', tldr: 'Kort samengevat', verifiedBy: 'Geverifieerd door {{team}}', researchTeam: 'AiLys Research', orgDescription: 'Het team dat de AiLys-engine en de Reviuzy SaaS bouwt en de tooling levert voor AI-zichtbaarheidsaudits, citatieworkflows en reputatieautomatisering voor lokale ondernemers.', relatedHeading: 'Misschien vind je dit ook leuk' },
  pl: { home: 'Strona główna', blog: 'Blog', readInEnglish: 'Czytaj po angielsku', min: 'min czytania', tldr: 'W skrócie', verifiedBy: 'Zweryfikowane przez {{team}}', researchTeam: 'AiLys Research', orgDescription: 'Zespół budujący silnik AiLys i SaaS Reviuzy, dostarczający narzędzia napędzające audyty widoczności AI, przepływy cytowań i automatyzację reputacji dla lokalnych operatorów.', relatedHeading: 'Może Cię również zainteresować' },
  pt: { home: 'Início', blog: 'Blog', readInEnglish: 'Ler em inglês', min: 'min de leitura', tldr: 'Em resumo', verifiedBy: 'Verificado por {{team}}', researchTeam: 'AiLys Research', orgDescription: 'A equipe que constrói o motor AiLys e o SaaS Reviuzy, entregando as ferramentas que impulsionam auditorias de visibilidade de IA, fluxos de citações e automação de reputação para operadores locais.', relatedHeading: 'Você também pode gostar' },
  ru: { home: 'Главная', blog: 'Блог', readInEnglish: 'Читать на английском', min: 'мин чтения', tldr: 'Коротко', verifiedBy: 'Проверено {{team}}', researchTeam: 'AiLys Research', orgDescription: 'Команда, создающая движок AiLys и SaaS Reviuzy, поставляющая инструменты для аудитов видимости в ИИ, рабочих процессов цитирования и автоматизации репутации для локальных операторов.', relatedHeading: 'Вам также может понравиться' },
  tr: { home: 'Ana sayfa', blog: 'Blog', readInEnglish: 'İngilizce oku', min: 'dk okuma', tldr: 'Özet', verifiedBy: '{{team}} tarafından doğrulandı', researchTeam: 'AiLys Research', orgDescription: 'AiLys motorunu ve Reviuzy SaaS\'i geliştiren ekip; yerel işletmeciler için AI görünürlük denetimleri, alıntı iş akışları ve itibar otomasyonunu güçlendiren araçları sunar.', relatedHeading: 'Bunlar da ilgini çekebilir' },
  vi: { home: 'Trang chủ', blog: 'Blog', readInEnglish: 'Đọc bằng tiếng Anh', min: 'phút đọc', tldr: 'Tóm tắt', verifiedBy: 'Đã xác minh bởi {{team}}', researchTeam: 'AiLys Research', orgDescription: 'Đội ngũ xây dựng công cụ AiLys và Reviuzy SaaS, cung cấp công cụ hỗ trợ kiểm toán hiển thị AI, quy trình trích dẫn và tự động hóa danh tiếng cho các nhà điều hành địa phương.', relatedHeading: 'Bạn cũng có thể thích' },
}

function isSupportedLang(code: string | undefined): code is SupportedLang {
  return !!code && (SUPPORTED_LANGS as readonly string[]).includes(code)
}

export function TranslatedBlogPostPage() {
  const { lang, slug } = useParams<{ lang: string; slug: string }>()

  // Validate the URL locale segment. Any unknown / unsupported value redirects
  // to the EN canonical. EN itself never goes through this page.
  if (!isSupportedLang(lang) || lang === 'en') {
    return <Navigate to={slug ? `/blog/${slug}` : '/blog'} replace />
  }

  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) {
    return <Navigate to={`/${lang}/blog`} replace />
  }

  return <TranslatedPostContent post={post} lang={lang} />
}

function TranslatedPostContent({ post, lang }: { post: BlogPostEntry; lang: SupportedLang }) {
  const { setLang } = useLang()
  const [mod, setMod] = useState<LoadedPostModule | null>(null)

  // Keep the global app locale in sync with the URL prefix so other
  // language-aware UI (nav, footer, CTAs) renders in the right language.
  useEffect(() => {
    setLang(lang)
  }, [lang, setLang])

  const ui = UI_STRINGS[lang] || UI_STRINGS.en
  const todoNote = TODO_NOTE[lang] || TODO_NOTE.en
  const dir = isRTL(lang) ? 'rtl' : 'ltr'
  const category = getCategoryInfo(post.category)

  // Load the post module. Hand-authored locale exports live on the same module
  // (no network, no API). We re-cast to LoadedPostModule because the registry
  // type narrows the public surface to just `Content`.
  useEffect(() => {
    let cancelled = false
    post.load().then((loaded) => {
      if (!cancelled) setMod(loaded as LoadedPostModule)
    })
    return () => {
      cancelled = true
    }
  }, [post])

  // Pick the locale-specific Content component if it exists, else EN.
  const localeContent = useMemo<{ Content: ComponentType | null; usedFallback: boolean }>(() => {
    if (!mod) return { Content: null, usedFallback: false }
    const key = `Content${capitalize(lang)}` as keyof LoadedPostModule
    const Localized = mod[key] as ComponentType | undefined
    if (Localized) return { Content: Localized, usedFallback: false }
    return { Content: mod.Content, usedFallback: true }
  }, [mod, lang])

  // Pick the locale-specific meta object if present, then merge over the EN
  // metadata field-by-field so a partial translation still shows correctly.
  const localeMeta = useMemo<TranslatedMeta>(() => {
    if (!mod) return {}
    const key = `meta${capitalize(lang)}` as keyof LoadedPostModule
    const m = mod[key] as TranslatedMeta | undefined
    return m || {}
  }, [mod, lang])

  const title = localeMeta.title || post.title
  const description = localeMeta.metaDescription || post.metaDescription
  const tldr = localeMeta.tldr || post.tldr
  const faqItems = localeMeta.faqItems || post.faqItems
  const headings = localeMeta.headings || post.headings

  const formattedDate = useMemo(() => {
    const localeForFormat = lang === 'zh' ? 'zh-Hans' : lang === 'fr' ? 'fr-CA' : lang
    try {
      return new Date(post.publishedDate).toLocaleDateString(localeForFormat, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    } catch {
      return post.publishedDate
    }
  }, [post.publishedDate, lang])

  const ogImageUrl = `${SITE_URL}/blog-images/og/${post.slug}.png`
  const postUrl = `${SITE_URL}/${lang}/blog/${post.slug}`
  const ogLocale = lang === 'fr' ? 'fr_CA' : lang === 'zh' ? 'zh_CN' : lang
  const Content = localeContent.Content
  const usedEnglishFallback = localeContent.usedFallback

  return (
    <div className="min-h-screen bg-[#0a0e1a]" dir={dir}>
      <Helmet>
        <html lang={lang} dir={dir} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={postUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta property="article:published_time" content={`${post.publishedDate}T00:00:00Z`} />
        {post.updatedDate && (
          <meta property="article:modified_time" content={`${post.updatedDate}T00:00:00Z`} />
        )}
        <meta property="article:author" content={SITE_URL} />
        <meta property="article:section" content={category?.label || 'AI Visibility'} />
      </Helmet>

      <ReadingProgress />
      <BlogJsonLd post={{ ...post, title, metaDescription: description }} lang={lang} />
      <HreflangTags slug={post.slug} />

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Language notice banner */}
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-4 py-2 text-sm text-cyan-300">
          <Globe className="h-4 w-4 shrink-0" />
          <span>{LANG_LABELS[lang]}</span>
          <span className="text-white/30 mx-1">·</span>
          <Link
            to={`/blog/${post.slug}`}
            className="text-white/50 hover:text-white/70 transition-colors"
          >
            {ui.readInEnglish}
          </Link>
        </div>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-white/40 mb-8 flex-wrap">
          <Link to={`/${lang}`} className="hover:text-white/70 transition-colors">
            {ui.home}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to={`/${lang}/blog`} className="hover:text-white/70 transition-colors">
            {ui.blog}
          </Link>
          {category && (
            <>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link
                to={`/${lang}/blog/category/${post.category}`}
                className="hover:text-white/70 transition-colors"
              >
                {category.label}
              </Link>
            </>
          )}
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white/60 line-clamp-1">{title}</span>
        </nav>

        {/* Header */}
        <header className="max-w-3xl">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl leading-tight">
            {title}
          </h1>

          <div className="mt-6 flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-magenta-500 text-sm font-bold text-white">
                {post.author.avatarInitials}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{post.author.name}</p>
                <p className="text-xs text-white/40">{post.author.role}</p>
              </div>
            </div>

            <span className="h-5 w-px bg-white/10" />

            <span className="inline-flex items-center gap-1.5 text-sm text-white/50">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={post.publishedDate}>{formattedDate}</time>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
              <Clock className="h-3 w-3" />
              {post.readTimeMinutes} {ui.min}
            </span>

            <div className="ml-auto">
              <ShareButtons url={postUrl} title={title} />
            </div>
          </div>
        </header>

        {/* TL;DR */}
        <div className="mt-8 max-w-3xl rounded-2xl border border-white/10 border-l-4 border-l-cyan-500 bg-white/[0.02] backdrop-blur-sm p-5">
          <p className="text-sm font-semibold text-cyan-400 mb-1">{ui.tldr}</p>
          <p className="text-white/70 italic leading-relaxed">{tldr}</p>
        </div>

        {/* Hero image */}
        <div className="mt-8 max-w-3xl overflow-hidden rounded-2xl">
          <img
            src={post.images.hero}
            alt={title}
            className="w-full object-cover"
            loading="eager"
            decoding="async"
            width={1200}
            height={675}
            style={{ aspectRatio: '16/9' }}
            fetchPriority="high"
          />
        </div>

        {/* Body and ToC layout */}
        <div className="mt-10 flex gap-8">
          <article className="prose-blog min-w-0 max-w-3xl flex-1">
            {usedEnglishFallback && (
              <>
                <div className="mb-6 flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-sm text-amber-200/90">
                  <Globe className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    {`This post is not yet translated to ${LANG_LABELS[lang]}. Showing the English version below.`}
                  </span>
                </div>
                <div className="text-xs text-white/40">{todoNote}</div>
              </>
            )}
            {Content ? (
              <Suspense
                fallback={
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 w-3/4 rounded bg-white/10" />
                    <div className="h-4 w-full rounded bg-white/10" />
                    <div className="h-4 w-5/6 rounded bg-white/10" />
                  </div>
                }
              >
                <Content />
              </Suspense>
            ) : (
              <div className="animate-pulse space-y-4">
                <div className="h-4 w-3/4 rounded bg-white/10" />
                <div className="h-4 w-full rounded bg-white/10" />
                <div className="h-4 w-5/6 rounded bg-white/10" />
              </div>
            )}
          </article>

          {headings.length > 0 && (
            <aside className="hidden lg:block w-64 shrink-0">
              <TableOfContents headings={headings} />
            </aside>
          )}
        </div>

        {headings.length > 0 && (
          <div className="lg:hidden">
            <TableOfContents headings={headings} />
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 max-w-3xl">
          <BlogCTA />
        </div>

        {/* FAQ */}
        {faqItems.length > 0 && (
          <div className="max-w-3xl">
            <BlogFAQ items={faqItems} />
          </div>
        )}

        {/* Author */}
        <div className="max-w-3xl">
          <AuthorBio
            author={post.author}
            translatedVerifiedBy={ui.verifiedBy}
            translatedResearchTeam={ui.researchTeam}
            translatedOrgDescription={ui.orgDescription}
          />
        </div>

        {/* Related */}
        {post.relatedSlugs.length > 0 && (
          <RelatedPosts
            relatedSlugs={post.relatedSlugs}
            langPrefix={`/${lang}`}
            translatedHeading={ui.relatedHeading}
            lang={lang}
          />
        )}
      </div>
    </div>
  )
}
