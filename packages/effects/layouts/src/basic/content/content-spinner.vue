<script lang="ts" setup>
import { XAppSpinner } from '@x-monorepo-core/shadcn-ui';

import { useContentSpinner } from './use-content-spinner';

defineOptions({ name: 'LayoutContentSpinner' });

const { spinning } = useContentSpinner();
</script>
<template>
  <XAppSpinner :spinning="spinning" />
</template>
