import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
//import vuetify from "./plugins/vuetify";
import * as components from 'vuetify/components';
import 'vuetify/styles';
import vuetify from './'




createApp(App)
.use(vuetify)
.mount('#app')

