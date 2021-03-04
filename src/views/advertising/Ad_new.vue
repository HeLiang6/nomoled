<template>
  <div>
    {{$t('adManagement')}}
    <!-- <div>
      <p>广告管理</p>
      <button @click="addNew">add</button>
      <button @click="removeNew">remove</button>
      <button @click="setNew">set</button>
    </div> -->

    <div style="overflow:hidden;margin-bottom:200px">
      <el-select
        v-model="input"
        filterable
        remote
        size="small"
        class="search_ad"
        reserve-keyword
        :placeholder="$t('tips.keyword')"
        :remote-method="remoteMethod"
        :loading="loading"
        @change="selectChange"
      >
        <el-option
          v-for="item in restaurants"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <el-table
        ref="multipleTable"
        :data="tableData"
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
          prop="name"
          :label="$t('ad_list.Material_name')"
        >
        </el-table-column>
        <el-table-column
          prop="uid"
          align="center"
          :label="$t('ad_list.file_type')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="batterycapacity"
          align="center"
          :label="$t('ad_list.File_size')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="height"
          align="center"
          :label="$t('ad_list.Play_time')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="width"
          align="center"
          :label="$t('ad_list.Play_time')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="latitude"
          align="center"
          :label="$t('ad_list.Play_time')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="longitude"
          align="center"
          :label="$t('ad_list.Play_time')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="brightness"
          align="center"
          :label="$t('ad_list.Play_time')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="sendtime"
          align="center"
          :label="$t('ad_list.Features')"
          show-overflow-tooltip
        >
          <template slot-scope=row>
            <p
              class="hoveTitle"
              @click="handClickCity(row)"
            >{{row.row.sendtime}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          :label="$t('project_list.address')"
        >
          <template slot-scope="{row}">
            <el-button
              type="success"
              plain
              @click="deleteClick(row)"
            >{{$t('delete')}}</el-button>

            <el-button
              type="success"
              plain
              @click="handerClick(row)"
            >{{$t('edit')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="bottom-box">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="50"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 项目详情  -->
    <el-dialog
      :title="$t('tips')"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">{{$t('tips.cancle')}}</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >{{$t('tips.confirm')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { billboardlistbyrootId, getBillBoard, billboards, removeBillboards, setBillboards } from '@/api/advertising'
import { ProjectList } from '@/api/project'
export default {
  data () {
    return {
      input: '',
      tableData: [],
      dialogVisible: false,
      dialogVisible_city: false,
      restaurants: [],
      loading: true
    }
  },
  components: {
  },
  mounted () {
    this.searchChange()
    this.dataList()
  },
  methods: {
    dataList () {
      let data = {
        rand: Math.ceil(Math.random() * 10),
        billboardId: ''
      }
      getBillBoard(data).then(res => {
        this.tableData = res
      }).catch(err => {
        console.log(err)
      })
    },
    searchChange (val) {
      console.log(val)
      console.log(this.restaurants)
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
          this.restaurants.push(data)
        })
        console.log(this.restaurants)
      }).catch(err => {
        console.log(err)
      })
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.restaurants = this.restaurants.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.restaurants = []
      }
    },
    // 获取项目下所有广告牌设备

    selectChange (val) {
      console.log(val)
      let data = {
        r: String(Math.round((Math.random() * 10) + 1)),
        rootId: val
      }
      billboardlistbyrootId(data).then(res => {
        console.log(res)
        this.tableData = res
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    toggleSelection (rows) {
      this.$refs.multipleTable.toggleAllSelection()
    },
    toggleReverse (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handClick (val) {
      console.log(val)
      this.dialogVisible = true
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    // 添加广告牌设备
    addNew () {
      let data = {
        ip: '192.168.0.1',
        latitude: '39.958649',
        longitude: '116.443493',
        marker: null,
        name: '1',
        password: '123456',
        port: 8585,
        rootId: '5f62d7ed5d0a038d3d44e464',
        type: 'ad',
        uid: '6536',
        user: 'huawei'
      }
      billboards(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除广告牌
    removeNew () {
      removeBillboards('5f6bed8b38ea9ef72ecaeb15').then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 修改广告牌设备
    setNew () {
      let data = {
        brightness: 50,
        descripiton: '',
        ip: '192.168.0.1',
        latitude: '39.959865',
        longitude: '116.444211',
        marker: null,
        name: 'a66002',
        password: '123456',
        port: 8585,
        rootId: '5f62d7ed5d0a038d3d44e464',
        type: 'ad',
        uid: '000222',
        user: 'huawei',
        __v: 0,
        _id: '5f6bedd338ea9ef72ecaeb19'
      }
      setBillboards(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }

  }
}
</script>

<style lang='scss' scoped>
.search_ad {
  border: 1px solid #eee;
  width: 200px;
  margin-left: 20px;
}
.btn-box {
  display: flex;
  margin-left: 20px;
}
.block {
  // margin-left: 20%;
  margin-top: 30px;
}
.bottom-box {
  display: flex;
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
</style>
<style lang="scss">
.search {
  border: 0;
}
.el-input__inner {
  background-color: transparent;
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
// 表格行高
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
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background: none;
  // border: 1px solid #ccc;
}
.el-table--border th {
  border-right: 1px solid rgba($color: #fff, $alpha: 0.1);
}
.el-table--border {
  border: 1px solid rgba($color: #fff, $alpha: 0.1);
}
</style>
