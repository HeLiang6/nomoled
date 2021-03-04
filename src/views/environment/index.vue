<template>
  <div>
    环境监测
    <button @click="addSensors">add</button>
    <button @click="removeSensor">remove</button>
    <button @click="setSensor">set</button>
  </div>
</template>

<script>
import { sensorlistbyrootId, sensors, removeSensors, setSensors } from '@/api/environment'
export default {
  mounted () {
    this.sensorlist()
  },
  methods: {
    // 获取项目下所有监测设备
    sensorlist () {
      let data = {
        r: 2,
        rootId: '5f62d7ed5d0a038d3d44e464'
      }
      sensorlistbyrootId(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 添加环境监测设备
    addSensors () {
      let data = {
        dtuid: 'senId',
        latitude: '39.94093',
        longitude: '116.400036',
        name: 'sen',
        rootId: '5f62d7ed5d0a038d3d44e464',
        type: 'sensor'
      }
      sensors(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除环境监测设备
    removeSensor () {
      removeSensors('5f6bf0d838ea9ef72ecaeb23').then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 修改环境监测设备
    setSensor () {
      let data = {
        descripiton: '',
        dtuid: 'dtuw',
        item: null,
        latitude: '39.949993',
        longitude: '116.451236',
        name: 'dtu000',
        rootId: '5f62d7ed5d0a038d3d44e464',
        type: 'sensor',
        __v: 0,
        _id: '5f655dbb38ea9ef72ecae971'
      }
      setSensors(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
