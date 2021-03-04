export default {
  path: '/charge',
  name: 'charfe',
  hidden: true,
  meta: {
    title: 'charge',
    requireAuth: true
  },
  component: resolve => require(['@/views/home'], resolve),
  children: [
    {
      path: '/charges',
      meta: {
        requireAuth: true,
        title: 'navList.ProjectManagement'
      },
      component: resolve => require(['@/views/charge/home'], resolve)
    }]

}
