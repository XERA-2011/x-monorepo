<script setup lang="ts">
import { useScrollLock } from '@x-monorepo-core/composables';
import { inject } from 'vue';

useScrollLock();
const id = inject('DISMISSABLE_DRAWER_ID');
</script>
<template>
  <div :data-dismissable-drawer="id" class="z-popup inset-0 bg-overlay"></div>
</template>
