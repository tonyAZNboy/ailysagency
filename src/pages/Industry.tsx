import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, CheckCircle2, Sparkles, Quote } from "lucide-react";
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
  getIndustry,
  getIndustryContent,
  industries,
  type RecommendedTier,
} from "@/data/industries";
import { industryReports } from "@/data/industry-reports";
import { FileText } from "lucide-react";

const TIER_PRICE: Record<RecommendedTier, string> = {
  starter: "$300",
  core: "$600",
  growth: "$1,200",
  autopilot: "$2,500",
};

const TIER_NAME: Record<RecommendedTier, string> = {
  starter: "Starter",
  core: "Core",
  growth: "Growth",
  autopilot: "Agency",
};

export default function Industry() {
  const { slug, lang: urlLang } = useParams<{ slug: string; lang?: string }>();
  const navigate = useNavigate();
  const { lang, setLang } = useLang();

  // Sync URL lang param into context on mount/change
  useEffect(() => {
    if (urlLang && SUPPORTED_LANGS.includes(urlLang as SupportedLang)) {
      setLang(urlLang as SupportedLang);
    }
  }, [urlLang, setLang]);

  // Force dark theme for editorial consistency
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

  const industry = slug ? getIndustry(slug) : undefined;

  if (!industry) {
    return (
      <>
        <SEOHead
          title="Industry not found · AiLys Agency"
          description="The industry page you are looking for does not exist."
          canonicalUrl="https://www.ailysagency.ca/industries"
        />
        <Navbar />
        <main className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-lg">
            <h1 className="font-display text-5xl mb-4">Industry not found</h1>
            <p className="text-muted-foreground mb-6">
              We do not have a dedicated page for that industry yet. Browse our
              full list or run the general AI Visibility Audit.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button onClick={() => navigate("/industries")}>All industries</Button>
              <Button variant="outline" onClick={() => navigate("/audit")}>
                Free Audit
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const c = getIndustryContent(industry, lang);
  const baseUrl = "https://www.ailysagency.ca";
  const canonical =
    lang === "en"
      ? `${baseUrl}/industries/${industry.slug}`
      : `${baseUrl}/${lang}/industries/${industry.slug}`;

  // hreflang alternates for SEO
  const alternates = SUPPORTED_LANGS.map((l) => ({
    hrefLang: l,
    href:
      l === "en"
        ? `${baseUrl}/industries/${industry.slug}`
        : `${baseUrl}/${l}/industries/${industry.slug}`,
  }));

  // Schema.org structured data: Service + FAQPage + BreadcrumbList
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Industries",
            item: `${baseUrl}/industries`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: industry.nameLong,
            item: canonical,
          },
        ],
      },
      {
        "@type": "Service",
        name: `AI SEO for ${industry.nameLong}`,
        description: c.seoDescription,
        provider: {
          "@type": "Organization",
          name: "AiLys Agency",
          url: baseUrl,
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Quebec, Canada",
        },
        serviceType: [
          "Answer Engine Optimization",
          "Generative Engine Optimization",
          "E-E-A-T Optimization",
        ],
        offers: {
          "@type": "Offer",
          price: TIER_PRICE[c.recommendedTier].replace("$", "").replace(",", ""),
          priceCurrency: "CAD",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: c.faq.map((qa) => ({
          "@type": "Question",
          name: qa.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: qa.a,
          },
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
        nodeCount={32}
        mobileNodeCount={18}
        connectionDistance={140}
        mouseInfluenceRadius={220}
        mouseInfluenceStrength={0.16}
      />

      <div className="min-h-screen overflow-x-clip">
        <Navbar />

        <main id="main-content" aria-label="Main content">
          {/* Hero */}
          <section
            className="relative pt-28 pb-20 px-4 overflow-hidden"
            aria-labelledby="industry-heading"
          >
            <div className="relative max-w-6xl mx-auto">
              <Link
                to="/industries"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground/70 hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                All industries
              </Link>

              <ScrollReveal variant="fade-up" delay={50} duration={650}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-3xl" aria-hidden="true">
                    {industry.emoji}
                  </span>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.22em] font-semibold text-white bg-gradient-to-r ${industry.toneClass}`}
                  >
                    {c.eyebrow}
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={150} duration={700}>
                <h1
                  id="industry-heading"
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

              {/* CTAs */}
              <ScrollReveal variant="fade-up" delay={450} duration={700}>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-12">
                  <MagneticWrapper strength={0.12}>
                    <Button
                      size="lg"
                      onClick={() =>
                        navigate("/audit", {
                          state: { vertical: industry.slug },
                        })
                      }
                      className="w-full sm:w-auto rounded-full font-semibold text-base px-7 py-6 group relative overflow-hidden"
                      style={{
                        boxShadow:
                          "0 0 32px hsl(var(--primary) / 0.45), 0 0 64px hsl(var(--secondary) / 0.25)",
                        background:
                          "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)) 50%, hsl(var(--accent)))",
                      }}
                    >
                      <Sparkles className="w-5 h-5 mr-2" aria-hidden="true" />
                      {c.ctaPrimary}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </MagneticWrapper>
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById("industry-pricing")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="px-5 py-3 rounded-full border border-border/50 hover:border-primary/50 text-sm font-medium transition-colors text-foreground/85 hover:text-primary"
                  >
                    {c.ctaSecondary} →
                  </button>
                </div>
              </ScrollReveal>

              {/* Stats strip */}
              <ScrollReveal variant="fade-up" delay={600} duration={700}>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {c.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-border/40 bg-card/40 backdrop-blur-md p-4"
                    >
                      <div
                        className="font-display tabular-nums leading-none mb-2 bg-gradient-to-br from-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent"
                        style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-[11px] sm:text-xs text-muted-foreground leading-snug">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Top queries */}
          <section className="relative py-20 px-4" aria-labelledby="top-queries-heading">
            <div className="relative max-w-5xl mx-auto">
              <ScrollReveal variant="fade-up" delay={50} duration={600}>
                <div className="ailys-section-no mb-6">
                  <span>What prospects ask AI engines</span>
                </div>
                <h2
                  id="top-queries-heading"
                  className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight mb-10"
                >
                  These queries decide whether you{" "}
                  <span className="italic">get the booking.</span>
                </h2>
              </ScrollReveal>
              <div className="space-y-3">
                {c.topQueries.map((q, i) => (
                  <ScrollReveal
                    key={i}
                    variant="fade-up"
                    delay={100 + i * 80}
                    duration={500}
                  >
                    <div className="flex items-start gap-4 p-5 rounded-xl border border-primary/20 bg-primary/[0.04]">
                      <Quote className="w-5 h-5 text-primary/70 flex-shrink-0 mt-0.5" />
                      <p className="text-base sm:text-lg text-foreground/90 italic leading-snug">
                        "{q}"
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* Pain points */}
          <section className="relative py-20 px-4" aria-labelledby="pain-points-heading">
            <div className="relative max-w-6xl mx-auto">
              <ScrollReveal variant="fade-up" delay={50} duration={600}>
                <div className="ailys-section-no mb-6">
                  <span>Where the AI gap shows up</span>
                </div>
                <h2
                  id="pain-points-heading"
                  className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight mb-12"
                >
                  Why your competitors get cited{" "}
                  <span className="italic">and you don't.</span>
                </h2>
              </ScrollReveal>
              <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                {c.painPoints.map((pp, i) => (
                  <ScrollReveal
                    key={i}
                    variant="fade-up"
                    delay={100 + i * 80}
                    duration={550}
                  >
                    <div className="rounded-xl border border-border/40 bg-card/40 backdrop-blur-md p-6 h-full">
                      <h3 className="font-display text-xl sm:text-2xl mb-3 leading-tight">
                        {pp.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {pp.description}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* Methodology */}
          <section
            className="relative py-20 px-4"
            aria-labelledby="industry-methodology-heading"
          >
            <div className="relative max-w-6xl mx-auto">
              <ScrollReveal variant="fade-up" delay={50} duration={600}>
                <div className="ailys-section-no mb-6">
                  <span>Methodology tuned for {industry.name.toLowerCase()}</span>
                </div>
                <h2
                  id="industry-methodology-heading"
                  className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight mb-12"
                >
                  Eight steps from invisible{" "}
                  <span className="italic">to cited.</span>
                </h2>
              </ScrollReveal>
              <ol className="space-y-4">
                {c.methodology.map((step, i) => (
                  <ScrollReveal
                    key={i}
                    variant="fade-up"
                    delay={50 + i * 50}
                    duration={500}
                  >
                    <li className="grid grid-cols-[60px_1fr] gap-5 sm:gap-6 p-5 sm:p-6 rounded-xl border border-border/40 bg-card/30 backdrop-blur-md">
                      <span className="font-mono text-sm tabular-nums text-primary/80 pt-1">
                        {step.step}
                      </span>
                      <div>
                        <h3 className="font-display text-xl sm:text-2xl mb-2 leading-tight">
                          {step.title}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  </ScrollReveal>
                ))}
              </ol>
            </div>
          </section>

          {/* Sample citations */}
          {c.sampleCitations.length > 0 && (
            <section
              className="relative py-20 px-4"
              aria-labelledby="sample-citations-heading"
            >
              <div className="relative max-w-6xl mx-auto">
                <ScrollReveal variant="fade-up" delay={50} duration={600}>
                  <div className="ailys-section-no mb-6">
                    <span>What success looks like</span>
                  </div>
                  <h2
                    id="sample-citations-heading"
                    className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight mb-12"
                  >
                    Sample LLM citations{" "}
                    <span className="italic">in this vertical.</span>
                  </h2>
                </ScrollReveal>
                <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
                  {c.sampleCitations.map((s, i) => (
                    <ScrollReveal
                      key={i}
                      variant="fade-up"
                      delay={100 + i * 100}
                      duration={600}
                    >
                      <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/[0.06] via-secondary/[0.04] to-accent/[0.06] backdrop-blur-md p-5 h-full flex flex-col">
                        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary mb-3">
                          {s.engine}
                        </div>
                        <p className="text-sm italic text-foreground/85 leading-snug mb-4">
                          "{s.query}"
                        </p>
                        <div className="text-base font-semibold text-foreground mb-3">
                          → {s.cited}
                        </div>
                        <p className="text-xs text-muted-foreground/85 leading-relaxed mt-auto">
                          {s.reason}
                        </p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Tier recommendation */}
          <section
            id="industry-pricing"
            className="relative py-20 px-4"
            aria-labelledby="industry-pricing-heading"
          >
            <div className="relative max-w-4xl mx-auto">
              <ScrollReveal variant="fade-up" delay={50} duration={650}>
                <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/[0.08] via-secondary/[0.05] to-accent/[0.08] backdrop-blur-md p-7 sm:p-10">
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary mb-3">
                    Recommended for {industry.name.toLowerCase()}
                  </div>
                  <h2
                    id="industry-pricing-heading"
                    className="font-display text-4xl sm:text-5xl leading-tight tracking-tight mb-4"
                  >
                    Start with{" "}
                    <span className="italic bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent">
                      {TIER_NAME[c.recommendedTier]}
                    </span>
                  </h2>
                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="font-display text-5xl tabular-nums">
                      {TIER_PRICE[c.recommendedTier]}
                    </span>
                    <span className="font-mono text-sm text-muted-foreground/80">
                      /mo CAD
                    </span>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed mb-7 max-w-2xl">
                    {c.recommendationReason}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() =>
                        navigate("/audit", {
                          state: { vertical: industry.slug },
                        })
                      }
                      className="rounded-full font-semibold"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                      }}
                    >
                      {c.ctaPrimary}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate("/#pricing-builder")}
                      className="rounded-full"
                    >
                      Build a custom plan
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* FAQ */}
          <section
            className="relative py-20 px-4"
            aria-labelledby="industry-faq-heading"
          >
            <div className="relative max-w-4xl mx-auto">
              <ScrollReveal variant="fade-up" delay={50} duration={600}>
                <div className="ailys-section-no mb-6">
                  <span>Industry FAQ</span>
                </div>
                <h2
                  id="industry-faq-heading"
                  className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight mb-12"
                >
                  Common questions for{" "}
                  <span className="italic">{industry.name.toLowerCase()}.</span>
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
                        <CheckCircle2 className="w-5 h-5 text-primary/70 flex-shrink-0 mt-0.5" />
                        <span className="font-display text-lg sm:text-xl flex-1 leading-tight">
                          {qa.q}
                        </span>
                      </summary>
                      <div className="px-5 pb-5 pl-14 text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {qa.a}
                      </div>
                    </details>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* Cross-link to other industries */}
          <section
            className="relative py-20 px-4"
            aria-labelledby="other-industries-heading"
          >
            <div className="relative max-w-6xl mx-auto">
              <ScrollReveal variant="fade-up" delay={50} duration={600}>
                <div className="ailys-section-no mb-6">
                  <span>Other industries we serve</span>
                </div>
                <h2
                  id="other-industries-heading"
                  className="font-display text-3xl sm:text-4xl leading-tight tracking-tight mb-10"
                >
                  Looking for a different vertical?
                </h2>
              </ScrollReveal>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {industries
                  .filter((i) => i.slug !== industry.slug)
                  .map((other) => {
                    const href =
                      lang === "en"
                        ? `/industries/${other.slug}`
                        : `/${lang}/industries/${other.slug}`;
                    return (
                      <Link
                        key={other.slug}
                        to={href}
                        className="group flex items-center gap-3 p-4 rounded-xl border border-border/40 bg-card/30 hover:border-primary/40 hover:bg-card/50 transition-all"
                      >
                        <span className="text-2xl" aria-hidden="true">
                          {other.emoji}
                        </span>
                        <span className="text-sm font-medium text-foreground/85 group-hover:text-primary transition-colors">
                          {other.name}
                        </span>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </section>

          {/* Cross-link to Industry Report if one exists for this vertical */}
          <IndustryReportLink industrySlug={industry.slug} lang={lang} />

          {/* sr-only SEO summary block */}
          <div className="sr-only" aria-hidden="false">
            {c.seoDescription} {c.subheadline}
            {c.faq.map((qa) => ` ${qa.q} ${qa.a}`).join(" ")}
            {c.methodology.map((s) => ` ${s.title}: ${s.description}`).join(" ")}
          </div>
        </main>

        <Footer />
        <LandingChatWidget />
      </div>
    </>
  );
}

interface IndustryReportLinkProps {
  industrySlug: string;
  lang: SupportedLang;
}

function IndustryReportLink({ industrySlug, lang }: IndustryReportLinkProps) {
  const liveReport = industryReports.find(
    (r) => r.industry === industrySlug && r.status === "live"
  );
  const upcomingReport = industryReports.find(
    (r) => r.industry === industrySlug && r.status === "coming-soon"
  );
  const report = liveReport ?? upcomingReport;
  if (!report) return null;

  const isFr = lang === "fr";
  const href =
    lang === "en"
      ? `/industry-reports/${report.slug}`
      : `/${lang}/industry-reports/${report.slug}`;
  const title = isFr ? report.titleFr : report.title;
  const isLive = report.status === "live";

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div
          className={`p-6 sm:p-8 rounded-2xl border backdrop-blur-sm ${
            isLive
              ? "border-violet-500/30 bg-gradient-to-br from-violet-950/30 to-slate-900/40"
              : "border-amber-500/30 bg-gradient-to-br from-amber-950/20 to-slate-900/40"
          }`}
        >
          <div className="flex items-start gap-3 mb-3">
            <FileText className={`w-5 h-5 mt-0.5 ${isLive ? "text-violet-300" : "text-amber-300"}`} />
            <span
              className={`text-xs font-medium uppercase tracking-wider ${
                isLive ? "text-violet-300" : "text-amber-300"
              }`}
            >
              {isLive
                ? isFr
                  ? "Rapport d'industrie disponible"
                  : "Industry report available"
                : isFr
                ? "Rapport d'industrie a venir"
                : "Industry report coming soon"}
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl text-foreground mb-3 leading-tight">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground mb-5">
            {isLive
              ? isFr
                ? `Donnees agregees anonymisees sur ${report.sampleSizeFr.toLowerCase()}. Lecture de 7 minutes.`
                : `Anonymized aggregate data covering ${report.sampleSize.toLowerCase()}. 7-minute read.`
              : isFr
              ? `Publication prevue. Inscrivez-vous pour etre notifie.`
              : `Publishing soon. Sign up to be notified.`}
          </p>
          {isLive ? (
            <Link
              to={href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-violet-300 hover:text-violet-200 transition-colors"
            >
              {isFr ? "Lire le rapport gratuit" : "Read the free report"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              to={lang === "en" ? "/industry-reports" : `/${lang}/industry-reports`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-300 hover:text-amber-200 transition-colors"
            >
              {isFr ? "Voir tous les rapports" : "See all reports"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
