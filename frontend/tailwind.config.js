const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {
        colors: {
          'ared': '#FF385C',
          'agray': '#F7F7F7',
          'ablack': '#484848',
          'awhite': '#FFFFFF'
      },
    fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      }
    },
    plugins: []
  }
}
