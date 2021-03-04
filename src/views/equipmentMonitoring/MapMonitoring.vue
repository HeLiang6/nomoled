
<template>
  <div>
    123
    <input
      type="file"
      @change="getFiles($event)"
    >
  </div>
</template>

<script>
import { ProjectList } from '@/api/project'
import {
  rtulistbyprojectId,
  rtulistbyrootId,
  rtuone,
  rtustatus,
  rtuload,
  rtuversion,
  rtudata,
  updateRtu,
  rtus,
  removeRtu,
  setRtu,
  rtuonedata,
  rtulight,
  rtufault
} from '@/api/rtu'
export default {
  data () {
    return {
      val: ''
    }
  },
  mounted () {
    let str = String(Math.round((Math.random() * 10) + 1))
    let data = {
      r: str,
      userId: this.$store.state.user.nomouser._id
    }
    this.projectList(data)
    this.rtuList()
    this.dtu_Rtu()
    this.rtu_Detail()
    this.rtuLight()
    this.setRtuData()
    this.rtuVersion()
    this.rtuNewData()
    // this.addRtus() // 添加rtu
    // this.removeRTU()
    // this.changeRtu()
    this.reportedData()
    this.setRtuLight()
    this.rtuWarning()
  },
  methods: {
    projectList (data) {
      ProjectList(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取项目下所有RTU信息
    rtuList () {
      let data = {
        r: 2,
        projectId: '5f6304ce5d0a038d3d44e4ab'
      }
      rtulistbyprojectId(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取DTU下所有RTU
    dtu_Rtu () {
      let data = {
        r: 2,
        rootId: '5f6305005d0a038d3d44e4af'
      }
      rtulistbyrootId(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取指定RTU详细信息
    rtu_Detail () {
      let data = {
        r: 2,
        id: '5f63058a5d0a038d3d44e4b1'
      }
      rtuone(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // RTU开关灯状态持久化
    rtuLight () {
      let data = {
        r: 2,
        id: '5f63058a5d0a038d3d44e4b1',
        state: '0'
      }
      rtustatus(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 修改指定RTU的路灯参数
    setRtuData () {
      let data = {
        id: '5d914d6ebd43da0100643e14',
        r: 2,
        rtuparams: {
          current: 900,
          induction1: 0,
          induction2: 0,
          induction3: 0,
          induction5: 0,
          light1: 90,
          light2: 75,
          light3: 50,
          light4: 25,
          mlight: 100,
          mode: 0,
          time1: 1,
          time2: 3,
          time3: 2,
          time4: 4,
          time5: 2
        },
        typeId: '58524387d0968b0c04938771'
      }
      rtuload(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // RTU的version 持久化
    rtuVersion () {
      let data = {
        r: 2,
        id: '5d914d6ebd43da0100643e14',
        version: '1'
      }
      rtuversion(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取指定DTU下所有RTU的最新上报数据
    rtuNewData () {
      let data = {
        r: 2,
        rootId: '5f6305005d0a038d3d44e4af'
      }
      rtudata(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 导入数据时将RTU数据持久化
    getFiles (val) {
      updateRtu(val.target.files).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 新建Rtu
    addRtus () {
      let data = {
        clear: 1,
        latitude: '39.952471',
        longitude: '116.414684',
        name: 'he',
        projectId: '5f62d7f65d0a038d3d44e466',
        rootId: '5f64106f5d0a038d3d44e5e0',
        typeId: '585a1c8bd0968b0c049387c0',
        uid: 'u00103'
      }
      rtus(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除Rtu
    removeRTU () {
      removeRtu('585a1c8bd0968b0c049387c0').then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 修改RTU
    changeRtu () {
      let data = {
        check: '5f62d7f65d0a038d3d44e466u00791',
        clear: 1,
        // clearstate: 0,
        // dayUseSolar: 0,
        // daysolar: 0,
        descripiton: '',
        latitude: 39.952471,
        // light: 0,
        longitude: 116.414684,
        // monthsolar: 0,
        name: 'he1',
        projectId: '5f62d7f65d0a038d3d44e466',
        rootId: '5f64106f5d0a038d3d44e5e0',
        state: 1,
        // totalsolar: 0,
        // totalusesolar: 0,
        // type: 'rtu',
        typeId: '585a1c8bd0968b0c049387c0',
        params: '',
        uid: 'u00291',
        // version: 0,
        // worktime: 0,
        // ydaysolar: 0,
        // __v: 0,
        _id: '5f64768838ea9ef72ecae956'
      }
      setRtu(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取指定RTU最近一次上报的数据
    reportedData () {
      let data = {
        r: 3,
        check: '5f6304ce5d0a038d3d44e4abu14611'
      }
      rtuonedata(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 修改RTU亮度
    setRtuLight () {
      let data = {
        id: '5f63058a5d0a038d3d44e4b1',
        r: 1,
        light: 2
      }
      rtulight(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取指定DTU下所有处于报警状态的RTU
    rtuWarning () {
      rtufault({ rootId: '5f6305005d0a038d3d44e4af' }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss">
</style>
