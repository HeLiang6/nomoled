<template>
  <div>
    <div class="top">
      <div class="box">
        <span>{{$t('DataLight.endTime')}}:</span>
        <el-select
          v-model="echart"
          :placeholder="$t('task_mode.date2')"
          @change="echartChange"
        >
          <el-option
            v-for="item in echarts"
            :key="item.value"
            :label="$t(item.label)"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="box">
        <span>{{$t('DataLight.timeType')}}:</span>
        <el-select
          v-model="$store.state.data.type"
          :placeholder="$t('DataLight.placeholderType')"
          @change="typeChange"
        >
          <el-option
            v-for="item in dateType"
            :key="item.value"
            :label="$t(item.label)"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="box">
        <span>{{$t('system.date')}}:</span>
        <el-date-picker
          v-model="$store.state.data.electricTime"
          :value-format="$store.state.data.type==0?'yyyy-MM':'yyyy'"
          :type="$store.state.data.type==0?'month':'year'"
          placeholder=""
        >
        </el-date-picker>
      </div>
      <div>
        <el-button
          type="primary"
          @click="search"
        >{{$t('search.search')}}</el-button>
      </div>
    </div>
    <div>
      <div
        class="electric"
        v-show="$store.state.data.rtus.length==0"
      >
      </div>
    </div>
    <div class="electricity_light">
      <div
        v-if="$store.state.data.rtus.length>0"
        ref="light"
      >
        <!-- <div
        v-if="$store.state.data.rtus.length>0"
        class="light"
        ref="light"
      >

      </div> -->

      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getEnergyDailyStatistic, getEnergyMonthlyStatistic } from '@/api/large'

