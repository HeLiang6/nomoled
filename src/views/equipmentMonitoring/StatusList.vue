<template>
  <div
    class="statusListDom"
    style="margin-bottom:200px;"
  >
    <el-form>
      <el-form-item>
        <span style="color:#fff;">{{$t('tips.Current_project')}}: </span>
        <el-select
          v-model="state1"
          filterable
          remote
          reserve-keyword
          :placeholder="$t('tips.keyword')"
          :remote-method="remoteMethod"
          :loading="loading"
          @change='handerChange'
        >
          <el-option
            v-for="item in restaurants"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div id="stateLanguage">
      <div class="collapse_box">
        <el-collapse
          v-model="activeNames"
          @change="handleChange(item._id)"
          v-for="(item,index) in allData"
          :key="index"
          accordion
        >
          <el-collapse-item :name="index">
            <template slot="title">
              <div class="statis-box">
                <div class="DtuName">
                  <span>{{$t('StatusList.dtu')}}:&nbsp{{item.name}}</span>
                  <!-- <div
                  style="width:20px;height:20px;overflow:hidden"
                  v-if="pjtree.dtuList[index]"
                > -->
                  <p v-if="pjtree.dtuList">
                    <span
                      v-if="pjtree.dtuList[index].net===0"
                      style="width:20px;height:20px;border-radius:50%;background:green;display:inline-block"
                    ></span>
                    <span
                      v-if="pjtree.dtuList[index].net===1"
                      style="width:20px;height:20px;border-radius:50%;background:red;display:inline-block"
                    ></span>
                  </p>
                  <!-- </div> -->
                </div>
                <p
                  class="online_status"
                  v-if="pjtree.dtuList"
                >{{$t('StatusList.rtuStatus')}}:
                  <span style="color:#65cea7;">{{$t('StatusList.online')}}:{{pjtree.dtuList[index].rtuonline}} {{$t('StatusList.num')}}</span>
                  <span style="color:#d32424;">{{$t('StatusList.offline')}}:{{pjtree.dtuList[index].rtuoffline}}{{$t('StatusList.num')}}</span>
                  <span style="color:#eeeeee;">{{$t('StatusList.fault')}}:{{warn}}{{$t('StatusList.num')}}</span>
                </p>
                <el-button
                  type="primary"
                  class="btn"
                  @click="handerClick($event,item,index)"
                >
                  {{$t('StatusList.look')}}
                </el-button>
              </div>
            </template>
            <div class="lis_scroll">
              <div>
                <ul
                  class="status_list"
                  v-for="(rtuItem,rtuIndex) in item.rtuData"
                  :key="rtuIndex"
                >
                  <li style="width:220px">
                    <p>{{rtuItem.name}}</p>
                    <p>UID:{{rtuItem.uid}}</p>
                  </li>
                  <li style="width:250px">
                    <div v-if="pjtree.rtuList">
                      <p>
                        {{$t('StatusList.state')}}:
                        <span
                          v-if="pjtree.rtuList[rtuIndex].net==0"
                          style="width:10px;height:10px;border-radius:50%;background:green;display:inline-block;;line-height:70px"
                        >
                        </span>
                        <span
                          v-if="pjtree.rtuList[rtuIndex].net==1"
                          style="width:10px;height:10px;border-radius:50%;background:red;display:inline-block;line-height:40px"
                        >
                        </span>
                      </p>
                    </div>
                    <p>{{$t('StatusList.status')}}:
                      <span>{{$t(`StatusList.statusArr[${rtuItem.lastest.state}]`)}}</span>
                    </p>
                    <p>{{$t('StatusList.fault')}}:
                      <span>{{$t(`StatusList.warnArr[${rtuItem.lastest.warn}]`)}}</span>
                    </p>
                  </li>
                  <li class="bgbox">
                    <div>
                      <span>{{$t('StatusList.pvvoltage')}}: {{rtuItem.lastest.pvvoltage}} V</span>
                      <span>{{$t('StatusList.bvoltage')}}: {{rtuItem.lastest.bvoltage}} V</span>
                      <span>{{$t('StatusList.ccurrent')}}: {{rtuItem.lastest.ccurrent}} A</span>
                      <span>{{$t('StatusList.cpower')}}: {{rtuItem.lastest.cpower}} W</span>
                    </div>
                    <div>
                      <span>{{$t('StatusList.ovoltage')}}: {{rtuItem.lastest.ovoltage}} V</span>
                      <span>{{$t('StatusList.ocurrent')}}: {{rtuItem.lastest.ocurrent}} mA</span>
                      <span>{{$t('StatusList.dcpower')}}: {{rtuItem.lastest.dcpower}} W</span>
                    </div>
                    <div>
                      <span>{{$t('StatusList.temperature')}}: {{rtuItem.lastest.temperature}}°C</span>
                      <span>{{$t('StatusList.itemperature')}}: {{rtuItem.lastest.itemperature}}°C</span>
                    </div>
                    <div>
                      <span>{{$t('StatusList.daysolar')}}: {{((rtuItem.daysolar)/100).toFixed(2)}}KWH</span>
                      <span>{{$t('StatusList.totalsolar')}}: {{((rtuItem.totalsolar)/100).toFixed(2)}}KWH</span>
                      <span>{{$t('StatusList.worktime')}}: {{(rtuItem.worktime)}}day</span>
                    </div>
                  </li>
                  <li style="width:200px;">
                    <div style="display:flex;justify-content:center">
                      <el-button
                        type="primary"
                        @click="inquireClick(rtuItem,index,rtuIndex,item)"
                      >{{$t('StatusList.realtime')}}</el-button>
                    </div>
                    <p style="color:#fff;text-align:center">{{rtuItem.lastest.date}}</p>
                    <div>
                      <p
                        v-if="rtuItem.sendState"
                        style="color:#fff;text-align:center"
                      >{{$t(`mqttStatus.send[${rtuItem.sendState}]`)}}</p>
                    </div>

                  </li>
                </ul>
              </div>
            </div>

          </el-collapse-item>
        </el-collapse>
        <p
          v-if="falg"
          class="message"
          style="color:#fff;"
        >无相关设备</p>
      </div>
    </div>
    <!-- 设备状态弹框 -->
    <div>
      <el-dialog
        title="提示"
        :visible.sync="lightState"
        width="30%"
      >
        <span>{{$t('mqttStatus.release')}}</span>
        <div
          v-if="$store.state.GPSmap.rtuMessage"
          style="margin-top:10px;width:130px;color:#000;"
        >
          <span>{{$t(`mqttStatus.privilegeStatus[${$store.state.GPSmap.rtuMessage.state}]`)}}</span>
          <!--
              <span v-if="$store.state.GPSmap.rtuMessage.state===0">获取权限中</span>
              <span v-if="$store.state.GPSmap.rtuMessage.state===1">已获得权限</span>
              <span v-if="$store.state.GPSmap.rtuMessage.state===2">获取权限失败</span>
              <span v-if="$store.state.GPSmap.rtuMessage.state===3">释放权限 </span> -->
        </div>

        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="lightState = false">{{$t('search.cancel')}}</el-button>
          <el-button
            type="primary"
            @click="stateClick()"
          >{{$t('search.confirm')}}</el-button>
        </span>
      </el-dialog>
    </div>

  </div>

