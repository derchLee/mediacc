# SEO 和 Google Ads 接入实施计划

## 📋 当前项目状态分析

### ✅ 已有内容
- 基础的页面 metadata（title, description）
- Next.js 14 App Router（SEO 友好）
- 响应式设计
- 性能优化配置（压缩、图片优化）

### ❌ 缺失的关键内容
1. **SEO 基础文件**：robots.txt, sitemap.xml
2. **页面级 SEO**：Open Graph, Twitter Cards, 结构化数据
3. **Google Ads 集成**：转化跟踪、事件追踪
4. **法律合规页面**：隐私政策、服务条款、Cookie 政策
5. **分析工具**：Google Analytics 4
6. **性能监控**：Core Web Vitals 监控
7. **错误追踪**：错误监控和分析
8. **网站图标**：favicon, manifest.json (PWA)
9. **结构化数据**：Schema.org JSON-LD
10. **多语言 SEO**：hreflang 标签（如需要）

---

## 🎯 一、SEO 优化方案

### 1.1 基础 SEO 文件

#### robots.txt
**位置**：`public/robots.txt`
**内容**：
- 允许搜索引擎爬虫
- 指定 sitemap 位置
- 禁止爬取不需要的路径（如 /api, /admin）

**实施方式**：
```txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

Sitemap: https://yourdomain.com/sitemap.xml
```

#### sitemap.xml
**位置**：`public/sitemap.xml` 或动态生成 `app/sitemap.ts`
**内容**：
- 所有公开页面的 URL
- 最后更新时间
- 优先级和更新频率

**实施方案**：
- **方案 A**：静态 sitemap.xml（适合页面少的网站）
- **方案 B**：动态 sitemap.ts（Next.js 14 推荐，适合动态页面）

### 1.2 页面级 SEO Metadata

#### Open Graph (OG) 标签
**用途**：社交媒体分享预览（Facebook, LinkedIn 等）
**需要添加的标签**：
- `og:title`
- `og:description`
- `og:image`
- `og:url`
- `og:type`
- `og:site_name`

#### Twitter Cards
**用途**：Twitter 分享预览
**需要添加的标签**：
- `twitter:card`
- `twitter:title`
- `twitter:description`
- `twitter:image`

#### 实施方案
在 `app/layout.tsx` 和每个页面中完善 metadata：
```typescript
export const metadata = {
  title: "...",
  description: "...",
  openGraph: {
    title: "...",
    description: "...",
    images: ["/og-image.jpg"],
    type: "website",
    siteName: "MediaCC"
  },
  twitter: {
    card: "summary_large_image",
    title: "...",
    description: "...",
    images: ["/og-image.jpg"]
  }
}
```

### 1.3 结构化数据 (Schema.org JSON-LD)

#### 需要添加的结构化数据
1. **WebApplication**：描述应用功能
2. **SoftwareApplication**：技术栈和特性
3. **HowTo**：使用指南（如果有教程页面）
4. **FAQPage**：常见问题（如果有 FAQ 页面）
5. **BreadcrumbList**：面包屑导航

#### 实施方案
在 `app/layout.tsx` 中添加 JSON-LD 脚本：
```typescript
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "MediaCC",
  description: "...",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  }
}
```

### 1.4 性能优化（Core Web Vitals）

#### 需要优化的指标
- **LCP (Largest Contentful Paint)**：< 2.5s
- **FID (First Input Delay)**：< 100ms
- **CLS (Cumulative Layout Shift)**：< 0.1

#### 优化措施
1. **图片优化**：使用 Next.js Image 组件（如果可行）
2. **字体优化**：预加载关键字体，使用 `font-display: swap`
3. **代码分割**：动态导入非关键组件
4. **资源预加载**：关键 CSS 和 JS
5. **缓存策略**：静态资源长期缓存

---

## 🎯 二、Google Ads 接入方案

### 2.1 Google Ads 转化跟踪

#### 需要实现的功能
1. **Google Ads 标签 (gtag.js)**
2. **转化事件追踪**
   - 文件上传事件
   - 转换/压缩完成事件
   - 下载事件

#### 实施方案
在 `app/layout.tsx` 中引入 Google Ads 脚本：
```typescript
// Google Ads Conversion ID
const GA_ADS_ID = "AW-XXXXXXXXX";

// 加载 gtag.js
// 在 head 中添加脚本
```

#### 转化事件定义
```typescript
// 文件上传转化
gtag('event', 'conversion', {
  'send_to': 'AW-XXXXXXXXX/XXXXX',
  'value': 1.0,
  'currency': 'USD'
});

// 处理完成转化
gtag('event', 'conversion', {
  'send_to': 'AW-XXXXXXXXX/XXXXX',
  'value': 5.0,
  'currency': 'USD'
});
```

