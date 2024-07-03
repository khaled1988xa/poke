<script setup>

import PersonForm from "@/components/PersonForm.vue";
import {usePersonStore} from "@/store/person";
import {useRouter} from 'vue-router'

const personStore = usePersonStore()
const router = useRouter()

function addPerson(newPerson) {
  console.log(newPerson)
  personStore.persons.push(newPerson)
  router.push("/")

}

</script>

<template>
  <PersonForm @add="addPerson"></PersonForm>
</template>

<style scoped>

</style>
