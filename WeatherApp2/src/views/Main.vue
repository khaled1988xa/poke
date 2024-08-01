<script setup>

import {useAppStore} from '@/stores/appStore'
import { computed } from 'vue';
import 'vuetify/dist/vuetify.min.css'
import { useRouter } from "vue-router";

const router = useRouter()
 const appStore = useAppStore();
function openDetail(){
  router.push({ name: 'DetailsView' })
}
</script>

<template>
  <v-container class="container">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-text-field
          v-model="appStore.citynameInput"
          label="Please input the City name"
          class="cityInput"
          @keyup.enter="appStore.getcitycoordinates"
          outlined
          dense

        ></v-text-field>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-4">
      <v-col cols="12" sm="8" md="6">
        <v-card class="card" max-width="400">
          <v-card-title class="headline">Weather</v-card-title>
          <v-card-text class="text">
            <p>City: <span class="info">{{ appStore.cityobject.cityname }}</span></p>
            <p>Country: <span class="info">{{ appStore.cityobject.country }}</span></p>
            <p>Temperature: <span class="info">{{ appStore.temperature }}°C</span></p>
            <p>Weather: <span class="info">{{ appStore.weatherDescription }}</span></p>
            <v-img :src="appStore.weatherIcon" class="img"></v-img>
            <v-btn class="button mt-4" @click="openDetail">More Details</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
     
}
.cityInput {
  
  font-size: 2rem;
  font-weight: bold;
  border-radius: 25px;
  width: 250px;

}
.img {
  width: 200px;
  height: 130px;
  margin: 10px auto;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.info {
  color: #111210;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  padding: 10px;
  text-transform: capitalize;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.card {
  padding: 10px;
  text-align: center;
  border: 3px solid #131111;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: linear-gradient(to right, #d25169, #6ebeff);
  color: white;
}

.text {
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  text-transform: capitalize;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-top: 20px;
}

.headline {
  color: #8aba06;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  text-transform: capitalize;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.button {
  background-color: #0e1165;
  color: white;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  padding: 10px;
  text-transform: capitalize;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-top: 20px;
}
</style>

