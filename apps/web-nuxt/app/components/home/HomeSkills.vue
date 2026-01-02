<script setup lang="ts">
const skills = [
  'Vue 3',
  'Nuxt 4',
  'TypeScript',
  'Tailwind CSS',
  'Vite',
  'TurboRepo',
  'Node.js',
  'PostgreSQL',
];
</script>

<template>
  <section id="about" class="relative py-20 sm:py-32">
    <!-- 点阵背景 -->
    <div
      class="absolute inset-0 opacity-5"
      style="
        background-image: radial-gradient(#f0f 1px, transparent 1px);
        background-size: 20px 20px;
      "
    ></div>

    <UContainer class="relative z-10">
      <!-- 终端窗口 -->
      <div class="terminal-window mx-auto max-w-4xl">
        <!-- 标题栏 -->
        <div class="terminal-titlebar">
          <div class="terminal-dot terminal-dot--magenta"></div>
          <div class="terminal-dot terminal-dot--cyan"></div>
          <div class="terminal-dot terminal-dot--orange"></div>
          <span
            class="ml-4 font-mono text-sm tracking-wider text-[#00FFFF] uppercase"
          >
            SKILLS.EXE
          </span>
        </div>

        <!-- 内容区 -->
        <div class="p-8">
          <h2
            class="font-heading mb-2 text-center text-3xl font-bold tracking-wider text-[#00FFFF] uppercase drop-shadow-[0_0_10px_rgba(0,255,255,0.8)] sm:text-4xl"
          >
            技术栈
          </h2>
          <p class="mb-8 text-center font-mono text-[#E0E0E0]/50">
            <span class="text-[#FF00FF]">//</span>
            熟练掌握现代前端工程化所需的各项技能
          </p>

          <!-- 技能标签 -->
          <div class="flex flex-wrap justify-center gap-4">
            <div
              v-for="skill in skills"
              :key="skill"
              class="skew-button border-2 border-[#FF00FF]/50 bg-[rgba(255,0,255,0.1)] px-5 py-2 transition-all duration-200 hover:border-[#FF00FF] hover:shadow-[0_0_15px_rgba(255,0,255,0.5)]"
            >
              <span
                class="font-mono text-sm tracking-wider text-[#E0E0E0] uppercase"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
