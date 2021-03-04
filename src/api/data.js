import request from '@/utils/request'
// 查询路灯数据
export function getLightData (data) {
  return request({
    url: '/api/getLightData',
    method: 'post',
    data: data
  })
}
// 故障统计数据
export function getWarnStatistic (data) {
  return request({
    url: '/api/getWarnStatistic',
    method: 'post',
    data: data
  })
}
