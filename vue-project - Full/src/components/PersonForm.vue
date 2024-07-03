<script setup>
import {ref, watch} from "vue";

const emits = defineEmits(['add'])
const props = defineProps(['person'])

const firstname = ref('')
const lastname = ref('')
const birthYear = ref()

watch( () => props.person, () => {
  if (props.person !== undefined) {
    firstname.value = props.person.firstname
    lastname.value = props.person.lastname
    birthYear.value = props.person.birthYear
  }
}, {immediate: true})

function addPerson() {
  const person = {
    firstname: firstname.value,
    lastname:  lastname.value,
    birthYear: birthYear.value,
    id: props.person === undefined ? Math.round(Math.random() * 100000) : props.person.id
  }

  emits('add', person)

  firstname.value = ''
  lastname.value  = ''
  birthYear.value = ''
}

</script>

<template>
  <h2 v-if="person !== undefined">{{person.firstname}} Bearbeiten</h2>
  <form class="form" @submit.prevent="addPerson">
    <div class="form-group">
      <label for="firstName">Vorname:</label>
      <input type="text" v-model="firstname" class="form-control" id="firstName">
    </div>
    <div class="form-group">
      <label for="lastName">Nachname:</label>
      <input type="text" v-model="lastname" class="form-control" id="lastName">
    </div>
    <div class="form-group">
      <label for="birthYear">Geburtsjahr:</label>
      <input type="number" v-model="birthYear" class="form-control" id="birthYear">
    </div>
    <slot>
      <div class="form-group">
        <button class="btn btn-success mt-4">Hinzufügen</button>
      </div>
    </slot>
  </form>

</template>

<style scoped>

</style>
