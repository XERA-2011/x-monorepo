<template>
  <div class="space-y-6">
    <!-- 欢迎卡片 -->
    <UCard>
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ greeting }}，{{ user?.nickname || '用户' }}！
          </h1>
          <p class="text-gray-500 mt-1">欢迎回到后台管理系统</p>
        </div>
        <div class="hidden sm:block">
          <p class="text-sm text-gray-500">{{ currentDate }}</p>
          <p class="text-2xl font-mono text-gray-700 dark:text-gray-300">{{ currentTime }}</p>
        </div>
      </div>
    </UCard>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard v-for="stat in stats" :key="stat.label" :ui="{ body: { padding: 'p-4' } }">
        <div class="flex items-center">
          <div 
            class="flex items-center justify-center w-12 h-12 rounded-lg" 
            :class="stat.bgColor"
          >
            <UIcon :name="stat.icon" class="w-6 h-6" :class="stat.iconColor" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stat.value }}</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- 两列布局 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 快捷操作 -->
      <UCard class="lg:col-span-1">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="font-semibold">快捷操作</h3>
          </div>
        </template>
        <div class="grid grid-cols-2 gap-3">
          <NuxtLink 
            v-for="action in quickActions" 
            :key="action.to" 
            :to="action.to"
            class="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div 
              class="flex items-center justify-center w-10 h-10 rounded-lg mb-2"
              :class="action.bgColor"
            >
              <UIcon :name="action.icon" class="w-5 h-5" :class="action.iconColor" />
            </div>
            <span class="text-sm text-gray-600 dark:text-gray-400">{{ action.label }}</span>
          </NuxtLink>
        </div>
      </UCard>

      <!-- 系统信息 -->
      <UCard class="lg:col-span-2">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="font-semibold">系统信息</h3>
          </div>
        </template>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p class="text-sm text-gray-500">服务器地址</p>
              <p class="font-mono text-sm text-gray-900 dark:text-white">8.129.84.229</p>
            </div>
            <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p class="text-sm text-gray-500">API 版本</p>
              <p class="font-mono text-sm text-gray-900 dark:text-white">v1.0.0</p>
            </div>
            <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p class="text-sm text-gray-500">前端框架</p>
              <p class="font-mono text-sm text-gray-900 dark:text-white">Nuxt 4 + Vue 3</p>
            </div>
            <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p class="text-sm text-gray-500">UI 组件库</p>
              <p class="font-mono text-sm text-gray-900 dark:text-white">Nuxt UI</p>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user } = useAuth()

// 问候语
const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 6) return '凌晨好'
  if (hour < 9) return '早上好'
  if (hour < 12) return '上午好'
  if (hour < 14) return '中午好'
  if (hour < 17) return '下午好'
  if (hour < 19) return '傍晚好'
  return '晚上好'
})

// 当前日期时间
const currentDate = ref('')
const currentTime = ref('')

function updateTime() {
  const now = new Date()
  currentDate.value = now.toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  })
  currentTime.value = now.toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  })
}

onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
})

// 统计数据
const stats = [
  { 
    label: '用户总数', 
    value: '1,234', 
    icon: 'i-heroicons-users', 
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400'
  },
  { 
    label: '角色数量', 
    value: '12', 
    icon: 'i-heroicons-shield-check', 
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400'
  },
  { 
    label: '菜单数量', 
    value: '48', 
    icon: 'i-heroicons-bars-3', 
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400'
  },
  { 
    label: '在线用户', 
    value: '5', 
    icon: 'i-heroicons-signal', 
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    iconColor: 'text-orange-600 dark:text-orange-400'
  }
]

// 快捷操作
const quickActions = [
  { 
    label: '用户管理', 
    icon: 'i-heroicons-users', 
    to: '/system/user',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400'
  },
  { 
    label: '角色管理', 
    icon: 'i-heroicons-identification', 
    to: '/system/role',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400'
  },
  { 
    label: '菜单管理', 
    icon: 'i-heroicons-bars-3', 
    to: '/system/menu',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400'
  },
  { 
    label: '个人设置', 
    icon: 'i-heroicons-cog-6-tooth', 
    to: '/settings/profile',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
    iconColor: 'text-gray-600 dark:text-gray-400'
  }
]
</script>
