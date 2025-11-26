<template>
  <v-container v-if="loggedIn">
    <v-row>
      <v-col cols="12">
        <v-sheet 
          elevation="0" 
          class="pa-3"
          style="background-color: transparent;"
        >
          <div 
            class="d-flex mx-auto align-center justify-center"
            >

            <v-img 
              src="/assets/chit.webp"
              max-width="50"
              contain
            />
            <v-toolbar-title class="ml-3">
              Do It Lady
            </v-toolbar-title>
            <v-spacer />
            <v-icon
            icon
              @click="theme.toggle()" 
            >
              {{ theme.global.current.value === 'light' ? 'mdi-weather-night' : 'mdi-white-balance-sunny' }}
            </v-icon>
            <add-task />
            <v-btn 
              text 
              class="ml-3"
              @click="logoutUser"
            >
              Logout
            </v-btn>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import AddTask from './AddTask.vue'
const { clear, loggedIn } = useUserSession()

const theme = useTheme()

const logoutUser = async () => {
  await clear()
  await navigateTo('/login')
}
</script>