export default {
  data () {
    return {
      echart: 'line',
      time: null,
      echarts: [{
        value: 'line',
        label: 'DataLight.line'
      },
      {
        value: 'bar',
        label: 'DataLight.bar'
      }
      ],
      dateType: [
        {
          value: 0,
          label: 'DataLight.mouth'
        },
        {
          value: 1,
          label: 'DataLight.year'
        }
      ],
      electric: [], // 保存的数据
      lightList: [],
      dom: []
    }
  },
  mounted () {
    this.generate()
    this.month()
  },
  watch: {
    lightList: function (newVal, endVal) {
      console.log(newVal)
      // if (newVal) {
      //   let obj = [{
      //     date: [],
      //     list: []
      //   }]
      //   for (let i in newVal) {
      //     obj.date.push(i)
      //     obj.list.push(newVal[i])
      //   }

      //   this.lightEchart(this.dom, obj)
      // }
    }
  },

  methods: {
    // projectData () {

    // },
    month () {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth()
      let toMonth = year + '-' + (month + 1)
      this.time = toMonth
      console.log(this.time)
      this.$store.commit('Time', this.time)
    },
    // 切换时间类型
    typeChange (val) {
      console.log(val)
      if (val === 1) {
        let date = new Date()
        let year = date.getFullYear()
        console.log(year)
        this.time = year + ''
        this.$store.commit('Time', this.time)
      } else {
        this.month()
      }
    },
    generate (val) {
      let data = val
      this.electric = val
      // let date = data.map(function (item) {
      //   return item[0]
      // })
      // console.log(this.$store.state.large.day)
      let date = []
      let list = []
      // date = ['2020-1-1', '2020-1-2', '2020-1-3', '2020-1-4', '2020-1-5', '2020-1-6', '2020-1-7', '2020-1-8', '2020-1-9', '2020-1-10']
      // list = ['123', '1213', '11221', '1213', '323', '23', '1213', '1233', '23', '23']
      for (let i in data) {
        date.push(i)
        list.push(data[i])
      }
      // let valueList = data.map(function (item) {
      //   return item[1]
      // })
      let generate = echarts.init(document.querySelector('.electric'))
      generate.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [this.$t('DataLight.electric')],
          y: 'bottom',
          textStyle: {// 图例文字的样式
            color: '#2894b4',
            fontSize: 16
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '8%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: date,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#2894b4', // 这里是改变字体颜色
              fontSize: 12// 字体大小
            }
          }
        },
        yAxis: {
          type: 'value',
          // max: 'dataMax',
          min: 'dataMin',
          axisLabel: {
            show: true,
            textStyle: {
              color: '#2894b4', // 这里是改变字体颜色
              fontSize: 12// 字体大小
            },
            formatter: function (value) {
              var texts = []
              if (value) {
                if (value > 10000) {
                  texts.push(value / 1000 + 'k')
                } else {
                  texts.push(value)
                }
              }
              return texts
            }
          },
          splitLine: {
            show: false
          }

        },
        series: [
          {
            name: this.$t('DataLight.electric'),
            type: this.echart,
            showSymbol: false,
            data: list,
            smooth: true,
            areaStyle: {}
          }
        ]
      })
    },
    light (dom, id, name) {
      console.log(name)
      this.dom = dom
      console.log(dom)
      // console.log(id)
      // let ids = {
      //   rtuId: id
      // }
      let date = []
      let list = []

      // if (this.$store.state.data.type === 0) {
      //   getEnergyDailyStatistic(ids).then(res => {
      //     this.lightList = res

      //     // date = ['2020-1-1', '2020-1-2', '2020-1-3', '2020-1-4', '2020-1-5', '2020-1-6', '2020-1-7', '2020-1-8', '2020-1-9', '2020-1-10']
      //     // list = ['123', '1213', '11221', '1213', '323', '23', '1213', '1233', '23', '23']
      //     for (let i in res) {
      //       date.push(i)
      //       list.push(res[i])
      //     }
      //   }).catch(err => {
      //     console.log(err)
      //   })
      // } else {
      //   getEnergyMonthlyStatistic(id).then(res => {
      //     console.log(res)
      //     this.lightList = res
      //   }).catch(err => {
      //     console.log(err)
      //   })
      // }
      for (let i in id) {
        date.push(i)
        list.push(id[i])
      }

      // console.log(date)
      // 模拟数据
      // let date = []
      // let list = []
      // date = ['2020-1-1', '2020-1-2', '2020-1-3', '2020-1-4', '2020-1-5', '2020-1-6', '2020-1-7', '2020-1-8', '2020-1-9', '2020-1-10']
      // list = ['123', '1213', '11221', '1213', '323', '23', '1213', '1233', '23', '23']
      // for (let i in data) {
      //   date.push(i)
      //   list.push(data[i])
      // }
      // let valueList = data.map(function (item) {
      //   return item[1]
      // })
      // this.generate()
      let doms = echarts.init(dom)
      doms.setOption({
        title: {
          text: name,
          left: 'center',
          textStyle: {
            color: '#2894b4'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['发电量'],
          y: 'bottom',
          textStyle: {// 图例文字的样式
            color: '#2894b4',
            fontSize: 16
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '8%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: date,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#2894b4', // 这里是改变字体颜色
              fontSize: 12// 字体大小
            }
          }
        },
        yAxis: {
          type: 'value',
          max: 'dataMax',
          min: 'dataMin',
          axisLabel: {
            formatter: function (value) {
              var texts = []
              if (value > 1000) {
                texts.push(value / 1000 + 'k')
              } else {
                texts.push(value)
              }
              return texts
            },
            show: true,
            textStyle: {
              color: '#2894b4', // 这里是改变字体颜色
              fontSize: 12// 字体大小
            }

          },
          splitLine: {
            show: false
          }

        },
        series: [
          {
            name: '发电量',
            type: this.echart,
            showSymbol: false,
            data: list,
            smooth: true,
            areaStyle: {}
          }
        ]
      })
    },
    echartChange () {
      this.generate(this.electric)
      if (this.$store.state.data.rtus) {
        this.$parent.$parent.$parent.$parent.$refs.left.selectionFun(this.$store.state.data.dataRtuList)
      }
    },
    // 搜索
    search () {
      let data = {
      }
      if (this.$parent.$parent.$parent.$parent.$refs.left.activeVal === -1 && this.$store.state.data.rtus.length === 0) {
        data.projectId = this.$store.state.data.projectId
      } else if (this.$store.state.data.rtus.length > 0) {
        this.$parent.$parent.$parent.$parent.$refs.left.selectionFun(this.$store.state.data.dataRtuList)
      } else {
        console.log(this.$store.state.data.dtuId)
        data.dtuId = this.$store.state.data.dtuId
      }
      // let data = {
      //   projectId: this.$store.state.data.projectId
      //   // endtime: this.$store.state.data.electricTime
      //   // startdate:
      // }
      console.log(this.$parent.$parent.$parent.$parent.$refs.left.activeVal)
      if (this.$store.state.data.type === 0) {
        let arr = this.$store.state.data.electricTime.split('-')
        let day = new Date(arr[0], arr[1], 0)
        day.getDate()
        data.enddate = this.$store.state.data.electricTime + `-${day.getDate()}`
        data.startdate = this.$store.state.data.electricTime + '-01'
        getEnergyDailyStatistic(data).then(res => {
          console.log(res)
          this.generate(res)
        }).catch(err => {
          console.log(err)
        })
      } else {
        data.endmonth = this.$store.state.data.electricTime + '-12'
        data.startmonth = this.$store.state.data.electricTime + '-01'
        getEnergyMonthlyStatistic(data).then(res => {
          console.log(res)
          this.generate(res)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 路灯数据
    lightEchart (dom, val) {
      let doms = echarts.init(dom)
      doms.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['发电量'],
          y: 'bottom',
          textStyle: {// 图例文字的样式
            color: '#fff',
            fontSize: 16
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '8%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: val.date,
          axisLabel: {
            show: true,
            textStyle: {
              color: 'white', // 这里是改变字体颜色
              fontSize: 12// 字体大小
            }
          }
        },
        yAxis: {
          type: 'value',
          max: 'dataMax',
          min: 'dataMin',
          axisLabel: {
            show: true,
            textStyle: {
              color: 'white', // 这里是改变字体颜色
              fontSize: 12// 字体大小
            }

          },
          splitLine: {
            show: false
          }

        },
        series: [
          {
            name: '发电量',
            type: this.echart,
            showSymbol: false,
            data: val.list,
            smooth: true
          }
        ]
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  .box {
    margin-right: 30px;
    display: flex;
    align-items: center;
    span {
      margin-right: 10px;

      color: #fff;
    }
  }
}
.electric {
  width: 100%;
  height: 450px;
}
// .light {
//   width: 100%;
//   height: 450px;
// }
.electricity_light {
  overflow-y: auto;
  max-height: 600px;
}
</style>
<style lang="scss">
.el-input__inner {
  background: transparent;
}
.el-input {
  background: transparent;
}
</style>
