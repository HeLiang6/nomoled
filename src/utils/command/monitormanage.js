import _Vue from '../../main'

'use strict'

let { mqtt_connect, end, publish, unsubscribe, subscribe, Socket } = require('./websocket')

/**
 * sent  一次发送的最大条目数
 */
console.log('monitormanage......')
let sendlist = []
let action
let obj
let minterval
let nettick
let iconchange
let sw
let light
let time
let task
let callback
let changePicture
let callback_sendState

export let pjtree
console.log(this)
this.getNetstatus = function () {
  get_netstatus()
}

export function connect (projecttree, iconchange1, cb, cb2) {
  console.log('建立连接........')
  pjtree = projecttree
  console.log(pjtree)

  mqtt_connect(function (client, lastID) {
    setSubscribe(client)
    if (!lastID) setMessage(client)
  })

  iconchange = iconchange1
  nettick = 3

  minterval && clearInterval(minterval)
  minterval = setInterval(function () {
    nettick++

    if (nettick > 2) {
      nettick = 0
      get_netstatus()
    }

    sendlist.forEach(function (list, index) {
      if (list.sent <= list.total) {
        list.tick++

        var dtu = pjtree.dtuList[list.dtuIndex]
        if (dtu.net) {
          list.state = 4
        }

        if (list.state === 4) {
          if (!dtu.net) {
            list.state = 0
            list.tick = 0
            list.sent = list.reply
            get_control(list)
          }
        } else if (list.state === 2) {
          if (list.tick > 6) {
            list.tick = 0
            get_control(list)
          }
        } else if (list.state === 1) {
          if (list.tick > list.timeout) {
            list.tick = 0
            list.timeout = list.tick + 40
            var obj = list.objs[list.reply]
            if (obj) {
              obj.state = 3
              if (callback_sendState) {
                callback_sendState(obj.uid, obj.state, obj.state)
              }
              var rtu = pjtree.rtuList[obj.index]

              if (rtu.net !== 1) {
                if (rtu.net) {
                  pjtree.rtuonline++
                  pjtree.rtuoffline--
                } else {
                  pjtree.rtuonline--
                  pjtree.rtuoffline++
                }
              }
              rtu.net = 1

              if (iconchange) {
                iconchange(rtu)
              }

              rtu.sendstate = obj.state
              if (callback_sendState) {
                callback_sendState(rtu.uid, obj.state)
              }
            }
            list.reply = list.reply + 1
            console.log('reply' + list.reply)
            console.log('sent' + list.sent)

            if (list.reply === list.total) {
              release_control(list)
            } else if (list.reply === list.sent) {
              list_send(list)
            } else {
              list.tick = 0
              list.timeout = list.tick + 40
            }
          }
        }
      }
    })
  }, 5000)
  if (cb) {
    cb(null, pjtree)
  }
  changePicture = cb2
};

this.setpjtree = function (projecttree) {
  pjtree = projecttree
}

this.stopsend = function () {
  console.log('stopsend')

  if (sendlist) {
    sendlist.forEach(function (list, index) {
      release_control(list)
    })

    sendlist = null
  }
}

this.disconnect = function () {
  console.log('disconnect')

  $interval.cancel(minterval)

  if (sendlist) {
    sendlist.forEach(function (list, index) {
      release_control(list)
    })
    sendlist = null
  }
  end()
}

