<template>
  <div class="main-box">
    <!-- <div class="box"></div> -->
    <div class="baidu_map">
      <baidu-map
        :center="center"
        :zoom="zoom"
        @ready="handler"
        class="bm-view"
        @click="getClickInfo"
      >
        <template v-for="(item,index) in $store.state.project.points">
          <!-- dragging 代表图标是否可以拖动 -->
          <BmMarker
            :key="index"
            :position="item.site"
            :dragging="false"
            :icon="{url: item.url, size: {width: 25, height: 25}}"
            class="point"
            :animation="item.id==val_id?'BMAP_ANIMATION_BOUNCE':''"
            :title="item.name"
            @click="handleClick(item)"
          >

            <!-- <bm-info-window
              :position="item.site"
              :show="showFlag"
              @close="infoWindowClose(item)"
              @open="infoWindowOpen(item)"
            >
              {{item.name}}
            </bm-info-window> -->
            <!-- :animation="item.id===$store.state.project.icon_id?'BMAP_ANIMATION_BOUNCE':''" -->
            <!-- <bm-label
              content="1"
              :labelStyle="{color: '#fff', fontSize : '12px',background:'rgba(0, 0, 0, 0)',borderColor:'rgba(0, 0, 0, 0)'}"
              :offset="{width: 4,height:2 }"
            />
 -->
          </BmMarker>
        </template>
        <Tree
          ref="tree"
          class="tree"
        ></Tree>
      </baidu-map>
    </div>
  </div>
</template>
<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import { BmMarker, BmLabel, BmInfoWindow } from 'vue-baidu-map'

// import { zoneone, zoneId, zones, zonelight, zoneload } from '@/api/area'
// import { ProjectList } from '@/api/project'
// import { dtuList, addDTU, setDTU, dtuOne, dtuload, removeDTU } from '@/api/dtu'
import Tree from './components/left'
// import ProjectSearch from './components/projectSearch'
export default {
  data () {
    return {
      value: '',
      val_id: '',
      center: this.$store.state.project.map_center,
      zoom: 3,
      options: [],
      showFlag: true,
      infoWindow: {
        info: {}
      }
    }
  },
  components: {
    BaiduMap,
    BmMarker,
    BmLabel,
    Tree,
    BmInfoWindow
  },
  computed: {
    num () {
      return this.$store.state.project.projectList
    }
  },
  mounted () {
    // this.num = myfun()
    // console.log(this.num)
  },
  // computed: {
  //   center: function () {

  //   }
  // },
  watch: {
    center: function (newVal, oldVal) {
      // this.center = this.$store.state.project.map_center
      // console.log(newVal)
      // this.handler()
    }
  },
  methods: {
    // 获取坐标
    getClickInfo (val) {
      console.log(val.point)
      this.$store.commit('SET_POINT', val.point)
    },
    // 地图创建
    handler ({ BMap, map }) {
      this.zoom = 18
      map.setMapStyleV2({
        styleId: '180596ae8c9763c8aa63d4baae7985b6'
      })
      map.enableScrollWheelZoom() // 可缩放
    },
    // 图标点击
    handleClick (val) {
      console.log(val)
      let data = {
        _id: val.id
      }
      if (val.type === 'rtu') {
        this.$refs.tree.setData(data)
      }
      this.val_id = val.id
    },
    // handleClick (marker) {
    //   this.showFlag = true
    //   this.infoWindow.info = marker
    //   console.log(1)
    // },
    // 关闭弹窗
    infoWindowClose (marker) {
      this.showFlag = false
      console.log(2)
    },
    // 打开弹窗
    infoWindowOpen (marker) {
      this.showFlag = true
      console.log(3)
    }
    // 创建分组、区域
    // handleNodeClick (val) {
    //   zones(this.addzone).then(res => {
    //     console.log(res)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
.bm-view {
  width: 100%;
  height: 100%;
  position: relative;
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
  .tree {
    position: absolute;
    top: 0;
    height: 70%;
  }
}
.search-tag {
  display: flex;
  justify-content: space-between;
}
.baidu_map {
  height: 100%;
  width: 100%;
}
.main-box {
  width: 100%;
  height: 100%;
}
.box {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: red;
  animation: all 2s linear infinite;
}
// @keyframes all {
//   0% {
//     transform: scale(0.3);
//     -webkit-transform: scale(0.3);
//     opacity: 0;
//   }

//   25% {
//     transform: scale(0.3);
//     -webkit-transform: scale(0.3);
//     opacity: 0.1;
//   }

//   50% {
//     transform: scale(0.5);
//     -webkit-transform: scale(0.5);
//     opacity: 0.3;
//   }
//   75% {
//     transform: scale(0.8);
//     -webkit-transform: scale(0.8);
//     opacity: 0.5;
//   }

//   100% {
//     transform: scale(1);
//     -webkit-transform: scale(1);
//     opacity: 0;
//   }
// }
</style>
<style>
.el-input__inner {
  background-color: transparent;
}
</style>
