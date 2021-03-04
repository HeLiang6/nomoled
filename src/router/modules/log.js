export default {
  path: '/log',
  name: 'log',
  meta: {
    title: 'navList.log',
    requireAuth: true
  },
  component: resolve => require(['@/views/home'], resolve),
  children: [
    {
      path: '/system',
      meta: {
        requireAuth: true,
        title: 'log.system',
        keepAlive: true

      },
      component: resolve => require(['@/views/log/system_log'], resolve)
    }
    // {
    //   path: '/Backstage',
    //   meta: {
    //     requireAuth: true,
    //     title: 'log.Backstage'
    //   },
    //   component: resolve => require(['@/views/log/Backstage'], resolve)
    // }
  ]
}
