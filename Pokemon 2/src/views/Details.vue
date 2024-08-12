<template>
    <div>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-card class="mx-auto my-4" max-width="800">
              <v-row>
                <!-- Information on the left -->
                <v-col cols="12" md="6">
                  <v-card-title>
                    <h1 class="text-h5" style="text-transform: capitalize;">
                      Name: {{ AuthStore.pokemonIndex.name }} ID: {{ AuthStore.pokemonIndex.id }}
                    </h1>
                  </v-card-title>
                  <v-card-text>
                    <h1>Height: {{ AuthStore.pokemonIndex.height / 10 }} M</h1>
                    <h1>Weight: {{ AuthStore.pokemonIndex.weight / 10 }} KG</h1>
                    <h1 style="text-transform: capitalize;">Type: 
                      {{ AuthStore.pokemonIndex.types && AuthStore.pokemonIndex.types.length > 0 ? AuthStore.pokemonIndex.types[0] : 'N/A' }}
                    </h1>
                    <h1 style="text-transform: capitalize;">Abilities: 
                      {{ AuthStore.pokemonIndex.abilities && AuthStore.pokemonIndex.abilities.length > 0 ? AuthStore.pokemonIndex.abilities[0] : 'N/A' }}
                      {{ AuthStore.pokemonIndex.abilities && AuthStore.pokemonIndex.abilities.length > 1 ? ', ' + AuthStore.pokemonIndex.abilities[1] : '' }}
                      {{ AuthStore.pokemonIndex.abilities && AuthStore.pokemonIndex.abilities.length > 2 ? ', ' + AuthStore.pokemonIndex.abilities[2] : '' }}
                    </h1>
                    <h1>Base Experience: {{ AuthStore.pokemonIndex.base_experience }}</h1>
                  </v-card-text>
                  <v-card-actions>
                    <audio controls v-if="AuthStore.pokemonIndex.cries">
                      <source :src="AuthStore.pokemonIndex.cries" type="audio/ogg">
                      Your browser does not support the audio tag.
                    </audio>
                  </v-card-actions>
                </v-col>
                <!-- Image on the right -->
                <v-col cols="12" md="8">
                  <img
                    :src="AuthStore.pokemonIndex.image"
                    alt="Pokemon Image"
                    class="image"
                  />
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  
  

  <script setup>
  import { useAuthStore } from '../stores/authStore'
  
  const AuthStore = useAuthStore()
  console.log(AuthStore.LocalPokemonArray)
  console.log('Pokemon Index:', AuthStore.pokemonIndex)
  // console.log('Pokemon Image URL:', AuthStore.pokemonIndex.image)
  </script>

<style scoped>
.card {
  text-align: center;
  margin-top: 20px;
}

.container {
  padding: 20px;
}

.image {
  width: 500px;
  height: auto;
  display: block;
  margin: 0 auto;
  
  
}
</style>
