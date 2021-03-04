<template>
  <div class="main-box">
    <div>
      <Task />
    </div>
    <div style="position:relative">
      <div
        ref="map"
        class="map"
      >
      </div>
      <div class="tree">
        <ProjectSearch />
        <Tree></Tree>
      </div>
    </div>
  </div>
</template>

<script>
import Task from '@/components/tag'
import { RadarOverlay } from './Radar'

import BMap from 'BMap'
// import { ComplexCustomOverlay } from '../../../static/js/map'
// import { rtuone } from '@/api/rtu'
// import { dtuList, addDTU, setDTU, dtuOne, dtuload, removeDTU } from '@/api/dtu'
import Tree from './components/Nav_tree'
import ProjectSearch from './components/projectSearch'
export default {
  data () {
    return {
      show: false,
      value: '',
      center: { lng: 0, lat: 0 },
      zoom: 3,
      options: [],
      clientId: '',
      // points: [],
      map: []
    }
  },
  components: {
    // BaiduMap,
    // BmMarker,
    // BmCircle,
    Tree,
    ProjectSearch,
    Task
  },
  computed: {
    // '$store.state.GPSmap.points' () {
    //   return this.$store.state.GPSmap.points
    // },
    // '$store.state.GPSmap.center' () {
    //   return this.$store.state.GPSmap.center
    // }
  },
  mounted () {
    // this.projectTree()
    // this.initMap()
    // if (this.$store.state.GPSmap.points || this.$store.state.GPSmap.center) {
    //   console.log(this.$store.state.GPSmap.center)
    //   this.initMap()
    // }
  },
  watch: {
    // '$store.state.GPSmap.points' (newval, olval) {
    //   console.log(this.$store.state.GPSmap.center.longitude)
    //   if (this.$store.state.GPSmap.center.longitude != null) {
    //     this.initMap()
    //   }

    //   return newval
    //   // console.log(newval)
    // },
    // '$store.state.GPSmap.center' (newval, olval) {
    //   // console.log(newval)
    //   // console.log(olval)
    //   // console.log(1)
    //   // if (newval) {
    //   //   console.log(newval)
    //   //   // this.initMap()
    //   return newval

    //   // console.log(newval)
    //   // }
    // }
    // '$store.state.GPSmap.projectList' (newval, olval) {
    //   if (newval) {
    //     // this.initMap()
    //     this.initMap()
    //     return newval

    //     // console.log(newval)
    //   }
    // }
  },
  methods: {
    initMap () {
      let _that = this
      // eslint-disable-next-line no-undef
      let dom = document.querySelector('.map')
      // const map = new BMap.Map(dom)
      const map = new BMap.Map(this.$refs.map)
      // eslint-disable-next-line no-undef
      console.log(this.$store.state.GPSmap.center)
      console.log(this.$store.state.GPSmap.projectId)
      map.centerAndZoom(new BMap.Point(this.$store.state.GPSmap.center.longitude, this.$store.state.GPSmap.center.latitude), 15)
      // eslint-disable-next-line no-undef
      // const point = new BMap.Point(116.404, 39.915);
      map.enableScrollWheelZoom(true)
      // map.setMapStyleV2({
      //   styleId: '180596ae8c9763c8aa63d4baae7985b6'
      // })

      // 添加自定义覆盖物
      let data = this.$store.state.GPSmap.points
      let dtu = this.$store.state.GPSmap.points.dtuList
      console.log(this.$store.state.GPSmap.points)
      // let markers = new Array()
      if (data.monitorList !== null) {
        data.monitorList.map(item => {
          let point = new BMap.Point(item.latitude, item.longitude)
          let myIcon = new BMap.Icon('../../../static/images/mapImg/mapMonitor.png', new BMap.Size(20, 25))
          // markers.push(new BMap.Marker(point, { icon: myIcon }))
          let marker = new BMap.Marker(point, { icon: myIcon, title: item.name })// 创建标注
          map.addOverlay(marker)
        })
      }
      if (data.wifiList !== null) {
        data.wifiList.map(item => {
          let point = new BMap.Point(item.latitude, item.longitude)
          let myIcon = new BMap.Icon('../../../static/images/mapImg/mapWiFi.png', new BMap.Size(20, 25))
          // markers.push(new BMap.Marker(point, { icon: myIcon }))
          let marker = new BMap.Marker(point, { icon: myIcon, title: item.name })// 创建标注
          map.addOverlay(marker)
          // marker.addEventListener("click", function () {
          //   marker.setAnimation(BMAP_ANIMATION_BOUNCE);
          // });
        })
      }
      if (data.chargeList !== null) {
        data.chargeList.map(item => {
          let point = new BMap.Point(item.latitude, item.longitude)
          let myIcon = new BMap.Icon('../../../static/images/mapImg/mapCharge.png', new BMap.Size(20, 25))
          // markers.push(new BMap.Marker(point, { icon: myIcon }))
          let marker = new BMap.Marker(point, { icon: myIcon, title: item.name })// 创建标注
          map.addOverlay(marker)
        })
      }
      if (data.billboardList !== null) {
        data.billboardList.map(item => {
          let point = {
            lat: item.latitude,
            lng: item.longitude
          }
          let myIcon = new BMap.Icon('../../../static/images/mapImg/mapBillboardList.png', new BMap.Size(20, 25))
          // markers.push(new BMap.Marker(point, { icon: myIcon }))
          let marker = new BMap.Marker(point, { icon: myIcon, title: item.name })// 创建标注
          map.addOverlay(marker)
        })
      }
      let markers = []
      let rtuDatas = []
      for (let i = 0; i < dtu.length; i++) {
        console.log(dtu[i])
        if (dtu[i].rtuList !== null) {
          dtu[i].rtuList.map((item, index) => {
            let point = {
              lat: item.latitude,
              lng: item.longitude
            }
            let points = new BMap.Point(item.longitude, item.latitude)

            console.log(points)
            // let pointNumber = new BMap.Point(item.latitude, item.longitude)
            let myIcon = new BMap.Icon('../../../static/images/mapImg/mapRtu.png', new BMap.Size(20, 25))
            markers.push(new BMap.Marker(points, { icon: myIcon, title: item.name }))
            rtuDatas.push(item)
            // let marker = new BMap.Marker(points, { icon: myIcon })// 创建标注
            // markers[index] = new BMap.Marker(points, { icon: myIcon })// 创建标注
            // markers[index].addEventListener("click", function () {
            //   console.log(1);
            //   marker.setAnimation(BMAP_ANIMATION_BOUNCE);
            // });
            let radar = new RadarOverlay(point, 15)
            // markers[index].addEventListener('click', function () {
            //   markers[index].setAnimation(BMAP_ANIMATION_BOUNCE)
            //   console.log(markers[index])
            // })
            map.addOverlay(radar)
            // map.addOverlay(marker)
            // map.addOverlay(markers[index])
          })
        }
      }
      let markerVal = null
      for (let i = 0; i < markers.length; i++) {
        map.addOverlay(markers[i])
        markers[i].setAnimation('')
        markers[i].addEventListener('click', function () {
          if (markerVal != null) {
            if (markerVal !== i) {
              markers[markerVal].setAnimation()
              _that.rtuData(rtuDatas[i])

              markers[i].setAnimation(BMAP_ANIMATION_BOUNCE)
            } else {
              _that.rtuData(rtuDatas[i])
            }
          } else {
            markers[i].setAnimation(BMAP_ANIMATION_BOUNCE)
            _that.rtuData(rtuDatas[i])
            console.log(this)
          }
          markerVal = i
          // markers[i].setAnimation(BMAP_ANIMATION_BOUNCE)
          // console.log(markers[i])
        })
      }
    },
    rtuData (val) {
      console.log(val)

      // this.$router.push('/MapMonitoring')

      this.$store.commit('GPS_LIGHT', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.main-box {
  position: fixed;
  left: 0;
  .tree {
    position: absolute;
    top: 0;
    height: 70%;
    background: #0f1843;
    padding-top: 20px;
  }
}
.map {
  width: 100vw;
  height: 100vh;
  color: rgb(233, 71, 71);
}

.img {
  text-align: center;
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss">
.radar-box {
  position: absolute;
}
.radar {
  width: 20px;
  height: 20px;
  background-size: cover;
  position: relative;
}
.radar .ripple {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgb(148, 230, 241);
  background: rgba(16, 160, 243, 0.5);
  animation: ripple 3s linear infinite;
}

.radar :nth-child(1) {
  animation-delay: 0.666s;
}

.radar :nth-child(2) {
  animation-delay: 1.322s;
}

@keyframes ripple {
  to {
    width: 100px;
    height: 100px;
    opacity: 0;
  }
}
</style>
