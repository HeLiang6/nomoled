<template>
  <div class="nav_tree ">
    <div class="nav-top">
      <span>{{$t('tips.Current_project')}}</span>
      <el-select
        v-model="$store.state.data.projectId"
        :placeholder="$t('tips.please')"
        size="mini"
        @change="rtuList"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="tree-box">
      <h3
        style="padding-left:10px"
        :class="activeVal===-1?active:''"
        class="title"
        @click="projectClick"
      ><i class="iconfont icon-wenjianjia"></i>

        <p>{{label}}</p>

      </h3>
      <el-menu class="el-menu-vertical-demo boxTree">
        <el-submenu
          v-for="(item,index) in dtuData"
          :key="index"
          :index="String(index)"
          :class="activeVal===index?active:''"
        >
          <span
            slot="title"
            @click="handerclick(index,item)"
          >{{item.name}}</span>
          <div>

            <el-checkbox-group
              @change="selectionFun(item.rtuList)"
              v-model="$store.state.data.rtus"
              :max="4"
            >
              <el-submenu
                v-for="(rtu,rtuIndex) in item.rtuList"
                :index="rtu._id+1111"
                :key="rtuIndex"
                class="lightTree"
              >
                <!-- <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >全选</el-checkbox> -->
                <!-- <div style="margin: 15px 0;"></div> -->
                <template slot="title">
                  <el-checkbox
                    :label="rtu._id"
                    name="type"
                    style="width:250px"
                  >{{rtu.name}}</el-checkbox>
                </template>
              </el-submenu>
            </el-checkbox-group>
          </div>

          <!-- <el-menu-item :index="item._id+2222">
            <template slot="title">
              <span @click="deteleClick(item)">
                {{$t('project_list.delete')}}
              </span>
            </template>
          </el-menu-item> -->

        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { ProjectList, getProjectTreeBypId } from '@/api/project'
import { getLightData } from '@/api/data'
import { getEnergyDailyStatistic, getEnergyMonthlyStatistic } from '@/api/large'

