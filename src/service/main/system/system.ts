import request from '@/service'

export function getSystemRequest(url: string, queryInfo: any) {
  return request.post<any>({
    url: url,
    data: queryInfo
  })
}
