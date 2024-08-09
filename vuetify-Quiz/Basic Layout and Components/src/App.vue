<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <!-- Adjust the column sizing for better responsiveness across devices -->
          <v-col cols="12" sm="6" md="4" v-for="n in 6" :key="n" class="d-flex">
            <v-card elevation="9" class="flex-grow-1" outlined max-width="400">
              <v-card-title>
                <h1>Card {{ n }}</h1>
              </v-card-title>
              <v-card-text>
                <p>This is the content of card {{ n }}.</p>
              </v-card-text>
              <!-- Ensure the image takes up the correct amount of space in the card -->
              <v-img :src="`https://picsum.photos/200/300?random=${n}`" aspect-ratio="1.33"></v-img>
              <v-card-actions>
                <v-btn text>Learn More</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
// No script needed for this basic example unless you want to add functionality
</script>

<style scoped>
/* Add some custom styles, for example, padding around the cards */
.v-card {
  margin: 10px;
}
</style>
