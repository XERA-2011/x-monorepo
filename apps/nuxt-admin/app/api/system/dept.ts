import { useRequest } from '~/composables/useRequest'

export namespace SystemDeptApi {
    export interface Dept {
        id?: number
        name: string
        parentId: number
        sort: number
        leaderUserId?: number
        phone?: string
        email?: string
        status: number
        createTime?: string
        children?: Dept[]
    }
}

// 查询部门列表
export const getDeptList = (params?: Record<string, any>) => {
    return useRequest<SystemDeptApi.Dept[]>('/system/dept/list', {
        method: 'GET',
        query: params
    })
}

// 获取部门精简列表
export const getSimpleDeptList = () => {
    return useRequest<SystemDeptApi.Dept[]>('/system/dept/simple-list')
}

// 获取部门详情
export const getDept = (id: number) => {
    return useRequest<SystemDeptApi.Dept>(`/system/dept/get?id=${id}`)
}

// 新增部门
export const createDept = (data: SystemDeptApi.Dept) => {
    return useRequest('/system/dept/create', {
        method: 'POST',
        body: data
    })
}

// 修改部门
export const updateDept = (data: SystemDeptApi.Dept) => {
    return useRequest('/system/dept/update', {
        method: 'PUT',
        body: data
    })
}

// 删除部门
export const deleteDept = (id: number) => {
    return useRequest(`/system/dept/delete?id=${id}`, {
        method: 'DELETE'
    })
}
