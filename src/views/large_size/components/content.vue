<template>
  <div id="box2">
    <div class="top">
      <span>{{$t('tips.Current_project')}}:</span>
      <el-select
        v-model="$store.state.large.projectId"
        :placeholder="$t('tips.please')"
        @change="searchChange"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="main">
      <div class="left">
        <div class="data_box">
          <div class="bgColor">
            <h3>{{$t('large.DTU_situation')}}</h3>
            <p>{{$t('large.Total_number')}}:{{options.length}}
            </p>
            <p>{{$t('large.DTU_total')}}:<span v-if="$store.state.large.mapData.dtuList">{{$store.state.large.mapData.dtuList.length}}</span></p>
            <div class="DTU">
            </div>
          </div>
        </div>
        <div class="data_box">
          <div class="bgColor">
            <h3>{{$t('large.RTU_situation')}}</h3>
            <p>{{$t('large.Total_number')}}:{{options.length}}
            </p>
            <p>{{$t('large.RTU_total')}}:<span v-if="rtuList">{{rtuList.length}}</span>
            </p>
            <div class="RTU">
            </div>
          </div>
        </div>
        <div class="data_box">
          <div class="bgColor">
            <h3>{{$t('large.Police_Situation')}}</h3>
            <div class="warn">
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="right">
        <div class="data_box">
          <div>
            <h3>日发电</h3>
            <div class="generate">
            </div>
          </div>
        </div>
        <div class="data_box">
          <div>
            <h3>月发电</h3>
            <div class="mouth">
            </div>
          </div>
        </div>
        <div class="data_box">
          <div>
            <h3>充电桩</h3>
            <div class="charging">
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { ProjectList, getProjectTreeBypId, ProjectDetail } from '@/api/project'
import { rtulistbyprojectId } from '@/api/rtu'
// import { DTU } from '@/api/dtu'
import { getDtuStatistic, getRtuStatistic, getAlarmStatistic, getEnergyDailyStatistic, getEnergyMonthlyStatistic, getChargeTradeStatistic } from '@/api/large'
import echarts from 'echarts'
import { connect } from '@/utils/command/monitormanage'
import { log } from 'three'

