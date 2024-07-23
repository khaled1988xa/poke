<template>
<div>
    <h1 class="card">Details</h1>
    <div >
        <v-card class="container">
            <v-card-title><h1 style="text-transform: capitalize;" > Name:{{ AuthStore.pokemonIndex.name }} ID:{{AuthStore.pokemonIndex.id}}</h1></v-card-title>
            
            <v-card-text>
                <!-- <h1>{{ AuthStore.pokemon.id }}</h1> -->
                <img class="image" :src="AuthStore.pokemonIndex.image" alt="Pokemon Image">
                <h1>Height: {{ AuthStore.pokemonIndex.height/10 }} M  </h1>
                <h1>Weight: {{ AuthStore.pokemonIndex.weight/10 }} KG</h1>
                <h1 style="text-transform: capitalize;">Type: {{ AuthStore.pokemonIndex.types.at(0).type.name }}</h1>
                <h1 style="text-transform: capitalize;">Abilities: {{ AuthStore.pokemonIndex.abilities.at(0).ability.name }},
                                {{ AuthStore.pokemonIndex.abilities.at(1).ability.name }}</h1>
                <h1>base_experience: {{ AuthStore.pokemonIndex.base_experience }}</h1>         
                  <audio controls>
                    <source :src="AuthStore.pokemonIndex.cries" type="audio/ogg">
                    Your browser does not support the audio tag.
                  </audio>
            </v-card-text>
        </v-card>
    </div>
</div>
</template>

<script setup> 

import { useAuthStore } from '../stores/authStore'

const AuthStore = useAuthStore()
console.log(AuthStore.LocalPokemonArray)

   </script>

<style scoped>
.container{
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    padding: 20px;
    justify-content: center;

}
.image
{
    width: 600px;
    height: 450px;
}
</style>