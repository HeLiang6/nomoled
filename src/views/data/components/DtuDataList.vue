<template>
  <div>
    <div style="display:flex;margin-bottom:10px">
      <div class="block">
        <span class="demonstration">{{$t('system.date')}}:</span>
        <el-date-picker
          v-model="$store.state.data.endtime"
          type="date"
          placeholder="选择日期"
          value-format="timestamp"
        >
        </el-date-picker>
      </div>
      <el-button
        style="margin-left:30px"
        type="primary"
        @click="search"
      >{{$t('search.search')}}</el-button>

    </div>
    <div>
      <el-table
        ref="tab"
        :data="$store.state.data.dtuList.result"
        border
        style="width: 100%"
        class="box"
      >
        <el-table-column
          prop="rtuName"
          label="RtuName"
          align="center"
          width="150px"
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
    </div>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        layout="prev, pager, next, jumper"
        :total="$store.state.data.dtuList.totalNum"
        :background='true'
      >
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { getLightData } from '@/api/data'

export default {
  data () {
    return {
      page: null
    }
  },
  methods: {
    handleCurrentChange (val) {
      console.log(val)
      this.page = val
      let data = {
        dtuId: this.$store.state.data.dtuId,
        pageNo: val,
        pageSize: 10,
        endtime: this.$store.state.data.endtime
      }
      getLightData(data).then(res => {
        console.log(res)
        let list = {
          lis: res,
          dtu: this.$store.state.data.dtuId
        }
        this.$store.commit('DtuList', list)
        console.log(list)
        // this.$refs.tab.scrollTop = 0
      }).catch(err => {
        console.log(err)
      })
    },
    search () {
      this.handleCurrentChange(1)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
<style lang="scss">
.el-input__inner {
  background-color: transparent;
}
.el-table {
  color: #fff;
  .el-table__body-wrapper {
    // min-height: 550px;
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
  border: 1px solid hsla(0, 0%, 100%, 0.1);
}
</style>
