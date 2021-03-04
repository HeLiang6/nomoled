<template>
  <div>
    <div class="lightBox">
      <div class="box">
        <span>{{$t('DataLight.dataType')}}:</span>
        <el-select
          v-model="$store.state.data.numType"
          :placeholder="$t('DataLight.placeholderDataType')"
          @change="typeChange"
        >
          <el-option
            v-for="item in dataType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="box">
        <span>{{$t('DataLight.echartsType')}}:</span>
        <el-select
          v-model="echart"
          :placeholder="$t('DataLight.echartsPlaceholderType')"
          @change="echartType"
        >
          <el-option
            v-for="item in echarts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <!-- 时间 -->
      <div class="block">
        <span class="demonstration">{{$t('DataLight.selectTime')}}: </span>
        <el-date-picker
          v-model="$store.state.data.startTime"
          type="date"
          :placeholder="$t('rules.starttime')"
          value-format="timestamp"
        >
        </el-date-picker>--
        <el-date-picker
          v-model="$store.state.data.endtime"
          type="date"
          :placeholder="$t('rules.endtime')"
          value-format="timestamp"
        >
        </el-date-picker>
        <div>
          <el-button
            type="primary"
            @click="search"
          >{{$t('serach.serach')}}</el-button>
        </div>

      </div>
    </div>
    <div class="lightData_box">
      <div ref="light">
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getLightData } from '@/api/data'
import { setDate } from '../../task/components/date'
// import 'echarts/lib/component/title'
// import 'echarts/lib/component/tooltip'
export default {
  data () {
    return {
      dataType: [
        {
          value: 0,
          label: 'PV电压'
        },
        {
          value: 1,
          label: '电池参数'
        },
        {
          value: 2,
          label: 'LED参数'
        },
        {
          value: 3,
          label: '温度'
        },
        {
          value: 4,
          label: '电机状态'
        }
      ],
      echart: 'line',
      echarts: [{
        value: 'line',
        label: '折线图'
      },
      {
        value: 'bar',
        label: '柱状图'
      }
      ],
      lightData: [],
      title: []

    }
  },
  mounted () {
    // this.light()
  },

  methods: {
    light (dom, id, name) {
      console.log(dom)

      let date = []
      let list = {

        pvvoltage: [],
        bvoltage: [],
        ccurrent: [],
        cpower: [],
        ovoltage: [],
        ocurrent: [],
        dcpower: [],
        itemperature: [],
        temperature: [],
        motor: []
      }

      let data = {
        rtuId: id,
        starttime: this.$store.state.data.startTime,
        endtime: this.$store.state.data.endtime
      }
      this.title = []
      getLightData(data).then(res => {
        console.log(res)
        res.result.map(item => {
          item.date = setDate(item.time)
          if (this.$store.state.data.numType === 0) {
            this.title = [this.$t('StatusList.pvvoltage')]
            list.pvvoltage.push(item.pvvoltage)// pv电压
          } else if (this.$store.state.data.numType === 1) {
            this.title = [this.$t('StatusList.bvoltage'), this.$t('StatusList.ccurrent'), this.$t('StatusList.cpower')]
            list.bvoltage.push(item.bvoltage)// 蓄电池电压
            list.ccurrent.push(item.ccurrent)// 充电电流
            list.cpower.push(item.cpower)// 充电功率
          } else if (this.$store.state.data.numType === 2) {
            this.title = [this.$t('StatusList.ovoltage'), this.$t('StatusList.ocurrent'), this.$t('StatusList.dcpower')]
            list.ovoltage.push(item.ovoltage)// 输出电压
            list.ocurrent.push(item.ocurrent)// 输出电流
            list.dcpower.push(item.dcpower)// 放电功率
          } else if (this.$store.state.data.numType === 3) {
            this.title = [this.$t('StatusList.interior'), this.$t('StatusList.external')]

            list.itemperature.push(item.itemperature)// 内部温度
            list.temperature.push(item.temperature)// 外部温度
          } else if (this.$store.state.data.numType === 4) {
            // this.title = ['正常:0', '电池电压达不到启动值:1', '故障:2 ', '手动电机工作中:3', '早晨清扫工作中:4', '傍晚清扫工作中:5', '手动清扫完成:6', '早晨清扫完成:7', '傍晚清扫完成:8']
            this.title = [this.$t('DataLight.stateMotor')]
            // this.echart = 'bar'
            list.motor.push(item.motor)// 电机
            // list.temperature.push(item.temperature)// 外部温度
          }
          // list.pvvoltage.push(item.pvvoltage)
          // date.push(item.date.replace(/\s/g, ''))
          date.push(item.date)
        })
        console.log(name)
        this.lightEchart(dom, date, list, name)
      }).catch(err => {
        console.log(err)
      })
      // 模拟数据
      // date = ['2020-1-1', '2020-1-2', '2020-1-3', '2020-1-4', '2020-1-5', '2020-1-6', '2020-1-7', '2020-1-8', '2020-1-9', '2020-1-10']
      // list = ['123', '1213', '11221', '1213', '323', '23', '1213', '1233', '23', '23']
      // for (let i in data) {
      //   date.push(i)
      //   list.push(data[i])
      // }
      // let valueList = data.map(function (item) {
      //   return item[1]
      // })
    },
    echartType () {
      console.log(this.$store.state.data.dataRtuList)
      this.$parent.$parent.$parent.$parent.$refs.left.selectionFun(this.$store.state.data.dataRtuList, 'four')
    },
    // formatData (mouth) {
    //   console.log(mouth)
    //   this.date = []
    //   let arr = []

    //   for (let i in mouth) {
    //     arr.push(mouth[i])
    //     this.date.push(i)
    //   }
    //   console.log(arr)
    //   let newHashArray = []
    //   for (var i = 0; i < arr.length; i++) {
    //     let obj = {}
    //     let temp = arr[i]
    //     if (arr[i] > 0 && arr[i] < 1) {
    //       arr[i] = arr[i] * 3000
    //     } else if (arr[i] > 1 && arr[i] < 100) {
    //       arr[i] = 3000 + arr[i] * (3000 / 99)
    //     } else if (arr[i] > 100 && arr[i] < 400) {
    //       arr[i] = 6000 + arr[i] * (3000 / 200)
    //     } else if (arr[i] > 300 && arr[i] < 500) {
    //       arr[i] = 9000 + arr[i] * (3000 / 200)
    //     } else if (arr[i] > 500 && arr[i] < 1000) {
    //       arr[i] = 12000 + arr[i] * (3000 / 500)
    //     } else if (arr[i] > 1000 && arr[i] < 10000) {
    //       arr[i] = 15000 + arr[i] * (3000 / 9000)
    //     }
    //     obj.value = arr[i]
    //     obj.formatV = temp
    //     newHashArray.push(obj)
    //   }
    //   this.arr = newHashArray
    //   console.log(this.arr)
    //   this.mouth()
    // },

    lightEchart (dom, date, list, name) {
      let doms = echarts.init(dom)
      let index = this.$store.state.data.numType
      let titles = JSON.parse(JSON.stringify(this.title))
      let _that = this
      console.log(titles)
      doms.setOption({
        title: {
          text: name,
          left: 'center',
          textStyle: {
            color: '#2894b4'
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter (param) {
            console.log(param[0].seriesName)
            let str
            if (param[index]) {
              str = `${param[index].axisValue}<br/>`
            }
            for (let i = 0; i < param.length; i++) {
              if (param[i].seriesName) {
                console.log(param[i].seriesName)
                if (param[i].seriesName == _that.$t('DataLight.stateMotor')) {
                  console.log(param[i])
                  return `${param[i].axisValue}<br/>电机状态:${param[i].data}
                   `
                  //             <br/>正常: 0
                  // <br/>电池电压达不到启动值: 1
                  // <br/>故障: 2
                  // <br/>手动电机工作中: 3
                  // <br/>早晨清扫工作中: 4
                  // <br/>傍晚清扫工作中: 5
                  // <br/>傍晚清扫工作中: 5
                  // <br/>手动清扫完成: 6
                  // <br/>早晨清扫完成: 7
                  // <br/>傍晚清扫完成: 8
                } else {
                  str = str.concat('', `${param[i].seriesName}:${param[i].data}<br/>`)
                  console.log(str)
                }
              }
            }
            return str
          }
        },
        legend: {
          data: titles,
          y: 'bottom',
          textStyle: {// 图例文字的样式
            color: '#2894b4',
            fontSize: 12
          }
        },
        grid: {
          left: '7%',
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
            show: true,
            textStyle: {
              color: '#2894b4', // 这里是改变字体颜色
              fontSize: 12// 字体大小
            }
          },
          splitLine: {
            show: false
          }
          // formatter: function (v) {
          //   let item = ''
          //   if (v === 0) {
          //     item = '0'
          //   } else if (v === 3000) {
          //     item = '10'
          //   } else if (v === 6000) {
          //     item = '100'
          //   } else if (v === 9000) {
          //     item = '300'
          //   } else if (v === 12000) {
          //     item = '500'
          //   } else if (v === 15000) {
          //     item = '1000'
          //   } else if (v === 18000) {
          //     item = '10000'
          //   } else if (v === 21000) {
          //     item = '20000'
          //   } else if (v === 24000) {
          //     item = '30000'
          //   }
          //   return item
          // }
        },
        series: [
          {
            name: this.$t('StatusList.pvvoltage'),
            type: this.echart,
            showSymbol: false,
            data: list.pvvoltage,
            smooth: true,
            barWidth: '20%'
          },
          {
            name: this.$t('StatusList.bvoltage'),
            type: this.echart,
            showSymbol: false,
            data: list.bvoltage,
            smooth: true,
            barWidth: '20%'

          },
          {
            name: this.$t('StatusList.ccurrent'),
            type: this.echart,
            showSymbol: false,
            data: list.ccurrent,
            smooth: true,
            barWidth: '20%'

          },
          {
            name: this.$t('StatusList.cpower'),
            type: this.echart,
            showSymbol: false,
            data: list.cpower,
            smooth: true,
            barWidth: '20%'

          },
          {
            name: this.$t('StatusList.ovoltage'),
            type: this.echart,
            showSymbol: false,
            data: list.ovoltage,
            smooth: true,
            barWidth: '20%'

          },
          {
            name: this.$t('StatusList.ocurrent'),
            type: this.echart,
            showSymbol: false,
            data: list.ocurrent,
            smooth: true,
            barWidth: '20%'

          },
          {
            name: this.$t('StatusList.dcpower'),
            type: this.echart,
            showSymbol: false,
            data: list.dcpower,
            smooth: true,
            barWidth: '20%'

          },
          {
            name: this.$t('StatusList.interior'),
            type: this.echart,
            showSymbol: false,
            data: list.itemperature,
            smooth: true,
            barWidth: '20%'

          },
          {
            name: this.$t('StatusList.external'),
            type: this.echart,
            showSymbol: false,
            data: list.temperature,
            smooth: true,
            barWidth: '20%'
          },
          {
            name: this.$t('DataLight.stateMotor'),
            type: this.echart,
            showSymbol: false,
            data: list.motor,
            smooth: false
          }
        ]
      })
    },
    typeChange () {
      this.$parent.$parent.$parent.$parent.$refs.left.selectionFun(this.$store.state.data.dataRtuList, 'four')
    },
    // 搜索
    search () {
      this.$parent.$parent.$parent.$parent.$refs.left.selectionFun(this.$store.state.data.dataRtuList, 'four')
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  display: flex;
  line-height: 40px;
}
.lightBox {
  display: flex;
  .box {
    margin-right: 30px;
    span {
      color: #fff;
    }
  }
  // .block{
  //   margin-right: 30px;
  // }
}
.lightData_box {
  overflow-y: auto;
  max-height: 600px;
}
.lightData {
  width: 100%;
  height: 450px;
}
.demonstration {
  color: #fff;
}
</style>
<style lang="scss">
.lightBox {
  .el-input--suffix .el-input__inner {
    width: 150px;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 150px;
  }
}
</style>
