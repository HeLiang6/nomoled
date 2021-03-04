import request from '@/utils/request'
// 区域、分组
// 获取区域列表
export function zoneId (data) {
  return request({
    url: '/api/getZoneList',
    method: 'post',
    data: data
  })
}

// 创建分组、区域
export function zones (data) {
  return request({
    url: '/api/addZone',
    method: 'post',
    data: data
  })
}
// 删除
export function zonesDelete (data) {
  return request({
    url: '/api/delZone/',
    method: 'delete',
    data: data
  })
}
// 改变该区域的RTU列表
export function alterZone (data) {
  return request({
    url: '/api/updateZone',
    method: 'post',
    data: data
  })
}
// 根据区域ID获取区域详细信息
export function zoneone (data) {
  return request({
    url: '/api/getZone',
    method: 'post',
    data: data
  })
}
// 修改区域中的light属性 （调节亮度）
export function zonelight (data) {
  return request({
    url: '/api/zonelight',
    method: 'post',
    data: data
  })
}
// 修改区域的亮灯参数并修改属下RTU的亮灯参数
export function zoneload (data) {
  return request({
    url: '/api/zoneload',
    method: 'post',
    data: data
  })
}
