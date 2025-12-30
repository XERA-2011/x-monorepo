<template>
  <div class="p-4 space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold">租户管理</h2>
      <div class="flex gap-2">
         <UButton icon="i-heroicons-arrow-down-tray" color="gray" variant="solid" @click="handleExport">导出</UButton>
         <UButton icon="i-heroicons-plus" color="primary" @click="handleCreate">新增租户</UButton>
      </div>
    </div>

    <!-- 搜索 -->
    <UCard :ui="{ body: { padding: 'p-4' } }">
      <div class="flex gap-4 flex-wrap">
        <UInput v-model="search.name" placeholder="租户名称" icon="i-heroicons-magnifying-glass" />
        <UInput v-model="search.contactName" placeholder="联系人" icon="i-heroicons-user" />
        <UInput v-model="search.contactMobile" placeholder="联系手机" icon="i-heroicons-phone" />
        <USelect v-model="search.status" :options="statusOptions" placeholder="状态" />
        <div class="flex-1"></div>
        <UButton icon="i-heroicons-magnifying-glass" color="gray" variant="ghost" @click="refresh">搜索</UButton>
        <UButton icon="i-heroicons-arrow-path" color="gray" variant="ghost" @click="resetSearch">重置</UButton>
      </div>
    </UCard>

    <!-- 表格 -->
    <UCard :ui="{ body: { padding: 'p-0' } }">
      <UTable :rows="rows" :columns="columns" :loading="pending">
        <template #packageId-data="{ row }">
          {{ getPackageName(row.packageId) }}
        </template>
        
        <template #status-data="{ row }">
          <UBadge :color="row.status === 0 ? 'green' : 'red'" variant="subtle">
            {{ row.status === 0 ? '开启' : '关闭' }}
          </UBadge>
        </template>

         <template #expireTime-data="{ row }">
          {{ formatDate(row.expireTime) }}
        </template>

        <template #createTime-data="{ row }">
          {{ formatDate(row.createTime) }}
        </template>

        <template #actions-data="{ row }">
          <UDropdown :items="actions(row)">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
        </template>
      </UTable>

      <!-- 分页 -->
      <div class="flex justify-end p-4 border-t border-gray-200 dark:border-gray-800">
        <UPagination v-model="page" :page-count="pageSize" :total="total" @change="refresh" />
      </div>
    </UCard>

    <!-- 弹窗 -->
    <UModal v-model="modalVisible">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              {{ form.id ? '编辑租户' : '新增租户' }}
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="modalVisible = false" />
          </div>
        </template>

        <UForm :state="form" class="space-y-4" @submit="handleSubmit">
          <UFormGroup label="租户名称" name="name" required>
            <UInput v-model="form.name" />
          </UFormGroup>
          
          <UFormGroup label="租户套餐" name="packageId" required>
            <USelect v-model="form.packageId" :options="packageOptions" option-attribute="name" value-attribute="id"/>
          </UFormGroup>

          <UFormGroup label="联系人" name="contactName" required>
            <UInput v-model="form.contactName" />
          </UFormGroup>

          <UFormGroup label="联系手机" name="contactMobile">
            <UInput v-model="form.contactMobile" />
          </UFormGroup>
          
          <div v-if="!form.id">
            <UFormGroup label="管理员账号" name="username" required>
                <UInput v-model="form.username" />
            </UFormGroup>
             <UFormGroup label="管理员密码" name="password" required>
                <UInput v-model="form.password" type="password"/>
            </UFormGroup>
          </div>

          <UFormGroup label="账号额度" name="accountCount" required>
            <UInput v-model="form.accountCount" type="number" />
          </UFormGroup>
          
          <UFormGroup label="过期时间" name="expireTime" required>
             <UInput type="date" :model-value="formatDate(form.expireTime, 'YYYY-MM-DD')" @update:model-value="val => form.expireTime = new Date(val).getTime()" />
          </UFormGroup>
          
          <UFormGroup label="绑定域名" name="websites">
            <UInput :model-value="form.websites?.join(',')" @update:model-value="val => form.websites = val.split(',')" placeholder="多个域名用逗号分隔"/>
          </UFormGroup>

          <UFormGroup label="状态" name="status" required>
            <URadioGroup v-model="form.status" :options="statusOptions" />
          </UFormGroup>

          <div class="flex justify-end gap-3 pt-4">
            <UButton label="取消" color="gray" variant="ghost" @click="modalVisible = false" />
            <UButton type="submit" label="确定" color="primary" :loading="submitting" />
          </div>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import {
  getTenantPage,
  createTenant,
  updateTenant,
  deleteTenant,
  exportTenant,
  type SystemTenantApi
} from '~/api/system/tenant'
import { getTenantPackageList, type SystemTenantPackageApi } from '~/api/system/tenantPackage'
import { formatDate } from '~/utils/format'

