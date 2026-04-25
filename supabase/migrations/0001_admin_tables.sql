-- AiLys Agency · admin monitoring tables
-- Apply with: supabase db push (or `supabase migration up` after linking)

-- 1. Audit submissions (Hero form + /audit page)
create table if not exists public.audit_requests (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  city text not null,
  email text not null,
  service text,
  source text default 'hero',  -- 'hero' | 'audit_page' | 'cta_section'
  status text default 'pending',  -- 'pending' | 'in_progress' | 'delivered' | 'rejected'
  delivered_at timestamptz,
  notes text,
  visitor_session_id text,
  user_agent text,
  referer text,
  created_at timestamptz default now()
);

create index if not exists audit_requests_created_at_idx on public.audit_requests (created_at desc);
create index if not exists audit_requests_status_idx on public.audit_requests (status);

-- 2. Strategy call booking requests
create table if not exists public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  business text,
  language text default 'English',
  notes text,
  status text default 'pending',  -- 'pending' | 'scheduled' | 'completed' | 'cancelled'
  scheduled_for timestamptz,
  cal_event_id text,
  visitor_session_id text,
  created_at timestamptz default now()
);

create index if not exists booking_requests_created_at_idx on public.booking_requests (created_at desc);
create index if not exists booking_requests_status_idx on public.booking_requests (status);

-- 3. Chat sessions (LandingChatWidget)
create table if not exists public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  visitor_session_id text not null,
  message_count int default 0,
  first_message_at timestamptz default now(),
  last_message_at timestamptz default now(),
  intent text,
  sentiment text,
  cta_shown boolean default false,
  cta_clicked boolean default false,
  email_captured text,
  page_path text,
  created_at timestamptz default now()
);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.chat_sessions(id) on delete cascade,
  role text not null,  -- 'user' | 'assistant'
  content text not null,
  intent text,
  sentiment text,
  confidence numeric,
  created_at timestamptz default now()
);

create index if not exists chat_sessions_created_at_idx on public.chat_sessions (created_at desc);
create index if not exists chat_messages_session_idx on public.chat_messages (session_id, created_at);

-- 4. Visitor sessions (lightweight analytics)
create table if not exists public.visitor_sessions (
  id text primary key,  -- the localStorage-generated session id
  first_seen timestamptz default now(),
  last_seen timestamptz default now(),
  page_views int default 1,
  language text,
  country text,
  city text,
  user_agent text,
  referer text,
  utm_source text,
  utm_medium text,
  utm_campaign text
);

create index if not exists visitor_sessions_last_seen_idx on public.visitor_sessions (last_seen desc);

-- 5. Page views
create table if not exists public.page_views (
  id uuid primary key default gen_random_uuid(),
  visitor_session_id text references public.visitor_sessions(id) on delete cascade,
  path text not null,
  title text,
  referer text,
  duration_seconds int,
  created_at timestamptz default now()
);

create index if not exists page_views_path_idx on public.page_views (path, created_at desc);
create index if not exists page_views_session_idx on public.page_views (visitor_session_id);

-- 6. Blog post events (views, time on page)
create table if not exists public.blog_post_events (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  visitor_session_id text,
  event text not null,  -- 'view' | 'read_complete' | 'cta_click' | 'share'
  duration_seconds int,
  created_at timestamptz default now()
);

create index if not exists blog_post_events_slug_idx on public.blog_post_events (slug, created_at desc);

-- 7. Newsletter signups (audit form opt-in repurposed)
create table if not exists public.newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  source text,  -- 'audit_form' | 'blog_footer' | 'manual'
  language text default 'en',
  status text default 'active',  -- 'active' | 'unsubscribed'
  created_at timestamptz default now(),
  unsubscribed_at timestamptz
);

create index if not exists newsletter_signups_email_idx on public.newsletter_signups (email);

-- 8. Admin users (operator accounts for the AiLys team)
-- Auth handled by Supabase auth.users; this is the operator profile
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text default 'operator',  -- 'owner' | 'operator' | 'viewer'
  active boolean default true,
  created_at timestamptz default now()
);

-- ─── Row Level Security ─────────────────────────────────────

alter table public.audit_requests enable row level security;
alter table public.booking_requests enable row level security;
alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;
alter table public.visitor_sessions enable row level security;
alter table public.page_views enable row level security;
alter table public.blog_post_events enable row level security;
alter table public.newsletter_signups enable row level security;
alter table public.admin_users enable row level security;

-- Anon can INSERT into all submission tables (form posts work without login)
create policy "anon_insert_audit_requests" on public.audit_requests for insert with check (true);
create policy "anon_insert_booking_requests" on public.booking_requests for insert with check (true);
create policy "anon_insert_chat_sessions" on public.chat_sessions for insert with check (true);
create policy "anon_insert_chat_messages" on public.chat_messages for insert with check (true);
create policy "anon_upsert_visitor_sessions" on public.visitor_sessions for insert with check (true);
create policy "anon_insert_page_views" on public.page_views for insert with check (true);
create policy "anon_insert_blog_post_events" on public.blog_post_events for insert with check (true);
create policy "anon_insert_newsletter_signups" on public.newsletter_signups for insert with check (true);

-- Authenticated admins can SELECT/UPDATE all rows
create policy "admin_select_audit_requests" on public.audit_requests for select using (
  exists (select 1 from public.admin_users where user_id = auth.uid() and active = true)
);
create policy "admin_update_audit_requests" on public.audit_requests for update using (
  exists (select 1 from public.admin_users where user_id = auth.uid() and active = true)
);
create policy "admin_select_booking_requests" on public.booking_requests for select using (
  exists (select 1 from public.admin_users where user_id = auth.uid() and active = true)
);
create policy "admin_update_booking_requests" on public.booking_requests for update using (
  exists (select 1 from public.admin_users where user_id = auth.uid() and active = true)
);
create policy "admin_select_chat_sessions" on public.chat_sessions for select using (
  exists (select 1 from public.admin_users where user_id = auth.uid() and active = true)
);
create policy "admin_select_chat_messages" on public.chat_messages for select using (
  exists (select 1 from public.admin_users where user_id = auth.uid() and active = true)
);
create policy "admin_select_visitor_sessions" on public.visitor_sessions for select using (
  exists (select 1 from public.admin_users where user_id = auth.uid() and active = true)
);
create policy "admin_select_page_views" on public.page_views for select using (
  exists (select 1 from public.admin_users where user_id = auth.uid() and active = true)
);
create policy "admin_select_blog_post_events" on public.blog_post_events for select using (
  exists (select 1 from public.admin_users where user_id = auth.uid() and active = true)
);
create policy "admin_select_newsletter_signups" on public.newsletter_signups for select using (
  exists (select 1 from public.admin_users where user_id = auth.uid() and active = true)
);
create policy "admin_self_select_admin_users" on public.admin_users for select using (
  user_id = auth.uid()
);
