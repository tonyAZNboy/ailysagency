import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { NetworkBackground } from "@/components/backgrounds/NetworkBackground";
import { SEOHead } from "@/components/seo";
import { ScrollReveal } from "@/components/animation";
import { useLang } from "@/i18n/LangContext";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n/index";
import { industries, getIndustryContent } from "@/data/industries";

export default function Industries() {
  const { lang: urlLang } = useParams<{ lang?: string }>();
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

  const baseUrl = "https://www.ailysagency.ca";
  const canonical = lang === "en" ? `${baseUrl}/industries` : `${baseUrl}/${lang}/industries`;
  const alternates = SUPPORTED_LANGS.map((l) => ({
    hrefLang: l,
    href: l === "en" ? `${baseUrl}/industries` : `${baseUrl}/${l}/industries`,
  }));

  // Schema.org ItemList for SEO + AI bot crawlers
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: industries.map((ind, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: ind.nameLong,
      url:
        lang === "en"
          ? `${baseUrl}/industries/${ind.slug}`
          : `${baseUrl}/${lang}/industries/${ind.slug}`,
    })),
  };

  const headlineEn = "Industries we serve.";
  const headlineFr = "Secteurs que nous servons.";
  const subEn =
    "Each vertical has its own AI search dynamics. We tune the methodology to match.";
  const subFr =
    "Chaque secteur a sa propre dynamique de recherche IA. On adapte la méthodologie en conséquence.";

  return (
    <>
      <SEOHead
        title={
          lang === "fr"
            ? "Secteurs · SEO IA spécialisé pour commerces locaux · AiLys Agency"
            : "Industries · Specialized AI SEO for Local Businesses · AiLys Agency"
        }
        description={
          lang === "fr"
            ? "SEO IA spécialisé pour 7 secteurs : dentistes, avocats, restaurants, entrepreneurs, cliniques médicales, courtiers immobiliers, hôtels. Optimisation AEO, GEO, E-E-A-T adaptée à chaque secteur. Bilingue EN et FR-CA. Ancré au Québec."
            : "Specialized AI SEO for 7 verticals: dentists, lawyers, restaurants, contractors, medical clinics, real estate, hotels. AEO, GEO, and E-E-A-T optimization tuned to each industry. Bilingual EN and FR-CA. Quebec-anchored."
        }
        canonicalUrl={canonical}
        keywords={[
          "AI SEO industries",
          "AEO by vertical",
          "GEO by industry",
          "AI search agency Quebec",
          "specialized SEO Montreal",
        ]}
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

        <main className="pt-24 pb-20 px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal variant="fade-up" delay={50} duration={600}>
              <div className="ailys-section-no mb-6">
                <span>{lang === "fr" ? "Secteurs" : "Industries"}</span>
              </div>
              <h1
                className="font-display tracking-tight leading-[0.95] mb-6 break-words"
                style={{ fontSize: "clamp(2.25rem, 7vw, 4.5rem)" }}
              >
                {lang === "fr" ? headlineFr : headlineEn}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-12">
                {lang === "fr" ? subFr : subEn}
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {industries.map((ind, i) => {
                const c = getIndustryContent(ind, lang);
                const href =
                  lang === "en"
                    ? `/industries/${ind.slug}`
                    : `/${lang}/industries/${ind.slug}`;
                return (
                  <ScrollReveal
                    key={ind.slug}
                    variant="fade-up"
                    delay={100 + i * 60}
                    duration={550}
                  >
                    <Link
                      to={href}
                      className="group flex flex-col h-full p-6 rounded-2xl border border-border/40 bg-card/40 backdrop-blur-md hover:border-primary/40 hover:bg-card/60 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl" aria-hidden="true">
                          {ind.emoji}
                        </span>
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-[0.22em] font-semibold text-white bg-gradient-to-r ${ind.toneClass}`}
                        >
                          {ind.name}
                        </span>
                      </div>
                      <h2 className="font-display text-2xl sm:text-3xl leading-tight mb-3 group-hover:text-primary transition-colors">
                        {ind.nameLong}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">
                        {c.subheadline}
                      </p>
                      <div className="mt-auto pt-4 border-t border-border/30 flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
                          {lang === "fr" ? "Voir le secteur" : "View industry"}
                        </span>
                        <ArrowRight className="w-4 h-4 text-primary/70 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </main>

        <Footer />
        <LandingChatWidget />
      </div>
    </>
  );
}
