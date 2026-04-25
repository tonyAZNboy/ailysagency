-- AiLys Agency · email lifecycle + churn tables
-- Apply with: supabase migration up
--
-- Builds on 0001 (audit_requests, booking_requests, chat_sessions, newsletter_signups).
-- Adds:
--   1. users_unified view (one row per email, joining all source tables)
--   2. email_sequences (sequence definitions)
--   3. email_sequence_enrollments (which user is in which sequence)
--   4. email_sends (audit log of every send)
--   5. churn_signals view (computed on read)
--
-- The actual email-send job runs as a Supabase pg_cron + edge function.
-- See supabase/functions/README.md for the deployment recipe.

-- ─── 1. Unified user view ────────────────────────────────────
-- One row per email address that touched any AiLys surface.

create or replace view public.users_unified as
with all_emails as (
  select email, created_at, 'audit' as source from public.audit_requests
  union all
  select email, created_at, 'booking' from public.booking_requests
  union all
  select email_captured as email, created_at, 'chat'
    from public.chat_sessions
    where email_captured is not null
  union all
  select email, created_at, 'newsletter' from public.newsletter_signups
),
agg as (
  select
    email,
    min(created_at) as first_seen_at,
    max(created_at) as last_seen_at,
    count(*) filter (where source = 'audit') as audit_count,
    count(*) filter (where source = 'booking') as booking_count,
    count(*) filter (where source = 'chat') as chat_count,
    count(*) filter (where source = 'newsletter') as newsletter_count,
    count(*) as touch_count
  from all_emails
  where email is not null and email <> ''
  group by email
)
select
  a.email,
  a.first_seen_at,
  a.last_seen_at,
  a.audit_count,
  a.booking_count,
  a.chat_count,
  a.newsletter_count,
  a.touch_count,
  -- Lifecycle stage (computed):
  case
    when a.booking_count > 0 then 'qualified'
    when a.last_seen_at > now() - interval '7 days' then 'new'
    when a.touch_count >= 3 then 'engaged'
    when a.audit_count > 0 and a.last_seen_at > now() - interval '30 days' then 'nurturing'
    when a.last_seen_at < now() - interval '60 days' then 'dormant'
    when a.last_seen_at < now() - interval '30 days' then 'churning'
    else 'cold'
  end as lifecycle_stage,
  -- Engagement score 0-100 (rough):
  least(100,
    (a.touch_count * 10)
    + (a.booking_count * 30)
    + (a.audit_count * 20)
    + (a.chat_count * 5)
  ) as engagement_score,
  -- Churn risk score 0-100 (rough, only meaningful for prior-engaged users):
  case
    when a.touch_count = 0 then 0
    when a.last_seen_at > now() - interval '14 days' then 0
    when a.last_seen_at > now() - interval '30 days' then 25
    when a.last_seen_at > now() - interval '60 days' then 60
    else 90
  end as churn_risk_score,
  extract(day from now() - a.last_seen_at)::int as days_since_last_seen
from agg a;

-- ─── 2. Sequences ────────────────────────────────────────────

