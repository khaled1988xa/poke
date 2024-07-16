<template>
  <v-container>
    <v-row>
      <v-col v-if="authStore.tasks.length>0"
        v-for="task in authStore.tasks"
        :key="task.taskId"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          :color="getTaskColor(task.status)"
          class="mx-auto d-flex flex-column"
          height="100%"
          width="100%"
        >
          <v-card-title class="text-h6 font-weight-bold">Task To Do</v-card-title>
          <v-card-subtitle>
            <strong>Task Title</strong>
            <div v-if="!task.isEditingTitle">
              <p @click="task.isEditingTitle = true" class="mb-0">{{ task.title }}</p>
            </div>
            <div v-else>
              <v-textarea v-model="task.title" rows="2" auto-grow></v-textarea>
              <v-btn small @click="saveTitle(task)" color="black">Save</v-btn>
              <v-btn small @click="cancelEditTitle(task)" color="black">Cancel</v-btn>
            </div>
          </v-card-subtitle>
          <v-card-text class="text--primary flex-grow-1">
            <strong>Description</strong>
            <div v-if="!task.isEditingDescription">
              <p @click="task.isEditingDescription = true">{{ task.description }}</p>
            </div>
            <div v-else>
              <v-textarea v-model="task.description" rows="3" auto-grow></v-textarea>
              <v-btn small @click="saveDescription(task) " color="black" >Save</v-btn>
              <v-btn small @click="cancelEditDescription(task)" color="black">Cancel</v-btn>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" text @click="deleteTask(task)">Delete</v-btn>
            <v-btn color="error" text @click="saveTask(task)">Save</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="toggleState(task)">Status</v-btn>
          </v-card-actions>
            <v-chip color="black" text-color="black">
              {{ task.status }}
            </v-chip>
        </v-card> 
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/store/authStore';

const authStore = useAuthStore()
console.log(authStore.tasks)
const uploudtask=ref({
  title: '',
  description: '',
  status: 'TODO',
})
const getTaskColor = (status) => {
  switch(status){
    case 'TODO': return 'light-blue'
    case 'IN_PROGRESS': return 'amber lighten-4'
    case 'DONE': return 'light-green lighten-4'
    default: return 'grey'
  }
}

const toggleState = (task) => {
  if (task.status === 'TODO') {
    task.status = 'IN_PROGRESS'
    task.statues=uploudtask.value.status
  } else if (task.status === 'IN_PROGRESS') {
    task.status = 'DONE'
    task.statues=uploudtask.value.status
  } else if (task.status === 'DONE') {
    task.status = 'TODO'
    task.statues=uploudtask.value.status
  }
}

const saveTitle = (task) => {
  task.isEditingTitle = false
 
 
}


const cancelEditTitle = (task) => {
  task.isEditingTitle = false
}

const saveDescription = (task) => {
  task.isEditingDescription = false
  
  
}

const cancelEditDescription = (task) => {
  task.isEditingDescription = false
}


authStore.tasks.forEach(task => {
  task.isEditingTitle = false
  task.isEditingDescription = false
})
async function saveTask(task) {
  try {
    const updatedTask = {
      taskId: task.taskId,
      title: task.title,
      description: task.description,
      status: task.status,
    };
    console.log(updatedTask)
    await authStore.updateTask(updatedTask);
  } catch (error) {
    console.log(error);
  }}
  async function deleteTask(task) {
    try {
      //window.confirm('Are you sure you want to delete this task?')
      //window.alert('Task deleted!')
      //window.location.reload()
      await authStore.deleteTask(task.taskId);
     
    } catch (error) {
      console.log(error);
    }
  }
</script>
