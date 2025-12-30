# X-MONOREPO

## 简介 | Introduction

**X-MONOREPO** 是基于 **Vben Admin 5.0** 构建的企业级前端工程，采用 **Monorepo** 架构管理。它与 **X-SPRING-BOOT** 后端完美协同，提供了一套功能丰富、性能优越的 SaaS 管理后台解决方案。

### 核心特性

- **最新技术栈**：Vue 3.5, Vite 5, TypeScript, TailwindCSS, Pinia。
- **Monorepo 架构**：使用 TurboRepo 高效管理多包项目 (Apps & Packages)。
- **多端适配**：内置 Ant Design Vue (web-antd) 等多个 UI 版本的实现。
- **企业级功能**：
    - 完整的 RBAC 权限控制（菜单、按钮、数据权限）。
    - 深度集成的 SaaS 多租户体系。
    - 丰富的高级组件（表单、表格、上传、弹窗）。
    - 国际化、暗黑模式、主题配置。

## 目录结构 | Directory Structure

```text
x-monorepo/
├── apps/
│   ├── web-antd/       # [主应用] 基于 Ant Design Vue 的管理后台
│   ├── web-ele/        # 基于 Element Plus 的管理后台
│   └── ...
├── packages/           # 共享代码库
│   ├── @core/          # 核心框架逻辑 (UI Kit, Preferences, etc.)
│   ├── api/            # 统一 API 定义
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

你可以根据需要启动不同 UI 版本的应用：

**启动 Ant Design Vue 版本 (主应用):**
```bash
pnpm dev:antd
# 访问地址: http://localhost:5555 (端口随占用自动递增)
```

**启动其他版本:**
```bash
# Element Plus 版本
pnpm dev:ele

# Naive UI 版本
pnpm dev:naive

# TDesign 版本
pnpm dev:tdesign

# 同时启动所有应用
pnpm dev
```

> **注意**: 默认配置连接远程或本地后端。如需修改，请编辑对应 `apps/` 子目录下 `.env.development` 文件中的 `VITE_GLOB_API_URL`。

### 4. 项目打包

构建生产环境产物：

```bash
pnpm build:antd
```

构建完成后，产物位于 `apps/web-antd/dist` 目录。

## 配置说明 | Configuration

项目通过 `.env` 文件进行环境变量配置，位于各个 `apps/` 子项目下。

| 文件 | 说明 | 关键变量 |
| --- | --- | --- |
| `.env` | 所有环境通用配置 | `VITE_APP_TITLE`, `VITE_APP_CAPTCHA_ENABLE` |
| `.env.development` | 本地开发环境 | `VITE_GLOB_API_URL` (后端API地址) |
| `.env.production` | 生产构建环境 | `VITE_GLOB_API_URL` (通常设为 `/admin-api`) |

## 部署 | Deployment

推荐使用 Docker + Nginx 进行部署。
请参考后端项目的 `docker-compose.yml` 中的 Nginx 配置，将 `dist` 目录挂载到 Nginx 容器中。

```nginx
location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html;
}

location /admin-api/ {
    proxy_pass http://xera-server:8080/admin-api/;
}
```