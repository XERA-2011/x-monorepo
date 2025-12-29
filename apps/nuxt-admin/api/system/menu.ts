import { useRequest } from '~/composables/useRequest'

export namespace SystemMenuApi {
    export interface Menu {
        id?: number
        name: string
        permission?: string
        type: number  // 1: 目录, 2: 菜单, 3: 按钮
        sort: number
        parentId: number
        path?: string
        icon?: string
        component?: string
        componentName?: string
        status: number
        visible?: boolean
        keepAlive?: boolean
        alwaysShow?: boolean
        createTime?: string
        children?: Menu[]
    }
}

// 查询菜单列表
export const getMenuList = (params?: Record<string, any>) => {
    return useRequest<SystemMenuApi.Menu[]>('/system/menu/list', {
        method: 'GET',
        query: params
    })
}

// 获取菜单精简列表
export const getSimpleMenusList = () => {
    return useRequest<SystemMenuApi.Menu[]>('/system/menu/simple-list')
}

// 获取菜单详情
export const getMenu = (id: number) => {
    return useRequest<SystemMenuApi.Menu>(`/system/menu/get?id=${id}`)
}

// 新增菜单
export const createMenu = (data: SystemMenuApi.Menu) => {
    return useRequest('/system/menu/create', {
        method: 'POST',
        body: data
    })
}

// 修改菜单
export const updateMenu = (data: SystemMenuApi.Menu) => {
    return useRequest('/system/menu/update', {
        method: 'PUT',
        body: data
    })
}

// 删除菜单
export const deleteMenu = (id: number) => {
    return useRequest(`/system/menu/delete?id=${id}`, {
        method: 'DELETE'
    })
}
