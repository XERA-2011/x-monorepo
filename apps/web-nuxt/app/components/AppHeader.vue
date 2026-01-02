<script setup lang="ts">
const links = [
  { label: '首页', to: '/', icon: 'i-lucide-home' },
  { label: '项目', to: '#projects', icon: 'i-lucide-folder-git-2' },
  { label: '关于', to: '#about', icon: 'i-lucide-user' },
];
</script>

<template>
  <header class="sticky top-0 z-50 bg-[rgba(9,0,20,0.85)] backdrop-blur-xl">
    <!-- 霓虹底部边框 -->
    <div
      class="absolute right-0 bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#FF00FF] via-[#00FFFF] to-[#FF9900] opacity-80 shadow-[0_0_15px_rgba(0,255,255,0.5)]"
    ></div>

    <UContainer class="flex h-20 items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="group flex items-center gap-4">
        <div
          class="skew-button flex h-10 w-10 items-center justify-center border-2 border-[#FF00FF] bg-[rgba(255,0,255,0.1)] transition-all duration-300 group-hover:border-[#00FFFF] group-hover:bg-[rgba(0,255,255,0.1)] group-hover:shadow-[0_0_20px_#FF00FF]"
        >
          <UIcon
            name="i-lucide-box"
            class="h-6 w-6 text-[#FF00FF] transition-colors group-hover:text-[#00FFFF]"
          />
        </div>
        <div class="flex flex-col">
          <span
            class="font-heading gradient-text-animated text-2xl font-black tracking-widest drop-shadow-[0_0_5px_rgba(255,0,255,0.5)]"
          >
            X-MONOREPO
          </span>
          <div class="flex items-center gap-2">
            <span class="relative flex h-2 w-2">
              <span
                class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00FFFF] opacity-75"
              ></span>
              <span
                class="relative inline-flex h-2 w-2 rounded-full bg-[#00FFFF]"
              ></span>
            </span>
            <span
              class="font-mono text-[10px] tracking-[0.3em] text-[#00FFFF] uppercase opacity-90"
            >
              System Online
            </span>
          </div>
        </div>
      </NuxtLink>

      <!-- 导航链接 -->
      <nav class="hidden items-center gap-1 md:flex">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="group relative px-6 py-2"
        >
          <span
            class="relative z-10 font-mono text-sm font-bold tracking-widest text-[#E0E0E0] uppercase transition-colors duration-300 group-hover:text-[#090014]"
          >
            {{ link.label }}
          </span>
          <!-- 悬停背景块 -->
          <div
            class="absolute inset-0 scale-y-0 -skew-x-12 bg-[#00FFFF] transition-transform duration-300 group-hover:scale-y-100 group-hover:shadow-[0_0_15px_#00FFFF]"
          ></div>
        </NuxtLink>
      </nav>

      <!-- 右侧按钮 -->
      <div class="flex items-center gap-4">
        <!-- 登录按钮 (模拟) -->
        <button
          class="group relative hidden overflow-hidden border border-[#FF00FF] px-6 py-2 sm:block"
        >
          <span
            class="relative z-10 font-mono text-sm font-bold tracking-widest text-[#FF00FF] uppercase transition-colors group-hover:text-white"
          >
            Login
          </span>
          <div
            class="absolute inset-0 -translate-x-full bg-[#FF00FF] transition-transform duration-300 group-hover:translate-x-0"
          ></div>
        </button>

        <a
          href="https://github.com/XERA-2011/x-monorepo"
          target="_blank"
          class="group relative flex h-10 w-10 items-center justify-center"
        >
          <div
            class="absolute inset-0 skew-x-12 border-2 border-[#00FFFF] bg-transparent transition-all duration-300 group-hover:bg-[#00FFFF] group-hover:shadow-[0_0_20px_#00FFFF]"
          ></div>
          <UIcon
            name="i-lucide-github"
            class="relative z-10 h-5 w-5 text-[#00FFFF] transition-colors group-hover:text-[#090014]"
          />
        </a>
      </div>
    </UContainer>
  </header>
</template>
