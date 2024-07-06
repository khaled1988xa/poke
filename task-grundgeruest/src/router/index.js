import { createRouter, createWebHistory } from 'vue-router'
import AuthenticationLayout from '@/layouts/AuthenticationLayout.vue'
import ApplicationLayout from '@/layouts/ApplicationLayout.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegistrationView from '@/views/auth/RegistrationView.vue'
import HomeView from '@/views/HomeView.vue'
import BasketView from '@/views/BasketView.vue'
import ProductCreateView from '@/views/ProductCreateView.vue'
import { useAuthStore } from '@/store/authStore'
import personalData from '@/views/personalData.vue'
import UpdateProfilePhoto from '@/views/UpdateProfilePhoto.vue'
import UpdateUserPassword from '@/views/UpdateUserPassword.vue'

const routes = [
    {
        path: '/',
        component: ApplicationLayout,
        children: [
            {
                path: '',
                component: HomeView
            },
            {
                path: '/personal-data',
                name: 'PersonalData',
                component: personalData
            },
            { 
                 path: '/update-profile-photo',
                 name: 'UpdateProfilePhoto',
                 component: UpdateProfilePhoto 
            },
            {
                path:'Update-User-Password',
                name: 'UpdateUserPassword',
                component: UpdateUserPassword
            },
            {
                path: 'basket',
                component: BasketView,
                /**
                 * "beforeEnter" wird automatisch aufgerufen, wenn der Seitenbesucher auf, in diesem Fall, "/basket" geleitet wird.
                 * https://router.vuejs.org/guide/advanced/navigation-guards.html#per-route-guard
                 */
                beforeEnter() {
                    const authStore = useAuthStore()
                    if(!authStore.isUser) {
                        return '/' // Wenn der Benutzer nicht oder eingeloggt ist oder ein Admin ist, wird er auf die Startseite weitergeleitet
                    }
                    return true
                }
            },
            {
                path: 'new-product',
                component: ProductCreateView,
                beforeEnter() {
                    const authStore = useAuthStore()
                    if(!authStore.isAdmin) {
                        return '/' // Wenn der Benutzer nicht eingeloggt ist oder ein Kunde ist, wird er auf die Startseite weitergeleitet
                    }
                    return true
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
            },
            {
                path: '/register',
                component: RegistrationView
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

/**
 * Diese Funktion wird beim initialen Seitenaufruf und bei jedem weiteren Seitenwechsel aufgerufen.
 * In diesem Fall werden einmal die Benutzerdaten geladen, damit die benutzerabhängigen Anzeigen (Button zum Warenkorb)
 * und späteren RouteGuards korrekt ausgeführt werden können.
 * https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
 */
router.beforeEach(() => useAuthStore().initialize())

export default router