function init_sendlist (obj) {
  sendlist = []
  var dtu, rtu
  var objs, data
  var dtuIndex

  if (obj.type === 'dtu' || obj.type === 'rtu') {
    if (obj.type === 'dtu') {
      // dtuIndex = pjtree.dtuList.indexOf(obj)
      dtuIndex = obj.dtuIndex
      dtu = obj
      objs = [
        {
          name: dtu.name,
          state: 0
        }
      ]
      if (action === 'updateparams') {
        data = {
          poll: dtu.poll,
          sendtime: dtu.sendtime,
          zonenum: 0,
          rtus: []
        }
        pjtree.zoneList.forEach(function (zone, index) {
          if (zone.id !== 0 && zone.dtuIndex === dtuIndex) { data.zonenum++ }
        })

        pjtree.rtuList.forEach(function (rtu, index) {
          if (rtu.id !== 0 && rtu.dtuIndex === dtuIndex) {
            data.rtus.push({
              uid: rtu.uid,
              index: index,
              zoneno: rtu.zoneno
            })
          }
        })
      } else {
        data = {
          sw: sw,
          light: light,
          time: time
        }
      }
    } else {
      rtu = obj
      dtuIndex = rtu.dtuIndex
      console.log(dtuIndex)
      dtu = pjtree.dtuList[dtuIndex]
      objs = [
        {
          // dtuIndex: dtuIndex,
          uid: rtu.uid,
          index: rtu.rtuIndex,
          state: 0
        }
      ]
      rtu.sendstate = 0
      if (callback_sendState) {
        callback_sendState(rtu.uid, 0)
      }
      data = {
        sw: sw,
        light: light,
        time: time
      }
    }
    sendlist.push({
      tel: dtu.tel, // 代表DTU的tel
      name: dtu.name,
      dtuIndex: dtuIndex, // DTU的下标
      total: 1, // objs.length  需要发送命令rtu的数量
      sent: 0, // 已发送命令rtu的数量
      tick: 0, // 计时器 判断是否超时用
      objs: objs, // 需要发送命令rtu的数组  [{uid,index,state}]
      data: data, // 要执行什么操作
      state: 0
    })
  } else if (obj.type === 'devgroup' || obj.type === 'zone') {
    dtuIndex = obj.dtuIndex
    dtu = pjtree.dtuList[dtuIndex]

    objs = []

    pjtree.rtuList.forEach(function (rtu, index) {
      if (rtu.id !== 0 && rtu.dtuIndex === dtuIndex) {
        rtu.sendstate = 0
        if (callback_sendState) {
          callback_sendState(rtu.uid, 0)
        }
        if (obj.type === 'devgroup') {
          objs.push({
            uid: rtu.uid,
            // dtuIndex: dtuIndex,
            index: index,
            name: rtu.name,
            state: 0
          })
        } else {
          var zone = obj
          console.log(rtu)
          if (zone.no === rtu.zoneno) {
            objs.push({
              uid: rtu.uid,
              index: index,
              name: rtu.name,
              state: 0
            })
          }
        }
      }
    })
    // 地区
    if (obj.type === 'zone') {
      pjtree.zoneList.map(zone => {
        if (zone.rtuList && zone.rtuList !== null) {
          zone.rtuList.map(rtuzone => {
            if (obj.no === rtuzone.zoneno) {
              objs.push({
                uid: rtuzone.uid,
                index: rtuzone.zoneno,
                name: rtuzone.name,
                state: 0
              })
            }
          })
        }
      })
    }
    data = {
      sw: sw,
      light: light,
      time: time
    }

    sendlist.push({
      tel: dtu.tel,
      name: dtu.name,
      total: objs.length,
      dtuIndex: dtuIndex,
      data: data,
      sent: 0,
      reply: 0,
      tick: 0,
      objs: objs,
      state: 0
    })
    console.log('----------sendlist-------------')
    console.log(sendlist)
    console.log('-----------------------')
  } else if (obj.type === 'project') {
    pjtree.dtuList.forEach(function (dtu, dtuIndex) {
      if (dtu.id !== 0) {
        objs = []

        pjtree.rtuList.forEach(function (rtu, index) {
          if (rtu.id !== 0 && rtu.dtuIndex === dtuIndex) {
            objs.push({
              uid: rtu.uid,
              index: index,
              name: rtu.name,
              state: 0
            })
            rtu.sendstate = 0
            if (callback_sendState) {
              callback_sendState(rtu.uid, 0)
            }
          }
        })

        data = {
          sw: sw,
          light: light,
          time: time
        }
        sendlist.push({
          tel: dtu.tel,
          name: dtu.name,
          total: objs.length,
          dtuIndex: dtuIndex,
          data: data,
          sent: 0,
          tick: 0,
          objs: objs,
          state: 0
        })
      }
    })
  } else if (obj.type === 'task') {
    dtuIndex = obj.dtuIndex
    dtu = pjtree.dtuList[dtuIndex]
    data = {
      sw: sw,
      light: light,
      task: task,
      time: time
    }
    objs = [
      {
        name: dtu.name,
        state: 0
      }
    ]
    sendlist.push({
      skip_getCtrl: 1, // 标识  getctrl直接返回
      tel: dtu.tel,
      task_id: obj.task_id,
      data: data,
      sent: 0,
      reply: 0,
      tick: 0,
      objs: objs,
      state: 0
    })
  } else if (obj.type === 'wifiac') {
    pjtree.dtuList.forEach(function (dtu, dtuIndex) {
      if (dtu.tel == obj.uid) {
        data = {
          sw: obj.switch,
          hide: obj.hide,
          name: obj.name,
          pw: obj.password,
          nodeNum: obj.nodeNum,
          maxFlow: obj.maxFlow,
          clearFlow: obj.clearFlow
        }
        sendlist.push({
          tel: dtu.tel,
          dtuIndex: dtuIndex,
          data: data,
          sent: 0,
          reply: 0,
          tick: 0,
          objs: [],
          state: 0
        })
      }
    })
  }
}

