import { useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { NetworkBackground } from "@/components/backgrounds/NetworkBackground";
import { Button } from "@/components/ui/button";
import {
  helpArticles,
  HELP_CATEGORY_META,
} from "@/data/help-articles";

export default function HelpArticle() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-force-dark", "true");
    root.classList.add("dark");
    return () => root.removeAttribute("data-force-dark");
  }, []);

  const article = useMemo(
    () => helpArticles.find((a) => a.slug === slug),
    [slug],
  );

  const related = useMemo(() => {
    if (!article) return [];
    return helpArticles
      .filter((a) => a.slug !== article.slug && a.category === article.category)
      .slice(0, 3);
  }, [article]);

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

      <div className="min-h-screen overflow-x-hidden">
        <Navbar />

        <main className="pt-28 pb-20 px-4">
          <article className="max-w-3xl mx-auto">
            <Link
              to="/help"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground/70 hover:text-primary transition-colors mb-10"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Help center
            </Link>

            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.22em] font-semibold text-white bg-gradient-to-r ${meta.tone} mb-5`}
            >
              {meta.label}
            </span>

            <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] tracking-tight mb-4">
              {article.title}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pb-6 mb-10 border-b border-border/40 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground/60">
              <span>Updated {article.updatedAt}</span>
              <span>{article.readingTimeMin} min read</span>
            </div>

            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-3 prose-h3:text-xl prose-p:text-foreground/85 prose-p:leading-relaxed prose-li:text-foreground/85 prose-strong:text-foreground">
              <ReactMarkdown>{article.body}</ReactMarkdown>
            </div>

            {related.length > 0 && (
              <div className="mt-16 pt-10 border-t border-border/40">
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

            <div className="mt-16 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/[0.08] via-secondary/[0.05] to-accent/[0.08] backdrop-blur-md p-6 sm:p-8 text-center">
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
        </main>

        <Footer />
      </div>
    </>
  );
}