create table if not exists public.email_sequences (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  type text not null check (type in ('welcome', 'education', 'soft_pitch', 'hard_pitch', 'win_back', 'reactivation', 'custom')),
  trigger text not null check (trigger in ('audit_submitted', 'booking_requested', 'chat_email_captured', 'newsletter_signup', 'churn_risk_high', 'manual')),
  status text default 'draft' check (status in ('draft', 'active', 'paused', 'archived')),
  steps jsonb not null default '[]'::jsonb, -- array of { delay_days, subject, preheader, body, cta_label, cta_url }
  language text default 'en',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists email_sequences_status_idx on public.email_sequences (status);

-- Seed the 5 starter sequences
insert into public.email_sequences (slug, name, description, type, trigger, status, steps) values
('welcome', 'Welcome series', 'Three-touch welcome for new audit submitters. Day 0, Day 2, Day 5.', 'welcome', 'audit_submitted', 'draft',
  '[
    {"delay_days":0,"subject":"Your AiLys audit landed. Here is what to do first.","preheader":"Three moves before our team replies.","body":"Hi {first_name},\n\nThe audit you just ran scored {score}/100 across the 14 reputation signals AI engines weight most. Before we send you the full PDF, here are three moves that are usually free and take under an hour combined:\n\n1. Claim or reverify your Google Business Profile if you have not already.\n2. Add 5 fresh photos with EXIF metadata to your GBP.\n3. Reply to any review from the last 90 days that does not have a response.\n\nThose three account for about 30 percent of your score. The rest of the action plan is in the report we are emailing next.\n\nThe AiLys team","cta_label":"Run the AI Visibility Audit too","cta_url":"https://www.ailysagency.ca/audit"},
    {"delay_days":2,"subject":"Why most local businesses are invisible to ChatGPT.","preheader":"The three layers that decide who gets cited.","body":"Hi {first_name},\n\nQuick follow up. The number one question we get from local owners after the audit is: \"Why does my competitor show up in ChatGPT and I do not?\"\n\nThe answer is three layers, in this order:\n\n1. Wikipedia and Wikidata. ChatGPT pulls hard from the entity layer.\n2. High-DA citations. Yelp, BBB, Crunchbase, industry directories.\n3. First-hand experience markers. Real photos, real bylines, original data.\n\nIf you fix layer 1 and 2 in the next quarter, citation rate typically lifts 20 to 40 percent. Reply if you want our 90-day playbook for your specific industry.\n\nThe AiLys team","cta_label":"Book a 60-min strategy call","cta_url":"https://www.ailysagency.ca/book-call"},
    {"delay_days":5,"subject":"The three highest-leverage fixes from your audit.","preheader":"From the report you just ran.","body":"Hi {first_name},\n\nLooking back at your audit, three signals are dragging your score down the hardest:\n\n1. Review velocity (the most-weighted signal at 15 percent).\n2. Citation density across high-DA sources.\n3. Schema markup completeness on your site.\n\nFixing these three usually moves the needle 25 to 35 points within 90 days. We ship all three at the Core tier ($600 per month). If that is not the right fit yet, the 90-day playbook in the audit PDF tells you how to DIY.\n\nThe AiLys team","cta_label":"See pricing and tiers","cta_url":"https://www.ailysagency.ca#services"}
  ]'::jsonb
),
('education', 'Education series', 'Five-touch educational nurture. Days 7, 14, 21, 28, 35. AEO, GEO, E-E-A-T, Reddit, voice.', 'education', 'audit_submitted', 'draft',
  '[
    {"delay_days":7,"subject":"AEO explained in plain English.","preheader":"Answer Engine Optimization without the jargon.","body":"Hi {first_name},\n\nAEO stands for Answer Engine Optimization. It is the work of structuring your content so AI engines can pull a clean, direct answer from your site instead of summarizing a competitor.\n\nThe four core moves:\n1. FAQ schema on every service page.\n2. LocalBusiness schema fully filled.\n3. Review schema with aggregateRating.\n4. Service schema with one entity per service.\n\nIf a buyer asks ChatGPT \"how much does X cost in [city]\", AEO is what makes ChatGPT pull your answer instead of a competitor.\n\nThe AiLys team","cta_label":"See your AEO score","cta_url":"https://www.ailysagency.ca/audit"},
    {"delay_days":14,"subject":"GEO and why your competitor gets cited and you do not.","preheader":"Generative Engine Optimization basics.","body":"Hi {first_name},\n\nAEO is about being the answer. GEO is about being named in the answer.\n\nChatGPT can give a great answer about your industry without ever naming a single business. GEO is the work of being one of the businesses it names. The signals that drive it: Wikipedia and Wikidata, high-DA citation density, authoritative third-party content, original data or research.\n\nGEO is harder than AEO because it depends on third-party validation. You cannot DIY it overnight. But the businesses that invest in it now will own the LLM era.\n\nThe AiLys team","cta_label":"Learn more about GEO","cta_url":"https://www.ailysagency.ca/help/what-is-geo"},
    {"delay_days":21,"subject":"E-E-A-T: the signal AI engines actually weight.","preheader":"Experience, Expertise, Authoritativeness, Trust.","body":"Hi {first_name},\n\nE-E-A-T is Google''s framework for evaluating content quality. AI engines now use the same rubric for picking what to cite. The four pillars:\n\n- Experience: first-hand evidence. Original photos with EXIF data, real customer interviews.\n- Expertise: credentials. Author bios with real qualifications.\n- Authoritativeness: third-party validation. Press, awards, peer recognition.\n- Trust: technical and business honesty. SSL, transparent pricing, real reviews.\n\nE-E-A-T is the highest-leverage AI search signal in 2026. Every LLM that uses Google''s index inherits the weighting.\n\nThe AiLys team","cta_label":"Score your E-E-A-T","cta_url":"https://www.ailysagency.ca/audit"},
    {"delay_days":28,"subject":"The Reddit citation strategy nobody talks about.","preheader":"Why Perplexity and ChatGPT pull from Reddit.","body":"Hi {first_name},\n\nMost agencies ignore Reddit. They should not. ChatGPT and Perplexity weight Reddit signals heavily because Reddit is one of the few places with genuine user discussion.\n\nThe play that works for our clients:\n1. Find the 3 to 5 active subreddits in your industry.\n2. Answer 2 substantive questions per week as a real human, not as a brand account.\n3. Mention your business in passing only when contextually genuine.\n4. Let your name appear in user-generated answers over time.\n\nThis is slow work that compounds. Six months in, our clients see Reddit as a top-3 referrer and a real LLM citation feeder.\n\nThe AiLys team","cta_label":"Talk strategy","cta_url":"https://www.ailysagency.ca/book-call"},
    {"delay_days":35,"subject":"Voice search just changed for your industry.","preheader":"What iOS 18 changed in late 2025.","body":"Hi {first_name},\n\nApple changed how iOS local recommendations work in late 2025. The change went unannounced. We caught it because we run weekly voice query tests across 30 verticals.\n\nThree things shifted at once:\n1. Apple Maps Connect verified businesses now rank higher than third-party data partners.\n2. Recent reviews matter more than total review count.\n3. Service-specific keywords inside reviews now propagate to voice ranking.\n\nThree implications for you. Your monthly review pace matters more than your total. Your reviews need keyword variety. Apple Maps Connect needs a quarterly audit.\n\nThe AiLys team","cta_label":"Run a fresh audit","cta_url":"https://www.ailysagency.ca/audit"}
  ]'::jsonb
),
('soft_pitch', 'Soft pitch series', 'Two-touch soft pitch after education. Day 14 and 21 of pitch window.', 'soft_pitch', 'manual', 'draft',
  '[
    {"delay_days":14,"subject":"Want a 60-min strategy call? Here is what we cover.","preheader":"Free, no pitch, strategy doc sent regardless.","body":"Hi {first_name},\n\nIf the audit raised more questions than it answered, we host 60-minute strategy calls. Available in EN, FR-CA, ES, ZH, AR, RU, UK, SR.\n\nWhat we cover:\n1. Walk through your audit results in detail.\n2. Map your AI search position against your top 3 competitors.\n3. Sketch a 90-day plan tuned to your industry and city.\n4. Tell you whether AiLys is the right fit and refer you out if not.\n\nNo pitch. No discovery-call theatre. We send a one-page strategy doc afterward whether you sign or not.\n\nThe AiLys team","cta_label":"Book a slot","cta_url":"https://www.ailysagency.ca/book-call"},
    {"delay_days":21,"subject":"Three things we would fix if you were a client this month.","preheader":"Specific to your audit results.","body":"Hi {first_name},\n\nLooking back at your audit, here is what we would prioritize in the first 30 days:\n\n1. Schema markup deployment (FAQ, Review, LocalBusiness, Service entities).\n2. Citation building across the 5 highest-impact directories for your industry.\n3. Review velocity workflow that lifts you from current pace to 4 to 6 reviews per month.\n\nThis is the Core tier ($600 per month). If you want to talk through whether it is the right fit, hit reply.\n\nThe AiLys team","cta_label":"Reply and tell us","cta_url":"mailto:hello@ailysagency.ca"}
  ]'::jsonb
),
('hard_pitch', 'Hard pitch', 'One-shot hard pitch. Use sparingly.', 'hard_pitch', 'manual', 'draft',
  '[
    {"delay_days":0,"subject":"We have one Core tier slot opening next month.","preheader":"Direct ask. Open if interested, ignore if not.","body":"Hi {first_name},\n\nDirect ask. We have one Core tier slot opening for {next_month}. Pricing is $600 per month, month to month, 30-day money-back guarantee.\n\nWhat lands in your first 30 days:\n- Schema deployment (FAQ, Review, LocalBusiness, Service)\n- GBP optimization (categories, attributes, Q&A, photos)\n- First batch of 5 citations submitted\n- Bilingual content piece written\n- Bi-weekly strategy call set up\n\nIf you want it, reply with the word \"yes\" and we send the contract within 24 hours. If you do not, ignore this. We do not chase.\n\nThe AiLys team","cta_label":"Reply yes","cta_url":"mailto:hello@ailysagency.ca?subject=Yes"}
  ]'::jsonb
),
('win_back', 'Win-back / churn rescue', 'Three-touch win-back for users dormant 30+ days.', 'win_back', 'churn_risk_high', 'draft',
  '[
    {"delay_days":0,"subject":"Quick check in. Did our audit help?","preheader":"No follow-up if you reply.","body":"Hi {first_name},\n\nIt has been a few weeks since you ran your AiLys audit. Quick check in.\n\nDid the report help? Did you ship any of the action plan? If you have specific questions on any item, reply directly to this email and we will answer.\n\nIf the report was not useful or you did not need our help, no follow-up. We do not chase.\n\nThe AiLys team","cta_label":"Reply with feedback","cta_url":"mailto:hello@ailysagency.ca"},
    {"delay_days":7,"subject":"Here is what changed in AI search since your audit.","preheader":"Three things shifted that affect your audit score.","body":"Hi {first_name},\n\nThree things changed in AI search this month that affect your audit score.\n\n1. Google AI Overviews now answer 16 percent of all queries, up from 14 percent last quarter.\n2. Perplexity rolled out their citation density algorithm change. Reddit signals now weight more.\n3. Bing Copilot added LinkedIn as a primary citation source for B2B queries.\n\nIf you want a fresh audit reflecting these changes, run it again. Free, same 30-second turnaround.\n\nThe AiLys team","cta_label":"Run a fresh audit","cta_url":"https://www.ailysagency.ca/audit"},
    {"delay_days":21,"subject":"50 percent off the first month if you start before {date}.","preheader":"Last touch. Then we stop.","body":"Hi {first_name},\n\nLast email. We are running a 50 percent discount on the first month of any AiLys tier for audit submitters who start before {date}.\n\n- Starter: $150 first month, then $300\n- Core: $300 first month, then $600\n- Growth: $600 first month, then $1,200\n- Autopilot: $650 first month, then $1,299\n\nMonth to month, 30-day money-back guarantee. Reply with the tier name if you want it. If not, ignore. This is the last email in this sequence.\n\nThe AiLys team","cta_label":"Reply with tier name","cta_url":"mailto:hello@ailysagency.ca?subject=Discount"}
  ]'::jsonb
)
on conflict (slug) do nothing;