function binit_sendlist (obj) {
  sendlist = []
  var dtu, rtu
  var objs, data
  var dtuIndex

  if (obj.type === 'rtu' || obj.type === 'devgroup') {
    dtuIndex = obj.dtuIndex
    dtu = pjtree.dtuList[obj.dtuIndex]

    objs = [
      {
        index: 0,
        uid: dtu.id,
        name: dtu.name,
        state: 0
      }
    ]

    data = {
      sw: sw,
      light: light,
      time: time
    }

    if (obj.type === 'rtu') { data.uid = obj.uid }

    sendlist.push({
      tel: dtu.tel,
      name: dtu.name,
      dtuIndex: dtuIndex,
      total: 1,
      sent: 0,
      tick: 0,
      objs: objs,
      data: data,
      state: 0
    })
  } else if (obj.type === 'project') {
    pjtree.dtuList.forEach(function (dtu, dtuIndex) {
      if (dtu.id !== 0) {
        objs = [
          {
            name: dtu.name,
            state: 0
          }
        ]

        data = {
          sw: sw,
          light: light,
          time: time
        }

        sendlist.push({
          tel: dtu.tel,
          name: dtu.name,
          total: 1,
          dtuIndex: dtuIndex,
          data: data,
          sent: 0,
          tick: 0,
          objs: objs,
          state: 0
        })
      }
    })
  }
}

function get_control (list) {
  var message = {
    skip_getCtrl: list.skip_getCtrl,
    tel: list.tel,
    clientId: Socket.clientId
  }
  publish({ topic: 'web/getctrl/' + message.tel, msg: message })
}

function release_control (list, removeList) {
  var message = {
    tel: list.tel
  }
  list.state = 3

  message.clientId = Socket.clientId
  publish({ topic: 'web/releasectrl/' + message.tel, msg: message })

  if (removeList) {
    removeListItem(list.tel)
  }
}

this.start_send = function (obj1, action1, callback1) {
  obj = obj1
  action = action1
  callback = callback1

  init_sendlist(obj)

  sendlist.forEach(function (list) {
    var dtu = pjtree.dtuList[list.dtuIndex]
    if (dtu.net) {
      list.state = 4
    } else {
      get_control(list)
    }
  })

  return sendlist
}
// function getwarnindex (warn) {
//   if (warn === 0) {
//     return 0
//   } else if (warn & (1 << 0)) {
//     return 1
//   } else if (warn & (1 << 1)) {
//     return 2
//   } else if (warn & (1 << 2)) {
//     return 3
//   } else if (warn & (1 << 3)) {
//     return 4
//   } else if (warn & (1 << 4)) {
//     return 5
//   } else if (warn & (1 << 5)) {
//     return 6
//   } else if (warn & (1 << 6)) {
//     return 7
//   } else if (warn & (1 << 9)) {
//     return 8
//   } else if (warn & (1 << 10)) {
//     return 9
//   } else if (warn & (1 << 11)) {
//     return 10
//   } else if (warn & (1 << 12)) {
//     return 11
//   } else if (warn & (1 << 14)) {
//     return 12
//   }
// }

