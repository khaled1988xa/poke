<script setup>

const props =defineProps(["task","index"])
const emit=defineEmits(["task-compleated"])

function updatetask(){
    emit("task-compleated",props.index)
}
</script>

<template>
  <div>
    <div>{{ task.title }}</div>
    <div v-if="task.compleated">compleated</div>
    <div v-if="!task.compleated">not compleated</div>
    <button @click="updatetask">Complete Task</button>
  </div>
</template>

<style scoped>

</style>
