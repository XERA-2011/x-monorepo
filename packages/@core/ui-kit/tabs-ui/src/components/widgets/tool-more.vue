<script lang="ts" setup>
import type { DropdownMenuProps } from '@x-monorepo-core/shadcn-ui';

import { ChevronDown } from '@x-monorepo-core/icons';
import { XAppDropdownMenu } from '@x-monorepo-core/shadcn-ui';

defineProps<DropdownMenuProps>();
</script>

<template>
  <XAppDropdownMenu :menus="menus" :modal="false">
    <div
      class="flex-center h-full cursor-pointer border-l border-border px-2 text-lg font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
    >
      <ChevronDown class="size-4" />
    </div>
  </XAppDropdownMenu>
</template>
