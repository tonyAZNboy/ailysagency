import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLang } from "@/i18n/LangContext";
import { SUPPORTED_LANGS, SupportedLang } from "@/i18n/index";
import { SEOHead, generateLandingPageSchemaGraph } from "@/components/seo";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { PricingDriversSection } from "@/components/landing/PricingDriversSection";
import { PricingBuilderSection } from "@/components/landing/PricingBuilderSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { MethodologySection } from "@/components/landing/MethodologySection";
import { BookCallSection } from "@/components/landing/BookCallSection";
import { WhyAiLysSection } from "@/components/landing/WhyAiLysSection";
import { FoundingClientsSection } from "@/components/landing/FoundingClientsSection";
import { AuditCtaSection } from "@/components/landing/AuditCtaSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { Footer } from "@/components/landing/Footer";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { ExitIntentModal } from "@/components/landing/ExitIntentModal";
import { NetworkBackground } from "@/components/backgrounds/NetworkBackground";
import { APP_CONFIG } from "@/config/app";
import { ResourcesSection } from "@/components/landing/ResourcesSection";

const Index = () => {
  const { lang: urlLang } = useParams<{ lang?: string }>();
  const { setLang } = useLang();

  // Sync URL lang param into context on mount/change
  useEffect(() => {
    if (urlLang && SUPPORTED_LANGS.includes(urlLang as SupportedLang)) {
      setLang(urlLang as SupportedLang);
    }
  }, [urlLang, setLang]);

  // Force dark theme on landing for consistent editorial look
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-force-dark", "true");
    root.classList.add("dark");
    return () => {
      root.removeAttribute("data-force-dark");
      const stored = localStorage.getItem("theme");
      if (stored === "light") {
        root.classList.remove("dark");
      } else if (stored === "system") {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.classList.toggle("dark", isDark);
      }
    };
  }, []);

  // Smooth-scroll to hash anchors on load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  const faqData = {
    questions: [
      {
        question: "What is AEO?",
        answer:
          "Answer Engine Optimization. We structure your content so AI engines like Google AI Overviews, Bing Copilot, and ChatGPT pull a clean answer from your site instead of a competitor. The work is schema markup, structured Q and A formats, scannable content, and entity disambiguation.",
      },
      {
        question: "What is GEO?",
        answer:
          "Generative Engine Optimization. We get your brand named inside the actual responses of ChatGPT, Perplexity, Claude, and Gemini. The work is authoritative publications, Wikipedia and Wikidata presence, forum signals, and digital PR.",
      },
      {
        question: "What is E-E-A-T?",
        answer:
          "Experience, Expertise, Authoritativeness, Trust. Google's framework for evaluating content quality. AI engines use the same signals when picking who to cite. We make those signals visible.",
      },
      {
        question: "Why does AI search matter for a local business?",
        answer:
          "ChatGPT alone runs roughly 60 billion queries a month. Perplexity is doubling year over year. If your business is not cited in those answers, you are invisible to a growing share of buyers.",
      },
      {
        question: "How long until I see results?",
        answer:
          "Schema and GBP improvements show up in 30 to 60 days. Real LLM citation lift typically lands at the 90 to 120 day mark. We send a monthly citation report.",
      },
      {
        question: "How much does AiLys cost?",
        answer:
          "Plans run $300/mo (Starter), $600/mo (Core, most chosen), and $1,200/mo (Growth). Month to month, no annual contract.",
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="AiLys Agency · LLM Visibility & Optimization · AEO, GEO, E-E-A-T · Made in Québec"
        description={APP_CONFIG.description}
        canonicalUrl={APP_CONFIG.url}
        keywords={[...APP_CONFIG.keywords]}
        structuredData={generateLandingPageSchemaGraph(faqData)}
      />

      <NetworkBackground
        backgroundColor="#050505"
        nodeColor="#22D3EE"
        lineColor="#A78BFA"
        nodeCount={38}
        mobileNodeCount={20}
        connectionDistance={140}
        mouseInfluenceRadius={250}
        mouseInfluenceStrength={0.18}
      />

      <div className="min-h-screen overflow-x-clip" role="main">
        <Navbar />

        <main id="main-content" aria-label="Main content">
          <HeroSection />
          <ServicesSection />
          <PricingDriversSection />
          <PricingBuilderSection />
          <MethodologySection />
          <ProcessSection />
          <BookCallSection />
          <WhyAiLysSection />
          <FoundingClientsSection />
          <AuditCtaSection />
          <ResourcesSection />
          <AboutSection />
          <FaqSection />
        </main>

        <Footer />
        <LandingChatWidget />
        <ExitIntentModal />
      </div>
    </>
  );
};

export default Index;