-- ─── 2b. Clients (paid tier signups) ─────────────────────────

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  business_name text not null,
  contact_name text,
  city text,
  industry text,
  tier text not null check (tier in ('starter', 'core', 'growth', 'autopilot')),
  monthly_cad numeric not null,
  language text default 'en',
  status text default 'active' check (status in ('active', 'paused', 'cancelled', 'churned')),
  onboarded_at timestamptz default now(),
  next_review_at timestamptz,
  notes text,
  source_audit_id uuid references public.audit_requests(id) on delete set null,
  source_booking_id uuid references public.booking_requests(id) on delete set null,
  created_by uuid references auth.users(id),
  created_at timestamptz default now()
);

create index if not exists clients_status_idx on public.clients (status);
create index if not exists clients_tier_idx on public.clients (tier);

alter table public.clients enable row level security;
create policy "admin_all_clients" on public.clients for all using (
  exists (select 1 from public.admin_users where user_id = auth.uid() and active = true)
);

-- Tier-specific onboarding sequences
insert into public.email_sequences (slug, name, description, type, trigger, status, steps) values

-- ─── STARTER tier ───
('client_onboarding_starter', 'Onboarding · Starter ($300/mo)', 'Five-touch onboarding for Starter clients. Light, GBP-focused.', 'welcome', 'manual', 'draft',
  '[
    {"delay_days":0,"subject":"Welcome to AiLys Starter, {first_name}.","preheader":"GBP-focused, monthly call, $300/mo. Here is what happens.","body":"Hi {first_name},\n\nWelcome to AiLys Starter. {business_name} is now in our roster. Here is what your $300/mo gets you and how the first 30 days run.\n\nWhat your tier covers:\n- Google Business Profile management (categories, attributes, photos, Q&A, posts)\n- LLM citation tracking across ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot\n- One 30-min strategy call per month\n- Monthly performance report\n\nFirst 30 days:\n- Day 2: Quick onboarding form (3 questions, 3 minutes)\n- Day 3 to 5: GBP audit + cleanup\n- Day 8 to 10: First citation tracking baseline locked\n- Day 30: First monthly report + your first strategy call\n\nReply with any questions.\n\nThe AiLys team","cta_label":"Open my dashboard","cta_url":"https://www.ailysagency.ca/admin"},
    {"delay_days":2,"subject":"Three questions. Three minutes.","preheader":"So your GBP audit lands with full context.","body":"Hi {first_name},\n\nThree quick questions so we run your GBP audit with the right context.\n\n1. What is your top business goal for the next 6 months?\n2. Who are your top 2 competitors by name?\n3. Anything we should NOT touch (existing campaigns, brand voice, vendor relationships)?\n\nReply directly.\n\nThe AiLys team","cta_label":"Reply now","cta_url":"mailto:hello@ailysagency.ca"},
    {"delay_days":7,"subject":"Your GBP audit is done. Three quick wins inside.","preheader":"What we cleaned up + what is next.","body":"Hi {first_name},\n\nWe finished your GBP audit. The full report is attached. The three highest-leverage moves we already shipped:\n\n1. Cleaned your category accuracy (was generic, now specific to your service type).\n2. Filled in 8 attributes that were empty.\n3. Posted your first GBP update of the month.\n\nWhat is queued for next week: Q&A seeding, photo refresh, review velocity workflow.\n\nThe AiLys team","cta_label":"View dashboard","cta_url":"https://www.ailysagency.ca/admin"},
    {"delay_days":21,"subject":"Strategy call reminder. Bring questions.","preheader":"Day 30 call coming up.","body":"Hi {first_name},\n\nYour first AiLys strategy call is in 9 days. The agenda:\n\n1. Walk through your first monthly report\n2. Show where your GBP score moved\n3. Lock priorities for month 2\n4. Open Q&A on whatever is on your mind\n\nIf you have specific questions you want covered, reply now and we will prep.\n\nThe AiLys team","cta_label":"Book or reschedule","cta_url":"https://www.ailysagency.ca/book-call"},
    {"delay_days":30,"subject":"Your first monthly report.","preheader":"Real numbers, plain language.","body":"Hi {first_name},\n\nFirst monthly report attached. GBP performance, citation tracking baseline, what we shipped, what is queued.\n\nYour strategy call is on the calendar. See you there.\n\nThe AiLys team","cta_label":"Read the report","cta_url":"https://www.ailysagency.ca/admin"}
  ]'::jsonb
),

