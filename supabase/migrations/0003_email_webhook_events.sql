-- 0003_email_webhook_events.sql
-- Resend webhook event ingestion (opens, clicks, bounces, complaints, deliveries).
-- Webhook handler: functions/api/resend-webhook.ts
-- See docs/email-addresses.md and STATE.md for context.

CREATE TABLE IF NOT EXISTS email_webhook_events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  svix_msg_id     TEXT UNIQUE NOT NULL,
  resend_email_id TEXT,
  event_type      TEXT NOT NULL,
  recipient_email TEXT,
  from_address    TEXT,
  subject         TEXT,
  bounce_type     TEXT,
  click_url       TEXT,
  occurred_at     TIMESTAMPTZ,
  raw_payload     JSONB,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_email_webhook_events_resend_email_id
  ON email_webhook_events (resend_email_id);

CREATE INDEX IF NOT EXISTS idx_email_webhook_events_recipient
  ON email_webhook_events (recipient_email);

CREATE INDEX IF NOT EXISTS idx_email_webhook_events_type_time
  ON email_webhook_events (event_type, occurred_at DESC);

CREATE INDEX IF NOT EXISTS idx_email_webhook_events_created_at
  ON email_webhook_events (created_at DESC);

ALTER TABLE email_webhook_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "service_role_all" ON email_webhook_events;
CREATE POLICY "service_role_all" ON email_webhook_events
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_select_admin" ON email_webhook_events;
CREATE POLICY "authenticated_select_admin" ON email_webhook_events
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid() AND active = true)
  );

COMMENT ON TABLE email_webhook_events IS 'Resend webhook events. Idempotency via svix_msg_id. recipient_email retained 90 days then truncated by retention job (TODO).';
