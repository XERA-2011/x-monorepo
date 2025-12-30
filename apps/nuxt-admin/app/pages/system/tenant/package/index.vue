<template>
  <div class="p-4 space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold">租户套餐管理</h2>
      <UButton icon="i-heroicons-plus" color="primary" @click="handleCreate">新增套餐</UButton>
    </div>

    <!-- 搜索 -->
    <UCard :ui="{ body: { padding: 'p-4' } }">
      <div class="flex gap-4">
        <UInput v-model="search.name" placeholder="套餐名称" icon="i-heroicons-magnifying-glass" />
        <USelect v-model="search.status" :options="statusOptions" placeholder="状态" />
        <div class="flex-1"></div>
        <UButton icon="i-heroicons-magnifying-glass" color="gray" variant="ghost" @click="refresh">搜索</UButton>
        <UButton icon="i-heroicons-arrow-path" color="gray" variant="ghost" @click="resetSearch">重置</UButton>
      </div>
    </UCard>

    <!-- 表格 -->
    <UCard :ui="{ body: { padding: 'p-0' } }">
      <UTable :rows="rows" :columns="columns" :loading="pending">
        <template #status-data="{ row }">
          <UBadge :color="row.status === 0 ? 'green' : 'red'" variant="subtle">
            {{ row.status === 0 ? '开启' : '关闭' }}
          </UBadge>
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
              {{ form.id ? '编辑套餐' : '新增套餐' }}
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="modalVisible = false" />
          </div>
        </template>

        <UForm :state="form" class="space-y-4" @submit="handleSubmit">
          <UFormGroup label="套餐名称" name="name" required>
            <UInput v-model="form.name" />
          </UFormGroup>

          <UFormGroup label="状态" name="status" required>
            <URadioGroup v-model="form.status" :options="statusOptions" />
          </UFormGroup>
          
          <UFormGroup label="备注" name="remark">
             <UTextarea v-model="form.remark" />
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
  getTenantPackagePage,
  createTenantPackage,
  updateTenantPackage,
  deleteTenantPackage,
  type SystemTenantPackageApi
} from '~/api/system/tenantPackage'
import { formatDate } from '~/utils/format'

const rows = ref<SystemTenantPackageApi.TenantPackage[]>([])
const pending = ref(false)
const total = ref(0)
const page = ref(1)
const pageSize = 10

const search = reactive({
  name: '',
  status: undefined
})

const statusOptions = [
  { label: '开启', value: 0 },
  { label: '关闭', value: 1 }
]

const columns = [
  { key: 'id', label: '套餐编号' },
  { key: 'name', label: '套餐名称' },
  { key: 'status', label: '状态' },
  { key: 'remark', label: '备注' },
  { key: 'createTime', label: '创建时间' },
  { key: 'actions', label: '操作' }
]

// Modal
const modalVisible = ref(false)
const submitting = ref(false)
const form = reactive<SystemTenantPackageApi.TenantPackage>({
  name: '',
  status: 0,
  remark: '',
  menuIds: []
})

async function refresh() {
  pending.value = true
  try {
    const res = await getTenantPackagePage({
      pageNo: page.value,
      pageSize,
      name: search.name || undefined,
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
  search.status = undefined
  page.value = 1
  refresh()
}

function handleCreate() {
  form.id = undefined
  form.name = ''
  form.status = 0
  form.remark = ''
  form.menuIds = []
  modalVisible.value = true
}

function handleEdit(row: SystemTenantPackageApi.TenantPackage) {
  Object.assign(form, row)
  modalVisible.value = true
}

async function handleSubmit() {
  submitting.value = true
  try {
    if (form.id) {
      await updateTenantPackage(form)
    } else {
      await createTenantPackage(form)
    }
    modalVisible.value = false
    refresh()
  } catch (e) {
    console.error(e)
  } finally {
    submitting.value = false
  }
}

const actions = (row: SystemTenantPackageApi.TenantPackage) => [
  [{
    label: '编辑',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => handleEdit(row)
  }, {
    label: '删除',
    icon: 'i-heroicons-trash-20-solid',
    click: async () => {
      if (!confirm('确定要删除该套餐吗？')) return
      if (row.id) {
        await deleteTenantPackage(row.id)
        refresh()
      }
    }
  }]
]

onMounted(() => {
  refresh()
})
</script>
