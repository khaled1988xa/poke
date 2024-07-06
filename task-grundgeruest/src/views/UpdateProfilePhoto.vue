
<template>
    <v-container>
      <v-card>
        <v-card-title>Update Profile Photo</v-card-title>
        <v-card-text>
          <v-form>
            <v-file-input
              v-model="selectedFile"
              label="Choose a Profile Photo"
              prepend-icon="mdi-camera"
              accept="image/*"
              @change="onFileChange"
            ></v-file-input>
  
            <v-btn @click="uploadPhoto">Upload Photo</v-btn>
            <v-btn @click="deletephotofromserver">Delete Photo</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/store/authStore';
  
  const router = useRouter();
  const authStore = useAuthStore();
  const selectedFile = ref(null);
  
  const onFileChange = (event) => {
  if (event && event.target && event.target.files) {
    selectedFile.value = event.target.files[0];
    console.log('Selected file:', selectedFile.value);
  } else {
    console.error('No file selected or invalid event');
    selectedFile.value = null;
  }
};
  
const uploadPhoto = async () => {
  try {
    if (selectedFile.value) {
      console.log('Uploading file:', selectedFile.value);
      await authStore.uploadProfileImage(selectedFile.value);
      router.push('/'); // Navigate to home after uploading
    } else {
      console.error('No file selected');
    }
  } catch (error) {
    console.error('Error uploading photo:', error);
  }
};
const deletephotofromserver = async () => {
        try {
            await authStore.deleteProfileImage();
            router.push('/'); // Navigate to home after deleting
        } 
        catch (error) {
            console.error('Error deleting photo:', error);
        }
    };




  </script>
  