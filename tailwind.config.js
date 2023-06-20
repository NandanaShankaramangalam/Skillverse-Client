/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#0D1B2A',
        'neon-green' : '#00FF84'
      },
    },
  },
  plugins: [],
}