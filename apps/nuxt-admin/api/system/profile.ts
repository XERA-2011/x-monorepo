import { useRequest } from '~/composables/useRequest'
import type { SystemUserApi } from './user'

export namespace SystemProfileApi {
    export interface UserProfile extends SystemUserApi.User {
        // Add any profile-specific fields if needed, currently reusing User
    }

    export interface UpdatePasswordParams {
        oldPassword?: string;
        newPassword?: string;
    }
}

// 获取个人信息
export const getUserProfile = () => {
    return useRequest<SystemProfileApi.UserProfile>('/system/user/profile/get')
}

// 修改个人信息
export const updateUserProfile = (data: SystemProfileApi.UserProfile) => {
    return useRequest('/system/user/profile/update', {
        method: 'PUT',
        body: data
    })
}

// 修改密码
export const updateUserPassword = (params: SystemProfileApi.UpdatePasswordParams) => {
    return useRequest('/system/user/profile/update-password', {
        method: 'PUT',
        body: params
    })
}

// 上传头像
export const uploadAvatar = (data: FormData) => {
    return useRequest<string>('/system/user/profile/update-avatar', {
        method: 'PUT',
        body: data
    })
}
