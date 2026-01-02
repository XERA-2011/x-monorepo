<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer
    class="relative z-10 mt-auto overflow-hidden border-t-2 border-[#2D1B4E] bg-[rgba(9,0,20,0.9)] py-12"
  >
    <!-- 透视网格装饰背景 -->
    <div
      class="pointer-events-none absolute inset-0 opacity-20"
      style="
        background-image: linear-gradient(#2d1b4e 1px, transparent 1px),
          linear-gradient(90deg, #2d1b4e 1px, transparent 1px);
        background-size: 40px 40px;
        transform: perspective(300px) rotateX(40deg) scale(2);
        transform-origin: center bottom;
      "
    ></div>

    <!-- 霓虹顶部装饰线 -->
    <div class="divider-neon absolute inset-x-0 top-0"></div>

    <UContainer class="relative z-10">
      <!-- 主内容区 -->
      <div class="mb-12 grid grid-cols-2 gap-12 md:grid-cols-4">
        <!-- Logo 和简介 -->
        <div class="col-span-2 md:col-span-1">
          <div class="mb-6 flex items-center gap-2">
            <div
              class="skew-button h-8 w-8 bg-[#FF00FF] flex items-center justify-center"
            >
              <UIcon name="i-lucide-box" class="h-5 w-5 text-black" />
            </div>
            <span class="font-heading font-black text-xl tracking-widest text-[#E0E0E0]">
              X-MONOREPO
            </span>
          </div>
          <p class="text-[#E0E0E0]/50 text-sm">
            现代化 Monorepo 全栈开发模板
          </p>
        </div>

        <!-- 产品链接 -->
        <div>
          <h4 class="mb-6 font-bold text-[#00FFFF] text-sm uppercase tracking-wider">
            产品
          </h4>
          <ul class="space-y-3">
            <li>
              <a
                href="#"
                class="text-[#E0E0E0]/60 text-sm transition-colors hover:text-[#FF00FF] hover:underline decoration-2 decoration-[#FF00FF] underline-offset-4"
              >
                功能
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-[#E0E0E0]/60 text-sm transition-colors hover:text-[#FF00FF] hover:underline decoration-2 decoration-[#FF00FF] underline-offset-4"
              >
                模板
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-[#E0E0E0]/60 text-sm transition-colors hover:text-[#FF00FF] hover:underline decoration-2 decoration-[#FF00FF] underline-offset-4"
              >
                文档
              </a>
            </li>
          </ul>
        </div>

        <!-- 资源链接 -->
        <div>
          <h4 class="mb-6 font-bold text-[#00FFFF] text-sm uppercase tracking-wider">
            资源
          </h4>
          <ul class="space-y-3">
            <li>
              <a
                href="https://github.com/XERA-2011/x-monorepo"
                target="_blank"
                class="text-[#E0E0E0]/60 text-sm transition-colors hover:text-[#FF00FF] hover:underline decoration-2 decoration-[#FF00FF] underline-offset-4"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-[#E0E0E0]/60 text-sm transition-colors hover:text-[#FF00FF] hover:underline decoration-2 decoration-[#FF00FF] underline-offset-4"
              >
                教程
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-[#E0E0E0]/60 text-sm transition-colors hover:text-[#FF00FF] hover:underline decoration-2 decoration-[#FF00FF] underline-offset-4"
              >
                API
              </a>
            </li>
          </ul>
        </div>

        <!-- 社区链接 -->
        <div>
          <h4 class="mb-6 font-bold text-[#00FFFF] text-sm uppercase tracking-wider">
            社区
          </h4>
          <ul class="space-y-3">
            <li>
              <a
                href="#"
                class="text-[#E0E0E0]/60 text-sm transition-colors hover:text-[#FF00FF] hover:underline decoration-2 decoration-[#FF00FF] underline-offset-4"
              >
                讨论
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-[#E0E0E0]/60 text-sm transition-colors hover:text-[#FF00FF] hover:underline decoration-2 decoration-[#FF00FF] underline-offset-4"
              >
                贡献
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-[#E0E0E0]/60 text-sm transition-colors hover:text-[#FF00FF] hover:underline decoration-2 decoration-[#FF00FF] underline-offset-4"
              >
                赞助
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- 底部栏 -->
      <div
        class="flex flex-col items-center justify-between gap-4 border-t-2 border-[#2D1B4E] pt-8 md:flex-row"
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
      </div>
    </UContainer>
  </footer>
</template>
