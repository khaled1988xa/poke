<template>
  <v-container>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark @click="dialog= true">Add New Tasklist</v-btn>
          <v-btn color="primary" dark @click="btnstatuechange">Laod avalible Tasklist in server</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Tasklist Details </span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Title " required
                v-model="label"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Description "
                  v-model="description"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeDialog">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="creattasklist">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
      <v-container>

        <v-col v-if="localtasklists">
          <v-row v-if="btnstatue"
                 sm="4"
                 md="3"
                 v-for="task of localtasklists"
                 :key="task.taskListId"
                 class="task-card">
            <v-card color="primary" class="pa-3" outlined>
              <v-card-title class="headline mb-1">{{ task.slug }}</v-card-title>
              <v-card-subtitle>User ID: {{ task.userId }}</v-card-subtitle>
              <v-card-text>
                <div>Tasklist ID: {{ task.taskListId }}</div>
                <div>Label: {{ task.label }}</div>
                <div>Description: {{ task.description }}</div>
              </v-card-text>
              <!-- Button section with more visibility -->
              <v-card-actions class="d-flex flex-column align-start">
                <v-btn  @click="viewtasklist1(task.taskListId)" class="mb-2">View</v-btn>
                <v-btn  @click="addtask1(task.taskListId)" class="mb-2">Add Task</v-btn>
                <v-btn  @click="edittasklist1(task)" class="mb-2">Edit</v-btn>
                <v-btn  @click="deletetasklist1(task.taskListId)">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-row>
        </v-col>
        <v-dialog v-model="editdialog" persistent max-width="600px">
          <template v-slot:activator="{ on }"> 
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Edit Tasklist  </span>
            </v-card-title>
            <v-card-text>
              <v-row class="task-card">
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Title " v-model="currentTask.label" required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Description "
                    v-model="currentTask.description"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="closeDialog2">Close</v-btn>
              <v-btn color="blue darken-1"  @click="savetheedit">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
      
  </v-container>
</template>
<style scoped>
.task-card {
  margin-bottom: 20px;
}
</style>
<script setup>
import { ref,computed } from 'vue';
import { VDatePicker,VTextField,VDialog } from 'vuetify/components';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'vue-router';
const router = useRouter();
const authStore = useAuthStore();
const label = ref(' ');
const description = ref('');
const currenttaskedit=({})
const currentTask = ref()

const localtasklists=authStore.localtasklists

console.log(localtasklists)
const dialog = ref(false);
const editdialog = ref(false);

function closeDialog() {
  dialog.value = false;
  
}
function closeDialog2() {
  editdialog.value = false;
}
const btnstatue= ref(false);
function btnstatuechange(){
  btnstatue.value=!btnstatue.value}

const creattasklist = async () =>{
  // Implement save logic here
  
  console.log("Profile saved"); // Placeholder for actual save logic
  
  const tasklist ={
  label:label.value,
  description:description.value
};
              await authStore.createnewtasklist(tasklist);
                console.log(tasklist)
                dialog.value = false;
}


  async function deletetasklist1(taskListId) {
    await authStore.deletetasklist(taskListId);
    console.log(taskListId);
    btnstatue.value=!btnstatue.value;
  }

  async function edittasklist1(task) {
    editdialog.value= ref(true);
    currentTask.value = task
console.log(currentTask.value)


    //await authStore.edittasklist(taskListId);
   // console.log(taskListId);
    //btnstatue.value=!btnstatue.value;
  }
  function savetheedit(){
 const currenttaskedit={
  label:currentTask.label,
 description:currentTask.description
 }
  console.log(currenttaskedit.value)
  
}
</script>

 
