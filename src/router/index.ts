import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
