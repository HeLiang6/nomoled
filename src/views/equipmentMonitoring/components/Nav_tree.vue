<template>
  <div class="nav_tree">
    <div class="nav-top">
      <span>{{$t('tips.Current_project')}}:</span>
      <el-select
        v-model="$store.state.project.projectId"
        :placeholder="$t('tips.please')"
        size="mini"
        @change='searchChange'
      >
        <el-option
          v-for="(item,index) in options"
          :key="index"
          :label="item.name"
          :value="item._id"
        >
        </el-option>
      </el-select>
    </div>
    <p
      @click="projectClick"
      style="margin-left:50px;padding:0 20px;line-height:24px;font-size:18px;"
    >{{project.name}}</p>
    <el-menu class="el-menu-vertical-demo boxTree">
      <el-submenu
        v-for="(item,index) in num.dtuList"
        :key="index"
        :index="String(index)"
      >
        <template slot="title">
          <span @click="DTU_light(item,index)">{{item.name}}
            <span v-if="pjtree.dtuList[index]">
              <span :class="pjtree.dtuList[index].net===1?'imgBg':'online'"></span>
            </span>

          </span>
        </template>
        <el-submenu :index='item._id'>
          <template slot="title">路灯设备组</template>
          <el-menu-item
            v-for="(item2,index2) in item.rtuList"
            :key="index2"
            :index="item2._id"
          >
            <!-- <el-submenu :index="item2._id"> -->
            <template slot="title"><span @click="lightClick(item,item2,index2,index)">{{item2.name}}-V{{item2.version}}
                <span v-if="pjtree.rtuList">
                  <span :class="pjtree.rtuList[index2].net===1?'imgBg':'online'"></span>
                </span>
              </span></template>
          </el-menu-item>
        </el-submenu>
        <el-submenu
          :index="item3._id"
          v-for="(item3,index3) in item.zoneList"
          :key="index3"
        >
          <template slot="title"><span @click="areaLight(item3,index,item)">{{item3.name}}</span></template>
          <el-menu-item
            :index="item4._id"
            v-for="(item4,index4) in item3.rtuList"
            :key="index4"
          >
            <span @click="lightClick(item,item4,'',index)">{{item4.name}}</span>
          </el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
    <div class="nav-bottom">
      <div>
        <p>集中器</p>
        <span class="status">
          【
          <img
            src="../../../../static/images/well.png"
            alt=""
          >
          <span>在线:{{pjtree.dtuonline}}</span>
          <img
            src="../../../../static/images/malfunction.png"
            alt=""
          >
          <span>离线:{{pjtree.dtuoffline}}</span>
          】
        </span>
      </div>
      <div>
        <p>路灯终端</p>
        <span class="status"> 【
          <img
            src="../../../../static/images/well.png"
            alt=""
          >
          <span>在线:{{pjtree.rtuonline}}</span>
          <img
            src="../../../../static/images/malfunction.png"
            alt=""
          >
          <span>离线:{{pjtree.rtuoffline}}</span>
          】
        </span>
      </div>
      <div>
        <p>亮灯率</p>
        <span class="status"> 【

          <span>开启:{{open}}</span>

          <span>关闭:{{close}}</span>
          】
        </span>
      </div>
    </div>
    <!-- 项目亮灯 -->
    <el-dialog
      :title="$t('DTU_list.project')"
      :visible.sync="project_dialog"
      width="520px"
      :modal='false'
    >
      <div>
        <div class="light_btn">
          <div class="DTU_img">
            <img
              src="../img/project64.png"
              alt=""
            >
            <p>{{project.name}}</p>
          </div>
          <!-- 开关灯按钮 -->
          <div class="btn-light-box">
            <el-checkbox
              :title="$t('title.Broadcas')"
              style="font-weight:700"
            >
              {{$t('GPRS.Broadcas')}}
            </el-checkbox><br />
            <div style="display:flex;align-items:center">
              <span style="display-inline:block;width:110px;color:#000;">亮灯时长:</span>
              <el-input
                v-model="val"
                type="Number"
                :min='0'
                oninput="if(value<0)value=0"
                :placeholder="$t('GPRS.duration')"
              ></el-input>
              <p style="width:100px;margin-left:20px;font-weight:700">min</p>
            </div>
            <div>
              <el-button
                size='small'
                type="primary"
                @click="lighton()"
              >{{$t('GPRS.Full_open')}}</el-button>
              <el-button
                size='small'
                type="primary"
                @click="lightoff()"
              >{{$t('GPRS.All_off')}}</el-button>
              <el-button
                size='small'
                type="primary"
                @click="auto()"
              >{{$t('GPRS.Fully_automatic')}}</el-button>
              <el-button
                size='small'
                type="primary"
                @click="allClear()"
              >{{$t('GPRS.Clean_all')}}</el-button>
            </div>
          </div>
        </div>
        <div>
          <el-slider v-model="progress"></el-slider>
        </div>
        <div class="adjust-box">
          <p>{{$t('data.LightData')}}</p>
          <el-button type="primary">{{$t('GPRS.adjust')}}</el-button>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
      </span>
    </el-dialog>
    <!-- DTU亮灯 -->
    <el-dialog
      title="集中器"
      :visible.sync="$store.state.GPSmap.dtu_light"
      width="520px"
      :modal='false'
    >
      <div>
        <div class="Dtu_box_top">
          <p style="font-weight:700">{{$t('lightList.Concentrador')}}: {{dtuLight.name}}</p>
          <p style="font-weight:700">{{$t('lightList.Tel')}}: {{dtuLight.tel}}</p>
        </div>
        <div
          class="state_img"
          style="margin:15px 0px;"
        >
          <span style="color:#000;">{{$t('GPRS.GPRS')}}: </span>
          <div v-if="pjtree.dtuList">
            <div
              v-if="pjtree.dtuList[dtuLight.index]"
              style="margin-left:3px"
            >
              <img
                v-if='pjtree.dtuList[dtuLight.index].net===0'
                src="../img/Circle_Green.png"
              />
              <img
                v-if='pjtree.dtuList[dtuLight.index]===1'
                src="../img/Circle_Red.png"
              />

            </div>
          </div>
        </div>
        <div class="light_btn">
          <div class="DTU_img">
            <img
              src="../img/gprs64.png"
              alt=""
            >
            <p>{{$t('lightList.Concentrador')}}:{{dtuLight.name}}</p>
          </div>
          <!-- 开关灯按钮 -->
          <div class="btn-light-box">
            <el-checkbox
              style="font-weight:700;border-color:#000000;"
              :title="$t('title.Broadcas')"
            >
              {{$t('GPRS.Broadcas')}}
            </el-checkbox>
            <div style="display:flex;align-items:center">
              <span style="display-inline:block;width:110px;color:#000;">亮灯时长:</span>
              <el-input
                v-model="val"
                type="Number"
                :min='0'
                oninput="if(value<0)value=0"
                :placeholder="$t('GPRS.duration')"
              ></el-input>
              <p style="margin-left:2px;width:100px;font-weight:700">min</p>
            </div>
            <div>
              <el-button
                size='small'
                type="primary"
                @click="lighton('dtu')"
              >{{$t('GPRS.Full_open')}}</el-button>
              <el-button
                size='small'
                type="primary"
                @click="lightoff('dtu')"
              >{{$t('GPRS.All_off')}}</el-button>
              <el-button
                size='small'
                type="primary"
                @click="auto('dtu')"
              >{{$t('GPRS.Fully_automatic')}}
              </el-button>
              <el-button
                size='small'
                type="primary"
                @click="allClear('dtu')"
              >{{$t('GPRS.Clean_all')}}</el-button>
            </div>
          </div>
        </div>
        <div>
          <el-slider v-model="progress"></el-slider>
        </div>
        <div class="adjust-box">
          <p>{{$t('GPRS.brightness')}} (拖动蓝色小圆圈调整亮度)</p>
          <el-button
            type="primary"
            @click="Dimming('DTU')"
          >{{$t('GPRS.adjust')}}</el-button>
        </div>
      </div>
      <!-- <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="$store.state.GPSmap.dtu_light = false">{{$t('GPRS.Clean_all')}}</el-button>
      </span> -->
    </el-dialog>
    <!-- 地区亮灯 -->
    <el-dialog
      :title="$t('lightList.Concentrador')"
      :visible.sync="read"
      width="520px"
      :modal='false'
    >
      <div>
        <div class="light_btn">
          <div class="DTU_img">
            <img
              src="../img/location.png"
              alt=""
            >
            <p>{{$t('lightList.Concentrador')}}: {{dtuLight.name}}</p>
          </div>
          <!-- 开关灯按钮 -->
          <div class="btn-light-box">
            <el-checkbox
              style="font-weight:700"
              :title="$t('title.Broadcas')"
            >
              {{$t('GPRS.Broadcas')}}
            </el-checkbox>
            <div style="display:flex;align-items:center">
              <span style="display-inline:block;width:110px;color:#000;">亮灯时长:</span>
              <el-input
                v-model="val"
                type="Number"
                :min='0'
                oninput="if(value<0)value=0"
                :placeholder="$t('GPRS.duration')"
              >
              </el-input>
              <p style="width:40px;margin-left:20px;font-weight:700">min</p>
            </div>
            <div>
              <el-button
                type="primary"
                @click="lighton('zone')"
              >{{$t('GPRS.Full_open')}}</el-button>
              <el-button
                type="primary"
                @click="lightoff('zone')"
              >{{$t('GPRS.All_off')}}</el-button>
              <el-button
                type="primary"
                @click="auto('zone')"
              >{{$t('GPRS.Fully_automatic')}}</el-button>
            </div>
          </div>
        </div>
        <div>
          <el-slider v-model="progress"></el-slider>
        </div>
        <div class="adjust-box">
          <p>{{$t('GPRS.brightness')}} (拖动蓝色小圆圈调整亮度)</p>
          <el-button
            type="primary"
            @click="Dimming('zone')"
          >{{$t('GPRS.adjust')}}</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 路灯点亮 -->
    <el-dialog
      :visible.sync="$store.state.GPSmap.is_light"
      width="520px"
      :modal='false'
      :title="$t('lightList.terminal')"
    >
      <div style="display:flex; justify-content:space-around">
        <p style="font-weight:1000">{{$t('lightList.terminal')}} : {{$store.state.GPSmap.rtu_detail.name}}</p>
        <p style="font-weight:1000">UID : {{$store.state.GPSmap.rtu_detail.uid}}</p>
      </div>
      <div style="display:flex;justify-content:space-around;margin:10px 0px">
        <p style="font-weight:1000">{{$t('lightList.Concentrador')}} : {{$store.state.GPSmap.rtu_detail.dtuName}}</p>
        <p style="font-weight:1000">{{$t('lightList.zibzee')}} :
          <span v-if="$store.state.GPSmap.rtu_detail">
            <img
              v-if='$store.state.GPSmap.rtu_detail.net===0'
              src="../img/Circle_Green.png"
            />
            <img
              v-if='$store.state.GPSmap.rtu_detail.net===1'
              src="../img/Circle_Red.png"
            />
          </span>
        </p>
      </div>
      <div>
        <div class="light_img">
          <img
            v-if="$store.state.GPSmap.rtu_detail.net==1"
            src="../img/offline.png"
            alt=""
          >
          <img
            v-else-if="$store.state.GPSmap.rtu_detail.net==0 && $store.state.GPSmap.rtu_detail.current!==0"
            src="../img/discharge.gif"
            alt=""
          >
          <!-- <img
            v-if="$store.state.GPSmap.rtu_detail.net==0 && $store.state.GPSmap.rtu_detail.current==0"
            src="../img/standby.gif"
            alt=""
          > -->
          <!-- <img
            src="../img/warn.gif"
            alt=""
          > -->

          <!-- 清扫 -->
          <!-- <img
            else-if="rtuData.cpower"
            src="../img/clear.gif"
            alt=""
          > -->
          <!-- <div v-if="rtuData"> -->
            <img
              v-else-if="rtuData && rtuData.cpower>0 && $store.state.GPSmap.rtu_detail.net!==1"
              src="../img/charge.gif"
              alt=""
            >
            <img
              v-else-if="rtuData && rtuData.state == 8 || rtuData == 0"
              src="../img/warn.gif"
              alt=""
            >
          <!-- </div> -->
            <img
            v-else
            src="../img/standby.gif"
            alt=""
          >

        </div>
        <!-- 开关灯按钮 -->
        <div style="display: flex; justify-content:space-around">
          <div style="width:250px;display:flex;">
            <span style="line-height:40px;display-inline:block;width:110px;color:#000;">亮灯时长: </span>
            <el-input
              v-model="val"
              type="Number"
              :min='0'
              oninput="if(value<0)value=0"
              :placeholder="$t('GPRS.duration')"
            ></el-input>
            <p style="width:100px;line-height:40px;margin-left:1px;">min</p>
          </div>
          <div>
            <div style="display: flex;">
              <el-button
                type="primary"
                @click="lighton('RTU')"
              >{{$t('GPRS.Turn_lights')}}</el-button>
              <el-button
                type="primary"
                @click="lightoff('RTU')"
              >{{$t('GPRS.off_lights')}}</el-button>
              <el-button
                type="primary"
                @click="auto('RTU')"
              >{{$t('GPRS.automatic')}}</el-button>
            </div>
          </div>
        </div>
        <div>
          <el-slider v-model="progress"></el-slider>
        </div>
        <div class="adjust-box">
          <p>{{$t('GPRS.brightness')}} (拖动蓝色小圆圈调整亮度)</p>
          <el-button
            type="primary"
            @click="Dimming('RTU')"
          >{{$t('GPRS.adjust')}}</el-button>
        </div>
        <div v-if="isClear">
          <el-button type="primary" @click="allClear('rtu')">开始清扫</el-button>
          <el-button type="primary" @click="clearStatus">清扫状态查询</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 释放权限 -->
    <div>
      <el-dialog
        title="提示"
        :visible.sync="rtuUpdata"
        width="30%"
        :modal='false'
      >
        <span>{{$t('mqttStatus.release')}}</span>
        <div class="updata_box"></div>
        <div
          v-if="sendList[0]"
          style="margin-top:10px;width:130px;"
        >
          <span>{{$t(`mqttStatus.privilegeStatus[${sendList[0].state}]`)}}</span>
          <!-- <span v-if="sendList[0].state===1">已获得权限</span>
          <span v-if="sendList[0].state===2">获取权限失败</span>
          <span v-if="sendList[0].state===3">释放权限 </span> -->
        </div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="clickback">取 消</el-button>
          <el-button
            type="primary"
            @click="rtuUpdataClick"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 状态弹框 -->
    <div
      class="clear_Status"
      v-if="sendList[0]"
    >
      <el-dialog
        :visible.sync='clearLoadialog'
        width="500px"
        :title="$t('lightList.LampControl')"
        :modal='false'
      >
        <div class="top">
          <!-- <p>DTU:&nbsp&nbsp<span>{{$store.state.project.updata.name}}</span></p> -->
          <p >{{$t('warnList.status')}}:&nbsp&nbsp<span>
              <span>{{$t(`mqttStatus.privilegeStatus[${sendList[0].state}]`)}}</span>
            </span>
            </p>
        </div>
        <!-- 进度条 -->
        <div class="updata_box">
        </div>
        <div style="margin-top:20px;border:1px solid #eee;">
          <ul
            class="list"
            style="background:#fff;"
          >
            <li style="padding:0 10px;display:flex;font-weight:600;border-bottom:1px solid #eee;font-size:16px;line-height:24px">
              <span style="width:50px;color:#7a7676;">No.</span>
              <span style="width:220px;color:#7a7676;">RTU</span>
              <span style="width:140px;color:#7a7676;">状态</span>
            </li>

            <li
              style="padding:0 10px;font-size:16px;line-height:24px"
              v-for="(item,index) in sendList[0].objs"
              :key="index"
            >
              <span style="width:46px;display:inline-block">{{index}}</span>
              <span style="width:216px;display:inline-block;">{{rtuName}}</span>
              <span style="width:140px">
                <span>{{$t(`mqttStatus.claerStatus[${item.state}]`)}}</span>
                <!-- <span v-if="item.state===1">已发送</span>
                <span v-if="item.state===2">操作成功</span>
                <span v-if="item.state===3">操作失败</span> -->
              </span>
            </li>
          </ul>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { adminReleaseControl, unsubscribe } from '@/utils/command/websocket'

