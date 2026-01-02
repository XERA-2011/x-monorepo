# X-MONOREPO

[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js)](https://nodejs.org/) [![pnpm](https://img.shields.io/badge/pnpm-10+-F69220?logo=pnpm)](https://pnpm.io/) [![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js)](https://vuejs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)

## 简介 | Introduction

**X-MONOREPO** 是一套企业级前端工程，采用 **Monorepo** 架构管理。它与 **X-SPRING-BOOT** 后端完美协同，提供了一套功能丰富、性能优越的 SaaS 管理后台解决方案。

### 核心特性

| 特性              | 说明                                                |
| ----------------- | --------------------------------------------------- |
| 🚀 **最新技术栈** | Vue 3.5, Vite 7, TypeScript 5, TailwindCSS 4, Pinia |
| 📦 **Monorepo**   | TurboRepo 高效管理多包项目                          |
| 🎨 **后台管理**   | Element Plus + 丰富业务组件                         |
| 🌐 **前台网站**   | Nuxt 4 + Nuxt UI + SSG 静态生成                     |
| 🔐 **权限控制**   | RBAC 菜单/按钮/数据权限                             |
| 🏢 **多租户**     | 深度集成 SaaS 多租户体系                            |
| 🌍 **国际化**     | 中英文切换                                          |
| 🌙 **暗黑模式**   | 支持亮/暗主题切换                                   |

## 目录结构 | Directory Structure

```
x-monorepo/
├── apps/
│   ├── admin-ele/          # 后台管理 (Element Plus)
│   └── web-nuxt/           # 前台网站 (Nuxt 4 + SSG)
├── packages/
│   ├── @core/              # 核心框架 (UI Kit, Composables)
│   ├── effects/            # 副作用层 (Hooks, Plugins)
│   └── utils/              # 通用工具类
├── internal/               # 构建配置 (ESLint, Vite, Tailwind)
├── scripts/                # 部署脚本
└── nginx.conf              # Nginx 配置模板
```

## 快速开始 | Quick Start

### 环境要求

- **Node.js** ≥ 20.12.0
- **pnpm** ≥ 10.14.0

### 安装与运行

```bash
# 1. 安装依赖
pnpm install

# 2. 启动开发服务器
pnpm dev:ele     # 后台管理 → http://localhost:2012
pnpm dev:nuxt    # 前台网站 → http://localhost:2011
```

> **配置文件**
>
> - 后台: `apps/admin-ele/.env.development`
> - 前台: `apps/web-nuxt/.env.development`

## 常用命令 | Commands

| 命令 | 说明 |
| --- | --- |
| `pnpm dev` | 交互式选择应用启动 |
| `pnpm dev:ele` | 启动后台管理 (localhost:2012) |
| `pnpm dev:nuxt` | 启动前台网站 (localhost:2011) |
| `pnpm run build:ele` | 构建后台 → `apps/admin-ele/dist` |
| `pnpm --filter @x-monorepo/web-nuxt generate` | SSG 构建前台 → `apps/web-nuxt/.output/public` |
| `pnpm lint` | 代码检查 |
| `pnpm format` | 代码格式化 |
| `pnpm clean` | 清理构建产物 |
| `pnpm reinstall` | 重新安装依赖 |

## 代码规范检查 | Code Quality

**提交代码前请务必执行以下检查，确保通过 CI/CD 检查：**

### 快速检查与修复

```bash
# 1. 运行完整的代码检查
pnpm run lint

# 2. 自动修复格式问题 (推荐)
pnpm exec prettier . --write

# 3. 仅检查 web-nuxt 的样式文件
pnpm exec stylelint "apps/web-nuxt/**/*.{vue,css}" --fix
```

### 常见问题修复

| 错误类型 | 修复命令 |
| --- | --- |
| **Prettier 格式错误** | `pnpm exec prettier . --write` |
| **Stylelint CSS 错误** | `pnpm exec stylelint "**/*.{vue,css}" --fix` |
| **ESLint JS/TS 错误** | `pnpm exec eslint . --fix` |

### 提交前检查清单

- [ ] `pnpm run lint` 无错误
- [ ] 代码已格式化（`prettier --write`）
- [ ] 没有未使用的导入和变量
- [ ] 提交信息符合规范（feat/fix/docs/style/refactor 等）

> **💡 提示**: 建议配置 Git hooks 自动在提交前运行 `pnpm run lint`

## 配置说明 | Configuration

| 文件               | 环境 | 关键变量                         |
| ------------------ | ---- | -------------------------------- |
| `.env`             | 通用 | `VITE_APP_TITLE`                 |
| `.env.development` | 开发 | `VITE_GLOB_API_URL`              |
| `.env.production`  | 生产 | `VITE_BASE`, `VITE_GLOB_API_URL` |

## 部署 | Deployment

### Docker + Nginx 部署架构

```
┌─────────────────────────────────────────────────────┐
│                   Nginx (Docker)                     │
│  ┌─────────────────┬─────────────────────────────┐  │
│  │   /             │  /admin/                    │  │
│  │   web-nuxt      │  admin-ele                  │  │
│  │   (SSG 静态)    │  (SPA 静态)                 │  │
│  └─────────────────┴─────────────────────────────┘  │
│                         ↓                            │
│              /admin-api/ → Spring Boot              │
└─────────────────────────────────────────────────────┘
```

### Nginx 配置

```nginx
server {
    listen 80;

    # 前台网站 (/)
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # 后台管理 (/admin/)
    location /admin/ {
        alias /usr/share/nginx/html/admin/;
        index index.html;
        try_files $uri $uri/ /admin/index.html;
    }

    # API 代理
    location /admin-api/ {
        proxy_pass http://xera-server:8080/admin-api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 部署步骤

```bash
# 1. 本地构建
pnpm run build:ele
pnpm --filter @x-monorepo/web-nuxt generate

# 2. 上传到服务器
# - apps/web-nuxt/.output/public/* → /opt/xera/html/
# - apps/admin-ele/dist/*         → /opt/xera/html/admin/
# - nginx.conf                     → /opt/xera/nginx.conf

# 3. 重载 Nginx
docker exec xera-nginx nginx -s reload
```

### 访问地址

| 应用     | URL                       |
| -------- | ------------------------- |
| 前台网站 | http://your-server/       |
| 后台管理 | http://your-server/admin/ |

## License

[MIT](./LICENSE)
