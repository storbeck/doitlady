<template>
  <v-app-bar :elevation="1" class="px-6">
    <v-img 
      src="/assets/chit.webp"
      max-width="50"
      contain
    />
    <v-toolbar-title class="ml-3 heading">
      Do it lady!
    </v-toolbar-title>
    <v-spacer />
    <div class="d-flex justify-space-around">
      <v-btn icon @click="theme.toggle()">
        <v-icon
          icon
        >
          {{ isLightTheme ? 'mdi-weather-night' : 'mdi-white-balance-sunny' }}
        </v-icon>
      </v-btn>
      <v-btn v-if="loggedIn" icon @click="logoutUser">
        <v-icon icon>mdi-logout</v-icon>  
      </v-btn>
    </div>
    <add-task v-if="loggedIn" />
  </v-app-bar>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import AddTask from './AddTask.vue'
const { clear, loggedIn } = useUserSession()

const theme = useTheme()
const isLightTheme = computed(() => !theme.global.current.value.dark)

const logoutUser = async () => {
  await clear()
  await navigateTo('/login')
}
</script>

<style scoped>
.heading {
  font-family: 'Caveat Brush', cursive;
  font-size: 2rem;
  line-height: 2.5rem;
}
</style>