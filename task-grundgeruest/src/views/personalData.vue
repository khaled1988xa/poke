
<template>
  <v-container>
    <v-card>
      <v-card-title>Edit Personal Data</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="user.firstName" label="First Name"></v-text-field>
          <v-text-field v-model="user.lastName" label="Last Name"></v-text-field>
          <v-text-field v-model="user.email" label="Email"></v-text-field>
          <v-text-field v-model="user.username" label="Username"></v-text-field>
       
          <v-btn @click="save">Save</v-btn>
          <v-btn @click="confirmDelete" color="error">Delete Account</v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    
    <v-dialog v-model="deleteDialog" max-width="300">
      <v-card>
        <v-card-title>Confirm Account Deletion</v-card-title>
        <v-card-text>Are you sure you want to delete your account? This action cannot be undone.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="deleteAccount">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const user = ref({
  firstName: '',
  lastName: '',
  email: '',
  username: '',
});

const deleteDialog = ref(false);

const confirmDelete = () => {
  deleteDialog.value = true;
};

const deleteAccount = async () => {
  try {
    await authStore.deleteAccountonserver();
    deleteDialog.value = false;
    router.push('/');
  } catch (error) {
    // Handle the error
    console.error('Error deleting account:', error);
  }
};

const save = async () => {
  try {
    await authStore.updateUserOnServer(user.value);
    router.push('/personal-data')
    user.value={
      firstName: '',
      lastName: '',
      email: '',
      username: '',
    }
  } catch (error) {
    // Handle the error
    console.error('Error updating user:', error);
  }
};
</script>