const rows = ref<SystemTenantApi.Tenant[]>([])
const pending = ref(false)
const total = ref(0)
const page = ref(1)
const pageSize = 10

const search = reactive({
  name: '',
  contactName: '',
  contactMobile: '',
  status: undefined
})

const statusOptions = [
  { label: '开启', value: 0 },
  { label: '关闭', value: 1 }
]

const packageList = ref<SystemTenantPackageApi.TenantPackage[]>([])
const packageOptions = computed(() => packageList.value)

const columns = [
  { key: 'id', label: '租户编号' },
  { key: 'name', label: '租户名称' },
  { key: 'packageId', label: '租户套餐' },
  { key: 'contactName', label: '联系人' },
  { key: 'contactMobile', label: '联系手机' },
  { key: 'accountCount', label: '账号额度' },
  { key: 'expireTime', label: '过期时间' },
  { key: 'status', label: '状态' },
  { key: 'createTime', label: '创建时间' },
  { key: 'actions', label: '操作' }
]

// Modal
const modalVisible = ref(false)
const submitting = ref(false)
const form = reactive<SystemTenantApi.Tenant>({
  name: '',
  packageId: 0,
  contactName: '',
  contactMobile: '',
  accountCount: 0,
  expireTime: Date.now(),
  websites: [],
  status: 0,
  username: '',
  password: ''
})

async function loadPackages() {
    const res = await getTenantPackageList()
    if(res && res.code === 0) {
        packageList.value = res.data || []
    }
}

function getPackageName(id: number) {
    if (id === 0) return '系统租户'
    const pkg = packageList.value.find(p => p.id === id)
    return pkg ? pkg.name : '-'
}

async function refresh() {
  pending.value = true
  try {
    const res = await getTenantPage({
      pageNo: page.value,
      pageSize,
      name: search.name || undefined,
      contactName: search.contactName || undefined,
      contactMobile: search.contactMobile || undefined,
      status: search.status
    })
    if (res && res.code === 0) {
      rows.value = res.data?.list || []
      total.value = res.data?.total || 0
    }
  } catch (e) {
    console.error(e)
  } finally {
    pending.value = false
  }
}

function resetSearch() {
  search.name = ''
  search.contactName = ''
  search.contactMobile = ''
  search.status = undefined
  page.value = 1
  refresh()
}

function handleCreate() {
  form.id = undefined
  form.name = ''
  form.packageId = undefined as any
  form.contactName = ''
  form.contactMobile = ''
  form.accountCount = 0
  form.expireTime = Date.now()
  form.websites = []
  form.status = 0
  form.username = ''
  form.password = ''
  modalVisible.value = true
}

function handleEdit(row: SystemTenantApi.Tenant) {
  Object.assign(form, row)
  // Ensure array
  if (!Array.isArray(form.websites)) {
       form.websites = []
  }
  modalVisible.value = true
}

async function handleSubmit() {
  submitting.value = true
  try {
    if (form.id) {
       // Remove username/password when editing if empty to avoid sending nulls if backend doesn't support it
       // But typically update DTOs might exclude them. Here we just send as is for now.
       const { username, password, ...updateData } = form
      await updateTenant(updateData as SystemTenantApi.Tenant)
    } else {
      await createTenant(form)
    }
    modalVisible.value = false
    refresh()
  } catch (e) {
    console.error(e)
  } finally {
    submitting.value = false
  }
}

async function handleExport() {
    try {
       const blob = await exportTenant({
          name: search.name || undefined,
          contactName: search.contactName || undefined,
          contactMobile: search.contactMobile || undefined,
          status: search.status
       })
       // Handle download... simplified
       const url = window.URL.createObjectURL(new Blob([blob as any]))
       const link = document.createElement('a')
       link.href = url
       link.setAttribute('download', '租户数据.xls')
       document.body.appendChild(link)
       link.click()
       document.body.removeChild(link)
    } catch(e) {
        console.error(e)
    }
}

const actions = (row: SystemTenantApi.Tenant) => [
  [{
    label: '编辑',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => handleEdit(row)
  }, {
    label: '删除',
    icon: 'i-heroicons-trash-20-solid',
    click: async () => {
      if (!confirm('确定要删除该租户吗？')) return
      if (row.id) {
        await deleteTenant(row.id)
        refresh()
      }
    }
  }]
]

onMounted(() => {
  loadPackages()
  refresh()
})
</script>
