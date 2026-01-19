# Cloudflare Pages 部署问题解决方案

## 🔍 问题分析

错误信息显示 wrangler 找不到 assets 目录，需要明确指定输出目录。

**可能的原因：**
1. `@cloudflare/next-on-pages` 构建失败，没有生成 `.vercel/output/static`
2. 构建命令执行顺序有问题
3. 输出目录配置不正确

---

## ✅ 已完成的配置

### 1. 更新 `wrangler.jsonc`

已添加：
- `pages_build_output_dir`: `.vercel/output/static` - 告诉 Cloudflare Pages 输出目录
- `assets.directory`: `.vercel/output/static` - 告诉 wrangler 静态资源目录

### 2. 构建脚本

`package.json` 中的构建命令：
```json
"build:cf": "next build && npx @cloudflare/next-on-pages@1"
```

---

## 📋 Cloudflare Pages 控制台配置

在 Cloudflare Pages 项目设置中确认：

### Build Settings

**Framework preset:** `Next.js` 或 `None`

**Build command:**
```bash
npm run build:cf
```

**Build output directory:**
```
.vercel/output/static
```

**Root directory:** `/` (默认)

**Node.js version:** `18.x` 或 `20.x`

---

## 🔍 排查步骤

如果仍然失败，请检查：

### 1. 构建日志

在 Cloudflare Pages 构建日志中查看：
- `npm run build:cf` 是否成功执行
- `npx @cloudflare/next-on-pages@1` 是否成功执行
- 是否有错误信息

### 2. 验证输出目录

构建成功后，应该生成：
```
.vercel/
  output/
    static/        # 静态文件
    functions/     # Edge Functions
    config.json    # 配置
```

### 3. 如果 `.vercel/output/static` 不存在

可能的原因：
- `@cloudflare/next-on-pages` 执行失败
- 构建命令有问题
- 依赖安装失败

**解决方案：**
- 检查构建日志中的错误
- 确认 `@cloudflare/next-on-pages` 版本兼容
- 尝试使用 `.vercel/output` 而不是 `.vercel/output/static`

---

## 🚀 替代方案

如果 `@cloudflare/next-on-pages` 持续失败，可以尝试：

### 方案 1：使用标准 Next.js 构建（功能受限）

修改 `package.json`:
```json
{
  "scripts": {
    "build:cf": "next build"
  }
}
```

修改 `wrangler.jsonc`:
```jsonc
{
  "name": "mediacc",
  "compatibility_date": "2026-01-18",
  "assets": {
    "directory": ".next/static"
  }
}
```

Cloudflare Pages 设置：
- Build output directory: `.next/static`

**⚠️ 注意：** 这会丢失 Edge Runtime 和部分 Next.js 功能。

---

### 方案 2：检查并修复构建问题

1. **确认依赖安装成功**
   - 检查 `.npmrc` 中的 `legacy-peer-deps=true` 是否生效

2. **检查 Node.js 版本**
   - Cloudflare Pages 需要 Node.js 18+ 或 20+

3. **检查 Next.js 配置**
   - 确认 `next.config.js` 没有阻止构建的配置

---

## 📝 下一步

1. **提交更改**
   ```bash
   git add wrangler.jsonc
   git commit -m "fix: 配置 Cloudflare Pages 输出目录"
   git push
   ```

2. **检查构建日志**
   - 在 Cloudflare Pages 控制台查看构建日志
   - 确认 `@cloudflare/next-on-pages` 是否成功执行

3. **如果仍然失败**
   - 提供构建日志中的具体错误信息
   - 我可以帮你进一步排查
