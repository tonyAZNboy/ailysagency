import { AdminTable } from "./AdminTable";

interface ChatSession {
  id: string;
  visitor_session_id: string;
  message_count: number;
  intent: string | null;
  sentiment: string | null;
  cta_shown: boolean;
  cta_clicked: boolean;
  email_captured: string | null;
  page_path: string | null;
  first_message_at: string;
  last_message_at: string;
}

export default function AdminChats() {
  return (
    <AdminTable
      title="Chat sessions"
      description="Every conversation with the LandingChatWidget. Filter by intent, see CTA conversion."
      table="chat_sessions"
      emptyHint="Live chat conversations appear here once the chat backend is provisioned. See supabase/functions/README.md to deploy ailys-chat-classify and ailys-chat-respond."
      columns={[
        { key: "first_message_at", label: "Started", render: (r) => new Date(r.first_message_at).toLocaleString() },
        { key: "visitor_session_id", label: "Visitor", render: (r) => (r.visitor_session_id ?? "").slice(0, 16) + "..." },
        { key: "page_path", label: "Page", render: (r) => r.page_path ?? "—" },
        { key: "intent", label: "Intent", render: (r) => r.intent ?? "—" },
        {
          key: "sentiment",
          label: "Sentiment",
          render: (r) => r.sentiment ? (
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] ${
              r.sentiment === "ready_to_buy" ? "bg-emerald-500/15 text-emerald-300" :
              r.sentiment === "frustrated" ? "bg-rose-500/15 text-rose-300" :
              r.sentiment === "curious" ? "bg-cyan-500/15 text-cyan-300" :
              "bg-muted/30 text-muted-foreground"
            }`}>
              {r.sentiment}
            </span>
          ) : "—",
        },
        { key: "message_count", label: "Msgs" },
        {
          key: "cta_clicked",
          label: "CTA",
          render: (r) => r.cta_clicked ? (
            <span className="text-emerald-300 font-mono text-xs">✓ clicked</span>
          ) : r.cta_shown ? (
            <span className="text-amber-300 font-mono text-xs">shown</span>
          ) : (
            <span className="text-muted-foreground/60 font-mono text-xs">—</span>
          ),
        },
        { key: "email_captured", label: "Email", render: (r) => r.email_captured ?? "—" },
      ]}
    />
  );
}
