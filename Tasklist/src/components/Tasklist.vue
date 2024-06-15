<script setup>
import {ref} from 'vue';
import TasklistItem from "@/components/TasklistItem.vue";


const tasks= ref([
    {id:1,title:"task1",compleated:false},
    {id:2,title:"task2",compleated:false},
    {id:3,title:"task3",compleated:false},
])

function updateTask(index){
console.log("task update triggerd")
tasks.value[index].compleated=true
}
</script>

<template>
  <div>Task Items</div>
  <div v-for="(task, index) in tasks">
    {{ task.title }}
  </div>
  <TasklistItem v-for="(task,index) in tasks" :task="task" :index="index" @task-compleated="updateTask"></TasklistItem>
</template>

<style scoped>

</style>
