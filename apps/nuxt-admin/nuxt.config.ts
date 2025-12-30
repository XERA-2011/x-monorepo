import { loadEnv } from 'vite'

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd())
// 优先使用环境变量，否则使用远程服务器地址
const apiTarget = env.VITE_API_TARGET || process.env.NUXT_API_TARGET || 'http://8.129.84.229'

console.log('API Proxy Target:', apiTarget)

export default defineNuxtConfig({
  extends: ['@repo/ui'],
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4
  },
  ssr: false, // 禁用服务端渲染，使用纯客户端渲染（SPA 模式）
  devtools: { enabled: true },
  devServer: {
    port: 3001
  },
  runtimeConfig: {
    public: {
      apiBase: '/api'
    }
  },
  vite: {
    server: {
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/admin-api'),
          // 跳过 Nuxt 内部请求（如图标）
          bypass: (req) => {
            if (req.url?.includes('/_nuxt')) {
              return req.url
            }
          }
        }
      }
    }
  },

})
