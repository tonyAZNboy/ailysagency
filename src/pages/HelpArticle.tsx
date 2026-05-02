import { useEffect, useMemo } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowUpRight, Clock, Calendar } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { NetworkBackground } from "@/components/backgrounds/NetworkBackground";
import { Button } from "@/components/ui/button";
import { ReadingProgress } from "@/components/article/ReadingProgress";
import { TableOfContents } from "@/components/article/TableOfContents";
import { ShareButtons } from "@/components/article/ShareButtons";
import {
  helpArticles,
  HELP_CATEGORY_META,
  type HelpArticle as HelpArticleT,
} from "@/data/help-articles";

/* Slug-first lang detection. LangContext re-detects lang only on initial
   mount, so client-side nav from `/blog/...` to `/fr/help/...` would keep
   lang='en' and the FR i18n strings on the article would never render.
   Phase E.19 narrow fix: read lang directly from pathname, same pattern
   as BlogPostPage.tsx (Phase E.18 PR #35). LangContext root-cause fix
   tracked as a separate ticket. */
function detectLangFromPath(pathname: string): string {
  if (pathname.startsWith("/fr")) return "fr";
  if (pathname.startsWith("/vi")) return "vi";
  if (pathname.startsWith("/es")) return "es";
  if (pathname.startsWith("/zh")) return "zh";
  if (pathname.startsWith("/ar")) return "ar";
  if (pathname.startsWith("/ru")) return "ru";
  return "en";
}

export function localizeArticle(a: HelpArticleT, lang: string): HelpArticleT {
  if (lang === "en") return a;
  /* Mixed-convention lookup: existing data ships some articles with key
     `fr` and some with `fr-ca` (5 of 47 currently). Try the bare lang
     first, then the regional variant so both conventions resolve. */
  const t = a.i18n?.[lang] ?? a.i18n?.[`${lang}-ca`];
  if (!t) return a;
  return {
    ...a,
    title: t.title ?? a.title,
    excerpt: t.excerpt ?? a.excerpt,
    body: t.body ?? a.body,
  };
}

