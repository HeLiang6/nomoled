<template>
  <div
    id="box"
    style="height:100%;"
  >
    <NavList />
    <Task
      style="margin-left:20px"
      v-if="$route.meta.tag!==1"
    />

    <!-- 主体 -->
    <div id="mainLanguage">
      <el-main style="width:100%;box-sizing:border-box;">
        <keep-alive>
          <router-view v-if="$route.meta.keepalive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepalive"></router-view>
      </el-main>
    </div>
  </div>
</template>

<script>
import Task from '@/components/tag'

import NavList from '@/components/navList'
export default {
  name: 'home',
  components: {
    NavList,
    Task
  },
  mounted () {
    this.$store.commit('SET_TAG', this.$route.matched)
    if (sessionStorage.getItem('language') === 'en') {
      document.getElementById('mainLanguage').className = 'English'
    }
    if (sessionStorage.getItem('language') === 'es') {
      document.getElementById('mainLanguage').className = 'English'
    }
    if (sessionStorage.getItem('language') === 'cn') {
      document.getElementById('mainLanguage').className = 'ChineseDom'
    }
  }
}
</script>

<style lang="scss" scoped>
#box {
  width: 100%;
  background: #000a36;
  // overflow: auto; //是否产生滚动条
  overflow: hidden;
}
</style>