-- ─── CORE tier ───
('client_onboarding_core', 'Onboarding · Core ($600/mo)', 'Five-touch onboarding for Core clients. Deeper, schema + citations.', 'welcome', 'manual', 'draft',
  '[
    {"delay_days":0,"subject":"Welcome to AiLys Core, {first_name}. Here is the 30-day plan.","preheader":"Schema, citations, bilingual content. $600/mo.","body":"Hi {first_name},\n\nWelcome to AiLys Core, our most-chosen tier. {business_name} is now in our roster. Here is what your $600/mo gets you and how the first 30 days run.\n\nWhat your tier covers:\n- Everything in Starter (GBP, citation tracking, monthly report)\n- AEO schema deployment (FAQ, Review, LocalBusiness, Service entities)\n- 5 high-DA citations submitted per month\n- One bilingual (EN + FR-CA) content piece per month\n- Bi-weekly 30-min strategy call\n\nFirst 30 days:\n- Day 2: Onboarding form (5 questions, 5 minutes)\n- Day 3 to 7: Deep audit + strategy doc delivered\n- Day 7: Strategy review call to lock priorities\n- Day 8 to 14: Schema deployment + first 2 citations submitted + first content piece briefed\n- Day 15 to 30: Citation push continues, content piece publishes, monthly report drafted\n- Day 30: Monthly report + bi-weekly call\n\nReply with any questions.\n\nThe AiLys team","cta_label":"Open my dashboard","cta_url":"https://www.ailysagency.ca/admin"},
    {"delay_days":2,"subject":"Onboarding form. 5 questions, 5 minutes.","preheader":"So we run your audit with full context.","body":"Hi {first_name},\n\nFive quick questions so we run your audit with the right context.\n\n1. What is your top business goal for the next 6 months?\n2. Who are your top 3 competitors by name and city?\n3. What CMS does your website run on?\n4. Do you currently work with an SEO agency, marketing agency, or freelancer? If yes, who?\n5. Anything we should NOT touch (existing campaigns, brand guidelines, vendor relationships)?\n\nReply directly.\n\nThe AiLys team","cta_label":"Reply now","cta_url":"mailto:hello@ailysagency.ca"},
    {"delay_days":3,"subject":"Your deep audit is in progress.","preheader":"What we are scanning right now.","body":"Hi {first_name},\n\nIn progress this week for {business_name}.\n\n- Schema markup audit (FAQ, Review, LocalBusiness, Service entities, ready to deploy)\n- GBP completeness check\n- Citation footprint scan across 50 high-DA directories (we picked your top 5 to target)\n- LLM citation baseline across 6 AI engines\n- Competitor benchmark for your top 3\n- Content brief for your first bilingual piece\n\nDeliverable lands by Day 7.\n\nThe AiLys team","cta_label":"View progress","cta_url":"https://www.ailysagency.ca/admin"},
    {"delay_days":7,"subject":"Strategy doc ready. 30-min review call.","preheader":"Lock priorities, then we ship.","body":"Hi {first_name},\n\nStrategy doc ready. It covers:\n\n1. Where {business_name} sits today across AEO, GEO, E-E-A-T (with scores)\n2. The 90-day plan tuned to your industry and city\n3. First 3 deliverables shipping in week 2 and 3 (schema, 2 citations, content brief)\n4. KPI targets we are tracking\n\nBook a 30-min review call below. After that, execution starts.\n\nThe AiLys team","cta_label":"Book strategy review","cta_url":"https://www.ailysagency.ca/book-call"},
    {"delay_days":30,"subject":"Your first AiLys monthly report.","preheader":"Schema deployed, 5 citations live, content live.","body":"Hi {first_name},\n\nFirst monthly report attached. Highlights from month 1:\n\n- AEO schema (FAQ, Review, LocalBusiness, Service) deployed and validated\n- 5 high-DA citations submitted, 4 already approved\n- First bilingual content piece live\n- LLM citation baseline locked\n\nYour next bi-weekly call is on the calendar. Reply if you want anything specific covered.\n\nThe AiLys team","cta_label":"Read the report","cta_url":"https://www.ailysagency.ca/admin"}
  ]'::jsonb
),

