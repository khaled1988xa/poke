<script setup>
import { ref } from 'vue'
const name = ref('Max Mustermann')
function changeName() {
console.log(name.value) // Auslesen
name.value = 'Erika Musterfrau'
}
</script>

<template>
<div>
<strong>Dein Name lautet:</strong> {{name}}
<button type="button" @click="changeName">
Change name
</button>
</div>
</template>

<style scoped>

</style>
