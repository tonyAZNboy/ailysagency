import { AdminTable } from "./AdminTable";

interface PartnerApplication {
  id: string;
  agency_name: string;
  contact_name: string;
  contact_email: string;
  city: string | null;
  language: string;
  current_client_count: number | null;
  expected_referrals_per_year: number | null;
  pitch: string | null;
  source: string;
  status: string;
  created_at: string;
}

export default function AdminPartnerApplications() {
  return (
    <AdminTable<PartnerApplication>
      title="Partner Program applications"
      description="Inbound partner-agency applications from /agencies/partner-program. Triage status, schedule kickoff calls."
      table="partner_applications"
      emptyHint="Once agencies submit the Partner Program form, applications appear here. Until then, set up the form to write to the partner_applications table (see migration 0005)."
      columns={[
        { key: "created_at", label: "Submitted", render: (r) => new Date(r.created_at).toLocaleString() },
        { key: "agency_name", label: "Agency" },
        { key: "contact_name", label: "Contact" },
        { key: "contact_email", label: "Email" },
        { key: "city", label: "City", render: (r) => r.city ?? "(not provided)" },
        { key: "language", label: "Lang" },
        {
          key: "current_client_count",
          label: "Active",
          render: (r) => (r.current_client_count ?? "?").toString(),
        },
        {
          key: "expected_referrals_per_year",
          label: "Expected/yr",
          render: (r) => (r.expected_referrals_per_year ?? "?").toString(),
        },
        {
          key: "status",
          label: "Status",
          render: (r) => (
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] ${
                r.status === "converted"
                  ? "bg-emerald-500/15 text-emerald-300 border border-emerald-400/30"
                  : r.status === "qualified"
                    ? "bg-cyan-500/15 text-cyan-300 border border-cyan-400/30"
                    : r.status === "contacted"
                      ? "bg-amber-500/15 text-amber-300 border border-amber-400/30"
                      : r.status === "declined"
                        ? "bg-rose-500/15 text-rose-300 border border-rose-400/30"
                        : "bg-violet-500/15 text-violet-300 border border-violet-400/30"
              }`}
            >
              {r.status}
            </span>
          ),
        },
      ]}
    />
  );
}
