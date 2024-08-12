import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Details from '../views/Details.vue'
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import { usePiniaAuthStore } from '@/stores/auth';

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
      meta: { requiresAuth: true }  // Require authentication to access home
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
router.beforeEach((to, from, next) => {
  const authStore = usePiniaAuthStore();
  if (to.meta.requiresAuth && !authStore.status.loggedIn) {
    // Redirect to login page or deny access
    next({ name: 'Login' });  // Ensure there is a 'Login' route defined
  } else {
    next();  // Proceed to the route
  }
});
export default router
