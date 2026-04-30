// AiLys AI Search Advisor · landing chat widget.
//
// Backed by /api/chat-advisor (Cloudflare Pages Function calling
// Anthropic Claude Opus 4.7 with adaptive thinking + prompt caching).
// System prompt lives in functions/api/chat-advisor.ts and is tuned for
// AiLys consulting questions (AEO, GEO, E-E-A-T, pricing tiers, Founding
// Clients program). Streams SSE tokens back so the user sees the reply
// build up in real time. Replaces the previous Reviuzy edge function
// dependency (was hanging + Reviuzy-flavored answers).
import { useState, useRef, useEffect } from "react";
import { X, Minimize2, Send, ArrowRight, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAIEngine } from "@/hooks/useAIEngine";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/i18n/LangContext";

export function LandingChatWidget() {
  const { t } = useLang();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [wasClosedByUser, setWasClosedByUser] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadBusiness, setLeadBusiness] = useState("");
  const [submittingLead, setSubmittingLead] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { messages, sendMessage, isLoading, clearMessages } = useAIEngine("landing");

  // Show the free trial button after any AI response
  const shouldShowLeadForm = (_result: any) => true;

  // Show widget after 45 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 45000);
    return () => clearTimeout(timer);
  }, []);

  // Phase E.8: external trigger via custom event so other components
  // (e.g. /forfaits-complets 'Ask our AI advisor' CTA) can open the chat
  // without needing a prop drill or context.
  useEffect(() => {
    function onOpenChat() {
      setIsVisible(true);
      setIsExpanded(true);
      setWasClosedByUser(false);
    }
    window.addEventListener("ailys:open-chat", onOpenChat);
    return () => window.removeEventListener("ailys:open-chat", onOpenChat);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
    const msg = inputValue;
    setInputValue("");
    if (!isExpanded) setIsExpanded(true);
    const result = await sendMessage(msg);
    // Auto-show lead form when AI classifies intent as demo_request OR AI response mentions demo
    if (!leadSubmitted && shouldShowLeadForm(result)) {
      setShowLeadForm(true);
    }
  };

  const handleQuickAction = async (text: string) => {
    if (isLoading) return;
    if (!isExpanded) setIsExpanded(true);
    setInputValue("");
    const result = await sendMessage(text);
    if (!leadSubmitted && shouldShowLeadForm(result)) {
      setShowLeadForm(true);
    }
  };

  const handleLeadSubmit = async () => {
    if (!leadName.trim() || !leadEmail.trim() || submittingLead) return;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(leadEmail.trim())) {
      toast({ title: t.chat.toastInvalidEmail, description: t.chat.toastInvalidEmailDesc, variant: "destructive" });
      return;
    }
    setSubmittingLead(true);
    try {
      const { error } = await supabase.functions.invoke("capture-landing-lead", {
        body: {
          name: leadName.trim(),
          email: leadEmail.trim(),
          businessName: leadBusiness.trim() || null,
          chatMessages: messages.map((m) => ({ role: m.role, content: m.content }))
        }
      });
      if (error) throw error;
      setLeadSubmitted(true);
      setShowLeadForm(false);
    } catch {
      toast({ title: t.chat.toastError, description: t.chat.toastErrorDesc, variant: "destructive" });
    } finally {
      setSubmittingLead(false);
    }
  };

  if (!isVisible) return null;

  // Collapsed: show teaser (default) or icon (after user closed)
  if (!isExpanded) {
    if (wasClosedByUser) {
      // After user clicked X: just the icon
      return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-500">
          <button
            onClick={() => setIsExpanded(true)}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-110 transition-all duration-300"
            aria-label={t.chat.ariaOpen}
          >
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      );
    }

    // Default: teaser card
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-500 max-w-[calc(100vw-2rem)]">
        <div
          className="w-[280px] sm:w-[400px] bg-background/50 backdrop-blur-xl border border-primary/30 rounded-2xl shadow-2xl shadow-primary/10 overflow-hidden cursor-pointer hover:shadow-primary/25 hover:border-primary/50 transition-all duration-300 group"
          onClick={() => setIsExpanded(true)}>

          <div className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-primary/15 to-primary/5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm text-foreground">{t.chat.teaserTitle}</h3>
              <p className="text-xs text-muted-foreground">{t.chat.teaserSubtitle}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setWasClosedByUser(true); }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shadow-sm"
          aria-label={t.chat.ariaMinimize}>
          <X className="w-3 h-3" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="w-screen sm:w-[400px] h-[100dvh] sm:h-[540px] border-0 sm:border sm:border-border/50 sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl bg-background/95 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary/15 to-primary/5 border-b border-border/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-md">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-foreground">{t.chat.headerTitle}</h3>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[hsl(var(--primary))]" />
                <p className="text-xs text-muted-foreground">{t.chat.headerStatus}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsExpanded(false)}>
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setIsExpanded(false); setWasClosedByUser(true); }}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto" ref={scrollRef}>
          <div className="space-y-4">
            {/* Welcome */}
            {messages.length === 0 &&
            <>
                <div className="flex gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex-shrink-0 flex items-center justify-center shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                  <div className="bg-muted/60 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                    <p className="text-sm text-foreground font-medium mb-1">
                      {t.chat.welcomeLine1}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t.chat.welcomeLine2}
                    </p>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="flex flex-wrap gap-2 pl-10">
              {[
                { text: t.chat.quickAction1, icon: Sparkles },
                { text: t.chat.quickAction2, icon: null },
                { text: t.chat.quickAction3, icon: Star },
                { text: t.chat.quickAction4, icon: null }].
                map((action) =>
                <button
                  key={action.text}
                  onClick={() => handleQuickAction(action.text)}
                  className="px-3 py-1.5 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors flex items-center gap-1 font-medium">

                      {action.icon && <action.icon className="w-3 h-3" />}
                      {action.text}
                    </button>
                )}
                </div>
              </>
            }

            {/* Chat messages */}
            {messages.map((msg) =>
            <div key={msg.id} className={cn("flex gap-2.5", msg.role === "user" ? "justify-end" : "justify-start")}>
                {msg.role === "assistant" &&
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex-shrink-0 flex items-center justify-center shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
              }
                <div
                className={cn(
                  "rounded-2xl px-4 py-3 max-w-[80%] text-sm",
                  msg.role === "user" ?
                  "bg-primary text-primary-foreground rounded-br-sm" :
                  "bg-muted/60 text-foreground rounded-tl-sm"
                )}>

                  {msg.role === "assistant" ?
                <div className="prose prose-sm dark:prose-invert max-w-none [&>p]:mb-1 [&>p:last-child]:mb-0">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div> :

                <p>{msg.content}</p>
                }
                </div>
              </div>
            )}

            {/* Loading */}
            {isLoading && messages[messages.length - 1]?.role !== "assistant" &&
            <div className="flex gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex-shrink-0 flex items-center justify-center shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
                <div className="bg-muted/60 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:100ms]" />
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:200ms]" />
                  </div>
                </div>
              </div>
            }
            {/* Lead Capture Form */}
            {showLeadForm && !leadSubmitted &&
            <div className="mx-2 mb-2 p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-3 animate-in slide-in-from-bottom-2 text-center">
                <Sparkles className="w-6 h-6 text-primary mx-auto" />
                <h4 className="text-sm font-semibold text-foreground">{t.chat.leadHeading}</h4>
                <p className="text-xs text-muted-foreground">{t.chat.leadSubtitle}</p>
                <a href="/audit">
                  <Button size="sm" className="w-full">{t.chat.leadCta}</Button>
                </a>
              </div>
            }
          </div>
        </div>

        {/* Input */}
        <div className="p-3 border-t border-border/50 bg-background/80">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {if (e.key === "Enter" && !e.shiftKey) {e.preventDefault();handleSend();}}}

              className="flex-1 px-4 py-2.5 text-sm bg-muted/50 border border-border/50 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
              disabled={isLoading} placeholder={t.chat.inputPlaceholder} />

            <Button
              size="icon"
              className="rounded-full h-10 w-10 bg-primary hover:bg-primary/90"
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}>

              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground text-center mt-2">
            {t.chat.poweredBy}
          </p>
        </div>
      </div>
    </div>);

}