### 2.2 Google Analytics 4 (GA4)

#### 需要配置的内容
1. **GA4 测量 ID**：G-XXXXXXXXXX
2. **事件追踪**：
   - page_view（自动）
   - file_upload
   - file_conversion
   - file_download
   - file_compress
   - error（错误事件）

#### 实施方案
```typescript
// 在 app/layout.tsx 中添加 GA4
const GA4_ID = "G-XXXXXXXXXX";

// 自定义事件示例
gtag('event', 'file_upload', {
  file_type: 'video',
  file_size: 50,
  timestamp: Date.now()
});
```

### 2.3 增强型转化（可选）
- 用户行为分析
- 转化路径分析
- A/B 测试支持

---

## 🎯 三、法律合规页面

### 3.1 隐私政策 (Privacy Policy)
**位置**：`app/privacy/page.tsx`
**必须包含的内容**：
- 数据收集说明（本地处理，不上传服务器）
- Cookie 使用说明
- 第三方服务（Google Analytics, Google Ads）
- 用户权利（GDPR 相关）
- 联系信息

### 3.2 服务条款 (Terms of Service)
**位置**：`app/terms/page.tsx`
**必须包含的内容**：
- 服务使用条款
- 用户责任
- 免责声明
- 知识产权
- 服务变更和终止条款

### 3.3 Cookie 政策 (Cookie Policy)
**位置**：`app/cookies/page.tsx`
**必须包含的内容**：
- Cookie 类型说明
- 使用的第三方 Cookie（GA4, Google Ads）
- Cookie 管理方式

### 3.4 Cookie 同意弹窗（GDPR/CCPA 合规）
**组件**：`components/CookieConsent.tsx`
**功能**：
- 首次访问显示 Cookie 同意弹窗
- 允许用户接受/拒绝 Cookie
- 保存用户选择（localStorage）
- 管理不同类型的 Cookie（必需、分析、广告）

---

## 🎯 四、性能监控和错误追踪

### 4.1 Core Web Vitals 监控
**方案**：
- 使用 Next.js 内置的 `next/vitals` API
- 发送数据到 Google Analytics
- 可选：集成 Vercel Analytics（如果部署在 Vercel）

### 4.2 错误追踪
**推荐工具**：
- **Sentry**：免费套餐，功能完善
- **LogRocket**：记录用户会话
- **Google Error Reporting**：与 Google Cloud 集成

**实施方案**：
```typescript
// 全局错误处理
// app/error.tsx
// 在 layout.tsx 中添加错误边界
```

---

## 🎯 五、网站图标和 PWA

### 5.1 Favicon
**需要准备的文件**（放在 `public/` 目录）：
- `favicon.ico`（16x16, 32x32）
- `icon-192.png`（192x192）
- `icon-512.png`（512x512）
- `apple-touch-icon.png`（180x180）

### 5.2 Manifest.json (PWA)
**位置**：`public/manifest.json`
**内容**：
- 应用名称和描述
- 图标路径
- 主题颜色
- 启动 URL
- 显示模式

---

## 🎯 六、其他重要优化

### 6.1 多语言支持（如需要）
- hreflang 标签
- 语言切换器
- 不同语言的 sitemap

### 6.2 安全性
- HTTPS（必须）
- Security Headers（CSP, HSTS 等）
- X-Frame-Options
- Content-Security-Policy

### 6.3 社交媒体链接
- 页脚添加社交媒体链接
- 分享按钮（可选）

### 6.4 联系页面
- 联系表单或邮箱
- 帮助/支持页面

---

## 📊 实施优先级

### 🔴 高优先级（上线前必须）
1. ✅ robots.txt 和 sitemap.xml
2. ✅ Open Graph 和 Twitter Cards
3. ✅ Google Analytics 4 集成
4. ✅ Google Ads 标签和转化跟踪
5. ✅ 隐私政策和服务条款页面
6. ✅ Cookie 同意弹窗
7. ✅ Favicon 和基本图标
8. ✅ 错误追踪（Sentry 或类似）

### 🟡 中优先级（上线后尽快）
1. ⚠️ 结构化数据（JSON-LD）
2. ⚠️ Core Web Vitals 监控和优化
3. ⚠️ PWA manifest.json
4. ⚠️ 联系页面
5. ⚠️ 性能优化（图片、字体等）

### 🟢 低优先级（持续优化）
1. ⚪ 多语言支持
2. ⚪ 社交媒体集成
3. ⚪ A/B 测试
4. ⚪ 高级分析功能

