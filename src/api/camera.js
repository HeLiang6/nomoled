// 摄像头
import request from '@/utils/request'
// 获取项目下所有摄像头
export function camerasvrbyrootId (data) {
  return request({
    url: '/api/getCameraList',
    method: 'post',
    data: data
  })
}
// 创建摄像头设备
export function camerasvr (data) {
  return request({
    url: '/api/addCamera',
    method: 'post',
    data: data
  })
}
// 修改摄像头参数
export function setCameras (data) {
  return request({
    url: '/api/updateCamera',
    method: 'post',
    data: data
  })
}
// 获取摄像头参数详情
export function camerasDetail (data) {
  return request({
    url: '/api/getCamera',
    method: 'get',
    data: data
  })
}
// 获取摄像头参数详情
export function getToken (data) {
  return request({
    url: '/api/getCamera',
    method: 'post',
    data: data
  })
}
