<script setup lang="ts">
</script>

<template>
  <section class="container mx-auto px-4 pt-32 pb-20 text-center">
    <div class="mx-auto max-w-5xl space-y-8">
      <!-- 版本标签 -->
      <div
        class="-skew-x-12 inline-block transform border border-[#00FFFF] bg-[#00FFFF]/10 px-4 py-1 text-sm tracking-[0.2em] text-[#00FFFF] backdrop-blur"
      >
        <span class="inline-block skew-x-12 transform">v2.0 SYSTEM ONLINE</span>
      </div>

      <!-- 主标题 -->
      <h1
        class="font-heading text-5xl font-black leading-tight tracking-tighter sm:text-6xl md:text-8xl"
      >
        <span
          class="block text-[#E0E0E0] drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        >
          Transform
        </span>
        <span
          class="gradient-text-animated block text-6xl drop-shadow-[0_0_30px_rgba(255,0,255,0.6)] sm:text-7xl md:text-9xl"
        >
          the way your team works
        </span>
      </h1>

      <!-- 副标题 -->
      <p
        class="mx-auto max-w-3xl text-lg leading-relaxed text-[#E0E0E0]/80 sm:text-xl md:text-2xl"
      >
        Acme Platform brings your team together with powerful tools designed to
        streamline workflows, boost productivity, and drive results.
      </p>

      <!-- CTA 按钮 -->
      <div
        class="flex flex-col justify-center gap-4 pt-8 sm:flex-row sm:gap-6"
      >
        <button
          class="-skew-x-12 inline-flex h-14 transform items-center justify-center whitespace-nowrap rounded-none border-2 border-[#00FFFF] bg-transparent px-10 font-mono text-lg uppercase tracking-wider text-[#00FFFF] transition-all duration-200 ease-linear hover:skew-x-0 hover:bg-[#00FFFF] hover:text-black hover:shadow-[0_0_20px_#00FFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FFFF] disabled:pointer-events-none disabled:opacity-50 sm:text-xl"
        >
          <span class="inline-block skew-x-12 transform">Start free trial</span>
        </button>
        <button
          class="inline-flex h-14 items-center justify-center whitespace-nowrap rounded-none border-2 border-[#FF00FF] bg-transparent px-10 font-mono text-lg uppercase tracking-wider text-[#FF00FF] transition-all duration-200 ease-linear hover:bg-[#FF00FF] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FFFF] disabled:pointer-events-none disabled:opacity-50 sm:text-xl"
        >
          <span class="inline-block skew-x-12 transform">Watch demo</span>
        </button>
      </div>

      <!-- 底部提示 -->
      <div
        class="animate-pulse pt-12 text-sm uppercase tracking-widest text-[#FF00FF]"
      >
        Join 50,000+ teams already using Acme
      </div>
    </div>
  </section>
</template>

