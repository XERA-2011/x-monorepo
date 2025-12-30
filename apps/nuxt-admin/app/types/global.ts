export interface PageParam {
    pageNo: number
    pageSize: number
    [key: string]: any
}

export interface PageResult<T> {
    list: T[]
    total: number
}
