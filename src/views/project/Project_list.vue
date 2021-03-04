<template>
  <div class="main">
    <Search />
    <div class="project_table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        v-loading="loading"
        tooltip-effect="dark"
        @row-click="openDetails"
        @selection-change="handleSelectionChange"
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
            <p @click.stop="cityClick(row.row)">{{row.row.city}}</p>
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
          <template slot-scope='row'>
            <div
              style="cursor: pointer"
              @click.stop="warnClick(row.row)"
            >
              {{row.row.autoalarm}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('project_list.name')"
          show-overflow-tooltip
        >
          <template slot-scope="row">
            <div>
              <span v-if="row.row.usersChain.length===0">[用户信息缺失]</span>
              <span
                @click.stop="userClick(row.row.usersChain[0])"
                v-if="
                row.row.usersChain.length===1"
              >{{row.row.usersChain[0].userName?row.row.usersChain[0].userName:'[用户名缺失]'}}</span>
              <div v-if="row.row.usersChain.length>1">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item
                    v-for="(item,index) in row.row.usersChain.filter((a)=>{return a!==row.row.usersChain[0]})"
                    :key="index"
                    id="user"
                  ><span @click.stop="userClick(item)">{{item.userName}}</span></el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          :label="$t('project_list.address')"
          width='200'
        >
          <template slot-scope="scope">
            <span
              type="success"
              plain
              @click.stop="lookClick(scope.row)"
              class="lookClick"
              title="查看项目"
            ><i class="iconfont icon-chakan"></i></span>
            <span
              type="success"
              plain
              @click.stop="ClickDetail(scope.row)"
              class="lookClick"
              :title="$t('project_list.add')"
            ><i class="iconfont icon-tianjiashebei"></i></span>
            <el-popover
              placement="top"
              width="160"
              :ref="scope.row._id"
              v-model="scope.row.visible"
            >
              <p>{{$t('hint.hint_message')}}？</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  size="mini"
                  type="text"
                  @click="scope.row.visible = false"
                >{{$t('search.cancel')}}</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="removeClick(scope.row)"
                >{{$t('search.confirm')}}</el-button>
              </div>
              <span
                type="success"
                plain
                slot="reference"
                :title="$t('hint.clickRemove')"
              >
                <i
                  @click.stop="scope.row.visible=true"
                  class="iconfont icon-shanchu"
                ></i></span>
            </el-popover>
            <span
              type="success"
              plain
              @click.stop="handerClick(scope.row)"
              style="padding-left:5px;"
              :title="$t('project_list.compile')"
            ><i class="iconfont icon-xiugai"></i></span>
          </template>
        </el-table-column>
      </el-table>
      <div class="bottom-box">
        <div style="position: absolute;top:20px;">
          <el-button @click="toggleSelection(tableData)">全选</el-button>
          <el-button @click="toggleReverse(tableData)">反选</el-button>
          <el-button @click="batchSetMap">批量修改地图/批量修改时区</el-button>
        </div>
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
    <!-- <el-dialog
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
    </el-dialog> -->
    <!-- 修改项目地图时区 -->
    <el-dialog
      title="批量修改"
      :visible.sync="setMap_dialog"
      width="20%"
    >
      <div>
        <span style="display:inline-block;width:100px;text-align:right;">地图类型: </span>
        <el-select
          v-model="setMaps"
          placeholder=""
        >
          <el-option
            v-for="(item,index) in listMaps"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div style="margin-top:10px;">
        <span style="display:inline-block;width:100px;text-align:right;">时区: </span>
        <el-select
          v-model="setTimezones"
          placeholder=""
        >
          <el-option
            v-for="(item,index) in timeZones"
            :key="index"
            :label="item.timezone"
            :value="item.timezone"
          ></el-option>
        </el-select>

      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="setMap_dialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="SureToModify"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog
      :title="$t('Project_modification')"
      :visible.sync="$store.state.project.setProject"
      width="30%"
      class="project_dialog"
    >
      <el-form
        :model="add"
        ref="add"
        label-width="150px"
        class="demo-add"
        :rules="ruls"
      >
        <el-form-item
          :label="$t('Project_name')"
          prop="name"
        >
          <el-input v-model="add.name"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('map_type')"
          prop="map_type"
        >
          <el-select
            v-model="$store.state.project.addList.map_type"
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
          :label="$t('tips.country')"
          prop="country"
        >
          <el-select
            v-model="$store.state.project.addList.country"
            :placeholder="$t('tips.please')"
          >
            <el-option
              v-for="(item,index) in countrys_list"
              :key="index"
              :label="item"
              :value="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('tips.province')"
          prop="province"
        >
          <el-select
            v-model="$store.state.project.addList.province"
            :placeholder="$t('tips.please')"
          >
            <el-option
              v-for="item in provinces_Arr"
              :key="item.value"
              :label="item.n"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('tips.city')"
          prop="city"
        >
          <el-select
            v-model="$store.state.project.addList.city"
            :placeholder="$t('tips.please')"
          >
            <el-option
              v-for="item in cities"
              :key="item.value"
              :label="item.n"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('tips.timeZone')"
          prop="timezoneoffset"
        >
          <!-- <el-select
            v-model="$store.state.project.addList.timezoneoffset"
            :placeholder="$t('tips.please')"
          > -->

          <el-select v-model="$store.state.project.addList.timezone">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.timezone"
              :value="item.timezone"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('tips.autoAlarm')"
          prop="autoalarm"
        >
          <el-input v-model="add.autoalarm"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('tips.lightType')"
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
        <el-button @click="$store.state.project.setProject = false">{{$t('tips.cancel')}}</el-button>
        <el-button
          type="primary"
          @click="amendProject"
        >{{$t('tips.confirm')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { removepj, ProjectDetail, ProjectList, batchUpdateProjects } from '@/api/project'
import { TypebyAdmin, getTemplateListByUserId } from '@/api/streetLamp'
import { getCountrys } from '@/utils/sanjiliandong/countrys'
import { getArea_chs } from '@/utils/sanjiliandong/location_chs'
import { getArea_en } from '@/utils/sanjiliandong/location_en'
import { translateCharacters } from '@/utils/sanjiliandong/translate'
import { system } from '../../../static/js/SystemOperation'

import Search from './components/search'

export default {
  data () {
    return {
      // tableData: this.$store.state.project.tableList,
      // allData: [],
      dialogVisible: false,
      setMap_dialog: false,
      options: [],
      lightTypes: [],
      loading: true,
      visible: false,
      page: 1,
      maps: [
        {
          value: 1,
          label: this.$t('project_list.googleMap')
        },
        {
          value: 0,
          label: this.$t('project_list.baiduMap')
        }],
      listMaps: [
        {
          value: -1,
          label: '暂不修改'
        },
        {
          value: 1,
          label: this.$t('project_list.googleMap')
        },
        {
          value: 0,
          label: this.$t('project_list.baiduMap')
        }],
      setMaps: -1,
      timeZones: [],
      setTimezones: '暂不修改',
      listId: '',
      countrys_list: [], // 筛选后的国家列表
      provinces_Mapping: [], // 所有国家对应的省份  映射数组
      provinces: {}, // 选中国家的所有省份
      provinces_Arr: [],
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
        timezone: 0,
        timezoneoffset: 0
      },
      ruls: {
        name: [
          { required: true, message: this.$t('inputMessage.name'), trigger: 'blur' }
        ],
        map_type: [
          { required: true, message: this.$t('rules.map_type'), trigger: 'blur' }
        ],
        country: [
          { required: true, message: this.$t('rules.country'), trigger: 'blur' }
        ],
        province: [
          { required: true, message: this.$t('rules.province'), trigger: 'blur' }
        ],
        city: [
          { required: true, message: this.$t('rules.city'), trigger: 'blur' }
        ],
        timezoneoffset: [
          { required: true, message: this.$t('rules.timezoneoffset'), trigger: 'blur' }
        ],
        autoalarm: [
          { required: true, message: this.$t('rules.autoalarm'), trigger: 'blur' }
        ],
        lightType: [
          { required: true, message: this.$t('rules.lightType'), trigger: 'blur' }
        ]
      }

    }
  },
  components: {
    Search
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
      if (index === -1) {
      } else {
        let provinces = this.provinces_Mapping[index].value
        delete provinces['n']
        this.provinces = []
        for (let i in provinces) {
          this.provinces.push({ n: provinces[i].n ? provinces[i].n : '-----', value: i })
        }
        this.remoteMethod(val, 'country')
      }
    },
    province (val, oldval) {
      this.city = ''
      this.cities = []
      let country = this.country
      let index_country = this.countrys.indexOf(country)
      let provinces = this.provinces_Mapping[index_country].value
      let province = provinces[val]

      for (let i in province) {
        if (i === 'n' || province[i].n == 'n') {
          continue// 省名  直接跳过
        }
        this.cities.push({ n: province[i].n, value: i })
      }

      this.remoteMethod(val, 'province')
    },
    city (val, oldval) {
      this.remoteMethod(val, 'city')
    },
    'add.country': {
      handler (newVal, oldVal) {
        console.log('oldVal:' + oldVal)
        console.log('newVal:' + newVal)
        if (newVal != oldVal && !!oldVal) {
          this.add.province = null
          this.add.city = null
        }
        let index
        if (typeof (newVal) === 'number') {
          index = newVal
        } else {
          index = this.countrys.indexOf(newVal)
        }
        if (index < 0) {
          console.log('err!!!   index==-1')
        } else {
          let provinces = this.provinces_Mapping[index].value
          delete provinces['n']
          this.provinces_Arr = []
          for (let i in provinces) {
            this.provinces_Arr.push({ n: provinces[i].n ? provinces[i].n : '-----', value: i })
          }
        }
      }
    },
    'add.province': {
      handler (newVal, oldVal) {
        if (newVal != oldVal && !!oldVal) {
          this.add.city = ''
        }
        this.cities = []
        let index_country
        if (typeof (this.add.country) === 'number') { // 兼容以前的
          index_country = this.add.country
        } else {
          index_country = this.countrys.indexOf(this.add.country)
        }
        console.log('index_country....' + index_country)
        let provinces = this.provinces_Mapping[index_country].value
        let province = provinces[newVal]

        for (let i in province) {
          if (i === 'n' || province[i].n == 'n') {
            continue// 省名  直接跳过
          }
          this.cities.push({ n: province[i].n, value: i })
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
      console.log('-------触发language_Change事件----------')
      this.init()
      this.projectData()
    })
    // window['inputRule'] = function(value){
    //     return value+ '%';
    // }
    this.getProject()
  },
  methods: {
    // 国家
    init () {
      // let lang=sessionStorage.getItem('language') || 'cn';
      this.country = ''
      this.province = ''
      this.city = ''
      this.countrys = getCountrys()
      this.countrys_list = getCountrys()
      let areas
      if (sessionStorage.getItem('language') === 'cn') {
        areas = getArea_chs()
      } else {
        areas = getArea_en()
      }
      for (let i in areas) {
        this.provinces_Mapping.push({ value: areas[i], key: i })
      }
      this.options = []
      for (let i = 0; i <= 12; i++) {
        this.options.push({ timezone: 'GMT+' + i + ':00', offset: i * 60 })
      }
      for (let i = 11; i > 0; i--) {
        this.options.push({ timezone: 'GMT-' + i + ':00', offset: -i * 60 })
      }
    },
    // 路灯模板
    lightType () {
      let obj = JSON.parse(sessionStorage.getItem('nomouser'))
      let data = {
        rand: Math.ceil(Math.random() * 10)
      }
      TypebyAdmin(data).then(res => {
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
    getLightTypes: () => {
      console.log('获取路灯模板..............')
      let random = Math.random()
      let nomouse = sessionStorage.getItem('nomouser')
      let data = JSON.parse(nomouse)
      let userId = data.username
      let lightTypes = getTemplateListByUserId({ userId, random })
      this.$store.commit('SETLIGHTTYPE', lightTypes)
    },
    // 编辑修改
    handerClick (val) {
      ProjectDetail(val._id).then(async res => {
        res.country_value = res.country
        res.province_value = res.province
        res.city_value = res.city
        res = await translateCharacters(res)
        this.add = res
        this.$store.commit('SET_DATA', this.add)
      }).catch(err => {
        console.log(err)
      })
      if (this.$refs.add) {
        this.$refs.add.resetFields()
      }

      this.$store.commit('SET_DATA', val)
    },
    amendProject () {
      // 兼容以前的数据，或者未选择的时候将中文或者英文转换为值
      if ((this.add.country.toString().match(/\d+/g) == null) && (!!this.add.country_value)) {
        this.add.country = this.add.country_value
      }
      if ((this.add.province.toString().match(/^[0-9A-Z]{1,}$/) == null) && (!!this.add.province_value)) {
        this.add.province = this.add.province_value
      }
      if ((this.add.city.toString().match(/^[0-9A-Z]{1,}$/) == null) && (!!this.add.city_value)) {
        this.add.city = this.add.city_value
      }
      if (this.add.timezone.indexOf('GMT') == 0) {
        for (let i in this.options) {
          if (this.add.timezone === this.options[i].timezone) {
            this.add.timezoneoffset = this.options[i].offset
            break
          }
        }
      }
      //* ******************************************************************* */
      this.projectData()
      this.page = 1
      this.$refs.add.validate((valid) => {
        if (valid) {
          this.$store.dispatch('SETPROJECT', this.add)
          this.projectData()
          this.page = 1
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
    },
    // 删除
    removeClick (val, scope) {
      console.log(val)
      console.log(scope)
      let user = val.userId
      if (val.userId === 'admin') {
        user = JSON.parse(sessionStorage.getItem('nomouser'))._id
      }
      let dataLog = {
        userId: user,
        obj: 1,
        dtuname: '',
        operatename: 11,
        operattype: 0,
        time: Date.parse(new Date()),
        description: '项目删除',
        description_en: 'Item delete',
        description_spain: 'Eliminar elemento',
        projectId: val._id,
        tel: '',
        ip: ''
      }
      this.loading = true
      removepj(val).then(res => {
        system(dataLog)
        this.$message({
          type: 'success',
          message: this.$t('hint.success')
        })
        this.$store.dispatch('TABLELIST')
        // this.handleCurrentChange(1)
        this.page = 1
        this.loading = false
        this.$refs[val._id].doClose()
        // scope._self.$refs[`popoverDel - ${val._id}`].doClose()
        // scope.$refs[`popoverDel - ${val._id}`].doClose()
      }).catch(err => {
        console.log(err)
      })
    },
    // 添加DTU
    ClickDetail (val) {
      this.$router.push({
        path: '/Device_Center',
        query: {
          id: val._id,
          dtu: true
        }
      })
    },
    handleCurrentChange (val) {
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
      this.dialogVisible = true
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    // 点击项目跳转到设备中心
    openDetails (row) {
      console.log(row)
      this.$router.push({
        path: '/Device_Center',
        query: {
          id: row._id
        }
      })
    },
    warnClick (val) {
      console.log(val._id)
      this.$router.push({
        path: '/warnList',
        query: {
          id: val._id
        }
      })
    },
    // 城市下所属项目
    cityClick (val) {
      // this.dialogVisible_city = true
      console.log(val)
      let data = this.tableData.filter((item, index) => {
        if (item.city === val.city) {
          return item
        }
      })
      console.log(data)
      this.$store.commit('SETTABLELIST', data)
    },
    // 点击表格用户
    userClick (user) {
      console.log(user)
      let data = {
        userId: user.userId,
        r: String(Math.round((Math.random() * 10) + 1))
      }
      ProjectList(data).then(res => {
        console.log(res)
        this.$store.commit('SETTABLELIST', res.result)
        // this.dataList()
      }).catch(err => {
        console.log(err)
      })
    },
    // 点击查看项目下的设备
    lookClick (val) {
      this.$router.push({
        path: '/lightList',
        query: {
          id: val._id
        }
      })
    },
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
    getProject () {
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
        // this.projectList = res.result
        // console.log(this.ProjectList)
        // this.$store.commit('PROJECT_LIST', this.projectList)
        this.$store.commit('SET_PROJECT_ID', res.result[0]._id)
        // this.dataList()
      }).catch(err => {
        console.log(err)
      })
    },
    handleSelectionChange (val) {
      console.log(val)
      this.listId = []
      val.map(item => {
        this.listId.push(item._id)
      })
      console.log(this.listId)
    },
    batchSetMap () {
      console.log(123)
      this.setMap_dialog = true
      this.timeZones = [{ timezone: '暂不修改' }]
      for (let i = 0; i <= 12; i++) {
        this.timeZones.push({ timezone: 'GMT+' + i + ':00' })
      }
      for (let i = 11; i > 0; i--) {
        this.timeZones.push({ timezone: 'GMT-' + i + ':00' })
      }
      console.log(this.timeZones)
      this.setMaps = -1
      this.setTimezones = '暂不修改'
    },
    // 确定批量修改提交
    SureToModify () {
      let data = {
        projectIds: this.listId
      }
      if (this.setMaps === -1) {
        // data.map_type = ''
      } else {
        data.map_type = this.setMaps
      }
      if (this.setTimezones === '暂不修改') {
        // data.timezone = null
      } else {
        data.timezone = this.setTimezones
      }
      console.log(this.timeZones)
      console.log(data)
      if (data.map_type && data.timezone) {
        batchUpdateProjects(data).then(res => {
          console.log(res)
          this.$message.closeAll()
          this.$message({
            type: 'success',
            message: this.$t('stateMessage.alterSuccess')
          })
          this.setMap_dialog = false
          this.$store.dispatch('TABLELIST')
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.setMap_dialog = false
      }
    }

  }
}
</script>

<style lang='scss' scoped>
.main {
  margin-bottom: 200px;
}
.bottom-box {
  position: relative;
  overflow: hidden;
  height: 100%;
}
#user {
  width: 100%;
  color: #fff;
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
  cursor: pointer;
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
.block {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
<style lang='scss'>
.el-breadcrumb__item:last-child .el-breadcrumb__inner,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover {
  color: #fff;
  cursor: pointer;
}
.el-table {
  color: #fff;
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
    width: 10px;
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
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background-color: transparent;
  border: 1px solid #eee;
}
.project_dialog .el-dialog {
  .el-dialog__body {
    height: 440px;
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
  max-width: 450px;
  .el-input__inner {
    max-width: 220px;
  }
}
</style>

<style lang='scss'>
.ChineseDom {
  .project_table {
    @media screen and (max-height: 600px) {
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
    @media screen and (max-height: 768px) and (min-height: 600px) {
      .el-table {
        min-height: 280px;
        .el-table__body-wrapper {
          max-height: 280px;
          min-height: 280px;
        }
      }
    }
    @media screen and (max-height: 900px) and (min-height: 768px) {
      .el-table {
        min-height: 400px;
        .el-table__body-wrapper {
          max-height: 400px;
          min-height: 400px;
        }
      }
    }
    @media screen and (max-height: 960px) and (min-height: 900px) {
      .el-table {
        min-height: 450px;
        .el-table__body-wrapper {
          max-height: 450px;
          min-height: 450px;
        }
      }
    }
    @media screen and (max-height: 960px) and (min-height: 900px) {
      .el-table {
        min-height: 450px;
        .el-table__body-wrapper {
          max-height: 450px;
          min-height: 450px;
        }
      }
    }
  }
}
.English {
  .project_table {
    @media screen and (max-height: 600px) {
      .el-table {
        .el-table__body-wrapper {
          max-height: 60px;
          min-height: 60px;
          overflow-x: auto;
          overflow-y: auto;
        }
        min-height: 60px;
      }
      .block {
        justify-content: flex-end;
      }
    }
    @media screen and (max-height: 768px) and (min-height: 600px) {
      .el-table {
        min-height: 220px;
        .el-table__body-wrapper {
          max-height: 220px;
          min-height: 220px;
        }
      }
    }
    @media screen and (max-height: 900px) and (min-height: 768px) {
      .el-table {
        min-height: 350px;
        .el-table__body-wrapper {
          max-height: 350px;
          min-height: 350px;
        }
      }
    }
    @media screen and (max-height: 960px) and (min-height: 900px) {
      .el-table {
        min-height: 350px;
        .el-table__body-wrapper {
          max-height: 350px;
          min-height: 350px;
        }
      }
    }
    @media screen and(max-height:1200px) and (min-height: 960px) {
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
