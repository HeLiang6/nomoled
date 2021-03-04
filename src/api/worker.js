import request from '@/utils/request'

// 获取维修人员列表
export function getWorkerList (data) {
  return request({
    url: '/api/getWorkerList',
    method: 'post',
    data: data
  })
}
// 获取维修人员详细信息
export function getWorker (data) {
  return request({
    url: '/api/getWorker',
    method: 'post',
    data: data
  })
}// 删除维修人员
export function delWorker (data) {
  return request({
    url: '/api/delWorker',
    method: 'post',
    data: data
  })
}// 添加维修人员
export function addWorker (data) {
  return request({
    url: '/api/addWorker',
    method: 'post',
    data: data
  })
}
// 更新维修人员
export function updateWorker (data) {
  return request({
    url: '/api/updateWorker',
    method: 'post',
    data: data
  })
}
// 获取（下级）用户列表
export function getUserList (data) {
  return request({
    url: '/api/getUserList',
    method: 'post',
    data: data
  })
}
