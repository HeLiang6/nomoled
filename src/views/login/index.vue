<template>
  <div
    id="content"
    v-loading="$store.state.user.loading"
    :element-loading-text="$t('message.loading_message')"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 1)"
    :style="{backgroundImage:'url(' + imgAll[2] + ')'}"
  >
    <!-- logo -->
    <img
      :src="
    imgAll[0]"
      class="logo_img"
      :alt="$t('message.Lemo')"
      :title="$t('message.Lemo')"
    >
    <img
      class="streetLamp"
      :src="imgAll[1]"
      alt=""
    >
    <div class="position_box">
      <Login v-show='$store.state.user.isflag' />
      <Forget v-show='!$store.state.user.isflag' />
    </div>
  </div>
</template>

<script>
import Login from './components/Login'
import Forget from './components/Forget'
import ChangePassword from './components/ChangePassword'
export default {
  components: {
    Login,
    Forget,
    ChangePassword
  },
  data () {
    return {
      count: 0,
      // loading: false,
      imgAll: [
        require('../../../static/images/logo.png'),
        require('../../../static/images/streetLamp.png'),
        require('../../../static/images/loginBg.jpg')
      ]
    }
  },
  beforeCreate () {
    // let urlArr = [
    //   require('../../../static/images/logo.png'),
    //   require('../../../static/images/streetLamp.png'),
    //   require('../../../static/images/loginBg.jpg')
    // ]

    // if (urlArr.length <= 0) return
    // let i = 0
    // // let timer = null
    // // let len = urlArr.length
    // for (let img of urlArr) {
    //   let image = new Image()
    //   image.onload = () => {
    //     i++
    //     if (i >= urlArr.length) {
    //       console.log(123)
    //       this.loading = false
    //     }
    //   }
    //   image.src = img
    // }

    // let load = (url) => {
    //   if (i < len) {
    //     const image = new Image()
    //     image.src = url
    //     timer = setInterval(() => {
    //       if (image.complete) {
    //         clearInterval(timer)
    //         load(urlArr[i++])
    //       }
    //     }, 80)
    //   } else {
    //     this.loading = false // 所有图片加载完后的操作
    //   }
    // }
    // load(urlArr[i])
    // let count = 0
    // let imgs = [
    //   require('../nav/img/starry_sky_bg.jpg'),
    //   require('../nav/img/camera_bg.jpg'),
    //   require('../nav/img/charging_bg.jpg'),
    //   require('../nav/img/earth_bg.jpg'),
    //   require('../nav/img/environmental_bg.jpg'),
    //   require('../nav/img/streetLamp_bg.jpg'),
    //   require('../nav/img/wifi_bg.jpg'),
    //   require('../nav/img/advertising_bg.jpg')
    //   // 用require的方式添加图片地址，直接添加图片地址的话，在build打包之后会查找不到图片，因为打包之后的图片名称会有一个加密的字符串
    // ]
    // for (let img of imgs) {
    //   let image = new Image()
    //   image.onload = () => {
    //     count++
    //   }
    //   image.src = img
    // }
    let count = 0
    let imgs = [
      // require('../nav/img/starry_sky_bg.jpg'),
      // require('../nav/img/camera_bg.jpg'),
      // require('../nav/img/charging_bg.jpg'),
      require('../nav/img/earth_bg.jpg'),
      require('../nav/images/bg.jpg')
      // require('../nav/img/streetLamp_bg.jpg'),
      // require('../nav/img/wifi_bg.jpg'),
      // require('../nav/img/advertising_bg.jpg')
      // 用require的方式添加图片地址，直接添加图片地址的话，在build打包之后会查找不到图片，因为打包之后的图片名称会有一个加密的字符串
    ]
    for (let img of imgs) {
      let image = new Image()
      image.onload = () => {
        count++
      }
      image.src = img
    }
  },
  mounted () {
    console.log(this.$store.state)
    sessionStorage.setItem('language', this.$store.state.user.val)
    this.$i18n.locale = sessionStorage.getItem('language')
  },
  methods: {
  }
}
</script>

<style scoped>
#content {
  width: 100%;
  height: 100%;
  /* background: url("../../../static/images/loginBg.jpg") no-repeat; */
  background-size: cover;
  overflow: hidden;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}
.logo_img {
  width: 100px;
  height: 50px;
  cursor: pointer;
  position: fixed;
  top: 30px;
  left: 40px;
}
.streetLamp {
  position: absolute;
  left: 40px;
  bottom: 150px;
  width: 40%;
  height: 70%;
}
.position_box {
  position: absolute;
  right: 20%;
  top: 20%;
}
</style>
