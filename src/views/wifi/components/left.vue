<template>
  <div class="nav_tree">
    <div class="nav-top">
      <span>{{$t('tips.Current_project')}}</span>
      <el-select
        v-model="$store.state.wifi.projectId"
        :placeholder="$t('tips.please')"
        size="mini"
        @change="wifiList"
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
        class="title"
        @click="projectClick"
      ><i class="iconfont icon-wenjianjia"></i>
        <el-popover
          placement="right"
          width="100"
          trigger="click"
        >
          <ul class="DTU_Box">

            <li @click="addWifiClick">
              {{$t('wifi.add')}}
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
      <div class="wifiBox">

        <el-dialog
          :visible.sync="wifiFlag"
          width="50%"
          :modal='false'
          :close-on-click-modal="false"
          :modal-append-to-body='false'
          :append-to-body='false'
        >
          <el-form
            ref="addForm"
            :model="wifi"
            label-width="80px"
            :rules="rules"
          >
            <el-form-item
              prop="name"
              label="活动名称"
            >
              <el-input v-model="wifi.name"></el-input>
            </el-form-item>
            <el-form-item
              prop="longitude"
              label="经度"
            >
              <el-input v-model="wifi.longitude"></el-input>
            </el-form-item>
            <el-form-item
              prop="latitude"
              label="纬度"
            >
              <el-input v-model="wifi.latitude"></el-input>
            </el-form-item>
            <el-form-item
              prop="uid"
              label="uid"
            >
              <el-input v-model="wifi.uid"></el-input>
            </el-form-item>
            <el-form-item
              prop="switch"
              label="WIFI开关"
            >
              <el-radio-group v-model="wifi.switch">
                <el-radio :label="Number(0)">on</el-radio>
                <el-radio :label="Number(1)">off</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              prop="hide"
              label="是否隐藏"
            >
              <el-radio-group v-model="wifi.hide">
                <el-radio :label="Number(0)">yes</el-radio>
                <el-radio :label="Number(1)">no</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              prop="password"
              label="WIFI密码"
            >
              <el-input v-model="wifi.password"></el-input>
            </el-form-item>
            <el-form-item
              prop="nodeNum"
              label="节点数量"
            >
              <el-input v-model.number="wifi.nodeNum"></el-input>
            </el-form-item>
            <el-form-item
              prop="maxFlow"
              label="节点最大流量"
            >
              <el-input v-model.number="wifi.maxFlow"></el-input>
            </el-form-item>
            <el-form-item label="是否清空流量">
              <el-radio-group v-model="wifi.clearFlow">
                <el-radio :label="Number(0)">yes</el-radio>
                <el-radio :label="Number(1)">no</el-radio>
              </el-radio-group>
            </el-form-item>

          </el-form>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="wifiFlag = false">取 消</el-button>
            <el-button @click="setWifi">修改</el-button>
            <el-button
              type="primary"
              @click="addClickWifi"
            >确 定</el-button>
          </span>
        </el-dialog>
      </div>

    </div>
  </div>
</template>

<script>
import { ProjectList, ProjectDetail } from '@/api/project'
import { getTemplateListByProjectId } from '@/api/streetLamp'
import { wifi, addWifi, getWifi, amendWifi, deteleWifi } from '@/api/wifi'
export default {
  data () {
    return {
      setForm: {
      },
      wifiFlag: false,
      label: '',
      isSetData: false,
      read: false,
      isShow: 0,
      options: [],
      dtuData: [],
      activeVal: -1,
      active: 'active',
      wifi: {
      },
      rules: {
        name: [
          { required: true, message: this.$t('areaFrom.ipt_name'), trigger: 'blur' }
        ],
        longitude: [
          { required: true, message: this.$t('areaFrom.ipt_number'), trigger: 'blur' }
        ],
        latitude: [
          { required: true, message: this.$t('areaFrom.ipt_light'), trigger: 'blur' }
        ],
        uid: [
          { required: true, message: this.$t('areaFrom.ipt_type'), trigger: 'blur' }
        ],
        switch: [
          { required: true, message: this.$t('areaFrom.ipt_node'), trigger: 'blur' }
        ],
        hide: [
          { required: true, message: this.$t('areaFrom.ipt_time'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('areaFrom.ipt_time'), trigger: 'blur' }
        ],
        nodeNum: [
          { required: true, message: this.$t('areaFrom.ipt_time'), trigger: 'blur' }
        ],
        maxFlow: [
          { required: true, message: this.$t('areaFrom.ipt_time'), trigger: 'blur' }
        ],
        clearFlow: [
          { required: true, message: this.$t('areaFrom.ipt_time'), trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getProject()
  },
  methods: {

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
        this.wifiList()
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
    // 获取项目下所有wifi
    wifiList () {
      let data = {
        r: String(Math.round((Math.random() * 10) + 1)),
        projectId: this.$store.state.wifi.projectId
      }
      ProjectDetail(this.$store.state.wifi.projectId).then(res => {
        console.log(res)
        this.$store.commit('wifiMap_Center', res)
      }).catch(err => {
        console.log(err)
      })
      wifi(data).then(res => {
        console.log(res)
        this.dtuData = res
        this.$store.commit('wifiData', res)

        // this.projectName()
      }).catch(err => {
        console.log(err)
      })
    },
    handerClick (val, id) {
    },
    // 点击项目
    projectClick () {
      console.log(1)

      this.activeVal = -1
    },
    // 添加wifi
    addWifiClick () {
      this.wifiFlag = true

      if (this.$refs.addForm) {
        console.log(1)
        this.$refs['addForm'].resetFields()
      }
    },
    // 修改wifi
    setClick (val) {
      console.log(val)
      if (this.$refs.addForm) {
        this.$refs.addForm.resetFields()
      }
      this.wifiFlag = true
      let data = {
        wifiId: val._id,
        rand: Math.ceil(Math.random() * 10)
      }
      getWifi(data).then(res => {
        console.log(res)
        this.wifi = res
      })
    },
    //
    setWifi () {
      this.wifi.wifiId = this.wifi._id
      amendWifi(this.wifi).then(res => {
        console.log(res)
        this.$message({
          message: this.$t('stateMessage.alterSuccess'),
          type: 'success'
        })
        this.wifiList()
        this.wifiFlag = false
      })
    },
    // 添加wifi
    addClickWifi () {
      this.wifi.projectId = this.$store.state.wifi.projectId
      addWifi(this.wifi).then(res => {
        console.log(res)
        this.$message({
          message: this.$t('stateMessage.addSuccess'),
          type: 'success'
        })
        this.wifiList()

        this.wifiFlag = false
      }).catch(err => {
        console.log(err)
      })
    },
    deteleClick (val) {
      this.$confirm(this.$t('hint.hint_message'), this.$t('hint.prompt'), {
        confirmButtonText: this.$t('search.confirm'),
        cancelButtonText: this.$t('search.cancel'),
        type: 'warning'
      }).then(() => {
        let data = {
          wifiId: val._id,
          rand: Math.ceil(Math.random() * 10)
        }
        deteleWifi(data).then(res => {
          console.log(res)
          this.wifiList()
        })
      }).catch(() => {
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
  position: fixed;
  padding-top: 20px;
  max-width: 250px;
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
</style>
