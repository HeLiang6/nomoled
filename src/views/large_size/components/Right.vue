<template>
  <div class="right_box">
    <div class="right">
      <div class="data_box">
        <div class="bgColor">
          <h3>{{$t('large.date')}}</h3>
          <div class="generate">
          </div>
        </div>
      </div>
      <div class="data_box">
        <div class="bgColor">
          <h3>{{$t('large.mouth')}}</h3>
          <div class="mouth">
          </div>
        </div>
      </div>
      <div class="data_box">
        <div class="bgColor">
          <h3>{{$t('large.charging')}}</h3>
          <div class="charging">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'

export default {
  data () {
    return {
      arr: null,
      date: []
    }
  },
  mounted () {
    // this.generate()
    // this.mouth()
    // this.charging()
    // this.formatData()
  },

  methods: {
    // 日发电
    generate (val) {
      let data = val
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
      let generate = echarts.init(document.querySelector('.generate'))
      generate.setOption({
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
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
            // interval: 1,
            show: true,
            textStyle: {
              color: 'white', // 这里是改变字体颜色
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
            type: 'line',
            showSymbol: false,
            data: list
          }
        ]
      })
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
    //   // for (var i = 0; i < arr.length; i++) {
    //   //   let obj = {}
    //   //   let temp = arr[i]
    //   //   if (arr[i] > 0 && arr[i] < 1) {
    //   //     arr[i] = arr[i] * 3000
    //   //   } else if (arr[i] > 1 && arr[i] < 100) {
    //   //     arr[i] = 3000 + arr[i] * (3000 / 99)
    //   //   } else if (arr[i] > 100 && arr[i] < 300) {
    //   //     arr[i] = 6000 + arr[i] * (3000 / 200)
    //   //   } else if (arr[i] > 300 && arr[i] < 500) {
    //   //     arr[i] = 9000 + arr[i] * (3000 / 200)
    //   //   } else if (arr[i] > 500 && arr[i] < 1000) {
    //   //     arr[i] = 12000 + arr[i] * (3000 / 500)
    //   //   } else if (arr[i] > 1000 && arr[i] < 10000) {
    //   //     arr[i] = 15000 + arr[i] * (3000 / 9000)
    //   //   }
    //     obj.value = arr[i]
    //     obj.formatV = temp
    //     newHashArray.push(obj)
    //   }
    //   this.arr = newHashArray
    //   console.log(this.arr)
    //   this.mouth()
    // },
    // 月发电
    mouth (val) {
      let arr = []
      for (let i in val) {
        console.log(val[i])
        arr.push(val[i])
        this.date.push(i)
      }

      let mouth = echarts.init(document.querySelector('.mouth'))
      mouth.setOption({
        tooltip: {
          trigger: 'axis'
          // formatter (param) {
          //   return `${param[0].axisValue}：${param[0].data.formatV}`
          // }

        },
        grid: {
          left: '5%',
          right: '4%',
          bottom: '3%',
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
          data: this.date,
          axisLabel: {
            show: true,
            textStyle: {
              color: 'white', // 这里是改变字体颜色
              fontSize: 14// 字体大小
            }
          }

        },
        yAxis: {
          type: 'value',
          scale: true, /* 按比例显示 */
          // max: 'dataMax',
          min: 'dataMin',
          axisLabel: {
            show: true,
            textStyle: {
              color: 'white', // 这里是改变字体颜色
              fontSize: 12// 字体大小
            },
            formatter: function (value) {
              var texts = []
              if (value) {
                if (value > 1000) {
                  texts.push(value / 1000 + 'k')
                } else {
                  texts.push(value)
                }
              }
              return texts
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
          splitLine: {
            show: false
          }

        },
        series: [
          {
            type: 'line',
            stack: '发电',
            data: arr,
            showSymbol: false
          }
        ]
      })
    },
    // 充电桩
    charging (val) {
      console.log(val)
      // let date = []
      // for (let i in val) {
      let data = {
        date: ['2010 - 1 - 30', '2020 - 2 - 1', '2020 - 2 - 2', '2020 - 2 - 3', '2020 - 2 - 4', '2020 - 2 - 5', '2020 - 2 - 6', '2020 - 2 - 7', '2020 - 2 - 8'],
        orderList: [123, 222, 423, 12, 334, 413, 421, 323, 431],
        orderAmount: [2113, 4442, 112, 332, 111, 4123, 1111, 111],
        chargingTime: [333, 111, 222, 444, 444, 123, 1112, 666, 111]
      }
      // }
      let charging = echarts.init(document.querySelector('.charging'))
      charging.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['订单数', '时长', '金额'],
          textStyle: {// 图例文字的样式
            color: '#fff',
            fontSize: 16
          }

        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
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
              fontSize: 14// 字体大小
            }
          }
        },
        yAxis: [{
          name: '订单数',
          type: 'value',
          max: 1000,
          min: 0,
          // interval: 20,
          splitLine: {
            show: false
          },

          axisLabel: {
            show: true,
            textStyle: {
              color: 'white', // 这里是改变字体颜色
              fontSize: 12// 字体大小
            }
          }
        }, {
          name: '时长(秒)/金额(元)',
          type: 'value',
          max: 'dataMax',
          min: 'dataMin',
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: false
          },

          axisLabel: {
            show: true,
            textStyle: {
              color: 'white', // 这里是改变字体颜色
              fontSize: 12// 字体大小
            }
          }
        }],
        series: [
          {
            name: '订单数',
            type: 'line',
            data: val.orderList
          },
          {
            name: '金额',
            type: 'line',
            data: val.orderAmount,
            yAxisIndex: 1

          },

          {
            name: '时长',
            type: 'line',
            data: val.chargingTime,
            yAxisIndex: 1
          }
        ]
      })
    }
    // chargingData (val) {
    //   console.log(arr)
    //   // let arr =val.

    //   // for (let i in arr) {
    //   //   console.log(arr[i])
    //   //   arr.push(arr[i])
    //   //   this.date.push(i)
    //   // }
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
    // }

  }
}
</script>
<style lang="scss" scoped>
.right_box {
  background: -webkit-linear-gradient(
    right,
    #0b0b3b,
    transparent
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    left,
    #0b0b3b,
    transparent
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    left,
    #0b0b3b,
    transparent
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    to left,
    #0b0b3b,
    transparent
  ); /* 标准的语法（必须放在最后） */
}

.data_box {
  background: url("../../../../static/images/large/u7.png") no-repeat;
  width: 400px;
  background-size: contain;
  height: 250px;
  margin: 20px 0;
  .bgColor {
    background: rgba(11, 11, 59, 0.3);
    // width: 350px;
    // height: 200px;
    height: 100%;
  }
  h3 {
    line-height: 26px;
    font-size: 20px;
    color: #fff;
    text-align: center;
  }
  p {
    color: #fff;
    margin-left: 11%;
    position: relative;
    bottom: -40px;
  }
}
.generate {
  width: 400px;
  height: 200px;
}
.mouth {
  width: 400px;
  height: 200px;
}
.charging {
  width: 400px;
  height: 200px;
}
</style>
