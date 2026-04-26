import { AdminTable } from "./AdminTable";

interface AuditRequest {
  id: string;
  business_name: string;
  city: string;
  email: string;
  service: string | null;
  source: string;
  status: string;
  created_at: string;
}

export default function AdminLeads() {
  return (
    <AdminTable
      title="Audit leads"
      description="Every Hero form, /audit page, and CTA section submission. Triage status, deliver reports."
      table="audit_requests"
      emptyHint="Once visitors submit the AI Visibility Audit form, they appear here. Until then, set up the form to write to the audit_requests table (see migration 0001)."
      columns={[
        { key: "created_at", label: "Submitted", render: (r) => new Date(r.created_at).toLocaleString() },
        { key: "business_name", label: "Business" },
        { key: "city", label: "City" },
        { key: "email", label: "Email" },
        { key: "service", label: "Service", render: (r) => r.service ?? "—" },
        { key: "source", label: "Source" },
        {
          key: "status",
          label: "Status",
          render: (r) => (
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] ${
              r.status === "delivered" ? "bg-emerald-500/15 text-emerald-300 border border-emerald-400/30" :
              r.status === "in_progress" ? "bg-amber-500/15 text-amber-300 border border-amber-400/30" :
              r.status === "rejected" ? "bg-rose-500/15 text-rose-300 border border-rose-400/30" :
              "bg-cyan-500/15 text-cyan-300 border border-cyan-400/30"
            }`}>
              {r.status}
            </span>
          ),
        },
      ]}
    />
  );
}
