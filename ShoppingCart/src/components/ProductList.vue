<script setup>
import {ref,defineEmits,defineProps} from 'vue'
const props = defineProps({
    products: {
        type: Array,
        required :true
    }});
    const emit=defineEmits(['addtoCart']);
    function addtoCart(product){
        console.log("Product object:", product)
        emit("addtoCart",product)
        console.log("this product add to the cart",product.name);
    }
    
</script>
<template>
<main>
<div class="container" > 
    <div v-for="(product, index) in props.products" :key="index" class="row">
        <div class="col-sm-4">
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">{{product.name}}</h5>
                    <p class="card-text">{{product.price}}</p>
                    <button class="btn btn-primary" @click="addtoCart(product)"  >add to Cart</button>
                    </div>
                </div>
            </div>
        
    </div>
    
</div>
</main>
</template>
<style>




</style>
