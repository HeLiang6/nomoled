<template>
  <div class="nav_tree">
    <div class="nav-top">
      <span>{{$t('tips.Current_project')}}</span>
      <el-select
        v-model="$store.state.wifi.projectId"
        :placeholder="$t('tips.please')"
        size="mini"
        @change="cameraList"
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
      <h3 class="title"><i class="iconfont icon-wenjianjia"></i>
        <el-popover
          placement="right"
          width="100"
          trigger="click"
        >
          <ul class="DTU_Box">

            <li @click="addWifiClick">
              {{$t('camera.add')}}
            </li>
          </ul>
          <p slot="reference">{{this.label}}</p>
        </el-popover>

      </h3>
      <el-menu class="el-menu-vertical-demo boxTree">
        <el-submenu
          v-for="(item,index) in dtuData"
          :key="index"
          :index="String(index)"
        >
          <span slot="title">{{item.name}}</span>
          <el-menu-item :index="item._id+1111">
            <template slot="title">
              <span @click="setClick(item)">
                {{$t('mapBox.modification')}}
              </span>
            </template>
          </el-menu-item>
          <el-menu-item :index="item._id+2222">
            <template slot="title">
              <span @click="deteleClick(item)">
                {{$t('project_list.delete')}}
              </span>
            </template>
          </el-menu-item>

        </el-submenu>
      </el-menu>
      <el-dialog
        :visible.sync="cameraFlag"
        width="50%"
        class="wifiBox"
        :modal='false'
        :close-on-click-modal="false"
        :modal-append-to-body='false'
        :append-to-body='false'
      >
        <el-form
          ref="addForm"
          :model="camera"
          label-width="80px"
        >
          <el-form-item label="活动名称">
            <el-input v-model="camera.name"></el-input>
          </el-form-item>
          <el-form-item label="经度">
            <el-input v-model="camera.longitude"></el-input>
          </el-form-item>
          <el-form-item label="纬度">
            <el-input v-model="camera.latitude"></el-input>
          </el-form-item>
          <el-form-item label="uid">
            <el-input v-model="camera.dtuid"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="camera.description"></el-input>
          </el-form-item>
          <el-form-item
            v-if="platfromFlag"
            label="接入平台"
          >
            <el-radio-group v-model="camera.platform">
              <el-radio :label='1'>萤石云设置</el-radio>
              <el-radio :label='0'>nomovms</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="!platfromFlag"
            label="接入平台"
          >
            <el-radio-group v-model="camera.platform">
              <el-radio
                disabled
                :label='1'
              >萤石云设置</el-radio>
              <el-radio
                disabled
                :label='0'
              >nomovms</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="设备序列号">
            <el-input v-model="camera.deviceId"></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="camera.verification"></el-input>
          </el-form-item>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="cameraFlag = false">取 消</el-button>
          <el-button @click="setcamera">修改</el-button>
          <el-button
            type="primary"
            @click="addClickWifi"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { ProjectList } from '@/api/project'
import { getTemplateListByProjectId } from '@/api/streetLamp'
import { camerasvrbyrootId, camerasvr, setCameras, camerasDetail, getToken } from '@/api/camera'

export default {
  data () {
    return {
      setForm: {
      },
      cameraFlag: false,
      label: '',
      isSetData: false,
      read: false,
      isShow: 0,
      options: [],
      dtuData: [],
      activeVal: -1,
      active: 'active',
      camera: {
      },
      platfromFlag: true
    }
  },
  mounted () {
    this.getProject()
  },
  methods: {
    // 获取路灯模板列表
    light_template () {
      let data = {
        projectId: this.$store.state.task.projectId,
        rand: Math.ceil(Math.random() * 10)
      }
      getTemplateListByProjectId(data).then(res => {
        console.log(res)
        this.$store.commit('LIGHT_TEMPLATE', res)
      })
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
        this.$store.commit('PROJECT_LIST', this.options)
        console.log(this.options)
        this.cameraList()
        this.projectName()
      }).catch(err => {
        console.log(err)
      })
    },
    // 项目名
    projectName () {
      let label = this.options.filter(item => {
        if (item.value === this.$store.state.wifi.projectId) {
          return item
        }
      })
      this.label = label[0].label
      console.log(this.label)
    },
    // 获取项目下所有摄像头
    cameraList () {
      let data = {
        rand: String(Math.round((Math.random() * 10) + 1)),
        projectId: this.$store.state.wifi.projectId
      }
      camerasvrbyrootId(data).then(res => {
        console.log(res)
        this.dtuData = res
        // this.projectName()
      }).catch(err => {
        console.log(err)
      })
    },
    handerClick (val, id) {
    },
    // 创建摄像头
    addWifiClick () {
      this.camera = {}
      this.cameraFlag = true

      if (this.$refs.addForm) {
        console.log(1)
        this.$refs['addForm'].resetFields()
      }
    },
    // 修改摄像头
    setClick (val) {
      console.log(val)
      this.cameraFlag = true
      let data = {
        cameraId: val._id,
        rand: Math.ceil(Math.random() * 10)
      }
      getToken(data).then(res => {
        console.log(res)
        this.camera = res
      })
    },
    //
    setcamera () {
      this.camera.cameraId = this.camera._id
      setCameras(this.camera).then(res => {
        console.log(res)
        this.cameraFlag = false
        this.cameraList()
      })
    },
    // 创建环境监测
    addClickWifi () {
      this.camera.rootId = this.$store.state.wifi.projectId
      this.camera.type = 'camera'
      camerasvr(this.camera).then(res => {
        console.log(res)
        this.cameraFlag = false
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除
    deteleClick (val) {
      this.$confirm(this.$t('hint.hint_message'), this.$t('hint.prompt'), {
        confirmButtonText: this.$t('search.confirm'),
        cancelButtonText: this.$t('search.cancel'),
        type: 'warning'
      }).then(() => {
        let data = {
          cameraId: val._id,
          rand: Math.ceil(Math.random() * 10)
        }
        camerasDetail(data).then(res => {
          console.log(res)
          this.cameraList()
        })
      }).catch(() => {
        this.$message.closeAll()
        this.$message({
          type: 'info',
          message: this.$t('hint.info')
        })
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.nav_tree {
  position: relative;
  padding-top: 20px;
  max-width: 250px;
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
.boxTree {
  padding-right: 20px;
  // padding-left: 50px;
  padding-top: 10px;
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
</style>
