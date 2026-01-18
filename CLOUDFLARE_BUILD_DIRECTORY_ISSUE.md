# Cloudflare Pages 构建目录问题分析

## 🔍 问题分析

错误信息：
```
The directory specified by the "assets.directory" field in your configuration file does not exist:
  /opt/buildhome/repo/.vercel/output/static
```

**原因：** `.vercel/output/static` 目录不存在，说明：
1. `@cloudflare/next-on-pages` 可能没有成功执行
2. 或者输出目录结构不同

---

## 💡 可能的原因

### 1. `@cloudflare/next-on-pages` 未成功执行
- 构建脚本中 `npx @cloudflare/next-on-pages@1` 可能在 Cloudflare Pages 环境中失败
- 但错误被忽略了

### 2. 输出目录结构不同
- 可能输出在 `.vercel/output`（不是 `static` 子目录）
- 或者需要先运行 `next build` 生成基础结构

### 3. Cloudflare Pages 配置冲突
- 控制台的 "Build output directory" 可能与 `wrangler.jsonc` 冲突

---

## 🎯 解决方案

### 方案一：移除 `wrangler.jsonc`，使用 Cloudflare Pages 控制台配置 ⭐⭐⭐

**步骤：**
1. 删除或重命名 `wrangler.jsonc`
2. 在 Cloudflare Pages 控制台设置：
   - **Build command**: `npm run build:cf`
   - **Build output directory**: `.vercel/output/static`（或留空）

**优点：** 让 Cloudflare Pages 自动检测输出目录

---

### 方案二：修改 `wrangler.jsonc` 使用 `.vercel/output` ⭐⭐

如果 `static` 子目录不存在，尝试使用父目录：

```jsonc
{
  "name": "mediacc",
  "compatibility_date": "2026-01-18",
  "assets": {
    "directory": ".vercel/output"
  }
}
```

---

### 方案三：使用 Next.js 标准输出目录 ⭐⭐⭐⭐（推荐）

如果 `@cloudflare/next-on-pages` 有问题，可以暂时使用标准 Next.js 构建：

1. **修改 `package.json`**，使用标准构建：
   ```json
   {
     "scripts": {
       "build:cf": "next build"
     }
   }
   ```

2. **修改 `wrangler.jsonc`** 或 Cloudflare Pages 配置：
   - 输出目录：`.next/static` 或 `.next`

3. **⚠️ 注意：** 这可能不支持所有 Next.js 功能

---

### 方案四：检查构建是否成功 ⭐⭐⭐⭐⭐（最推荐）

**问题可能是 `@cloudflare/next-on-pages` 构建失败但没有报错。**

**解决方案：**
1. 在构建命令中添加错误检查
2. 或者检查构建日志确认 `@cloudflare/next-on-pages` 是否成功

---

## 📋 推荐的排查步骤

1. **检查 Cloudflare Pages 构建日志**
   - 查看 `npm run build:cf` 是否成功
   - 查看 `@cloudflare/next-on-pages` 是否执行

2. **尝试不同的输出目录**
   - `.vercel/output`
   - `.vercel/output/static`
   - `.next/static`

3. **移除 `wrangler.jsonc`**，仅使用 Cloudflare Pages 控制台配置

4. **如果还是失败**，考虑使用标准 Next.js 构建（但会丢失一些功能）
