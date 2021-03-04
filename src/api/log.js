import request from '@/utils/request'
// 获取用户列表
export function userName (data) {
  return request({
    url: '/api/getUserList',
    method: 'post',
    data: data
  })
}
// 查看日志列表
export function logList (data) {
  return request({
    url: 'api/getSystemLogList',
    method: 'post',
    data: data
  })
}
// 新增登录操作日志
export function userLoginLog (data) {
  return request({
    url: '/api/addUserLoginLog',
    method: 'post',
    data: data
  })
}
//
export function addUserLoginLog (data) {
  return request({
    url: '/api/addUserLoginLog',
    method: 'post',
    data: data
  })
}
