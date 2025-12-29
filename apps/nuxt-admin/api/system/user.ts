import { useRequest } from '~/composables/useRequest'

export namespace SystemUserApi {
    export interface User {
        id?: number
        username: string
        nickname: string
        deptId?: number
        postIds?: string[]
        email?: string
        mobile?: string
        sex?: number
        avatar?: string
        status?: number
        remark?: string
        createTime?: string
    }
}

interface PageParam {
    pageNo?: number
    pageSize?: number
    [key: string]: any
}

interface PageResult<T> {
    list: T[]
    total: number
}

// 查询用户列表
export const getUserPage = (params: PageParam) => {
    return useRequest<PageResult<SystemUserApi.User>>('/system/user/page', {
        method: 'GET',
        query: params
    })
}

// 获取用户详情
export const getUser = (id: number) => {
    return useRequest<SystemUserApi.User>(`/system/user/get?id=${id}`)
}

// 新增用户
export const createUser = (data: SystemUserApi.User) => {
    return useRequest('/system/user/create', {
        method: 'POST',
        body: data
    })
}

// 修改用户
export const updateUser = (data: SystemUserApi.User) => {
    return useRequest('/system/user/update', {
        method: 'PUT',
        body: data
    })
}

// 删除用户
export const deleteUser = (id: number) => {
    return useRequest(`/system/user/delete?id=${id}`, {
        method: 'DELETE'
    })
}

// 修改状态
export const updateUserStatus = (id: number, status: number) => {
    return useRequest('/system/user/update-status', {
        method: 'PUT',
        body: { id, status }
    })
}

// 重置密码
export const resetUserPassword = (id: number, password: string) => {
    return useRequest('/system/user/update-password', {
        method: 'PUT',
        body: { id, password }
    })
}
