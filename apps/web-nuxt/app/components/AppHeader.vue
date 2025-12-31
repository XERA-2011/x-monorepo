<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  },
});

const links = [
  { label: '首页', to: '/', icon: 'i-lucide-home' },
  { label: '项目', to: '#projects', icon: 'i-lucide-folder-git-2' },
  { label: '关于', to: '#about', icon: 'i-lucide-user' },
];
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-gray-200 bg-white/75 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/75"
  >
    <UContainer class="flex h-16 items-center justify-between">
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-box" class="text-primary-500 h-8 w-8" />
        <span
          class="from-primary-500 bg-gradient-to-r to-cyan-500 bg-clip-text text-xl font-bold text-transparent"
        >
          X-MONOREPO
        </span>
      </div>

      <nav class="hidden items-center gap-6 md:flex">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="hover:text-primary-500 dark:hover:text-primary-400 text-sm font-medium text-gray-600 transition-colors dark:text-gray-300"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
        <UButton
          to="https://github.com/XERA-2011/x-monorepo"
          target="_blank"
          color="neutral"
          variant="ghost"
          icon="i-lucide-github"
        />
        <ClientOnly>
          <UButton
            :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
            color="neutral"
            variant="ghost"
            aria-label="Theme"
            @click="isDark = !isDark"
          />
          <template #fallback>
            <div class="h-8 w-8"></div>
          </template>
        </ClientOnly>
      </div>
    </UContainer>
  </header>
</template>
