import { MetadataRoute } from "next";

const defaultBaseUrl = "https://www.mediacc.it.com";
const locales = ["", "/ja", "/es", "/pt"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || defaultBaseUrl;

  try {
    const entries: MetadataRoute.Sitemap = [
      { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
      { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
      { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
      { url: `${baseUrl}/cookies`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
      { url: `${baseUrl}/disclaimer`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    ];

    locales.forEach((prefix) => {
      entries.push({
        url: `${baseUrl}${prefix || ""}/image`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.9,
      });
      entries.push({
        url: `${baseUrl}${prefix || ""}/video`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.9,
      });
    });

    return entries;
  } catch {
    return [
      { url: defaultBaseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
      { url: `${defaultBaseUrl}/image`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
      { url: `${defaultBaseUrl}/video`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ];
  }
}
