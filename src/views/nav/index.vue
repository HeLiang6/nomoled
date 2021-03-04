<template>
  <div id="Nav">
    <div class="nav-box">
      <!-- <div class="bd">

      </div> -->
      <router-link
        tag="div"
        to="/home"
        class="box"
      >
        <img
          class="img"
          src="./images/streetLamp.png"
          :alt="$t('nav.light')"
          :title="$t('nav.light')"
        >
      </router-link>
      <!-- <div class="box">
        <img
          class="img"
          src="./images/charging.png"
          :alt="$t('nav.light')"
          :title="$t('nav.light')"
        >
      </div> -->
      <router-link
        tag="div"
        to="/wifi"
        class="box"
      >
        <img
          class="img"
          src="./images/wifi.png"
          :alt="$t('nav.wifi')"
          :title="$t('nav.wifi')"
        >
      </router-link>

      <!--
      <div class="box">
        <img
          class="img"
          src="./images/camera.png"
          :alt="$t('nav.light')"
          :title="$t('nav.light')"
        >
      </div>
      <div class="box">
        <img
          class="img"
          src="./images/environmental.png"
          :alt="$t('nav.light')"
          :title="$t('nav.light')"
        >
      </div>
      <div class="box">
        <img
          class="img"
          src="./images/wifi.png"
          :alt="$t('nav.wifi')"
          :title="$t('nav.wifi')"
        >
      </div>
      <div class="box">
        <img
          class="img"
          src="./images/advertising.png"
          :alt="$t('nav.wifi')"
          :title="$t('nav.wifi')"
        >
      </div> -->
      <div ref="earth">

      </div>

    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
export default {
  data () {
    return {
      w: '',
      h: ''
    }
  },
  mounted () {
    this.earth()
  },
  methods: {
    earth () {
      // this.w = document.body.clientWidth / 1.5
      // this.h = document.body.clientHeight / 1.5
      let texture = new THREE.TextureLoader().load(
        '../../../static/images/1.jpg'
      )
      let wifi = new THREE.TextureLoader().load(
        '../../../static/images/wifi.png'
      )
      // const textureBg = new THREE.TextureLoader().load('../../../static/images/bg.jpg')
      const scene = new THREE.Scene()
      // scene.background = textureBg
      let camera = new THREE.PerspectiveCamera(
        20,
        window.innerWidth / window.innerHeight,
        1,
        1000
      )
      var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0xeeeeee, 0.0)
      this.$refs.earth.appendChild(renderer.domElement)
      let geometry = new THREE.SphereBufferGeometry(5, 100, 100) // 地球大小
      let geometry2 = new THREE.SphereBufferGeometry(1, 50, 100) // wifi大小

      // let geometry = ''
      // if (document.body.clientWidth <= 1050) {
      //   geometry = new THREE.SphereBufferGeometry(5, 100, 100) // 地球大小
      // } else {
      //   geometry = new THREE.SphereBufferGeometry(8, 100, 100) // 地球大小
      // }
      let material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: texture
      })
      //  wifi 图片
      let wifis = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: wifi
      })
      // 点击事件

      let sphere = new THREE.Mesh(geometry, material)
      let sphere2 = new THREE.Mesh(geometry2, wifis)
      sphere2.position.set(-12, 2, 0)
      // sphere.position.set(-10, 0, 0)
      scene.add(sphere)
      scene.add(sphere2)
      camera.position.z = 70

      let animate = function () {
        requestAnimationFrame(animate)
        sphere.rotation.y += 0.005
        renderer.render(scene, camera)
      }
      animate()
    }
  }
}
</script>

<style scoped>
#Nav {
  background-image: url("./images/bg.jpg");
  width: 100%;
  height: 100%;
  background-size: cover;
  overflow: hidden;
}
.nav-box {
  position: relative;
  top: 50%;
  left: 50%;
  background-size: cover;
  margin-top: -25%;
  margin-left: -50%;
  /* width: 400px;
  height: 400px; */
}
/* 边框 */
/* .bd {
  width: 80%;
  height: 80%;
  background-image: url("./images/bd.png");
  background-size: cover;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -20%;
  margin-left: -40%;
} */
.box {
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #fde8e8;
  /* animation: fadenum 2s infinite; */
  text-align: center;
  line-height: 50px;
  position: absolute;
  box-shadow: 0 0 60px 20px red;
}
.nav-box .box:nth-child(1) {
  left: 20%;
  top: 30%;
  animation: fadenum 2s infinite;
}
.nav-box .box:nth-child(2) {
  left: 40%;
  top: 40%;
  animation: fadenum 3s infinite;
}
/*
.nav-box .box:nth-child(3) {
  left: 200px;
  top: 40px;
  animation: fadenum 2.5s infinite;
}
.nav-box .box:nth-child(4) {
  left: 300px;
  top: 240px;
  animation: fadenum 1s infinite;
}
.nav-box .box:nth-child(5) {
  left: 25%;
  top: 50%;
  animation: fadenum 2s infinite;
} */
#Nav .box:hover {
  /* animation-play-state: paused; */
  animation-duration: 0s;
}
.img {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  margin-left: -15px;
  margin-top: -15px;
}
@keyframes fadenum {
  /* 设置内容由显示变为隐藏 */
  0% {
    opacity: 0.8;
  }
  10% {
    opacity: 0.6;
  }
  20% {
    opacity: 0.4;
  }
  30% {
    opacity: 0.2;
  }
  40% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.2;
  }
  60% {
    opacity: 0.4;
  }
  70% {
    opacity: 0.6;
  }
  80% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.9;
  }
  100% {
    opacity: 1;
  }
}
</style>
