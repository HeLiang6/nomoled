<template>
  <div>
    <!--更新集中器 -->
    <div
      class="dialog-box"
      id="updateDialog"
    >
      <el-dialog
        :visible.sync="$store.state.project.isUpdate"
        width="500px"
        :title="$t('lightList.LampControl')"
        top="0"
        :modal='false'
      >
        <div class="top">
          <!-- <p>DTU:&nbsp&nbsp<span>{{$store.state.project.updata.name}}</span></p> -->
          <p>{{$t('warnList.status')}}:&nbsp&nbsp<span>
              <span v-if="$store.state.project.updata.state===0">获取权限中</span>
              <span v-if="$store.state.project.updata.state===1">已获得权限</span>
              <span v-if="$store.state.project.updata.state===2">获取权限失败</span>
              <span v-if="$store.state.project.updata.state===3">释放权限 </span>
            </span></p>
        </div>
        <!-- <div style="margin-top:10px;padding:0 20px;">
          <el-progress
            :text-inside="true"
            :stroke-width="24"
            :percentage="progress"
            status="success"
          ></el-progress>
        </div> -->
        <!-- 进度条 -->
        <div class="updata_box">

        </div>
        <div style="margin-top:20px;border:1px solid #eee;">
          <ul
            class="list"
            style="background:#fff;"
          >
            <li style="padding:0 10px;display:flex;font-weight:600;border-bottom:1px solid #eee;font-size:16px;line-height:24px">
              <span style="width:50px">No.</span>
              <span style="width:220px">RTU</span>
              <span style="width:140px">状态</span>
            </li>
            <li
              style="padding:0 10px;font-size:16px;line-height:24px"
              v-for="(item,index) in $store.state.project.updata.objs"
              :key="index"
            >
              <span style="width:50px">{{index}}</span>
              <span style="width:220px;display:inline-block;">{{$store.state.project.rtuData[index].name}}</span>
              <span style="width:140px">
                <span v-if="item.state===0">待发送</span>
                <span v-if="item.state===1">已发送</span>
                <span v-if="item.state===2">操作成功</span>
                <span v-if="item.state===3">操作失败</span>
              </span>
            </li>
          </ul>
        </div>
      </el-dialog>
    </div>
    <!-- 设备状态弹框 -->
    <div class="mqttStatus_box readDom">
      <el-dialog
        title="提示"
        :visible.sync="state_dialog"
        width="30%"
      >
        <span>{{$t('mqttStatus.release')}}</span>
        <div class="updata_box"></div>
        <span style="margin-top:10px;width:130px;">
          <span>{{$t(`mqttStatus.privilegeStatus[${$store.state.project.updata.state}]`)}}</span>
          <!--
          <span v-if="$store.state.project.updata.state===0">获取权限中</span>
          <span v-if="$store.state.project.updata.state===1">已获得权限</span>
          <span v-if="$store.state.project.updata.state===2">获取权限失败</span>
          <span v-if="$store.state.project.updata.state===3">释放权限 </span> -->
        </span>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="state_dialog = false">取 消</el-button>
          <el-button
            type="primary"
            @click="state_dialogClick"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import { adminReleaseControl } from '@/utils/command/websocket'

export default {
  data () {
    return {
      progress: 0,
      timer: '',
      state_dialog: false // 设备状态弹框

    }
  },
  props: ['data'],
  mounted () {
    // this.changeProgress()
    console.log(this.$store.state.project.updata)
  },
  // computed: {
  //   progress2 () {
  //     return this.$store.state.project.progress
  //   }
  // },
  watch: {
    '$store.state.project.updata.state': function (newVal, endVal) {
      console.log(newVal)
      console.log(endVal)
      if (newVal === 2) {
        this.state_dialog = true
      }
    }
  },
  methods: {
    state_dialogClick () {
      // this.state_dialog = false
      if (this.$store.state.project.updata.state == 1 && this.$store.state.project.updata.state == 3) {
        this.state_dialog = false
      } else {
        adminReleaseControl(this.$store.state.project.dtuTel)
      }
    }
  },
  beforeDestroy () {
    //            清楚定时器
    clearInterval(this.timer)
  }

}
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  p {
    font-size: 18px;
  }
}
.list {
  li {
    span {
      display: inline-block;
      text-align: center;
    }
  }
}
.updata_box {
  min-width: 340px;
  height: 30px;
  margin: 10px 20px;
  border-radius: 3px;
  background: -webkit-linear-gradient(left, red, blue); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, red, blue); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, red, blue); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    to right,
    rgba(255, 0, 0, 0.4),
    rgba(0, 0, 255, 0.5)
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
</style>

<style>
#updateDialog .el-dialog {
  max-height: 400px;
  overflow-y: auto;
}
#updateDialog .el-dialog {
  top: 25%;
  min-width: 400px;
}
#updateDialog .el-dialog__body {
  padding: 0;
}
#updateDialog .el-dialog__header {
  display: block;
  background: #65cea7;
}
.top {
  padding: 10px 20px;
}
.mqttStatus_box .el-dialog {
  min-width: 400px;
}
</style>
