import request from '@/utils/request'

// 获取项目下所有WiFi节点
export function wifi (data) {
  return request({
    url: '/api/getWifiList',
    method: 'post',
    data: data
  })
}
// 创建wifi节点
export function addWifi (data) {
  return request({
    url: '/api/addWifi',
    method: 'post',
    data: data
  })
}
// 修改WiFi节点
export function amendWifi (data) {
  return request({
    url: '/api/updateWifi',
    method: 'post',
    data: data
  })
}
// 删除WiFi节点
export function deteleWifi (data) {
  return request({
    url: '/api/delWifi',
    method: 'delete',
    data: data
  })
}
// 获取Wifi详细信息
export function getWifi (data) {
  return request({
    url: '/api/getWifi',
    method: 'post',
    data: data
  })
}
