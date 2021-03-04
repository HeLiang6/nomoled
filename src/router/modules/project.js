export default {
  path: '/project',
  name: 'project',
  meta: {
    title: 'navList.ProjectManagement',
    requireAuth: true
  },
  component: resolve => require(['@/views/home'], resolve),
  children: [
    {
      path: '/ProjectList',
      meta: {
        title: 'project_group.ProjectList',
        requireAuth: true,
        keepAlive: true
      },
      component: resolve => require(['@/views/project/Project_list'], resolve)
    },
    {
      path: '/Device_Center',
      meta: {
        title: 'project_group.DeviceCenter',
        requireAuth: true,
        tag: 1, // 不显示导航标签
        keepAlive: false
      },
      component: resolve => require(['@/views/project/DeviceCenter'], resolve)
    },
    {
      path: '/lightTemplate',
      meta: {
        title: 'project_group.Street_lamp_management',
        requireAuth: true,
        keepAlive: true
      },
      component: resolve => require(['@/views/project/LightTemplate'], resolve)
    },
    {
      path: '/lightList',
      meta: {
        title: 'lightList.lightList',
        requireAuth: false,
        keepAlive: true
      },
      hidden: true,
      component: resolve => require(['@/views/project/LightList'], resolve)
    }
  ]
}
