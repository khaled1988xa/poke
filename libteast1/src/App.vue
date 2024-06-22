<script setup>
import { ref } from 'vue';
import Food from './components/food.vue'; // Ensure the component name is correctly imported

const foodList = ref([]);

function addfood(food) {
    foodList.value.push(food);
}

console.log(foodList);
</script>

<template>
  <div class="container">
    <Food @updatelist="addfood"></Food> <!-- Corrected the event name and handler function -->
    
    <div class="mt-4">
      <ul>
        <li v-for="(item, index) in foodList" :key="index">
          {{ item.foodtype }} - {{ item.foodprice }} - {{ item.isfavorite ? 'Favorite' : 'Not Favorite' }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* Your styles here */
</style>
