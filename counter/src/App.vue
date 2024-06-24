<script setup>
import { ref,defineProps } from 'vue'
 
import CounterDisplay from './components/CounterDisplay.vue'
import CounterControl from './components/CounterControl.vue'

const counter=ref(0);
function result(event){
  counter.value=event.counter;
  console.log(counter.value);
}
 

</script>

<template>
  <div class="container">
    <CounterDisplay :counter="counter" /> <!-- Pass counter value to display component -->
    <CounterControl @countervalueplus="result" @countervalueminus="result" /> <!-- Handle both increment and decrement events -->
   
  </div>
</template>

<style scoped>

</style>
