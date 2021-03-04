
const user = {
  state: {
    loading: true,
    val: 'cn',
    isflag: true,
    verification_Code: '',
    verification_Codes: '',
    nomouser: {}, // 登录成功的用户信息
    // 修改密码组件状态
    news: false,
    message: false
  },

  mutations: {
    message: (state, data) => {
      if (data) {
        state.message = true
      }
    },
    setLoading: (state, data) => {
      state.loading = data
    },
    savePassword: (state, data) => {
      state.isflag = !state.isflag
    },
    Login: (state, data) => {
      let str = JSON.stringify(data)
      sessionStorage.setItem('nomouser', str)

      state.nomouser = data
      // console.log(state.nomouser)
    },
    retrievePassword: (state, data) => {
      state.news = true
    },
    // setCode: (state, data) => {
    //   state.verification_Code = data
    // },
    Data: (state) => {
      let nomouse = sessionStorage.getItem('nomouser')
      let data = JSON.parse(nomouse)
      state.nomouser = data
    }
  },

  actions: {
    // 登录
    // Login({
    //   commit
    // }, userInfo) {
    //   const username = userInfo.username.trim()
    //   return new Promise((resolve, reject) => {
    //     login(username, userInfo.password).then(response => {
    //       const data = response
    //       commit('SET_TOKEN', data)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
  }
}

export default user
