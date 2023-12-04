/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    //'./pages/**/*.{html,js,jsx,ts,tsx}',
    //'./components/**/*.{html,js,jsx,ts,tsx}',
    //'node_modules/flowbite-react/**/*.{html,js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1700px',
      },
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
}