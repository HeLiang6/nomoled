<template>
  <div>
    <button @click="addClick">{{$t('add')}}</button>
    <div
      v-for="(item,index) in data"
      :key="index"
    >
      <p>{{item.name}}</p>
      <button @click="hand(item._id)">wifi</button>
      <button @click="amendClick(item)">修改</button>
    </div>
  </div>
</template>

<script>
import { ProjectList } from '@/api/project'
import { wifi, addWifi, amendWifi } from '@/api/wifi'
export default {
  data () {
    return {
      data: [],
      wifiData: {
        clearFlow: 0,
        descripiton: '',
        hide: 1,
        latitude: '22.738747',
        longitude: '113.957474',
        marker: '1',
        maxFlow: 100,
        name: 'he1',
        nodeNum: 5,
        password: '12345678',
        rootId: '5f27d28567bd69fe6b6e8218',
        switch: 0,
        type: 'wifiac',
        uid: '66611'
      },
      setWifiList: {
        clearFlow: 0,
        descripiton: '',
        hide: 1,
        item: null,
        latitude: '22.738747',
        longitude: '113.957474',
        marker: null,
        maxFlow: 100,
        name: 'NOMO-WIFI-110',
        nodeNum: 5,
        password: '12345678',
        rootId: '5badc4b125bf6ae229195954',
        switch: 0,
        type: 'wifiac',
        uid: 'sdsds',
        __v: 0,
        _id: '5efad4b21f6b201a0d62c7be'
      }
    }
  },
  mounted () {
    this.wifiDataList()
  },
  methods: {
    // 所有项目
    wifiDataList () {
      let data = {
        r: String(Math.round((Math.random() * 10) + 1)),
        userId: this.$store.state.user.nomouser._id
      }
      ProjectList(data).then(res => {
        this.data = res
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 项目下的WiFi
    hand (val) {
      let data = {
        r: String(Math.round((Math.random() * 10) + 1)),
        rootId: val
      }
      wifi(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 添加WiFi
    addClick () {
      addWifi(this.wifiData).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 修改WiFi节点
    amendClick (val) {
      amendWifi(this.setWifiList).then(res => {
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
