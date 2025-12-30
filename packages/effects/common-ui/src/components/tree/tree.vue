<script setup lang="ts">
import type { TreeProps } from '@x-monorepo-core/shadcn-ui';

import { Inbox } from '@x-monorepo/icons';
import { $t } from '@x-monorepo/locales';

import { treePropsDefaults, XAppTree } from '@x-monorepo-core/shadcn-ui';

const props = withDefaults(defineProps<TreeProps>(), treePropsDefaults());
</script>

<template>
  <XAppTree v-if="props.treeData?.length > 0" v-bind="props">
    <template v-for="(_, key) in $slots" :key="key" #[key]="slotProps">
      <slot :name="key" v-bind="slotProps"> </slot>
    </template>
  </XAppTree>
  <div
    v-else
    class="flex-col-center text-muted-foreground cursor-pointer rounded-lg border p-10 text-sm font-medium"
  >
    <Inbox class="size-10" />
    <div class="mt-1">{{ $t('common.noData') }}</div>
  </div>
</template>
