<template>
  <v-app>
    <v-app-bar color="primary" app>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title v-if="authStore.isInitialized">
        Hello, {{ authStore.user.firstName }} {{ authStore.user.lastName }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Show basket button if user is logged in -->
      <v-btn text v-if="authStore.isUser" to="/basket">Warenkorb</v-btn>
      <!-- Show product creation button if user is an admin -->
      <v-btn text v-if="authStore.isAdmin" to="/new-product">Produkt anlegen</v-btn>
      <!-- Show logout button if user is logged in -->
      <v-btn text v-if="authStore.isLoggedIn" @click="logout">Logout</v-btn>
      <!-- Show login button if authStore is not initialized -->
      <v-btn text v-else-if="!authStore.isInitialized" to="/login">Login</v-btn>
      <!-- Show register button if authStore is not initialized -->
      <v-btn text v-if="!authStore.isInitialized" to="/register">Registrieren</v-btn>
    </v-app-bar>

    <v-navigation-drawer app permanent>
      <v-list>
        <v-list-item>
          <template v-slot:prepend>
            
            <div class="user-info pa-4">
              <v-avatar size="150" class="mb-4">
                <v-img
                  v-if="authStore.user.image"
                  :src="`https://codersbay.a-scho-wurscht.at/api/user/${authStore.userId}/image`"
                  alt="User Avatar"
                  cover
                ></v-img>
                <v-icon v-else size="150" color="grey lighten-1">mdi-account-circle</v-icon>
              </v-avatar>
              <div class="user-details text-center">
                <div class="text-h6">{{ authStore.user.firstName }}</div>
                <div class="text-subtitle-1">{{ authStore.user.lastName }}</div>
              </div>
            </div>
          </template>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item link to="/AddnewTask">
          <template v-slot:prepend>
            <v-icon>mdi-calendar-check</v-icon>
          </template>
          <v-list-item-title>TasksLists/Tasks</v-list-item-title>
        </v-list-item>
        <v-list-item link :to="{ name: 'PersonalData' }">
          <template v-slot:prepend>
            <v-icon>mdi-account-circle</v-icon>
          </template>
          <v-list-item-title>Personal Data</v-list-item-title>
        </v-list-item>
        <v-list-item link :to="{ name: 'UpdateProfilePhoto' }">
          <template v-slot:prepend>
            <v-icon>mdi-camera</v-icon>
          </template>
          <v-list-item-title>Update Profile Photo</v-list-item-title>
        </v-list-item>
        <v-list-item link :to="{ name: 'UpdateUserPassword' }">
          <template v-slot:prepend>
            <v-icon>mdi-lock</v-icon>
          </template>
          <v-list-item-title>Change Password</v-list-item-title>
        </v-list-item>

        <v-list-item link to="/customers">
          <template v-slot:prepend>
            <v-icon>mdi-account-multiple</v-icon>
          </template>
          <v-list-item-title>Customers</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { useAuthStore } from '@/store/authStore'
import { useRoute } from "vue-router";
import '@mdi/font/css/materialdesignicons.css'; 
import 'vuetify/styles';

const random = Math.floor(Math.random() * 85) + 1;
console.log(random);
const authStore = useAuthStore()
console.log(authStore.isUser)
console.log(authStore.userId)
async function logout() {
  await authStore.logout()
}
const route = useRoute()
</script>

<style>
.resized-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  /* This will keep the aspect ratio */
}
.user-details {
  width: 100%;
}
.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>