import Vue from 'vue'
import Vuex from 'vuex'
// import app from './modules/app'
import user from './modules/user'
import project from './modules/project'
import task from './modules/task'
import GPSmap from './modules/GPS_map'
import warn from './modules/warn'
import wifi from './modules/wifi'
import charge from './modules/charge'
import large from './modules/large'
import data from './modules/data'
// import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // app,
    user,
    project,
    task,
    GPSmap,
    warn,
    wifi,
    charge,
    large,
    data
  }
  // getters
})

export default store
