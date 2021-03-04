export default {
  path: '/system',
  name: 'system',
  hidden: true,

  meta: {
    title: 'navList.System',
    requireAuth: true,
    keepAlive: true

  },
  component: resolve => require(['@/views/home'], resolve)
  // children: [
  // {
  //   path: '/systems',
  //   meta: {
  //     requireAuth: true,
  //     title: 'navList.ProjectManagement'
  //   },
  //   component: resolve => require(['@/views/system'], resolve)
  // }
  // ]
}
