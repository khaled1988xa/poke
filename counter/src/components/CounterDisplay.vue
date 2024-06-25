<script setup>
import CounterControl from './CounterControl.vue'
import App from '@/App.vue';
import {ref,defineProps} from 'vue'


const props=defineProps({
    counter:{
        type:Number,
        required:true
    }})
    const counter =ref(props.counter);
 



</script>

<template>
    <main>
        <div class="container">
        <div>
            
            
            <h1>{{props.counter}}</h1>
        
            
            </div>
        </div>
    </main>
   
 
</template>

<style scoped>

</style>
