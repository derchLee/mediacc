# Cloudflare Pages 部署配置说明

## ✅ 已完成的配置

1. ✅ 已安装 `@cloudflare/next-on-pages`
2. ✅ 已添加 `build:cf` 构建脚本到 `package.json`
3. ✅ 已创建 `public/_headers` 文件配置 COOP/COEP 响应头

---

## 📋 Cloudflare Pages 控制台配置

在 Cloudflare Pages 项目设置中配置以下内容：

### 构建设置

**Framework preset:** `None` 或 `Next.js`（如果有）

**Build command:**
```bash
npm run build:cf
```

**Build output directory:**
```
.vercel/output/static
```

**Root directory:** `/` （默认）

**Node.js version:** `18.x` 或 `20.x`

---

## 🔧 环境变量（可选）

如果需要，在 **Settings > Environment Variables** 中添加：

- `NEXT_PUBLIC_BASE_URL` - 你的域名（例如：`https://mediacc.pages.dev`）
- `NEXT_PUBLIC_GA4_MEASUREMENT_ID` - GA4 Measurement ID（如果使用环境变量）

---

## ⚠️ 关于 Windows 本地构建

**注意：** `@cloudflare/next-on-pages` 在 Windows 上需要 bash，本地测试时可能会报错：

```
Error: spawn bash ENOENT
```

**这是正常的！** Cloudflare Pages 使用 Linux 环境构建，不会有这个问题。

**本地测试：** 只需要验证 `npm run build` 成功即可（`build:cf` 在 Windows 上可能失败，不影响部署）。

---

## 📝 部署步骤

1. **提交代码到 GitHub**
   ```bash
   git add .
   git commit -m "chore: 配置 Cloudflare Pages 部署"
   git push
   ```

2. **在 Cloudflare Pages 控制台**
   - 连接到你的 GitHub 仓库
   - 配置上述构建设置
   - 点击 "Save and Deploy"

3. **验证部署**
   - 部署成功后，访问你的域名
   - 检查 COOP/COEP 响应头是否正确设置
   - 测试视频转换功能（需要 SharedArrayBuffer）

---

## 🔍 验证响应头

部署后，可以通过浏览器开发者工具检查响应头：

**应该看到：**
```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

如果 `_headers` 文件没有生效，可以在 Cloudflare Pages 的 **Settings > Functions > HTTP Headers** 中手动配置。

---

## 🚨 故障排除

### 问题 1：构建失败 - 找不到输出目录

**解决：** 确保输出目录设置为 `.vercel/output/static`

### 问题 2：SharedArrayBuffer 不工作

**解决：** 
- 检查 `public/_headers` 文件是否存在
- 在 Cloudflare Pages 控制台手动配置 HTTP 响应头

### 问题 3：路由 404

**解决：** 确保使用 `build:cf` 构建脚本，不要使用普通的 `build`

---

## 📚 参考

- [@cloudflare/next-on-pages 文档](https://github.com/cloudflare/next-on-pages)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)

---

## 💡 提示

如果 `@cloudflare/next-on-pages` 出现问题，可以考虑迁移到 OpenNext（新推荐的适配器），但需要更多配置。
