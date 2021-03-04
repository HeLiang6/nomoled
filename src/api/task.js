import request from '@/utils/request'
// 获取条件任务列表
export function taskList (data) {
  return request({
    url: '/api/getConditionTaskListByDtuId',
    method: 'post',
    data: data
  })
}
// 创建条件任务
export function taskAdd (data) {
  return request({
    url: '/api/addConditionTask',
    method: 'post',
    data: data
  })
}
// 修改条件任务
export function setTask (data) {
  return request({
    url: 'api/updateConditionTask',
    method: 'post',
    data: data
  })
}
// 删除条件任务
export function removeTask (data) {
  return request({
    url: '/api/delConditionTask',
    method: 'delete',
    data: data
  })
}
// 获取指定条件任务的执行记录
export function recordTask (data) {
  return request({
    url: '/api/getConditionTaskRecord',
    method: 'post',
    data: {
      conditionTaskId: data
    }
  })
}

// 获取DTU下所有配置任务

export function setConfiguration (data) {
  return request({
    url: '/api/getConfigTaskListByDtuId',
    method: 'post',
    data: data
  })
}
// 创建配置任务
export function addConfiguration (data) {
  return request({
    url: '/api/addConfigTask',
    method: 'post',
    data: data
  })
}
// 删除配置任务
export function removeConfiguration (data) {
  return request({
    url: 'api/delConfigTask',
    method: 'delete',
    data: data
  })
}
// 修改配置任务
export function alterConfiguration (data) {
  return request({
    url: '/api/updateConfigTask',
    method: 'post',
    data: data
  })
}
// 获取项目下所有条件任务
export function ProjectIdCondition (data) {
  return request({
    url: '/api/getConditionTaskListByProjectId',
    method: 'post',
    data: data
  })
}
// 获取项目下所有配置任务
export function getConfigTask (data) {
  return request({
    url: '/api/getConfigTaskListByProjectId',
    method: 'post',
    data: data
  })
}
// 获取条件任务详细信息
export function getDtailed (data) {
  return request({
    url: '/api/getConditionTask',
    method: 'post',
    data: data
  })
}
