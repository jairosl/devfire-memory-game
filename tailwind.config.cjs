/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       colors: {
        'red-black': '#ff002a',
        'blue-black': '#388cfe',
        yellow: {
          100: '#FAE319'
        },
        green: {
          200: '#4DBA47'
        },
        pink: {
          100: '#FF29DC'
        }
      },
      fontFamily: {
        pixel: ['VT323', 'monospace']
      },
      boxShadow: {
        inset: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25);'
      }
    },
  },
  plugins: [],
}
