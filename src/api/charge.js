// 充电桩
import request from '@/utils/request'
// 获取项目下所有充电桩设备
export function chargelistbyrootId (data) {
  return request({
    url: 'api/getChargeList',
    method: 'post',
    data: data
  })
}
// 创建充电桩设备
export function charges (data) {
  return request({
    url: '/api/addCharge',
    method: 'post',
    data: data
  })
}
// 修改充电桩设备
export function setCharges (data) {
  return request({
    url: '/api/updateCharge',
    method: 'put',
    data: data
  })
}
// 删除充电桩设备
export function removeCharges (data) {
  return request({
    url: '/api/delCharge',
    method: 'delete'
  })
}
// 获取充电桩详细信息
export function getCharge (data) {
  return request({
    url: '/api/getCharge',
    method: 'post',
    data: data
  })
}
