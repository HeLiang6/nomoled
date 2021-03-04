<template>
  <div class="container">
    <div
      id="allmap"
      ref="allmap"
    ></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: [], // 填写自己的数据
      markers: {},
      typeFlag: false, // 控制marker是否需要添加点击事件
      infowindowsFlag: {},
      infowindows: {},
      mapObj: null
    }
  },
  computed: {
    points () {
      return this.$store.state.project.points
    }

  },
  watch: {
    points: function (newVal, endVal) {
      if (newVal) {
        this.initMap()
      }
    }
  },
  // google地图初始化,在mounted中进行引用
  mounted () {
    // 在mounted中执行地图方法，mapData为要展示的数据
  },
  methods: {
    initMap () {
      console.log(this.$store.state.project.map_center)
      // if (this.mapObj == null) {
      this.mapObj = new google.maps.Map(document.getElementById('allmap'), {
        zoom: 18,
        center: this.$store.state.project.map_center,
        disableDefaultUI: false,
        minZoom: 2, // 设置最小缩放比例
        maxZoom: 22, // 设置最大缩放比例
        zoomControl: true
      })
      // }
      this.markers = {}

      this.updateMapMarker()
    },
    // 添加maker
    updateMapMarker () {
      let _this = this
      // console.log(JSON.stringify(this.$store.state.project.points))
      console.log(this.points)
      let data = this.points
      for (let i = 0; i < data.length; i++) {
        // let labelContent = this.getlabelContent(data[i].name)
        // Creating a new marker
        let marker = new google.maps.Marker({
          position: { lng: Number(data[i].site.lng), lat: Number(data[i].site.lat) },
          map: this.mapObj,
          title: 'Place number ' + i,
          icon: data[i].url
        })
        // marker.setAnimation(BMAP_ANIMATION_BOUNCE)
        google.maps.event.addListener(marker, 'click', (e) => {
          e = window.event || e
          let id = {
            _id: data[i].id
          }
          if (data[i].type === 'rtu') {
            this.$parent.$refs.tree.setData(id)
          }
        })
      }
    }

  }
}
</script>
<style lang="scss" scoped>
#allmap {
  width: 100%;
  height: 100vh;
}
</style>
