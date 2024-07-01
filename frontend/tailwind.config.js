/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Montserrat : ['Montserrat', 'sans-serif'],
      },
      colors: {
        'bookmark-bg': '#DAD3BE',
        'bookmark-fonts': '#B4B4B8',
        'bookmark-hl': '#C7C8CC',
        'bookmark-bg2': '#E3E1D9'
      },
      container: {
        center: true,
        // padding: "1rem",
        // screens: {
        //   lg: "1124px",
        //   xl: "1124px",
        //   "2xl": "1124px",
        // },
      },
    },
  },
  plugins: [],
}

