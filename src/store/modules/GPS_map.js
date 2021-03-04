
const GPSmap = {
  state: {
    projectList: [],
    projectId: '',
    points: [],
    is_light: false,
    rtu_detail: {},
    dtu_light: false,
    dtu_detail: {},
    center: {
      longitude: null,
      latitude: null
    },
    rtuMessage: [
      {
        objs: [
          {
            uid: '1',
            state: 1
          }
        ]
      }
    ],
    dtuTel: ''
  },

  mutations: {
    PROJECT_TREE: (state, data) => {
      state.projectList = data
      // 地图图标
      let num = state.projectList
      if (num.length !== 0) {
        for (let i = 0; i < num.dtuList.length; i++) {
          if (num.dtuList[i].rtuList !== null) {
            num.dtuList[i].rtuList.map(item => {
              // let data = {
              //   // site: { lng: item.longitude, lat: item.latitude },
              //   url: '../../../static/images/mapImg/mapRtu.png',
              //   // id: item._id
              // }
              item.url = '../../../static/images/mapImg/mapRtu.png'

              // num.dtuList[i].rtuList.push(data)
            })
          }
        }
        if (num.monitorList !== null) {
          num.monitorList.forEach(item => {
            item.url = '../../../static/images/mapImg/mapMonitor.png'
          })
          // for (let i = 0; i < num.monitorList.length; i++) {
          //   let data = {
          //     site: { lng: num.monitorList[i].longitude, lat: num.monitorList[i].latitude },
          //     url: '../../../static/images/mapImg/mapMonitor.png',
          //     id: num.monitorList[i]._id
          //   }
          //   state.points.push(data)
          // }
        }
        if (num.wifiList !== null) {
          num.wifiList.forEach(item => {
            item.url = '../../../static/images/mapImg/mapWiFi.png'
          })
          // for (let i = 0; i < num.wifiList.length; i++) {
          //   let data = {
          //     site: { lng: num.wifiList[i].longitude, lat: num.wifiList[i].latitude },
          //     url: '../../../static/images/mapImg/mapWiFi.png',
          //     id: num.wifiList[i]._id
          //   }
          //   state.points.push(data)
          // }
        }
        if (num.chargeList !== null) {
          num.chargeList.forEach(item => {
            item.url = '../../../static/images/mapImg/mapCharge.png'
          })

          // for (let i = 0; i < num.chargeList.length; i++) {
          //   let data = {
          //     site: { lng: num.chargeList[i].longitude, lat: num.chargeList[i].latitude },
          //     url: '../../../static/images/mapImg/mapCharge.png',
          //     id: num.chargeList[i]._id
          //   }
          //   state.points.push(data)
          // }
        }
        if (num.billboardList !== null) {
          num.billboardList.forEach(item => {
            item.url = '../../../static/images/mapImg/mapBillboardList.png'
          })
          // for (let i = 0; i < num.billboardList.length; i++) {
          //   let data = {
          //     site: { lng: num.billboardList[i].longitude, lat: num.billboardList[i].latitude },
          //     url: '../../../static/images/mapImg/mapBillboardList.png',
          //     id: num.billboardList[i]._id
          //   }
          //   state.points.push(data)
          // }
        }
      }
      state.points = num
      console.log(state.points)
    },
    SET_LIGHT: (state, data) => {
      state.dtu_light = true
      state.dtu_detail = data
    },
    // 默认项目
    PROJECT_ID: (state, data) => {
      state.projectId = data[0]._id
    },
    SET_PROJECTID: (state, data) => {
      state.projectId = data
    },
    // 路灯弹框
    GPS_LIGHT: (state, data) => {
      state.is_light = true
      state.rtu_detail = data
    },
    // 项目坐标
    center: (state, data) => {
      state.center = data
    },
    rtuListMessage: (state, data) => {
      state.rtuMessage = data[0]
    },
    GPSDTUTEL: (state, data) => {
      state.dtuTel = data
    }
  },

  actions: {
  }
}

export default GPSmap
