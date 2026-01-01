<script setup lang="ts">
import type { XAppFormSchema } from '#/adapter/form';
import type { SystemUserProfileApi } from '#/api/system/user/profile';
import type { Recordable } from '@x-monorepo/types';

import { updateUserProfile } from '#/api/system/user/profile';
import { $t } from '#/locales';
import { ProfileBaseSetting, z } from '@x-monorepo/common-ui';
import { DICT_TYPE } from '@x-monorepo/constants';
import { getDictOptions } from '@x-monorepo/hooks';
import { ElMessage } from 'element-plus';
import { computed, ref, watch } from 'vue';

const props = defineProps<{
  profile?: SystemUserProfileApi.UserProfileRespVO;
}>();
const emit = defineEmits<{
  (e: 'success'): void;
}>();

const profileBaseSettingRef = ref();

const formSchema = computed((): XAppFormSchema[] => {
  return [
    {
      label: '用户昵称',
      fieldName: 'nickname',
      component: 'Input',
      componentProps: {
        placeholder: '请输入用户昵称',
      },
      rules: 'required',
    },
    {
      label: '用户手机',
      fieldName: 'mobile',
      component: 'Input',
      componentProps: {
        placeholder: '请输入用户手机',
      },
      rules: z.string(),
    },
    {
      label: '用户邮箱',
      fieldName: 'email',
      component: 'Input',
      componentProps: {
        placeholder: '请输入用户邮箱',
      },
      rules: z.string().email('请输入正确的邮箱'),
    },
    {
      label: '用户性别',
      fieldName: 'sex',
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.SYSTEM_USER_SEX, 'number'),
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: z.number(),
    },
  ];
});

async function handleSubmit(values: Recordable<any>) {
  try {
    profileBaseSettingRef.value.getFormApi().setLoading(true);
    // 提交表单
    await updateUserProfile(values as SystemUserProfileApi.UpdateProfileReqVO);
    // 关闭并提示
    emit('success');
    ElMessage.success($t('ui.actionMessage.operationSuccess'));
  } catch (error) {
    console.error(error);
  } finally {
    profileBaseSettingRef.value.getFormApi().setLoading(false);
  }
}

/** 监听 profile 变化 */
watch(
  () => props.profile,
  (newProfile) => {
    if (newProfile) {
      profileBaseSettingRef.value.getFormApi().setValues(newProfile);
    }
  },
  { immediate: true },
);
</script>
<template>
  <ProfileBaseSetting
    ref="profileBaseSettingRef"
    :form-schema="formSchema"
    @submit="handleSubmit"
  />
</template>
