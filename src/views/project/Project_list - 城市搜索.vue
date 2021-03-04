<template>
  <div class="main">
    <Task />
    <Search />
    <!-- <button @click="setUpdatePsw">123</button> -->

    <div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        v-loading="loading"
        tooltip-effect="dark"
      >
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          type="index"
          width="60"
          label="No."
          align="center"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          :label="$t('project_list.project_name')"
          width="auto"
          show-overflow-tooltip
        >
          <template slot-scope=row>
            <p @click="handClick(row)">{{row.row.name}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="map_type"
          align="center"
          :label="$t('project_list.map_type')"
          show-overflow-tooltip
        >
          <template slot-scope=row>
            <div v-if="row.row.map_type===0">
              {{$t('project_list.baiduMap')}}
            </div>
            <div v-if="row.row.map_type===1">
              {{$t('project_list.googleMap')}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="country"
          align="center"
          :label="$t('project_list.country')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="province"
          align="center"
          :label="$t('project_list.province')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="city"
          align="center"
          :label="$t('project_list.city')"
          show-overflow-tooltip
        >
          <template slot-scope=row>
            <p @click="handClickCity(row)">{{row.row.city}}</p>
          </template>

        </el-table-column>
        <el-table-column
          prop="timezone"
          align="center"
          :label="$t('project_list.timezone')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="autoalarm"
          align="center"
          :label="$t('project_list.autoalarm')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="username"
          align="center"
          :label="$t('project_list.name')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          :label="$t('project_list.address')"
          width='auto'
        >
          <template slot-scope="{row}">
            <span
              type="success"
              plain
              @click="ClickDetail(row)"
              class="lookClick"
            >查看</span>
            <span
              type="success"
              plain
              @click="removeClick(row)"
            ><i class="iconfont icon-shanchu"></i></span>

            <span
              type="success"
              plain
              @click="handerClick(row)"
            ><i class="iconfont icon-xiugai"></i></span>

          </template>
        </el-table-column>
      </el-table>
      <div class="bottom-box">
        <!-- <div>
          <el-button @click="toggleSelection(tableData)">全选</el-button>
          <el-button @click="toggleReverse(tableData)">反选</el-button>
          <el-button>批量修改地图</el-button>
          <el-button>批量修改时区</el-button>
        </div> -->
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="allData.length"
            :background='true'
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
    <!-- 城市下所属项目 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible_city"
      width="30%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible_city = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible_city = false"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog
      title="项目修改"
      :visible.sync="$store.state.project.setProject"
      width="30%"
    >
      <el-form
        :model="add"
        ref="add"
        label-width="100px"
        class="demo-add"
      >
        <el-form-item
          :label="$t('search.project_name')"
          prop="name"
        >
          <el-input v-model="add.name"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('search.map_type')"
          prop="map_type"
        >
          <el-select
            v-model="add.map_type"
            :placeholder="$t('tips.please')"
          >
            <el-option
              v-for="item in maps"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('search.country')"
          prop="country"
        >
          <el-select
            v-model="add.country"
            :placeholder="$t('search.please')"
          >
            <el-option
              v-for="item in countrys_list"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('search.province')"
          prop="province"
        >
          <el-select
            v-model="add.province"
            :placeholder="$t('search.please')"
          >
            <el-option
              v-for="item in add.provinces"
              :key="item.value"
              :label="item.n"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('search.city')"
          prop="city"
        >
          <el-select
            v-model="add.city"
            :placeholder="$t('search.please')"
          >
            <el-option
              v-for="item in add.cities"
              :key="item.value"
              :label="item.n"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('search.timeZone')"
          prop="timezoneoffset"
        >
          <el-select
            v-model="add.timezoneoffset"
            placeholder="$t('search.please')"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('search.autoAlarm')"
          prop="autoalarm"
        >
          <el-input v-model="add.autoalarm"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('search.lightType')"
          prop="lightType"
        >
          <el-checkbox-group
            v-for="(item,index) in lightTypes"
            :key="index"
            v-model="add.lightType"
          >
            <el-checkbox :label="item._id">
              {{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="$store.state.project.setProject = false"> {{$t('search.cancel')}}</el-button>
        <el-button
          type="primary"
          @click="amendProject"
        >{{$t('search.confirm')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { updatePsw, removepj, writeProject, ProjectDetail } from '@/api/project'
import { TypebyAdmin } from '@/api/streetLamp'
import { getCountrys } from '@/utils/sanjiliandong/countrys'
import { getArea_chs } from '@/utils/sanjiliandong/location_chs'
import { getArea_en } from '@/utils/sanjiliandong/location_en'

import Search from './components/search'
import Task from '@/components/tag'

export default {
  data () {
    return {
      // tableData: this.$store.state.project.tableList,
      // allData: [],
      dialogVisible: false,
      dialogVisible_city: false,
      options: [],
      lightTypes: [],
      loading: true,
      page: 1,
      maps: [
        {
          value: 1,
          label: '谷歌地图'
        },
        {
          value: 0,
          label: '百度地图'
        }],
      countrys_list: [], // 筛选后的国家列表
      provinces_Mapping: [], // 所有国家对应的省份  映射数组
      provinces: [], // 选中国家的所有省份
      cities: [],
      countrys: [],
      areas: [
        {

        }
      ],
      city: '',
      add: {
        autoalarm: '',
        city: '',
        country: '',
        enable: true,
        lightType: [],
        map_type: '',
        name: '',
        province: '',
        timezoneoffset: 0
      }

    }
  },
  components: {
    Search,
    Task
  },
  computed: {
    tableData: function () {
      return this.$store.state.project.tableList
    },
    allData: function () {
      return this.$store.state.project.allData
    }
  },
  watch: {
    country (val, oldval) {
      this.province = ''
      this.city = ''
      let index = this.countrys.indexOf(val)
      if (index == -1) {
        console.log('err!!!   index==-1')
      } else {
        let provinces = this.provinces_Mapping[index].value
        delete provinces['n']
        this.provinces = []
        for (let i in provinces) {
          this.provinces.push({ n: provinces[i].n ? provinces[i].n : '-----', value: i })
          console.log(provinces[i].n ? provinces[i].n : '------')
        }
        this.remoteMethod(val, 'country')
      }
    },
    province (val, oldval) {
      this.city = ''
      this.cities = []
      console.log('选中省份编号 ： ' + val)
      let country = this.country
      let index_country = this.countrys.indexOf(country)
      let provinces = this.provinces_Mapping[index_country].value
      let province = provinces[val]
      for (let i in province) {
        this.cities.push({ n: province[i].n, value: i })
      }

      this.remoteMethod(val, 'province')
    },
    city (val, oldval) {
      console.log('选中的城市编号: ' + val)
      this.remoteMethod(val, 'city')
    },
    'add.country': {
      handler (newVal) {
        // this.add.province = "";
        // this.add.city = "";
        let index = this.countrys.indexOf(newVal)
        if (index == -1) {
          console.log('err!!!   index==-1')
        } else {
          let provinces = this.provinces_Mapping[index].value
          delete provinces['n']
          this.add.provinces = []
          for (let i in provinces) {
            this.add.provinces.push({ n: provinces[i].n ? provinces[i].n : '-----', value: i })
          }
        }
      }
    },
    'add.province': {
      handler (newVal) {
        // this.add.city = "";
        this.add.cities = []
        console.log('选中省份编号 ： ' + newVal)
        let country = this.add.country
        let index_country = this.countrys.indexOf(country)
        let provinces = this.provinces_Mapping[index_country].value
        let province = provinces[newVal]
        for (let i in province) {
          this.add.cities.push({ n: province[i].n, value: i })
        }
      }
    }
  },

  mounted () {
    this.projectData()
    this.lightType()
    this.handleCurrentChange()
    this.init()
    this.$root.$on('language_Change', value => {
      console.log('~~~~~~~~~~~~~~~~~~~~~~')
      console.log('~~~~~~~~~~~~~~~~~~~~~~')
      console.log('~~~~~~~~语言切换~~~~~~~')
      console.log('~~~~~~~~~~~~~~~~~~~~~~')
      console.log('~~~~~~~~~~~~~~~~~~~~~~')
      this.init()
    })
  },
  methods: {
    // 国家
    init () {
      // let lang=sessionStorage.getItem('language') || 'cn';
      this.country = ''
      this.province = ''
      this.city = ''
      this.countrys = getCountrys()
      console.log('this.countrys: ' + this.countrys)
      this.countrys_list = getCountrys()
      let areas
      if (sessionStorage.getItem('language') == 'cn') {
        areas = getArea_chs()
      } else {
        areas = getArea_en()
      }

      for (let i in areas) {
        this.provinces_Mapping.push({ value: areas[i], key: i })
      }
    },

    // 路灯模板
    lightType () {
      let obj = JSON.parse(sessionStorage.getItem('nomouser'))
      console.log(obj)
      let data = {
        rand: Math.ceil(Math.random() * 10)
      }
      TypebyAdmin(data).then(res => {
        console.log(res)
        this.lightTypes = res
      }).catch(err => {
        console.log(err)
      })
    },

    // 获取所有项目
    projectData () {
      this.$store.dispatch('TABLELIST')
      this.loading = false
    },
    // 编辑修改
    handerClick () {
      ProjectDetail(val._id).then(res => {
        this.add = res
        this.$store.commit('SET_DATA', this.add)
      }).catch(err => {
        console.log(err)
      })

      this.$store.commit('SET_DATA', val)
      //  修改项目坐标以及描述
      // pjconfig(val).then(res => {
      //   console.log(res)
      // }).catch(err => {
      //   console.log(err)
      // })
      // 修改当个项目
      // writeProject(val).then(res => {
      //   console.log(res)
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    amendProject () {
      this.$store.dispatch('SETPROJECT', this.add)
      this.projectData()
      this.page = 1
    },
    // 删除
    removeClick (val) {
      console.log(val._id)
      this.loading = true
      removepj(val).then(res => {
        this.$store.dispatch('TABLELIST')
        this.handleCurrentChange(1)
        this.loading = false
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 查看详情
    ClickDetail (val) {
      console.log(val._id)
      ProjectDetail(val._id).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // handleSizeChange (val) {
    //   console.log(12)
    //   console.log(val);
    //   // this.$store.commit('SIZECHANGE', val)
    //   // this.tableData = this.allData.slice((val - 1) * 10, 10 * val)
    // },
    handleCurrentChange (val) {
      console.log(val)
      this.$store.commit('SIZECHANGE', val)
      // this.tableData = this.allData.slice((val - 1) * 10, 10 * val)
    },
    // 全选反选
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
    // 城市下所属项目
    handClickCity (val) {
      this.dialogVisible_city = true
    }
    // 修改萤石云 APPkey、secret以及二级密码
    // setUpdatePsw () {
    //   let data = {
    //     appkey_ezviz: '1',
    //     secret_ezviz: '1',
    //     psw: '1',
    //     _id: '1'
    //   }
    //   updatePsw(data).then(res => {
    //     console.log(res)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // }
  }
}
</script>

<style lang='scss' scoped>
.main {
  margin-bottom: 200px;
}
.bottom-box {
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
}
.el-input__inner {
  background-color: transparent;
}
.main .el-table .warning-row {
  background: skyblue;
}
.main .el-table th,
.main .el-table tr {
  background-color: transparent;
}
.main .el-table,
.main .el-table__expanded-cell {
  background-color: rgba($color: #fff, $alpha: 0.1);
}
.main .el-table thead {
  color: #00eaff;
}
.main .el-table {
  /* 表格字体颜色 */
  font-size: 10px;
}
.main .el-table td,
.main .el-table th.is-leaf {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
// 表格行高
.main .el-table__header tr,
.main .el-table__header th {
  padding: 0;
  height: 50px;
}
.main .el-table__body tr,
.main .el-table__body td {
  padding: 0;
  height: 50px;
}
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background: none;
  border: 1px solid #ccc;
}
.bottom-box .el-button {
  border: 2px solid #00eaff;
  padding: 5px;
}

.lookClick {
  font-size: 18px;
  padding: 0 10px;
  line-height: 20px;
  border-right: 1px solid #eee;
  display: inline-block;
}
.lookClick:hover,
.icon-shanchu:hover,
.icon-xiugai:hover {
  color: #00eaff;
}
.icon-shanchu {
  font-size: 20px;
  cursor: pointer;
  padding: 0 10px;
  line-height: 20px;
  border-right: 1px solid #eee;
  display: inline-block;
}
.icon-xiugai {
  font-size: 20px;
  cursor: pointer;
}
</style>
<style lang='scss'>
.el-table {
  color: #fff;
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
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background-color: transparent;
  border: 1px solid #eee;
}
</style>