---

## 🛠️ 技术实施清单

### 需要安装的包
```bash
# Google Analytics 和 Ads（使用 Next.js Script 组件即可，无需额外包）

# 错误追踪（可选）
npm install @sentry/nextjs

# Cookie 管理（可选）
npm install react-cookie-consent

# 结构化数据（手动编写 JSON-LD）
# 无需额外包
```

### 需要创建的文件
```
public/
├── robots.txt          # 新建
├── sitemap.xml         # 新建 或 app/sitemap.ts
├── favicon.ico         # 新建
├── icon-192.png        # 新建
├── icon-512.png        # 新建
├── apple-touch-icon.png # 新建
├── manifest.json       # 新建
└── og-image.jpg        # 新建（Open Graph 图片）

src/
├── app/
│   ├── privacy/
│   │   └── page.tsx    # 新建
│   ├── terms/
│   │   └── page.tsx    # 新建
│   ├── cookies/
│   │   └── page.tsx    # 新建
│   └── layout.tsx      # 修改（添加 GA, Ads, 结构化数据）
└── components/
    └── CookieConsent.tsx # 新建
```

### 需要修改的文件
- `src/app/layout.tsx`：添加 SEO metadata, GA4, Google Ads, 结构化数据
- `src/app/image/page.tsx`：添加页面级 SEO
- `src/app/video/page.tsx`：添加页面级 SEO
- `src/components/MainLayout.tsx`：添加页脚链接（隐私政策、服务条款）
- `next.config.js`：可能需要调整（Security Headers）

---

## 📝 Google Ads 账户设置清单

### 需要配置的内容
1. **创建 Google Ads 账户**
2. **获取转化 ID**：AW-XXXXXXXXX
3. **设置转化操作**：
   - 文件上传转化
   - 处理完成转化
   - 下载转化
4. **获取转化标签 ID**：AW-XXXXXXXXX/XXXXX
5. **测试转化跟踪**：使用 Google Ads 的测试工具

### Google Analytics 4 设置
1. **创建 GA4 属性**
2. **获取测量 ID**：G-XXXXXXXXXX
3. **设置数据流**：网站数据流
4. **配置转化事件**：标记关键事件为转化
5. **链接到 Google Ads**：在 GA4 中链接 Google Ads 账户

---

## ✅ 上线前检查清单

- [ ] robots.txt 已创建并配置
- [ ] sitemap.xml 已创建（静态或动态）
- [ ] 所有页面都有完整的 SEO metadata
- [ ] Open Graph 标签已添加
- [ ] Twitter Cards 已添加
- [ ] 结构化数据（JSON-LD）已添加
- [ ] Google Analytics 4 已集成并测试
- [ ] Google Ads 标签已添加
- [ ] 转化跟踪已设置并测试
- [ ] 隐私政策页面已创建
- [ ] 服务条款页面已创建
- [ ] Cookie 政策页面已创建
- [ ] Cookie 同意弹窗已实现
- [ ] Favicon 和图标已添加
- [ ] manifest.json 已创建（PWA）
- [ ] 错误追踪已配置
- [ ] 页面性能已优化（LCP, FID, CLS）
- [ ] HTTPS 已配置
- [ ] Security Headers 已设置
- [ ] 所有页面在 Google Search Console 中已提交
- [ ] Google Ads 转化跟踪已测试

---

## 📚 参考资源

### 官方文档
- [Next.js SEO](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Google Ads 帮助](https://support.google.com/google-ads)
- [Google Analytics 4 文档](https://developers.google.com/analytics/devguides/collection/ga4)
- [Schema.org](https://schema.org/)

### 工具
- [Google Search Console](https://search.google.com/search-console)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Open Graph 调试工具](https://www.opengraph.xyz/)

---

## 🚀 实施建议

### 第一阶段：基础 SEO（1-2 天）
1. 创建 robots.txt 和 sitemap.xml
2. 完善所有页面的 metadata
3. 添加 Open Graph 和 Twitter Cards

### 第二阶段：Google 服务集成（1-2 天）
1. 集成 Google Analytics 4
2. 集成 Google Ads 标签
3. 设置转化跟踪
4. 测试所有事件

### 第三阶段：法律合规（2-3 天）
1. 编写隐私政策页面
2. 编写服务条款页面
3. 实现 Cookie 同意弹窗
4. 添加页脚链接

### 第四阶段：优化和完善（持续）
1. 添加结构化数据
2. 性能优化
3. 错误追踪
4. PWA 配置

---

**注意**：此计划为海外上线的基础要求。根据目标市场和法规要求（如 GDPR, CCPA），可能需要额外的合规措施。
