<!-- PokemonFinder.vue -->
<template>
  <div class="container">
    <input v-model="pokemonId" placeholder="Enter Pokémon ID or Name">
    <button @click="fetchPokemon">Search</button>
    <div>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      
    </div>
    <div   v-if="localPokemon.length > 0">
      <div  class="card" v-for=" poke in localPokemon" :key="localPokemon.id">
      <v-card  >
        <v-card-title>{{ poke.name }}</v-card-title>
        <v-card-text>
          <p>{{ poke.id }}</p>
          <p>Weight: {{ poke.weight }}, Height: {{ poke.height }} </p>
      
          <img :src="poke.image" alt="Pokemon Image">
          <p>{{ poke.abilities }}</p>
          <button @click="fetchAllMoveDetails">Add To Deck</button>
      </v-card-text>
      </v-card>
      
     
    </div>
    </div>
    <div class="card" v-for="localePokemon in allPokemonArray" :key="localePokemon.id">
      <v-card  >
        <v-card-title><h1 style="text-transform: capitalize;">{{ localePokemon.name }}</h1></v-card-title>
        <v-card-text>
          <p>{{ localePokemon.id }}</p>
          <p>Weight: {{ localePokemon.weight }}, Height: {{ localePokemon.height }} </p>
      
          <img :src="localePokemon.sprites.other.dream_world.front_default" alt="Pokemon Image">
          <div v-for="pokeability in localePokemon.abilities" :key="pokeability.name">
            <p>{{pokeability.ability.name }}</p>
          </div>
          
          <button @click="fetchAllMoveDetails">Add To Deck</button>
      </v-card-text>
      </v-card>

    </div>
    </div>
    
 
  
</template>
  
<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const pokemonId = ref('')
const pokemon = ref(null)
const error = ref('')
const allPokemonArray = ref([])
const triggerMoveSet = ref(false)
const localPokemon = ref([])
// const movesDetails = ref({})

function increment() {
  pokemonId.value++
};
function decrement() {
  pokemonId.value--
};
onMounted(() => {
  retieveAllPokemons()})

const fetchPokemon = async (i) => {
  pokemon.value = null
  error.value = ''
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId.value}`)
    // console.log(response.data)
    pokemon.value = {
      name: response.data.name,
      id: response.data.id,
      image: response.data.sprites.other.dream_world.front_default,
      abilities: response.data.abilities.map(a => ({ name: a.ability.name })),
      moves: response.data.moves.map(m => ({ name: m.move.name, url: m.move.url })),
      weight: response.data.weight,
      height: response.data.height,
    }
    localPokemon.value.push(pokemon.value)
    console.log(localPokemon.value)
    // console.log(triggerMoveSet.value)
    // console.log(pokemon.value)
    // console.log(response.data.moves)
  } catch (e) {
    error.value = 'Failed to fetch Pokémon. Please check the ID or name and try again.'
  }
}
// async function fetchAllMoveDetails() {
//   if (pokemon.value && pokemon.value.moves) {
//     const moveFetchPromises = pokemon.value.moves.map(move => 
//       axios.get(move.url).then(response => {
//         movesDetails.value[move.name] = response.data;
//         console.log(movesDetails.value)
//       }).catch(error => {
//         console.error(`Failed to fetch data for move ${move.name}: ${error}`);
//       })
//     );

//     await Promise.all(moveFetchPromises); // Wait for all fetches to complete
//   }
// }
 async function retieveAllPokemons(){
  for (let i = 1; i <= 25; i++) {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
      console.log(response.data);
      allPokemonArray.value.push(response.data)
      console.log(allPokemonArray.value)
   
  }
  catch (error) {
    console.error(`Failed to fetch data for Pokemon ${i}: ${error}`);
  }
}
 }
</script>

<style>
.h1{
  text-transform: capitalize;
}
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
  height: 200px;
}
.card{
  display:inline-block;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  overflow: auto;
  width: 300px;
  height: 450px;
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
  display: inline-block;
  text-align: center;
  background-color: #f5f5f5;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
    cursor: pointer;


  }


}
</style>
