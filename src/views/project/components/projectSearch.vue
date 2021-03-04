<template>
  <div class="search_box">
    <div class="search">
      <el-autocomplete
        class="inline-input"
        v-model="state2"
        size="mini"
        :fetch-suggestions="querySearch"
        :placeholder="$t('tips.keyword')"
        @select="handleSelect"
      ></el-autocomplete>
      <el-button
        class="btn-box"
        plain
        @click="handerSearch"
      >{{$t('tips.device_search')}}</el-button>
      <!-- 跳转页面 -->
      <!-- <router-link
            to="/lightList"
            tag="el-button"
            class="btn-box"
            plain
          >{{$t('tips.device_list')}}</router-link> -->
    </div>
  </div>
</template>

<script>
import { fuzzySearchRtu } from '@/api/rtu'

export default {
  data () {
    return {
      loading: false,
      state2: '',
      timer: null,
      rtu_list: {}

    }
  },
  mounted () {
    // this.searchChange()
    // this.setLightData()
    // this.rtuData()
  },
  computed: {
    // restaurants () {
    //   return this.$store.state.project.rtuList_uid
    // }
  },
  methods: {
    querySearch (queryString, cb) {
      clearTimeout(this.timer)
      let data = {
        keyWord: this.state2,
        rand: Math.ceil(Math.random() * 10),
        projectId: this.$store.state.project.addLightData.projectId
      }
      if (this.state2 !== '') {
        this.timer = setTimeout(function () {
          fuzzySearchRtu(data).then(res => {
            console.log(res)
            if (res.httpCode === 0) {
              // cb([res.message])
              let arr = [{ value: '无相关Rtu记录' }]
              cb()
            } else if (res.httpCode === 200) {
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
        // cb()
      }
      // console.log(this.$store.state.project.rtuList_uid);
      // let restaurants = this.restaurants;
      // console.log(restaurants);
      // let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
    }, // searchChange (val) {
    handleSelect (item) {
      console.log(item)
      this.rtu_list = item
    },
    handerSearch () {
      if (this.rtu_list._id) {
        // 选中的图标跳动
        this.$emit('sendMessage', this.rtu_list._id)
        // 显示弹框
        this.$store.commit('SET_RTU', true)
        this.$store.commit('SET_PARAMETER', this.rtu_list)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-box {
  background: none;
  margin-left: 20px;
  width: auto;
  height: 28px;
  padding: 0 10px;
  margin-top: 5px;
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
.search_box .search {
  .el-input__inner {
    width: 140px;
  }
  .el-input {
    width: 140px;
  }
}
</style>
