# MediaCC SEO & GEO 优化报告

> 基于 [SEO-GEO Skill](https://github.com/Princeton-NLP/GEO) 与 Princeton GEO 研究的优化实施说明

## 优化概览

| 项目 | 状态 | 说明 |
|------|------|------|
| Meta Tags | ✅ | title、description、keywords、OG、Twitter 已完善 |
| JSON-LD Schema | ✅ | WebApplication、WebSite、FAQPage、HowTo、BreadcrumbList |
| AI Crawler 访问 | ✅ | robots.ts 显式允许 GPTBot、PerplexityBot、ClaudeBot 等 |
| Sitemap | ✅ | 含多语言 image/video 页面 |
| GEO 方法应用 | ✅ | 统计数字、权威语气、技术术语、FAQ 优化 |

---

## 1. 传统 SEO 优化

### Meta Tags
- **Title**: `Free Online Media Converter & Compressor – 100% Local Processing | MediaCC`
- **Description**: 150–160 字符，包含核心关键词与独特价值
- **Keywords**: free media converter, heic to jpg, heic converter, online video converter, image compressor, local processing 等
- **Open Graph / Twitter Card**: 社交分享与 AI 引用

### robots
- 使用 `src/app/robots.ts` 动态生成
- 禁止 `/api/`、`/_next/`、`/admin/`
- 允许 AI 爬虫：GPTBot、ChatGPT-User、PerplexityBot、ClaudeBot、anthropic-ai、Bingbot、Googlebot

### Sitemap
- `/sitemap.xml` 包含首页、隐私、条款、图片/视频多语言页面
- changeFrequency: weekly（主页面）/ monthly（法律页）

---

## 2. GEO（生成式引擎优化）

### 应用的 Princeton GEO 方法

| 方法 | 预估提升 | 实施方式 |
|------|----------|----------|
| 统计数字 | +37% | FAQ 中加入 150MB、1000MB、15 文件、CRF 18/28、20–45 分钟等 |
| HEIC 支持 | - | 图片页加入 heic to jpg、heic2any 技术说明，提升 GEO 相关性 |
| 引用来源 | +40% | 明确技术来源：Canvas API、FFmpeg.wasm、WebAssembly |
| 权威语气 | +25% | 使用确定性表达，避免模糊用语 |
| 技术术语 | +18% | libx264、AAC、CRF、bitrate、WebAssembly 等 |
| 易理解 | +20% | 简化专业概念，保持逻辑清晰 |

### JSON-LD Schema

1. **WebApplication** – 工具类应用描述
2. **WebSite** – 站点与 SearchAction，利于 sitelinks
3. **FAQPage** – 根布局与 image/video 页面均包含
4. **HowTo** – 图片/视频页面的操作步骤
5. **BreadcrumbList** – 图片/视频页面的面包屑

### 移除项
- **aggregateRating**：Google 要求真实用户评价，占位数据可能带来惩罚，已移除

---

## 3. AI 平台适配

### ChatGPT / OpenAI
- 显式允许 GPTBot、ChatGPT-User
- 强调品牌与功能清晰描述
- 定期更新内容（建议 30 天内有变化）

### Perplexity
- 显式允许 PerplexityBot
- FAQ Schema 已优化，便于引用
- 内容强调语义相关性与事实密度

### Google AI Overview (SGE)
- E-E-A-T 导向：经验、专业、权威、信任
- 使用结构化数据（Schema）
- 技术来源与参数有明确说明

### Microsoft Copilot / Bing
- 显式允许 Bingbot
- 页面加载速度优化
- 概念与参数定义清晰

### Claude
- 显式允许 ClaudeBot、anthropic-ai
- 内容事实密度高
- 结构清晰，便于提取与引用

---

## 4. 验证与监控

### Schema 验证
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

### 索引检查
```
site:mediacc.it.com
```

### 建议操作
1. 提交 sitemap 至 Google Search Console、Bing Webmaster Tools
2. 配置各平台的 Search Console / 验证
3. 关注 Core Web Vitals（LCP、FID、CLS）
4. 定期检查 Schema 和索引状态

---

## 5. 文件变更清单

| 文件 | 变更 |
|------|------|
| `src/app/robots.ts` | 新增：动态 robots，显式允许 AI 爬虫 |
| `src/app/layout.tsx` | 新增 WebSite Schema；优化 FAQ；移除 aggregateRating；添加 dateModified |
| `src/lib/translations/image-layout.tsx` | 新增 BreadcrumbList Schema |
| `src/lib/translations/video-layout.tsx` | 新增 BreadcrumbList Schema |
| `src/lib/translations/en.ts` | 优化 FAQ、whyList、formatConversionPrincipleList；加入 HEIC、heic2any 说明；图片页 meta/keywords/FAQ 增加 heic to jpg |
| `public/robots.txt` | 删除（由 `app/robots.ts` 替代） |

---

*最后更新：2025-02-17*
