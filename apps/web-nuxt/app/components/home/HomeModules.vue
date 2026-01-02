<script setup lang="ts">
</script>

<template>
  <section class="container mx-auto px-4 py-20 sm:py-32">
    <div class="mb-12 text-center sm:mb-20">
      <h2 class="mb-4 font-heading text-3xl font-black text-[#E0E0E0] sm:mb-6 sm:text-5xl md:text-6xl">
        SYSTEM <span class="text-[#FF00FF]">MODULES</span>
      </h2>
      <p class="mx-auto max-w-2xl text-lg text-[#E0E0E0]/70 sm:text-xl">
        Next-generation capabilities for the digital frontier.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div
        v-for="(module, index) in [
          {
            title: 'Real-time Collaboration',
            desc: 'Work together seamlessly with your team. Share updates, communicate instantly.',
            icon: 'i-lucide-zap',
          },
          {
            title: 'Smart Automation',
            desc: 'Automate repetitive tasks and workflows. Save hours every week.',
            icon: 'i-lucide-bot',
          },
          {
            title: 'Advanced Analytics',
            desc: 'Get actionable insights with powerful reporting tools.',
            icon: 'i-lucide-bar-chart-3',
          },
          {
            title: 'Seamless Integrations',
            desc: 'Connect with your favorite tools. Works perfectly with your existing workflow.',
            icon: 'i-lucide-puzzle',
          },
          {
            title: 'Enterprise Security',
            desc: 'Bank-level encryption and security protocols. Your data is protected.',
            icon: 'i-lucide-shield-check',
          },
          {
            title: 'Global Infrastructure',
            desc: 'Deploy instantly to 35+ regions worldwide. Ensure low latency.',
            icon: 'i-lucide-globe',
          },
        ]"
        :key="index"
        class="group border-t-2 border-t-[#00FFFF] border-r border-b border-l border-r-[#FF00FF]/30 border-b-[#FF00FF]/30 border-l-[#FF00FF]/30 bg-[#1a103c]/80 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-[#00FFFF] hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]"
      >
        <div class="flex flex-col space-y-1.5 p-6">
          <div
            class="mb-6 flex h-16 w-16 rotate-45 transform items-center justify-center border-2 border-[#FF00FF] bg-[#FF00FF]/10 transition-transform duration-500 group-hover:rotate-90"
          >
            <div
              class="-rotate-45 transform transition-transform duration-500 group-hover:-rotate-90"
            >
              <UIcon :name="module.icon" class="h-8 w-8 text-[#FF00FF]" />
            </div>
          </div>
          <h3
            class="font-heading text-2xl font-semibold leading-none tracking-tight text-[#00FFFF] drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]"
          >
            {{ module.title }}
          </h3>
        </div>
        <div class="p-6 pt-0">
          <p class="font-mono text-lg text-[#E0E0E0]/70">
            {{ module.desc }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
