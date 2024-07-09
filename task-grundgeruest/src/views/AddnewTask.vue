<template>
  <v-container>
    <v-row justify="center">
      
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark @click="dialog = true">Add New Tasklist</v-btn>
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
        <v-col>
          <v-row v-if="btnstatue" rows="12" sm="4" md="3" 
                 v-for="localtasklist  of localtasklists" :key="localtasklist.taskListId">
            <v-list color="primary">
             <h3>TasklistID:{{ localtasklist.taskListId }}
               UserId:{{localtasklist.userId }}
               Slug:{{localtasklist.slug}}
               Label:{{localtasklist.label}}
               Description:{{localtasklist.description}}</h3>
            </v-list>
          </v-row>
        </v-col>
      </v-container>
  
  
  </v-container>
</template>

<script setup>
import { ref,computed } from 'vue';
import { VDatePicker,VTextField,VDialog } from 'vuetify/components';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'vue-router';
const router = useRouter();
const authStore = useAuthStore();
const label = ref(' ');
const description = ref('');

const localtasklists=authStore.localtasklists

console.log(localtasklists)
const dialog = ref(false);

function closeDialog() {
  dialog.value = false;
  
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
// console.log(authStore.localtasklists)
// for (const localtasklist of authStore.localtasklists){
        // localtasklists.taskListId=localtasklist.taskListId
  // console.log(localtasklist.taskListId)}
</script>

 
