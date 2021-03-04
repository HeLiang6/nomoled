import Vue from 'vue'
import Router from 'vue-router'
// import One from '@/views/camera/one.vue'
// import Nav from '@/views/nav/index.vue'
// import Home from '@/views/home/index.vue'
import project from './modules/project'
import EquipmentMonitoring from './modules/equipmentMonitoring'
import Task from './modules/task'
import Data from './modules/data'
import User from './modules/user'
import Log from './modules/Log'
import Equipment from './modules/equipment'
import Advertising from './modules/advertising'
import System from './modules/system'
import Wifi from './modules/wifi'
import Charge from './modules/charge'
import Environment from './modules/environment'
import Camera from './modules/camera'
import LargrSize from './modules/large_size'

Vue.use(Router)
export default new Router({
  routes: [
    project,
    EquipmentMonitoring,
    Task,
    Data,
    User,
    Log,
    Equipment,
    Advertising,
    System,
    Wifi,
    Charge,
    Environment,
    Camera,
    LargrSize,
    {
      path: '/login',
      name: 'login',
      hidden: true,
      component: resolve => require(['@/views/login/index.vue'], resolve)
    },
    // {
    //   path: '/one',
    //   name: 'one',
    //   hidden: true,
    //   component: One
    // },
    {
      path: '/',
      redirect: '/login',
      hidden: true,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/navList',
      name: 'navList',
      hidden: true,
      meta: {
        // requireAuth: true
      },
      component: resolve => require(['@/views/nav/satellite.vue'], resolve)
      // component: resolve => require(['@/views/nav/home.vue'], resolve)
    },
    // 测试google地图
    {
      path: '/google',
      name: 'google',
      hidden: true,
      meta: {
        // requireAuth: true
      },
      component: resolve => require(['@/components/google/home.vue'], resolve)
      // component: resolve => require(['@/views/nav/home.vue'], resolve)
    },
    // {
    //   path: '/navList2',
    //   name: 'navList',
    //   hidden: true,
    //   meta: {
    //     // requireAuth: true
    //   },
    //   component: resolve => require(['@/views/nav/home.vue'], resolve)
    //   // component: resolve => require(['@/views/nav/home.vue'], resolve)
    // },
    {
      path: '/home',
      name: 'home',
      hidden: true,
      meta: {
        title: '首页',
        requireAuth: true
      },
      redirect: '/ProjectList'
    }
  ]
})
