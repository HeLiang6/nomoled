export default {
  path: '/environment',
  name: 'environment',
  hidden: true,
  meta: {
    title: 'environment',
    requireAuth: true
  },
  component: resolve => require(['@/views/home'], resolve),
  children: [
    {
      path: '/environments',
      meta: {
        requireAuth: true,
        title: 'navList.ProjectManagement',
        keepAlive: true

      },
      component: resolve => require(['@/views/environment/home'], resolve)
    }]

}
