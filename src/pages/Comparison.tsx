import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Check, X, Minus, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { NetworkBackground } from "@/components/backgrounds/NetworkBackground";
import { SEOHead } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { ScrollReveal, MagneticWrapper } from "@/components/animation";
import { useLang } from "@/i18n/LangContext";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n/index";
import {
  getComparison,
  getComparisonContent,
  comparisons,
} from "@/data/comparisons";

export default function Comparison() {
  const { slug, lang: urlLang } = useParams<{ slug: string; lang?: string }>();
  const navigate = useNavigate();
  const { lang, setLang } = useLang();

  useEffect(() => {
    if (urlLang && SUPPORTED_LANGS.includes(urlLang as SupportedLang)) {
      setLang(urlLang as SupportedLang);
    }
  }, [urlLang, setLang]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-force-dark", "true");
    root.classList.add("dark");
    return () => {
      root.removeAttribute("data-force-dark");
      const stored = localStorage.getItem("theme");
      if (stored === "light") root.classList.remove("dark");
    };
  }, []);

  const comparison = slug ? getComparison(slug) : undefined;

  if (!comparison) {
    return (
      <>
        <SEOHead
          title="Comparison not found · AiLys Agency"
          description="The comparison page you are looking for does not exist."
          canonicalUrl="https://www.ailysagency.ca/vs"
        />
        <Navbar />
        <main className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-lg">
            <h1 className="font-display text-5xl mb-4">Comparison not found</h1>
            <Button onClick={() => navigate("/")}>Back to home</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const c = getComparisonContent(comparison, lang);
  const baseUrl = "https://www.ailysagency.ca";
  const canonical =
    lang === "en"
      ? `${baseUrl}/vs/${comparison.slug}`
      : `${baseUrl}/${lang}/vs/${comparison.slug}`;
  const alternates = SUPPORTED_LANGS.map((l) => ({
    hrefLang: l,
    href:
      l === "en"
        ? `${baseUrl}/vs/${comparison.slug}`
        : `${baseUrl}/${l}/vs/${comparison.slug}`,
  }));

  // Win/tie/loss tally for the verdict bar
  const tally = c.rows.reduce(
    (acc, row) => {
      acc[row.outcome]++;
      return acc;
    },
    { win: 0, tie: 0, loss: 0 },
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Comparisons", item: `${baseUrl}/vs` },
          {
            "@type": "ListItem",
            position: 3,
            name: `AiLys vs ${comparison.competitorName}`,
            item: canonical,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: c.faq.map((qa) => ({
          "@type": "Question",
          name: qa.q,
          acceptedAnswer: { "@type": "Answer", text: qa.a },
        })),
      },
    ],
  };

  return (
    <>
      <SEOHead
        title={c.seoTitle}
        description={c.seoDescription}
        canonicalUrl={canonical}
        keywords={c.seoKeywords}
        alternateLocales={alternates}
        structuredData={structuredData}
      />
      <NetworkBackground
        backgroundColor="#050505"
        nodeColor="#22D3EE"
        lineColor="#A78BFA"
        nodeCount={28}
        mobileNodeCount={16}
        connectionDistance={140}
        mouseInfluenceRadius={200}
        mouseInfluenceStrength={0.15}
      />

      <div className="min-h-screen overflow-x-clip">
        <Navbar />

        <main id="main-content">
          {/* Hero */}
          <section className="relative pt-28 pb-16 px-4" aria-labelledby="comparison-heading">
            <div className="relative max-w-6xl mx-auto">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground/70 hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {lang === "fr" ? "Accueil" : "Home"}
              </Link>

              <ScrollReveal variant="fade-up" delay={50} duration={650}>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.22em] font-semibold text-white bg-gradient-to-r ${comparison.toneClass} mb-6`}
                >
                  {c.eyebrow}
                </span>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={150} duration={700}>
                <h1
                  id="comparison-heading"
                  className="font-display tracking-tight leading-[1.05] mb-6 break-words"
                  style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
                >
                  {c.headline1}{" "}
                  <span className="italic bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent">
                    {c.headline2}
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={300} duration={700}>
                <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed mb-8">
                  {c.subheadline}
                </p>
              </ScrollReveal>

              {/* Tally bar */}
              <ScrollReveal variant="fade-up" delay={400} duration={700}>
                <div className="flex flex-wrap items-center gap-3 mb-8 text-xs font-mono uppercase tracking-[0.18em]">
                  <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                    {tally.win} {lang === "fr" ? "victoires AiLys" : "AiLys wins"}
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
                    {tally.tie} {lang === "fr" ? "égalités" : "ties"}
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300">
                    {tally.loss} {comparison.competitorName} {lang === "fr" ? "victoires" : "wins"}
                  </span>
                  <a
                    href={`https://${comparison.competitorWebsite}`}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="ml-auto inline-flex items-center gap-1 text-muted-foreground/60 hover:text-primary transition-colors"
                  >
                    {comparison.competitorWebsite}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </ScrollReveal>

              {/* CTAs */}
              <ScrollReveal variant="fade-up" delay={500} duration={700}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <MagneticWrapper strength={0.12}>
                    <Button
                      size="lg"
                      onClick={() => navigate("/audit")}
                      className="rounded-full font-semibold text-base px-7 py-6 group"
                      style={{
                        boxShadow:
                          "0 0 32px hsl(var(--primary) / 0.45), 0 0 64px hsl(var(--secondary) / 0.25)",
                        background:
                          "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)) 50%, hsl(var(--accent)))",
                      }}
                    >
                      {c.ctaPrimary}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </MagneticWrapper>
                  <button
                    onClick={() =>
                      document
                        .getElementById("comparison-table")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="px-5 py-3 rounded-full border border-border/50 hover:border-primary/50 text-sm font-medium transition-colors"
                  >
                    {c.ctaSecondary} →
                  </button>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Verdict */}
          <section className="relative py-16 px-4" aria-labelledby="verdict-heading">
            <div className="relative max-w-5xl mx-auto">
              <ScrollReveal variant="fade-up" delay={50} duration={600}>
                <div className="ailys-section-no mb-6">
                  <span>{lang === "fr" ? "Verdict" : "Verdict"}</span>
                </div>
                <h2
                  id="verdict-heading"
                  className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight mb-6"
                >
                  {c.verdictTitle}
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-10 max-w-3xl">
                  {c.verdictBody}
                </p>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 gap-5">
                <ScrollReveal variant="fade-up" delay={100} duration={600}>
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.03] p-6 h-full">
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400 mb-4">
                      {lang === "fr" ? "Choisissez AiLys quand" : "Choose AiLys when"}
                    </div>
                    <ul className="space-y-3">
                      {c.whenAilysWins.map((reason, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/90">{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
                <ScrollReveal variant="fade-up" delay={200} duration={600}>
                  <div className="rounded-xl border border-amber-500/30 bg-amber-500/[0.03] p-6 h-full">
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-400 mb-4">
                      {lang === "fr"
                        ? `Choisissez ${comparison.competitorName} quand`
                        : `Choose ${comparison.competitorName} when`}
                    </div>
                    <ul className="space-y-3">
                      {c.whenCompetitorWins.map((reason, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                          <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/90">{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="relative py-16 px-4" aria-labelledby="pricing-comparison-heading">
            <div className="relative max-w-5xl mx-auto">
              <ScrollReveal variant="fade-up" delay={50} duration={600}>
                <div className="ailys-section-no mb-6">
                  <span>{lang === "fr" ? "Tarification" : "Pricing"}</span>
                </div>
                <h2
                  id="pricing-comparison-heading"
                  className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight mb-10"
                >
                  {lang === "fr" ? "Comparaison de prix." : "Side-by-side pricing."}
                </h2>
              </ScrollReveal>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="rounded-xl border border-border/40 bg-card/40 backdrop-blur-md p-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60 mb-3">
                    {comparison.competitorName}
                  </div>
                  <div className="font-display text-2xl sm:text-3xl mb-3 leading-tight">
                    {c.pricing.competitorRange}
                  </div>
                </div>
                <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/[0.06] via-secondary/[0.04] to-accent/[0.06] backdrop-blur-md p-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary mb-3">
                    AiLys Agency
                  </div>
                  <div className="font-display text-2xl sm:text-3xl mb-3 leading-tight bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent">
                    {c.pricing.ailysRange}
                  </div>
                </div>
              </div>
              <p className="mt-5 text-xs text-muted-foreground/70 italic max-w-3xl">
                {c.pricing.note}
              </p>
            </div>
          </section>

          {/* Feature comparison table */}
          <section
            id="comparison-table"
            className="relative py-16 px-4"
            aria-labelledby="comparison-table-heading"
          >
            <div className="relative max-w-6xl mx-auto">
              <ScrollReveal variant="fade-up" delay={50} duration={600}>
                <div className="ailys-section-no mb-6">
                  <span>{lang === "fr" ? "Comparaison de fonctionnalités" : "Feature comparison"}</span>
                </div>
                <h2
                  id="comparison-table-heading"
                  className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight mb-10"
                >
                  {lang === "fr" ? "Ligne par ligne." : "Row by row."}
                </h2>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={100} duration={650}>
                <div className="rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/40 bg-card/50">
                          <th className="text-left p-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
                            {lang === "fr" ? "Fonctionnalité" : "Feature"}
                          </th>
                          <th className="text-left p-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
                            {comparison.competitorName}
                          </th>
                          <th className="text-left p-4 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                            AiLys
                          </th>
                          <th
                            className="text-center p-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70 hidden sm:table-cell"
                            aria-label="Outcome"
                          >
                            {lang === "fr" ? "Résultat" : "Outcome"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {c.rows.map((row, i) => (
                          <tr
                            key={i}
                            className={
                              i % 2 === 0
                                ? "border-b border-border/20"
                                : "border-b border-border/20 bg-card/10"
                            }
                          >
                            <td className="p-4 font-medium text-foreground/85 align-top">
                              {row.feature}
                            </td>
                            <td className="p-4 text-muted-foreground align-top">
                              {row.competitor}
                            </td>
                            <td className="p-4 text-foreground align-top font-medium">
                              {row.ailys}
                            </td>
                            <td className="p-4 hidden sm:table-cell text-center align-top">
                              {row.outcome === "win" && (
                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-400">
                                  <Check className="w-3.5 h-3.5" />
                                </span>
                              )}
                              {row.outcome === "tie" && (
                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/15 text-amber-400">
                                  <Minus className="w-3.5 h-3.5" />
                                </span>
                              )}
                              {row.outcome === "loss" && (
                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/15 text-rose-400">
                                  <X className="w-3.5 h-3.5" />
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* FAQ */}
          <section className="relative py-16 px-4" aria-labelledby="comparison-faq-heading">
            <div className="relative max-w-4xl mx-auto">
              <ScrollReveal variant="fade-up" delay={50} duration={600}>
                <div className="ailys-section-no mb-6">
                  <span>FAQ</span>
                </div>
                <h2
                  id="comparison-faq-heading"
                  className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight mb-10"
                >
                  {lang === "fr"
                    ? `Questions sur AiLys vs ${comparison.competitorName}.`
                    : `Questions about AiLys vs ${comparison.competitorName}.`}
                </h2>
              </ScrollReveal>
              <div className="space-y-3">
                {c.faq.map((qa, i) => (
                  <ScrollReveal
                    key={i}
                    variant="fade-up"
                    delay={50 + i * 50}
                    duration={450}
                  >
                    <details className="group rounded-xl border border-border/40 bg-card/30 backdrop-blur-md overflow-hidden">
                      <summary className="flex items-start gap-4 p-5 cursor-pointer list-none">
                        <span className="font-display text-lg sm:text-xl flex-1 leading-tight">
                          {qa.q}
                        </span>
                      </summary>
                      <div className="px-5 pb-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {qa.a}
                      </div>
                    </details>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* Other comparisons */}
          <section className="relative py-16 px-4" aria-labelledby="other-comparisons-heading">
            <div className="relative max-w-6xl mx-auto">
              <ScrollReveal variant="fade-up" delay={50} duration={600}>
                <div className="ailys-section-no mb-6">
                  <span>{lang === "fr" ? "Autres comparaisons" : "Other comparisons"}</span>
                </div>
                <h2
                  id="other-comparisons-heading"
                  className="font-display text-2xl sm:text-3xl leading-tight tracking-tight mb-8"
                >
                  {lang === "fr" ? "Aussi évaluer." : "Also evaluating."}
                </h2>
              </ScrollReveal>
              <div className="grid sm:grid-cols-2 gap-4">
                {comparisons
                  .filter((other) => other.slug !== comparison.slug)
                  .map((other) => {
                    const href =
                      lang === "en"
                        ? `/vs/${other.slug}`
                        : `/${lang}/vs/${other.slug}`;
                    return (
                      <Link
                        key={other.slug}
                        to={href}
                        className="group flex items-center gap-4 p-5 rounded-xl border border-border/40 bg-card/30 hover:border-primary/40 hover:bg-card/50 transition-all"
                      >
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-[0.22em] font-semibold text-white bg-gradient-to-r ${other.toneClass}`}
                        >
                          vs
                        </span>
                        <div className="flex-1">
                          <div className="font-display text-lg leading-tight group-hover:text-primary transition-colors">
                            AiLys vs {other.competitorName}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {other.competitorTagline}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-primary/70 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    );
                  })}
              </div>
            </div>
          </section>

          {/* sr-only SEO summary */}
          <div className="sr-only" aria-hidden="false">
            {c.seoDescription} {c.subheadline} {c.verdictBody}
            {c.faq.map((qa) => ` ${qa.q} ${qa.a}`).join(" ")}
            {c.rows.map((r) => ` ${r.feature}: ${comparison.competitorName} ${r.competitor}, AiLys ${r.ailys}.`).join(" ")}
          </div>
        </main>

        <Footer />
        <LandingChatWidget />
      </div>
    </>
  );
}
