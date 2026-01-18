# Cloudflare Pages 输出目录问题解决方案

## 🔍 问题分析

错误信息显示：
```
If are uploading a directory of assets, you can either:
- Specify the path to the directory of assets via the command line
- Or create a "wrangler.jsonc" file containing: ...
```

这表明 Cloudflare Pages **没有找到正确的输出目录**。

---

## 🎯 问题原因

使用 `@cloudflare/next-on-pages` 时，输出目录是 `.vercel/output/static`，但 Cloudflare Pages 可能：

1. **输出目录配置不正确**（在 Cloudflare Pages 控制台设置中）
2. **没有识别 `@cloudflare/next-on-pages` 的输出结构**
3. **需要 `wrangler.jsonc` 文件**来明确指定输出目录

---

## 💡 解决方案

### 方案一：创建 `wrangler.jsonc` 文件（推荐）⭐⭐⭐⭐⭐

在项目根目录创建 `wrangler.jsonc` 文件，明确指定输出目录：

```jsonc
{
  "name": "mediacc",
  "compatibility_date": "2026-01-18",
  "pages_build_output_dir": ".vercel/output/static"
}
```

**优点：**
- ✅ 明确告诉 Cloudflare Pages 输出目录位置
- ✅ 符合 Cloudflare 推荐做法
- ✅ 不依赖控制台配置

---

### 方案二：检查并更新 Cloudflare Pages 控制台配置

在 Cloudflare Pages 控制台确认：

**Build output directory** 应该设置为：
```
.vercel/output/static
```

**注意：** 如果配置为空或错误，会导致找不到输出目录。

---

### 方案三：修改构建脚本输出到标准目录

如果 `.vercel/output/static` 有问题，可以尝试：

1. 修改 `build:cf` 脚本，将输出复制到 `dist` 或 `.next` 目录
2. 在 Cloudflare Pages 配置输出目录为 `dist`

**⚠️ 不推荐：** 这可能会破坏 `@cloudflare/next-on-pages` 的功能。

---

## 📋 推荐实施方案

### 步骤 1：创建 `wrangler.jsonc`

在项目根目录创建 `wrangler.jsonc` 文件（推荐配置）：

```jsonc
{
  "name": "mediacc",
  "compatibility_date": "2026-01-18",
  "pages_build_output_dir": ".vercel/output/static"
}
```

### 步骤 2：验证 Cloudflare Pages 配置

在 Cloudflare Pages 控制台检查：

- **Build command**: `npm run build:cf`
- **Build output directory**: `.vercel/output/static` （或留空，由 `wrangler.jsonc` 指定）

### 步骤 3：提交并部署

```bash
git add wrangler.jsonc
git commit -m "chore: 添加 wrangler.jsonc 指定 Cloudflare Pages 输出目录"
git push
```

---

## 🔍 其他可能的输出目录

根据 `@cloudflare/next-on-pages` 文档，输出可能在不同的位置：

- `.vercel/output/static` - 标准输出
- `.vercel/output` - 包含 functions 的完整输出
- `dist` - 某些配置可能输出到这里

如果 `.vercel/output/static` 不存在，检查构建日志确认实际输出位置。

---

## 🚨 故障排除

### 如果仍然失败

1. **检查构建日志**：确认 `@cloudflare/next-on-pages` 是否成功执行
2. **验证输出目录**：构建后检查 `.vercel/output/static` 是否存在
3. **尝试不同的输出目录**：如果 `wrangler.jsonc` 中的目录不存在，尝试 `.vercel/output`

---

## 📚 参考资料

- [Cloudflare Pages 配置文档](https://developers.cloudflare.com/pages/configuration/build-configuration/)
- [@cloudflare/next-on-pages 文档](https://github.com/cloudflare/next-on-pages)
- [Wrangler 配置文件](https://developers.cloudflare.com/workers/wrangler/configuration/)
