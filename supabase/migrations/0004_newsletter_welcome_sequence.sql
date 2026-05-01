-- 0004_newsletter_welcome_sequence.sql
-- Seeds the newsletter_welcome sequence (3 steps over 5 days) and adds the
-- engagement-related columns + indexes used by /api/cron-process-sequences.

INSERT INTO public.email_sequences (slug, name, description, type, trigger, status, steps)
VALUES (
  'newsletter_welcome',
  'Newsletter welcome drip',
  'Three follow-up emails sent to new newsletter subscribers over five days. Step 0 = day 0 confirmation, step 1 = day 2, step 2 = day 5. Activates after the synchronous welcome email logged at signup.',
  'welcome',
  'newsletter_signup',
  'active',
  '[
    {
      "delay_days": 2,
      "subject": "Three brands cited by ChatGPT this week",
      "preheader": "Your first AiLys newsletter pick.",
      "body": "Hi,\n\nFirst issue, three brands ChatGPT cited this week, and what they did.\n\n1. A dental practice that filled in 22 GBP attributes (most clinics fill in 6) and now appears in 71 percent of \"dentist near me\" voice queries.\n\n2. A regional restaurant chain that added FAQ schema to every location page and went from 12 percent to 34 percent ChatGPT citation rate in 60 days.\n\n3. A solo lawyer who wrote one Wikipedia entry, in their own name, with proper sourcing. ChatGPT now cites them in jurisdictional questions.\n\nThe pattern: AI engines reward businesses that publish structured, verifiable signals.\n\nThe AiLys team",
      "cta_label": "Run an AI Visibility Audit",
      "cta_url": "https://www.ailysagency.ca/audit"
    },
    {
      "delay_days": 5,
      "subject": "The AEO + GEO + E-E-A-T stack, plain English",
      "preheader": "What ChatGPT actually weights when it cites a business.",
      "body": "Hi,\n\nThree acronyms that drive AI search citation. We use plain English here.\n\nAEO. Answer Engine Optimization. The work of structuring content so AI engines can pull a clean, direct answer. FAQ schema, LocalBusiness schema, Service schema. AEO answers the question \"how does X work in [city]\".\n\nGEO. Generative Engine Optimization. The work of being NAMED in the answer. Wikipedia entry, high-DA citations, original data, third-party validation. GEO is harder than AEO because it depends on outside sources.\n\nE-E-A-T. Experience, Expertise, Authoritativeness, Trust. The framework Google created and AI engines now follow when scoring credibility. Original photos with EXIF data, real author bios, real awards.\n\nThe stack works in this order: AEO ships first because it is in your control. Then GEO. Then E-E-A-T compounds over months.\n\nThe AiLys team",
      "cta_label": "See your scores",
      "cta_url": "https://www.ailysagency.ca/audit"
    }
  ]'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  status = EXCLUDED.status,
  steps = EXCLUDED.steps,
  description = EXCLUDED.description;

-- Index to find enrollments due for a send
CREATE INDEX IF NOT EXISTS idx_enrollments_status_next
  ON public.email_sequence_enrollments (status, next_send_at)
  WHERE status = 'active';

-- Service role can also UPDATE enrollments (cron processor needs to advance step)
DROP POLICY IF EXISTS "service_update_enrollments" ON public.email_sequence_enrollments;
CREATE POLICY "service_update_enrollments" ON public.email_sequence_enrollments
  FOR UPDATE TO service_role
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_insert_enrollments" ON public.email_sequence_enrollments;
CREATE POLICY "service_insert_enrollments" ON public.email_sequence_enrollments
  FOR INSERT TO service_role
  WITH CHECK (true);

DROP POLICY IF EXISTS "service_select_enrollments" ON public.email_sequence_enrollments;
CREATE POLICY "service_select_enrollments" ON public.email_sequence_enrollments
  FOR SELECT TO service_role
  USING (true);

DROP POLICY IF EXISTS "service_select_sequences" ON public.email_sequences;
CREATE POLICY "service_select_sequences" ON public.email_sequences
  FOR SELECT TO service_role
  USING (true);

DROP POLICY IF EXISTS "service_insert_sends" ON public.email_sends;
CREATE POLICY "service_insert_sends" ON public.email_sends
  FOR INSERT TO service_role
  WITH CHECK (true);

DROP POLICY IF EXISTS "service_update_sends" ON public.email_sends;
CREATE POLICY "service_update_sends" ON public.email_sends
  FOR UPDATE TO service_role
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_select_sends" ON public.email_sends;
CREATE POLICY "service_select_sends" ON public.email_sends
  FOR SELECT TO service_role
  USING (true);

COMMENT ON TABLE public.email_sequence_enrollments IS
  'One row per (email, sequence). Cron at /api/cron-process-sequences picks rows with status=active and next_send_at<=NOW() every 5 minutes, sends step content via Resend, advances current_step or marks completed.';
