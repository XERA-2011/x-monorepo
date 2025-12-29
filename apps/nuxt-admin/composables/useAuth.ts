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
        const res = await getPermissionInfoApi()
        if (res && res.code === 0) {
            user.value = res.data.user
            permissions.value = res.data.permissions
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
