<template>
  <v-container class="container">
    <v-row justify="center">
      <v-col cols="12">
        <h1>Tic Tac Toe</h1>
        <h1>Player:  {{player}}</h1>
        <div class="grid">
          <button class="button"></button>
          <button class="button">{{XO}}</button>
          <button class="button">{{XO}}</button>
          <button class="button">{{XO}}</button>
          <button class="button">{{XO}}</button>
          <button class="button">{{XO}}</button>
          <button class="button">{{XO}}</button>
          <button class="button">{{XO}}</button>
          <button class="button" @click="xoro">{{XO}}</button>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup>
import { ref,computed } from 'vue'

const player = Math.floor(Math.random() * 2) + 1 // 1 or 2
let XO = ref()

function xoro () {
  if (player === 1) {
    XO='X'
  } else {
    XO='O'
  }
  console.log(XO)
  return XO
}

</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* This ensures that the container takes at least the full height of the viewport */
  width: 100vw; /* Optional: Ensures the container takes full viewport width */
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  width: 320px;
  height: 320px;
  border: 1px solid black;
  background-color: lightgray;
}

.button {
  width: 100px;
  height: 100px;
  border: 4px solid black;
  background-color: white;
  cursor: pointer;
  font-size: 50px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

