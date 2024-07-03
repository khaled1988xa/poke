<template>
    <div>
      <h1>Task Manager</h1>
      <input v-model="newTask" @keyup.enter="addTask" placeholder="Add a new task" />
      <button @click="addTask">Add Task</button>
      <ul>
        <li v-for="task in filteredTasks" :key="task.id">
          <label>
            <input type="checkbox" v-model="task.completed">
            <span :class="{ completed: task.completed }">{{ task.text }}</span>
          </label>
          <button @click="deleteTask(task.id)">Delete</button> <!-- Delete button -->
        </li>
      </ul>
      <button @click="filter = 'all'">All</button>
      <button @click="filter = 'active'">Active</button>
      <button @click="filter = 'completed'">Completed</button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const tasks = ref([
    { id: 1, text: "Take out the trash", completed: false },
    { id: 2, text: "Grocery shopping", completed: true },
    { id: 3, text: "Renew car insurance", completed: false }
  ]);
  
  const newTask = ref('');
  const filter = ref('all');
  
  const addTask = () => {
    if (newTask.value.trim()) {
      tasks.value.push({ id: Date.now(), text: newTask.value, completed: false });
      newTask.value = ''; // Reset the input after adding
    }
  };
  
  const deleteTask = (taskId) => {
    tasks.value = tasks.value.filter(task => task.id !== taskId);
  };
  
  const filteredTasks = computed(() => {
    switch (filter.value) {
      case 'completed':
        return tasks.value.filter(t => t.completed);
      case 'active':
        return tasks.value.filter(t => !t.completed);
      default:
        return tasks.value;
    }
  });
  </script>
  
  <style scoped>
  .completed {
    text-decoration: line-through;
  }
  </style>
  