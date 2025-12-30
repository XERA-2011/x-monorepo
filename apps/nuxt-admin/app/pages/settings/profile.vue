<template>
  <div class="p-4 max-w-4xl mx-auto space-y-6">
    <div class="flex items-center space-x-4">
      <UAvatar :src="user?.avatar" :alt="user?.nickname" size="3xl" />
      <div>
        <h1 class="text-2xl font-bold">{{ user?.nickname }}</h1>
        <p class="text-gray-500">{{ user?.username }}</p>
      </div>
    </div>

    <UTabs :items="items" class="w-full">
      <template #item="{ item }">
        <UCard>
          <div v-if="item.key === 'basic'" class="space-y-4">
            <UForm :state="basicForm" @submit="handleBasicSubmit">
              <UFormGroup label="Nickname" name="nickname" required>
                <UInput v-model="basicForm.nickname" />
              </UFormGroup>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <UFormGroup label="Mobile" name="mobile">
                    <UInput v-model="basicForm.mobile" />
                  </UFormGroup>
                  <UFormGroup label="Email" name="email">
                    <UInput v-model="basicForm.email" />
                  </UFormGroup>
              </div>

               <UFormGroup label="Sex" name="sex">
                 <div class="flex gap-4">
                  <URadio v-for="option in [{label: 'Male', value: 1}, {label: 'Female', value: 2}]" 
                        :key="option.value" 
                        v-model="basicForm.sex" 
                        v-bind="option" />
                 </div>
               </UFormGroup>

              <div class="pt-4">
                <UButton type="submit" color="black" :loading="basicLoading">Update Profile</UButton>
              </div>
            </UForm>
          </div>

          <div v-if="item.key === 'security'" class="space-y-4">
             <UForm :state="pwdForm" :schema="pwdSchema" @submit="handlePwdSubmit">
              <UFormGroup label="Old Password" name="oldPassword" required>
                <UInput v-model="pwdForm.oldPassword" type="password" />
              </UFormGroup>
              <UFormGroup label="New Password" name="newPassword" required>
                <UInput v-model="pwdForm.newPassword" type="password" />
              </UFormGroup>
               <div class="pt-4">
                <UButton type="submit" color="black" :loading="pwdLoading">Change Password</UButton>
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

const { user } = useAuth()
const toast = useToast()

const items = [{
  key: 'basic',
  label: 'Basic Settings',
  icon: 'i-heroicons-user-circle'
}, {
  key: 'security',
  label: 'Security',
  icon: 'i-heroicons-lock-closed'
}]

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
    const res = await updateUserProfile({
        ...basicForm,
        id: user.value?.id
    } as any)
    if (res && res.code === 0) {
        toast.add({ title: 'Success', description: 'Profile updated successfully' })
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
    toast.add({ title: 'Error', description: e.message, color: 'red' })
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
  oldPassword: z.string().min(1, 'Old password is required'),
  newPassword: z.string().min(5, 'Password must be at least 5 characters')
})

async function handlePwdSubmit() {
  pwdLoading.value = true
  try {
     const res = await updateUserPassword(pwdForm)
     if (res && res.code === 0) {
        toast.add({ title: 'Success', description: 'Password changed successfully. Please login again.' })
        pwdForm.oldPassword = ''
        pwdForm.newPassword = ''
     } else {
        throw new Error(res.msg)
     }
  } catch (e: any) {
     toast.add({ title: 'Error', description: e.message, color: 'red' })
  } finally {
     pwdLoading.value = false
  }
}
</script>
