<template>
  <div class="configurationBox">
    <el-table
      ref="multipleTable"
      :data="configurationList"
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
        type="index"
        width="80"
        :label="$t('task.month')"
        align="center"
        prop="month"
      >
        <template slot-scope="row">
          <div>
            {{row.row.month+1}}{{$t('task.month')}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('lightList.Drive_mode')"
        show-overflow-tooltip
      >
        <template slot-scope="row">
          <div>
            {{$t(`task_mode.mode[${row.row.mode}]`)}}
            <!-- <span v-if="row.row.mode===0">普通模式</span>
            <span v-if="row.row.mode===1">延时感应模式</span>
            <span v-if="row.row.mode===2">整晚感应模式</span>
            <span v-if="row.row.mode===3">晨亮模式</span> -->
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('lightList.Drive_current')"
        show-overflow-tooltip
      >
        <template slot-scope="row">
          <div>
            {{row.row.current}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('lightList.period')"
        show-overflow-tooltip
        min-width="100"
      >
        <template slot-scope="row">
          <div>
            <span>{{$t('lightList.First_period')}}</span>
          </div>
          <div>
            <span>{{$t('lightList.two_period')}}</span>
          </div>
          <div>
            <span>{{$t('lightList.three_period')}}</span>
          </div>
          <div>
            <span>{{$t('lightList.four_period')}}</span>
          </div>
          <div>
            <span>{{$t('lightList.five_period')}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('lightList.time')"
        show-overflow-tooltip
        min-width="100"
      >
        <template slot-scope="row">
          <div>
            <span>{{row.row.time1}}</span>
          </div>
          <div>
            <span>{{row.row.time2}}</span>
          </div>
          <div>
            <span>{{row.row.time3}}</span>
          </div>
          <div>
            <span>{{row.row.time4}}</span>
          </div>
          <div>
            <span>{{row.row.time5}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('lightList.Dimming_ratio')"
        show-overflow-tooltip
      >
        <template slot-scope="row">
          <div>
            <span>{{row.row.light1}}</span>
          </div>
          <div>
            <span>{{row.row.light2}}</span>
          </div>
          <div>
            <span>{{row.row.light3}}</span>
          </div>
          <div>
            <span>{{row.row.light4}}</span>
          </div>
          <div>
            <span>{{row.row.light5}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('lightList.Someone')"
        show-overflow-tooltip
      >
        <template slot-scope="row">
          <div>
            <span>{{row.row.induction1}}</span>
          </div>
          <div>
            <span>{{row.row.induction2}}</span>
          </div>
          <div>
            <span>{{row.row.induction3}}</span>
          </div>
          <div>
            <span>{{row.row.induction4}}</span>
          </div>
          <div>
            <span>{{row.row.induction5}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="sensortime"
        align="center"
        :label="$t('lightList.induction')"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="delaytime"
        align="center"
        :label="$t('lightList.Delay')"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="menlight"
        align="center"
        :label="$t('lightList.Percentage_of_people')"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="nomenlight"
        align="center"
        :label="$t('lightList.Percentage_of_unmanned')"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="mtime"
        align="center"
        :label="$t('lightList.Morning_hours')"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="mlightz`"
        align="center"
        :label="$t('lightList.Morning_light_ratio')"
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
          plain
          type="success"
          @click="record"
        >
          {{$t('system.recording')}}
        </el-button>
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
      :title="isflag?$t('search.add'):$t('search.set')"
      :visible.sync="dialogVisible"
      width="30%"
      class="addbConfiguration"
      :lock-scroll="false"
      :append-to-body="true"
    >
      <el-form
        ref="form"
        :model="$store.state.task.addConfiguration"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item
          :label="$t('lightList.name')"
          prop="name"
        >
          <el-input
            class="ipt"
            v-model="$store.state.task.addConfiguration.name"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('system.description')">
          <el-input
            class="ipt"
            v-model="$store.state.task.addConfiguration.description"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('task.month')"
          prop="month"
        >
          <el-select
            v-model="$store.state.task.addConfiguration.month"
            :placeholder="$t('search.please')"
          >
            <el-option
              v-for="item in monthList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('Street_lamp_management.model')"
          prop="typeId"
        >
          <el-select
            v-model="$store.state.task.addConfiguration.typeId"
            :placeholder="$t('search.please')"
          >
            <el-option
              v-for="item in $store.state.task.light_template"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('lightList.Drive_mode')"
          prop="mode"
        >
          <el-select
            v-model="$store.state.task.addConfiguration.mode"
            :placeholder="$t('search.please')"
          >
            <el-option
              v-for="item in modeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('lightList.Drive_current')"
          prop="current"
        >
          <el-input
            class="ipt"
            v-model="$store.state.task.addConfiguration.current"
          ></el-input>mA
        </el-form-item>
        <div v-show="$store.state.task.addConfiguration.mode!==2">
          <el-form-item :label="$t('lightList.First_period')">
            <el-input
              class="ipt"
              type="number"
              :min="0"
              oninput="if(value<0)value=0"
              v-model="$store.state.task.addConfiguration.time1"
            ></el-input><span>h</span>
          </el-form-item>
          <el-form-item :label="$t('lightList.Dimming_ratio')">
            <el-input
              class="ipt"
              type="number"
              :min="0"
              oninput="if(value<0)value=0"
              v-model="$store.state.task.addConfiguration.light1"
            ></el-input>%
          </el-form-item>
          <el-form-item :label="$t('lightList.person')">
            <el-input
              class="ipt"
              type="number"
              :min="0"
              oninput="if(value<0)value=0"
              v-model="$store.state.task.addConfiguration.induction1"
            ></el-input>%
          </el-form-item>
          <el-form-item :label="$t('lightList.two_period')">
            <el-input
              class="ipt"
              type="number"
              :min="0"
              oninput="if(value<0)value=0"
              v-model="$store.state.task.addConfiguration.time2"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('lightList.Dimming_ratio')">
            <el-input
              class="ipt"
              v-model="$store.state.task.addConfiguration.light2"
            ></el-input>%
          </el-form-item>
          <el-form-item :label="$t('lightList.person')">
            <el-input
              class="ipt"
              type="number"
              :min="0"
              oninput="if(value<0)value=0"
              v-model="$store.state.task.addConfiguration.induction2"
            ></el-input>%
          </el-form-item>
          <el-form-item :label="$t('lightList.three_period')">
            <el-input
              class="ipt"
              type="number"
              :min="0"
              oninput="if(value<0)value=0"
              v-model="$store.state.task.addConfiguration.time3"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('lightList.Dimming_ratio')">
            <el-input
              class="ipt"
              type="number"
              :min="0"
              oninput="if(value<0)value=0"
              v-model="$store.state.task.addConfiguration.light3"
            ></el-input>%
          </el-form-item>
          <el-form-item :label="$t('lightList.person')">
            <el-input
              class="ipt"
              type="number"
              :min="0"
              oninput="if(value<0)value=0"
              v-model="$store.state.task.addConfiguration.induction3"
            ></el-input>%
          </el-form-item>
          <!-- 延时感应时段隐藏 -->
          <div v-show="this.$store.state.task.addConfiguration.mode!==1">
            <el-form-item :label="$t('lightList.four_period')">
              <el-input
                class="ipt"
                type="number"
                :min="0"
                oninput="if(value<0)value=0"
                v-model="$store.state.task.addConfiguration.time4"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('lightList.Dimming_ratio')">
              <el-input
                class="ipt"
                type="number"
                :min="0"
                oninput="if(value<0)value=0"
                v-model="$store.state.task.addConfiguration.light4"
              ></el-input>%
            </el-form-item>
            <el-form-item :label="$t('lightList.person')">
              <el-input
                class="ipt"
                type="number"
                :min="0"
                oninput="if(value<0)value=0"
                v-model="$store.state.task.addConfiguration.induction4"
              ></el-input>%
            </el-form-item>
            <el-form-item :label="$t('lightList.five_period')">
              <el-input
                class="ipt"
                type="number"
                :min="0"
                oninput="if(value<0)value=0"
                v-model="$store.state.task.addConfiguration.time5"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('lightList.Dimming_ratio')">
              <el-input
                class="ipt"
                type="number"
                :min="0"
                oninput="if(value<0)value=0"
                v-model="$store.state.task.addConfiguration.light5"
              ></el-input>%
            </el-form-item>
            <el-form-item :label="$t('lightList.person')">
              <el-input
                class="ipt"
                type="number"
                :min="0"
                oninput="if(value<0)value=0"
                v-model="$store.state.task.addConfiguration.induction5"
              ></el-input>%
            </el-form-item>
          </div>
        </div>
        <div v-show="this.$store.state.task.addConfiguration.mode==2">
          <el-form-item :label="$t('lightList.Delay')">
            <el-input
              type="number"
              :min="0"
              oninput="if(value<0)value=0"
              v-model="$store.state.task.addConfiguration.delaytime"
            ></el-input>h
          </el-form-item>
        </div>
        <div v-show="this.$store.state.task.addConfiguration.mode==1">
          <el-form-item :label="$t('lightList.induction')">
            <el-input
              type="number"
              :min="0"
              oninput="if(value<0)value=0"
              v-model="$store.state.task.addConfiguration.sensortime"
            ></el-input>%
          </el-form-item>
        </div>
        <div v-show="this.$store.state.task.addConfiguration.mode==1 ||this.$store.state.task.addConfiguration.mode==2">
          <el-form-item :label="$t('lightList.Percentage_of_people')">
            <el-input
              type="number"
              :min="0"
              oninput="if(value<0)value=0"
              v-model="$store.state.task.addConfiguration.menlight"
            ></el-input>%
          </el-form-item>
          <el-form-item :label="$t('lightList.Percentage_of_unmanned')">
            <el-input
              type="number"
              :min="0"
              oninput="if(value<0)value=0"
              v-model="$store.state.task.addConfiguration.nomenlight"
            ></el-input>%
          </el-form-item>
        </div>
        <div v-show="this.$store.state.task.addConfiguration.mode==3">
          <el-form-item :label="$t('lightList.Morning_hours')">
            <el-input
              type="number"
              :min="0"
              oninput="if(value<0)value=0"
              v-model="$store.state.task.addConfiguration.mtime"
            ></el-input>%
          </el-form-item>
          <el-form-item :label="$t('lightList.Morning_light_ratio')">
            <el-input
              type="number"
              :min="0"
              oninput="if(value<0)value=0"
              v-model="$store.state.task.addConfiguration.mlight"
            ></el-input>%
          </el-form-item>
        </div>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible=false">{{$t('search.cancel')}}</el-button>
        <el-button
          v-if="isflag"
          type="primary"
          @click="handerAddClick"
        >{{$t('search.confirm')}}</el-button>
        <el-button
          v-if="!isflag"
          type="primary"
          @click="changeClick"
        >{{$t('project_list.modify')}}</el-button>
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
import { addConfiguration, recordTask, removeConfiguration } from '@/api/task'
import { setDate } from './date.js'
import { system } from '../../../../static/js/SystemOperation'

export default {
  data () {
    return {
      restaurants: [],
      state1: '',
      val: [],
      isflag: '',
      dialogVisible: false,
      monthList: [
        {
          value: 0,
          label: '1月'
        },
        {
          value: 1,
          label: '2月'
        },
        {
          value: 2,
          label: '3月'
        },
        {
          value: 3,
          label: '4月'
        },
        {
          value: 4,
          label: '5月'
        },
        {
          value: 5,
          label: '6月'
        },
        {
          value: 6,
          label: '7月'
        },
        {
          value: 7,
          label: '8月'
        },
        {
          value: 8,
          label: '9月'
        },
        {
          value: 9,
          label: '10月'
        },
        {
          value: 10,
          label: '11月'
        },
        {
          value: 11,
          label: '12月'
        }
      ],
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
      light_light: [],
      concurrentPage: 1,
      visible: false, // 删除提示框
      recordData: {},
      record_dialog: false,
      rules: {
        name: [
          { required: true, message: this.$t('rules.name'), trigger: 'blur' }
        ],
        // description: [
        //   { required: true, message: '请选择活动区域', trigger: 'change' }
        // ],
        month: [
          { required: true, message: '', trigger: 'blur' }
        ],
        typeId: [
          { required: true, message: this.$t('rules.typeId'), trigger: 'blur' }
        ],
        mode: [
          { required: true, message: '', trigger: 'blur' }
        ]
        // current: [
        //   { required: true, message: '请选择活动资源', trigger: 'blur' }
        // ]
      }

    }
  },
  computed: {
    configurationList: {
      get: function () {
        return this.$store.state.task.configurationList.slice((this.concurrentPage - 1) * 10, 10 * this.concurrentPage)
      },
      set: function (newVal) {
        return newVal
      }

    }
    // lightType: function () {
    //   // return this.$store.state.task.scopeData
    // }
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
      this.$refs.form.validate((valid) => {
        if (valid) {
          addConfiguration(this.$store.state.task.addConfiguration).then(res => {
            // 日志记录
            let user = JSON.parse(sessionStorage.getItem('nomouser'))._id
            let dataLog = {
              userId: user,
              obj: 5,
              dtuname: '',
              operatename: 19,
              operattype: 0,
              time: Date.parse(new Date()),
              description: '添加配置任务',
              description_en: 'Add configuration task',
              description_spain: 'Agregar tarea de configuraciónn',
              projectId: this.$store.state.task.projectId,
              tel: '',
              ip: ''
            }
            system(dataLog)
            this.$store.commit('Loading')
            this.$store.dispatch('getUpData')
            this.dialogVisible = false
            this.$message({
              type: 'success',
              message: this.$t('stateMessage.addSuccess')
            })
            console.log(res)
          }).catch(err => {
            console.log(err)
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
      console.log(this.val)
      if (this.val.length < 1) {
        this.$message.closeAll()

        this.$message({
          message: this.$t('hint.choose_task'),
          customClass: 'leftMessage'

        })
      } else {
        this.$confirm(this.$t('hint.hint_message'), this.$t('hint.prompt'), {
          confirmButtonText: this.$t('search.confirm'),
          cancelButtonText: this.$t('search.cancel'),
          type: 'warning'
        }).then(() => {
          for (let i = 0; i <= this.val.length; i++) {
            let data = {
              configTaskId: this.val[i]._id,
              rand: Math.ceil(Math.random() * 10)
            }
            removeConfiguration(data).then(res => {
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
                description: '删除配置任务',
                description_en: 'Delete configuration task',
                description_spain: 'Eliminar tarea de configuración',
                projectId: this.$store.state.task.projectId,
                tel: '',
                ip: ''
              }
              system(dataLog)
              this.$store.commit('Loading')

              if (this.$store.state.task.dtuId !== 'all') {
                let Ids = {
                  projectId: this.$store.state.task.projectId,
                  rootId: this.$store.state.task.dtuId
                }
                this.$store.dispatch('GET_SCOPE', Ids)
              } else {
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
    // 修改
    setTaskClick () {
      this.isflag = false
      if (this.val.length > 1) {
        this.$message.closeAll()
        this.$message({
          message: this.$t('hint.choose'),
          customClass: 'leftMessage'
        })
      } else if (this.val.length === 0) {
        this.$message.closeAll()
        this.$message({
          message: this.$t('hint.choose_task'),
          customClass: 'leftMessage'

        })
      } else {
        if (this.$refs.form) {
          this.$refs.form.resetFields()
        }
        this.confirm = true
        this.$store.commit('CHANGE_CONFIGURATION', this.val)
        this.dialogVisible = true
      }
    },
    changeClick () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$store.dispatch('CHANGE_CONFIRM')
          this.$message({
            type: 'success',
            message: this.$t('stateMessage.alterSuccess')
          })

          this.dialogVisible = this.$store.state.isDialog
        } else {
          setTimeout(() => {
            var isError = document.getElementsByClassName('is-error')
            isError[0].querySelector('input').focus()
          }, 100)
          return false
        }
      })
    },
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
    record () {
      if (this.val.length > 1) {
        this.$message.closeAll()
        this.$message({
          message: this.$t('hint.choose'),
          customClass: 'leftMessage'
        })
      } else if (this.val.length === 0) {
        this.$message.closeAll()
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
.ipt {
  max-width: 300px;
  margin-right: 10px;
}
.configurationBox {
  padding-bottom: 100px;
}
</style>
<style lang="scss">
.addbConfiguration {
  .el-dialog__body {
    max-height: 500px;
    max-width: 400px;
    min-width: 300px;
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
.leftMessage {
  left: 20%;
}
</style>
