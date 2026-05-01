import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Send, Mic, Volume2, VolumeX, Sparkles, BarChart3, MessageSquare, Image as ImageIcon, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { NetworkBackground } from "@/components/backgrounds/NetworkBackground";
import { SEOHead } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLang } from "@/i18n/LangContext";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n/index";
import { Link } from "react-router-dom";

interface ToolCall {
  tool: string;
  label: string;
  labelFr: string;
  status: "calling" | "done";
  data?: unknown;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  toolCalls?: ToolCall[];
  card?: ConciergeCard;
}

interface ConciergeCard {
  type: "score" | "reviews" | "competitors" | "post-draft";
  payload: Record<string, unknown>;
}

const DEMO_RESPONSES: Record<string, { en: Message; fr: Message }> = {
  score: {
    en: {
      id: "demo-score",
      role: "assistant",
      text: "Your AI Visibility score this week is 78 out of 100, up 4 points from last week. Top driver: schema completeness moved from 72% to 86% after we deployed FAQPage on your top 8 service pages on April 24. ChatGPT citation share rose to 28% (up from 22%). Want me to show you the per-engine breakdown?",
      toolCalls: [
        { tool: "get_share_of_model", label: "Looking up your AI Visibility score", labelFr: "Recherche de votre score visibilite IA", status: "done" },
        { tool: "get_audit_findings", label: "Pulling recent audit findings", labelFr: "Recuperation des constats d'audit recents", status: "done" },
      ],
      card: {
        type: "score",
        payload: { score: 78, delta: 4, topDriver: "Schema completeness +14pp", engines: { ChatGPT: 28, Perplexity: 21, "Google AIO": 18, Claude: 7, Gemini: 4, "Bing Copilot": 22 } },
      },
    },
    fr: {
      id: "demo-score",
      role: "assistant",
      text: "Votre score de visibilite IA cette semaine est de 78 sur 100, en hausse de 4 points par rapport a la semaine derniere. Principal moteur : la completude du schema est passee de 72% a 86% apres le deploiement de FAQPage sur vos 8 pages de services principales le 24 avril. La part de citations ChatGPT a augmente a 28% (en hausse depuis 22%). Voulez-vous que je vous montre la ventilation par moteur ?",
      toolCalls: [
        { tool: "get_share_of_model", label: "Looking up your AI Visibility score", labelFr: "Recherche de votre score visibilite IA", status: "done" },
        { tool: "get_audit_findings", label: "Pulling recent audit findings", labelFr: "Recuperation des constats d'audit recents", status: "done" },
      ],
      card: {
        type: "score",
        payload: { score: 78, delta: 4, topDriver: "Completude du schema +14pp", engines: { ChatGPT: 28, Perplexity: 21, "Google AIO": 18, Claude: 7, Gemini: 4, "Bing Copilot": 22 } },
      },
    },
  },
  post: {
    en: {
      id: "demo-post",
      role: "assistant",
      text: "Drafted a Halloween-themed Google Business Profile post for Acme Pizza Montreal. 280 characters, includes a CTA to your online ordering page, and 2 location-relevant hashtags. Want me to schedule it for October 28 at 11am EST or do you want to edit first?",
      toolCalls: [
        { tool: "generate_gbp_post", label: "Drafting a Halloween-themed GBP post", labelFr: "Redaction d'une publication GBP theme Halloween", status: "done" },
      ],
      card: {
        type: "post-draft",
        payload: {
          title: "Halloween dinner at Acme Pizza",
          body: "This Halloween, swap the usual takeout for fresh wood-fired pizza in Montreal's Plateau. We're open until 11pm Oct 31 for trick-or-treaters with appetites bigger than their candy haul. Order online to skip the wait.",
          cta: "Order online",
          hashtags: ["#MontrealEats", "#Halloween2026"],
        },
      },
    },
    fr: {
      id: "demo-post",
      role: "assistant",
      text: "Brouillon d'une publication Google Business Profile theme Halloween pour Acme Pizza Montreal. 280 caracteres, inclut un CTA vers votre page de commande en ligne, et 2 hashtags pertinents pour l'emplacement. Voulez-vous que je la programme pour le 28 octobre a 11h HNE ou voulez-vous editer d'abord ?",
      toolCalls: [
        { tool: "generate_gbp_post", label: "Drafting a Halloween-themed GBP post", labelFr: "Redaction d'une publication GBP theme Halloween", status: "done" },
      ],
      card: {
        type: "post-draft",
        payload: {
          title: "Souper d'Halloween chez Acme Pizza",
          body: "Cet Halloween, troquez le takeout habituel pour une pizza fraiche au four a bois dans le Plateau a Montreal. Ouvert jusqu'a 23h le 31 octobre pour les petits monstres avec un appetit plus gros que leur sac de bonbons. Commandez en ligne pour eviter l'attente.",
          cta: "Commander en ligne",
          hashtags: ["#MontrealMange", "#Halloween2026"],
        },
      },
    },
  },
  competitors: {
    en: {
      id: "demo-competitors",
      role: "assistant",
      text: "Your top 3 competitors in Montreal pizza search this quarter: Pizzeria Lola (AI Visibility 82, +6 this quarter), No.900 Pizza (76, flat), Bottega Pizzeria (71, -3). The widening gap is review velocity: Lola added 47 new reviews this quarter while you added 18. Want me to draft a review request flow you can hand customers?",
      toolCalls: [
        { tool: "get_competitor_analysis", label: "Comparing you to top 3 competitors", labelFr: "Comparaison avec vos 3 principaux concurrents", status: "done" },
      ],
      card: {
        type: "competitors",
        payload: {
          competitors: [
            { name: "Pizzeria Lola", score: 82, delta: 6, gap: "+47 reviews this Q" },
            { name: "No.900 Pizza", score: 76, delta: 0, gap: "Schema parity" },
            { name: "Bottega Pizzeria", score: 71, delta: -3, gap: "Photo cadence drop" },
          ],
        },
      },
    },
    fr: {
      id: "demo-competitors",
      role: "assistant",
      text: "Vos 3 principaux concurrents en recherche pizza Montreal ce trimestre : Pizzeria Lola (visibilite IA 82, +6 ce trimestre), No.900 Pizza (76, stable), Bottega Pizzeria (71, -3). L'ecart qui se creuse est la velocite d'avis : Lola a ajoute 47 nouveaux avis ce trimestre tandis que vous en avez ajoute 18. Voulez-vous que je redige un flux de demande d'avis a remettre a vos clients ?",
      toolCalls: [
        { tool: "get_competitor_analysis", label: "Comparing you to top 3 competitors", labelFr: "Comparaison avec vos 3 principaux concurrents", status: "done" },
      ],
      card: {
        type: "competitors",
        payload: {
          competitors: [
            { name: "Pizzeria Lola", score: 82, delta: 6, gap: "+47 avis ce T" },
            { name: "No.900 Pizza", score: 76, delta: 0, gap: "Parite schema" },
            { name: "Bottega Pizzeria", score: 71, delta: -3, gap: "Cadence photo en baisse" },
          ],
        },
      },
    },
  },
};

