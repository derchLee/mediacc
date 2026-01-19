# Cloudflare Pages 完整部署指南

## ✅ 项目兼容性检查

### 结论：**项目完全可以在 Cloudflare Pages 上部署！** ✅

经过全面检查，当前工程**完全兼容** Cloudflare Pages：

#### ✅ 兼容的功能
1. **纯客户端处理** - 所有媒体处理都在浏览器中完成，无需服务器端 API
2. **Next.js App Router** - 完全支持 Edge Runtime
3. **Metadata API** - 所有页面都配置了 SEO 元数据，支持 Edge Runtime
4. **HTTP 响应头** - `headers()` 配置支持 Edge Functions
5. **服务器端重定向** - `redirect()` 支持 Edge Functions
6. **动态 Sitemap** - `sitemap.ts` 支持 Edge Functions
7. **Server Components** - 默认服务器端渲染，支持 Edge Runtime
8. **环境变量** - 只使用 `process.env.NEXT_PUBLIC_*`，完全兼容

#### ✅ 已完成的配置
1. ✅ 已安装 `@cloudflare/next-on-pages`
2. ✅ 已配置 `build:cf` 构建脚本
3. ✅ 已创建 `wrangler.jsonc` 配置文件
4. ✅ 已配置 `compatibility_flags: ["nodejs_compat"]`
5. ✅ 已创建 `public/_headers` 文件（COOP/COEP 响应头）
6. ✅ 已创建 `.npmrc`（解决依赖冲突）

---

## 🐛 当前部署问题

根据构建日志，发现**两个配置错误**：

### 问题 1：构建命令错误 ❌

**当前配置（错误）：**
```
Executing user build command: npm run build
```

**应该配置（正确）：**
```
npm run build:cf
```

**原因：** 
- `npm run build` 只执行 `next build`，不会运行 `@cloudflare/next-on-pages`
- 因此不会生成 `.vercel/output/static` 目录

---

### 问题 2：部署命令错误 ❌

**错误信息：**
```
✘ [ERROR] It looks like you've run a Workers-specific command in a Pages project.
  For Pages, please run `wrangler pages deploy` instead.
```

**当前配置（错误）：**
```
Executing user deploy command: npx wrangler deploy
```

**应该配置（正确）：**
```
（留空 - 不需要部署命令）
```

**原因：**
- `wrangler deploy` 是用于 **Cloudflare Workers** 的命令
- Cloudflare Pages **会自动部署**，不需要手动部署命令

---

## ✅ 解决方案

### 步骤 1：更新 Cloudflare Pages 控制台配置

登录 **Cloudflare Dashboard** → 进入你的 **Pages 项目** → **Settings** → **Builds & deployments**

#### 修改以下配置：

1. **Framework preset:**
   - 选择 `Next.js` 或 `None`

2. **Build command:** ⚠️ **改为：**
   ```bash
   npm run build:cf
   ```

3. **Build output directory:**
   ```
   .vercel/output/static
   ```

4. **Root directory:**
   ```
   /（留空或填 "/"）
   ```

5. **Node.js version:**
   ```
   18.x 或 20.x
   ```

6. **Deploy command:** ⚠️ **删除或留空！**
   - 如果有这个字段，**必须删除**或**留空**
   - Cloudflare Pages 会自动处理部署

---

### 步骤 2：环境变量配置（可选）

在 **Settings** → **Environment Variables** 中添加（如果需要）：

- `NEXT_PUBLIC_BASE_URL` = `https://你的域名.pages.dev`（例如：`https://mediacc.pages.dev`）
- `NEXT_PUBLIC_GA4_MEASUREMENT_ID` = `G-NR6F75G20E`（如果使用环境变量）

**注意：** 如果代码中已经有默认值，环境变量是可选的。

---

### 步骤 3：HTTP 响应头配置（重要）

由于项目使用 `SharedArrayBuffer`（ffmpeg.wasm 多线程必需），需要配置响应头：

#### 方法 1：使用 `_headers` 文件（已配置）✅

项目中的 `public/_headers` 文件已经配置了：
```
/*
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Embedder-Policy: require-corp
```

#### 方法 2：在 Cloudflare Pages 控制台配置（备用）

在 **Settings** → **Functions** → **HTTP Headers** 中添加：
- Header name: `Cross-Origin-Opener-Policy`
- Header value: `same-origin`

- Header name: `Cross-Origin-Embedder-Policy`  
- Header value: `require-corp`

---

## 📋 完整配置检查清单

### Cloudflare Pages 控制台设置

