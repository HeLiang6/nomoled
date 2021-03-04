// 环境监测
import request from '@/utils/request'

// 获取项目下所有监测设备
export function sensorlistbyrootId (data) {
  return request({
    url: '/api/getSensorList',
    method: 'post',
    data: data
  })
}
// 添加环境监测设备
export function sensors (data) {
  return request({
    url: '/api/addSensor',
    method: 'post',
    data: data
  })
}
// 删除环境监测设备
export function removeSensors (data) {
  return request({
    url: '/api/delSensor',
    method: 'delete'
  })
}
// 修改环境监测设备
export function setSensors (data) {
  return request({
    url: '/api/updateSensor',
    method: 'post',
    data: data
  })
}
// 获取环境监测设备详细信息
export function getSensor (data) {
  return request({
    url: '/api/getSensor',
    method: 'post',
    data: data
  })
}
