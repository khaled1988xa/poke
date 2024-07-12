import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/authStore'

// Layouts
import AuthenticationLayout from '@/layouts/AuthenticationLayout.vue'
import ApplicationLayout from '@/layouts/ApplicationLayout.vue'

// Views
import WelcomeView from '@/views/WelcomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegistrationView from '@/views/auth/RegistrationView.vue'
import HomeView from '@/views/HomeView.vue'
import BasketView from '@/views/BasketView.vue'
import ProductCreateView from '@/views/ProductCreateView.vue'
import PersonalData from '@/views/personalData.vue'
import UpdateProfilePhoto from '@/views/UpdateProfilePhoto.vue'
import UpdateUserPassword from '@/views/UpdateUserPassword.vue'
import AddnewTask from '@/views/AddnewTask.vue'
import viewTasks from '@/views/viewTasks.vue'

const routes = [
    {
        path: '/',
        component: WelcomeView,
        meta: { requiresAuth: false }
    },
    {
        path: '/app',
        component: ApplicationLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                component: HomeView
            },
            {
                path: 'personal-data',
                name: 'PersonalData',
                component: PersonalData
            },
            {
                path: 'update-profile-photo',
                name: 'UpdateProfilePhoto',
                component: UpdateProfilePhoto 
            },
            {
                path: 'update-user-password',
                name: 'UpdateUserPassword',
                component: UpdateUserPassword
            },
            {
                path:'/viewTasks',
                name: 'viewTasks',
                component:viewTasks
            },
            {
                path: '/AddnewTask',
                name: 'AddnewTask',
                component: AddnewTask
            },
            {
                path: 'new-product',
                component: ProductCreateView,
                beforeEnter: (to, from, next) => {
                    const authStore = useAuthStore()
                    if (!authStore.isAdmin) {
                        return next('/app')
                    }
                    return next()
                }
            }
        ]
    },
    {
        path: '/login',
        component: AuthenticationLayout,
        children: [
            {
                path: '',
                component: LoginView
            }
        ]
    },
    {
        path: '/register',
        component: AuthenticationLayout,
        children: [
            {
                path: '',
                component: RegistrationView
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()
    await authStore.initialize()

    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
        next('/login')
    } else if ((to.path === '/login' || to.path === '/register') && authStore.isLoggedIn) {
        next('/app')
    } else if (to.path === '/' && authStore.isLoggedIn) {
        next('/app')
    } else {
        next()
    }
})

export default router