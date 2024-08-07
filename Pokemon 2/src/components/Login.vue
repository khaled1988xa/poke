<template>
  <div id="app">
    <v-app id="inspire">
      <v-card class="mx-auto" width="100%" max-width="400">
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>{{ currentTitle }}</span>
          <v-avatar
            color="primary lighten-2"
            class="subheading white--text"
            size="24"
            v-text="step"
          ></v-avatar>
        </v-card-title>

        <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text>
              <v-text-field
                v-model="userName"
                :rules="userNameRules"
                :counter="50"
                label="Username"
                minlength="5"
                maxlength="50"
                required
              ></v-text-field>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text>
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Password"
                type="password"
              ></v-text-field>
              <v-text-field
                v-model="confirmPassword"
                :rules="passwordRules"
                label="Confirm Password"
                type="password"
              ></v-text-field>
              <v-alert v-if="passwordError" type="error" dismissible>
                Passwords do not match!
              </v-alert>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="3">
            <div class="pa-4 text-center">
              <v-img
                class="mb-4"
                contain
                height="128"
                src="https://freesvgplanet.com/wp-content/uploads/2019/10/pokemon-svg-free-30195.jpg"
              ></v-img>
              <h3 class="title font-weight-light mb-2">
                Welcome to PokeDex
              </h3>
              <span class="caption grey--text">Thanks for signing up!</span>
            </div>
          </v-window-item>
        </v-window>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn :disabled="step === 1" text @click="step--">Back</v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="step === 3" v-if="step !== 2"  color="primary" depressed @click="nextStep">Next</v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="step === 2" color="primary" depressed @click="handleRegister">Register</v-btn>
          <!-- <v-btn color="primary" depressed @click="handleLogin">Login</v-btn> -->
          <v-btn color="primary" @click="logIndialog = true">Login</v-btn>
          <v-container>
        
            <v-dialog v-model="logIndialog" persistent max-width="500px">
              <v-card>
                <v-card-title class="headline">Login</v-card-title>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      v-model="logInusername"
                      label="Username"
                      :rules="logInusernameRules"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="logInpassword"
                      label="Password"
                      :type="logInshowPassword ? 'text' : 'password'"
                      :append-icon="logInshowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="logInshowPassword = !logInshowPassword"
                      :rules="logInpasswordRules"
                      required
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" @click="handleLogin">Submit</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn @click="logIndialog = false">Cancel</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-container>
        </v-card-actions>
      </v-card>
      
    </v-app>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { usePiniaAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const authStore = usePiniaAuthStore();
const router = useRouter();

// Define reactive variables
const step = ref(1);
const userName = ref('');
const password = ref('');
const confirmPassword = ref('');
const passwordError = ref(false);
const logInusername = ref('');
const logInusernameRules = ref([v => !!v || 'Username is required']);
const logInpassword = ref('');
const logInshowPassword = ref(false);
const logInpasswordRules = ref([v => !!v || 'Password is required']);
const logIndialog = ref(false);

// Define validation rules
const userNameRules = [
  v => !!v || 'Username is required',
  v => v.length >= 5 || 'The username must contain at least 5 characters',
  v => v.length <= 50 || 'The username cannot be longer than 50 characters',
];
const passwordRules = [
  v => !!v || 'Password is required',
  v => v.length >= 8 || 'Password must contain at least 8 characters',
  v => v.length <= 50 || 'Password cannot be longer than 50 characters',
];

// Define computed property for the current title
const currentTitle = computed(() => {
  switch (step.value) {
    case 1:
      return 'Sign-up';
    case 2:
      return 'Create a password';
    default:
      return 'Account created';
  }
});

// Method to handle next step
const nextStep = () => {
  if (step.value === 2) {
    if (password.value !== confirmPassword.value ) {
      passwordError.value = true;
    } else {
      passwordError.value = false;
      step.value++;
      
    }
  } else {
    step.value++;
  }
};
watch(step, (newStep) => {
  if (newStep === 3) {
    handleRegister();
  }
});

// Method to handle login (just an example placeholder)
const handleLogin = async () => {
  try {
    
    
      await authStore.login({ username: logInusername.value, password: logInpassword.value });
    router.push('/home');
      alert('Login Successful');
    
    
  } catch (error) {
    console.error('Login failed', error);
  }
};
const handleRegister = async () => {
  try {
    await authStore.register({ username: userName.value, password: password.value });
    router.push('/home');
  } catch (error) {
    console.error('Registration failed', error);
  }
};
</script>

<style>
/* Add any relevant styles here */
</style>
