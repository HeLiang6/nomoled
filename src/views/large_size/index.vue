<template>
  <div id="box">
    <Content
      ref="content"
      @ChangeClick='day'
      @mouthClick='mouth'
      @chargClick='charg'
      class="main_left"
    />
    <!-- <div class="baidu_map"> -->
    <baidu-map
      :center="$store.state.large.center"
      :zoom="9"
      @ready="handler"
      class="bm-view"
      v-loading='loading'
    >
      <template v-for="(item,index) in $store.state.large.list">
        <!-- dragging 代表图标是否可以拖动 -->
        <BmMarker
          :key="index"
          :position="item.site"
          :dragging="false"
          :icon="{url: item.url, size: {width: 25, height: 25}}"
          class="point"
          :animation="item.id==val_id?'BMAP_ANIMATION_BOUNCE':''"
          @click="handleClick(item,index)"
        >
          <bm-label
            v-if="val===index"
            :content="item.name"
            :labelStyle="{color: 'red',borderRadius:'4px', fontSize : '16px'}"
            :offset="{width: -35, height: 20}"
          />
          <!-- <BmInfoWindow
              :position="item.site"
              :show="showFlag"
              @close="infoWindowClose(item)"
              @open="infoWindowOpen(item)"
            >
              {{item.name}}
            </BmInfoWindow> -->
        </BmMarker>
      </template>

      <Top class="header" />
      <Right
        ref="right"
        class="right"
      />
      <Footer />

    </baidu-map>

    <!-- <div style="position:relative">
      <div
        ref="map"
        class="map"
      >

      </div>
    </div> -->
    <!-- </div> -->
    <!-- <div class="bg">

    </div> -->

  </div>
</template>

<script>
import Top from './components/Top'
import Content from './components/content'
import Right from './components/right'
import Footer from './components/Footer'
import { ProjectDetail, ProjectList } from '@/api/project'
// import BMap from 'BMap'
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import { BmMarker, BmLabel, BmInfoWindow } from 'vue-baidu-map'

export default {
  data () {
    return {
      center: {
        // lng: 114.0643,
        // lat: 22.551878

      },
      val_id: null,
      val: false,
      zoom: 15,
      showFlag: false,
      loading: true,
      time: null
    }
  },
  components: {
    Top,
    Content,
    Footer,
    Right,
    BaiduMap,
    BmMarker,
    BmLabel,
    BmInfoWindow
  },

  // computed: {
  //   val_id: function () {
  //     let list = this.$store.state.large.list

  //     let n = -1
  //     n++
  //     console.log(n)
  //     for (let i = 0; i < list.length; i++) {
  //       console.log(list[i].id)
  //     }

  //     return 1
  //   }

  // },
  watch: {
    val_id: function (newVal, oldVal) {
      console.log(newVal)
      return newVal
    }
    // '$store.state.large.list': function (newVal, oldVal) {
    //   if (newVal) {
    //     // this.iconFor()
    //   }
    // }
  },

  mounted () {
  },
  methods: {
    handler ({ BMap, map }) {
      console.log(this.center)
      // this.center = {
      //   lng: 114.0643,
      //   lat: 22.551878
      // }
      this.zoom = 18
      // console.log(this.$store.state.large.center)
      let a = this.$store.state.large.center
      console.log(JSON.stringify(a))
      console.log(this.$store.state.large.center)
      // console.log(JSON.parse(JSON.stringify(this.$data)))
      // this.center = this.$store.state.large.center
      // map.setCenter(new BMap.Point(this.center.lng, this.center.lat))
      // map.setCenter(new BMap.Point(this.$store.state.large.center.lng, this.$store.state.large.center.lat))
      map.setMapType(BMAP_SATELLITE_MAP)

      map.enableScrollWheelZoom() // 可缩放
      this.loading = false
    },
    day (val) {
      console.log(val)
      this.$refs.right.generate(val)
    },
    mouth (val) {
      console.log(val)
      this.$refs.right.mouth(val)
    },
    charg (val) {
      console.log(val)
      this.$refs.right.charging(val)
    },
    getProject () {
      let str = String(Math.round((Math.random() * 10) + 1))
      let data = {
        userId: this.$store.state.user.nomouser._id,
        r: str
      }
      let list = []

      ProjectList(data).then(res => {
        res.result.filter(item => {
          let data = {
            value: item._id,
            label: item.name
          }
          list.push(data)
        })
        this.$store.commit('projectID', list)
        ProjectDetail(this.$store.state.large.projectId).then(req => {
          this.$store.commit('large_center', req)
          // this.center = {
          //   lng: req.longitude,
          //   lat: req.latitude
          // }
          console.log(req)
          // this.$parent.handler()
        })
      })
    },
    // 点击图标
    handleClick (item, index) {
      // 显示提示文字
      // this.val = index
      this.val_id = item.id
      // this.iconFor()
      console.log(item.id)
    }
    // iconFor () {
    //   let list = this.$store.state.large.list
    //   let n = -1
    //   console.log(list)
    //   console.log(this.$store.state.large.projectId)
    //   this.time = setInterval(function () {
    //     n++
    //     console.log(list[n])
    //     this.val_id = list[n].id
    //     console.log(this.val_id)
    //     // this.val_id = '5efad4b21f6b201a0d62c7be'
    //     // console.log(list[n].id)

    //     // console.log(list.length)
    //     // if (n >= list.length) {
    //     //   n = -1
    //     // }
    //     // this.val_id = list[n].id
    //     // console.log(this.val_id)
    //     // for (let i = 0; i < list.length; i++) {
    //     //   console.log(list[i].id)
    //     // }
    //     // this.handleClick(list[n])
    //   }, 3000)
    // }
    // // 关闭弹窗
    // infoWindowClose (marker) {
    //   this.showFlag = false
    //   console.log(2)
    // },
    // // 打开弹窗
    // infoWindowOpen (marker) {
    //   this.showFlag = true
    //   console.log(3)
    // }

  }
}
</script>

<style lang="scss" scoped>
.bm-view {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .BMap_Marker {
    width: 50px;
    height: 50px;
    background: red;
    z-index: 10;
    border-radius: 50%;
    left: 8px;
    top: 8px;
    animation: move 3s linear;
  }
}
#box {
  // background: url("../../../static/images/loginBg.jpg") no-repeat;
  // width: 100%;
  // min-height: 1200px;
  height: 100%;
  // overflow-y: auto;
  position: relative;
  // ::-webkit-scrollbar {
  //   display: none;
  // }
}
.main-box {
  position: fixed;
  left: 0;
}
.map {
  width: 100%;
  // height: 100vh;
  height: 100%;
  color: rgb(233, 71, 71);
}

.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.main_left {
  position: absolute;
  padding-left: 30px;
  left: 0;
  top: 0px;
  z-index: 100;
  // background: rgba(12, 12, 61, 0.6);

  // z-index: -1;
  // background: #2f3862;
}
.right {
  position: absolute;
  right: 0;
  padding-right: 30px;
  padding-top: 90px;
  top: 0px;
  // background: rgba(12, 12, 61, 0.6);
}
.bg {
  height: 200px;
  width: 100%;
  background: rgba($color: #244a6f, $alpha: 1);
}
</style>

<style lang="scss">
.BMap_cpyCtrl {
  display: none;
}
.anchorBL {
  display: none;
}
</style>
