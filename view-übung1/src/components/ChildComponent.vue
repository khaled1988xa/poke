<script setup>

import {defineProps,defineEmits} from 'vue';
const props =defineProps({
    message:{
        type:String,
        required:true
    }
   
});
const emit=defineEmits(['emittoparent']);

    function emittoparent(){
        
        emit("emittoparent")
    };




</script>

<template>
    <main>
        <p >{{props.message}}</p>
        <button @click="emittoparent()">parent chaneg name</button>
    </main>
 
</template>

<style scoped>

</style>
