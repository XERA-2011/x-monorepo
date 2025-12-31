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
  <div class="space-y-24 py-12">
    <!-- Hero Section -->
    <section class="relative overflow-hidden py-24 sm:py-32">
      <UContainer class="relative z-10 text-center">
        <div class="mb-8 flex justify-center">
          <div
            class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 transition-all hover:ring-gray-900/20 dark:text-gray-400 dark:ring-gray-100/10 dark:hover:ring-gray-100/20"
          >
            构建现代 Web 应用
            <span class="text-primary-600 dark:text-primary-400 font-semibold"
              >了解更多 <span aria-hidden="true">&rarr;</span></span
            >
          </div>
        </div>
        <h1
          class="mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-5xl font-bold tracking-tight text-gray-900 text-transparent sm:text-7xl dark:from-white dark:via-gray-200 dark:to-gray-400 dark:text-white"
        >
          打造极致的
          <span class="text-primary-500 dark:text-primary-400"
            >全栈开发体验</span
          >
        </h1>
        <p
          class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300"
        >
          探索 Nuxt 4、Vue 3 和 TypeScript 的无限可能。从 Monorepo 架构到高性能
          UI 组件，我们致力于提供最佳的工程化解决方案。
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <UButton
            size="xl"
            to="#projects"
            trailing-icon="i-lucide-arrow-right"
            color="primary"
          >
            查看项目
          </UButton>
          <UButton
            size="xl"
            variant="ghost"
            to="https://github.com/XERA-2011/x-monorepo"
            target="_blank"
            leading-icon="i-lucide-github"
            color="neutral"
          >
            GitHub 源码
          </UButton>
        </div>
      </UContainer>

      <!-- Background decoration -->
      <div
        class="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          class="from-primary-200 relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr to-cyan-200 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style="
            clip-path: polygon(
              74.1% 44.1%,
              100% 61.6%,
              97.5% 26.9%,
              85.5% 0.1%,
              80.7% 2%,
              72.5% 32.5%,
              60.2% 62.4%,
              52.4% 68.1%,
              47.5% 58.3%,
              45.2% 34.5%,
              27.5% 76.7%,
              0.1% 64.9%,
              17.9% 100%,
              27.6% 76.8%,
              76.1% 97.7%,
              74.1% 44.1%
            );
          "
        ></div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="about" class="bg-gray-50/50 py-12 dark:bg-gray-900/50">
      <UContainer>
        <div class="mx-auto mb-12 max-w-2xl text-center">
          <h2
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
          >
            技术栈
          </h2>
          <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
            熟练掌握现代前端工程化所需的各项技能
          </p>
        </div>
        <div class="flex flex-wrap justify-center gap-4">
          <UBadge
            v-for="skill in skills"
            :key="skill"
            size="lg"
            variant="subtle"
            class="px-4 py-2"
          >
            {{ skill }}
          </UBadge>
        </div>
      </UContainer>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="py-12">
      <UContainer>
        <div class="mx-auto mb-16 max-w-2xl text-center">
          <h2
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
          >
            精选项目
          </h2>
          <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
            查看我们正在构建的一些开源项目和实验性作品
          </p>
        </div>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <UCard
            v-for="project in projects"
            :key="project.title"
            class="hover:ring-primary-500/50 group transition-all duration-300 hover:ring-2"
          >
            <template #header>
              <div class="flex items-center gap-4">
                <div
                  class="bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400 group-hover:bg-primary-100 dark:group-hover:bg-primary-900 rounded-lg p-2 transition-colors"
                >
                  <UIcon :name="project.icon" class="h-6 w-6" />
                </div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {{ project.title }}
                </h3>
              </div>
            </template>

            <p class="min-h-[4.5rem] text-gray-600 dark:text-gray-300">
              {{ project.description }}
            </p>

            <template #footer>
              <UButton
                :to="project.to"
                variant="ghost"
                color="neutral"
                trailing-icon="i-lucide-arrow-right"
                block
                class="transition-transform group-hover:translate-x-1"
              >
                查看详情
              </UButton>
            </template>
          </UCard>
        </div>
      </UContainer>
    </section>
  </div>
</template>
