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

### 2. 开发环境 (Development)

**启动所有应用 (Start all apps):**

```bash
pnpm dev
# 或
turbo dev
```

> **注意 (Note):**
> 由于 Nuxt 4 / Vite 在 Monorepo 环境下的 HMR 端口 (24678) 占用机制，同时启动多个应用 (`pnpm dev`) 可能会导致控制台报错 `WebSocket server error: Port 24678 is already in use`。
> 
> **建议方案：**
> 1. 为了最佳开发体验，建议**一次只启动一个需要开发的应用**（使用 `--filter` 命令）。
> 2. 如果必须同时启动，请忽略该报错（通常不影响主服务访问），或尝试错峰启动。

**启动特定应用 (Start specific app):**

```bash
# 启动 nuxt-web (默认端口 3000)
pnpm --filter nuxt-web dev

# 启动 nuxt-admin (默认端口 3001，若端口冲突会自动递增)
pnpm --filter nuxt-admin dev
```

### 3. 构建生产版本 (Build)

**构建所有应用 (Build all apps):**

```bash
pnpm build
# 或
turbo build
```

**构建特定应用 (Build specific app):**

```bash
# 构建 nuxt-web
pnpm --filter nuxt-web build

# 构建 nuxt-admin
pnpm --filter nuxt-admin build
```

## 应用列表 (Apps)

- `apps/nuxt-web`: 主网站应用 (Nuxt 4)
- `apps/nuxt-admin`: 管理后台应用 (Nuxt 4)
- `packages/`: 共享库 (Shared packages)
