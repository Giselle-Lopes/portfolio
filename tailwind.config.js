/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      concertOne: ["Concert One", "serif"],
      mono: ["Geist Mono"]
    },
    extend: {
      dropShadow: {
        'custom-yellow': '0 0 25px #edfe01',
        'custom-pink': '0 0 25px #F229C3',
        'custom-white': '1px 5px 10px white',
        'custom-yellow-star': '1px 5px 10px #edfe01',
        'custom-pink-star': '1px 5px 10px #F229C3'
      },
    },
  },
  plugins: [],
}

