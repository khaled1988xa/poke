<script setup>
import {ref,defineEmits,defineProps} from 'vue'
const props=defineProps({
    cartitems:{
        type:Array,
        required:true
    }});
    const emit=defineEmits(['removeFromCart']);
    function removeFromCart(product){
        console.log("Product object:", product)
        emit("removeFromCart",product)
        console.log("this product remove from the cart",product.name);
    }

</script>
<template>
    <div class="cart-container">
<div v-for="(item,index) in props.cartitems" :key="index">
    <div class="col-sm-5">
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">{{item.name}}</h5>
                <p class="card-text">{{item.price}}</p>
                <button class="btn btn-primary" @click="removeFromCart(product)">remove</button>
                </div>
            </div>
        </div> 
</div>
</div>
</template>
<style scoped>
.cart-container {
    display: flex;
    flex-direction: column; /* Stack items vertically */
    gap: 10px; /* Add space between items */
}
</style>
