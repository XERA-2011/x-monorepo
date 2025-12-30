<template>
  <div class="min-h-screen flex flex-col">
    <!-- 顶部导航 -->
    <header class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <NuxtLink to="/" class="text-xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
            Nuxt Web
          </NuxtLink>
          <nav class="flex items-center gap-6">
            <NuxtLink 
              to="/" 
              class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              active-class="text-primary-600 dark:text-primary-400"
            >
              首页
            </NuxtLink>
            <NuxtLink 
              to="/about" 
              class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              active-class="text-primary-600 dark:text-primary-400"
            >
              关于
            </NuxtLink>
            <UButton
              :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
              color="gray"
              variant="ghost"
              @click="isDark = !isDark"
            />
          </nav>
        </div>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- 底部 -->
    <footer class="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>&copy; {{ new Date().getFullYear() }} Nuxt Web. Built with Nuxt 4 & Nuxt UI.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (v) => colorMode.preference = v ? 'dark' : 'light'
})
</script>
