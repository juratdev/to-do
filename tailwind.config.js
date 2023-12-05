/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{html,js}',
    './pages/**/*.{html,js}',
    './index.html',
  ],
  theme: {
    extend: {},
    colors: {
      primary: "#F1ECE6",
      secondary: "#323232",
      secondaryGray: "#C2C2C2",

    },
  },
  plugins: [],
}