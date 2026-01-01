<script setup lang="ts">
const links = [
  { label: '首页', to: '/', icon: 'i-lucide-home' },
  { label: '项目', to: '#projects', icon: 'i-lucide-folder-git-2' },
  { label: '关于', to: '#about', icon: 'i-lucide-user' },
];
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b-2 border-[#2D1B4E] bg-[rgba(9,0,20,0.85)] backdrop-blur-xl"
  >
    <UContainer class="flex h-16 items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center gap-3">
        <div
          class="flex h-10 w-10 items-center justify-center border-2 border-[#FF00FF] bg-[rgba(255,0,255,0.1)]"
        >
          <UIcon name="i-lucide-box" class="h-6 w-6 text-[#FF00FF]" />
        </div>
        <span
          class="font-heading gradient-text text-xl font-bold tracking-wider"
        >
          X-MONOREPO
        </span>
      </div>

      <!-- 导航链接 -->
      <nav class="hidden items-center gap-8 md:flex">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="font-mono text-sm uppercase tracking-widest text-[#E0E0E0] transition-all duration-200 hover:text-[#00FFFF] hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- 右侧按钮 -->
      <div class="flex items-center gap-3">
        <a
          href="https://github.com/XERA-2011/x-monorepo"
          target="_blank"
          class="flex h-10 w-10 items-center justify-center border-2 border-[#00FFFF] bg-transparent text-[#00FFFF] transition-all duration-200 hover:bg-[#00FFFF] hover:text-black hover:shadow-[0_0_20px_#00FFFF]"
        >
          <UIcon name="i-lucide-github" class="h-5 w-5" />
        </a>
      </div>
    </UContainer>
  </header>
</template>
