# x-monorepo

This is a Monorepo project powered by [pnpm](https://pnpm.io/) and [Turborepo](https://turbo.build/).

## Directory Structure

- `apps/`: Application source code
- `packages/`: Shared libraries

## 快速开始 (Quick Start)

### 1. 安装依赖 (Install Dependencies)

```bash
pnpm install
```

### 2. 本地开发 (Development)

你可以根据需要启动不同的应用：

**启动 nuxt-web (主网站):**
```bash
pnpm dev:web
# 访问地址: http://localhost:3000
```

**启动 nuxt-admin (管理后台):**
```bash
pnpm dev:admin
# 访问地址: http://localhost:3001 (端口随占用自动递增)
```

**同时启动所有应用:**
```bash
pnpm dev
```

> **注意**: 由于 Nuxt / Vite 的 HMR 端口 (24678) 占用机制，同时启动多个应用可能会报 `Port 24678 is already in use` 警告，但通常不影响使用。建议**一次只启动一个应用**以获得最佳开发体验。

### 3. 项目打包 (Build)

构建生产环境产物：

```bash
# 构建 nuxt-web
pnpm build:web

# 构建 nuxt-admin
pnpm build:admin

# 构建所有应用
pnpm build
```

## 应用列表 (Apps)

- `apps/nuxt-web`: 主网站应用 (Nuxt 4)
- `apps/nuxt-admin`: 管理后台应用 (Nuxt 4)
- `packages/`: 共享库 (Shared packages)
