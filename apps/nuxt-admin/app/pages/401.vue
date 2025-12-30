<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
    <div class="text-center">
      <h1 class="text-8xl font-bold text-gray-200 dark:text-gray-800 mb-4">401</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">未授权访问，请先登录</p>
      <UButton to="/login" size="lg">前往登录</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

useHead({
  title: '401 - 未授权'
})
</script>