</template>

<script>
import { connect, get_netstatus, mstart_send, pjtree } from '@/utils/command/monitormanage'
import { ProjectList, getProjectTreeBypId } from '@/api/project'
import { dtuList } from '@/api/dtu'
import { rtulistbyrootId, rtuTotal, rtulistbyprojectId } from '@/api/rtu'
import { adminReleaseControl } from '@/utils/command/websocket'
export default {
  data () {
    return {
      activeNames: [],
      restaurants: [],
      state1: '',
      loading: false,
      dtuList: [],
      rtuList: [],
      companyAppLoading: false,
      falg: false,
      pjtree: '',
      lightState: false,
      rtuMessage: '',
      rtuListMessage: '',
      lightData: [],
      watchList: [],
      warn: 0
    }
  },
  computed: {
    allData () {
      console.log(this.dtuList)
      return this.dtuList.map(dtuItem => {
        const dtu = dtuItem
        console.log(this.rtuList)
        const rtuData = this.rtuList.filter(rtuItem => {
          if (rtuItem) {
            if (rtuItem.rootId || rtuItem.dtuId === dtuItem.id) {
              let time = new Date(rtuItem.lastest.time)
              let y = time.getFullYear()
              let m = time.getMonth() + 1
              let d = time.getDate()
              let h = time.getHours()
              let mm = time.getMinutes()
              let s = time.getSeconds()
              let date = y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s)
              rtuItem.lastest.date = date
              return rtuItem
            }
          }
        }
        )
        return {
          ...dtu,
          rtuData
        }
      })

      // set () {
      //   // console.log(v)
      //   if (this.rtuMessage.length > 0) {
      //     // let data = this.allData
      //     // data[].rtuData
      //     return this.rtuMessage
      //   }
      // }
    },
    light_state () {
      console.log(this.$store.state.GPSmap.rtuMessage[0].objs[0].uid)
      return this.$store.state.GPSmap.rtuMessage
    }
  },
  watch: {
    allData: (newVal, endVal) => {
      if (newVal) {
        let warnNum = 0

        for (let i = 0; i < newVal.length; i++) {
          for (let r = 0; r < newVal[i].rtuData.length; r++) {
            // newVal[i].rtuData[r].lastest.warn =
            let warn = newVal[i].rtuData[r].lastest.warn
            if (newVal[i].rtuData[r].lastest.warn === 0) {
              newVal[i].rtuData[r].lastest.warn = 0
            } else if (warn & (1 << 0)) {
              newVal[i].rtuData[r].lastest.warn = 1
            } else if (warn & (1 << 1)) {
              newVal[i].rtuData[r].lastest.warn = 2
            } else if (warn & (1 << 2)) {
              newVal[i].rtuData[r].lastest.warn = 3
            } else if (warn & (1 << 3)) {
              newVal[i].rtuData[r].lastest.warn = 4
            } else if (warn & (1 << 4)) {
              newVal[i].rtuData[r].lastest.warn = 5
            } else if (warn & (1 << 5)) {
              newVal[i].rtuData[r].lastest.warn = 6
            } else if (warn & (1 << 6)) {
              newVal[i].rtuData[r].lastest.warn = 7
            } else if (warn & (1 << 9)) {
              newVal[i].rtuData[r].lastest.warn = 8
            } else if (warn & (1 << 10)) {
              newVal[i].rtuData[r].lastest.warn = 9
            } else if (warn & (1 << 11)) {
              newVal[i].rtuData[r].lastest.warn = 10
            } else if (warn & (1 << 12)) {
              newVal[i].rtuData[r].lastest.warn = 11
            } else if (warn & (1 << 14)) {
              newVal[i].rtuData[r].lastest.warn = 12
            }

            if (newVal[i].rtuData[r].lastest.warn !== 0) {
              warnNum++
            }
          }
        }
        this.warn = warnNum
        return newVal
      }
    },
    handler: (newVal, oldVal) => {
      if (newVal.length !== 0 && oldVal.length === 0) {
        this.allData = newVal
      }
    },
    state1: function (newVal) {
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
          console.log(data)
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
        } else {
          // 弹出框提示
        }
      }).catch(err => {
        console.log(err)
      })
    },
    '$store.state.GPSmap.rtuMessage.state' (newVal, oldVal) {
      if (newVal === 2) {
        console.log(1)
        this.lightState = true
      }
    },
    watchList: {
      handler (val) {
        if (val && val.length !== 0) {
          this.$store.commit('rtuListMessage', val)

          this.rtuMessage = this.allData[val[0].dtuIndex].rtuData.map((item, i) => {
            if (val[0].objs[i]) {
              item.sendState = val[0].objs[i].state
              console.log('------------sendState------------')
              return item
            }
          })
          this.rtuList = this.rtuMessage
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
    this.electricity()
    this.searchChange()
    // this.mqttFunstion()
    // 判断哪个语言版本
    if (sessionStorage.getItem('language') === 'en') {
      document.getElementById('stateLanguage').className = 'enStatus'
    }
    if (sessionStorage.getItem('language') === 'es') {
      document.getElementById('stateLanguage').className = 'enStatus'
    }
    if (sessionStorage.getItem('language') === 'cn') {
      document.getElementById('stateLanguage').className = 'chinese'
    }
  },
  methods: {
    // 时间戳转换
    add0 (m) { return m < 10 ? '0' + m : m },
    // 所有的DTU
    DTUList () {
      let data = {
        projectId: this.state1,
        rand: Math.ceil(Math.random() * 10),
        fieldJson: {
          'id': '',
          'name': '',
          'type': '',
          'state': '',
          'tel': '',
          'poll': '',
          'sendtime': '',
          'latitude': '',
          'longitude': '',
          'version': 96,
          'light': 20,
          'conditionstate': 1,
          'configstate': 1,
          'typeId': '58524387d0968b0c04938771'
        }
      }
      dtuList(data).then(res => {
        // this.allData = res.result
        this.activeNames = []
        if (res.httpCode === 0) {
          this.falg = true
          this.dtuList = []
        } else {
          this.dtuList = res.result
          this.falg = false
        }
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    getrtuList (val) {
      let data = {
        projectId: val.rootId,
        rand: val.r
      }
      rtulistbyprojectId(data).then(res => {
        this.rtuList = res
      }).catch(err => {
        console.log(err)
      })
    },
    handerChange () {
      let str = String(Math.round((Math.random() * 10) + 1))
      let data = {
        rootId: this.state1,
        r: str
      }
      console.log(this.state1 + '-------------123')
      this.DTUList()
      this.getrtuList(data)
    },
    // 获取DTU下所有RTU
    dtu_Rtu (val) {
      let data = {
        rand: 2,
        dtuId: val
      }
      rtulistbyrootId(data).then(res => {
        // this.rtuList = res.result
        this.rtuList = res.result
      }).catch(err => {
        console.log(err)
      })
    },
    // 发电量
    electricity () {
      let data = {
        projectId: ''
      }
      rtuTotal(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    searchChange (val) {
      console.log('------------------333')
      console.log(this.restaurants)
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
          this.restaurants.push(data)
        })
        this.state1 = res.result[0]._id
        console.log('-----------222')
        this.handerChange()
      }).catch(err => {
        console.log(err)
      })
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.restaurants = this.restaurants.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.options = []
      }
    },
    handerSearch () {
      console.log(this.state1)
    },
    handleChange (val) {
      console.log(1)
      // this.getdemandAppList(val)
      this.dtu_Rtu(val)
    },
    async getdemandAppList () {
      let id = this.activeNames.pop()
      this.companyAppLoading = true
      if (id) {
        let res = await getdemandAppList(id)
        this.allData = res.data.list
        this.$nextTick(() => { // 结构渲染完毕后执行
          this.activeNames.push(id) // 添加对应的name值
        })
      }
      this.companyAppLoading = false
    },
    // 批量查询
    handerClick (e, val, index) {
      this.$store.commit('GPSDTUTEL', val.tel)
      e.stopPropagation() // 阻止事件触发
      let obj = {}
      console.log(index)
      obj.type = 'devgroup'
      obj.dtuIndex = index
      // obj.name = val.namce
      this.lightData = []

      // let list = mstart_send(obj, { action: 'allcheck' }, (rtuIndex, lightdata) => {
      this.watchList = mstart_send(obj, { action: 'allcheck' }, (rtuIndex, lightdata) => {
        console.log('_________________rtu________')
        console.log(lightdata)
        this.lightData.push(lightdata)
        console.log(rtuIndex)
        console.log(this.lightData)
        this.rtuList[index].lastest = lightdata
        let warn = this.rtuList[index].lastest.warn
        if (warn === 0) {
          lightdata.warn = 0
        } else if (warn & (1 << 0)) {
          lightdata.warn = 1
        } else if (warn & (1 << 1)) {
          lightdata.warn = 2
        } else if (warn & (1 << 2)) {
          lightdata.warn = 3
        } else if (warn & (1 << 3)) {
          lightdata.warn = 4
        } else if (warn & (1 << 4)) {
          lightdata.warn = 5
        } else if (warn & (1 << 5)) {
          lightdata.warn = 6
        } else if (warn & (1 << 6)) {
          lightdata.warn = 7
        } else if (warn & (1 << 9)) {
          lightdata.warn = 8
        } else if (warn & (1 << 10)) {
          lightdata.warn = 9
        } else if (warn & (1 << 11)) {
          lightdata.warn = 10
        } else if (warn & (1 << 12)) {
          lightdata.warn = 11
        } else if (warn & (1 << 14)) {
          lightdata.warn = 12
        }
        this.rtuList[index].lastest.warn = warn
      })
      // this.rtuMessage = this.allData[index].rtuData.map((item, i) => {
      //   item.sendState = list[0].objs[i].state
      //   console.log('------------sendState------------')
      //   return item
      // })
      // this.rtuList = this.rtuMessage
      // if (list[0].state === 2) {
      //   this.lightState = true
      // }
    },
    // 单个查询
    inquireClick (val, index, rtuIndex, dtu) {
      this.$store.commit('GPSDTUTEL', dtu.tel)

      let obj = {}
      obj.type = 'rtu'
      console.log(index)
      obj.dtuIndex = index
      obj.rtuIndex = rtuIndex
      obj.uid = val.uid
      let _this = this
      let list = mstart_send(obj, { action: 'realtime' }, (rtuIndex, lightdata) => {
        console.log('_________________1rtu________')
        console.log(lightdata)
        console.log('_________________1rtu________')
        let warn = lightdata.warn
        console.log(rtuIndex)
        if (warn === 0) {
          lightdata.warn = 0
        } else if (warn & (1 << 0)) {
          lightdata.warn = 1
        } else if (warn & (1 << 1)) {
          lightdata.warn = 2
        } else if (warn & (1 << 2)) {
          lightdata.warn = 3
        } else if (warn & (1 << 3)) {
          lightdata.warn = 4
        } else if (warn & (1 << 4)) {
          lightdata.warn = 5
        } else if (warn & (1 << 5)) {
          lightdata.warn = 6
        } else if (warn & (1 << 6)) {
          lightdata.warn = 7
        } else if (warn & (1 << 9)) {
          lightdata.warn = 8
        } else if (warn & (1 << 10)) {
          lightdata.warn = 9
        } else if (warn & (1 << 11)) {
          lightdata.warn = 10
        } else if (warn & (1 << 12)) {
          lightdata.warn = 11
        } else if (warn & (1 << 14)) {
          lightdata.warn = 12
        }
        console.log(lightdata)

        console.log(warn)
        this.rtuMessage = this.allData[index].rtuData.map(item => {
          if (item._id === lightdata.rtuId) {
            item.lastest = lightdata
          }
          return item
        })
        console.log(this.rtuMessage)
        this.rtuList = this.rtuMessage
        console.log(this.allData)
      },
        function (uid, state) {
          for (let index = 0; index < _this.allData.length; index++) {
            let rtuData = _this.allData[index].rtuData
            // 循环RTU
            for (let r_index = 0; r_index < rtuData.length; r_index++) {
              let rtu = rtuData[r_index]
              console.log('rtu.uid: ' + rtu.uid)
              // 单个RTU
              if (uid === rtu.uid) {
                rtu.sendState = state
                console.log('--------------11111----------------', uid)
                console.log(state)
                console.log('---------1111---------------------')
              }
            }
          }
        })

      this.rtulistMessage = list
      // this.allData = this.addData[index].rtuData.map(item => {

      // })
      this.$store.commit('rtuListMessage', list)
    },
    stateClick () {
      adminReleaseControl(this.$store.state.GPSmap.dtuTel)
      if (this.$store.state.user.message) {
        this.$message({
          message: '释放权限成功',
          type: 'success'
        })
        this.lightState = false
      }
      // this.lightState = false
    }
  }
}
</script>

<style lang="scss" scoped>
.inline-input {
  height: 38px;
}
.el-input__inner {
  background: none;
}
.statis-box {
  color: #eee;
  display: flex;
  height: 70px;
  width: 100%;
  align-items: center;
  background: none;
  .DtuName {
    width: 500px;
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      width: 350px;
    }
  }
  span {
    font-size: 20px;
    font-weight: 300;
    line-height: 60px;
  }
  .online_status {
    width: 500px;
    font-size: 24px;
    span {
      font-size: 20px;
      font-weight: 300;
      // line-height: 70px;
      color: #65cea7;
      width: 90px;
      display: inline-block;
    }
  }
}
// 英文版
// .enStatus {
//   .statis-box {
//     color: #eee;
//     display: flex;
//     height: 70px;
//     width: 100%;
//     align-items: center;
//     background: none;
//     .DtuName {
//       width: 500px;
//       display: flex;
//       align-items: center;
//       span {
//         display: inline-block;
//         width: 350px;
//       }
//     }
//     span {
//       font-size: 20px;
//       font-weight: 300;
//       line-height: 60px;
//     }
//     .online_status {
//       width: 500px;
//       font-size: 24px;
//       span {
//         font-size: 20px;
//         font-weight: 300;
//         // line-height: 70px;
//         color: #65cea7;
//         width: 90px;
//         display: inline-block;
//       }
//     }
//   }
// }
.enStatus {
  .status_list li:nth-of-type(3) {
    margin-left: 50px;
    div {
      margin: 3px;
    }
    span {
      width: 300px;
      display: inline-block;
      font-size: 16px;
      color: #807699;
      font-weight: 600;
    }
  }
}
.status_list {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba($color: #eee, $alpha: 0.2);
  li {
    padding: 20px;
    font-size: 14px;
    span {
      padding: 5px;
      margin-top: 5px;
    }
  }
}
.status_list li:nth-of-type(1) {
  p:nth-of-type(1) {
    font-weight: 600;
    font-size: 16px;
  }
  p:nth-of-type(2) {
    font-size: 14px;
  }
  p {
    color: #7a7676;

    margin: 10px 0;
  }
}
.status_list li:nth-of-type(2) {
  width: 100px;
  line-height: 40px;
  p {
    color: #7a7676;
    font-weight: 600;
    font-size: 14px;
    span {
      font-weight: 300;
    }
  }
}
.status_list li:nth-of-type(3) {
  margin-left: 50px;
  div {
    margin: 3px;
  }
  span {
    width: 200px;
    display: inline-block;
    font-size: 16px;
    color: #807699;
    font-weight: 600;
  }
}
.bgbox div:nth-of-type(1) {
  span {
    background: #87ceeb;
    border-radius: 4px;
  }
}
.bgbox div:nth-of-type(2) {
  span {
    background: #eee8aa;
    border-radius: 4px;
  }
}
.bgbox div:nth-of-type(3) {
  span {
    background: #e6e6fa;
    border-radius: 4px;
  }
}
.bgbox div:nth-of-type(4) {
  span {
    background: #ffd7bb;
    border-radius: 4px;
  }
}
.collapse_box {
  max-height: 700px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
.lis_scroll {
  overflow-y: auto;
  height: 650px;
  // &::-webkit-scrollbar {
  //   display: none;
  // }
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
// 无消息提示
.message {
  text-align: center;
}
.btn {
  float: right;
}
</style>
<style lang='scss'>
.el-collapse {
  // overflow-y: auto;
}
.el-collapse-item__header {
  background: none;
}
.el-collapse-item__header.is-active {
  // height: 70px;
  padding-right: 40px;
}
.el-collapse-item {
  background: rgba($color: #fff, $alpha: 0.1);
  border: 0;
  padding: 10px 30px;
  box-sizing: border-box;
}
.el-collapse-item__wrap {
  background: none;
  border-bottom: 0;
}
.el-icon-arrow-right {
  color: #fff;
  font-size: 20px;
}
.el-collapse {
  border: 0;
  margin-bottom: 10px;
}
.el-collapse-item__header {
  border: 0;
}
</style>

<style lang="scss" scoped>
/**适配**/
.statusListDom {
  @media screen and (max-width: 800px) {
    .chinese {
      .DtuName {
        width: 250px;
      }
      .online_status {
        width: 300px;
        font-size: 10px;
        span {
          width: 70px;
          span {
            width: 40px;
          }
        }
      }
      .statis-box {
        span {
          font-size: 5px;
        }
        p {
          font-size: 16px;
        }
      }
    }
    .enStatus {
      .collapse_box {
        .el-collapse {
          .el-collapse-item {
            padding-left: 10px;
          }
        }
      }
      .statis-box {
        .DtuName {
          width: 450px;
          span {
            width: 300px;
            font-size: 12px;
          }
        }
        .online_status {
          font-size: 12px;
          line-height: 20px;
          span {
            width: 120px;
            font-size: 12px;
            line-height: 20px;
            float: right;
          }
        }
      }
    }
  }
  @media screen and (max-width: 1024px) and (min-width: 800px) {
    .chinese {
      .DtuName {
        width: 250px;
      }
      .online_status {
        width: 300px;
        font-size: 10px;
        span {
          width: 70px;
          span {
            width: 40px;
          }
        }
      }
      .statis-box {
        span {
          font-size: 5px;
        }
        p {
          font-size: 16px;
          margin-left: 30px;
        }
      }
    }
    .enStatus {
      .statis-box {
        .DtuName {
          width: 450px;
          span {
            width: 300px;
            font-size: 12px;
          }
        }
        .online_status {
          width: 650px;
          font-size: 12px;
          margin-left: 5px;
          span {
            width: 110px;
            font-size: 10px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 1280px) and (min-width: 1024px) {
    .chinese {
      .DtuName {
        width: 300px;
      }
      .online_status {
        width: 300px;
        font-size: 10px;
        span {
          width: 70px;
          span {
            width: 40px;
          }
        }
      }
      .statis-box {
        span {
          font-size: 10px;
        }
        p {
          font-size: 16px;
          margin-left: 30px;
        }
      }
    }
    .enStatus {
      .statis-box {
        .DtuName {
          width: 450px;
          span {
            width: 300px;
            font-size: 12px;
          }
        }
        .online_status {
          width: 650px;
          font-size: 16px;
          span {
            width: 150px;
            font-size: 14px;
            span {
              width: 80px;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 1440px) and (min-width: 1280px) {
    .chinese {
      .DtuName {
        width: 350px;
      }
      .online_status {
        width: 400px;
        font-size: 16px;
        span {
          width: 100px;
          span {
            width: 60px;
          }
        }
      }
      .statis-box {
        span {
          font-size: 16px;
        }
        p {
          font-size: 16px;
          margin-left: 30px;
        }
      }
    }
    .enStatus {
      .DtuName {
        width: 350px;
        span {
          font-size: 10px;
        }
      }
      .online_status {
        width: 600px;
        font-size: 16px;
        margin-left: 10px;
        span {
          width: 150px;
          font-size: 16px;
        }
      }
    }
  }
  @media screen and (max-width: 1600px) and (min-width: 1440px) {
    .chinese {
      .DtuName {
        width: 350px;
      }
      .online_status {
        width: 500px;
        font-size: 16px;
        padding: 0 20px;
        span {
          width: 100px;
          span {
            width: 60px;
          }
        }
      }
      .statis-box {
        span {
          font-size: 16px;
        }
        p {
          font-size: 16px;
          margin-left: 30px;
        }
      }
    }
    .enStatus {
      .DtuName {
        width: 450px;
        span {
          width: 400px;
        }
      }
      .online_status {
        width: 600px;
        font-size: 16px;
        padding: 0 20px;
        span {
          width: 140px;
          span {
            width: 60px;
          }
        }
      }
      .statis-box {
        span {
          font-size: 16px;
        }
        p {
          font-size: 16px;
          margin-left: 30px;
        }
      }
    }
  }
  @media screen and (max-width: 1921px) and (min-width: 1600px) {
    .chinese {
      .DtuName {
        width: 350px;
      }
      .online_status {
        width: 500px;
        font-size: 16px;
        padding-left: 100px;
        span {
          width: 100px;
          span {
            width: 50px;
          }
        }
      }
    }
    // 英文版
    .enStatus {
      .statis-box {
        .DtuName {
          width: 450px;
          span {
            width: 400px;
            font-size: 16px;
          }
        }
        .online_status {
          width: 700px;
          font-size: 16px;
          padding-left: 50px;
          span {
            width: 180px;
            span {
              width: 80px;
            }
          }
        }
      }
    }
  }
}
//   // 高度
//   @media screen and (max-height: 600px) {
//     .collapse_box {
//       max-height: 250px;
//       .el-collapse-item__wrap {
//         .lis_scroll {
//           max-height: 200px;
//         }
//       }
//     }
//   }
//   @media screen and (max-height: 768px) and (min-height: 601px) {
//     .collapse_box {
//       max-height: 400px;
//       .el-collapse-item__wrap {
//         .lis_scroll {
//           max-height: 300px;
//         }
//       }
//     }
//   }
//   @media screen and (max-height: 900px) and (min-height: 769px) {
//     .collapse_box {
//       max-height: 500px;
//       .el-collapse-item__wrap {
//         .lis_scroll {
//           max-height: 420px;
//         }
//       }
//     }
//   }
//   @media screen and (max-height: 960px) and (min-height: 901px) {
//     .collapse_box {
//       max-height: 680px;
//       .el-collapse-item__wrap {
//         .lis_scroll {
//           max-height: 500px;
//         }
//       }
//     }
//   }
// }
</style>
