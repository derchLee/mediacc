import { MetadataRoute } from "next";

const defaultBaseUrl = "https://www.mediacc.it.com";

// 语言前缀 → hreflang 代码（保持与实际路由 ja/ es/ pt/ 一致）
const localePrefixes = [
  { prefix: "", hreflang: "en" },
  { prefix: "/ja", hreflang: "ja" },
  { prefix: "/es", hreflang: "es" },
  { prefix: "/pt", hreflang: "pt" },
] as const;

// 工具页类型 → 优先级配置
//   /image /video 是真正的产品入口（/ 仅 redirect 到 /image，不进 sitemap）。
//   英文版（无 locale 前缀）作为 x-default 主版本拿满权重 1.0，
//   其他语言版本 0.8 —— 既明确主次，又不会让本地化版本被边缘化。
const TOOL_PAGES = ["/image", "/video"] as const;
const PRIMARY_PRIORITY = 1.0;
const LOCALIZED_PRIORITY = 0.8;
const LEGAL_PRIORITY = 0.3;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || defaultBaseUrl;

  // 为每个工具页（image/video）构建跨语言 alternates 映射，
  // 搜索引擎会把多语言版本归并为同一组结果，避免本地化页面互相竞争排名。
  const buildAlternates = (suffix: (typeof TOOL_PAGES)[number]) => {
    const languages: Record<string, string> = {
      "x-default": `${baseUrl}${suffix}`, // 默认指向英文版
    };
    for (const { prefix, hreflang } of localePrefixes) {
      languages[hreflang] = `${baseUrl}${prefix}${suffix}`;
    }
    return { languages };
  };

  try {
    const entries: MetadataRoute.Sitemap = [];

    // 1) 工具页：英文版 1.0，本地化版 0.8（按 prefix 是否为空判定）
    for (const { prefix } of localePrefixes) {
      const isPrimary = prefix === "";
      for (const suffix of TOOL_PAGES) {
        entries.push({
          url: `${baseUrl}${prefix}${suffix}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: isPrimary ? PRIMARY_PRIORITY : LOCALIZED_PRIORITY,
          alternates: buildAlternates(suffix),
        });
      }
    }

    // 2) 法律/支持页：低权重，仅作收录用
    for (const path of ["/privacy", "/terms", "/cookies", "/disclaimer"]) {
      entries.push({
        url: `${baseUrl}${path}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: LEGAL_PRIORITY,
      });
    }

    return entries;
  } catch {
    // Fallback：environment 无法解析时返回最小可用 sitemap
    return [
      { url: `${defaultBaseUrl}/image`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
      { url: `${defaultBaseUrl}/video`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    ];
  }
}
