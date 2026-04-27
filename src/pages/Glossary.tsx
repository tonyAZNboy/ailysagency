import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { NetworkBackground } from "@/components/backgrounds/NetworkBackground";
import { SEOHead } from "@/components/seo";
import { ScrollReveal } from "@/components/animation";
import { Input } from "@/components/ui/input";
import { useLang } from "@/i18n/LangContext";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n/index";
import {
  glossaryTerms,
  glossaryCategoryLabels,
  type GlossaryTerm,
} from "@/data/glossary";

const CATEGORIES: GlossaryTerm["category"][] = [
  "ai-search",
  "classical-seo",
  "schema",
  "review-velocity",
  "tooling",
];

export default function Glossary() {
  const { lang: urlLang } = useParams<{ lang?: string }>();
  const { lang, setLang } = useLang();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    GlossaryTerm["category"] | "all"
  >("all");

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

  const filtered = useMemo(() => {
    return glossaryTerms.filter((t) => {
      if (activeCategory !== "all" && t.category !== activeCategory) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      const term = isFr ? t.termFr : t.term;
      const short = isFr ? t.shortFr : t.shortEn;
      return term.toLowerCase().includes(q) || short.toLowerCase().includes(q);
    });
  }, [search, activeCategory, isFr]);

  const baseUrl = "https://www.ailysagency.ca";
  const canonical = lang === "en" ? `${baseUrl}/glossary` : `${baseUrl}/${lang}/glossary`;
  const alternates = SUPPORTED_LANGS.map((l) => ({
    hrefLang: l,
    href: l === "en" ? `${baseUrl}/glossary` : `${baseUrl}/${l}/glossary`,
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "AiLys Agency · AI search and local SEO glossary",
    hasDefinedTerm: glossaryTerms.map((t) => ({
      "@type": "DefinedTerm",
      name: isFr ? t.termFr : t.term,
      description: isFr ? t.shortFr : t.shortEn,
      url: `${baseUrl}${lang === "en" ? "" : `/${lang}`}/glossary/${t.slug}`,
      inDefinedTermSet: canonical,
    })),
  };

  return (
    <>
      <SEOHead
        title={
          isFr
            ? "Glossaire · SEO IA, AEO, GEO, E-E-A-T expliqués · AiLys Agency"
            : "Glossary · AI SEO, AEO, GEO, E-E-A-T Explained · AiLys Agency"
        }
        description={
          isFr
            ? "Glossaire complet des termes SEO IA et SEO local : AEO, GEO, E-E-A-T, schema, NAP, GBP, Wikidata, vélocité d'avis, et plus. Définitions claires en langage simple. Bilingue EN et FR-CA."
            : "Complete glossary of AI SEO and local SEO terms: AEO, GEO, E-E-A-T, schema, NAP, GBP, Wikidata, review velocity, and more. Plain-language definitions. Bilingual EN and FR-CA."
        }
        canonicalUrl={canonical}
        keywords={[
          "AI SEO glossary",
          "AEO definition",
          "GEO definition",
          "E-E-A-T explained",
          "schema markup glossary",
          "local SEO terms",
        ]}
        alternateLocales={alternates}
        structuredData={structuredData}
      />
      <NetworkBackground
        backgroundColor="#050505"
        nodeColor="#22D3EE"
        lineColor="#A78BFA"
        nodeCount={26}
        mobileNodeCount={14}
        connectionDistance={140}
        mouseInfluenceRadius={200}
        mouseInfluenceStrength={0.14}
      />

      <div className="min-h-screen overflow-x-clip">
        <Navbar />

        <main className="pt-24 pb-20 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <ScrollReveal variant="fade-up" delay={50} duration={650}>
              <div className="ailys-section-no mb-6">
                <span>{isFr ? "Glossaire" : "Glossary"}</span>
              </div>
              <h1
                className="font-display tracking-tight leading-[0.95] mb-6 break-words"
                style={{ fontSize: "clamp(2.25rem, 7vw, 4.5rem)" }}
              >
                {isFr ? (
                  <>
                    Termes SEO IA, <span className="italic">expliqués clairement.</span>
                  </>
                ) : (
                  <>
                    AI SEO terms, <span className="italic">in plain language.</span>
                  </>
                )}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed mb-10">
                {isFr
                  ? "AEO, GEO, E-E-A-T, schema, NAP, GBP, Wikidata, vélocité d'avis. Le vocabulaire de la recherche IA en langage simple, sans le jargon des agences."
                  : "AEO, GEO, E-E-A-T, schema, NAP, GBP, Wikidata, review velocity. The vocabulary of AI search in plain language, without the agency jargon."}
              </p>
            </ScrollReveal>

            {/* Search + filter */}
            <ScrollReveal variant="fade-up" delay={150} duration={650}>
              <div className="flex flex-col gap-4 mb-10">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 pointer-events-none" />
                  <Input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={isFr ? "Rechercher un terme..." : "Search a term..."}
                    className="pl-10 h-11 bg-card/40 border-border/50"
                    aria-label={isFr ? "Rechercher un terme" : "Search a term"}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveCategory("all")}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-[0.18em] border transition-colors ${
                      activeCategory === "all"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border/40 text-muted-foreground hover:border-border"
                    }`}
                  >
                    {isFr ? "Tous" : "All"} ({glossaryTerms.length})
                  </button>
                  {CATEGORIES.map((cat) => {
                    const count = glossaryTerms.filter((t) => t.category === cat).length;
                    const label = isFr
                      ? glossaryCategoryLabels[cat].fr
                      : glossaryCategoryLabels[cat].en;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-[0.18em] border transition-colors ${
                          activeCategory === cat
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border/40 text-muted-foreground hover:border-border"
                        }`}
                      >
                        {label} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            {/* Term list */}
            {filtered.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">
                {isFr ? "Aucun terme ne correspond." : "No matching terms."}
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                {filtered.map((t, i) => {
                  const term = isFr ? t.termFr : t.term;
                  const short = isFr ? t.shortFr : t.shortEn;
                  const href =
                    lang === "en" ? `/glossary/${t.slug}` : `/${lang}/glossary/${t.slug}`;
                  const catLabel = isFr
                    ? glossaryCategoryLabels[t.category].fr
                    : glossaryCategoryLabels[t.category].en;
                  return (
                    <ScrollReveal
                      key={t.slug}
                      variant="fade-up"
                      delay={50 + (i % 6) * 40}
                      duration={500}
                    >
                      <Link
                        to={href}
                        className="group block p-5 rounded-xl border border-border/40 bg-card/40 backdrop-blur-md hover:border-primary/40 hover:bg-card/60 transition-all h-full"
                      >
                        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60 mb-2">
                          {catLabel}
                        </div>
                        <h2 className="font-display text-xl sm:text-2xl mb-2 leading-tight group-hover:text-primary transition-colors">
                          {term}
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {short}
                        </p>
                        <div className="flex items-center gap-2 mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-primary/70 group-hover:text-primary transition-colors">
                          {isFr ? "Lire la définition" : "Read definition"}
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </Link>
                    </ScrollReveal>
                  );
                })}
              </div>
            )}

            {/* sr-only SEO summary block */}
            <div className="sr-only" aria-hidden="false">
              {isFr ? "Glossaire AiLys Agency : " : "AiLys Agency Glossary: "}
              {glossaryTerms.map((t) => (isFr ? `${t.termFr}: ${t.shortFr}` : `${t.term}: ${t.shortEn}`)).join(" ")}
            </div>
          </div>
        </main>

        <Footer />
        <LandingChatWidget />
      </div>
    </>
  );
}
