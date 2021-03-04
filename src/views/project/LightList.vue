<template>
  <div class="lightListDom">
    <!-- <template>
      <div style="margin-left:20px;color:#fff;font-size:20px;">
        {{$t('lightList.lightList')}}
      </div>
    </template> -->
    <div style="margin-bottom:200px">
      <div style="display:flex;align-items:center">
        <span style="color:#FFF">{{$t('project_group.ProjectList')}}：</span>
        <el-select
          v-model="$store.state.project.addLightData.projectId"
          filterable
          remote
          size="small"
          class="search"
          reserve-keyword
          :placeholder="$t('tips.keyword')"
          :remote-method="remoteMethod"
          :loading="loading"
          @change="selectSearch"
          style="margin-right:20px;"
        >
          <el-option
            v-for="item in restaurants"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <el-button
          type="primary"
          class="file gradient"
        >{{$t('uploading')}}
          <input
            type="file"
            id="files"
            ref="refFile"
            v-on:change="readExcel"
          >
        </el-button>
        <el-button
          type="primary"
          @click="exportXLSX"
        >{{$t('Export')}}</el-button>
        <!-- <el-button
          type="primary"
          @click="deleteClick"
        >删除</el-button>
        <el-button
          type="primary"
          @click="setLinght"
        >编辑</el-button> -->
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        v-loading="loading"
        style="width: 100%;margin-top:20px;"
        border
      >
        <el-table-column
          type="index"
          width="80"
          label="No."
          align="center"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          :label="$t('lightList.terminal')"
          width="120"
        >
          <template slot-scope=row>
            {{row.row.name}}
          </template>
        </el-table-column>
        <el-table-column
          prop="dtuName"
          align="center"
          :label="$t('lightList.Concentrador')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="uid"
          align="center"
          :label="$t('lightList.UID')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="tel"
          align="center"
          :label="$t('lightList.Tel')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="longitude"
          align="center"
          :label="$t('lightList.longitude')"
          show-overflow-tooltip
        >
          <template slot-scope=row>
            <p @click="handClickCity(row)">{{row.row.longitude}}</p>
          </template>

        </el-table-column>
        <el-table-column
          prop="latitude"
          align="center"
          :label="$t('lightList.latitude')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="lightType"
          align="center"
          :label="$t('lightList.Street_lamp_model')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('lightList.Drive_mode')"
          show-overflow-tooltip
        >
          <template slot-scope="row">
            <div>
              <span v-if="row.row.params.mode===0">普通模式</span>
              <span v-if="row.row.params.mode===1">延时感应模式</span>
              <span v-if="row.row.params.mode===2">整晚感应模式</span>
              <span v-if="row.row.params.mode===3">晨亮模式</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          :label="$t('lightList.Drive_current')"
          show-overflow-tooltip
        >
          <template slot-scope="row">
            <div>
              {{row.row.params.current}}
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
              <span>{{row.row.params.time1}}</span>
            </div>
            <div>
              <span>{{row.row.params.time2}}</span>
            </div>
            <div>
              <span>{{row.row.params.time3}}</span>
            </div>
            <div>
              <span>{{row.row.params.time4}}</span>
            </div>
            <div>
              <span>{{row.row.params.time5}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="120px"
          :label="$t('lightList.NoDimming_ratio')"
          show-overflow-tooltip
        >
          <template slot-scope="row">
            <div>
              <span>{{row.row.params.light1}}</span>
            </div>
            <div>
              <span>{{row.row.params.light2}}</span>
            </div>
            <div>
              <span>{{row.row.params.light3}}</span>
            </div>
            <div>
              <span>{{row.row.params.light4}}</span>
            </div>
            <div>
              <span>{{row.row.params.light5}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="120px"
          :label="$t('lightList.Someone')"
          show-overflow-tooltip
        >
          <template slot-scope="row">
            <div>
              <span>{{row.row.params.induction1}}</span>
            </div>
            <div>
              <span>{{row.row.params.induction2}}</span>
            </div>
            <div>
              <span>{{row.row.params.induction3}}</span>
            </div>
            <div>
              <span>{{row.row.params.induction4}}</span>
            </div>
            <div>
              <span>{{row.row.params.induction5}}</span>
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
      <div class="bottom-box">
        <!-- <div style="margin-top: 20px">
        <el-button @click="toggleSelection(tableData)">{{$t('selectAll')}}</el-button>
        <el-button @click="toggleReverse(tableData)">{{$t('ReverseEelection')}}</el-button>
      </div> -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="allData.length"
          >
          </el-pagination>
        </div>
      </div>

    </div>

    <!-- 项目详情  -->
    <!-- <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>这是一段信息</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>

import {
  updateRtu,
  rtulistbyprojectId
} from '@/api/rtu'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

import { getTemplateListByProjectId } from '@/api/streetLamp'
import { ProjectList } from '@/api/project'
import { dtuList } from '@/api/dtu'

export default {
  data () {
    return {
      tableData: [],
      // dialogVisible: false,
      // dialogVisible_city: false,
      loading: false,
      restaurants: [],
      rtuList: [],
      dtuList: [],
      light: []
    }
  },
  components: {
  },
  computed: {
    allData () {
      let referencia = {}
      console.log(this.dtuList)
      this.dtuList.map(item => {
        referencia[item._id] = item.name
        referencia[item._id + 1] = item.tel
      })
      this.light.map(item => {
        console.log(item)
        referencia[item._id] = item.name
      })
      console.log(referencia)
      // return this.rtuList.map(rtuItem => {
      //   rtuItem.dtuName = referencia[rtuItem.rootId]
      // })
      for (let i = 0; i < this.rtuList.length; i++) {
        let rtuItem = this.rtuList[i]
        rtuItem.dtuName = referencia[rtuItem.rootId]
        rtuItem.tel = referencia[rtuItem.rootId + 1]
        rtuItem.lightType = referencia[rtuItem.typeId]
        console.log(rtuItem.typeId)
        console.log(referencia)
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.tableData = this.rtuList.slice(0, 10)
      console.log(this.rtuList)
      return this.rtuList
    }
  },
  watch: {
    // allData: {
    //   handler: (newVal, oldVal) => {
    //     if (newVal.length !== 0 && oldVal.length === 0) {
    //       this.tableData = this.allData.slice(0, 10)
    //     }
    //   }
    // }
  },
  mounted () {
    this.searchChange()

    // 获取所有项目
    // let data = {
    //   r: '1',
    //   userId: this.$store.state.user.nomouser.name
    // }
    // console.log(this.$store.state.user.nomouser)
    // ProjectList(data).then(res => {
    //   this.tableData = res
    //   this.loading = false
    //   console.log(res)
    // }).catch(err => {
    //   console.log(err)
    // })
    // this.dataList()
    // this.dtu()
  },
  methods: {
    // 搜索
    searchChange (val) {
      let str = String(Math.round((Math.random() * 10) + 1))
      let data = {
        userId: this.$store.state.user.nomouser._id,
        r: str
      }
      ProjectList(data).then(res => {
        console.log(res)
        res.result.filter(item => {
          let data = {
            value: item._id,
            label: item.name
          }
          this.restaurants.push(data)
        })
        if (this.$route.query.id) {
          this.$store.commit('PROJECT_ID', this.$route.query.id)
        } else {
          this.$store.commit('PROJECT_ID', this.restaurants[0].value)
        }
        this.selectSearch()
      }).catch(err => {
        console.log(err)
      })
    },
    remoteMethod (query) {
      console.log(query)
      if (query !== '') {
        if (this.restaurants.length === 0) {
          this.searchChange()
        }
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.restaurants = this.restaurants.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.options = []
      }
    },
    selectSearch (val) {
      this.dtu()
      this.dataList()
      this.lights()
    },
    // 获取路灯
    lights () {
      console.log(1)
      let data = {
        projectId: this.$store.state.project.addLightData.projectId,
        rand: Math.ceil(Math.random() * 10)
      }
      getTemplateListByProjectId(data).then(res => {
        console.log(res)
        this.light = res
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取DTU
    dtu () {
      let data = {
        projectId: this.$store.state.project.addLightData.projectId,
        fieldJson: {
          _id: '1',
          name: '1',
          tel: '1'
        }
      }
      dtuList(data).then(res => {
        console.log(res)
        this.dtuList = res.result
        // this.tableData = this.allData.slice(0, 10)
        // this.loading = false
        this.tableData = this.allData.slice(0, 10)
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 项目下所有的rtu
    dataList (val) {
      let str = String(Math.round((Math.random() * 10) + 1))
      let data = {
        projectId: this.$store.state.project.addLightData.projectId,
        rand: str
      }
      rtulistbyprojectId(data).then(res => {
        this.rtuList = res
        console.log(this.rtuList)
      }).catch(err => {
        console.log(err)
      })
    },
    handleSizeChange (val) {
      this.tableData = this.allData.slice((val - 1) * 10, 10 * val)
    },
    handleCurrentChange (val) {
      this.tableData = this.allData.slice((val - 1) * 10, 10 * val)
    },
    // 全选
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
    // },
    // handClick (val) {
    //   console.log(val)
    //   this.dialogVisible = true
    // },
    // // 城市下所属项目
    // handClickCity (val) {
    //   this.dialogVisible_city = true
    // },
    exportXLSX () {
      // 从表格生成workbook
      let wb = XLSX.utils.table_to_book(document.querySelector('.el-table'))
      let wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
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
    },
    readExcel (e) {
      // 读取表格文件
      let that = this
      const files = e.target.files
      if (files.length <= 0) {
        return false
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.$message({
          message: this.$t('wranUpload'),
          type: 'warning'
        })
        return false
      } else {
        // 更新获取文件名
        that.upload_file = files[0].name
      }

      const fileReader = new FileReader()
      fileReader.onload = ev => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            type: 'binary'
          })
          const wsname = workbook.SheetNames[0] // 取第一张表
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]) // 生成json表格内容
          console.log(ws)
          updateRtu(ws).then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
        } catch (e) {
          return false
        }
      }
      fileReader.readAsBinaryString(files[0])
    }
  }
}
</script>

<style lang='scss' scoped>
.block {
  margin-top: 30px;
}
.search {
  line-height: 40px;
}
.bottom-box {
  display: flex;
  justify-content: center;
}
.file {
  position: relative;
  display: inline-block;
  background: #409eff;
  border: 1px solid #333;
  padding: 4px 20px;
  box-sizing: border-box;
  overflow: hidden;
  text-decoration: none;
  text-indent: 0;
  line-height: 25px;
  height: 40px;
  border-radius: 4px;
  color: #fff;
  font-size: 13px;
  margin-right: 15px;
  cursor: pointer;
}
.file input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
</style>

<style lang='scss'>
.el-table--border td {
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}
.el-table {
  .el-table__body-wrapper {
    max-height: 550px;
    min-height: 550px;
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
    width: 10px;
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
.el-pagination .btn-next,
.el-pagination .btn-prev,
.el-pagination .el-pager li {
  background-color: transparent;
  border: 1px solid #eee;
  margin-right: 10px;
}
.el-pager li.active + li {
  border-left: 1px solid #eee;
}
.el-pagination button:disabled {
  background: transparent;
}
</style>

<style lang="scss">
.lightListDom {
  @media screen and(max-height:600px) {
    .el-table {
      .el-table__body-wrapper {
        max-height: 120px;
        min-height: 120px;
        // overflow-x: auto;
        // overflow-y: auto;
      }
      min-height: 120px;

      //   color: #fff;
      //   border: 1px solid rgba(255, 255, 255, 0.1);
      //   // min-height: 600px;
      //   overflow-y: auto;
      //   overflow-x: auto;
      //   //滚动条的宽度
      //   .your-table .el-table__body-wrapper::-webkit-scrollbar {
      //     width: 10px;
      //     height: 10px;
      //   }
      //   //滚动条的滑块
      //   .your-table .el-table__body-wrapper::-webkit-scrollbar-thumb {
      //     background-color: #a1a3a9;
      //     border-radius: 3px;
      //   }
      //   //滚动条的宽度
      //   ::-webkit-scrollbar {
      //     width: 10px;
      //     height: 10px;
      //   }
      //   //滚动条的滑块
      //   ::-webkit-scrollbar-thumb {
      //     background-color: #a1a3a9;
      //     border-radius: 3px;
      //   }
    }
    .block {
      justify-content: flex-end;
    }
  }
  @media screen and(max-height:768px) and (min-height: 600px) {
    .el-table {
      min-height: 280px;
      .el-table__body-wrapper {
        max-height: 280px;
        min-height: 280px;
      }
    }
  }
  @media screen and(max-height:900px) and (min-height: 768px) {
    .el-table {
      min-height: 400px;
      .el-table__body-wrapper {
        max-height: 400px;
        min-height: 400px;
      }
    }
  }
  @media screen and(max-height:960px) and (min-height: 900px) {
    .el-table {
      min-height: 450px;
      .el-table__body-wrapper {
        max-height: 450px;
        min-height: 450px;
      }
    }
  }
  @media screen and(max-height:960px) and (min-height: 900px) {
    .el-table {
      min-height: 450px;
      .el-table__body-wrapper {
        max-height: 450px;
        min-height: 450px;
      }
    }
  }
}
.English {
  .lightListDom {
    @media screen and(max-height:1024px) and (min-height: 960px) {
      .el-table {
        min-height: 450px;
        .el-table__body-wrapper {
          max-height: 450px;
          min-height: 450px;
        }
      }
    }
    @media screen and(max-height:1200px) and (min-height: 1024px) {
      .el-table {
        min-height: 500px;
        .el-table__body-wrapper {
          max-height: 500px;
          min-height: 500px;
        }
      }
    }
  }
}
</style>
