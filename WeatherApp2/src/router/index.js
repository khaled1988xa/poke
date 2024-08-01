/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import DetailsView from '@/views/DetailsView.vue'
import Main from '@/views/Main.vue'
 // Ensure you have this import if HomeView is used

// Auto-generated routes if you're using Vite-plugin-pages (uncomment if applicable)
// import { setupLayouts } from 'virtual:generated-layouts'
// import autoRoutes from 'virtual:generated-pages'

// Define routes manually or use auto-generated routes
const manualRoutes = [
  
  {
    path: '/details',
    name: 'DetailsView',
    component: DetailsView,
  },{
    path:'/',
    name:'Home',
    component:Main,
  }
];

// Use auto-generated routes if applicable
// const routes = setupLayouts(autoRoutes);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: manualRoutes, // make sure to use the correct `routes` variable
});

// Error handling should be defined after router instantiation
router.onError((error, to) => {
  if (error.message.includes('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error');
      localStorage.setItem('vuetify:dynamic-reload', 'true');
      location.assign(to.fullPath);
    } else {
      console.error('Dynamic import error, reloading page did not fix it', error);
    }
  } else {
    console.error(error);
  }
});

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload');
});

export default router;
