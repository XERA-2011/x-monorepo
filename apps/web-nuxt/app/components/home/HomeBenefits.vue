<script setup lang="ts">
const benefits = [
  {
    title: 'Save time and resources',
    description:
      'Reduce manual work by up to 60% with intelligent automation and streamlined processes.',
  },
  {
    title: 'Improve team productivity',
    description:
      'Give your team the tools they need to collaborate effectively and deliver results faster.',
  },
  {
    title: 'Scale with confidence',
    description:
      'Built to grow with your business. From startups to enterprises, Acme adapts to your needs.',
  },
  {
    title: 'Stay organized',
    description:
      'Keep all your work in one place. No more scattered tools, lost files, or missed deadlines.',
  },
];
</script>

<template>
  <section class="container mx-auto px-4 py-32">
    <div
      class="mx-auto max-w-6xl border-2 border-[#E0E0E0]/20 bg-[#1a103c]/90 backdrop-blur"
    >
      <div
        class="flex items-center justify-between border-b-2 border-[#E0E0E0]/20 bg-[#E0E0E0]/10 px-4 py-2"
      >
        <span class="text-sm font-bold text-[#E0E0E0]">C:\SYSTEM\BENEFITS</span>
        <div class="h-4 w-4 border border-[#E0E0E0]"></div>
      </div>
      <div class="grid grid-cols-1 gap-8 p-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(benefit, index) in benefits"
          :key="index"
          class="group flex cursor-pointer flex-col items-center gap-4 p-4 hover:bg-[#FF00FF]/10"
        >
          <UIcon
            name="i-lucide-file-text"
            class="h-16 w-16 text-[#FF00FF] transition-transform group-hover:scale-110"
          />
          <div class="text-center">
            <h3
              class="font-bold text-[#E0E0E0] underline decoration-[#00FFFF] decoration-2 underline-offset-4"
            >
              {{ benefit.title }}
            </h3>
            <p class="mt-2 text-sm text-[#E0E0E0]/60">
              {{ benefit.description }}
            </p>
          </div>
        </div>
      </div>
      <div
        class="flex justify-between border-t-2 border-[#E0E0E0]/20 bg-[#090014] px-4 py-1 text-xs text-[#E0E0E0]/50"
      >
        <span>{{ benefits.length }} OBJECTS</span>
        <span>0 BYTES FREE</span>
      </div>
    </div>
  </section>
</template>
