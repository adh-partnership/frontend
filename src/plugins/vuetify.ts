// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import colors from 'vuetify/lib/util/colors.mjs';

// Vuetify
import { createVuetify, ThemeDefinition } from 'vuetify'

// @TODO Vuetify seems to be missing util typescript definitions... replace these if they fix that
const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#1976d2',
    'primary-darken-1': '#1565c0',
    secondary: '#03a9f4',
    'secondary-darken-1': '#039be5',
    error: '#c62828',
    info: '#ffcc80',
    success: '#81c784',
    warning: '#ffd54f',
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      lightTheme,
    },
  },
})
