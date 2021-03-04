
// 广告设置
export default {
  path: '/advertising',
  name: 'advertising',
  meta: {
    title: 'navList.Advertising',
    requireAuth: true
  },
  hidden: true,
  component: resolve => require(['@/views/home'], resolve),
  children: [
    {
      path: '/Ad_list',
      meta: {
        requireAuth: true,
        title: 'Advertising.Ad_list'
      },
      component: resolve => require(['@/views/advertising/Ad_list'], resolve)
    },
    {
      path: '/Ad_new',
      meta: {
        requireAuth: true,
        title: 'Advertising.Ad_list'
      },
      component: resolve => require(['@/views/advertising/Ad_new'], resolve)
    }]
}
