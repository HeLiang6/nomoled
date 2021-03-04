import request from '@/utils/request'
// 获取项目下所有DTU
export function dtuList (data) {
  return request({
    url: '/api/getDtuListByProjectId',
    method: 'post',
    data: {
      ...data,
      fieldJson: {
      }
    }
  })
}

// 创建DTU

export function addDTU (data) {
  return request({
    url: '/api/addDtu',
    method: 'post',
    data: data
  })
}
// 根据用户id获取Dtu列表
export function DTU (data) {
  return request({
    url: '/api/getDtuListByUserId',
    method: 'post',
    data: data
  })
}

// 删除DTU
export function removeDTU (data) {
  return request({
    url: '/api/delDtu/' + data,
    method: 'delete'
  })
}
// 修改dtu参数
export function setDTU (data) {
  return request({
    url: 'api/updateDtu/' + data._id,
    method: 'put',
    data: data
  })
}
// 根据DtuId获取dtu详细信息
export function dtuOne (data) {
  return request({
    url: '/api/getDtuById',
    method: 'post',
    data: data
  })
}
// 修改DTU的路灯参数以及属下区域、RTU的路灯参数
export function dtuload (data) {
  return request({
    url: '/api/dtuload',
    method: 'post',
    data: data
  })
}
