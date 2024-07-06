<template>
    <v-app>
        <!--
        Expliziter Vergleich mit true ist notwendig, da "isInitialized" auch eine Promise sein kann, die aber jedoch
        nicht besagt, dass die Benutzerdaten bereits fertig geladen wurden
        
        <router-view v-if="authStore.isInitialized === true"/>
         Zeigt Spinner solange Benutzerdaten nicht geladen wurden 
        <PageLoader v-else/> -->
        <RouterView/>
    </v-app>
</template>

<script setup>
    import { RouterView } from 'vue-router';
import PageLoader from './components/PageLoader.vue'
    import { useAuthStore } from '@/store/authStore'

    const authStore = useAuthStore()
</script>
