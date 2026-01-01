<script setup lang="ts">
definePageMeta({
  title: '首页',
});

const projects = [
  {
    title: 'X-Monorepo',
    description:
      '一个基于 Vue 3 和 Nuxt 4 的全栈 Monorepo 模板，集成了现代开发工具链。',
    icon: 'i-lucide-box',
    to: 'https://github.com/XERA-2011/x-monorepo',
  },
  {
    title: 'Web-Nuxt',
    description: 'Nuxt 4 个人网站示例，展示了最新的 Nuxt UI 组件和响应式设计。',
    icon: 'i-lucide-layout',
    to: '#',
  },
  {
    title: 'Admin Dashboard',
    description: '功能强大的后台管理系统模版，提供丰富的业务组件和权限管理。',
    icon: 'i-lucide-layout-dashboard',
    to: '#',
  },
];

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
  <div class="relative z-10 space-y-0">
    <!-- Hero Section -->
    <section class="relative overflow-hidden py-24 sm:py-32">
      <UContainer class="relative z-10 text-center">
        <!-- 标语徽章 -->
        <div class="mb-8 flex justify-center">
          <div
            class="skew-button border-2 border-[#FF00FF] bg-[rgba(255,0,255,0.1)] px-6 py-2"
          >
            <span class="font-mono text-sm uppercase tracking-widest text-[#FF00FF]">
              构建现代 Web 应用
            </span>
          </div>
        </div>

        <!-- 主标题 -->
        <h1
          class="font-heading mb-6 text-5xl font-black uppercase leading-tight tracking-tight sm:text-7xl lg:text-8xl"
        >
          <span class="block text-[#E0E0E0] drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            打造极致的
          </span>
          <span
            class="gradient-text block drop-shadow-[0_0_40px_rgba(255,0,255,0.6)]"
          >
            全栈开发体验
          </span>
        </h1>

        <!-- 副标题 -->
        <p
          class="font-mono mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[#E0E0E0]/70 sm:text-xl"
        >
          <span class="text-[#00FFFF]">&gt;</span> 探索 Nuxt 4、Vue 3 和
          TypeScript 的无限可能。<br />
          <span class="text-[#FF00FF]">&gt;</span>
          从 Monorepo 架构到高性能 UI 组件，<br />
          <span class="text-[#FF9900]">&gt;</span> 我们致力于提供最佳的工程化解决方案。
        </p>

        <!-- CTA 按钮 -->
        <div class="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <a
            href="#projects"
            class="skew-button group flex items-center gap-3 border-2 border-[#00FFFF] bg-transparent px-8 py-4 text-[#00FFFF] transition-all duration-200 hover:bg-[#00FFFF] hover:text-black hover:shadow-[0_0_30px_#00FFFF]"
          >
            <span class="font-mono text-sm uppercase tracking-widest">查看项目</span>
            <UIcon
              name="i-lucide-arrow-right"
              class="h-5 w-5 transition-transform group-hover:translate-x-1"
            />
          </a>
          <a
            href="https://github.com/XERA-2011/x-monorepo"
            target="_blank"
            class="skew-button group flex items-center gap-3 border-2 border-[#FF00FF] bg-[#FF00FF] px-8 py-4 text-white transition-all duration-200 hover:scale-105 hover:opacity-90"
          >
            <UIcon name="i-lucide-github" class="h-5 w-5" />
            <span class="font-mono text-sm uppercase tracking-widest">GitHub 源码</span>
          </a>
        </div>
      </UContainer>
    </section>

    <!-- Skills Section -->
    <section id="about" class="relative py-20 sm:py-32">
      <!-- 点阵背景 -->
      <div
        class="absolute inset-0 opacity-5"
        style="background-image: radial-gradient(#FF00FF 1px, transparent 1px); background-size: 20px 20px;"
      ></div>

      <UContainer class="relative z-10">
        <!-- 终端窗口 -->
        <div class="terminal-window mx-auto max-w-4xl">
          <!-- 标题栏 -->
          <div class="terminal-titlebar">
            <div class="terminal-dot terminal-dot--magenta"></div>
            <div class="terminal-dot terminal-dot--cyan"></div>
            <div class="terminal-dot terminal-dot--orange"></div>
            <span class="font-mono ml-4 text-sm uppercase tracking-wider text-[#00FFFF]">
              SKILLS.EXE
            </span>
          </div>

          <!-- 内容区 -->
          <div class="p-8">
            <h2
              class="font-heading mb-2 text-center text-3xl font-bold uppercase tracking-wider text-[#00FFFF] drop-shadow-[0_0_10px_rgba(0,255,255,0.8)] sm:text-4xl"
            >
              技术栈
            </h2>
            <p class="font-mono mb-8 text-center text-[#E0E0E0]/50">
              <span class="text-[#FF00FF]">//</span> 熟练掌握现代前端工程化所需的各项技能
            </p>

            <!-- 技能标签 -->
            <div class="flex flex-wrap justify-center gap-4">
              <div
                v-for="skill in skills"
                :key="skill"
                class="skew-button border-2 border-[#FF00FF]/50 bg-[rgba(255,0,255,0.1)] px-5 py-2 transition-all duration-200 hover:border-[#FF00FF] hover:shadow-[0_0_15px_rgba(255,0,255,0.5)]"
              >
                <span class="font-mono text-sm uppercase tracking-wider text-[#E0E0E0]">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="relative py-20 sm:py-32">
      <UContainer>
        <!-- 区块标题 -->
        <div class="mx-auto mb-16 max-w-2xl text-center">
          <h2
            class="font-heading mb-4 text-3xl font-bold uppercase tracking-wider text-[#00FFFF] drop-shadow-[0_0_10px_rgba(0,255,255,0.8)] sm:text-4xl lg:text-5xl"
          >
            精选项目
          </h2>
          <p class="font-mono text-[#E0E0E0]/50">
            <span class="text-[#FF9900]">&gt;</span> 查看我们正在构建的一些开源项目和实验性作品
          </p>
        </div>

        <!-- 项目卡片网格 -->
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="project in projects"
            :key="project.title"
            class="neon-card group p-6"
          >
            <!-- 卡片头部 -->
            <div class="mb-6 flex items-center gap-4">
              <!-- 菱形图标容器 -->
              <div
                class="diamond-icon flex h-14 w-14 items-center justify-center border-2 border-[#FF00FF] bg-[rgba(255,0,255,0.1)]"
              >
                <UIcon
                  :name="project.icon"
                  class="h-6 w-6 text-[#FF00FF]"
                />
              </div>
              <h3
                class="font-heading text-xl font-semibold uppercase tracking-wider text-[#00FFFF] drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]"
              >
                {{ project.title }}
              </h3>
            </div>

            <!-- 描述 -->
            <p class="font-mono mb-6 min-h-[4.5rem] text-sm leading-relaxed text-[#E0E0E0]/70">
              {{ project.description }}
            </p>

            <!-- 查看详情链接 -->
            <a
              :href="project.to"
              class="neon-link font-mono group/link flex items-center gap-2 text-sm uppercase tracking-widest"
            >
              <span class="text-[#FF00FF]">&gt;</span>
              查看详情
              <UIcon
                name="i-lucide-arrow-right"
                class="h-4 w-4 transition-transform group-hover/link:translate-x-2"
              />
            </a>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- CTA Section -->
    <section class="relative py-20 sm:py-32">
      <UContainer>
        <div
          class="terminal-window mx-auto max-w-4xl p-8 text-center sm:p-12"
        >
          <h2
            class="font-heading mb-6 text-3xl font-bold uppercase tracking-wider sm:text-4xl"
          >
            <span class="gradient-text drop-shadow-[0_0_30px_rgba(255,0,255,0.6)]">
              准备好开始了吗？
            </span>
          </h2>
          <p class="font-mono mb-8 text-lg text-[#E0E0E0]/70">
            <span class="text-[#00FFFF]">&gt;</span> 探索代码库，开启你的全栈开发之旅
          </p>
          <a
            href="https://github.com/XERA-2011/x-monorepo"
            target="_blank"
            class="skew-button inline-flex items-center gap-3 border-2 border-[#00FFFF] bg-[#00FFFF] px-10 py-4 text-black transition-all duration-200 hover:shadow-[0_0_40px_#00FFFF]"
          >
            <UIcon name="i-lucide-github" class="h-6 w-6" />
            <span class="font-mono text-sm font-bold uppercase tracking-widest">
              立即开始
            </span>
          </a>
        </div>
      </UContainer>
    </section>
  </div>
</template>
