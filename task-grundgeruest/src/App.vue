<template>
    <v-app>
       
        <RouterView/>
    </v-app>
</template>

<script setup>
    import { RouterView } from 'vue-router';
import PageLoader from './components/PageLoader.vue'
    import { useAuthStore } from '@/store/authStore'
    import { watch } from 'vue';
    import { useRoute } from "vue-router";
    const router = useRoute()
    const authStore = useAuthStore()
    watch(() => authStore.isInitialized, (newUser) => {
        if (!newUser) {
            router.push('/login')
        }
    })
</script>
