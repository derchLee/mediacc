/**
 * Sitemap XML route handler – ensures response is application/xml so Google
 * Search Console does not treat it as HTML. Next.js metadata sitemap.ts can
 * be overridden by proxy/caching; this explicit route guarantees Content-Type.
 */
const defaultBaseUrl = "https://mediacc.it.com";
const locales = ["", "/ja", "/es", "/pt"] as const;

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildSitemapXml(baseUrl: string): string {
  const now = new Date().toISOString();
  const urls: Array<{ url: string; changefreq: string; priority: number }> = [
    { url: baseUrl, changefreq: "weekly", priority: 1.0 },
    { url: `${baseUrl}/privacy`, changefreq: "monthly", priority: 0.5 },
    { url: `${baseUrl}/terms`, changefreq: "monthly", priority: 0.5 },
    { url: `${baseUrl}/cookies`, changefreq: "monthly", priority: 0.5 },
    { url: `${baseUrl}/disclaimer`, changefreq: "monthly", priority: 0.5 },
  ];
  locales.forEach((prefix) => {
    urls.push({ url: `${baseUrl}${prefix || ""}/image`, changefreq: "weekly", priority: 0.9 });
    urls.push({ url: `${baseUrl}${prefix || ""}/video`, changefreq: "weekly", priority: 0.9 });
  });

  const urlEntries = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${escapeXml(u.url)}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>`;
}

export function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || defaultBaseUrl;
  const xml = buildSitemapXml(baseUrl);
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
