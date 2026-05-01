import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, FileText, Lock } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { NetworkBackground } from "@/components/backgrounds/NetworkBackground";
import { SEOHead } from "@/components/seo";
import { ScrollReveal } from "@/components/animation";
import { useLang } from "@/i18n/LangContext";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n/index";
import { industryReports } from "@/data/industry-reports";

export default function IndustryReports() {
  const { lang: urlLang } = useParams<{ lang?: string }>();
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

  const isFr = lang === "fr";
  const baseUrl = "https://www.ailysagency.ca";
  const canonical = lang === "en" ? `${baseUrl}/industry-reports` : `${baseUrl}/${lang}/industry-reports`;
  const alternates = SUPPORTED_LANGS.map((l) => ({
    hrefLang: l,
    href: l === "en" ? `${baseUrl}/industry-reports` : `${baseUrl}/${l}/industry-reports`,
  }));

  return (
    <>
      <SEOHead
        title={
          isFr
            ? "Rapports d'industrie · Etat de la visibilite IA par verticale · AiLys Agency"
            : "Industry Reports · State of AI Visibility by Vertical · AiLys Agency"
        }
        description={
          isFr
            ? "Rapports trimestriels gratuits sur la visibilite IA des dentistes, restaurants, avocats et autres verticales locales du Quebec. Donnees agregees anonymisees a travers 6 moteurs de recherche IA. Bilingue EN et FR-CA."
            : "Free quarterly reports on AI Visibility for dentists, restaurants, lawyers, and other Quebec local verticals. Anonymized aggregate data across 6 AI search engines. Bilingual EN and FR-CA."
        }
        canonicalUrl={canonical}
        keywords={[
          "industry reports",
          "AI Visibility Quebec",
          "AI search benchmarks",
          "dental SEO Quebec",
          "restaurant SEO Quebec",
        ]}
        alternateLocales={alternates}
      />
      <NetworkBackground
        backgroundColor="#050505"
        nodeColor="#22D3EE"
        lineColor="#A78BFA"
        nodeCount={26}
        mobileNodeCount={14}
      />

      <div className="min-h-screen relative">
        <Navbar />

        <main className="container mx-auto px-4 sm:px-6 pt-24 pb-20 max-w-5xl">
          <ScrollReveal>
            <header className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs font-medium text-violet-300">
                {isFr ? "Rapports trimestriels gratuits" : "Free quarterly reports"}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                {isFr
                  ? "Etat de la visibilite IA par industrie"
                  : "State of AI Visibility by Industry"}
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
                {isFr
                  ? "Donnees agregees anonymisees collectees sur 6 moteurs IA (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot). Lecture en 7 minutes. Telechargement gratuit."
                  : "Anonymized aggregate data collected across 6 AI engines (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot). 7-minute read. Free download."}
              </p>
            </header>
          </ScrollReveal>

          <ScrollReveal>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {industryReports.map((report) => {
                const isLive = report.status === "live";
                const title = isFr ? report.titleFr : report.title;
                const excerpt = isFr ? report.excerptFr : report.excerpt;
                const detailHref = lang === "en"
                  ? `/industry-reports/${report.slug}`
                  : `/${lang}/industry-reports/${report.slug}`;

                return (
                  <article
                    key={report.slug}
                    className={`flex flex-col p-6 rounded-2xl border bg-slate-900/60 backdrop-blur-sm transition-colors ${
                      isLive
                        ? "border-slate-700/60 hover:border-cyan-500/40"
                        : "border-slate-800/60 opacity-70"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {isLive ? (
                        <FileText className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <Lock className="w-4 h-4 text-slate-500" />
                      )}
                      <span className="text-xs font-medium text-slate-400">
                        {report.region} · {report.quarter} {report.year}
                      </span>
                      {isLive ? (
                        <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                          {isFr ? "Live" : "Live"}
                        </span>
                      ) : (
                        <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                          {isFr ? "A venir" : "Coming soon"}
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg font-semibold text-white mb-2 leading-snug">
                      {title}
                    </h2>
                    <p className="text-sm text-slate-400 mb-4 flex-1">
                      {excerpt}
                    </p>
                    {isLive ? (
                      <Link
                        to={detailHref}
                        className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        {isFr ? "Lire le rapport" : "Read the report"}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-500">
                        {isFr ? "Notifiez-moi" : "Notify me"}
                      </span>
                    )}
                  </article>
                );
              })}
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="p-6 sm:p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 to-slate-900/60 backdrop-blur-sm text-center">
              <h2 className="text-2xl font-bold text-white mb-3">
                {isFr ? "Vous etes dans une de ces verticales ?" : "You're in one of these verticals?"}
              </h2>
              <p className="text-slate-300 mb-6 max-w-xl mx-auto">
                {isFr
                  ? "Lancez l'audit gratuit AiLys et voyez comment vous vous comparez a la mediane de votre verticale."
                  : "Run the free AiLys audit and see how you compare to your vertical's median."}
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
        </main>

        <Footer />
        <LandingChatWidget />
      </div>
    </>
  );
}
