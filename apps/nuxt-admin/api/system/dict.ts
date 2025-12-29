import { useRequest } from '~/composables/useRequest'

export namespace SystemDictApi {
    // 字典类型
    export interface DictType {
        id?: number
        name: string
        type: string
        status: number
        remark?: string
        createTime?: string
    }

    // 字典数据
    export interface DictData {
        id?: number
        sort: number
        label: string
        value: string
        dictType: string
        status: number
        colorType?: string
        cssClass?: string
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

// === 字典类型 ===

// 查询字典类型列表（分页）
export const getDictTypePage = (params: PageParam) => {
    return useRequest<PageResult<SystemDictApi.DictType>>('/system/dict-type/page', {
        method: 'GET',
        query: params
    })
}

// 获取字典类型详情
export const getDictType = (id: number) => {
    return useRequest<SystemDictApi.DictType>(`/system/dict-type/get?id=${id}`)
}

// 新增字典类型
export const createDictType = (data: SystemDictApi.DictType) => {
    return useRequest('/system/dict-type/create', {
        method: 'POST',
        body: data
    })
}

// 修改字典类型
export const updateDictType = (data: SystemDictApi.DictType) => {
    return useRequest('/system/dict-type/update', {
        method: 'PUT',
        body: data
    })
}

// 删除字典类型
export const deleteDictType = (id: number) => {
    return useRequest(`/system/dict-type/delete?id=${id}`, {
        method: 'DELETE'
    })
}

// === 字典数据 ===

// 查询字典数据列表（分页）
export const getDictDataPage = (params: PageParam) => {
    return useRequest<PageResult<SystemDictApi.DictData>>('/system/dict-data/page', {
        method: 'GET',
        query: params
    })
}

// 获取字典数据精简列表（根据类型）
export const getSimpleDictDataList = (dictType: string) => {
    return useRequest<SystemDictApi.DictData[]>(`/system/dict-data/simple-list?dictType=${dictType}`)
}

// 获取字典数据详情
export const getDictData = (id: number) => {
    return useRequest<SystemDictApi.DictData>(`/system/dict-data/get?id=${id}`)
}

// 新增字典数据
export const createDictData = (data: SystemDictApi.DictData) => {
    return useRequest('/system/dict-data/create', {
        method: 'POST',
        body: data
    })
}

// 修改字典数据
export const updateDictData = (data: SystemDictApi.DictData) => {
    return useRequest('/system/dict-data/update', {
        method: 'PUT',
        body: data
    })
}

// 删除字典数据
export const deleteDictData = (id: number) => {
    return useRequest(`/system/dict-data/delete?id=${id}`, {
        method: 'DELETE'
    })
}
