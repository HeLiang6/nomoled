// import router from './index.js'

// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
//     if (sessionStorage.getItem('nomouser')) {
//       if (to.path === '/login' || to.path === '/') {
//         next({ path: '/navList' })
//       } else {
//         next()
//       }
//     } else {
//       next({
//         path: '/login',
//         query: {
//           redirect: to.fullPath
//         } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       })
//     }
//   } else {
//     next()
//   }
// })
