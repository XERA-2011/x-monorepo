<script lang="ts" setup>
import type { SystemLoginLogApi } from '#/api/system/login-log';

import { useDescription } from '#/components/description';
import { useXAppModal } from '@x-monorepo/common-ui';
import { ref } from 'vue';

import { useDetailSchema } from '../data';

const formData = ref<SystemLoginLogApi.LoginLog>();

const [Descriptions] = useDescription({
  border: true,
  column: 1,
  schema: useDetailSchema(),
});

const [Modal, modalApi] = useXAppModal({
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      formData.value = undefined;
      return;
    }
    // 加载数据
    const data = modalApi.getData<SystemLoginLogApi.LoginLog>();
    if (!data || !data.id) {
      return;
    }
    modalApi.lock();
    try {
      formData.value = data;
    } finally {
      modalApi.unlock();
    }
  },
});
</script>

<template>
  <Modal
    title="登录日志详情"
    class="w-1/2"
    :show-cancel-button="false"
    :show-confirm-button="false"
  >
    <Descriptions :data="formData" />
  </Modal>
</template>
