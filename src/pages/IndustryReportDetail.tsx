import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Lightbulb, BarChart3 } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { NetworkBackground } from "@/components/backgrounds/NetworkBackground";
import { SEOHead } from "@/components/seo";
import { ScrollReveal } from "@/components/animation";
import { useLang } from "@/i18n/LangContext";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n/index";
import { getIndustryReport, industryReports } from "@/data/industry-reports";
import { FileText } from "lucide-react";

export default function IndustryReportDetail() {
  const { lang: urlLang, slug } = useParams<{ lang?: string; slug?: string }>();
  const { lang, setLang } = useLang();
  const report = slug ? getIndustryReport(slug) : undefined;

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

  const isFr = lang === "fr";
  const baseUrl = "https://www.ailysagency.ca";
  const indexHref = lang === "en" ? "/industry-reports" : `/${lang}/industry-reports`;

  if (!report || report.status !== "live") {
    return (
      <>
        <SEOHead
          title={isFr ? "Rapport non disponible" : "Report not available"}
          description={isFr ? "Ce rapport d'industrie n'est pas encore disponible." : "This industry report is not yet available."}
          canonicalUrl={`${baseUrl}${indexHref}`}
          noindex
        />
        <NetworkBackground backgroundColor="#050505" nodeColor="#22D3EE" lineColor="#A78BFA" nodeCount={20} mobileNodeCount={10} />
        <div className="min-h-screen relative">
          <Navbar />
          <main className="container mx-auto px-4 sm:px-6 pt-32 pb-20 max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-white mb-4">
              {isFr ? "Rapport non disponible" : "Report not available"}
            </h1>
            <p className="text-slate-300 mb-8">
              {isFr
                ? "Ce rapport sera publie a la fin du trimestre. Inscrivez-vous a notre infolettre pour etre notifie."
                : "This report will be published at the end of the quarter. Sign up for our newsletter to be notified."}
            </p>
            <Link
              to={indexHref}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {isFr ? "Retour aux rapports" : "Back to reports"}
            </Link>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  const title = isFr ? report.titleFr : report.title;
  const excerpt = isFr ? report.excerptFr : report.excerpt;
  const sampleSize = isFr ? report.sampleSizeFr : report.sampleSize;
  const canonical = lang === "en"
    ? `${baseUrl}/industry-reports/${report.slug}`
    : `${baseUrl}/${lang}/industry-reports/${report.slug}`;
  const alternates = SUPPORTED_LANGS.map((l) => ({
    hrefLang: l,
    href: l === "en"
      ? `${baseUrl}/industry-reports/${report.slug}`
      : `${baseUrl}/${l}/industry-reports/${report.slug}`,
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Report",
        name: title,
        description: excerpt,
        datePublished: report.publishedAt,
        inLanguage: isFr ? "fr-CA" : "en",
        publisher: {
          "@type": "Organization",
          name: "AiLys Agency",
          url: baseUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: isFr ? "Accueil" : "Home", item: lang === "en" ? baseUrl : `${baseUrl}/${lang}` },
          { "@type": "ListItem", position: 2, name: isFr ? "Rapports d'industrie" : "Industry Reports", item: `${baseUrl}${lang === "en" ? "" : `/${lang}`}/industry-reports` },
          { "@type": "ListItem", position: 3, name: title, item: canonical },
        ],
      },
    ],
  };

  return (
    <>
      <SEOHead
        title={title}
        description={excerpt}
        canonicalUrl={canonical}
        image={(() => {
          const medianMetric = report.topMetrics.find((m) =>
            (m.label || "").toLowerCase().includes("median")
          );
          const scoreMatch = medianMetric?.value.match(/(\d{1,3})/);
          const score = scoreMatch ? scoreMatch[1] : "0";
          return `/api/og.svg?kind=report&title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(sampleSize)}&score=${score}`;
        })()}
        keywords={[
          report.industry,
          report.region,
          `${report.quarter} ${report.year}`,
          "AI Visibility report",
          "industry benchmarks",
        ]}
        alternateLocales={alternates}
        structuredData={structuredData}
      />
      <NetworkBackground backgroundColor="#050505" nodeColor="#22D3EE" lineColor="#A78BFA" nodeCount={26} mobileNodeCount={14} />

      <div className="min-h-screen relative">
        <Navbar />

        <main className="container mx-auto px-4 sm:px-6 pt-24 pb-20 max-w-3xl">
          <ScrollReveal>
            <Link to={indexHref} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-300 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {isFr ? "Tous les rapports" : "All reports"}
            </Link>

            <header className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs font-medium text-violet-300">
                {report.region} · {report.quarter} {report.year}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {title}
              </h1>
              <p className="text-base sm:text-lg text-slate-300 mb-4">
                {excerpt}
              </p>
              <p className="text-xs text-slate-500">
                {isFr ? "Echantillon : " : "Sample: "}{sampleSize} · {isFr ? "Publie le " : "Published "}{report.publishedAt}
              </p>
            </header>
          </ScrollReveal>

          {report.topMetrics.length > 0 && (
            <ScrollReveal>
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-xl font-semibold text-white">
                    {isFr ? "Metriques cles" : "Key metrics"}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {report.topMetrics.map((m, idx) => {
                    const label = isFr ? m.labelFr : m.label;
                    const value = isFr && m.valueFr ? m.valueFr : m.value;
                    const hint = isFr ? m.hintFr : m.hint;
                    return (
                      <div key={idx} className="p-5 rounded-xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-sm">
                        <p className="text-xs font-medium text-slate-400 mb-1">{label}</p>
                        <p className="text-2xl font-bold text-white mb-2">{value}</p>
                        {hint && <p className="text-xs text-slate-500">{hint}</p>}
                      </div>
                    );
                  })}
                </div>
              </section>
            </ScrollReveal>
          )}

          {report.sections.map((section, idx) => {
            const heading = isFr ? section.headingFr : section.heading;
            const body = isFr ? section.bodyFr : section.body;
            return (
              <ScrollReveal key={idx}>
                <section className="mb-8 prose prose-invert max-w-none">
                  <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">{heading}</h2>
                  <p className="text-base text-slate-300 leading-relaxed">{body}</p>
                </section>
              </ScrollReveal>
            );
          })}

          {report.takeaways.length > 0 && (
            <ScrollReveal>
              <section className="mt-12 p-6 sm:p-8 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/30 to-slate-900/60 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-amber-400" />
                  <h2 className="text-xl font-semibold text-white">
                    {isFr ? "A retenir" : "Takeaways"}
                  </h2>
                </div>
                <div className="space-y-4">
                  {report.takeaways.map((t, idx) => {
                    const tt = isFr ? t.titleFr : t.title;
                    const td = isFr ? t.detailFr : t.detail;
                    return (
                      <div key={idx} className="flex gap-4">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-sm font-semibold">
                          {idx + 1}
                        </span>
                        <div>
                          <p className="font-semibold text-white mb-1">{tt}</p>
                          <p className="text-sm text-slate-300">{td}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </ScrollReveal>
          )}

          <ScrollReveal>
            <section className="mt-12 p-6 sm:p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 to-slate-900/60 backdrop-blur-sm text-center">
              <h2 className="text-2xl font-bold text-white mb-3">
                {isFr ? "Comparez votre score a la mediane" : "Compare your score to the median"}
              </h2>
              <p className="text-slate-300 mb-6 max-w-xl mx-auto">
                {isFr
                  ? "Lancez l'audit gratuit AiLys et obtenez votre score personnel face aux benchmarks de cette verticale."
                  : "Run the free AiLys audit and get your personal score against this vertical's benchmarks."}
              </p>
              <Link
                to={lang === "en" ? "/audit" : `/${lang}/audit`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition-colors"
              >
                {isFr ? "Lancer l'audit gratuit" : "Run free audit"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </section>
          </ScrollReveal>

          {/* Related reports: other live reports in different verticals */}
          {(() => {
            const related = industryReports.filter(
              (r) => r.status === "live" && r.slug !== report.slug
            );
            if (related.length === 0) return null;
            return (
              <ScrollReveal>
                <section className="mt-12">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    {isFr ? "Autres rapports d'industrie" : "Other industry reports"}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {related.slice(0, 4).map((r) => {
                      const rTitle = isFr ? r.titleFr : r.title;
                      const rHref =
                        lang === "en"
                          ? `/industry-reports/${r.slug}`
                          : `/${lang}/industry-reports/${r.slug}`;
                      return (
                        <Link
                          key={r.slug}
                          to={rHref}
                          className="flex items-start gap-3 p-4 rounded-xl border border-slate-700/60 bg-slate-900/60 hover:border-cyan-500/40 transition-colors"
                        >
                          <FileText className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm font-medium text-slate-200 leading-snug">
                            {rTitle}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              </ScrollReveal>
            );
          })()}
        </main>

        <Footer />
        <LandingChatWidget />
      </div>
    </>
  );
}
