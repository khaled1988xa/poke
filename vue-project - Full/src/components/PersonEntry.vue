<script setup>

import {computed, ref} from "vue";
import PersonForm from "@/components/PersonForm.vue";

const props = defineProps(['person', 'index']);
const emits = defineEmits(['delete','update'])



const age = computed(() =>{
  return new Date().getFullYear() - props.person.birthYear;
})

function deletePerson() {
  emits('delete', props.index)
}

function editPerson() {
  showDialog.value = true
  console.log('Hier kommt EDIT')
}

</script>

<template>
  <tr>
    <td scope="row">{{ person.firstname }}</td>
    <td>{{ person.lastname }}</td>
    <td>{{ age }}</td>
    <td>
      <RouterLink :to="'/details/'+person.id"><button class="btn btn-outline-primary">Details</button></RouterLink>
    </td>
  </tr>
</template>

<style scoped>

</style>
