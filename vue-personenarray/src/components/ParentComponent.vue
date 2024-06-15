<template>
  <div>
    <!-- Passing message from Parent to Child -->
    <ChildComponent :message="parentMessage" @message-sent="receiveMessage" />
    <!-- Displaying message received from Child -->
    <p>{{ childMessage }}</p>
    <!-- Button to send a new message to the Child -->
    <button @click="sendNewMessageToChild">Send New Message to Child</button>
  </div>
</template>

<script setup>
// Importing required functions from Vue
import { ref } from 'vue';
// Importing the ChildComponent
import ChildComponent from './ChildComponent.vue';

// Define a reactive variable to hold the message from the parent
const parentMessage = ref("");
// Define a reactive variable to hold the message received from the child
const childMessage = ref('');

// Define a function to handle the event when a message is sent from the child
const receiveMessage = (message) => {
  // Update the childMessage with the received message
  childMessage.value = message;
};

// Define a function to send a new message to the child
const sendNewMessageToChild = () => {
  // Update the parentMessage with a new message
  parentMessage.value = ' Message from Parent';
};
</script>
