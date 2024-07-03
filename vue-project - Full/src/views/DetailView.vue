<script setup>
import {computed, ref} from 'vue';
import { useRoute, useRouter } from 'vue-router'
import {usePersonStore} from '@/store/person'
import PersonForm from "@/components/PersonForm.vue";

const route = useRoute()
const router = useRouter()
const personStore = usePersonStore()
const showDialog = ref(false)

const index = computed(() => parseInt(route.params.id))

const person = computed(() => {
  return personStore.persons.find(p => p.id === index.value)
})

function addPerson(person) {
  console.log(person)
  let index = personStore.persons.findIndex(p => p.id === person.id)
  console.log(index)
  personStore.persons[index] = person
  showDialog.value = false
}

function deletePerson() {
  let index = personStore.persons.findIndex(p => p.id === person.value.id)
  personStore.persons.splice(index, 1)
  router.push("/")
}


</script>

<template>
  <ul v-if="person !== undefined">
    <li>Vorname: {{ person.firstname }}</li>
    <li>Nachname: {{ person.lastname }}</li>
    <li>Geburtsjahr {{ person.birthYear }}</li>
  </ul>
  <div class="form-group">
    <button class="btn btn-danger mt-4 mx-4" @click="deletePerson">Löschen</button>
    <button class="btn btn-warning mt-4 mx-4" @click="showDialog = true">Bearbeiten</button>
  </div>
  <dialog v-if="showDialog" open>
    <PersonForm :person="person" @add="addPerson">
      <div class="form-group">
        <button class="btn btn-success mt-4 mx-4">Speichern</button>
        <button class="btn btn-danger mt-4 mx-4" @click="showDialog = false">Abbrechen</button>
      </div>
    </PersonForm>
  </dialog>
</template>

<style scoped>

</style>
