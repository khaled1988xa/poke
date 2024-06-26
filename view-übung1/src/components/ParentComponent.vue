<script setup>
import { ref } from 'vue';
import {ChildComponent} from 'view-übung1\src\components\ChildComponent.vue';
const message = ref('Hello World from parent');
</script>

<template>
    <main>
        <ChildComponent :message="message" />
    </main>

 
</template>

<style scoped>

</style>
