import { createRouter, createWebHistory } from 'vue-router'

// Components
import TodoViewVue from '@/views/TodoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todo',
      component: TodoViewVue
    }
  ]
})

export default router
