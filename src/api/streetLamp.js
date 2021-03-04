import request from '@/utils/request'
// 路灯模板
// 获取管理员账号创建的路灯模板
export function TypebyAdmin (data) {
  return request({
    url: '/api/getTemplateListByUserId',
    method: 'post',
    data: data
  })
}
// 根据项目Id获取路灯模板列表
export function getTemplateListByProjectId (data) {
  return request({
    url: '/api/getTemplateListByProjectId',
    method: 'post',
    data: data
  })
}
// 创建路灯模板
export function addLight (data) {
  return request({
    url: '/api/addTemplate',
    method: 'post',
    data: data
  })
}
// 删除路灯模板
export function deleteLight (data) {
  return request({
    url: '/api/delTemplate',
    method: 'post',
    data: data
  })
}
// 判断路灯模板是否在使用中
export function LightStatus (data) {
  return request({
    url: '/api/ChecktypeUsed',
    method: 'post',
    data: data
  })
}
// 更新
export function updateTemplate (data) {
  return request({
    url: '/api/updateTemplate',
    method: 'post',
    data: data
  })
}
// 获取用户所有权限的路灯模板
export function getTemplateListByUserId (data) {
  return request({
    url: '/api/getTemplateListByUserId',
    method: 'post',
    data: {
      userId: data.userId,
      rand: data.random
    }
  })
}
