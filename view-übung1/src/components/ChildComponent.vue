<script setup>

import {defineProps} from 'vue';
const props =defineProps({
    message:{
        type=String
        required=true
    }
   
});




</script>

<template>
    <main>
        <p >{{props.message}}</p>
    </main>
 
</template>

<style scoped>

</style>
