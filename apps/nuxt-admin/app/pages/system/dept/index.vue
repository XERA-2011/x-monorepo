<template>
  <div class="p-4 space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold">部门管理</h2>
      <UButton icon="i-heroicons-plus" color="primary" @click="handleCreate">新增部门</UButton>
    </div>

    <!-- 搜索 -->
    <UCard :ui="{ body: { padding: 'p-4' } }">
      <div class="flex gap-4">
        <UInput v-model="search.name" placeholder="部门名称" icon="i-heroicons-magnifying-glass" />
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
            {{ row.status === 0 ? '正常' : '停用' }}
          </UBadge>
        </template>

        <template #createTime-data="{ row }">
          {{ row.createTime ? new Date(row.createTime).toLocaleString() : '-' }}
        </template>

        <template #actions-data="{ row }">
          <UDropdown :items="actions(row)">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
        </template>
      </UTable>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { getDeptList, deleteDept, type SystemDeptApi } from '~/api/system/dept'

const rows = ref<SystemDeptApi.Dept[]>([])
const pending = ref(false)

const search = reactive({
  name: '',
  status: undefined
})

const statusOptions = [
  { label: '正常', value: 0 },
  { label: '停用', value: 1 }
]

const columns = [
  { key: 'name', label: '部门名称' },
  { key: 'sort', label: '排序' },
  { key: 'status', label: '状态' },
  { key: 'createTime', label: '创建时间' },
  { key: 'actions', label: '操作' }
]

async function refresh() {
  pending.value = true
  try {
    const res = await getDeptList({
      name: search.name || undefined,
      status: search.status
    })
    if (res && res.code === 0) {
      rows.value = res.data || []
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
  refresh()
}

function handleCreate() {
  console.log('Create dept')
}

const actions = (row: SystemDeptApi.Dept) => [
  [{
    label: '编辑',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row)
  }, {
    label: '新增子部门',
    icon: 'i-heroicons-plus-20-solid',
    click: () => console.log('Add child', row)
  }, {
    label: '删除',
    icon: 'i-heroicons-trash-20-solid',
    click: async () => {
      if (!confirm('确定要删除该部门吗？')) return
      if (row.id) {
        await deleteDept(row.id)
        refresh()
      }
    }
  }]
]

onMounted(() => {
  refresh()
})
</script>
