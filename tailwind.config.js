/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
module.exports = {
  theme: {
    extend: {
      backgroundImage: theme => ({
        'dark-blue-gradient': 'linear-gradient(to right, #1e3a8a, #1e40af, #1e429f)',
      }),
    },
  },
  plugins: [],
};