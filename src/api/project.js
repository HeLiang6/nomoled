import request from '@/utils/request'
// 获取项目列表
export function ProjectList (data) {
  return request({
    url: '/api/getProjectList',
    method: 'post',
    data: {
      r: data.r,
      userId: data.userId,
      fieldsJson: {}
    }
  })
}
// 修改项目坐标以及描述
export function pjconfig (data) {
  return request({
    url: '/api/modifyProjectCoordinate',
    method: 'post',
    data: {
      projectId: data._id,
      description: data.description,
      latitude: data.latitude,
      longitude: data.longitude
    }
  })
}

//  删除单个项目
export function removepj (data) {
  return request({
    url: '/api/delProject',
    method: 'delete',
    data: {
      projectId: data._id,
      rand: Math.ceil(Math.random() * 10)
    }
  })
}

// 修改单个项目
export function writeProject (data) {
  return request({
    url: '/api/updateProject',
    method: 'post',
    data: data
  })
}

// 创建项目

export function setProject (data) {
  return request({
    url: '/api/addProject',
    method: 'post',
    data: data
  })
}

// 根据项目ID获取单个项目详情

export function ProjectDetail (data) {
  return request({
    url: '/api/getProject',
    method: 'post',
    data: {
      projectId: data
    }
  })
}
// 根据项目Id获取项目详情
export function ProjectDetails (data) {
  return request({
    url: '/api/getProject',
    method: 'post',
    data: data
  })
}

// 修改萤石云 APPkey、secret以及二级密码
export function updatePsw (data) {
  return request({
    url: '/api/updatePsw',
    method: 'post',
    data: data
  })
}
// 根据项目id获取项目树
export function getProjectTreeBypId (data) {
  return request({
    url: '/api/getProjectTreeBypId',
    method: 'post',
    data: data
  })
}
// 批量修改项目地图或时区
export function batchUpdateProjects (data) {
  return request({
    url: '/api/batchUpdateProjects',
    method: 'post',
    data: data
  })
}