// export function setlightdata (index, res, real) {
//   console.log(res)
//   // var lastwarn
//   // var rtu = pjtree.rtulist[index]
//   // // var dtu = pjtree.dtulist[rtu.dtuindex]

//   // if (rtu.lightdata === null || rtu.lightdata === undefined) {
//   //   lastwarn = 0
//   // } else {
//   //   lastwarn = rtu.lightdata.warn
//   // }

//   // rtu.lightdata = res
//   // rtu.lightdata.warn = getwarnindex(res.warn)

//   // // if (lastwarn === 0 && rtu.lightdata.warn) {
//   // //   dtu.rtufault++
//   // // } else if (lastwarn > 0 && !rtu.lightdata.warn) {
//   // //   dtu.rtufault--
//   // // }
//   // return rtu
// };

// list.state      0获取权限中   1已获得权限  2获取权限失败  3释放权限
// list.objs[index].state    0待发送  1已发送 2 操作成功  3操作失败
export function mstart_send (obj1, data, callback1, callback_sendState1) {
  obj = obj1
  action = data.action
  sw = data.sw // 开关灯 自动
  light = data.light // 灯光亮度
  time = data.duration// 开灯持续时间
  task = data.task
  callback = callback1
  console.log(pjtree)

  callback_sendState = callback_sendState1
  if (action[0] === 'b') { binit_sendlist(obj) } else { init_sendlist(obj) }
  //  b 代表广播
  sendlist.forEach(function (list) {
    var dtu = pjtree.dtuList[list.dtuIndex]
    if (dtu && dtu.net) {
      console.log('DTU不在线.........')
      list.state = 4
    } else {
      console.log('正常.......')
      get_control(list)
    }
  })
  console.log(sendlist)
  return sendlist
};

this.app_send = function (obj1, callback1) {
  obj = obj1
  action = 'updateapp'
  callback = callback1

  sendlist = []
  var dtu
  var dtuIndex

  if (obj.type === 'dtu') {
    dtuIndex = pjtree.dtuList.indexOf(obj)
    dtu = obj

    sendlist.push({
      tel: dtu.tel,
      dtuIndex: dtuIndex,
      appType: dtu.appType,
      appUrl: dtu.appUrl,
      vserial: dtu.vserial,
      checkcode: dtu.checkcode,
      total: 1,
      sent: 0,
      tick: 0,
      state: 0
    })
  } else if (obj.type === 'project') {
    pjtree.dtuList.forEach(function (dtu, dtuIndex) {
      if (dtu.id !== 0) {
        sendlist.push({
          tel: dtu.tel,
          dtuIndex: dtuIndex,
          appType: obj.appType,
          appUrl: obj.appUrl,
          vserial: obj.vserial,
          checkcode: obj.checkcode,
          total: 1,
          sent: 0,
          tick: 0,
          state: 0
        })
      }
    })
  }

  sendlist.forEach(function (list) {
    var dtu = pjtree.dtuList[list.dtuIndex]
    dtu.max = 0
    dtu.dynamic = 0
    dtu.sendstate = 0
    if (dtu.net) {
      list.state = 4
      dtu.sendstate = 5
    } else {
      dtu.sendstate = 2
      get_control(list)
    }
  })

  return sendlist
}

this.tstart_send = function (obj1, data, callback1) {
  obj = obj1
  action = data.action

  callback = callback1

  init_sendlist(obj)

  sendlist.forEach(function (list) {
    list.data = data.tasks
    var dtu = pjtree.dtuList[list.dtuIndex]
    if (dtu.net) {
      list.state = 4
    } else {
      get_control(list)
    }
  })

  return sendlist
}

function list_send (list) {
  var message = {
    action: action,
    tel: list.tel,
    objs: [],
    data: list.data
  }

  for (var i = 0; i < 5 && list.sent < list.objs.length; i++, list.sent++) {
    message.objs.push(list.objs[list.sent].uid)
    list.objs[list.sent].state = 1
    if (callback_sendState) {
      callback_sendState(list.objs[list.sent].uid, 1)
    }
  }

  list.tick = 0
  list.timeout = list.tick + 40
  message.clientId = Socket.clientId
  publish({ topic: 'web/monitor/' + message.tel, msg: message })
}

