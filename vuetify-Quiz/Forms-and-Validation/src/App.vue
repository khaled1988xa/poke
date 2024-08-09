<template>
<v-app>
  <main>
     <v-container>
      <v-row>
          <v-col>
              <h1>Forms and Validation</h1>
              <p>Formular mit Validierung</p>
              <v-form ref="form" v-model="valid">
                <v-text-field v-model="name" placeholder="Name" :rules="namerules" label="Name" ></v-text-field>
                <v-text-field v-model="email" placeholder="Email" :rules="emailRules" label="Email"></v-text-field> 
                <v-text-field v-model="password" placeholder="Password" :rules="passwordRules" label="Password" type="password"></v-text-field>
                <v-btn @click="submit" :disabled="!valid "> Submit</v-btn>
              </v-form>

          </v-col>
      </v-row>
     </v-container>
 </main>
</v-app>
</template>

<script setup>
 
import { ref,computed } from 'vue'
const form = ref(null)
const name = ref('')
const email = ref('')
const password = ref('')
const  valid = ref(false)
const submit = () => {
    if(form.value &&form.value.validate()){
      console.log("supmited",{name:name.value,email:email.value,password:password.value});
      form.value.reset();
      
    }
}
const namerules = [
    v => !!v || 'Name is required',
]
const emailRules = [
    v => !!v || 'E-mail is required',
    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
]
const passwordRules = [
    v => !!v || 'Password is required',
    v => v.length >= 6 || 'Password must be at least 6 characters',
]
</script>
