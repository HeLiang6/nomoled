export default {
  path: '/equipmentMonitoring',
  name: 'equipmentMonitoring',
  // redirect: '/equipmentMonitorings',
  component: resolve => require(['@/views/home'], resolve),
  meta: {
    title: 'navList.EquipmentMonitoring',
    requireAuth: true
  },
  children: [
    {
      path: '/MapMonitoring',
      meta: {
        title: 'EquipmentMonitoring.GIS',
        requireAuth: true,
        tag: 1,
        keepAlive: true
      },
      component: resolve => require(['@/views/equipmentMonitoring/GPS_MAP'], resolve)
    },
    {
      path: '/StatusList',
      meta: {
        title: 'EquipmentMonitoring.StatusList',
        requireAuth: true,
        keepAlive: true

      },
      component: resolve => require(['@/views/equipmentMonitoring/StatusList'], resolve)
    }
  ]
}
