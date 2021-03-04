<template>
  <div class="warnListDom">
    <div style="overflow:hidden;margin-bottom:200px;">
      <div class="warn_log">
        <div>
          <span style="color:#fff">{{$t('project')}}:</span>
          <el-select
            v-model="$store.state.project.projectId"
            :placeholder="$t('tips.please')"
          >
            <el-option
              v-for="item in projectList"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="zone">
          <span>{{$t('task_mode.range')}}:</span>
          <el-select
            v-model="value"
            :placeholder="$t('tips.please')"
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
        <div class="obj">
          <span>{{$t('OperationOBJ')}}:</span>
          <el-select
            v-model="type"
            :placeholder="$t('tips.please')"
          >
            <el-option
              v-for="item in types"
              :key="item.val"
              :label="item.label"
              :value="item.val"
            >
            </el-option>
          </el-select>
        </div>
        <div class="time_box">
          <span>时间:&nbsp</span>
          <div>
            <el-date-picker
              v-model="starttime"
              type="date"
              :placeholder="$t('startDate')"
              value-format="timestamp"
            >
            </el-date-picker>
          </div>
          <div>
            <el-date-picker
              v-model="endtime"
              type="date"
              :placeholder="$t('endDate')"
              value-format="timestamp"
            >
            </el-date-picker>
          </div>
        </div>
        <el-popover
          placement="bottom"
          width="200"
          trigger="click"
        >
          <el-checkbox-group v-model="warn_type">
            <el-checkbox
              v-for="(item,index) in $t('warnList.types')"
              :key="index"
              :label="index"
              name="type"
            >
              {{item}}
            </el-checkbox>
          </el-checkbox-group>
          <el-button
            type="success"
            plain
            slot="reference"
            class="btn_warn"
          >报警类型选择</el-button>
        </el-popover>
        <el-button
          type="success"
          plain
          @click="searchClick"
        >{{$t('search.search')}}</el-button>

      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: auto;margin-top:20px;"
        border
        hidden:true
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="40"
        >
        </el-table-column>
        <el-table-column
          type="index"
          label="No."
          align="center"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="type"
          :label="$t('warnList.alarm_type')"
        >
          <template slot-scope="row">
            <div>
              {{$t(`warnList.types[${row.row.type}]`)}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('warnList.position')"
          show-overflow-tooltip
        >
          <template slot-scope="row">
            <div>
              <span>{{$t('warnList.project')}}：{{row.row.projectName}}</span>
              <span v-if="row.row.dtuName">-{{$t('warnList.Concentrator')}}:{{row.row.dtuName}}</span>
              <span v-if="row.row.rtuName">-{{$t('lightList.terminal')}}:{{row.row.rtuName}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('warnList.detailed')"
          show-overflow-tooltip
        >
          <template slot-scope="row">
            <div v-if="language == 'cn'">
              {{row.row.description}}
            </div>
            <div v-if="language == 'en'">
              {{row.row.description_en}}
            </div>
            <div v-if="language == 'es'">
              {{row.row.description_spain}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="state"
          align="center"
          :label="$t('warnList.status')"
          show-overflow-tooltip
        >
          <template slot-scope="row">
            <div>
              {{$t(`warnList.state[${row.row.state+1}]`)}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="__v"
          align="center"
          :label="$t('warnList.frequency')"
          show-overflow-tooltip
        >
          <template slot-scope=row>
            <p class="hoveTitle">{{row.row.__v + 1}}</p>
          </template>

        </el-table-column>
        <el-table-column
          prop="time"
          align="center"
          :label="$t('warnList.time')"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
      <div class="bottom-box">
        <div class="btn-left">
          <el-button
            type="success"
            plain
            @click="historyLog"
          >{{$t('history')}}</el-button>
          <el-button
            type="success"
            plain
            HEAD
            @click="dispose"
          >{{$t('task.Task_Assignment')}}</el-button>
          <el-button
            type="success"
            plain
            HEAD
            @click="dispose_result"
          >{{$t('handle')}}</el-button>
          <el-button
            type="success"
            plain
            @click="loseClick"
          >{{$t('ignore')}}</el-button>
          <el-button
            type="success"
            plain
            @click="positionClick"
          >{{$t('Positioning')}}</el-button>
          <el-button
            type="success"
            plain
            @click="exportXLSX"
          >{{$t('Export')}}</el-button>
        </div>

        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="allData.totalNum"
          >
          </el-pagination>
        </div>

      </div>
    </div>
    <!-- 历史记录  -->
    <el-dialog
      :title="$t('warnList.history')"
      :visible.sync="dialogVisible"
      width="60%"
      class="dateHistory_box"
    >
      <!-- <el-table
        :data="date"
        border
        style="width: 100%,color:#000"
      >
        <el-table-column
          prop="date"
          label="日期"
          width="180"
        >
        </el-table-column>
      </el-table> -->
      <table class="history_tab">
        <tr style="border-bottom:1px solid #eee">
          <td
            align=center
            style="border-right:1px solid #eee;width:200px;display:block"
          >{{$t('warnList.time')}}</td>
          <td colspan="9"></td>
        </tr>
        <tr
          v-for="(item,index) in date"
          :key="index"
          style="border-bottom:1px solid #eee"
        >
          <td
            align=center
            colspan="3"
            style="border-right:1px solid #eee;width:200px;display:block"
          >{{item.times}}</td>
          <td colspan="9"></td>
        </tr>
      </table>
      <div class="block">
        <el-pagination
          @current-change="handleCurrenthistory"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="length.totalNum"
          :background='true'
        >
        </el-pagination>
      </div>

      <!-- <div
        v-for="(item,index) in date"
        :key="index"
      >
        {{item.date}}
      </div> -->
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">{{$t('tips.cancel')}}</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >{{$t('tips.confirm')}}</el-button>
      </span>
    </el-dialog>
    <!-- 分配 -->
    <el-dialog
      class="dispose"
      :title="$t('warnList.distribution')"
      :visible.sync="drawer"
      width="70%"
    >
      <div
        class="warn-box"
        v-if="valList.length>0"
      >
        <p v-if="language == 'cn'">{{$t('warnList.alarm')}}:{{valList[0].description}}</p>
        <p v-if="language == 'en'">{{$t('warnList.alarm')}}:{{valList[0].description_en}}</p>
        <p v-if="language == 'es'">{{$t('warnList.alarm')}}:{{valList[0].description_spain}}</p>
        <p>{{$t('warnList.position')}}}：{{valList[0].projectName}}</p>
      </div>
      <div class="allocation">
        {{$t('warnList.deal_with')}}:
        <el-select
          v-model="dispose_value"
          :placeholder="$t('search.please')"
          style="margin-right:30px"
        >
          <el-option
            v-for="item in disposeType"
            :key="item.val"
            :label="item.label"
            :value="item.val"
          >
          </el-option>
        </el-select>
        <span>{{$t('peopel_list.people')}}</span>
        <el-select
          v-model="dispose_name"
          :placeholder="$t('search.please')"
        >
          <el-option
            v-for="item in userList"
            :key="item._id"
            :label="item.username"
            :value="item._id"
          >
          </el-option>
        </el-select>
        <!-- <el-checkbox-group v-model="dispose_name">
          <el-checkbox
            label="name"
            name="type"
          ></el-checkbox>
        </el-checkbox-group> -->
      </div>
      <div class="date_box">
        {{$t('warnList.Deadline')}}：
        <el-date-picker
          v-model="date_vla"
          type="date"
          :placeholder="$t('task_mode.date')"
          value-format="timestamp"
        >
        </el-date-picker>
      </div>
      <div class="attention_box">
        <el-form label-width="100px">
          <el-form-item :label="$t('warnList.Precautions')">
            <el-input v-model="attention"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="drawer = false">{{$t('search.cancel')}}</el-button>
        <el-button
          type="primary"
          @click="drawerClick"
        >{{$t('search.confirm')}}</el-button>
      </span>
    </el-dialog>
    <!-- 处理结果 -->
    <el-dialog
      :title="$t('warnList.process_result')"
      :visible.sync="drawer_result"
      width="30%"
    >
      <el-form label-width="100px">
        <div>
          <el-form-item :label="$t('warnList.deal_with')">
            <el-select
              v-model="result.state"
              :placeholder="$t('search.please')"
              style="margin-right:30px"
            >
              <el-option
                v-for="(item,index) in $t('warnList.state2')"
                :key="index"
                :label="item"
                :value="index"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item :label="$t('warnList.Processing_time')">
            <el-date-picker
              v-model="result.handlingTime"
              type="date"
              :placeholder="$t('task_mode.date')"
              value-format="timestamp"
            >
            </el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item :label="$t('warnList.process_result')">
            <el-input v-model="result.handleResult"></el-input>
          </el-form-item>

        </div>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="drawer_result = false">{{$t('tips.cancel')}}</el-button>
        <el-button
          type="primary"
          @click="resultClick"
        >{{$t('tips.confirm')}}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { getUserList } from '@/api/worker'
import { dtuOne } from '@/api/dtu'
import { rtuone } from '@/api/rtu'

import { ProjectList } from '@/api/project'
import { warnList, getAlarmHistory, updateAlarmState } from '@/api/warn'
// import { setDate } from '../task/components/date'
export default {
  data () {
    return {
      drawer: false, // 处理弹框
      drawer_result: false,
      warn_type: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      language: sessionStorage.getItem('language'),
      user: '',
      result: {
        state: '',
        handleResult: ''
      }, // 处理结果
      dialogVisible: false,
      dialogVisible_city: false,
      starttime: null,
      endtime: null,
      options: [
        {
          value: 0,
          label: this.$t('warnList.project')
        },
        {
          value: 1,
          label: this.$t('warnList.Concentrator')
        },
        {
          value: 2,
          label: this.$t('lightList.terminal')
        }
      ],
      value: 0,
      tableData: [],
      allData: [],
      projectList: [],
      type: 'all',
      dispose_value: 2,
      dispose_name: [], // 处理人
      userList: [], // 处理人列表
      date_vla: '',
      attention: '', // 处理注意事项
      length: {
        total: null
      },
      disposeType: [
        {
          val: 2,
          label: '已分配'
        },
        {
          val: 3,
          label: '已处理'
        },
        {
          val: 4,
          label: '处理失败'
        }],
      // val_list: [
      //   {
      //     description: '',
      //     description_en: '',
      //     description_spain: '',
      //     dtuName: '',
      //     projectId: '',
      //     projectName: '',
      //     rtuId: '',
      //     rtuName: ''
      //   }
      // ],
      types: [
        {
          val: 'all',
          label: '全部'
        },
        {
          val: 0,
          label: '未处理'
        },
        {
          val: 1,
          label: '已忽略'
        },
        {
          val: 2,
          label: '已分配'
        },
        {
          val: 3,
          label: '已处理'
        },
        {
          val: 4,
          label: '处理失败'
        }
      ],
      date: [],
      valList: [

      ]
    }
  },
  components: {
  },
  // computed:{
  //   tableData(){}
  // },
  watch: {
    '$store.state.project.projectId': {
      deep: true,
      handler: function (newValue, oldValue) {
        if (newValue !== oldValue) {
          this.searchClick()
        }
      }
    }
  },
  mounted () {
    this.starttime = ((new Date()).getTime() - (24 * 60 * 60 * 1000) * 7)
    this.endtime = (new Date()).getTime()
    this.getProject()
    this.getUser()
    if (this.$route.query.id) {
      this.$store.commit('SET_PROJECT_ID', this.$route.query.id)
    }
  },
  methods: {
    // 获取维修人员信息
    getUser () {
      let data = {
        userId: JSON.parse(sessionStorage.getItem('nomouser'))._id,
        r: Math.ceil(Math.random() * 10),
        fieldJson: {
          belong: '',
          roles: [],
          username: ''
        }
      }
      getUserList(data).then(res => {
        console.log(res)
        this.userList = res
      }).catch(err => {
        console.log(err)
      })
    },

    // // 获取项目信息
    getProject () {
      this.projectList = []
      let str = String(Math.round((Math.random() * 10) + 1))
      let data = {
        userId: JSON.parse(sessionStorage.getItem('nomouser'))._id,
        r: str
      }
      ProjectList(data).then(res => {
        // res.result.filter(item => {
        //   let data = {
        //     value: item._id,
        //     label: item.name
        //   }
        //   this.projectList.push(data)
        // })
        this.projectList = res.result
        console.log(this.ProjectList)
        // this.$store.commit('PROJECT_LIST', this.projectList)
        // this.$store.commit('PROJECT_ID', this.projectList)

        this.dataList(1)
      }).catch(err => {
        console.log(err)
      })
    },
    dataList (val) {
      let data = {
        endtime: this.endtime,
        projectId: this.$store.state.project.projectId,
        starttime: this.starttime,
        pageSize: 10,
        pageNo: val
      }
      console.log(this.$store.state.project.projectId)
      warnList(data).then(res => {
        this.tableData = res.result
        this.allData = res
        console.log(res)
        this.tableData.map(item => {
          let time = new Date(item.time)
          let y = time.getFullYear()
          let m = time.getMonth() + 1
          let d = time.getDate()
          let h = time.getHours()
          let mm = time.getMinutes()
          let s = time.getSeconds()
          item.time = y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s)
        })
        this.tableData = this.tableData.filter(item => {
          console.log(this.value)
          if (this.value === 1) {
            if (item.rtuId === '') {
              console.log(item)
              return item
            }
          } else if (this.value === 2) {
            if (item.rtuId !== '') {
              console.log(item)

              return item
            }
          } else {
            console.log(item)

            return item
          }
        })
        console.log(this.tableData)
        this.tableData = this.tableData.filter(item => {
          console.log(this.warn_type, item.type)
          console.log(this.warn_type.includes(item.type))
          if (this.warn_type.includes(item.type)) {
            if (this.type === 'all') {
              return item
            } else if (item.state === this.type) {
              return item
            }
          } else {
            console.log(1)
            return null
          }
          console.log(this.type)
        })

        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    add0 (m) { return m < 10 ? '0' + m : m },
    searchClick () {
      this.dataList(1)
    },
    handleCurrentChange (val) {
      this.dataList(val)
    },
    // handClick (val) {
    //   console.log(val)
    //   this.dialogVisible = true
    // },
    // 选中事件
    handleSelectionChange (val) {
      this.valList = val
      console.log(val)
    },
    // 历史操作框
    historyLog () {
      console.log(this.valList.length)
      if (this.valList.length > 1) {
        this.$message.closeAll()

        this.$message(this.$t('hint.choose'))
      } else if (this.valList.length === 0) {
        this.$message.closeAll()

        this.$message(this.$t('hint.choose_task'))
      } else {
        this.history_data(1)
      }
    },
    // 当前历史页
    handleCurrenthistory (val) {
      this.history_data(val)
    },
    history_data (val) {
      let data = {
        alarmId: this.valList[0]._id,
        starttime: this.starttime,
        endtime: this.endtime,
        pageSize: 10,
        pageNo: val
      }
      getAlarmHistory(data).then(res => {
        this.date = []
        this.length = res
        res.result.map(item => {
          let time = new Date(item.times)
          let y = time.getFullYear()
          let m = time.getMonth() + 1
          let d = time.getDate()
          let h = time.getHours()
          let mm = time.getMinutes()
          let s = time.getSeconds()
          let val = {
            times: y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s)
          }

          console.log(val)

          this.date.push(val)
        })
        console.log(res)

        this.dialogVisible = true
        console.log(this.date[0])
      }).catch(err => {
        console.log(err)
      })
    },
    // 分配弹框
    dispose () {
      console.log(this.valList.length)
      if (this.valList.length > 1) {
        this.$message.closeAll()

        this.$message(this.$t('hint.choose'))
      } else if (this.valList.length === 0) {
        this.$message.closeAll()

        this.$message(this.$t('hint.choose_task'))
      } else {
        this.drawer = true
      }
    },
    // 分配提交
    drawerClick () {
      console.log(this.valList[0])
      let data = {
        alarmId: this.valList[0]._id,
        state: this.dispose_value,
        assignedUserId: '',
        deadline: this.date_vla,
        assignTime: Date.parse(new Date()),
        handlingAttention: this.attention
      }
      updateAlarmState(data).then(res => {
        console.log(res)
        this.drawer = false
      }).catch(err => {
        console.log(err)
      })
    },
    // 处理结果弹框
    dispose_result () {
      if (this.valList.length > 1) {
        this.$message.closeAll()

        this.$message(this.$t('hint.choose'))
      } else if (this.valList.length === 0) {
        this.$message.closeAll()

        this.$message(this.$t('hint.choose_task'))
      } else {
        this.drawer_result = true
      }
    },
    // 处理结果确认
    resultClick () {
      let data = {
        alarmId: this.valList[0]._id,
        ...this.result
      }

      updateAlarmState(data).then(res => {
        this.drawer_result = false
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 忽略
    loseClick () {
      if (this.valList.length > 1) {
        this.$message.closeAll()

        this.$message(this.$t('hint.choose'))
      } else if (this.valList.length === 0) {
        this.$message.closeAll()

        this.$message(this.$t('hint.choose_task'))
      } else {
        let data = {
          alarmId: this.valList[0]._id,
          state: 1
        }
        console.log(data)
        updateAlarmState(data).then(res => {
          this.getProject()
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 定位
    positionClick () {
      if (this.valList.length > 1) {
        this.$message.closeAll()
        this.$message(this.$t('hint.choose'))
      } else if (this.valList.length === 0) {
        this.$message.closeAll()
        this.$message(this.$t('hint.choose_task'))
      } else {
        console.log(this.valList)
        if (this.valList[0].rtuId === '') {
          let data = {
            dtuId: this.valList[0].dtuId
          }
          dtuOne(data).then(res => {
            console.log(res)
            this.$router.push('/MapMonitoring')
            this.$store.commit('SET_LIGHT', res.result)
          }).catch(err => {
            console.log(err)
          })
        } else {
          let data = {
            rtuId: this.valList[0].rtuId,
            rand: Math.ceil(Math.random() * 10)
          }
          rtuone(data).then(res => {
            this.$router.push('/MapMonitoring')

            this.$store.commit('GPS_LIGHT', res)
          }).catch(err => {
            console.log(err)
          })
          console.log(data)
        }
      }
    },
    // 导出
    exportXLSX () {
      // 从表格生成workbook
      let wb = XLSX.utils.table_to_book(document.querySelector('.el-table'))
      let wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array',
        cellDates: true
      })
      try {
        // 下载
        let b = new Blob([wbout], { type: 'application/octet-stream' })
        FileSaver.saveAs(b, 'filename.xls')
      } catch (e) {
        if (typeof console !== 'undefined') {
          console.log(e, wbout)
        }
      }
      return wbout
    }
  }
}
</script>

<style lang='scss' scoped>
.block {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.bottom-box {
  display: flex;
  justify-content: space-between;
  .el-button + .el-button {
    margin: 0;
  }
}
.hoveTitle {
  text-align: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.log h4 {
  font-size: 20px;
  color: #eee;
  margin-bottom: 20px;
}
.warn_log {
  display: flex;
  align-items: center;
  span {
    color: #eee;
  }
  div {
    margin-right: 10px;
  }
}
.warn-box {
  text-align: center;
  border-bottom: 1px solid #eeeeee;
  padding: 10px 0;
  p {
    font-size: 22px;
  }
}
.el-range-editor .el-range-input {
  background: none;
}
.allocation {
  padding: 30px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
}
.date_box {
  padding: 20px 0;
  border-bottom: 1px solid #eeeeee;
}
.attention_box {
  padding: 15px 0;
}
.dateHistory_box {
  width: 100%;
}
.history_tab {
  width: 100%;
  border: 1px solid #000;
  min-height: 50px;
}
.btn_warn {
  width: 120px;
  margin-right: 10px;
}
.time_box {
  display: flex;
  align-items: center;
}
.btn-left {
  margin-top: 20px;
}
</style>

<style lang='scss'>
.dateHistory_box .el-dialog {
  .el-dialog__body {
    max-height: 400px;
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
.el-pager li {
  background-color: transparent;
}
.el-pager li.active + li {
  border: 1px solid #eee;
}
.el-table {
  .el-table__body-wrapper {
    overflow-x: auto;
    overflow-y: auto;
  }
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  // min-height: 600px;
  overflow-y: auto;
  overflow-x: auto;
  //滚动条的宽度
  .your-table .el-table__body-wrapper::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }
  //滚动条的滑块
  .your-table .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #a1a3a9;
    border-radius: 3px;
  }
  //滚动条的宽度
  ::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }
  //滚动条的滑块
  ::-webkit-scrollbar-thumb {
    background-color: #a1a3a9;
    border-radius: 3px;
  }
}
.el-input__inner {
  background-color: transparent;
}

.el-table__body tr:hover > td {
  background-color: #134087 !important;
}

.el-table .warning-row {
  background: skyblue;
}
.el-table th,
.el-table tr {
  background-color: transparent;
}
.el-table,
.el-table__expanded-cell {
  background-color: rgba($color: #fff, $alpha: 0.1);
}
.el-table thead {
  color: #00eaff;
}
.el-table {
  /* 表格字体颜色 */
  font-size: 10px;
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.el-table__header tr,
.el-table__header th {
  padding: 0;
  height: 50px;
}
.el-table__body tr,
.el-table__body td {
  padding: 0;
  height: 50px;
}
.el-table--border th {
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}
.el-table--border td {
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background-color: transparent;
  border: 1px solid #eee;
}
.btn-next,
.btn-prev,
.el-pager li {
  background-color: transparent;
  border: 1px solid #eee;
  margin: 0 5px;
  border-radius: 4px;
}
.el-pagination .btn-next,
.el-pagination .btn-prev,
.el-pagination button:disabled {
  background-color: transparent;
  border: 1px solid #eee;
}
.dispose .el-dialog__header {
  background: #65cea7;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #67c23a;
}

.warn_log {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 135px;
  }
  .el-select {
    width: 140px;
    // .el-input {
    //   width: 140px;
    //   .el-input__inner {
    //     width: 140px;
    //   }
    // }
  }
}
.zone,
.obj {
  .el-select {
    width: 100px;
  }
}
</style>

<style lang="scss">
.ChineseDom {
  .warnListDom {
    // 宽度
    @media screen and (max-width: 800px) {
      .warn_log {
        flex-wrap: wrap;
      }
      .time_box {
        margin-top: 10px;
      }
      .el-button {
        margin-top: 10px;
      }
    }
    @media screen and (max-width: 1024px) and (min-width: 800px) {
      .warn_log {
        flex-wrap: wrap;
      }
      // .time_box {
      //   margin-top: 10px;
      // }
      .el-button {
        margin-top: 10px;
      }
    }
    // 高度
    @media screen and (max-height: 600px) {
      .el-table {
        .el-table__body-wrapper {
          min-height: 100px;
          height: 100px;
        }
      }
      .btn-left {
        margin-top: 0px;
      }
      .block {
        margin-top: 15px;
      }
    }
    @media screen and (max-height: 768px) and (min-height: 600px) {
      .el-table {
        .el-table__body-wrapper {
          min-height: 250px;
          height: 250px;
        }
      }
      .btn-left {
        margin-top: 0px;
      }
      .block {
        margin-top: 15px;
      }
    }
    @media screen and (max-height: 800px) and (min-height: 768px) {
      .el-table {
        .el-table__body-wrapper {
          min-height: 350px;
          height: 350px;
        }
      }
      .btn-left {
        margin-top: 0px;
      }
      .block {
        margin-top: 15px;
      }
    }
    @media screen and (min-height: 968px) {
      .el-table {
        max-height: 550px;
        .el-table__body-wrapper {
          min-height: 450px;
          height: 450px;
        }
      }
      .btn-left {
        margin-top: 5px;
      }
      .block {
        margin-top: 15px;
      }
    }
  }
}
.English {
  .warnListDom {
    // 宽度
    @media screen and (max-width: 800px) {
      .warn_log {
        flex-wrap: wrap;
      }
      .time_box {
        margin-top: 10px;
      }
      .el-button {
        margin-top: 10px;
      }
    }
    @media screen and (max-width: 1024px) and (min-width: 800px) {
      .warn_log {
        flex-wrap: wrap;
      }
      // .time_box {
      //   margin-top: 10px;
      // }
      .el-button {
        margin-top: 10px;
      }
    }
    // 高度
    @media screen and (max-height: 600px) {
      .el-table {
        .el-table__body-wrapper {
          min-height: 50px;
          height: 50px;
        }
      }
      .btn-left {
        margin-top: 0px;
      }
      .block {
        margin-top: 6px;
      }
      .el-button {
        margin-top: 2px;
      }
    }
    @media screen and (max-height: 768px) and (min-height: 600px) {
      .el-table {
        .el-table__body-wrapper {
          min-height: 200px;
          height: 200px;
        }
      }
      .btn-left {
        margin-top: 0px;
      }
      .block {
        margin-top: 15px;
      }
    }
    @media screen and (max-height: 800px) and (min-height: 768px) {
      .el-table {
        .el-table__body-wrapper {
          min-height: 350px;
          height: 350px;
        }
      }
      .btn-left {
        margin-top: 0px;
      }
      .block {
        margin-top: 15px;
      }
    }
    @media screen and (min-height: 968px) {
      .el-table {
        max-height: 550px;
        .el-table__body-wrapper {
          min-height: 450px;
          height: 450px;
        }
      }
      .btn-left {
        margin-top: 5px;
      }
      .block {
        margin-top: 15px;
      }
    }
  }
}
</style>
