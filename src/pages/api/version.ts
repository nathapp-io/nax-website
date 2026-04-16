export const prerender = false;

import type { APIRoute } from 'astro';

const GITHUB_API = 'https://api.github.com/repos/nathapp-io/nax/releases/latest';

export const GET: APIRoute = async () => {
  try {
    const res = await fetch(GITHUB_API, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'nax-website/1.0',
      },
    });

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const data = await res.json();
    const version: string | null = data.tag_name ?? null;

    return new Response(JSON.stringify({ version }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Robots-Tag': 'noindex, nofollow',
        // Vercel edge CDN caches for 1 hour; serves stale for up to 24h while revalidating
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch {
    return new Response(JSON.stringify({ version: null }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Robots-Tag': 'noindex, nofollow',
        // Short cache on errors so we recover quickly when GitHub is back
        'Cache-Control': 's-maxage=60, stale-while-revalidate=300',
      },
    });
  }
};
