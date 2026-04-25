import { useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { BookCallSection } from "@/components/landing/BookCallSection";
import { NetworkBackground } from "@/components/backgrounds/NetworkBackground";
import { SEOHead } from "@/components/seo";

export default function BookCall() {
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

  return (
    <>
      <SEOHead
        title="Book a strategy call · AiLys Agency · Bilingual EN, FR-CA, ES, ZH, AR, RU"
        description="60-minute AI search strategy call with AiLys Agency. Bilingual EN/FR-CA in-house. Spanish, Chinese, Arabic, Russian, Ukrainian, Serbian via partner network. Free, no pitch, strategy doc sent regardless."
        canonicalUrl="https://www.ailysagency.ca/book-call"
      />
      <NetworkBackground
        backgroundColor="#050505"
        nodeColor="#A78BFA"
        lineColor="#22D3EE"
        nodeCount={28}
        mobileNodeCount={16}
        connectionDistance={140}
        mouseInfluenceRadius={200}
        mouseInfluenceStrength={0.15}
      />
      <div className="min-h-screen overflow-x-hidden">
        <Navbar />
        <main className="pt-24">
          <BookCallSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
