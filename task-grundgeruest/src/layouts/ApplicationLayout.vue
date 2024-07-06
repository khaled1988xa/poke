<template>
    <v-app>
      <v-app-bar color="primary" app>
        <v-app-bar-title v-if="authStore.isInitialized">
          Hello, {{ authStore.user.firstName }} {{ authStore.user.lastName }}
        </v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn text v-if="authStore.isUser" to="/basket">Warenkorb</v-btn>
        <v-btn text v-if="authStore.isAdmin" to="/new-product">Produkt anlegen</v-btn>
        <v-btn text v-if="authStore.isLoggedIn" @click="logout">Logout</v-btn>
        <v-btn text v-else to="/login">Login</v-btn>
        <v-btn text to="/register" v-else>Registrieren</v-btn>
      </v-app-bar>
  
      <v-navigation-drawer app permanent>
        <v-list-item>
          <v-list-item-avatar>
            <img :src="`https://codersbay.a-scho-wurscht.at/api/user/${authStore.userId}/image`" alt="User Avatar" class="resized-image">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ authStore.user.firstName }}</v-list-item-title>
            <v-list-item-subtitle>{{ authStore.user.lastName }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list>
          <v-list-item link :to="{ name: 'PersonalData' }">
            <v-list-item-icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Personal Data</v-list-item-title>
          </v-list-item>
        
        <v-list-item link :to="{ name: 'UpdateProfilePhoto' }">
          <v-list-item-icon>
            <v-icon>mdi-camera</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Update Profile Photo</v-list-item-title>
        </v-list-item>
        <v-list-item link :to="{ name: 'UpdateUserPassword' }">
          <v-list-item-icon>
            <v-icon>mdi-lock</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Change Password</v-list-item-title>
        </v-list-item>
          
          <v-list-group prepend-icon="mdi-menu">
            <template v-slot:activator>
              <v-list-item-title>Products</v-list-item-title>
            </template>
            <v-list-item link to="#" title="Product 1">
              <v-list-item-title>Product 1</v-list-item-title>
            </v-list-item>
            <v-list-item link to="#" title="Product 2">
              <v-list-item-title>Product 2</v-list-item-title>
            </v-list-item>
            <v-list-item link to="#" title="Product 3">
              <v-list-item-title>Product 3</v-list-item-title>
            </v-list-item>
            <v-list-item link to="#" title="Product 4">
              <v-list-item-title>Product 4</v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-list-item link to="/orders">
            <v-list-item-icon>
              <v-icon>mdi-format-list-bulleted</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Orders</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/customers">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Customers</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <v-main>
        <router-view>
          
        </router-view>
      </v-main>
    </v-app>
  </template>
  


<script setup>

    import { useAuthStore } from '@/store/authStore'
    import personalData from '../views/personalData.vue'
    import { useRoute } from "vue-router";
import PersonalData from '../views/personalData.vue';
    const random = Math.floor(Math.random() * 85) + 1;
    console.log(random);
    const authStore = useAuthStore()
    console.log(authStore.isUser)
    console.log(authStore.userId)

    const route = useRoute()
    const currentUrl=route.fullPath;
    console.log(currentUrl)
</script>

<style>
.resized-image {
  width: 200px;
  height: 200x;
  object-fit: cover; /* This will keep the aspect ratio */
}

</style>