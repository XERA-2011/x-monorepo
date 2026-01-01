<script setup lang="ts">
import type { DialogDescriptionProps } from 'reka-ui';

import { cn } from '@x-monorepo-core/shared/utils';
import { DialogDescription } from 'reka-ui';
import { computed } from 'vue';

const props = defineProps<DialogDescriptionProps & { class?: any }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <DialogDescription
    :class="cn('text-sm text-muted-foreground', props.class)"
    v-bind="delegatedProps"
  >
    <slot></slot>
  </DialogDescription>
</template>
