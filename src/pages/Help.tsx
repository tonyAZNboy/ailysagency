import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search, ArrowRight, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { NetworkBackground } from "@/components/backgrounds/NetworkBackground";
import {
  helpArticles,
  HELP_CATEGORY_META,
  type HelpCategory,
  type HelpArticle,
} from "@/data/help-articles";
import { useLang } from "@/i18n/LangContext";

function localizeArticle(a: HelpArticle, lang: string): HelpArticle {
  if (lang === "en" || !a.i18n?.[lang]) return a;
  const t = a.i18n[lang];
  return {
    ...a,
    title: t.title ?? a.title,
    excerpt: t.excerpt ?? a.excerpt,
    body: t.body ?? a.body,
  };
}

export default function Help() {
  const navigate = useNavigate();
  const { lang } = useLang();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-force-dark", "true");
    root.classList.add("dark");
    return () => root.removeAttribute("data-force-dark");
  }, []);

  const grouped = useMemo(() => {
    const groups: Record<HelpCategory, HelpArticle[]> = {
      "getting-started": [],
      "aeo-geo-eeat": [],
      "pricing-plans": [],
      audit: [],
      "account-billing": [],
      glossary: [],
    };
    for (const raw of helpArticles) {
      const a = localizeArticle(raw, lang);
      if (search) {
        const q = search.toLowerCase();
        const hit =
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.body.toLowerCase().includes(q);
        if (!hit) continue;
      }
      groups[a.category].push(a);
    }
    return groups;
  }, [search, lang]);

  const totalMatches = Object.values(grouped).reduce(
    (sum, arr) => sum + arr.length,
    0,
  );

  return (
    <>
      <Helmet>
        <title>Help center · AiLys Agency · Documentation, FAQ, glossary</title>
        <meta
          name="description"
          content="AiLys Agency help center. Onboarding guides, AEO/GEO/E-E-A-T explainers, pricing breakdowns, audit walkthroughs, AI search glossary."
        />
      </Helmet>

      <NetworkBackground
        backgroundColor="#050505"
        nodeColor="#22D3EE"
        lineColor="#A78BFA"
        nodeCount={20}
        mobileNodeCount={12}
        connectionDistance={140}
        mouseInfluenceRadius={200}
        mouseInfluenceStrength={0.12}
      />

      <div className="min-h-screen overflow-x-hidden">
        <Navbar />

        <main className="pt-28 pb-20 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <header className="mb-14 max-w-4xl">
              <div className="ailys-section-no mb-6">
                <span>Help center</span>
              </div>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-5">
                Documentation,
                <br />
                <span className="italic">in plain English.</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-prose">
                Onboarding guides, AEO/GEO/E-E-A-T explainers, pricing
                breakdowns, audit walkthroughs, and a glossary of every term we
                use.
              </p>
            </header>

            {/* Search */}
            <div className="relative max-w-xl mb-12">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 pointer-events-none" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search help articles..."
                className="pl-11 h-12 bg-card/40 border-border/50 backdrop-blur-md focus-visible:ring-primary/50"
              />
              {search && (
                <p className="mt-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground/70">
                  {totalMatches} {totalMatches === 1 ? "match" : "matches"}
                </p>
              )}
            </div>

            {/* Categories with articles */}
            <div className="space-y-12">
              {(Object.keys(HELP_CATEGORY_META) as HelpCategory[]).map((cat) => {
                const articles = grouped[cat];
                if (articles.length === 0 && !search) return null;
                if (articles.length === 0) return null;
                const meta = HELP_CATEGORY_META[cat];
                return (
                  <section key={cat}>
                    <div className="flex flex-wrap items-end justify-between gap-3 mb-5 pb-4 border-b border-border/30">
                      <div>
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.22em] font-semibold text-white bg-gradient-to-r ${meta.tone} mb-2`}
                        >
                          {meta.label}
                        </span>
                        <p className="text-sm text-muted-foreground">
                          {meta.description}
                        </p>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">
                        {articles.length} {articles.length === 1 ? "article" : "articles"}
                      </span>
                    </div>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {articles.map((a) => (
                        <li key={a.slug}>
                          <Link
                            to={`/help/${a.slug}`}
                            className="group block rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm p-5 hover:border-primary/30 hover:bg-card/50 transition-all"
                          >
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <h3 className="font-display text-xl text-foreground/95 group-hover:text-primary transition-colors leading-tight">
                                {a.title}
                              </h3>
                              <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                              {a.excerpt}
                            </p>
                            <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/60">
                              <span>{a.readingTimeMin} min</span>
                              <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                              <span>Updated {a.updatedAt}</span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}

              {totalMatches === 0 && search && (
                <div className="rounded-2xl border border-border/40 bg-card/20 backdrop-blur-md p-12 text-center">
                  <p className="font-display text-2xl italic text-muted-foreground mb-2">
                    Nothing matches "{search}".
                  </p>
                  <p className="text-sm text-muted-foreground/70">
                    Try different terms, or email us directly at hello@ailysagency.ca.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom CTA */}
            <div className="mt-20 rounded-2xl border border-secondary/30 bg-gradient-to-br from-secondary/10 via-primary/5 to-accent/10 backdrop-blur-md p-6 sm:p-8 max-w-3xl mx-auto text-center">
              <BookOpen className="w-6 h-6 text-secondary mx-auto mb-3" />
              <h3 className="font-display text-2xl mb-2">Did not find what you needed?</h3>
              <p className="text-sm text-muted-foreground mb-5 max-w-prose mx-auto">
                Email us at hello@ailysagency.ca or book a 60-minute strategy call.
                We answer fast.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
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
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "mailto:hello@ailysagency.ca")}
                  className="rounded-full"
                >
                  Email us directly
                </Button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
