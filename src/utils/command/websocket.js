const mqtt = require('mqtt')

const mqttUrl = 'ws://120.25.165.207:8083/mqtt'
export let Socket = {
  clientId: '',
  socket: null
}
// function Socket (ServeService, $state, $timeout, $log) {
//   var service = {
//     clientId: '',
//     connect: mqtt_connect,
//     publish: publish,
//     subscribe: subscribe,
//     unsubscribe: unsubscribe,
//     end: end,
//     socket: null
//   }
//   return service
// }
let user = JSON.parse(sessionStorage.getItem('nomouser'))._id
// return service;
export function mqtt_connect (cb) {
  console.log('MQTT_connect')
  if (user) {
    // 这样不至于产生多个clientId，便于release_control(释放控制权)
    // var clientId = window.localStorage.getItem('mqttClientId');
    var clientId = 'web_' + Math.random().toString(16).substr(2, 8)
    Socket.clientId = ''
    console.log('MQTT_connect')
    Socket.socket = mqtt.connect(mqttUrl, { clientId: clientId, resubscribe: false })
    Socket.socket.on('connect', function () {
      var lastID = Socket.clientId
      Socket.clientId = Socket.socket.options.clientId
      cb(Socket.socket, lastID)
    })
    Socket.socket.on('close', function () {
      console.log('close')
    })
    Socket.socket.on('disconnect', function () {
      console.log('mqtt disconnect')
    })
    Socket.socket.on('offline', function () {
      console.log('offline')
    })
    Socket.socket.on('error', function () {
      console.log('mqtt error')
    })
    Socket.socket.on('end', function () {
      console.log('mqtt end')
    })
  }
}

export function publish (obj) {
  Socket.socket.publish(obj.topic, JSON.stringify(obj.msg), function (err) {
    if (err) {
      $log.error(err)
    }
  })
}

export function subscribe (topic) {
  Socket.socket.subscribe(topic, function (err) {
    if (err) {
      $log.error(err)
    }
  })
}

export function unsubscribe (topic, cb) {
  Socket.socket.unsubscribe(topic, function (err) {
    if (err) {
      $log.error(err)
    }
    cb()
  })
}

export function end () {
  if (Socket.socket) {
    Socket.socket.end()
  }
}

export function adminReleaseControl (id) {
  // var mqttService = Socket({ user: 'admin' })
  var clientId = 'web_' + Math.random().toString(16).substr(2, 8)

  let socket = mqtt.connect(mqttUrl, { clientId: clientId, resubscribe: false })
  socket.on('connect', function () {
    console.log('管理员释放控制权！')
    socket.subscribe('dtu/releasectrl/' + clientId)
    socket.publish('web/releasectrl/' + id, JSON.stringify({ clientId: clientId, tel: id, adminctrl: true }))
    socket.on('message', function (topic, msg) {
      console.log(topic, '-', JSON.parse(msg))
      socket.end()
    })
  })
}
