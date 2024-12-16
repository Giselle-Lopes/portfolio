/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      concertOne: ["Concert One", "serif"],
      mono: ["Geist Mono"]
    },
    extend: {
      animation: {
        'displayText': 'displayText 3s linear infinite',
        'animate': 'animate 3s linear infinite'
      },
      keyframes: {
        displayText: {
          '0%': {
            opacity: '1',
            visibility: 'visible',
          },
          '33.33%, 100%': {
            opacity: '0',
            visibility: 'hidden',
          },
        },
      }
    },
  },
  plugins: [],
}

