/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/html/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-1": "#03045E",
        "blue-2": "#023E8A",
        "blue-3": "#0077B6",
        "blue-4": "#0096C7",
        "blue-5": "#00B4D8",
        "blue-6": "#48CAE4",
        "blue-7": "#90E0EF",
        "blue-8": "#ADE8F4",
        "blue-9": "#CAF0F8",
      },
    },
  },
  plugins: [],
});
