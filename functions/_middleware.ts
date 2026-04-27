// Cloudflare Pages middleware · runs before every request to every route.
//
// Purpose: redirect ailysagency.com (and www.ailysagency.com) to
// ailysagency.ca, preserving the path + query string. We host both
// domains on the same Pages project so this middleware can do the
// 301 at the application layer, no Cloudflare Configuration Rule
// needed.
//
// Why not Configuration Rules: the dashboard rule editor requires a
// scoped API token with Configuration Rules:Edit which we did not
// generate (the DNS-only token does not cover that namespace). Pages
// middleware works with our existing scopes.
//
// Note: only the canonical host check redirects. Any other host
// (preview deploys ailysagency.pages.dev, branch URLs *.pages.dev,
// custom dev hostnames, localhost) passes through untouched.

interface PagesContext<Env = unknown> {
  request: Request;
  env: Env;
  next: () => Promise<Response>;
  data: Record<string, unknown>;
}

const REDIRECT_HOSTS = new Set([
  "ailysagency.com",
  "www.ailysagency.com",
]);

const TARGET_ORIGIN = "https://ailysagency.ca";

export const onRequest = async (
  context: PagesContext,
): Promise<Response> => {
  const { request, next } = context;
  const url = new URL(request.url);
  const host = url.hostname.toLowerCase();

  if (REDIRECT_HOSTS.has(host)) {
    const target = `${TARGET_ORIGIN}${url.pathname}${url.search}${url.hash}`;
    return Response.redirect(target, 301);
  }

  return next();
};
