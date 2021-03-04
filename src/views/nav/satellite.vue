<style lang="scss" scoped>
#box {
  width: 100vw;
  height: 100vh;
}
.container {
  background: url("./images/bg.jpg") no-repeat center center;
}
.textTag {
  display: none;
  height: 40px;
  margin-top: 35px;
  text-align: center;
  font-size: 16px;
  font-weight: 800;
  font-family: "微软雅黑";
}
</style>
<template>
  <div class="container">
    <div id="box">
    </div>
  </div>
</template>
<script>
import * as THREE from 'three'
import { CSS2DRenderer, CSS2DObject } from './CSS2DRenderer.js'
// import { log } from 'three'

export default {
  data () {
    return {
      handleClick: null,
      handleEnter: null,
      timeIndex: null
    }
  },
  mounted () {
    this.$store.commit('setLoading', false)// 清除登录页的loading
    let _that = this
    let renderer, camera, scene// 渲染器，相加，场景
    let Earth = []
    let satellites = []// 地球，卫星（数组）
    let timer = 0 // 计数器
    // 执行render多少次改变卫星大小，以便产生闪烁效果，每秒25次render()
    let changeInterval = 25 // 每render()多少次变化一下颜色
    let minSatelliteRadius = 20 // 卫星闪烁最小半径
    let maxSatelliteRadius = 25 // 卫星闪烁最大半径   //半径太大，会影响邻近卫星的选中状态
    // let radiusStep = 1   //卫星半径变化梯度

    // 卫星颜色渐变变化数组
    // let colorArray = [0x4d4d4d, 0x484848, 0x434343, 0x3d3d3d, 0x383838, 0x333333]
    let colorArray = [0x888888, 0x777777, 0x666666, 0x555555, 0x444444, 0x333333]
    // 卫星半径渐变数组，半径太大，会影响邻近卫星的选中状态
    let radiusArray = [{ x: 25, y: 25, z: 25 }, { x: 24, y: 24, z: 24 }, { x: 23, y: 23, z: 23 }, { x: 22, y: 22, z: 22 }, { x: 21, y: 21, z: 21 }, { x: 20, y: 20, z: 20 }]
    // let radiusArray = [{ x: 50, y: 50, z: 50 }, { x: 45, y: 45, z: 45 }, { x: 40, y: 40, z: 40 }, { x: 35, y: 35, z: 35 }, { x: 30, y: 30, z: 30 }, { x: 25, y: 25, z: 25 }]

    let dom = document.getElementById('box')

    let raceLamp = true

    // let enableColor = 0x1ff500 //已经启用的按钮的颜色 亮绿
    // let enableColor = 0xfff9b1 //已经启用的按钮的颜色  亮黄
    // let enableColor = 0xfff100 //已经启用的按钮的颜色  鲜黄
    let enableColor = 0xfdd000 // 已经启用的按钮的颜色  鲜黄
    // let enableColor = 0xf7ab00 //已经启用的按钮的颜色  华丽
    // let enableColor = 0xffea00 //已经启用的按钮的颜色  华丽
    // let enableColor = 0xffeab4 //已经启用的按钮的颜色  童话
    // let enableColor = 0xebe5d1 //已经启用的按钮的颜色  华丽
    // let enableColor = 0xfff463 //已经启用的按钮的颜色  月亮

    let enableCurrentColor = 0x1ff500 // 启用按钮的当前选中颜色
    let unableCurrentColor = 0xff0000 // 非启用按钮的当前选中颜色（红色）
    // let unableCurrentColor = 0x888888  //非启用按钮的当前选中颜色
    // 非导航按钮对象
    let notNavObjArr = ['earth', 'halo of earth', 'revolution_1', 'revolution_2', 'revolution_3', 'revolution_4']
    // 导航按钮对象
    let navObjArr = ['wifi', 'camera', 'charging', 'environmental', 'streetLamp', 'advertising']
    // let enableIndexArr = [4]  //已经启用的按钮的索引
    let enableNavObjArr = ['streetLamp'] // 已经启用的按钮的名称

    var labelRenderer = new CSS2DRenderer()
    labelRenderer.setSize(dom.clientWidth, dom.clientHeight)
    labelRenderer.domElement.style.position = 'absolute'
    labelRenderer.domElement.style.top = '0px'
    document.body.appendChild(labelRenderer.domElement)
    // // console.log(labelRenderer)
    function initThree () {
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(20, dom.clientWidth / dom.clientHeight, 1, 1000)
      camera.position.set(0, 0, 400)// 设置相机位置
      renderer = new THREE.WebGLRenderer({
        dom,
        alpha: true,
        antialias: true
      })
      // var orbitcontrols = new OrbitControls(camera, labelRenderer.domElement)

      renderer.setSize(dom.clientWidth, dom.clientHeight)// 设置窗口尺寸
      dom.appendChild(renderer.domElement)

      let sunTexture = THREE.ImageUtils.loadTexture('../../../static/images/nav_img/earth_bg.jpg', {}, function () {
        renderer.render(scene, camera)
      })

      // let sunTexture = THREE.TextureLoader('../../../static/images/nav_img/earth_bg.jpg') //测试不行

      // 地球
      Earth = new THREE.Mesh(new THREE.SphereGeometry(20, 30, 30), new THREE.MeshBasicMaterial({
        map: sunTexture,
        name: 'earth'
      })) // 材质设定

      // Earth.name.set('myEarth')
      Earth.name = 'earth of Mesh'

      let satellite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(generateSprite('196,233,255')),
        blending: THREE.AdditiveBlending,
        name: 'halo_of_earth'
      }))
      satellite.name = 'halo of Mesh'
      // 注意，如果这个卫星的半径太大（超过70），会干扰上面两个导航卫星的选中和点击效果。
      satellite.scale.x = satellite.scale.y = satellite.scale.z = 60 // 卫星半径
      // var planetDiv = document.createElement('div')
      // planetDiv.className = 'label'
      // planetDiv.textContent = '地球'
      // planetDiv.style.marginTop = '-0.3em'
      // planetDiv.style.color = 'red'
      // var planetLabel = new CSS2DObject(planetDiv)
      // planetLabel.position.set(0, 0, 0)
      scene.add(Earth)

      // satellite.add(planetLabel)
      // Earth.add(planetLabel)
      // console.log(Earth)
      scene.add(satellite)// 添加发光,让地球有发光的样式  可将卫星半径改到70以上，看到明显的地球发光效果

      /** 添加背景星星 未生效 */
      // let particleSystem = initParticle()
      // scene.add(particleSystem)

      // 添加卫星
      // 参数：卫星半径，轨道半径，轨道宽度，{x轴倾角，y轴倾角，z轴倾角}，卫星公转速度
      // 注意：z轴倾角可决定卫星在轨道上的位置（0---2PI）x轴倾角可决定椭圆短轴长度

      /** 下面是静止卫星  注意导航图标放在satellites前面 */
      satellites.push(initSatellite(30, 50, 0.001, { x: -Math.PI * 0.41, y: 0, z: Math.PI * 1.00 }, 0.000, scene, 'wifi', 'wifi', '#777777', 'notopen'))
      satellites.push(initSatellite(30, 50, 0.001, { x: -Math.PI * 0.40, y: -Math.PI * 0.26, z: Math.PI * 1.12 }, 0.000, scene, 'camera', 'camera', '#777777', 'notopen'))
      satellites.push(initSatellite(30, 50, 0.001, { x: -Math.PI * 0.40, y: Math.PI * 0.26, z: -Math.PI * 0.09 }, 0.00, scene, 'charging', 'char', '#777777', 'notopen'))

      satellites.push(initSatellite(30, 50, 0.001, { x: -Math.PI * 0.41, y: 0, z: -Math.PI * 0.01 }, 0.000, scene, 'environmental', 'environ', '#777777', 'notopen'))
      satellites.push(initSatellite(30, 50, 0.001, { x: -Math.PI * 0.40, y: -Math.PI * 0.26, z: Math.PI * 0.09 }, 0.000, scene, 'streetLamp', 'light', '#ffffff', 'click'))
      satellites.push(initSatellite(30, 50, 0.001, { x: -Math.PI * 0.40, y: Math.PI * 0.26, z: Math.PI * 0.91 }, 0.00, scene, 'advertising', 'ad', '#777777', 'notopen'))

      /** 下面是公转卫星 仅装饰作用 注意放在satellites前面 */
      satellites.push(initSatellite_1({ x: 4, y: 2, z: 10 }, 50, 0.05, { x: -Math.PI * 0.41, y: 0, z: 0 }, 0.005, scene, 'revolution_1'))
      satellites.push(initSatellite_1({ x: 4, y: 2, z: 10 }, 50, 0.05, { x: -Math.PI * 0.40, y: -Math.PI * 0.26, z: Math.PI * 0.5 }, 0.005, scene, 'revolution_2'))
      satellites.push(initSatellite_1({ x: 4, y: 2, z: 10 }, 50, 0.05, { x: -Math.PI * 0.40, y: Math.PI * 0.26, z: -Math.PI * 0.5 }, 0.005, scene, 'revolution_3'))
      satellites.push(initSatellite_1({ x: 10, y: 3, z: 10 }, 50, 0.05, { x: Math.PI * 0.25, y: Math.PI * 0.45, z: Math.PI }, 0.005, scene, 'revolution_4'))

      render()
    }

    /**
     * 返回一个卫星和轨道的组合体
     * @param satelliteSize 卫星的大小
     * @param satelliteRadius 卫星的旋转半径
     * @param trackWidth 轨道宽度，测试发现可以为负值，却不可以为0？？？
     * @param rotation 组合体的x,y,z三个方向的旋转角度
     * @param speed 卫星运动速度
     * @param scene 场景
     * @param name 卫星中各子组件的统一名称的前缀
     * @param title 图标、文本标签的title属性
     * @param textTagColor 文本标签的字体颜色
     * @param extraText 额外的附加文本
     * @returns {{satellite: THREE.Mesh, speed: *}} 卫星组合对象;速度
     */
    let initSatellite = function (satelliteSize, satelliteRadius, trackWidth, rotation, speed, scene, name, title, textTagColor, extraText = '') {
      let track = new THREE.Mesh(new THREE.RingGeometry(satelliteRadius, satelliteRadius + trackWidth, 50, 1), new THREE.MeshBasicMaterial())
      track.name = name + '_track'

      // let a = new THREE.SphereGeometry(1, 1, 1)
      // a.title = _that.$t(`nav.${title}`)  //未起作用
      // let b = new THREE.MeshLambertMaterial()
      // b.title = _that.$t(`nav.${title}`)  //未起作用
      // let centerMesh = new THREE.Mesh(a,b) // 材质设定

      let centerMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 1, 1), new THREE.MeshLambertMaterial()) // 材质设定
      centerMesh.name = name + ' of Mesh'
      let satellite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(generateSprite('196,233,255')),
        // map:makeTextSprite(name),
        blending: THREE.AdditiveBlending,
        name: name
        // title:_that.$t(`nav.${title}`) //未起作用
      }))
      satellite.name = name + '_satellite_Sprite'
      satellite.scale.x = satellite.scale.y = satellite.scale.z = satelliteSize
      satellite.position.set(satelliteRadius, 0, 0)

      // satellite.title =  _that.$t(`nav.${title}`) //未起作用

      let pivotPoint = new THREE.Object3D()
      pivotPoint.name = name + '_pivotPoint'
      pivotPoint.add(satellite)
      pivotPoint.add(track)
      centerMesh.add(pivotPoint)
      centerMesh.rotation.set(rotation.x, rotation.y, rotation.z)
      // centerMesh.rotation.title =  _that.$t(`nav.${title}`) //未起作用
      // pivotPoint.title =  _that.$t(`nav.${title}`) //未起作用

      // centerMesh.title =  _that.$t(`nav.${title}`) //未起作用

      // console.log(centerMesh.title);

      // 添加label
      let planetLabel = getImgTag(name, title)
      let planetTextLabel = getTextTag(name, title, textTagColor, extraText)

      scene.add(centerMesh)
      satellite.add(planetLabel)
      satellite.add(planetTextLabel)

      return { satellite: centerMesh, speed: speed }
    }

    /**
     * @param name 卫星中各子组件的统一名称的前缀,用来确定图标文件名称
     * @param title 图标、文本标签的title属性
     */
    function getImgTag (name, title) {
      var planetDiv = document.createElement('div')
      var imgBox = document.createElement('div')
      // var titles = document.createElement('p')
      var imgs = document.createElement('img')
      imgs.src = `/static/images/images/${name}_1.png`
      // imgs.src = "/static/images/images/"+ name +"_1.png"
      // imgs.title = _that.$t(`nav.${title}`)
      // imgs.alt = _that.$t(`nav.${title}`)
      planetDiv.appendChild(imgBox)
      imgBox.appendChild(imgs)
      planetDiv.className = 'label'
      var planetLabel = new CSS2DObject(planetDiv)
      // console.log(planetLabel)
      planetLabel.position.set(0, 0, 0)
      return planetLabel
    }

    /**
     * @param name 卫星中各子组件的统一名称的前缀,此处作为文本标签的文本内容
     * @param title 图标、文本标签的title属性
     * @param textTagColor 文本标签的字体颜色
     * @param extraText 额外的附加文本
     */
    function getTextTag (name, title, textTagColor = '', extraText = '') {
      // var planetDiv = document.createElement('div')
      var textBox = document.createElement('div')
      textBox.id = name + '_TextTag'
      // textBox.title = _that.$t(`nav.${title}`)
      textBox.innerText = _that.$t(`nav.textTag.${name}`)
      if (!textTagColor) {
        textTagColor = '#ffffff'
      }
      // textBox.className = 'textTag' //未生效
      // 反复测试display:none;总是被去掉了，无法生效！奇怪？？
      // textBox.style="display:none;height:40px;margin-top:35px;text-align:center;font-size:16px;font-weight:800;font-family:'微软雅黑';color:"+color
      textBox.style = "visibility:hidden;height:40px;margin-top:35px;text-align:center;font-size:16px;font-weight:800;font-family:'微软雅黑';color:" + textTagColor
      // textBox.style="visibility:visible;height:40px;margin-top:35px;text-align:center;font-size:16px;font-weight:800;font-family:'微软雅黑';color:"+color
      // background:#ffffff;opacity:0.1;

      if (extraText) {
        let div = document.createElement('div')
        textBox.appendChild(div)
        div.outerHTML = "<div style='color:" + textTagColor + ";display:block;font-size:14px;'>" + _that.$t(`nav.textTag.${extraText}`) + '</div>'
      }

      var planetLabel = new CSS2DObject(textBox)
      // console.log(planetLabel)
      planetLabel.position.set(0, 0, 0)
      return planetLabel
    }

    /** 与上面的区别在于：satelliteSize是json对象{x:2,y:3,z:4} 包含x、y、z 三个方向的长度 */
    let initSatellite_1 = function (satelliteSize, satelliteRadius, trackWidth, rotation, speed, scene, name) {
      let track = new THREE.Mesh(new THREE.RingGeometry(satelliteRadius, satelliteRadius + trackWidth, 50, 1), new THREE.MeshBasicMaterial())
      let centerMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 1, 1), new THREE.MeshLambertMaterial()) // 材质设定
      centerMesh.name = name + ' of revolution'
      let satellite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(generateSprite('196,233,255')),
        blending: THREE.AdditiveBlending,
        name: name
      }))
      satellite.name = name + '_satellite_Sprite'
      // satellite.scale.x = satellite.scale.y = satellite.scale.z = satelliteSize;
      satellite.scale.x = satelliteSize.x
      satellite.scale.y = satelliteSize.y
      satellite.scale.z = satelliteSize.z

      satellite.position.set(satelliteRadius, 0, 0)

      let pivotPoint = new THREE.Object3D()
      pivotPoint.name = name + '_pivotPoint'
      pivotPoint.add(satellite)
      pivotPoint.add(track)
      centerMesh.add(pivotPoint)
      centerMesh.rotation.set(rotation.x, rotation.y, rotation.z)
      scene.add(centerMesh)
      return { satellite: centerMesh, speed: speed }
    }

    /**
     * 实现发光星星
     * @param color 颜色的r,g和b值,比如：“123,123,123”;
     * @returns {Element} 返回canvas对象
     */
    let generateSprite = function (color) {
      let canvas = document.createElement('canvas')
      canvas.width = 16
      canvas.height = 16
      let context = canvas.getContext('2d')
      let gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2)
      gradient.addColorStop(0, 'rgba(' + color + ',1)')
      gradient.addColorStop(0.2, 'rgba(' + color + ',1)')
      gradient.addColorStop(0.4, 'rgba(' + color + ',.6)')
      gradient.addColorStop(1, 'rgba(0,0,0,0)')
      context.fillStyle = gradient
      context.fillRect(0, 0, canvas.width, canvas.height)
      return canvas
    }

    initThree()

    /** 处理背景星星 */
    function initParticle () {
      /* 背景星星 */
      // // console.log('111111111111111111111');
      var particles = 20000 // 星星数量
      /* buffer做星星 */
      let bufferGeometry = new THREE.BufferGeometry()

      let positions = new Float32Array(particles * 3)
      let colors = new Float32Array(particles * 3)

      let color = new THREE.Color()

      var gap = 900 // 定义星星的最近出现位置

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
      var particleSystem = new THREE.Points(bufferGeometry, material)

      return particleSystem
    }

    function render () {
      renderer.render(scene, camera)
      Earth.rotation.y -= 0.01
      timer++
      if (timer > changeInterval * colorArray.length) {
        timer = 0
      }

      // 修改卫星在轨道上的位置
      for (let i = 0; i < satellites.length; i++) {
        satellites[i].satellite.rotation.z -= satellites[i].speed
      }

      // 修改前面N个导航卫星的半径和色彩，产生跑马灯效果（后面的卫星仅仅装饰）
      if (timer % changeInterval === 0) {
        // 色彩顺序挪一位，产生跑马灯效果
        colorArray.push(colorArray.shift())
        radiusArray.push(radiusArray.shift())

        raceLamp = true
        // 下面判断是否暂停跑马灯 如果暂停跑马灯，可能回导致多个卫星都能处于选中状态
        // for (let i = 0; i < satellites.length; i++){
        //   if (('stop' in satellites[i].satellite) && satellites[i].satellite.stop){
        //      raceLamp = false  //暂停跑马灯
        //      break;
        //   }
        // }

        // 执行跑马灯
        if (raceLamp) {
          let mName

          for (let i = 0; i < satellites.length; i++) { // 如果导航按钮不是都排在satellites数组的前面，应该这么写
            // for (let i = 0; i < navObjArr.length; i++) { //如果导航按钮都是排在satellites数组的前面，可以这么写
            mName = satellites[i].satellite.children[0].children[0].material.name

            if (('stop' in satellites[i].satellite) && satellites[i].satellite.stop) {
              document.getElementById(mName + '_TextTag').style.visibility = 'visible'
              // 跳过跑马灯效果，不改变样式
              continue
            } else {
              if (enableNavObjArr.indexOf(mName) > -1) {
                // 已经启用的导航按钮的颜色
                satellites[i].satellite.children[0].children[0].material.color.set(enableColor)
              } else if (navObjArr.indexOf(mName) > -1) {
                // document.getElementById(mName+ "_TextTag").innerHtml = mName + "<div style='color:#666666'>该功能暂未开放</div>";
                // 导航按钮中，未启用按钮的颜色
                satellites[i].satellite.children[0].children[0].material.color.set(colorArray[i])
              }// else{//其他非导航按钮不做任何改变}

              // 只对导航图标的卫星改变半径，公转的装饰卫星不改变
              if (navObjArr.indexOf(mName) > -1 || enableNavObjArr.indexOf(mName) > -1) {
                document.getElementById(mName + '_TextTag').style.visibility = 'hidden'
                satellites[i].satellite.children[0].children[0].scale.set(radiusArray[i].x, radiusArray[i].y, radiusArray[i].z)
              }
            }
          }
        }
      }
      labelRenderer.render(scene, camera)

      // // console.log(satellites[0]);

      _that.timeIndex = requestAnimationFrame(render)
    }
    // 点击事件
    // 点击部分
    // 获取与射线相交的对象数组
    var selectObject = null
    function getIntersects (e) {
      var event = window.event || arguments[0]
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
      let navIndex = 0, tName = ''
      // scene.children[1].parent.children.map((item, index) => {
      scene.children.map((item, index) => {
        // alert(item.name)
        // console.log(item,'--------------'+index);
        tName = item.name.replace(' of Mesh', '')
        // tName = item.name

        if (navObjArr.indexOf(tName) > -1) {
          item.stop = false
          item.navIndex = navIndex
          navIndex++
        }

        // if(item.name == 'advertising of Mesh' || item.name =='streetLamp of Mesh' ){
        //     console.log(item,"---------1111");
        //   }
      })
      var intersects = raycaster.intersectObjects(scene.children, true)
      // var intersects2 = raycaster.intersectObjects(clickObjects)
      // 返回选中的对象
      return intersects
    }

    function onMouseDblclick (event) {
      // 获取 raycaster 和所有模型相交的数组，其中的元素按照距离排序，越近的越靠前
      let intersects = getIntersects(event)
      // // console.log(event)
      // // console.log(intersects)
      // 获取选中最近的 Mesh 对象
      if (intersects.length !== 0) {
        selectObject = intersects[0].object
        let tName = selectObject.material.name
        // 设置导航路径
        switch (tName) {
          case 'streetLamp':
            _that.$router.push('/ProjectList')
            break

          default:
            break
        }
      } else {
        // alert('未选中 Mesh!')
      }
    }
    function enter (event) {
      let intersects = getIntersects(event)

      // console.log(intersects  ,'enter-----------' )

      if (intersects.length !== 0) {
        selectObject = intersects[0].object

        if (selectObject.parent && selectObject.parent.parent && 'navIndex' in selectObject.parent.parent) { // selectObject.parent.parent.navIndex有可能为0
          let tNavIndex = selectObject.parent.parent.navIndex
          let tName = selectObject.material.name // 鼠标在轨道上时，有可能为空
          let kName

          for (let i = 0; i < satellites.length; i++) {
            //   kName = satellites[i].satellite.children[0].children[0].material.name

            // console.log(satellites[i].satellite,"------"+i+"-- "+tNavIndex+"---",tName,kName);

            if (tName && tNavIndex === i) {
              // 鼠标在卫星上时，kName 其实是与tName是相同的 ；鼠标在轨道上时，tName为空
              kName = satellites[i].satellite.children[0].children[0].material.name

              // alert(tName + ' kk '  +kName)

              if (tName == kName) {
                satellites[i].satellite.stop = true
                document.getElementById(kName + '_TextTag').style.visibility = 'visible'

                if (enableNavObjArr.indexOf(kName) > -1) {
                  // 已经启用的导航按钮的颜色
                  satellites[i].satellite.children[0].children[0].material.color.set(enableCurrentColor)
                } else if (navObjArr.indexOf(kName) > -1) {
                  // 导航按钮中，未启用按钮的颜色
                  satellites[i].satellite.children[0].children[0].material.color.set(unableCurrentColor)
                }// else{//其他非导航按钮不做任何改变}

                satellites[i].satellite.children[0].children[0].scale.set(maxSatelliteRadius, maxSatelliteRadius, maxSatelliteRadius)
              } else {
                satellites[i].satellite.stop = false
              }
            } else {
              satellites[i].satellite.stop = false
            }
          }
        }
      } else {
        // alert('未选中 Mesh!')
      }
      this.timeIndex = null
    }

    this.handleClick = onMouseDblclick
    this.handleEnter = enter

    window.addEventListener('click', this.handleClick, true)

    window.addEventListener('mousemove', this.handleEnter, true)
  },
  destroyed () {
    cancelAnimationFrame(this.timeIndex)
    var lab = document.querySelectorAll('.label')
    // console.log(lab)
    for (let i = 0; i < lab.length; i++) {
      lab[i].parentNode.remove()
    }
    window.removeEventListener('click', this.handleClick, true)
    window.removeEventListener('mousemove', this.handleEnter, true)
  }

}

</script>
