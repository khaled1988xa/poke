<script setup>
import ref from 'vue';
const userlist =[{id:1,name:khaled},
                 {id:2,name:mohammad},
                 {id:3,name:ali}];

</script>

<template>
 <main>
    <div v-for="user in userlist ">
        <ul>
            <li> {{user.id}} </li>
            <li> {{user.name}} </li>
        </ul>
    </div>
 </main>
</template>

<style scoped>

</style>
