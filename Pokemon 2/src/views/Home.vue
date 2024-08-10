<template>
  <v-main class="beige-bg">
    <div v-if="auth.user"> Logged in as: {{ auth.user.name }}</div>
    <v-btn v-if="auth.user" @click="auth.logout">Logout</v-btn>
    <v-container class="text-center">
      <h1>Welcome to PokeDex</h1>
      <h3>Search for your favorite Pokemon</h3>
      <v-img :src="pokemonImage" height="200" width="1200" alt="pokemon Image"></v-img>

      
      <v-row align="center" justify="center" >
        <v-col cols="10" sm="8" class="pokemon-search">
        <v-text-field v-model="pokemonId" label="Enter Pokémon ID or Name" solo></v-text-field>
      </v-col>
      <v-row align="center" justify="center">
        <v-btn @click="fetchPokemon(pokemonId)" color="primary">Get Data Online</v-btn>
        <v-btn @click="fetchPokemon1(pokemonId)" color="info">Get Data From Local DB</v-btn>
        <v-btn @click="feelsLucky" color="success">Feels Lucky</v-btn>
        <v-btn @click="increment">+</v-btn>
        <v-btn @click="decrement">-</v-btn>
      </v-row>
      </v-row>
      <v-container class="card-container">
        <v-row>
          <v-col v-for="poke in authStore.LocalPokemonArray" :key="poke.id" cols="12" sm="4" md="3">
            <v-card :color="authStore.typeColor[poke.id]" class="ma-2">
              <v-card-title class="justify-center text-capitalize">{{ poke.name }}</v-card-title>
              <v-card-text>
                <p>{{ poke.id }}</p>
                <v-img :src="poke.image" alt="Pokemon Image" height="150" contain></v-img>
                <v-btn @click="openDetail(index, poke.id)" class="Details-button">Details</v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- <v-container>
        <v-row>
          <v-col v-for="localePokemon in allPokemonArray" :key="localePokemon.id" cols="12" sm="4" md="3">
            <v-card :color="authStore.typeColor[localePokemon.id]" class="ma-2">
              <v-card-title class="justify-center text-capitalize">{{ localePokemon.name }}</v-card-title>
              <v-card-text>
                <p>{{ localePokemon.id }}</p>
                <p>Weight: {{ localePokemon.weight }}, Height: {{ localePokemon.height }}</p>
                <v-img :src="localePokemon.image" alt="Pokemon Image" height="150" contain></v-img>
                <div v-for="pokeability in localePokemon.abilities" :key="pokeability.name">
                  
                </div>
                <v-btn @click="fetchAllMoveDetails" small>Add To Deck</v-btn>
                
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container> -->
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import {usePiniaAuthStore} from '../stores/auth';
import { VMain, VContainer, VRow, VCol, VCard, VCardTitle, VCardText, VTextField, VBtn, VImg } from 'vuetify/components';
import pokemonImage from '@/assets/images.png';  // Adjust the path based on your project structure

const authStore = useAuthStore();
const auth = usePiniaAuthStore();
const router = useRouter();
const route = useRoute();

const pokemonId = ref('');



function increment() {
  pokemonId.value++;
}

function decrement() {
  pokemonId.value--;
}

function feelsLucky() {
  const randomPokemonId = Math.floor(Math.random() * 1000) + 1;
  fetchPokemon(randomPokemonId);
}

function fetchPokemon(id) {
  authStore.fetchPokemon(id);
}

function fetchPokemon1(id) {
  authStore.fetchPokemon1(id);
}

function openDetail(index, id) {
  authStore.openDetailsView(index, id);
}

function fetchAllMoveDetails() {
  // Example function: this needs to be defined based on what it is supposed to do
}

function cardcolor(types, id) {
  // Define what this function is supposed to do or ensure it's implemented in the authStore
}

onMounted(() => {
  // You can fetch all pokemons here if needed.
});
</script>


<style scoped>
.beige-bg {
  background-color: hsla(169, 85%, 3%, 0.224);
}

.pokemon-search {
  
  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

}
.card-container {
  margin-top: 20px;
  
  
  }
  .Details-button {
    font-style: italic;
    font-weight: bold;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
  }

</style>
