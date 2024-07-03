<script setup>
import ref from 'vue';
const username = ref('Khaled');
const isLoggedIn = ref(false);
</script>

<template>
    <div v-if="isLoggedIn=true"> 
        <p >{{username}}</p>
        <button @onclick="username='mohammad'" >Change Name</button>
        <button @click="isLoggedIn=!isLoggedIn">Show/Hide Username</button>
    </div>
</template>

<style scoped>

</style>
