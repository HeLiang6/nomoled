export default {
  path: '/camera',
  name: 'camera',
  hidden: true,
  meta: {
    title: 'camera',
    requireAuth: true
  },
  component: resolve => require(['@/views/home'], resolve),
  children: [
    {
      path: '/cameras',
      meta: {
        requireAuth: true,
        title: 'navList.ProjectManagement'
      },
      component: resolve => require(['@/views/camera/home'], resolve)
    }]

}
