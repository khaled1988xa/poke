<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Navigation Drawer</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-filter</v-icon>
      </v-btn>
      <v-switch label="Dark Mode" v-model="isDark"></v-switch>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list dense>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
    <v-main>
      <!-- Main content can be placed here -->
    </v-main>
    
    <v-footer color="primary" class="white--text text-center">
      <v-icon large>mdi-vuetify</v-icon>
      <div>Vuetify</div>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)
const isDark = ref(false)
const items = ref([
  { title: 'Home', icon: 'mdi-home' },
  { title: 'About', icon: 'mdi-information' },
  { title: 'Services', icon: 'mdi-briefcase' },
  { title: 'Contact', icon: 'mdi-phone' },
  { title: 'Feedback', icon: 'mdi-message-text-outline' }
])
</script>
