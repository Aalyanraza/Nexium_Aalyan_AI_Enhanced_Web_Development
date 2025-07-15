// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'float-x': 'floatX 10s ease-in-out infinite',
      },
      keyframes: {
        floatX: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(25%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
