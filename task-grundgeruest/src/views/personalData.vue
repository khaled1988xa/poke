<!-- src/views/PersonalData.vue -->
<template>
    <v-container>
      <v-card>
        <v-card-title>Edit Personal Data</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field v-model="user.firstName" label="First Name"></v-text-field>
            <v-text-field v-model="user.lastName" label="Last Name"></v-text-field>
            <v-text-field v-model="user.email" label="Email"></v-text-field>
            <!-- Add other fields as needed -->
            <v-btn @click="save">Save</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAuthStore } from '@/store/authStore';
  
  const authStore = useAuthStore();
  const user =ref({
    firstName: '',
    lastName: '',
    email: ''
  })
  
  
  const save = async() => {
   try {
    await authStore.updateuseronserver(user.value);
    router.push('/');      
            } catch (error) {
                if (error.isAxiosError(error)) {
                    // Handle the error
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else {
                    // Handle other errors
                    console.log(error);
                }
            }

    // You may need to implement the `updateUser` method in your auth store
  };
  </script>
  