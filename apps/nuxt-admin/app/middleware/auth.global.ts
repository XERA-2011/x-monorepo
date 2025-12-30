/**
 * 认证中间件
 * - 检查用户是否已登录
 * - 自动获取用户信息（如果有 token 但没有用户信息）
 */
export default defineNuxtRouteMiddleware(async (to) => {
    const { token, user, fetchUserInfo } = useAuth()

    // Allow access to login page
    if (to.path === '/login') {
        // If already logged in, redirect to home
        if (token.value) {
            return navigateTo('/')
        }
        return
    }

    // If not logged in, redirect to login
    if (!token.value) {
        return navigateTo('/login')
    }

    // 有 token 但没有用户信息（页面刷新后的情况），自动获取用户信息
    if (!user.value) {
        try {
            console.log('[auth middleware] Fetching user info...')
            await fetchUserInfo()
        } catch (e) {
            console.error('[auth middleware] Failed to fetch user info:', e)
            // 获取用户信息失败，可能 token 过期，跳转登录页
            return navigateTo('/login')
        }
    }
})
