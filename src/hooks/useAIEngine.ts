// AiLys Agency · chat hook
//
// Calls the AiLys-native chat endpoint at /api/chat-advisor (Cloudflare
// Pages Function backed by Anthropic). Replaces the previous Reviuzy
// edge function dependency, which was hanging in production and was
// tuned for Reviuzy product questions instead of AiLys consulting.
//
// The endpoint streams SSE chunks shaped as `data: {"content": "..."}`
// terminated by `data: [DONE]`. We accumulate them into a single
// assistant message at the end of the turn, and rely on rate-limit /
// validation enforced server-side (see functions/api/chat-advisor.ts).

import { useState, useCallback, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useLang } from "@/i18n/LangContext";

export interface AIEngineMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  metadata?: {
    actions?: AIAction[];
  };
  created_at: string;
}

export interface AIAction {
  action: string;
  label?: string;
  href?: string;
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

export function useAIEngine(_mode: "landing" | "in_app" = "landing") {
  const { lang } = useLang();
  const [messages, setMessages] = useState<AIEngineMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const { toast } = useToast();

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
        abortRef.current = new AbortController();
        const resp = await fetch("/api/chat-advisor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            lang,
            history: messages.slice(-10).map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
          signal: abortRef.current.signal,
        });

        if (!resp.ok) {
          if (resp.status === 429) {
            throw new Error("rate_limited");
          }
          const errText = await resp.text().catch(() => "");
          throw new Error(`Chat backend ${resp.status}: ${errText.slice(0, 100)}`);
        }

        let fullText = "";

        if (resp.body) {
          const reader = resp.body.getReader();
          const decoder = new TextDecoder();
          let buffer = "";
          // Stream tokens, append to the assistant message in real time.
          const assistantId = `ai-${Date.now()}`;
          let assistantInserted = false;

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });

            let nl: number;
            while ((nl = buffer.indexOf("\n")) !== -1) {
              const line = buffer.slice(0, nl);
              buffer = buffer.slice(nl + 1);
              if (!line.startsWith("data:")) continue;
              const payload = line.slice(5).trim();
              if (!payload || payload === "[DONE]") continue;
              try {
                const obj = JSON.parse(payload);
                const delta =
                  typeof obj?.content === "string"
                    ? obj.content
                    : typeof obj?.text === "string"
                      ? obj.text
                      : typeof obj?.delta === "string"
                        ? obj.delta
                        : "";
                if (!delta) continue;
                fullText += delta;
                if (!assistantInserted) {
                  assistantInserted = true;
                  setMessages((prev) => [
                    ...prev,
                    {
                      id: assistantId,
                      role: "assistant",
                      content: delta,
                      created_at: new Date().toISOString(),
                    },
                  ]);
                } else {
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantId ? { ...m, content: fullText } : m,
                    ),
                  );
                }
              } catch {
                // skip non-JSON keepalive lines
              }
            }
          }

          // Finalize: clean any embedded ACTION tokens
          if (assistantInserted) {
            const { cleanText, actions } = parseActions(fullText);
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? {
                      ...m,
                      content: cleanText || "(empty response)",
                      metadata: { actions },
                    }
                  : m,
              ),
            );
          } else {
            // No SSE chunks arrived: fall back to whole-body text
            const text = await resp.text().catch(() => "");
            const { cleanText, actions } = parseActions(text);
            setMessages((prev) => [
              ...prev,
              {
                id: assistantId,
                role: "assistant",
                content: cleanText || "(empty response)",
                metadata: { actions },
                created_at: new Date().toISOString(),
              },
            ]);
          }
        } else {
          throw new Error("no_response_body");
        }
      } catch (err) {
        const isRateLimited = err instanceof Error && err.message === "rate_limited";
         
        console.error("[AiLys chat] error:", err);
        toast({
          title: isRateLimited ? "Slow down a bit" : "Chat unavailable",
          description: isRateLimited
            ? "You sent a lot of messages quickly. Try again in a minute."
            : "Try the free AI Visibility Audit instead.",
          variant: "destructive",
        });
        const fallback: AIEngineMessage = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: isRateLimited
            ? "You have sent quite a few messages. Take a breath and try again in a minute. While you wait, the free AI Visibility Audit at /audit gives a complete picture in 90 seconds."
            : "Our AI advisor is offline right now. The fastest way to get a real answer about your business is the free AI Visibility Audit. We will reply within 24 hours.",
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
    [isLoading, messages, toast, lang],
  );

  const clearMessages = useCallback(() => setMessages([]), []);

  return { messages, sendMessage, isLoading, clearMessages };
}
