/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'menuGray': '#ffffff',
        'formGray': '#fdc1c1',
        'Gray': '#ffffff',
        'borderGray': '#ffffff',
        'darkRed': '#ff00007d',
        'yellowButton': '#ffc80094',
        'save': '#11b91194',
        'expand': '#0089ff85',
        "disabled" : "#enabled"
        
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
 
}