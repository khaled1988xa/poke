<script setup>
import TaskForm from './components/TaskForm.vue'
import {ref} from 'vue'
const tasklistarray=ref([]);
function addtask(task){
    tasklistarray.value.push(task);
}
</script>

<template>
  <h1>TaskList</h1>
  <div class="container">
    <TaskForm @add-task="addtask"/>
  </div>
  <div>

 
</div>
<ul>
  <li v-for="(task,index) in tasklistarray" :key="index">
    {{ task.taskName }} - {{ task.taskDescription }}
    </li>

</ul>


</template>

<style scoped>

</style>
