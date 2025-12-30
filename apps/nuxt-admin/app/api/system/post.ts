import { useRequest } from '~/composables/useRequest'

export namespace SystemPostApi {
    export interface Post {
        id?: number
        name: string
        code: string
        sort: number
        status: number
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

// 查询岗位列表（分页）
export const getPostPage = (params: PageParam) => {
    return useRequest<PageResult<SystemPostApi.Post>>('/system/post/page', {
        method: 'GET',
        query: params
    })
}

// 获取岗位精简列表
export const getSimplePostList = () => {
    return useRequest<SystemPostApi.Post[]>('/system/post/simple-list')
}

// 获取岗位详情
export const getPost = (id: number) => {
    return useRequest<SystemPostApi.Post>(`/system/post/get?id=${id}`)
}

// 新增岗位
export const createPost = (data: SystemPostApi.Post) => {
    return useRequest('/system/post/create', {
        method: 'POST',
        body: data
    })
}

// 修改岗位
export const updatePost = (data: SystemPostApi.Post) => {
    return useRequest('/system/post/update', {
        method: 'PUT',
        body: data
    })
}

// 删除岗位
export const deletePost = (id: number) => {
    return useRequest(`/system/post/delete?id=${id}`, {
        method: 'DELETE'
    })
}
