<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer
    class="relative z-10 mt-auto border-t-2 border-[#2D1B4E] bg-[rgba(9,0,20,0.9)] py-8"
  >
    <!-- 霓虹顶部装饰线 -->
    <div
      class="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#FF00FF] via-[#00FFFF] to-[#FF9900]"
    ></div>

    <UContainer
      class="flex flex-col items-center justify-between gap-6 md:flex-row"
    >
      <!-- 终端风格版权信息 -->
      <div class="font-mono text-sm text-[#E0E0E0]/70">
        <span class="text-[#FF00FF]">&gt;</span> © {{ year }} XERA
        <span class="animate-pulse text-[#00FFFF]">_</span>
      </div>

      <!-- 社交链接 -->
      <div class="flex items-center gap-4">
        <a
          href="https://github.com/XERA-2011/x-monorepo"
          target="_blank"
          class="flex h-10 w-10 items-center justify-center border border-[#FF00FF]/50 text-[#FF00FF] transition-all duration-200 hover:border-[#FF00FF] hover:bg-[#FF00FF]/10 hover:shadow-[0_0_15px_rgba(255,0,255,0.5)]"
        >
          <UIcon name="i-lucide-github" class="h-5 w-5" />
        </a>
        <a
          href="#"
          class="flex h-10 w-10 items-center justify-center border border-[#00FFFF]/50 text-[#00FFFF] transition-all duration-200 hover:border-[#00FFFF] hover:bg-[#00FFFF]/10 hover:shadow-[0_0_15px_rgba(0,255,255,0.5)]"
        >
          <UIcon name="i-lucide-twitter" class="h-5 w-5" />
        </a>
      </div>
    </UContainer>
  </footer>
</template>
