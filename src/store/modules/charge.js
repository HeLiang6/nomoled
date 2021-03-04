
const charge = {
  state: {
    projectList: [],
    projectId: '',
    chargeMap: null,
    map_center: null
  },

  mutations: {
    CHARGE_list: (state, data) => {
      state.projectList = data
      state.projectId = data[0].value
    },
    CHARGEData: (state, data) => {
      data.map(item => {
        item.site = { lng: item.longitude, lat: item.latitude }
        item.url = '../../../static/images/mapImg/mapCharge.png'
      })
      state.chargeMap = data
    },
    CHARGEMap_Center: (state, data) => {
      state.map_center = {
        lng: data.longitude,
        lat: data.latitude

      }
    }
  },

  actions: {
  }
}

export default charge
