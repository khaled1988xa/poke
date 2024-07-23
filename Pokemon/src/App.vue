<!-- PokemonFinder.vue -->
<template>
  <div>
    <input v-model="pokemonId" placeholder="Enter Pokémon ID or Name">
    <button @click="fetchPokemon">Search</button>
    <div>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </div>
  </div>
  <div class="container">
   
    <div   v-if="localPokemon.length > 0">
      <div  v-for=" poke in localPokemon" :key="poke.id">
      <v-card  class="card" :style="{ backgroundColor: typeColor[poke.id] }"  >
        <v-card-title>{{ poke.name }}</v-card-title>
        <v-card-text>
          <p>{{ poke.id }}</p>
          <p>Weight: {{ poke.weight }}, Height: {{ poke.height }} </p>
      
          <img :src="poke.image" alt="Pokemon Image">
          <p>{{ poke.abilities }}</p>
          <button @click="fetchAllMoveDetails">Add To Deck</button>
          <button @click="cardcolor(poke.types,poke.id)">check</button>
      </v-card-text>
      </v-card>
      
     
    </div>
    </div>
    <div  v-for="localePokemon in allPokemonArray" :key="localePokemon.id">
      <v-card class="card" :style="{ backgroundColor: typeColor[localePokemon.id] }">
        <v-card-title><h1 style="text-transform: capitalize;">{{ localePokemon.name }}</h1></v-card-title>
        <v-card-text>
          <p>{{ localePokemon.id }}</p>
          <p>Weight: {{ localePokemon.weight }}, Height: {{ localePokemon.height }} </p>
      
          <!-- <img :src="localePokemon.sprites.other.dream_world.front_default" alt="Pokemon Image"> -->
          <img :src="localePokemon.image" alt="Pokemon Image">
          <div v-for="pokeability in localePokemon.abilities" :key="pokeability.name">
            <!-- <p>{{pokeability.ability.name }}</p> -->
          </div>
          
          <button @click="fetchAllMoveDetails">Add To Deck</button>
          <button @click="cardcolor(localePokemon.types,localePokemon.id)">check</button>
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
const allpokemon = ref({})
const allPokemonArray = ref([])
const triggerMoveSet = ref(false)
const localPokemon = ref([])
// const movesDetails = ref({})
const typeColor = ref({})

  

function increment() {
  pokemonId.value++
};
function decrement() {
  pokemonId.value--
};
onMounted(() => {
  retieveAllPokemons()
})

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
      types: response.data.types
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
  for (let i = 1; i <= 300; i++) {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
      console.log(response.data);
       allpokemon.value = {
      name: response.data.name,
      id: response.data.id,
      image: response.data.sprites.other.dream_world.front_default,
      abilities: response.data.abilities.map(a => ({ name: a.ability.name })),
      moves: response.data.moves.map(m => ({ name: m.move.name, url: m.move.url })),
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types
    }
      allPokemonArray.value.push(allpokemon.value)
      console.log(allPokemonArray.value)
   
  }
  catch (error) {
    console.error(`Failed to fetch data for Pokemon ${i}: ${error}`);
  }
}


    

}
function cardcolor(types,id){
  console.log(types)
  console.log(types[0].type.name)
  const typeName=types[0].type.name
  const colorMapping={
    'normal':'#a8a878',
    'fire':'#f08030',
    'fighting':'#c03028',
    'water':'#6890f0',
    'flying':'#a890f0',
    'grass':'#78c850',
    'poison':'#a040a0',
    'electric':'#f8d030',
    'ground':'#e0c068',
    'psychic':'#f85888',
    'rock':'#b8a038',
    'ice':'#98d8d8',
    'bug':'#a8b820',
    'dragon':'#7038f8',
    'ghost':'#705898',
    'dark':'#705848',
    'steel':'#b8b8d0',
    'fairy':'#ee99ac'

  }
  typeColor.value[id]=colorMapping[typeName]
}
 
</script>

<style>
.h1{
  text-transform: capitalize;
}
.container {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  padding: 20px;
}
input, button {
  margin: 10px;
  padding: 8px;
  font-size: 16px;
}
img{
  width: 150px;
  height:150px;
}
.card{
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
 
  overflow: auto;
  width: 200px;
  height: 200;
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
  
  text-align: center;
  
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
    cursor: pointer;


  }


}
</style>
