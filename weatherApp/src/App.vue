<script setup>
import { ref, computed } from 'vue';
import 'vuetify/dist/vuetify.min.css'
const citydata =ref('');
const cityobject=ref({});
const weatherdata=ref({});
const temperature= computed (()=>{
  if(weatherdata.value.main){
    return Math.ceil((weatherdata.value.main.temp - 273.15) * 10) / 10;
  }
  else{
    return 'N/A';
  }
})
const weather =computed(()=>{
  if (weatherdata.value.weather){
    return weatherdata.value.weather[0].main;
  }
  else{
    return 'N/A';
  }

})

async function getcitycoordinates(){
  try{
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${citydata.value}&limit=5&appid=01c3c2368afd7192bc522d6b354bc61d`);
  const data = await response.json();
  if (data&&data.length >0){
    cityobject.value ={
    lat:data[0].lat,
    lon:data[0].lon,
    country:data[0].country,
    cityname:data[0].name
  }
  citydata.value=("");
}
  }
  catch{
    alert('Please enter a valid city name');
  }
}


async function fetchweatherdata(){
  try{
    const lat =cityobject.value.lat;
  const lon=cityobject.value.lon;
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=01c3c2368afd7192bc522d6b354bc61d`);
  const data = await response.json();
  console.log(data);
  if (data){
    weatherdata.value=data;
  }
  console.log(weatherdata.value)
  }
  catch {
    alert('Please enter a valid city name');
  }
  
}
  
  
</script>

<template>
  <!-- <main>
    <div class="container">
      <nav>
    <input type="text" placeholder="Please input the City name" v-model="citydata" />
    <button @click="getcitycoordinates">Submit</button>
    <button @click="fetchweatherdata">weather</button>
    </nav>
    <br>
  
  <v-card
      class="card"
      max-width="400"
    >
    <v-card-title>Weather</v-card-title>
    <v-card-text>
      sjöslkadfjaölkjfd  <h1>CityName  {{cityobject.cityname}}</h1>
    <p>Temp: {{ temperature }}</p>
    <p>Weather  {{ weather }} </p> -->
    <!-- </v-card-text>
  </v-card>
</div>
</main> -->


<v-container>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="mx-auto" max-width="400">
        <v-card-title>Weather</v-card-title>
        <v-card-text>
          <p>City: {{ cityobject.cityname }}</p>
          <p>Temperature: {{ temperature }}</p>
          <p>Weather: {{ weather }}</p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<style scoped>
.card {
  margin-bottom: 20px;
  background-color: aqua;
  width: fit-content;
  height: fit-content;
  text-align: center;
  
  border: 2px;
  border-radius: 10px;
  border-color: black;
  border-style: solid;
  

}
</style>
