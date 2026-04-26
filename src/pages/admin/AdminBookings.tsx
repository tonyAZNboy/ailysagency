import { AdminTable } from "./AdminTable";

interface BookingRequest {
  id: string;
  name: string;
  email: string;
  business: string | null;
  language: string;
  notes: string | null;
  status: string;
  scheduled_for: string | null;
  created_at: string;
}

export default function AdminBookings() {
  return (
    <AdminTable
      title="Strategy call bookings"
      description="Calendar requests from the BookCallSection form. Schedule, reschedule, cancel."
      table="booking_requests"
      emptyHint="Visitors who submit the strategy call form appear here. Wire the form to the booking_requests table to start collecting."
      columns={[
        { key: "created_at", label: "Requested", render: (r) => new Date(r.created_at).toLocaleString() },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "business", label: "Business", render: (r) => r.business ?? "—" },
        { key: "language", label: "Language" },
        { key: "notes", label: "Notes", render: (r) => r.notes ? r.notes.slice(0, 80) + (r.notes.length > 80 ? "..." : "") : "—" },
        {
          key: "status",
          label: "Status",
          render: (r) => (
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] ${
              r.status === "scheduled" ? "bg-violet-500/15 text-violet-300 border border-violet-400/30" :
              r.status === "completed" ? "bg-emerald-500/15 text-emerald-300 border border-emerald-400/30" :
              r.status === "cancelled" ? "bg-rose-500/15 text-rose-300 border border-rose-400/30" :
              "bg-cyan-500/15 text-cyan-300 border border-cyan-400/30"
            }`}>
              {r.status}
            </span>
          ),
        },
        {
          key: "scheduled_for",
          label: "Slot",
          render: (r) => r.scheduled_for ? new Date(r.scheduled_for).toLocaleString() : "—",
        },
      ]}
    />
  );
}