export default {
  data () {
    return {
      options: [],
      dtuChartData: [
        { value: 123, name: this.$t('large.Online') },
        { value: 310, name: this.$t('large.Offline') },
        { value: 234, name: this.$t('large.Not_used') },
        { value: 135, name: this.$t('large.malfunction') }
      ],
      rtuChartData: [
        { value: 335, name: this.$t('large.Online') },
        { value: 310, name: this.$t('large.Offline') },
        { value: 234, name: this.$t('large.Not_used') },
        { value: 135, name: this.$t('large.malfunction') }
      ],
      list: [],
      rtuList: [],
      pjtree: ''

    }
  },
  // watch: {
  //   '$store.state.large.projectId': function (newVal) {
  //     let data = {
  //       projectId: newVal,
  //       r: Math.ceil(Math.random() * 10)
  //     }
  //     getProjectTreeBypId(data).then(res => {
  //       if (res.httpCode === 200) {
  //         let pjtree = {
  //           dtuList: [],
  //           rtuList: [],
  //           zoneList: [],
  //           dtuonline: 0,
  //           dtuoffline: 0,
  //           rtuonline: 0,
  //           rtuoffline: 0,
  //           lighton: 0,
  //           lightoff: 0,
  //           _id: newVal
  //         }
  //         let data = res.result
  //         let dtuList = data.dtuList
  //         // let zoneList = data.zoneList
  //         console.log('------------------data------------------')
  //         console.log(data)
  //         console.log('----------------------------------------')
  //         // for (let index = 0; index < zoneList.length; index++) {

  //         // }
  //         for (let index = 0; index < dtuList.length; index++) {
  //           let dtu = dtuList[index]
  //           let rtuList = dtu.rtuList ? dtu.rtuList : []
  //           pjtree.dtuList.push({ type: 'dtu', net: 1, rtuoffline: 0, rtuonline: 0, lighton: 0, lightoff: 0, tel: dtu.tel })
  //           for (let rtu_index = 0; rtu_index < rtuList.length; rtu_index++) {
  //             let rtu = rtuList[rtu_index]
  //             rtu.dtuIndex = index
  //             rtu.net = 1
  //             pjtree.rtuList.push(rtu)
  //           }
  //           for (let z_index = 0; z_index < dtu.zoneList.length; z_index++) {
  //             dtu.zoneList[z_index].dtuIndex = index
  //             console.log(dtu.zoneList[z_index])
  //             if (dtu.zoneList[z_index].rtuList) {
  //               for (let zrtu_index = 0; zrtu_index < dtu.zoneList[z_index].rtuList.length; zrtu_index++) {
  //                 // let zrtu = dtu.zoneList[z_index].rtuList[zrtu_index]
  //                 dtu.zoneList[z_index].rtuList[zrtu_index].dtuIndex = index
  //                 dtu.zoneList[z_index].rtuList[zrtu_index].net = 1
  //                 // pjtree.rtuList.push(rtu)
  //               }
  //             }

  //             pjtree.zoneList.push(dtu.zoneList[z_index])
  //           }
  //         }

  //         console.log('________连接____________')
  //         console.log(pjtree)
  //         console.log('_______________________')
  //         connect(pjtree)
  //         this.pjtree = pjtree
  //       } else {
  //         // 弹出框提示
  //       }
  //     }).catch(err => {
  //       console.log(err)
  //     })
  //   }
  // },
  mounted () {
    this.getProject()
    // let dtu = {
    //   userId: JSON.parse(sessionStorage.getItem('nomouser'))._id,
    //   rand: Math.ceil(Math.random() * 10)
    // }
    // DTU(dtu).then(res => {
    //   console.log(res)
    //   this.dtuLength = res.length
    // })
  },
  methods: {
    load () {
      this.DTU()
      this.RTU()
      this.warn()
      // this.generate()
      // this.mouth()
      // this.charging()
    },
    getProject () {
      let str = String(Math.round((Math.random() * 10) + 1))
      let data = {
        userId: this.$store.state.user.nomouser._id,
        r: str
      }
      ProjectList(data).then(res => {
        res.result.filter(item => {
          let data = {
            value: item._id,
            label: item.name
          }
          this.options.push(data)
        })
        this.$store.commit('projectID', this.options)
        this.load()
        this.searchChange()
      }).catch(err => {
        console.log(err)
      })
    },
    // 搜索项目
    searchChange () {
      let data = {
        r: Math.ceil(Math.random() * 10),
        projectId: this.$store.state.large.projectId
      }
      getProjectTreeBypId(data).then(res => {
        this.$store.commit('large_map', res.result)
        ProjectDetail(this.$store.state.large.projectId).then(req => {
          this.$store.commit('large_center', req)
          // this.$parent.iconFor()
        })
      }).catch(err => {
        console.log(err)
      })
      // 所有rtu
      rtulistbyprojectId(data).then(res => {
        this.rtuList = res
      })
      // DTU态势
      getDtuStatistic(data).then(res => {
        this.dtuChartData[0].value = res.online
        this.dtuChartData[1].value = res.offline
        this.dtuChartData[2].value = res.unUsable
        this.dtuChartData[3].value = res.fault
        console.log(this.dtuChartData)
        this.DTU()
      })
      getRtuStatistic(data).then(res => {
        this.rtuChartData[0].value = res.online
        this.rtuChartData[1].value = res.offline
        this.rtuChartData[2].value = res.unUsable
        this.rtuChartData[3].value = res.fault
        this.RTU()
      })
      getAlarmStatistic(data).then(res => {
        let list = []
        let normal = []
        let warning = []
        let fault = []
        normal.push(res.dtu['normal'])
        warning.push(res.dtu['warning'])

        fault.push(res.dtu['fault'])
        normal.push(res.rtu['normal'])
        warning.push(res.rtu['warning'])

        fault.push(res.rtu['fault'])

        list.push(normal)
        list.push(warning)
        list.push(fault)
        this.list = list
        this.warn()
      })
      getEnergyDailyStatistic(data).then(res => {
        // this.$store.commit('Day', res)
        this.$emit('ChangeClick', res)
      })
      getEnergyMonthlyStatistic(data).then(res => {
        this.$emit('mouthClick', res)
      })
      getChargeTradeStatistic(data).then(res => {
        this.$emit('chargClick', res)
      })
    },
    // 创建dtu饼图
    DTU () {
      let colors = ['#96c251', '#36b0d9', '#f5d91f', '#e33733']
      let i = 0
      let myChart = echarts.init(document.querySelector('.DTU'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10 + '%',
          top: 55 + 'px',
          data: [this.$t('large.Online'), this.$t('large.Offline'), this.$t('large.Not_used'), this.$t('large.malfunction')],
          textStyle: {// 图例文字的样式
            color: '#fff',
            fontSize: 16,
            align: 'right'
          },
          formatter: (name) => {
            let data = this.dtuChartData
            let target
            for (let i = 0, l = data.length; i < l; i++) {
              // total += data[i].value
              if (data[i].name === name) {
                target = data[i].value
              }
            }
            let arr = [
              name + ':' + target
              // '{a|' + name + '}',
              // '{b|' + target + '}'
            ]
            return arr.join('\n')
          }

        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '80%',
            center: ['60%', '45%'],
            label: {
              position: 'inner'
            },
            itemStyle: {
              normal: {
                color: function () {
                  return colors[i++]
                }
                // label: {
                //   show: false
                // },
                // labelLine: {
                //   show: false
                // }
              }
            },
            // labelLine: {
            //   // show: false
            // },
            data: this.dtuChartData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
      myChart.on('click', function (param) {
        console.log(param)
      })
    },
    RTU () {
      let colors = ['#96c251', '#36b0d9', '#f5d91f', '#e33733']
      let i = 0

      let myChart = echarts.init(document.querySelector('.RTU'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10 + '%',
          top: 55 + 'px',
          data: [this.$t('large.Online'), this.$t('large.Offline'), this.$t('large.Not_used'), this.$t('large.malfunction')],
          textStyle: {// 图例文字的样式
            color: '#fff',
            fontSize: 16
          },
          formatter: (name) => {
            let data = this.rtuChartData
            let target
            for (let i = 0, l = data.length; i < l; i++) {
              // total += data[i].value
              if (data[i].name === name) {
                target = data[i].value
              }
            }
            let arr = [
              name + ':' + target
              // '{a|' + name + '}',
              // '{b|' + target + '}'
            ]
            return arr.join('\n')
          }
        },

        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '80%',
            center: ['60%', '45%'],
            label: {
              position: 'inner'
            },
            itemStyle: {
              normal: {
                color: function () {
                  return colors[i++]
                }
                // label: {
                //   show: false // 隐藏标示文字
                // },
                // labelLine: {
                //   show: false // 隐藏标示线
                // }
                // label: {
                //   show: false
                // },
                // labelLine: {
                //   show: false
                // }
              }
            },
            data: this.rtuChartData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    warn () {
      let warn = echarts.init(document.querySelector('.warn'))
      warn.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: [this.$t('large.normal'), this.$t('large.Warning'), this.$t('large.malfunction')],
          bottom: 'bottom',
          textStyle: {// 图例文字的样式
            color: '#000',
            fontSize: 16
          }

        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['DTU', 'RTU'],
          axisLabel: {
            show: true,
            textStyle: {
              color: 'white', // 这里是改变字体颜色
              fontSize: 12// 字体大小
            }
          }

        },
        series: [
          {
            name: this.$t('large.malfunction'),
            type: 'bar',
            data: this.list[0],
            // 颜色
            itemStyle: {
              normal: {
                color: '#b60703'
              }
            }
          },
          {
            name: this.$t('large.Warning'),
            type: 'bar',
            data: this.list[1],
            itemStyle: {
              normal: {
                color: '#f3d922'
              }
            }

          },
          {
            name: this.$t('large.normal'),
            type: 'bar',
            data: this.list[2],
            itemStyle: {
              normal: {
                color: '#70b603'
              }
            }
          }
        ]
      })
    }
  }

}
</script>

<style lang="scss" scoped>
#box2 {
  // box-sizing: border-box;
  // padding: 0 30px;
  // height: 100%;
  // margin: 0 30px;
  // margin-bottom: 110px;
  padding-bottom: 100px;
  padding-top: 50px;
  background: -webkit-linear-gradient(
    left,
    #0b0b3b,
    transparent
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    #0b0b3b,
    transparent
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    right,
    #0b0b3b,
    transparent
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    to right,
    #0b0b3b,
    transparent
  ); /* 标准的语法（必须放在最后） */

  .top {
    // margin-bottom: 20px;
    width: 400px;
    padding: 0;
    span {
      color: #fff;
    }
  }
}
.data_box {
  background: url("../../../../static/images/large/u7.png") no-repeat;
  // width: 470px;
  // background: rgba(12, 12, 61, 0.6);
  height: 250px;
  background-size: contain;
  box-sizing: border-box;
  margin: 20px 0;
  .bgColor {
    background: rgba(11, 11, 59, 0.3);
    width: 403px;
    // height: 200px;
    height: 100%;
    box-sizing: border-box;
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
.DTU {
  width: 400px;
  height: 200px;
}
.RTU {
  width: 400px;
  height: 200px;
}
.warn {
  width: 400px;
  height: 200px;
}
// .generate {
//   width: 470px;
//   height: 200px;
// }
// .mouth {
//   width: 470px;
//   height: 200px;
// }
// .charging {
//   width: 470px;
//   height: 200px;
// }
// .main {
//   display: flex;
//   justify-content: space-between;
// }
</style>

<style lang="scss">
#box .el-input__inner {
  background: transparent;
  color: #26b4ff;
}
</style>
