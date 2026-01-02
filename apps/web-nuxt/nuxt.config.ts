// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  // 开发工具
  devtools: { enabled: true },

  // 字体配置
  app: {
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Share+Tech+Mono&display=swap',
        },
      ],
    },
  },

  // 模块
  modules: ['@nuxt/ui'],

  // Disable server-side font fetching to avoid timeouts
  fonts: {
    providers: {
      google: false,
      googleicons: false,
    },
  },

  // 引入全局样式
  css: ['~/assets/css/main.css'],

  // 开发服务器配置
  devServer: {
    port: 2011,
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
});