export default function HelpArticle() {
  const { slug } = useParams<{ slug: string }>();
  const { pathname } = useLocation();
  const lang = detectLangFromPath(pathname);
  const navigate = useNavigate();

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-force-dark", "true");
    root.classList.add("dark");
    return () => root.removeAttribute("data-force-dark");
  }, []);

  const article = useMemo(() => {
    const raw = helpArticles.find((a) => a.slug === slug);
    return raw ? localizeArticle(raw, lang) : undefined;
  }, [slug, lang]);

  const related = useMemo(() => {
    if (!article) return [];
    return helpArticles
      .filter((a) => a.slug !== article.slug && a.category === article.category)
      .map((a) => localizeArticle(a, lang))
      .slice(0, 3);
  }, [article, lang]);

  // react-helmet-async v2 strips inline <script> children silently. Inject
  // BreadcrumbList + TechArticle JSON-LD directly into document.head.
  // Hook must run BEFORE the early return below (rules-of-hooks).
  useEffect(() => {
    if (!article) return;
    const meta = HELP_CATEGORY_META[article.category];
    const inLanguage = lang === "fr" ? "fr-CA" : "en-CA";
    const homeUrl = lang === "en" ? "https://www.ailysagency.ca/" : `https://www.ailysagency.ca/${lang}/`;
    const helpUrl = lang === "en" ? "https://www.ailysagency.ca/help" : `https://www.ailysagency.ca/${lang}/help`;
    const articleUrl = lang === "en"
      ? `https://www.ailysagency.ca/help/${article.slug}`
      : `https://www.ailysagency.ca/${lang}/help/${article.slug}`;
    const homeLabel = lang === "fr" ? "Accueil" : "Home";
    const helpLabel = lang === "fr" ? "Aide" : "Help";

    const tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.setAttribute("data-page-jsonld", "1");
    tag.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: homeLabel, item: homeUrl },
            { "@type": "ListItem", position: 2, name: helpLabel, item: helpUrl },
            { "@type": "ListItem", position: 3, name: meta.label, item: `${helpUrl}#${article.category}` },
            { "@type": "ListItem", position: 4, name: article.title, item: articleUrl },
          ],
        },
        {
          "@type": "TechArticle",
          "@id": `${articleUrl}#article`,
          headline: article.title,
          description: article.excerpt,
          datePublished: article.updatedAt,
          dateModified: article.updatedAt,
          wordCount: article.body.split(/\s+/).length,
          inLanguage,
          articleSection: meta.label,
          proficiencyLevel: "Beginner",
          author: { "@id": "https://www.ailysagency.ca/#organization" },
          publisher: { "@id": "https://www.ailysagency.ca/#organization" },
          mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: ["h1", ".prose p:first-of-type"],
          },
        },
      ],
    });
    document.head.appendChild(tag);
    return () => {
      tag.parentNode?.removeChild(tag);
    };
  }, [article, lang]);

  if (!article) {
    const helpRoot = lang === "en" ? "/help" : `/${lang}/help`;
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="font-display text-5xl mb-3">
              {lang === "fr" ? "Article introuvable" : "Article not found"}
            </h1>
            <Button onClick={() => navigate(helpRoot)}>
              {lang === "fr" ? "Retour au centre d'aide" : "Back to Help center"}
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const meta = HELP_CATEGORY_META[article.category];
  const helpRoot = lang === "en" ? "/help" : `/${lang}/help`;
  const articleHrefBase = lang === "en" ? "/help" : `/${lang}/help`;
  const inLanguage = lang === "fr" ? "fr-CA" : "en-CA";
  const ogLocale = lang === "fr" ? "fr_CA" : "en_US";
  const homeUrl = lang === "en"
    ? "https://www.ailysagency.ca/"
    : `https://www.ailysagency.ca/${lang}/`;
  const helpUrl = lang === "en"
    ? "https://www.ailysagency.ca/help"
    : `https://www.ailysagency.ca/${lang}/help`;
  const articleUrl = lang === "en"
    ? `https://www.ailysagency.ca/help/${article.slug}`
    : `https://www.ailysagency.ca/${lang}/help/${article.slug}`;
  const homeLabel = lang === "fr" ? "Accueil" : "Home";
  const helpLabel = lang === "fr" ? "Aide" : "Help";
  const updatedLabel = lang === "fr" ? "Mis à jour" : "Updated";
  const readLabel = lang === "fr" ? "min de lecture" : "min read";
  const backLabel = lang === "fr" ? "Retour au centre d'aide" : "Back to Help center";
  const moreInLabel = lang === "fr" ? "Plus dans" : "More in";
  const stillQuestionsLabel = lang === "fr" ? "D'autres questions?" : "Still have questions?";
  const talkInMinutesLabel = lang === "fr" ? "Parlez-nous en 60 minutes." : "Talk to us in 60 minutes.";
  const bookCallLabel = lang === "fr" ? "Réserver un appel stratégique" : "Book a strategy call";
  const helpTitleSuffix = lang === "fr" ? "Aide AiLys Agency" : "AiLys Agency Help";


  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{article.title} · {helpTitleSuffix}</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:locale" content={ogLocale} />
        <link rel="canonical" href={articleUrl} />
      </Helmet>

      <NetworkBackground
        backgroundColor="#050505"
        nodeColor="#22D3EE"
        lineColor="#A78BFA"
        nodeCount={18}
        mobileNodeCount={10}
        connectionDistance={140}
        mouseInfluenceRadius={180}
        mouseInfluenceStrength={0.1}
      />

      <div className="min-h-screen overflow-x-clip">
        <ReadingProgress />
        <Navbar />

        {/* Programmatic cover hero */}
        <div
          className={`relative pt-24 pb-12 px-4 overflow-hidden bg-gradient-to-br ${meta.tone}`}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.85' /></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5' /></svg>\")",
            }}
          />
          <div className="relative max-w-4xl mx-auto">
            <Link
              to={helpRoot}
              className="inline-flex items-center gap-2 px-1 py-2 min-h-[44px] text-xs font-mono uppercase tracking-[0.18em] text-white/85 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {backLabel}
            </Link>
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.22em] font-semibold text-white bg-black/20 backdrop-blur-sm border border-white/20 mb-5">
              {meta.label}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-white mb-4 max-w-4xl">
              {article.title}
            </h1>
            <p className="text-lg text-white/90 leading-relaxed mb-6 max-w-3xl">
              {article.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono uppercase tracking-[0.18em] text-white/80">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {updatedLabel} {article.updatedAt}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {article.readingTimeMin} {readLabel}
              </span>
            </div>
          </div>
        </div>

        <main className="pb-20 px-4">
          <div className="max-w-7xl mx-auto grid xl:grid-cols-[220px_minmax(0,1fr)_220px] gap-8 lg:gap-10 pt-12">
            <TableOfContents source={article.body} />
            <article className="prose prose-invert prose-lg max-w-none xl:max-w-3xl xl:mx-auto prose-headings:font-display prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-3 prose-h3:text-xl prose-p:text-foreground/85 prose-p:leading-relaxed prose-li:text-foreground/85 prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-1 prose-blockquote:rounded-r">
              <ReactMarkdown>{article.body}</ReactMarkdown>

              <div className="not-prose mt-12 pt-8 border-t border-border/40">
                <ShareButtons
                  title={article.title}
                  url={articleUrl}
                />
              </div>

              {related.length > 0 && (
                <div className="not-prose mt-12 pt-8 border-t border-border/40">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60 mb-4">
                    {moreInLabel} {meta.label}
                  </p>
                  <ul className="space-y-2">
                    {related.map((a) => (
                      <li key={a.slug}>
                        <Link
                          to={`${articleHrefBase}/${a.slug}`}
                          className="group flex items-start justify-between gap-4 p-4 rounded-lg border border-border/40 bg-card/30 hover:border-primary/30 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="font-display text-lg text-foreground/95 group-hover:text-primary transition-colors leading-tight mb-1">
                              {a.title}
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {a.excerpt}
                            </p>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary flex-shrink-0 mt-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="not-prose mt-12 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/[0.08] via-secondary/[0.05] to-accent/[0.08] backdrop-blur-md p-6 sm:p-8 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/90 mb-2">
                  {stillQuestionsLabel}
                </p>
                <h3 className="font-display text-2xl mb-3">
                  {talkInMinutesLabel}
                </h3>
                <Button
                  onClick={() => navigate(lang === "en" ? "/book-call" : `/${lang}/book-call`)}
                  className="rounded-full font-semibold min-h-[44px]"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                  }}
                >
                  {bookCallLabel}
                </Button>
              </div>
            </article>
            <aside className="hidden xl:block" aria-hidden="true" />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
