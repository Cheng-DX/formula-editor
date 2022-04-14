import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'MAIN',
      redirect: '/edit'
    },
    {
      path: '/load-json',
      name: 'load-json',
      component: () => import('../views/LoadJSON.vue')
    },
    {
      path: '/edit',
      name: '/edit',
      component: () => import('../views/EditPanel.vue')
    }
  ]
})

export default router
