<template>
  <div class="dtuListDom">
    <div class="serach-box">
      <div class="serach_right">
        <el-input
          v-model="input"
          :placeholder="$t('tips.keyword')"
          @change="remoteMethod(input)"
          class="search"
        ></el-input>
        <el-button
          type="primary"
          @click="reset"
        >{{$t('peopel_list.Reset')}}</el-button>
        <el-button
          type="primary"
          @click="remoteMethod(input)"
        >{{$t('search.search')}}</el-button>

      </div>
    </div>
    <div style="overflow:hidden;margin-bottom:200px">
      <el-table
        ref="multipleTable"
        :data="tableData"
        v-loading="table_loading"
        style="margin-top:20px;"
        border
      >
        <el-table-column
          type="index"
          label="No."
          align="center"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="dtuName"
          :label="$t('DTU_list.name')"
        >
          <template slot-scope=row>
            <p
              class="hoveTitle"
              @click="handClick(row)"
            >{{row.row.name}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="tel"
          align="center"
          :label="$t('DTU_list.ID')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="projectName"
          align="center"
          :label="$t('DTU_list.project')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="version"
          align="center"
          :label="$t('DTU_list.Version')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="sendtime"
          align="center"
          :label="$t('DTU_list.The_sampling_period')"
        >
          <template slot-scope=row>
            <p class="hoveTitle">{{row.row.sendtime}}</p>
          </template>

        </el-table-column>
        <el-table-column
          prop="poll"
          align="center"
          :label="$t('DTU_list.Heartbeat')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="avchargev"
          align="center"
          :label="$t('DTU_list.Remarks')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="description"
          align="center"
          :label="$t('project_list.address')"
          show-overflow-tooltip
          width="200"
        >
          <template slot-scope="row">
            <div class="right-box">
              <div>
                <el-popover
                  placement="top"
                  width="160"
                  :ref="row.row._id"
                  v-model="row.row.id"
                >
                  <p>{{$t('remove.message')}}</p>
                  <div style="text-align: right; margin: 0">
                    <!-- <p>{{$t('tips.sureToDelete')}}</p> -->
                    <el-button
                      size="mini"
                      type="text"
                      @click="row.row.id = false"
                    >{{$t('tips.cancel')}}</el-button>
                    <el-button
                      type="primary"
                      size="mini"
                      @click="deleteClick(row.row)"
                    >{{$t('tips.confirm')}}</el-button>
                  </div>
                  <el-button
                    type="success"
                    plain
                    slot="reference"
                  ><i class="iconfont icon-shanchu"></i>{{$t('project_list.delete')}}</el-button>
                </el-popover>
              </div>
              <div>
                <el-button
                  type="success"
                  plain
                  @click="handerClick(row)"
                ><i class="iconfont icon-xiugai"></i>{{$t('project_list.modify')}}</el-button>
              </div>
            </div>
          </template>

        </el-table-column>

      </el-table>
      <div class="bottom-box">
        <div class="block">
          <el-pagination
            :current-page.sync="page"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="10"
            background
            layout="prev, pager, next, jumper"
            :total="filterData.length"
          >

          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog
      title="修改"
      :visible.sync="dialogVisible_city"
      width="30%"
    >
      <el-form
        :model="setDtuList"
        ref="set"
        label-width="100px"
        class="demo-add"
        :rules='rules'
      >
        <el-form-item
          :label="$t('DTU_list.name')"
          prop="name"
        >
          <el-input v-model="setDtuList.name"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('DTU_list.ID')"
          prop="tel"
        >
          <el-input
            v-model="setDtuList.tel"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('project')">
          <el-input
            v-model="setDtuList.dtuName"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('DTU_list.Version')">
          <el-input
            v-model="setDtuList.version"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('DTU_list.The_sampling_period')">
          <el-input
            v-model="setDtuList.sendtime"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('DTU_list.Heartbeat')">
          <el-input
            v-model="setDtuList.poll"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('DTU_list.Remarks')">
          <el-input v-model="setDtuList.avchargev"></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible_city = false">{{$t('search.cancel')}}</el-button>
        <el-button
          type="primary"
          @click="setClock"
        >{{$t('search.confirm')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { setDTU, dtuOne, removeDTU, DTU } from '@/api/dtu'
import { system } from '../../../static/js/SystemOperation'

// import { ProjectDetails, ProjectList } from '@/api/project'
export default {
  data () {
    return {
      input: '',
      table_loading: true,
      page: 1,
      restaurants: [],
      dtuList: [],
      projectList: [],
      tableData: [],
      // allData: [],
      filterData: [],
      dialogVisible: false,
      dialogVisible_city: false,
      detailList: [],
      projectName: [],
      setDtuList: {},
      rules: {
        name: [
          { required: true, message: this.$t('inputMessage.name'), trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    allData () {
      return this.dtuList
    }
  },
  mounted () {
    this.DTU_list()
  },
  methods: {
    DTU_list () {
      let data = {
        userId: JSON.parse(sessionStorage.getItem('nomouser'))._id,
        rand: Math.ceil(Math.random() * 10)
      }
      DTU(data).then(res => {
        this.dtuList = res.result
        this.filterData = this.allData
        this.tableData = this.filterData.slice(0, 10)
        this.table_loading = false
        // this.projectDetail()
      })
    },
    // 项目ID获取单个项目详情
    // projectDetail () {
    //   for (let i = 0; i < this.detailList.length; i++) {
    //     // let data = {
    //     //   projectId: JSON.parse(sessionStorage.getItem('nomouser'))._id
    //     // }
    //     // ProjectDetails().then(res => {
    //     //   this.projectList = res
    //     //   // this.projectName = (res)
    //     //   console.log(res)
    //     // }).catch(err => {
    //     //   console.log(err)
    //     // })
    //   }
    // },
    remoteMethod (query) {
      console.log(query)
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.filterData = this.allData.filter(item => {
            return item.name.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
          this.tableData = this.filterData.slice(0, 10)
        }, 200)
      } else {
        this.DTU_list()
      }
    },
    // 重置
    reset () {
      this.input = ''
      this.DTU_list()
    },
    // 获取项目下所有DTU
    // DTUList (val) {
    //   val.rootId = '5f6304ce5d0a038d3d44e4ab'
    //   dtuList(val).then(res => {
    //     // this.tableData = res
    //     console.log(res)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    // 创建DTU
    // addDtu () {
    //   addDTU(this.addDTU).then(res => {
    //     console.log(res)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },

    dtuDetail () {
      let data = {
        id: '',
        r: 2
      }
      dtuOne(data).then(res => {
        this.projectName.push(res)
        console.log(this.projectName)
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除DTU
    deleteClick (val) {
      console.log(val)
      this.table_loading = true
      let user = JSON.parse(sessionStorage.getItem('nomouser'))._id
      let dataLog = {
        userId: user,
        obj: 3,
        dtuname: '',
        operatename: 17,
        operattype: 0,
        time: Date.parse(new Date()),
        description: '删除终端',
        description_en: 'Delete terminale',
        description_spain: 'Eliminar terminal',
        projectId: val.projectId,
        tel: '',
        ip: ''
      }
      removeDTU(val._id).then(res => {
        console.log(res)
        system(dataLog)
        this.DTU_list()
        this.$refs[val._id].doClose()
        this.$message.closeAll()
        this.$message({
          type: 'success',
          message: this.$t('hint.success')
        })

        this.page = 1
      }).then(err => {
        console.log(err)
      })
    },
    // 换页
    handleSizeChange (val) {
      this.tableData = this.filterData.slice((val - 1) * 10, 10 * val)
    },
    handleCurrentChange (val) {
      this.tableData = this.filterData.slice((val - 1) * 10, 10 * val)
    },
    toggleSelection (rows) {
      this.$refs.multipleTable.toggleAllSelection()
    },
    handClick (val) {
      console.log(val)
      this.dialogVisible = true
    },
    // 修改
    handerClick (val) {
      this.dialogVisible_city = true
      this.setDtuList = val.row
      console.log(this.setDtuList)
    },
    // 修改DTU
    setClock () {
      this.table_loading = true
      let user = JSON.parse(sessionStorage.getItem('nomouser'))._id
      let dataLog = {
        userId: user,
        obj: 3,
        dtuname: '',
        operatename: 18,
        operattype: 0,
        time: Date.parse(new Date()),
        description: '修改终端',
        description_en: 'Modify terminal',
        description_spain: 'Modificar terminal',
        projectId: this.setDtuList.projectId,
        tel: '',
        ip: ''
      }
      this.$refs.set.validate((valid) => {
        if (valid) {
          setDTU(

          ).then(res => {
            system(dataLog)
            this.dialogVisible_city = false
            this.$message.closeAll()
            this.$message({
              type: 'success',
              message: this.$t('stateMessage.alterSuccess')
            })
            this.table_loading = false
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
    }
  }
}
</script>

<style lang='scss' scoped>
.btn-box {
  display: flex;
  margin-left: 20px;
}
.block {
  // margin-left: 20%;
  margin-top: 20px;
}
.bottom-box {
  display: flex;
  justify-content: space-around;
  .el-button + .el-button {
    margin: 0;
  }
}
.el-input__inner {
  background-color: transparent;
}
.hoveTitle {
  text-align: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
.el-table td,
.el-table th.is-leaf {
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.el-table__header tr,
.el-table__header th {
  padding: 0;
  height: 50px;
}
.el-table {
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.right-box {
  display: flex;
  justify-content: space-around;
}
.search {
  width: 200px;
}
.serach-box {
  display: flex;
  // justify-content: space-between;
}
.serach_right {
  display: flex;
  margin-left: 10px;
  .el-button {
    margin-left: 10px;
  }
}
</style>
<style>
.el-table {
  color: #fff;
}
.el-table__body tr:hover > td {
  background-color: #134087 !important;
}
</style>
<style lang='scss'>
.dtuListDom {
  .el-table {
    // min-height: 100px;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.1);

    .el-table__body-wrapper {
      // max-height: 550px;
      // min-height: 550px;
      overflow-x: auto;
      overflow-y: auto;
    }
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
}
</style>

<style lang="scss">
.ChineseDom {
  .dtuListDom {
    // 宽度适配
    @media screen and (max-width: 800px) {
      .el-table {
        width: 750px;
      }
    }
    // 高度适配
    @media screen and (max-height: 600px) {
      .el-table {
        .el-table__body-wrapper {
          max-height: 150px;
          min-height: 150px;
        }
      }
      .block {
        margin-top: 5px;
      }
    }
    @media screen and (max-height: 768px) and (min-height: 600px) {
      .el-table {
        .el-table__body-wrapper {
          max-height: 320px;
          min-height: 320px;
        }
      }
      .block {
        margin-top: 5px;
      }
    }
    @media screen and (max-height: 900px) and (min-height: 768px) {
      .el-table {
        .el-table__body-wrapper {
          max-height: 400px;
          min-height: 400px;
        }
      }
      .block {
        margin-top: 5px;
      }
    }
  }
}
.English {
  .dtuListDom {
    // 宽度适配
    @media screen and (max-width: 800px) {
      .el-table {
        width: 750px;
      }
    }
    // 高度适配
    @media screen and (max-height: 600px) {
      .el-table {
        .el-table__body-wrapper {
          max-height: 100px;
          min-height: 100px;
        }
      }
      .block {
        margin-top: 5px;
      }
    }
    @media screen and (max-height: 768px) and (min-height: 600px) {
      .el-table {
        .el-table__body-wrapper {
          max-height: 250px;
          min-height: 250px;
        }
      }
      .block {
        margin-top: 5px;
      }
    }
    @media screen and (max-height: 900px) and (min-height: 768px) {
      .el-table {
        .el-table__body-wrapper {
          max-height: 350px;
          min-height: 350px;
        }
      }
      .block {
        margin-top: 5px;
      }
    }
  }
}
</style>
