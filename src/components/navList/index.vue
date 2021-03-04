<template>
  <el-header
    id="header"
    style="height:auto;padding:0 30px"
  >
    <div
      class="content"
      id="language"
    >
      <router-link to="/navlist">
        <img
          src="../../../static/images/logo.png"
          alt=""
          class="logo"
          :title="$t('navList.returnNav')"
        >
      </router-link>
      <div class="headerNav">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo nav-box"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-submenu
            v-for="(item,index) in navList"
            :key="index"
            :index="item.path"
            class="nav-list-box"
          >
            <template slot="title">
              <div class="nav_list">
                <!-- <img
                :src="images[index]"
                alt=""
                class="icon-box"
              > -->
                <i
                  class="iconfont icon-box"
                  :class="images[index]"
                ></i>
                <span>{{$t(item.meta.title)}}</span><span></span>
              </div>
            </template>
            <el-menu-item
              @click.native="
              handerClickNav(item,item2)"
              v-for="(item2,index2) in item.children"
              :index="item2.path"
              :key="index2"
            >{{$t(item2.meta.title)}}</el-menu-item>
          </el-submenu>
        </el-menu>

      </div>
      <div class="top-right">
        <el-select
          style="width:70px"
          v-model="value"
          :placeholder="$t('tips.please')"
          @change="handelChange"
        >
          <el-option
            v-for="item in lang"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <div
          style="margin-left:20px;"
          class="large"
        >
          <span>{{$t('concise')}}</span>|<router-link
            to="/large"
            tag="span"
          >{{$t('big_screen')}}</router-link>
        </div>
        <router-link to="/navlist">
          <img
            style="width:30px;height:30px;margin-left:20px;"
            src="../../../static/images/returnNav.png"
            :alt="$t('navList.returnNav')"
            :title="$t('navList.returnNav')"
          >
        </router-link>
      </div>
    </div>
    <!-- <div class='left'>
      当前栏目：
      <el-breadcrumb
        class="nav-tag"
        separator-class="el-icon-arrow-right"
      >
        <el-breadcrumb-item
          v-for="(item,index) in tags"
          :key="index"
          :to="{ path: item.path }"
        >
          <span class="tag-box">
            {{$t(item.meta.title)}}
          </span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->

  </el-header>
</template>

<script>
// el-icon-s-custom 用户
export default {
  data () {
    return {
      activeIndex: this.$route.path,
      navList: [],
      showAll: false,
      images: [
        'icon-xiangmu',
        'icon-shebei',
        'icon-test',
        'icon-shuju',
        'icon-yonghu',
        'icon-rizhi',
        'icon-weixiu',
        'icon-xitongshezhi'
      ],
      value: sessionStorage.getItem('language'),
      lang: [
        {
          value: 'cn',
          label: '中文'
        },
        {
          value: 'en',
          label: 'English'
        },
        {
          value: 'es',
          label: 'Español'
        }
      ]

    }
  },
  components: {

  },
  computed: {
    // activeIndex () {
    //   return this.$route.path
    // }
  },
  watch: {
    '$route.path': function (newVal, endVal) {
      if (newVal) {
        this.$store.commit('SET_TAG', this.$route.matched)
      }
    }
  },
  mounted () {
    this.activeIndex = this.$route.path
    // 判断哪个语言版本
    if (sessionStorage.getItem('language') === 'en') {
      document.getElementById('language').className = 'enNav'
    }
    if (sessionStorage.getItem('language') === 'cn') {
      document.getElementById('language').className = 'content'
    }
    if (sessionStorage.getItem('language') === 'es') {
      document.getElementById('language').className = 'enNav'
    }
    this.navHanderList()
  },
  methods: {
    // 跳转路由
    navHanderList () {
      let routes = this.$router.options.routes
      routes.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // let name = item.meta.title
          // item.meta.title = this.$t(name)
          this.navList.push(item)
        }
      }
      )
    },
    // 导航
    handleSelect (val) {
    },
    // 切换语言
    handelChange (val) {
      sessionStorage.setItem('language', val)
      this.$i18n.locale = val
      console.log(val)
      if (val === 'en') {
        document.getElementById('language').className = 'enNav'
      } else if (val === 'cn') {
        document.getElementById('language').className = 'content'
      } else if (val === 'es') {
        document.getElementById('language').className = 'enNav'
      }
      this.$root.$emit('language_Change')
      this.$router.go(0)
    },
    handerClickNav (val, val2) {
      this.tags = [val, val2]
      this.$store.commit('SET_TAG', this.tags)
      this.$router.push(val2.path)
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 800px) {
  #header {
    .headerNav {
      max-width: 700px;
      overflow-y: auto;
      .nav-box {
        width: 1000px;
      }
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 10px;
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #a1a3a9;
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #ededed;
        display: none;
      }
    }
  }
}
// 屏幕适配
@media screen and (max-width: 1570px) {
  #header {
    .top-right {
      color: #fff;
      position: absolute;
      right: 20px;
      top: 20px;
      // display: flex;
      // justify-content: space-between;
      // align-items: center;
      // margin-left: 10px;
    }
    .content {
      margin-top: 20px;
    }
  }
}
// @media screen and (max-width: 1500) {
//   #header {
//     .enNav {
//       .nav-box {
//         .nav-list-box {
//           .nav_list {
//             padding-left: 0;
//           }
//         }
//       }
//     }
//   }
// }

