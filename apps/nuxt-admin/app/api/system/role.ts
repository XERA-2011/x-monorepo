import { useRequest } from '~/composables/useRequest'

export namespace SystemRoleApi {
    export interface Role {
        id?: number
        roleName: string
        roleCode: string
        roleDesc?: string
        sort?: number
        status?: number
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

// 查询角色列表
export const getRolePage = (params: PageParam) => {
    return useRequest<PageResult<SystemRoleApi.Role>>('/system/role/page', {
        method: 'GET',
        query: params
    })
}

// 获取角色详情
export const getRole = (id: number) => {
    return useRequest<SystemRoleApi.Role>(`/system/role/get?id=${id}`)
}

// 新增角色
export const createRole = (data: SystemRoleApi.Role) => {
    return useRequest('/system/role/create', {
        method: 'POST',
        body: data
    })
}

// 修改角色
export const updateRole = (data: SystemRoleApi.Role) => {
    return useRequest('/system/role/update', {
        method: 'PUT',
        body: data
    })
}

// 删除角色
export const deleteRole = (id: number) => {
    return useRequest(`/system/role/delete?id=${id}`, {
        method: 'DELETE'
    })
}

// 修改状态
export const updateRoleStatus = (id: number, status: number) => {
    return useRequest('/system/role/update-status', {
        method: 'PUT',
        body: { id, status }
    })
}
