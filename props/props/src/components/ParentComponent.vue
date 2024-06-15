<template>
    <div>
      <h1>Parent Component</h1>
        <div></div>

      <ChildComponent :items="items" @add-item="handleAddItem" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import ChildComponent from './ChildComponent.vue';
  
  const items = ref(['Item 1', 'Item 2', 'Item 3']);
  
  function handleAddItem(newItem) {
    items.value.push(newItem);
   // 
  }
  </script>
  