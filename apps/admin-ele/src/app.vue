<script lang="ts" setup>
import { elementLocale } from '#/locales';
import { useElementPlusDesignTokens } from '@x-monorepo/hooks';
import { ElConfigProvider } from 'element-plus';

defineOptions({ name: 'App' });

useElementPlusDesignTokens();
</script>

<template>
  <ElConfigProvider :locale="elementLocale">
    <RouterView />
  </ElConfigProvider>
</template>
