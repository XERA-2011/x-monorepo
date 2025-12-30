import dayjs from 'dayjs'

export function formatDate(date: string | number | Date | undefined, format = 'YYYY-MM-DD HH:mm:ss') {
    if (!date) return '-'
    return dayjs(date).format(format)
}
