<script setup lang="ts"></script>

<template>
  <section class="py-20 sm:py-32">
    <div class="container mx-auto px-4">
      <div class="mb-12 text-center sm:mb-20">
        <h2
          class="font-heading mb-4 text-3xl font-black text-[#E0E0E0] sm:text-4xl md:text-5xl"
        >
          UNLOCK <span class="text-[#FF9900]">POWER</span>
        </h2>
        <p class="text-lg text-[#E0E0E0]/70 sm:text-xl">
          Choose the plan that's right for your team
        </p>
      </div>

      <div
        class="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-3"
      >
        <!-- Starter Plan -->
        <div
          class="group relative z-0 p-1 opacity-90 transition-transform duration-300 hover:z-10 hover:scale-105 hover:opacity-100"
        >
          <div
            class="absolute inset-0 bg-gradient-to-b from-[#2D1B4E] to-transparent opacity-50 blur-md"
          ></div>
          <div
            class="relative flex h-full flex-col border-2 border-[#2D1B4E] bg-[#090014] p-8 transition-colors duration-300 group-hover:border-[#00FFFF] group-hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]"
          >
            <h3 class="font-heading mb-2 text-2xl font-bold text-[#00FFFF]">
              Starter
            </h3>
            <div class="mb-6 text-4xl font-black text-[#E0E0E0]">
              USD29<span class="text-lg font-normal text-[#E0E0E0]/50"
                >/month</span
              >
            </div>
            <p class="mb-8 min-h-[3rem] text-[#E0E0E0]/60">
              Perfect for small teams just getting started
            </p>
            <ul class="mb-8 flex-1 space-y-4">
              <li
                class="flex items-start gap-3 text-sm text-[#E0E0E0]/80"
                v-for="i in 4"
                :key="i"
              >
                <UIcon
                  name="i-lucide-check"
                  class="h-5 w-5 shrink-0 text-[#FF00FF]"
                />
                <span>Basic Feature {{ i }}</span>
              </li>
            </ul>
            <button
              class="skew-button flex h-12 w-full items-center justify-center border-2 border-[#00FFFF] bg-transparent text-lg text-[#00FFFF] transition-all duration-200 hover:bg-[#00FFFF] hover:text-black hover:shadow-[0_0_20px_#00FFFF]"
            >
              <span class="font-mono tracking-wider uppercase"
                >Start free trial</span
              >
            </button>
          </div>
        </div>

        <!-- Professional Plan -->
        <div
          class="relative z-10 scale-110 p-1 transition-transform duration-300 hover:scale-110"
        >
          <div
            class="absolute inset-0 bg-gradient-to-b from-[#FF00FF] to-[#00FFFF] opacity-50 blur-md"
          ></div>
          <div
            class="relative flex h-full flex-col border-2 border-[#2D1B4E] bg-[#090014] p-8 transition-colors duration-300 hover:border-[#FF00FF] hover:shadow-[0_0_30px_rgba(255,0,255,0.3)]"
          >
            <div
              class="absolute top-[-1rem] left-1/2 -ml-[2rem] -translate-x-1/2 -skew-x-12 transform bg-[#FF00FF] px-4 py-1 text-sm font-bold tracking-wider text-black uppercase shadow-[0_0_10px_#FF00FF]"
            >
              MOST_POPULAR
            </div>
            <h3 class="font-heading text-2xl font-bold text-[#00FFFF]">
              Professional
            </h3>
            <div class="mb-6 text-4xl font-black text-[#E0E0E0]">
              USD79<span class="text-lg font-normal text-[#E0E0E0]/50"
                >/month</span
              >
            </div>
            <p class="mb-8 min-h-[3rem] text-[#E0E0E0]/60">
              For growing teams that need more power
            </p>
            <ul class="mb-8 flex-1 space-y-4">
              <li
                class="flex items-start gap-3 text-sm text-[#E0E0E0]/80"
                v-for="i in 6"
                :key="i"
              >
                <UIcon
                  name="i-lucide-check"
                  class="h-5 w-5 shrink-0 text-[#FF00FF]"
                />
                <span>Pro Feature {{ i }}</span>
              </li>
            </ul>
            <button
              class="skew-button flex h-12 w-full items-center justify-center border-2 border-[#FF00FF] bg-[#FF00FF] text-lg text-white transition-all duration-200 hover:scale-105 hover:opacity-80"
            >
              <span class="font-mono tracking-wider uppercase"
                >Start free trial</span
              >
            </button>
          </div>
        </div>

        <!-- Enterprise Plan -->
        <div
          class="group relative z-0 p-1 opacity-90 transition-transform duration-300 hover:z-10 hover:scale-105 hover:opacity-100"
        >
          <div
            class="absolute inset-0 bg-gradient-to-b from-[#2D1B4E] to-transparent opacity-50 blur-md"
          ></div>
          <div
            class="relative flex h-full flex-col border-2 border-[#2D1B4E] bg-[#090014] p-8 transition-colors duration-300 group-hover:border-[#00FFFF] group-hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]"
          >
            <h3 class="font-heading mb-2 text-2xl font-bold text-[#00FFFF]">
              Enterprise
            </h3>
            <div class="mb-6 text-4xl font-black text-[#E0E0E0]">
              Custom<span class="text-lg font-normal text-[#E0E0E0]/50"
                >/month</span
              >
            </div>
            <p class="mb-8 min-h-[3rem] text-[#E0E0E0]/60">
              For organizations that need advanced features
            </p>
            <ul class="mb-8 flex-1 space-y-4">
              <li
                class="flex items-start gap-3 text-sm text-[#E0E0E0]/80"
                v-for="i in 5"
                :key="i"
              >
                <UIcon
                  name="i-lucide-check"
                  class="h-5 w-5 shrink-0 text-[#FF00FF]"
                />
                <span>Enterprise Feature {{ i }}</span>
              </li>
            </ul>
            <button
              class="skew-button flex h-12 w-full items-center justify-center border-2 border-[#00FFFF] bg-transparent text-lg text-[#00FFFF] transition-all duration-200 hover:bg-[#00FFFF] hover:text-black hover:shadow-[0_0_20px_#00FFFF]"
            >
              <span class="font-mono tracking-wider uppercase"
                >Contact Sales</span
              >
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
