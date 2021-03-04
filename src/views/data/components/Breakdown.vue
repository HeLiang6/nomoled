<template>
  <div>
    <div class="top">
      <div class="box">
        <span>{{$t('DataLight.echartsType')}}: </span>
        <el-select
          v-model="echart"
          :placeholder="$t('DataLight.echartsPlaceholderType')"
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
        <span>{{$t('DataLight.timeType')}}: </span>
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
        <span>{{$t('system.date')}}: </span>
        <el-date-picker
          v-model="time"
          :value-format="$store.state.data.type==0?'yyyy-MM':'yyyy'"
          :type="$store.state.data.type==0?'month':'year'"
          :placeholder="$t('DataLight.placeholderTime')"
          @change="dateChange"
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
      <div class="Breakdown">
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getWarnStatistic } from '@/api/data'

export default {
  data () {
    return {
      echart: 'line',
      type: null,
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
      ]
    }
  },
  mounted () {
    // this.Breakdown(this.list)
    this.month()
    this.search()
  },
  methods: {
    month () {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth()
      let toMonth = year + '-' + (month + 1)
      this.time = toMonth
      console.log(this.time)
    },
    Breakdown (val) {
      let data = val
      // this.list = val
      // let date = data.map(function (item) {
      //   return item[0]
      // })
      // console.log(this.$store.state.large.day)
      let date = []
      let list = []
      // date = ['2020-1-1', '2020-1-2', '2020-1-3', '2020-1-4', '2020-1-5', '2020-1-6', '2020-1-7', '2020-1-8', '2020-1-9', '2020-1-10']
      // list = ['123', '1213', '11221', '1213', '323', '23', '1213', '1233', '23', '23']
      data.map(item => {
        date.push(item._id)
        list.push(item.countNum)
      })
      // let valueList = data.map(function (item) {
      //   return item[1]
      // })
      let Breakdown = echarts.init(document.querySelector('.Breakdown'))
      Breakdown.setOption({
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
          width: '1000px'
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
            name: '故障',
            type: this.echart,
            showSymbol: false,
            data: list,
            smooth: true
          }
        ]
      })
    },
    echartChange () {
      this.search()
    },
    dateChange (val) {
      console.log(new Date(val).toString())
    },
    typeChange (val) {
      console.log(val)
      if (val === 1) {
        let date = new Date()
        let year = date.getFullYear()
        console.log(year)
        this.time = year + ''
      }
    },
    search () {
      let breakdown
      if (this.$store.state.data.dtu) {
        breakdown = {
          type: this.$store.state.data.type,
          date: this.time,
          dtuId: this.$store.state.data.dtuId
        }
      } else {
        breakdown = {
          type: this.$store.state.data.type,
          date: this.time,
          projectId: this.$store.state.data.projectId
        }
      }

      getWarnStatistic(breakdown).then(res => {
        console.log(res)
        this.Breakdown(res)
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
      color: #fff;
      margin-right: 10px;
    }
  }
}
.Breakdown {
  width: 100%;
  height: 450px;
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
