/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'menuGray': '#222222c4',
        'formGray': '#bdb6b6',
        'Gray': '#999898',
        'borderGray': '#ffffff42',
        'darkRed': '#ff00007d',
      },
      
      backgroundImage: {
        "backgroundSignIn":"url('/src/assets/fondo.jpg')"
      },
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
  plugins: [
        import('flowbite/plugin')
    ],
}