<template>
  <div class="nav_tree">
    <div class="nav-top">
      <span>{{$t('tips.Current_project')}}:</span>
      <el-select
        v-model="value"
        :placeholder="$t('tips.please')"
        size="mini"
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
    <el-menu class="el-menu-vertical-demo boxTree">
      <el-submenu
        v-for="(item,index) in num"
        :key="index"
        :index="String(index)"
      >
        <template slot="title">
          <span>{{item.name}}</span>
        </template>
        <el-submenu :index='item._id'>
          <template slot="title">123</template>
          <el-submenu
            v-for="(item2,index2) in item.rtuList"
            :key="index2"
            :index="item2._id"
          >
            <!-- <el-submenu :index="item2._id"> -->
            <template slot="title"><span>{{item2.name}}</span></template>
            <el-menu-item :index="item2._id+'141'">
              <template>
                <span
                  @click="setData(item2)"
                  slot="title"
                >
                  参数修改
                </span>
              </template>
            </el-menu-item>
            <el-menu-item :index="item2._id+'142'">
              <template slot="title">
                <span @click="readClick">
                  读取配置
                </span>
              </template>
            </el-menu-item>
            <el-menu-item :index="item2._id+'143'">
              <template slot="title"><span>更新路灯终端</span></template>
            </el-menu-item>
            <el-menu-item :index="item2._id+'144'">
              <template slot="title"><span>获取控制器版本</span></template>
            </el-menu-item>
            <el-menu-item :index="item2._id+'145'">
              <template slot="title"><span>{{$t('delete')}}</span></template>
            </el-menu-item>
            <!-- </el-submenu> -->
            <!-- <el-submenu :index="item2._id">
              <el-menu-item>
                <p>参数获取</p>
                <p>读取配置</p>
                <p>更新路灯终端</p>
                <p>获取控制器版本</p>
                <p>删除</p>
              </el-menu-item>
            </el-submenu> -->
          </el-submenu>
        </el-submenu>
        <el-submenu
          :index="item3._id"
          v-for="(item3,index3) in item.zoneList"
          :key="index3"
        >
          <template slot="title">{{item3.name}}</template>
          <el-menu-item
            :index="item4._id"
            v-for="(item4,index4) in item3.rtuList"
            :key="index4"
          >{{item4.name}}</el-menu-item>
        </el-submenu>
      </el-submenu>
      <!-- <el-submenu index='3'>
        <template slot="title">
          <span>
            摄像头
          </span>
        </template>
        <el-menu-item
          v-for="(item,index) in monitorList"
          :key="index"
        >{{item.name}}</el-menu-item>
      </el-submenu>
      <el-submenu index='4'>
        <template slot="title">
          <span>
            wifi
          </span>
        </template>
        <el-menu-item
          v-for="(item,index) in wifiList"
          :key="index"
        >{{item.name}}</el-menu-item>
      </el-submenu>
      <el-submenu index='5'>
        <template slot="title">
          <span>
            充电桩
          </span>
        </template>
        <el-menu-item
          v-for="(item,index) in chargeList"
          :key="index"
        >{{item.name}}</el-menu-item>
      </el-submenu>
      <el-submenu index='6'>
        <template slot="title">
          <span>
            环境监测
          </span>
        </template>
        <el-menu-item
          v-for="(item,index) in billboardList"
          :key="index"
        >{{item.name}}</el-menu-item>
      </el-submenu> -->
    </el-menu>
    <div class="nav-bottom">
      <div>
        <p>{{$t('dtu')}}</p>
        <span class="status">
          【
          <img
            src="../../../static/images/well.png"
            alt=""
          >
          <span>:</span>
          <img
            src="../../../static/images/malfunction.png"
            alt=""
          >
          <span>:</span>
          】
        </span>
      </div>
      <div>
        <p>{{$t('rtu')}}</p>
        <span class="status"> 【
          <img
            src="../../../static/images/well.png"
            alt=""
          >
          <span>:</span>
          <img
            src="../../../static/images/malfunction.png"
            alt=""
          >
          <span>:</span>
          】
        </span>
      </div>
    </div>
    <!-- 修改 -->
    <div class="dialog-box">
      <el-dialog
        title="提示"
        id="box-dialog"
        :visible.sync="isSetData"
        width="100%"
        :modal='false'
        :close-on-click-modal="false"
        :modal-append-to-body='false'
        :append-to-body='false'
      >
        <el-form
          ref="form"
          :model="setForm"
          label-width="80px"
        >
          <el-form-item label="名称">
            <el-input v-model="$store.state.project.set_parameter.name"></el-input>
          </el-form-item>
          <el-form-item label="经度">
            <el-input v-model="$store.state.project.set_parameter.longitude"></el-input>
          </el-form-item>
          <el-form-item label="纬度">
            <el-input v-model="$store.state.project.set_parameter.latitude"></el-input>
          </el-form-item>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="isSetData = false">取 消</el-button>
          <el-button
            type="primary"
            @click="handerClickSet"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 读取 -->
    <el-dialog
      title="读取"
      :visible.sync="read"
      width="100%"
    >
      <el-progress
        :text-inside="true"
        :stroke-width="24"
        :percentage="progress"
        status="success"
      ></el-progress>
      <el-form
        ref="form"
        :model="setForm"
        label-width="80px"
      >
        <el-form-item label="名称">
          <el-input v-model="$store.state.project.set_parameter.name"></el-input>
        </el-form-item>
        <el-form-item label="经度">
          <el-input v-model="$store.state.project.set_parameter.longitude"></el-input>
        </el-form-item>
        <el-form-item label="纬度">
          <el-input v-model="$store.state.project.set_parameter.latitude"></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="read = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handerClickSet"
        >确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { ProjectList } from '@/api/project'
