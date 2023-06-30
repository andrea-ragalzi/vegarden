/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#fff',
        gray: {
          100: '#f8f9fa',
          200: '#f7f7f9',
          300: '#eceeef',
          400: '#ced4da',
          500: '#aaa',
          600: '#888',
          700: '#5a5a5a',
          800: '#343a40',
          900: '#212529',
        },
        blue: '#007bff',
        indigo: '#6610f2',
        purple: '#6f42c1',
        pink: '#e83e8c',
        red: '#ff7851',
        orange: '#fd7e14',
        yellow: '#ffce67',
        green: '#56cc9d',
        teal: '#20c997',
        cyan: '#6cc3d5',
        primary: '#78c2ad',
        secondary: '#f3969a',
        success: '#56cc9d',
        info: '#6cc3d5',
        warning: '#ffce67',
        danger: '#ff7851',
        light: '#f8f9fa',
        dark: '#343a40',
        background: '#f2f2f2',
        text: '#333333',
        link: '#78c2ad',
        button: '#f3969a',
      },
      // Aggiungi il tema scuro
      darkMode: 'class', // Abilita il tema scuro basato sulla classe 'dark'
      // Configurazione dei colori del tema scuro
      dark: {
        // Esempi di colori del tema scuro
        primary: '#f2f2f2',
        background: '#f2f2f2',
        text: '#333333',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd'],
      textColor: ['dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd'],
    },
  },
  plugins: [],
}
