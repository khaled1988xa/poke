import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Auth/login.vue')
    },
    {
      path:'/register',
      name:'register',
      component: () => import('../views/Auth/register.vue')
    },
    {
      path:'/user',
      name:'user',
      component: () => import('../views/user/user.vue')
    },
    {
      path:'/password',
      name:'password',
      component: () => import('../views/user/password.vue')
    }
  ]
})

export default router
