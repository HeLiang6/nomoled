<template>
  <!--{{$t('StatusList.status_0')}}-->
  <div class="main-top">
    <el-select
      filterable
      remote
      reserve-keyword
      class="select"
      v-model="country"
      :placeholder="$t('search.country_please')"
      size="small"
    >
      <el-option
        v-for="item in countrys_list"
        :key="item"
        :label="item"
        :value="item"
      >
      </el-option>
    </el-select>
    <div class="username">
      <el-select
        class="select"
        v-model="province"
        :no-data-text="$t('search.countryFirst')"
        :placeholder="$t('search.province_please')"
        size="small"
      >
        <el-option
          v-for="item in provinces"
          :key="item.value"
          :label="item.n"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="username">
      <el-select
        class="select"
        v-model="city"
        :no-data-text="$t('search.provinceFirst')"
        :placeholder="$t('search.city_please')"
        size="small"
      >
        <el-option
          v-for="item in cities"
          :key="item.value"
          :label="item.n==''?'-----':item.n"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <el-select
      v-model="input"
      filterable
      size="small"
      class="searchSelect"
      reserve-keyword
      :loading="project_loading"
      :placeholder="$t('search.project_name')"
      remote
      :remote-method="(query)=>{remoteMethod(query,'name')}"
      @change="projectChage"
    >
      <!-- :no-data-text="$t('search.null')" -->
      <el-option
        v-for="item in restaurants"
        :key="item.label"
        :label="item.label"
        :value="item.label"
      >
      </el-option>
      <template>
        <div
          slot="empty"
          style="text-align:center;color:#ccc;font-size:16px;line-height:26px;"
        >
          {{$t('search.nullMessage')}}
        </div>
      </template>
    </el-select>

    <div class="btn-box">
      <!-- <el-button
        @click="search"
        type="primary"
      >{{$t('search.search')}}</el-button> -->
      <el-button
        v-has="205"
        type="primary"
        @click="reset"
      >{{$t('search.reset')}}</el-button>
      <el-button
        type="primary"
        @click="addClick"
      >{{$t('search.add')}}</el-button>
    </div>
    <!-- 添加 -->
    <el-dialog
      :title="$t('search.project_add')"
      :visible.sync="dialogVisible"
      width="30%"
      id="addBox"
    >
      <el-form
        :model="add"
        ref="add"
        label-width="150px"
        class="demo-add"
        :rules="ruls"
      >
        <!-- <el-form-item label=""></el-form-item> -->
        <el-form-item
          :label="$t('search.project_name')"
          prop="name"
        >
          <el-input
            v-model="add.name"
            @input="inputName($event)"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('search.map_type')"
          prop="map_type"
        >
          <el-select
            v-model="add.map_type"
            :placeholder="$t('search.please')"
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
              v-for="(item,index) in countrys_list"
              :key="index"
              :label="item"
              :value="index"
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
              v-for="item in provinces_Arr"
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
              v-for="item in cities"
              :key="item.value"
              :label="item.n==''?'-----':item.n"
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
            v-model="add.timezone"
            :placeholder="$t('search.please')"
          >
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
          :label="$t('search.autoAlarm')"
          prop="autoalarm"
        >
          <!-- <el-input v-model="add.autoalarm"></el-input> -->
          <el-select
            v-model="add.autoalarm"
            :placeholder="$t('search.please')"
          >
            <el-option
              v-for="(item,index) in times"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
        <el-button @click="dialogVisible = false"> {{$t('search.cancel')}}</el-button>
        <el-button
          type="primary"
          @click="addData"
        > {{$t('search.confirm')}}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { setProject, ProjectList } from '@/api/project'
import { TypebyAdmin } from '@/api/streetLamp'
import { system } from '../../../../static/js/SystemOperation'

