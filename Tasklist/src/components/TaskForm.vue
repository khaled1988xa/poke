
<script setup>
import { ref,defineEmits,defineProps } from 'vue'

const taskName=ref('');
const taskDescription=ref('');
const emit=defineEmits(['add-task']);
function addTask(){
    emit('add-task',{
        taskName:taskName.value,
        taskDescription:taskDescription.value
    });
    taskName.value="";
    taskDescription.value="";

}

</script>

<template>
    <form class="from" @submit.prevent="addTask">
    <div class="input-group input-group-sm mb-3">
        <input type="text" required v-model="taskName" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
      </div>
      <div class="input-group input-group-sm mb-3">  
        <input type="text" required  v-model="taskDescription" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
      </div>
      <button class="btn btn-primary" type="submit">AddTask</button>
    </form>
    <button ></button>

</template>

<style scoped>

</style>
