import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Details from '../views/Details.vue'
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Register',
      component: Register
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      // meta: { requiresAuth: true }  // Require authentication to access home
    },
    {
      path: '/details/:id',
      name: 'Details',
      component: Details,
      // meta: { requiresAuth: true }  // Require authentication to access details
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
});
export default router