function app_send (list) {
  var message = {
    action: action,
    appType: list.appType,
    appUrl: list.appUrl,
    vserial: list.vserial,
    checkcode: list.checkcode,
    tel: list.tel
  }

  list.state = 5
  list.tick = 0
  message.clientId = Socket.clientId
  publish({ topic: 'web/app/' + message.tel, msg: message })
}

export function get_netstatus () {
  if (!pjtree || !pjtree._id) return
  var message = {
    action: 'netstatus',
    projectId: pjtree._id
  }
  publish({ topic: 'web/netstatus/' + Socket.clientId, msg: message })
}

function findlist (tel) {
  if (!sendlist || !sendlist.length) return

  for (var i = 0; i < sendlist.length; i++) {
    if (sendlist[i].tel === tel) {
      return sendlist[i]
    }
  }
}

function removeListItem (tel) {
  if (!sendlist || !sendlist.length) return

  for (var i = 0; i < sendlist.length; i++) {
    if (sendlist[i].tel === tel) {
      return sendlist.splice(i, 1)
    }
  }
}

function uidconv (num) {
  var uid = '' + num
  if (uid.length == 1) { uid = 'u0000' + uid } else if (uid.length == 2) { uid = 'u000' + uid } else if (uid.length == 3) { uid = 'u00' + uid } else if (uid.length == 4) { uid = 'u0' + uid } else if (uid.length == 5) { uid = 'u' + uid }
  return uid
};

function findlistitem (list, uid) {
  for (var i = 0; i < list.objs.length; i++) {
    if (list.objs[i].uid === uid) {
      return i
    }
  }
  return null
}

function rtustatechange (dtustate, index) {
  pjtree.rtuList.forEach(function (rtu) {
    var j
    if (rtu.uid !== 0 && rtu.dtuIndex === index) {
      var dtu = pjtree.dtuList[rtu.dtuIndex]
      for (j = 0; j < dtustate.rtus.length; j++) {
        var rtustate = dtustate.rtus[j]
        if (rtustate.uid === rtu.uid) {
          rtu.state = rtustate.state
          rtu.current = rtustate.current
          if (!rtustate.state) {
            if (rtu.current > 0) {
              pjtree.lighton++
              dtu.lighton++
            } else {
              pjtree.lightoff++
              dtu.lightoff++
            }
          }
          if (rtustate.state !== rtu.net) {
            rtu.net = rtustate.state
            if (iconchange) { iconchange(rtu) }
          }
          break
        }
      }
      if (j === dtustate.rtus.length) { // 找不到匹配  判断为掉线 && rtu.net === 0
        rtu.net = 1
        if (iconchange) {
          iconchange(rtu)
        }
      }
      if (rtu.net) {
        pjtree.rtuoffline++
        dtu.rtuoffline++
      } else {
        pjtree.rtuonline++
        dtu.rtuonline++
      }
    }
  })
}

this.message_send = function (message, ack_callback) {
  callback = ack_callback
  message.clientId = Socket.clientId
  publish({ topic: 'web/monitor/' + message.tel, msg: message })
}

function setSubscribe (client) {
  unsubscribe('dtu/+/' + Socket.clientId, function () {
    subscribe('dtu/+/' + Socket.clientId)
    subscribe('dtu/monitor/wsr_ack')
    subscribe('dtu/monitor/sensor_ack')
  })
  unsubscribe('svr/netstatus/' + Socket.clientId, function () {
    subscribe('svr/netstatus/' + Socket.clientId)
  })
  pjtree.dtuList.forEach(function (dtu, index) {
    subscribe('dtu/close/' + dtu.tel)
  })
}

