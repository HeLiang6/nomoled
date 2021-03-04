<template>
  <div>
    <p>广告管理</p>
    <button @click="addNew">add</button>
    <button @click="removeNew">remove</button>
    <button @click="setNew">set</button>
  </div>
</template>

<script>
import { billboardlistbyrootId, billboards, removeBillboards, setBillboards } from '@/api/advertising'
export default {
  mounted () {
    this.newList()
  },
  methods: {
    // 获取项目下所有广告牌设备
    newList () {
      let data = {
        r: 2,
        rootId: '5f62d7ed5d0a038d3d44e464'
      }
      billboardlistbyrootId(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 添加广告牌设备
    addNew () {
      let data = {
        ip: '192.168.0.1',
        latitude: '39.958649',
        longitude: '116.443493',
        marker: null,
        name: 'a3',
        password: '123456',
        port: 8585,
        rootId: '5f62d7ed5d0a038d3d44e464',
        type: 'ad',
        uid: '6556',
        user: 'huawei'
      }
      billboards(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除广告牌
    removeNew () {
      removeBillboards('5f65773c38ea9ef72ecae9da').then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 修改广告牌设备
    setNew () {
      let data = {
        brightness: 50,
        descripiton: '',
        ip: '192.168.0.1',
        item: null,
        latitude: '39.959865',
        longitude: '116.444211',
        marker: null,
        name: 'a6662',
        password: '123456',
        port: 8585,
        rootId: '5f62d7ed5d0a038d3d44e464',
        type: 'ad',
        uid: '000222',
        user: 'huawei',
        __v: 0,
        _id: '5f65763538ea9ef72ecae9d9'

      }
      setBillboards(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped></style>
