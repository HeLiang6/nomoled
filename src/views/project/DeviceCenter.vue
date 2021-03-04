<template>
  <div class="main-box">
    <!-- <div class="box"></div> -->
    <div>
      <Task />
    </div>
    <div class="baidu_map">
      <div class="tree">
        <ProjectSearch @sendMessage="message" />
        <Tree
          ref="tree"
          @sendMessage="message"
        ></Tree>
      </div>
      <baidu-map
        v-if="lang=='cn'"
        :center="center"
        :zoom="zoom"
        @ready="handler"
        class="bm-view"
        @click="getClickInfo"
        v-loading="Maploading"
        :element-loading-text="$t('message.loading_message')"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 1)"
      >
        <div
          v-for="(item,index) in points"
          :key='index'
        >
          <template>
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
              @mouseover="over(item)"
            >

              <!-- :animation="item.id===$store.state.project.icon_id?'BMAP_ANIMATION_BOUNCE':''" -->
              <!-- <bm-label
              content="1"
              :labelStyle="{color: '#fff', fontSize : '12px',background:'rgba(0, 0, 0, 0)',borderColor:'rgba(0, 0, 0, 0)'}"
              :offset="{width: 4,height:2 }"
            />
 -->
            </BmMarker>
            <bm-info-window
              v-if="text"
              :position="text.position"
              :show="showFlag"
              :width='200'
              @close="infoWindowClose"
              @open="infoWindowOpen(item.site)"
            >
              <p style="text-align:center">{{$t('lightList.name')}}:{{text.name}}</p>
              <p style="text-align:center">
                {{$t('lightList.longitude')}}
                <span
                  v-if="text.site"
                  style="margin-right:20px"
                >
                  {{text.site.lng}}
                </span>
              </p>
              <p style="text-align:center">
                {{$t('lightList.latitude')}}
                <span v-if="text.site">
                  {{text.site.lat}}
                </span>
              </p>
            </bm-info-window>

          </template>

        </div>
      </baidu-map>
      <Google v-if="lang=='en'"></Google>

    </div>
  </div>
</template>
<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import { BmMarker, BmLabel, BmInfoWindow } from 'vue-baidu-map'
import Task from '@/components/tag'
import Google from './Google'
import { connect } from '@/utils/command/monitormanage'

