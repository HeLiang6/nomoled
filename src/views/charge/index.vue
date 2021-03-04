<template>
  <div>
    充电桩
    <button @click="addCharges">add</button>
    <button @click="setCharge">set</button>
    <button @click="removeCharge">remove</button>
  </div>
</template>

<script>
import {
  chargelistbyrootId,
  charges,
  setCharges,
  removeCharges
} from '@/api/charge'
export default {
  mounted () {
    this.chargelist()
  },
  methods: {
    // 获取项目下所有充电桩设备
    chargelist () {
      chargelistbyrootId({ r: 1, rootId: '5f62d7ed5d0a038d3d44e464' }).then(res => {
        console.log(res)
        console.log(1)
      }).catch(err => {
        console.log(err)
      })
    },
    // 创建充电桩设备
    addCharges () {
      let data = {
        dtuid: 'dtuge',
        latitude: '39.949274',
        longitude: '116.455153',
        name: 'dtuhe2',
        rootId: '5f62d7ed5d0a038d3d44e464',
        type: 'charge'
      }
      charges(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 修改充电桩设备
    setCharge () {
      let data = {
        descripiton: '',
        dtuid: 'hge',
        item: null,
        latitude: '39.9474',
        longitude: '116.4153',
        name: 'dtuhe2',
        rootId: '5f62d7ed5d0a038d3d44e464',
        type: 'charge',
        __v: 0,
        _id: '5f6bf1b038ea9ef72ecaeb25'
      }
      setCharges(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除
    removeCharge () {
      removeCharges('5f6bf1b038ea9ef72ecaeb25').then(res => {
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
