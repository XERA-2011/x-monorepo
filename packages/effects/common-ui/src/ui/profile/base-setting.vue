<script setup lang="ts">
import type { Recordable } from '@x-monorepo/types';

import type { XAppFormSchema } from '@x-monorepo-core/form-ui';

import { computed, reactive } from 'vue';

import { useXAppForm } from '@x-monorepo-core/form-ui';
import { XAppButton } from '@x-monorepo-core/shadcn-ui';

interface Props {
  formSchema?: XAppFormSchema[];
}

const props = withDefaults(defineProps<Props>(), {
  formSchema: () => [],
});

const emit = defineEmits<{
  submit: [Recordable<any>];
}>();

const [Form, formApi] = useXAppForm(
  reactive({
    commonConfig: {
      // 所有表单项
      componentProps: {
        class: 'w-full',
      },
    },
    layout: 'horizontal',
    schema: computed(() => props.formSchema),
    showDefaultActions: false,
  }),
);

async function handleSubmit() {
  const { valid } = await formApi.validate();
  const values = await formApi.getValues();
  if (valid) {
    emit('submit', values);
  }
}

defineExpose({
  getFormApi: () => formApi,
});
</script>
<template>
  <div @keydown.enter.prevent="handleSubmit">
    <Form />
    <XAppButton type="submit" class="mt-4" @click="handleSubmit">
      更新基本信息
    </XAppButton>
  </div>
</template>
