import request from '@/utils/request'

// export function login (data) {
//   return request({
//     url: '/api/auth/signin',
//     method: 'post',
//     data: data
//   })
// }
export function login (data) {
  return request({
    url: '/api/systemLogin',
    method: 'post',
    data: data
  })
}
//获取验证码
export function getCheckCode () {
  return request({
    url: '/api/getCheckCode',
    method: 'get',
  })
}