export default {
  data () {
    return {
      label: '',
      isSetData: false,
      read: false,
      isShow: 0,
      options: [],
      dtuData: [],
      rtus: [],
      activeVal: -1,
      active: 'active',
      datas: {
      }
    }
  },
  mounted () {
    this.getProject()
  },
  methods: {
    // dtu点击
    handerclick (index, item) {
      this.$parent.$refs.main.activeName = 'first'
      console.log(item)
      this.activeVal = index
      this.$store.commit('DTUDATA', true)
      let data = {
        dtuId: item._id,
        pageSize: 10
      }

      getLightData(data).then(res => {
        console.log(res)
        let list = {
          lis: res,
          dtu: item._id
        }
        this.$store.commit('DtuList', list)
      }).catch(err => {
        console.log(err)
      })
      // 电量
      if (this.$store.state.data.type === 0) {
        let arr = this.$store.state.data.electricTime.split('-')
        let day = new Date(arr[0], arr[1], 0)
        day.getDate()
        data.enddate = this.$store.state.data.electricTime + `-${day.getDate()}`
        data.startdate = this.$store.state.data.electricTime + '-01'

        getEnergyDailyStatistic(data).then(res => {
          console.log(res)
          this.$parent.$refs.main.$refs.first.generate(res)
        }).catch(err => {
          console.log(err)
        })
      } else {
        data.enddate = this.$store.state.data.electricTime + '-12'
        data.startdate = this.$store.state.data.electricTime + '-01'
        getEnergyMonthlyStatistic(data).then(res => {
          console.log(res)
          this.$parent.$refs.main.$refs.first.generate(res)
        }).catch(err => {
          console.log(err)
        })
      }
      // // 故障率
      if (this.$parent.$refs.main.$refs.second) {
        this.$parent.$refs.main.$refs.second.search()
      }
    },
    // // 获取项目信息
    getProject () {
      let str = String(Math.round((Math.random() * 10) + 1))
      let data = {
        userId: this.$store.state.user.nomouser._id,
        r: str
      }

      ProjectList(data).then(res => {
        res.result.filter(item => {
          let data = {
            value: item._id,
            label: item.name
          }
          this.options.push(data)
        })
        this.$store.commit('DATAPROJECT_LIST', this.options)
        console.log(this.options)
        this.rtuList()
        this.projectName()
        this.warn()
        this.projectClick()
      }).catch(err => {
        console.log(err)
      })
    },
    // 项目名
    projectName () {
      let label = this.options.filter(item => {
        if (item.value === this.$store.state.data.projectId) {
          return item
        }
      })
      this.label = label[0].label
      console.log(this.label)
    },
    // 获取项目下所有rtu
    rtuList () {
      let datas = {
        r: String(Math.round((Math.random() * 10) + 1)),
        projectId: this.$store.state.data.projectId
      }
      console.log(datas)
      this.projectName()
      getProjectTreeBypId(datas).then(res => {
        if (res.httpCode === 0) {
          this.dtuData = []
        } else {
          this.dtuData = res.result.dtuList
        }
        this.projectClick()
        // this.$store.commit('wifiMap_Center', res)
      }).catch(err => {
        console.log(err)
      })
    },
    handerClick (val, id) {
    },
    // 点击项目
    projectClick () {
      console.log(this.$parent.$refs.main.activeName)
      this.$parent.$refs.main.activeName = 'first'
      this.$store.commit('DTUDATA', false)
      this.activeVal = -1
      let data = {
        projectId: this.$store.state.data.projectId
      }
      if (this.$store.state.data.type === 0) {
        getEnergyDailyStatistic(data).then(res => {
          console.log(res)
          this.$parent.$refs.main.$refs.first.generate(res)
        }).catch(err => {
          console.log(err)
        })
      } else {
        getEnergyMonthlyStatistic(data).then(res => {
          console.log(res)
          this.$parent.$refs.main.$refs.first.generate(res)
        }).catch(err => {
          console.log(err)
        })
      }
      if (this.$parent.$refs.main.$refs.second) {
        this.$parent.$refs.main.$refs.second.search()
      }
    },
    // 故障统计
    warn () {
      let data = {
        projectId: this.$store.state.data.projectId,
        warn: 1
      }
      getLightData(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    async selectionFun (rtuList, index) {
      this.$store.commit('dataRtuList', rtuList)
      // 超出长度限制
      // if (this.$store.state.data.rtus.length > 4) {
      //   this.$message({
      //     message: this.$t('hint.rtuLength')
      //   })
      // } else {
      if (index) {
        this.$parent.$refs.main.activeName = index
      } else if (this.$store.state.data.rtus.length === 1 && this.$store.state.data.rtus.length < 2) {
        this.$parent.$refs.main.activeName = 'first'
      }
      if (this.$parent.$refs.main.$refs.first.$refs.light) {
        if (this.$parent.$refs.main.$refs.first.$refs.light.innerHTML !== '') {
          this.$parent.$refs.main.$refs.first.$refs.light.innerHTML = ''
        }
      }
      if (this.$parent.$refs.main.$refs.four) {
        if (this.$parent.$refs.main.$refs.four.$refs.light.innerHTML !== '') {
          this.$parent.$refs.main.$refs.four.$refs.light.innerHTML = ''
        }
      }
      let name = []
      // let dom = document.querySelectorAll('.light')
      // this.$parent.$refs.main.$refs.first.$refs.light.removeChild('dom')
      // 创建echart
      console.log(this.$store.state.data.rtus)
      for (let i = 0; i < this.$store.state.data.rtus.length; i++) {
        console.log(rtuList)
        rtuList.map(rtuName => {
          if (rtuName._id === this.$store.state.data.rtus[i]) {
            name.push(rtuName)
          }
        })
        let dom = document.createElement('div')
        dom.className = `light${i}`
        dom.style.minWidth = 800 + 'px'
        dom.style.width = 800 + 'px'
        dom.style.height = 450 + 'px'
        dom.style.marginTop = 30 + 'px'
        dom.style.paddingBottom = 10 + 'px'
        dom.style.borderBottom = '1px solid #fff'
        let ids = {
          rtuId: this.$store.state.data.rtus[i]
        }
        console.log(dom)
        if (this.$store.state.data.type === 0) {
          let arr = this.$store.state.data.electricTime.split('-')
          let day = new Date(arr[0], arr[1], 0)
          day.getDate()
          ids.enddate = this.$store.state.data.electricTime + `-${day.getDate()}`
          ids.startdate = this.$store.state.data.electricTime + '-01'
          await getEnergyDailyStatistic(ids).then(res => {
            this.lightList = res
            console.log(name[i].name)
            this.$parent.$refs.main.$refs.first.$refs.light.appendChild(dom)
            this.$parent.$refs.main.$refs.first.light(dom, res, name[i].name)
            // this.$parent.$refs.main.$refs.first.$refs.light.appendChild(sp)
          }).catch(err => {
            console.log(err)
          })
        } else {
          ids.endmonth = this.$store.state.data.electricTime + '-12'
          ids.startmonth = this.$store.state.data.electricTime + '-01'
          getEnergyMonthlyStatistic(ids).then(res => {
            console.log(res)
            this.$parent.$refs.main.$refs.first.$refs.light.appendChild(dom)
            this.$parent.$refs.main.$refs.first.light(dom, res, name[i].name)
          }).catch(err => {
            console.log(err)
          })
        }
      }
      // 路灯电压
      console.log(this.$parent.$refs.main.$refs)
      for (let i = 0; i < this.$store.state.data.rtus.length; i++) {
        let dom = document.createElement('div')
        dom.className = `lightData${i}`
        dom.style.width = 800 + 'px'
        dom.style.maxWidth = 800 + 'px'
        dom.style.height = 450 + 'px'
        this.$parent.$refs.main.$refs.four.$refs.light.appendChild(dom)
        this.$parent.$refs.main.$refs.four.light(dom, this.$store.state.data.rtus[i], name[i].name)
      }

      this.$store.commit('lightTable')
      // }
    }
  }

}
</script>

<style lang="scss" scoped>
.nav_tree {
  // position: fixed;
  max-height: 700px;
  min-height: 700px;
  padding-top: 20px;
  min-width: 330px;
  z-index: 100;
  background: #0f1843;
  height: 100%;
  font-size: 12px;
  line-height: 12px;
  box-sizing: border-box;
  border-radius: 0 0 5px 5px;
  overflow: hidden;
  color: #b5bcc2;
}
.title {
  line-height: 30px;
  font-size: 20px;
  display: flex;
  align-items: center;
}
.boxTree {
  // padding-right: 90px;
  overflow-y: auto;
  // &::-webkit-scrollbar {
  //   /*滚动条整体样式*/
  //   width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  //   height: 1px;
  // }
  // &::-webkit-scrollbar-thumb {
  //   /*滚动条里面小方块*/
  //   border-radius: 10px;
  //   box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  //   background: #535353;
  // }
  // &::-webkit-scrollbar-track {
  //   /*滚动条里面轨道*/
  //   box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  //   border-radius: 10px;
  //   background: #ededed;
  //   display: none;
  // }
  border: 0;
  height: 75%;
  .el-checkbox-group {
    overflow-y: auto;
    height: 300px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #535353;
    }
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      background: #ededed;
      display: none;
    }
  }
}
.nav-top {
  display: flex;
  align-items: center;
  padding: 0 20px;
  span {
    width: 60px;
  }
  .el-select {
    width: 150px;
  }
  .el-input--mini .el-input__inner {
    background: transparent;
  }
}
.tree-box {
  padding: 10px 30px 0 20px;
  p {
    font-size: 18px;
    line-height: 24px;
    // margin-bottom: 10px;
    margin-left: 20px;
  }
}
.active {
  background: #fffacd;
  color: #000;
  border-radius: 3px;
}
.nav-bottom {
  position: absolute;
  bottom: 0;
  font-size: 16px;
  line-height: 20px;
  height: 100px;
  padding: 10px;
  width: 282px;
  background: #0f1843;
  box-sizing: border-box;
  div {
    line-height: 40px;
    display: flex;
    p {
      width: 70px;
    }
    .status {
      display: flex;
      align-items: center;
      color: #faf172;
    }
  }
}

.active {
  background: #6bc0e2;
  color: #000;
  border-radius: 3px;
}
// .lightTree {
//   width: 300px;
// }
</style>
<style lang="scss">
.el-menu-item,
.el-submenu__title {
  color: #ffffff;
}
.boxTree .el-menu-item,
.el-submenu__title {
  line-height: 27px;
  height: 100%;
}
.el-menu,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background: #0f1843;
}
.el-submenu__title:hover {
  color: #409eff;
}
.wifiBox {
  .el-dialog__wrapper {
    position: fixed;
    top: 50% !important;
    left: 50% !important;
    right: auto !important;
    bottom: auto !important;
    border-radius: 5px;
    margin-left: -25%;
    margin-top: -250px;
    overflow: hidden;
    width: 50%;
  }
  .el-dialog {
    height: 450px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #535353;
    }
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      background: #ededed;
      display: none;
    }
  }
}
.lightTree .el-submenu__title i {
  display: none;
}
</style>
