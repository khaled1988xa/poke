<template>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="elevation-12">
            <v-card-title class="headline">
              Welcome to Our Application
            </v-card-title>
            <v-card-text>
              <p>This is the main page of our application. Please login or register to access more features.</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" to="/login">
                Login
              </v-btn>
              <v-btn color="secondary" to="/register">
                Register
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>

  </script>