# AiLys Agency · Supabase Edge Functions

Two functions power the AI Search Advisor chat widget on the landing page:

- `ailys-chat-classify` — intent + sentiment classifier
- `ailys-chat-respond` — conversational responder with AiLys-tuned system prompt

Both are independent of Reviuzy's backend. They live in this repo so the AiLys
codebase has zero runtime dependency on the Reviuzy Supabase project.

## Prerequisites

1. A Supabase project for AiLys. Recommended: create a fresh project in `ca-central-1`.
   ```bash
   supabase projects create ailysagency --region ca-central-1
   ```
2. The Supabase CLI installed locally (`npm i -g supabase`).
3. An LLM API key. Either Anthropic (preferred) or OpenAI.

## One-time setup

After creating the AiLys Supabase project, copy the project ref into `supabase/config.toml`:

```toml
project_id = "<YOUR_NEW_PROJECT_REF>"
```

Set the LLM API key as a secret on the project:

```bash
# Anthropic (preferred, used if both are set)
supabase secrets set ANTHROPIC_API_KEY=sk-ant-...

# OR OpenAI
supabase secrets set OPENAI_API_KEY=sk-...
```

Set the AiLys frontend env vars locally and on Cloudflare Pages:

```
VITE_SUPABASE_URL=https://<your-ailys-project>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<your-ailys-anon-key>
```

## Deploy the functions

From the repo root:

```bash
supabase login
supabase link --project-ref <YOUR_NEW_PROJECT_REF>
supabase functions deploy ailys-chat-classify
supabase functions deploy ailys-chat-respond
```

That's it. The chat widget on the landing page will now route through these
functions automatically (the frontend reads the Supabase URL from env).

## Local development

```bash
supabase start
supabase functions serve ailys-chat-respond --env-file ./supabase/.env.local
```

Where `./supabase/.env.local` contains your `ANTHROPIC_API_KEY=...` line.

## Updating the system prompt

The agency-aligned prompt lives in `ailys-chat-respond/index.ts` as the
`SYSTEM_PROMPT` constant. Anything you change about pricing, services, tone, or
forbidden answers belongs in that constant, not scattered through the codebase.

After editing, redeploy:

```bash
supabase functions deploy ailys-chat-respond
```

## What lives where

- Reviuzy backend: separate Supabase project (`qucxhksrpqunlyjjvuae`). Untouched.
- AiLys backend: this repo's `supabase/` folder + your new AiLys Supabase project.

If a chat conversation needs Reviuzy product-specific knowledge (NFC, contests),
the AiLys responder is allowed to mention Reviuzy as a sister product but should
NOT claim those features as AiLys deliverables. The system prompt enforces this.
