import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#FFFFFF',
        secondary: '#161616',
        accent: '#119FC6',
        error: '#C51627',
        info: '#119FC6',
        success: '#6DB142',
        warning: '#E8C226',
        background: '#161616'
      }
    }
  }
})
