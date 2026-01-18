# SEO & Google Ads 配置指南

## 📋 已完成的工作

### ✅ SEO 基础配置
- [x] robots.txt 已创建
- [x] 动态 sitemap.ts 已创建
- [x] 完善的页面 metadata（Open Graph, Twitter Cards）
- [x] 结构化数据（JSON-LD）
- [x] 页面级 SEO（image/page.tsx, video/page.tsx）

### ✅ 法律合规页面
- [x] 隐私政策页面 (/privacy)
- [x] 服务条款页面 (/terms)
- [x] Cookie 政策页面 (/cookies)
- [x] Cookie 同意弹窗组件（GDPR/CCPA 合规）

### ✅ 其他必需内容
- [x] PWA manifest.json
- [x] 页脚链接（隐私政策、服务条款、Cookie 政策）
- [x] 环境变量配置模板 (.env.example)

---

## 🚧 需要手动完成的任务

### 1. 配置环境变量

复制 `.env.example` 文件为 `.env.local`：

```bash
cp .env.example .env.local
```

然后编辑 `.env.local`，填入你的实际配置：

```env
# 更新为你的实际域名
NEXT_PUBLIC_BASE_URL=https://yourdomain.com

# Google Analytics 4 (GA4) - 暂时留空，后续接入时填写
NEXT_PUBLIC_GA4_MEASUREMENT_ID=

# Google Ads - 暂时留空，后续接入时填写
NEXT_PUBLIC_GOOGLE_ADS_ID=
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=
```

### 2. 创建网站图标文件

需要在 `public/` 目录下创建以下图标文件：

- `favicon.ico` (16x16, 32x32)
- `icon-192.png` (192x192)
- `icon-512.png` (512x512)
- `apple-touch-icon.png` (180x180)
- `og-image.jpg` (1200x630) - Open Graph 图片

**工具推荐**：
- 在线图标生成器：https://www.favicon-generator.org/
- Open Graph 图片：可以使用 Figma、Canva 等工具制作

### 3. 更新 robots.txt 中的域名

编辑 `public/robots.txt`，将 `yourdomain.com` 替换为你的实际域名：

```txt
Sitemap: https://yourdomain.com/sitemap.xml
```

### 4. 更新 sitemap.ts 中的默认域名

编辑 `src/app/sitemap.ts`，确保使用正确的域名（通过环境变量配置）。

### 5. 更新法律页面中的联系邮箱

编辑以下文件，将占位符邮箱替换为你的实际邮箱：

- `src/app/privacy/page.tsx`: `privacy@yourdomain.com`
- `src/app/terms/page.tsx`: `legal@yourdomain.com`
- `src/app/cookies/page.tsx`: `cookies@yourdomain.com`

### 6. 验证 sitemap.xml

部署后访问 `https://yourdomain.com/sitemap.xml` 验证 sitemap 是否正常生成。

---

## 🔜 后续接入 Google Ads 的准备工作

### 已预留的配置接口

系统已为 Google Ads 接入预留了以下接口：

1. **环境变量配置**：
   - `NEXT_PUBLIC_GOOGLE_ADS_ID`: Google Ads 转化 ID
   - `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`: 转化标签

2. **Cookie 同意弹窗**：
   - 已支持广告 Cookie 的单独管理
   - 用户可以选择接受/拒绝广告 Cookie

3. **结构化数据**：
   - 已包含 WebApplication Schema
   - 可以添加更多结构化数据支持

### 接入 Google Ads 时需要做的：

1. **创建 Google Ads 账户**
   - 访问 https://ads.google.com/
   - 创建广告账户
   - 获取转化 ID（格式：AW-XXXXXXXXX）

2. **设置转化操作**
   - 在 Google Ads 中创建转化操作
   - 获取转化标签 ID（格式：AW-XXXXXXXXX/XXXXX）

3. **在代码中启用 Google Ads**
   - 在 `src/app/layout.tsx` 中添加 Google Ads 脚本
   - 使用环境变量中的 `NEXT_PUBLIC_GOOGLE_ADS_ID`
   - 在关键事件点（文件上传、处理完成、下载）添加转化追踪

4. **测试转化跟踪**
   - 使用 Google Ads 的测试工具验证转化是否正常追踪

---

## 📊 SEO 检查清单

部署前检查以下项目：

- [ ] 环境变量已正确配置
- [ ] robots.txt 中的域名已更新
- [ ] sitemap.xml 可以正常访问
- [ ] 所有页面都有正确的 metadata
- [ ] Open Graph 图片已创建并上传
- [ ] 网站图标已创建并上传
- [ ] manifest.json 可以正常访问
- [ ] 隐私政策、服务条款、Cookie 政策页面内容已审查
- [ ] 法律页面中的邮箱地址已更新
- [ ] Cookie 同意弹窗正常工作
- [ ] 页脚链接正确
- [ ] 所有链接都可以正常访问

---

## 🔍 SEO 验证工具

部署后使用以下工具验证 SEO 配置：

1. **Google Search Console**
   - 提交 sitemap: `https://yourdomain.com/sitemap.xml`
   - 验证网站所有权
   - 检查索引状态

2. **Google Rich Results Test**
   - 测试结构化数据：https://search.google.com/test/rich-results
   - 验证 JSON-LD 是否正确

3. **Open Graph 调试工具**
   - Facebook: https://developers.facebook.com/tools/debug/
   - LinkedIn: https://www.linkedin.com/post-inspector/
   - Twitter: https://cards-dev.twitter.com/validator

4. **PageSpeed Insights**
   - 测试页面性能：https://pagespeed.web.dev/
   - 检查 Core Web Vitals

---

## 📝 注意事项

1. **域名配置**：确保在 `.env.local` 中设置正确的域名
2. **HTTPS**：生产环境必须使用 HTTPS
3. **测试 Cookie 弹窗**：清除 localStorage 测试 Cookie 同意弹窗是否正常显示
4. **法律页面审查**：建议由法律顾问审查隐私政策和服务条款内容
5. **图片优化**：确保 og-image.jpg 大小合理（建议 < 1MB）

---

**提示**：当准备好接入 Google Ads 时，参考 `SEO_AND_ADS_IMPLEMENTATION_PLAN.md` 文档中的详细实施步骤。
