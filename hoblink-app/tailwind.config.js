/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        'hoblink': {
          'primary': '#1a1a1a',
          'secondary': '#ffffff',
          'accent': '#4CAF50',
          'danger': '#f44336',
          'warning': '#ff9800',
          'info': '#2196f3',
          'dark': '#000000',
          'light': '#f5f5f5',
        }
      },
      screens: {
        'xs': '475px',
      }
    },
  },
  plugins: [],
}