<template>
  <v-form @submit.prevent="login">
    <v-text-field
      v-model="username"
      label="Username"
      required
    />
    <v-text-field
      v-model="password"
      label="Password"
      type="password"
      required
    />
    <v-btn type="submit" color="primary">Login</v-btn>
  </v-form>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const username = ref('')
const password = ref('')

// Check if already logged in and redirect to home
const { loggedIn } = useUserSession()
watch(loggedIn, (isLoggedIn) => {
  if (isLoggedIn) {
    navigateTo('/')
  }
}, { immediate: true })

async function login() {
  try {
    const response = await $fetch('/api/login', {
      method: 'POST',
      body: {
        email: username.value,
        password: password.value
      }
    })
    console.log('Login successful:', response)
    
    // Force a full reload to ensure SSR session state is updated
    reloadNuxtApp({ force: true })
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script>

<style>

</style>