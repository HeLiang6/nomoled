import { setDate } from '../../views/task/components/date'
import { getLightData } from '@/api/data'

const data = {
  state: {
    projectList: [],
    projectId: '',
    rtus: [],
    dtuId: null,
    type: 0,
    lightList: [],
    dtu: false,
    startTime: new Date().getTime() - 86400000 * 7,
    endtime: new Date().getTime(),
    dtuList: [],
    dataRtuList: [],
    numType: 0,
    electricTime: ''
    // downTime: new Date()
  },

  mutations: {
    DATAPROJECT_LIST: (state, data) => {
      state.projectList = data
      state.projectId = data[0].value
    },
    DTUDATA: (state, data) => {
      state.dtu = data
      state.rtus = []
    },
    lightTable: (state) => {
      state.lightList = []
      if (state.rtus) {
        for (let n = 0; n < state.rtus.length; n++) {
          let data = {
            rtuId: state.rtus[n],
            // startTime: state.startTime,
            endtime: state.endtime
            // pageSize: 10
          }
          getLightData(data).then(res => {
            res._id = state.rtus[n]
            res.result.map(item => {
              item.date = setDate(item.time)
            })
            state.lightList.push(res)
          }).catch(err => {
            console.log(err)
          })
          // Promise.all([num]).then((result) => {
          //   // console.log(result) // [ '3秒后醒来', '2秒后醒来' ]
          //   state.lightList.push(result)
          //   console.log(123)
          // }).catch((error) => {
          //   console.log(error)
          // })
        }
      }

      // state.lightList = list.result.forEach(item => {
      //   item.date = setDate(item.time)
      // })
    },
    // dtu列表
    DtuList: (state, data) => {
      data.lis.result.map(item => {
        item.date = setDate(item.time)
      })
      // if (data.lis.result) {
      //   dtu = data.lis.result.map(item => {
      //     item.date = setDate(item.time)
      //   })
      // }
      state.dtuList = data.lis
      state.dtuId = data.dtu
    },
    Time: (state, data) => {
      state.electricTime = data
    },
    dataRtuList: (state, data) => {
      state.dataRtuList = data
    }

  },

  actions: {
  }
}

export default data
