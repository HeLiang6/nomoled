<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import './assets/reset.css'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  created () {
    if (sessionStorage.getItem('store')) {
      this.$store.state.project.projectId = JSON.parse(sessionStorage.getItem('store'))
      // this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    if (sessionStorage.getItem('tag')) {
      this.$store.state.project.tag = JSON.parse(sessionStorage.getItem('tag'))
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state.project.projectId))
      sessionStorage.setItem('tag', JSON.stringify(this.$store.state.project.tag))
    })
  },
  beforeCreate () {
    let urlArr = [
      require('../static/images/logo.png'),
      require('../static/images/streetLamp.png'),
      require('../static/images/loginBg.jpg')
    ]

    if (urlArr.length <= 0) return
    let i = 0
    // let timer = null
    // let len = urlArr.length
    for (let img of urlArr) {
      let image = new Image()
      image.onload = () => {
        i++
        if (i >= urlArr.length) {
          // console.log(123)
          this.$store.commit('setLoading', false)
        }
      }
      image.src = img
    }
  },
  mounted () {
    this.$store.commit('Data')
    // this.loadImages(this.imgAll)
    function checkIE () {
      return '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style
    }
    if (checkIE()) {
      window.addEventListener('hashchange', () => {
        var currentPath = window.location.hash.slice(1)
        if (this.$route.path !== currentPath) {
          this.$router.push(currentPath)
        }
      }, false)
    }
  },
  methods: {

  }
}
</script>

<style>
#app {
  height: 100%;
  /* overflow-y: auto; */
}
</style>
