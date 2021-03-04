// 用户管理
export default {
  path: '/user',
  name: 'user',
  hidden: true,
  meta: {
    title: 'navList.User',
    requireAuth: true
  },
  component: resolve => require(['@/views/home'], resolve)
  // children: [
  //   {
  //     path: '/users',
  //     meta: {
  //       requireAuth: true,
  //       title: 'navList.ProjectManagement'
  //     },
  //     component: resolve => require(['@/views/user'], resolve)
  //   }]

}
