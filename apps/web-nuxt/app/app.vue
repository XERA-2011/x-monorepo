<script setup lang="ts">
// 强制暗色模式
const colorMode = useColorMode();
colorMode.preference = 'dark';
</script>

<template>
  <UApp>
    <!-- 背景特效层 -->
    <div class="perspective-grid"></div>
    <div class="floating-sun"></div>

    <!-- 主内容 -->
    <div class="scanlines relative z-10 flex min-h-screen flex-col">
      <AppHeader />
      <main class="flex-1">
        <NuxtRouteAnnouncer />
        <NuxtPage />
      </main>
      <AppFooter />
    </div>
  </UApp>
</template>
