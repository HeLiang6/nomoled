
const wifi = {
  state: {
    projectList: [],
    projectId: '',
    wifiMap: null,
    map_center: null
  },

  mutations: {
    PROJECT_LIST: (state, data) => {
      state.projectList = data
      state.projectId = data[0].value
    },
    wifiData: (state, data) => {
      data.map(item => {
        item.site = { lng: item.longitude, lat: item.latitude }
        item.url = '../../../static/images/mapImg/mapWiFi.png'
      })
      state.wifiMap = data
    },
    wifiMap_Center: (state, data) => {
      state.map_center = {
        lng: data.longitude,
        lat: data.latitude

      }
    }
  },

  actions: {
  }
}

export default wifi
