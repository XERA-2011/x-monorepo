<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
    <h1 class="text-6xl font-bold text-gray-300 dark:text-gray-700 mb-4">401</h1>
    <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">未授权访问</p>
    <UButton to="/" size="lg">返回首页</UButton>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '401 - 未授权'
})
</script>
