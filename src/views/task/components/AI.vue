<template>
  <div class="configurationBox">

    <el-table
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      v-loading="$store.state.task.loading"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        prop="delaytime"
        align="center"
        :label="$t('lightList.name')"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="menlight"
        align="center"
        :label="$t('task.taskType')"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="nomenlight"
        align="center"
        :label="$t('task.dateZone')"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="mtime"
        align="center"
        :label="$t('task.carried_out')"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="mlightz`"
        align="center"
        :label="$t('task.last_time')"
        show-overflow-tooltip
      >
      </el-table-column>
    </el-table>
    <div style="display:flex;justify-content: space-between;">
      <div class="task_btn">
        <el-button
          type="success"
          plain
          @click="addClick"
        >添加</el-button>
        <el-button
          type="success"
          plain
          @click="removeClick"
        >删除</el-button>

        <el-button
          type="success"
          plain
          @click="setTaskClick"
        >编辑</el-button>
      </div>
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="$store.state.task.configurationList.length"
      >
      </el-pagination>

    </div>
    <!-- 添加 -->
    <el-dialog
      title="配置任务添加修改"
      :visible.sync="dialogVisible"
      width="30%"
      class="addbConfiguration"
    >
      <el-form :model="add">
        <el-form-item label="任务名称">
          <el-input
            v-model="add.name"
            placeholder=""
          ></el-input>
        </el-form-item>
        <el-form-item label="任务类型">
          <el-input
            v-model="add.name"
            placeholder=""
          ></el-input>
        </el-form-item>
        <el-form-item label="备电天数">
          <el-input
            v-model="add.name"
            placeholder=""
          ></el-input>
        </el-form-item>
        <el-form-item label="日期范围">
          <el-input
            v-model="add.name"
            placeholder=""
          ></el-input>
        </el-form-item>
        <el-form-item label="是否执行">
          <el-input
            v-model="add.name"
            placeholder=""
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          v-if="isflag"
          type="primary"
          @click="handerAddClick"
        >确 定</el-button>
        <el-button
          v-if="!isflag"
          type="primary"
          @click="changeClick"
        >修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addConfiguration, removeConfiguration } from '@/api/task'
import { log } from 'three'
export default {
  data () {
    return {
      restaurants: [],
      state1: '',
      val: [],
      isflag: '',
      dialogVisible: false,
      modeList: [
        {
          value: 0,
          label: '普通模式'
        },
        {
          value: 1,
          label: '延时感应模式'
        },
        {
          value: 2,
          label: '整晚感应模式'
        },
        {
          value: 3,
          label: '晨亮模式'
        }
      ],
      concurrentPage: 1,
      list: [],
      visible: false, // 删除提示框
      add: {

      }
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    handleSelectionChange (val) {
      this.val = val
      console.log(this.val)
    },
    handleCurrentChange (val) {
      this.concurrentPage = val
    },
    addClick () {
      this.$store.commit('set_EMPTY')
      this.dialogVisible = true
      this.isflag = true
    },
    handerAddClick () {
      addConfiguration(this.$store.state.task.addConfiguration).then(res => {
        this.dialogVisible = false
        this.$store.dispatch('getUpData')
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除
    removeClick () {
      console.log(this.val)
      if (this.val.length < 1) {
        this.$message.closeAll()
        this.$message('选取一个任务')
      } else {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // for (let i = 0; i <= this.val.length; i++) {
          //   let data = {
          //     configTaskId: this.val[i]._id,
          //     rand: Math.ceil(Math.random() * 10)
          //   }
          //   removeConfiguration(data).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          //     if (this.$store.state.task.dtuTd !== 'all') {
          //       let Ids = {
          //         projectId: this.$store.state.task.projectId,
          //         rootId: this.$store.state.task.dtuId
          //       }
          //       this.$store.dispatch('GET_SCOPE', Ids)
          //     } else {
          //       this.$store.dispatch('PROJECT_TASK')
          //     }
          //   }).catch(err => {
          //     console.log(err)
          //   })
          // }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    // 修改
    setTaskClick () {
      this.isflag = false
      if (this.val.length > 1) {
        this.$message.closeAll()
        this.$message('一次只能选取一个')
      } else if (this.val.length === 0) {
        this.$message.closeAll()
        this.$message('选取一个任务')
      } else {
        this.confirm = true
        this.$store.commit('CHANGE_CONFIGURATION', this.val)
        this.dialogVisible = true
      }
    },
    changeClick () {
      this.$store.dispatch('CHANGE_CONFIRM')
      this.dialogVisible = this.$store.state.isDialog
    }
    // // 确定添加弹框
    // confirmAdd () {
    //   this.add = false
    //   this.$store.dispatch('CONFIRMADD')
    //   // this.$store.commit('SET_ADDTASKBOX', false)
    // },
    // // 确定修改弹框
    // setTaskConfirm () {

    // },

    // // 获取指定条件任务的执行记录
    // record () {
    //   if (this.val.length > 1) {
    //     this.$message('一次只能选取一个')
    //   } else if (this.val.length === 0) {
    //     this.$message('选取一个任务')
    //   } else {
    //     recordTask(this.val[0]._id).then(res => {
    //       console.log(res)
    //     }).catch(err => {
    //       console.log(err)
    //     })
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.ipt {
  max-width: 230px;
  margin-right: 10px;
}
.configurationBox {
  padding-bottom: 100px;
}
</style>
<style lang="scss">
.addbConfiguration {
  .el-dialog {
    min-width: 400px;
  }
  .el-dialog__body {
    max-height: 500px;
    max-width: 430px;
    // min-width: 360px;
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
  .el-dialog__header {
    background: #65cea7;
  }
}
</style>
