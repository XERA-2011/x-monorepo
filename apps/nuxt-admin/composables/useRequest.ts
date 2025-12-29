import type { FetchOptions } from 'ofetch'

// 定义统一的 API 响应结构
interface ApiResponse<T = any> {
    code: number
    data: T
    msg: string
}

// 默认租户 ID
const DEFAULT_TENANT_ID = '1'

export const useRequest = <T = any>(url: string, opts?: FetchOptions) => {
    const config = useRuntimeConfig()
    const token = useCookie('accessToken')
    const router = useRouter()

    const defaultOptions: FetchOptions = {
        baseURL: config.public.apiBase,
        headers: {
            Authorization: token.value ? `Bearer ${token.value}` : '',
            'tenant-id': DEFAULT_TENANT_ID
        },
        onResponse({ response }) {
            // 处理 401 未授权错误
            if (response.status === 401) {
                token.value = null
                router.push('/login')
            }
        },
        onResponseError({ response }) {
            // 处理其他 HTTP 错误
            console.error('API Error:', response.status, response._data)
        }
    }

    // 使用 $fetch 进行请求（适用于用户交互触发的请求）
    return $fetch<ApiResponse<T>>(url, { ...defaultOptions, ...opts } as any)
}
