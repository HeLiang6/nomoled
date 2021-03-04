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
      infowindows: {}
    }
  },
  // google地图初始化,在mounted中进行引用
  mounted () {
    // 在mounted中执行地图方法，mapData为要展示的数据
    this.initMap()
  },
  methods: {
    initMap () {
      if (this.mapObj == null) {
        this.mapObj = new google.maps.Map(document.getElementById('allmap'), {
          zoom: 3,
          center: { lat: 34.0887, lng: -118.3278 },
          disableDefaultUI: false,
          minZoom: 2, // 设置最小缩放比例
          maxZoom: 22, // 设置最大缩放比例
          zoomControl: true
        })
      }
      this.markers = {}
      this.updateMapMarker(this.data)
    },
    // 添加maker
    updateMapMarker () {

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
