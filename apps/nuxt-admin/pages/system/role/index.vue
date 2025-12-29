<template>
  <div class="p-4 space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold">角色管理</h2>
      <UButton icon="i-heroicons-plus" color="primary">新增角色</UButton>
    </div>

    <!-- Search -->
    <UCard :ui="{ body: { padding: 'p-4' } }">
      <div class="flex gap-4">
        <UInput v-model="search.name" placeholder="角色名称" icon="i-heroicons-user-group" />
        <UInput v-model="search.code" placeholder="角色标识" icon="i-heroicons-code-bracket" />
        <USelect v-model="search.status" :options="statusOptions" placeholder="状态" />
        <div class="flex-1"></div>
        <UButton icon="i-heroicons-magnifying-glass" color="gray" variant="ghost" @click="refresh">搜索</UButton>
        <UButton icon="i-heroicons-arrow-path" color="gray" variant="ghost" @click="resetSearch">重置</UButton>
      </div>
    </UCard>

    <!-- Table -->
    <UCard :ui="{ body: { padding: 'p-0' } }">
      <UTable :rows="rows" :columns="columns" :loading="pending">
        <template #status-data="{ row }">
          <UBadge :color="row.status === 0 ? 'green' : 'red'" variant="subtle">
            {{ row.status === 0 ? '正常' : '停用' }}
          </UBadge>
        </template>
        
        <template #createTime-data="{ row }">
            {{ new Date(row.createTime).toLocaleString() }}
        </template>

        <template #actions-data="{ row }">
          <UDropdown :items="actions(row)">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
        </template>
      </UTable>

      <div class="flex justify-end p-4 border-t dark:border-gray-800">
        <UPagination v-model="page" :page-count="pageSize" :total="total" />
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { getRolePage, deleteRole, type SystemRoleApi } from '~/api/system/role'

const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const rows = ref<SystemRoleApi.Role[]>([])

const search = reactive({
  name: '',
  code: '',
  status: undefined
})

const statusOptions = [
  { label: '正常', value: 0 },
  { label: '停用', value: 1 }
]

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: '角色名称' },
  { key: 'code', label: '角色标识' },
  { key: 'remark', label: '备注' },
  { key: 'status', label: '状态' },
  { key: 'createTime', label: '创建时间' },
  { key: 'actions', label: '操作' }
]

const { data, pending, refresh } = await useAsyncData(
  'roles',
  () => getRolePage({
    pageNo: page.value,
    pageSize: pageSize.value,
    roleName: search.name || undefined,
    roleCode: search.code || undefined,
    status: search.status
  }),
  { watch: [page] }
)

watch(data, (newVal) => {
  if (newVal && newVal.code === 0) {
    rows.value = newVal.data.list
    total.value = newVal.data.total
  }
}, { immediate: true })

function resetSearch() {
  search.name = ''
  search.code = ''
  search.status = undefined
  refresh()
}

const actions = (row: SystemRoleApi.Role) => [
  [{
    label: '编辑',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row)
  }, {
     label: '删除',
     icon: 'i-heroicons-trash-20-solid',
     click: async () => {
        if(!confirm('确定要删除该角色吗？')) return
        if (row.id) {
            await deleteRole(row.id)
            refresh()
        }
     }
  }]
]
</script>
