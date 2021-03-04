<template>
  <div>
    <div class="top">
      <div class="block">
        <span class="demonstration">{{$t('DataLight.endTime')}}:</span>
        <!-- <el-date-picker
          v-model="$store.state.data.startTime"
          type="date"
          placeholder="选择日期"
          value-format="timestamp"
        >
        </el-date-picker>-- -->
        <el-date-picker
          v-model="$store.state.data.endtime"
          type="date"
          :placeholder="$t('task_mode.date2')"
          value-format="timestamp"
        >
        </el-date-picker>
        <div style="margin-left:40px">
          <el-button
            type="primary"
            @click="search"
          >{{$t('search.search')}}</el-button>
        </div>

      </div>
    </div>
    <div class="tab_box">
      <div
        v-for="(item,index) in $store.state.data.lightList"
        :key="index"
      >
        <h3 style="display:flex;align-item:center;color:#fff;margin-top:20px;">{{item.result[0].rtuName}}
          <el-button
            type="primary"
            @click="exportXLSX(index)"
            style="margin-left:40% "
          >{{$t('Export')}}</el-button>
        </h3>
        <el-table
          :data="item.result"
          border
          style="width: 100%"
          class="box"
        >
          <el-table-column
            type="index"
            width="50"
          >
          </el-table-column>
          <el-table-column
            prop="pvvoltage"
            :label="$t('StatusList.pvvoltage')"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="bvoltage"
            :label="$t('StatusList.bvoltage')"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="ovoltage"
            :label="$t('StatusList.ovoltage')"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="ocurrent"
            :label="$t('StatusList.ocurrent')"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="ccurrent"
            :label="$t('StatusList.ccurrent')"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="cpower"
            :label="$t('StatusList.cpower')"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="dcpower"
            :label="$t('StatusList.dcpower')"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="temperature"
            :label="$t('StatusList.temperature')"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="itemperature"
            :label="$t('StatusList.itemperature')"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="date"
            :label="$t('system.date')"
            align="center"
            width="200px"
          >
          </el-table-column>
        </el-table>
        <!-- <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="item.pageNo"
            layout="prev, pager, next, jumper"
            :total="item.totalNum"
            :background='true'
          >
          </el-pagination>
        </div> -->

      </div>

    </div>
  </div>
</template>
<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  data () {
    return {
    }
  },
  methods: {
    search () {
      this.$store.commit('lightTable')
    },
    // 下载
    exportXLSX (i) {
      // 从表格生成workbook
      let wb = XLSX.utils.table_to_book(document.querySelectorAll('.el-table')[i])
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
    }

    // handleCurrentChange (val) {
    //   console.log(val)
    // }
  }
}
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.box {
  margin-top: 20px;
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
.tab_box {
  overflow-y: auto;
  max-height: 600px;
}
.block {
  display: flex;
  line-height: 40px;
}
.demonstration {
  color: #fff;
  margin-right: 10px;
}
</style>
<style lang="scss">
.el-input__inner {
  background-color: transparent;
}
.el-table {
  color: #fff;
  .el-table__body-wrapper {
    min-height: 550px;
  }
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
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background-color: transparent;
  border: 1px solid #eee;
}
.el-table--border td,
.el-table--border th,
.el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
  border-right: 1px solid hsla(0, 0%, 100%, 0.1);
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.el-table--border,
.el-table--group {
  border: 0;
}
</style>