import { ProjectList, ProjectDetail, getProjectTreeBypId } from '@/api/project'
import { get_netstatus, mstart_send, connect } from '@/utils/command/monitormanage'
// import mqtt from 'mqtt'
// import { zoneone, zoneId, zones, zonelight, zoneload } from '@/api/area'
// import { dtuList, addDTU, setDTU, dtuOne, dtuload, removeDTU } from '@/api/dtu'
export default {
  data () {
    return {
      setForm: {
      },
      project: {
        name: ''
      },
      activeName: 'first',
      project_dialog: false,
      val: '',
      progress: 0, // 进度条
      timer: '', // 计时器
      read: false,
      isShow: 0,
      options: [],
      value: '',
      client: {},
      clientId: '',
      zone: {},
      pjtree: {},
      open: '',
      close: '',
      rtuUpdata: false,
      sendList: {},
      text: false,
      rtuData: null,
      isClear: 0,
      clearLoadialog: true,
      rtuName: ''
    }
  },
  computed: {
    num () {
      return this.$store.state.GPSmap.projectList
    },
    dtuLight () {
      return this.$store.state.GPSmap.dtu_detail
    }
    // rtuLight () {
    //   return this.rtuData
    // }

  },
  watch: {
    '$store.state.project.projectId': {
      deep: true,
      handler: function (newValue, oldValue) {
        if (newValue !== oldValue) {
          this.searchChange()
        }
      }
    },
    pjtree: {
      handler (newVal, endVal) {
        if (newVal) {
          // let
          // for (let i = 0; i < newVal.rtuList.length; i++) {
          //   if (newVal.rtuList[i].net === 0 && newVal.rtuList[i].current !== 0) {
          //     console.log(newVal.rtuList[i])
          //   } else {

          //   }
          // }
          // this.$store.commit('PROJECT_TREE', res.result)
          let data = this.$store.state.GPSmap.projectList
          let open = 0
          let close = 0
          // newVal.rtuList.map(rtu => {
          //   if (rtu.length > 0) {
          //     rtu.map(rtuVal => {
          //       if (rtuVal) {
          //         if (rtuVal.net === 0 && rtuVal.current !== 0) {
          //           open++
          //           console.log(open)
          //           // rtuVal.net = true
          //         } else if (rtuVal.net === 0) {
          //           close++
          //         }
          //       }
          //     })
          //   }
          // })
          data.dtuList.map((dtu, dtuIndex) => {
            if (dtu.rtuList) {
              dtu.rtuList.map((rtu, rtuIndex) => {
                if (rtu) {
                  if (rtu.net === 0 && rtu.current !== 0) {
                    open++
                    // rtu.net = true
                  } else if (rtu.net === 0) {
                    close++
                  }
                }
                // })
                // }
              })
            }
          })
          this.open = open
          this.close = close
        }
      },
      deep: true
    },
    sendList: {
      handler (newVal, endVal) {
        console.log(endVal)
        console.log(newVal, endVal)
        if (newVal && newVal.length !== 0) {
          console.log(newVal)
          console.log(endVal)
          if (newVal[0].state === 2) {
            this.rtuUpdata = true
            console.log(333333333333333333)
          } else {
            this.text = false
            // this.rtuUpdata = false
          }
        }
      },
      deep: true
      // immediate: true
    },
    rtuData: {
      handler (newVal, endVal) {
        console.log(123)
        console.log(endVal)
        if (newVal) {
          if (newVal.state === 2 && endVal.state !== 2) {
            // this.rtuUpdata = true
          } else if (newVal.state === 2 && endVal.state === 2) {
            // this.rtuUpdata = false
          } else {
            console.log(newVal)
            for (let i = 0; i < newVal.length; i++) {
              let warn = newVal[i].warn
              if (newVal[i].warn === 0) {
                newVal[i].warn = 0
              } else if (warn & (1 << 0)) {
                newVal[i].warn = 1
              } else if (warn & (1 << 1)) {
                newVal[i].warn = 2
              } else if (warn & (1 << 2)) {
                newVal[i].warn = 3
              } else if (warn & (1 << 3)) {
                newVal[i].warn = 4
              } else if (warn & (1 << 4)) {
                newVal[i].warn = 5
              } else if (warn & (1 << 5)) {
                newVal[i].warn = 6
              } else if (warn & (1 << 6)) {
                newVal[i].warn = 7
              } else if (warn & (1 << 9)) {
                newVal[i].warn = 8
              } else if (warn & (1 << 10)) {
                newVal[i].warn = 9
              } else if (warn & (1 << 11)) {
                newVal[i].warn = 10
              } else if (warn & (1 << 12)) {
                newVal[i].warn = 11
              } else if (warn & (1 << 14)) {
                newVal[i].warn = 12
              }
            }
            return newVal
          }
        }
      },
      deep: true
    }
  },
  created () {

  },
  mounted () {
    let str = String(Math.round((Math.random() * 10) + 1))
    let data = {
      userId: this.$store.state.user.nomouser._id,
      rand: str
    }
    ProjectList(data).then(res => {
      this.options = res.result
      // this.$store.commit('PROJECT_ID', this.options)
      this.searchChange()
    }).catch(err => {
      console.log(err)
    })
    // this.removeDtu()删除
    // this.mqttFunstion()
  },
  methods: {
    // 点击项目
    projectClick () {
      this.project_dialog = true
    },
    // 修改
    // handerClickSet () {
    //   this.$store.state.GPSmap.dtu_light = false
    // },
    // // 读取
    // readClick () {
    //   this.read = true
    //   let _that = this
    //   this.timer = setInterval(function () {
    //     _that.progress += 5
    //     console.log(_that.progress)
    //     if (_that.progress >= 100) {
    //       clearInterval(_that.timer)
    //     }
    //   }, 100)
    // },
    searchChange (val) {
      let data = {
        r: Math.ceil(Math.random() * 10),
        projectId: this.$store.state.project.projectId
      }
      getProjectTreeBypId(data).then(res => {
        console.log(res)
        let rtuAll = []
        if (res.httpCode !== 0) {
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
            _id: this.$store.state.project.projectId
          }
          let data = res.result
          let dtuList = data.dtuList
          for (let index = 0; index < dtuList.length; index++) {
            let dtu = dtuList[index]
            pjtree.dtuList.push({ type: 'dtu', net: 1, rtuoffline: 0, rtuonline: 0, lighton: 0, lightoff: 0, tel: dtu.tel })
            console.log(dtu.rtuList)
            let rtuArr = []
            if (dtu.rtuList !== null) {
              for (let i = 0; i < dtu.rtuList.length; i++) {
                let rtu = dtu.rtuList[i]
                rtu.dtuIndex = index
                rtu.net = 1
                rtuArr.push(rtu)
                pjtree.rtuList.push(rtu)
              }
            } else {
              rtuArr.push()
            }
            rtuAll.push(rtuArr)

            if (dtu.zoneList) {
              // 如果是在分组内则赋予分组号
              let zoneList = dtu.zoneList ? dtu.zoneList : []
              for (let zone_index = 0; zone_index < zoneList.length; zone_index++) {
                let zone = zoneList[zone_index]
                let rtuList = zone.rtuList ? zone.rtuList : []
                // pjtree.zoneList = rtuList

                // if(rtuList.length>0){
                // }
                // pjtree.zoneList.push({})
                for (let rtu_index = 0; rtu_index < rtuList.length; rtu_index++) {
                  let rtu = rtuList[rtu_index]
                  for (let i = 0; i < pjtree.rtuList.length; i++) {
                    if (pjtree.rtuList[i].uid == rtu.uid) {
                      pjtree.rtuList[i].zoneno = zone.no
                      // rtu.net = pjtree.rtuList[i].net
                      // console.log(pjtree.zoneList[rtu_index])
                      // pjtree.zoneList[rtu_index].push(pjtree.rtuList[i])
                      console.log(pjtree.rtuList[i])
                      break
                    }
                  }
                }
              }
            }
          }
          console.log(res)
          connect(pjtree, function (res) {
          })
          // let allRes
          for (let i = 0; i < res.result.dtuList.length; i++) {
            res.result.dtuList[i].rtuList = rtuAll[i]
          }
          console.log(res)
          this.$store.commit('PROJECT_TREE', res.result)
          // 获取地图上项目的坐标
          ProjectDetail(this.$store.state.project.projectId).then(val => {
            console.log(val)
            this.$store.commit('center', val)
            this.project.name = val.name
            this.$parent.initMap()
          }).catch(err => {
            console.log(err)
          })
          console.log(pjtree)
          this.pjtree = pjtree
        } else {
          this.$store.commit('PROJECT_TREE', [])
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // DTU亮灯弹框
    DTU_light (val, index) {
      this.$store.commit('DTUTEL', val)

      val.index = index
      // dtu信息
      // this.dtuLight = val
      this.isDTU_light = true
      this.$store.commit('SET_LIGHT', val)
      this.$store.commit('DTUTEL', val)

      // console.log(val)
      // this.dtuLight = val
      // this.$store.state.GPSmap.dtu_light = true

      // let data = {
      //   r: Math.ceil(Math.random() * 10),
      //   id: val._id
      // }
      // dtuOne(data).then(res => {
      //   // console.log(res)
      //   this.mq(res)
      //   this.dtuLight = res
      //   this.$store.state.GPSmap.dtu_light = true
      // }
      // ).catch(err => {
      //   console.log(err)
      // })
    },
    // 地区亮灯弹框
    areaLight (item, dtuIndex, dtuTel) {
      this.$store.commit('DTUTEL', dtuTel)

      this.zone = item
      this.zone.dtuIndex = dtuIndex
      this.read = true
    },
    // 路灯弹框
    lightClick (dtuVal, val, rtuIndex, dtuIndex) {
      this.$store.commit('DTUTEL', dtuVal)
      this.rtuName = val.name
      if (val.clear === 1) {
        this.isClear = 1
      }
      let data = {
        dtuIndex: dtuIndex,
        index: rtuIndex,
        dtuName: dtuVal.name,
        ...val
      }
      this.$store.commit('GPS_LIGHT', data)

      let obj = {}
      obj.type = 'rtu'
      obj.dtuIndex = dtuIndex
      obj.rtuIndex = rtuIndex
      obj.uid = val.uid
      let _this = this
      let list = mstart_send(obj, { action: 'realtime' }, (rtuIndex, lightdata) => {
        console.log('_________________1rtu________')
        console.log(lightdata)
        console.log('_________________1rtu________')
        this.rtuData = lightdata
      })
      console.log(list)
      this.sendlist = list
      console.log(this.sendlist)
    },
    // 获取项目信息
    getProject () {
      let str = String(Math.round((Math.random() * 10) + 1))
      let data = {
        userId: this.$store.state.user.nomouser._id,
        r: str
      }
      ProjectList(data).then(res => {
        res.filter(item => {
          let data = {
            value: item._id,
            label: item.name
          }
          this.options.push(data)
        })
        // this.$store.commit('LIST_DATA', this.options)
      }).catch(err => {
        console.log(err)
      })
    },
    // 开灯
    lighton (type) {
      console.log(this.dtuLight)
      let obj
      let action = 'switch'
      if (type == 'RTU') {
        let rtu = this.$store.state.GPSmap.rtu_detail
        obj = { type: rtu.type, dtuIndex: rtu.dtuIndex, uid: rtu.uid, rtuIndex: rtu.rtuIndex }
      } else if (type == 'DTU') {
        obj = {
          type: 'devgroup',
          dtuIndex: this.dtuLight.index,
          tel: this.dtuLight.tel
        }
      } else if (type == 'zone') {
        obj = {
          type: 'zone',
          dtuIndex: this.zone.dtuIndex,
          no: this.zone.no
        }
      } else {
        obj = {
          type: 'project'
          // dtuIndex: this.zone.dtuIndex,
          // no: this.zone.no
          // tel: this.dtuLight.tel
        }
      }

      console.log('--------------obj-----------------')
      console.log(obj)
      console.log('----------------------------------')
      var data = {
        action: action,
        sw: 1,
        light: this.progress > 0 ? this.progress : 50,
        duration: Number(this.val) > 0 ? Number(this.val) : 20
      }
      let sendlist = mstart_send(obj, data, function (index, state, dtuIndex) {

      })
      this.sendList = sendlist
      console.log(sendlist)
      // if (sendlist.state == 2) {
      //   this.rtuUpdata = true
      // }
    },
    // 关灯
    lightoff (type) {
      let obj = {}
      let action = 'switch'
      if (type == 'RTU') {
        let rtu = this.$store.state.GPSmap.rtu_detail
        obj = { type: rtu.type, dtuIndex: rtu.dtuIndex, uid: rtu.uid, rtuIndex: rtu.rtuIndex }
      } else if (type == 'DTU') {
        obj = {
          type: 'devgroup',
          dtuIndex: this.dtuLight.index,
          tel: this.dtuLight.tel
        }
      } else if (type == 'zone') {
        obj = {
          type: 'zone',
          dtuIndex: this.zone.dtuIndex,
          no: this.zone.no
        }
      } else {
        obj = {
          type: 'project'
          // dtuIndex: this.zone.dtuIndex,
          // no: this.zone.no
          // tel: this.dtuLight.tel
        }
        action = 'bswitch'
      }
      var data = {
        action: action,
        sw: 0,
        light: this.progress > 0 ? this.progress : 50,
        duration: Number(this.val) > 0 ? Number(this.val) : 20
      }
      let sendlist = mstart_send(obj, data, function (index, state, dtuIndex) {
      })
      this.sendList = sendlist
    },
    // 自动
    auto (type) {
      let obj = {}
      let sw = 0
      let action = 'switch'
      if (type == 'RTU') {
        let rtu = this.$store.state.GPSmap.rtu_detail
        obj = { type: rtu.type, dtuIndex: rtu.dtuIndex, uid: rtu.uid, rtuIndex: rtu.rtuIndex }
      } else if (type == 'DTU') {
        obj = {
          type: 'devgroup',
          dtuIndex: this.dtuLight.index,
          tel: this.dtuLight.tel
        }
      } else if (type == 'zone') {
        obj = {
          type: 'zone',
          dtuIndex: this.zone.dtuIndex,
          no: this.zone.no
        }
      } else {
        obj = {
          type: 'project'
          // dtuIndex: this.dtuLight.index,
          // tel: this.dtuLight.tel
        }
        // sw = 1
      }
      let data = { action: action, sw: sw, duration: Number(this.val) > 0 ? Number(this.val) : 20, light: this.progress > 0 ? this.progress : 255 }
      let sendlist = mstart_send(obj, data, function (index, state, dtuIndex) {
      })
      this.sendList = sendlist
    },
    // 调光
    Dimming (type) {
      let obj = {}
      if (type == 'RTU') {
        let rtu = this.$store.state.GPSmap.rtu_detail
        obj = { type: rtu.type, dtuIndex: rtu.dtuIndex, uid: rtu.uid, rtuIndex: rtu.rtuIndex }
      } else if (type == 'DTU') {
        obj = {
          type: 'devgroup',
          dtuIndex: this.dtuLight.index,
          tel: this.dtuLight.tel
        }
      } else if (type == 'zone') {
        obj = {
          type: 'zone',
          dtuIndex: this.zone.dtuIndex,
          no: this.zone.no
        }
      } else {
        obj = {
          type: 'project'
          // dtuIndex: this.zone.dtuIndex,
          // no: this.zone.no
          // tel: this.dtuLight.tel
        }
      }
      let data = { action: 'light', sw: 1, time: this.val > 0 ? this.val : 20, light: this.progress > 0 ? this.progress : 50 }
      let list = mstart_send(obj, data, function (index, state, dtuIndex) {
      })
      this.sendList = list
    },
    // 清扫
    allClear (type) {
      console.log(this.sendList)
      let obj
      console.log(this.dtuLight.index)
      if (type == 'dtu') {
        console.log(type)
        obj = {
          type: 'devgroup',
          dtuIndex: this.dtuLight.index,
          tel: this.dtuLight.tel
        }
      } else
      if (type == 'rtu') {
        let rtu = this.$store.state.GPSmap.rtu_detail
        obj = { type: rtu.type, dtuIndex: rtu.dtuIndex, uid: rtu.uid, rtuIndex: rtu.rtuIndex }
      } else {
        obj = {
          type: 'project'
          // dtuIndex: this.zone.dtuIndex,
          // no: this.zone.no
          // tel: this.dtuLight.tel
        }
      }
      let data = {
        action: 'clear',
        sw: 3,
        light: 50
      }
      console.log(obj)
      let sendlist = mstart_send(obj, data, function (index, state, dtuIndex) {
        console.log(index)
        console.log(state)
        console.log(dtuIndex)
      })
      this.sendList = sendlist
      console.log(this.sendList)
    },
    // 查看清扫状态
    clearStatus (val) {
      this.clearLoadialog = true
      let obj = {}
      let rtu = this.$store.state.GPSmap.rtu_detail
      obj = { type: rtu.type, dtuIndex: rtu.dtuIndex, uid: rtu.uid, rtuIndex: rtu.rtuIndex }
      // obj.rtuID = rtu._id
      let data = {
        action: 'queryClearState'
      }

      let sendlist = mstart_send(obj, data, function (index, state, dtuIndex) {
        console.log(index)
        console.log(state)
        console.log(dtuIndex)
      })
      this.sendList = sendlist
    },
    // 设备权限释放
    rtuUpdataClick () {
      this.text = true
      if (this.sendList[0].state === 1 || this.sendList[0].state === 3) {
        this.rtuUpdata = false
      } else {
        adminReleaseControl(this.$store.state.project.dtuTel)
      }
      // this.rtuUpdata = false
    },
    clickback () {
      this.rtuUpdata = false
      // this.sendlist = {state: 0}
      // unsubscribe(this.$store.state.project.dtuTel)
    }

  }
}
</script>

<style lang="scss" scoped>
.nav_tree {
  position: relative;
  top: 0;
  min-width: 330px;
  background: #0f1843;
  height: 100%;
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

  font-size: 12px;
  line-height: 12px;
  box-sizing: border-box;
  border-radius: 0 0 5px 5px;
  overflow: hidden;
  color: #b5bcc2;
  .el-submenu__title {
    color: #b5bcc2;
  }
  ul {
    background: #0f1843;
  }
  span {
    color: #b5bcc2;
  }
}
.boxTree {
  margin-top: 10px;
  padding-right: 40px;
  padding-left: 50px;
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
  border: 0;
  height: 75%;
}
// .scroll {
//   overflow-y: scroll;
// }

.nav-bottom {
  position: absolute;
  bottom: 0;
  font-size: 16px;
  line-height: 20px;
  // height: 100px;
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
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
// // dtu弹框样式
// .dialog-box {
//   line-height: 20px;
// }
.Dtu_box_top {
  font-size: 14px;
  display: flex;
  p {
    margin-right: 40px;
  }
}
.state_img {
  display: flex;
  align-items: center;
  padding-bottom: 30px;
  border-bottom: 1px solid #eee;
}
.light_btn {
  display: flex;
  margin-top: 30px;
  .btn-light-box {
    width: 320px;
    float: right;
    div {
      line-height: 50px;
    }
  }
}
.DTU_img {
  margin-right: 10px;
  text-align: center;
}

.adjust-box {
  display: flex;
  line-height: 20px;
  border-bottom: 1px solid #eeeeee;
  justify-content: space-between;
}
.el-button {
  margin-bottom: 20px;
}
.light_img {
  text-align: center;
}
.light_img img {
  width: 400px;
  height: 250px;
}
.light_btn_box {
  display: flex;
}
// 状态颜色
.imgBg {
  width: 10px;
  height: 10px;
  background: rgb(246, 142, 86);
  display: inline-block;
  border-radius: 50%;
  margin: 10px;
}
.online {
  background: rgb(0, 246, 255);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 10px;
  display: inline-block;
}
.updata_box {
  margin-top: 10px;
  width: 90%;
  height: 30px;
  margin-top: 5px;
  margin-left: 20px;
  border-radius: 3px;
  background: -webkit-linear-gradient(left, red, blue); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, red, blue); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, red, blue); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    to right,
    rgba(255, 0, 0, 0.4),
    rgba(0, 0, 255, 0.5),
    rgba(255, 0, 0, 0.4)
  ); /* 标准的语法（必须放在最后） */
  -webkit-animation: back-animation 10s infinite linear;
  @-webkit-keyframes back-animation {
    from {
      background-position-x: 0px;
    }
    to {
      background-position-x: 600px;
    }
  }
}
.clear_Status {
  .top{
    p{
      span{
        color: #000;
      }
    }
  }
}
</style>
<style lang="scss">
/* //hover事件 */

.nav-box .el-menu-item:focus,
.el-menu-item:hover {
  color: #409eff;
}
// 点击后的颜色
.nav_tree .el-menu-item.is-active {
  color: #409eff;
}
.el-input--mini .el-input__inner {
  background: transparent;
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
// .dialog-light {
//   .el-tabs--top.el-tabs--border-card
//     > .el-tabs__header
//     .el-tabs__item:last-child {
//     background: #5bc0de;
//   }
//   .el-dialog__header {
//     display: none;
//   }
//   .el-dialog__body {
//     padding: 0;
//   }
//   .el-tabs__nav-scroll {
//     background: #5bc0de;
//     color: #fff;
//     .is-active {
//       border: 0;
//     }
//     .el-tabs__item {
//       color: #fff;
//     }
//   }
// }
.el-dialog .el-dialog__body {
  // max-width: 520px;
  // min-width: 520px;
  flex: 1;
  overflow: auto;
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
.el-submenu__title {
  line-height: 20px;
  height: 100%;
}
.dialog-box .el-dialog {
  // max-width: 520px;
  // min-width: 520px;
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*height:600px;*/
  max-height: calc(70%);
  max-width: calc(40%);
  min-width: calc(30%);
  .el-dialog__header {
    background: #65cea7;
    span {
      color: #535351;
      font-weight: 700;
    }
  }
}
.boxTree .el-menu-item,
.nav-top {
  display: flex;
  align-items: center;
  padding: 0 20px;
  span {
    // width: 60px;
  }
  .el-select {
    width: 150px;
  }
  .el-input--mini .el-input__inner {
    background: transparent;
  }
}
.boxTree .el-menu-item,
.el-submenu__title {
  line-height: 27px;
  height: 100%;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-submenu__title {
  color: #fff;
}
.btn-light-box {
  .el-input {
    width: 150px;
  }
  .el-input__inner {
    width: 150px;
  }
  .el-checkbox__inner {
    border: 1px solid #333;
  }
}
</style>
