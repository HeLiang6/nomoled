
const large = {
  state: {
    projectId: '',
    mapData: [],
    day: null,
    list: [],
    center: null,
    options: [],
    val_id: null
  },

  mutations: {
    projectID: (state, data) => {
      state.options = data
      state.projectId = data[0].value
    },
    large_center: (state, data) => {
      state.center = {
        lng: data.longitude,
        lat: data.latitude
      }
    },
    // 地图数据
    large_map: (state, num) => {
      state.mapData = num
      state.list = []
      if (num.length !== 0) {
        for (let i = 0; i < num.dtuList.length; i++) {
          if (num.dtuList[i].rtuList !== null) {
            num.dtuList[i].rtuList.forEach(item => {
              let data = {
                site: { lng: item.longitude, lat: item.latitude },
                url: '../../../static/images/mapImg/mapRtu.png',
                id: item._id,
                type: 'rtu',
                name: item.name
              }
              state.list.push(data)
            })
          }
        }
        if (num.monitorList !== null) {
          for (let i = 0; i < num.monitorList.length; i++) {
            let data = {
              site: { lng: num.monitorList[i].longitude, lat: num.monitorList[i].latitude },
              url: '../../../static/images/mapImg/mapMonitor.png',
              id: num.monitorList[i]._id,
              type: '',
              name: num.monitorList[i].name

            }
            state.list.push(data)
          }
        }
        if (num.wifiList !== null) {
          for (let i = 0; i < num.wifiList.length; i++) {
            let data = {
              site: { lng: num.wifiList[i].longitude, lat: num.wifiList[i].latitude },
              url: '../../../static/images/mapImg/mapWiFi.png',
              id: num.wifiList[i]._id,
              type: '',
              name: num.wifiList[i].name

            }
            state.list.push(data)
          }
        }
        if (num.chargeList !== null) {
          for (let i = 0; i < num.chargeList.length; i++) {
            let data = {
              site: { lng: num.chargeList[i].longitude, lat: num.chargeList[i].latitude },
              url: '../../../static/images/mapImg/mapCharge.png',
              id: num.chargeList[i]._id,
              type: '',
              name: num.chargeList[i].name

            }
            state.list.push(data)
          }
        }
        if (num.billboardList !== null) {
          for (let i = 0; i < num.billboardList.length; i++) {
            let data = {
              site: { lng: num.billboardList[i].longitude, lat: num.billboardList[i].latitude },
              url: '../../../static/images/mapImg/mapBillboardList.png',
              id: num.billboardList[i]._id,
              type: '',
              name: num.billboardList[i].name

            }
            state.list.push(data)
          }
        }
      }
    },
    Day: (state, data) => {
      console.log(data)
      state.day = data
    }
    // GEnerate: (state, dom) => {
    //   let data = [['2000-06-05', 116], ['2000-06-06', 129], ['2000-06-07', 135], ['2000-06-08', 86], ['2000-06-09', 73], ['2000-06-10', 85], ['2000-06-11', 73], ['2000-06-12', 68], ['2000-06-13', 92], ['2000-06-14', 130], ['2000-06-15', 245], ['2000-06-16', 139], ['2000-06-17', 115], ['2000-06-18', 111], ['2000-06-19', 309], ['2000-06-20', 206], ['2000-06-21', 137], ['2000-06-22', 128], ['2000-06-23', 85], ['2000-06-24', 94], ['2000-06-25', 71], ['2000-06-26', 106], ['2000-06-27', 84], ['2000-06-28', 93], ['2000-06-29', 85], ['2000-06-30', 73], ['2000-07-01', 83], ['2000-07-02', 125], ['2000-07-03', 107], ['2000-07-04', 82], ['2000-07-05', 44], ['2000-07-06', 72], ['2000-07-07', 106], ['2000-07-08', 107], ['2000-07-09', 66], ['2000-07-10', 91], ['2000-07-11', 92], ['2000-07-12', 113], ['2000-07-13', 107], ['2000-07-14', 131], ['2000-07-15', 111], ['2000-07-16', 64], ['2000-07-17', 69], ['2000-07-18', 88], ['2000-07-19', 77], ['2000-07-20', 83], ['2000-07-21', 111], ['2000-07-22', 57], ['2000-07-23', 55], ['2000-07-24', 60]]
    //   let dateList = data.map(function (item) {
    //     return item[0]
    //   })
    //   console.log(this.$store.state.large.day)

    //   // for (let i in this.$store.state.large.day) {
    //   //   console.log(this.$store.state.large.day)
    //   // }
    //   let valueList = data.map(function (item) {
    //     return item[1]
    //   })
    //   let generate = dom
    //   generate.setOption({
    //     tooltip: {
    //       trigger: 'axis'
    //     },
    //     grid: {
    //       left: '3%',
    //       right: '4%',
    //       bottom: '3%',
    //       containLabel: true
    //     },
    //     toolbox: {
    //       feature: {
    //         saveAsImage: {}
    //       }
    //     },
    //     xAxis: {
    //       type: 'category',
    //       boundaryGap: false,
    //       data: dateList,
    //       axisLabel: {
    //         show: true,
    //         textStyle: {
    //           color: 'white', // 这里是改变字体颜色
    //           fontSize: 14// 字体大小
    //         }
    //       }

    //     },
    //     yAxis: {
    //       type: 'value',
    //       max: 'dataMax',
    //       min: 'dataMin',
    //       axisLabel: {
    //         show: true,
    //         textStyle: {
    //           color: 'white', // 这里是改变字体颜色
    //           fontSize: 12// 字体大小
    //         }

    //       }
    //     },
    //     series: [
    //       {
    //         type: 'line',
    //         showSymbol: false,
    //         data: valueList
    //       }
    //     ]
    //   })
    // }
  },

  actions: {
  }
}

export default large
