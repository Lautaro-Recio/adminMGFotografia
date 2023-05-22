/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeDown: {
          '0%, 100%': { transform: 'height(0px)' },
          '50%': { transform: 'height(100pxx)' },
        },
        animation: {
          fadeDown: 'fadeDown 1s ease-in-out infinite',
        }
      }
    }
  },
  plugins: [],
}