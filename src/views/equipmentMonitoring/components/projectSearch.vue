<template>
  <div class="search_box">
    <div class="search">
      <el-autocomplete
        class="inline-input"
        v-model="state1"
        size='mini'
        :fetch-suggestions="querySearch"
        :placeholder="$t('tips.keyword')"
        @select="handleSelect"
      ></el-autocomplete>
      <el-button
        class="btn-box"
        plain
        @click="handerSearch"
      >{{$t('tips.device_search')}}</el-button>
    </div>

  </div>
</template>

<script>
import { fuzzySearchRtu } from '@/api/rtu'

export default {
  data () {
    return {
      state1: '',
      loading: false
    }
  },
  mounted () {
    // this.searchChange()
  },
  methods: {
    querySearch (queryString, cb) {
      clearTimeout(this.timer)
      let data = {
        keyWord: this.state1,
        rand: Math.ceil(Math.random() * 10),
        projectId: this.$store.state.GPSmap.projectId
      }
      if (this.state1 !== '') {
        this.timer = setTimeout(function () {
          fuzzySearchRtu(data).then(res => {
            if (res.httpCode === 0) {
              // eslint-disable-next-line standard/no-callback-literal
              cb([])
            } else {
              res.result.map(item => {
                item.value = item.name
              })
              cb(res.result)
            }
          }).catch(err => {
            console.log(err)
          })
        }, 500)
      } else {
        // eslint-disable-next-line standard/no-callback-literal
        cb([])
      }
    },
    handerSearch (val) {
      console.log(this.state1)
      let dtuname = ''
      let list = this.$store.state.GPSmap.projectList.dtuList
      for (let i = 0; i < list.length; i++) {
        list[i].rtuList.forEach(val => {
          if (val.name === this.state1) {
            console.log(list[i].name)
            let data = {
              ...val,
              dtuName: list[i].name
            }
            this.$store.commit('GPS_LIGHT', data)
          }
        })
      }
      console.log(dtuname)
    },
    handleSelect (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-box {
  background: none;
  margin-left: 20px;
  height: 28px;
  padding: 0 10px;
  line-height: 28px;
}
.search {
  display: flex;
  align-items: center;
}
.search_box {
  padding: 0 20px;
  margin-bottom: 10px;
  overflow: hidden;
}
</style>
<style lang="scss">
.serach_box .search {
  .el-input__inner {
    width: 140px;
  }
  .el-input {
    width: 140px;
    // colo: #2894b4;
  }
}
</style>
