<script setup>
import { ref,defineEmits,defineProps } from 'vue'
const counter = ref(0)
const emit=defineEmits(['countervalueplus','countervalueminus']);
function counterup(){
  counter.value+=1 
  emit('countervalueplus',{
    counter:counter.value
  })

}
function counterdown(){
  counter.value-=1
  emit('countervalueminus',{
    counter:counter.value
  })

 
}



</script>

<template>
  <main>
    <div>
        <button class="btn btn-primary" @click="counterup">+</button>
        <button class="btn btn-primary" @click="counterdown">-</button>
    </div>
  </main>
</template>

<style scoped>

</style>
