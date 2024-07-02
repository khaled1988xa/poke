<template>
    <v-app-bar color="primary">
        <v-app-bar-title>Authentication Demo</v-app-bar-title>
        <v-toolbar-items>
            <v-btn to="/basket" v-if="authStore.isUser">Warenkorb</v-btn>
            <v-btn to="/new-product" v-if="authStore.isAdmin">Produkt anlegen</v-btn>
            <template v-if="authStore.isLoggedIn">
                <v-btn @click="authStore.logout">Logout</v-btn>
            </template>
            <template v-else>
                <v-btn to="/login">Login</v-btn>
                <v-btn to="/register">Registrieren</v-btn>
            </template>
        </v-toolbar-items>
    </v-app-bar>
    <v-main>
        <v-container>
            <router-view/>
        </v-container>
    </v-main>
</template>

<script setup>
    import { useAuthStore } from '@/stores/authStore'

    const authStore = useAuthStore()
</script>
