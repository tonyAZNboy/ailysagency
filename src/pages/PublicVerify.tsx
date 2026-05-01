import { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { NetworkBackground } from "@/components/backgrounds/NetworkBackground";
import { SEOHead } from "@/components/seo";
import { ScrollReveal } from "@/components/animation";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LangContext";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n/index";
import { AiLysBadge } from "@/components/badge/AiLysBadge";

interface DemoTenant {
  name: string;
  city: string;
  industry: string;
  score: number;
  reviewVelocity: number;
  citations: number;
  schemaCompletenessPct: number;
  citedBy: string[];
  lastProbe: string;
}

const DEMO_TENANTS: Record<string, DemoTenant> = {
  demo: {
    name: "Acme Pizza Montreal",
    city: "Montreal, QC",
    industry: "Restaurant",
    score: 78,
    reviewVelocity: 4.2,
    citations: 28,
    schemaCompletenessPct: 86,
    citedBy: ["ChatGPT", "Perplexity", "Google AIO"],
    lastProbe: "2026-04-30",
  },
  sample: {
    name: "Sample Co",
    city: "Quebec, QC",
    industry: "Professional services",
    score: 92,
    reviewVelocity: 6.1,
    citations: 47,
    schemaCompletenessPct: 96,
    citedBy: ["ChatGPT", "Perplexity", "Claude", "Gemini", "Google AIO", "Bing Copilot"],
    lastProbe: "2026-05-01",
  },
};

export default function PublicVerify() {
  const { lang: urlLang, slug: rawSlug } = useParams<{ lang?: string; slug?: string }>();
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
  const slug = useMemo(
    () => (rawSlug || "demo").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 64),
    [rawSlug]
  );
  const tenant = DEMO_TENANTS[slug];
  const baseUrl = "https://www.ailysagency.ca";
  const canonical = lang === "en" ? `${baseUrl}/verify/${slug}` : `${baseUrl}/${lang}/verify/${slug}`;

  if (!tenant) {
    return (
      <>
        <SEOHead
          title={
            isFr
              ? "Rapport non trouvé · AiLys Verified"
              : "Report not found · AiLys Verified"
          }
          description={
            isFr
              ? "Aucun rapport AiLys Verified trouvé pour cet identifiant."
              : "No AiLys Verified report found for this identifier."
          }
          canonicalUrl={canonical}
          noindex
        />
        <NetworkBackground
          backgroundColor="#050505"
          nodeColor="#22D3EE"
          lineColor="#A78BFA"
          nodeCount={20}
          mobileNodeCount={10}
        />
        <div className="min-h-screen relative">
          <Navbar />
          <main className="container mx-auto px-4 sm:px-6 pt-32 pb-20 max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-white mb-4">
              {isFr ? "Rapport introuvable" : "Report not found"}
            </h1>
            <p className="text-slate-300 mb-8">
              {isFr
                ? `L'identifiant « ${slug} » ne correspond à aucun rapport public AiLys.`
                : `The identifier "${slug}" does not match any public AiLys report.`}
            </p>
            <Link
              to={lang === "en" ? "/" : `/${lang}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition-colors"
            >
              {isFr ? "Retour à l'accueil" : "Back to home"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Report",
    name: `${tenant.name} · AiLys AI Visibility Report`,
    description: `${tenant.name} (${tenant.industry}, ${tenant.city}) AI Visibility score ${tenant.score}/100, last probed ${tenant.lastProbe}.`,
    datePublished: tenant.lastProbe,
    publisher: {
      "@type": "Organization",
      name: "AiLys Agency",
      url: baseUrl,
    },
    about: {
      "@type": "LocalBusiness",
      name: tenant.name,
      address: tenant.city,
    },
  };

  return (
    <>
      <SEOHead
        title={
          isFr
            ? `${tenant.name} · Rapport AiLys Verified · Score ${tenant.score}/100`
            : `${tenant.name} · AiLys Verified Report · Score ${tenant.score}/100`
        }
        description={
          isFr
            ? `Rapport public AiLys pour ${tenant.name} (${tenant.industry}, ${tenant.city}). Score visibilité IA ${tenant.score}/100. Cité par ${tenant.citedBy.join(", ")}. Dernière probe ${tenant.lastProbe}.`
            : `Public AiLys report for ${tenant.name} (${tenant.industry}, ${tenant.city}). AI Visibility score ${tenant.score}/100. Cited by ${tenant.citedBy.join(", ")}. Last probed ${tenant.lastProbe}.`
        }
        canonicalUrl={canonical}
        keywords={[
          tenant.name,
          "AiLys Verified",
          "AI Visibility report",
          tenant.industry,
        ]}
        structuredData={structuredData}
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

        <main className="container mx-auto px-4 sm:px-6 pt-24 pb-20 max-w-4xl">
          <ScrollReveal>
            <header className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-medium text-emerald-300">
                <ShieldCheck className="w-3 h-3" />
                {isFr ? "Vérifié par AiLys" : "Verified by AiLys"}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
                {tenant.name}
              </h1>
              <p className="text-base sm:text-lg text-slate-300">
                {tenant.industry} · {tenant.city}
              </p>
            </header>
          </ScrollReveal>

          <ScrollReveal>
            <section className="mb-10 flex justify-center">
              <AiLysBadge variant="full" score={tenant.score} businessName={tenant.name} lang={lang} />
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              <div className="p-5 rounded-xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-sm">
                <p className="text-xs font-medium text-slate-400 mb-1">
                  {isFr ? "Score visibilité IA" : "AI Visibility score"}
                </p>
                <p className="text-2xl font-bold text-white">{tenant.score}<span className="text-sm text-slate-400">/100</span></p>
              </div>
              <div className="p-5 rounded-xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-sm">
                <p className="text-xs font-medium text-slate-400 mb-1">
                  {isFr ? "Vélocité d'avis" : "Review velocity"}
                </p>
                <p className="text-2xl font-bold text-white">{tenant.reviewVelocity}<span className="text-sm text-slate-400">/{isFr ? "mois" : "mo"}</span></p>
              </div>
              <div className="p-5 rounded-xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-sm">
                <p className="text-xs font-medium text-slate-400 mb-1">
                  {isFr ? "Citations actives" : "Active citations"}
                </p>
                <p className="text-2xl font-bold text-white">{tenant.citations}</p>
              </div>
              <div className="p-5 rounded-xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-sm">
                <p className="text-xs font-medium text-slate-400 mb-1">
                  {isFr ? "Schema markup" : "Schema markup"}
                </p>
                <p className="text-2xl font-bold text-white">{tenant.schemaCompletenessPct}<span className="text-sm text-slate-400">%</span></p>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="mb-10 p-6 sm:p-8 rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-white mb-4">
                {isFr ? "Cité par" : "Cited by"}
              </h2>
              <div className="flex flex-wrap gap-2">
                {tenant.citedBy.map((engine) => (
                  <span
                    key={engine}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-sm text-cyan-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {engine}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-4">
                {isFr
                  ? `Dernière probe : ${tenant.lastProbe}. Probes hebdomadaires automatiques pour les clients Growth et Agency.`
                  : `Last probed: ${tenant.lastProbe}. Automatic weekly probes for Growth and Agency clients.`}
              </p>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="p-6 sm:p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 to-slate-900/60 backdrop-blur-sm text-center">
              <h2 className="text-2xl font-bold text-white mb-3">
                {isFr ? "Vous voulez le même rapport pour votre marque ?" : "Want the same report for your brand?"}
              </h2>
              <p className="text-slate-300 mb-6 max-w-xl mx-auto">
                {isFr
                  ? "AiLys mesure votre visibilité dans ChatGPT, Perplexity, Google AIO et plus. À partir de 300 $ CAD/mois, site web inclus."
                  : "AiLys measures your visibility in ChatGPT, Perplexity, Google AIO and more. From $300 CAD/mo, website build included."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to={lang === "en" ? "/audit" : `/${lang}/audit`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition-colors"
                >
                  {isFr ? "Lancer l'audit gratuit" : "Run free audit"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to={lang === "en" ? "/forfaits-complets" : `/${lang}/forfaits-complets`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-700 hover:bg-slate-800 text-white transition-colors"
                >
                  {isFr ? "Voir les forfaits" : "See plans"}
                </Link>
              </div>
            </section>
          </ScrollReveal>

          <p className="text-xs text-slate-600 text-center mt-10">
            {isFr
              ? "Ce rapport est généré automatiquement à partir des dernières probes AiLys. Les données reflètent l'état au moment de la dernière probe."
              : "This report is auto-generated from the latest AiLys probes. Data reflects the state at the last probe."}
          </p>
        </main>

        <Footer />
        <LandingChatWidget />
      </div>
    </>
  );
}
