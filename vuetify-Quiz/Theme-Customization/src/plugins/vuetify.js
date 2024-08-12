// plugins/vuetify.js

import 'vuetify/styles';
import { createVuetify } from 'vuetify';

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#1976D2',
          // Define other colors as needed
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#2196F3',
          // Define other colors as needed
        },
      },
    },
  },
});
