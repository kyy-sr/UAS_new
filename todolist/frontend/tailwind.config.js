/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a2e', // Dark navy
        secondary: '#16213e', // Deeper navy
        accent: '#e94560', // Soft red
        gold: '#feca57', // Gold for mewah touch
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Modern font
      },
    },
  },
  plugins: [],
}