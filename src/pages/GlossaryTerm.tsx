import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { NetworkBackground } from "@/components/backgrounds/NetworkBackground";
import { SEOHead } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animation";
import { useLang } from "@/i18n/LangContext";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n/index";
import {
  getGlossaryTerm,
  getRelatedTerms,
  glossaryCategoryLabels,
} from "@/data/glossary";

export default function GlossaryTerm() {
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

  const term = slug ? getGlossaryTerm(slug) : undefined;
  const isFr = lang === "fr";

  if (!term) {
    return (
      <>
        <SEOHead
          title={isFr ? "Terme non trouvé · AiLys" : "Term not found · AiLys"}
          description=""
          canonicalUrl="https://www.ailysagency.ca/glossary"
        />
        <Navbar />
        <main className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-lg">
            <h1 className="font-display text-5xl mb-4">
              {isFr ? "Terme non trouvé" : "Term not found"}
            </h1>
            <Button onClick={() => navigate(isFr ? "/fr/glossary" : "/glossary")}>
              {isFr ? "Voir le glossaire" : "View glossary"}
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const baseUrl = "https://www.ailysagency.ca";
  const canonical =
    lang === "en"
      ? `${baseUrl}/glossary/${term.slug}`
      : `${baseUrl}/${lang}/glossary/${term.slug}`;
  const alternates = SUPPORTED_LANGS.map((l) => ({
    hrefLang: l,
    href:
      l === "en"
        ? `${baseUrl}/glossary/${term.slug}`
        : `${baseUrl}/${l}/glossary/${term.slug}`,
  }));

  const titleStr = isFr ? term.termFr : term.term;
  const shortStr = isFr ? term.shortFr : term.shortEn;
  const longStr = isFr ? term.longFr : term.longEn;
  const catLabel = isFr
    ? glossaryCategoryLabels[term.category].fr
    : glossaryCategoryLabels[term.category].en;
  const related = getRelatedTerms(term.related);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Glossary", item: `${baseUrl}/glossary` },
          { "@type": "ListItem", position: 3, name: titleStr, item: canonical },
        ],
      },
      {
        "@type": "DefinedTerm",
        name: titleStr,
        description: shortStr,
        url: canonical,
        inDefinedTermSet: `${baseUrl}/glossary`,
      },
    ],
  };

  return (
    <>
      <SEOHead
        title={isFr ? `${titleStr} · Glossaire SEO IA · AiLys` : `${titleStr} · AI SEO Glossary · AiLys`}
        description={shortStr}
        canonicalUrl={canonical}
        keywords={[titleStr, "AI SEO", "AEO", "GEO", "E-E-A-T", "glossary"]}
        alternateLocales={alternates}
        structuredData={structuredData}
      />
      <NetworkBackground
        backgroundColor="#050505"
        nodeColor="#22D3EE"
        lineColor="#A78BFA"
        nodeCount={20}
        mobileNodeCount={12}
        connectionDistance={140}
        mouseInfluenceRadius={180}
        mouseInfluenceStrength={0.12}
      />

      <div className="min-h-screen overflow-x-clip">
        <Navbar />

        <main className="pt-24 pb-20 px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              to={isFr ? "/fr/glossary" : "/glossary"}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground/70 hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {isFr ? "Retour au glossaire" : "Back to glossary"}
            </Link>

            <ScrollReveal variant="fade-up" delay={50} duration={650}>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary mb-3">
                {catLabel}
              </div>
              <h1
                className="font-display tracking-tight leading-[1.05] mb-5 break-words"
                style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
              >
                {titleStr}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10">
                {shortStr}
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={150} duration={700}>
              <div className="prose prose-invert prose-lg max-w-none mb-12 prose-p:text-foreground/85 prose-p:leading-relaxed prose-strong:text-foreground">
                {longStr.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </ScrollReveal>

            {related.length > 0 && (
              <ScrollReveal variant="fade-up" delay={250} duration={650}>
                <div className="border-t border-border/40 pt-10">
                  <h2 className="font-display text-2xl sm:text-3xl mb-5">
                    {isFr ? "Termes liés" : "Related terms"}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {related.map((r) => {
                      const rTerm = isFr ? r.termFr : r.term;
                      const rShort = isFr ? r.shortFr : r.shortEn;
                      const href =
                        lang === "en"
                          ? `/glossary/${r.slug}`
                          : `/${lang}/glossary/${r.slug}`;
                      return (
                        <Link
                          key={r.slug}
                          to={href}
                          className="group flex flex-col p-4 rounded-xl border border-border/40 bg-card/30 hover:border-primary/40 hover:bg-card/50 transition-all"
                        >
                          <div className="font-display text-lg leading-tight group-hover:text-primary transition-colors mb-1">
                            {rTerm}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {rShort}
                          </p>
                          <ArrowRight className="w-3.5 h-3.5 text-primary/70 mt-2 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* CTA back to audit */}
            <ScrollReveal variant="fade-up" delay={350} duration={700}>
              <div className="mt-12 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/[0.08] via-secondary/[0.05] to-accent/[0.08] backdrop-blur-md p-7">
                <h3 className="font-display text-2xl sm:text-3xl mb-3 leading-tight">
                  {isFr ? "Voir comment AiLys utilise " : "See how AiLys uses "}
                  <span className="italic">{titleStr.split(" (")[0]}</span>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {isFr
                    ? "Lancez un audit gratuit de visibilité IA. On évalue où votre entreprise se situe sur ce signal et 8 autres, et on envoie un plan 90 jours par courriel."
                    : "Run a free AI Visibility Audit. We score where your business stands on this signal and 8 others, and email you a 90-day plan."}
                </p>
                <Button
                  onClick={() => navigate("/audit")}
                  className="rounded-full font-semibold"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                  }}
                >
                  {isFr ? "Lancer l'audit gratuit" : "Run free audit"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </main>

        <Footer />
        <LandingChatWidget />
      </div>
    </>
  );
}
