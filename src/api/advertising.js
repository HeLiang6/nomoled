// 广告牌
import request from '@/utils/request'

// 获取项目下所有广告牌设备
export function billboardlistbyrootId (data) {
  return request({
    url: '/api/getBillBoardList',
    method: 'post',
    data: data
  })
}
// 添加广告牌设备
export function billboards (data) {
  return request({
    url: '/api/addBillBoard',
    method: 'post',
    data: data
  })
}
// 删除广告牌
export function removeBillboards (id) {
  return request({
    url: '/api/delBillBoard',
    method: 'delete'
  })
}
// 修改广告牌设备
export function setBillboards (data) {
  return request({
    url: '/api/updateBillBoard',
    method: 'put',
    data: data
  })
}
// 修改广告列表
export function files (data) {
  return request({
    url: '/api/files/',
    method: 'get'
  })
}

// 获取广告牌设备详细信息
export function getBillBoard (data) {
  return request({
    url: '/api/getBillBoard',
    method: 'post',
    data: data
  })
}