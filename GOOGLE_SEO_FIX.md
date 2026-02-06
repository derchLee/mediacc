# Google Search Console 问题修复清单

## 问题描述

Google Search Console 显示：
- ❌ **重定向错误**
- ❌ **服务器错误 (5xx)**

## 已完成的修复

### ✅ 1. 修复 robots.txt
- **文件**: `public/robots.txt`
- **修复**: 将 sitemap URL 从占位符改为实际域名
- **变更**: `Sitemap: https://mediacc.it.com/sitemap.xml`

### ✅ 2. 配置永久重定向（308）
- **文件**: `next.config.js`
- **修复**: 添加 `redirects()` 配置，使用永久重定向（308）替代临时重定向（307）
- **影响**: Google 会将这些重定向视为永久性的，有利于 SEO

### ✅ 3. 启用 standalone 输出模式
- **文件**: `next.config.js`
- **修复**: 添加 `output: 'standalone'` 配置
- **用途**: 用于 Docker 部署，生成独立的服务器文件

### ✅ 4. 添加安全头部
- **文件**: `next.config.js`
- **修复**: 在 `headers()` 中添加安全头部（X-Content-Type-Options, X-Frame-Options, X-XSS-Protection）
- **注意**: COOP/COEP 头部保留（ffmpeg.wasm 必需），Googlebot 应该能够处理

### ✅ 5. 创建 Docker 部署文件
- **文件**: `Dockerfile`, `docker-compose.yml`, `.dockerignore`
- **用途**: 标准化生产环境部署

---

## 必须执行的 Cloudflare 配置（关键！）

### ⚠️ 最重要：SSL/TLS 模式设置

1. 登录 Cloudflare 控制台
2. 选择域名 `mediacc.it.com`
3. 进入 **SSL/TLS** → **Overview**
4. **必须将 SSL/TLS encryption mode 设置为**：
   - ✅ **Full (strict)** - 如果服务器有有效 SSL 证书（推荐）
   - ✅ **Full** - 如果服务器没有 SSL 证书（Cloudflare 会提供）
   - ❌ **不要使用 "Flexible"** - 这会导致重定向循环和 5xx 错误

### 其他 Cloudflare 设置

1. **Always Use HTTPS**: 开启
2. **Automatic HTTPS Rewrites**: 开启
3. **DNS 记录**: 确保代理状态是 **Proxied**（橙色云朵）

---

## 验证步骤

### 1. 检查网站可访问性

```bash
# 从服务器本地测试
curl -I http://localhost/image

# 从外部测试（使用你的域名）
curl -I https://mediacc.it.com/image
```

**预期响应**:
- HTTP 状态码: `200 OK` 或 `308 Permanent Redirect`
- 不应该有 `500`、`502`、`503` 等 5xx 错误

### 2. 检查重定向

```bash
# 检查根路径重定向
curl -I https://mediacc.it.com/

# 预期: 308 Permanent Redirect 到 /image
```

### 3. 检查 robots.txt 和 sitemap

```bash
# 访问 robots.txt
curl https://mediacc.it.com/robots.txt

# 访问 sitemap
curl https://mediacc.it.com/sitemap.xml
```

### 4. 使用 Google Search Console URL 检查工具

1. 登录 Google Search Console
2. 使用 **URL Inspection** 工具
3. 输入: `https://mediacc.it.com/image`
4. 点击 **Test Live URL**
5. 检查：
   - ✅ 页面可抓取
   - ✅ 已编入索引（或请求索引）
   - ❌ 不应该有重定向错误或 5xx 错误

---

## 常见问题排查

### Q1: 仍然显示重定向错误

**可能原因**:
- Cloudflare SSL/TLS 模式仍然是 "Flexible"
- 浏览器缓存了旧的重定向

**解决方案**:
1. 确认 Cloudflare SSL/TLS 模式为 "Full" 或 "Full (strict)"
2. 清除 Cloudflare 缓存（Caching → Purge Cache → Purge Everything）
3. 等待 24-48 小时让 Google 重新抓取

### Q2: 仍然显示 5xx 错误

**可能原因**:
1. Docker 容器未正常运行
2. 端口映射问题
3. Cloudflare SSL/TLS 模式问题
4. 服务器资源不足

**排查步骤**:

```bash
# 1. 检查 Docker 容器状态
docker ps
docker logs mediacc-app

# 2. 检查端口映射
docker port mediacc-app
# 应该显示: 0.0.0.0:80->3000/tcp

# 3. 检查服务器资源
free -h
df -h

# 4. 重启容器
docker restart mediacc-app
```

### Q3: Googlebot 无法访问（COOP/COEP 问题）

**说明**: COOP/COEP 头部是 ffmpeg.wasm 多线程的必需配置。Googlebot 应该能够处理这些头部。

**如果确实有问题**，可以创建中间件为 Googlebot 移除这些头部（但这可能会影响 ffmpeg.wasm 功能）。

---

## 部署后检查清单

- [ ] Cloudflare SSL/TLS 模式设置为 "Full" 或 "Full (strict)"
- [ ] Cloudflare "Always Use HTTPS" 已开启
- [ ] Docker 容器正常运行 (`docker ps`)
- [ ] 网站可以通过 `https://mediacc.it.com/image` 访问
- [ ] robots.txt 可访问且 sitemap URL 正确
- [ ] sitemap.xml 可访问
- [ ] 根路径 `/` 正确重定向到 `/image`（308）
- [ ] Google Search Console URL Inspection 工具显示页面可抓取
- [ ] 等待 24-48 小时后检查索引状态

---

## 时间线

1. **立即**: 修复 Cloudflare SSL/TLS 模式设置
2. **1-2 小时**: 重新部署 Docker 容器（如果代码有更新）
3. **24-48 小时**: Google 重新抓取网站
4. **3-7 天**: Google Search Console 更新索引状态

---

## 需要帮助？

如果问题持续存在，请提供：
1. Google Search Console 错误详情截图
2. Docker 容器日志 (`docker logs mediacc-app`)
3. Cloudflare SSL/TLS 模式设置截图
4. `curl -I https://mediacc.it.com/image` 的输出

---

**最后更新**: 2026-01-27
