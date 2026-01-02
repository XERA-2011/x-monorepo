<script setup lang="ts">
const faqs = [
  {
    question: 'How does the free trial work?',
    answer:
      'You get 14 days of full access to all features. No credit card required.',
  },
  {
    question: 'Can I change plans later?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and crypto.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, we use bank-level encryption and security protocols.',
  },
];

const activeFaq = ref<null | number>(null);

const toggleFaq = (index: number) => {
  activeFaq.value = activeFaq.value === index ? null : index;
};
</script>

<template>
  <section class="mx-auto max-w-4xl px-4 py-20">
    <div class="border-2 border-[#2D1B4E] bg-black p-4 font-mono sm:p-8">
      <h2
        class="mb-6 text-center text-2xl font-black tracking-widest text-[#00FFFF] uppercase sm:mb-8 sm:text-3xl"
      >
        &gt; FAQ_DATABASE
      </h2>
      <div class="space-y-4">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="border border-[#FF00FF]/30 bg-[#090014]"
        >
          <button
            class="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-[#FF00FF]/10"
            type="button"
            @click="toggleFaq(index)"
          >
            <span class="font-bold text-[#E0E0E0]">
              <span class="mr-2 text-[#FF00FF]">&gt; QUERY:</span
              >{{ faq.question }}
            </span>
            <UIcon
              name="i-lucide-chevron-down"
              class="h-5 w-5 text-[#00FFFF] transition-transform"
              :class="{ 'rotate-180': activeFaq === index }"
            />
          </button>
          <div
            v-show="activeFaq === index"
            class="border-t border-[#FF00FF]/30 p-4 text-[#E0E0E0]/70"
          >
            <span class="mr-2 text-[#00FFFF]">&gt; RESULT:</span
            >{{ faq.answer }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