@media screen and (max-width: 1180px) {
  #header {
    .top-right {
      color: #fff;
      position: absolute;
      right: 20px;
      top: 20px;
      padding: 0;
      // display: flex;
      // justify-content: space-between;
      // align-items: center;
      // margin-left: 10px;
    }
    .content {
      margin-top: 20px;
    }
    .logo {
      position: absolute;
      top: 10px;
      left: 20px;
      height: 40px;
      width: 120px;
    }
  }
}
</style>
<style lang="scss" scoped>
#language {
  display: flex;
  flex-wrap: wrap;
}
.content {
  display: flex;
  // justify-content: space-around;
  padding-top: 28px;
  // flex-wrap: wrap;
}
.logo {
  width: 138px;
  height: 63px;
  opacity: 0.4;
}
.large {
  span {
    cursor: pointer;
    margin: 0 10px;
  }
  span:hover {
    color: turquoise;
  }
}
.nav-box {
  display: flex;
  align-items: center;
  border: 0;
  .nav_list {
    // border-right: 1px solid #eee;
    // padding: 0 32px;
    margin: 10px 0;
    line-height: 20px;
    height: 20px;
    font-size: 21px;
  }
}
.enNav {
  position: relative;
  padding-top: 80px;
  .logo {
    width: 141px;
    height: 64px;
    position: absolute;
    left: 20px;
    top: 0;
  }
  .top-right {
    color: #fff;
    position: absolute;
    right: 20px;
    top: 20px;
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    margin-left: 10px;
  }
  .nav-box {
    // margin-top: 60px;
    background: rgba($color: #fff, $alpha: 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .nav-list-box {
      padding: 10px 10px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      box-sizing: border-box;
      .nav_list {
        margin: 0;
        height: 100%;
        display: flex;
        align-items: center;
        padding-left: 20%;
        span {
          width: 100px;
          display: inline-block;
          white-space: normal;
          font-size: 16px;
          font-weight: 700;
        }
        .iconfont {
          font-size: 26px;
        }
      }
    }
    .nav-list-box:after {
      width: 1px;
      height: 40px;
      display: block;
      background: #eee;
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      margin: 20px 0;
    }
    .nav-list-box:nth-child(1):after {
      width: 1px;
      height: 40px;
      display: none;
      background: #eee;
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      margin: 20px 0;
    }
  }
}
.nav_list:hover {
  color: #00eaff;
  background: none;
  .icon-box {
    color: #00eaff;
  }
}
.nav-list-box {
  position: relative;
  overflow: hidden;
  padding: 0 28px;
  color: #fbfbff;
}
.nav-list-box:after {
  width: 1px;
  height: 20px;
  display: block;
  background: #eee;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  margin: 10px 0;
}
.nav-list-box:nth-child(1)::after {
  display: none;
}
.el-menu {
  background: none;
  border: 0;
}
.top-right {
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10%;
}
.tag-box {
  padding: 5px;
  border: 1px solid #eee;
  border-radius: 4px;
  border-color: rgba($color: #00eaff, $alpha: 0.6);
  color: rgba($color: #00eaff, $alpha: 0.6);
  font-size: 14px;
  font-weight: 300;
}
// @media (max-width: 1919px) {
//     html {
//         zoom: 80%;
//     }
// }
</style>
<style lang='scss'>
.el-checkbox__inner {
  background: none;
}
.has-gutter:nth-of-type(1) .el-checkbox__inner {
  display: none;
}
.top-right {
  .el-select .el-input .el-select__caret {
    line-height: 26px;
  }
  .el-input--suffix .el-input__inner {
    padding-left: 5px;
  }
  .el-menu--horizontal > .el-submenu .el-submenu__icon-arrow {
    display: none;
  }
}
.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background: #000a36;
  // color: #00eaff;
}
// 英文版导航滑动
.enNav .el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background: none;
  // color: #00eaff;
}
.content .el-icon-arrow-down:before {
  content: none;
}
.enNav .el-icon-arrow-down:before {
  content: none;
}

.content .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  color: #00eaff;
  i {
    color: #00eaff;
  }
}
.enNav .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  color: #00eaff;
  i {
    color: #00eaff;
  }
}
.nav-box .el-submenu__title {
  padding: 0;
  width: 100%;
}
.content .el-input__inner {
  height: 30px;
}
.content .el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 40px;
  line-height: 40px;
}
.enNav .el-menu--horizontal > .el-submenu .el-submenu__title {
  // height: 86px;
}
.nav-box .el-menu--collapse .el-menu .el-submenu,
.el-menu--popup {
  min-width: 96px;
  /* padding: 0 20px; */
}
// .el-menu--horizontal {
//   transform: scale(1) translate(-50%, -50%);
// }
.el-menu--horizontal ul {
  transform: translate(30%);
}
// el-menu--popup-bottom-start
</style>
