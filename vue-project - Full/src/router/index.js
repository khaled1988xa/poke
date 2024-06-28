import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import CreateView from '@/views/CreateView.vue'
import DetailView from '@/views/DetailView.vue'
/*
* Hier kommen die Routes der
* Anwendung hinein
*/
const routes = [
    {path: '/', component: HomeView},
    {path: '/create', component: CreateView},
    {path: '/details/:id', component: DetailView}
]
const router = createRouter({
    routes,
    history: createWebHistory()
})
export{router}
