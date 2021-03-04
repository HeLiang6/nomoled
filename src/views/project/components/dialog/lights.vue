<template>
  <div>
    <!--更新集中器 -->
    <div
      class="dialog-box"
      id="light_Dialog"
    >
      <el-dialog
        :visible.sync="$store.state.project.is_light"
        width="500px"
        :title="$t('lightList.LampControl')"
        top="0"
        :modal='false'
      >
        <div class="top">
          <p>DTU:&nbsp&nbsp<span>{{list.name}}</span></p>
          <p>{{$t('warnList.status')}}:&nbsp&nbsp<span>释放权限</span></p>
        </div>
        <!-- <div style="margin-top:10px;padding:0 20px;">
          <el-progress
            :text-inside="true"
            :stroke-width="24"
            :percentage="progress"
            status="success"
          ></el-progress>
        </div> -->

        <div style="margin-top:20px;border:1px solid #eee;">
          <el-table
            :data="list.rtuList"
            style="width: 100%"
          >
            <el-table-column
              type="index"
              width="50"
              label="No."
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="RTU"
              width="240"
            >
            </el-table-column>
            <el-table-column label="状态">
            </el-table-column>
          </el-table>
          <!-- <ul
            class="list"
            style="background:#fff;"
          >
            <li style="padding:0 10px;display:flex;font-weight:600;border-bottom:1px solid #eee;font-size:16px;line-height:24px">
              <span style="width:50px">No.</span>
              <span style="width:140px">RTU</span>
              <span style="width:140px">状态</span>
            </li>
            <li style="padding:0 10px;font-size:16px;line-height:24px">
              <span style="width:50px">1</span>
              <span style="width:140px">{{$store.state.project.updata.name}}</span>
              <span style="width:140px">操作成功</span>
            </li>
          </ul> -->
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      progress: 0,
      timer: '',
      list: {}
    }
  },
  mounted () {
    // this.changeProgress()
  },
  // computed: {
  //   progress2 () {
  //     return this.$store.state.project.progress
  //   }
  // },
  methods: {
    changeProgress (val) {
      this.progress = 0
      let _that = this
      this.timer = setInterval(function () {
        _that.progress += 5
        console.log(_that.progress)
        if (_that.progress >= 100) {
          clearInterval(_that.timer)
          _that.progress = 100
        }
      }, 100)
      this.list = val
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
</style>

<style lang='scss'>
#light_Dialog .el-dialog {
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
#light_Dialog .el-dialog {
  top: 25%;
}
#light_Dialog .el-dialog__body {
  padding: 0;
  max-height: 600px;
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
#light_Dialog .el-dialog__header {
  /* display: block; */
  background: #65cea7;
}
.top {
  padding: 10px 20px;
}
</style>
