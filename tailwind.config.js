/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "my-primary": "#402831",
        "my-secondary": "#F2B035",
        "my-terciary": "#A65D03",
        "my-quartenary": "#F2B05E",
        "my-quintenary": "#F2F0F0",
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-5px)' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
      },keyframes: {
        shake: {
          '0%, 100%' : { transform: 'translate(0, 0)' },
          '25%' : { transform: 'translate(-5px, -5px)' },
          '50%' : { transform: 'translate(5px, 5px)' },
          '75%' : { transform: 'translate(-5px, 5px)' }
        },
      },
      animation: {
        shake: 'shake 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
}

