/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import { AUTHORS } from '../../authors'
import {
  CalloutBox,
  InlineCTA,
  StatHighlight,
  KeyTakeaway,
  QuickQuiz,
  InternalLink,
  SectionDivider,
} from '../../components/shared'

export const meta: BlogPostMeta = {
  slug: 'server-side-tagging-on-vercel-quebec',
  title: 'Server-side tagging on Vercel, the cheap Quebec setup',
  metaDescription:
    'The cheapest server-side tagging setup on Vercel for a Quebec local business. Vercel Functions plus a Cloudflare Workers proxy plus one GA4 Measurement Protocol endpoint, Loi 25 compliant.',
  tldr: 'The cheapest server-side tagging setup on Vercel pairs a Vercel Function with a Cloudflare Workers proxy and a single GA4 Measurement Protocol endpoint. For a low-traffic Quebec local business, the monthly bill lands between zero and twenty dollars. The setup also clears the Loi 25 explicit consent gate, because the function only fires after the consent banner returns yes, and the Cloudflare Workers layer strips the IP at the edge before any payload reaches GA4.',
  category: 'analytics-attribution',
  tags: ['server-side-tagging', 'vercel', 'cloudflare', 'ga4', 'loi-25', 'quebec', 'analytics-attribution'],
  publishedDate: '2026-04-10',
  updatedDate: '2026-04-10',
  author: AUTHORS.product,
  readTimeMinutes: 9,
  images: {
    hero: '/blog-images/server-side-tagging-on-vercel-quebec/hero.webp',
    mid: '/blog-images/server-side-tagging-on-vercel-quebec/mid.webp',
    end: '/blog-images/server-side-tagging-on-vercel-quebec/end.webp',
  },
  faqItems: [
    {
      question: 'What is the cheapest way to do server-side tagging on Vercel?',
      answer:
        'A Vercel Function paired with a Cloudflare Workers proxy and a single GA4 Measurement Protocol endpoint. The function receives the page event from the browser, the Workers layer strips the IP at the edge and forwards a clean payload, and GA4 ingests through the Measurement Protocol. For a Quebec local business with under 100,000 monthly events, the bill stays in the zero to twenty dollar range, often free on both Vercel and Cloudflare hobby tiers.',
    },
    {
      question: 'Does this setup respect Loi 25 in Quebec?',
      answer:
        'Yes when the consent banner gates the call. Loi 25 mandates explicit consent before any tagging, including server-side. The Vercel Function should only fire after the consent banner stores a yes value in localStorage or in a cookie. The Cloudflare Workers layer strips the IP and the user agent at the edge before forwarding to GA4, which keeps the payload aligned with the Loi 25 minimization principle even after consent.',
    },
    {
      question: 'Why use Cloudflare Workers as a proxy instead of calling GA4 directly?',
      answer:
        'Three reasons. First, the Workers layer strips the IP at the edge so GA4 never sees a Quebec resident IP, which is the cleanest Loi 25 posture. Second, the Workers free tier covers 100,000 requests per day, which absorbs the entire event volume of most local businesses for free. Third, the Workers layer adds a place to inject custom hashing or salt for user_pseudo_id without changing the Vercel codebase, which keeps the analytics pipeline portable.',
    },
    {
      question: 'How much does this cost per month for a Quebec local business?',
      answer:
        'For a single-location business with under 50,000 monthly page views, the typical cost is zero. Vercel Hobby covers the function calls, Cloudflare Workers free tier covers the proxy, GA4 Measurement Protocol is free. For a multi-location business with 100,000 to 500,000 monthly events, the bill lands in the ten to twenty dollar range as Vercel Functions exceed the free tier. The first paid threshold is the Vercel function-seconds quota, not the Cloudflare side.',
    },
    {
      question: 'Can I run this without Cloudflare and only use Vercel?',
      answer:
        'Yes, but the Loi 25 posture is weaker. Without the Cloudflare Workers layer, the Vercel Function sees the user IP before forwarding to GA4. You can strip the IP inside the function before the Measurement Protocol call, which works, but it concentrates the consent and the privacy logic in one runtime. The Cloudflare layer adds a redundancy that audits read favorably. If the budget is zero and the traffic is low, Vercel-only is acceptable. If the audit posture matters, the two-layer setup is worth the zero extra cost.',
    },
    {
      question: 'Does server-side tagging help with AI Traffic attribution?',
      answer:
        'Yes. Server-side tagging is what makes AI Traffic attribution stable, because client-side tagging gets blocked by ad blockers, browser privacy modes, and the increasing share of ChatGPT and Perplexity traffic that arrives without a referrer. The server-side endpoint catches the visit even when the client-side tag is blocked, and the UTM convention paired with the GA4 channel group reads the AI Traffic correctly. The two patterns work together, not in competition.',
    },
  ],
  relatedSlugs: ['utm-strategy-multi-location-business', 'track-chatgpt-traffic-in-ga4'],
  headings: [
    { id: 'why-server-side-tagging-matters-now', text: 'Why server-side tagging matters now in Quebec' },
    { id: 'the-cheap-three-piece-setup', text: 'The cheap three-piece setup, Vercel plus Cloudflare plus GA4' },
    { id: 'the-vercel-function-piece', text: 'The Vercel Function piece, what it does and why' },
    { id: 'the-cloudflare-workers-proxy', text: 'The Cloudflare Workers proxy, the privacy layer' },
    { id: 'loi-25-consent-gating', text: 'Loi 25 consent gating, the explicit yes before any call' },
    { id: 'monthly-cost-for-a-quebec-local-business', text: 'Monthly cost for a Quebec local business, the realistic numbers' },
    { id: 'rolling-out-the-setup-in-one-afternoon', text: 'Rolling out the setup in one afternoon' },
    { id: 'common-pitfalls-and-how-to-avoid-them', text: 'Common pitfalls and how to avoid them' },
    { id: 'faq', text: 'Frequently Asked Questions' },
  ],
}