import { getCountrys } from '@/utils/sanjiliandong/countrys'
import { getArea_chs } from '@/utils/sanjiliandong/location_chs'
import { getArea_en } from '@/utils/sanjiliandong/location_en'
import { log } from 'three'
export default {
  data () {
    return {
      shakeProof: null,
      countrys: [], // 所有国家列表
      countrys_list: [], // 筛选后的国家列表
      country: '', // 选中国家
      provinces_Mapping: [], // 所有国家对应的省份  映射数组
      provinces: [], // 选中国家的所有省份
      province: '', // 选中省份
      cities: [],
      provinces_Arr: [],
      city: '',
      input: '',
      options: [],
      list: [],
      maps: [
        {
          value: 1,
          label: '谷歌地图'
        },
        {
          value: 0,
          label: '百度地图'
        }
      ],
      dialogVisible: false,
      loading: true,
      project_loading: false,
      restaurants: [],
      areas: [
        {

        }
      ],
      add: {
        autoalarm: '',
        city: '',
        country: '',
        enable: true,
        lightType: [],
        map_type: '',
        name: null,
        province: '',
        timezoneoffset: 0
      },
      lightTypes: [],
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
      },
      times: [
        {
          value: 30,
          label: '30min'
        },
        {
          value: 60,
          label: '60min'
        },
        {
          value: 90,
          label: '90min'
        },
        {
          value: 120,
          label: '120min'
        }
      ]
    }
  },
  mounted () {
    this.searchChange()
    this.lightType()
    // this.searchChange()
    this.init()
    this.$root.$on('language_Change', value => {
      this.init()
    })
  },
  methods: {
    myTrim (str) {
      if (str == null) {
        return null
      }
      return str.replace(/(^\s+)|(\s+$)/g, '')
    },
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
    // 更新input 输入框
    inputName (e) {
      console.log(this.add.name)
      this.$forceUpdate()
    },
    addClick () {
      this.dialogVisible = true
      if (this.$refs.add) {
        this.$refs.add.resetFields()
      }
    },
    reset () {
      this.country = ''
      this.provinces = []
      this.province = ''
      this.city = ''
      this.input = ''
      this.$store.dispatch('TABLELIST')
      this.remoteMethod(null, false)
    },
    searchChange () {
      this.restaurants = []
      let str = String(Math.round((Math.random() * 10) + 1))
      console.log(this.$store.state.user.nomouse)
      let data = {
        userId: this.$store.state.user.nomouser._id,
        r: str
      }
      ProjectList(data).then(res => {
        this.restaurants = []
        this.list = []
        console.log(res)
        res.result.map(item => {
          let data = {
            value: item._id,
            label: item.name
          }
          this.list.push(data)
          this.restaurants.push(data)
        })
        console.log(this.restaurants)
      }).catch(err => {
        console.log(err)
      })
    },
    remoteMethod (query, type) {
      query = this.myTrim(query)
      // console.log(query)
      // console.log(type)
      // this.searchChange()
      let obj = {}
      obj[type] = query
      this.$store.commit('DATAFILTER', obj)
      if (query !== '' && query !== null) {
        if (this.restaurants.length === 0) {
          this.searchChange()
        } else {
          this.project_loading = true
          setTimeout(() => {
            this.project_loading = false
            this.restaurants = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1
            })
          }, 200)
        }
      } else {
        this.restaurants = this.list
      }

      // this.restaurants.filter((item, index) => {
      //   return (item.label.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      // })
      // console.log(results)
    },
    projectChage (val) {
      this.remoteMethod(val, 'name')
      // console.log(val)
    },
    // createFilter (queryString) {
    //   return (restaurant) => {
    //     console.log(restaurant)
    //     // return (restaurant.label.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
    //   }
    // },
    // 搜索
    search () {
      this.$store.commit('SEARCH', this.input)
    },
    // 添加
    addData () {
      // this.$refs.body.$el.style.scrollTop = 0
      this.$refs.add.validate((valid) => {
        if (valid) {
          let user = JSON.parse(sessionStorage.getItem('nomouser'))._id
          let dataLog = {
            userId: user,
            obj: 1,
            dtuname: '',
            operatename: 10,
            operattype: 0,
            time: Date.parse(new Date()),
            description: '添加项目',
            description_en: 'Add item',
            description_spain: 'Añadir artículo',
            projectId: '',
            tel: '',
            ip: ''
          }
          setProject(this.add).then(res => {
            console.log(res)
            this.$store.dispatch('TABLELIST')
            // this.searchChange()
            system(dataLog)
            this.$message({
              message: this.$t('stateMessage.addSuccess'),
              type: 'success'
            })
            this.dialogVisible = false
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
    },
    init () {
      // let lang=sessionStorage.getItem('language') || 'cn';
      this.country = ''
      this.province = ''
      this.city = ''
      this.add.country = ''
      this.add.province = ''
      this.add.city = ''
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
    }
  },
  watch: {
    country (val, oldval) {
      this.province = ''
      this.city = ''
      let index = this.countrys.indexOf(val)
      if (index === -1) {
        console.log('err!!!   index==-1')
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
      console.log('选中省份编号 ： ' + val)
      let country = this.country
      let index_country = this.countrys.indexOf(country)
      let provinces = this.provinces_Mapping[index_country].value
      let province = provinces[val]
      for (let i in province) {
        if (i === 'n' || province[i].n == 'n') {
          continue// 省名  直接跳过
        }
        this.cities.push({ n: province[i].n, value: i })
        if (province[i].n == '') {
          console.log('没有城市名')
          console.log(this.cities[this.cities.length - 1])
        }
      }
      this.remoteMethod(province.n, 'province')
    },
    city (val, oldval) {
      let cityName = ''
      for (let i in this.cities) {
        console.log(i)
        if (this.cities[i].value === val) { cityName = this.cities[i].n }
      }
      this.remoteMethod(cityName, 'city')
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
        // console.log(this.provinces_Mapping)
        let provinces = this.provinces_Mapping[index_country].value
        let province = provinces[newVal]
        for (let i in province) {
          if (i === 'n' || province[i].n == 'n') {
            continue// 省名  直接跳过
          }
          this.cities.push({ n: province[i].n, value: i })
          if (province[i].n == null) {
            console.log('没有城市名')
            console.log(this.cities[this.cities.length - 1])
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-top {
  padding: 20px 40px;
  overflow: hidden;
  background: rgba($color: #ffffff, $alpha: 0.1);
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.select {
  width: 120px;
  float: left;
  margin-right: 10px;
}
.username {
  margin-left: 20px;
  .select-name {
    width: 120px;
  }
}
.searchSelect {
  width: 200px;
  float: left;
  margin-left: 20px;
}
.btn-box {
  display: flex;
  margin-left: 20px;
}
</style>

<style lang='scss'>
#addBox {
  .el-dialog {
    // height: 60%;
    // overflow-y: auto;
    // &::-webkit-scrollbar {
    //   display: none;
    // }
    max-width: 450px;
  }
  .el-dialog__body {
    overflow-y: auto;
    height: 400px;

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

    .el-input__inner {
      max-width: 220px;
    }
  }
}

.main-top .el-input__inner {
  color: skyblue;
}
.el-scrollbar {
  // height: 200px;
  padding-bottom: 20px;
}
</style>
