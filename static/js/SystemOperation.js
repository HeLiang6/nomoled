import { addUserLoginLog } from '@/api/log'
let system = function (data) {
  addUserLoginLog(data).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}

export {
  system
}
