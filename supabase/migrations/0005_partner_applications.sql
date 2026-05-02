-- AiLys Agency · Partner Program applications (F3.0 MVP)
--
-- Captures applications from prospective partner agencies who want to
-- white-label AiLys for their own clients. Demand-validation surface
-- before the full F3 white-label build (per .planning/phase-f3-0-
-- partner-waitlist/00-objectives.md).
--
-- Apply with: supabase db push (or `supabase migration up` after linking)
-- Down at end of file under "ROLLBACK" comment marker.

-- ─── 1. partner_applications table ──────────────────────────

create table if not exists public.partner_applications (
  id uuid primary key default gen_random_uuid(),

  -- agency identity
  agency_name text not null,
  contact_name text not null,
  contact_email text not null,
  city text,
  language text default 'en',  -- 'en' | 'fr'

  -- intent signals
  current_client_count integer,  -- approx, 0-10000
  expected_referrals_per_year integer,  -- approx, 0-1000
  pitch text,  -- free-form, max 2000 chars

  -- ops state
  source text default 'partner-program',  -- 'partner-program' | 'inbound' | 'referred'
  status text default 'new',  -- 'new' | 'contacted' | 'qualified' | 'converted' | 'declined'
  contacted_at timestamptz,
  notes text,

  -- attribution
  visitor_session_id text,
  ip_hash text,  -- sha256 with daily rotating salt; NEVER plaintext IP

  -- idempotency
  payload_hash text,  -- sha256 of (agency_name + contact_email + pitch); dedupes accidental double-submits

  created_at timestamptz default now()
);

create index if not exists partner_applications_created_at_idx
  on public.partner_applications (created_at desc);

create index if not exists partner_applications_status_idx
  on public.partner_applications (status);

create unique index if not exists partner_applications_payload_hash_uniq
  on public.partner_applications (payload_hash)
  where payload_hash is not null;

-- ─── 2. Row Level Security ──────────────────────────────────

alter table public.partner_applications enable row level security;

-- Anon can INSERT (form submission goes through service role on edge fn,
-- but explicit policy makes intent clear and works in any auth context)
create policy "anon_insert_partner_applications"
  on public.partner_applications
  for insert
  with check (true);

-- Authenticated admin operators can SELECT/UPDATE all rows
create policy "admin_select_partner_applications"
  on public.partner_applications
  for select
  using (
    exists (select 1 from public.admin_users where user_id = auth.uid() and active = true)
  );

create policy "admin_update_partner_applications"
  on public.partner_applications
  for update
  using (
    exists (select 1 from public.admin_users where user_id = auth.uid() and active = true)
  );

-- ─── ROLLBACK (DOWN script) ─────────────────────────────────
-- To revert this migration, run the following SQL block in order:
--
--   drop policy if exists "admin_update_partner_applications" on public.partner_applications;
--   drop policy if exists "admin_select_partner_applications" on public.partner_applications;
--   drop policy if exists "anon_insert_partner_applications" on public.partner_applications;
--   drop index if exists public.partner_applications_payload_hash_uniq;
--   drop index if exists public.partner_applications_status_idx;
--   drop index if exists public.partner_applications_created_at_idx;
--   drop table if exists public.partner_applications;
--
-- Pre-revert checklist:
--   1. Export rows first: COPY public.partner_applications TO '/tmp/partner_applications_<ts>.csv' WITH CSV HEADER;
--   2. Confirm no FK points INTO this table (none should).
--   3. Run the drops above in the order shown.
--
-- Tested: SQL syntax review only as of 2026-05-02. Real apply/revert
-- round-trip pending AiLys Supabase project provisioning (per
-- STATE.md priority #6).
