<script setup>

</script>

<template>
  <template>
  <div class="container mt-5">
    <h1>Übung: Personen Array</h1>
    <div class="row">
      <div class="col-md-4">
        <h2>Person anlegen</h2>
        <form @submit.prevent="hinzufuegen">
          <div class="form-group">
            <label for="vorname">Vorname</label>
            <input v-model="vorname" type="text" id="vorname" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="nachname">Nachname</label>
            <input v-model="nachname" type="text" id="nachname" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="geburtsjahr">Geburtsjahr</label>
            <input v-model.number="geburtsjahr" type="number" id="geburtsjahr" class="form-control" required>
          </div>
          <button type="submit" class="btn btn-success">Hinzufügen</button>
        </form>
        <h3>Aktionen</h3>
        <button @click="letztesElementLoeschen" class="btn btn-warning">Letztes Element löschen</button>
        <button @click="allesLoeschen" class="btn btn-danger">Alles löschen</button>
      </div>
      <div class="col-md-8">
        <h2>Personen</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Vorname</th>
              <th>Nachname</th>
              <th>Geburtsjahr</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(person, index) in personen" :key="index">
              <td>{{ person.vorname }}</td>
              <td>{{ person.nachname }}</td>
              <td>{{ person.geburtsjahr }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      personen: [],
      vorname: '',
      nachname: '',
      geburtsjahr: null
    };
  },
  methods: {
    hinzufuegen() {
      if (this.vorname && this.nachname && this.geburtsjahr) {
        this.personen.push({
          vorname: this.vorname,
          nachname: this.nachname,
          geburtsjahr: this.geburtsjahr
        });
        this.vorname = '';
        this.nachname = '';
        this.geburtsjahr = null;
      }
    },
    allesLoeschen() {
      this.personen = [];
    },
    letztesElementLoeschen() {
      this.personen.pop();
    }
  }
};
</script>

<style>
/* Optional: Eigene Styles hier hinzufügen */
</style>

</template>

<style scoped>

</style>
