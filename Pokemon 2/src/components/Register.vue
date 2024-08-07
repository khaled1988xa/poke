<template>
  <v-app>
    <v-container>
      <v-btn @click="dialog = true" color="primary">Open Dialog</v-btn>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-tabs v-model="tab" background-color="deep-purple accent-4" dark>
            <v-tab>Login</v-tab>
            <v-tab>Register</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card flat>
                <v-card-text>
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
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-form ref="registerForm" v-model="validRegister" lazy-validation>
                    <v-text-field
                      v-model="registerUsername"
                      label="Username"
                      :rules="[rules.required]"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="registerPassword"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      @click:append="togglePassword"
                      label="Password"
                      :rules="[rules.required, rules.min]"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="verifyPassword"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      @click:append="togglePassword"
                      label="Confirm Password"
                      :rules="[rules.required, rules.passwordMatch]"
                      required
                    ></v-text-field>
                    <v-btn :disabled="!validRegister" @click="handleRegister" color="success">Register</v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePiniaAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = usePiniaAuthStore();

const dialog = ref(false);
const tab = ref(0);
const validLogin = ref(false);
const validRegister = ref(false);
const showPassword = ref(false);

const loginUsername = ref('');
const loginPassword = ref('');
const registerUsername = ref('');
const registerPassword = ref('');
const verifyPassword = ref('');

const rules = {
  required: value => !!value || 'Required.',
  min: value => (value && value.length >= 8) || 'Min 8 characters',
  passwordMatch: () => registerPassword.value === verifyPassword.value || 'Passwords must match'
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

const handleRegister = async () => {
  try {
    await authStore.register({ username: registerUsername.value, password: registerPassword.value });
    router.push('/login');
  } catch (error) {
    console.error('Registration failed', error);
  }
};
</script>
