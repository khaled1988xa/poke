<script setup>
import { ref } from 'vue';
import  ChildComponent from './ChildComponent.vue';
const message = ref('Hello World from parent');
function changethemesage(){
    message.value='Hello World from parent changed';
}
</script>

<template>
    <main>
        <ChildComponent :message="message" @emittoparent="changethemesage"/>    
    </main>

 
</template>

<style scoped>

</style>
