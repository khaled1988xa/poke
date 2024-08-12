import './assets/main.css'
import vuetify from './plugins/vuetify'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { createVuetify } from 'vuetify';

import 'vuetify/styles'  // Ensure this line is present

import App from './App.vue'
import router from './router'
// const vuetify = createVuetify();

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
// .use(store)

app.mount('#app')