function matchPrompt(text: string): keyof typeof DEMO_RESPONSES | null {
  const lower = text.toLowerCase();
  if (/score|visibility|visibilite|moved|drop|why/i.test(lower)) return "score";
  if (/halloween|post|publication|gbp|profil/i.test(lower)) return "post";
  if (/competitor|concurrent|compare|top 3/i.test(lower)) return "competitors";
  return null;
}

export default function ConciergeDemo() {
  const { lang: urlLang } = useParams<{ lang?: string }>();
  const { lang, setLang } = useLang();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [voiceOutput, setVoiceOutput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isFr = lang === "fr";

  const suggestedPrompts = isFr
    ? [
        { label: "Pourquoi mon score a-t-il bouge cette semaine ?", icon: BarChart3 },
        { label: "Genere une publication GBP pour Halloween", icon: ImageIcon },
        { label: "Compare-moi a mes 3 principaux concurrents", icon: MessageSquare },
      ]
    : [
        { label: "Why did my score move this week?", icon: BarChart3 },
        { label: "Generate a Halloween GBP post", icon: ImageIcon },
        { label: "Compare me to my top 3 competitors", icon: MessageSquare },
      ];

  function handleSend(text: string) {
    if (!text.trim() || streaming) return;
    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setStreaming(true);

    const matchKey = matchPrompt(text);
    setTimeout(() => {
      if (matchKey) {
        const reply = DEMO_RESPONSES[matchKey][isFr ? "fr" : "en"];
        setMessages((m) => [...m, { ...reply, id: `a-${Date.now()}` }]);
      } else {
        setMessages((m) => [
          ...m,
          {
            id: `a-${Date.now()}`,
            role: "assistant",
            text: isFr
              ? "Cette demo couvre 3 prompts d'exemple : score, publication Halloween, comparaison concurrents. La version complete est disponible dans le tableau de bord client AiLys aux clients Growth+. En savoir plus sur les forfaits."
              : "This demo covers 3 sample prompts: score, Halloween post, competitor comparison. The full version is available in the AiLys client dashboard for Growth+ clients. Learn more about the plans.",
          },
        ]);
      }
      setStreaming(false);
    }, 800);
  }

  return (
    <>
      <SEOHead
        title={
          isFr
            ? "AiLys Concierge · Demo de l'assistant IA pour clients · AiLys Agency"
            : "AiLys Concierge · AI Assistant Demo for Clients · AiLys Agency"
        }
        description={
          isFr
            ? "Demo interactive du concierge IA AiLys. Posez des questions sur votre visibilite IA, generez des publications GBP, comparez-vous aux concurrents. Inclus dans les forfaits Growth+ AiLys."
            : "Interactive demo of the AiLys AI concierge. Ask questions about your AI Visibility, generate GBP posts, compare yourself to competitors. Included in AiLys Growth+ plans."
        }
        canonicalUrl={
          lang === "en"
            ? "https://www.ailysagency.ca/concierge-demo"
            : `https://www.ailysagency.ca/${lang}/concierge-demo`
        }
        image={`/api/og.svg?kind=concierge&lang=${lang === "fr" ? "fr" : "en"}`}
        keywords={["AI concierge", "AI assistant", "AiLys engine", "client dashboard"]}
      />
      <NetworkBackground backgroundColor="#050505" nodeColor="#22D3EE" lineColor="#A78BFA" nodeCount={26} mobileNodeCount={14} />

      <div className="min-h-screen relative">
        <Navbar />

        <main className="container mx-auto px-4 sm:px-6 pt-24 pb-12 max-w-4xl">
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 text-xs font-medium text-fuchsia-300">
              <Sparkles className="w-3 h-3" />
              {isFr ? "Demo interactive · Inclus Growth+" : "Interactive demo · Included Growth+"}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              {isFr ? "AiLys Concierge" : "AiLys Concierge"}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
              {isFr
                ? "Posez n'importe quelle question sur votre visibilite IA. Le concierge consulte vos donnees AiLys + Reviuzy en temps reel et repond avec contexte."
                : "Ask any question about your AI Visibility. The concierge reads your AiLys + Reviuzy data in real time and answers with context."}
            </p>
          </header>

          <section className="rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-sm overflow-hidden flex flex-col" style={{ minHeight: "60vh" }}>
            {/* Chat header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {isFr ? "Assistant IA AiLys" : "AiLys AI Assistant"}
                  </p>
                  <p className="text-xs text-slate-400">
                    {isFr ? "Demo en lecture seule · pas de donnees client reelles" : "Read-only demo · no real client data"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setVoiceOutput((v) => !v)}
                aria-label={voiceOutput ? "Disable voice output" : "Enable voice output"}
                className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                {voiceOutput ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-slate-400 mb-6">
                    {isFr ? "Essayez l'une de ces questions :" : "Try one of these questions:"}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-2xl mx-auto">
                    {suggestedPrompts.map((p, idx) => {
                      const Icon = p.icon;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSend(p.label)}
                          className="flex-1 flex items-start gap-3 p-4 rounded-xl border border-slate-700/60 hover:border-cyan-500/40 bg-slate-800/40 hover:bg-slate-800 text-left transition-all"
                        >
                          <Icon className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-200">{p.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] ${msg.role === "user" ? "ml-auto" : ""}`}>
                      {msg.toolCalls?.map((tc, idx) => (
                        <div key={idx} className="mb-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                          {isFr ? tc.labelFr : tc.label}
                        </div>
                      ))}
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          msg.role === "user"
                            ? "bg-cyan-500 text-slate-950 font-medium"
                            : "bg-slate-800/80 text-slate-100 border border-slate-700/60"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      </div>
                      {msg.card && <ConciergeCardRenderer card={msg.card} isFr={isFr} />}
                    </div>
                  </div>
                ))
              )}
              {streaming && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                    <span className="inline-flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Composer */}
            <div className="border-t border-slate-800 p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isFr ? "Demandez n'importe quoi sur votre visibilite IA..." : "Ask anything about your AI Visibility..."}
                  disabled={streaming}
                  className="flex-1 bg-slate-800 border-slate-700 text-white"
                />
                <Button type="button" variant="outline" size="icon" disabled aria-label={isFr ? "Mode vocal (bientot)" : "Voice mode (soon)"}>
                  <Mic className="w-4 h-4" />
                </Button>
                <Button type="submit" disabled={streaming || !input.trim()} aria-label={isFr ? "Envoyer" : "Send"}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
              <p className="text-xs text-slate-500 mt-2">
                {isFr
                  ? "Demo : 3 prompts d'exemple supportes. La version production accede a vos vraies donnees."
                  : "Demo: 3 sample prompts supported. The production version accesses your real data."}
              </p>
            </div>
          </section>

          <section className="mt-8 p-6 sm:p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 to-slate-900/60 backdrop-blur-sm text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              {isFr ? "Le concierge complet est inclus dans Growth+" : "The full concierge is included in Growth+"}
            </h2>
            <p className="text-slate-300 mb-6 max-w-xl mx-auto">
              {isFr
                ? "10 outils disponibles, mode vocal, RAG sur vos avis et signaux, budget de tokens par palier, et historique de conversations cherchable."
                : "10 tools available, voice mode, RAG over your reviews and signals, per-tier token budget, and searchable conversation history."}
            </p>
            <Link
              to={lang === "en" ? "/forfaits-complets" : `/${lang}/forfaits-complets`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition-colors"
            >
              {isFr ? "Voir les forfaits" : "See plans"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </main>

        <Footer />
        <LandingChatWidget />
      </div>
    </>
  );
}

function ConciergeCardRenderer({ card, isFr }: { card: ConciergeCard; isFr: boolean }) {
  if (card.type === "score") {
    const p = card.payload as { score: number; delta: number; topDriver: string; engines: Record<string, number> };
    return (
      <div className="mt-3 p-4 rounded-xl border border-slate-700/60 bg-slate-900/80">
        <div className="flex items-baseline gap-3 mb-3">
          <p className="text-3xl font-bold text-white">{p.score}<span className="text-sm text-slate-400">/100</span></p>
          <p className={`text-sm font-medium ${p.delta >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
            {p.delta >= 0 ? "+" : ""}{p.delta} {isFr ? "vs sem. derniere" : "vs last week"}
          </p>
        </div>
        <p className="text-xs text-slate-400 mb-3">{p.topDriver}</p>
        <div className="space-y-1.5">
          {Object.entries(p.engines).map(([engine, pct]) => (
            <div key={engine} className="flex items-center gap-2">
              <span className="text-xs text-slate-300 w-24">{engine}</span>
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-fuchsia-500" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-xs text-slate-400 w-8 text-right">{pct}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (card.type === "post-draft") {
    const p = card.payload as { title: string; body: string; cta: string; hashtags: string[] };
    return (
      <div className="mt-3 p-4 rounded-xl border border-slate-700/60 bg-slate-900/80">
        <p className="text-sm font-semibold text-white mb-2">{p.title}</p>
        <p className="text-xs text-slate-300 mb-3 leading-relaxed">{p.body}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs px-2 py-1 rounded-md bg-cyan-500/20 text-cyan-200 border border-cyan-500/30">{p.cta}</span>
          {p.hashtags.map((h) => (
            <span key={h} className="text-xs text-slate-500">{h}</span>
          ))}
        </div>
      </div>
    );
  }

  if (card.type === "competitors") {
    const p = card.payload as { competitors: Array<{ name: string; score: number; delta: number; gap: string }> };
    return (
      <div className="mt-3 p-4 rounded-xl border border-slate-700/60 bg-slate-900/80">
        <div className="space-y-2">
          {p.competitors.map((c) => (
            <div key={c.name} className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{c.name}</p>
                <p className="text-xs text-slate-500 truncate">{c.gap}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">{c.score}</p>
                <p className={`text-xs ${c.delta > 0 ? "text-emerald-400" : c.delta < 0 ? "text-rose-400" : "text-slate-500"}`}>
                  {c.delta > 0 ? "+" : ""}{c.delta}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