export function Content() {
  return (
    <article>
      <p>
        Quebec local owners ask the same analytics question every month. What is the cheapest way to do server-side tagging on Vercel that still respects Loi 25 and still captures the AI Traffic that ad blockers strip from the client side? The honest answer is a three-piece stack: a Vercel Function for the event endpoint, a Cloudflare Workers proxy for the privacy layer, and a single GA4 Measurement Protocol endpoint for the destination. The total monthly bill for a low-traffic local business lands between zero and twenty dollars.
      </p>

      <StatHighlight
        stats={[
          { value: '$0 to $20', label: 'Monthly cost for a low-traffic Quebec local business' },
          { value: '3 pieces', label: 'Vercel Function, Cloudflare Workers, GA4 Measurement Protocol' },
          { value: 'Loi 25', label: 'Explicit consent required before any tag fires' },
        ]}
      />

      <SectionDivider />

      <h2 id="why-server-side-tagging-matters-now">Why server-side tagging matters now in Quebec</h2>
      <p>
        Server-side tagging matters now for two reasons that hit Quebec local businesses harder than the rest of Canada. The first is Loi 25, the Quebec privacy law that mandates explicit consent before any tagging fires, with fines that scale by company size. The second is AI Traffic, the share of visits that arrive from ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot. AI Traffic increasingly arrives without a referrer, and the client-side tag is increasingly blocked by privacy browsers and extensions. The combination breaks classic analytics for the operator who only runs a Google Tag Manager container on the page.
      </p>
      <p>
        Server-side tagging answers both problems with one setup. The endpoint lives on a domain you control, which makes it harder for ad blockers to flag. The privacy posture sits on the server, which makes Loi 25 audits cleaner because the consent state is enforced before any forwarding to GA4. The cost is low because the volume of events for a local business fits inside the free tiers of every component in the stack.
      </p>
      <p>
        The cheap setup is not a workaround. It is the production setup that AiLys recommends for Quebec local owners under 500,000 monthly events. Above that threshold, the math shifts and a Google Tag Manager Server-Side container on Cloud Run becomes more efficient. Below that threshold, Vercel plus Cloudflare wins on cost, simplicity, and Loi 25 posture.
      </p>

      <CalloutBox type="info">
        <p>The full <InternalLink to="/glossary/ai-traffic" title="AI Traffic glossary entry" description="The AiLys definition for AI engine click attribution" /> entry covers the channel group rule and the referrer host list that pairs with this server-side stack. Read the two together for the complete attribution picture.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Want to know whether your current tagging clears Loi 25 and captures AI Traffic correctly? The free 24-hour AI Visibility audit now includes a server-side readiness check." />

      <SectionDivider />

      <h2 id="the-cheap-three-piece-setup">The cheap three-piece setup, Vercel plus Cloudflare plus GA4</h2>
      <p>
        The setup has three pieces, each doing one job. The Vercel Function receives the event payload from the browser after the consent banner stores a yes value. The Cloudflare Workers proxy strips the IP and the user agent at the edge, then forwards a clean payload. The GA4 Measurement Protocol endpoint ingests the payload as a server-side hit, deduplicated against the client-side hit if the same event also fired through gtag.
      </p>
      <p>
        The data flow runs in this order. Browser fires a fetch to the Vercel endpoint with the consent state, the page URL, the UTM parameters, the user_pseudo_id from a first-party cookie, and the event name. Vercel Function validates the consent, hashes the user_pseudo_id with a server-side salt, and forwards the payload to the Cloudflare Workers endpoint. Cloudflare Workers strips the IP and the user agent, adds a Measurement Protocol API secret, and forwards to GA4. GA4 ingests the hit with the client_id and the user_pseudo_id intact.
      </p>

      <h3>The pieces in one table</h3>
      <ul>
        <li>Vercel Function: receives event from browser, validates consent, hashes user_pseudo_id, forwards to Workers</li>
        <li>Cloudflare Workers: strips IP and user agent at the edge, adds API secret, forwards to GA4 Measurement Protocol</li>
        <li>GA4 Measurement Protocol: ingests the server-side hit, deduplicates against client-side if applicable</li>
        <li>Consent banner: stores explicit Loi 25 yes or no in localStorage or first-party cookie before any call</li>
        <li>First-party cookie: holds user_pseudo_id for cross-session attribution, scoped to the site domain</li>
      </ul>

      <SectionDivider />

      <h2 id="the-vercel-function-piece">The Vercel Function piece, what it does and why</h2>
      <p>
        The Vercel Function is the entry point for every server-side event. The function lives at a path like /api/track on the same domain as the site, which makes it harder for ad blockers to flag than a third-party endpoint. The function receives a POST request with the event payload, validates the consent state, and forwards to the Cloudflare Workers proxy.
      </p>
      <p>
        The function does three things and nothing else. First, it checks the consent header for the explicit Loi 25 yes value. If consent is missing or no, the function returns a 204 with no forwarding. Second, it hashes the user_pseudo_id with a server-side salt, which prevents the raw cookie value from ever reaching GA4. Third, it forwards the payload to the Cloudflare Workers endpoint with a fetch call, with a five-second timeout to fail closed if Workers is unreachable.
      </p>
      <p>
        The function stays under 100 lines of code, runs in the Vercel Edge Runtime for low latency, and uses no dependencies beyond the standard Web APIs. The Hobby tier on Vercel covers 100,000 invocations per month, which is more than most single-location Quebec businesses generate. The Pro tier extends the quota to 1,000,000 invocations per month at 20 dollars total, which covers the multi-location case.
      </p>

      <CalloutBox type="warning">
        <p>Do not log the raw payload to the Vercel function logs. Vercel retains logs for several days and treating the payload as transient is a Loi 25 minimization mistake. Either log only the event name and the consent state, or log nothing. The same applies to the Cloudflare Workers logs. Audit the log retention policy of every layer in the stack and document it for the Loi 25 register.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="the-cloudflare-workers-proxy">The Cloudflare Workers proxy, the privacy layer</h2>
      <p>
        The Cloudflare Workers proxy sits between the Vercel Function and the GA4 Measurement Protocol endpoint. The Worker strips the IP and the user agent at the edge, adds the GA4 API secret as a server-side header, and forwards a clean payload to GA4. The free tier covers 100,000 requests per day, which absorbs the entire event volume of most local businesses without spend.
      </p>
      <p>
        The Worker code stays under 50 lines and runs at the Cloudflare edge, which means the latency to GA4 is dominated by the GA4 ingestion side, not the proxy. The Worker is idempotent, stateless, and logs only the event name and the consent state. The IP stripping happens at the edge before the payload is forwarded, which means GA4 never sees a Quebec resident IP from this stack. That posture is what makes the Loi 25 audit clean.
      </p>
      <p>
        The Worker also serves as the place to inject custom hashing or salt rotation for the user_pseudo_id without redeploying the Vercel side. If the privacy team rotates the salt every quarter, the rotation lives in the Worker environment variables, not in the Vercel function code. That separation keeps the analytics pipeline portable across Vercel deploys, framework upgrades, and team changes.
      </p>

      <QuickQuiz
        question="What does the Cloudflare Workers proxy primarily do in this server-side tagging stack?"
        options={[
          'It runs the consent banner and stores the Loi 25 yes value',
          'It strips the IP and the user agent at the edge before forwarding to GA4',
          'It replaces the GA4 Measurement Protocol endpoint with a custom analytics database',
          'It rewrites the UTM parameters to merge multi-location data into one campaign',
        ]}
        correctIndex={1}
        explanation="The Workers layer strips the IP and the user agent at the edge before forwarding the payload to GA4. That step is what makes the Loi 25 posture clean, because GA4 never sees a Quebec resident IP from this stack. The consent gating happens earlier in the Vercel Function, the Measurement Protocol endpoint stays as is, and the UTM parameters flow through unchanged."
      />

      <SectionDivider />

      <h2 id="loi-25-consent-gating">Loi 25 consent gating, the explicit yes before any call</h2>
      <p>
        Loi 25 mandates explicit consent before any tagging fires. The consent banner must offer a clear yes or no choice, with no pre-selected option, and the result must be stored in a way that the server-side stack can read. The classic implementation is a first-party cookie or a localStorage key with a yes or no value plus a timestamp.
      </p>
      <p>
        The Vercel Function reads the consent state from the request header on every call. If the value is missing or no, the function returns a 204 with no forwarding. If the value is yes, the function proceeds with the hash and the forward. The check is the gate that keeps the entire stack Loi 25 compliant. Without that check, every other piece of the stack is irrelevant for the audit posture.
      </p>
      <p>
        The consent banner itself lives on the client side, but the enforcement lives on the server side. That split is what makes the setup hold up under audit. A user who clears the cookie loses consent. A user who clicks no never reaches the Vercel Function. A user who clicks yes triggers the full stack with the hashed identifiers and the IP stripped at the edge. The audit trail is clean and readable in 90 seconds for a Loi 25 inspector.
      </p>

      <img
        src={meta.images.mid}
        alt="Loi 25 consent gating sequence showing the banner state stored in a first-party cookie and read by the Vercel Function before any call to Cloudflare Workers"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="monthly-cost-for-a-quebec-local-business">Monthly cost for a Quebec local business, the realistic numbers</h2>
      <p>
        The monthly cost depends on event volume. For a single-location business with under 50,000 monthly page views, the typical cost is zero. Vercel Hobby covers 100,000 function invocations per month for free. Cloudflare Workers free tier covers 100,000 requests per day, which is 3,000,000 requests per month, more than any single-location business needs. GA4 Measurement Protocol is free at every volume.
      </p>
      <p>
        For a multi-location business with 100,000 to 500,000 monthly events, the cost lands in the ten to twenty dollar range. The first paid threshold is the Vercel Pro tier at 20 dollars per month, which extends function invocations to 1,000,000 per month. The Cloudflare Workers free tier still absorbs the proxy load at this volume. GA4 stays free. Above 500,000 monthly events, the math shifts and a server-side Google Tag Manager container on Cloud Run becomes more cost effective.
      </p>
      <p>
        The cost is dominated by Vercel function-seconds, not by Cloudflare. That is the opposite of what most operators expect, because the Cloudflare side feels like the heavyweight piece. In practice, the Worker runs in milliseconds, the Vercel Function runs in tens of milliseconds, and the function-seconds quota is what pushes the bill into the paid tier first. Knowing that distinction makes the upgrade decision clean when the time comes.
      </p>

      <SectionDivider />

      <h2 id="rolling-out-the-setup-in-one-afternoon">Rolling out the setup in one afternoon</h2>
      <p>
        The rollout takes one afternoon for a local business. First, write the Vercel Function at /api/track with the consent check, the hash step, and the fetch to Cloudflare. Deploy with vercel deploy and verify the endpoint with a curl command from a terminal. Second, write the Cloudflare Worker with the IP stripping, the API secret injection, and the forward to GA4. Deploy with wrangler deploy and verify with the same curl chain.
      </p>
      <p>
        Third, update the consent banner to store the explicit Loi 25 yes or no in a first-party cookie or in localStorage. Fourth, update the client-side script to fetch the Vercel endpoint after the consent yes is stored, with the event payload, the UTM parameters, and the user_pseudo_id from the cookie. Fifth, verify the GA4 realtime view shows the server-side hits, with the IP field empty and the source and medium dimensions populated correctly from the UTM parameters.
      </p>
      <p>
        For the UTM convention that pairs with this setup, see the <InternalLink to="/blog/utm-strategy-multi-location-business" title="UTM strategy for a multi-location business" description="The three-field UTM convention with location id in utm_campaign" /> companion post. The two posts read together cover the full server-side attribution stack for a Quebec local business with one or many locations.
      </p>

      <CalloutBox type="tip">
        <p>The fastest way to verify the setup is to open the GA4 realtime view, fire a test event from the browser console with a known UTM tag, and watch the event land in GA4 within five seconds with the IP field empty. If the IP shows up, the Cloudflare Workers stripping is missing. If the source and medium dimensions are wrong, the UTM forwarding is missing. If nothing shows up, the consent gate is blocking the call. Three checks, three fixes, done.</p>
      </CalloutBox>

      <InlineCTA variant="pricing" text="Need this server-side stack shipped for you with the Loi 25 audit doc included? See AiLys plans for Quebec local businesses." />

      <SectionDivider />

      <h2 id="common-pitfalls-and-how-to-avoid-them">Common pitfalls and how to avoid them</h2>
      <p>
        Pitfall one is logging the raw payload to the function logs. Vercel and Cloudflare both retain logs for several days, and treating that retention as transient breaks Loi 25 minimization. Log only the event name and the consent state, or log nothing. Pitfall two is forgetting to hash the user_pseudo_id before forwarding. The raw cookie value should never reach GA4. Hash with a server-side salt that the client never sees.
      </p>
      <p>
        Pitfall three is missing the consent gate on the Vercel Function. Without the gate, the entire stack fires regardless of the banner state, which fails the Loi 25 audit on the first inspection. Pitfall four is hard-coding the GA4 API secret in the Worker code instead of using environment variables. The secret should rotate on a schedule, and rotation in code requires a redeploy that takes the analytics pipeline offline. Use Wrangler secrets and the Cloudflare dashboard secret manager.
      </p>
      <p>
        Pitfall five is skipping the IP stripping at the Cloudflare edge and stripping it inside the Vercel Function instead. Both work for Loi 25 in spirit, but the audit posture is cleaner when the IP never reaches the Vercel Function in a forwarded payload. The Cloudflare layer is the cheapest place to do the strip, and the redundancy of the two layers reads well in an inspection. For a baseline of how AiLys configures server-side tagging for Quebec clients, run the <InternalLink to="/audit" title="Free 24-hour AI Visibility audit" description="Includes server-side tagging readiness check and Loi 25 posture review" /> and review the deliverable before signing anything.
      </p>

      <InlineCTA variant="book" text="Want a 60-minute walkthrough of your current tagging stack with a Loi 25 review? Strategy doc sent regardless." />

      <SectionDivider />

      <KeyTakeaway
        points={[
          'The cheapest server-side tagging setup on Vercel is a Vercel Function plus a Cloudflare Workers proxy plus the GA4 Measurement Protocol.',
          'The monthly cost for a Quebec local business under 500,000 monthly events lands between zero and twenty dollars.',
          'Loi 25 explicit consent must gate the Vercel Function call. No yes, no forwarding, no exceptions.',
          'Cloudflare Workers strips the IP and the user agent at the edge before forwarding to GA4, which keeps the Loi 25 audit posture clean.',
          'Hash the user_pseudo_id with a server-side salt before forwarding. The raw cookie value should never reach GA4.',
          'Pair the server-side stack with the UTM convention and the GA4 AI Engines channel group to capture AI Traffic correctly.',
        ]}
      />

      <SectionDivider />

      <h2 id="faq">Frequently Asked Questions</h2>
      {meta.faqItems.map((f, i) => (
        <details key={i} className="my-3 rounded-lg border border-white/10 bg-white/[0.02] p-4">
          <summary className="cursor-pointer font-semibold text-white/90">{f.question}</summary>
          <p className="mt-3 text-white/70 text-[0.95rem]">{f.answer}</p>
        </details>
      ))}

      <img
        src={meta.images.end}
        alt="Summary card showing the server-side tagging cost tiers for a Quebec local business and the Loi 25 audit checklist"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
