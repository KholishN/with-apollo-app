/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/*.{js,jsx,ts,tsx}",
    "./components/*.{js,jsx,ts,tsx}",
    "./next/*.{js,jsx,ts,tsx}"

  ],
  theme: {
    extend: {
      height: {
        '97': '400px',
      },
      width: {
        '97' : '500px'
      }
    },
  },
  plugins: [],
}