import { zoneone, zoneId, zones, zonelight, zoneload } from '@/api/area'
import { dtuList, addDTU, setDTU, dtuOne, dtuload, removeDTU } from '@/api/dtu'
export default {
  data () {
    return {
      setForm: {
      },
      progress: 0, // 进度条
      timer: '', // 计时器
      isSetData: false,
      read: false,
      isShow: 0,
      options: [],
      value: '',
      num: [
        {
          _id: '5f5ed963c987f0c826e9826b',
          name: 'DtuTest',
          latitude: 22.551878,
          longitude: 114.0643,
          rtuList: [
            {
              _id: '5f5ed9fec987f0c826e98270',
              name: 'lightTest0',
              latitude: 22.552345,
              longitude: 114.063546
            },
            {
              _id: '5f5edbdec987f0c826e98278',
              name: 'lightTest2',
              latitude: 22.552329,
              longitude: 114.063689
            },
            {
              _id: '5f5edbffc987f0c826e9827b',
              name: 'lightTest3',
              latitude: 22.552296,
              longitude: 114.064444
            }
          ],
          zoneList: [
            {
              _id: '5f5ed9a8c987f0c826e9826d',
              name: 'testArea',
              no: 1,
              rtuList: [
                {
                  _id: '5f5edbdec987f0c826e98278',
                  name: 'lightTest2',
                  latitude: 22.552329,
                  longitude: 114.063689
                },
                {
                  _id: '5f5edbffc987f0c826e9827b',
                  name: 'lightTest3',
                  latitude: 22.552296,
                  longitude: 114.064444
                }
              ]
            },
            {
              _id: '5f5edaa1c987f0c826e98273',
              name: 'testArea2',
              no: 2,
              rtuList: [
                {
                  _id: '5f5ed9fec987f0c826e98270',
                  name: 'lightTest0',
                  latitude: 22.552345,
                  longitude: 114.063546
                }
              ]
            }
          ]
        },
        {
          _id: '5f5edd7fc987f0c826e9828d',
          name: 'DtuTest_1',
          latitude: 22.550427,
          longitude: 114.062432,
          rtuList: [
            {
              _id: '5f5edf52c987f0c826e9829b',
              name: 'lightTest_1-01',
              latitude: 22.550293,
              longitude: 114.061533
            },
            {
              _id: '5f5edff4c987f0c826e982a0',
              name: 'lightTest_1-02',
              latitude: 22.55036,
              longitude: 114.06024
            }
          ],
          zoneList: null
        },
        {
          _id: '5f5ee071c987f0c826e982a5',
          name: 'DtuTest_3',
          latitude: 22.550393,
          longitude: 114.064695,
          rtuList: [
            {
              _id: '5f5ee108c987f0c826e982ad',
              name: 'lightTest_2-01',
              latitude: 22.55036,
              longitude: 114.064731
            },
            {
              _id: '5f5ee2b6c987f0c826e982b1',
              name: 'lightTest_2-02',
              latitude: 22.550393,
              longitude: 114.060707
            }
          ],
          zoneList: [
            {
              _id: '5f5ee297c987f0c826e982af',
              name: 'testArea_2-01',
              no: 0,
              rtuList: [
                {
                  _id: '5f5ee108c987f0c826e982ad',
                  name: 'lightTest_2-01',
                  latitude: 22.55036,
                  longitude: 114.064731
                }
              ]
            }
          ]
        }
      ]

    }
  },
  mounted () {
    this.getProject()
    this.zoneLoad()
    this.setDtuData()
    this.dtuDetail()
    this.setDTUData()
    // this.removeDtu()删除
  },
  methods: {
    // 修改
    setData (val) {
      this.isSetData = true
      this.$store.commit('SET_PARAMETER', val)
      this.setForm = val
    },
    handerClickSet () {
      this.isSetData = false
    },
    // 读取
    readClick () {
      this.read = true
      let _that = this
      this.timer = setInterval(function () {
        _that.progress += 5
        if (_that.progress >= 100) {
          clearInterval(_that.timer)
        }
      }, 100)
    },
    handleChange (val) {
      let str = String(Math.round((Math.random() * 10) + 1))
      let data = {
        rootId: '5f640b5e5d0a038d3d44e5d9',
        r: str
      }
      this.zonelist(data)
      this.DTUList(data)
      this.zoneNew(data)
      this.zoneLight(data)
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
    // 获取区域列表
    zonelist (val) {
      zoneId(val).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取区域详细信息
    zoneNew (val) {
      let data = {
        id: '5f641e555d0a038d3d44e607',
        r: val.r
      }
      zoneone(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 修改区域中的light属性
    zoneLight (val) {
      let data = {
        id: '5f641e555d0a038d3d44e607',
        r: val.r,
        light: '66'
      }
      zonelight(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 修改区域的亮灯参数并修改属下RTU
    zoneLoad () {
      let data = {
        id: '5f640b755d0a038d3d44e5db',
        r: '1',
        rtus: ['5f64108e5d0a038d3d44e5e2'],
        typeId: '585a1c8bd0968b0c049389c0',
        zoneparams: {
          mode: 0,
          current: 600,
          time1: 3,
          light1: 100,
          induction1: 100,
          time2: 3,
          light2: 50,
          induction2: 50,
          induction3: 30,
          induction4: 100,
          induction5: 100,
          light3: 30,
          light4: 100,
          light5: 100,
          menlight: 100,
          mlight: 100,
          mtime: 3,
          nomenlight: 100,
          sensortime: 3,
          time3: 3,
          time4: 3,
          time5: 3
        }
      }
      zoneload(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取项目下所有DTU
    DTUList (val) {
      val.rootId = '5f6304ce5d0a038d3d44e4ab'
      dtuList(val).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 创建DTU
    addDtu () {
      addDTU(this.addDTU).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 修改DTU
    setDtuData () {
      let data = {
        conditionstate: 0,
        configstate: 0,
        daysolar: 0,
        descripiton: '',
        latitude: '22.732018',
        light: 0,
        longitude: '113.784976',
        monthsolar: 0,
        name: 'Dtu',
        params: { mode: 0, current: 600, time1: 3, light1: 100, induction1: 100, time2: 3, light2: 50, induction2: 50 },
        phoneNo: 'EC9F0D6866A1',
        poll: '60',
        rootId: '5badc4b125bf6ae229195954',
        sendtime: '30',
        state: 0,
        tel: 'EC9F0D6866A1',
        totalsolar: 0,
        type: 'dtu',
        typeId: '5c13b3ddab8553c35d6046b8',
        version: 1,
        __v: 0,
        _id: '5f5194045d0a038d3d44e262'
      }
      setDTU(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // DTU信息
    dtuDetail () {
      let data = {
        id: '5f640b5e5d0a038d3d44e5d9',
        r: 2
      }
      dtuOne(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 修改DTU的路灯参数以及属下区域、RTU的路灯参数
    setDTUData () {
      let data = {
        dtuparams: {
          current: 600,
          delaytime: 10,
          induction1: 100,
          induction2: 50,
          induction3: 30,
          induction4: 100,
          induction5: 100,
          light1: 100,
          light2: 50,
          light3: 30,
          light4: 100,
          light5: 100,
          menlight: 100,
          mlight: 100,
          mode: 0,
          mtime: 3,
          nomenlight: 100,
          sensortime: 3,
          time1: 3,
          time2: 3,
          time3: 3,
          time4: 3,
          time5: 3
        },
        id: '5f640b5e5d0a038d3d44e5d9',
        r: 0.9734269527105313,
        typeId: '58524387d0968b0c04938771'
      }
      dtuload(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除DTU
    removeDtu () {
      removeDTU('5f644da438ea9ef72ecae8e8').then(res => {
        console.log(res)
      }).then(err => {
        console.log(err)
      })
    },
    // 创建分组、区域
    handleNodeClick (val) {
      zones(this.addzone).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }

  },
  beforeDestroy () {
    //            清楚定时器
    clearInterval(this.timer)
  }

}
</script>

<style lang="scss" scoped>
.nav_tree {
  position: relative;
  padding-top: 20px;
  width: 282px;
  background: #0f1843;
  height: 100%;
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
  padding-right: 90px;
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
.boxTree .el-menu-item,
.el-submenu__title {
  line-height: 20px;
  height: 100%;
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
.dialog-box .el-dialog__wrapper {
  position: fixed;
  top: 50% !important;
  left: 50% !important;
  right: auto !important;
  bottom: auto !important;
  margin-left: -15%;
  margin-top: -15%;
  overflow: hidden;
  .el-dialog {
    margin: 0;
  }
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
    }
  }
}
</style>
