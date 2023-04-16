/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      '3xl': {'max': '1800px'},
      // => @media (max-width: 1800px) { ... }

      '2xl': {'max': '1580px'},
      // => @media (max-width: 1580px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1079px'},
      // => @media (max-width: 1079px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }

      'xsm': {'max': '400px'},
      // => @media (max-width: 400px) { ... }
    }
  },
  plugins: [],
}
