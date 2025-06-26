/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        '400': '100rem',
        '100': '25rem',
        '112': '28rem',
        '120': '30rem',
        '140': '35rem',
        '200': '50rem',
        '360': '90rem',
      },
      width: {
        '400': '100rem',
        '100': '25rem',
        '120': '30rem',
        '140': '35rem',
        '180': '45rem',
        '200': '50rem',
        '360': '90rem',
      },
      
    },
  },
  plugins: [],
}
