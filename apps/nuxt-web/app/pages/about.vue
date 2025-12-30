<template>
  <div class="py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 页面标题 -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          关于我们
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400">
          了解 Nuxt Web 项目的背景和技术栈
        </p>
      </div>

      <!-- 内容区 -->
      <div class="prose dark:prose-invert max-w-none">
        <div class="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">项目简介</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Nuxt Web 是 x-monorepo 项目的主网站应用，采用 Nuxt 4 框架构建，
            是一个现代化的全栈 Web 应用模板。
          </p>

          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">技术栈</h2>
          <div class="grid sm:grid-cols-2 gap-4 mb-6">
            <div class="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div class="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                <UIcon name="i-heroicons-code-bracket" class="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p class="font-medium text-gray-900 dark:text-white">Nuxt 4</p>
                <p class="text-sm text-gray-500">全栈框架</p>
              </div>
            </div>
            <div class="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div class="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                <UIcon name="i-heroicons-cube" class="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p class="font-medium text-gray-900 dark:text-white">Vue 3.5</p>
                <p class="text-sm text-gray-500">前端框架</p>
              </div>
            </div>
            <div class="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                <UIcon name="i-heroicons-swatch" class="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p class="font-medium text-gray-900 dark:text-white">Nuxt UI</p>
                <p class="text-sm text-gray-500">UI 组件库</p>
              </div>
            </div>
            <div class="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div class="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center">
                <UIcon name="i-heroicons-paint-brush" class="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <p class="font-medium text-gray-900 dark:text-white">TailwindCSS</p>
                <p class="text-sm text-gray-500">样式框架</p>
              </div>
            </div>
          </div>

          <div class="flex justify-center">
            <UButton to="/" variant="outline" size="lg">
              <UIcon name="i-heroicons-arrow-left" class="w-5 h-5 mr-2" />
              返回首页
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '关于 - Nuxt Web'
})
</script>
