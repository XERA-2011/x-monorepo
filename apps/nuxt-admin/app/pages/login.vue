<template>
  <UCard class="w-full max-w-md">
    <template #header>
      <div class="text-center">
        <h1 class="text-xl font-bold text-gray-900 dark:text-white">后台管理系统</h1>
        <p class="text-sm text-gray-500 mt-1">请登录您的账号</p>
      </div>
    </template>

    <UForm :schema="schema" :state="state" class="space-y-4" autocomplete="off" @submit="onSubmit">
      <UFormGroup label="用户名" name="username">
        <UInput 
          v-model="state.username" 
          icon="i-heroicons-user" 
          placeholder="请输入用户名" 
          autocomplete="username"
          autofocus 
        />
      </UFormGroup>

      <UFormGroup label="密码" name="password">
        <UInput 
          v-model="state.password" 
          type="password" 
          icon="i-heroicons-lock-closed" 
          placeholder="请输入密码" 
          autocomplete="new-password"
        />
      </UFormGroup>

      <UButton type="submit" block :loading="loading" color="primary" size="lg">
        登 录
      </UButton>
      
      <div class="text-center mt-2">
         <span class="text-xs text-red-500" v-if="error">{{ error }}</span>
      </div>
    </UForm>
  </UCard>

  <!-- 验证码弹窗 -->
  <CaptchaVerify v-model="showCaptcha" @success="handleCaptchaSuccess" />
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

definePageMeta({
  layout: 'auth'
})

const loading = ref(false)
const error = ref('')
const showCaptcha = ref(false)

const state = reactive({
  username: '',
  password: ''
})

// 保存登录凭据，等验证码通过后使用
const pendingLoginData = ref<{ username: string; password: string } | null>(null)

const schema = z.object({
  username: z.string().min(1, '请输入用户名'),
  password: z.string().min(1, '请输入密码')
})

type Schema = z.output<typeof schema>

// 点击登录按钮 -> 弹出验证码
async function onSubmit(event: FormSubmitEvent<Schema>) {
  error.value = ''
  pendingLoginData.value = {
    username: event.data.username,
    password: event.data.password
  }
  // 显示验证码弹窗
  showCaptcha.value = true
}

// 验证码验证成功后执行登录
async function handleCaptchaSuccess(captchaVerification: string) {
  if (!pendingLoginData.value) return
  
  loading.value = true
  error.value = ''
  
  try {
    const { login } = useAuth()
    await login({
      username: pendingLoginData.value.username,
      password: pendingLoginData.value.password,
      captchaVerification
    })
  } catch (e: any) {
    error.value = e.message || '登录失败'
  } finally {
    loading.value = false
    pendingLoginData.value = null
  }
}
</script>
