<!-- PokemonFinder.vue -->
<template>
  <div class="container">
    <input v-model="pokemonId" placeholder="Enter Pokémon ID or Name">
    <button @click="fetchPokemon">Search</button>
    <div>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <button @click="fetchAbilityEffect">show ability</button>
    </div>
    <div v-if="pokemon">
      
      <h2>{{ pokemon.name }} (ID: {{ pokemon.id }})</h2>
      <img :src="pokemon.image" :alt="pokemon.name">
      <h3>Abilities</h3>
      <ul>
        <li v-for="ability in pokemon.abilities" :key="ability.name"><h1 style="color: blue;">{{ ability.name }}</h1></li> 
      </ul>
      <ul>
        <li v-for=" ability in pokemon.abilities" :key="ability.effect"> <h1>{{ability.effect}}</h1></li>
      </ul>
    </div>
    <p v-if="error">{{ error }}</p>
  </div>
  
</template>
  
<script setup>
import { ref } from 'vue'
import axios from 'axios'

const pokemonId = ref('')
const pokemon = ref(null)
const error = ref('')
function increment() {
  pokemonId.value++
};
function decrement() {
  pokemonId.value--
};
const fetchPokemon = async () => {
  pokemon.value = null
  error.value = ''
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId.value}`)
    pokemon.value = {
      name: response.data.name,
      id: response.data.id,
      image: response.data.sprites.other.dream_world.front_default,
      abilities: response.data.abilities.map(a => ({ name: a.ability.name })),
      //abilities: response.data.abilities.map(b => ({effect: b.ability.effect })),

    }
  } catch (e) {
    error.value = 'Failed to fetch Pokémon. Please check the ID or name and try again.'
  }
}
async function fetchAbilityEffect(pokemonId) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/ability/${pokemonId}`);
    const effectEntries = response.data.effect_entries.effect;
    
    
  } catch (error) {
    console.error('Failed to fetch ability details:', error);
  }
}
</script>

<style>
.container {
  text-align: center;
  padding: 20px;
}
input, button {
  margin: 10px;
  padding: 8px;
  font-size: 16px;
}
img{
  width: 200px;
  height: auto;
}
</style>
