<template>
  <div class='left'>
    <!--当前栏目：-->
    <el-breadcrumb
      class="nav-tag"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item
        v-for="(item,index) in tags"
        :key="index"
      >
        <span class="tag-box">
          {{$t(item.meta.title)}}
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: true
      // tags: this.$store.state.project.tag
    }
  },
  mounted () {
  },
  methods: {
  },
  computed: {
    tags () {
      return this.$store.state.project.tag
    }
  },
  watch: {
    // 路由变化,设置标签
    '$store.state.project.tag' (newValue, oldValue) {
      // this.setTags(newValue)
      return newValue
    },
    tags: function (newVal, endVal) {
      if (newVal) {
        return newVal
      }
    }
    // '$route' (newValue, endValue) {
    //   console.log(newValue)
    //   console.log(endValue)
    //   this.$store.commit('SET_TAG', newValue.matched)
    // }
  }
}
</script>

<style lang='scss' scoped>
.left {
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  line-height: 30px;
  .tag-box {
    margin: 0;
    color: #fff;
    line-height: 30px;
  }
  .nav-tag {
    line-height: 30px;
  }
}
</style>
