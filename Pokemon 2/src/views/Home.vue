<template >
    <main style="background-color: beige;">
    <div>
        <h1 class="h1">Welcome to PokeDex</h1>
        <h3 class="h2">Search for your favorite Pokemon</h3>
        
    </div>
    <div class="Image">
        <img style="width: 1200px; height: 200px;" src="../assets/images.png" alt="pokemon Image">
    </div>
    <div class="input">
        <input v-model="pokemonId" placeholder="Enter Pokémon ID or Name">
        <button @click="fetchPokemon(pokemonId)">Search</button>
        <button @click="feelsLucky">Feels Lucky</button>
        <div>
          <button @click="increment">+</button>
          <button @click="decrement">-</button>
        </div>
      </div>
      <div class="container">
       
        <div  class="container" v-if="authStore.LocalPokemonArray.length > 0">
          <div  v-for=" poke,index in authStore.LocalPokemonArray" :key="poke.id">
          <v-card  class="card" :style="{ backgroundColor: authStore.typeColor[poke.id] }"  >
            <v-card-title><h1 style="text-transform: capitalize;">{{ poke.name }}</h1></v-card-title>
            <v-card-text>
              <p>{{ poke.id }}</p>
              <img class="img" :src="poke.image" alt="Pokemon Image">
              <button @click="openDetail(index,poke.id)">Details</button>
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
          
             
              <img :src="localePokemon.image" alt="Pokemon Image">
              <div v-for="pokeability in localePokemon.abilities" :key="pokeability.name">
               
              </div>
              
              <button @click="fetchAllMoveDetails">Add To Deck</button>
              <button @click="cardcolor(localePokemon.types,localePokemon.id)">check</button>
          </v-card-text>
          </v-card>
    
        </div>
        </div>
    </main>
     
      
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import {useRouter,useRoute} from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const router=useRouter()
const route = useRoute()

const pokemonId = ref('')

const allpokemon = ref({})
const allPokemonArray = ref([])

const typeColor = ref({})

function increment() {
  pokemonId.value++
  ///fetchPokemon(pokemonId.value)
};
function decrement() {
  pokemonId.value--
  
};
 onMounted(() => {
   //retieveAllPokemons()
   
 })
 function feelsLucky() {
     const randomPokiimonId = Math.floor(Math.random() * 1000) + 1
     
     fetchPokemon(randomPokiimonId)
 }
function fetchPokemon(pokemonId,randomPokiimonId)  {
  authStore.fetchPokemon(pokemonId,randomPokiimonId)
  
  }

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
 
  
function openDetail(index,id){
  authStore.openDetailsView(index,id)
  
  
}




</script>

<style scoped>
.input{
    display: flex;
    justify-content: center;
    align-items: center;
}
.h1{
    text-align: center;
    justify-content: center;
    text-transform: capitalize;
  }
  .h2{
      text-align: center;
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
  .img{
    width: 150px;
    height:150px;
  }
 
  .card{
    display:flex;
    flex-wrap: wrap;
    justify-content: center;
   
    overflow: auto;
    width: 180px;
    height: 150;
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