<template>
  <div class="p-4 space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold">字典管理</h2>
      <UButton icon="i-heroicons-plus" color="primary" @click="handleCreate">新增字典类型</UButton>
    </div>

    <!-- 搜索 -->
    <UCard :ui="{ body: { padding: 'p-4' } }">
      <div class="flex gap-4">
        <UInput v-model="search.name" placeholder="字典名称" icon="i-heroicons-magnifying-glass" />
        <UInput v-model="search.type" placeholder="字典类型" icon="i-heroicons-code-bracket" />
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

        <template #type-data="{ row }">
          <UButton 
            variant="link" 
            color="primary" 
            class="p-0"
            @click="viewDictData(row)"
          >
            {{ row.type }}
          </UButton>
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

      <div class="flex justify-end p-4 border-t dark:border-gray-800">
        <UPagination v-model="page" :page-count="pageSize" :total="total" />
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { getDictTypePage, deleteDictType, type SystemDictApi } from '~/api/system/dict'

const router = useRouter()

const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const rows = ref<SystemDictApi.DictType[]>([])
const pending = ref(false)

const search = reactive({
  name: '',
  type: '',
  status: undefined
})

const statusOptions = [
  { label: '正常', value: 0 },
  { label: '停用', value: 1 }
]

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: '字典名称' },
  { key: 'type', label: '字典类型' },
  { key: 'status', label: '状态' },
  { key: 'remark', label: '备注' },
  { key: 'createTime', label: '创建时间' },
  { key: 'actions', label: '操作' }
]

async function refresh() {
  pending.value = true
  try {
    const res = await getDictTypePage({
      pageNo: page.value,
      pageSize: pageSize.value,
      name: search.name || undefined,
      type: search.type || undefined,
      status: search.status
    })
    if (res && res.code === 0) {
      rows.value = res.data.list || []
      total.value = res.data.total || 0
    }
  } catch (e) {
    console.error(e)
  } finally {
    pending.value = false
  }
}

function resetSearch() {
  search.name = ''
  search.type = ''
  search.status = undefined
  refresh()
}

function handleCreate() {
  console.log('Create dict type')
}

function viewDictData(row: SystemDictApi.DictType) {
  // 跳转到字典数据页面
  router.push(`/system/dict/data?type=${row.type}`)
}

const actions = (row: SystemDictApi.DictType) => [
  [{
    label: '编辑',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row)
  }, {
    label: '字典数据',
    icon: 'i-heroicons-list-bullet-20-solid',
    click: () => viewDictData(row)
  }, {
    label: '删除',
    icon: 'i-heroicons-trash-20-solid',
    click: async () => {
      if (!confirm('确定要删除该字典类型吗？')) return
      if (row.id) {
        await deleteDictType(row.id)
        refresh()
      }
    }
  }]
]

watch(page, () => refresh())

onMounted(() => {
  refresh()
})
</script>
