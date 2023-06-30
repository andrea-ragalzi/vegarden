/** @type {import('tailwindcss').Config} */
import reactRefresh from '@vitejs/plugin-react-refresh';
import sassPlugin from 'vite-plugin-sass';

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
  plugins: [reactRefresh(), sassPlugin()],
}
