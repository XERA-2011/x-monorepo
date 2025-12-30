import type { PageParam, PageResult } from '~/types/global'

export namespace SystemTenantPackageApi {
    export interface TenantPackage {
        id?: number
        name: string
        status: number
        remark: string
        menuIds: number[]
        createTime?: string
    }
}

// 租户套餐列表
export function getTenantPackagePage(params: PageParam) {
    return useRequest<PageResult<SystemTenantPackageApi.TenantPackage>>('/system/tenant-package/page', {
        method: 'GET',
        params
    })
}

// 查询租户套餐详情
export function getTenantPackage(id: number) {
    return useRequest<SystemTenantPackageApi.TenantPackage>(`/system/tenant-package/get?id=${id}`, {
        method: 'GET'
    })
}

// 新增租户套餐
export function createTenantPackage(data: SystemTenantPackageApi.TenantPackage) {
    return useRequest('/system/tenant-package/create', {
        method: 'POST',
        body: data
    })
}

// 修改租户套餐
export function updateTenantPackage(data: SystemTenantPackageApi.TenantPackage) {
    return useRequest('/system/tenant-package/update', {
        method: 'PUT',
        body: data
    })
}

// 删除租户套餐
export function deleteTenantPackage(id: number) {
    return useRequest(`/system/tenant-package/delete?id=${id}`, {
        method: 'DELETE'
    })
}

// 批量删除租户套餐
export function deleteTenantPackageList(ids: number[]) {
    return useRequest(`/system/tenant-package/delete-list?ids=${ids.join(',')}`, {
        method: 'DELETE'
    })
}

// 获取租户套餐精简信息列表
export function getTenantPackageList() {
    return useRequest<SystemTenantPackageApi.TenantPackage[]>('/system/tenant-package/get-simple-list', {
        method: 'GET'
    })
}
