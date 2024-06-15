<script>
import { ref, computed} from 'vue';

function addPerson() {
    persons.value.push({
      firstname: firstname.value,
      lastname: lastname.value,
      year: year.value
    })

    firstname.value = ''
    lastname.value = ''
    age.value = ''
}
const persons = ref([])
   const firstname = ref('')
   const lastname = ref('')
   const age = ref()

   const year = computed(() => { 
      let currentYear = new Date().getFullYear();
      return currentYear - age.value;
   })

  function addPerson() {
      persons.value.push({
        firstname: firstname.value,
        lastname: lastname.value,
        year: year.value
      })

      firstname.value = ''
      lastname.value = ''
      age.value = ''
  }

  function removeLast() {
    persons.value.pop();
  }

  function removeAll() {
    persons.value = []
  }

</script>
<template>
  <div class="container">
    <h1 class="bg-primary text-white rounded px-4">PersonenArray - mit Roberts BLABLA</h1>
    <div class="row">
      <div class="col-sm-6 bg-light">
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
            <label for="birthYear">Alter:</label>
            <input type="number" v-model="age" class="form-control" id="birthYear">
          </div>
          <div class="form-group">
            <button class="btn btn-success mt-4">Hinzufügen</button>
          </div>
        </form>
      </div>
      <div class="col-sm-6 mt-4">
        <div class="form-group">
          <button class="btn btn-danger mb-4" @click="removeLast()">Letztes Element löschen</button><br>
          <button class="btn btn-danger" @click="removeAll()">Alles löschen</button>
        </div>
        <div class="table mt-4">
          <table class="table">
            <thead>
              <th scope="col">Vorname</th>
              <th scope="col">Nachname</th>
              <th scope="col">Geburtsjahr</th>
            </thead>
            <tbody>
              <tr v-for="person in persons">
                <td scope="row">{{ person.firstname }}</td>
                <td>{{ person.lastname }}</td>
                <td>{{ person.year }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
