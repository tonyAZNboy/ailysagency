// AiLys Agency · chat hook
//
// Routes chat through Reviuzy's existing ai-engine-classify and ai-engine-respond
// edge functions (production-tested, already deployed). Same pattern as the audit
// engine in src/integrations/audit-source/client.ts.
//
// Reviuzy's responder is tuned for Reviuzy product questions, so AiLys chat will
// lean review-focused for now. When we provision AiLys's own Supabase project,
// swap auditSourceClient below for the AiLys-specific client + ailys-chat-* functions.
//
// TODO(ailys-chat): swap to AiLys Supabase + ailys-chat-classify/respond once provisioned.

import { useState, useCallback, useRef } from "react";
import { auditSourceClient } from "@/integrations/audit-source/client";
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

const REVIUZY_URL = "https://qucxhksrpqunlyjjvuae.supabase.co";
const REVIUZY_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1Y3hoa3NycHF1bmx5amp2dWFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5NjU4ODEsImV4cCI6MjA3MDU0MTg4MX0.Bd4wu_DdAJN8OknkoXBjCpIt8F4q-j54LrkzE_zioVs";

export function useAIEngine(_mode: "landing" | "in_app" = "landing") {
  const [messages, setMessages] = useState<AIEngineMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const { toast } = useToast();

  const classify = useCallback(async (message: string): Promise<Classification> => {
    try {
      const { data, error } = await auditSourceClient.functions.invoke(
        "ai-engine-classify",
        { body: { message } },
      );
      if (error) throw error;
      return data as Classification;
    } catch {
      return { intent: "general_question", confidence: 0.5, sentiment: "neutral" };
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

        // Stream from Reviuzy's ai-engine-respond. We use raw fetch because the
        // function streams tokens back. supabase.functions.invoke buffers fully.
        abortRef.current = new AbortController();
        const resp = await fetch(`${REVIUZY_URL}/functions/v1/ai-engine-respond`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${REVIUZY_KEY}`,
            apikey: REVIUZY_KEY,
          },
          body: JSON.stringify({
            message: trimmed,
            mode: "landing",
            history: messages.slice(-10).map((m) => ({ role: m.role, content: m.content })),
            classification,
            tenantId: null,
            visitorSessionId: getVisitorSessionId(),
          }),
          signal: abortRef.current.signal,
        });

        if (!resp.ok) {
          const errText = await resp.text().catch(() => "");
          throw new Error(`Chat backend ${resp.status}: ${errText.slice(0, 100)}`);
        }

        // Try to read as a stream first, fall back to whole-body text
        let fullText = "";
        const contentType = resp.headers.get("content-type") ?? "";

        if (resp.body && contentType.includes("text/event-stream")) {
          const reader = resp.body.getReader();
          const decoder = new TextDecoder();
          let buffer = "";
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            // Parse SSE lines
            let nl: number;
            while ((nl = buffer.indexOf("\n")) !== -1) {
              const line = buffer.slice(0, nl);
              buffer = buffer.slice(nl + 1);
              if (line.startsWith("data: ")) {
                const payload = line.slice(6).trim();
                if (payload === "[DONE]") continue;
                try {
                  const obj = JSON.parse(payload);
                  if (typeof obj?.content === "string") fullText += obj.content;
                  else if (typeof obj?.text === "string") fullText += obj.text;
                  else if (typeof obj?.delta === "string") fullText += obj.delta;
                } catch {
                  // skip non-JSON lines
                }
              }
            }
          }
        } else {
          // Plain JSON or text response
          const text = await resp.text();
          try {
            const obj = JSON.parse(text);
            fullText = obj.content ?? obj.text ?? obj.response ?? text;
          } catch {
            fullText = text;
          }
        }

        const { cleanText, actions } = parseActions(fullText);

        const assistantMsg: AIEngineMessage = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: cleanText || "(empty response)",
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
        // eslint-disable-next-line no-console
        console.error("[AiLys chat] error:", err);
        toast({
          title: "Chat unavailable",
          description: "Try the free AI Visibility Audit instead.",
          variant: "destructive",
        });
        const fallback: AIEngineMessage = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content:
            "Our AI advisor is offline right now. The fastest way to get a real answer about your business is the free AI Visibility Audit. We will reply within 24 hours.",
          metadata: {
            actions: [
              { action: "show_audit_cta", label: "Run my AI Visibility Audit", href: "/audit" },
            ],
          },
          created_at: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, fallback]);
      } finally {
        setIsLoading(false);
      }
    },
    [classify, isLoading, messages, toast],
  );

  const clearMessages = useCallback(() => setMessages([]), []);

  return { messages, sendMessage, isLoading, clearMessages };
}
