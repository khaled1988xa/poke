import { createApp } from 'vue'
import App from './App.vue'
import {router} from './router'
import { createPinia } from 'pinia'

import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'

const pinia = createPinia()

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')
