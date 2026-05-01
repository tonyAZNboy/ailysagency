/**
 * Email send audit logger.
 *
 * Logs every email send to Supabase `email_sends` table.
 * Resend's POST /emails returns `{ id }` which we store as `provider_message_id`.
 * The webhook handler (functions/api/resend-webhook.ts) then UPDATEs the row
 * with `opened_at`, `clicked_at`, `status` as events arrive.
 *
 * All writes are best-effort: on failure, we log and continue. We never fail
 * the parent send because logging dropped.
 */

interface SupabaseEnv {
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
}

export interface EmailLogRow {
  email: string;
  /** Resend message id from POST /emails response. Used to correlate webhook events. */
  provider_message_id?: string | null;
  /** Lifecycle slug: 'newsletter_welcome', 'audit_pdf', 'audit_pdf_onboarding', 'cron_day1_retry', etc. */
  sequence_slug: string;
  /** Step number within the sequence (0 for one-shot transactional). */
  step?: number;
  subject: string;
  /** 'queued' | 'sent' | 'failed'. Webhook will update to 'delivered', 'bounced', 'opened', 'clicked'. */
  status: 'queued' | 'sent' | 'failed' | 'bounced' | 'delivered';
  /** Error message if status='failed'. */
  error?: string;
}

/**
 * Insert an email_sends row. Best-effort: never throws.
 */
export async function logEmailSend(
  env: SupabaseEnv,
  row: EmailLogRow,
): Promise<{ ok: boolean; error?: string }> {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    return { ok: false, error: 'supabase_not_configured' };
  }
  try {
    const url = `${env.SUPABASE_URL}/rest/v1/email_sends`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        email: row.email,
        sequence_slug: row.sequence_slug,
        step: row.step ?? 0,
        subject: row.subject,
        status: row.status,
        provider_message_id: row.provider_message_id ?? null,
        error: row.error ?? null,
        sent_at: row.status === 'sent' || row.status === 'delivered' ? new Date().toISOString() : null,
      }),
    });
    if (!resp.ok) {
      const text = await resp.text().catch(() => '');
      console.warn(`email_log_failed: status=${resp.status}, body=${text.slice(0, 200)}`);
      return { ok: false, error: `supabase_${resp.status}` };
    }
    return { ok: true };
  } catch (err) {
    console.warn(`email_log_threw: ${(err as Error).message.slice(0, 200)}`);
    return { ok: false, error: (err as Error).message.slice(0, 200) };
  }
}

/**
 * Update an existing email_sends row by provider_message_id.
 * Used by the Resend webhook to set opened_at, clicked_at, status, etc.
 */
export async function updateEmailSendByProviderId(
  env: SupabaseEnv,
  providerId: string,
  patch: {
    status?: 'sent' | 'delivered' | 'bounced' | 'failed' | 'opened' | 'clicked';
    opened_at?: string;
    clicked_at?: string;
    error?: string;
  },
): Promise<{ ok: boolean; error?: string }> {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    return { ok: false, error: 'supabase_not_configured' };
  }
  try {
    const url = `${env.SUPABASE_URL}/rest/v1/email_sends?provider_message_id=eq.${encodeURIComponent(providerId)}`;
    const resp = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(patch),
    });
    if (!resp.ok) {
      const text = await resp.text().catch(() => '');
      return { ok: false, error: `supabase_${resp.status}: ${text.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message.slice(0, 200) };
  }
}

/**
 * Helper for callers: send via Resend, capture the message_id, log to email_sends.
 * Returns the Resend message_id (or null on failure).
 */
export async function sendAndLog(
  env: SupabaseEnv & { RESEND_API_KEY?: string },
  resendBody: Record<string, unknown>,
  logFields: Omit<EmailLogRow, 'status' | 'provider_message_id' | 'error'>,
): Promise<{ messageId: string | null; error?: string }> {
  if (!env.RESEND_API_KEY) return { messageId: null, error: 'no_resend_key' };

  let messageId: string | null = null;
  let error: string | undefined;
  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify(resendBody),
    });
    if (resp.ok) {
      const data = (await resp.json().catch(() => ({}))) as { id?: string };
      messageId = data.id ?? null;
      await logEmailSend(env, {
        ...logFields,
        provider_message_id: messageId,
        status: 'sent',
      });
    } else {
      const text = await resp.text().catch(() => '');
      error = `resend_${resp.status}: ${text.slice(0, 200)}`;
      await logEmailSend(env, {
        ...logFields,
        status: 'failed',
        error,
      });
    }
  } catch (err) {
    error = (err as Error).message.slice(0, 200);
    await logEmailSend(env, {
      ...logFields,
      status: 'failed',
      error,
    });
  }
  return { messageId, error };
}
