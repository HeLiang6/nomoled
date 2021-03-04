<template>
  <div>
    <el-table
      ref="multipleTable"
      v-loading="$store.state.task.condition_loading"
      :data="conditionList"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        :label="$t('lightList.name')"
        width="120"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="conditiontype"
        :label="$t('task.taskType')"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="row">
          {{$t(`task_mode.light[${row.row.conditiontype}]`)}}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('task_mode.cycle')"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="row">
          {{$t(`task_mode.cycles[${row.row.cycle}]`)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="zoneNo"
        :label="$t('task_mode.range')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="row">
          <div v-if="row.row.zoneNo==='all'||row.row.zoneNo==undefined">
            {{$t('system.obj.All')}}
          </div>
          <div v-else>
            {{scopeData[row.row.zoneNo].name}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('task.dateZone')"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="row">
          <div>
            {{row.row.starttime}}--{{row.row.endtime}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="enabled"
        :label="$t('task.carried_out')"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="row">
          <div v-if="row.row.enabled===0">
            No
          </div>
          <div v-if="row.row.enabled===1">
            yes
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        :label="$t('task.last_time')"
        show-overflow-tooltip
      >
      </el-table-column>
    </el-table>
    <div style="margin-top:10px;display:flex;justify-content: space-between;
">
      <div class="task_btn">
        <el-button
          type="success"
          plain
          @click="addTask"
        >{{$t('search.add')}}</el-button>
        <el-button
          type="success"
          plain
          @click="removeClick"
        >{{$t('project_list.delete')}}</el-button>
        <el-button
          type="success"
          plain
          @click="setTaskClick"
        >{{$t('search.set')}}</el-button>
        <el-button
          @click="record"
          plain
          type="success"
        >
          {{$t('system.recording')}}
        </el-button>
      </div>
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="$store.state.task.conditionList.length"
      >
      </el-pagination>

    </div>
    <!-- 添加 -->
    <el-dialog
      :title="add?$t('search.add'):$t('search.set')"
      :visible.sync="$store.state.task.addTaskBox"
      width="500px"
      class="addCondition"
      :lock-scroll="false"
      :append-to-body="true"
    >
      <el-form
        :model="$store.state.task.addform"
        label-width="100px"
        ref="addForm"
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item
          :label="$t('lightList.name')"
          prop="name"
        >
          <el-input v-model="$store.state.task.addform.name"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('system.description')"
          prop="description"
        >
          <el-input v-model="$store.state.task.addform.description"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('task_mode.range')"
          prop="zoneNo"
        >
          <el-select
            v-model.number="$store.state.task.addform.zoneNo"
            :placeholder="$t('search.please')"
          >
            <el-option
              v-for="item in scopeData "
              :key="item.no"
              :label="item.name"
              :value="item.no"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="conditiontype"
          :label="$t('task.taskType')"
        >
          <el-select
            v-model.number="$store.state.task.addform.conditiontype"
            :placeholder="$t('search.please')"
          >
            <el-option
              v-for="item in conditiontype"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 亮度 -->
        <div
          style="display:flex;"
          v-show="$store.state.task.addform.conditiontype==0||$store.state.task.addform.conditiontype==1"
        >
          <el-form-item
            :label="$t('task_mode.Dimming')"
            prop="lightcondition"
            v-show="$store.state.task.addform.conditiontype!==1"
          >
            <el-input-number
              v-model="$store.state.task.addform.lightcondition"
              :min="1"
              style="width:100px"
              controls-position="right"
              :max="100"
            ></el-input-number>%
          </el-form-item>
          <el-form-item
            :label="$t('GPRS.duration')"
            label-width="100px"
            prop="lightduration"
          >
            <el-input-number
              v-model="$store.state.task.addform.lightduration"
              :min="1"
              style="width:100px"
              controls-position="right"
              :max="1000"
            ></el-input-number>min
          </el-form-item>
        </div>
        <!-- 电池电压 -->
        <div
          style="display:flex;flex-wrap:wrap;"
          v-show="$store.state.task.addform.conditiontype==2"
        >
          <el-form-item
            :label="$t('task_mode.Less_than')"
            prop="v"
          >
            <el-input-number
              v-model="$store.state.task.addform.vcondition.v"
              :min="1"
              style="width:100px"
              controls-position="right"
              :max="100"
            ></el-input-number>V
          </el-form-item>
          <el-form-item
            :label="$t('task_mode.street_lights')"
            label-width="100px"
            prop="rate"
          >
            <el-input-number
              v-model="$store.state.task.addform.vcondition.rate"
              :min="1"
              style="width:100px"
              controls-position="right"
              :max="1000"
            ></el-input-number>%
          </el-form-item>
          <el-form-item
            :label="$t('task_mode.Dimming')"
            prop="lightcondition"
            v-show="$store.state.task.addform.conditiontype!==1"
          >
            <el-input-number
              v-model="$store.state.task.addform.lightcondition"
              :min="1"
              style="width:100px"
              controls-position="right"
              :max="100"
            ></el-input-number>%
          </el-form-item>
        </div>
        <el-form-item
          :label="$t('task.dateZone')"
          prop="starttime"
        >
          <el-date-picker
            default-value
            v-model.number="$store.state.task.addform.starttime"
            type="date"
            :placeholder="$t('task_mode.date')"
            value-format="timestamp"
            size='small'
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="结束日期"
          prop="endtime"
        >
          <el-date-picker
            default-value
            v-model.number="$store.state.task.addform.endtime"
            type="date"
            placeholder="选择结束日期时间"
            value-format="timestamp"
            size='small'
          >
          </el-date-picker>
        </el-form-item>
        <div
          style="display:flex;"
          class="date_ipt"
        >
          <el-form-item
            :label="$t('task_mode.execution')"
            prop="startSecond"
          >
            <el-time-select
              v-model="$store.state.task.addform.startSecond"
              :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '23:45'
                }"
              :placeholder="$t('search.please')"
            >
            </el-time-select>
          </el-form-item>
          <el-form-item
            :label="$t('task_mode.End')"
            v-show="$store.state.task.addform.conditiontype==2"
            prop="endSecond"
          >
            <el-time-select
              v-model="$store.state.task.addform.endSecond"
              :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '23:45'
                }"
              :placeholder="$t('search.please')"
            >
            </el-time-select>
          </el-form-item>
        </div>
        <el-form-item
          :label="$t('task_mode.cycle')"
          prop="cycle"
        >
          <el-select
            v-model="$store.state.task.addform.cycle"
            :placeholder="$t('search.please')"
          >
            <el-option
              v-for="item in cycleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <div v-show="$store.state.task.addform.cycle==1">
            <el-checkbox-group v-model="$store.state.task.week">
              <el-checkbox
                v-for="(item,index) in weekList"
                :key="index"
                :label="item.val"
                name="type"
              >{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item
          :label="$t('task.carried_out')"
          prop="enabled"
        >
          <el-radio-group v-model="$store.state.task.addform.enabled">
            <el-radio :label="1">yes</el-radio>
            <el-radio :label="0">No</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="$store.state.task.addTaskBox=false">{{$t('search.cancel')}}</el-button>
        <el-button
          v-if="add"
          type="primary"
          @click="confirmAdd"
        >{{$t('search.add')}}</el-button>
        <el-button
          v-if="confirm"
          type="primary"
          @click="setTaskConfirm"
        >{{$t('search.set')}}</el-button>
      </span>
    </el-dialog>
    <!-- 执行记录 -->
    <el-dialog
      :title="$t('system.recording')"
      :visible.sync="record_dialog"
      width="30%"
      class="log"
    >
      <div v-if="recordData.length==0">
        no data
      </div>
      <div v-if="recordData.length!==0">
        <div
          v-for="(item,index) in recordData"
          :key="index"
          class="recordBox"
        >
          <span>{{item.date}}</span>
          <span>{{$t(`state[${item.state}]`)}}</span>
          <span>{{item.name}}</span>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="record_dialog = false"
        >{{$t('search.confirm')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { removeTask, recordTask, getDtailed } from '@/api/task'
import { setDate } from './date.js'
import { system } from '../../../../static/js/SystemOperation'

export default {
  data () {
    return {
      record_dialog: false,
      restaurants: [],
      state1: '',
      // loading: false,
      val: [],
      add: false,
      confirm: false,
      conditiontype: [
        {
          label: this.$t('task_lighton'),
          value: 0
        },
        {
          label: this.$t('task_lightoff'),
          value: 1
        },
        {
          label: this.$t('task_energySaving'),
          value: 2
        },
        {
          label: this.$t('task_cleaning'),
          value: 3
        }
      ],
      cycleList: [
        {
          label: this.$t('byDay'),
          value: 0
        },
        {
          label: this.$t('byWeek'),
          value: 1
        },
        {
          label: this.$t('byFrequency'),
          value: 2
        }
      ],
      activeName: 'first',
      weekList: [
        {
          val: 1,
          label: '周一'
        },
        {
          val: 10,
          label: '周二'
        },
        {
          val: 100,
          label: '周三'
        },
        {
          val: 1000,
          label: '周四'
        },
        {
          val: 10000,
          label: '周五'
        },
        {
          val: 100000,
          label: '周六'
        },
        {
          val: 1000000,
          label: '周日'
        }
      ],
      day: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      recordData: {},
      concurrentPage: 1,
      rules: {
        name: [
          { required: true, message: this.$t('rules.name'), trigger: 'blur' }
        ],
        // description: [
        //   { required: true, message: '请选择活动区域', trigger: 'change' }
        // ],
        zoneNo: [
          { required: true, message: '', trigger: 'change' }
        ],
        conditiontype: [
          { required: true, message: '', trigger: 'change' }
        ],
        // lightcondition: [
        //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        // ],
        // lightduration: [
        //   { required: true, message: '请选择活动资源', trigger: 'change' }
        // ],
        // v: [
        //   { required: true, message: '请填写活动形式', trigger: 'blur' }
        // ],
        // rate: [
        //   { required: true, message: '请填写活动形式', trigger: 'blur' }
        // ],
        starttime: [
          { required: true, message: this.$t('rules.starttime'), trigger: 'blur' }
        ],
        endtime: [
          { required: true, message: this.$t('rules.endtime'), trigger: 'blur' }
        ],
        startSecond: [
          { required: true, message: this.$t('rules.startSecond'), trigger: 'blur' }
        ],
        // endSecond: [
        //   { required: true, message: this.$t('rules.endSecond'), trigger: 'blur' }
        // ],
        cycle: [
          { required: true, message: this.$t('rules.cycle'), trigger: 'blur' }
        ],
        enabled: [
          { required: true, message: this.$t('rules.enabled'), trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    scopeData: function () {
      console.log(this.$store.state.task.scopeData)
      return this.$store.state.task.scopeData
    },
    conditionList: {
      get: function () {
        return this.allList.slice((this.concurrentPage - 1) * 10, 10 * this.concurrentPage)
      },
      set: function (newVal) {
        return newVal
      }
    },
    week: function () {
      return this.$store.state.task.week
    },
    allList: function () {
      let data = this.$store.state.task.conditionList

      data.forEach(item => {
        var time = new Date(item.starttime)
        var y = time.getFullYear()
        var m = time.getMonth() + 1
        var d = time.getDate()
        // var h = time.getHours()
        // var mm = time.getMinutes()
        // var s = time.getSeconds()
        var time2 = new Date(item.endtime)
        var y2 = time2.getFullYear()
        var m2 = time2.getMonth() + 1
        var d2 = time2.getDate()
        // var h2 = time2.getHours()
        // var mm2 = time2.getMinutes()
        // var s2 = time2.getSeconds()
        item.starttime = y + '-' + this.add0(m) + '-' + this.add0(d)
        item.endtime = y2 + '-' + this.add0(m2) + '-' + this.add0(d2)
      })
      return data
    }
  },
  watch: {
    // conditionList: function (newVal, endVal) {
    //   return this.conditionList = newVal
    // }
  },
  mounted () {
    // this.setList()
  },
  methods: {
    add0 (m) { return m < 10 ? '0' + m : m },
    // setList () {
    //   this.conditionList = this.list
    // },
    handleSelectionChange (val) {
      this.val = val
      console.log(this.val)
    },

    // 添加弹框
    addTask () {
      console.log(1)
      this.add = true
      this.confirm = false
      console.log(this.$store.state)

      this.$store.commit('SET_ADDTASKBOX', true)
      if (this.$refs.addForm) {
        this.$refs.addForm.resetFields()
      }
    },
    // 页码
    handleCurrentChange (val) {
      console.log(val)
      this.concurrentPage = val
    },
    // 修改
    setTaskClick () {
      this.add = false
      this.confirm = true
      if (this.val.length > 1) {
        this.$message.closeAll()
        this.$message(this.$t('hint.choose'))
      } else if (this.val.length === 0) {
        this.$message.closeAll()
        this.$message({
          message: this.$t('hint.choose_task'),
          customClass: 'leftMessage'

        })
      } else {
        if (this.$refs.addForm) {
          this.$refs.addForm.resetFields()
        }
        let data = {
          rand: Math.ceil(Math.random() * 10),
          conditionTaskId: this.val[0]._id
        }

        getDtailed(data).then(res => {
          this.$store.commit('SET_ADDTASKBOX', true)
          this.confirm = true
          this.$store.commit('SETTASK', res)

          console.log(this.val)
        })
      }
    },
    // 确定添加弹框
    confirmAdd () {
      let data = null
      // console.log(this.week);
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          // if (this.$store.state.task.cycle === 1) {
          for (let i = 0; i < this.$store.state.task.week.length; i++) {
            data = data + this.$store.state.task.week[i]
          }
          // } else {
          //   data = null
          // }
          console.log(this.$store.state.task.week)
          let day = parseInt((data), 2)
          this.$store.dispatch('CONFIRMADD', day)
          this.$message({
            type: 'success',
            message: this.$t('stateMessage.addSuccess')
          })
          this.add = false
          this.$store.commit('SET_ADDTASKBOX', false)
        } else {
          setTimeout(() => {
            var isError = document.getElementsByClassName('is-error')
            isError[0].querySelector('input').focus()
          }, 100)
          return false
        }
      })
    },
    // 确定修改弹框
    setTaskConfirm () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('SETCONFIRM')
          this.$message({
            type: 'success',
            message: this.$t('stateMessage.alterSuccess')
          })
        } else {
          setTimeout(() => {
            var isError = document.getElementsByClassName('is-error')
            isError[0].querySelector('input').focus()
          }, 100)
          return false
        }
      })
    },
    // 删除
    removeClick () {
      console.log(this.val._id)
      if (this.val.length < 1) {
        this.$message.closeAll()
        this.$message({
          message: this.$t('hint.choose_task'),
          customClass: 'leftMessage'
        })
      } else {
        this.$confirm(this.$t('hint.task_message'), this.$t('hint.prompt'), {
          confirmButtonText: this.$t('search.confirm'),
          cancelButtonText: this.$t('search.cancel'),
          type: 'warning'
        }).then(() => {
          for (let i = 0; i < this.val.length; i++) {
            let data = {
              rand: Math.ceil(Math.random() * 10),
              conditionTaskId: this.val[i]._id
            }
            removeTask(data).then(res => {
              this.$message.closeAll()
              this.$message({
                type: 'success',
                message: this.$t('hint.success')
              })
              // 日志记录
              let user = JSON.parse(sessionStorage.getItem('nomouser'))._id
              let dataLog = {
                userId: user,
                obj: 5,
                dtuname: '',
                operatename: 20,
                operattype: 0,
                time: Date.parse(new Date()),
                description: '删除条件任务',
                description_en: 'Delete condition task',
                description_spain: 'Eliminar tarea de condición',
                projectId: this.$store.state.task.projectId,
                tel: '',
                ip: ''
              }
              system(dataLog)
              if (this.$store.state.task.dtuId !== 'all') {
                let Ids = {
                  projectId: this.$store.state.task.projectId,
                  rootId: this.$store.state.task.dtuId
                }
                this.$store.dispatch('GET_SCOPE', Ids)
              } else {
                console.log(2)
                this.$store.dispatch('PROJECT_TASK')
              }
            }).catch(err => {
              console.log(err)
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('hint.info')
          })
        })
      }
    },
    // 获取指定条件任务的执行记录
    record () {
      if (this.val.length > 1) {
        this.$message(
          {
            message: this.$t('hint.choose'),
            customClass: 'leftMessage'
          })
      } else if (this.val.length === 0) {
        this.$message({
          message: this.$t('hint.choose_task'),
          customClass: 'leftMessage'
        })
      } else {
        recordTask(this.val[0]._id).then(res => {
          this.record_dialog = true
          this.recordData = res
          if (this.recordData.length !== 0) {
            this.recordData.map(item => {
              console.log(setDate(item.time))
              item.date = setDate(item.time)
            })
            console.log(this.recordData)
          }
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.recordBox {
  padding: 10px 0;
  span {
    padding: 0 10px;
  }
}
</style>

<style lang="scss">
.addCondition {
  .el-dialog__header {
    background: #65cea7;
  }
  .el-dialog__body {
    max-height: 500px;
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
.date_ipt .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 110px;
}
.leftMessage {
  left: 20%;
}
.log {
  .el-dialog {
    max-width: 400px;
  }
  .el-dialog__body {
    overflow-y: auto;
    max-height: 400px;
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(7, 155, 241, 0.836);
      background: #0a7edde0;
    }
  }
}
</style>
