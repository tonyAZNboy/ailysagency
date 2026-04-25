// AiLys Agency · chat hook
// Calls the AiLys-specific Supabase edge functions:
//   - ailys-chat-classify  (intent + sentiment)
//   - ailys-chat-respond   (conversational reply)
//
// The responder may embed action tokens like [ACTION:show_audit_cta]{...}[/ACTION].
// We strip those out of the visible text and surface them as `actions` so the
// chat widget can render the matching CTA buttons.
import { useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export interface AIEngineMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  metadata?: {
    intent?: string;
    sentiment?: string;
    confidence?: number;
    actions?: AIAction[];
  };
  created_at: string;
}

export interface AIAction {
  action: string;
  label?: string;
  href?: string;
}

interface Classification {
  intent: string;
  confidence: number;
  sentiment: string;
}

function parseActions(text: string): { cleanText: string; actions: AIAction[] } {
  const actions: AIAction[] = [];
  const cleanText = text
    .replace(/\[ACTION:(\w+)\](.*?)\[\/ACTION\]/gs, (_match, actionType, payload) => {
      try {
        const parsed = JSON.parse(payload.trim());
        actions.push({ action: actionType, ...parsed });
      } catch {
        // ignore malformed action token
      }
      return "";
    })
    .trim();
  return { cleanText, actions };
}

// Stable visitor id for analytics + rate limiting.
function getVisitorSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  const key = "ailys_visitor_session";
  let sessionId = localStorage.getItem(key);
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(key, sessionId);
  }
  return sessionId;
}

export function useAIEngine(_mode: "landing" | "in_app" = "landing") {
  const [messages, setMessages] = useState<AIEngineMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const { toast } = useToast();

  const classify = useCallback(async (message: string): Promise<Classification> => {
    try {
      const { data, error } = await supabase.functions.invoke("ailys-chat-classify", {
        body: { message },
      });
      if (error) throw error;
      return data as Classification;
    } catch {
      return { intent: "general", confidence: 0.5, sentiment: "neutral" };
    }
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || isLoading) return;
      setIsLoading(true);

      const userMsg: AIEngineMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: trimmed,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMsg]);

      try {
        const classification = await classify(trimmed);

        abortRef.current = new AbortController();
        const { data, error } = await supabase.functions.invoke("ailys-chat-respond", {
          body: {
            message: trimmed,
            history: messages.slice(-10).map((m) => ({ role: m.role, content: m.content })),
            classification,
            visitorSessionId: getVisitorSessionId(),
          },
        });

        if (error) throw error;

        const rawContent = (data as { content?: string })?.content ?? "";
        const { cleanText, actions } = parseActions(rawContent);

        const assistantMsg: AIEngineMessage = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: cleanText,
          metadata: {
            intent: classification.intent,
            sentiment: classification.sentiment,
            confidence: classification.confidence,
            actions,
          },
          created_at: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } catch (err) {
        toast({
          title: "Chat unavailable",
          description: "Our AI advisor is offline. Try the free AI Visibility Audit instead.",
          variant: "destructive",
        });
        const fallback: AIEngineMessage = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content:
            "Our AI advisor is offline right now. The fastest way to get a real answer about your business is the free AI Visibility Audit. We will reply within 24 hours.",
          metadata: {
            actions: [{ action: "show_audit_cta", label: "Run my AI Visibility Audit", href: "/audit" }],
          },
          created_at: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, fallback]);
        // eslint-disable-next-line no-console
        console.error("[AiLys chat] error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [classify, isLoading, messages, toast]
  );

  const clearMessages = useCallback(() => setMessages([]), []);

  return { messages, sendMessage, isLoading, clearMessages };
}
