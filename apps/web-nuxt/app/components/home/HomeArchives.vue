<script setup lang="ts">
</script>

<template>
  <section class="container mx-auto px-4 py-20">
    <h2
      class="mb-8 text-center font-heading text-3xl font-black text-[#E0E0E0] sm:mb-12 sm:text-4xl"
    >
      DATA_<span class="text-[#FF9900]">ARCHIVES</span>
    </h2>
    <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div
        v-for="i in 3"
        :key="i"
        class="group cursor-pointer border border-[#2D1B4E] bg-black p-4 transition-all hover:border-[#00FFFF] hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]"
      >
        <div class="relative mb-4 aspect-video overflow-hidden bg-[#1a103c]">
          <!-- Placeholder Image or Icon -->
          <div class="absolute inset-0 flex items-center justify-center">
            <UIcon
              name="i-lucide-file-code"
              class="text-6xl text-[#FF00FF]/20"
            />
          </div>
          <div
            class="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FF00FF] to-[#00FFFF] opacity-20 mix-blend-overlay"
          ></div>
        </div>
        <div class="mb-2 text-xs uppercase tracking-widest text-[#FF00FF]">
          2026-01-0{{ i }}
        </div>
        <h3
          class="mb-2 text-lg font-bold text-[#E0E0E0] group-hover:text-[#00FFFF]"
        >
          System Update Log #{{ i }}
        </h3>
        <p class="text-sm text-[#E0E0E0]/60">
          Optimizing core subroutines and enhancing visual fidelity protocols.
        </p>
      </div>
    </div>
  </section>
</template>
