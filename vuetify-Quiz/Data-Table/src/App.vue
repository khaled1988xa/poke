<template>
  <v-app>
    <v-main>
      <v-container>
        <v-data-table :items="items" :search="search" class="elevation-1"  @update:options="loadItems"  >
          <template v-slot:top >
            <v-toolbar flat>
              <v-toolbar-title >Table</v-toolbar-title>
              <v-text-field v-model="search"
                            density="compact"
                            placeholder="Enter Name to Search"
                            hide-details></v-text-field>
            </v-toolbar>
          </template>
        </v-data-table>
        
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
const search = ref('');

// Exercise 4: Data Table with Server-side Pagination and Filtering
// Objective: Create a v-data-table that loads data from a mock JSON file (you can create a simple JSON array for this).

// The table should display columns for name, age, and job.
// Implement pagination and allow the user to choose the number of rows shown per page.
// Add a search field to filter the results based on the name.
const items = ref([]); 

axios.get("/data.json").then(response => {
  items.value = response.data; 
  console.log(items.value);
});


</script>
