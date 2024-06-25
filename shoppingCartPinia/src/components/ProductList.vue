<script setup>
import {useStore} from '../stores/store' // import usestore() from store.js
import {ref} from 'vue' // import ref() from vue
const store =useStore() // store is now available in setup()
//const productName = ref(''); // productName is now available in setup()
//const productPrice = ref(0); // productPrice is now available in setup()

function addtolist() {
    console.log('Adding product:', productName.value, productPrice.value)
    store.products.push({name:productName.value,price:productPrice.value});
   productName.value = '';
    productPrice.value = 0;
    console.log(store.products) // Debugging: Log the updated products array
}
</script>

<template>

    <main>
        <div class="container">
           <h1>Please insert the products name and price </h1>
           <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="productName">Product Name</label>
                    <input type="text" class="form-control" id="productName" placeholder="Enter product name" v-model="productName">
                    <label for="productprice" >Product Price</label>
                    <input type="text" class="form-control" id="productPrice" placeholder="Enter product price" v-model="productPrice" >
                    <button @click="addtolist">add</button>
                </div>
            </div>
        </div>
        </div>
        <div v-for="product in store.products" key="index">
          

        </div>
    </main>
</template>

<style scoped>
/* Add your styles here */
</style>
