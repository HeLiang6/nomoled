
const warn = {
  state: {
    projectList: [],
    projectId: ''
  },

  mutations: {
    PROJECT_LIST: (state, data) => {
      state.projectList = data
      state.projectId = data[0].value
    }
  },

  actions: {
  }
}

export default warn
