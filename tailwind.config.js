/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/js/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      transformOrigin: {
        "0": "0%",
      },
    },
  },
  plugins: [],
}
