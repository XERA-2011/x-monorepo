<script setup lang="ts"></script>

<template>
  <section class="container mx-auto px-4 py-20">
    <div
      class="relative border-2 border-[#00FFFF] bg-black/80 p-1 shadow-[0_0_20px_rgba(0,255,255,0.2)]"
    >
      <div
        class="flex items-center justify-between border-b border-[#00FFFF] bg-[#00FFFF]/10 px-4 py-2"
      >
        <span class="text-sm font-bold tracking-wider text-[#00FFFF] uppercase"
          >TERMINAL_VIEW: PRODUCT_CORE</span
        >
        <div class="flex gap-2">
          <div class="h-3 w-3 rounded-full bg-[#FF00FF]"></div>
          <div class="h-3 w-3 rounded-full bg-[#00FFFF]"></div>
          <div class="h-3 w-3 rounded-full bg-[#FF9900]"></div>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-12 p-8 md:grid-cols-2">
        <div class="flex flex-col justify-center space-y-6">
          <h2
            class="font-heading text-3xl font-black text-[#E0E0E0] md:text-5xl"
          >
            Experience the future of team collaboration with our unified,
            intelligent platform today.
          </h2>
          <div class="space-y-4 text-lg text-[#E0E0E0]/70">
            <p>
              &gt; Acme Platform centralizes your entire workflow into one
              intuitive interface, eliminating the need for disjointed tools. By
              harnessing the power of real-time data and smart automation, we
              empower your team to focus on high-impact innovation.
            </p>
            <p>
              &gt; Designed with scalability in mind, our infrastructure adapts
              seamlessly to your growing needs, ensuring performance never
              falters. Join a community of forward-thinking organizations that
              have redefined productivity and achieved unparalleled success with
              our comprehensive solution.
            </p>
          </div>
          <button
            class="skew-button self-start border-2 border-[#FF00FF] bg-[#FF00FF] px-8 py-3 text-lg text-white transition-all duration-200 hover:scale-105 hover:opacity-80"
          >
            <span class="font-mono tracking-wider uppercase"
              >INITIATE_SEQUENCE</span
            >
          </button>
        </div>
        <div
          class="relative aspect-square overflow-hidden border border-[#2D1B4E]"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-[#FF00FF]/20 to-[#00FFFF]/20"
          ></div>
          <div class="flex h-full items-center justify-center">
            <UIcon
              name="i-lucide-terminal"
              class="h-32 w-32 animate-pulse text-[#00FFFF]"
            />
          </div>
          <div
            class="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,20,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>
