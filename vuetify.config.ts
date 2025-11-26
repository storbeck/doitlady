import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'

export default defineVuetifyConfiguration({
  // your Vuetify options here
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#3D878A',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: '#82E9DE',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        }
      },
    }
  },
})
