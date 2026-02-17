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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mediacc.it.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow all
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      // Explicit allow for AI search engine crawlers (GEO: ensure citation visibility)
      { userAgent: "GPTBot", allow: "/", disallow: ["/api/", "/_next/"] },
      { userAgent: "ChatGPT-User", allow: "/", disallow: ["/api/", "/_next/"] },
      { userAgent: "PerplexityBot", allow: "/", disallow: ["/api/", "/_next/"] },
      { userAgent: "ClaudeBot", allow: "/", disallow: ["/api/", "/_next/"] },
      { userAgent: "anthropic-ai", allow: "/", disallow: ["/api/", "/_next/"] },
      { userAgent: "Bingbot", allow: "/", disallow: ["/api/", "/_next/"] },
      { userAgent: "Googlebot", allow: "/", disallow: ["/api/", "/_next/"] },
      { userAgent: "Google-Extended", allow: "/", disallow: ["/api/", "/_next/"] },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
