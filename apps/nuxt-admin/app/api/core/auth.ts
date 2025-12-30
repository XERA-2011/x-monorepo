import { useRequest } from '~/composables/useRequest'

export namespace AuthApi {
    export interface LoginParams {
        username?: string
        password?: string
        captchaVerification?: string // 验证码验证结果
    }

    export interface LoginResult {
        accessToken: string
        refreshToken: string
        userId: number
        expiresTime: number
    }

    export interface UserInfo {
        user: {
            id: number
            username: string
            nickname: string
            avatar: string
            mobile?: string
            email?: string
            sex?: number
            createTime?: number
            loginDate?: number
            dept?: {
                id: number
                name: string
            }
            roles?: Array<{
                id: number
                name: string
            }>
            posts?: Array<{
                id: number
                name: string
            }>
        }
        roles: string[]
        permissions: string[]
    }

    export interface CaptchaResult {
        repCode: string
        repData: {
            originalImageBase64: string
            jigsawImageBase64: string
            token: string
        }
    }
}

// 获取验证码 - 返回格式是 { repCode, repData }
export const getCaptchaApi = (data: { captchaType: string }) => {
    return useRequest<any>('/system/captcha/get', {
        method: 'POST',
        body: data
    })
}

// 校验验证码
export const checkCaptchaApi = (data: any) => {
    return useRequest<any>('/system/captcha/check', {
        method: 'POST',
        body: data
    })
}

// 登录接口
export const loginApi = (data: AuthApi.LoginParams) => {
    return useRequest<AuthApi.LoginResult>('/system/auth/login', {
        method: 'POST',
        body: data
    })
}

// 获取用户信息和权限
export const getPermissionInfoApi = () => {
    return useRequest<AuthApi.UserInfo>('/system/auth/get-permission-info', {
        method: 'GET'
    })
}

// 登出
export const logoutApi = () => {
    return useRequest('/system/auth/logout', {
        method: 'POST'
    })
}
