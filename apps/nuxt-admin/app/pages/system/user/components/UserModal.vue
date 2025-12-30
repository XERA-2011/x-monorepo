<template>
  <UModal v-model="visible">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ isEdit ? 'Edit User' : 'Create User' }}
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="visible = false" />
        </div>
      </template>

      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Username" name="username" required>
          <UInput v-model="state.username" :disabled="isEdit" placeholder="Unique username" />
        </UFormGroup>

        <UFormGroup label="Nickname" name="nickname" required>
          <UInput v-model="state.nickname" placeholder="Display name" />
        </UFormGroup>

        <UFormGroup v-if="!isEdit" label="Password" name="password" required>
          <UInput v-model="state.password" type="password" placeholder="Initial password" />
        </UFormGroup>

        <div class="grid grid-cols-2 gap-4">
          <UFormGroup label="Mobile" name="mobile">
             <UInput v-model="state.mobile" placeholder="Mobile number" />
          </UFormGroup>
          <UFormGroup label="Email" name="email">
             <UInput v-model="state.email" placeholder="Email address" />
          </UFormGroup>
        </div>

        <div class="grid grid-cols-2 gap-4">
           <UFormGroup label="Sex" name="sex">
             <USelect v-model="state.sex" :options="[{label: 'Male', value: 1}, {label: 'Female', value: 2}]" placeholder="Select sex" />
           </UFormGroup>
           <UFormGroup label="Status" name="status">
             <USelect v-model="state.status" :options="[{label: 'Active', value: 1}, {label: 'Disabled', value: 0}]" placeholder="Select status" />
           </UFormGroup>
        </div>

        <UFormGroup label="Remark" name="remark">
          <UTextarea v-model="state.remark" />
        </UFormGroup>

        <div class="flex justify-end gap-3 pt-4">
          <UButton label="Cancel" color="gray" variant="ghost" @click="visible = false" />
          <UButton type="submit" label="Save" color="black" :loading="loading" />
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { createUser, updateUser, getUser, type SystemUserApi } from '~/api/system/user'

const props = defineProps<{
  modelValue: boolean
  userId?: number // If present, it's edit mode
}>()

const emit = defineEmits(['update:modelValue', 'success'])

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const isEdit = computed(() => !!props.userId)
const loading = ref(false)

const state = reactive({
  id: undefined,
  username: '',
  nickname: '',
  password: '',
  email: '',
  mobile: '',
  sex: 1,
  status: 1,
  remark: ''
})

// Schema Validation
const schema = z.object({
  username: z.string().min(3, 'Minimum 3 characters'),
  nickname: z.string().min(2, 'Minimum 2 characters'),
  password: z.string().optional().refine(val => {
     if (!props.userId && (!val || val.length < 5)) return false
     return true
  }, { message: 'Password is required and must be at least 5 chars' }),
  email: z.string().email().optional().or(z.literal('')),
  mobile: z.string().optional()
})

type Schema = z.output<typeof schema>

// Fetch details on open
watch(() => props.userId, async (newId) => {
  if (newId && visible.value) {
     loading.value = true
     try {
       const { data } = await getUser(newId)
       if (data.value) {
         Object.assign(state, data.value)
       }
     } finally {
       loading.value = false
     }
  } else {
    // Reset form
    Object.assign(state, {
      id: undefined,
      username: '',
      nickname: '',
      password: '',
      email: '',
      mobile: '',
      sex: 1,
      status: 1,
      remark: ''
    })
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    const payload = { ...state } as SystemUserApi.User
    
    // API call
    if (isEdit.value) {
       await updateUser(payload)
    } else {
       await createUser(payload)
    }
    
    emit('success')
    visible.value = false
    
  } catch (e: any) {
    alert(e.message || 'Operation failed')
  } finally {
    loading.value = false
  }
}
</script>
