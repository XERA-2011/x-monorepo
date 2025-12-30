<template>
  <div class="p-4 space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold">用户管理</h2>
      <UButton icon="i-heroicons-plus" color="primary" @click="() => { currentId = undefined; isOpen = true }">新增用户</UButton>
    </div>

    <!-- Search / Filter -->
    <UCard :ui="{ body: { padding: 'p-4' } }">
      <div class="flex gap-4">
        <UInput v-model="search.username" placeholder="用户名" icon="i-heroicons-user" />
        <UInput v-model="search.mobile" placeholder="手机号" icon="i-heroicons-phone" />
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

      <!-- Pagination -->
      <div class="flex justify-end p-4 border-t dark:border-gray-800">
        <UPagination v-model="page" :page-count="pageSize" :total="total" />
      </div>
    </UCard>

    <!-- Modal Component -->
    <UserModal v-model="isOpen" :user-id="currentId" @success="refresh" />
  </div>
</template>

<script setup lang="ts">
import { getUserPage, deleteUser, type SystemUserApi } from '~/api/system/user'
import UserModal from './components/UserModal.vue'

const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const rows = ref<SystemUserApi.User[]>([])
const isOpen = ref(false)
const currentId = ref<number | undefined>(undefined)

// Filters
const search = reactive({
  username: '',
  mobile: '',
  status: undefined
})

const statusOptions = [
  { label: '正常', value: 0 },
  { label: '停用', value: 1 }
]

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'username', label: '用户名' },
  { key: 'nickname', label: '昵称' },
  { key: 'mobile', label: '手机号' },
  { key: 'status', label: '状态' },
  { key: 'createTime', label: '创建时间' },
  { key: 'actions', label: '操作' }
]

// Fetch Data
const { data, pending, refresh } = await useAsyncData(
  'users',
  async () => {
    const res = await getUserPage({ 
        pageNo: page.value, 
        pageSize: pageSize.value, 
        username: search.username || undefined,
        mobile: search.mobile || undefined,
        status: search.status
    })
    return res
  },
  {
    watch: [page]
  }
)

// Update rows when data changes
watch(data, (newVal) => {
  if (newVal && newVal.code === 0) {
    rows.value = newVal.data.list
    total.value = newVal.data.total
  }
}, { immediate: true })

function resetSearch() {
  search.username = ''
  search.mobile = ''
  search.status = undefined
  refresh()
}

const actions = (row: SystemUserApi.User) => [
  [{
    label: '编辑',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {
        currentId.value = row.id
        isOpen.value = true
    }
  }, {
    label: '删除',
    icon: 'i-heroicons-trash-20-solid',
    click: async () => {
        if(!confirm('确定要删除该用户吗？')) return
        if (row.id) {
            await deleteUser(row.id)
            refresh()
        }
    }
  }]
]
</script>
