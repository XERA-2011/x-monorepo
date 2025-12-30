<script lang="ts" setup>
import { AuthenticationQrCodeLogin } from '@x-monorepo/common-ui';
import { LOGIN_PATH } from '@x-monorepo/constants';

defineOptions({ name: 'QrCodeLogin' });
</script>

<template>
  <AuthenticationQrCodeLogin :login-path="LOGIN_PATH" />
</template>
