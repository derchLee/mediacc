# 页面统计与分析框架推荐

## 📊 统计需求分析

### 需要统计的数据
1. **页面访问量**：页面打开展现次数（PV - Page Views）
   - 首页访问
   - 图片处理页面访问
   - 视频处理页面访问

2. **用户行为事件**：
   - "开始转换"按钮点击次数
   - "开始压缩"按钮点击次数
   - 文件上传次数（可选）
   - 文件处理成功/失败次数（可选）

### 技术特点
- Next.js 14 App Router（客户端组件）
- 纯前端应用，无需后端统计服务
- 需要 Cookie 同意弹窗支持（GDPR 合规）
- 希望轻量、简单、易于集成

---

## 🏆 框架推荐（按优先级排序）

### 方案一：Google Analytics 4 (GA4) ⭐⭐⭐⭐⭐

#### 优点
- ✅ **免费**：完全免费，功能强大
- ✅ **功能全面**：页面访问、事件追踪、用户行为分析
- ✅ **易于集成**：Next.js 官方支持，只需添加脚本
- ✅ **实时数据**：实时查看统计数据
- ✅ **可视化报表**：内置丰富的图表和报表
- ✅ **与 Google Ads 兼容**：如果需要后续接入广告，无缝集成
- ✅ **已有准备**：项目已预留 Cookie 同意弹窗，支持 GDPR

#### 缺点
- ❌ **隐私问题**：部分用户可能担心 Google 收集数据
- ❌ **需要 Cookie 同意**：必须用户同意才能使用（已解决）

#### 集成难度
- ⭐⭐ 简单（1-2小时即可完成）

#### 实施方案
1. **创建 GA4 属性**（5分钟）
   - 访问 https://analytics.google.com/
   - 创建新属性，获取 Measurement ID（格式：G-XXXXXXXXXX）

2. **集成代码**（30分钟）
   - 在 `app/layout.tsx` 中添加 GA4 脚本
   - 使用环境变量 `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
   - 在 Cookie 同意弹窗中控制 GA4 加载

3. **事件追踪**（30分钟）
   - 在 `handleStartOperation` 中添加事件追踪
   - 区分"转换"和"压缩"事件
   - 添加文件类型（图片/视频）参数

#### 代码示例（概览）
```typescript
// 页面访问：自动追踪（无需代码）

