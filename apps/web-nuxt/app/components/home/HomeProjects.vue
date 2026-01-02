<script setup lang="ts">
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
</script>

<template>
  <section id="projects" class="relative py-20 sm:py-32">
    <UContainer>
      <!-- 区块标题 -->
      <div class="mx-auto mb-16 max-w-2xl text-center">
        <h2
          class="font-heading mb-4 text-3xl font-bold tracking-wider text-[#00FFFF] uppercase drop-shadow-[0_0_10px_rgba(0,255,255,0.8)] sm:text-4xl lg:text-5xl"
        >
          精选项目
        </h2>
        <p class="font-mono text-[#E0E0E0]/50">
          <span class="text-[#FF9900]">&gt;</span>
          查看我们正在构建的一些开源项目和实验性作品
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
              <UIcon :name="project.icon" class="h-6 w-6 text-[#FF00FF]" />
            </div>
            <h3
              class="font-heading text-xl font-semibold tracking-wider text-[#00FFFF] uppercase drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]"
            >
              {{ project.title }}
            </h3>
          </div>

          <!-- 描述 -->
          <p
            class="mb-6 min-h-[4.5rem] font-mono text-sm leading-relaxed text-[#E0E0E0]/70"
          >
            {{ project.description }}
          </p>

          <!-- 查看详情链接 -->
          <a
            :href="project.to"
            class="neon-link group/link flex items-center gap-2 font-mono text-sm tracking-widest uppercase"
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
</template>
