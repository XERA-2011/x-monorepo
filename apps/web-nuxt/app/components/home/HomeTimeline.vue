<script setup lang="ts">
const steps = [
  {
    number: 1,
    title: 'Connect your data',
    description:
      'Integrate with your existing tools in one click. We support over 50+ major platforms out of the box.',
    align: 'left',
  },
  {
    number: 2,
    title: 'Configure workflows',
    description:
      "Use our visual builder to set up your team's processes. No coding required, just drag and drop.",
    align: 'right',
  },
  {
    number: 3,
    title: 'Start collaborating',
    description:
      'Invite your team and start working together immediately. Track progress and measure results in real-time.',
    align: 'left',
  },
];
</script>

<template>
  <section
    class="relative overflow-hidden border-y border-[#2D1B4E] bg-[#1a103c]/30 py-20 sm:py-32"
  >
    <!-- 点阵背景 -->
    <div class="dot-grid absolute inset-0"></div>

    <div class="container relative z-10 mx-auto px-4">
      <!-- 标题 -->
      <div class="mb-12 text-center sm:mb-20">
        <h2
          class="font-heading text-3xl font-black text-[#00FFFF] drop-shadow-[0_0_10px_#00FFFF] sm:text-4xl md:text-5xl"
        >
          How Acme works
        </h2>
        <p class="mt-4 text-lg text-[#E0E0E0]/80 sm:text-xl">
          Get up and running in minutes, not days.
        </p>
      </div>

      <!-- 时间线 -->
      <div class="relative mx-auto max-w-4xl">
        <!-- 中间竖线 -->
        <div
          class="absolute top-0 bottom-0 left-[15px] w-1 bg-[#2D1B4E] md:left-1/2 md:-translate-x-1/2"
        ></div>

        <div class="space-y-16">
          <div
            v-for="(step, index) in steps"
            :key="step.number"
            class="relative flex flex-col gap-8 md:flex-row"
            :class="{ 'md:flex-row-reverse': step.align === 'left' }"
          >
            <!-- 时间线圆点 -->
            <div
              class="absolute left-0 z-10 mt-1 h-8 w-8 rounded-full border-4 border-[#FF00FF] bg-[#090014] shadow-[0_0_15px_#FF00FF] md:left-1/2 md:-translate-x-1/2"
            ></div>

            <!-- 内容卡片 -->
            <div class="ml-12 px-4 md:ml-0 md:w-1/2">
              <div
                class="relative border border-[#00FFFF] bg-black p-6"
                :class="step.align === 'left' ? 'md:text-left' : 'md:text-right'"
              >
                <!-- 角落装饰 -->
                <div
                  class="absolute top-0 left-0 h-2 w-2 border-l border-t border-[#00FFFF]"
                ></div>
                <div
                  class="absolute top-0 right-0 h-2 w-2 border-r border-t border-[#00FFFF]"
                ></div>
                <div
                  class="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#00FFFF]"
                ></div>
                <div
                  class="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-[#00FFFF]"
                ></div>

                <!-- 步骤编号 -->
                <span
                  class="absolute top-2 right-4 text-4xl font-black text-[#FF00FF] opacity-50"
                >
                  {{ step.number }}
                </span>

                <h3 class="font-heading mb-2 text-xl font-bold text-[#E0E0E0]">
                  {{ step.title }}
                </h3>
                <p class="text-[#E0E0E0]/60">{{ step.description }}</p>
              </div>
            </div>

            <!-- 占位 -->
            <div class="md:w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