-- ─── GROWTH tier ───
('client_onboarding_growth', 'Onboarding · Growth ($1,200/mo)', 'Five-touch onboarding for Growth clients. GEO + weekly content + competitive monitoring.', 'welcome', 'manual', 'draft',
  '[
    {"delay_days":0,"subject":"Welcome to AiLys Growth, {first_name}.","preheader":"GEO entity work + weekly content + in-person review. $1,200/mo.","body":"Hi {first_name},\n\nWelcome to AiLys Growth. {business_name} is now in our roster. This is our most-comprehensive non-Autopilot tier. Here is what your $1,200/mo gets you and how the first 30 days run.\n\nWhat your tier covers:\n- Everything in Core\n- GEO entity authority work (Wikipedia, Wikidata, digital PR)\n- 10+ high-DA citations submitted per month\n- Weekly bilingual content production\n- Competitive monitoring (top 3 competitors tracked weekly)\n- In-person quarterly review (Quebec, Toronto, Montreal)\n\nFirst 30 days:\n- Day 2: Onboarding form\n- Day 3 to 5: Deep technical audit + GEO entity audit\n- Day 5 to 7: Strategy doc + week 1 content brief delivered\n- Day 7: 60-min strategy review + lock priorities\n- Day 8 to 14: Schema deployed, first 5 citations live, first 2 content pieces shipped, Wikidata work begins\n- Day 15 to 30: Citation push to 10+, weekly content cadence locked, competitive monitor goes live\n- Day 30: Monthly report + your in-person quarterly review gets scheduled\n\nReply with any questions.\n\nThe AiLys team","cta_label":"Open my dashboard","cta_url":"https://www.ailysagency.ca/admin"},
    {"delay_days":2,"subject":"Onboarding form + Wikidata pre-check.","preheader":"GEO work needs entity data we will gather now.","body":"Hi {first_name},\n\nThree things we need from you in the next 48 hours so the GEO entity work starts on schedule.\n\n1. The 5-question onboarding form (link below)\n2. Any existing press mentions or third-party articles that name {business_name}\n3. Any awards, certifications, or notable client lists we can cite for E-E-A-T signals\n\nWikidata work needs verifiable third-party sources. The more we have at Day 2, the faster your entity gets recognized.\n\nThe AiLys team","cta_label":"Fill in the form","cta_url":"https://www.ailysagency.ca/admin"},
    {"delay_days":7,"subject":"Strategy doc + week 1 content brief ready.","preheader":"60-min strategy review + content kickoff.","body":"Hi {first_name},\n\nThree deliverables ready:\n\n1. Strategy doc: 90-day GEO + AEO + E-E-A-T plan\n2. Wikidata entity proposal (we are submitting on Day 10)\n3. Week 1 content brief (publishing Day 14)\n\nBook your 60-min strategy review below. After that, execution starts.\n\nThe AiLys team","cta_label":"Book strategy review","cta_url":"https://www.ailysagency.ca/book-call"},
    {"delay_days":14,"subject":"First content piece live + Wikidata submitted.","preheader":"Week 2 progress.","body":"Hi {first_name},\n\nWeek 2 progress.\n\n- Schema deployment: shipped\n- First content piece: published, indexed, social-amplified\n- Wikidata entity: submitted, awaiting review (typical 7 to 14 days)\n- First 5 citations: 4 approved, 1 pending\n- Competitor monitor: live, weekly digest queued for next Friday\n\nNothing for you to do this week. Next deliverable: week 2 content piece, publishes Day 17.\n\nThe AiLys team","cta_label":"Dashboard","cta_url":"https://www.ailysagency.ca/admin"},
    {"delay_days":30,"subject":"Your first monthly Growth report + Q1 in-person review.","preheader":"Real numbers + dates for in-person quarterly.","body":"Hi {first_name},\n\nFirst monthly report attached. Highlights:\n\n- AEO schema deployed + validated\n- 12 citations submitted, 10 approved\n- 4 content pieces published (2 EN, 2 FR-CA)\n- Wikidata entity approved\n- Competitive monitor identified 3 actionable gaps with your top competitor\n- LLM citation tracking shows first lift in Perplexity for 2 of your target queries\n\nYour Q1 in-person review is being scheduled for week 12. Reply with your preferred date range and we lock it in.\n\nThe AiLys team","cta_label":"Read the report","cta_url":"https://www.ailysagency.ca/admin"}
  ]'::jsonb
),

