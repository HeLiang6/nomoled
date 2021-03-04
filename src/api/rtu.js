import request from '@/utils/request'

// 返回总发电量以及截止昨日为止总发电量
export function rtuTotal (data) {
  return request({
    url: '/api/getRtuTotalElectricity',
    method: 'post',
    data: data
  })
}
// 获取项目下所有RTU信息
export function rtulistbyprojectId (data) {
  return request({
    url: '/api/getRtuListByProjectId',
    method: 'post',
    data: data
  })
}
// 获取DTU下所有RTU
export function rtulistbyrootId (data) {
  return request({
    url: '/api/getRtuListByDtuId',
    method: 'post',
    data: {
      ...data,
      fieldJson: {
        _id: '5da425d446502c0100c9393c',
        uid: 'u05129',
        name: '5129',
        type: 'rtu',
        state: 1,
        version: 810,
        lastest: '',
        daysolar: '',
        totalsolar: '',
        worktime: ''
      }
    }
  })
}
// 获取指定RTU详细信息
export function rtuone (data) {
  return request({
    url: '/api/getRtuInfoByRtuId',
    method: 'post',
    data: data
  })
}
// RTU开关灯状态持久化
export function rtustatus (data) {
  return request({
    url: '/api/rtustatus',
    method: 'post',
    data: data
  })
}
// 修改指定RTU的路灯参数
export function rtuload (data) {
  return request({
    url: '/api/rtuload',
    method: 'post',
    data: data
  })
}
// RTU的version 持久化
export function rtuversion (data) {
  return request({
    url: '/api/rtuversion',
    method: 'post',
    data: data
  })
}
// 获取指定DTU下所有RTU的最新上报数据
export function rtudata (data) {
  return request({
    url: '/api/rtudata',
    method: 'post',
    data: data
  })
}
// // 上传
export function updateRtu (data) {
  return request({
    url: '/api/importRtuWithCheckUid',
    method: 'post',
    data: data
  })
}

// 新建Rtu
export function rtus (data) {
  return request({
    url: '/api/addRtu',
    method: 'post',
    data: data
  })
}
// 删除Rtu
export function removeRtu (data) {
  return request({
    url: '/api/delRtu/' + data,
    method: 'delete'
  })
}
// 修改RTU
export function setRtu (data) {
  return request({
    url: '/api/updateRtu' + data._id,
    method: 'post',
    data: data
  })
}
// 获取指定RTU最近一次上报的数据 ?
export function rtuonedata (data) {
   
  return request({
    url: '/api/rtuonedata',
    method: 'post',
    data: data
  })
}

// 修改RTU亮度
export function rtulight (data) {
  return request({
    url: '/api/rtulight',
    method: 'post',
    data: data
  })
}
// 获取指定DTU下所有处于报警状态的RTU
export function rtufault (data) {
  return request({
    url: '/api/rtufault',
    method: 'post',
    data: data
  })
}
// 模糊搜索Rtu
export function fuzzySearchRtu (data) {
  return request({
    url: '/api/fuzzySearchRtu',
    method: 'post',
    data: data
  })
}
