export default {
  path: '/wifi',
  name: 'wifi',
  hidden: true,
  meta: {
    title: 'wifi',
    requireAuth: true
  },
  component: resolve => require(['@/views/home'], resolve),
  children: [
    {
      path: '/wifis',
      meta: {
        requireAuth: true,
        title: 'navList.ProjectManagement',
        keepAlive: true
      },
      component: resolve => require(['@/views/wifi/home'], resolve)
    }]

}
