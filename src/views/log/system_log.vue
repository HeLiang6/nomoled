<template>
  <div class="log">
    <div class="log-top">
      <div>
        <span>{{$t('user')}}:</span>
        <el-select
          v-model="userValue"
          :placeholder="$t('tips.please')"
          style="width:100px"
          @change="userClick"
        >
          <el-option
            v-for="item in userOptions"
            :key="item._id"
            :label="item.username"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <span>{{$t('project')}}:</span>
        <el-select
          v-model="projectValue"
          :placeholder="$t('tips.please')"
          style="width:100px"
        >
          <el-option
            v-for="item in projectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <span>{{$t('system.Operation_object')}}:</span>
        <el-select
          v-model="objValue"
          :placeholder="$t('tips.please')"
          style="width:100px"
        >
          <el-option
            v-for="item in obj"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="time_box">
        <span>时间:</span>
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
      <el-button
        @click="searchClick"
        type="primary"
      >{{$t('search.search')}}</el-button>
      <el-button
        type="primary"
        @click="exportXLSX"
      >{{$t('Export')}}</el-button>
      <!-- <el-button type="primary">导出</el-button>
      <el-button type="primary">导出</el-button> -->
    </div>
    <div style="overflow:hidden;margin-bottom:200px">
      <el-table
        ref="multipleTable"
        :data="tableData"
        v-loading='loading'
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        tooltip-effect="dark"
        style="width: auto;margin-top:20px;"
        border
        hidden:true
      >
        <el-table-column
          type="selection"
          width="40"
        >
        </el-table-column>
        <el-table-column
          type="index"
          label="no.."
          align="center"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="obj"
          :label="$t('system.Operation_object')"
        >
          <template slot-scope='row'>
            <p v-if="row.row.obj ===0">
              {{$t('system.obj.All')}}
            </p>
            <p v-if="row.row.obj ===1">
              {{$t('system.obj.project')}}
            </p>
            <p v-if="row.row.obj ===2">
              {{$t('system.obj.user')}}
            </p>
            <p v-if="row.row.obj ===3">
              {{$t('system.obj.Concentrator')}}
            </p>
            <p v-if="row.row.obj ===4">
              {{$t('system.obj.terminal')}}
            </p>
            <p v-if="row.row.obj ===5">
              {{$t('system.obj.Mission_strategy')}}
            </p>
            <p v-if="row.row.obj ===6">
              {{$t('system.obj.area')}}
            </p>
            <p v-if="row.row.obj ===7">
              {{$t('system.obj.camera')}}
            </p>
            <p v-if="row.row.obj ===8">
              {{$t('system.obj.Wifi_hotspot')}}
            </p>
            <p v-if="row.row.obj ===9">
              {{$t('system.obj.billboard')}}
            </p>
            <p v-if="row.row.obj ===10">
              {{$t('system.obj.firmware')}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="operatename"
          align="center"
          min-width="100"
          :label="$t('system.Operation_name')"
        >
          <template slot-scope='row'>
            <p>
              {{$t(`operatename[${row.row.operatename}]`)}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="
            operattype"
          align="center"
          :label="$t('system.Operation_type')"
          show-overflow-tooltip
        >
          <template slot-scope="row">
            <div v-if="row.row.operattype===0">
              {{$t('system.User_action')}}
            </div>
            <div v-if="row.row.operattype===1">
              {{$t('system.Hardware_operation')}}
            </div>
            <div v-if="row.row.operattype===2">
              {{$t('system.Software_operation')}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          align="center"
          :label="$t('system.date')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="description"
          align="center"
          :label="$t('system.description')"
          show-overflow-tooltip
        >
          <template slot-scope="row">
            <div v-if="lang=='cn'">
              {{row.row.description}}
            </div>
            <div v-if="lang=='en'">
              {{row.row.description_en}}
            </div>
            <div v-if="lang=='es'">
              {{row.row.description_spain}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="userId"
          align="center"
          :label="$t('system.Username')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="ip"
          align="center"
          :label="$t('system.IP')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="project"
          align="center"
          :label="$t('system.project')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="dtuname"
          align="center"
          :label="$t('system.Concentrator')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="tel"
          align="center"
          :label="$t('system.Concentrator_Tel')"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
      <div class="bottom-box">
        <div class="date-box">
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
  </div>
</template>

<script>
import { logList, userName } from '@/api/log'
import { ProjectList } from '@/api/project'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

// import { operatename } from './operatename.js'
export default {
  data () {
    return {
      lang: sessionStorage.getItem('language'),
      userValue: JSON.parse(sessionStorage.getItem('nomouser'))._id,
      loading: false,
      projectValue: 'all',
      objValue: 0,
      userOptions: [],
      projectOptions: [{
        value: 'all',
        label: '全部'
      }],
      starttime: '',
      endtime: '',
      allData: [],
      obj: [
        {
          value: 0,
          label: this.$t('system.obj.All')
        },
        {
          value: 1,
          label: this.$t('system.obj.project')
        },
        {
          value: 2,
          label: this.$t('system.obj.user')
        },
        {
          value: 3,
          label: this.$t('system.obj.Concentrator')
        },
        {
          value: 4,
          label: this.$t('system.obj.terminal')
        },
        {
          value: 5,
          label: this.$t('system.obj.Mission_strategy')
        },
        {
          value: 6,
          label: this.$t('system.obj.area')
        },
        {
          value: 7,
          label: this.$t('system.obj.camera')
        },
        {
          value: 8,
          label: this.$t('system.obj.Wifi_hotspot')
        },
        {
          value: 9,
          label: this.$t('system.obj.billboard')
        },
        {
          value: 10,
          label: this.$t('system.obj.firmware')
        }
      ],
      tableData: [
        {
          'name': 123,
          'tel': 1,
          'batterycapacity': 455,
          'version': 0,
          'sendtime': 12334,
          'poll': 'asd',
          'avchargev': '12sadx'
        }
      ],
      dialogVisible: false,
      dialogVisible_city: false,
      date: ''
    }
  },
  components: {
  },
  mounted () {
    let timestamp = (new Date()).getTime()
    this.endtime = timestamp
    this.starttime = timestamp - 24 * 60 * 60 * 1000
    this.userList()
    this.logLists(1)
  },
  methods: {
    // 用户列表
    userList () {
      let data = {
        r: Math.ceil(Math.random() * 10)
      }

      userName(data).then(res => {
        this.userOptions = res
        this.getProject()

        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 用户项目
    userClick (val) {
      console.log(val)

      // let data = {
      //   userId: val,
      //   r: Math.ceil(Math.random() * 10)
      // }
      // ProjectList(data).then(res => {
      //   res.result.map(item => {
      //     console.log(item._id)
      //     let data = {
      //       value: item._id,
      //       label: item.name
      //     }
      //     let projectList = []
      //     projectList.push(data)
      //     this.projectOptions = projectList
      //   })
      //   // this.$store.commit('LIST_DATA', this.options)
      //   console.log(this.projectOptions)
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    logLists (val) {
      this.loading = true
      let data = {
        userId: this.userValue,
        endtime: this.endtime,
        starttime: this.starttime,
        pageSize: 10,
        pageNo: val,
        objIndex: this.objValue,
        projectId: this.projectValue
      }
      logList(data).then(res => {
        res.result.forEach(item => {
          // console.log(item)
          var time = new Date(item.time)
          var y = time.getFullYear()
          var m = time.getMonth() + 1
          var d = time.getDate()
          var h = time.getHours()
          var mm = time.getMinutes()
          var s = time.getSeconds()
          item.time = y + '-' + this.dateTime(m) + '-' + this.dateTime(d) + ' ' + this.dateTime(h) + ':' + this.dateTime(mm) + ':' + this.dateTime(s)
        })
        this.tableData = res.result
        this.allData = res
        // this.tableData = this.allData.slice(0, 10)
        this.loading = false
      }).catch(err => {
        console.log(err)
      })
    },
    dateTime (m) { return m < 10 ? '0' + m : m },
    searchClick () {
      this.logLists(1)

      console.log(this.tableData)
    },
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
          this.projectOptions.push(data)
        })
        // this.$store.commit('LIST_DATA', this.options)
        console.log(this.options)
      }).catch(err => {
        console.log(err)
      })
    },
    // handleSizeChange (val) {
    //   console.log(val)
    //   this.logList(val)
    // },
    handleCurrentChange (val) {
      console.log(val)
      this.logLists(val)
    },
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
        FileSaver.saveAs(b, 'systemLog.xls')
      } catch (e) {
        if (typeof console !== 'undefined') {
          console.log(e, wbout)
        }
      }
      return wbout
    }

    // // 全选
    // toggleSelection (rows) {
    //   this.$refs.multipleTable.toggleAllSelection()
    // },
    // toggleReverse (rows) {
    //   if (rows) {
    //     rows.forEach(row => {
    //       this.$refs.multipleTable.toggleRowSelection(row)
    //     })
    //   } else {
    //     this.$refs.multipleTable.clearSelection()
    //   }
    // }
  }
}
</script>

<style lang='scss' scoped>
.date-box {
  margin-top: 30px;
  background: none;
}
.bottom-box {
  display: flex;
  justify-content: center;
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
.log-top {
  display: flex;
  align-items: center;
  span {
    color: #eee;
  }
  div {
    margin-right: 10px;
    display: flex;
    align-items: center;
  }
}
.el-range-editor .el-range-input {
  background: none;
}
.time_box {
  display: flex;
  align-items: center;
}
</style>
<style lang='scss'>
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
.el-pagination button:disabled {
  background-color: transparent;
  border: 1px solid #eee;
}
.el-pager li {
  background-color: transparent;
  border: 1px solid #eee;
  margin: 0 5px;
  border-radius: 3px;
}
.el-pager li.active + li {
  border: 1px solid #eee;
}
.el-pagination .btn-next,
.el-pagination .btn-prev {
  background-color: transparent;
  border: 1px solid #eee;
  border-radius: 3px;
}
</style>

<style lang="scss">
.ChineseDom {
  .log {
    // 宽度
    @media screen and (max-width: 800px) {
      .log-top {
        flex-wrap: wrap;
        .time_box {
          margin-top: 10px;
        }
        .el-button {
          margin-top: 10px;
        }
      }
    }
    @media screen and (max-width: 1024px) and (min-width: 800px) {
      .log-top {
        flex-wrap: wrap;
        .time_box {
          margin-top: 10px;
        }
        .el-button {
          margin-top: 10px;
        }
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
      .date-box {
        margin-top: 5px;
      }
    }
    @media screen and (max-height: 768px) and (min-height: 600px) {
      .el-table {
        .el-table__body-wrapper {
          min-height: 280px;
          height: 280px;
        }
      }
      .date-box {
        margin-top: 5px;
      }
    }
    @media screen and (max-height: 900px) and (min-height: 768px) {
      .el-table {
        .el-table__body-wrapper {
          min-height: 400px;
          height: 400px;
        }
      }
      .date-box {
        margin-top: 5px;
      }
    }
  }
}
.English {
  .log {
    // 宽度
    @media screen and (max-width: 800px) {
      .log-top {
        flex-wrap: wrap;
        .time_box {
          margin-top: 10px;
        }
        .el-button {
          margin-top: 10px;
          padding: 5px;
        }
      }
    }
    @media screen and (max-width: 1024px) and (min-width: 800px) {
      .log-top {
        flex-wrap: wrap;
        .time_box {
          margin-top: 10px;
        }
        .el-button {
          margin-top: 10px;
        }
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
      .date-box {
        margin-top: 5px;
      }
    }
    @media screen and (max-height: 768px) and (min-height: 600px) {
      .el-table {
        .el-table__body-wrapper {
          min-height: 200px;
          height: 200px;
        }
      }
      .date-box {
        margin-top: 5px;
      }
    }
    @media screen and (max-height: 900px) and (min-height: 768px) {
      .el-table {
        .el-table__body-wrapper {
          min-height: 400px;
          height: 400px;
        }
      }
      .date-box {
        margin-top: 5px;
      }
    }
  }
}
</style>
