# MediaCC 部署指南

本文档说明如何将 MediaCC 部署到阿里云服务器并通过 Cloudflare 进行 DNS 解析和 SSL 配置。

## 目录

1. [服务器准备](#服务器准备)
2. [Docker 部署](#docker-部署)
3. [Cloudflare 配置](#cloudflare-配置)
4. [Google Search Console 配置](#google-search-console-配置)
5. [故障排查](#故障排查)

---

## 服务器准备

### 1. 安装 Docker 和 Docker Compose

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 安装 Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 验证安装
docker --version
docker-compose --version
```

### 2. 克隆代码并构建镜像

```bash
# 克隆代码（或上传代码到服务器）
git clone <your-repo-url> mediacc
cd mediacc

# 构建 Docker 镜像
docker build -t mediacc:latest .

# 或使用 docker-compose 构建
docker-compose build
```

---

## Docker 部署

### 方式一：使用 Docker Compose（推荐）

```bash
# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

### 方式二：直接使用 Docker

```bash
# 运行容器
docker run -d \
  --name mediacc-app \
  --restart unless-stopped \
  -p 80:3000 \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_BASE_URL=https://mediacc.it.com \
  mediacc:latest

# 查看日志
docker logs -f mediacc-app
```

### 验证部署

访问 `http://your-server-ip/image` 应该能看到网站正常运行。

---

## Cloudflare 配置

### 1. DNS 设置

1. 登录 Cloudflare 控制台
2. 选择你的域名 `mediacc.it.com`
3. 进入 **DNS** 设置
4. 添加 A 记录：
   - **Type**: A
   - **Name**: @ (或 mediacc)
   - **IPv4 address**: 你的阿里云服务器公网 IP
   - **Proxy status**: ✅ Proxied (橙色云朵)
   - **TTL**: Auto

### 2. SSL/TLS 设置（重要！）

**这是解决 Google Search Console 5xx 错误的关键配置**

1. 进入 **SSL/TLS** 设置
2. 将 **SSL/TLS encryption mode** 设置为：
   - ✅ **Full (strict)** - 推荐（需要服务器有有效 SSL 证书）
   - 或 **Full** - 如果服务器没有 SSL 证书（Cloudflare 会提供）

   ⚠️ **不要使用 "Flexible" 模式**，这会导致重定向循环和 5xx 错误。

3. **Always Use HTTPS** 设置为 **On**
4. **Automatic HTTPS Rewrites** 设置为 **On**

### 3. 页面规则（可选但推荐）

创建以下页面规则以确保正确的重定向：

1. 进入 **Rules** → **Page Rules**
2. 添加规则：
   - **URL**: `http://mediacc.it.com/*`
   - **Setting**: Always Use HTTPS
   - **Status**: Active

### 4. 缓存设置

1. 进入 **Caching** → **Configuration**
2. 设置 **Caching Level**: Standard
3. 设置 **Browser Cache TTL**: Respect existing headers
4. **Purge Cache**: 部署新版本后清除缓存

### 5. 安全头部（可选）

Cloudflare 会自动添加一些安全头部，但你可以通过 **Transform Rules** 或 **Page Rules** 添加自定义头部。

---

## Google Search Console 配置

### 1. 验证网站所有权

1. 登录 [Google Search Console](https://search.google.com/search-console)
2. 添加属性：`https://mediacc.it.com`
3. 选择验证方式（推荐使用 HTML 标签或 DNS 验证）

### 2. 提交 Sitemap

1. 进入 **Sitemaps**
2. 提交：`https://mediacc.it.com/sitemap.xml`
3. 等待 Google 抓取（可能需要几天）

### 3. 检查索引状态

1. 进入 **Coverage** 报告
2. 检查是否有错误：
   - **重定向错误**：检查 Cloudflare SSL/TLS 模式是否为 "Full" 或 "Full (strict)"
   - **5xx 服务器错误**：检查服务器日志和 Cloudflare 配置

### 4. 请求索引

对于重要页面（如 `/image`、`/video`），可以手动请求索引：
1. 使用 **URL Inspection** 工具
2. 输入 URL：`https://mediacc.it.com/image`
3. 点击 **Request Indexing**

---

## 故障排查

### 问题 1: Google Search Console 显示 "重定向错误"

**原因**：
- Cloudflare SSL/TLS 模式设置为 "Flexible"
- HTTP 到 HTTPS 重定向配置不正确

**解决方案**：
1. 将 Cloudflare SSL/TLS 模式改为 **Full** 或 **Full (strict)**
2. 确保 **Always Use HTTPS** 已启用
3. 等待 24-48 小时让 Google 重新抓取

### 问题 2: Google Search Console 显示 "服务器错误 (5xx)"

**可能原因**：

1. **Cloudflare SSL/TLS 模式问题**
   - 解决：设置为 "Full" 或 "Full (strict)"

2. **Docker 容器未正常运行**
   ```bash
   # 检查容器状态
   docker ps
   docker logs mediacc-app
   
   # 重启容器
   docker restart mediacc-app
   ```

3. **端口映射问题**
   ```bash
   # 检查端口是否被占用
   sudo netstat -tulpn | grep :80
   
   # 检查 Docker 端口映射
   docker port mediacc-app
   ```

4. **COOP/COEP 头部导致爬虫无法访问**
   - 这是 ffmpeg.wasm 多线程的必需配置
   - Googlebot 应该能够处理这些头部
   - 如果问题持续，可以考虑为爬虫 User-Agent 移除这些头部（需要中间件）

5. **服务器资源不足**
   ```bash
   # 检查服务器资源
   free -h
   df -h
   top
   ```

### 问题 3: 网站无法访问

1. **检查防火墙**
   ```bash
   # 确保 80 端口开放
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   ```

2. **检查 Cloudflare 代理状态**
   - 确保 DNS 记录的代理状态是 **Proxied**（橙色云朵）
   - 如果改为 **DNS only**（灰色云朵），需要服务器配置 SSL 证书

3. **检查 Docker 容器日志**
   ```bash
   docker logs -f mediacc-app
   ```

### 问题 4: 重定向循环

**原因**：Cloudflare "Flexible" SSL 模式 + Next.js 重定向

**解决方案**：
1. 将 Cloudflare SSL/TLS 模式改为 **Full** 或 **Full (strict)**
2. 清除 Cloudflare 缓存
3. 清除浏览器缓存

---

## 监控和维护

### 1. 设置日志轮转

创建 `/etc/logrotate.d/docker-containers`：

```
/var/lib/docker/containers/*/*.log {
  rotate 7
  daily
  compress
  size=10M
  missingok
  delaycompress
  copytruncate
}
```

### 2. 监控容器健康状态

```bash
# 查看容器健康状态
docker ps --format "table {{.Names}}\t{{.Status}}"

# 查看资源使用
docker stats mediacc-app
```

### 3. 定期更新

```bash
# 拉取最新代码
git pull

# 重新构建并部署
docker-compose build
docker-compose up -d

# 清除旧镜像
docker image prune -a
```

---

## 环境变量

在 `docker-compose.yml` 或 Docker 运行命令中设置以下环境变量：

- `NODE_ENV=production` - 生产环境
- `NEXT_PUBLIC_BASE_URL=https://mediacc.it.com` - 网站基础 URL
- `PORT=3000` - 应用端口（容器内）
- `HOSTNAME=0.0.0.0` - 监听所有网络接口

---

## 安全建议

1. **定期更新 Docker 镜像和依赖**
2. **使用非 root 用户运行容器**（Dockerfile 已配置）
3. **限制容器资源使用**（docker-compose.yml 已配置）
4. **定期备份数据**（如果需要）
5. **监控服务器日志和 Cloudflare 分析**

---

## 联系支持

如果遇到问题，请检查：
1. Docker 容器日志
2. Cloudflare 分析报告
3. Google Search Console 错误详情
4. 服务器系统日志

---

**最后更新**: 2026-01-27
