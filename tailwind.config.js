/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/js/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'] 
      },
    },
  },
  plugins: [],
}
