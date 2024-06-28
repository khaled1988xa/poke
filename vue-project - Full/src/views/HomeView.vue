<script setup>

import PersonEntry from "@/components/PersonEntry.vue";
import {computed, ref} from "vue";
import {usePersonStore} from "@/store/person";

const persons = ref([])
const personStore = usePersonStore()
const birthYearOver18 = computed( () => (new Date().getFullYear() - 18))


function removeLast() {
  personStore.persons.pop();
}

function removeAll() {
  personStore.persons = []
}

function removeByIndex(index){
  console.log(index)
  persons.value.splice(index, 1)
}

function updatePerson(p, i) {
  console.log(i)
  console.log(p)
  persons.value[i] = p
}
</script>

<template>
  <div class="col-sm-6 mt-4" v-if="personStore.persons.length > 0">
    <div class="form-group">
      <button class="btn btn-danger mb-4" @click="removeLast()">Letztes Element löschen</button><br>
      <button class="btn btn-danger" @click="removeAll()">Alles löschen</button>
    </div>
    <h2 class="mt-4">Kinder</h2>
    <div class="table mt-4">
      <table class="table">
        <thead>
        <tr>
          <th scope="col">Vorname</th>
          <th scope="col">Nachname</th>
          <th scope="col">Age</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <PersonEntry v-for="(person, index) in personStore.persons.filter(p => p.birthYear > birthYearOver18)" :person="person" :index="index" @delete="removeByIndex"
                     @update="(p) => updatePerson(p, index)">
        </PersonEntry>
        </tbody>
      </table>
    </div>
    <h2>Erwachsene</h2>
    <div class="table mt-4">
      <table class="table">
        <thead>
        <tr>
          <th scope="col">Vorname</th>
          <th scope="col">Nachname</th>
          <th scope="col">Age</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <PersonEntry v-for="(person, index) in personStore.persons.filter(p => p.birthYear <= birthYearOver18)" :person="person" :index="index" @delete="removeByIndex"
                     @update="(p) => updatePerson(p, index)">
        </PersonEntry>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

</style>
