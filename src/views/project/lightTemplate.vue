<template>
  <div class="lightTemplate">
    <div style="overflow:hidden;margin-bottom:200px;">
      <div style="overflow:hidden;">
        <div
          class="search"
          style="display:flex"
        >
          <!-- 搜索 @keyup.enter.native="onSubmit"  :fetch-suggestions="querySearch"-->
          <el-input
            v-model="val"
            @change="querySearch(val)"
            :placeholder="$t('rules.typeId')"
            :trigger-on-focus="false"
          ></el-input>
          <el-button
            @click="searchClick"
            type="primary"
          >
            {{$t('search.search')}}
          </el-button>
          <el-button
            @click="resetClick"
            type="primary"
          >
            {{$t('search.reset')}}
          </el-button>
          <el-button
            type="primary"
            @click="addlLight"
          >{{$t('search.add')}}</el-button>
          <el-button
            type="primary"
            @click="deleteClick"
          >{{$t('project_list.delete')}}</el-button>
          <el-button
            type="primary"
            @click="setLinght"
          >{{$t('search.set')}}</el-button>

        </div>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        v-loading="loading"
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
          label="no.."
          align="center"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          :label="$t('Street_lamp_management.model')"
        >
          <template slot-scope=row>
            <p
              class="hoveTitle"
              @click="handClick(row)"
            >{{row.row.name}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="solarpower"
          align="center"
          :label="$t('Street_lamp_management.Solar_panel_power')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="batterycapacity"
          align="center"
          :label="$t('Street_lamp_management.battery_capacity')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="loadlumen"
          align="center"
          :label="$t('Street_lamp_management.Output_lumen')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pvon"
          align="center"
          :label="$t('Street_lamp_management.Lighting_PV_voltage')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="batterytype"
          align="center"
          :label="$t('Street_lamp_management.type_of_battery')"
          show-overflow-tooltip
        >
          <template slot-scope="row">
            <div v-if="row.row.batterytype===0">
              {{$t('lightList.Lead_batteries')}}
            </div>
            <div v-if="row.row.batterytype===1">
              {{$t('lightList.lithium')}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="avchargev"
          align="center"
          :label="$t('Street_lamp_management.Charge_voltage')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="fchargev"
          align="center"
          :label="$t('Street_lamp_management.Float_voltage')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="protectv"
          align="center"
          :label="$t('Street_lamp_management.Undervoltage_protection')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="recoverv"
          align="center"
          :label="$t('Street_lamp_management.Voltaje_de_recuperación')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="engerymanage"
          align="center"
          :label="$t('Street_lamp_management.Energy_management')"
          show-overflow-tooltip
        >
          <template slot-scope="row">
            <div v-if="row.row.engerymanage===0">
              {{$t('lightList.Disable')}}
            </div>
            <div v-if="row.row.engerymanage===1">
              {{$t('lightList.Mode_one')}}
            </div>
            <div v-if="row.row.engerymanage===2">
              {{$t('lightList.Mode_two')}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="temperaturecompensation"
          align="center"
          :label="$t('Street_lamp_management.Temperature_compensation')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="vderatestart"
          align="center"
          :label="$t('Street_lamp_management.Derating_start_voltage')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="engerymanage"
          align="center"
          :label="$t('Street_lamp_management.Derating_end_voltage')"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
      <div class="bottom-box">
        <div style="position: absolute;top:20px">
          <el-button @click="toggleSelection(tableData)">{{$t('selectAll')}}</el-button>
          <el-button @click="toggleReverse(tableData)">{{$t('ReverseEelection')}}</el-button>
        </div>
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="filterData.length"
            :background='true'
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 添加  :show-close=false-->
    <el-dialog
      :title="$t('addOrEdit')"
      :visible.sync="$store.state.project.isLight"
      width="30%"
      ref="from"
      class="light_dialog"
    >
      <el-form
        label-width="120px"
        class="demo-ruleForm"
        ref="form"
        :model="$store.state.project.addsetFrom"
      >
        <el-form-item
          :label="$t('Street_lamp_management.model')"
          prop="name"
          :rules="[
            { required: true, message: $t('rules.message')},
          ]"
        >
          <el-input v-model="$store.state.project.addsetFrom.name"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('Street_lamp_management.Solar_panel_power')"
          prop="solarpower"
          :rules="[
            { required: true, message: $t('rules.message')},
          ]"
        >
          <el-input v-model.number="$store.state.project.addsetFrom.solarpower"></el-input>
          <span>W</span>
        </el-form-item>
        <el-form-item
          :label="$t('Street_lamp_management.battery_capacity')"
          prop="batterycapacity"
          :rules="[
            { required: true, message: $t('rules.message')},
          ]"
        >
          <el-input v-model.number="$store.state.project.addsetFrom.batterycapacity"></el-input>
          <span>WH</span>
        </el-form-item>
        <el-form-item
          :label="$t('Street_lamp_management.Output_lumen')"
          prop="loadlumen"
          :rules="[
            { required: true, message: $t('rules.message')},
          ]"
        >
          <el-input v-model.number="$store.state.project.addsetFrom.loadlumen"></el-input>
          <span>LM</span>
        </el-form-item>
        <el-form-item
          :label="$t('Street_lamp_management.Lighting_PV_voltage')"
          prop="pvon"
          :rules="[
            { required: true, message: $t('rules.message')},
          ]"
        >
          <el-input v-model.number="$store.state.project.addsetFrom.pvon"></el-input>
          <span>V</span>
        </el-form-item>
        <el-form-item
          :label="$t('Street_lamp_management.type_of_battery')"
          prop="batterytype"
          :rules="[
            {required: true, message: $t('rules.message')},
          ]"
        >
          <el-select
            v-model.number="$store.state.project.addsetFrom.batterytype"
            :placeholder="$t('tips.please')"
          >
            <el-option
              v-for="item in batterys"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <!-- <el-input v-model.number="$store.state.project.addsetFrom.batterytype"></el-input> -->
        </el-form-item>
        <el-form-item
          :label="$t('Street_lamp_management.Charge_voltage')"
          prop="avchargev"
          :rules="[
            { required: true, message: $t('rules.message')},
          ]"
        >
          <el-input v-model.number="$store.state.project.addsetFrom.avchargev"></el-input>
          <span>V</span>

        </el-form-item>
        <el-form-item
          :label="$t('Street_lamp_management.Undervoltage_protection')"
          prop="protectv"
          :rules="[
            { required: true, message: $t('rules.message')},
          ]"
        >
          <el-input v-model.number="$store.state.project.addsetFrom.protectv"></el-input>
          <span>V</span>
        </el-form-item>
        <el-form-item
          :label="$t('Street_lamp_management.Voltaje_de_recuperación')"
          prop="recoverv"
          :rules="[
            { required: true, message: $t('rules.message')},
          ]"
        >
          <el-input v-model.number="$store.state.project.addsetFrom.recoverv"></el-input>
          <span>V</span>
        </el-form-item>
        <el-form-item
          :label="$t('Street_lamp_management.Energy_management')"
          prop="name"
          :rules="[
            { required: true, message: $t('rules.message')},
          ]"
        >
          <el-select
            v-model.number="$store.state.project.addsetFrom.engerymanage"
            :placeholder="$t('tips.please')"
          >
            <el-option
              v-for="item in engerymanages"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>

          <!-- <el-input v-model="$store.state.project.addsetFrom.name"></el-input> -->
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancel">{{$t('search.cancel')}}</el-button>
        <el-button
          type="primary"
          @click="AddLightClick"
          v-if="btnflag"
        >{{$t('search.confirm')}}</el-button>
        <el-button
          type="primary"
          v-if="!btnflag"
          @click="setCompileClick"
        >{{$t('project_list.modify')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { system } from '../../../static/js/SystemOperation'
import { TypebyAdmin, deleteLight } from '@/api/streetLamp'

export default {
  data () {
    return {
      battery_type: '', // 电池类型
      loading: true,
      tableData: [],
      page: 1, // 页数
      // addLightBox: false,
      allData: [],
      filterData: [],
      multipleSelection: [],
      btnflag: '',
      val: '', // 搜索的值
      // 类型
      batterys: [{
        value: 0,
        label: this.$t('lightList.Lead_batteries')
      }, {
        value: 1,
        label: this.$t('lightList.lithium')
      }],
      engerymanages: [
        {
          value: 0,
          label: this.$t('lightList.Disable')
        },
        {
          value: 1,
          label: this.$t('lightList.Mode_one')
        },
        {
          value: 2,
          label: this.$t('lightList.Mode_two')
        }
      ]
    }
  },
  components: {
  },
  computed: {
    // addLightBox: function () {
    //   return this.$store.state.project.isLight
    // }
  },
  watch: {
    tableData: (newValue, oldValue) => {
      if (newValue.length !== 0 && oldValue.length === 0) {
        this.filterData = newValue
        return this.filterData.slice((this.page - 1) * 10, 10 * this.page)
      }
    }
  },
  mounted () {
    // 获取管理员账号创建的路灯模板
    this.handerClick()
  },
  methods: {
    //  搜索input
    querySearch (queryString) {
      if (queryString !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.filterData = this.allData.filter(item => {
            return item.name.toLowerCase()
              .indexOf(queryString.toLowerCase()) > -1
          })
          this.tableData = this.filterData.slice(0, 10)
        }, 200)
      } else {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.filterData = this.allData
          this.tableData = this.filterData.slice(0, 10)
        }, 200)
      }
    },
    createFilter (queryString) {
      return (restaurant, index) => {
        return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    // 搜索按钮
    searchClick () {
      this.querySearch(this.val)
    },
    // 重置
    resetClick () {
      this.loading = true
      this.filterData = this.allData
      this.tableData = this.filterData.slice(0, 10)
      this.loading = false
    },
    handerClick () {
      TypebyAdmin(1).then(res => {
        this.allData = res
        this.filterData = this.allData
        this.tableData = this.filterData.slice((this.page - 1) * 10, 10 * this.page)
        this.loading = false
      }).catch(err => {
        console.log(err)
      })
    },
    // 搜索框enter回车事件
    onSubmit () {
      this.val = ''
      this.handerClick()
    },
    // 删除
    deleteClick () {
      console.log(this.multipleSelection)
      if (this.multipleSelection.length < 1) {
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
          for (let i = 0; i <= this.multipleSelection.length; i++) {
            let data = {
              typeId: this.multipleSelection[i]._id,
              rand: Math.ceil(Math.random() * 10)
            }
            let user = JSON.parse(sessionStorage.getItem('nomouser'))._id
            let dataLog = {
              userId: user,
              obj: 11,
              dtuname: '',
              operatename: 29,
              operattype: 0,
              time: Date.parse(new Date()),
              description: '删除路灯类型',
              description_en: 'Delete street light type',
              description_spain: 'Eliminar tipo de alumbrado público',
              projectId: '',
              tel: '',
              ip: ''
            }
            deleteLight(data).then(res => {
              this.handerClick()
              system(dataLog)
              this.$message.closeAll()

              this.$message({
                type: 'success',
                message: this.$t('hint.success')
              })
              this.handerClick()
            })
          }
        }).catch(() => {
          console.log('err--------------------------')
          this.$message.closeAll()

          this.$message({
            type: 'info',
            message: this.$t('hint.info')
          })
        })
      }
    },
    handleSizeChange (val) {
      this.tableData = this.filterData.slice((val - 1) * 10, 10 * val)
    },
    // 第几页
    handleCurrentChange (val) {
      this.page = val
      this.tableData = this.filterData.slice((val - 1) * 10, 10 * val)
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
    // handClick (val) {
    //   console.log(val)
    //   this.dialogVisible = true
    // },
    // 多选事件
    handleSelectionChange (val) {
      console.log(val)
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    // 添加
    addlLight () {
      // this.addForm = []
      // this.addLightBox = true
      this.btnflag = true
      this.$store.commit('SETADDLIGHTBOX')
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
    },
    // 取消
    cancel () {
      this.btnflag = false
      this.$store.commit('SETADDLIGHT')
    },
    AddLightClick () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$store.dispatch('ADD_LIGHT')
          this.handerClick()
          this.$message.closeAll()
          this.$message({
            message: this.$t('stateMessage.addSuccess'),
            type: 'success'
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
    // 编辑
    setLinght () {
      this.btnflag = false
      console.log(this.multipleSelection)
      if (this.multipleSelection.length === 1) {
        // if (this.$refs.form) {
        //   console.log(1)
        //   this.$refs.form.clearValidate()
        // }

        this.$store.commit('SET_COMPILE', this.multipleSelection[0])
      } else if (this.multipleSelection.length > 1) {
        this.$message.closeAll()

        this.$message(this.$t('hint.choose'))
      } else {
        this.$message.closeAll()

        this.$message({
          message: this.$t('hint.choose_task'),
          customClass: 'leftMessage'
        })
      }
    },
    // 修改
    setCompileClick () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$store.dispatch('COMPILECLICK')

          this.$message({
            message: this.$t('stateMessage.alterSuccess'),
            type: 'success'
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
.main-top {
  width: 100%;
  border-radius: 5px;
  border: 1px solid #000;
  padding: 5px 5px;
  overflow: hidden;
}
.select {
  width: 120px;
  float: left;
}
.main-top .el-input__inner {
  border: 0;
}
.username {
  float: left;
  margin-left: 20px;
  .select-name {
    width: 120px;
  }
}
// .search {
//   border: 1px solid #eee;
//   width: 200px;
//   float: left;
//   margin-left: 20px;
// }
.block {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  // float: left;
  // margin: 20px auto;
}
.bottom-box {
  // display: flex;
  // justify-content: space-between;
  position: relative;
  overflow: hidden;
  height: 100%;
  .el-button {
    border: 2px solid #00eaff;
    padding: 5px;
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
.el-input {
  width: 80%;
}
// 搜索部分样式
.search {
  float: left;
  display: flex;
  margin-right: 15px;
  .el-input {
    margin-right: 15px;
  }
}
// .bottom-box .el-button {
//   color: red;
//   border: 2px solid #00eaff;
//   padding: 5px;
// }
</style>

<style lang='scss'>
.leftMessage {
  // position: relative;
  left: 20%;
  // top: 50px;
}
.search .el-input__inner {
  width: 150px;
}
.el-table__body-wrapper {
  // min-height: 400px;
}
.el-table {
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
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
  // min-height: 400px;
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
// 添加弹框样式
.light_dialog {
  .el-dialog {
    .el-dialog__body {
      height: 400px;
      overflow-y: auto;
    }
  }
}
</style>
<style lang='scss'>
// 适配
.ChineseDom {
  .lightTemplate {
    @media screen and(max-height:600px) {
      .el-table {
        .el-table__body-wrapper {
          max-height: 120px;
          min-height: 120px;
          overflow-x: auto;
          overflow-y: auto;
        }
        min-height: 120px;
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
    @media screen and(max-height:1084px) and (min-height: 960px) {
      .el-table {
        min-height: 480px;
        .el-table__body-wrapper {
          max-height: 480px;
          min-height: 480px;
        }
      }
    }
    @media screen and(max-height:1200px) and (min-height: 1084px) {
      .el-table {
        min-height: 550px;
        .el-table__body-wrapper {
          max-height: 550px;
          min-height: 550px;
        }
      }
    }
  }
}
.English {
  .lightTemplate {
    @media screen and(max-height:600px) {
      .el-table {
        .el-table__body-wrapper {
          max-height: 70px;
          min-height: 70px;
          overflow-x: auto;
          overflow-y: auto;
        }
        min-height: 70px;
      }
      .block {
        justify-content: flex-end;
      }
    }
    @media screen and(max-height:768px) and (min-height: 600px) {
      .el-table {
        min-height: 220px;
        .el-table__body-wrapper {
          max-height: 220px;
          min-height: 220px;
        }
      }
    }
    @media screen and(max-height:900px) and (min-height: 768px) {
      .el-table {
        min-height: 340px;
        .el-table__body-wrapper {
          max-height: 340px;
          min-height: 340px;
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
    @media screen and(max-height:1084px) and (min-height: 960px) {
      .el-table {
        min-height: 480px;
        .el-table__body-wrapper {
          max-height: 480px;
          min-height: 480px;
        }
      }
    }
    @media screen and(max-height:1200px) and (min-height: 1084px) {
      .el-table {
        min-height: 550px;
        .el-table__body-wrapper {
          max-height: 550px;
          min-height: 550px;
        }
      }
    }
  }
}
</style>
