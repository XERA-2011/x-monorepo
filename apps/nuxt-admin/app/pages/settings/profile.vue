<template>
  <div class="p-4 max-w-4xl mx-auto space-y-6">
    <!-- 用户头像和基本信息 -->
    <div class="flex items-center space-x-4">
      <UAvatar :src="user?.avatar" :alt="user?.nickname" size="3xl" />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ user?.nickname }}</h1>
        <p class="text-gray-500">{{ user?.username }}</p>
      </div>
    </div>

    <UTabs :items="items" class="w-full">
      <template #item="{ item }">
        <UCard>
          <!-- 个人信息展示 -->
          <div v-if="item.key === 'info'" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <UIcon name="i-heroicons-user" class="w-5 h-5 text-gray-500" />
                <div>
                  <p class="text-sm text-gray-500">用户账号</p>
                  <p class="font-medium text-gray-900 dark:text-white">{{ user?.username || '-' }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <UIcon name="i-heroicons-identification" class="w-5 h-5 text-gray-500" />
                <div>
                  <p class="text-sm text-gray-500">所属角色</p>
                  <p class="font-medium text-gray-900 dark:text-white">{{ user?.roles?.map((r: any) => r.name).join('、') || '-' }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <UIcon name="i-heroicons-phone" class="w-5 h-5 text-gray-500" />
                <div>
                  <p class="text-sm text-gray-500">手机号码</p>
                  <p class="font-medium text-gray-900 dark:text-white">{{ user?.mobile || '-' }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <UIcon name="i-heroicons-envelope" class="w-5 h-5 text-gray-500" />
                <div>
                  <p class="text-sm text-gray-500">用户邮箱</p>
                  <p class="font-medium text-gray-900 dark:text-white">{{ user?.email || '-' }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <UIcon name="i-heroicons-building-office" class="w-5 h-5 text-gray-500" />
                <div>
                  <p class="text-sm text-gray-500">所属部门</p>
                  <p class="font-medium text-gray-900 dark:text-white">{{ user?.dept?.name || '-' }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <UIcon name="i-heroicons-briefcase" class="w-5 h-5 text-gray-500" />
                <div>
                  <p class="text-sm text-gray-500">所属岗位</p>
                  <p class="font-medium text-gray-900 dark:text-white">{{ user?.posts?.map((p: any) => p.name).join('、') || '-' }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <UIcon name="i-heroicons-calendar" class="w-5 h-5 text-gray-500" />
                <div>
                  <p class="text-sm text-gray-500">创建时间</p>
                  <p class="font-medium text-gray-900 dark:text-white">{{ formatDateTime(user?.createTime) }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <UIcon name="i-heroicons-clock" class="w-5 h-5 text-gray-500" />
                <div>
                  <p class="text-sm text-gray-500">最后登录</p>
                  <p class="font-medium text-gray-900 dark:text-white">{{ formatDateTime(user?.loginDate) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 基本设置 -->
          <div v-if="item.key === 'basic'" class="space-y-4">
            <UForm :state="basicForm" @submit="handleBasicSubmit">
              <UFormGroup label="昵称" name="nickname" required>
                <UInput v-model="basicForm.nickname" placeholder="请输入昵称" />
              </UFormGroup>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UFormGroup label="手机号" name="mobile">
                  <UInput v-model="basicForm.mobile" placeholder="请输入手机号" />
                </UFormGroup>
                <UFormGroup label="邮箱" name="email">
                  <UInput v-model="basicForm.email" placeholder="请输入邮箱" />
                </UFormGroup>
              </div>

              <UFormGroup label="性别" name="sex">
                <div class="flex gap-4">
                  <URadio v-for="option in [{label: '男', value: 1}, {label: '女', value: 2}]" 
                        :key="option.value" 
                        v-model="basicForm.sex" 
                        v-bind="option" />
                </div>
              </UFormGroup>

              <div class="pt-4">
                <UButton type="submit" color="primary" :loading="basicLoading">保存修改</UButton>
              </div>
            </UForm>
          </div>

          <!-- 安全设置 -->
          <div v-if="item.key === 'security'" class="space-y-4">
            <UForm :state="pwdForm" :schema="pwdSchema" @submit="handlePwdSubmit">
              <UFormGroup label="当前密码" name="oldPassword" required>
                <UInput v-model="pwdForm.oldPassword" type="password" placeholder="请输入当前密码" />
              </UFormGroup>
              <UFormGroup label="新密码" name="newPassword" required>
                <UInput v-model="pwdForm.newPassword" type="password" placeholder="请输入新密码" />
              </UFormGroup>
              <div class="pt-4">
                <UButton type="submit" color="primary" :loading="pwdLoading">修改密码</UButton>
              </div>
            </UForm>
          </div>
        </UCard>
      </template>
    </UTabs>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { getUserProfile, updateUserProfile, updateUserPassword } from '~/api/system/profile'

const { user, fetchUserInfo } = useAuth()
const toast = useToast()

// 页面加载时确保有用户信息，并获取最新的详情（包括手机号等）
onMounted(async () => {
    try {
        const res = await getUserProfile()
        if (res.code === 0) {
            // 如果 user.value 存在，合并新数据；如果不存在，直接赋值
            if (user.value) {
                Object.assign(user.value, res.data)
            } else {
                user.value = res.data as any
            }
        }
    } catch (e) {
        console.error('Failed to fetch user profile:', e)
    }
})

const items = [{
  key: 'info',
  label: '个人信息',
  icon: 'i-heroicons-user'
}, {
  key: 'basic',
  label: '基本设置',
  icon: 'i-heroicons-cog-6-tooth'
}, {
  key: 'security',
  label: '安全设置',
  icon: 'i-heroicons-lock-closed'
}]

// 格式化日期时间
function formatDateTime(dateTime?: string | number) {
  if (!dateTime) return '-'
  return new Date(dateTime).toLocaleString('zh-CN')
}

// Basic Settings
const basicLoading = ref(false)
const basicForm = reactive({
  nickname: user.value?.nickname || '',
  mobile: user.value?.mobile || '',
  email: user.value?.email || '',
  sex: user.value?.sex || 1
})

// Sync form with user state when loaded
watchEffect(() => {
    if (user.value) {
        basicForm.nickname = user.value.nickname || ''
        basicForm.mobile = user.value.mobile || ''
        basicForm.email = user.value.email || ''
        basicForm.sex = user.value.sex || 1
    }
})

async function handleBasicSubmit() {
  basicLoading.value = true
  try {
    // 过滤空字段，避免后端验证错误
    const submitData: any = {
        nickname: basicForm.nickname,
        mobile: basicForm.mobile,
        email: basicForm.email,
        sex: basicForm.sex,
        id: user.value?.id
    }
    if (!submitData.mobile) delete submitData.mobile
    if (!submitData.email) delete submitData.email

    const res = await updateUserProfile(submitData as any)
    if (res && res.code === 0) {
        toast.add({ title: '成功', description: '个人信息修改成功' })
        // Refresh user info
        await getUserProfile().then(res => {
            if(res.code === 0 && user.value) {
                 Object.assign(user.value, res.data)
            }
        })
    } else {
        throw new Error(res.msg)
    }
  } catch(e: any) {
    toast.add({ title: '错误', description: e.message, color: 'red' })
  } finally {
    basicLoading.value = false
  }
}

// Password Settings
const pwdLoading = ref(false)
const pwdForm = reactive({
  oldPassword: '',
  newPassword: ''
})

const pwdSchema = z.object({
  oldPassword: z.string().min(1, '请输入当前密码'),
  newPassword: z.string().min(5, '新密码至少5个字符')
})

async function handlePwdSubmit() {
  pwdLoading.value = true
  try {
     const res = await updateUserPassword(pwdForm)
     if (res && res.code === 0) {
        toast.add({ title: '成功', description: '密码修改成功，请重新登录' })
        pwdForm.oldPassword = ''
        pwdForm.newPassword = ''
     } else {
        throw new Error(res.msg)
     }
  } catch (e: any) {
     toast.add({ title: '错误', description: e.message, color: 'red' })
  } finally {
     pwdLoading.value = false
  }
}
</script>
