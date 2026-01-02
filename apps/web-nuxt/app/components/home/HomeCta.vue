<script setup lang="ts">
</script>

<template>
  <section class="relative py-20 sm:py-32">
    <UContainer>
      <div class="terminal-window mx-auto max-w-4xl p-8 text-center sm:p-12">
        <h2
          class="font-heading mb-6 text-3xl font-bold tracking-wider uppercase sm:text-4xl"
        >
          <span
            class="gradient-text drop-shadow-[0_0_30px_rgba(255,0,255,0.6)]"
          >
            准备好开始了吗？
          </span>
        </h2>
        <p class="mb-8 font-mono text-lg text-[#E0E0E0]/70">
          <span class="text-[#00FFFF]">&gt;</span>
          探索代码库，开启你的全栈开发之旅
        </p>
        <a
          href="https://github.com/XERA-2011/x-monorepo"
          target="_blank"
          class="skew-button inline-flex items-center gap-3 border-2 border-[#00FFFF] bg-[#00FFFF] px-10 py-4 text-black transition-all duration-200 hover:shadow-[0_0_40px_#00FFFF]"
        >
          <UIcon name="i-lucide-github" class="h-6 w-6" />
          <span class="font-mono text-sm font-bold tracking-widest uppercase">
            立即开始
          </span>
        </a>
      </div>
    </UContainer>
  </section>
</template>
