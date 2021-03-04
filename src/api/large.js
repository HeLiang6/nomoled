import request from '@/utils/request'
// Dtu设备统计
export function getDtuStatistic (data) {
  return request({
    url: '/api/getDtuStatistic',
    method: 'post',
    data: data
  })
}
// Rtu设备统计
export function getRtuStatistic (data) {
  return request({
    url: '/api/getRtuStatistic',
    method: 'post',
    data: data
  })
}
// 警情态势统计数据
export function getAlarmStatistic (data) {
  return request({
    url: '/api/getAlarmStatistic',
    method: 'post',
    data: data
  })
}
// 发电量日统计数据
export function getEnergyDailyStatistic (data) {
  return request({
    url: '/api/getEnergyDailyStatistic',
    method: 'post',
    data: data
  })
}
// 发电量月统计数据
export function getEnergyMonthlyStatistic (data) {
  return request({
    url: '/api/getEnergyMonthlyStatistic',
    method: 'post',
    data: data
  })
}
// 充电桩统计数据
export function getChargeTradeStatistic (data) {
  return request({
    url: '/api/getChargeTradeStatistic',
    method: 'post',
    data: data
  })
}