// import { zoneone, zoneId, zones, zonelight, zoneload } from '@/api/area'
// import { ProjectList } from '@/api/project'
// import { dtuList, addDTU, setDTU, dtuOne, dtuload, removeDTU } from '@/api/dtu'
import Tree from './components/Nav_tree'
import ProjectSearch from './components/projectSearch'
import { getProjectTreeBypId } from '@/api/project'
export default {
  data () {
    return {
      value: '',
      val_id: '',
      lang: '',
      center: this.$store.state.project.map_center,
      zoom: 3,
      options: [],
      showFlag: false,
      infoWindow: {
        info: {}
      },
      Maploading: true,
      pjtree: null,
      text: {
        position: null
      }// loading: true
    }
  },
  components: {
    BaiduMap,
    BmMarker,
    BmLabel,
    Tree,
    ProjectSearch,
    Task,
    BmInfoWindow,
    Google
  },
  computed: {
    num () {
      return this.$store.state.project.projectList
    },
    isFollow () {
      return this.$store.state.project.addLightData.projectId　　// 需要监听的数据
    },
    points () {
      return this.$store.state.project.points
    }
    // center () {
    //   return this.$store.state.project.map_center
    // }
  },
  // watch: {
  //   center (newVal, endVal) {
  //     if (newVal) {
  //       return newVal
  //     }
  //   }
  // },
  mounted () {
    this.lang = sessionStorage.getItem('language')
    console.log(this.lang)
    // this.num = myfun()
    // console.log(this.num)
    // this.$nextTick(function () {
    //   // 实例化地图API
    //   this.handler()
    // })
    // 地图loading
    this.$nextTick(function () {
      this.Maploading = false
    })
  },
  watch: {
    center: function (newVal, oldVal) {
      // this.center = this.$store.state.project.map_center
      // console.log(newVal)
      // this.handler()
    },
    points: function (newVal) {
      newVal.map((item, index) => {
        if (this.pjtree && item.type === 'rtu' && this.pjtree.rtuList !== null && this.pjtree.rtuList[index] && this.pjtree.rtuList[index].net) {
          item.net = this.pjtree.rtuList[index].net
        }
      })
    },
    isFollow: function (newVal) {
      let data = {
        projectId: newVal,
        r: Math.ceil(Math.random() * 10)
      }
      getProjectTreeBypId(data).then(res => {
        if (res.httpCode === 200) {
          let pjtree = {
            dtuList: [],
            rtuList: [],
            zoneList: [],
            dtuonline: 0,
            dtuoffline: 0,
            rtuonline: 0,
            rtuoffline: 0,
            lighton: 0,
            lightoff: 0,
            _id: newVal
          }
          let data = res.result
          let dtuList = data.dtuList
          console.log('------------------data------------------')
          console.log(dtuList)
          console.log('----------------------------------------')
          for (let index = 0; index < dtuList.length; index++) {
            let dtu = dtuList[index]
            let rtuList = dtu.rtuList ? dtu.rtuList : []
            pjtree.dtuList.push({ type: 'dtu', net: 1, rtuoffline: 0, rtuonline: 0, lighton: 0, lightoff: 0, tel: dtu.tel })
            for (let rtu_index = 0; rtu_index < rtuList.length; rtu_index++) {
              let rtu = rtuList[rtu_index]
              rtu.dtuIndex = index
              rtu.net = 1
              pjtree.rtuList.push(rtu)
            }
            if (dtu.zoneList) {
              for (let z_index = 0; z_index < dtu.zoneList.length; z_index++) {
                dtu.zoneList[z_index].dtuIndex = index
                if (dtu.zoneList[z_index].rtuList) {
                  for (let zrtu_index = 0; zrtu_index < dtu.zoneList[z_index].rtuList.length; zrtu_index++) {
                    // let zrtu = dtu.zoneList[z_index].rtuList[zrtu_index]
                    dtu.zoneList[z_index].rtuList[zrtu_index].dtuIndex = index
                    dtu.zoneList[z_index].rtuList[zrtu_index].net = 0
                    dtu.zoneList[z_index].rtuList[zrtu_index].zoneno = dtu.zoneList[z_index].no
                    // pjtree.rtuList.push(rtu)
                  }
                }

                pjtree.zoneList.push(dtu.zoneList[z_index])
              }
            }
          }

          console.log('________连接____________')
          console.log(pjtree)
          console.log('_______________________')
          connect(pjtree)
          this.pjtree = pjtree
          console.log(pjtree)
          this.$store.commit('PJTREE', pjtree)
        } else {
          // 弹出框提示
        }
      }).catch(err => {
        console.log(err)
      })
    }

  },
  methods: {
    // 获取坐标
    getClickInfo (val) {
      this.$store.commit('SET_POINT', val.point)
    },
    // 地图创建
    handler ({ BMap, map }) {
      console.log(this.center)
      this.zoom = 18
      // map.setMapStyleV2({
      //   styleId: '180596ae8c9763c8aa63d4baae7985b6'
      // })
      map.enableScrollWheelZoom() // 可缩放
      // this.loading = false
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
    message (val) {
      this.val_id = val
    },
    // handleClick (marker) {
    //   this.showFlag = true
    //   this.infoWindow.info = marker
    //   console.log(1)
    // },
    // 关闭弹窗
    infoWindowClose (marker) {
      this.showFlag = false
    },
    // 打开弹窗
    infoWindowOpen (marker) {
      this.showFlag = true
    },
    over (item) {
      this.text = item
      this.text.position = item.site
      this.showFlag = true
    }
  }
}
</script>

<style lang="scss" scoped>
.bm-view {
  width: 100%;
  height: 100vh;
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
}
.tree {
  position: absolute;
  top: 0;
  height: 70%;
  background: #0f1843;
  padding-top: 20px;
  z-index: 1;
}

// .search-tag {
//   display: flex;
//   justify-content: space-between;
// }
.baidu_map {
  height: 100%;
  width: 100%;
  position: relative;
}
.main-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.box {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: red;
  animation: all 2s linear infinite;
}
</style>
<style>
.el-input__inner {
  background-color: transparent;
}
</style>
<style lang="scss">
.baidu_map {
  @media screen and (max-height: 600px) {
    .tree {
      height: 300px;
      .nav_tree {
        height: 250px;
        overflow-y: auto;
        .boxTree {
          height: 80px;
          box-sizing: border-box;
        }
        .nav-bottom {
          width: 100%;
        }
      }
      .el-dialog {
        .is-top {
          background: #fff;
        }
        .el-dialog__body {
          height: 200px;
          overflow-y: auto;
        }
      }
      .dialog_content .dialog-boxs .el-dialog__wrapper {
        top: 70%;
      }
      .area_dialog .el-dialog__wrapper {
        top: 70%;
      }
      #dialog_light .el-dialog__wrapper {
        top: 70%;
      }
      .readDom {
        .el-dialog {
          .el-dialog__body {
            height: 150px;
          }
        }
      }
    }
  }
  @media screen and (max-height: 768px) and (min-height: 600px) {
    .tree {
      height: 400px;
      .nav_tree {
        height: 350px;
        overflow-y: auto;
        .boxTree {
          height: 200px;
          box-sizing: border-box;
        }
        .nav-bottom {
          width: 100%;
        }
      }
      .el-dialog {
        .is-top {
          background: #fff;
        }
        .el-dialog__body {
          height: 200px;
          overflow-y: auto;
        }
      }
      .dialog_content .dialog-boxs .el-dialog__wrapper {
        top: 70%;
      }
      .area_dialog .el-dialog__wrapper {
        top: 70%;
      }
      #dialog_light .el-dialog__wrapper {
        top: 70%;
      }
      .readDom {
        .el-dialog {
          .el-dialog__body {
            height: 150px;
          }
        }
      }
    }
  }
}
</style>
