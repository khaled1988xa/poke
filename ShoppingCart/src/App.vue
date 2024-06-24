<script setup>
import {ref,defineEmits,defineProps} from 'vue'
import ProductList from './components/ProductList.vue';
import Cart from './components/Cart.vue';


const products = ref([  {name: 'Product 1', price: 100},
                        {name: 'Product 2', price: 200},
                        {name: 'Product 3', price: 300},
                        {name: 'Product 4', price: 400},
                        {name: 'Product 5', price: 500}, 
                        {name: 'Product 6', price: 600},
                        {name: 'Product 7', price: 700}, 
                        {name: 'Product 8', price: 800},
                        {name: 'Product 9', price: 900}, 
                        {name: 'Product 10', price: 1000}
  ]);
 
const cartitems = ref([]);

function addToCart(product){
          cartitems.value.push(product)
};
function removeFromCart(product){
  cartitems.value.pop(product);

};

</script>

<template>
  <main>
    <div class="container">
      <div class="flex-container">
      <ProductList v-bind:products="products" @addtoCart="addToCart" />
      <Cart :cartitems="cartitems" @removeFromCart="removeFromCart" />
    </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  padding: 20px;
}

.flex-container {
  display: flex;
  justify-content: space-between;
  
}

.flex-container > * {
  flex: 1;
  margin: 10px;
}
</style>
