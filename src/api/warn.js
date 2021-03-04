import request from '@/utils/request'
// 报警列表
export function warnList (data) {
  return request({
    url: '/api/getAlarmList',
    method: 'post',
    data: data
  })
}
// 查询指定项目的告警的历史记录
export function getAlarmHistory (data) {
  return request({
    url: '/api/getAlarmHistory',
    method: 'post',
    data: data
  })
}

// 分配故障处理任务及更新故障处理状态
export function updateAlarmState (data) {
  return request({
    url: '/api/updateAlarmState',
    method: 'post',
    data: data
  })
}
