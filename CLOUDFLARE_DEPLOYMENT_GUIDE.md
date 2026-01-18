# Cloudflare Pages 部署指南

## 🔍 问题分析

Cloudflare Pages 在部署 Next.js App Router 应用时需要特殊配置。你的项目使用的是 Next.js 14 App Router，需要适配 Cloudflare Pages。

## 🎯 解决方案

### 方案一：使用 @cloudflare/next-on-pages（推荐）⭐⭐⭐⭐⭐

这是 Cloudflare 官方推荐的 Next.js 部署方案，专门为 Cloudflare Pages 优化。

#### 步骤 1：安装依赖

```bash
npm install --save-dev @cloudflare/next-on-pages
```

#### 步骤 2：更新构建脚本

在 `package.json` 中添加：

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:cf": "next build && npx @cloudflare/next-on-pages@1",
    "start": "next start",
    "lint": "next lint"
  }
}
```

#### 步骤 3：在 Cloudflare Pages 配置

**构建命令：**
```bash
npm run build:cf
```

**构建输出目录：**
```
.vercel/output/static
```

#### 步骤 4：环境变量配置

在 Cloudflare Pages 设置中添加环境变量（如果需要）：
- `NEXT_PUBLIC_BASE_URL` - 你的域名
- `NEXT_PUBLIC_GA4_MEASUREMENT_ID` - GA4 Measurement ID（如果使用环境变量）

---

### 方案二：配置 Cloudflare Pages 构建设置（简单但功能有限）

如果你的应用主要是静态内容，可以在 Cloudflare Pages 控制台配置：

#### Cloudflare Pages 设置

**构建命令：**
```bash
npm run build
```

**构建输出目录：**
```
.next
```

**Node.js 版本：**
```
18.x 或 20.x
```

**⚠️ 注意：** 这种方式可能不支持所有 Next.js 功能（如动态路由、ISR 等）。

---

### 方案三：静态导出（仅完全静态应用）❌ 不推荐

由于你的项目使用了：
- `sitemap.ts`（服务器功能）
- `headers()` 配置（服务器功能）
- 动态路由

**不建议使用静态导出**，因为会丢失这些功能。

---

## 📝 推荐实施方案：@cloudflare/next-on-pages

### 完整步骤

#### 1. 安装 @cloudflare/next-on-pages

```bash
npm install --save-dev @cloudflare/next-on-pages
```

#### 2. 更新 package.json

添加构建脚本：

```json
{
  "scripts": {
    "build:cf": "next build && npx @cloudflare/next-on-pages@1"
  }
}
```

#### 3. Cloudflare Pages 配置

在 Cloudflare Pages 控制台设置：

- **Framework preset**: Next.js（如果可用）或 None
- **Build command**: `npm run build:cf`
- **Build output directory**: `.vercel/output/static`
- **Root directory**: `/`（默认）

#### 4. 环境变量（可选）

如果需要环境变量，在 Cloudflare Pages 设置中添加：
- `NEXT_PUBLIC_BASE_URL`
- `NEXT_PUBLIC_GA4_MEASUREMENT_ID`

---

## 🔧 可能需要的额外配置

### 1. 处理 SharedArrayBuffer Headers

由于项目使用了 `SharedArrayBuffer`（ffmpeg.wasm 需要），Cloudflare Pages 需要配置 HTTP 响应头。

在 Cloudflare Pages 的 **Settings > Functions > HTTP Headers** 中添加：

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

或者通过 Cloudflare Workers 或 `_headers` 文件配置。

### 2. 创建 `_headers` 文件（在 `public/` 目录）

```
/*
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Embedder-Policy: require-corp
```

---

## 📋 部署检查清单

- [ ] 安装 `@cloudflare/next-on-pages`
- [ ] 更新 `package.json` 构建脚本
- [ ] 在 Cloudflare Pages 配置构建命令和输出目录
- [ ] 配置 HTTP 响应头（COOP/COEP）
- [ ] 添加环境变量（如需要）
- [ ] 测试构建：`npm run build:cf`
- [ ] 推送到 GitHub 触发部署

---

## 🚨 常见问题

### 问题 1：构建失败 - 找不到输出目录

**解决：** 确保构建命令正确，输出目录配置为 `.vercel/output/static`

### 问题 2：SharedArrayBuffer 不工作

**解决：** 确保配置了 COOP/COEP 响应头

### 问题 3：路由 404

**解决：** 使用 `@cloudflare/next-on-pages` 可以正确处理 Next.js 路由

---

## 📚 参考资源

- [@cloudflare/next-on-pages 文档](https://github.com/cloudflare/next-on-pages)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Next.js on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/)

---

## 💡 建议

**强烈推荐使用方案一（@cloudflare/next-on-pages）**，因为：
1. ✅ 官方支持，稳定可靠
2. ✅ 完全支持 Next.js App Router
3. ✅ 自动处理路由和 SSR
4. ✅ 配置简单
