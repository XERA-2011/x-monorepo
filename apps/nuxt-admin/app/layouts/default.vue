<template>
  <div class="h-screen flex overflow-hidden bg-gray-100 dark:bg-gray-950">
    <!-- 侧边栏 -->
    <aside class="hidden md:flex md:flex-shrink-0">
      <div class="flex flex-col w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <!-- Logo -->
        <div class="flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-800">
          <span class="text-xl font-bold text-primary-600 dark:text-primary-400">后台管理系统</span>
        </div>

        <!-- 菜单 -->
        <nav class="flex-1 overflow-y-auto py-4 px-3">
          <div class="space-y-1">
            <!-- 工作台 -->
            <NuxtLink to="/" class="menu-item" :class="{ active: $route.path === '/' }">
              <UIcon name="i-heroicons-home" class="w-5 h-5 mr-3" />
              工作台
            </NuxtLink>

            <!-- 系统管理 -->
            <div class="pt-4">
              <p class="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                系统管理
              </p>
              <NuxtLink 
                v-for="child in systemChildren" 
                :key="child.to" 
                :to="child.to" 
                class="menu-item"
                :class="{ active: $route.path === child.to }"
              >
                <UIcon :name="child.icon" class="w-5 h-5 mr-3" />
                {{ child.label }}
              </NuxtLink>
            </div>

            <!-- 个人中心 -->
            <div class="pt-4">
              <p class="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                个人中心
              </p>
              <NuxtLink to="/settings/profile" class="menu-item" :class="{ active: $route.path === '/settings/profile' }">
                <UIcon name="i-heroicons-user-circle" class="w-5 h-5 mr-3" />
                个人设置
              </NuxtLink>
            </div>
          </div>
        </nav>
      </div>
    </aside>

    <!-- 主内容区 -->
    <div class="flex flex-col flex-1 overflow-hidden">
      <!-- 顶部导航 -->
      <header class="flex items-center justify-between h-16 px-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div class="flex items-center">
          <!-- 移动端菜单按钮 -->
          <UButton 
            class="md:hidden" 
            icon="i-heroicons-bars-3" 
            color="gray" 
            variant="ghost"
            @click="mobileMenuOpen = true"
          />
          <!-- 面包屑 -->
          <UBreadcrumb :links="breadcrumbs" class="hidden sm:flex" />
        </div>

        <div class="flex items-center gap-4">
          <!-- 刷新按钮 -->
          <UButton icon="i-heroicons-arrow-path" color="gray" variant="ghost" size="sm" @click="refresh" />
          <!-- 全屏 -->
          <UButton icon="i-heroicons-arrows-pointing-out" color="gray" variant="ghost" size="sm" @click="toggleFullscreen" />
          <!-- 用户头像下拉 -->
          <UDropdown :items="userMenuItems" :popper="{ placement: 'bottom-end' }">
            <div class="flex items-center gap-2 cursor-pointer">
              <UAvatar :src="user?.avatar" :alt="user?.nickname || 'Admin'" size="sm" />
              <span class="hidden lg:block text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ user?.nickname || '用户' }}
              </span>
              <UIcon name="i-heroicons-chevron-down" class="text-gray-400" />
            </div>
          </UDropdown>
        </div>
      </header>

      <!-- 内容区 -->
      <main class="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-950">
        <slot />
      </main>
    </div>

    <!-- 移动端侧边栏 -->
    <USlideover v-model="mobileMenuOpen" side="left">
      <div class="p-4">
        <div class="flex items-center justify-between mb-6">
          <span class="text-lg font-bold text-primary-600">后台管理系统</span>
          <UButton icon="i-heroicons-x-mark" color="gray" variant="ghost" @click="mobileMenuOpen = false" />
        </div>
        <nav class="space-y-1">
          <NuxtLink to="/" class="menu-item" @click="mobileMenuOpen = false">
            <UIcon name="i-heroicons-home" class="w-5 h-5 mr-3" />
            工作台
          </NuxtLink>
          <p class="px-3 pt-4 text-xs font-semibold text-gray-400 uppercase">系统管理</p>
          <NuxtLink 
            v-for="child in systemChildren" 
            :key="child.to" 
            :to="child.to" 
            class="menu-item"
            @click="mobileMenuOpen = false"
          >
            <UIcon :name="child.icon" class="w-5 h-5 mr-3" />
            {{ child.label }}
          </NuxtLink>
        </nav>
      </div>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const mobileMenuOpen = ref(false)

const systemChildren = [
  { label: '用户管理', icon: 'i-heroicons-users', to: '/system/user' },
  { label: '角色管理', icon: 'i-heroicons-identification', to: '/system/role' },
  { label: '菜单管理', icon: 'i-heroicons-bars-3', to: '/system/menu' },
  { label: '部门管理', icon: 'i-heroicons-building-office', to: '/system/dept' },
  { label: '岗位管理', icon: 'i-heroicons-briefcase', to: '/system/post' },
  { label: '字典管理', icon: 'i-heroicons-book-open', to: '/system/dict' },
  { label: '租户管理', icon: 'i-heroicons-user-group', to: '/system/tenant' },
  { label: '租户套餐', icon: 'i-heroicons-rectangle-stack', to: '/system/tenant/package' }
]

const { user, logout } = useAuth()

// 面包屑
const breadcrumbs = computed(() => {
  const paths = route.path.split('/').filter(Boolean)
  const crumbs = [{ label: '首页', to: '/' }]
  
  const labelMap: Record<string, string> = {
    'system': '系统管理',
    'user': '用户管理',
    'role': '角色管理',
    'menu': '菜单管理',
    'dept': '部门管理',
    'post': '岗位管理',

    'dict': '字典管理',
    'tenant': '租户管理',
    'package': '租户套餐',
    'settings': '设置',
    'profile': '个人设置'
  }
  
  let currentPath = ''
  paths.forEach(p => {
    currentPath += '/' + p
    crumbs.push({ label: labelMap[p] || p, to: currentPath })
  })
  
  return crumbs
})

// 用户菜单
const userMenuItems = computed(() => [
  [{
    label: user.value?.nickname || '用户',
    slot: 'account',
    disabled: true
  }],
  [{
    label: '个人设置',
    icon: 'i-heroicons-user-circle',
    to: '/settings/profile'
  }],
  [{
    label: '退出登录',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: logout
  }]
])

// 刷新页面
function refresh() {
  window.location.reload()
}

// 全屏切换
function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}
</script>

<style scoped>
.menu-item {
  @apply flex items-center px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors;
}
.menu-item.active {
  @apply bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 font-semibold;
}
</style>
