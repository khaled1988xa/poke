<template>
  <h1>Update User Password</h1>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
         <!-- <v-text-field
            v-model="currentPassword"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            :rules="[rules.required, rules.min]"
            hint="At least 8 characters"
            label="Current Password"
            name="input-10-1"
            
            @click:append="show1 = !show1"
          ></v-text-field> -->
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="newPassword"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            :rules="[rules.required, rules.min]"
            hint="At least 8 characters"
            label="New Password"
            name="input-10-2"
            counter
            @click:append="show2 = !show2"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="confermpassword"
            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show3 ? 'text' : 'password'"
            :rules="[rules.required, rules.min,rules.nomatch]"
            
            hint="At least 8 characters"
            label="Confirm Password"
            name="input-10-3"
            counter
            @click:append="show3 = !show3"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-btn @click="updatePassword1">Update Password</v-btn>
  </v-form>
</template>
<script setup>
import { useAuthStore } from '@/store/authStore';
import { computed, ref } from 'vue';
const authStore = useAuthStore();

//const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);
//const currentPassword = ref('');
const newPassword = ref('');
const confermpassword =ref('');
console.log(newPassword,confermpassword);

const passwordobj =ref({
  password:''
});
const updatePassword1 = async() =>{
  try {
    
    if (newPassword.value=== confermpassword.value) {
      console.log(newPassword.value,confermpassword.value);
      passwordobj.value.password=newPassword.value
      console.log(passwordobj.value);
      await authStore.updatePassword(passwordobj.value);
    router.push('/');
    }
    
  } catch (error) {
    if ((error)) {
      // Handle the error

    } else {
      // Handle other errors
      console.log(error);
    }
  }

}

const rules = {
  required: value => !!value || 'Required.',
  min: v => v.length >= 8 || 'Min 8 characters',
  nomatch: (v) => {
    if (newPassword.value== confermpassword.value) {
      return true
    }

    return 'passwords not match'
  }
};
</script>