<script setup lang="ts">
import { useScrollLock } from '@x-monorepo-core/composables';
import { inject } from 'vue';

useScrollLock();
const id = inject('DISMISSABLE_MODAL_ID');
</script>
<template>
  <div :data-dismissable-modal="id" class="z-popup inset-0 bg-overlay"></div>
</template>
