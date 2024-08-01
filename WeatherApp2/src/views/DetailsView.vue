
<template>  
<v-container class="container">
    <v-row>
        <v-col>
            <h1>Details</h1>
            <p>City: <span class="info">{{ appStore.cityobject.cityname }}</span></p>
            <p>Country: <span class="info">{{ appStore.cityobject.country }}</span></p>
            <p>Temperature:<span class="info"> {{ appStore.temperature }}C</span> </p>
            <p>Feels Like: <span class="info">{{Math.ceil((appStore.weatherdata.value.main.feels_like -273)*10)/10}} C</span></p>
            <p>Max Temperature: <span class="info">{{Math.ceil((appStore.weatherdata.value.main.temp_max -273)*10)/10}} C</span></p>
            <p>Min Temperature: <span class="info">{{Math.ceil((appStore.weatherdata.value.main.temp_min -273)*10)/10}} C</span></p>
            <p>Humidity: <span class="info">{{appStore.weatherdata.value.main.humidity}} %</span></p>
            <p>Pressure: <span class="info">{{appStore.weatherdata.value.main.pressure}} hPa</span></p>
            <p>SeeLevel: <span class="info">{{appStore.weatherdata.value.main.sea_level}} hPa</span></p>	
            <p>Weather: <span class="info">{{appStore.weatherDescription }}</span></p>
            <p>visibility: <span class="info">{{appStore.weatherdata.value.visibility}} Meter</span></p>
            <p>Wind: <span class="info">{{appStore.weatherdata.value.wind.speed}} Meter/sec</span></p>
            <p>Wind Dirction: <span class="info">{{appStore.weatherdata.value.wind.deg}} Degree</span></p>
            <p>TimeZone: <span class="info">+{{appStore.weatherdata.value.timezone /3600}} Hours </span></p>
            <p>Time: <span class="info">{{appStore.time}} Seconds</span></p>
            <p>Sunrise: <span class="info">{{sunrise}}</span></p>
            <p>Sunset: <span class="info">{{sunset}}</span></p>
            <v-btn  class="button" @click="router.push({ name: 'Home' })">Back</v-btn>

        </v-col>
        <v-col>
            <img :src="appStore.weatherIcon" class="img">
        </v-col>
    </v-row>
</v-container>
</template>

<script setup>

import { useAppStore } from '../stores/appStore';
import { useRouter } from 'vue-router'
    
const sunrise = computed(() => new Date(appStore.weatherdata.value.sys.sunrise * 1000).toLocaleTimeString());
const sunset = computed(() => new Date(appStore.weatherdata.value.sys.sunset * 1000).toLocaleTimeString());



const appStore = useAppStore();
const router = useRouter()
</script>


<style scoped>
p{
    color: #01c918;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
    text-transform: capitalize;
    
}

.info{
    color: #8e6cf5;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
    padding: 10px;
    text-transform: capitalize;


    
}
.container{
    padding: 20px;
    text-align: center;
    background-color: beige;
    

}
.img {
    width: 400px;
    height: 400px;
    margin: 10px; 
  }
  .button{
    margin-top: 20px;
    background-color: #8e6cf5;
  }
</style>