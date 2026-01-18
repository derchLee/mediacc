# Git 提交到 GitHub 指南

## 📋 当前状态
- ✅ 项目已准备好提交
- ⚠️ 需要初始化 Git 仓库
- ⚠️ 需要创建 GitHub 仓库（如果还没有）

---

## 🚀 提交步骤

### 第一步：初始化 Git 仓库（如果还没有）

```bash
# 初始化 Git 仓库
git init

# 查看当前状态
git status
```

### 第二步：添加文件到暂存区

```bash
# 添加所有文件（.gitignore 会自动排除不需要的文件）
git add .

# 或者分步添加
git add src/
git add public/
git add *.json
git add *.js
git add *.ts
git add *.md
```

### 第三步：提交更改

```bash
# 首次提交
git commit -m "Initial commit: MediaCC - Local media conversion and compression tool"

# 或者使用更详细的提交信息
git commit -m "feat: 完成 MediaCC 基础功能开发

- 实现图片/视频格式转换和压缩功能
- 添加 SEO 优化（robots.txt, sitemap, metadata）
- 添加法律合规页面（隐私政策、服务条款、Cookie 政策）
- 集成 Google Analytics 4 统计
- 添加 Cookie 同意弹窗（GDPR 合规）
- 优化视频处理性能（大文件超时优化）
- 完善页面国际化（英文界面）"
```

### 第四步：创建 GitHub 仓库并推送

#### 4.1 在 GitHub 上创建新仓库

1. 访问 https://github.com/new
2. 填写仓库信息：
   - Repository name: `mediacc` (或其他名称)
   - Description: `Local Media Conversion & Compression Tool - 100% local processing`
   - 选择 Public 或 Private
   - **不要**勾选 "Initialize this repository with a README"（因为本地已有文件）

#### 4.2 连接本地仓库到 GitHub

```bash
# 添加远程仓库（替换 YOUR_USERNAME 和 REPO_NAME）
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 或者使用 SSH（如果已配置 SSH key）
git remote add origin git@github.com:YOUR_USERNAME/REPO_NAME.git

# 验证远程仓库
git remote -v
```

#### 4.3 推送到 GitHub

```bash
# 首次推送
git branch -M main
git push -u origin main

# 或者如果 GitHub 仓库默认分支是 master
git branch -M master
git push -u origin master
```

---

## 📝 常用 Git 命令

### 查看状态
```bash
git status                    # 查看当前状态
git log --oneline            # 查看提交历史
git remote -v                # 查看远程仓库
```

### 提交更改
```bash
git add .                    # 添加所有更改
git add <file>               # 添加特定文件
git commit -m "message"      # 提交更改
git push                     # 推送到远程仓库
```

### 如果需要修改上次提交
```bash
git add .
git commit --amend -m "新的提交信息"
git push --force             # 强制推送（谨慎使用）
```

---

## ⚠️ 注意事项

### 1. 检查 .gitignore 文件

确保 `.gitignore` 包含以下内容，避免提交不必要的文件：

```
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build
/dist

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local
.env

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts
```

### 2. 环境变量文件

**不要提交** `.env.local` 文件到 GitHub！

```bash
# 确保 .env.local 在 .gitignore 中
# 如果需要分享环境变量配置，使用 .env.example
```

### 3. 大文件

如果 `public/ffmpeg/` 目录中的文件很大，可能需要：
- 使用 Git LFS（Large File Storage）
- 或者将这些文件放在 CDN 上

---

## 🔒 敏感信息检查

提交前检查以下内容是否包含敏感信息：

- [ ] 环境变量文件（`.env.local`）未提交
- [ ] API 密钥未硬编码在代码中
- [ ] 个人信息已正确配置（邮箱、链接等）
- [ ] 没有包含临时文件或测试文件

---

## 📋 推荐的提交信息格式

### 首次提交
```
Initial commit: MediaCC project
```

### 功能更新
```
feat: 添加 Google Analytics 4 统计功能
```

### Bug 修复
```
fix: 修复视频转换超时问题
```

### 文档更新
```
docs: 更新 README 和部署文档
```

### 样式/UI 更新
```
style: 更新联系信息模块样式
```

---

## 🎯 完整提交示例

```bash
# 1. 初始化（如果需要）
git init

# 2. 添加文件
git add .

# 3. 首次提交
git commit -m "Initial commit: MediaCC - Local media conversion tool with SEO and analytics"

# 4. 添加远程仓库（替换为你的 GitHub 仓库 URL）
git remote add origin https://github.com/yourusername/mediacc.git

# 5. 推送
git branch -M main
git push -u origin main
```

---

## 🔄 后续更新

当你完成新的更改后：

```bash
# 查看更改
git status

# 添加更改
git add .

# 提交
git commit -m "描述你的更改"

# 推送
git push
```

---

## 📚 更多资源

- [Git 官方文档](https://git-scm.com/doc)
- [GitHub 指南](https://guides.github.com/)
- [Git 命令速查表](https://education.github.com/git-cheat-sheet-education.pdf)
