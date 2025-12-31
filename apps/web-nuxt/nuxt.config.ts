// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  // 开发工具
  devtools: { enabled: true },

  // 模块
  modules: ['@nuxt/ui'],

  // 字体配置：使用 bunny 替代 google fonts 以解决国内访问问题
  fonts: {
    provider: 'bunny',
  },

  // 引入全局样式
  css: ['~/assets/css/main.css'],

  // 开发服务器配置
  devServer: {
    port: 3000,
  },

  // 运行时配置
  runtimeConfig: {
    // 服务端私有配置
    apiSecret: '',
    // 公共配置（客户端可访问）
    public: {
      apiBase: '/api',
    },
  },

  // API 代理配置（开发环境）
  nitro: {
    devProxy: {
      '/api': {
        target: process.env.NUXT_API_URL || 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },

  // Nuxt UI 配置
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'zinc',
    },
  },
});
