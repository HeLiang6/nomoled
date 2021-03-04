export default {
  path: '/equipment',
  name: 'equipment',
  meta: {
    title: 'navList.equipment',
    requireAuth: true
  },
  component: resolve => require(['@/views/home'], resolve),
  children: [
    {
      path: '/warnList',
      meta: {
        requireAuth: true,
        title: 'equipment.warnList',
        keepAlive: true

      },
      component: resolve => require(['@/views/equipment/warnList'], resolve)
    },
    {
      path: '/Alarm_Settings',
      meta: {
        requireAuth: true,
        title: 'equipment.Alarm_Settings',
        keepAlive: true

      },
      component: resolve => require(['@/views/equipment/Alarm_Settings'], resolve)
    }
  ]
}
