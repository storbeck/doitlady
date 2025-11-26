<template>
  <v-container>
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
              @click="theme.toggle()" 
              icon
            >
              {{ theme.global.current.value === 'light' ? 'mdi-weather-night' : 'mdi-white-balance-sunny' }}
            </v-icon>
            <add-task />
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import AddTask from './AddTask.vue'

const theme = useTheme();
</script>