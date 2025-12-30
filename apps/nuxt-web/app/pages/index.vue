<template>
  <div>
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <!-- 背景装饰 -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 dark:bg-primary-900/20 rounded-full blur-3xl" />
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-300/20 dark:bg-primary-800/20 rounded-full blur-3xl" />
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div class="text-center">
          <!-- 标签 -->
          <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm font-medium mb-8">
            <UIcon name="i-heroicons-sparkles" class="w-4 h-4 mr-2" />
            基于 Nuxt 4 构建
          </div>

          <!-- 标题 -->
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            欢迎来到 
            <span class="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              Nuxt Web
            </span>
          </h1>

          <!-- 描述 -->
          <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            这是一个现代化的 Web 应用模板，采用 Nuxt 4、Vue 3.5 和 Nuxt UI 构建，
            支持暗色模式，响应式设计，开箱即用。
          </p>

          <!-- 按钮组 -->
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <UButton to="/about" size="xl" class="px-8">
              <UIcon name="i-heroicons-arrow-right" class="w-5 h-5 mr-2" />
              了解更多
            </UButton>
            <UButton 
              to="https://nuxt.com" 
              target="_blank" 
              color="gray" 
              variant="outline" 
              size="xl"
              class="px-8"
            >
              <UIcon name="i-heroicons-book-open" class="w-5 h-5 mr-2" />
              查看文档
            </UButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white dark:bg-gray-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">技术特性</h2>
          <p class="text-gray-600 dark:text-gray-400">采用最新技术栈构建的现代化应用</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
            <div class="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center mb-4">
              <UIcon name="i-heroicons-bolt" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Nuxt 4</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              最新的 Nuxt 框架，支持 app/ 目录结构，更好的开发体验
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
            <div class="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-4">
              <UIcon name="i-heroicons-cube" class="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Vue 3.5</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Composition API、响应式系统、更好的 TypeScript 支持
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
            <div class="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-4">
              <UIcon name="i-heroicons-swatch" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Nuxt UI</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              精美的 UI 组件库，基于 TailwindCSS，支持暗色模式
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '首页 - Nuxt Web'
})
</script>
