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
    const tokenCookie = useCookie('accessToken')
    const refreshTokenCookie = useCookie('refreshToken')

    // 获取当前 token
    const getAuthHeaders = () => {
        const currentToken = tokenCookie.value
        console.log('[useRequest] Token for request:', currentToken ? 'present' : 'empty')
        return {
            Authorization: currentToken ? `Bearer ${currentToken}` : '',
            'tenant-id': DEFAULT_TENANT_ID
        }
    }

    const defaultOptions: FetchOptions = {
        baseURL: config.public.apiBase,
        headers: getAuthHeaders(),
        onResponse({ response }) {
            // 处理 HTTP 401 未授权错误
            if (response.status === 401) {
                handleUnauthorized()
            }
            // 处理响应体中的 code: 401（业务层面的未登录）
            if (response._data?.code === 401) {
                handleUnauthorized()
            }
        },
        onResponseError({ response }) {
            // 处理其他 HTTP 错误
            console.error('API Error:', response.status, response._data)
        }
    }

    // 处理未授权的统一方法
    function handleUnauthorized() {
        // 清除认证信息
        tokenCookie.value = null
        refreshTokenCookie.value = null
        // 使用 navigateTo 进行客户端导航
        if (import.meta.client) {
            navigateTo('/login')
        }
    }

    // 合并用户传入的 headers 和默认 headers
    const mergedOpts = {
        ...defaultOptions,
        ...opts,
        headers: {
            ...getAuthHeaders(),
            ...(opts?.headers as Record<string, string> || {})
        }
    }

    // 使用 $fetch 进行请求（适用于用户交互触发的请求）
    return $fetch<ApiResponse<T>>(url, mergedOpts as any)
}
