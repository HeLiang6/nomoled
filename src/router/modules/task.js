// 任务中心
export default {
  path: '/task',
  name: 'task',
  meta: {
    title: 'navList.Task',
    requireAuth: true
  },
  component: resolve => require(['@/views/home'], resolve),
  children: [
    {
      path: '/Task_Assignment',
      meta: {
        requireAuth: true,
        title: 'task.Task_Assignment',
        keepAlive: true

      },
      component: resolve => require(['@/views/task/Task_Assignment'], resolve)
    }]

}
