export default {
  path: '/large',
  name: 'large',
  hidden: true,
  meta: {
    requireAuth: true,
    keepAlive: true
  },
  component: resolve => require(['@/views/large_size'], resolve)
}
