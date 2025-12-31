<script setup lang="ts">
definePageMeta({
  title: '首页',
});
</script>

<template>
  <UContainer class="py-8">
    <div class="flex min-h-[60vh] flex-col items-center justify-center gap-6">
      <h1 class="text-center text-4xl font-bold">欢迎使用 X-MONOREPO</h1>
      <p class="max-w-2xl text-center text-lg text-gray-500 dark:text-gray-400">
        基于 Nuxt 4 + Nuxt UI 构建的现代化 SSR 前台应用
      </p>

      <div class="mt-4 flex gap-4">
        <UButton
          icon="i-lucide-github"
          to="https://github.com/XERA-2011/x-monorepo"
          target="_blank"
        >
          GitHub
        </UButton>
        <UButton
          icon="i-lucide-book-open"
          variant="outline"
          to="https://ui.nuxt.com"
          target="_blank"
        >
          Nuxt UI 文档
        </UButton>
      </div>
    </div>
  </UContainer>
</template>
