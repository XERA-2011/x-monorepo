# X-MONOREPO

## 简介 | Introduction

**X-MONOREPO** 是一套企业级前端工程，采用 **Monorepo** 架构管理。它与 **X-SPRING-BOOT** 后端完美协同，提供了一套功能丰富、性能优越的 SaaS 管理后台解决方案。

### 核心特性

- **最新技术栈**：Vue 3.5, Vite 5, TypeScript, TailwindCSS, Pinia。
- **Monorepo 架构**：使用 TurboRepo 高效管理多包项目 (Apps & Packages)。
- **UI 框架**：
  - 后台：基于 Element Plus (admin-ele)，样式侵入低。
  - 前台：基于 Nuxt 4 + Nuxt UI (web-nuxt)，SSR 支持。
- **企业级功能**：
  - 完整的 RBAC 权限控制（菜单、按钮、数据权限）。
  - 深度集成的 SaaS 多租户体系。
  - 丰富的高级组件（表单、表格、上传、弹窗）。
  - 国际化、暗黑模式、主题配置。

## 目录结构 | Directory Structure

```text
x-monorepo/
├── apps/
│   ├── admin-ele/      # [后台应用] 基于 Element Plus 的管理后台
│   └── web-nuxt/       # [前台应用] 基于 Nuxt 4 + Nuxt UI 的 SSR 应用
├── packages/           # 共享代码库
│   ├── @core/          # 核心框架逻辑 (UI Kit, Preferences, etc.)
│   ├── effects/        # 副作用层 (Hooks, Plugins)
│   ├── utils/          # 通用工具类
│   └── ...
├── scripts/            # 构建与工具脚本
└── turbo.json          # TurboRepo 配置
```

## 快速开始 | Quick Start

### 1. 环境准备

- **Node.js**: v18.12.0+ (建议 v20+)
- **Pnpm**: v8+ (推荐最新版)
- **Git**: 建议使用 Git Bash 或类似终端

### 2. 安装依赖

```bash
# 在项目根目录下运行
pnpm install
```

### 3. 本地开发

```bash
# 启动 Element Plus 后台管理系统
pnpm dev:ele
# 访问地址: http://localhost:2012

# 启动 Nuxt 前台应用
pnpm dev:nuxt
# 访问地址: http://localhost:2011
```

> **注意**: 默认配置连接远程或本地后端。
>
> - 后台配置: `apps/admin-ele/.env.development`
> - 前台配置: `apps/web-nuxt/.env.development`

### 4. 项目打包

构建生产环境产物：

```bash
# 构建后台
pnpm build:ele

# 构建前台
pnpm build:nuxt
```

构建完成后，产物分别位于 `apps/admin-ele/dist` 和 `apps/web-nuxt/.output` 目录。

## 配置说明 | Configuration

项目通过 `.env` 文件进行环境变量配置，位于各个 `apps/` 子项目下。

| 文件 | 说明 | 关键变量 |
| --- | --- | --- |
| `.env` | 所有环境通用配置 | `VITE_APP_TITLE`, `VITE_APP_CAPTCHA_ENABLE` |
| `.env.development` | 本地开发环境 | `VITE_GLOB_API_URL` (后端API地址) |
| `.env.production` | 生产构建环境 | `VITE_GLOB_API_URL` (通常设为 `/admin-api`) |

## 部署 | Deployment

推荐使用 Docker + Nginx 进行部署。

### 1. admin-ele (后台管理 - SPA)

将 `apps/admin-ele/dist` 静态文件挂载到 Nginx：

```nginx
location /admin {
    alias  /usr/share/nginx/html/admin;
    index  index.html index.htm;
    try_files $uri $uri/ /admin/index.html;
}
```

### 2. Web-Nuxt (前台网站 - SSR)

Nuxt 应用构建后生成 Node.js 服务，建议使用 PM2 或 Docker 运行，通过 Nginx 反向代理：

```nginx
location / {
    proxy_pass http://web-nuxt-container:2011;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

### 3. API 代理

```nginx
location /admin-api/ {
    proxy_pass http://xera-server:8080/admin-api/;
}
```
