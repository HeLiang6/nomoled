<template>
  <div>
    节目列表
    <div>
      <p>广告管理</p>
      <!-- <button @click="addNew">add</button>
      <button @click="removeNew">remove</button>
      <button @click="setNew">set</button> -->
    </div>

    <div style="overflow:hidden;margin-bottom:200px">
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
          prop="fileName"
          :label="$t('ad_list.Material_name')"
        >
        </el-table-column>
        <el-table-column
          prop="fileType"
          align="center"
          :label="$t('ad_list.file_type')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="size"
          align="center"
          :label="$t('ad_list.File_size')"
          show-overflow-tooltip
        >
          <template slot-scope="row">
            <div>
              {{row.row.size}}byte
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="duration"
          align="center"
          :label="$t('ad_list.Play_time')"
          show-overflow-tooltip
        >
        </el-table-column>
        <!-- <el-table-column
          prop="sendtime"
          align="center"
          :label="$t('ad_list.Features')"
          show-overflow-tooltip
        >
        </el-table-column> -->
        <el-table-column
          prop="address"
          align="center"
          :label="$t('project_list.address')"
        >
          <template slot-scope="{row}">
            <div class="btn">
              <el-button
                type="success"
                plain
                @click="deleteClick(row)"
              >{{$t('delete')}}</el-button>

              <el-button
                type="success"
                plain
                @click="handerClick(row)"
              >下载</el-button>

              <el-button
                type="success"
                plain
                @click="clickStatus(row)"
              >节目下发</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="bottom-box">
        <div style="margin-top: 20px">
          <el-button @click="toggleSelection(tableData)">{{$t('selectAll')}}</el-button>
          <el-button @click="toggleReverse(tableData)">{{$t('ReverseEelection')}}</el-button>
        </div>
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
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
    </el-dialog>
  </div>
</template>

<script>
import { files, billboardlistbyrootId } from '@/api/advertising'

export default {
  data () {
    return {
      tableData: [],
      allData: [],
      dialogVisible: false,
      dialogVisible_city: false
    }
  },
  components: {
  },
  mounted () {
    this.newList()
  },
  methods: {
    // 修改
    adFiles () {
      files().then(res => {
        this.allData = res
        this.tableData = this.allData.slice(0, 10)
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 换页
    handleSizeChange (val) {
      this.tableData = this.allData.slice((val - 1) * 10, 10 * val)
    },
    handleCurrentChange (val) {
      this.tableData = this.allData.slice((val - 1) * 10, 10 * val)
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
    // // 获取项目下所有广告牌设备
    newList () {
      let data = {
        r: 2,
        rootId: '5f62d7ed5d0a038d3d44e464'
      }
      billboardlistbyrootId(data).then(res => {
        this.tableData = res
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
    // 添加广告牌设备
    // addNew () {
    //   let data = {
    //     ip: '192.168.0.1',
    //     latitude: '39.958649',
    //     longitude: '116.443493',
    //     marker: null,
    //     name: '1',
    //     password: '123456',
    //     port: 8585,
    //     rootId: '5f62d7ed5d0a038d3d44e464',
    //     type: 'ad',
    //     uid: '6536',
    //     user: 'huawei'
    //   }
    //   billboards(data).then(res => {
    //     console.log(res)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    // 删除广告牌
    // removeNew () {
    //   removeBillboards('5f6bed8b38ea9ef72ecaeb15').then(res => {
    //     console.log(res)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    // 修改广告牌设备
    // setNew () {
    //   let data = {
    //     brightness: 50,
    //     descripiton: '',
    //     ip: '192.168.0.1',
    //     latitude: '39.959865',
    //     longitude: '116.444211',
    //     marker: null,
    //     name: 'a66002',
    //     password: '123456',
    //     port: 8585,
    //     rootId: '5f62d7ed5d0a038d3d44e464',
    //     type: 'ad',
    //     uid: '000222',
    //     user: 'huawei',
    //     __v: 0,
    //     _id: '5f6bedd338ea9ef72ecaeb19'
    //   }
    //   setBillboards(data).then(res => {
    //     console.log(res)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // }

  }
}
</script>

<style lang='scss' scoped>
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
.btn {
  display: flex;
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
</style>
