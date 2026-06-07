/**
 * Dynamic robots.txt - SEO/GEO: Explicitly allow AI crawler bots for citation visibility.
 * Next.js serves this at /robots.txt (overrides public/robots.txt).
 *
 * AI bots to allow (per SEO-GEO skill):
 * - GPTBot (OpenAI)
 * - ChatGPT-User (ChatGPT with browsing)
 * - PerplexityBot (Perplexity)
 * - ClaudeBot / anthropic-ai (Claude)
 * - Bingbot (Microsoft Copilot)
 * - Googlebot (Google AI Overview / SGE)
 */
import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.mediacc.it.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow all — 注意：必须允许 /_next/static/ 否则 Googlebot 无法渲染 CSS/JS
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/cdn-cgi/"],
      },
      // Explicit allow for AI search engine crawlers (GEO: ensure citation visibility)
      { userAgent: "GPTBot", allow: "/", disallow: ["/api/", "/cdn-cgi/"] },
      { userAgent: "ChatGPT-User", allow: "/", disallow: ["/api/", "/cdn-cgi/"] },
      { userAgent: "PerplexityBot", allow: "/", disallow: ["/api/", "/cdn-cgi/"] },
      { userAgent: "ClaudeBot", allow: "/", disallow: ["/api/", "/cdn-cgi/"] },
      { userAgent: "anthropic-ai", allow: "/", disallow: ["/api/", "/cdn-cgi/"] },
      { userAgent: "Bingbot", allow: "/", disallow: ["/api/", "/cdn-cgi/"] },
      { userAgent: "Googlebot", allow: "/", disallow: ["/api/", "/cdn-cgi/"] },
      { userAgent: "Google-Extended", allow: "/", disallow: ["/api/", "/cdn-cgi/"] },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
