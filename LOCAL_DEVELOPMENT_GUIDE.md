# 本地开发指南

## ⚠️ 重要说明

**`wrangler dev` 不能直接用于 Next.js Pages 项目的本地开发！**

`wrangler dev` 是用于开发 **Cloudflare Workers** 的命令，而不是 **Cloudflare Pages**。

---

## ✅ 正确的本地开发方式

### 方案 1：使用 Next.js 开发服务器（推荐）⭐⭐⭐⭐⭐

这是最简单的本地开发方式，完全模拟生产环境（除了部署平台）。

**启动开发服务器：**
```bash
npm run dev
```

**访问：** `http://localhost:3000`

**优点：**
- ✅ 快速启动
- ✅ 热重载支持
- ✅ 支持所有 Next.js 功能
- ✅ 与生产环境几乎一致

**缺点：**
- ⚠️ 不是真正的 Cloudflare Pages 环境（但功能相同）

---

### 方案 2：本地测试 Cloudflare Pages 构建（高级）⭐⭐

如果你想在本地测试 Cloudflare Pages 环境，需要：

#### 步骤 1：构建项目
```bash
npm run build:cf
```

这会：
1. 运行 `next build` 生成 Next.js 构建
2. 运行 `@cloudflare/next-on-pages` 生成 `.vercel/output/static`

#### 步骤 2：使用 wrangler pages dev

```bash
wrangler pages dev .vercel/output/static
```

**⚠️ 注意：** 
- 在 Windows 上，`@cloudflare/next-on-pages` 可能需要 bash，可能失败
- 这是正常的，Cloudflare Pages 使用 Linux 环境，不会有这个问题
- 如果本地构建失败，可以忽略，只验证 `npm run build` 成功即可

---

## 🚫 错误的用法

### ❌ 不要使用 `wrangler dev`

```bash
# ❌ 错误 - 这会报错
wrangler dev
```

**错误原因：**
- `wrangler dev` 是用于开发 Workers 的
- 它需要 `.vercel/output/static` 目录（通过 `build:cf` 生成）
- 直接运行会提示目录不存在

---

## 📋 完整的开发工作流

### 日常开发（推荐）

```bash
# 1. 启动开发服务器
npm run dev

# 2. 在浏览器访问
# http://localhost:3000

# 3. 修改代码后自动热重载
```

### 构建和部署前测试

```bash
# 1. 检查代码质量
npm run lint

# 2. 构建生产版本（验证无错误）
npm run build

# 3. 本地预览生产构建（可选）
npm run build
npm start
# 访问 http://localhost:3000

# 4. 推送到 GitHub，Cloudflare Pages 自动部署
git add .
git commit -m "your changes"
git push
```

---

## 🔧 如果需要本地测试 Cloudflare Pages 环境

如果你确实需要在本地模拟 Cloudflare Pages 环境：

### 步骤 1：确保构建成功

```bash
# 如果这是 Windows 系统，可能需要 WSL 或 Git Bash
npm run build:cf
```

### 步骤 2：验证输出目录

检查 `.vercel/output/static` 目录是否存在：
```bash
# Windows PowerShell
dir .vercel\output\static

# 或 Git Bash / WSL
ls -la .vercel/output/static
```

### 步骤 3：使用 wrangler pages dev

```bash
wrangler pages dev .vercel/output/static --port 8788
```

**访问：** `http://localhost:8788`

**⚠️ 注意：** 
- 这种方式主要用于调试 Cloudflare Pages Functions
- 日常开发不需要，直接使用 `npm run dev` 即可

---

## 🎯 推荐实践

### 开发阶段
```bash
npm run dev  # 使用 Next.js 开发服务器
```

### 部署前检查
```bash
npm run lint    # 检查代码质量
npm run build   # 验证构建无错误
```

### 部署
```bash
git push  # Cloudflare Pages 自动部署
```

---

## ❓ 常见问题

### Q: 为什么 `wrangler dev` 报错找不到 `.vercel/output/static`？

**A:** 因为：
1. `wrangler dev` 是 Workers 命令，不是 Pages 命令
2. 需要先运行 `npm run build:cf` 生成目录
3. 即使生成了，也应该使用 `wrangler pages dev` 而不是 `wrangler dev`

### Q: 本地开发需要使用 `wrangler` 吗？

**A:** **不需要！** 直接使用 `npm run dev` 即可。`wrangler` 只在以下情况需要：
- 部署到 Cloudflare Pages（自动化，无需手动运行）
- 本地测试 Pages Functions（高级场景，通常不需要）

### Q: Windows 上 `build:cf` 失败怎么办？

**A:** 这是正常的！`@cloudflare/next-on-pages` 在 Windows 上需要 bash，可能会失败。解决方案：
1. 使用 WSL (Windows Subsystem for Linux)
2. 使用 Git Bash
3. 或者在云环境中构建（推荐，Cloudflare Pages 会自动处理）

---

## 📝 总结

**日常开发：**
```bash
npm run dev  # 就这一条命令就够了！
```

**部署：**
```bash
git push  # Cloudflare Pages 会自动构建和部署
```

**不要使用 `wrangler dev` 进行本地开发！**
