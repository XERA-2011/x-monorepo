import { loginApi, getPermissionInfoApi, logoutApi, type AuthApi } from '~/api/core/auth'

export const useAuth = () => {
    const token = useCookie('accessToken')
    const refreshToken = useCookie('refreshToken')
    const user = useState<AuthApi.UserInfo['user'] | null>('user', () => null)
    const permissions = useState<string[]>('permissions', () => [])

    const router = useRouter()

    const login = async (params: AuthApi.LoginParams) => {
        try {
            const res = await loginApi(params)

            if (res && res.code === 0) {
                // 保存 Token
                const result = res.data
                token.value = result.accessToken
                refreshToken.value = result.refreshToken

                console.log('[useAuth] Token saved:', result.accessToken)

                // 等待 Vue 响应式系统更新，确保 cookie 值同步
                await nextTick()

                // 登录成功后获取用户信息
                await fetchUserInfo()

                return navigateTo('/')
            } else {
                throw new Error(res?.msg || 'Login failed')
            }
        } catch (e: any) {
            throw createError({
                statusCode: 500,
                message: e.message || 'Login failed'
            })
        }
    }

    const fetchUserInfo = async () => {
        console.log('[useAuth] Fetching user info...')
        const res = await getPermissionInfoApi()
        console.log('[useAuth] Permission info response:', res)
        if (res && res.code === 0) {
            user.value = res.data.user
            permissions.value = res.data.permissions
            console.log('[useAuth] User info saved:', user.value)
        } else {
            console.error('[useAuth] Failed to get user info:', res)
        }
    }

    const logout = async () => {
        try {
            await logoutApi()
        } catch (e) {
            console.error(e)
        } finally {
            token.value = null
            refreshToken.value = null
            user.value = null
            permissions.value = []
            router.push('/login')
        }
    }

    return {
        token,
        user,
        permissions,
        login,
        logout,
        fetchUserInfo
    }
}
