// 数据管理
export default {
  path: '/data',
  name: 'data',
  meta: {
    title: 'navList.Data',
    requireAuth: true
  },
  component: resolve => require(['@/views/home'], resolve),
  children: [
    {
      path: '/LightData',
      meta: {
        requireAuth: true,
        title: 'data.LightData',
        keepAlive: true
      },
      component: resolve => require(['@/views/data/LightData'], resolve)
    },
    // {
    //   path: '/Historical_data',
    //   meta: {
    //     requireAuth: true,
    //     title: 'data.historical_data'
    //   },
    //   component: resolve => require(['@/views/data/Historical_data'], resolve)
    // },
    {
      path: '/DTU_list',
      meta: {
        requireAuth: true,
        title: 'data.DTU_list',
        keepAlive: true
      },
      component: resolve => require(['@/views/data/DTU_list'], resolve)
    }]
}
