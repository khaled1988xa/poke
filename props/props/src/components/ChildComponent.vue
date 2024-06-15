<template>
    <div>
      <h2>Child Component</h2>
      <ul><li v-for="item in items" :key="item">{{ item }}</li></ul>
      <input v-model="newItem" placeholder="Enter a new item" />
      <button @click="addItem">Add Item</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    items: {
      type: Array,
      required: true,
    },
  });
  
  const emit = defineEmits(['add-item']);
  const newItem = ref('');
  
  function addItem() {
    if (newItem.value.trim()) {
      emit('add-item', newItem.value);
      newItem.value = '';
    }
  }
  </script>
  