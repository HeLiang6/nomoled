import axios from 'axios'
import {
  Message
} from 'element-ui'
import Cookies from 'js-cookie'

// import store from '../store'

// 创建axios实例
axios.defaults.withCredentials = true
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000, // 请求超时时间
  withCredentials: true
})
// request拦截器
// service.defaults.withCredentials = true
// console.log(axios)
service.interceptors.request.use(
  config => {
    // s:iUKLG24U-uOdz_fZwVIa8OWosXX0w92T.fAKwhsPCm52Zku5+dEy9uaP4ws5nDF7DEQsXczxp1Rw
    // config.headers['set-cookie'] = 'sid=' + Cookies.get('NomoSystem')
    // config.headers['Cookie'] = 'NomoSystem=' + Cookies.get('NomoSystem')
    if (sessionStorage.getItem('nomouser')) {
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // if (res.httpCode == 200) {
    //   console.log(response.result);
    // }
    if (!res) {
      // Message({
      //   message: res.message,
      //   type: 'error',
      //   duration: 5 * 100
      // })
      return false
      // return Promise.reject('error')
    } else {
      // this.$store.state.user.nomouser
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
