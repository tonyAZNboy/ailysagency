import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Copy, Check, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { NetworkBackground } from "@/components/backgrounds/NetworkBackground";
import { SEOHead } from "@/components/seo";
import { ScrollReveal } from "@/components/animation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLang } from "@/i18n/LangContext";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n/index";
import { AiLysBadge } from "@/components/badge/AiLysBadge";

export default function BadgeEmbed() {
  const { lang: urlLang } = useParams<{ lang?: string }>();
  const { lang, setLang } = useLang();
  const [slug, setSlug] = useState("demo");
  const [variant, setVariant] = useState<"compact" | "full">("compact");
  const [copied, setCopied] = useState<string | null>(null);

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
  const safeSlug = useMemo(
    () => slug.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 64) || "demo",
    [slug]
  );

  const badgeImgUrl = `${baseUrl}/api/badge.svg?slug=${safeSlug}&variant=${variant}&lang=${lang === "fr" ? "fr" : "en"}`;
  const verifyUrl = `${baseUrl}${lang === "en" ? "" : `/${lang}`}/verify/${safeSlug}`;
  const htmlEmbed = `<a href="${verifyUrl}" target="_blank" rel="noopener"><img src="${badgeImgUrl}" alt="${isFr ? "Vérifié par AiLys" : "Verified by AiLys"}" width="${variant === "full" ? 320 : 220}" height="${variant === "full" ? 120 : 64}" loading="lazy" /></a>`;
  const markdownEmbed = `[![${isFr ? "Vérifié par AiLys" : "Verified by AiLys"}](${badgeImgUrl})](${verifyUrl})`;

  const canonical = lang === "en" ? `${baseUrl}/badge` : `${baseUrl}/${lang}/badge`;
  const alternates = SUPPORTED_LANGS.map((l) => ({
    hrefLang: l,
    href: l === "en" ? `${baseUrl}/badge` : `${baseUrl}/${l}/badge`,
  }));

  function copy(value: string, key: string) {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    });
  }

  return (
    <>
      <SEOHead
        title={
          isFr
            ? "Insigne AiLys Vérifié · Affichez votre score de visibilité IA · AiLys Agency"
            : "AiLys Verified Badge · Display Your AI Visibility Score · AiLys Agency"
        }
        description={
          isFr
            ? "Affichez l'insigne AiLys Vérifié sur votre site web. Code d'intégration prêt à coller en HTML ou Markdown. Lien direct vers votre rapport public de visibilité IA. Bilingue EN et FR-CA."
            : "Display the AiLys Verified badge on your website. Copy-paste embed code in HTML or Markdown. Direct link to your public AI Visibility report. Bilingual EN and FR-CA."
        }
        canonicalUrl={canonical}
        keywords={[
          "AiLys badge",
          "AI Visibility badge",
          "verified badge embed",
          "trust badge",
          "AI SEO badge",
        ]}
        alternateLocales={alternates}
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

      <div className="min-h-screen relative">
        <Navbar />

        <main className="container mx-auto px-4 sm:px-6 pt-24 pb-20 max-w-5xl">
          <ScrollReveal>
            <header className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-medium text-cyan-300">
                {isFr ? "Module gratuit pour clients AiLys" : "Free module for AiLys clients"}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                {isFr
                  ? "Insigne AiLys Vérifié"
                  : "AiLys Verified Badge"}
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
                {isFr
                  ? "Affichez votre score de visibilité IA dans le pied de page de votre site. Le visiteur clique et arrive sur votre rapport public AiLys."
                  : "Display your AI Visibility score in your site footer. Visitors click through to your public AiLys report."}
              </p>
            </header>
          </ScrollReveal>

          <ScrollReveal>
            <section className="mb-10 p-6 sm:p-8 rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-white mb-4">
                {isFr ? "Aperçu" : "Preview"}
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-slate-400 mb-2">
                    {isFr ? "Identifiant client (slug)" : "Client identifier (slug)"}
                  </label>
                  <Input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="demo"
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    {isFr
                      ? "Pour la démo, utilisez « demo » ou « sample ». Votre slug réel vous est fourni à l'onboarding."
                      : "For the demo, use \"demo\" or \"sample\". Your real slug is provided at onboarding."}
                  </p>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-slate-400 mb-2">
                    {isFr ? "Format" : "Variant"}
                  </label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={variant === "compact" ? "default" : "outline"}
                      onClick={() => setVariant("compact")}
                      className="flex-1"
                    >
                      {isFr ? "Compact (220×64)" : "Compact (220×64)"}
                    </Button>
                    <Button
                      type="button"
                      variant={variant === "full" ? "default" : "outline"}
                      onClick={() => setVariant("full")}
                      className="flex-1"
                    >
                      {isFr ? "Complet (320×120)" : "Full (320×120)"}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center p-8 rounded-xl bg-slate-950 border border-slate-800">
                <AiLysBadge
                  variant={variant}
                  score={safeSlug === "sample" ? 92 : 78}
                  businessName={safeSlug === "sample" ? "Sample Co" : "Acme Pizza Montreal"}
                  lang={lang}
                />
              </div>
              <p className="text-xs text-slate-500 mt-4 text-center">
                {isFr
                  ? `Lien de vérification: ${verifyUrl}`
                  : `Verification link: ${verifyUrl}`}
              </p>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="mb-10 p-6 sm:p-8 rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-white mb-2">
                {isFr ? "Code d'intégration HTML" : "HTML embed code"}
              </h2>
              <p className="text-sm text-slate-400 mb-4">
                {isFr
                  ? "Collez ce code dans le pied de page de votre site (Wordpress, Webflow, Shopify, code custom)."
                  : "Paste this code in your site footer (Wordpress, Webflow, Shopify, custom code)."}
              </p>
              <div className="relative">
                <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-slate-200">
                  <code>{htmlEmbed}</code>
                </pre>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copy(htmlEmbed, "html")}
                >
                  {copied === "html" ? (
                    <>
                      <Check className="w-3 h-3 mr-1" /> {isFr ? "Copié" : "Copied"}
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 mr-1" /> {isFr ? "Copier" : "Copy"}
                    </>
                  )}
                </Button>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="mb-10 p-6 sm:p-8 rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-white mb-2">
                {isFr ? "Code Markdown" : "Markdown code"}
              </h2>
              <p className="text-sm text-slate-400 mb-4">
                {isFr
                  ? "Pour un README GitHub, un blog Markdown, ou Notion."
                  : "For a GitHub README, a Markdown blog, or Notion."}
              </p>
              <div className="relative">
                <pre className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-slate-200">
                  <code>{markdownEmbed}</code>
                </pre>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copy(markdownEmbed, "md")}
                >
                  {copied === "md" ? (
                    <>
                      <Check className="w-3 h-3 mr-1" /> {isFr ? "Copié" : "Copied"}
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 mr-1" /> {isFr ? "Copier" : "Copy"}
                    </>
                  )}
                </Button>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="mb-10 p-6 sm:p-8 rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-white mb-4">
                {isFr ? "Comment ça marche" : "How it works"}
              </h2>
              <ol className="space-y-3 text-sm text-slate-300">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs font-semibold">1</span>
                  <span>
                    {isFr
                      ? "Vous devenez client AiLys (Starter à partir de 300 $ CAD/mois). À l'onboarding, vous recevez votre slug unique."
                      : "You become an AiLys client (Starter from $300 CAD/mo). At onboarding, you receive your unique slug."}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs font-semibold">2</span>
                  <span>
                    {isFr
                      ? "Vous collez le code d'intégration ci-dessus dans le pied de page de votre site."
                      : "You paste the embed code above into your site footer."}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs font-semibold">3</span>
                  <span>
                    {isFr
                      ? "L'insigne se met à jour automatiquement chaque semaine selon votre score actuel de visibilité IA."
                      : "The badge auto-updates weekly based on your current AI Visibility score."}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs font-semibold">4</span>
                  <span>
                    {isFr
                      ? "Vos visiteurs cliquent et voient votre rapport public sur ailysagency.ca/verify/votre-slug. Ça crédibilise votre marque et génère un lien retour vers AiLys."
                      : "Visitors click through and see your public report at ailysagency.ca/verify/your-slug. It builds trust and generates a backlink to AiLys."}
                  </span>
                </li>
              </ol>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="text-center">
              <Link
                to={lang === "en" ? `/verify/${safeSlug}` : `/${lang}/verify/${safeSlug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition-colors"
              >
                {isFr ? "Voir un rapport public exemple" : "See a sample public report"}
                <ExternalLink className="w-4 h-4" />
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
