import type { PageParam, PageResult } from '~/types/global'

export namespace SystemTenantApi {
    export interface Tenant {
        id?: number
        name: string
        packageId: number
        contactName: string
        contactMobile: string
        accountCount: number
        expireTime: string | number
        websites: string[]
        status: number
        username?: string
        password?: string
    }
}

// 租户列表
export function getTenantPage(params: PageParam) {
    return useRequest<PageResult<SystemTenantApi.Tenant>>('/system/tenant/page', {
        method: 'GET',
        params
    })
}

// 查询租户详情
export function getTenant(id: number) {
    return useRequest<SystemTenantApi.Tenant>(`/system/tenant/get?id=${id}`, {
        method: 'GET'
    })
}

// 新增租户
export function createTenant(data: SystemTenantApi.Tenant) {
    return useRequest('/system/tenant/create', {
        method: 'POST',
        body: data
    })
}

// 修改租户
export function updateTenant(data: SystemTenantApi.Tenant) {
    return useRequest('/system/tenant/update', {
        method: 'PUT',
        body: data
    })
}

// 删除租户
export function deleteTenant(id: number) {
    return useRequest(`/system/tenant/delete?id=${id}`, {
        method: 'DELETE'
    })
}

// 批量删除租户
export function deleteTenantList(ids: number[]) {
    return useRequest(`/system/tenant/delete-list?ids=${ids.join(',')}`, {
        method: 'DELETE'
    })
}

// 导出租户
export function exportTenant(params: any) {
    return useRequest('/system/tenant/export-excel', {
        method: 'GET',
        params,
        responseType: 'blob'
    })
}