-- ─── AUTOPILOT tier ───
('client_onboarding_autopilot', 'Onboarding · Autopilot ($1,299/mo)', 'Done-for-you onboarding. Reviuzy SaaS + monthly contest engine bundled.', 'welcome', 'manual', 'draft',
  '[
    {"delay_days":0,"subject":"Welcome to AiLys Autopilot, {first_name}. Engine starting.","preheader":"Reviuzy SaaS + monthly contest + everything in Growth. $1,299/mo.","body":"Hi {first_name},\n\nWelcome to AiLys Autopilot. {business_name} is now in our top tier. This is the done-for-you ceiling. Here is what is happening this week.\n\nWhat your tier covers:\n- Everything in Growth\n- Reviuzy SaaS Max bundled in (NFC tap reviews, multi-location dashboard, Domain Speed Boost, Domain Shield)\n- Monthly review contest run by us (legal T&C, automated draws, winner amplification)\n- NFC tap cards shipped to your locations\n- Fresh review velocity target: 20 to 50 reviews per location per month\n- Quarterly contest performance review\n\nThis week:\n- Day 1: Reviuzy SaaS account provisioned for {business_name}\n- Day 2: NFC tap card design draft shared\n- Day 3 to 5: Deep audit + first contest theme drafted\n- Day 7: 60-min strategy + contest kickoff call\n- Day 10: NFC cards shipped\n- Day 14: First monthly contest goes live\n\nReply with any questions.\n\nThe AiLys team","cta_label":"Open my dashboard","cta_url":"https://www.ailysagency.ca/admin"},
    {"delay_days":2,"subject":"NFC tap card design + contest theme draft.","preheader":"We need 30 minutes of your input.","body":"Hi {first_name},\n\nTwo things waiting for your sign-off.\n\n1. NFC tap card design: we drafted 3 variants in your brand colors. Pick one or ask for tweaks. Cards ship 48 hours after sign-off.\n\n2. First monthly contest theme: we drafted a kick-off contest concept tuned to {industry} businesses in {city}. Theme, prize tier, T&C draft, social amplification angle. Reply with thoughts.\n\nLink below for both.\n\nThe AiLys team","cta_label":"Review and approve","cta_url":"https://www.ailysagency.ca/admin"},
    {"delay_days":7,"subject":"60-min strategy + contest kickoff call this week.","preheader":"Big call. Bring your team.","body":"Hi {first_name},\n\nYour Autopilot kickoff call covers a lot. Block 60 minutes and bring whoever runs marketing on your side.\n\nAgenda:\n1. Walk through your strategy doc (AEO, GEO, E-E-A-T plan + Reviuzy integration)\n2. Approve the first monthly contest (live Day 14)\n3. Review NFC card placement plan for your locations\n4. Set the cadence for our weekly Slack updates\n5. Lock the date for your in-person Q1 review\n\nBook below.\n\nThe AiLys team","cta_label":"Book the kickoff","cta_url":"https://www.ailysagency.ca/book-call"},
    {"delay_days":14,"subject":"First contest is live. NFC cards shipped.","preheader":"What is happening at your locations right now.","body":"Hi {first_name},\n\nWeek 2 update.\n\n- NFC tap cards: shipped, tracking number in your Reviuzy dashboard\n- First monthly contest: live as of this morning\n- Reviuzy SaaS: configured for {business_name}, your team has access\n- Review velocity baseline locked at current rate\n\nWhat to do this week:\n1. Place NFC cards at customer touchpoints when they arrive (we sent a placement guide)\n2. Train front-of-house staff on the 10-second tap-to-review pitch\n3. Watch the dashboard. First reviews should land within 48 hours of NFC placement\n\nThe AiLys team","cta_label":"Reviuzy dashboard","cta_url":"https://www.reviuzy.com"},
    {"delay_days":30,"subject":"Month 1 Autopilot report + Q1 in-person review.","preheader":"Your engine is running.","body":"Hi {first_name},\n\nFirst monthly Autopilot report attached. Highlights:\n\n- AEO schema deployed + validated\n- GEO entity work in progress (Wikidata pending)\n- 12 citations submitted, 10 approved\n- 4 content pieces published\n- Reviuzy SaaS: live, NFC cards placed at all locations\n- First monthly contest: {contest_review_count} new reviews collected, {contest_winner_picked}\n- LLM citation tracking shows first lifts in Perplexity and ChatGPT for 3 of your target queries\n\nYour Q1 in-person review is being scheduled. Reply with date preference.\n\nThe AiLys team","cta_label":"Read the report","cta_url":"https://www.ailysagency.ca/admin"}
  ]'::jsonb
)
on conflict (slug) do nothing;

