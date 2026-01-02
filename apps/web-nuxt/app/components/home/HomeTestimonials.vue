<script setup lang="ts">
const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Director at TechFlow',
    quote:
      '"Acme has completely transformed how our team operates. We\'ve seen a 40% increase in productivity since day one."',
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CTO at InnovateLab',
    quote:
      '"The automation features alone are worth the price. It\'s like having an extra team member working 24/7."',
  },
  {
    name: 'Elena Popov',
    role: 'VP of Operations at CloudScale',
    quote:
      '"Simple, intuitive, and powerful. The best project management tool we\'ve used in years."',
  },
  {
    name: 'David Kim',
    role: 'DevOps Lead at CloudNet',
    quote:
      '"Stability is unmatched. We migrated our entire infrastructure in less than a week with zero downtime."',
  },
  {
    name: 'Jessica Wu',
    role: 'Founder at StartUp X',
    quote:
      '"Scaled with us from day one. From 10 users to 10,000, Acme never skipped a beat."',
  },
  {
    name: 'Alex Thompson',
    role: 'Product Manager at Enterprise Corp',
    quote:
      '"The analytics are a game changer. We finally have clear visibility into our team\'s performance."',
  },
];
</script>

<template>
  <section class="py-20 sm:py-32">
    <div class="container mx-auto px-4">
      <h2
        class="font-heading mb-8 text-center text-3xl font-black text-[#00FFFF] sm:mb-12 sm:text-4xl"
      >
        &lt;USER_LOGS&gt;
      </h2>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="flex flex-col gap-4 border border-[#00FFFF]/30 bg-[#090014] p-6"
        >
          <div
            class="flex items-center gap-3 border-b border-[#00FFFF]/30 pb-4"
          >
            <div
              class="flex h-10 w-10 items-center justify-center border border-[#FF00FF] bg-[#FF00FF]/20"
            >
              <UIcon name="i-lucide-user" class="h-5 w-5 text-[#FF00FF]" />
            </div>
            <div>
              <div class="font-bold text-[#FF00FF]">
                &lt;{{ testimonial.name }}&gt;
              </div>
              <div class="text-xs text-[#00FFFF]">{{ testimonial.role }}</div>
            </div>
          </div>
          <p class="font-mono leading-relaxed text-[#E0E0E0]">
            {{ testimonial.quote }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
