<script setup>
</script>

<template>
  <div class="container">
    <nav class="navbar navbar-light bg-light">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/create">Create</RouterLink>
    </nav>
    <h1 class="bg-secondary text-white rounded px-4">PersonenArray</h1>
    <RouterView></RouterView>
  </div>
</template>

<style scoped>

</style>
