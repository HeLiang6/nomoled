<template>
  <div id="box">
    <canvas id="main"></canvas>
  </div>
</template>

<script>
// import './1.js'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSS2DRenderer, CSS2DObject } from './CSS2DRenderer.js'

import './img/earth_bg.jpg'
import './img/charging_bg.jpg'
import './img/streetLamp_bg.jpg'
import './img/advertising_bg.jpg'
import './img/wifi_bg.jpg'
// import './img/pluto_bg.jpg'
import './img/environmental_bg.jpg'
// import './img/saturn_ring.jpg'
// import './img/sun_bg.jpg'
// import './img/uranus_bg.jpg'
import './img/camera_bg.jpg'
export default {
  data () {
    return {
      handleClick: null,
      handleEnter: null,
      interval: null,
      timeIndex: null
    }
  },
  mounted () {
    let _that = this
    const canvas = document.getElementById('main')
    var clickObjects = []

    /* 画布大小 */
    console.log(window.innerWidth)
    console.log(canvas)
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    /* renderer */
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true // 辅助线
    renderer.shadowMapSoft = true // 柔和阴影
    renderer.setClearColor(0xffffff, 0)

    /* scene */
    const scene = new THREE.Scene()

    /* camera */
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 3000)
    camera.position.set(-150, 200, 150)
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    scene.add(camera)

    // const AxesHelper = new THREE.AxesHelper(500);
    // scene.add(AxesHelper);
    // 添加环境光
    // var ambient = new THREE.AmbientLight(0x888888)
    // scene.add(ambient)// 环境光对象添加到scene场景中

    const labelRenderer = new CSS2DRenderer()
    labelRenderer.setSize(canvas.clientWidth, canvas.clientHeight)
    labelRenderer.domElement.style.position = 'absolute'
    labelRenderer.domElement.style.top = '0px'
    document.body.appendChild(labelRenderer.domElement)
    // 鼠标移动摄像头
    var orbitcontrols = new OrbitControls(camera, labelRenderer.domElement)
    orbitcontrols.update()

    const loader = new THREE.TextureLoader()

    const SunSystem = new THREE.Object3D()
    scene.add(SunSystem)

    const planets = []

    /* earth */
    let sun = require('./img/earth_bg.jpg')
    const sunMaterial = new THREE.MeshBasicMaterial({
      map: loader.load(sun)
    })
    const Sun = new THREE.Mesh(new THREE.SphereGeometry(40, 30, 30), sunMaterial)
    Sun.name = 'Sun'
    // Sun.speed = 0.0123
    SunSystem.add(Sun)
    const planetDiv = document.createElement('div')
    planetDiv.className = 'label'
    planetDiv.textContent = '地球'
    planetDiv.style.marginTop = '-0.3em'
    planetDiv.style.color = 'red'
    const planetLabel = new CSS2DObject(planetDiv)
    planetLabel.position.set(0, 14, 0)
    console.log(Sun)

    Sun.add(planetLabel)
    let animate = function () {
      _that.timeIndex = requestAnimationFrame(animate)
      Sun.rotation.y += 0.005
      renderer.render(scene, camera)
    }
    animate()

    // 添加水星
    const Mercury = loadPlanet('advertising', 'ad', 8, 90, 0.002, 40, 40, 10, 2000) // (图片名称,title名称,大小,轨道之间的距离, 动画的速度,图片宽高,起始位置,计时器时间)
    console.log(Mercury)
    planets.push(Mercury)
    // 添加金星
    const Venus = loadPlanet('camera', 'camera', 8, 90, 0.002, 30, 25, 50, 1500)
    planets.push(Venus)
    // // // 添加地球
    // const Earth = loadPlanet('earth', 5, 40, 0.010)
    // planets.push(Earth)
    // // // 添加火星
    const Mars = loadPlanet('streetLamp', 'light', 8, 90, 0.002, 40, 40, 20.8, 1200)
    planets.push(Mars)
    // // // 添加木星
    const Jupiter = loadPlanet('charging', 'char', 8, 90, 0.002, 40, 40, 30, 1600)
    planets.push(Jupiter)
    // // // 添加土星
    const Saturn = loadPlanet('environmental', 'environ', 8, 90, 0.002, 40, 40, 21.6, 1800)
    planets.push(Saturn)
    // // // 添加天王星
    const Uranus = loadPlanet('wifi', 'wifi', 8, 90, 0.002, 40, 30, 19.6, 1000)
    planets.push(Uranus)
    // planets.map(item => {
    //   item.stop = false
    // })
    const particleSystem = initParticle()
    scene.add(particleSystem)

    function loadPlanet (name, title, radius, position, speed, imgWidth, imgHeight, y, time) {
      const planetSystem = new THREE.Mesh(new THREE.SphereGeometry(1, 1, 1), new THREE.MeshLambertMaterial()) // 材质设定
      planetSystem.speed = speed
      let img = require(`./img/${name}_bg.jpg`)
      const material = new THREE.MeshBasicMaterial({
        map: loader.load(img)
        // color: 0xd3b1b1
      })
      let num = 0

      // function bg () {
      //   renderer.render(scene, camera)
      //   num += 2
      //   // material.color.set(0xd3b1b1)
      //   if (num >= 20) {
      //     material.color.set(0x5849ee)
      //   } else if (num >= 40) {
      //     // material.color.set(0x000000)
      //   } else if (num >= 60) {
      //     //   material.color.set(0xffffff)
      //     // } else if (num >= 70) {
      //     //   console.log(1)
      //     //   num = 0
      //   }
      // }
      // setInterval(() => {
      //   bg()
      // }, 50)
      // 切换颜色
      // let image = new Image()
      // image.src = require(`./img/earth_bg.jpg`)

      // let interval = setInterval(function () {
      //   // let raycaster = new THREE.Raycaster()
      //   // let color
      //   num++

      //   if (num % 2) {
      //     console.log(material)
      //     for (let i = 0; i < 40; i++) {
      //       if (i === 10) {
      //         material.color.set(0x000000)
      //       }
      //       if (i === 20) {
      //         material.color.set(0xfffff)
      //       }
      //       if (i === 30) {
      //         material.color.set(0x5849ee)
      //       }
      //     }
      //     // image.onload = function () {
      //     // material.map.image = image
      //     // material.map.needsUpdate = true
      //     // console.log(material)
      //     // }

      //     // color = 0xd3b1b1
      //   } else if (num > 2) {
      //     num = 0
      //   } else {
      //     // color = 0x000000
      //   }
      //   // material.color.set(color)
      // }, time)
      // 离开页面卸载计时器
      // _that.$router.beforeEach((to, from, next) => {
      //   clearInterval(interval)
      //   next()
      // })
      // material.shadowSide = true
      // material.opacity = 0
      console.log(material)
      const planet = new THREE.Mesh(new THREE.SphereGeometry(radius, 30, 30), material)
      planet.position.z = -position
      // planet.position.y = -y
      // planet.position.y = -position
      // planet.rotateOnAxis(new THREE.Vector3(1, 0, 0).normalize(), -23.36 * Math.PI / 180)
      planetSystem.add(planet)
      clickObjects.push(planet)
      planetSystem.rotation.y = y
      // 星球轨道
      const track = new THREE.Mesh(new THREE.RingGeometry(position, position + 0.05, 64, 1), new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        color: 'blue'
      }))
      // console.log(track)
      track.rotation.x = -Math.PI / 2
      scene.add(track)
      // 导航样式

      const planetDiv = document.createElement('div')
      const imgBox = document.createElement('div')
      // const titles = document.createElement('p')
      const imgs = document.createElement('img')
      imgs.src = `/static/images/images/${name}.png`
      imgs.title = _that.$t(`nav.${title}`)
      imgs.alt = _that.$t(`nav.${title}`)
      // titles.innerHTML = _that.$t(`nav.${title}`)
      // titles.style.textAlign = 'center'
      // titles.style.color = '#fff'

      // planetDiv.appendChild(titles)

      planetDiv.appendChild(imgBox)
      // planetDiv.textContent = '地球'
      imgBox.appendChild(imgs)
      planetDiv.className = 'label'
      // planetDiv.textContent = name
      planetDiv.style.marginTop = 2.5 + '%'
      // imgBox.style.height = 70 + 'px'
      // imgBox.style.width = 70 + 'px'
      // imgBox.style.display = 'flex'
      // imgBox.style.justifyContent = 'center'
      // imgBox.style.alignItems = 'center'
      // imgBox.style.borderRadius = 50 + '%'
      // imgs.style.borderRadius = 50 + '%'
      // imgBox.style.boxShadow = '0 0 20px 20px red'
      imgs.style.width = imgWidth + 'px'
      imgs.style.height = imgHeight + 'px'
      // imgs.style.marginLeft = -20 + '%'
      // imgs.style.marginTop = -10 + '%'
      // const navImg = `url(/static/images/nav_img/${name}.png) no-repeat`
      // planetDiv.style.background = navImg

      // planetDiv.style.background = 'url(/static/images/wifi.png) no-repeat'
      var style = document.createElement('style')
      style.type = 'text/css'
      style.innerHTML = `
            @keyframes fadenum {
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
      }`
      document.getElementsByTagName('head')[0].appendChild(style)
      planetDiv.style.animation = 'fadenum ' + radius + 's' + ' infinite'

      const planetLabel = new CSS2DObject(planetDiv)
      planetLabel.position.set(0, radius, 0)
      planet.add(planetLabel)
      console.log(planet)
      SunSystem.add(planetSystem)
      return planetSystem
    }

    function initParticle () {
      /* 背景星星 */
      const particles = 20000 // 星星数量
      /* buffer做星星 */
      let bufferGeometry = new THREE.BufferGeometry()

      let positions = new Float32Array(particles * 3)
      let colors = new Float32Array(particles * 3)

      let color = new THREE.Color()

      const gap = 900 // 定义星星的最近出现位置

      for (let i = 0; i < positions.length; i += 3) {
        // positions

        /* -2gap < x < 2gap */
        let x = (Math.random() * gap * 2) * (Math.random() < 0.5 ? -1 : 1)
        let y = (Math.random() * gap * 2) * (Math.random() < 0.5 ? -1 : 1)
        let z = (Math.random() * gap * 2) * (Math.random() < 0.5 ? -1 : 1)

        /* 找出x,y,z中绝对值最大的一个数 */
        let biggest = Math.abs(x) > Math.abs(y) ? Math.abs(x) > Math.abs(z) ? 'x' : 'z'
          : Math.abs(y) > Math.abs(z) ? 'y' : 'z'

        let pos = { x, y, z }

        /* 如果最大值比n要小（因为要在一个距离之外才出现星星）则赋值为n（-n） */
        if (Math.abs(pos[biggest]) < gap) pos[biggest] = pos[biggest] < 0 ? -gap : gap

        x = pos['x']
        y = pos['y']
        z = pos['z']

        positions[i] = x
        positions[i + 1] = y
        positions[i + 2] = z

        // colors

        /* 70%星星有颜色 */
        let hasColor = Math.random() > 0.3
        let vx, vy, vz

        if (hasColor) {
          vx = (Math.random() + 1) / 2
          vy = (Math.random() + 1) / 2
          vz = (Math.random() + 1) / 2
        } else {
          vx = 1
          vy = 1
          vz = 1
        }

        color.setRGB(vx, vy, vz)

        colors[i] = color.r
        colors[i + 1] = color.g
        colors[i + 2] = color.b
      }

      bufferGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      bufferGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
      bufferGeometry.computeBoundingSphere()

      /* 星星的material */
      let material = new THREE.PointsMaterial({ size: 6, vertexColors: THREE.VertexColors })
      const particleSystem = new THREE.Points(bufferGeometry, material)

      return particleSystem
    }
    function resizeRendererToDisplaySize (renderer) {
      const canvas = renderer.domElement
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const needResize = canvas.width !== width || canvas.height !== height
      if (needResize) {
        renderer.setSize(width, height, false)
      }
      return needResize
    }

    function render (time) {
      time *= 0.0005

      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
      }
      // SunSystem.rotation.y = -time
      for (var i = 0; i < planets.length; i++) {
        if (planets[i].stop) {
          continue
        }
        planets[i].rotation.y -= planets[i].speed
        const planet = planets[i].children[0]
        planet.rotation.y -= 0.01
      }
      // console.log(SunSystem)
      // orbitcontrols.update()

      renderer.render(scene, camera)
      labelRenderer.render(scene, camera)

      _that.timeIndex = requestAnimationFrame(render)
    }

    _that.timeIndex = requestAnimationFrame(render)
    // 点击部分
    // 获取与射线相交的对象数组
    var selectObject = null
    function getIntersects (event) {
      event.preventDefault()
      // 声明 raycaster 和 mouse 变量
      var raycaster = new THREE.Raycaster()
      var mouse = new THREE.Vector2()
      // 通过鼠标点击位置,计算出 raycaster 所需点的位置,以屏幕为中心点,范围 -1 到 1
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      // 通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
      raycaster.setFromCamera(mouse, camera)
      // 获取与射线相交的对象数组，其中的元素按照距离排序，越近的越靠前
      scene.children[1].children.map((item, index) => {
        item.stop = false
        item.navIndex = index
      })
      var intersects = raycaster.intersectObjects(scene.children, true)
      // var intersects2 = raycaster.intersectObjects(clickObjects)
      console.log(intersects)
      console.log(scene.children)
      // 返回选中的对象
      return intersects
    }
    // 鼠标点击触发的方法
    function onMouseDblclick (event) {
      // 获取 raycaster 和所有模型相交的数组，其中的元素按照距离排序，越近的越靠前
      let intersects = getIntersects(event)
      console.log(event)
      console.log(intersects)
      // 获取选中最近的 Mesh 对象
      if (intersects.length !== 0 && intersects[0].object instanceof THREE.Mesh) {
        selectObject = intersects[0].object
        console.log(intersects + '-------------点到了-----------')
        if (selectObject.parent.navIndex === 3) {
          _that.$router.push('/projectList')
        }
      } else {
        // alert('未选中 Mesh!')
      }
    }
    function enter (event) {
      let intersects = getIntersects(event)
      if (intersects.length !== 0 && intersects[0].object instanceof THREE.Mesh) {
        selectObject = intersects[0].object
        selectObject.parent.stop = false
        if (selectObject.id) {
          console.log(1)
          selectObject.parent.stop = true
        } else {
          selectObject.parent.stop = false
        }
      } else {
        // alert('未选中 Mesh!')
      }
    }
    this.handleClick = onMouseDblclick
    this.handleEnter = enter
    window.addEventListener('click', this.handleClick, true)
    window.addEventListener('mousemove', this.handleEnter, true)
  },
  destroyed () {
    cancelAnimationFrame(this.timeIndex)
    var lab = document.querySelectorAll('.label')
    console.log(lab)
    for (let i = 0; i < lab.length; i++) {
      lab[i].parentNode.remove()
    }
    window.removeEventListener('click', this.handleClick, true)
    window.removeEventListener('mousemove', this.handleEnter, true)
  }

}
</script>
<style lang="scss" scoped>
#box {
  // background: #000 url("./img/bg.jpg") no-repeat center center;
  background: #000 url("./images/bg.jpg") no-repeat center center;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#main {
  position: relative;
  /* makes this the origin of its children */
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.label {
  color: #fff;
  font-family: sans-serif;
  font-size: xx-small;
  padding: 2px;
  cursor: pointer;
}

.label:hover {
  color: red;
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