function setMessage (client) {
  if (client && client._events && client._events.message) return

  client.on('message', function (topic, message) {
    if (!message.length || message.length <= 2) return
    message = JSON.parse(message)
    if (topic == ('svr/netstatus/' + Socket.clientId)) {
      pjtree.dtuonline = 0
      pjtree.dtuoffline = 0
      pjtree.rtuonline = 0
      pjtree.rtuoffline = 0
      pjtree.lighton = 0
      pjtree.lightoff = 0
      pjtree.dtuList.forEach(function (dtu, index) {
        var i
        if (dtu.tel !== 0) {
          dtu.rtuoffline = 0
          dtu.rtuonline = 0
          dtu.lighton = 0
          dtu.lightoff = 0

          for (i = 0; i < message.length; i++) {
            var dtustate = message[i]
            if (dtustate.tel === dtu.tel) {
              if (dtu.net !== 0) { // dtu状态改为在线
                dtu.net = 0
                if (iconchange) { iconchange(dtu) }
              }

              dtu.state = dtustate.state
              rtustatechange(dtustate, index)
              break
            }
          }

          if (i === message.length) {
            dtu.net = 1
            if (iconchange) {
              iconchange(dtu)
            }

            pjtree.rtuList.forEach(function (rtu) {
              if (rtu.id !== 0 && rtu.dtuIndex === index) {
                if (rtu.net === 0) {
                  rtu.net = 1
                  if (iconchange) { iconchange(rtu) }
                }
                pjtree.rtuoffline++
                dtu.rtuoffline++
              }
            })
          }

          if (dtu.net) {
            pjtree.dtuoffline++
            dtu.state = 1
          } else {
            pjtree.dtuonline++
            dtu.state = 0
          }
        }
      })
    } else if (topic.indexOf('dtu/getctrl/') != -1) {
      var list = findlist(message.tel)
      if (list) {
        if (message.ack === 0) {
          console.log('已获得控制权')
          _Vue.$store.commit('message', true)
          console.log(1)
          list.state = 1
          if (action === 'updateapp') { app_send(list) } else { list_send(list) }
        } else {
          console.log('获取控制权限失败')
          list.state = 2 // 获得权限失败
          // release_confirm(list.tel); //弹出确认框，是否强制释放权限
        }

        list.tick = 0
      }
    } else if (topic.indexOf('dtu/releasectrl/') !== -1) {
      console.log('dtu' + message.tel + ':' + 'releasectrl')
    } else if (topic.indexOf('dtu/monitor/') !== -1) {
      var list, index, obj, rtu
      try {
        list = findlist(message.tel)
        if (list) {
          if (message.type === 'dtustatus') {
            if (action === 'updateparams' || action === 'bswitch' || action === 'blight' || action === 'conditiontask' ||
              action === 'configtask' || action === 'task_clear' || action === 'bclear') {
              if (message.state === 0) {
                list.objs[0].state = 2
                release_control(list)
                if (callback) {
                  callback(list.dtuIndex, 0)
                  callback = null
                }
              } else if (message.state === 1) {
                // 收到dtu的广播回应
                message.state = 2
              }
            } else if (action === 'updateapp' || action === 'managewifi') {
              if (message.state === 0) {
                var updDtu = pjtree.dtuList[list.dtuIndex]
                updDtu.sendstate = 1
                release_control(list, true)
                if (callback) { callback(list.dtuIndex, 0) }
                callback = null
              }
            }
          } else if (message.type === 'rtustatus') {
            index = findlistitem(list, message.uid)
            obj = list.objs[index]
            list.reply = index + 1
            if (obj) {
              if (message.state) {
                obj.state = 3
                if (callback_sendState) {
                  callback_sendState(obj.uid, obj.state, 3)
                }
              } else {
                obj.state = 2
                if (callback_sendState) {
                  callback_sendState(obj.uid, obj.state, 2)
                }
                if (callback) {
                  callback(obj.index, 0, list.dtuIndex)
                  callback = null
                }
              }

              if (changePicture) {
                changePicture(message)
              }
              rtu = pjtree.rtuList[obj.index]
              if (rtu.net !== message.state) {
                if (rtu.net) {
                  pjtree.rtuonline++
                  pjtree.rtuoffline--
                  rtu.state = 0
                } else {
                  rtu.state = 1
                  pjtree.rtuonline--
                  pjtree.rtuoffline++
                }
              }
              rtu.net = message.state

              if (rtu.current === 0 && message.current) {
                pjtree.lighton++
                pjtree.lightoff--
              } else if (rtu.current && message.current === 0) {
                pjtree.lighton--
                pjtree.lightoff++
              }
              rtu.current = message.current

              if (iconchange) {
                iconchange(rtu)
              }
              rtu.sendstate = obj.state
              if (callback_sendState) {
                callback_sendState(rtu.uid, obj.state)
              }
            }
            console.log('reply' + list.reply)
            console.log('sent' + list.sent)
            var testReply = list.objs.some(function (item) { return item.state == 1 || item.state == 0 })
            if (!testReply) {
              release_control(list)
            } else if (list.reply === list.sent) {
              list_send(list)
            } else {
              list.tick = 0
              list.timeout = list.tick + 40
            }
          } else if (message.type === 'queryClearState') {
            index = findlistitem(list, uidconv(message.uid))
            obj = list.objs[index]
            list.reply = index + 1

            if (obj) {
              obj.state = 4 + message.state
            }

            console.log('reply' + list.reply)
            console.log('sent' + list.sent)

            if (list.reply === list.total) {
              release_control(list)
            }
          } else if (message.type === 'version') {
            index = findlistitem(list, message.uid)
            obj = list.objs[index]

            list.reply = index + 1

            if (obj) {
              obj.state = 2
              if (callback) {
                callback(obj.index, message.version, list.dtuIndex)
                callback = null
              }

              console.log('reply' + list.reply)
              console.log('sent' + list.sent)

              if (list.reply === list.total) {
                release_control(list)
              } else if (list.reply === list.sent) {
                list_send(list)
              } else {
                list.tick = 0
                list.timeout = list.tick + 40
              }
            }
          } else if (message.type === 'rtuconfig') {
            index = findlistitem(list, message.uid)
            obj = list.objs[index]

            list.reply = index + 1

            if (obj) {
              obj.state = 2

              var data = message.data
              var offset = -9
              var params = {
                current: (data[9 + offset] << 8) + data[10 + offset],
                time1: (((data[11 + offset] << 8) + data[12 + offset]) / 100).toFixed(2),
                time2: (((data[13 + offset] << 8) + data[14 + offset]) / 100).toFixed(2),
                time3: (((data[15 + offset] << 8) + data[16 + offset]) / 100).toFixed(2),
                induction1: (data[17 + offset]),
                light1: (data[18 + offset]),
                induction2: (data[19 + offset]),
                light2: (data[20 + offset]),
                induction3: (data[21 + offset]),
                light3: (data[22 + offset]),

                mode: (data[39 + offset] << 8) + data[40 + offset],
                time4: (((data[43 + offset] << 8) + data[44 + offset]) / 100).toFixed(2),
                time5: (((data[45 + offset] << 8) + data[46 + offset]) / 100).toFixed(2),
                induction4: (data[47 + offset]),
                light4: (data[48 + offset]),
                induction5: (data[49 + offset]),
                light5: (data[50 + offset]),

                sensortime: (((data[51 + offset] << 8) + data[52 + offset]) / 100).toFixed(2),
                delaytime: (((data[53 + offset] << 8) + data[54 + offset]) / 100).toFixed(2),
                menlight: (data[55 + offset] << 8) + data[56 + offset],
                nomenlight: (data[57 + offset] << 8) + data[58 + offset],
                mtime: (((data[59 + offset] << 8) + data[60 + offset]) / 100).toFixed(2),
                mlight: (data[61 + offset] << 8) + data[62 + offset]
              }

              var typeparams = {
                batterytype: (data[23 + offset] << 8) + data[24 + offset],
                avchargev: (((data[27 + offset] << 8) + data[28 + offset]) / 100).toFixed(2),
                fchargev: (((data[29 + offset] << 8) + data[30 + offset]) / 100).toFixed(2),
                protectv: (((data[31 + offset] << 8) + data[32 + offset]) / 100).toFixed(2),
                recoverv: (((data[33 + offset] << 8) + data[34 + offset]) / 100).toFixed(2),
                engerymanage: (data[35 + offset] << 8) + data[36 + offset],
                temperaturecompensation: (((data[37 + offset] << 8) + data[38 + offset]) / 100).toFixed(2),
                pvon: (((data[41 + offset] << 8) + data[42 + offset]) / 10).toFixed(2),
                vderatestart: (((data[63 + offset] << 8) + data[64 + offset]) / 100).toFixed(2),
                vderateend: (((data[65 + offset] << 8) + data[66 + offset]) / 100).toFixed(2)
              }
              if (callback) {
                callback(params, typeparams)
                callback = null
              }
              release_control(list)
            }
          } else if (message.type === 'writeres') {
            index = findlistitem(list, message.uid)
            obj = list.objs[index]
            list.reply = index + 1
            if (obj) {
              if (message.state || message.writeerror) {
                obj.state = 3
                if (message.writeerror) {
                  alert(message.writeerror)
                }
              } else {
                obj.state = 2
                if (callback) {
                  callback(obj.index, 0)
                  callback = null
                }
              }
              rtu = pjtree.rtuList[obj.index]
              if (rtu.net !== message.state) {
                if (rtu.net) {
                  pjtree.rtuonline++; pjtree.rtuoffline--
                } else {
                  pjtree.rtuonline--
                  pjtree.rtuoffline++
                }
              }

              rtu.net = message.state
              if (rtu.current === undefined) {
                rtu.current = 0
              }
              if (rtu.current === 0 && message.current) {
                pjtree.lighton++
                pjtree.lightoff--
              } else if (rtu.current && message.current === 0) {
                pjtree.lighton--
                pjtree.lightoff++
              }
              if (message.current != undefined && message.current != null) { rtu.current = message.current }
              iconchange(rtu)
              rtu.sendstate = obj.state
              if (callback_sendState) {
                callback_sendState(rtu.uid, obj.state)
              }
            }
            if (list.reply === list.total) {
              release_control(list)
            } else if (list.reply === list.sent) {
              list_send(list)
            } else {
              list.tick = 0
              list.timeout = list.tick + 40
            }
          } else if (message.type === 'realtime') {
            index = findlistitem(list, message.uid)
            obj = list.objs[index]

            list.reply = index + 1

            if (obj) {
              obj.state = 2

              rtu = pjtree.rtuList[obj.index]
              console.log(obj)
              rtu.sendstate = obj.state
              if (callback_sendState) {
                callback_sendState(obj.uid, obj.state, obj.state)
              }
              if (callback) {
                console.log(obj)
                // 返回的值
                callback(obj.index, message.lightdata)
              }
              console.log('reply' + list.reply)
              console.log('sent' + list.sent)

              if (list.reply === list.total) {
                release_control(list)
              } else if (list.reply === list.sent) {
                list_send(list)
              } else {
                list.tick = 0
                list.timeout = list.tick + 40
              }
            }
          }
        } else if (message.type === 'dtu_wsr' || message.type === 'sensor') {
          if (callback) { callback(message); callback = null }
        }
      } catch (e) {
        release_control(list)
        console.log(e)
      }
    } else if (topic.indexOf('dtu/app/') != -1) {
      var list = findlist(message.tel)
      try {
        if (list) {
          var dtu = pjtree.dtuList[list.dtuIndex]

          if (message.type === 'start') {
            dtu.sendstate = 1
            dtu.max = message.totblock
            dtu.dynamic = 0
          } else if (message.type === 'ack') {
            dtu.dynamic = message.block

            if (dtu.dynamic === dtu.max) {
              dtu.sendstate = 3
              release_control(list)
              if (callback) { callback(list.dtuIndex) }
            }
          } else if (message.type === 'error') {
            dtu.sendstate = 4
          }
        }
      } catch (e) {
        console.log(e)
      }
    } else if (topic.indexOf('dtu/close/') != -1) {
      for (var i = 0; i < pjtree.dtuList.length; i++) {
        if (pjtree.dtuList[i].tel == message.tel) {
          pjtree.dtuList[i].net = 1
          pjtree.dtuonline && pjtree.dtuonline--;
          (pjtree.rtuonline >= message.rtunum) && (pjtree.rtuonline = pjtree.rtuonline - message.rtunum)
          break
        }
      }
    }
  })
}
