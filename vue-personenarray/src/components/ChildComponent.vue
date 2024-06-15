<template>
  <div>
    <!-- Displaying message received from Parent -->
    <p>{{ message }}</p>
    <!-- Button to send a message to Parent -->
    <button @click="sendMessage">Send Message to Parent</button>
    
    
  </div>
</template>

<script setup>
// Importing the necessary functions from Vue
import { defineProps, defineEmits } from 'vue';

// Define the props that the component expects to receive
const props = defineProps({
  // Define a prop named "message" of type String
  message: {
    type: String,
    required: true
  }
});

// Define the events that the component can emit
const emit = defineEmits(['message-sent']);

// Define a function to send a message to the parent component
const sendMessage = () => {
  // Emit the "message-sent" event with a message payload
  emit('message-sent', 'Hello from Child');
};

// Define a function to send a new message to the parent component

</script>
