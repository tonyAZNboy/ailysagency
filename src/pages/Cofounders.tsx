// Cofounders / Private Partners page (interim).
//
// The full application form was archived to Cofounders.archived.tsx
// while the program remains invitation-only. This interim page tells
// visitors who land here from a shared video that the program is for
// private partners only and to reach out to the person who shared the
// video with them. When the program opens to the public, swap this
// component back to the archived version.
//
// Routes (defined in App.tsx, unchanged):
//   /cofounders, /:lang/cofounders     (English)
//   /cofondateurs, /:lang/cofondateurs (French-Canadian)

import { useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { NetworkBackground } from "@/components/backgrounds/NetworkBackground";
import { SEOHead } from "@/components/seo";
import { Card, CardContent } from "@/components/ui/card";
import { useLang } from "@/i18n/LangContext";
import { Lock, Sparkles } from "lucide-react";

export default function Cofounders() {
  const { lang } = useLang();
  const isFr = lang === "fr";

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

  const copy = isFr
    ? {
        eyebrow: "Accès privé",
        heading1: "Partenaires",
        heading2: "privés seulement",
        body:
          "Cette page est réservée à nos partenaires privés. Si vous êtes arrivé ici, c'est qu'une personne de notre cercle vous a partagé une vidéo.",
        action:
          "Pour toute question ou pour donner suite à la conversation, veuillez contacter directement la personne qui vous a envoyé cette vidéo.",
        footer: "Merci de votre intérêt et de votre discrétion.",
        metaTitle: "Partenaires privés AiLys",
        metaDesc: "Programme de partenariat privé sur invitation.",
      }
    : {
        eyebrow: "Private access",
        heading1: "Private partners",
        heading2: "only",
        body:
          "This page is reserved for our private partners. If you landed here, it is because someone in our circle shared a video with you.",
        action:
          "For any question or to continue the conversation, please reach out directly to the person who sent you this video.",
        footer: "Thank you for your interest and your discretion.",
        metaTitle: "AiLys Private Partners",
        metaDesc: "Invitation-only private partnership program.",
      };

  return (
    <>
      <SEOHead
        title={copy.metaTitle}
        description={copy.metaDesc}
        canonicalUrl={
          isFr
            ? "https://www.ailysagency.ca/cofondateurs"
            : "https://www.ailysagency.ca/cofounders"
        }
        noindex
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
        <main className="pt-24 pb-24 min-h-[calc(100vh-6rem)] flex items-center">
          <section className="relative px-4 max-w-2xl mx-auto w-full">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-400/30 bg-violet-500/[0.06] backdrop-blur-sm mb-6">
                <Sparkles className="w-3 h-3 text-violet-300" />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet-200">
                  {copy.eyebrow}
                </span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight mb-6">
                {copy.heading1}
                <br />
                <span className="italic bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent">
                  {copy.heading2}
                </span>
              </h1>
            </div>

            <Card className="bg-card/40 backdrop-blur-md border-violet-400/20">
              <CardContent className="py-10 px-6 sm:px-10 space-y-6">
                <div className="flex justify-center">
                  <div className="w-12 h-12 rounded-full border border-violet-400/40 bg-violet-500/[0.08] flex items-center justify-center">
                    <Lock className="w-5 h-5 text-violet-300" />
                  </div>
                </div>
                <p className="text-base sm:text-lg text-foreground/90 leading-relaxed text-center">
                  {copy.body}
                </p>
                <p className="text-base sm:text-lg text-foreground/90 leading-relaxed text-center">
                  {copy.action}
                </p>
                <p className="text-sm text-muted-foreground text-center pt-4 border-t border-border/30">
                  {copy.footer}
                </p>
              </CardContent>
            </Card>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
