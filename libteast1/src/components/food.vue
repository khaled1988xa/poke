<script setup>
import { ref, defineEmits } from 'vue';

const foodtype = ref("");
const foodprice = ref("");
const isfavorite = ref(false);

const emit = defineEmits(['updatelist']);

function updatelist() {
    emit('updatelist', {
        foodtype: foodtype.value,
        foodprice: foodprice.value,
        isfavorite: isfavorite.value
    });

    // Reset the form values
    foodtype.value = "";
    foodprice.value = "";
    isfavorite.value = false;
}
</script>

<template>
    <form class="form" @submit.prevent="updatelist"> <!-- Use form tag to handle submit event -->
        <div class="input-group mb-3">     
            <input type="text" v-model="foodtype" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        </div>

        <div class="input-group mb-3">
            <input type="text" v-model="foodprice" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        </div>
        
        <div class="input-group mb-3">
            <div class="input-group-text">
                <input class="form-check-input mt-0" type="checkbox" v-model="isfavorite" aria-label="Checkbox for following text input">
            </div>
        </div>
        
        <button class="btn btn-primary" type="submit">Add</button>
    </form>
</template>

<style scoped>
/* Your styles here */
</style>
