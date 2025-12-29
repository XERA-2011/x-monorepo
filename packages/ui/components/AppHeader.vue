<template>
  <header class="border-b border-gray-200 dark:border-gray-800 bg-white/75 dark:bg-gray-900/75 backdrop-blur">
    <UContainer class="flex items-center justify-between h-16">
      <div class="font-bold text-xl">
        <slot name="logo">
          Logo
        </slot>
      </div>
      
      <div class="flex items-center gap-4">
        <slot name="right" />
        <UButton icon="i-heroicons-sun-20-solid" color="gray" variant="ghost" aria-label="Theme" />
      </div>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
// 这里是基于 Nuxt UI 的一个基础 Header 组件
</script>
