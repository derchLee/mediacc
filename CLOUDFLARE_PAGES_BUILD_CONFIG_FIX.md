# Cloudflare Pages 构建配置修复指南

## 🔍 问题分析

根据构建日志，发现了以下问题：

### 问题 1：构建命令配置错误 ❌

**当前配置：**
```
Executing user build command: npm run build
```

**应该配置：**
```
npm run build:cf
```

**原因：** `npm run build` 只执行 `next build`，不会运行 `@cloudflare/next-on-pages`，因此不会生成 `.vercel/output/static` 目录。

---

### 问题 2：部署命令错误 ❌

**错误信息：**
```
✘ [ERROR] It looks like you've run a Workers-specific command in a Pages project.
  For Pages, please run `wrangler pages deploy` instead.
```

**原因：** Cloudflare Pages 配置中可能设置了 `deploy command`，但：
- `wrangler deploy` 是 Workers 的命令
- Cloudflare Pages **会自动部署**，不需要单独的 deploy 命令

---

## ✅ 解决方案

### 步骤 1：更新 Cloudflare Pages 控制台配置

登录 Cloudflare Pages 控制台，进入项目设置：

#### Build Settings

**Framework preset:** `Next.js` 或 `None`

**Build command:** ⚠️ **改为：**
```bash
npm run build:cf
```

**Build output directory:**
```
.vercel/output/static
```

**Root directory:** `/` (默认)

**Node.js version:** `18.x` 或 `20.x`

#### ⚠️ 重要：删除或清空 Deploy command

如果有 "Deploy command" 或 "Output command" 设置：
- **删除它** 或 **留空**
- Cloudflare Pages 会自动处理部署，不需要手动 deploy 命令

---

### 步骤 2：已更新的 `wrangler.jsonc`

已添加 `compatibility_flags: ["nodejs_compat"]`，这是 Next.js + Cloudflare Pages 所需的。

---

### 步骤 3：验证构建脚本

`package.json` 中的构建脚本应该是：
```json
{
  "scripts": {
    "build:cf": "next build && npx @cloudflare/next-on-pages@1"
  }
}
```

这个脚本会：
1. 先运行 `next build` 生成 Next.js 构建
2. 然后运行 `@cloudflare/next-on-pages` 生成 `.vercel/output/static`

---

## 📋 完整配置检查清单

### Cloudflare Pages 控制台设置

- [ ] Framework preset: `Next.js` 或 `None`
- [ ] Build command: `npm run build:cf` ⚠️ **必须**
- [ ] Build output directory: `.vercel/output/static`
- [ ] Deploy command: **留空**（不要设置 `wrangler deploy`）
- [ ] Node.js version: `18.x` 或 `20.x`
- [ ] Environment variables: 根据需要设置（如 `NEXT_PUBLIC_BASE_URL`）

### 项目文件

- [x] `wrangler.jsonc` 已配置 `pages_build_output_dir` 和 `assets.directory`
- [x] `wrangler.jsonc` 已添加 `compatibility_flags: ["nodejs_compat"]`
- [x] `package.json` 中有 `build:cf` 脚本

---

## 🚀 部署流程

1. **提交更改**
   ```bash
   git add wrangler.jsonc
   git commit -m "fix: 添加 nodejs_compat 兼容标志"
   git push
   ```

2. **在 Cloudflare Pages 控制台更新构建配置**
   - Build command: `npm run build:cf`
   - 删除/清空 Deploy command
   - Build output directory: `.vercel/output/static`

3. **重新部署**
   - 点击 "Retry deployment" 或推送新代码

4. **验证构建日志**
   - 应该看到 `npm run build:cf` 执行
   - 应该看到 `@cloudflare/next-on-pages` 执行
   - 应该看到 `.vercel/output/static` 目录生成
   - **不应该看到** `wrangler deploy` 命令

---

## ⚠️ 关于 `@cloudflare/next-on-pages` 弃用警告

构建日志显示：
```
npm warn deprecated @cloudflare/next-on-pages@1.13.16: Please use the OpenNext adapter instead
```

**当前状态：** 这个警告可以暂时忽略，`@cloudflare/next-on-pages` 仍然可用。

**未来迁移：** 如果遇到兼容性问题，可以考虑迁移到 OpenNext adapter，但这需要更多的配置更改。

---

## 🔍 如果仍然失败

1. **检查构建日志**
   - 确认 `npm run build:cf` 是否执行
   - 确认 `@cloudflare/next-on-pages` 是否成功
   - 确认 `.vercel/output/static` 是否生成

2. **检查 Cloudflare Pages 设置**
   - 确认 Build command 是 `npm run build:cf`
   - 确认没有设置 Deploy command

3. **提供详细的构建日志**
   - 包含完整的构建输出
   - 特别关注 `@cloudflare/next-on-pages` 的执行结果
