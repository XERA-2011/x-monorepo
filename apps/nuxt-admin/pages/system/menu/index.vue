<template>
  <div class="p-4 space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold">菜单管理</h2>
      <UButton icon="i-heroicons-plus" color="primary" @click="handleCreate">新增菜单</UButton>
    </div>

    <!-- 搜索 -->
    <UCard :ui="{ body: { padding: 'p-4' } }">
      <div class="flex gap-4">
        <UInput v-model="search.name" placeholder="菜单名称" icon="i-heroicons-magnifying-glass" />
        <USelect v-model="search.status" :options="statusOptions" placeholder="状态" />
        <div class="flex-1"></div>
        <UButton icon="i-heroicons-magnifying-glass" color="gray" variant="ghost" @click="refresh">搜索</UButton>
        <UButton icon="i-heroicons-arrow-path" color="gray" variant="ghost" @click="resetSearch">重置</UButton>
      </div>
    </UCard>

    <!-- 表格 -->
    <UCard :ui="{ body: { padding: 'p-0' } }">
      <UTable :rows="rows" :columns="columns" :loading="pending">
        <template #type-data="{ row }">
          <UBadge :color="getTypeColor(row.type)" variant="subtle">
            {{ getTypeLabel(row.type) }}
          </UBadge>
        </template>

        <template #status-data="{ row }">
          <UBadge :color="row.status === 0 ? 'green' : 'red'" variant="subtle">
            {{ row.status === 0 ? '正常' : '停用' }}
          </UBadge>
        </template>

        <template #icon-data="{ row }">
          <UIcon v-if="row.icon" :name="row.icon" class="text-lg" />
          <span v-else class="text-gray-400">-</span>
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
import { getMenuList, deleteMenu, type SystemMenuApi } from '~/api/system/menu'

const rows = ref<SystemMenuApi.Menu[]>([])
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
  { key: 'name', label: '菜单名称' },
  { key: 'icon', label: '图标' },
  { key: 'type', label: '类型' },
  { key: 'sort', label: '排序' },
  { key: 'permission', label: '权限标识' },
  { key: 'path', label: '路由地址' },
  { key: 'status', label: '状态' },
  { key: 'actions', label: '操作' }
]

function getTypeLabel(type: number) {
  const map: Record<number, string> = { 1: '目录', 2: '菜单', 3: '按钮' }
  return map[type] || '未知'
}

function getTypeColor(type: number) {
  const map: Record<number, string> = { 1: 'blue', 2: 'green', 3: 'orange' }
  return map[type] || 'gray'
}

async function refresh() {
  pending.value = true
  try {
    const res = await getMenuList({
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
  // TODO: 打开新增弹窗
  console.log('Create menu')
}

const actions = (row: SystemMenuApi.Menu) => [
  [{
    label: '编辑',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row)
  }, {
    label: '新增子菜单',
    icon: 'i-heroicons-plus-20-solid',
    click: () => console.log('Add child', row)
  }, {
    label: '删除',
    icon: 'i-heroicons-trash-20-solid',
    click: async () => {
      if (!confirm('确定要删除该菜单吗？')) return
      if (row.id) {
        await deleteMenu(row.id)
        refresh()
      }
    }
  }]
]

onMounted(() => {
  refresh()
})
</script>
