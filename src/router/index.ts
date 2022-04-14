import { createRouter, createWebHistory } from 'vue-router'
import EditPanelVue from '../views/EditPanel.vue'

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
      component: EditPanelVue
    }
  ]
})

export default router
