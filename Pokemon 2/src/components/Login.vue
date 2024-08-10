<template>
  <v-app>
    <v-container>
  <v-tabs-items v-model="tab">
    <v-tab-item>
      <v-card flat>
        <v-card-text>
          <v-card-title>please login to continue</v-card-title>
          <v-form ref="loginForm" v-model="validLogin" lazy-validation>
            <v-text-field
              v-model="loginUsername"
              label="Username"
              :rules="[rules.required]"
              required
            ></v-text-field>
            <v-text-field
              v-model="loginPassword"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="togglePassword"
              label="Password"
              :rules="[rules.required, rules.min]"
              required
            ></v-text-field>
            <v-btn :disabled="!validLogin" @click="handleLogin" color="success">Login</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs-items>
</v-container>
</v-app>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { usePiniaAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const authStore = usePiniaAuthStore();
const router = useRouter();
const validLogin = ref(false);
const loginUsername = ref('');
const loginPassword = ref('');
const showPassword = ref(false);


const rules = {
  required: value => !!value || 'Required.',
  min: value => (value && value.length >= 8) || 'Min 8 characters',
  
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
const handleLogin = async () => {
  try {
    await authStore.login({ username: loginUsername.value, password: loginPassword.value });
    router.push('/home');
  } catch (error) {
    console.error('Login failed', error);
  }
};

</script>

<style>
/* Add any relevant styles here */
</style>