-- ─── 3. Enrollments ──────────────────────────────────────────

create table if not exists public.email_sequence_enrollments (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  sequence_id uuid not null references public.email_sequences(id) on delete cascade,
  current_step int default 0,
  status text default 'active' check (status in ('active', 'paused', 'completed', 'unsubscribed', 'bounced')),
  enrolled_at timestamptz default now(),
  last_send_at timestamptz,
  next_send_at timestamptz,
  unsubscribed_at timestamptz,
  metadata jsonb default '{}'::jsonb
);

create index if not exists enrollments_email_idx on public.email_sequence_enrollments (email);
create index if not exists enrollments_next_send_idx on public.email_sequence_enrollments (next_send_at) where status = 'active';
create unique index if not exists enrollments_email_sequence_idx on public.email_sequence_enrollments (email, sequence_id);

-- ─── 4. Sends (audit log) ────────────────────────────────────

create table if not exists public.email_sends (
  id uuid primary key default gen_random_uuid(),
  enrollment_id uuid references public.email_sequence_enrollments(id) on delete set null,
  email text not null,
  sequence_slug text,
  step int,
  subject text,
  status text not null check (status in ('queued', 'sent', 'bounced', 'failed', 'opened', 'clicked')),
  provider_message_id text,
  error text,
  sent_at timestamptz,
  opened_at timestamptz,
  clicked_at timestamptz,
  created_at timestamptz default now()
);