// 事件追踪（转换/压缩）
gtag('event', 'conversion_start', {
  'event_category': 'operation',
  'event_label': 'convert', // 或 'compress'
  'file_type': 'image', // 或 'video'
  'value': 1
});
```

#### 数据查看
- 访问 https://analytics.google.com/
- 实时查看：实时 > 概览
- 事件查看：报告 > 参与度 > 事件

---

### 方案二：Plausible Analytics ⭐⭐⭐⭐

#### 优点
- ✅ **隐私友好**：不收集个人数据，符合 GDPR
- ✅ **轻量级**：脚本小（<1KB），速度快
- ✅ **简单易用**：界面简洁，易于理解
- ✅ **开源**：可以自行托管
- ✅ **Cookie-free**：不需要 Cookie 同意弹窗

#### 缺点
- ❌ **付费**：需要付费（约 $9/月起）
- ❌ **功能有限**：主要是访问统计，事件追踪功能较简单
- ❌ **需要外部服务**：依赖 Plausible 服务器（除非自托管）

#### 集成难度
- ⭐⭐⭐ 中等（2-3小时）

#### 实施方案
1. **注册账户**：访问 https://plausible.io/
2. **获取域名代码**
3. **集成脚本**：在 layout.tsx 中添加
4. **事件追踪**：使用 `plausible()` 函数

---

### 方案三：Umami (自托管) ⭐⭐⭐⭐

#### 优点
- ✅ **开源免费**：完全开源，可自行托管
- ✅ **隐私友好**：不收集个人数据，符合 GDPR
- ✅ **轻量级**：脚本小，性能好
- ✅ **功能完整**：支持页面访问和事件追踪
- ✅ **无需 Cookie**：不需要 Cookie 同意

#### 缺点
- ❌ **需要服务器**：需要自己部署和维护服务器
- ❌ **配置复杂**：需要设置数据库（PostgreSQL/MySQL）

#### 集成难度
- ⭐⭐⭐⭐ 较难（需要服务器部署）

---

### 方案四：PostHog ⭐⭐⭐

#### 优点
- ✅ **开源**：可以自托管
- ✅ **功能强大**：产品分析、功能标记、会话录制
- ✅ **事件追踪**：强大的事件追踪功能
- ✅ **有免费套餐**：1M 事件/月免费

#### 缺点
- ❌ **较复杂**：功能多，配置相对复杂
- ❌ **需要 Cookie**：某些功能需要 Cookie

#### 集成难度
- ⭐⭐⭐ 中等（2-4小时）

---

### 方案五：Simple Analytics ⭐⭐⭐

#### 优点
- ✅ **隐私友好**：注重隐私
- ✅ **简单易用**：界面简洁

#### 缺点
- ❌ **付费**：需要付费
- ❌ **功能有限**：主要用于访问统计

#### 集成难度
- ⭐⭐ 简单（1-2小时）

---

## 🎯 推荐方案对比

| 框架 | 费用 | 集成难度 | 功能 | 隐私 | 推荐度 |
|------|------|----------|------|------|--------|
| **Google Analytics 4** | 免费 | ⭐⭐ 简单 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Plausible | $9/月 | ⭐⭐⭐ 中等 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Umami | 免费* | ⭐⭐⭐⭐ 较难 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| PostHog | 免费** | ⭐⭐⭐ 中等 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Simple Analytics | 付费 | ⭐⭐ 简单 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

* 需要服务器托管费用  
** 1M 事件/月免费

---

## 💡 最终推荐

### 推荐：Google Analytics 4 (GA4)

#### 推荐理由
1. **完全免费**：无需支付任何费用
2. **功能强大**：完全满足你的统计需求
3. **简单易用**：集成只需 1-2 小时
4. **已有基础**：项目已预留 Cookie 同意弹窗
5. **后续扩展**：如果后续需要接入 Google Ads，无缝兼容
6. **成熟稳定**：Google 官方维护，可靠性高

#### 实施步骤概览
1. **准备阶段**（5分钟）
   - 创建 GA4 账户和属性
   - 获取 Measurement ID：`G-XXXXXXXXXX`

2. **代码集成**（30分钟）
   - 在 `app/layout.tsx` 中添加 GA4 脚本
   - 使用 Next.js Script 组件
   - 根据 Cookie 同意状态动态加载

3. **事件追踪**（30分钟）
   - 在 `src/app/image/page.tsx` 的 `handleStartOperation` 中添加
   - 在 `src/app/video/page.tsx` 的 `handleStartOperation` 中添加
   - 区分"转换"和"压缩"事件

4. **Cookie 集成**（30分钟）
   - 更新 `CookieConsent.tsx`，控制 GA4 的加载
   - 根据用户 Cookie 选择启用/禁用

---

## 📝 实施要点

### 需要追踪的事件

#### 1. 页面访问（自动）
- `/` - 首页
- `/image` - 图片处理页面
- `/video` - 视频处理页面

#### 2. 自定义事件
- **`conversion_start`**：开始转换
  - 参数：`file_type`（image/video）、`target_format`
- **`compression_start`**：开始压缩
  - 参数：`file_type`（image/video）、`compression_mode`（lossless/lossy）

### 需要修改的文件
1. `src/app/layout.tsx` - 添加 GA4 脚本
2. `src/components/CookieConsent.tsx` - 控制 GA4 加载
3. `src/app/image/page.tsx` - 添加事件追踪
4. `src/app/video/page.tsx` - 添加事件追踪
5. `.env.local` - 添加 GA4 Measurement ID

---

## 🔒 隐私合规

### Cookie 同意处理
- ✅ 已实现 Cookie 同意弹窗
- ✅ 支持"分析 Cookie"分类
- ✅ 只有在用户同意后才加载 GA4
- ✅ 符合 GDPR 要求

### 数据隐私
- GA4 默认匿名化 IP 地址
- 不会收集个人身份信息
- 符合隐私法规要求

---

## 📊 数据查看方式

### Google Analytics 4 界面
1. **实时数据**：`实时 > 概览` - 查看当前访问
2. **页面访问**：`报告 > 参与度 > 页面和屏幕` - 查看页面 PV
3. **事件统计**：`报告 > 参与度 > 事件` - 查看按钮点击次数
4. **自定义报表**：可以创建自定义报表，组合查看数据

### 关键指标
- **页面浏览量**：每个页面的访问次数
- **事件计数**：`conversion_start` 和 `compression_start` 的次数
- **事件参数**：可以按 `file_type` 筛选（图片/视频）

---

## 🚀 如果选择其他方案

### Plausible
- 更适合注重隐私的网站
- 如果预算允许（$9/月），是个好选择
- 集成相对简单

### Umami
- 如果你有服务器和数据库，可以自托管
- 完全免费（除了服务器成本）
- 需要一定的技术能力

---

## ✅ 建议

**推荐使用 Google Analytics 4**，因为：
1. 完全免费
2. 功能强大且满足需求
3. 集成简单
4. 项目已有 Cookie 同意支持
5. 后续扩展性好

如果你担心隐私问题，可以考虑：
- **Plausible**（付费，但隐私友好）
- **Umami**（自托管，免费但需要服务器）

---

## 📚 参考资料

- [Google Analytics 4 官方文档](https://developers.google.com/analytics/devguides/collection/ga4)
- [Next.js 与 GA4 集成指南](https://nextjs.org/docs/app/building-your-application/optimizing/scripts)
- [Plausible 文档](https://plausible.io/docs)
- [Umami GitHub](https://github.com/umami-software/umami)

---

**建议**：先使用 GA4 快速实现统计功能，如果后续有特殊需求或隐私要求，再考虑迁移到其他方案。
