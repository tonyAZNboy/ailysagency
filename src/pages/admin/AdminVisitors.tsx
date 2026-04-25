import { AdminTable } from "./AdminTable";

interface Visitor {
  id: string;
  first_seen: string;
  last_seen: string;
  page_views: number;
  language: string | null;
  country: string | null;
  city: string | null;
  user_agent: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

export default function AdminVisitors() {
  return (
    <AdminTable<Visitor>
      title="Visitors"
      description="Unique visitor sessions tracked via localStorage id. Filter by source, country, language."
      table="visitor_sessions"
      orderBy={{ column: "last_seen", ascending: false }}
      emptyHint="Once the visitor tracking edge function is wired, sessions appear here in real time."
      columns={[
        { key: "last_seen", label: "Last seen", render: (r) => new Date(r.last_seen).toLocaleString() },
        { key: "id", label: "Session", render: (r) => r.id.slice(0, 16) + "..." },
        { key: "page_views", label: "Views" },
        { key: "language", label: "Lang", render: (r) => r.language ?? "—" },
        {
          key: "country",
          label: "Location",
          render: (r) =>
            [r.city, r.country].filter(Boolean).join(", ") || "—",
        },
        { key: "utm_source", label: "Source", render: (r) => r.utm_source ?? "direct" },
        { key: "utm_campaign", label: "Campaign", render: (r) => r.utm_campaign ?? "—" },
      ]}
    />
  );
}