create index if not exists email_sends_email_idx on public.email_sends (email, created_at desc);
create index if not exists email_sends_status_idx on public.email_sends (status);

-- ─── 5. Churn signals view ──────────────────────────────────

create or replace view public.churn_signals as
select
  email,
  first_seen_at,
  last_seen_at,
  days_since_last_seen,
  lifecycle_stage,
  engagement_score,
  churn_risk_score,
  audit_count,
  booking_count,
  chat_count,
  case
    when churn_risk_score >= 60 and engagement_score >= 30 then 'high_value_at_risk'
    when churn_risk_score >= 60 then 'at_risk'
    when churn_risk_score >= 25 then 'cooling'
    else 'healthy'
  end as risk_band
from public.users_unified
where last_seen_at is not null
order by churn_risk_score desc, engagement_score desc;

-- ─── 6. RLS ──────────────────────────────────────────────────

alter table public.email_sequences enable row level security;
alter table public.email_sequence_enrollments enable row level security;
alter table public.email_sends enable row level security;

create policy "admin_all_sequences" on public.email_sequences for all using (
  exists (select 1 from public.admin_users where user_id = auth.uid() and active = true)
);
create policy "admin_all_enrollments" on public.email_sequence_enrollments for all using (
  exists (select 1 from public.admin_users where user_id = auth.uid() and active = true)
);
create policy "admin_select_sends" on public.email_sends for select using (
  exists (select 1 from public.admin_users where user_id = auth.uid() and active = true)
);
create policy "anon_insert_unsub" on public.email_sequence_enrollments for update using (
  true
) with check (status = 'unsubscribed'); -- visitors can unsubscribe themselves via signed link