- [ ] **Framework preset:** `Next.js` 或 `None`
- [ ] **Build command:** `npm run build:cf` ⚠️ **必须**
- [ ] **Build output directory:** `.vercel/output/static`
- [ ] **Deploy command:** **留空**（不要设置任何命令）⚠️ **必须**
- [ ] **Root directory:** `/`（默认）
- [ ] **Node.js version:** `18.x` 或 `20.x`
- [ ] **Environment variables:** 根据需要设置
- [ ] **HTTP Headers:** 确保 COOP/COEP 配置正确

### 项目文件检查

- [x] `package.json` - 包含 `build:cf` 脚本
- [x] `wrangler.jsonc` - 配置了 `pages_build_output_dir` 和 `assets.directory`
- [x] `wrangler.jsonc` - 包含 `compatibility_flags: ["nodejs_compat"]`
- [x] `public/_headers` - 配置了 COOP/COEP 响应头
- [x] `.npmrc` - 配置了 `legacy-peer-deps=true`
- [x] `@cloudflare/next-on-pages` - 已安装

---

## 🚀 部署流程

### 1. 更新 Cloudflare Pages 配置

在 Cloudflare Pages 控制台修改：
- Build command: `npm run build:cf`
- Deploy command: **删除或留空**

### 2. 提交代码（如果还没提交）

```bash
git add .
git commit -m "chore: 配置 Cloudflare Pages 部署"
git push
```

### 3. 触发部署

**方法 1：自动部署（推荐）**
- 推送代码到 GitHub 后，Cloudflare Pages 会自动触发部署

**方法 2：手动触发**
- 在 Cloudflare Pages 控制台点击 "Retry deployment"

### 4. 验证部署

构建日志中应该看到：
- ✅ `npm run build:cf` 执行成功
- ✅ `@cloudflare/next-on-pages` 执行成功
- ✅ `.vercel/output/static` 目录生成
- ✅ **没有** `wrangler deploy` 命令
- ✅ 部署成功

访问网站后验证：
- ✅ 页面正常加载
- ✅ HTTP 响应头包含 COOP/COEP
- ✅ 视频转换功能正常（需要 SharedArrayBuffer）

---

## 🔍 如果仍然失败

### 检查构建日志

1. **确认构建命令执行**
   - 应该看到 `npm run build:cf`
   - 应该看到 `@cloudflare/next-on-pages` 执行

2. **确认输出目录生成**
   - 构建日志中应该显示 `.vercel/output/static` 目录生成成功

3. **确认没有部署命令错误**
   - **不应该看到** `Executing user deploy command`
   - 如果看到，说明 Deploy command 还没有删除

### 常见错误和解决方案

#### 错误 1：找不到输出目录
**原因：** 构建命令不是 `npm run build:cf`
**解决：** 确保 Build command 是 `npm run build:cf`

#### 错误 2：wrangler deploy 错误
**原因：** 配置了 Deploy command
**解决：** 删除或清空 Deploy command

#### 错误 3：@cloudflare/next-on-pages 失败
**原因：** 依赖冲突或 Node.js 版本问题
**解决：** 
- 检查 `.npmrc` 是否存在（`legacy-peer-deps=true`）
- 确认 Node.js 版本是 18.x 或 20.x

---

## 📝 总结

### ✅ 项目状态：**完全可以部署到 Cloudflare Pages**

### 🔧 需要修复的配置：

1. **Cloudflare Pages 控制台**：
   - Build command: `npm run build:cf`（当前是 `npm run build`）
   - Deploy command: **删除或留空**（当前是 `npx wrangler deploy`）

2. **项目文件**：✅ 已全部配置正确

### 🚀 修复步骤：

1. 登录 Cloudflare Pages 控制台
2. 进入项目设置
3. 修改 Build command 为 `npm run build:cf`
4. 删除或清空 Deploy command
5. 保存并重新部署

---

## 📞 验证步骤

修复配置后，验证部署：

1. **查看构建日志**
   - 应该看到 `npm run build:cf` 执行
   - 应该看到 `@cloudflare/next-on-pages` 成功
   - 应该看到 `.vercel/output/static` 生成
   - **不应该看到** `wrangler deploy` 错误

2. **访问网站**
   - 页面正常加载
   - 检查 HTTP 响应头（F12 → Network → Headers）
   - 应该看到 `Cross-Origin-Opener-Policy: same-origin`
   - 应该看到 `Cross-Origin-Embedder-Policy: require-corp`

3. **测试功能**
   - 上传图片/视频
   - 测试转换功能
   - 验证一切正常

---

## ✅ 下一步

1. **立即修复 Cloudflare Pages 控制台配置**
2. **保存并重新部署**
3. **验证部署成功**
4. **测试网站功能**

部署应该可以成功！🎉
