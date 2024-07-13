<template>
  <v-container>
    <v-row justify="center">
      <v-dialog v-model="isAddDialogOpen" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark @click="isAddDialogOpen = true">Add New Tasklist</v-btn>
          <v-btn color="primary" dark @click="toggleTasklistVisibility">Load available Tasklist from server</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Tasklist Details</span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Title" required v-model="newTasklistTitle"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Description" v-model="newTasklistDescription"></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeAddDialog">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="createTasklist">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-container>
      <v-col v-if="tasklists">
        <v-row v-if="isTasklistVisible" sm="4" md="3" v-for="tasklist in tasklists" :key="tasklist.taskListId" class="task-card">
          <v-card color="primary" class="pa-3" outlined>
            <v-card-title class="headline mb-1">{{ tasklist.slug }}</v-card-title>
            <v-card-subtitle>User ID: {{ tasklist.userId }}</v-card-subtitle>
            <v-card-text>
              <div>Tasklist ID: {{ tasklist.taskListId }}</div>
              <div>Label: {{ tasklist.label }}</div>
              <div>Description: {{ tasklist.description }}</div>
            </v-card-text>
            <v-card-actions class="d-flex flex-column align-start">
              <v-btn @click="viewTasklist(tasklist.taskListId)" class="mb-2">View</v-btn>
              <v-btn @click="triggeraddtaskdialog(tasklist.taskListId);addTask(tasklist.taskListId) " class="mb-2">Add Task</v-btn>
              <v-btn @click="openEditDialog(tasklist)" class="mb-2">Edit</v-btn>
              <v-btn @click="deleteTasklist(tasklist.taskListId)">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-col>
      <v-dialog v-model="isEditDialogOpen" persistent max-width="600px">
        <template v-slot:activator="{ on }"> </template>
        <v-card>
          <v-card-title>
            <span class="headline">Edit Tasklist</span>
          </v-card-title>
          <v-card-text>
            <v-row class="task-card">
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Title" v-model="editingTasklist.label" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Description" v-model="editingTasklist.description"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Slug" v-model="editingTasklist.slug" required></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeEditDialog">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="saveEdit">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="isAddtaskdialogOpen" persistent  max-width="600px">
        <template v-slot:activator="{ on }"> </template>
        <v-card>
          <v-card-title>
            <span class="headline">Add new Task</span>
          </v-card-title>
          <v-card-text>
            <v-row class="task-card">
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="assignedUserId" v-model="newTask.assignedUserId" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Description" v-model="newTask.description"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="taskListId" v-model="newTask.taskListId" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select label="status" :items="['TODO','IN_PROGRESS','DONE ']" v-model="newTask.status" required></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="points" v-model="newTask.points" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="estimation" v-model="newTask.estimation" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="title" v-model="newTask.title" required></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="isAddtaskdialogOpen=false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="saveAddTask">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();


const newTasklistTitle = ref('');
const newTasklistDescription = ref('');
const editingTasklist = ref({});

const tasklists = authStore.tasklists;

const isAddDialogOpen = ref(false);
const isEditDialogOpen = ref(false);

function closeAddDialog() {
  isAddDialogOpen.value = false;
}

function closeEditDialog() {
  isEditDialogOpen.value = false;
}

const isTasklistVisible = ref(false);

function toggleTasklistVisibility() {
  isTasklistVisible.value = !isTasklistVisible.value;
}

const createTasklist = async () => {
  const tasklist = {
    label: newTasklistTitle.value,
    description: newTasklistDescription.value
  };

  await authStore.createNewTasklist(tasklist);
  isAddDialogOpen.value = false;
}

async function deleteTasklist(taskListId) {
  await authStore.deleteTasklist(taskListId);
}

async function openEditDialog(tasklist) {
  isEditDialogOpen.value = true;
  editingTasklist.value = { ...tasklist };
}

async function saveEdit() {
  try {
    const updatedTasklist = {
      taskListId: editingTasklist.value.taskListId,
      label: editingTasklist.value.label,
      description: editingTasklist.value.description,
      slug: editingTasklist.value.slug
    };
    await authStore.updateTasklist(updatedTasklist);
    isEditDialogOpen.value = false;
  } catch (error) {
    console.log(error);
  }
}
const newTask=ref({
  assignedUserId:0,
  description: '',
  taskListId: 0,
  status: 'TODO',
  points: 0,
  estimation: 0,
  title: ''
})

const isAddtaskdialogOpen = ref(false);
function triggeraddtaskdialog(taskListId){
  isAddtaskdialogOpen.value = true;
  newTask.value={
    assignedUserId:authStore.userId,
    description: '',
    taskListId:taskListId,
    status: 'TODO',
    points: 0,
    estimation: 0,
    title: ''
  }
}

async function saveAddTask(){
  try {
    const task={
      ...newTask.value}
      await authStore.createNewTask(task);
      isAddtaskdialogOpen.value = false;
      console.log(newTask);
    }
     
    catch (error) {
      console.log(error);
    
  } 
  }
  async function viewTasklist(taskListId) {
    router.push({name: 'viewTasks'});
    try{
      await authStore.gettasksfromserver()

    }
    catch{

    }
    
  }

</script>

<style scoped>
.task-card {
  margin-bottom: 20px;
}
</style>
