import { useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
import { useLang } from "@/i18n/LangContext";

function localizeArticle(a: HelpArticleT, lang: string): HelpArticleT {
  if (lang === "en" || !a.i18n?.[lang]) return a;
  const t = a.i18n[lang];
  return {
    ...a,
    title: t.title ?? a.title,
    excerpt: t.excerpt ?? a.excerpt,
    body: t.body ?? a.body,
  };
}

export default function HelpArticle() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLang();
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

  if (!article) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="font-display text-5xl mb-3">Article not found</h1>
            <Button onClick={() => navigate("/help")}>Back to Help center</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const meta = HELP_CATEGORY_META[article.category];

  return (
    <>
      <Helmet>
        <title>{article.title} · AiLys Agency Help</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={`https://www.ailysagency.ca/help/${article.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.ailysagency.ca/" },
                  { "@type": "ListItem", position: 2, name: "Help", item: "https://www.ailysagency.ca/help" },
                  { "@type": "ListItem", position: 3, name: meta.label, item: `https://www.ailysagency.ca/help#${article.category}` },
                  { "@type": "ListItem", position: 4, name: article.title, item: `https://www.ailysagency.ca/help/${article.slug}` },
                ],
              },
              {
                "@type": "TechArticle",
                "@id": `https://www.ailysagency.ca/help/${article.slug}#article`,
                headline: article.title,
                description: article.excerpt,
                datePublished: article.updatedAt,
                dateModified: article.updatedAt,
                wordCount: article.body.split(/\s+/).length,
                inLanguage: "en-CA",
                articleSection: meta.label,
                proficiencyLevel: "Beginner",
                author: { "@id": "https://www.ailysagency.ca/#organization" },
                publisher: { "@id": "https://www.ailysagency.ca/#organization" },
                mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.ailysagency.ca/help/${article.slug}` },
                speakable: {
                  "@type": "SpeakableSpecification",
                  cssSelector: ["h1", ".prose p:first-of-type"],
                },
              },
            ],
          })}
        </script>
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
              to="/help"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-white/85 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Help center
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
                <Calendar className="w-3.5 h-3.5" /> Updated {article.updatedAt}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {article.readingTimeMin} min read
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
                  url={`https://www.ailysagency.ca/help/${article.slug}`}
                />
              </div>

              {related.length > 0 && (
                <div className="not-prose mt-12 pt-8 border-t border-border/40">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60 mb-4">
                    More in {meta.label}
                  </p>
                  <ul className="space-y-2">
                    {related.map((a) => (
                      <li key={a.slug}>
                        <Link
                          to={`/help/${a.slug}`}
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
                  Still have questions?
                </p>
                <h3 className="font-display text-2xl mb-3">
                  Talk to us in 60 minutes.
                </h3>
                <Button
                  onClick={() => navigate("/book-call")}
                  className="rounded-full font-semibold"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                  }}
                >
                  Book a strategy call
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
