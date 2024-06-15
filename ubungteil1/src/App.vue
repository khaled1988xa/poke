<template>
   <div class="container mt-5">
    <h1>Personen array</h1>
    <form @submit.prevent="submit">
      <div class="form-group">
        <lable  for="vorname">Vorname</lable>
        <input type="text" id="vorname" v-model="vorname" class="form-control" required>
      </div>
      <div class="form-group">
        <lable  for="nachname">Nachname</lable>
        <input type="text" id="nachname" v-model="nachname" class="form-control" required>
      </div>
      <div class="form-group">
        <lable  for="geburtsjahr">geburtsjahr</lable>
        <input type="number" id="geburtsjahr" v-model="geburtsjahr" class="form-control" required>
      </div>
      <button type="submit" @click="addperson()" class="btn btn-success">add</button>
      <button type="submit" @click="deleteall()" class="btn btn-danger" >delet all </button>
      <button type="submit" @click="deletelast()"  class="btn btn-warning">delete last</button>
    </form>
    <table class="table">
      <thead>
        <tr>
          <th >Vorname</th>
          <th >Nachname</th>
          <th >Geburtsjahr</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(person,index) in Personen" :key="index">
        <td>{{person.vorname}}</td>
        <td>{{person.nachname}}</td>
        <td>{{person.geburtsjahr}}</td>
        </tr>
        </tbody>
        </table>
   </div>

</template>

<script>
export default{
  data(){
    return{
      vorname: "",
      nachname: "",
      geburtsjahr: "",
      Personen: []
    }
  },
  methods:{
    addperson(){
      if(this.vorname &&this.nachname&& this.geburtsjahr !==null){
        this.Personen.push({vorname: this.vorname, nachname: this.nachname, geburtsjahr: this.geburtsjahr})
        this.vorname = ""
        this.nachname = ""
        this.geburtsjahr = ""
      }

    },
    deleteall(){
      this.Personen = []
    },
    deletelast(){
      this.Personen.pop()
    }
  }
}
</script>

<style>
/* Optional: Eigene Styles hier hinzufügen */
</style>
