// /p/<slug> — social caption short links (added 18 Oct 2026).
// On Netlify this was one proxy rule in _redirects:
//   /p/*  https://sujyalrzbubvhpkntwja.supabase.co/functions/v1/social-shortlink/:splat  200
// Cloudflare Pages can't proxy to another site from _redirects, so this function does the same job:
// it passes the request to the social-shortlink edge function and hands back its answer unchanged
// (a 302 to the listing).
const ORIGIN = "https://sujyalrzbubvhpkntwja.supabase.co/functions/v1/social-shortlink/";

export async function onRequest({ request }) {
  const url = new URL(request.url);
  const rest = url.pathname.replace(/^\/p\/?/, "");
  const headers = new Headers(request.headers);
  headers.delete("host");
  const ip = request.headers.get("cf-connecting-ip");
  if (ip) headers.set("x-forwarded-for", ip);
  const body = request.method === "GET" || request.method === "HEAD" ? undefined : request.body;
  const upstream = await fetch(ORIGIN + rest + url.search, { method: request.method, headers, body, redirect: "manual" });
  // Netlify carried the visitor's ?query (e.g. utm tags) onto the redirect; do the same.
  const location = upstream.headers.get("location");
  if (location && url.search && upstream.status >= 300 && upstream.status < 400 && !location.includes("?")) {
    const out = new Headers(upstream.headers);
    out.set("location", location + url.search);
    return new Response(null, { status: upstream.status, headers: out });
  }
  return new Response(upstream.body, upstream);
}
